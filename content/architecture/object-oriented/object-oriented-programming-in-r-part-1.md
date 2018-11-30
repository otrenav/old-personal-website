+++
title = "Object Oriented Programming in R, Part 1: The Basics"
image = "/img/content/object-oriented-programming-in-r/main-part-1.png"
slug = "object-oriented-programming-in-r-part-1"
date = "2018-02-12"
draft = false
tags = [
    "R",
    "Series",
    "Object-Oriented Programming"
]
promotion = "promotions/r-programming-by-example"
+++

The main purpose of object-oriented programming (OOP) is to efficiently manage
complexity. It is a way of organizing code and data such that you can develop
well delimited abstractions with controlled dependencies such that you can
evolve a complex system in a controlled manner. R has various object models,
also known as object-oriented systems, so OOP in R can be a bit intimidating at
first. The goal of this series of posts is to help you understand how to
implement the basic building blocks of object-oriented programs in R.

"Part 1: The Basics" (this post) goes into OOP basics. The upcoming posts in
this series sill show how to build a basic example with the three different
object models we will discuss in the series. As I finish them during the next
couple of days, I'll publish them in [my personal website][personal-website].

For a more in-depth treatment of this topic as well as others, you may want to
look at my recent book ["R Programming by Example"][book] published by
[Packt][packt]. If you do, please publish your opinion about it in the book's
page. I really appreciate it, and every comment can go a long way. Also, if you
have any questions or feedback, please don't hesitate to contact me.

[1]: /posts/object-oriented-programming-in-r-1
[2]: /posts/object-oriented-programming-in-r-2
[3]: /posts/object-oriented-programming-in-r-3
[4]: /posts/object-oriented-programming-in-r-4
[book]: http://links.otrenav.com/r-programming-by-example
[packt]: https://packtpub.com
[personal-website]: https://otrenav.com

## What is object-oriented programming (OOP)?

As mentioned before, OOP is a programming technique whose purpose is to manage
complexity efficiently with the use of abstractions. In OOP, abstractions are
called *objects* and they offer "behavior" in response to "messages". The
"behavior" they offer to other objects is catalogued in an *interface* which is
implemented in these object's *public methods*. Objects request "behavior" from
other objects, and when they do, they are are said to depend on them. The
"messages" sent between all these objects and the associated behavior is what
makes an object-oriented system useful.

Before we go any further, let's explain more about these concepts. An *object*
is an entity in abstract form. For example, integers, cars, dogs, buildings,
credit cards, and cryptocurrencies, could all be objects in an object-oriented
system. An object is a well defined idea of something, and different kinds of
objects have different kinds of behavior associated with them. For example, the
idea of an integer is not associated to any specific number, just as the idea of
a car is not associated with any specific model or brand. However, an *instance*
of an integer has a specific value attached to it, just as an *instance* of a
car has a specific model and brand. For those familiar with statistics, think of
a random variable as an *object*, and a realization of that random variable as
an *instance*.

OOP is a way of thinking of programs as interactions among objects instead of
steps through an algorithm. For the algorithmically inclined, you can still
understand an object-oriented system as a big algorithm with lots of functions
calling each other, but for large enough systems this will not be a fruitful or
enjoyable process. When dealing with object-oriented systems, you're better off
just trying to understand a part of the system by itself and clearly define how
it should communicate with other parts. Trying to fully understand a complex
object-oriented system can prove to be quite challenging.

## Important concepts behind object-oriented languages

There are many ways to implement the object model in object-oriented languages,
and the specific way it is implemented implies different sets of properties for
the language. Some of these properties are encapsulation, polymorphism, generics
(parametric polymorphism), hierarchies (inheritance and composition), subtyping,
and several others. They are powerful high level ideas with precise definitions
that impose restrictions on how a language should behave. In the following
subsections I will give a high-level explanation of encapsulation, polymorphism
(with and without generics), and hierarchies.

An interesting exercise is to find languages that are considered to be
object-oriented, yet don't use one or more of these properties. For example, the
*class* concept is unnecessary, as seen with *prototype-based* languages like
JavaScript. Subtyping is also unnecessary, since it doesn't make sense in
dynamically typed languages like R or Python. I could go on and on, but you get
the idea: there does not exist a single language that has all of these
properties. Furthermore, the only property that is found in all object-oriented
languages is *polymorphism*. That's why people commonly say that *polymorphism*
is *the* essence of OOP.

