+++
draft = true
+++

You can’t debug systems with dashboards
Byread.acloud.guru9 mins
View Original
The health of your systems doesn’t matter — what matters is that every individual event gets the resources it needs to complete

Welcome to “Serverless Superheroes”!
In this space, I chat with the toolmakers, innovators, and developers who are navigating the brave new world of “serverless” cloud applications.

In this edition, I chatted with Charity Majors, co-founder and CEO at Honeycomb. The following interview has been edited and condensed for clarity.

Play


00:00
00:00
Mute

Settings
Enter fullscreen
Play
Forrest Brazeal: Charity, you’re a legend in the DevOps world for your take-no-prisoners approach to database reliability, distributed systems and more. How did you end up as the founder of an observability company?

Charity Majors: [Laughs] A series of accidents. I’ve been an infrastructure engineer in various corners of the internet since I was 17. I really loved being the first infrastructure engineer that comes in after a product is ready to grow up, making it something that you can operate reliably. I’ve done that several times. Most recently, that was at Parse.

I was the first infrastructure engineer pre-beta; I was there through the Facebook acquisition. By the time Facebook acquired Parse, we were serving about sixty thousand mobile apps, and I was coming to the horrified conclusion that despite having some of the best engineers in the world doing all the right things, we had built a system that was effectively un-debuggable.

We were growing really fast, people were coming to rely on us, and we were down all the time. Both of our engineering teams were getting eaten up with one-off problems, which is the kiss of death as a platform.

The thing that finally helped us dig ourselves out of that hole was a tool at Facebook called Scuba. It’s pretty rough — I’d call it aggressively hostile to users — but effective; it’ll let you slice and dice data in arbitrary dimensions.

We laid some plumbing at Parse to leverage it, and suddenly our time to resolve those one-off problems fell from hours or days (or never!) to seconds or minutes. Predictably. Like, it stopped being an engineering problem and started becoming a support problem.


So as an ops person, as soon as the observability problem was fixed I moved on to fighting the next fire, and I didn’t even really stop to think about why it was so transformative.

Then as I was leaving Facebook, I suddenly went, “Wow, I no longer know how to engineer without this stuff. It’s so critical to my understanding of the world, from how do I ship code to how do I validate it, and I can’t go back.” It was like having glasses and then having them taken away. So I decided to build that kind of tool for everyone, and that grew into Honeycomb.

So it sounds like the use case for Honeycomb initially grew out of large-scale problems that you saw at Parse and Facebook. Do you feel that these problems are emerging now for companies that may even be operating at smaller scale?

Yeah, companies are encountering these problems earlier in their development. Architectures are becoming way more ephemeral, more distributed, more loosely coupled.

The trends are towards using more third-party vendors that may be key components of your system, and yet you have to treat them like black boxes. We’re using more languages than ever before; we’re using more storage engines.

Play


00:00
00:00
Mute

Settings
Enter fullscreen
Play
For years, the best practice was to take one database and use it for everything, because it’s so costly to your team to have to monitor and understand it. We can’t do that anymore. There’s advantage to be gained from a lot of these newer ways of interacting with your data, so we just have to swallow hard and accept the cost.

After all, when Facebook first hacked together this tool, it wasn’t to understand Facebook. It was because they were having database problems.

And it turns out that that the characteristics of a tool you need to understand your databases — you need arbitrarily wide rows, structured data, high cardinality, because you have to be able to break down by things like raw queries versus normalized queries, or host IP pairs — this is also an amazingly good fit for distributed systems.

It sounds like conventional monitoring wisdom goes out the window with these new architectures.

We’re trying to dismantle the idea that you can effectively debug your systems with dashboards. We have 20 years of monitoring best practices built up, great ways to respond to outages and events, but it’s totally biased towards outages and problems. You monitor your systems, make sure they’re within acceptable thresholds, and that’s it.

Play


00:00
00:00
Mute

Settings
Enter fullscreen
Play
And there are so many categories of questions that you need to ask of your systems that have nothing to do with that. For example: “If I build this feature or this optimization, what impact will it have? Will it save us five dollars or five million dollars?” We’re trying to give you the tools to make good decisions, in order to understand your users.

Ah, those pesky users. You have a rather famous catchphrase: “Nines don’t matter if users aren’t happy.” Are you saying that eleven nines of reliability aren’t the most important metric for my service?

I remember at Parse, we measured our uptime, and it was like 99.89 percent for the month when our biggest users had the most problems.

So, Disney might be doing eight requests per second which are failing, but if 100,000 requests are successful over the whole platform, in my aggregates everything looks great. Or let’s say that the requests are timing out after thirty seconds. The mobile app may have cut off the request long before that, so we don’t see an error, but users are angry because from their perspective, we’re down. It’s really hard to reconcile those two facts.

