+++
draft = true
+++

https://www.silasreinagel.com/blog/2016/09/17/the-practical-value-of-tdd/

The Practical Value of TDD
Sep 17, 2016      -      4 minute read

Programming is a practical discipline. There are no silver bullets. The effectiveness of different techniques varies in usefulness, depending on the tools, the team, and the development environment.

Test-Driven Development (TDD) is still a controversial practice. For many developers, they dislike TDD because they lack discipline. They would rather just cobble together some code and mark their task complete. However, there are also a small number of experienced developers who have used TDD and find that it does not offer them much value. Their perception is usually accurate. For any practice, the practice itself is not what matters – it is the value which the practice provides which matters. If TDD offers value, then what matters is the value it offers, not the mechanism by which we attain that value.

TDD offers two primary practical values.

1. TDD focuses on the Problem Space
The first law of TDD is: You may not write any production code until you have a failing unit test. What this means is that you first must write some code that calls the new functionality, before you can begin coding it. This forces you to decide how you will interact with your program.

Your first lines of test code define the API and usage syntax:

GzipCompressor compressor = new GzipCompressor();
byte[] sBytes = compressor.compress("SampleLine".getBytes());
This is extremely valuable since it forces you, as a developer, to think about the problem you are solving, and not about how a computer works.

This paradigm is not natural to most programmers. Since programmers spend most of their mental energy focusing on solving the problem of getting the computer to do specific things, their minds are trained to think about problems bottom-up. This creates an intrinsic conceptual separation when the programmer tries to implement a feature. The client is trying to solve a business problem, such as how to track a multi-package shipment or display album information on their website, and the developer’s mind immediately begins thinking about databases, data protocols, service interfaces, booleans, bytes, strings and arrays.

TDD offers a new mental frame. It teaches programmers to think about problems top-down. Since strict adherence to the laws of TDD means that you cannot begin thinking about specific code implementations until you have tests, you focus on what behavior the software will provide. This leads to much more clear, intuitive, and expressive code. It preempts the possibility of optimizing early or mindlessly applying certain design patterns.

2. TDD yields a Comprehensive Automated Test Suite
The other big benefit is the ability to ensure the behavior of your software. This offers the most value when you are working with a team or building anything larger than a small program. They are also extremely useful in a small program which is changed or improved frequently.

Following the laws of TDD will always result in a suite of tests that covers virtually every line and logic branch in your program. If you wrote them well, they will be simple, easy to read, reliable, and very fast. They will document precisely what your program is expected to do, what sorts of varying inputs are allowed, what sorts of errors may occur, and how your components are constructed.

Whenever you want to know for certain if your code handles all of the designed use cases, you can simply run your test suite and get rapid feedback.

Add new functionality and want to ensure that you didn’t break something elsewhere in the program? Run your tests.
Merge with another commit and need to validate that you merged correctly? Run your tests.
Experimenting with a better plugin or new library? Run your tests.
Ready to release a new version? Run your tests and ship it.
Creating a test suite that you can trust isn’t easy. It takes disciplines, dedication and hard work. But the result is that you and your team can ensure the quality of software with minimal effort.

To gain all of the benefits of Continuous Integration, you absolutely must have a comprehensive suite of automated tests. I know of no better practical way to end up with a trustworthy and comprehensive suite of tests than the discipline of TDD.

I’m a practical programmer. You probably are, too. The only useful programming practices and disciplines are the ones that offer practical value.

The two primary values of TDD are that it forces you to focus on the problem you are solving instead of the technological details of the solution, and that it yields a comprehensive automated test suite. These are certainly not the only benefits TDD offers, but they seem to be the most important ones.

Presently, Test-Driven Development seems to be the simplest and most efficient way to gain these two values.

https://blog.cleancoder.com/uncle-bob/2014/09/03/TestTime.html

