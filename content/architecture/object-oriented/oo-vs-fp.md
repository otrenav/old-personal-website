+++
draft = true
+++

https://blog.cleancoder.com/uncle-bob/2014/11/24/FPvsOO.html

OO vs FP
24 November 2014
A friend of mine posted the following on facebook. He meant it as a troll; and it worked, because it irked me.

There are many programmers who have said similar things over the years. They consider Object Orientation and Functional Programming to be mutually exclusive forms of programming. From their ivory towers in the clouds some FP super-beings occasionally look down on the poor naive OO programmers and cluck their tongues.

That clucking is echoed by the OO super-beings in their ivory towers, who look askance at the waste and parentheses pollution of functional languages.

These views are based on a deep ignorance of what OO and FP really are.

Let me make a few points:

OO is not about state.

Objects are not data structures. Objects may use data structures; but the manner in which those data structures are used or contained is hidden. This is why data fields are private. From the outside looking in you cannot see any state. All you can see are functions. Therefore Objects are about functions not about state.

When objects are used as data structures it is a design smell; and it always has been. When tools like Hibernate call themselves object-relational mappers, they are incorrect. ORMs don’t map relational data to objects; they map relational data to data structures. Those data structures are not objects.

Objects are bags of functions, not bags of data.

Functional Programs, like OO Programs, are composed of functions that operate on data.

Every functional program ever written is composed of a set of functions that operate on data. Every OO program ever written is composed of a set of functions that operate on data.

It is common for OO programmers to define OO as functions and data bound together. This is true so far as it goes; but then it has always been true irrespective of OO. All programs are functions bound to data.

You might protest and suggest that it is the manner of that binding that matters. But think about it. That’s silly. Is there really so much difference between f(o), o.f(), and (f o)? Are we really saying that the difference is just about the syntax of a function call?[0]

The Differences
So what are the differences between OO and FP? What does OO have that FP doesn’t, and what does FP have that OO doesn’t?

FP imposes discipline upon assignment.

A true functional programming language has no assignment operator. You cannot change the state of a variable. Indeed, the word “variable” is a misnomer in a functional language because you cannot vary them.

Yes, I know, Funcitonal Programmers often say hi-falutin’ things like “Functions are first-class objects in functional languages.” That may be true; but functions are first-class objects in Smalltalk, and Smalltalk is an OO language, not a functional language.

The overriding difference between a functional language and a non-functional language is that functional languages don’t have assignment statements.[1]

Does this mean that you can never change the state of something in a functional language? No, not at all. Functional languages generally offer ceremonies that you can perform in order to change the state of something. F# allows you to declare “mutable variables” for example. Clojure allows you to create special, uh, objects who’s values can be changed using various magic incantations.

The point is that a functional language imposes some kind of ceremony or discipline on changes of state. You have to jump through the right hoops in order to do it.

And so, for the most part, you don’t.

OO imposes discipline on function pointers.

“Huh?” you say. But that, in fact, is what OO comes down to. For all the hi-falutin’ rhetoric about OO and “real-world objects” and “programming closer to the way we think”, what OO really comes down to is that OO languages replace function pointers with convenient polymorphism. [2]

How do you implement polymorphism? You implement it with function pointers. OO languages simply do that implementation for you, and hide the function pointers from you. This is nice because function pointers are very difficult to manage well. Trying to write polymorphic code with function pointers (as in C) depends on complex and inconvenient conventions that everyone must follow in every case. This is usually unrealistic.

In Java, every function you call is polymorphic. There is no way you can call a function that is not polymorphic. And that means that every java function is called indirectly through a pointer to a function.[3]

If you wanted polymophism in C, you’d have to manage those pointers yourself; and that’s hard. If you wanted polymorphism in Lisp you’d have to manage those pointers yourself (pass them in as arguments to some higher level algorithm (which, by the way IS the Strategy pattern.)) But in an OO language, those pointers are managed for you. The language takes care to initialize them, and marshal them, and call all the functions through them.