And that’s when it really became apparent to me that these system-level aggregates don’t tell the full story. In the old style of architecture, like LAMP stacks, let’s say that you had a reliability of 99.5 percent. Everybody had a shared pool of backend services, so at least if you were getting errors that one-half of one percent of the time, they were probably evenly distributed.


But with modern systems, it’s much more likely that for almost everyone you have 99.9 availability, but for this one shard — for everyone whose last name starts with “SHE” or whatever — you’re 100 percent down. You still have close to 99.9% uptime, and that does not matter at all to the users who are offline.

These little nooks and crannies are everywhere in distributed systems, because of the way that we’ve partitioned people up. There can be very consistent, complete outages that are completely swallowed.

If there’s one key insight about the way Honeycomb sees the world, it’s that the health of the systems doesn’t actually matter. If your app is on AWS and one of your three availability zones goes down, you shouldn’t notice. What does matter is that every individual event can get the resources that it needs to complete.

So here is where someone used to traditional aggregation-type metrics might say: “Well, if the alternative is tracking every single event, that’s way too much data. It would be crazy expensive to store, and searching would be like going through a haystack for a needle during a tornado. How can I make sense of all this?”

Dynamic sampling. At Facebook, every request that came in through the front API generated something like 200 events as it made its way through the stack. Now, nobody’s gonna pay for an observability stack 200 times the size of production. So that’s why we use dynamic sampling.

This concept is sometimes confusing to people because they think you’re just taking a percentage across the board, and you’re not. The idea here is to store common things a small percentage of the time, and store uncommon things a very high percentage of the time or all the time.

Play


00:00
00:00
Mute

Settings
Enter fullscreen
Play
For example, with web requests you might want to store one out of every X number of GETs that comes back with a 200 OK response. And you might want to store 100 percent of DELETEs, and so on and so forth. You have a lot of fine-grained control over this. For databases you might want to store all the deletes and some fraction of the selects. But then you you also want the ability to create exceptions for a customer or an endpoint.

I feel like curating and massaging the sample rates is going to be the next generation’s equivalent of massaging pager rules. It’ll be one of those things that’s never done; you have to keep tweaking them forever to get them right, and as the system changes you have to tweak again. But at least sample rates don’t wake you up at night!

Since you mentioned pagers… I know you have some really interesting ideas about how on-call rotations should be handled on a modern ops team. Can you share a little bit about how you do production support at Honeycomb?

I believe in software owners. No matter who you are, no matter what your role, as an engineer who writes software you should have the ability to deploy and debug that software.

This creates a really tight virtuous feedback loop. There are so many pathologies that get hidden and amplified by the model where some people write the code and other people deploy it and debug it. It creates burnout on your team and degrades the quality of your systems. That’s terrible!

When you give the people who understand the systems the power and permission to make changes, everything just improves across the board People are always surprised when I say that we don’t have any dedicated ops team here on this company started by an ops person.

Play


00:00
00:00
Mute

Settings
Enter fullscreen
Play
Play


00:00
00:00
Mute

Settings
Enter fullscreen
Play
Play


00:00
00:00
Mute

Settings
Enter fullscreen
Play
We do empower and expect our software engineers to to own their code, and we do have some engineers that are more operationally focused in their background, but they also spend most of their time developing software, not being on call. It’s so much better for everyone.

Finally, I’m pretty involved in the serverless community, which has definitely taken the distributed, service-based architectures you’ve described to heart (some would say to an extreme)! What do you see the serverless folks rushing toward that you would like to warn them away from?

There’s this idea that somehow we can get away from having to operate our systems. That in the magical future, all we ever have to do is birth code new from our heads, green field, and it’ll just work — that some other service will do all that messy operational garbage for us. That’s simply never been true, and it never will be.

Play


00:00
00:00
Mute

Settings
Enter fullscreen
Play
We spend the majority of our time not writing greenfield code, but maintaining systems. Debugging them. Understanding them. Extending them.

You don’t have to be slinging servers and provisioning bare metal in order to be doing operations, but ops is still at the beating heart of software. It’s not something that can or should be avoided, it is something that should be optimized for the level of maturity that you’re at and the product you’re trying to build.

You cannot delegate or pay someone else to have ultimate responsibility for your application. You will always have that responsibility, whether or not you choose to accept it. And if you deny it, you will have a categorically worse time than if you embrace it.

Forrest Brazeal is an AWS Serverless Hero and a cloud architect at Trek10. He writes the ACG Serverless Superheroes series and draws the ‘FaaS and Furious’ cartoon series at A Cloud Guru. If you have a serverless story to tell, please let him know at @forrestbrazeal.
