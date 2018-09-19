+++
title = "Placeholder"
date = "1990-03-29"
draft = true
tags = [
    ""
]
+++

Chapter 7. Design Patterns in Python

Design Patterns simplify building software by reusing successful designs and architectures. Patterns build on the collective experience of software engineers and architects. When encountered with a problem which needs new code to be written, an experienced software architect tends to make use of the rich ecosystem of available design/architecture patterns.

Patterns evolve when a specific design proves successful in solving certain classes of problems repeatedly. When experts find that a specific design or architecture helps them to solve classes of related problems consistently, they tend to apply it more and more, codifying the structure of the solution into a pattern.

Python, being a language which supports dynamic types, and high-level object oriented structures like classes and metaclasses, first-class functions, co-routines, callable objects, and so on, is a very rich playground for constructing reusable design and architecture patterns. In fact, as opposed to languages like C++ or Java, you would often find there are multiple ways of implementing a specific design pattern in Python. Also, more often than not, you would find that the Pythonic ways of implementing a pattern is more intuitive and illustrative than, say, copying a standard implementation from C++/Java into Python.

This chapter's focus is mostly on this latter aspect—illustrating how one can build design patterns which are more Pythonic than what usual books and literature on this topic tend to do. It doesn't aim to be a comprehensive guide to design patterns, though we would be covering most of the usual aspects as we head into the content.

The topics we plan to cover in this chapter are as follows:

Design patterns elements

Categories of design patterns

Pluggable hashing algorithms

Summing up pluggable hashing algorithms

Patterns in Python – Creational

The Singleton pattern

The Borg pattern

The Factory pattern

The Prototype pattern

The Builder pattern

Patterns in Python – Structural

The Adapter pattern

The Facade pattern

The Proxy pattern

Patterns in Python – Behavioral

The Iterator pattern

The Observer pattern

The State pattern

---

Design patterns - Elements
A design pattern attempts to record those aspects of a recurring design in object-oriented systems that solve a problem or a class of problems.

When we inspect design patterns, we find that almost all of them have the following elements:

Name: A well-known handle or title, which is commonly used to describe the pattern. Having standard names for design patterns aids communication and increases our design vocabulary.

Context: This is the situation in which the problem arises. A context can be generic like develop a web application software, or specific like Implementing resource-change notification in a shared memory implementation of the publisher-subscriber system.

Problem: Describes the actual problem that the pattern is applied for. A problem can be described in terms of its forces, which are as follows:

Requirements: The requirements that the solution should fulfill, for example, the Publisher-subscriber pattern implementation must support HTTP.

Constraints: The constraints to the solution, if any, for example, the Scalable peer-to-peer publisher pattern should not exchange more than three messages for publishing a notification.

Properties: The properties of the solution which are desirable to have, for example, The solution should work equally well on the Windows and Linux platforms.

Solution: Shows the actual solution to the problem. It describes the structure and responsibilities, the static relationships, and the runtime interactions (collaborations) of the elements making up the solution. A solution should also discuss what forces of the problem it solves, and what it doesn't. A solution should also try to mention its consequences, that is, the results and trade-offs of applying a pattern.

Note
A design pattern solution almost never resolves all the forces of the problem leading to it, but leaves some of them open to related or alternate implementations.

---

Categories of design patterns
Design patterns can be categorized in different ways according to the criteria chosen. A commonly accepted way of categorizing is by using the criterion of purpose of the pattern. In other words, we ask the pattern what class of problems the pattern solves.

This kind of categorization gives us three neat varieties of pattern classes. These are as follows:

Creational: These patterns solve the problems associated with object creation and initialization. These are problems that occur the earliest in the life cycle of problem solving with objects and classes. Take a look at the following examples:

The Factory pattern: The "How do I make sure I can create related class instances in a repeatable and predictable fashion?" question is solved by the Factory class of patterns

The Prototype pattern: The "What is a smart approach to instantiate an object, and then create hundreds of similar objects by just copying across this one object ?" question is solved by the Prototype patterns

