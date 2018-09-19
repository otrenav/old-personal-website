+++
title = "Object Oriented Programming in R, Part 2: S3"
date = "2018-02-11"
draft = true
tags = [
    "R",
    "Series",
    "Object-Oriented Programming"
]
+++

As you may recall, the R language is derived from the S language. S's object
model evolved over time, and its third version introduced *class attributes*,
which allowed for the S3 object model we find in R today. It is still the object
model in R, and most of R's own built-in classes are of the S3 type. It's a
valid and very flexible object model, but it's very different from what people
who come from other object-oriented languages are used to.

S3 is the least formal object model, so it's lacking in some key respects. For
example, S3 does not offer formal class definitions, which implies there's no
formal concept of inheritance or encapsulation, and polymorphism is achieved
through generics. Its clear that its functionality is limited in some key
respects, but the programmer has quite a bit of flexibility. However, as it
Hadley Wickham put it in "Advanced R" (Chapman and Hall, 2014), "*S3 has a
certain elegance in its minimalism: you can't take away any part of it and still
have a useful object-oriented system*".

### Classes, constructors, and composition

The idea of an object is really just to bundle data and corresponding methods
together. Lists in R are well suited to implement this, since they can contain
different data types, even functions, which are first class objects that can be
assigned or returned like any other. In fact we can literally create objects of
a new class in R by taking a list and simply setting the class attribute of the
list to a new value, which is how we create classes in S3.

Instead of providing definitions for S3 classes, we provide *constructors*.
These constructors have the responsibility of creating objects, a string in
which is the parameter pased in the case of `S3Color` and a list in the case of
`S3Rectangle`, and assigning a string to their *class attribute*. These objects
are then returned and they represent the classes we will be using. In the case
of the rectangle our constructor receives the length orthogonal sides, and the
name of its color. The color constructor only receives the name of the color.

```r
color_constructor <- function(color) {
    class(color) <- "S3Color"
    return(color)
}

rectangle_constructor <- function(a, b, color) {
    rectangle <- list(a = a, b = b, color = color_constructor(color))
    class(rectangle) <- "S3Rectangle"
    return(rectangle)
}
```

As you can see, instead of assigning the `color` string which is passed as a
parameter to the `rectangle_constructor()` function directly in the `color`
element of the `rectangle` list, we use the `color_constructor()` to provide a
`Color` class, not only a string. You should do this if you will add *behavior*
to the color abstraction, as we will do.

Now we can instantiate an `S3_rectangle` by calling the
`rectangle_constructor()`, and we print it's class which is shown to be
`S3Rectangle` just as we expected. Also, if you print the `S3_rectangle`'s
structure, you see that it contains the two sides for the rectangle definition,
the color class, and the attribute class names.

```r
S3_rectangle <- rectangle_constructor(2, 3, "blue")
class(S3_rectangle)
str(S3_rectangle)
```

Sometimes you will see we add a prefix to an object with the name of the object
model we're using (`S3` in this case). For example `S3Color` and `S3Rectangle`.
When you see that, it means that particular name *collapses* with the
corresponding object in another object model, and we need to differentiate them.
If we you don't do this, you may encounter quite confusing and difficult to
diagnose bugs.

### Public methods and polymorphism

Too define a method for a class we need to use the `UseMethod()` function to
define a hierarchy of functions. It will tell R to look for a function whose
prefix matches the current function and for a suffix in order from the vector of
class names of the object being passed. The name of the methods have two parts
separated by a `.` where the prefix is the function name and the suffix is the
name of a class. As you can see, S3 generic functions work by naming convention,
not by explicitly registering methods for different classes.

We start by creating an `S3area` method for the `S3Rectangle` class, and we do
so by creating a function named `S3area.S3Rectangle`, where the part before the
dot (`.`) specifies the method name, and the part after the dot specifies the
class the method belongs to. The `UseMethod()` function will make sure that the
`S3area.S3Rectangle` function receives an object of class `S4Rectangle`, so
inside of such function, we can make use of the classes "internals". In this
case we will take the lengths `a` and `b` and multiply them together.