### Encapsulation

Encapsulation is about hiding an object's "internals" from other objects. As
the designer of the C++ language, Bjarne Stroustrup, put it: *encapsulation
hides information not to faciliate fraud, but to prevent mistakes*. By giving
other objects a minimal catalogue of messages (public methods) that they can
send to an object, we are helping them commit less mistakes and avoid getting
their hands in tasks that do not pertein them. This in turn helps with
*decoupling* objects from themselves and providing *cohesiveness* within
objects.

A common way to think about encapsulation is like when you go to a restaurant:
you "message" the waiter with what you want, and the waiter then delegates the
cooking of what you requested to the restaurant's chef. You have no business in
going into the restaurant's kitchen and telling the chef how to cook your meal,
and if the chef wants to change the way he cooks a certain dish, she can do so
without you having to know about it. It's the same with objects, they should not
get inside another objects and tell it how to do it's job. This sounds simple
enough, but in practice it's very easy to violate this principle. Technically,
the process of separating the interface from the implementation is called
*encapsulation*.

### Polymorphism

Polymorphism is perhaps the most powerful feature of OOP languages, and it is
what distinguishes OOP from more traditional programming with abstract data
types. *Polymorphism* literally means "many forms", and that's exactly what it
is used for in OOP. The same name will denote different meanings depending on
the context in which it is used, just as our natural languages. This allows for
much cleaner and understandable abstractions as well as code.

Loosely speaking polymorphism can be implemented into different ways. From
*inside* or from *outside* objects. When it's implemented from *inside* objects,
each object must provide a definition on how it will deal with a given message.
This is the most common method, and you can find it in Java or Python. R is very
special in this manner and implements the *outside* approach, formally know as
*generics* or *parametric polymorphism*. This way of programming can be
frustrating for people whore have only used the *inside* approach, but it can be
very flexible. The *outside* approach let's you define a generic method or
function for types of objects that you have not yet defined and may never do.
Java and Python can also implement this type of polymorphism but it's not their
nature, just as R can also implement the *inside*, but it's not it's nature
either.

### Hierarchies

Hierarchies can be formed in two ways: *inheritance* and *composition*. The
idea of inheritance is to form new *classes* as specialized versions of old
ones. The specialized *classes* are *subclasses* and the more general ones are
*superclasses*. This is type of relationship is often refered to as an *is-a*
type of relationship, since a *subclass* *is a* type of the *superclass*. For
example, a lion *is a* type of animal, so animal would be the superclass and
lion the subclass. Another type of relationship is known as the *has-a*
relation. This means that one class *has* instances of another class. For
example a car has wheels. We wouldn't say that wheels are *a* type of car, so
there's no inheritance there, but that they are *part of* a car, which implies
*composition*.

There are cases where it's not so clear whether a relation should be modeled
with inheritance or with composition, and in those cases you should decide
to move along with composition. In general, people agree that composition is a
much more flexible way designing a system, and that you should only use
inheritance were you must model the *specialization* of a class. Note that when
you design your systems with composition instead of inheritance your objects
take on different roles, they become more tool-like, and that's a good thing
because you can easily plug them into each other and replace them as necessary,
you also usually end up with larger numbers of smaller classes, which is
normally a good thing.

## The two main sources of confusion for OOP in R

People who are new to OOP in R often find themselves being very confused,
specially if they come from more mainstream languages like Python, Java, or
JavaScript. The two main sources of confusion are that R has various object
models, and that it implements *parametric polymorphism* instead of the more
common form of polymorphism found in those languages. I explain more about both
of these source of confusion below.

### Various object models

The way you work with OOP in R is different from what you may see in other
languages such as Python, Java, C++, and many others. For the most part these
languages have a single object model that all people use. In the case of R, note
that I have been writing "object models", in plural. That's because R is a very
special language and it has various ways of implementing object-oriented
systems. Specifically R has the following object models: S3, S4, Reference
Classes, R6, and Base Types. In this series of posts we will look at S3, S4, and
R6, since those are the most used object models in R.