Singleton and related patterns: The "How do I make sure that any instance of a class I create is created and initialized just once" or "How do I make sure that any instances of a class share the same initial state ?" questions are solved by the Singleton and related patterns

Structural: These patterns concern themselves with composition and assembling of objects into meaningful structures, which provides the architect and developer with reusable behaviors, where "the whole is more than the sum of its parts". Naturally, they occur in the next step of problem solving with objects, once they are created. Examples of such problems are as follows:

The Proxy pattern: "How do I control access to an object and its methods via a wrapper, behavior on top?"

The Composite pattern: "How can I represent an object which is made of many components at the same time using the same class for representing the part and the whole—for example, a Widget tree ?"

Behavioral: These patterns solve the problems originating with runtime interactions of objects, and how they distribute responsibilities. Naturally, they occur in the later stage, once the classes are created, and then combined into larger structures. Here are a couple of examples:

Using the Median pattern in such case: "Ensure that all the objects use loose coupling to refer to each other at runtime to promote run-time dynamism for interactions"

Using the Observer pattern in such case: "An object wants to be notified when the state of a resource changes, but it does not want to keep polling the resource to find this out. There may be many such instances of objects in the system"

Note
The order of Creational, Structural, and Behavioral patterns implicitly embed the life cycle of objects in a system at runtime. Objects are first created (Creational), then combined into useful structures (Structural), and then they interact (Behavioral).

Let us now turn our attention to the subject matter of this chapter, namely, implementing Patterns in Python in Python's own inimitable way. We will look at an illustrative example to get the matter going.

Pluggable hashing algorithms
Let us look at the following problem.

You want to read data from an input stream—a file or network socket—and hash the contents in a chunked manner. You write some code like this:

Copy
# hash_stream.py
from hashlib import md5

def hash_stream(stream, chunk_size=4096):
    """ Hash a stream of data using md5 """

    shash = md5()

    for chunk in iter(lambda: stream.read(chunk_size), ''):
        shash.update(chunk)

    return shash.hexdigest()
Note
All code is in Python3, unless explicitly mentioned otherwise.

Copy
>>> import hash_stream
>>> hash_stream.hash_stream(open('hash_stream.py'))
'e51e8ddf511d64aeb460ef12a43ce480'
So that works, as expected.

Now let's say you want a more reusable and versatile implementation, one that will work with multiple hashing algorithms. You first attempt to modify the previous code, but quickly realize that this means rewriting a lot of code, which is not a very smart way of doing it:

Copy
# hash_stream.py
from hashlib import sha1
from hashlib import md5

def hash_stream_sha1(stream, chunk_size=4096):
    """ Hash a stream of data using sha1 """

    shash = sha1()

    for chunk in iter(lambda: stream.read(chunk_size), ''):
        shash.update(chunk.encode('utf-8'))

    return shash.hexdigest()

def hash_stream_md5(stream, chunk_size=4096):
    """ Hash a stream of data using md5 """

    shash = md5()

    for chunk in iter(lambda: stream.read(chunk_size), ''):
        shash.update(chunk.encode('utf-8'))

    return shash.hexdigest()
Copy
>>> import hash_stream
>>> hash_stream.hash_stream_md5(open('hash_stream.py'))
'e752a82db93e145fcb315277f3045f8d'
>>> hash_stream.hash_stream_sha1(open('hash_stream.py'))
'360e3bd56f788ee1a2d8c7eeb3e2a5a34cca1710'
You realize that you can reuse a lot of code by using a class. Being an experienced programmer, you may end up with something like this after a few iterations:

Copy
# hasher.py
class StreamHasher(object):
    """ Stream hasher class with configurable algorithm """

    def __init__(self, algorithm, chunk_size=4096):
        self.chunk_size = chunk_size
        self.hash = algorithm()

    def get_hash(self, stream):

        for chunk in iter(lambda: stream.read(self.chunk_size), ''):
            self.hash.update(chunk.encode('utf-8'))

        return self.hash.hexdigest()
First lets try with md5, as follows:

