+++
title = "Object Oriented Programming in R, Part 3: S4"
date = "2018-02-11"
draft = true
tags = [
    "R",
    "Series",
    "Object-Oriented Programming"
]
+++

Some programmers feel that S3 does not provide the safety normally associated
with objec-oriented programming. In S3, it is very easy to create a class, but
it can also lead to very confusing and hard to debug code when not used with
great care. For example, you could easily misspell a name, and R would not
complain. You could easily change the class to an object, and R would not
complain either.

S4 classes were developed after S3, with the goal of adding safety. S4 provides
protection but it also introduces a lot of verbosity to provide that safety. The
S4 object model implements most features of modern object-oriented programming
languages: formal class definitions, inheritance, polymorphism (parametric), and
encapsulation.

### Classes, constructors, and composition

An S4 class is created using the `setClass()` function. At a minimum the name of
the `Class` and it's attributes, formally known as *slots* in S4, must be
specified. The *slots* are specified in with the `representation()` function,
and a neat feature is that you specify the type expected for such attributes.
This helps a bit with *type-checking*.

There are other features built-in that we are not going to look at here. For
example, you could provide a function that verifies the object is consistent
(has not been manipulated in some unexpected way). You can also specify default
values, in a parameter called the `prototype`. If you want this features in S3,
you can also implement them yourself, but they don't come as built-in features.
S4 is regarded as a powerful object model, and you should definitely study it
more in depth by browsing it's documentation.

> Tip: All S4 related code is stored in the methods package. This package is
> always available when you're running R interactively, but may not be available
> when running R in batch mode. For this reason, it's a good idea to include an
> explicit `library(methods)` call whenever you're using S4.

As you can see, the conceptual difference with S3 classes is that here we
actually specify the type of object for each slot. Other changes are more
syntactic than conceptual. Note that you may use the name of another S4 class
for one of the slots, as we do in the case of `color` for the `S4Rectangle`.
This is how you can achieve composition with S4.

```r
library(methods)

setClass(
    Class = "S4Color",
    representation = representation(
        color = "character"
    )
)
setClass(
    Class = "S4Rectangle",
    representation = representation(
        a = "numeric",
        b = "numeric",
        color = "S4Color"
    )
)
```

The constructor is built automatically for you with a call to the `new()`
function. As you can see, you simply need to pass through the name of the class
you're instantiating, and the values that should be assigned to the slots.

```r
S4_rectangle <- new(
    "S4Rectangle",
    a = 2,
    b = 3,
    color = new("S4Color", color = "blue")
)
class(S4_rectangle)
str(S4_rectangle)
```

As we did before, we retrieve the class for the object, and print it. When we
print it we can see a structure that contains some `@`. Those are the operators
used to access the slots (instead of the `$` operator for S3). You can also see
the nested slot for the `color` attribute of the `Color` class.

> Note: Some slot names are forbidden due to the fact that they are reserved
> keywords in R. Forbidden names include `class`, `comment`, `dim`, `dimnames`,
> `names`, `row.names`, and `tsp`.

### Public methods and polymorphism

Since S4 also uses *parametric polymorphism* (methods belong to functions, not
classes) and we have already explained it a couple of times before, we are going
to just point out the differences with S3 at this point. First, instead of using
the `UseMethod()` function to register methods with R, we use the `setGeneric()`
function, with the name of the method, and a function that calls the
`standardGeneric()` function inside. This will provide the dispatch mechanism
for S4 objects. To actually create a method, instead of using a naming
convention as we do in S3, we actually pass the name of the class and the method
to the `setMethod()` function, as well as the function that should be used as a
method. Second, the order there matters. If you call the `setMethod()` function
before you call the `setGeneric()` method your dispatch mechanism won't work. In
S3 we had done that, but here we need to reverse the order. Finally, note that
we access object attributes (slots) with the `@` symbol, as we mentioned before.

For completeness in the example so that the reader may compare the code for all
three examples side to side, we now show how to implement the same code we
showed for the S3 case.

```r
setGeneric("S4area", function(self) {
    standardGeneric("S4area")
})
setMethod("S4area", "S4Rectangle", function(self) {
    return(self@a * self@b)
})

S4area(S4_rectangle)

setGeneric("S4color", function(self) {
    standardGeneric("S4color")
})
setMethod("S4color", "S4Rectangle", function(self) {
    return(self@color@color)
})
```