Mutually Exclusive?
Are these two disciplines mutually exclusive? Can you have a language that imposes discipline on both assignment and pointers to functions? Of course you can. These two things don’t have anything to do with each other. And that means that OO and FP are not mutually exclusive at all. It means that you can write OO-Functional programs.

It also means that all the design principles, and design patterns, used by OO programmers can be used by functional programmers if they care to accept the discipline that OO imposes on their pointers to functions.

But why would a functional programmer do that? What benefit does polymorphism have that normal Functional Programs don’t have? By the same token, what benefit would OO programmers gain from imposing discipline on assignment?

Benefits of Polymorphism.
There really is only one benefit to Polymorphism; but it’s a big one. It is the inversion of source code and run time dependencies.

In most software systems when one function calls another, the runtime dependency and the source code dependency point in the same direction. The calling module depends on the called module. However, when polymorphism is injected between the two there is an inversion of the source code dependency. The calling module still depends on the called module at run time. However, the source code of the calling module does not depend upon the source code of the called module. Rather both modules depend upon a polymorphic interface.

This inversion allows the called module to act like a plugin. Indeed, this is how all plugins work.

Plugin architectures are very robust because stable high value business rules can be kept from depending upon volatile low value modules such as user interfaces and databases.

The net result is that in order to be robust a system must employ polymorphism across significant architectural boundaries.

Benefits of Immutability
The benefit of not using assignment statements should be obvious. You can’t have concurrent update problems if you never update anything.

Since functional programming languages do not have assignment statements, programs written in those languages don’t change the state of very many variables. Mutation is reserved for very specific sections of the system that can tolerate the high ceremony required. Those sections are inherently safe from multiple threads and multiple cores.

The bottom line is that functional programs are much safer in multiprocessing and multiprocessor environments.

The Deep Philosophies
Of course adherents to both Object Orientation and Functional Programming will protest my reductionist analysis. They will contend that there are deep philosophical, psychological, and mathematical reasons why their favorite style is better than the other.

My reaction to that is: Phooey!

Everybody thinks their way is the best. Everybody is wrong.

What about Design Principles, and Design Patterns?
The passage at the start of this article that irked me suggests that all the design principles and design patterns that we’ve identified over the last several decades apply only to OO; and that Functional Programming reduces them all down to: functions.

Wow! Talk about being reductionist!

This idea is bonkers in the extreme. The principles of software design still apply, regardless of your programming style. The fact that you’ve decided to use a language that doesn’t have an assignment operator does not mean that you can ignore the Single Responsibility Principle; or that the Open Closed Principle is somehow automatic. The fact that the Strategy pattern makes use of polymorphism does not mean that the pattern cannot be used in a good functional language[4].

The bottom, bottom line here is simply this. OO programming is good, when you know what it is. Functional programming is good when you know what it is. And functional OO programming is also good once you know what it is.

[0] I imagine there are a few python programmers who might have something to say about that.
[1] This, of course, means that Scala is not a “true” functional language.
[2] This, of course, means that C++ is not a “true” OO language.
[3] Yeah, don’t say it, I know. OK, an “analog” to a pointer to a function. (sigh).
[4] A good functional language is one that allows for convenient polymorphism. Clojure is a good example.

https://blog.cleancoder.com/uncle-bob/2018/04/13/FPvsOO.html

FP vs. OO
13 April 2018
Over the last several years I have paired with people learning Functional Programming who have expressed an anti-OO bias. This usually comes in the form of statements like: “Oh, that’s too much like an Object.”

I think this comes from the notion that FP and OO are somehow mutually exclusive. Many folks seem to think that a program is functional to the extent that it is not object oriented. I presume this opinion comes as a natural consequence of learning something new.

When we take on a new technique, we often tend to eschew the old techniques we used before. This is natural because we believe the new technique to be “better” and therefore the old technique must be “worse”.

In this blog I will make the case that while OO and FP are orthogonal, they are not mutually exclusive. That a good functional program can (and should) be object oriented. And that a good object oriented program can (and should) be functional. But to accomplish this goal we are going to have to define our terms very carefully.

