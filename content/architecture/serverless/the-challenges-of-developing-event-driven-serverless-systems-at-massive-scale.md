+++
draft = true
+++

https://read.acloud.guru/designing-an-event-driven-serverless-system-to-run-real-time-at-massive-scale-c4de3f7539fc

The challenges of developing event-driven serverless systems at massive scale
Rob Gruhl discusses the design considerations of Nordstrom’s event-sourced architecture working off a distributed ledger

Welcome to “Serverless Superheroes”!
In this space, I chat with the toolmakers, innovators, and developers who are navigating the brave new world of “serverless” cloud applications.

For today’s edition, I chatted with Rob Gruhl — Senior Manager of Emerging Technologies at Nordstrom. The following interview has been edited and condensed for clarity.

Forrest Brazeal: Rob, you’re one of the first people using serverless architectures to run real-time web applications at massive scale. How did that happen?

Rob Gruhl: In the fall of 2014, we at Nordstrom experienced several “wall of traffic” incidents when we sent out millions and millions of new, personalized marketing emails. I think initially the expectation was that customers would open these emails over time.

It turns out that we have some amazing customers, and they got really excited about the emails, opened them right away, and we had this wall of traffic.

At the time we had Elastic Beanstalk fronting one of our systems that ingested and used this activity data, and we spent a fair amount of time trying to figure out if we could scale to those events without having to either prewarm the system or coordinate with the various teams that do communications to customers.

So we got more and more aggressive with autoscaling the cluster with some success, but eventually it motivated us to look at other ways we could do scaling more elegantly.

At that time Kinesis and Lambda had just come out. So one of the developers and I on the team decided we would investigate utilizing a real time stream of data using a combination of Kinesis and Lambda. We chose to re-architect the “recently viewed” feature on our website, and I think this was a great first serverless project for a number of reasons.

For one, it really got us thinking of streams as events in general. I think if you give an engineer a serverless function, she’s going to want events to go with it. You give her events and she’ll want to put them somewhere that’s durable, that’s repeatable, that can handle multiple consumers.

So I think you just naturally start thinking in terms of events when you go serverless. It’s very impedance-matched to the technology.

Second, we went from a relatively complex “recently viewed” system — with a lot of challenges like merging batches offline between mobile and web clients, cookie policies on various web browsers, latency issues under high traffic — to a system that for a very small amount of code just worked and scaled.

It was very efficient from a code complexity standpoint, a cost standpoint, and it also did extremely well in our A/B testing. One developer was able to build this as a proof of concept and subsequently deliver it into production. So with that success, we asked: where else is it appropriate to start applying this pattern?

You mentioned that building a serverless system started you thinking a lot about streams and events. Is this the “central unified log” concept I’ve heard so much about?

(laughs) There are eight names for the overall concept and they’re all terrible. Some call it a stream, some call it a distributed ledger, a central unified log, a topic; there’s a lot of different ways of talking about it. It’s a very high tech/low tech construct, so however you talk about it, it sounds less exciting than it is.

It’s an immutable, replicated, partitioned, distributed, append-only log with multi-reader capability. Generally we talk about it as a stream or a distributed ledger — perhaps distributed ledger is the most accurate way to describe it.

So if your whole system is dependent on this distributed ledger, how do you ensure that all your components can see an accurate representation of the system’s state?

One of the fundamental questions when you’re building an event-driven system is: do you require ordering guarantees, and if so, are you going to do the work to maintain those guarantees?

I believe the answer comes down to whether you’re choosing to use the ordering of your events as a mechanism for resolving conflicts and building consensus in a distributed system.

If it’s really important that you have two different systems consuming this event stream, and it’s important that those systems come to the same conclusion without having to do any back-and-forth communication, then suddenly you take on the burden of having absolute event ordering guarantees within a given partition key.

Additionally you have to record anything relevant that is external or non-deterministic — like the current temperature, or the result of a random number generator.

The second big question is, do you want this system to be able to replicate any application state through re-reading the ledger? I think that’s the gold standard of an event sourcing system: the ledger is my only source of truth.

I can play it back, fast forward, rewind, apply my application logic to it and restore any historical state. This high bar introduces a number of interesting challenges, including handling any issues or errors that you had historically, schema version changes, and so on.