If you use `print()` on `S4_rectangle` you will see that it's recognized to be
of a certaintype, and it will show it's slots.

```
print(S4_rectangle)
```

If we want to change this output we would *override* this method with our own,
as we did in the case of S3. However, if we do, we will have the `print()`
function defined to work with S4 obejts, and it will stop working for objects
from other object models. We encourage you to try it yourself by changing the
code below to use the `print` method call instead of the `S4print` name. As you
can see, we are using the same overriding mechanism as before, so we will skip
it's explanation.

```r
setGeneric("S4print", function(self) {
    standardGeneric("S4print")
})
setMethod("S4print", "S4Rectangle", function(self) {
    print(paste(
        S4color(self), "rectangle:",
        self@a, "x", self@b, "==", S4area(self)
    ))
})
```

Now we may use the `S4print()` method to print the desired output, as you can
see below.

```r
S4print(S4_rectangle)
```

### Encapsulation and mutability

Now we will take a look at the *encapsulation* and *mutability* concepts in S4.
First, note that we are using both the `print()` and not the `S4print()` method
because we are printing specific slots from `S4_rectangle`. As you can see, if
we're not careful, we can stil assign values directly to the "internals" of the
object. Again, you should not do this.

Also note that if we use the method `S4color()` we created before to encapsulate
the access to the `color` attribute, we get an error telling use that the
`S4color<-` function could not be found. That hints us that we can create such
function, and we can.

```r
print(S4_rectangle@a)
S4_rectangle@a <- 1
print(S4_rectangle@a)

print(S4color(S4_rectangle))
S4color(S4_rectangle) <- "black"
print(S4color(S4_rectangle))
```

To create a function that will encapsulate access to an object's attribute, we
can use the `setReplaceMethod()` function just as we did with the `setMethod()`
function before. Note that the name of the method we are passing to the
`setGeneric()` function is the one that was hinted to us in R's error, which is
the name of the slot followed by the normal assignment operator in R: `<-`. Also
note that there's no space between the name of the variable and symbols for the
assignment operator.

Finally, note that we made sure to instantiate a object of type `S4Color` when
assigning a new value to the `color` slot. If you try to simply assign a string
as we did with the S3 class, you will get an error letting you know you're are
trying to do something you shouldn't be doing. This is a big advantage when
working with S4, it can prevent you from commiting some unexpected mistakes.

```r
setGeneric("S4color<-", function(self, value) {
    standardGeneric("S4color<-")
})
setReplaceMethod("S4color", "S4Rectangle", function(self, value) {
    self@color <- new("S4Color", color = value)
    return(self)
})
```

Once we create such method, we can use to to assign to the color object
directly, in an encapsulted manner, which is much better than manipulating the
slots directly. As you can see the color change is persisted.

```r
print(S4color(S4_rectangle))
S4color(S4_rectangle) <- "black"
print(S4color(S4_rectangle))
```

### Inheritance

Creating a subclass is easy, we simply need to call the `setClass()` function as
we did before, and send the `contains` parameter with the name of the class it
will inherit from. S4 supports multiple inheritance, but it's not something
we're going to look at. The interested reader is encouraged to look into the
documentation.

An interesting feature of S4 classes is that if a class extends one of R's basic
types, there will be a slot called `.Data` containing the data from the basic
object type. Code that works on the basic object type will work with directly on
the `.Data` part of the object, so it makes our programming a bit easier.

```r
setClass("S4Square", contains = "S4Rectangle")
```

Note that when we instantiate the `S4Square` class, we will need to pass both
attributes for the length and make sure they are the same. As we can see the
class of the object is identified correctly, and the polymorphic `S4print()`
method we defined previously works fine.

```r
S4_square <- new("S4Square", a = 4, b = 4, color = new("S4Color", color = "red"))
class(S4_square)
S4print(S4_square)
```

Again, for completeness we *override* the `S4print()` method with one that uses
the `"square"` word instad, and we can see that it works as expected.

```r
setMethod("S4print", "S4Square", function(self) {
    print(paste(
        S4color(self), "square:",
        self@a, "x", self@b, "==", S4area(self)
    ))
})

S4print(S4_square)
```

## Summary
