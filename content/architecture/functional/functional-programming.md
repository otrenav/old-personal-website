+++
draft = true
+++

https://www.youtube.com/watch?v=3-UgraLNC2g&index=63&list=WL&t=60s

https://blog.cleancoder.com/uncle-bob/2012/12/22/FPBE1-Whats-it-all-about.html

FP Basics E1
22 December 2012
h4. What’s Functional Programming all about?

By now you’ve almost certainly heard of functional programming. I mean, how could you miss it? Everybody’s talking about it. There are all these new functional languages coming out like Scala, F# and Clojure. People are talking about older languages too, like Erlang, Haskell, ML, and others.

So what’s this all about? Why is functional programming The Next Big Thing ™? And what in blazes is it?

Firstly, it’s almost certainly true that functional programming is the next big thing. There are good solid reasons for this that we’ll explore towards the end of this article. But ﬁrst, in order to understand those reasons, we need to know what functional programming is. I’m going to upset a lot of people with this next statement because I’m going to resort to extreme minimalism. I’m going to reduce functional programming down to it’s simplest core; and this isn’t really fair because the topic is rich and expressive and full of wonderful concepts. We’ll explore all those concepts in future articles. You’ll even see hints of some of them here. But for now, I’ll simply deﬁne functional programming this way:

Functional programming is programming without assignment statements.

Oh no! Now I’ve gone and done it. The functional programmers out there are gathering their pitchforks and torches. They want my head for uttering such minimalist blasphemy. Meanwhile all the folks who hoped to learn what functional programming really is are about to stop reading because the above statement is so blatantly absurd. I mean: how in the world can you program without assignment? The best way to explain that is to show an example. Let’s look at a very simple program in Java: The squares of integers.

public class Squint {
  public  static  void  main(String  args[])  {
    for  (int  i=1;  i<=25;  i++)
      System.out.println(i*i);}
}
Who hasn’t written that program, or some simple variant of it? I must have written it many hundreds of times. It’s often the second program I write in a new language, and the second or third program I teach new programmers to write. Everybody knows the good old squares of integers!

But let’s look at it closely. It’s just a simple loop with variable named i that counts up from 1 to 25. Each loop through the program causes the variable i to take on a new value. This is assignment. A new value is being assigned to the variable i every pass through the loop. If you could somehow peer into the memory of the computer and stare at the memory location that held the value of i, you would see the value held by that memory change from one iteration of the loop to the next.

If the previous paragraph seemed to have belabored an obvious point, let me point out that whole papers have been written on this topic. The concepts of identity, value, and state may seem intuitive to us; but they are actually a very rich topic in and of themselves. But I digress.

Now let’s look at a functional program for the squares of integers. We’ll use the language Clojure for this; though the concepts we’re going to explore work the same in any functional language.

(take 25 (squares-of (integers)))
Yes, you are reading that correctly; and yes, that is an actual program that produces actual results. If you must see the results they are:

(1 4 9 16 25 36 49 64 ... 576 625)
There are three words in that program: take, squares-of, and integers. Each of those words refers to a function. The left parens in front of those words simply mean: call the following function and treat everything up to the closing right paren as it’s arguments.

The take function takes two arguments, an integer n, and a list l. It returns the ﬁrst n items of l. The squares-of function takes a list of integers as it’s argument and returns a list of the squares of those integers. The integers function returns a list of integers in sequential order, starting at 1. Thats it. The program simply takes the ﬁrst 25 elements of a list of the squares of sequential integers starting at 1.

Read that sentence again; because I did something important there. I took the three separate deﬁnitions of the functions and combined them into a single sentence. That’s called: (are you ready for the buzzword?)

Referential Transparency.

[cue: Fanfare, glitter, ticker tape, cheering crowds].

Referential Transparency simply means that, in any given sentence, you can replace the words in that sentence with their deﬁnitions, and not change the meaning of the sentence. Or, more importantly for our purposes, it means that you can replace any function call with the value it returns. Let’s see this in action.

The function call (integers) returns (1 2 3 4 5 6 ...). OK, I know you’ve got questions about this, right? I mean, how big is this list? The real answer is that the list is only as big as I need it to be; but let’s not think about that just now. We’ll come back to it in a later article. For the moment just accept that (integers) returns (1 2 3 4 5 6 ...); because it does!

Now, in our program, we can replace the function call (integers) with it’s value. So the program simply becomes:

(take 25 (squares-of (1 2 3 4 5 6 ...)))
Yes, I did that with copy and paste; and that’s also an important point. Referential Transparency is the same as copying the value of a function call and pasting it right on top of that function call.