Fast.
Tests need to run fast. Anything that gets in the way of fast test times is forfeit, no matter what other wonderful benefits it may provide. It may have really super mocking tools; but if it’s slow, drop it!. It may be endorsed by all the top gurus; but if it’s slow, burn it!. It may be the tool that ships with your IDE; but if it takes ten seconds just to start testing, toss it! Allow nothing to slow down your tests.

Why? Simple. Slow tests aren’t run often enough. The slower the tests the less frequently they are run. The less frequently the tests are run, the more invested you get in the code you write between the test runs; and the more you will allow the code to rot just to avoid another expensive test run.

The primary benefit of TDD is the ability to refactor without fear, and without cost. The slower your tests run, the higher the refactoring cost. The higher the refactoring cost, the faster your code will rot. And rotten code slows everything else down. Don’t let the tests get slow!

A Design Challenge
Keeping the tests running very fast is a design challenge. It’s one of the design constraints that well heeled craftsmen put upon themselves. They purposely design the system so that the test time is fast. That means choosing fast testing tools and building decoupled architectures. That means thinking about how to keep the tests running fast all the time; and refactoring when the tests start getting slow.

Decoupled architectures allow you to build fast test doubles that stub out
subsystems that are traditionally slow. For example, if your system is well
decoupled, it is trivial to stub out the database or the web server. If the
system is well decoupled, all slow operations fall on the far side of an
architectural boundary that can be stubbed. And that stubbing can turn a test
that takes minutes, into a test that runs in milliseconds!

To attain those speeds we stub out all the slow things like the persistence framework, and the web framework. We stub them in the unit tests. We stub them in the acceptance tests. Anything that runs slow, we stub.

Of course not all the tests stub those things out. Some of the tests go all the way through from web server to database. But well over 90% of those tests bypass the slow stuff. After all, how many times do you need to tests the database to know that it works? How many times do you need to test the web server to know that it works? The answer to both questions is pretty close to one. So testing those slow things much more than once is a waste of time.

###Conclusion Programmers who care about their systems, care about the tests for
those systems. Programmers who care about the tests, make sure those tests run
fast. Slow running tests represent a design flaw that reflects on the experience
and professionalism of the team. A slow running test suite is either a freshman
error, or just plain carelessness.

https://blog.cleancoder.com/uncle-bob/2014/04/30/When-tdd-does-not-work.html

When TDD doesn't work.
30 April 2014
Over the years many people have complained about the so-called “religiosity” of some of the proponents of Test Driven Development. The recent brouhaha over TDD has, once again, brought these complaints to the fore. So I thought it would be a good idea to talk about when TDD does not work.

I have often compared TDD to double-entry bookkeeping. The act of stating every bit of logic twice, once in a test, and once in the production code, is very similar to the accounting practice of entering every transaction twice, once on the asset side, and once on the liability side. The running of the tests is very similar to the creation of the balance sheet. If the balance of assets and liabilities isn’t zero, somebody made a mistake somewhere.

So stating that there are places that TDD doesn’t work may seem like stating that there are places where double entry bookkeeping doesn’t work. However, software is different from accounting in one critical way: software controls machines that physically interact with the world.

For example, let’s say that I am writing a program that controls a machine that has a bell. The software must ring the bell when certain events occur. How can I test that my software rings the bell?

The only way to actually test that the software rings the bell is to connect a microphone to my computer and write some code that can detect the ringing of a bell.

Well, no, that’s not right. I could test that the software rings the bell by listening. In other words, I can test that manually.

Now, I can write unit tests that mock out the bell driver, and I can test that my software sends the appropriate signals to that driver at the appropriate times. I can write unit tests that prove that the software should ring the bell. But if I want to be sure that the bell rings when the proper signals are sent to the driver, I either have to set up that microphone or just listen to the bell.

How can I test that the right stuff is drawn on the screen? Either I set up a camera and write code that can interpret what the camera sees, or I look at the screen while running manual tests.

Now, I can mock out the screen and test that my software sends the right signals to the screen driver. I can test that my software should put the right stuff on the screen. But if I want to be absolutely sure, I have to either set up that camera, or look at the screen.

