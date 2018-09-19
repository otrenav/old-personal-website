+++
title = "Object Oriented Programming in R, Part 4: R6"
date = "2018-02-11"
draft = true
tags = [
    "R",
    "Series",
    "Object-Oriented Programming"
]
+++

S3 and S4 are really just a way to implement ploymorphism for *static
functions*. The R6 package provides a type of class which is similar to R's
Reference Classes, but it is more efficient and doesn't depend on S4 classes and
the methods package, as Reference Classes do.

When Reference Classes were introduced, some users, following the names of R's
existing class systems S3 and S4, called the new class system R5. Although
Reference Classes are not actually called R5 nowadays, the name of this package
and its classes follows that pattern.

Despite being first released over 3 years ago, R6 isn't widely known. However,
it is widely used. For example, it's used within Shiny (the focus of the last
chapter in this book) and to manage database connections in dplyr package.

### Classes, constructors, and composition

Classes in R6 are created with the `R6Class()` function, and we pass the name of
the class, and lists of public and private objects. These objects can either be
attributes or methods. As you can see, building a class definition in R6
produces much cleaner code which is put together in a single definition instead
of the step-by-step process used in S3 and S4. This approach is more alike what
you can find in other popular languages.

You may specify how the *constructor* should behave by using the `initialize`
method. This specific method will be called when an instance of the class is
created.

There are two important differences between our names in the following
definition, and what we used for the S3 and S4 examples. In this case we call
the print method `own_print()` and the `color` property, `own_color`. The reason
for the former is that R would be confused between the `color()` method and the
`color` attribute. To avoid errors, we can change the name for one of them, and
to keep our public interface the same, we decide to change the private attribute
in this case. The reason for `own_print()` will be explained below.

```r
library(R6)

R6Rectangle <- R6Class(
    "R6Rectangle",
    public = list(
        initialize = function(a, b, color) {
            private$a <- a
            private$b <- b
            private$own_color <- color
        },
        area = function() {
            private$a * private$b
        },
        color = function() {
            private$own_color
        },
        set_color = function(new_color) {
            private$own_color <- new_color
        },
        own_print = function() {
            print(paste(
                self$color(), "rectangle:",
                private$a, "x", private$b, " == ", self$area()
            ))
        }
    ),
    private = list(
        a = NULL,
        b = NULL,
        own_color = NULL
    )
)
```

To create an instance of a class we call the `new()` method in the class object.
We can pass some parameters, and if we do they will be used by the `initialize`
function defined for the class.

As you can see, we use `print()` on the `R6_rectangle` object, we see a nice
output letting us know what methods and attributes are public and private, as
well as somme extra information about them, like the fact that the default
`clone()` method (used for making copies of an R6 object) is set to *shallow
copying* instead of *deep copying*. We won't go into the details of what these
concepts are, but the interested reader is encourage to look into
*pass-by-reference* versus *pass-by-value* mechanics.

If we had defined a `print()` method within our class, then the
`print(R6_rectangle)` would have used that function by default. Note that this
would be syntactically different from calling the method directly by executing a
command like `R6_rectangle$print()`, but R is intelligent enough to know that if
you define a `print()` method in your class, it's probably because you want to
use it when using the `print()` funtion on the object. If that's not the case,
then you should change the name of your custom print function, as we do in the
case of the `own_print()` method name.

```r
R6_rectangle <- R6Rectangle$new(2, 3, "blue")
class(R6_rectangle)
print(R6_rectangle)
```

As you can see from the output, in the case of R6 classes, we have two classes
instead of one. We have the class we defined ourselves, and we also have the
general `R6` class added for us for the object.

### Public methods and polymorphism

We have already defined the methods we want in the previous piece of code, so
for completeness, we will only show how to call these methods now. As you can
see, you simply use the `$` operator to access an public attribute or a public
method, and if it's a method add the parenthesis at the end (surrounding any
parameters you want to send as you normally would).

```r
R6_rectangle$own_print()
R6_rectangle$area()
R6_rectangle$color()
```

### Encapsulation and mutability

Since we placed the `a`, `b` and `own_color` in the `private` list in the class
definition, they remain private, and this is how encapsulation is enforced in
R6. As you can see, we were not allowed to assign directly to the `a` attribute,
as we expected since it was placed in the `private` list. This makes sure that
we can't attributes or methods marked as *private* directly from outside the
object, and prevents us from making bad decisions when coding. This is a great
advantage of the R6 model.

> Technical note: encapsulation in R6 is achieved through environments.

Mutability is achieved by using *setters* (methods used to change a class'
attribute). Notice that in this case we don't need to re-assign the resulting
object as we do with S3. State is actually saved within the object's
environment, and it can be changed, thus R6 has *mutability*.