What is OO?
I am going to take a very reductionist stance here. There are many valid definitions of OO that cover a rich set of concepts, principles, techniques, patterns, and philosophies. I am going to ignore all of that here and focus on nuts and bolts. The reason for this reductionism is that all the richness surrounding OO is actually not specific to OO at all; but is part of the richness of software development overall. Here, I will focus on that part of OO that is definitive and inextricable.

Consider these two expressions:

1: f(o);
2: o.f();

What is the difference?

Clearly there is no actual semantic difference. The difference is entirely in the syntax. But one looks procedural and the other looks object oriented. This is because we have come to infer a special semantic behavior for expression 2. that we do not infer for expression 1. The special semantic behavior is: polymorphism.

When we see expression 1. we see a function named f being called upon an object named o. We infer that there is only one such function named f, and that it may not be a member of the standard cohort of functions, if any, that surrounds o.

On the other hand, when we see expression 2. we see an object named o being sent the message named f. We expect that there may be other kinds of objects that can accept the message f and that therefore we do not know which particular f behavior is actually being invoked. The behavior is dependent upon the type of o. i.e. f is polymorphic.

This expectation of polymorphism is the essence of OO programming. It is the reductionist definition; and it is inextricable from OO. OO without polymorphism is not OO. All of the other attributes of OO, such as encapsulated data, and methods bound to that data, and even inheritance, are more related to expression 1. than to expression 2.

C and Pascal programmers (and to some extend even Fortran, and Cobol programmers) have always created systems of encapsulated functions and data structures. It does not require an OOPL to create and use such encapsulated structures. Encapsulation, and even simple inheritance, is obvious and natural in such languages. (More natural in C and Pascal than the others.)

So the thing that truly differentiates OO programs from non-OO programs is polymorphism.

You might complain about this by saying that polymorphism can be achieved by using switch statements or long if/else chains within f. This is true, so I must add one more constraint to OO.

The mechanism of polymorphism must not create a source code dependency from the caller to the callee.

To explain this, look again at the two expressions. Expression 1: f(o), seems to have a source code dependency upon the function f. We infer this because we also infer that there is only one f and so the caller must know the callee.

However, when we look at Expression 2. o.f() we infer something different. We know that there may be many implementations of f, and we don’t know which of those f functions is really going to be called. Therefore the source code containing Expression 2 does not have a source code dependency upon the function being called.

In concrete terms this means that modules (source files) that contain polymorphic calls to functions must not reference, in any way, modules (source files) that contain the implementations of those functions. There can be no include or use or require or any other such declaration that causes one source file to depend upon another.

So our reductive definition of OO is:

The technique of using dynamic polymorphism to call functions without the source code of the caller depending upon the source code of the callee.

What is FP?
Again, I am going to be very reductive. FP has a rich history and tradition that goes back well beyond software. There are principles, techniques, theorems, philosophies, and concepts that pervade the paradigm. I am going to ignore all of that and drive straight to the bottom, inextricable attribute that separates FP from any other style. And it is, simply, this:

f(a) == f(b) when a == b.

In a functional program, every time you call a particular function with a particular value, you will get the same result; no matter how long the program has been executing. This is sometimes called referential transparency.

The implication of this is that function f must not change any global state that affects the way function f behaves. What’s more, if we say that function f represents all functions in the system – that all functions in the system must be referentially transparent – then no function in the system can change any global state at all. No function in the system can do anything that will cause another function in the system to return a different value from the same inputs.

The deeper implication of this is that no named value can ever be changed. That is, there can be no assignment operator.

Now if you think about this very carefully you might come to the conclusion that a program composed of nothing but referentially transparent functions can do nothing at all – since any useful system behavior changes the state of something; even if it is just the state of the printer or display. However, if we exclude the hardware, and any elements of the outside world, from our referential transparency constraint, then it turns out that we can create very useful systems indeed.

The trick, of course, is recursion. Consider a function that takes a state data structure as its argument. This argument contains all the state information that the function uses for its work. When the work is done the function creates a new state data structure with updated values. As its last act, the function calls itself with the new state structure.