You can see where I’m going with this, can’t you. It’s the stuff out at the boundaries of the system. It’s the IO devices that require manual testing. At the moment the software controls something that physically interacts with the world, automated tests become so impractical that manual tests are the best option.

But what about the layer just before the physical world? Can you write automated tests for that layer?

Consider CSS. Can you write a test that ensures that the CSS for a page is correct? Yes, you can, but it’s almost certainly a waste of time. The reason is that in order to write that test you have to know the contents of the CSS. If you want to test that the width for a certain element is 5px, then 5px must appear both in the CSS and the test.

Remember the TDD rule: As the tests get more specific, the code gets more generic. Every new test case makes the test suite more constrained and more specific. To make the new test case pass, the programmer strives to make the production code more general, not more specific. We don’t pass tests by adding if statements that correspond to each test. We pass tests by innovating general algorithms.

But CSS doesn’t work like that. There is no general algorithm for CSS. The CSS is just as specific as any test you could write. Indeed, you could write a program that reads the CSS and writes the tests. Such tests add very little value, and they certainly aren’t written first.

Besides, how do you know if the CSS is correct? Remember we are doing TDD. We are writing our tests first. How do you know, in advance, what the CSS should be? The answer is that usually you don’t. Usually you write some initial CSS, and then you look at the screen and fiddle with the CSS until it looks right. Your eyes, and your mind, are the actual test. Once the CSS is right, there’s no point in writing a test for it.

So near the physical boundary of the system there is a layer that requires fiddling. It is useless to try to write tests first (or tests at all) for this layer. The only way to get it right is to use human interaction; and once it’s right there’s no point in writing a test.

So the code that sets up the the panels, and windows, and widgets in Swing, or the view files written in yaml, or hiccup, or jsp, or the code that sets up the configuration of a framework, or the code that initializes devices, or… Well you get the idea. Anything that requires human interaction and fiddling to get correct is not in the domain of TDD, and doesn’t require automated tests.

So, now we have two places where TDD is impractical or inappropriate. The physical boundary, and the layer just in front of that boundary that requires human interaction to fiddle with the results. Are there any other areas where tests aren’t appropriate?

Yes. The test code itself. I don’t mean the actual unit tests. I mean the support code for those unit tests. The FitNesse fixtures, or the cucumber steps, or the Object Mothers, or the Test Doubles. You don’t have to write tests for those because the actual unit tests and the production code are the tests for those pieces of code.

That’s really about it. For pretty much everything else you can write tests, and you can write them first. For pretty much everything else, you can use TDD.

However, there’s one other rule. It’s not fair to load those layers with logic just so you can avoid writing tests for that logic. Indeed, it is imperative to denude these layers of logic, and export that logic to modules that you can test.

This exporting of logic from the boundaries of the system, and from the fiddling layers next to those boundaries has a name. It’s called Humility. We keep these layers humble by moving all the logic associated with them out into other modules for which we can easily write tests.

This means you don’t put any unnecessary logic into your JSP files, or you Swing setup code, or your yaml files. You keep that code humble by moving logic into other modules that can be tested.

It has been claimed that this exporting of logic is damaging to the design of the application. I disagree. From my point of view, exporting logic is nothing more than separating concerns. In this case we separate the code that must be fiddled from the code that can be tested. Those two domains of code will change for very different reasons and at very different rates; so it is wise to separate them. Separating them is good design.

https://qualityengineer.blog/2018/best-practices-3-speeding-up-test-suite/

2018-11-19 BY QUALITYENGINEER
Best practices #3: Speeding up test suite


Every developer and tester knows that it’s fundamental for every automation test to be fast and stable. But how to achieve the first of these two characteristics?

Here you can find 10 advices:


