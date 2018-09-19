+++
title = "The Way to Optimize"
date = "1990-03-29"
draft = true
tags = [
    "Optimization"
]
+++

Code Optimization: The Optimal Way to Optimize By Kevin Bloch,
www.toptal.comView Original Performance optimization is one of the biggest
threats to your code.

You may be thinking, not another one of those people. I understand. Optimization
of any kind should clearly be a good thing, judging by its etymology, so
naturally, you want to be good at it.

Not just to set yourself apart from the crowd as a better developer. Not just to
avoid being “Dan” on The Daily WTF, but because you believe code optimization is
the Right Thing to Do™. You take pride in your work.

Computer hardware keeps getting faster, and software easier to make, but
whatever simple thing that you Just Want to Be Able to Do, Dammit always takes
longer than the last. You shake your head at this phenomenon (incidentally,
known as Wirth’s Law) and resolve to buck that trend.

That’s noble of you, but stop.

Just Stop!

You are in gravest danger of thwarting your own goals, no matter how experienced
you are at programming.

How so? Let’s back up.

First of all, what is code optimization?

Often, when we define it, we assume that we want code to perform better. We say
that code optimization is writing or rewriting code so a program uses the least
possible memory or disk space, minimizes its CPU time or network bandwidth, or
makes the best use of additional cores.

In practice, we sometimes default to another definition: Writing less code.

But the pre-emptively badass code you are writing with that goal is even more
likely to become a thorn in someone’s side. Whose? The next unlucky person who
has to comprehend your code, which may even be yourself. And someone smart and
capable, like you, can avoid self-sabotage: Keep your ends noble but re-evaluate
your means, despite the fact that they seem to be unquestionably intuitive.


So code optimization is a bit of a vague term. That’s before we even consider
some of the other ways in which one can optimize code, which we will below.

Let’s start by listening to the advice of the sages as we explore together
Jackson’s famous code optimization rules:

Don’t do it. (For experts only!) Don’t do it yet.
1. Don’t Do It: Channeling Perfectionism

I’m going to start with a rather embarrassingly extreme example from a time
when, long ago, I was just getting my feet wet in the wonderful,
have-your-cake-and-eat-it-too world of SQL. The problem was, I then stepped on
the cake and didn’t want to eat it anymore because it was wet and began to smell
like feet.


I was just getting my feet wet in the wonderful, have-your-cake-and-eat-it-too
world of SQL. The problem was, I then stepped on the cake…


Wait. Let me back out of this car wreck of a metaphor I just made and explain.

I was doing R&D for an intranet app, which I hoped would one day become a
completely integrated management system for the small business where I worked.
It would track everything for them, and unlike their then-current system, it
would never lose their data, because it would be backed by an RDBMS, not the
flaky home-grown flat file thing that other developer had used. I wanted to
design everything as smart as possible from the beginning because I had a blank
slate. Ideas for this system were exploding like fireworks in my mind, and I
started designing table—contacts and their many contextual variations for a CRM,
accounting modules, inventory, purchasing, CMS, and project management, which I
would soon be dogfooding.

That it all ground to a halt, development- and performance-wise, because of…you
guessed it, optimization.

I saw that objects (represented as table rows) could have many different
relationships to each other in the real world and that we could benefit from
tracking these relationships: We would retain more information and could
eventually automate business analysis all over the place. Seeing this as an
engineering problem, I did something that seemed like an optimization of the
system’s flexibility.

At this point, it’s important to look out for your face, because I will not be
held responsible if your palm hurts it. Ready? I created two tables:
relationship and one it had a foreign-key reference to, relationship_type.
relationship could refer to any two rows anywhere in the whole database, and
describe the nature of the relationship between them.


Oh, man. I had just optimized that flexibility so damn much.

Too much, in fact. Now I had a new problem: a given relationship_type would
naturally not make sense between every given combination of rows. While it might
make sense that a person had an employed by relationship to a company, that
could never be semantically equivalent to the relationship between, say, two
documents.