### Generic functions

Another big difference with popular object-oriented languages like the ones
mentioned before, is that R implements *parametric polymporhism* also known as
*generic functions* which implies that methods belong to functions, not classes.
*Generic functions* are a system for allowing the same name to be used for many
different functions, with many different sets of arguments, from many different
classes. This means that the syntax to call a class's method is different from
the normally "chained" syntax you find in other languages (normally implemented
with a `.` (dot) between a class and the method we want to call), which is
called *message-passing*.

R's method calls look just like function calls and R must know which names
require simple function calls and which names require method calls. R must have
a mechanism to distinguish what it's supposed to do. That mechanism is called
*generic functions*, or simply *generics*. By using *generics* we register
certain names to be *treated* as methods in R, and they act as *dispatchers*.
When we call registered *generic fucntions*, R will look into a chain of
*attributes* in the object that is being passed in the call, and will look for
functions that match the method call for that object's type, if it finds one, it
will call it.

You may have noted that the `plot()` and `summary()` functions in R may return
different results depending on the objects that is being passed to them (e.g. a
data frame or a linear model instance). That's because those are *generic
functions* that implement *polymorphism* . This way of working provides simple
interfaces for users which can make their tasks much simpler. For instance, if
you are exploring a new package and you get some kind of result at some point
derived from the package, try calling `plot(result)`, and you may be surprised
to get some kind of plot that makes sense. This is not common in other
languages.

## The three most common object models in R: S3, S4, and R6

As you may know, the R language is derived from the S language. S's object model
evolved over time, and its third version introduced *class attributes*, which
allowed for the S3 object model we find in R today. It is still the fundamental
object model in R, and most of R's own built-in classes are of the S3 type. It's
a valid and very flexible object model, but it's very different from what people
who come from other object-oriented languages are used to.

S3 is the least formal object model from the three we will look at, so it's
lacking in some key respects. For example, S3 does not offer formal class
definitions, which implies there's no formal concept of inheritance or
encapsulation, and polymorphism is achieved through generics (mentioned above).
Its clear that its functionality is limited in some key respects, but we, as
programmers, have quite a bit of flexibility. As Hadley Wickham put it in
"Advanced R" (Chapman and Hall, 2014), "*S3 has a certain elegance in its
minimalism: you can't take away any part of it and still have a useful
object-oriented system*".

Some programmers feel that S3 does not provide the safety normally associated
with OOP. In S3, it is very easy to create an (informal) class, but it can also
lead to very confusing and hard to debug code when not used with great care. For
example, you could easily misspell a name, and R would not complain. S4 classes
were developed after S3, with the goal of adding safety. S4 provides protection
but it also introduces a lot of verbosity to provide that safety. The S4 object
model implements most features of modern object-oriented programming languages:
formal class definitions, inheritance, polymorphism (parametric), and
encapsulation, and that's why it's prefered by more *rigorous* programmers.

In reality, S3 and S4 are really just ways to implement ploymorphism for *static
functions*. The R6 package provides a type of class which is similar to R's
Reference Classes, but it is more efficient and doesn't depend on S4 classes and
the `methods` package, as Reference Classes do.

When Reference Classes were introduced, some users, following the names of R's
existing class systems S3 and S4, called the new class system R5. Although
Reference Classes are not actually called R5 nowadays, the name of this package
and its classes follows that pattern. Despite being first released over 3 years
ago, R6 isn't widely known. However, it is widely used. For example, it's used
within `Shiny` and to manage database connections in `dplyr` package.

The decision of what object model to use is an important one, and I will touch
more on the tradeoffs between them as I show how to work with them during the
following posts in this series. In general it will come down a trade-off between
flexibility, formality, and code cleanness.

## Summary

This is was the first post in the "Object Oriented Programming in R" series. In
it we looked at basic OOP concepts, explained some unique characteristics to R's
OOP, and introduced the three most common used object models in R. In the
following posts in the series we will create the same example using S3, S4, and
R6 so that the tradeoffs between them become apparent.

For a more exhaustive and formal introduction you should read the excellent book
by Booch, Maksimchuck, Engle, Young, Conallen, and Houston titled
"Object-Oriented Analysis and Design With Applications" (Addison-Wesley, 2007).