First of all we need to realize that we are more interested in execution time of entire test suite rather than single test case. Therefore first thing we can do is to execute our tests in parallel. This is definitely the most effective approach among any other advices on the list. Most of modern test frameworks give such ability. Just check the documentation. For example when you use grade and testng you can set maxParallelFork parameter. But be careful, if your tests are not well designed and they have dependencies one on another probably some of them will start failing.
Check parallelization strategy of your framework. Some of them run test cases in parallel and some classes. In the second approach when you have big test classes you may consider splitting them into smaller ones.
If you have an ability of setting order of execution always put the most time consuming first. According to greedy algorithms sorting test cases from the lowest one to the fastest will give the best results.
For UI and e2e tests consider using API of your application to perform test setup. Even if your application doesn’t provide any api you may try to use raw HTTP calls for this purpose. You may save a lot of time this way.
If you are able to save state of your system consider not setting up everything before each test. Rather use already prepared environment.
Use reports generated by test framework or CI server ( ex. Jenkins test plugin) for detecting the slowest test cases and consider refactoring.
Never use hardcoded sleeps in your test code. Better approach is waiting for some event or polling the system with small time intervals.
Keep your code clean. Legacy code tend to do much more then it is needed. Every action take some time. So focus on your code structure and coding standards.
Avoid redundancy in your tests. Often couple of tests do the similar checks. In general there is no need of testing the same thing on many different levels. Lower level tests are faster so always test in the lowest possible one.
Think of replacing external input/outputs of your application in test environment with mocks and introduce contract testing. Here you can find interesting talk about strategy for testing microservices in very efficient way by cucumber creator: https://skillsmatter.com/skillscasts/9971-testable-software-architecture-with-aslak-hellesoy
Last, extra advice. Ask yourself if you truly need all of tests you have. Remember that even the most extensive test suite is useless when it is never or hardly ever executed. Fast feedback is very important so check if you are not having tests protecting you against defects that are not even a risk and consider switching them off.
Hope this short list will help you faster your test suites and make your life better 😉

https://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html

First-Class Tests.
05 May 2017
I believe it may be my fate to find blogs written by people who have fallen prey to unfortunate disciplines that have led them to give up on unit testing. This blog is just another one of those.

The author tells of how his unit tests are fragile because he mocks out all the collaborators. (sigh). Every time a collaborator changes, the mocks have to be changed. And this, of course, makes the unit tests fragile.

The author goes on to tell us how he abandoned unit testing, and started doing, what he called “System Testing” instead. In his vocabluary, “System Tests” were simply tests that are more end-to-end than “unit tests”.

So first, some definitions. Pardon me for my hubris, but there are so many different definitions of “unit test” and “system test” and “acceptance test” out there that it seems to me someone ought to provide a single authoritative definition. I don’t know if these definitions will stick; but I hope some set of definitions does in the near future.

Unit Test: A test written by a programmer for the purpose of ensuring that the production code does what the programmer expects it to do. (For the moment we will ignore the notion that unit tests also aid the design, etc.)

Acceptance Test: A test written by the business for the purpose of ensuring that the production code does what the business expects it to do. The authors of these tests are business people, or technical people who represent the business. i.e. Business Analysts, and QA.

Integration Test: A test written by architects and/or technical leads for the purpose of ensuring that a sub-assembly of system components operates correctly. These are plumbing tests. They are not business rule tests. Their purpose is to confirm that the sub-assembly has been integrated and configured correctly.

System Test: An integration test written for the purpose of ensuring that the internals of the whole integrated system operate as planned. These are plumbing tests. They are not business rule tests. Their purpose is to confirm that the system has been integrated and configured correctly.

Micro-test: A term coined by Mike Hill (@GeePawHill). A unit test written at a very small scope. The purpose is to test a single function, or small grouping of functions.

Functional Test: A unit test written at a larger scope, with appropriate mocks for slow components.

Given these definitions, the author of the above blog has given up on badly written micro-tests, in favor of badly written functional tests. Why badly written? Because in both cases the author describes these tests as coupled to things that they should not be coupled to. In the case of his micro-tests, he was using too many mocks, and deeply coupling his tests to the implementation of the production code. That, of course, leads to fragile tests.

