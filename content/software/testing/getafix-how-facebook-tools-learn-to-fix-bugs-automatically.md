+++
draft = true
+++

https://code.fb.com/developer-tools/getafix-how-facebook-tools-learn-to-fix-bugs-automatically/

- TODO: Get Images

Getafix: How Facebook tools learn to fix bugs automatically


JOHANNES BADER
SATISH CHANDRA
ERIC LIPPERT
ANDREW SCOTT
Facebook has built a tool called Getafix that automatically finds fixes for bugs and offers them to engineers to approve. This allows engineers to work more effectively, and it promotes better overall code quality.
We believe Getafix is the first tool of its kind to be deployed to production at Facebook scale, contributing to the stability and performance of apps that billions of people use.
Getafix powers Sapfix, which suggests fixes for bugs that our Sapienz testing tool finds. Getafix also provides fixes for bugs found by Infer, our static testing tool.
Because Getafix learns from engineers’ past code fixes, its recommendations are intuitive for engineers to review.
Getafix improves upon previous auto-fix technology by using more powerful techniques for learning fix patterns from past code changes. Getafix uses a more powerful clustering algorithm and also analyzes the context around the particular lines of problematic code to find more appropriate fixes.
Modern production codebases are extremely complex and are updated constantly. To create a system that can automatically find fixes for bugs — without help from engineers — we built a tool that learns from engineers’ previous changes to the codebase. It finds hidden patterns and uses them to identify the most likely remediations for new bugs.



This tool, called Getafix, has been deployed to production at Facebook, where it now contributes to the stability of apps that billions of people use. Getafix works in conjunction with two other Facebook tools, though the technology can be used to address code issues from any source. It currently suggests fixes for bugs found by Infer, our static analysis tool that identifies issues such as null pointer exceptions in Android and Java code. It also suggests fixes — via SapFix — for bugs detected by Sapienz, our intelligent automated testing system for our apps. Having previously given an overview of SapFix and Sapienz, we are now offering a deep dive into how Getafix learns how to fix bugs (using the term broadly to refer to any code issues, not just those that will cause an app to crash).

The goal of Getafix is to let computers take care of the routine work, albeit under the watchful eye of a human, who must decide when a bug requires a complex, nonroutine remediation. The tool works by applying a new method of hierarchical clustering to many thousands of past code changes that human engineers made, looking at both the change itself and also the context around the code change. This method allows it to detect the underlying patterns in bugs and the corresponding fixes that previous auto-fix tools couldn’t.

Getafix can also narrow the space of possible program changes that need to be searched to find a fix for a bug, enabling it to select an appropriate patch more quickly and without the high computation time that brute force and logic-based techniques require. This more efficient approach makes it possible to deploy Getafix to production environments. At the same time, because Getafix learns from past code changes, it also produces fixes that are easy for human engineers to understand.

Getafix is deployed in Facebook to automatically suggest fixes for the null dereference bugs that Infer reports, as well as to suggest fixes for the null dereference-related crash errors that Sapienz flags. It is also being used to resolve code quality concerns that are found when revisiting existing code with newer versions of Infer.

How Getafix differs from simpler auto-fix tools
In current industrial practice, auto-fixes have been used primarily for basic issues, whereas code remediation is straightforward. For example, an analyzer might warn about a “dead exception,” in which the developer probably forgot to add a throw before new Exception(...). An auto-fix to make that change is straightforward and can be defined by the author of the lint rule, without knowing the specific context in which it is applied.

Getafix offers significantly more general capability, remediating issues in cases where the fix is context-dependent. In this sample code example, Getafix offers the following fix in response to an Infer bug at line 22:



A sample bug reported in our code review portal, along with Getafix-generated fix.

Note that this fix depends not only on the variable ctx but also on the return type of the method. Unlike simple lint remediations, fixes of these kinds cannot be baked into Infer itself.

The figure below has additional examples of fixes that Getafix offers for Infer bugs; even though the bug from Infer is the same (null method call, which indicates the risk of a NullPointerException being thrown), each fix is unique. Notice that the fixes are indistinguishable from the kinds developers typically make.



Deep dive into key technical details
Getafix is organized as the toolchain shown in the diagram below. In this section, we’ll describe the functionality and challenges in each of the three main components.



