+++
draft = true
+++

A Basic Guide to Choosing the Right Tech Stack for Client Work

Photo by Robert Anasch on Unsplash
Understanding the impact of choosing the right tech stack is a major factor of success for freelance developers. This guide explores key questions that you should answer when picking the best technologies for your client’s application or website. We urge you to read it before hopping carelessly on the latest JavaScript framework.

As most developers who have a bit of experience know, building software professionally is not only about shipping promptly. It’s also about optimizing for maintainability, scalability, and security, and the level of each depends on the client’s business.

A proper analysis of the project will dictate which technologies you should be using, not the other way around. This simple principle will foster great, long-term business relationships.

The impact of your tech choices will be felt at almost every layer of the business, from HR to finance, from management to marketing. A lack of vision could ruin your reputation — an asset no freelancer should compromise.

To build the following list, we interviewed senior freelance developers about the important questions they ask themselves before they write a single line of code. We divided the results into 3 blocks: understanding the project (business perspective), picking the stack (technical perspective), and passing the torch (HR perspective).

Let’s get started.

Understanding the project

It’s mandatory that you understand the product vision, the client’s business, and the timeframe of the project.

What is the Scope, Budget, and Timeframe of the project?
Does your client need everything delivered in 2 weeks to survive, or is it a long-term project that requires robustness and maximum maintainability?

You ought to know:

When does it need to be delivered?
How many of your hours can they pay for?
What is the expected result?
The answers will define the rough frame for the following questions. It is also a very good way to know if your client has realistic expectations before you start (for more information about signals to identify terrible clients, read this post).


Is it a one-timer or a long-term project?
A short-lived project that will be instantly trashed after an event or a certain milestone shouldn’t be approached as a decade-long project.

There is no point in over-engineering the architecture of a prototype — it’s just a great way to waste precious budget. On the other hand, if the client plans on hiring 20 developers in the next 5 years to iterate on your codebase, you’ll need to build robust pillars on extensively-tested technologies.

Can they handle the Technical Debt?
A client who is pressured to generate revenue will tolerate a bit of technical debt to get to market ASAP. If gathering marketing data is the main objective, they won’t care about continuous integration and percentage of test coverage. Business objectives first, technical objectives second.

A bit of education might be necessary here. It is your responsibility to make them understand the consequences of accumulating technical debt in the long run. Demonstrating such foresight is a good way to build credibility.

How Secure does it need to be?
Now think about your client’s field of activity for a second. Chances are their data’s sensitivity will vary, right? Well, the technologies you’ll pick must reflect this unique reality. You won’t need a 4096-bit RSA and DDoS protection for the local festival’s website.

But integrating an experimental plugin with known exploits for an app hosting financial info? A bit risky, pal.

Still, though, thread lightly when it comes to security-obsessed clients. Some of them hear out-of-context horror stories that keeps them up at night:

“But I’m convinced these Russian hackers I’ve seen on TV will steal our restaurant’s mailing list.”

No, dear Client. They probably won’t.

Can I handle the project?
Picking a project that is way above your skill level will almost certainly end up in a mess.

Your uneducated choices will burden the workflow, and milestones will be missed. Don’t be reckless with your client’s money — legal consequences are never too far away.

If you have any doubts about your ability to deliver a project, make sure you do your research before you get on board.

Picking the right stack

Now let’s move on from the project management concerns. Let’s talk about what really matters: the stack. Picking the right technologies should come pretty naturally if you have bit of experience and a clear vision of what you need to build.

How can I not code?
Hundreds of frameworks and thousands of plugins are maintained by active communities of developers. Don’t waste your precious time re-developing something that has already been polished over the years.

Maybe you don’t even need a server! Generous and passionate people are trying to make your job easier — don’t disregard their efforts. Reinventing the wheel is stupid.

Development time should always focus on what makes the project unique: the custom business logic. Before you write a single line of code, make sure it adds value to the project.

Is it Overkill, or Under-powered?
Your client plans on selling custom t-shirts to local customers through a small e-commerce? You don’t need a high availability, load balanced, clustered, no-SQL front-end caching mechanism, ready to support a million concurrent customers. This would be like moving out of your apartment with a cargo ship.

On the other hand, trying to take down a bull with a slingshot isn’t super effective. A client who plans on selling thousands of items on a daily basis will resent you for picking a free CMS solution deployed on a cheap instance.

Pick the right tool for the job.

Are these Technologies well documented and supported?
Digging into a comment-less Japanese codebase because an arcane plugin suddenly stopped working isn’t the best way to spend a night. Make sure there is an active community around each technology you pick. If the last repository update was 4 years ago, be worried.

That feeling of helplessness when you get 3 useless Google results for your technical question is even worse when the client is screaming at you on the phone.

Do I understand the Risks associated with the new technology?
That trending framework on HackerNews probably wasn’t road tested properly. You might feel edgy for using it as the central pillar of a production project, but just know it adds a great deal of unnecessary external risk.

If you still feel careless, at least experiment with it enough to know if it supports your client’s use cases. They won’t care about your framework getting 300 up-votes if you have to change it the day before an important milestone.

Passing the torch: this isn’t just about you

Source
I hate to break it down this way, but your client doesn’t want to rely on you forever. Sure, your stack might be robust, well documented, secure, and lightning-fast.

But if only a small community of developers around the world knows how to make it work, you are creating a deadlock. Clients hate deadlocks.

Will they be able to find developers to work with your Stack?
It might be because you cannot work with them anymore, or because they want to scale the team, or maybe they want to repatriate the development efforts internally. But eventually, your client will need another developer to push code to the codebase.

If they have to go through every single job board in the world to find a single developer with a specific expertise, guess who’s going to be blamed?

Will they have the money to pay for such developers?
If the only people they can hire to work on your overly-complicated tech stack are expensive gurus with 20 years of experience, it might be more cost-effective to have someone else re-do everything with mainstream technologies.

Don’t tunnel vision the development efforts, it is not only about you.

Conclusion
We hope this short article will help you avoid horror stories, stressful nights and awkward discussions. Rushing the tech decisions before answering key questions won’t save you time in the long run. This is experience talking.

Take your time to properly assess the situation even if you feel like opening your IDE or code editor already.

Happy Clients = Repeat/Referral Business = Less Bizdev Efforts = More Time Spent Developing.

Note: this post was crafted in close collaboration with Philip Barclay, a good friend of mine. Phil has been making digital products for years, and is now building awesome stuff at Mirego and Picks.
Let us know if we missed any key questions in the comments!

Originally published on the Snipcart blog and shared in our newsletter.