Now, let’s do the next step. The function call: (squares-of (1 2 3 4 5 6 ...)) simply returns a list of the squares of the numbers in it’s argument list. So it returns: (1 4 9 16 25 36 49 64 ...). If we replace this function call with it’s value, our program simply becomes:

(take 25 (1 4 9 16 25 36 49 64 ...))
And, of course, the value of that function call is simply:

(1 4 9 16 25 36 49 64 ... 576 625)
Now let’s look at our program again:

(take 25 (squares-of (integers)))
Notice that it has no variables. Indeed, it has nothing more than three functions and one constant. Try writing the squares of integers in Java without using a variable. Oh, there’s probably a way to do it, but it certainly isn’t natural, and it wouldn’t read as nicely as my program above.

More importantly, if you could peer into the computer’s memory and look at the memory locations used by my program, you’d find that those locations would be initialized as the program first used them; but then they would retain their values, unchanged, throughout the rest of the execution of the program. In other words, no new values would be assigned to those locations.

Indeed, this is a necessary condition for Referential Transparency, which depends on the fact that every time you invoke a particular function call, you will get the same result. The fact that computer memory for my program does not change while my program is executing means that the call (f 1) will always return the same value no matter how many times it is called. And that means I can replace (f 1), wherever it appears, with its value.

Or to say this another way: Referential Transparency means that no function can have a side effect. And, of course, that means that no variable, once initialized, can ever change its value; since assignment is the quintessential side effect.

So why is this important? What’s so great about Referential Transparency? Given that it is possible to write programs without assignment, why is it important?

You are almost certainly reading this on the screen of your computer. Or if not; you have a computer nearby. How many cores does it have?I’m typing this article on a MacBook Pro with 4 real cores. (They say it has 8, but I don’t count all that “hyperthreading nonsense”. It has four). My previous laptop had two cores. And the one before that had just one. The only conclusion I can draw is that my next laptop will truly have eight cores; and the one after that will likely have 16.

The poor hardware engineers, who have carried us on their backs for the last four decades, have finally hit the speed of light limit. Computer clocks simply aren’t going to get much faster. After doubling every 18 months for longer than most programmers (except me) have lived, the runaway growth in computer speed has slammed to a halt; never to rise again.

So those hardware engineers, in an effort to give us more and more cycles per second, have resorted to adding more processors into our chips; and there seems no end to how many processors that will lead to as the years march onwards.

So let me ask you this, O skilled and competent programmer: How are you going to take advantage of every computer cycle available to you when your computer has 4096 cores in it? How will you marshal your function executions when they must run within 16384 processors all contending for the same memory bus? How will you build responsive and flexible websites when your models, views, and controllers must share 65536 processors?

Honestly, we programmers can barely get two Java threads to cooperate. And threads are baby-food compared to the meat and potatoes of real processors fighting over the bus. For over half a century programmers have made the observation that the processes running in a computer are concurrent, not simultaneous. Well, boys and girls, welcome to the wonderful world of simultaneity! Now; how are you going to deal with it?

And the answer to that is, simply: Abandon all assignment, ye who enter here.

Clearly, if the value of a memory location, once initialized, does not change during the course of a program execution, then there’s nothing for the 131072 processors to compete over. You don’t need semaphores if you don’t have side effects! You can’t have concurrent update (pardon me: Simultaneous Update) problems if you don’t update!

So that’s the big deal about functional languages; and it is one big fricking deal. There is a freight train barreling down the tracks towards us, with multi-core emblazoned on it; and you’d better be ready by the time it gets here.

https://blog.cleancoder.com/uncle-bob/2013/01/02/FPBE2-Whys-it-called-functional.html

FP Basics E2
02 January 2013
h4. Why’s it called Functional?

In the previous episode I told you what all the functional programming hubbub is all about. Remember: Referential Transparency and the multi-core freight train? Since you are here, reading episode 2, I presume you were convinced by my arguments and want to know more.

So the next question to answer is: Why’s it called “Functional” programming? The simple answer to that question is that Functional Programming is programming with functions (duh). As answers go, that one’s pretty bad. Oh it’s accurate, so far as it goes, and it sounds good enough; but it really doesn’t answer the question. After all, Java programs are programs with functions.

So then why the word “functional”?

I’m going to get all the math weenies upset with me now; because I’m going to use an analogy with calculus. I’m not going to let that bother me though, since I simply stole the analogy from Wikipedia.