The good news is that even falling short of that highest bar, you get a lot of benefit thinking about high quality events and putting them into real time streams and reacting to those.

You get a lot of benefits from being able to replay streams when you have issues, from moving the backpressure you have from your consumers off of your producers, from having multiple consumers of the same stream, even new versions of old systems running in parallel while in development.

So even though the most orthodox, highest quality version of event-sourced architecture has significant challenges, aspiring to that actually ends up returning near-term value.

What if, in the process of reaching for that high bar, you seriously mess up your event stream? How do you get observability into your distributed ledger?

Let me talk about observability — one of our great developers Sayna Parsi did some work extending X-Ray to do tracing across the ledger. That involves annotating the event as it’s placed onto the ledger and then picking up that annotation when you consume from the ledger.

I think one really interesting idea here comes from Gwen Shapira, who gave a talk recently on “Schema as the API for a Streaming System.” She describes a theoretical world in which you use the schema validation stage that every consumer and producer needs to go through as a method of observing who is using the stream.

So the idea is — if everyone is checking the schema registry as they’re consuming, we now have some understanding of who’s using the stream.

And it’s definitely the flip side of the delightful decoupling you get with splitting out your producers and consumers. As a producer, you get back an HTTP 200 on your event and you’re done. And that can be fantastic — it’s very low code complexity.

But then there are harder questions like this: “Who is using my stream, what are they relying on, what attributes are important to them, how radically can I version my system, and if I need to make a breaking change, who do I talk to?”

If I had to abstract up a level I would say that the developer experience of interacting with an event sourced system is still in its infancy. Even in the Kafka ecosystem, with companies like Confluent, there are still significant challenges.

As one example, we envision a world in which you go to your developer dashboard, you have your traditional request/response APIs with Swagger definitions or API docs, and then there’s another tab on the same screen that says if these APIs are not giving the answer you’re looking for, or you’re interested in a more real-time response, here is a set of published streams.

And alongside those streams you see SLAs around staleness of that data, you see schema definitions, you see versions, you see sample data, and really all the tools you need as a developer to make a decision and say “OK, this price service is not getting me what I want. Perhaps I can subscribe to the price stream, build my historical price service, and make that available through the request/response developer interface.”

So to expand and vary this theme a little bit, serverless is sold as something that can autoscale on demand to incredibly large capacity. But that’s sort of a double-edged sword, because you can wind up scaling so wide that you DOS other parts of your system. Any interesting stories about challenges created by your scale?

You have such massive flexibility with serverless that it is trivial to generate the kind of scale that will flatten most any infrastructure you have in place.

To better understand reaction in the face of this scale, our team has released an open source project called Serverless Artillery, which is built on top of the NPM package artillery.io by the good folks over at Shoreditch Ops in London.

What we’ve built as our open source contribution is the ability to take that core package, deploy it on a single Lambda, and then have that Lambda invoke as many Lambdas as necessary to generate an arbitrary amount of synthetic traffic.

During the 2017 holiday season we did not have any significant outages in our systems. I think a big part of that was testing in production that our SRE team drove, using a lot of Serverless Artillery scripts (along with a few other tools) to generate load against our systems.

We had a lot of engineers using Serverless Artillery and we got a lot of great feedback. One fascinating thing about that tool is you can just keep adding zeros to the end of your generated load numbers, and it’s a nearly irresistible urge. This same ability of Serverless Artillery to generate massive synthetic load is something that allows you to explore your bottlenecks perhaps in a way that you might not have been able to before.

Ramping to destruction is trivial with this tool, and that’s going to teach you a lot. Ramping to destruction in production, in an off hour, is an exercise that, if you have the stomach for it, will teach you a lot more.

So you’re actually recommending embracing the scale of serverless and using it to your advantage to suss out problems before they bite you in real life.

I think it’s important to be thoughtful about it. For example, if you have a Lambda consuming an event stream off Kinesis and it is writing to a legacy data layer, if it has overwhelmed that data layer or that data layer is unavailable, that Lambda will naturally back off from writing against that data layer exponentially, with jitter, and it will resume writing to that data layer when it comes back.