OK, no problem. We’ll just add two columns to relationship_type, specifying
which tables this relationship could be applied to. (Bonus points here if you
guess that I thought about normalizing this by moving those two columns to a new
table referring to relationship_type.id, so that relationships that could
semantically apply to more than one pair of tables would not have the table
names duplicated. After all, if I needed to change a table name and forgot to
update it in all applicable rows, it could create a bug! In retrospect, at least
bugs would have provided food for the spiders inhabiting my skull.)


Thankfully, I was knocked unconscious in a clue-stick storm before traveling too
far down this path. When I woke up, I realized I had managed to, more or less,
re-implement the internal foreign-key-related tables of the RDBMS on top of
itself. Normally I enjoy moments that end with me making the swaggering
proclamation that “I’m so meta,” but this, unfortunately, wasn’t one of them.
Forget failing to scale—the horrendous bloat of this design made the back-end of
my still-simple app, whose DB was hardly populated with any test data yet,
nearly unusable.


Let’s back up for a second and take a look at two of the many metrics at play
here. One is flexibility, which had been my stated goal. In this case, my
optimization, being architectural in nature, wasn’t even premature:


(We’ll get to it more in my recently published article, How to Avoid the Curse
of Premature Optimization.) Nonetheless, my solution failed spectacularly by
being far too flexible. The other metric, scalability, was one I wasn’t even
considering yet but managed to destroy at least as spectacularly with collateral
damage.

That’s right, “Oh.”


This was a powerful lesson to me of how optimization can go completely awry. My
perfectionism completely imploded: My cleverness had led me to produce one of
the most objectively un-clever solutions that I have ever made.

Optimize Your Habits, Not Your Code As you catch yourself tending to refactor
before you even have a working prototype and test suite to evidence its
correctness, consider where else you can channel this impulse. Sudoku and Mensa
are great, but maybe something that will actually benefit your project directly
would be better:

Security Runtime stability Clarity and style Coding efficiency Test
effectiveness Profiling Your toolkit/DE DRY (Don’t Repeat Yourself) But beware:
Optimizing the heck out of any particular one of these will come at the cost of
others. At the very least, it comes at the cost of time.

Here’s where it’s easy to see how much of an art there is in crafting code. For
any one of the above, I can tell you stories about how too much or too little of
it was thought to be the wrong choice. Who is doing the thinking here is also an
important part of the context.

For example, regarding DRY: At one job I had, I inherited a codebase that was at
least 80% redundant statements, because its author apparently was unaware of how
and when to write a function. The other 20% of the code was confusingly
self-similar.

I was tasked with adding a few features to it. One such feature would need to be
repeated throughout all of the code to be implemented, and any future code would
have to be carefully copypasta’d to make use of the new feature.

Obviously, it needed to be refactored just for my own sanity (high value) and
for any future developers. But, because I was new to the codebase, I first wrote
tests so that I could make sure my refactoring did not introduce any
regressions. In fact, they did just that: I caught two bugs along the way that I
would not have noticed among all the gobbledygook output the script produced.

In the end, I thought I had done pretty well. After the refactoring, I impressed
my boss with having implemented what had been considered a difficult feature
with a few simple lines of code; moreover, the code was overall an order of
magnitude more performant. But it wasn’t too long after this that the same boss
told me I had been too slow, and that the project should already have finished.
Translation: Coding efficiency was a higher priority.


Beware: Optimizing the heck out of any particular [aspect] will come at the cost
of others. At the very least, it comes at the cost of time.


I still think I took the right course there, even if the code optimization
wasn’t appreciated directly by my boss at the time. Without the refactoring and
tests, I think it would have taken longer to actually get correct—i.e., focusing
on coding speed would have actually thwarted it. (Hey, that’s our theme!)

Contrast this with some work I did on a small side project of mine. In the
project, I was trying a new template engine, and wanted to get into good habits
from the start, even though trying the new template engine was not the end-goal
of the project.