In the case of his functional tests, the author described them as going all the way from the UI to the Database; and made reference to the fact that they were slow. He cheered the notion that his tests could sometimes run in as little as 15 minutes. 15 minutes is much too long to wait for the kind of rapid feedback that unit tests are supposed to give us. TDDers are not in the habit of waiting for the continuous build system to find out if the tests pass.

Skilled TDDers understand that neither micro-tests, nor functional tests, (nor Acceptance tests for that matter) should be coupled to the implementation of the system. They should (as the blog’s author urges us) be considered as part of the system and “…treated like a first-class citizen: [They] should be treated in the same way as one would treat production code.”

What the blog author does not seem to recognize is that first class citizens of the system should not be coupled. Someone who treats their tests like first class citizens will take great pains to ensure that those tests are not strongly coupled to the production code.

Decoupling micro-tests and functional tests from the production code is not particularly difficult. It does require some skill at software design; and some knowledge of decoupling techniques. Generally, a good dose of OO design and dependency inversion, along with the judicious use of a few Design Patterns (like Facade and Strategy) are sufficient to decouple even the most pernicious of tests.

Unfortunately, too many programmers think that the rules for unit tests are different – that they can be “junk code” written using any ad hoc style that they find convenient. Also, too many programmers have read the books on mocking, and have bought in to the notion that mocking tools are an intrinsic, and necessary, part of unit testing. Nothing could be further from the truth.

I, for example, seldom use a mocking tool. When I need a mock (or, rather, a Test Double) I write it myself. It’s not very hard to write test doubles. My IDE helps me a lot with that. What’s more, writing the Test Double myself encourages me not to write tests with Test Doubles, unless it is really necessary. Instead of using Test Doubles, I back away a bit from micro-testing, and write tests that are a bit closer to functional tests. This too helps me to decouple the tests from the internals of the production code.

The bottom line is that when people give up on unit tests, it’s usually because they haven’t followed the above author’s advice. They have not treated the tests like first-class citizens. They have not treated the tests as though they were part of the system. They have not maintained those tests to the same standards that they apply to the rest of the system. Instead, they have allowed the tests to rot, to become coupled, to become rigid, and fragile, and slow. And then, in frustration, they give up on the tests.

Moral: Keep your tests clean. Treat them as first-class citizens of the system.

https://blog.cleancoder.com/uncle-bob/2012/04/18/After-The-Disaster.html

After the Disaster
18 April 2012
There’s a disaster coming. I don’t know when. I don’t know what. But it’s coming, and there’s nothing we can do to stop it; but there is something we can do to mitigate it.

How much software is running near you at the moment? Of course you are reading this on a web browser, and that computer you are sitting next to has lots of software running in it. And there are probably many other computers near you with software running on them. Is there software in your cell phone? Of course. How about in your watch? Likely. In the light switch on the wall? How about in the light bulbs? The intercom? The doorbell? The thermostat? Your furnace? Your air conditioner? Your refrigerator, dishwasher, washing-machine, drier? How about your car; and all the other cars on the road? How about the traffic signals? Did you ride an elevator today? Get in a plane or a train? How about an escalator? Do you have a pacemaker? An insulin pump?

When you think about it, it’s everywhere And it’s spreading…

How many times per day do you put your life in the hands of an ‘if’ statement written by some twenty-two year old at three in the morning, while strung out on vodka and redbull?

Some time in the not too distant future, there’s going to be an event. Thousands of people will die. And it will be the fault of some errant piece of code written by some poor schmuck under hellish pressure facing impossible deadlines. Perhaps it will be an airline crash, or a cruise ship sinking. Perhaps it’ll be an explosion at a factory, or a train accident involving toxins. Perhaps it’ll be a simple clerical error at a medical research lab that causes a vial of smallpox or ebola to be improperly disposed of.

It doesn’t matter what it is. What is sure is that it’ll come. The probability is not high that it will happen today, or even this year; but the probability is also not zero. It will happen.

