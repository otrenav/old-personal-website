+++
draft = true
+++

http://blogs.tedneward.com/post/reclaiming-design-patterns/

Reclaiming Design Patterns (20 Years Later)
Posted on Mar 25, 2016 #Development Processes #Functional #Industry #Reading #Patterns #Java #Scala #Groovy #Clojure #Kotlin #C# #F# #Visual Basic #Go #C++ #Swift #Objective-C #Haskell #Ruby #Python #JavaScript #Erlang #Elixir #Elm
tl;dr 20 years ago, the “Gang of Four” published the seminal work on design patterns. Written to the languages of its time (C++ and Smalltalk), and written using the design philosophies of the time (stressing inheritance, for example), it nevertheless spawned a huge “movement” within the industry. Which, as history has shown us, was already the hallmark of its doom—anything that has ever become a “movement” within this industry eventually disappoints and is burned at the public-relations stake when it fails to deliver on the overhyped promises that it never actually made. It’s time to go back, re-examine the 23 patterns (and, possibly, a few variants) with a fresh set of eyes, match them up against languages which have had 20 years to mature, and see what emerges. (Spoiler alert: all of the original 23 hold up pretty well, and there’s a lot of nuance that I think we missed the first time around.)

Patterns: What were they for, exactly?
In the early days of the patterns “movement”, when the patterns were new and fresh, we didn’t spend much time really discussing this all that much. They just were; those of us who read the book nodded at a few of them, having experienced them before in code “in the wild”, and we went on about our day. Intuitively, it seemed, we realized that there were places where we could apply this knowledge, we appreciated the new dimensions the patterns opened inside our heads, and… yeah, cool.

The Gang of Four (GOF) seemed to realize from the beginning that this was a subtle art/science; in the last chapter of the book (which nobody ever seemed to read, unfortunately), they said:

It’s possible to argue that this book hasn’t accomplished much. After all, it doesn’t present any algorithms or programming techniques that haven’t been used before. It doesn’t give a rigorous method for designing systems, nor does it develop a new theory of design—–it just documents existing designs. You could conclude that it makes a reasonable tutorial, perhaps, but it certainly can’t offer much to an experienced object-oriented designer.

And in truth, that was the case: it hadn’t accomplished much. One guy with whom I taught at DevelopMentor called Design Patterns “23 ways to use a pointer”. What was the big deal?

And similarly, when management/senior team leads/architects threw a copy of the book at junior developers, expecting that they could read the book and suddenly “level up”, they were profoundly disappointed.

The benefits, it seemed, were more subtle:

We hope you think differently. Cataloging design patterns is important. It gives us standard names and definitions for the techniques we use. If we don’t study design patterns in software, we won’t be able to improve them, and it’ll be harder to come up with new ones.

Certainly, the GOF book spawned a movement, and the patterns movement spawned a whole catalog of patterns beyond the original 23 that the GOF came up with. But then things started getting even more abstract and high-level; patterns became “pattern languages” and that in turn spawned “meta-patterns”. Then people started documenting the negative, calling them “anti-patterns”.

Once people started realizing that there was money to be made, the writing was on the wall.

Various book vendors started publishing “patterns” books that barely touched on the GOF’s original model. Patterns books became synonymous with “reusable code” (instead of “reusable elements of design”). IDE vendors started looking for ways to incorporate patterns as code generators. Patterns somehow also became the provice of UML and other design notations, and the goal at one point was to figure out how to create reusable design templates in UML that corresponded to patterns.

Like so many things, patterns became trendy and attractive to people who had no idea what they were for. How could they ever have actually met those peoples’ expectations?

By the mid-2000s, patterns became a bad word, and speakers started essentially “trashing” patterns, suggesting that somehow they were an artifact of “bad languages” and “primitive thnking” and “subsumed into good languages”.

Patterns were clearly useless.

And yet… they keep appearing. We keep using their terms and lingo. Why? The GOF actually (in that same chapter at the back of the book) called it back in 1995:

“Design patterns provide a common vocabulary for designers to use to communicate, document, and explore design alternatives. Design patterns make a system seem less complex by letting you talk about it at a higher level ofabstraction than that of a design notation or programming language. Design patterns raise the level at which you design and discuss design with your colleagues.” (p389)

and

“Knowing the design patterns in this book makes it easier to understand existing systems. … People learning object-oriented programming often complain that the systems they’re working with use inheritance in convoluted ways and that it’s difficult to follow the flow of control. In large part this is because they do not understand the design patterns in the system. Learning these design patterns will help you understand existing object-oriented systems.” (p389)

and

“Design patterns provide a way to describe more of the “why” of a design and not just record the results of your decisions. The Applicability, Consequences, and Implementation sections of the design patterns help guide you in the decisions you have to make.”

and

“One of the problems in developing reusable software is that it often has to be reorganized or refactored [OJ90]. Design patterns help you determine how to reorganize a design, and theycan reduce the amount of refactoring you need to do later.”

(Yep, they were talking about refactoring long before it became hip.)