As soon as I noticed that a few blocks I had added were very similar to each
other, and furthermore, each block required referring to the same variable three
times, the DRY bell went off in my head, and I set out to find the right way to
do what I was trying to do with this template engine.

It turned out, after a couple of hours of fruitless debugging, that this was
currently not possible with the template engine in the way that I imagined. Not
only was there no perfect DRY solution; there wasn’t any DRY solution at all!

Trying to optimize this one value of mine, I completely derailed my coding
efficiency and my happiness, because this detour cost my project the progress I
could have had that day.

Even then, was I entirely wrong? Sometimes it’s worth a bit of investment,
particularly with a new tech context, to get to know best practices earlier
instead of later. Less code to rewrite and bad habits to undo, right?

No, I think it was unwise even looking for a way to reduce the repetition in my
code—in stark contrast to my attitude in the previous anecdote. The reason is
that context is everything: I was exploring a new piece of tech on a small play
project, not settling in for the long haul. A few extra lines and repetition
would not have hurt anyone, but the loss of focus hurt me and my project.

Wait, so seeking best practices can be a bad habit? Sometimes. If my main goal
were learning the new engine, or learning in general, then that would have been
time well spent: Tinkering, finding the limits, discovering unrelated features
and gotchas via research. But I had forgotten that this was not my main goal,
and it cost me.

It’s an art, like I said. And the development of that art benefits from the
reminder, Don’t do it. It at least gets you to consider which values are at play
as you work, and which ones are most important to you in your context.

What about that second rule? When can we actually optimize?

2. Don’t Do It Yet: Someone Has Already Done This

OK, whether by you or by someone else, you find your architecture has already
been set, the data flows have been thought out and documented, and it’s time to
code.

Let’s take Don’t do it yet a step even further: Don’t even code it yet.

This itself may smell like premature optimization, but it’s an important
exception. Why? To avoid the dreaded NIHS, or “Not Invented Here”
Syndrome—assuming that your priorities include code performance and minimizing
development time. If not, if your goals are completely learning-oriented, you
can skip this next section.

While it’s possible that people reinvent the square wheel out of sheer hubris, I
believe that honest, humble folks, like you and I, can make this mistake solely
by not knowing all the options available to us. Knowing every option of every
API and tool in your stack and keeping on top of them as they grow and evolve is
certainly a lot of work. But, putting in this time is what makes you an expert
and keeps you from being the zillionth person on CodeSOD to be cursed and mocked
for the trail of devastation left behind by their fascinating take on date-time
calculators or string manipulators.

Check Your Standard Library, Check Your Framework’s Ecosystem, Check for FOSS
That Solves Your Problem Already As an example, I was recently preparing to do
some analysis of AI strategies for a board game. I woke up one morning realizing
that the analysis I was planning could be done orders of magnitude more
efficiently if I simply used a certain combinatorics concept I remembered. Not
being interested in figuring out the algorithm for this concept myself at this
time, I was already ahead by knowing the right name to search for. However, I
found that after about 50 minutes of research and trying some preliminary code
out, I had not managed to turn the half-finished pseudo-code I had found into a
correct implementation. (Can you believe there’s a blog post out there where the
author assumes incorrect algorithm output, implements the algorithm incorrectly
to match the assumptions, commenters point this out, and then years later, it’s
still not fixed?) At that point, my morning tea kicked in, and I searched
for [name of concept] [my programming language]. 30 seconds later, I had
provably correct code from GitHub and was moving on to what I had actually
wanted to be doing. Just getting specific and including the language, instead of
assuming I would have to implement it myself, meant everything.

Time to Design Your Data Structure and Implement Your Algorithm

…again, do not play code golf. Prioritize correctness and clarity in real-world
projects.



OK, so you’ve looked, and there is nothing already solving your problem built
into your toolchain, or liberally licensed on the web. You roll out your own.