And when it happens, when thousands of people are killed by a stupid software error, the governments of the world will act. They’ll have to. The population will scream for protection, and the lawmakers will respond with self-righteous indignation. In their toolkit they’ll have regulations, restrictions, licensing requirements, and certification tests. They might take control of our education. They might specify who can be hired and who can’t.

What tools they bring to bear upon us depends upon us. When the disaster happens, what will the congressional and world court investigations find? Will they find a software industry that has defined a set of professional disciplines that it requires of it’s members? Will they find that the software industry has done the due diligence to ensure that it’s members are educated, trained, and skilled? Will they find that the software industry is composed of serious professionals who reliably follow their disciplines and practices?

Or will they find the chaos that exists today? Will they find developers who don’t write tests? (Can you hear the strutting politicians making hay with that? “Mr. President, it is my sad duty to inform this august body that these developers have no record that they test their code…“) Will they find that developers work at all hours of the day and night, are under hellish pressure and impossible deadlines? Will they find that there are no professional standard, practices, or disciplines. Will they discover that we are all really just a bunch of undisciplined hacks?

The answer to that question will determine which, if any, of those regulatory tools those self-righteous posturing politicians will foist upon us when the accident happens. If they find that we are disciplined, and self regulating, then perhaps they’ll leave us mostly alone. But if they find that we are undisciplined hacks then you know that they’ll impose all manner of horrible regulation upon us.

They might tell us what languages to use. They might tell us what process to use. They might tell us what our working hours must be. They could give us a dress code. They could turn us all into civil servants. They could do anything that want.

We need to get ahead of this one before it happens. Otherwise we’ll work in a government regulated profession. And then life will be hell.

https://blog.cleancoder.com/uncle-bob/2011/11/06/Double-Entry-Bookkeeping-Dilemma-Should-I-Invest-or-Not.html

Double Entry Bookkeeping Dilemma. Should I Invest or Not?
06 November 2011
A few days ago I found this blog, which makes the case that software developers who use TDD, should be pragmatic about the costs and benefits. You should read the blog now. Notice how reasonable and balanced it sounds. Now read what follows and ask yourself if that too seems reasonable and balanced.

Every single transaction must be doubly entered!

This sound advice rather seems quite extreme to me. IMHO a skilled accountant pragmatically decides when to invest in double entry bookkeeping.

After practicing double entry bookkeeping for over a decade, I’m a strong believer and proponent of double entry bookkeeping.

However over the years I’ve realized that double entry bookkeeping does have four, very important, costs associated with it:

Cost of entering transactions twice in the first place
Cost of summing both credit and debit regularly to get feedback
Cost of maintaining and updating both entries as and when required
Cost of understanding other’s account structures.
One also starts to recognize some other subtle costs associated with double entry bookkeeping:

Illusion of safety: While double entry bookkeeping gives you a great safety net, at times, it can also create an illusion of safety leading to accountants too heavily relying on just the dual set of books (possibly doing more harm than good.)
Opportunity cost: If I did not invest in doubly entering this particular transaction, what else could I have done in that time? Flip side of this argument is the opportunity cost of repetitive checking and rechecking or even worse not checking at all.
Getting in the way: While double entry helps you drive your account structure, at times, it gets in the way of restructuring the accounts. Many times, I’ve refrained from restructuring the accounts because I get intimidated by the sheer effort of restructure/re-enter a large number of my transactions as well. (I’ve learned many patterns to reduce this pain over the years, but the pain still exists.)
Obscures a simpler structure: Many times, I find myself so engrossed in my accounts and the structure they lead to, that I become ignorant to a better, more simpler structure. Also sometimes half-way through, even if I realize that there might be an alternative structure, because I’ve already invested in a structure (plus all the complementary entries), its harder to throw away the structure. In retrospect this always seems like a bad choice.
If we consider all these factors, would you agree with me that: Double entry bookkeeping is extremely important, but each accountant has to make a conscious, pragmatic decision when to invest in entering something twice.
Its easy to say: always practice double entry bookkeeping, but it takes years of first-hand experience to judge where to draw the line.