Tree differencer identifies changes at a tree level
An abstract-syntax-tree-based differencer is first used to identify concrete edits made between a pair of source files, such as successive revisions of the same file. For example, it will detect granular edits: wrapping a statement with an if, adding an @Nullable annotation or an import, and prepending a conditional early return to an existing method body, among others. In the example below, the insertion of a conditional early return if dog is null, the rename of public to private, and the move of a method were detected as concrete edits. Whereas a line-based diffing tool would mark either method as fully removed and inserted, the tree differencer detects the move and can hence also detect the insertion within the moved method as a concrete edit.

A challenge in the tree differencer is to efficiently and precisely align parts of the “before” and “after” trees, so the right concrete edits and their mappings from before to after trees get discovered.



A new way of mining fix patterns
Getafix performs pattern mining by using a new hierarchical clustering technique, along with anti-unification, an existing method of generalizing among different symbolic expressions. It then creates a collection of possibly related tree differences and uses the fix patterns representing the most common program transformations in that collection. These patterns can be abstract, containing “holes” where program transformations differ.

The following example image shows a hierarchical structure, known as a dendrogram, that results from a set of edits. (In this case, it shows the edit from the previous example above.) Each row shows an edit pattern — the “before” in purple and “after” in blue — along with some metadata. Each vertical black bar corresponds to a level in the hierarchy, where the edit pattern at the top of the black bar is the pattern obtained by anti-unification of all the other edits belonging to that level in the hierarchy. The other edits are connected by the smaller, thin black lines. Anti-unification combines “early return if dog is null” edit from the previous example with another edit in which the only difference is in what the dog is drinking. The result is an abstract fix pattern that represents the commonality. The symbol h0, introduced by anti-unification, indicates a “hole” that can be instantiated based on the context.



This edit pattern can then combine with other edit patterns that have more variation in variable names but still have the same overall structure. This process produces increasingly more abstract edit patterns as we go up the tree. For example, it could combine this edit with a cat-related edit to obtain the abstract edit shown near the top of the diagram.

More seriously, though, this hierarchical matching process produces a powerful framework for Getafix to discover reusable patterns in code changes. The picture below shows the dendrogram (laid out sideways and miniaturized) obtained by combining all the 2,288 edits that fixed null pointer errors reported by Infer in our codebase over a period of time. The fix patterns we seek to mine are hidden in this dendrogram.



The idea of anti-unification-based pattern mining is not new, but several enhancements were necessary to mine patterns that can be used to generate (and rank) a reasonably small number of fixes for a new bug.

One such change is the inclusion of a portion of surrounding code that doesn’t change as a result of the edit. This change allows us to find not only patterns in the changes people make but also patterns in the context in which the changes are applied. For example, in the first dendrogram above, we notice that there are two distinct edits adding if (dog == null) return; before dog.drink(...);. Even though dog.drink(...); is unchanged, it is included in the “before” and “after” parts of the pattern as context telling us where to apply this fix. At a higher level in the hierarchy of edits, the dog.drink() context merges with other context to become the abstract context h0.h1(), which restricts the places where the pattern can apply. A more realistic example follows in the next section.

A greedy clustering algorithm, as suggested in past literature on auto-fix tools, is unlikely to learn this context. This is because the greedy clustering algorithm maintains a single representation of each cluster, which will not include the extra context if it is not present in all of the edits in the training data. For example, if an edit inserting if (list != null) return; before do(list.get()); merged with our dog.drink() examples above, greedy clustering would lose all the context about where to insert the early return. Getafix’s hierarchical clustering approach keeps as much context as possible at each level, becoming more general higher in the structure. At a certain level, even the general context we hope to learn will be lost, but it will still be present at lower levels in the structure.

In addition to surrounding code, we also associate edits with the Infer bug reports that prompted them in the first place, which allows us to learn how edit patterns relate to the corresponding bug reports. The variable Infer blames in a bug report is shown as “errorVar” in the first dendrogram figure above and participates in anti-unification, ending up as hole h0. This allows us to later substitute a blamed variable into h0 when presented with a new Infer bug report, making the fix pattern more specific.

How Getafix creates patches
The final step takes buggy source code and fix patterns from the pattern mining step and produces patched versions of the source code. There are typically many fix patterns to choose from (as seen in the dendrogram above). So a challenge we have to address in this step is selecting the correct pattern to fix a particular bug. If the pattern applies in several locations, Getafix must also select the right match. The following examples illustrate our general approach and how we address this challenge in Getafix.