No problem. The advice is simple, in this order:

Design it so that it would be simple to explain to a novice programmer. Write a
test that fits the expectations produced by that design. Write your code so that
a novice programmer could easily glean the design from it. Simple, but perhaps
hard to follow. This is where coding habits and code smells and art and craft
and elegance come into play. There is obviously an engineering aspect to what
you are doing at this point, but again, do not play code golf. Prioritize
correctness and clarity in real-world projects.

If you like videos, here’s one of someone following the above steps, more or
less. For the video-averse, I’ll summarize: It’s an algorithm coding test at a
Google job interview. The interviewee first designs the algorithm in a way that
is easy to communicate. Before writing any code, there are examples of the
output expected by a working design. Then the code naturally follows.

As for the tests themselves, I know that in some circles, test-driven
development can be contentious. I think part of the reason why is that it can be
overdone, pursued religiously to the point of sacrificing development time.
(Again, shooting ourselves in the foot by trying to optimize even one variable
too much from the start.) Even Kent Beck doesn’t take TDD to such an extreme,
and he invented extreme programming and wrote the book on TDD. So start with
something simple to make sure your output is correct. After all, you would be
doing that manually after coding anyway, right? (My apologies if you’re such a
rockstar programmer that you don’t even run your code after first writing it. In
that case, maybe you would consider leaving your code’s future maintainers with
a test just so you know that they won’t break your awesome implementation.) So
instead of doing a manual, visual diff, with a test in place you are already
letting the computer do that work for you.

During the rather mechanical process of implementing your algorithms and data
structures, avoid making line-by-line optimizations, and don’t even think of
using a custom lower-level language extern (Assembly if you’re coding in C, C if
you’re coding in Perl, etc.) at this point. The reason is simple: If your
algorithm gets replaced entirely—and you won’t find out until later in the
process whether that’s needed—then your low-level optimization efforts will have
no effect in the end.

An ECMAScript Example On the excellent community code review site exercism.io, I
recently found an exercise that suggested explicitly to try either optimizing
for de-duplication or for clarity. I optimized for deduplication, just to show
how ridiculous things can get if you take DRY—an otherwise beneficial coding
mindset, as I mentioned above—too far. Here’s what my code looked like:

const zeroPhrase = "No more"; const wallPhrase = " on the wall"; const
standardizeNumber = number => { if (number === 0) { return zeroPhrase; } return
'' + number; } const bottlePhrase = number => { const possibleS = (number === 1)
? '' : 's'; return standardizeNumber(number) + " bottle" + possibleS + " of
beer"; } export default class Beer { static verse(number) { const nextNumber =
(number === 0) ? 99 : (number - 1); const thisBottlePhrase =
bottlePhrase(number); const nextBottlePhrase = bottlePhrase(nextNumber); let
phrase = thisBottlePhrase + wallPhrase + ", " + thisBottlePhrase.toLowerCase() +
".\n"; if (number === 0) { phrase += "Go to the store and buy some more"; } else
{ const bottleReference = (number === 1) ? "it" : "one"; phrase += "Take " +
bottleReference + " down and pass it around"; } return phrase + ", " +
nextBottlePhrase.toLowerCase() + wallPhrase + ".\n"; } static sing(start = 99,
end = 0) { return Array.from(Array(start - end + 1).keys()).map(offset => {
return this.verse(start - offset); }).join('\n'); } }

Hardly any duplication of strings there at all! By writing it this way, I’ve
manually implemented a form of text compression for the beer song (but only for
the beer song). What was the benefit, exactly? Well, let’s say you want to sing
about drinking beer out of cans instead of bottles. I could accomplish this by
changing one single instance of bottle to can.

Nice!

…right?

Nope, because then all the tests break. OK, that’s easy to fix: we’ll just do a
search and replace for bottle in the unit test spec. And that is exactly as easy
to do as doing that to the code itself in the first place and carries the same
risks of breaking things unintentionally.