That happens because you’re working off a distributed ledger, and it will pick up where it left off and keep going. So there are built-in patterns that can help with this.

An anti-pattern would be if a team says, “We have a batch of changes every four hours, and we’d like to streamify those batches, and we’re interested in serverless. Perhaps the way to streamify those batches is to dump them all at once into an SNS topic.”

Now this topic is going to invoke an individual Lambda for each event, and let’s say you dump 400,000 events simultaneously. You’re likely going to saturate your concurrency limits on Lambda, and if there’s anything on the back end you might flatten it as well.

So that’s why dumping that data into Kinesis rather than SNS is a huge difference. Fully understanding the implications of the architecture you’ve chosen becomes very important.

As engineers we get excited about the rapidly maturing serverless space. We create workarounds for things that don’t quite work yet, and then inevitably there are better solutions soon. So our code can become obsolete at a pretty rapid rate. How do you make sure you don’t create a bunch of stuff that’s difficult to maintain, while constantly evolving your infrastructure?

I think this question applies to technology in general. Whether it applies to vendor lock-in or maintaining legacy code, I think that the answer is always this: elegant architectures that reduce complexity, that introduce decoupling into your system, are the most maintainable and understandable systems.

Let’s say you have a system that is fundamentally composed of six Lambda functions having less than 100 lines of code each, fronted by something like API Gateway and backed by something like DynamoDB. If at some future time you want to change how you deploy those Lambda functions, or you want to move to a different cloud provider, that’s a relatively low surface area of complexity to move.

Whereas with a hand-rolled system maybe you have 3 developers maintaining that cluster, with all the associated operational work maintaining and updating the front end, the back end, and so on. If you can reduce the complexity, if you can come up with an elegant design, if you can reduce the code surface area, I think that makes any sort of migration a lot easier.

So ideally, serverless development is a funnel-shaped process where you’re winnowing down to less and less code over time?

Precisely. I think there are some legacy systems that have quite a bit of code surface area and you might ask, “Could I do that with a few serverless functions?” We’re hearing more and more stories across the industry of wins like that.

At this point, I’m envisioning someone’s eyes glazing over a bit, saying: “This serverless event sourced stuff you’re describing is so different from what I’m used to, it sounds like a solution in search of a problem.” How do you explain to someone the advantages of event sourcing over a traditional approach to application architecture?

I think any time you talk about architecture — the patterns themselves aren’t really the point. The main point is to deliver value to your customers and your business.

For me another major consideration is optimizing for great engineers. We are all fortunate in this industry to be in the right place at the right time. There’s an extraordinary demand for great engineers, it’s difficult to hire and retain them, and so you want the small number of engineers you have on your team to deliver the greatest possible value.

Any architecture that enables fewer developers to accomplish more and spend less time on operational maintenance is worth thinking hard about.

To answer your question about the newness or difference of this pattern — the world starts out as an event sourced system. Things occur in the world: at this date and time this thing happened. And today we have all these systems that take these individual occurrences and aggregate them in a lossy fashion into, say, a single database view. And if you looked at the state of that system it might not be clear to you at all what had happened leading up to that point in time.

So let’s say you wanted to know what happened, how we got where we are, or you have a significantly different use case — say machine learning training on the original events. You’re doing a lot of reverse engineering on that aggregate data to get back to where you started, which is, again: “At this date and time, this thing happened. The customer added something to their cart. At this time, she searched on the website or she transacted.”

The fascinating possibility is, with an event-sourced direction, you just write those events onto the ledger. So there’s huge potential here for simplifying systems. I think the ultimate promise when you’re talking about event sourcing is a system that is understandable by the business and the engineering team, and delivers innovations quickly to your customers.

A good ledger can be read and understood by a non-technical person and an event-sourced design can be easily understood by the business. “When this happens, do that.” Although it may differ from what’s been previously popular, it is perhaps a very comprehensible system, a very accessible system.


Forrest Brazeal is a cloud architect and serverless community advocate at Trek10. He writes the Serverless Superheroes series and draws the ‘FaaS and Furious’ cartoon series at A Cloud Guru. If you have a serverless story to tell, please don’t hesitate to let him know.