Most of all, they actually predicted the very problem that would be the downfall of patterns as a whole:

“It’s easiest to see a pattern as a solution, as a technique that can be adapted and reused. It’s harder to see when it is appropriate—–to characterize the problems it solves and the context in which it’s the best solution. In general, it’s easier to see what someone is doing than to know why, and the “why” for a pattern is the problem it solves. Knowing the purpose of a pattern is important too, because it helps us choose patterns to apply. It also helps us understand the design of existing systems. A pattern author must determine and characterize the problemthat the pattern solves, even if you have to do it after you’vediscovered its solution.” (p393)

Too many short-sighted people saw the “solution”, and in their rush to find reusable code, they forgot (or chose not) to learn the “why”, and as a result ended up making some very stupid—and easily preventable—mistakes.

What is a pattern?
There’s been a lot of discussion on this over the yeas, but I’m going to keep this down to a single sentence:

A pattern is a solution to a problem within a certain context that has a set of predictable consequences.

That’s all it is. There’s nothing magical, mysterious, or super-academic about it. If you can describe all four parts of that tuple, you have a pattern. Write it down. Publish it somewhere. When we start seeing some similarities between us all, we can start to see what the commonality is and then give it a nice well-chosen name, and it can join the general lexicon.

The Gang of Four published 23 of them. There’s a lot more out there. Most are actually pretty useful. But particularly the first 23, because they stretch across a ton of different languages. (The patterns community later came to the terminology of an “idiom”, which was something that was language-specific. Thus, the “Resource Acquisition Is Initialization” (RAII) idea from C++ was more-or-less tied to C++ as an idiom, and didn’t really qualify as a pattern, per se.)

Why are we arguing again?
The last sentence, however, brings up another important point: Too much of the patterns community spent too much time arguing about them, and whether a given thing was a pattern or not, or whether a particular code snippet was an implementation of this pattern or that pattern, or….

There’s several thoughts at work here:

The exercise of philosophical debate around a pattern’s composition is important to the benefit they provide. This was why the patterns community said things like “It’s not a pattern until it’s been discovered three times” and “A pattern isn’t really a pattern unless it’s been workshopped at a patterns conference”. The point wasn’t to add some kind of mystery or intrigue or make them solely the provice of those “in the know”; the point was to debate them in a philosophical matter to refine the pattern to its essence, and keep the quality high. But once people start saying, “Pfffft” and avoided those critical steps, then suddenly everything became a pattern. If suddenly we can start calling local variables a “pattern”, then the whole point of designing a higher-level toolbox of terms becomes lost. If anybody can call anything a “pattern”, then we have everybody calling everything a pattern, and patterns lose their efficacy in conversation. If patterns are somehow localized to the team they were ‘born” on, then now I cannot converse with anybody outside of my team. Science has a rigor to it (in particular, the peer-review portions) for a reason, and that rigor was what the patterns community tried to bring.
Which pattern happens to be in use here is a subject of philosophical debate. LOTS of people got hung up on arguing with other members of the team over what kind of pattern some code was. I cannot imagine a more useless activity, unless the discussion led to new insights (a new application of it, or a new “angle” to it) around said pattern. We burned a lot of goodwill by arguing with people over this.
Patterns were not the be-all/end-all of good design. You can have a good design that doesn’t fit an established pattern. Pattern snobs needed to stop putting a qualitative judgment around those who weren’t pattern snobs.
In the end, we patterns snobs probably brought the downfall upon our own heads, but we had help.

Time to take them back
So I figure it’s time, 20 years later, to start the discussion all over again. I don’t imagine that I can rebuild the entire movement on my own, but at the very least, I can take the old prose, dust it off, and look to bring it into the 21st Century and the languages that we use. There’s also probably a few more patterns that we’ve found along the way, and where I think they fit, I’ll take a stab at a few and put them up for people to consider and workshop. (Or, rather, more of a “mob-shop”, since a weblog isn’t really a workshop setting.)

Over the next n months, I’m going to put up the original 23 patterns re-cast for the “modern world”. I’ll do a quick recap of the pattern, but cast into the form I prefer (Problem/Solution/Context/Consequences). I deliberately won’t spend a whole lot of time trying to re-describe all the prose from the book—that would be copyright infringement, in my mind, and I not only want to steer clear of that, but I really do want to encourage people to buy a copy of it for themselves, do their own reading, and debate whether my interpretation is legitimate and/or reasonable. Then, I’m going show how a few languages can implement them, and I’m going to range pretty freely over a bunch of different languages: C++, C#, Java, Swift, F#, Scala, JavaScript, and a few others. I encourage you to comment and post suggestions/amendments/corrections. I’m definitely not the smartest person in the world, and certainly not the last word on how to apply certain language idioms to a particular problem. Plus, I’d love to see us collectively flesh out some implementations around these patterns across all the popular (and maybe a few less popular, just for educational purposes!) languages.

It’ll take time, so bear with me. I’ll post another blog entry with the details soon, but in the meantime, if you haven’t done so in a while, take down your copy of GOF, dust it off, and crack open to the first chapter.