```r
R6_rectangle$a
R6_rectangle$own_print()
R6_rectangle$a <- 1
R6_rectangle$own_print()
R6_rectangle$set_color("black")
R6_rectangle$own_print()
```

### Inheritance

Inheritance is also more familiar when working with the R6 object model. In this
case you can simply add the `inherit` parameter to the `R6Class()` function
call, and you may call the `initialize` method for the superclass by using
`super$initialize()`. In this case we use that technique to provide a more
intuitive constructor interface to the user: a single value for length in the
case of a square, instead of having to repeat the same value twice, which can be
prone to counterintuitive behavior if not checked. You can also *override* the
`print()` method just as we normally would add another method.

```r
R6Square <- R6Class(
    "R6Square",
    inherit = R6Rectangle,
    public = list(
        initialize = function(a, color) {
            super$initialize(a, a, color)
        },
        print = function() {
            print(paste(
                self$color(), "square:",
                private$a, "x", private$b, " == ", self$area()
            ))
        }
    )
)
```

As you can see, in this case we get a list of classes that include the current
class `R6Square`, as well as the classes this object inherits from, being
`R6Rectangle` and `R6` in this case. Since we used an *override* for the
`print()` method, we can use the common `print(object)` syntax instead of the
ad-hoc `object$print()` syntax provided by R6.

```r
R6_square <- R6Square$new(4, "red")
class(R6_square)
print(R6_square)
```

### Active bindings

Active bindings look like fields, but each time they are accessed, they call a
function. They are always publicly visible and are similar to Python's
*properties*. If we wanted to implement the `color()` method as an *active
binding*, we could use the following code. As you can see, you can either get or
set the `color` attribute, without using an explicit method call (note the
missing parenthesis).

```r
R6Rectangle <- R6Class(
    "R6Rectangle",
    public = list(
        ...
    ),
    private = list(
        ...
    ),
    active = list(
        color = function(new_color) {
            if (missing(new_color)) {
                return(private$own_color)
            } else {
                private$own_color <- new_color
            }
        }
    )
)

R6_rectangle <- R6Rectangle$new(2, 3, "blue")
R6_rectangle$color
#> [1] "blue"
R6_rectangle$color <- "black"
R6_rectangle$color
#> [1] "black"
```

As you can see, when an *active binding* is used as a *getter* (to retrieve a
value), it calls the method without a value being passed. When it's accessed as
a *setter* (to change an attribute) it calls the method passing the value to be
assigned. It's not possible to an *active binding* as a *setter* if the function
takes no arguments.

### Finalizers

Sometimes it's useful to run a function when the object is *garbage collected*.
If you're not familiar with *garbage collection*, you can think of it as a way
to liberate unused memory when an object is no longer referenced by other
objects in the environment.

A useful case for this features is when you want to make sure a file or database
connection gets closed before an object is *garbage colected*. To do this, you
can define a `finalize()` method, which will be called with no arguments when
the object is garbage collected. To test this functionality, you can simply add
a *finalizer* as follows to some of your objects and see when you get the
`"Finalizer called"` message in the console.

> Tip: *finalizers* will also be called when R exits.

```r
A <- R6Class("A", public = list(
    finalize = function() {
        print("Finalizer called.")
    }
))
```

## Summary

In this chapter we have introduced the fundamentals behind object-oriented
programming, and we have seen how to implement object-oriented systems within R
with three different object models: S3, S4, and R6. We looked at the fundamental
building blocks of object models such as encapsulation, polymorphism, and
hierarchies. We have shown how to implement parametric polymorphism with S3 and
S4 as well as regular polymorphism with R6, and we have shown how to use
concepts like interfaces even when there's no explicit support for them in R.

The type of object model to use is the subject of some controversy among R
programmers, and the decisions depends on how flexible, formal, or intuitive you
want the code to be. In general if you prefer more flexibility use S3, if you
prefer more fomality and robustness use S4, and if you prefer your code to be
easily understandable and intuitive to people who come from other languages and
are not familiar with S3 and S4, then use R6. However, controversy is still
there.

John Chambers, the creator of the S language and one of the central developers
of R, recommends S4 over S3 in his book "Software for Data Analysis" (Springer,
2008). Google's R Style Guide (https://google.github.io/styleguide/Rguide.xml)
says that you should avoid S4 whenever possible, and should use S3 instead.
Hopefully after having read this chapter, you will have a good idea of what
system you'd prefer for your next project and why.

For a more in-depth treatment of this topic as well as others, you may want to
look at my recent book ["R Programming by
Example"](links.otrenav.com/r-programming-by-example) published by
[Packt](https://packtpub.com). If you do, please publish your opinion about it
in the book's page. I really appreciate it, and every comment can go a long way.
Also, if you have any questions or feedback, please don't hesitate to contact me
through [my personal website](https://otrenav.com).

Cheers!