```r
S3area.S3Rectangle <- function(rectangle) {
    return(rectangle$a * rectangle$b)
}
```

Note that we can access such objects within the `rectangle` object by
using the `$` operator. This is not restricted to be done within a method, so
really any object can change an S3 objects internals, but not because you can
does it mean that you should.

Now we will call the `S3area` method as if it were a normal function call to
which we pass the rectangle object we instantiated before, and we should see the
area being printed to the console.

```r
S3area(S3_rectangle)
```

What happened? An error? Well, how can R tell that the `S3area` function call
actually should trigger the `S3area.S3Rectangle` method call? For that to happen
we need to *register* the name with R, and we do so by calling the defining a
function which actually uses the `S3area` name by itself. This `S3area` function
receives an object of any type, not necessarily a `S3Rectangle`, and uses the
`UseMethod()` function to tell it that it should look for the `"S3area"` method
call that object. In this case, we know that it will only be found for the
`S3Rectangle` class.

```r
S3area <- function(object) {
    UseMethod("S3area")
}
```

Nowe we can call the `S3area` method as we did before, but we will get the
actual area in this case. This is how you normally instantiate methods with S3.

```r
S3area(S3_rectangle)
```

Now we will create the `S3color` method to return the color object for the
rectangle. Since the color object is just a *character* type, there's nothing
more we need to do to somehow *parse* that object in case we just wanted the
characters.

```r
S3color.S3Rectangle <- function(rectangle) {
    return(rectangle$color)
}

S3color <- function(object) {
    UseMethod("S3color")
}
```

Now we will print the rectangle. As you can see, the `print()` call simply shows
us the "internals" of the object, and objects contained within it.

```r
print(S3_rectangle)
```

We may want to *overload* this function to provide a different output. To do so,
we create the `print.S3Rectangle()` and simply print a string that will tell us
the color of the rectangle, the fact that it's a rectangle, the length for each
of its sides, and the its area. Note that both the color and the area are
retrieved using the methods we defined before, `S3Color()` and `S3area()`.

```r
print.S3Rectangle <- function(rectangle) {
    print(paste(
        S3color(rectangle), "rectangle:",
        rectangle$a, "x", rectangle$b, "==", S3area(rectangle)
    ))
}
```

Now, what should happen if we simply call the `print()` function as we did
before with the `S3area()` function? We should get an error, shouldn't we?

```r
print(S3_rectangle)
```

Well, as you see, we don't. In this case we actually get the output we hoped we
would. The reason is that the `print()` function in R is an S3 function which
already registered with the `UseMethod()` function. That means that our
definition `print.S3Rectangle` does not need to be registered again, and we can
simply use it. That's pretty neat, isn't it? That's one of the big advantages of
using *parametric polymorphism*. We can register functions as method calls that
we may or may not end up using at some point in the future in unexpected ways,
but they still provide a homogeneous interface for the user.

### Encapsulation and mutability

Now we will see how S3 handles mutability and encapsulation. To do so we will
print the `a` value in the rectangle, modify it, and print it again. As you can
see, we were able to modify it and from that point on we get a different result,
and we did so wihtout any method calls. That's a very risky thing to do, and you
should definitely wrap this type of behavior in method calls.

> Tip: even if you can, never modify an object's internals directly.

```r
print(S3_rectangle$a)
S3_rectangle$a <- 1
print(S3_rectangle$a)
```

The proper way of modifying an object would be through some type of *setter*
function. The `set_color.S3Rectangle()` method will be used to modify the
rectangle's color, by receiving a `S3Rectangle` and a `new_color` string, and
saving that new string inside of `color` attribute in the rectangle. When you
use a method like this, you're being explicit about your intentions which is a
much better way of programming. Of course we also need to register the method
call with R as showed before.

```r
set_color.S3Rectangle <- function(rectangle, new_color) {
    rectangle$color <- new_color
    return(rectangle)
}

set_color <- function(object, new_color) {
    UseMethod("set_color")
}
```