Example 1. Consider the pattern we mined above: h0.h1(); → if (h0 == null) return; h0.h1();

We briefly explain the steps to produce the following patch on previously unseen code.


Getafix creates a patch using the following steps

Find sub-AST matching the before part: mListView.clearListeners();
Instantiate holes h0 and h1
Replace sub-AST with instantiated after part
Note that h0 in the after part is bound because of the inclusion of unmodified context h0.h1();, which helpfully restricts the number of places the pattern applies. Without the unmodified context, the pattern would have been <nothing> → if (h0 == null) return;. This pattern applies in unintended places, such as after mListView.clearListeners(); or even after mListView = null;.

The insertion-only pattern will in fact also appear higher up in the dendrogram, where the pattern with context h0.h1(); is anti-unified with a pattern inserting the return in front of a different statement. The next example illustrates how Getafix deals with patterns that seem to apply in too many places.

Example 2. Consider the following pattern: h0.h1() → h0!=null && h0.h1()

Typically, this patch would get mined from fixes within if conditions or return expressions, so we’d expect it to be applied there as well. But it also matches in other situations, such as the call statement shown in a previous example above: mListView.clearListeners();. Getafix’s ranking strategy tries to estimate the likelihood that a pattern is indeed a fix and that it is the most likely fix for a given context. This strategy allows the system to be less reliant on the validation step later, thus saving time.

The above pattern will compete with other patterns, such as the more specific if (h0.h1()) { ... } → if (h0!=null && h0.h1()) { ... } or the pattern from Example 1, which applies only to call statements rather than expressions. More specific patterns match in fewer places and are thus considered to be more specialized for the situation, so Getafix ranks them higher.

Implementation and performance
Getafix is deployed in Facebook to automatically suggest fixes for null dereference bugs reported by Infer, our static analysis tool, as well as to suggest fixes for the null dereference-related crash bugs that Sapienz finds. It is also being used to resolve outstanding Infer bugs from the past.

In one experiment, we compared Getafix-computed fixes with actual human-written past fixes for the same Infer null method call bugs, over a data set of about 200 small edits in which fewer than five lines had changed. In about 25% of those cases, Getafix’s highest-ranked patch exactly matched the human-created patch.

Another experiment looked at a subset of the Instagram codebase and tried to bulk-fix about 2,000 null method call issues. Getafix was able to attempt a patch in about 60 percent of bugs. About 90 percent of those attempts passed automatic validation, meaning they were compilable and Infer no longer emitted the warning. Overall, Getafix successfully automatically patched 1,077 (about 53 percent) of null method call bugs.

In addition to suggesting fixes for new Infer bugs as they are introduced, we’ve also been using our same infrastructure to clean up the backlog of Infer bugs that made it past code review and into the codebase. We’ve cleaned up hundreds of return not nullable Infer bugs and field not nullable Infer bugs as a part of this effort. Interestingly, suggesting auto-fixes next to return not nullable and field not nullable bugs resulted in an increase in the fix rate, from 56 percent to 62 percent and from 51 percent to 59 percent, respectively. Overall, a couple of hundred additional bugs were fixed in the past three months because Getafix displayed these suggestions.

Getafix also produces fixes to SapFix to address the crashes that Sapienz detects. Over the past months, Getafix provided about half of the fix candidates that SapFix uses and considers valid (all tests passed). Of all fix candidates Getafix provides to SapFix, about 80 percent pass all tests.

Increasing Getafix’s impact
Getafix has helped us advance toward our goal of letting computers take care of routine bug-fixing work. As we continue to refine our testing and verification tools, we expect Getafix will be able to prevent a larger portion of postdeployment failures.

We note that the fix patterns Getafix mines need not come only in response to Infer-related fixes. Indeed, they can also come from fixes made in response to manual code inspection. This additional source of fix patterns opens up the exciting possibility of automating repetitive code reviews. In other words, a bug that has been flagged and remediated across the codebase multiple times in the past can be flagged automatically in a future code commit — without a human needing to do it.

Getafix is part of our overall effort to build intelligent tools that rely on statistical analysis of large code corpora and the associated metadata. Such tools have the potential to improve all aspects of the software development life cycle, including code discovery, code quality, and operational efficiency. The insights we gain from Getafix will help us in building out and deploying additional tools in this space.



We’d like to thank Jeremy Dubreil, as well as Alexandru Marginean and the SapFix team for their help with integrating Getafix with Infer and SapFix, respectively.
