+++
draft = true
+++

http://blogs.tedneward.com/patterns/CreationalPatterns/

Creational Patterns: 20 Years Later
Posted on Apr 10, 2016 #Patterns #Java #Scala #Groovy #Clojure #Kotlin #C# #F# #Visual Basic #Go #C++ #Swift #Objective-C #Haskell #Ruby #Python #JavaScript #Erlang #Elixir #Elm
tl;dr Creational patterns specifically deal with the creation of objects/entities in the code. They abstract the instantiation process (meaning that most of the time, they provide an abstraction layer above the use of the raw language facilities to construct an object). They help make a system independent of how its objects are created, composed, and represented.

The Gang of Four wrote:

Creational patterns become important as systems evolve to depend more on object composition than class inheritance. As that happens, emphasis shifts away from hard-coding a fixed set of behaviors toward defining a smaller set of fundamental behaviors that can be composed into any number of more complex ones. Thus creating objects with particular behaviors requires more than simply instantiating a class.

Initially, they described two recurring themes in these patterns:

“They encapsulate knowledge about which concrete classes the system uses.”
“They hide how instances of these classes are created and put together.”
These two concepts combine to allow the client system to remain ignorant of the details—all the client knows is the interface of the created objects, giving the system a great deal of flexibility in its implementation.

It’s important to note that creational patterns show how to make designs more flexible, not necessarily smaller or simpler. In particular, they will make it easy to change the classes that define the components.