Do you know what dy/dx signifies? In particular, in the expression dy/dx, what is y? Of course, y is a function. dy/dx is the derivative of that function. So dy/dx takes a function as it’s argument and returns the derivative of that function as it’s result. Right?

Consider d(x^2)/dx: it equals 2x. Notice that 2x is a function. So the argument and the return values are both functions.

Wait. What do you call something that takes arguments and returns values. You call that a function. So dy/dx is a function that takes a function and returns a function.

What if we had a computer language that was like that? What if we could write functions that took functions as arguments, operated upon them without evaluating them, and then returned new functions as the result? What would you call a language like that? What other word could be better than: functional?

And of course now I have all the functional language purists mad at me because they know that that’s a completely inadequate way to define a functional language. But it’s a step along the path – and it’s an important one.

So, what does it mean to pass a function as an argument to another function. Let’s look at our squares of integers program again. Remember it was just:

(take 25 (squares-of (integers)))
Let’s make a function out of it by giving it a name and an argument:

(defn squint [n]
  (take n (squares-of (integers))))
I’m sure you can work out the syntax on your own. It’s not rocket science.

Given this definition of squint, we can print the first 25 squares of integers with this command:

(println (squint 25))
So far this is nothing more than simple function calls and definitions. But what’s that squares-of function? How is it defined?

(defn square [n] (* n n))

(defn squares-of [list]
  (map square list))
Now that’s a little more interesting! The square function is no surprise, it just multiplies it’s argument by itself. It’s the squares-of definition that’s interesting; because it passes the square function as an argument to a function named map.

The map function is one of the staples of functional programming. It takes two arguments: a function f and a list l; and it returns a new list by applying f to every element of l.

Passing a function as an argument, like this, is not something that Java programmers do too often. On the other hand, it’s not a completely alien concept either. Any Java programmer who has studied the Command Pattern, or who has used the Listeners in Swing, will understand what’s going on here.

What’s more, most languages nowadays have begun to incorporate the notion of functions passed as arguments. This feature is sometimes called “blocks” or “lambdas”. It is a very common part of any Ruby program; and has become much more important lately in C#. It is even rumored that the feature will be added to Java sometimes soon.  

So then maybe we don’t have to learn a new language. Maybe our old languages are becoming more and more functional and we can just use those functional features as they become more and more available.

That way lay madness, wailing, and much gnashing of teeth! A language with functional features is not a functional language; and a program written with a few lambdas here and there is not a functional program.

To get a hint of why this is true, we need to look at the integers function.

   (defn integers []
      (integers-starting-at 1))
OK, that’s not too hard. The integers-starting-at function simply takes an integer argument and returns a list of all integers starting with the argument.

   (defn integers-starting-at [n]
      (cons n (lazy-seq (integers-starting-at (inc n)))))
This one’s going to take a little explaining. But don’t fret, it’s actually quite simple.

First there’s the cons function; which is short for “construct list”. The cons function takes two arguments, an element, and a list. It returns a new list which is the element prepended onto the old list. So (cons 2 [3 4]) returns [2 3 4].

Now all the Clojure people are upset with me because that’s not exactly right. On the other hand, the difference is something we don’t need to deal with right now. For the moment, just remember this: cons constructs a list by prepending it’s first argument to the second; which must be a list.

Now, perhaps you are thinking that cons just sticks the element on the front of the list; but that’s not quite right. Indeed, it’s not even close to being right. You see cons doesn’t change the argument list at all. Instead, it returns an entirely new list with the element prepended to the contents of the argument list.

Oh boy, now the Clojure people are really mad at me; because that’s not right either. And you’re probably thinking I’m crazy too because what fool would copy a whole list into another list just to prepend an element?

OK, so, yes, cons actually does prepend the element onto the list, and does not copy the list into a new list. On the other hand, it does this in such a way that you can pretend that the input and output lists are completely different. For all intents and purposes, the output of cons is an entirely new list – even though it isn’t.

Confused? That’s ok, it’s not actually that difficult to understand. Consider the list [1 2 3]. If we implement that as a linked list, it would look like this: 1->2->3. Now let’s say we cons a 0 on the front. That gives us 0->1->2->3. Notice, however, that the old list still exists inside the new list. That’s the secret! The old list remains unchanged inside the new list. So we can pretend that cons returns a whole new list, leaving the old list unchanged.