Copy
>>> import hasher
>>> from hashlib import md5
>>> md5h = hasher.StreamHasher(algorithm=md5)
>>> md5h.get_hash(open('hasher.py'))
'7d89cdc1f11ec62ec918e0c6e5ea550d'
Now with sha1:

Copy
>>> from hashlib import sha1
>>> shah_h = hasher.StreamHasher(algorithm=sha1)
>>> shah_h.get_hash(open('hasher.py'))
'1f0976e070b3320b60819c6aef5bd6b0486389dd'
As it must be evident by now, you can build different hasher objects, each with a specific algorithm, which will return the corresponding hash digest of the stream (in this case, a file).

Now lets summarize what we just did here.

We first developed a function, hash_stream, which took in a stream object, and hashed it chunk-wise using the md5 algorithm. We then developed a class named StreamHasher, which allowed us to configure it using one algorithm at a time, thereby making the code more reusable. We obtained the hash digest by way of the method get_hash, which accepts the stream object as argument.

Now let us turn our attention to what more Python can do for us.

Our class is versatile with respect to different hashing algorithms, and is definitely more reusable, but is there a way to call it as if it were a function ? That would be rather neat, wouldn't it?

Here is a slight reimplementation of our StreamHasher class, which does just that:

Copy
# hasher.py
class StreamHasher(object):
    """ Stream hasher class with configurable algorithm """

    def __init__(self, algorithm, chunk_size=4096):
        self.chunk_size = chunk_size
        self.hash = algorithm()

    def __call__(self, stream):

        for chunk in iter(lambda: stream.read(self.chunk_size), ''):
            self.hash.update(chunk.encode('utf-8'))

        return self.hash.hexdigest()
What did we do in the last code ? We simply renamed the get_hash function as Get_Call. Let us see what effect this has.

Copy
>>> from hashlib import md5, sha1
>>> md5_h = hasher.StreamHasher(md5)
>>> md5_h(open('hasher.py'))
'ad5d5673a3c9a4f421240c4dbc139b22'
>>> sha_h = hasher.StreamHasher(sha1)
>>> sha_h(open('hasher.py'))
'd174e2fae1d6e1605146ca9d7ca6ee927a74d6f2'
We are able to call the instance of the class as if it were a function by simply passing the file object to it.

So our class not only gives us reusable and versatile code, but also acts as if it were a function. This is done by making our class a callable type in Python by simply implementing the magic method __call__ .

Note
Callables in Python are any object that can be called. In other words, x is a callable if we can perform x()—with or without params depending upon how the __call__ method is overridden. Functions are the simplest and most familiar callables.

In Python, foo(args) is a syntactic sugar for foo.__call__(args).

Summing up pluggable hashing algorithm
So what does the previous example illustrate? It illustrates the power of Python in taking an existing problem, which would be solved traditionally in other programming languages, in a more exotic and powerful way due to the power of Python and the way it does things—in this case, by making any object callable by overriding a special method.

But what is the pattern we have achieved here? We discussed in the beginning of the chapter that something is a pattern only if it solves a class of problems. Is there a pattern hidden in this particular illustration?

Yes there is—this is an implementation of the Strategy behavioral pattern:

Strategy pattern is used when we need different behaviors from a class and we should be able to configure a class with one of many available behaviors or algorithms.

In this particular case, we needed a class which supports different algorithms to perform the same thing—hashing data from a stream using chunks, and returning the digest. The class accepted the algorithm as a parameter, and since all algorithms support the same method for returning data (the method hexdigest), we were able to implement the class in a very simple way.

Let us continue our journey to find out what are some other interesting patterns we can write using Python, and its unique way of solving problems. We will follow the order of the Creational, Structural, and Behavioral patterns in this journey.

Note
Our approach to the discussion on patterns that follows is very pragmatic. It
may not use the formal language used by the popular Gang-of-four (G4)
patterns—the most elemental approach to Design Patterns. Our focus is on
demonstrating the power of Python in building patterns rather than getting the
formalisms right.

---
