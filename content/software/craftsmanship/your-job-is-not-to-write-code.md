+++
draft = true
+++

http://blogs.tedneward.com/post/your-job-is-not-to-write-code/

Your Job is Not to Write Code
Posted on Jan 12, 2015
(UPDATE: The original author of "Your Job is Not To Write Code" was not happy at my unauthorized derivative work of her post--it violates her no-reprint policy--and has asked that I remove it. I liked the original intent, however, so I am rewriting/editing this post to reflect the same sentiment but without the derivation. My apologies.)

Dear Software Consultants,

I hate to be the one to break this to you, but you were lied to when we hired you. Your job isn't about code at all.

The interview process was kind of a train wreck (and, yeah, about that, sorry, but we really don't know how to hire folks, so we kind of tested you on what we thought was easily testable--you know, binary trees and all that stuff--even though your day-to-day is about moving an image on a web page over a few pixels), but you're here now, sitting in front of the customer, talking about writing code, so it's pretty easy to understand how you'd be mixed up.

See, the thing of it is this: if you get right down to it, I (your boss) don't really care if you write code or not. The clients don't really care if you write code or not. (They say they do, but hear me out on this.) And the clients' customers and users, they don't really care if you write code or not.

What they care about is the result: Did you make their life better today somehow?

In a consulting gig, we get paid to solve clients' problems. That's it. Nothing else. Frequently, writing code solves those problems, and when that's the case, then boo-yeah, write, test, ship! Everybody is happy.

But when writing code gets in the way of solving those problems, then we have a problem. Which is to say, the clients have a problem, which makes it our problem, which makes it... you guessed it... your problem.

Here's some of what we mean.

You have a MacBookPro with 16GB of RAM and a full tera of SSD disk space, tied to a phat pipe that streams full gigs of data down to the office. That's awesome. That makes you productive.

But that can mask certain problems--if your code thrashes the network for some reason, making dozens or hundreds of round trips to the server, when it all runs on your laptop, that's going to seem totally acceptable. When it goes out into production in a cloud data center that's only as close as the nearest mountain range (which kinda sucks for those living in the Midwest), those minimal trips back and forth on your laptop suddenly turn into long-haul calls across the country. Not such a great experience.

And you're using Google Chrome, with all the latest updates and security patches. Perfect! Except that the clients' users are running Firefox, IE, Safari, and Opera. And probably versions dating a few years back, too, because consumers just don't upgrade their software nearly as often as developers do.

And we--remember this, because this is important--we are in the 'solutions' business. So no matter how amazing your code is, if it doesn't solve the clients' customers' problem, then it is a waste.

You heard about similar kinds of situations in college; the term "gold plating" refers to the effort that engineers will sometimes put in on parts that nobody but themselves will ever know exist. But this is a slightly different problem: You are putting in effort building something that doesn't actually solve the client's customers' problems. So, in many respects, it's a waste.

This is going to require some adjustments.

First off, the question around any particular feature or story is simple: Does this make the client's life better? In many cases, the answer will be, "Yes, but only because it makes their customers' lives better", which is a totally acceptable answer. If the answer is, "I don't know", then your next task is to find out the answer to that. Bear in mind, the client often doesn't know the answer to that. Which is part of the solution we are supposed to be bringing to them, when you think about it.

Second, you need to ensure that whatever you build, it meets the client's customer halfway: Does it run on their target environment? If you don't know what their target environment is, by the way, you have just identified something you need to know, stat.

Third, is there better value you can bring in another way? Is there a simpler change in business process that would obviate the need for this code? Suggest it. Is the client doing something "stupid" that you think should be fixed? Bring it up. Is the client trying to put square peg in round hole? Point it out. But....

Fourth, remember that at all times, the client's right is to ignore us completely. Yes, it's frustrating, but you would feel the same way were it you talking to the doctor or to a mechanic about changes to your life or repairs made to your car. "You're charging me $15,000 for an engine overhaul that YOU thought needed to be done, without checking with me first?!?" is not a great way to collect repeat business.

Look, consultants, it's not all that hard to understand: Most of the time, you will deliver value to our clients by writing code. But that means that your ultimate product here is not the code, but the value.

Your job is not to write code.

Your job is to deliver value. In whatever form that may take.

Which reminds me, while we're here, remember to embrace the the Oath of the Conscientious Programmer:

I swear to fulfill, to the best of my ability and judgment, this covenant:

I will respect the hard-won scientific gains of those programmers and researchers in whose steps I walk, and gladly share such knowledge as is mine with those who are to follow. That includes respect for both those who prefer to keep their work to themselves, as well as those who seek improvement through the open community.

I will apply, for the benefit of the customer, all measures [that] are required, avoiding those twin traps of gold-plating and computing nihilism.

I will remember that there is humanity to programming as well as science, and that warmth, sympathy, and understanding will far outweigh the programmer's editor or the vendor's tool.

I will not be ashamed to say "I know not," nor will I fail to call in my colleagues when the skills of another are needed for a system's development, nor will I hold in lower estimation those colleagues who ask of my opinions or skills.

I will respect the privacy of my customers, for their problems are not disclosed to me that the world may know. Most especially must I tread with care in matters of life and death, or of customers' perceptions of the same. If it is given me to save a project or a company, all thanks. But it may also be within my power to kill a project, for the company's greater good; this awesome responsibility must be faced with great humbleness and awareness of my own frailty. Above all, I must not play at God, and remain open to others' ideas or opinions.

I will remember that I do not create a report, or a data entry screen, but tools for human beings, whose problems may affect the person's family and economic stability. My responsibility includes these related problems, if I am to care adequately for those who are technologically impaired.

I will actively seek to avoid problems that are time-locked, for I know that software written today will still be running long after I was told it would be replaced.

I will remember that I remain a member of society, both our own and of the one surrounding all of us, with special obligations to all my fellow human beings, those sound of mind and body as well as the clueless.

If I do not violate this oath, may I enjoy life and art, respected while I live and remembered with affection thereafter. May I always act so as to preserve the finest traditions of my calling and may I long experience the joy of the thanks and praise from those who seek my help.

You're smart. You'll figure it out. Just remember, code is not the goal. It is merely the means to the end, which is to "make the (client's) pain go away".