This is just a hint at something that all true functional languages do. They allow you to create what appear to be wholly new data structures, while preserving the old data structures unchanged; and they do so without copying. In functional circles, this is known as persistence; and the data structures that behave this way are known as persistent data structures. Such data structures maintain their history at all times. Nothing ever gets deleted or modified within them. However, they have many different “entry-points” each of which provides a different view of the data.  Think of it like a source code control system. Though you delete and modify lines of code; nothing ever gets deleted or changed in the source code repository. The entire history is preserved. You just have many different entry points into the source code repository that allow you to see snapshots of that history.

So, now, let’s go back to our program. We were looking at integers-starting-at.

   (defn integers-starting-at [n]
      (cons n (lazy-seq (integers-starting-at (inc n)))))
What is that cons prepending, and what is it prepending it to? The first time through, n is going to be 1, and so the cons will return a list that starts with 1. That makes perfect sense because our goal is to print the square of 1.

OK, but what is the cons prepending the 1 onto? Clearly the 1 is being prepended to some list that’s returned by lazy-seq.

Here’s where the magic begins. You see, lazy-seq is a function that returns a lazy sequence. A lazy sequence is just a list - but with a twist. Instead of a linked list of values like 1->2->3, a lazy sequence is a value linked to a function: 1->f. That function, when it is called, returns the next value of the list, linked to another function: 2->f. And what function are those values linked to? Look close! It’s the argument of lazy-seq.

The argument of lazy-seq is a recursive call to integers-starting-at with an argument of (inc n). The inc function simply returns it’s argument incremented by 1.

So, what is a lazy sequence? A lazy sequence is a list who’s elements are calculated when they are needed, and not before. Every time you ask a lazy sequence for the next item on the list, it simply calls the function that the current item is linked to.

Thus, a lazy sequence has no size. You can keep on asking for more and more elements endlessly; and yet those elements won’t be calculated until they are needed.

The map function also returns a lazy sequence. Here’s a simple implementation:

   (defn map [f l]
      (if (empty? l)
        []
        (cons (f (first l)) (lazy-seq (map f (rest l))))))
The first function simply returns the first element of it’s argument. The rest function simply returns the argument list minus it’s first element; i.e. the rest of the list. So map is just a simple recursive function that invokes the function f on each element of l creating a new lazy sequence of the results.

One thing remains before we can put this all together: the take function. After all we’ve been through, this one is really very simple.

   (defn take [n l]
      (if (zero? n)
        []
        (cons (first l) (take (dec n) (rest l)))))
As you can see, the take function returns a list composed of the first n elements of l.

Now, lets practice a little Referential Transparency, and evaluate (by hand) the value of:

   (squint 2)
First we replace squint with it’s definition:

   (take 2 (squares-of (integers)))
Next we replace take with it’s definition. This is a bit tricky because we have to recurse.

   (if (zero? 2)
      []
      (cons (first (squares-of (integers)))
            (if (zero? (dec 2))
              []
              (cons (first (rest (squares-of (integers))))
                    (if (zero? (dec (dec 2)))
                      []
                      ...)))))
I stopped at the third if statement because (dec (dec 2)) is zero. Indeed, we know the status of each of those if statements, so we can eliminate them all.

   (cons (first (squares-of (integers)))
          (cons (first (rest (squares-of (integers))))
                []))
Clearly, given that there are two calls to cons, this is going to return a list with two elements in it. We can do a little housekeeping by replacing integers with its definition.

(cons (first (squares-of (integers-starting-at 1)))
     (cons (first (rest (squares-of (integers-starting-at 1))))
           []))
Since the call to (squares-of (integers-starting-at 1)) occurs twice, we’ll evaluate it once and then replace the calls with it’s value. We begin by replacing squares-of:

(map square (integers-starting-at 1)
 And then integers-starting-at:

(map square (cons 1 (lazy-seq (integers-starting-at 2)))
Now let’s replace map. Since map begins with (if (empty? l) ...), and since the (cons 1...) guarantees that the list won’t be empty, we can skip the if statement and just use the body.

(cons (square (first (cons 1 (lazy-seq...))))
      (map square (rest (lazy-seq (integers-starting-at 2)))))
The call to first can easily be reduced:

(cons (square 1)
      (map square (rest (lazy-seq (integers-starting-at 2)))))
Now a bit more magic. The call to rest returns the “rest” of the list by invoking the function passed into lazy-seq.

(cons (square 1)
      (map square (integers-starting-at 2)))
We can repeat this analysis for (map square (integers-starting-at 2)):

(cons (square 1)
      (cons (square 2)
            (map square (integers-starting-at 3)))
And then we can reduce the squares.

(cons 1
      (cons 4
            (map square (integers-starting-at 3)))
We left our previous analysis of the entire function in the following state:

(cons (first (squares-of (integers-starting-at 1)))
     (cons (first (rest (squares-of (integers-starting-at 1))))
           []))
Now we can plug in our value for (squares-of (integers-starting-at 1)).

(cons
  (first (cons 1
           (cons 4
             (map square (integers-starting-at 3))))
  (cons
    (first (rest (cons 1
                       (cons 4
                       (map square (integers-starting-at 3)))))
           []))
That first first is easy to reduce. (first (cons x l)) is simply x; so we’ll just ignore the second argument of the cons.

(cons
  1           
  (cons
    (first (rest (cons 1
                       (cons 4
                       (map square (integers-starting-at 3)))))
           []))
The (first (rest...)) is easy to evaluate too.

(cons
  1           
  (cons 4 []))
And the result of that, of course, is [1 4].

Did you notice what happened to that (integers-starting-at 3)? It never got evaluated. Why? Because the original (take 2...) only needed 2 values, so the third was never requested.

And that leads to a powerful realization. Most of us have written loops that push data through the rest of the program. But (take 25 (squares-of (integers))) is a loop that pulls data out of the rest of the program. This is a profound difference, and something we’re going to spend a lot more time on later.

By this time all the Clojure people, all the functional programming people, and all the math people are furious with me; because I’ve oversimplified so much. And it’s true; there’s a bunch of stuff I’ve glossed over and waved my hands about. Still, what I’ve told you is essentially correct. It is also a pretty good demonstration of the power of treating functions as data that can be passed into and returned from functions.

And that brings us to the climax of this episode; for we can now answer the question posed by the title. We call this programming style functional because it’s all about treating functions as data elements that are manipulated no differently than integers or a characters. The functional programming people refer to that as functions being first-class citizens.  A functional language is a language that has functions as first-class citizens, enforces referential transparency by eliminating assignment, and maintains data history with persistent data structures.

As we’ll learn in subsequent episodes, this definition is neither complete, nor fully accurate; but for the moment… it will do.

https://blog.cleancoder.com/uncle-bob/2013/01/07/FPBE3-Do-the-rules-change.html

FP Basics E3
07 January 2013
h4. Do all the Rules Change?

Whenever we start to use a new paradigm, we confront the problem of our old rules and our old habits. We ask ourselves whether all those rules and habits are valid in the new paradigm. Consider, for example Test Driven Development. Is it valid in Functional Programming? If so, how do you do it?

The best way to figure this out it to try it; so lets try writing a simple functional program: Word Wrap. The requirements are simple. Given a string of words separated by single spaces, and given a desired line length, insert line-end characters into the string at appropriate points to ensure that no line is longer than the length. Words may be broken apart only if they are longer than the specified length.

So, if we take the Gettysburg Address as a string:

“Four score and seven years ago our fathers brought forth upon this continent a new nation conceived in liberty and dedicated to the proposition that all men are created equal”

And we wrap it so that no line is longer than 10 characters, the result should be:

“Four score\nand seven\nyears ago\nour\nfathers\nbrought\nforth upon\nthis\ncontinent\na new\nnation\nconceived\nin liberty\nand\ndedicated\nto the\npropositio\nn that all\nmen are\ncreated\nequal”

We’ll use Brian Marick’s lovely test framework: Midje, and begin by specifying the first test.

(facts
  (wrap "" 1) => "")
This just says that it is a fact that the call (wrap "" 1) will return "". We can make this pass by defining the wrap function and giving it a degenerate implementation as usual:

(defn wrap [s n]
  "")
The next test forces us away from the degenerate implementation, but not by much:

(wrap "x" 1) => "x"

(defn wrap [s n]
  s)
The next test forces us to split a word that’s too long:

(wrap "xx" 1) => "x\nx"

(defn wrap [s n]
  (if (<= (length s) n)
    s
    (str (subs s 0 n) "\n" (subs s n))))
The if statement in clojure is like the ?: operator in C and java. It returns the first expression if the predicate is true; otherwise it returns the second expression. The subs method should be self-explanatory, it’s similar to the subString method in Java. The str method simply takes all it’s arguments and concatenates them into a single string

The next test forces us to iterate, which we do by recursing:

(wrap "xxx" 1) => "x\nx\nx"

(defn wrap [s n]
  (if (<= (count s) n)
    s
    (str (subs s 0 n) "\n" (wrap (subs s n) n))))
The next test checks the case where the character after the line break is a space. We don’t want a space at the front of the next line, so we skip over that space.

(wrap "x x" 1) => "x\nx"

(defn wrap [s n]
  (if (<= (count s) n)
    s
    (let [trailing-space (= \space (get s n))
          new-line-start (if trailing-space (inc n) n)
          head (subs s 0 n)
          tail (subs s new-line-start)]
      (str head "\n" (wrap tail n)))))
The let clause in clojure simply allows us to create local symbols that hold values that will be used in the body of the function. These are not variables, because their values do not vary.

The get function returns the character at position n within the string. The \space, is a character constant in clojure, representing a space.

The next test forces us to search backwards to find the last space before we have to break the line. If no such space is found, we have a word longer than n. Otherwise we split the line at that space.  That backwards search is done by the .lastIndexOf function which is a direct call into the Java string library. It’s the . that indicates the direct java call.

(wrap "x x" 2) => "x\nx"

(defn wrap [s n]
  (if (<= (count s) n)
    s
    (let [space-before-end (.lastIndexOf s " " n)
          this-line-end (if (neg? space-before-end)
                            n
                            space-before-end)
          trailing-space (= \space (get s this-line-end))
          new-line-start (if trailing-space
                             (inc this-line-end)
                             this-line-end)
          head (subs s 0 this-line-end)
          tail (subs s new-line-start)]
      (str head "\n" (wrap tail n)))))
This has gotten a little ugly, so let’s refactor it a bit.

(defn find-start-and-end [s n]
  (let [space-before-end (.lastIndexOf s " " n)
        line-end (if (neg? space-before-end) n space-before-end)
        trailing-space (= \space (get s line-end))
        line-start (if trailing-space (inc line-end) line-end)]
    [line-start line-end]))

(defn wrap [s n]
  (if (<= (count s) n)
    s
    (let [[start end] (find-start-and-end s n)
          head (subs s 0 end)
          tail (subs s start)]
      (str head "\n" (wrap tail n)))))
You might not be convinced that those are all the test cases. If so, I encourage you to hunt for a new test case that will fail. Indeed, I encourage you to study those six simple test cases very carefully. Most people wouldn’t write them that way. It took me a lot of time with TDD before I realized the value of well-ordered, carefully considered, extremely minimal test cases.

Anyway, it would appear that, at least in this case, the rules of TDD apply just as much to functional programming as they do to any other kind of programming. So, as you start to explore functional programming, don’t throw out the baby with the bathwater. Keep your TDD discipline!

Some folks out there might complain that this algorithm isn’t functional; but I assure you that it is. There are no side effects. It is representationally transparent. It uses persistent data structures. It’s functional.

It does, however, lack one of the traits that many people associate with functional programs. It is not composed of a series of transformations.

Consider the squares of integers program again:

(take 25 (squares-of (integers))

The sheer elegance of this code comes partially from the fact that it is a series of transformations. The first transformation is the integers function. It transforms nothing into a lazy sequence of integers starting at 1. The second transformation is the squares-of function. It transforms any list of integers into a list of their squares. The final transformation is the take function, which transforms a lazy sequence of indefinite size into a sequence of exactly 25 elements.

Can we rewrite the word wrap problem as a series of transformations? Sure. Consider this:

(defn wrap [s n]
  (join "\n"
        (make-lines-up-to n
                          (break-long-words n (split s #" ")))))
We’ll read this the way we read the squares of integers program; from the inside out. First we split the input string into a sequence of words. Then we break any words longer than n into two or more words. Then we append those words to lines that are no longer than n. Finally we join those lines together with ‘\n’. Simple eh?

Well, it looks simple when it’s written like that. But here’s the implementation of the whole program:

(defn break-long-words [n words]
  (if (empty? words)
    []
    (let [word (first words)]
      (if (>= n (count word))
        (cons word (break-long-words n (rest words)))
        (cons (subs word 0 n)
              (break-long-words
                 n
                 (cons (subs word n) (rest words))))))))

(defn make-lines-up-to
  ([n words]
    (make-lines-up-to n words [] []))
  ([n words line lines]
    (if (empty? words)
      (conj lines (join " " line))
      (let [new-line (conj line (first words))]
        (if (>= n (count (join " " new-line)))
          (make-lines-up-to n (rest words) new-line lines)
          (make-lines-up-to n
                            words
                            []
                            (conj lines (join " " line))))))))

(defn wrap [s n]
  (join "\n" (make-lines-up-to
                n
                (break-long-words n (split s #" ")))))
There are plenty of folks out there who will eagerly tell you that I’m not the world’s best functional programmer. They are likely correct. And so this program may be woefully inadequate as a demonstration. Still, it’s hard for me to believe that my first solution to the word wrap is inferior to the above code.  This doesn’t mean that sequences of transformations are bad. On the contrary, I think they are very powerful, and we’ll be studying them in much more detail later. My point is that not all functional programs need to be sequences of transformations. The old rule of “simpler is better” still applies. And for the word wrap algorithm, at least as far as I can see (which is admittedly not very far) a transformational solution is not best.

By the way, I did not use TDD to create the transformational solution you see above. I suppose I could have; but instead I used the method that many functional programmers prefer. I thought about it for a long time, and then I used manual testing at the console (often called the REPL for: Read Evaluate Print Loop) to piece the whole thing together. The entire process took at least three times longer than the TDD approach, involved a lot of nasty debugging and print statements, and caused many infinite recursive loops that blew the stack and crashed my console. In short, it was a pain. I don’t recommend it.  

So, to wrap things up: the old rules still apply. Functional programming may be a change - an important change; but it doesn’t change everything. Programming is still programming. Discipline is still discipline. And TDD works just as well in functional programming as in any other style of programming. There may be some rules that need to be discarded when you adopt functional programming; but so far I haven’t found any.

https://blog.cleancoder.com/uncle-bob/2013/01/29/FPBE4-Lazy-Evaluation.html

FP Basics E4
29 January 2013
lazy evaluation
Remember my squares of integers program in clojure?

(take 25 (squares-of (integers)))
Remember that I showed you this program in Java too?

public class Squint {
  public  static  void  main(String  args[])  {
    for  (int  i=1;  i<=25;  i++)
      System.out.println(i*i);}
}
Well, that wasn’t a fair comparison. Here’s a much fairer comparison program written in Java.

take(25, squaresOf(integers()));
Notice that all I did was move the parentheses, add a comma, and use more conventional spelling.

Here’s a slighly larger context:

@Test
public void squaresOfIntegers() throws Exception {
  assertEquals(asList(1, 4, 9, 16, 25), squint(5));
}

private List<Integer> squint(int n) {
  return take(n, squaresOf(integers()));
}
Can you write this Java program? I’ll give you a hint: It uses lazy evaluation just like the Clojure program does. That’s right. That integers() function will return as many integers as you require. The squaresOf function accepts an “infinite” list of integers and returns an “infinite” list of their squares. Indeed, the squaresOf function calls a function named map which maps the values of one list into values of another by calling a specified function on each.

This squares of integers function, that I just wrote in Java, is a purely functional program. (Well, almost. I cheated in one place because it was convenient; but I needn’t’ve.)

So how’d I do it? What’s the secret? If you haven’t figured it out, you’re going to kick yourself when I tell you; because the trick is a trick that java programmers use every single day, and probably dozens of times each day. It’s the lazy evaluator that all Java programmers know and love. It’s the humble, lovable, iterator.

That’s right, Java programmers have been doing lazy evaluation of lists since the first days of Java. Indeed, some of us were doing it back in the good ol’ C++ days before Java was even a gleam in Gosling’s eye. You see, lazy evaluation is really all about the iterators.

OK, so here’s another hint about the implementation. Here’s how you create an infinite list of integers without taking up any time or space:

public class Integers implements Iterable<Integer> {
  public Iterator<Integer> iterator() {
    return new Iterator<Integer>() {
      private int i = 1;

      public boolean hasNext() {return true;}
      public Integer next() {return i++;}
      public void remove() { }
    };
  }

  public static Iterator<Integer> get() {
    return new Integers().iterator();
  }
}
Isn’t that cool? You can loop through an infinite list of integers like this:

for (Integer i : new Integers()) {
	// make sure you put a break in here at some point!
}
And the map function was even easier. Look at this:

public class Mapper<T> {
  public Iterator<T> map(final Func<T> func, final Iterator<T> xs) {
    return new Iterator<T>() {
      public boolean hasNext() {return xs.hasNext();}
      public T next() {return func.f(xs.next());}
      public void remove() {}
    };
  }
}
And that Func class is really simple. We’ve always had a form of lambda in Java:

public interface Func<T> {
  T f(T x);
}
I’m sure you can work out the rest of the program for yourself now. Once you know the trick, it’s really not that hard. But if you’d like to see my version of all the code, you can check out my javasquint repo.

####Woah there Nellie! From the above you might have gotten that idea that I was about to say that you can use Java as a functional language. Uh… No. Oh, little programs like squint are easy enough to make functional; but more interesting programs are harder. You see the problem is that Java’s data structures are mutable, and are designed to be mutated. So, in fact, writing functional programs in Java is quite difficult, and generally not practical.

So then why did I show you the iterator trick? To impress upon you the fact that there’s no magic or mystery about lazily evaluated sequences in Clojure or other functional languages. They’re just using iterators like Java would.

####Walking XML Trees I’m sure you’ve written code that does a depth-first walk through XML documents. Consider the following simple XML document:


<alpha>
	<beta>
		<gamma> 1 </gamma>
		<gamma> 2 </gamma>
	</beta>
	<beta2>3</beta2>
</alpha>

If you walked this depth-first, you’d encounter the nodes in the following order [alpha, beta, gamma, gamma, beta2]. Indeed, you could consider the XML document to be a linear list of nodes in that order. Indeed you could easily construct an iterator that walked the XML nodes in that order and gave you the illusion that you were simply walking a linear list. INDEED if you integrated that interator into the XML document class you could do a depth-first search with the following code:

for (XMLNode node : xmlDocument)
  System.out.println(node.toString());
Now if you walked that XML document in that fashion, and printed each node as you encountered it as shown, then the printout might look something like this:


<alpha><beta><gamma>1</gamma><gamma>2</gamma></beta><beta2>3</beta2></alpha>
<beta><gamma>1</gamma><gamma>2</gamma></beta>
<gamma>1</gamma>
<gamma>2</gamma>
<beta2>3</beta2>

Now stand back and look at the code and the output. Forget that you know that the iterator of XMLNode does a depth-first traversal. Assume that it’s like any other iterator that just does a simply sequential walk. It looks like your xmlDocument class is a list of nodes with an awful lot of duplication in it, doesn’t it? You wouldn’t ever create a list that looks like that just to walk an XML document would you? I mean, that would just waste a lot of storage – especially if the xml document was really big.

So if you think about it by considering the way it looks, it appears foolish. Yet if you think about it from the point of view of using an iterator, it makes perfect sense. It’s not wasteful at all, because that absurd list simply does not exist.

####Clojure So now check this out. I have a file with that XML in it. It’s named doc.xml. I can read it into Clojure using the parse function from clojure.xml, and I can pretty print it with pprint:

(pprint (parse "doc.xml"))
{:tag :alpha,
 :attrs nil,
 :content
 [{:tag :beta,
   :attrs nil,
   :content
   [{:tag :gamma, :attrs nil, :content ["1"]}
    {:tag :gamma, :attrs nil, :content ["2"]}]}
  {:tag :beta2, :attrs nil, :content ["3"]}]}
The attrs dictionaries are for the silly attributes that you can put into XML tags (who thought that was a good idea?). The parse function converts the XML document into a pretty simple form. It’s a dictionary of tags that have content elements that are lists of other dictionaries that contain tags. A nice recursive tree structure.

Doing a depth first traversal of that structure would not be too hard, but it’d be more complicated than walking a linear list. However, take a look what happens when I put this data structure through the xml-seq function:

(pprint (xml-seq (parse "doc.xml")))
({:tag :alpha,
  :attrs nil,
  :content
  [{:tag :beta,
    :attrs nil,
    :content
    [{:tag :gamma, :attrs nil, :content ["1"]}
     {:tag :gamma, :attrs nil, :content ["2"]}]}
   {:tag :beta2, :attrs nil, :content ["3"]}]}
 {:tag :beta,
  :attrs nil,
  :content
  [{:tag :gamma, :attrs nil, :content ["1"]}
   {:tag :gamma, :attrs nil, :content ["2"]}]}
 {:tag :gamma, :attrs nil, :content ["1"]}
 "1"
 {:tag :gamma, :attrs nil, :content ["2"]}
 "2"
 {:tag :beta2, :attrs nil, :content ["3"]}
 "3")
Look closely. See the opening parenthesis? Aha! This is a list! It’s a list of all the nodes in a depth first order! Oh, and there’s all that duplication again! Ugh! How wasteful. How awful! How foolish to create such a bloated, redundant data structure.

Oh. But wait. xml-seq returns a lazy sequence! The nodes aren’t evaluated until they are asked for. The list of nodes does not take up extra space! It’s just an efficient and convenient way to walk a depth-first traversal – rather like our Java iterator.

####Conclusion So the moral of the story is simply this: When you have lazy sequences at your disposal, you can design your data structures for convenience, without undo concern for time and space; because lazy sequences are really just a clever use of iterators.