This is just one of the simple tricks that a functional program can use to track changes in internal state without appearing to actually change any internal state[1].

So, the reductive definition of functional programming is:

Referential Transparency – no reassignment of values.

FP vs OO
By how I have both the OO and the FP communities gunning for me. Reductionism is not a good way to win friends. But it is sometimes useful. In this case, I think it is useful to shine some light on the FP vs OO meme that seems to be circulating.

It seems clear that the two reductive definitions I have chosen are completely orthogonal. Polymorphism and Referential Transparency have nothing, whatever, to do with each other. There is no intersection between them.

But orthogonality does not imply mutual exclusion (just ask James Clerk Maxwell). It is perfectly possible to build a system that employs both dynamic polymorphism and referential transparency. Not only is it possible, it is desirable!

Why is it desirable? For precisely the same reasons that the two aspects are desirable alone! We desire systems built with dynamic polymorphism because they are strongly decoupled. Dependencies can be inverted across architectural boundaries. They are testable using Mocks and Fakes and other kinds of Test Doubles. Modules can be modified without forcing changes to other modules. This makes such systems much easier to change and improve.

We also desire systems that are built with referential transparency because they are predictable. The inability to change internal state makes systems much easier to understand, to change, and to improve. It drastically reduces the chances of race conditions and other concurrent update problems.

The bottom line is:

There is no FP vs OO.

FP and OO work nicely together. Both attributes are desirable as part of modern systems. A system that is built on both OO and FP principles will maximize flexibility, maintainability, testability, simplicity, and robustness. Excluding one in favor of the other can only weaken the structure of a system.

[1] Since we are using machines with Von Neumann architectures, we must assume that there are memory cells that actually are changing state. In the recursive mechanism I described; tail call optimization will prevent new stack frames from being created, and will reuse the original stack frame instead. But this violation of referential transparency is (usually) entirely hidden and irrelevant.

https://blog.cleancoder.com/uncle-bob/2012/08/24/functional-programming-for-the-object-oriented-programmer.html

Functional Programming for the Object Oriented Programmer
24 August 2012
This book, written by Brian Marick, is important. Indeed, it may be necessary. We need something to bridge the gap between the huge population of OO programmers, and the growing need for functional programmers. I’ve seen nothing else that fills this need so well.

I read a lot of books, but few are so competently written. I’m a hundred pages in and I’m loving it. If you are a Java, C#, C++, Ruby, or Python programmer, and you are wondering what all this functional programming noise is about, this is the book for you.

First, the book is a pleasure to read. Marick’s style is witty, wry, informal and, best of all, terse. His code examples are straightforward and well conceived. He makes his points quickly, and then he gets on with the next topic. There’s no dawdling. He respects his reader by unapologetically covering a lot of ground in a short time. He provides a few salient exercises at the end of each chapter, and then moves right on. The book is a challenging read; but not a challenge to read.

The title says it all; and the pedagogical approach is ingenious. What better way to explain and expose functional programming to an OO programmer than to build an object system in a functional language? And what better language to build such an object system than Clojure? Not only will you learn a lot about functional programming in terms that make it easy to understand; you’ll also learn a lot about OO that you may not have known before.

Marick realized that most of his readers won’t know a functional language. So he chose the simplest one to learn. He also realized that teaching the language would distract from the purpose of the book. So he strikes a brilliant compromise: He presents the barest minimum of the language he can get by with, and then gets right on with the business of describing functional programming. The technique is very effective; though many Clojure programmers will find the language primitives he constrains himself to a wee bit frustrating.

Is there anything bad about the book? Yes; It’s not done. Marick published it on Leanpub.com and has been writing chapters over the last many months. Since the book isn’t really finished, there are a few typos here and there; and there’s a sense of a ragged end where unwritten pieces may be needed to fill some gaps. But I haven’t found this to be at all distracting so far.

My recommendation is to buy this book now. You can get it here. There’s a slider that allows you to choose the price you want to pay for the book. You should slide it all the way over to the right, like I did, and pay the $30 – it’s more than worth it.