Meanwhile, my variables will be strangely named afterward, with things like
bottlePhrase not having anything to do with bottles at all. The only way to
avoid this is to have foreseen exactly the type of change that would be made and
used a more generic term like vessel or container in place of bottle in my
variable names.

The wisdom of future-proofing in this way is pretty questionable. What are the
odds you’ll want to change anything at all? And if you do, will what you change
work out so conveniently? In the bottlePhrase example, what if you want to
localize into a language that has more than two plural forms? That’s right,
refactor time, and the code may look even worse afterward.

But when your requirements do change, and you’re not just trying to anticipate
them, then maybe it is time to refactor. Or maybe you can still put it off: How
many vessel types or localizations will you be adding, realistically? Anyway,
when you need to balance your deduplication with clarity, it’s well worth
watching this demonstration by Katrina Owen.

Back to my own ugly example: Needless to say, the benefits of deduplication
aren’t even being realized here all that much. Meanwhile, what did it cost?

Aside from taking longer to write in the first place, it’s now quite a bit less
trivial to read, debug, and maintain. Imagine the readability level with a
moderate amount of duplication allowed. For example, having each of the four
verse variations spelled out.

But We Still Haven’t Optimized! Now that your algorithm is implemented, and you
have proven its output to be correct, congratulations! You have a baseline!

Finally, it’s time to…optimize, right? Nope, still Don’t do it yet. It’s time to
take your baseline and do a nice benchmark. Set a threshold for your
expectations around this and stick it in your test suite. Then if something
suddenly makes this code slower—even if it still works—you’ll know before it
goes out the door.

Still hold off on optimization, until you have a whole piece of the relevant
user experience implemented. Until that point, you may be targeting an entirely
different part of the code than you need to.

Go finish your app (or component), if you haven’t already, setting all your
algorithmic benchmark baselines as you go.

Once this is done, this is a great time to create and benchmark end-to-end tests
covering the most common real-world usage scenarios of your system.

Maybe you’ll find that everything is fine.

Or maybe you’ve determined that, in its real-life context, something is too slow
or takes too much memory.

OK, Now You Can Optimize There’s only one way to be objective about it. It’s
time to break out flame graphs and other profiling tools. Experienced engineers
may or may not guess better more often than novices, but that’s not the point:
The only way to know for sure is to profile. This is always the first thing to
do in the process of optimizing code for performance.

You can profile during a given end-to-end test to get at what will really make
the largest impact. (And later, after deploying, monitoring usage patterns is a
great way to stay on top of which aspects of your system are the most relevant
to measure in the future.)

Note that you are not trying to use the profiler right to its full depth—you’re
looking more for function-level profiling than statement-level profiling,
generally, because your goal at this point is only to find out which algorithm
is the bottleneck.

Now that you’ve used profiling to identify your system’s bottleneck, now you can
actually attempt to optimize, confident that your optimization is worth doing.
You can also prove how effective (or ineffective) your attempt was, thanks to
those baseline benchmarks you did along the way.

Overall Techniques First, remember to stay high-level as long as possible:


Did you know? The ultimate universal optimization trick, applies in all cases:

- Draw less stuff

- Update less stuff


— Lars Doucet (@larsiusprime) March 30, 2017 At the whole-algorithm level, one
technique is strength reduction. In the case of reducing loops to formulas,
though, be mindful of leaving comments. Not everybody knows or remembers every
combinatorics formula. Also, be careful with your use of math: Sometimes what
you think might be strength reduction is not, in the end. For example, let’s
suppose that x * (y + z) has some clear algorithmic meaning. If your brain has
been trained at some point, for whatever reason, to automatically un-group like
terms, you might be tempted to rewrite that as x * y + x * z. For one thing,
this puts a barrier between the reader and the clear algorithmic meaning that
had been there. (Worse yet, it’s now actually less efficient because of the
extra multiplication operation required. It’s like loop unrolling just caked its
pants.) In any case, a quick note about your intentions would go a long way, and
might even help you see your own error before you commit it.