Did you notice our error? Probably not, but it's great if you did! We did this
on purpose to show you how easy it is to harm yourself when programming in R.
Since R has no type checking, we inadvertently assigned a string where we should
have assigned a `Color`. This means that the `color` attribute in our rectangle
will no longer be recognized as a `Color` class after we call the `set_color()`
method, it will be recognized as a string. If your code depends on this object
being of type `Color`, it will probably fail in unexpected and confusing ways
and will be hard to debug. Be careful when doing assignments. Instead we should
have put `rectangle$color <- color_constructor(new_color)` to keep consistency.

While you can change the type of an object, you never should. As Hadley Wickham
puts it, "*R doesn't protect you from yourself: you can easily shoot yourself in
the foot. As long as you don't aim the gun at your foot and pull the trigger,
you won't have a problem.*".

Now we show how the `set_color()` method can be used. We will print the
rectangle's color, attempt to change it to "black", and print it again. As you
can see, the change was not persisted in our object. That's because R *passes
objects* by *value* and not by *reference*. This simply means that when we
modify the rectangle, we were actually modifying a *copy* of the rectangle, not
the rectangle we passed ourselves.

```r
print(S3color(S3_rectangle))
set_color(S3_rectangle, "black")
print(S3color(S3_rectangle))
```

Did you notice that at the end of the `set_color.S3Rectangle()` function we
returned the `rectangle`? In other languages that may not be necessary, but in R
we do so to get back the modified object. To persist the changes in our object,
we need to actually assign that resulting object into our own `S3_rectangle`,
and when you do, then you can see the color change was persisted.

```r
print(S3color(S3_rectangle))
S3_rectangle <- set_color(S3_rectangle, "black")
print(S3color(S3_rectangle))
```

This property is what gives S3 it's *immutability* property. This is very useful
when working with *functional programming*, but can be a bit of a hassle to work
with when doing *object-oriented programming*. Some confusing bugs may come from
this property before to you get used to working this way.

### Inheritance

S3 classes lack a lot of structure normally found in other languages.
Inheritance is implemented informally, and encapsulation is not enforced by the
language as we have seen before.

To implement inheritance, we will create a `square_constructor()` function that
will receive the length of the sides in `a` and the name of the color. We wil
then use the `rectangle_construtor()` and send `a` for both lengths (making it a
square), and also send the color. Then we will add the `S3Square` class, and
finally return the instantiated object.

```r
square_constructor <- function(a, color) {
    square <- rectangle_constructor(a, a, color)
    class(square) <- c("S3Square", class(square))
    return(square)
}
```

Now we will instantiate a square and print its classes. As you can see it has
the `S3Square` and `S3Rectangle` classes assigned, in order, and when we use the
`print()` method on it, we actually get the the print functionality from the
`S3Rectangle` class, which is expected since we're signaling the inheritance.

```r
S3_square <- square_constructor(4, "red")
class(S3_square)
print(S3_square)
```

If we want to provide specific print functionality for the square, we most
*overwrite* the `print()` method with our own definition for `S3Square` classes,
as we now do. The function is exactly the same as before, but we use the word
`"square"` instead of `"rectangle"`.

```r
print.S3Square <- function(square) {
    print(paste(
        S3color(square), "square:",
        square$a, "x", square$b, "==", S3area(square)
    ))
}
```

Now, when we print, we can see that the correct the new method is being used
because we see the word "square" in the output. Note that we did not have to
re-register the `print()` method with the `UseMethod()` function, since we had
already done so.

```r
print(S3_square)
```

Finally, remember that if the class attribute is a vector with more than one
element, then the first element is interpreted as the class of the object, and
the following elements are interpreted as classes that the object "inherits"
from. That makes inheritance a property of objects, not classes, and order is
important.

If instead we had written `class(square) <- c(class(square), "S3Square")` in the
`square_constructor()` function, then even after creatnig the `print.S3Square()`
function, we would still see the `print()` method calling the
`print.S3Rectangle()` function. Be careful with this.

## Summary
