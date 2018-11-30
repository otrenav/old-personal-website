+++
draft = true
+++

Kavliwashere.com
Home
My work
Blog
Me
Do’s and don’ts of starting up test automation
Katrine Kavli26th February 2018Software testing
TAGS: CONSULTANT, DOCUMENTATION, EFFICIENCY, MANUAL TESTING, PROJECT MANAGER, TEST AUTOMATION, TOOL
Ah, the promised land of test automation. So much money, time and energy saved! When starting up test automation, your goal is efficiency and frequent checks! Yet, a lot of automation efforts are far from efficient. And that’s too bad, because there really is a lot of good things in test automation – if done right.

In a pension project, we implemented a solution where health declaration were automatically accepted, denied or put in a queue for manual processing, depending on four different scores. While the solution was implemented, I made an automated data-driven test suite, testing all the different combinations and ranges of the scores.

The final test, after a month of development, took me 10 minutes. It actually only took me 5 minutes, but the project leader couldn’t believe her ears, so she made me run it again.

That project was perfect for test automation. But not every project is as straightforward. I’ve collected some Do’s and Don’ts for you if you’re considering implementing automated test suites.

Don't...
Automate all your manual tests
Manual tests are amazing, and will find problems you never imagined existed. But the manual approach does not always translate directly to automated checks. Consider making new scenarios specifically for automation.

Leave the automation job to one specialist
While it’s a good idea to hire an automation consultant to get everything started, make sure that the knowledge is shared with others in the project. One day, the consultant or key person will be gone, and others will have to take over the test suite.

Automate everything
There must be a reason that a test scenario is automated. It has to give some sort of value to the project. Start with the mundane tasks that you are doing every day anyway. That’s where you’ll find the first, immediate payoff of your automation efforts.

Automate for automation's sake
Think about what you need, and what you need right now. If you aim for 80%-100% automation in all projects just because “that’s the big thing and the CEO wants it” or “it sounds good when presenting to the board”, you’re wasting time and money.

Buy the first, the best automation tool
Find a tool that fits your needs, and make sure that the tool can actually do what it promises. Don’t be persuaded by a seller to buy an expensive program that is really smart right now, in this specific project or on this specific platform. And don’t force other projects in your company to use it if they don’t need it.

Think in "passed" and "fail"
You will get cases that “fail”. That doesn’t mean that there’s an error in there. Don’t translate a “Failed” flag to a bug, you need to figure out WHY the test failed. Also consider whether the sharp “Passed/Failed” categories are the right way to report the automated runs. Maybe another classification would be better suited?

Run everything, every time
Think about what the purpose of the test run is. If you don’t need to test a specific area – don’t. Only test functionality that needs testing. Testing everything else is a waste and clutters your reports with irrelevant data. Sure, you can have constantly running checks, but make sure their purpose is clear.

Forget to test your tests
You should get used to the idea of testing your test. An automated test scenario shouldn’t be released unless you’ve seen it fail – several times. Run the test under circumstances where it surely will fail, so you can count on that it will when put into action.

Underestimate the effort it takes to keep an automated suite running
Having an automated test suite is not something that can be started up and then run on its own. There are constant changes in your systems, and the suite needs to be updated and expanded. Don’t leave the responsibility to that one technical tester in your company.

Do...
Break down tests into independent scenarios
It’s easier to figure out where the problems and errors are if your suite consists of short, specific test scenarios. Don’t test it all in one scenario. If you have to look at every single thing that is being checked in the scenario, troubleshooting will be VERY hard. Keep it short and simple.

Make the automated test suite a common project effort
Why not let everyone, not just testers, have an influence on and contribute to the suite? Developers, project manager, product owners.. they all have different reasons for wanting an automated test suite, and different ways of contributing.

Let people know of the results of the automated runs - and think about who the receiver is
Provide different test run results to different roles in the project. A developer will want information from an automated test suite, that a project manager have no interest in. Involve all roles in the project and hear them out on what kind of information they need.

Start out small and create the test suites along the way
In the beginning, create what you need and follow the work flow of the project. Projects change constantly. Don’t waste time, energy and money on creating something that will never be used or is changed in the last minute. Create the suite along the way, bit by bit.

Make your automated setup work hard
You’ve bought the expensive program, you’ve made the setup, you’ve used a lot of time to create and update the test suites.. Use it! Make a suite that can run often AND is valuable to the project. An automated suite that is not running, is a waste of money.

Consider that your project and company changes
Find a program that can grow with your projects and company, and know what you can do – and can’t do – with it. If it isn’t working for you, discard it. There’s no reason to waste your time and money on inadequate tools.

Unburden your manual testers
Try to think of the automated test suite as a helping hand for the testers. Free up their time from tedious, repetitive tasks, so the tester can do what they are best at – testing, not following scripts.

Make your suite quick and easy to run
Setting up and starting automated test runs should be an easy task with some sort of immediate feedback. If your suite is slow or complicated, people won’t bother running them.

Keep the suite constantly updated
The rule is, if your code base changes, then so does your test suite. This is true for ALL code base changes. When bugs are fixed, new features are also added to the system, and that means updating the test suite.

And last, but not least...
Don't just accept what some random article on the Internet tells you
YOU know what you need, so YOU decide whether these Do’s and Don’ts apply to your test setup.

Happy automating!

Share this:
Share
Related posts
What on earth can just 2 days of testing do for a project?
What on earth can just 2 days of testing do for a project?
25th January 2016

In "Software testing"

Testing chatbots: An introduction to conversational interfaces
Testing chatbots: An introduction to conversational interfaces
19th January 2018

In "Software testing"

Nobody reads my test documentation
Nobody reads my test documentation
13th September 2017

In "Software testing"

Continue Reading
Previous Post
Drawing wireframes for a better user experience
Next Post
GDPR, Miming passwords and laws in Denmark
Leave a Reply

Kavliwashere.com 2018
:)