Whether you’re using a formula or just replacing a loop-based algorithm with
another loop-based algorithm, you’re ready to measure the difference.

But maybe you can get better performance simply by changing your data structure.
Educate yourself on the performance difference among the various operations you
need to do on the structure you’re using, and on any alternatives. Maybe a hash
looks a bit messier to work within your context, but is the superior search time
worth it over an array? These are the types of trade-offs it’s up to you to
decide about.

You may notice that this boils down to knowing which algorithms are being
executed on your behalf when you call a convenience function. So it’s really the
same thing as strength reduction, in the end. And knowing what your vendor’s
libraries are doing behind the scenes is crucial not just for performance but
also for avoiding unintentional bugs.

Micro-Optimizations OK, your system’s functionality is done, but from a UX point
of view, performance could be fine-tuned a bit further. Assuming you’ve done all
you can higher up, it’s time to consider the optimizations we’ve been avoiding
the entire time up until now. Consider, because this level of optimization is
still a trade-off against clarity and maintainability. But you’ve decided it’s
time, so go ahead with statement-level profiling, now that you’re within the
context of the whole system, where it actually matters.

Just like with the libraries you use, countless engineering hours have been put
in for your benefit at the level of your compiler or interpreter. (After all,
compiler optimization and code generation are huge topics all their own). This
is even true at the processor level. Trying to optimize code without being aware
of what’s happening on the lowest levels is like thinking that having four-wheel
drive implies that your vehicle can also stop more easily.

It’s hard to give good generic advice beyond that because it really depends on
your tech stack and what your profiler is pointing at. But, because you are
measuring, you’re already in an excellent position to ask for help, if solutions
don’t organically and intuitively present themselves to you from the problem
context. (Sleep and time spent thinking about something else can also help.)

At this point, depending on the context and scaling requirements, Jeff Atwood
would probably suggest simply adding hardware, which can be cheaper than
developer time.

Maybe you don’t go that route. In that case, it may help to explore various
categories of code optimization techniques:

More specifically:

In any case, I do have some more Don’ts for you:

Don’t reuse a variable for multiple distinct purposes. In terms of
maintainability, this is like running a car without oil. Only in the most
extreme embedded situations did this ever make sense, and even in those cases, I
would argue that it no longer does. This is the job of the compiler to organize.
Do it yourself, then move one line of code, and you’ve introduced a bug. Is the
illusion of saving memory worth that to you?

Don’t use macros and inline functions without knowing why. Yes, function call
overhead is a cost. But avoiding it often makes your code harder to debug, and
sometimes actually makes it slower. Using this technique everywhere just because
it’s a good idea once in a while is an example of a golden hammer.

Don’t hand-unroll loops. Again, this form of loop optimization is something
almost always better optimized by an automated process like compilation, not by
sacrificing your code’s readability.

The irony in the last two code optimization examples is that they can actually
be anti-performant. Of course, since you’re doing benchmarks, you can prove or
disprove that for your particular code. But even if you see a performance
improvement, return to the art side, and see whether the gain is worth the loss
in readability and maintainability.

It’s Yours: Optimally Optimized Optimization

Attempting performance optimization can be beneficial. More often than not,
though, it is done very prematurely, carries with it a litany of bad
side-effects, and most ironically, leads to worse performance. I hope you have
come away with an expanded appreciation for the art and science of optimization
and, most importantly, its proper context.

I’m happy if this helps us to cast off the notion of writing perfect code from
the start and to write correct code instead. We must remember to optimize from
the top down, prove where the bottlenecks lie, and measure before and after
fixing them. That’s the optimal, optimum strategy to optimize optimization. Best
of luck.

Understanding the Basics

What is meant by software optimization? Software optimization can refer to many
aspects of a piece of software, such as flexibility, maintainability, or
performance. However, performance is usually implied.
