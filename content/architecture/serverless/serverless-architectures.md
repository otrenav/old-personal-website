+++
title = "Serverless Architectures"
image = "/img/content/an-overview-of-serverless-architectures/main.png"
slug = "an-overview-of-serverless-architectures"
date = "2018-03-10"
draft = true
tags = [
    "Serverless",
    "Google Cloud",
    "AWS",
    "JavaScript",
    "Python",
    "Node",
    "Chalice",
    "Claudia"
]
+++

Serverless Architectures
Go Back
Add to List
Delete
Favorite
Share
Display Options
Serverless Architectures
By Mike Roberts, martinfowler.comView OriginalAugust 4th, 2016
Serverless architectures refer to applications that significantly depend on third-party services (knows as Backend as a Service or "BaaS") or on custom code that's run in ephemeral containers (Function as a Service or "FaaS"), the best known vendor host of which currently is AWS Lambda. By using these ideas, and by moving much behavior to the front end, such architectures remove the need for the traditional 'always on' server system sitting behind an application. Depending on the circumstances, such systems can significantly reduce operational cost and complexity at a cost of vendor dependencies and (at the moment) immaturity of supporting services.

This article provides an in-depth look at serverless architecture and as a result is a long read. If you need a concise summary of what serverless is and its trade-offs - take a look at the bliki entry on serverless

Serverless is a hot topic in the software architecture world. We’re already seeing books, open source frameworks, plenty of vendor products, and even a conference dedicated to the subject. But what is Serverless and why is (or isn’t) it worth considering? Through this evolving publication I hope to enlighten you a little on these questions.

To start we'll look at the ‘what’ of Serverless where I try to remain as neutral as I can about the benefits and drawbacks of the approach - we'll look at those topics later.

What is Serverless?
Like many trends in software there’s no one clear view of what ‘Serverless’ is, and that isn't helped by it really coming to mean two different but overlapping areas:

Serverless was first used to describe applications that significantly or fully depend on 3rd party applications / services (‘in the cloud’) to manage server-side logic and state. These are typically ‘rich client’ applications (think single page web apps, or mobile apps) that use the vast ecosystem of cloud accessible databases (like Parse, Firebase), authentication services (Auth0, AWS Cognito), etc. These types of services have been previously described as ‘(Mobile) Backend as a Service’, and I’ll be using ‘BaaS’ as a shorthand in the rest of this article.
Serverless can also mean applications where some amount of server-side logic is still written by the application developer but unlike traditional architectures is run in stateless compute containers that are event-triggered, ephemeral (may only last for one invocation), and fully managed by a 3rd party. (Thanks to ThoughtWorks for their definition in their most recent Tech Radar.) One way to think of this is ‘Functions as a service / FaaS’ . AWS Lambda is one of the most popular implementations of FaaS at present, but there are others. I’ll be using ‘FaaS’ as a shorthand for this meaning of Serverless throughout the rest of this article.
Origin of ‘Serverless’
The term ‘Serverless’ is confusing since with such applications there are both server hardware and server processes running somewhere, but the difference to normal approaches is that the organization building and supporting a ‘Serverless’ application is not looking after the hardware or the processes - they are outsourcing this to a vendor.

First usages of the term seem to have appeared around 2012, including this article by Ken Fromm. Badri Janakiraman says that he also heard usage of the term around this time in regard to continuous integration and source control systems being hosted as a service, rather than on a company’s own servers. However this usage was about development infrastructure rather than incorporation into products.

We start to see the term used more frequently in 2015, after AWS Lambda’s launch in 2014 and even more so after Amazon’s API Gateway launched in July 2015. Here’s an example where Ant Stanley writes about Serverless following the API Gateway announcement. In October 2015 there was a talk at Amazon’s re:Invent conference titled “The Serverless Company using AWS Lambda”, referring to PlayOn! Sports. Towards the end of 2015 the ‘Javascript Amazon Web Services (JAWS)’ open source project renamed themselves to the Serverless Framework, continuing the trend.

Fast forward to today (mid 2016) and one sees examples such as the recent Serverless Conference, plus the various Serverless vendors are embracing the term from product descriptions to job descriptions. Serverless as a term, for better or for worse, is here to stay.

Mostly I’m going to talk about the second of these areas because it is the one that is newer, has significant differences to how we typically think about technical architecture, and has been driving a lot of the hype around Serverless.

However these concepts are related and, in fact, converging. A good example is Auth0 - they started initially with BaaS ‘Authentication as a Service’, but with Auth0 Webtask they are entering the FaaS space.

Furthermore in many cases when developing a ‘BaaS shaped’ application, especially when developing a ‘rich’ web-based app as opposed to a mobile app, you’ll likely still need some amount of custom server side functionality. FaaS functions may be a good solution for this, especially if they are integrated to some extent with the BaaS services you’re using. Examples of such functionality include data validation (protecting against imposter clients) and compute-intensive processing (e.g. image or video manipulation.)

A couple of examples
UI-driven applications
Let’s think about a traditional 3-tier client-oriented system with server-side logic. A good example is a typical ecommerce app (dare I say an online pet store?)

Traditionally the architecture will look something like this, and let’s say it’s implemented in Java on the server side, with a HTML / Javascript component as the client:

With this architecture the client can be relatively unintelligent, with much of the logic in the system - authentication, page navigation, searching, transactions - implemented by the server application.

With a Serverless architecture this may end up looking more like this:

This is a massively simplified view, but even with this there are a number of significant changes that have happened here. Please note this is not a recommendation of an architectural migration, I’m merely using this as a tool to expose some Serverless concepts!

We’ve deleted the authentication logic in the original application and have replaced it with a third party BaaS service.
Using another example of BaaS, we’ve allowed the client direct access to a subset of our database (for product listings), which itself is fully 3rd party hosted (e.g. AWS Dynamo.) We likely have a different security profile for the client accessing the database in this way from any server resources that may access the database.
These previous two points imply a very important third - some logic that was in the Pet Store server is now within the client, e.g. keeping track of a user session, understanding the UX structure of the application (e.g. page navigation), reading from a database and translating that into a usable view, etc. The client is in fact well on its way to becoming a Single Page Application.
Some UX related functionality we may want to keep in the server, e.g. if it’s compute intensive or requires access to significant amounts of data. An example here is ‘search’. For the search feature instead of having an always-running server we can implement a FaaS function that responds to http requests via an API Gateway (described later.) We can have both the client, and the server function, read from the same database for product data.
Since the original server was implemented in Java, and AWS Lambda (our FaaS vendor of choice in this instance) supports functions implemented in Java, we can port the search code from the Pet Store server to the Pet Store Search function without a complete re-write.

Finally we may replace our ‘purchase’ functionality with another FaaS function, choosing to keep it on the the server-side for security reasons, rather than re-implement it in the client. It too is fronted by API Gateway.
Message-driven applications
A different example is a backend data-processing service. Say you’re writing a user-centric application that needs to quickly respond to UI requests, but secondarily you want to capture all the different types of activity that are occurring. Let’s think about an online ad system - when a user clicks on an advertisement you want to very quickly redirect them to the target of the ad, but at the same time you need to collect the fact that the click has happened so that you can charge the advertiser. (This example is not hypothetical - my former team at Intent Media recently went through this exact redesign.)

Traditionally, the architecture may look like this. The ‘Ad Server’ synchronously responds to the user - we don’t care about that interaction for the sake of this example - but it also posts a message to a channel that can be asynchronously processed by a ‘click processor’ application that updates a database, e.g. to decrement the advertiser’s budget.

In the Serverless world this looks like:

There’s a much smaller difference to the architecture here compared to our first example. We’ve replaced a long lived consumer application with a FaaS function that runs within the event driven context the vendor provides us. Note that the vendor supplies both the Message Broker and the FaaS environment - the two systems are closely tied to each other.

The FaaS environment may also process several clicks in parallel by instantiating multiple copies of the function code - depending on how we’d written the original process this may be a new concept we need to consider.

Unpacking ‘Function as a Service’
We've mentioned the FaaS idea a lot already but it's time to dig into what it really means. To do this let's look at the opening description for Amazon's Lambda product. I've added some tokens to it, which I then expand upon.


AWS Lambda lets you run code without provisioning or managing servers. (1) ...
        With Lambda, you can run code for virtually any type of application or backend
        service (2) - all with zero administration. Just upload your code and Lambda takes
        care of everything required to run (3) and scale (4) your code with high
        availability. You can set up your code to automatically trigger from other AWS
        services (5) or call it directly from any web or mobile app (6).




Fundamentally FaaS is about running back end code without managing your own server systems or your own server applications. That second clause - server applications - is a key difference when comparing with other modern architectural trends like containers and PaaS (Platform as a Service.)
If we go back to our click processing example from earlier what FaaS does is replace the click processing server (possibly a physical machine, but definitely a specific application) with something that doesn’t need a provisioned server, nor an application that is running all the time.

FaaS offerings do not require coding to a specific framework or library. FaaS functions are regular applications when it comes to language and environment. For instance AWS Lambda functions can be implemented ‘first class’ in Javascript, Python and any JVM language (Java, Clojure, Scala, etc.). However your Lambda function can execute another process that is bundled with its deployment artifact, so you can actually use any language that can compile down to a Unix process (see Apex later on.) FaaS functions do have significant architectural restrictions, especially when it comes to state and execution duration, and we’ll come to that soon.
Let’s consider our click processing example again - the only code that needs to change when moving to FaaS is the ‘main method / startup’ code, in that it is deleted, and likely the specific code that is the top-level message handler (the ‘message listener interface’ implementation), but this might only be a change in method signature. All of the rest of the code (e.g. the code that writes to the database) is no different in a FaaS world.

Since we have no server applications to run deployment is very different to traditional systems - we upload the code to the FaaS provider and it does everything else. Right now that typically means uploading a new definition of the code (e.g. in a zip or JAR file), and then calling a proprietary API to initiate the update.
Horizontal scaling is completely automatic, elastic, and managed by the provider. If your system needs to be processing 100 requests in parallel the provider will handle that without any extra configuration on your part. The ‘compute containers’ executing your functions are ephemeral with the FaaS provider provisioning and destroying them purely driven by runtime need.
Let’s return to our click processor. Say that we were having a good day and customers were clicking on 10 times as many ads as usual. Would our click processing application be able to handle this? For example did we code to be able to handle multiple messages at a time? Even if we did would one running instance of the application be enough to process the load? If we are able to run multiple processes is auto-scaling automatic or do we need to reconfigure that manually? With FaaS you need to write the function ahead of time to assume parallelism, but from that point on the FaaS provider automatically handles all scaling needs.

Functions in FaaS are triggered by event types defined by the provider. With Amazon AWS such stimuli include S3 (file) updates, time (scheduled tasks) and messages added to a message bus (e.g. Kinesis). Your function will typically have to provide parameters specific to the event source it is tied to. With the click processor we made an assumption that we were already using a FaaS-supported message broker. If not we would have needed to switch to one, and that would have required making changes to the message producer too.
Most providers also allow functions to be triggered as a response to inbound http requests, typically in some kind of API gateway. (e.g. AWS API Gateway, Webtask) . We used this in our Pet Store example for our ‘search’ and ‘purchase’ functions.
State
FaaS functions have significant restrictions when it comes to local (machine / instance bound) state. In short you should assume that for any given invocation of a function none of the in-process or host state that you create will be available to any subsequent invocation. This includes state in RAM and state you may write to local disk. In other words from a deployment-unit point of view FaaS functions are stateless.

This has a huge impact on application architecture, albeit not a unique one - the ‘Twelve-Factor App’ concept has precisely the same restriction.

Given this restriction what are alternatives? Typically it means that FaaS functions are either naturally stateless - i.e. they provide pure functional transformations of their input - or that they make use of a database, a cross-application cache (e.g. Redis), or network file store (e.g. S3) to store state across requests or for further input to handle a request.

Execution Duration
FaaS functions are typically limited in how long each invocation is allowed to run. At present AWS Lambda functions are not allowed to run for longer than 5 minutes and if they do they will be terminated.

This means that certain classes of long lived task are not suited to FaaS functions without re-architecture, e.g. you may need to create several different coordinated FaaS functions where in a traditional environment you may have one long duration task performing both coordination and execution.

Startup Latency
At present how long it takes your FaaS function to respond to a request depends on a large number of factors, and may be anywhere from 10ms to 2 minutes. That sounds bad, but let’s get a little more specific, using AWS Lambda as an example.

If your function is implemented in Javascript or Python and isn’t huge (i.e. less than a thousand lines of code) then the overhead of running it in should never be more than 10 - 100 ms. Bigger functions may occasionally see longer times.

If your Lambda function is implemented on the JVM you may occasionally see long response times (e.g. > 10 seconds) while the JVM is spun up. However this only notably happens with either of the following scenarios:

Your function processes events infrequently, on the order of longer than 10 minutes between invocations.
You have very sudden spikes in traffic, for instance you typically process 10 requests per second but this ramps up to 100 requests per second in less than 10 seconds.
The former of these may be avoided in certain situations by the ugly hack of pinging your function every 5 minutes to keep it alive.

Are these issues a concern? It depends on the style and traffic shape of your application. My former team has an asynchronous message-processing Lambda app implemented in Java which processes hundreds of millions of messages / day, and they have no concerns with startup latencey. That said if you were writing a low-latency trading application you probably wouldn’t want to use FaaS systems at this time, no matter the language you were using for implementation.

Whether or not you think your app may have problems like this you should test with production-like load to see what performance you see. If your use case doesn’t work now you may want to try again in a few months time since this is a major area of development by FaaS vendors.

API Gateway
One aspect of FaaS that we brushed upon earlier is an ‘API Gateway’. An API Gateway is an HTTP server where routes / endpoints are defined in configuration and each route is associated with a FaaS function. When an API Gateway receives a request it finds the routing configuration matching the request and then calls the relevant FaaS function. Typically the API Gateway will allow mapping from http request parameters to inputs arguments for the FaaS function. The API Gateway transforms the result of the FaaS function call to an http response, and returns this to the original caller.

Amazon Web Services have their own API Gateway and other vendors offer similar abilities.

Beyond purely routing requests API Gateways may also perform authentication, input validation, response code mapping, etc. Your spidey-sense may be buzzing about whether this is actually such a good idea, if so hold that thought - we'll consider this further later.

One use case for API Gateway + FaaS is for creating http-fronted microservices in a Serverless way with all the scaling, management and other benefits that come from FaaS functions.

At present tooling for API gateways is achingly immature and so while defining applications with API gateways is possible it’s most definitely not for the faint-hearted.

Tooling
The comment above about API Gateway tooling being immature actually applies, on the whole, to Serverless FaaS in general. There are exceptions however - one example is Auth0 Webtask which places significant priority on Developer UX in its tooling. Tomasz Janczuk gave a very good demonstration of this at the recent Serverless Conference.

Debugging and monitoring are tricky in general in Serverless apps - we’ll get into this further in subsequent installments of this article.

Open Source
One of the main benefits of Serverless FaaS applications is transparent production runtime provisioning, and so open source is not currently as relevant in this world as it is for, say, Docker and containers. In future we may see a popular FaaS / API Gateway platform implementation that will run ‘on premise’ or on a developer workstation. IBM’s OpenWhisk is an example of such an implementation and it will be interesting to see whether this, or an alternative implementation, picks up adoption.

Apart from runtime implementation though there are already open source tools and frameworks to help with definition, deployment and runtime assistance. For instance the Serverless Framework makes working with API Gateway + Lambda significantly easier than using the first principles provided by AWS. It’s Javascript heavy but if you’re writing JS API Gateway apps it’s definitely worth a look.

Another example is Apex - a project to ‘Build, deploy, and manage AWS Lambda functions with ease.' One particularly interesting aspect of Apex is that it allows you to develop Lambda functions in languages other than those directly supported by Amazon, e.g. Go.

What isn’t Serverless?
So far in this article I've defined 'Serverless' to mean the union of a couple of other ideas - 'Backend as a Service' and 'Functions as a Service'. I've also dug into the capabilities of the second of these.

Before we start looking at the very important area of benefits and drawbacks I'd like to spend one more moment on definition, or at least defining what Serverless isn't. I’ve seen some people (including me in the recent past) get confused about these things and I think it's worth discussing them for clarity's sake.

Comparison with PaaS
Given that Serverless FaaS functions are very similar to 12-Factor applications, are they in fact just another form of ‘Platform as a Service’ (PaaS) like Heroku? For a brief answer I refer to Adrian Cockcroft


            If your PaaS can efficiently start instances in 20ms that run for half a
            second, then call it serverless.
          -- Adrian Cockcroft
In other words most PaaS applications are not geared towards bringing entire applications up and down for every request, whereas FaaS platforms do exactly this.

OK, but so what, if I’m being a good 12-Factor App developer there’s still no difference to how I code? That’s true, but there is a big difference to how you operate your app. Since we're all good DevOps-savvy engineers we're thinking about operations as much as we are about development, right?

The key operational difference between FaaS and PaaS is scaling. With most PaaS’s you still need to think about scale, e.g. with Heroku how many Dynos you want to run. With a FaaS application this is completely transparent. Even if you setup your PaaS application to auto-scale you won’t be doing this to the level of individual requests (unless you have a very specifically shaped traffic profile), and so a FaaS application is much more efficient when it comes to costs.

Given this benenfit, why would you still use a PaaS? There are several reasons but tooling, and maturity of API gateways, are probably the biggest. Furthermore 12-Factor Apps implemented in a PaaS may use an in-app readonly cache for optimization, which isn’t an option for FaaS functions.

Comparison with containers
One of the reasons for Serverless FaaS is to avoid having to manage computational processes at the operating system level or lower. Platforms-as-a-Service (like Heroku) are another, and I’ve described above how PaaS’s are different to Serverless FaaS. Another popular abstraction of processes are containers, with Docker being the most visible example of such a technology. We also see increasing popularity of container hosting systems, such as Mesos and Kubernetes, which abstract individual applications from OS-level deployment. And even further there are cloud-hosting container platforms like Amazon ECS and Google Container Engine which, like Serverless FaaS, let teams avoid having to manage their own server systems at all. So given all the momentum around containers is it still worth considering Serverless FaaS?

Principally the argument I made for PaaS still holds with containers - for Serverless FaaS scaling is automatically managed, transparent, and fine grained. Container platforms do not yet offer such a solution.

Furthermore I’d argue that container technology while having seen massive popularity in the last couple of years is still not mature. That’s not to say that Serverless FaaS is mature either, but picking which rough edges you’d like is still the order of the day.

I’ll admit, however, that both of these arguments may start to wear thin over time. While true no-management auto-scaling in container platforms isn’t at the level of Serverless FaaS yet, we see areas like Kubernetes ‘Horizontal Pod Autoscaling’ as tending towards it. I can imagine some very smart traffic pattern analysis being introduced to such features, as well as more load-implying metrics. Furthermore the rapid evolution of Kubernetes may give a wonderfully simple, stable, platform before too long.

If we see the gap of management and scaling between Serverless FaaS and hosted containers narrow the choice between them may just come down to style, and type of application. For example it may be that FaaS is seen as a better choice for event driven style with few event types per application component, and containers are seen as a better choice for synchronous-request driven components with many entry points. I expect in 5 years time that many applications and teams will use both architectural approaches, and it will be fascinating to see patterns of such use emerge.

#NoOps
Serverless doesn’t mean ‘No Ops’. It might mean ‘No internal Sys Admin’ depending on how far down the serverless rabbit hole you go. There are 2 important things to consider here.

Firstly ‘Ops’ means a lot more than server administration. It also means at least monitoring, deployment, security, networking and often also means some amount of production debugging and system scaling. These problems all still exist with Serverless apps and you’re still going to need a strategy to deal with them. In some ways Ops is harder in a Serverless world because a lot of this is so new.

Second even the Sys Admin is still happening - you’re just outsourcing it with Serverless. That’s not necessarily a bad thing - we outsource a lot. But depending on what precisely you’re trying to do this might be a good or a bad thing, and either way at some point the abstraction will likely leak and you’ll need to know that human sys admins somewhere are supporting your application.

Charity Majors gave a great talk on this subject at the recent Serverless Conference and I recommend checking it out once it’s available online. Until then you can read her write-up here and here.

Stored Procedures as a Service

            I wonder if serverless services will become a thing like stored procedures, a
            good idea that quickly turns into massive technical debt
          -- Camille Fournier
Another theme I’ve seen is that Serverless FaaS is ‘Stored Procedures as a Service’. I think that's come from the fact that many examples of FaaS functions (including some I've used in this article) are small pieces of code that wrap access to a database. If that's all we could use FaaS for I think the name would be useful but because it is really just a subset of FaaS's capability then thinking of FaaS in such a way is an invalid constraint.

That being said it is worth considering whether FaaS comes with some of the same problems of stored procedures, including the technical debt concern Camille mentions in the referenced tweet. There are many lessons that come from using stored procs that are worth reviewing in the context of FaaS and seeing whether they apply. Some of these are that stored procedures:

Often require vendor-specific language, or at least vendor-specific frameworks / extensions to a language
Are hard to test since they need to be executed in the context of a database
Are tricky to version control / treat as a first class application
Note that not all of these may apply to all implementations of stored procs, but they’re certainly problems that I’ve come across in my time. Let’s see if they might apply to FaaS:

(1) is definitely not a concern for the FaaS implementations I’ve seen so far, so we can scrub that one off the list right away.

For (2) since we’re dealing with ‘just code’ unit testing is definitely just as easy as any other code. Integration testing is a different (and legitimate) question though which we’ll discuss later.

For (3), again since FaaS functions are ‘just code’ version control is OK. But as to application packaging there are no mature patterns on this yet. The Serverless framework which I mentioned earlier does provide its own form of this, and AWS announced at the recent Serverless Conference in May 2016 that they are working on something for packaging also (‘Flourish’), but for now this is another legitimate concern.

Benefits
So far I've mostly tried to stick to just defining and explaining what Serverless architectures have come to mean. Now I'm going to discuss some of the benefits and drawbacks to such a way of designing and deploying applications.

It's important to note right off the bat that some of this technology is very new. AWS Lambda - a leading FaaS implementation - isn't even 2 years old at time of writing. As such some of the benefits we perceive may end up being just hype when we look back in another 2 years, on the other hand some of the drawbacks will hopefully be resolved.

Since this is an unproven concept at large scale you should definitely not take any decision to use Serverless without significant consideration. I hope this list of pros and cons helps you get to such a choice.

We're going to start off in the land of rainbows and unicorns and look at the benefits of Serverless.

Reduced operational cost
Serverless is at its most simple an outsourcing solution. It allows you to pay someone to manage servers, databases and even application logic that you might otherwise manage yourself. Since you're using a defined service that many other people will also be using we see an Economy of Scale effect - you pay less for your managed database because one vendor is running thousands of very similar databases.

The reduced costs appear to you as the total of two aspects - infrastructure costs and people (operations / development) costs. While some of the cost gains may come purely from sharing infrastructure (hardware, networking) with other users, the expectation is that most of all you'll need to spend less of your own time (and therefore reduced operations costs) on an outsourced serverless system than on an equivalent developed and hosted by yourself.

This benefit, however, isn't too different than what you'll get from Infrastructure as a Service (IaaS) or Platform as a Service (PaaS). But we can extend this benefit in 2 key ways, one for each of Serverless BaaS and FaaS.

BaaS - reduced development cost
IaaS and PaaS are based on the premise that server and operating system management can be commoditized. Serverless Backend as a Service on the other hand is a result of entire application components being commoditized.

Authentication is a good example. Many applications code their own authentication functionality which often includes features such as sign-up, login, password management, integration with other authentication providers, etc. On the whole this logic is very similar across most applications, and so services like Auth0 have been created to allow us to integrate ready-built authentication functionality into our application without us having to develop it ourselves.

On the same thread are BaaS databases, like Firebase's database service. Some mobile applications teams have found it makes sense to have the client communicate directly with a server-side database. A BaaS database removes much of the database administration overhead, plus it will typically provide mechanisms to provide appropriate authorization for different types of users, in the patterns expected of a Serverless app.

Depending on your background you may squirm at both of these ideas (for reasons that we'll get into in the drawbacks section - don't worry!) but there is no denying the number of successful companies who have been able to produce compelling products with barely any of their own server-side code. Joe Emison gave a couple of examples of this at the recent Serverless Conference.

FaaS - scaling costs
One of the joys of serverless FaaS is, as I put it earlier in this article, that 'horizontal scaling is completely automatic, elastic, and managed by the provider'. There are several benefits to this but on the basic infrastructural side the biggest benefit is that you only pay for the compute that you need, down to a 100ms boundary in the case of AWS Lambda. Depending on your traffic scale and shape this may be a huge economic win for you.

Example - occasional requests
For instance say you're running a server application that only processes 1 request every minute, that it takes 50 ms to process each request, and that your mean CPU usage over an hour is 0.1%. From one point of view this is wildly inefficient - if 1000 other applications could share your CPU you'd all be able to do your work on the same machine.

Serverless FaaS captures this inefficiency, handing the benefit to you in reduced cost. In this scenario you'd be paying for just 100ms of compute every minute, which is 0.15% of the time overall.

This has the following knock-on benefits:

For would-be microservices that have very small load requirements it gives support to breaking down components by logic / domain even if the operational costs of such fine granularity might have been otherwise prohibitive.
Such cost beneftis are a great democratizer. As companies or teams want to try out something new they have extremely small operational costs associated with ‘dipping their toe in the water’ when they use FaaS for their compute needs. In fact if your total workload is relatively small (but not entirely insignificant) you may not need to pay for any compute at all due to the 'free tier' provided by some FaaS vendors.
Example - inconsistent traffic
Let's look at another example. Say your traffic profile is very 'spikey' - perhaps your baseline traffic is 20 requests / second but that every 5 minutes you receive 200 requests / second (10 times the usual number) for 10 seconds. Let's also assume for the sake of example that your baseline performance maxes out your preferred server, and that you don't want to reduce your response time during the traffic spike phase. How do you solve for this?

In a traditional environment you may need to increase your total hardware capability by a factor of 10 to handle the spikes, even though they only account for less than 4% of total machine uptime. Auto-scaling is likely not a good option here due to how long new instances of servers will take to come up - by the time your new instances have booted the spike phase will be over.


With Serverless FaaS however this becomes a non-issue. You literally do nothing differently than if your traffic profile was uniform and only pay for the extra compute capacity during the spike phases.

Obviously I've deliberately picked examples here for which Serverless FaaS gives huge cost savings, but the point is to show that unless you have a very steady traffic shape that consistently uses a whole number's worth of server systems that you may save money using FaaS purely from a scaling viewpoint.

One caveat about the above - if your traffic is uniform and would consistently make good utilization of a running server you may not see this cost benefit and may actually spend more using FaaS. You should do some math with current provider costs vs the equivalents of running full-time servers to check to see whether costs are acceptable.

Optimization is the root of some cost savings
There is one more interesting aspect to FaaS costs - any performance optimizations you make to your code will not only increase the speed of your app but will also have a direct and immediate link to reduction in operational costs, subject to the granularity of your vendor’s charging scheme. For example if each of your operations currently take 1 second to run and you reduce that to 200ms you’ll immediately see 80% savings in compute costs without making any infrastructural changes.

Easier Operational Management
This section comes with a giant asterisk - some aspects of operations are still tough for Serverless, but for now we’re sticking with our new unicorn and rainbow friends…

On the Serverless BaaS side of the fence it’s fairly obvious why operational management is more simple than other architectures: less components that you support equals less work.

On the FaaS side there are a number of aspects at play though and I’m going to dig into a couple of them.

Scaling benefits of FaaS beyond costs
While scaling is fresh in our minds from the previous section it’s worth noting that not only does the scaling functionality of FaaS reduce compute cost it also reduces operational management because the scaling is automatic.

In the best case if your scaling process was manual, e.g. a human being needs to explicitly add and remove instances to an array of servers, with FaaS you can happily forget about that and let your FaaS vendor scale your application for you.

Even in the case that you’ve got to the point of using ‘auto-scaling’ in a non FaaS architecture then that still requires setup and maintenance - this work is no longer necessary with FaaS.

Similarly since scaling is performed by the provider on every request / event, you no longer need to even think about the question of how many concurrent requests you can handle before running out of memory or seeing too much of a performance hit, at least not within your FaaS hosted components. Downstream databases and non FaaS components will have to be reconsidered in light of a possibly signifcant increase in their load.

Reduced packaging and deployment complexity
While API gateways are not simple yet, the act of packaging and deploying a FaaS function is really pretty simple compared with deploying an entire server. All you’re doing is compiling and zip’ing / jar’ing your code, and then uploading it. No puppet / chef, no start / stop shell scripts, no decisions about whether to deploy one or many containers on a machine. If you’re just getting started you don’t need to even package anything - you may be able to write your code right in the vendor console itself (this, obviously, is not recommended for production code!)

This doesn't take long to describe but in some teams this benefit may be absolutely huge - a fully Serverless solution requires zero system administration.

Platform-as-a-Service (PaaS) solutions have similar deployment benefits but as we saw earlier when comparing PaaS with FaaS the scaling advantages are unique to FaaS.

Time to market / experimentation
‘Easier operational management’ is a benefit which us as engineers understand, but what does that mean to our businesses?

The obvious case is cost: less time on operations = less people needed for operations. But by far the more important case in my mind is ‘time to market’. As our teams and products become increasingly geared around lean and agile processes we want to continually try new things and rapidly update our existing systems. While simple re-deployment allows rapid iteration of stable projects, having a good new-idea-to-initial-deployment capability allows us to try new experiments with low friction and minimal cost.

The new-idea-to-initial-deployment story for FaaS is in some cases excellent, especially for simple functions triggered by a maturely-defined event in the vendor’s ecosystem. For instance say your organization is using AWS Kinesis, a Kafka-like messaging system, for broadcasting various types of real-time events through your infrastructure. With AWS Lambda you can develop and deploy a new production event listener against that Kinesis stream in minutes - you could try several different experiments all in one day!

For web-based APIs the same cannot quite yet be said in the bulk of cases but various open source projects and smaller scale implementations are leading the way. We’ll discuss this further later.

‘Greener’ computing?
We’ve seen an explosion over the last couple of decades in the numbers and sizes of data centers in the world, and the associated energy usage that goes with them along with all the other physical resources required to build so many servers, network switches, etc. Apple, Google and the like talk about hosting some of their data centers near sources of renewable energy to reduce the fossil-fuel burning impact of such sites.

Part of the reason for this massive growth is the number of servers that are idle and yet powered up.


Typical servers in business and
      enterprise data centers deliver between 5 and 15 percent of their maximum computing
      output on average over the course of the year.



-- Forbes


That’s extraordinarily inefficient and a huge environmental impact.

On one hand it’s likely that cloud infrastructure has probably helped since companies can ‘buy’ more servers on-demand, rather than provision all possibly necessary servers a long-time in advance. However one could also argue that the ease of provisioning servers may have made the situation worse if a lot of those servers are getting left around without adequate capacity management.

Whether we use a self-hosted, IaaS or PaaS infrastructure solution we’re still making capacity decisions about our applications that will often last months or years. Typically we are cautious, and rightly so, about managing capacity and over-provision, leading to the inefficiencies just described. With a Serverless approach we no longer make such capacity decisions ourselves - we let the Serverless vendor provision just enough compute capacity for our needs in real time. The vendor can then make their own capacity decisions in aggregate across their customers.

This difference should lead to far more efficient use of resources across data centers and therefore to a reduced environmental impact compared with traditional capacity management approaches.

Drawbacks
So, dear reader, I hope you enjoyed your time in the land of rainbows, unicorns and all things shiny, because it’s about to get ugly as we get slapped around the face by the wet fish of reality.

There’s a lot to like about Serverless architectures and I wouldn’t have spent time writing about them if I didn’t think there were a lot of promise in them, but they come with significant trade-offs. Some of these are inherent with the concepts - they can’t be entirely fixed by progress and are always going to need to be considered. Others are down to the current implementations and with time we could expect to see those resolved.

Inherent Drawbacks
Vendor control
With any outsourcing strategy you are giving up control of some of your system to a 3rd-party vendor. Such lack of control may manifest as system downtime, unexpected limits, cost changes, loss of functionality, forced API upgrades, and more. Charity Majors, who I referenced earlier, explains this problem in much more detail in the Tradeoffs section of this article:


[The Vendor service] if it is smart, will put strong constraints on how you
          are able to use it, so they are more likely to deliver on their reliability
          goals. When users have flexibility and options it creates chaos and
          unreliability. If the platform has to choose between your happiness vs thousands
          of other customers’ happiness, they will choose the many over the one every time
          — as they should.



-- Charity Majors


Multitenancy Problems
Multitenancy refers to the situation where multiple running instances of software for several different customers (or tenants) are run on the same machine, and possibly within the same hosting application. It's a strategy to achieve the economy of scale benefits we mentioned earlier. Service vendors try their darndest to make it feel as a customer that we are the only people using their system and typically good service vendors do a great job at that. But no-one’s perfect and sometimes multitenant solutions can have problems with security (one customer being able to see another’s data), robustness (an error in one customer’s software causing a failure in a different customer’s software) and performance (a high load customer causing another to slow down.)

These problems are not unique to Serverless systems - they exist in many other service offerings that use multitenancy - but since many Serverless systems are new we may expect to see more problems of this type now than we will once these systems have matured.

Vendor lock-in
Here’s the 3rd problem related to Serverless vendors - lock in. It’s very likely that whatever Serverless features you’re using from a vendor that they’ll be differently implemented by another vendor. If you want to switch vendors you’ll almost certainly need to update your operational tools (deployment, monitoring, etc.), you’ll probably need to change your code (e.g. to satisfy a different FaaS interface), and you may even need to change your design or architecture if there are differences to how competing vendor implementations behave.

Even if you manage to be able to do this for one part of your ecosystem you may be locked in by another architectural component. For instance say you’re using AWS Lambda to respond to events on an AWS Kinesis message bus. The differences between AWS Lambda, Google Cloud Functions and Microsoft Azure Functions may be relatively small, but you’re still not going to be able to directly hook up the latter 2 vendor implementations directly to your AWS Kinesis stream. This means that moving, or porting, your code from one solution to another isn’t going to be possible without also moving other chunks of your infrastructure too.

And finally even if you figure out a way to reimplement your system with a different vendor’s capabilities you’re still going to have a migration process dependent on what your vendor offers you. For example if you’re switching from 1 BaaS database to another do the export and import features of the original and target vendors do what you want? And even if they do, at what amount of cost and effort?

One possible mitigation to some of this could be an emerging general abstraction of multiple Serverless vendors, and we’ll discuss that further later.

Security concerns
This really deserves an article in and of itself but embracing a Serverless approach opens you up to a large number of security questions. Two of these are as follows, but there are many others that you should consider.

Each Serverless vendor that you use increases the number of different security implementations embraced by your ecosystem. This increases your surface area for malicious intent and the likelihood for a successful attack.
If using a BaaS Database directly from your mobile platforms you are losing the protective barrier a server-side application provides in a traditional application. While this is not a dealbreaker it does require significant care in designing and developing your application.
Repetition of logic across client platforms
With a ‘full BaaS’ architecture no custom logic is written on the server-side - it’s all in the client. This may be fine for your first client platform but as soon as you need your next platform you’re going to need to repeat the implementation of a subset of that logic that you wouldn’t have done in a more traditional architecture. For instance if using a BaaS database in this kind of system all your client apps (perhaps Web, native iOS and native Android) are now going to need to be able to communicate with your vendor database, and will need to understand how to map from your database schema to application logic.

Furthermore if you want to migrate to a new database at any point you’re going to need to replicate that coding / coordination change across all your different clients too.

Loss of Server optimizations
Again with a ‘full BaaS’ architecture there is no opportunity to optimize your server-design for client performance. The ‘Backend For Frontend’ pattern exists to abstract certain underlying aspects of your whole system within the server, partly so that the client can perform operations more quickly and use less battery power in the case of mobile applications. Such a pattern is not available for 'full BaaS'.

I’ve made it clear that both this and previous drawback exist for ‘full BaaS’ architectures where all custom logic is in the client and the only backend services are vendor supplied. A mitigation of both of these is actually to embrace FaaS or some other kind of lightweight server-side pattern to move certain logic to the server.

No in-server state for Serverless FaaS
After a couple of BaaS-specific drawbacks let’s talk about FaaS for a moment. I said earlier:


FaaS functions have significant restrictions when it comes to local .. state. ..
        You should assume that for any given invocation of a function none of the in-process
        or host state that you create will be available to any subsequent invocation.




I also said that the alternative to this was to follow factor number 6 of the ‘Twelve Factor App’ which is to embrace this very constraint:


Twelve-factor processes are stateless and share-nothing. Any data that needs to
        persist must be stored in a stateful backing service, typically a database.



-- The Twelve-Factor App


Heroku recommends this way of thinking but you can bend the rules when running on their PaaS. With FaaS there’s no bending the rules.

So where does your state go with FaaS if you can’t keep it in memory? The quote above refers to using a database and in many cases a fast NoSQL Database, out-of-process cache (e.g. Redis) or an external file store (e.g. S3) will be some of your options. But these are all a lot slower than in-memory or on-machine persistence. You’ll need to consider whether your application is a good fit for this.

Another concern in this regard is in-memory caches. Many apps that are reading from a large data set stored externally will keep an in-memory cache of part of that data set. You may be reading from ‘reference data’ tables in a database and use something like Ehcache. Alternatively you may be reading from an http service that specifies cache headers, in which case your in-memory http client can provide a local cache. With a FaaS implementation you can have this code in your app but your cache is rarely, if ever, going to be of much benefit. As soon as your cache is ‘warmed up’ on the first usage it is likely to be thrown away as the FaaS instance is torn down.

A mitigation to this is to no longer assume in-process cache, and to use a low-latency external cache like Redis or Memcached, but this (a) requires extra work and (b) may be prohibitively slow depending on your use case.

Implementation Drawbacks
The previously described drawbacks are likely always going to exist with Serverless. We’ll see improvements in mitigating solutions, but they’re always going to be there.

The remaining drawbacks, however, are down purely to the current state of the art. With inclination and investment on the part of vendors and/or a heroic community these can all be wiped out. But for right now there are some doozies...

Configuration
AWS Lambda functions offer no configuration. None. Not even an environment variable. How do you have the same deployment artifact run with different characteristics according to the specific nature of the environment? You can’t. You have to redefine the deployment artifact, perhaps with a different embedded config file. This is an ugly hack. The Serverless framework can abstract this hack for you, but it’s still a hack.

I have reason to believe that Amazon are fixing this (and probably pretty soon) and I don’t know whether other vendors have the same problem, but I mention it right at the top as an example of why a lot of this stuff is on the bleeding edge right now.

DoS yourself
Here’s another fun example of why Caveat Emptor is a key phrase whenever you’re dealing with FaaS at the moment. AWS Lambda, for now, limits you to how many concurrent executions you can be running of all your lambdas. Say that this limit is 1000, that means that at any one time you are allowed to be executing 1000 functions. If something causes you to need to go above that you may start getting exceptions, queueing, and/or general slow down.

The problem here is that this limit is across your whole AWS account. Some organizations use the same AWS account for both production and testing. That means if someone, somewhere, in your organization does a new type of load test and starts trying to execute 1000 concurrent Lambda functions you’ll accidentally DoS your production applications. Oops.

Even if you use different AWS accounts for production and development one overloaded production lambda (e.g. processing a batch upload from a customer) could cause your separate real-time lambda-backed production API to become unresponsive.

Other types of AWS resources can be separated by context of environment and application area through various security and firewalling concepts. Lambda needs the same thing, and I’ve no doubt it will before too long. But for now, again, be careful.

Execution Duration
Earlier on in the article I mentioned that AWS Lambda functions are aborted if they run for longer than 5 minutes. That's a limitation which I would expect could be removed later, but it will interesting to see how AWS approach that.

Startup Latency
Another concern I mentioned before was how long it may take a FaaS function to respond, which is especially a concern of occasionally used JVM-implemented functions on AWS. If you have such a Lambda function it may take in the order of 10s of seconds to startup.

I expect AWS will implement various mitigations to improve this over time, but for now it may be a deal-breaker for using JVM Lambdas under certain use cases.

OK, that’s enough picking on AWS Lambda specifically. I’m sure the other vendors also have some pretty ugly skeletons barely in their closets.

Testing
Unit testing Serverless Apps is fairly simple for reasons I’ve talked about earlier - any code that you write is ‘just code’ and there aren’t for the most part a whole bunch of custom libraries you have to use or interfaces that you have to implement.

Integration testing Serverless Apps on the other hand is hard. In the BaaS world you’re deliberately relying on externally provided systems rather than (for instance) your own database. So should your integration tests use the external systems too? If yes how amenable are those systems to testing scenarios? Can you easily tear-up / tear-down state? Can your vendor give you a different billing strategy for load testing?

If you want to stub those external systems for integration testing does the vendor provide a local stub simulation? If so how good is the fidelity of the stub? If the vendor doesn’t supply a stub how will you implement one yourself?

The same kinds of problems exist in FaaS-land. At present most of the vendors do not provide a local implementation that you can use so you’re forced to use the regular production implementation. But this means deploying remotely and testing using remote systems for all your integration / acceptance tests. Even worse the kinds of problems I just described (no configuration, cross-account execution limits) are going to have an impact on how you do testing.

Part of the reason that this is a big deal is that our units of integration with Serverless FaaS (i.e. each function) are a lot smaller than with other architectures and therefore we rely on integration testing a lot more than we may do with other architectural styles.

Tim Wagner (general manager of AWS Lambda) made a brief reference at the recent Serverless Conference that they were tackling testing, but it sounded like it was going to rely heavily on testing in the cloud. This is probably just a brave new world, but I’ll miss being able to fully test my system from my laptop, offline.

Deployment / packaging / versioning
This is a FaaS specific problem. Right now we’re missing good patterns of bundling up a set of functions into an application. This is a problem for a few reasons:

You may need to deploy a FaaS artifact separately for every function in your entire logical application. If (say) your application is implemented on the JVM and you have 20 FaaS functions that means deploying your JAR 20 times.
It also means you can’t atomically deploy a group of functions. You may need to turn off whatever event source is triggering the functions, deploy the whole group, and then turn the event source back on. This is a problem for zero-downtime applications.
And finally it means there’s no concept of versioned applications so atomic rollback isn’t an option.
Again there are open source workarounds to help with some of this, however it can only be properly resolved with vendor support. AWS announced a new initiative named ‘Flourish’ to address some of these concerns at the recent Serverless Conference, but have released no significant details as of yet.

Discovery
Similarly to the configuration and packaging points there are no well-defined patterns for discovery across FaaS functions. While some of this is by no means FaaS specific the problem is exacerbated by the granular nature of FaaS functions and the lack of application / versioning definition.

Monitoring / Debugging
At present you are stuck on the monitoring and debugging side with whatever the vendor gives you. This may be fine in some cases but for AWS Lambda at least it is very basic. What we really need in this area are open APIs and the ability for third party services to help out.

API Gateway definition, and over-ambitious API Gateways
A recent ThoughtWorks Technology Radar discussed over-ambitious API Gateways. While the link refers to API Gateways in general it can definitely apply to FaaS API Gateways specifically, as I mentioned earlier. The problem is that API Gateways offer the opportunity to perform much application specific-logic within their own configuration / definition domain. This logic is typically hard to test, version control, and even often times define. Far better is for such logic to remain in program code like the rest of the application.

With Amazon’s API Gateway at present you are forced into using many Gateway-specific concepts and configuration areas even for the most simple of applications. This is partly why open source projects like the Serverless framework and Claudia.js exist, to abstract the developer from implementation-specific concepts and allow them to use regular code.

While it is likely that there will always be the opportunity to over-complicate your API gateway, in time we should expect to see tooling to avoid you having to do so and recommended patterns to steer you away from such pitfalls.

Deferring of operations
I mentioned earlier that Serverless is not ‘No Ops’ - there’s still plenty to do from a monitoring, architectural scaling, security, networking, etc. point of view. But the fact that some people (ahem, possibly me, mea culpa) have described Serverless as ‘No Ops’ comes from the fact that it is so easy to ignore operations when you’re getting started - “Look ma - no operating system!” The danger here is getting lulled into a false sense of security. Maybe you have your app up and running but it unexpectedly appears on Hacker News, and suddenly you have 10 times the amount of traffic to deal with and oops - you’re accidentally DoS’ed and have no idea how to deal with it.

The fix here, like part of the API Gateway point above, is education. Teams using Serverless systems need to be considering operational activities early and it is on vendors and the community to provide the teaching to help them understand what this means.

The Future of Serverless
We’re coming to the end of this journey into the world of Serverless architectures. To close out I’m going to discuss a few areas where I think the Serverless world may develop in the coming months and years.

Mitigating the Drawbacks
Serverless, as I’ve mentioned several times already, is new. And as such the previous section on Drawbacks was extensive and I didn’t even cover everything I could have. The most important developments of Serverless are going to be to mitigate the inherent drawbacks and remove, or at least improve, the implementation drawbacks.

Tooling
The biggest problem in my mind with Serverless FaaS right now is tooling. Deployment / application bundling, configuration, monitoring / logging, and debugging all need serious work.

Amazon’s announced but as-yet unspecified Flourish project could help with some of these. Another positive part of the announcement was that it would be open source, allowing the opportunity for portability of applications across vendors. I expect that we’ll see something like this evolve over the next year or two in the open source world, even if it isn’t Flourish.

Monitoring, logging and debugging are all part of the vendor implementation and we’ll see improvements across both BaaS and FaaS here. Logging on AWS Lambda at least is painful right now in comparison with traditional apps using ELK and the like. We are seeing the early days of a few 3rd party commercial and open source efforts in this area (e.g. IOPipe and lltrace-aws-sdk) but we’re a long way away from something of the scope of New Relic. My hope is that apart from AWS providing a better logging solution for FaaS that they also make it very easy to plug into 3rd party logging services in much the same way that Heroku and others do.

API Gateway tooling also needs massive improvements, and again some of that may come from Flourish or advances in the Serverless Framework, and the like.

State Management
The lack of in-server state for FaaS is fine for a good number of applications but is going to be a deal breaker for many others. For example many microservice applications will use some amount of in-process cached state to improve latency. Similarly connection pools (either to databases or via persistent http connection to other services) are another form of state.

One workaround for high throughput applications will likely be for vendors to keep function instances alive for longer, and let regular in-process caching approaches do their job. This won’t work 100% of the time since the cache won’t be warm for every request, but this is the same concern that already exists for traditionally deployed apps using auto-scaling.

A better solution could be very low-latency access to out-of-process data, like being able to query a Redis database with very low network overhead. This doesn’t seem too much of a stretch given the fact that Amazon already offer a hosted Redis solution in their Elasticache product, and that they already allow relative co-location of EC2 (server) instances using Placement Groups.

More likely though what I think we’re going to see are different kinds of application architecture embraced to take account of the no-in-process-state constraint. For instance for low latency applications you may see a regular server handling an initial request, gathering all the context necessary to process that request from it’s local and external state, then handing a fully-contextualized request off to a farm of FaaS functions that themselves don’t need to look up data externally.

Platform Improvements
Certain drawbacks to Serverless FaaS right now are down to the way the platforms are implemented. Execution Duration, Startup Latency, non-separation of execution limits are 3 obvious ones. These will likely be either fixed by new solutions, or given workarounds with possible extra costs. For instance I could imagine that Startup Latency could be mitigated by allowing a customer to request 2 instances of a FaaS function are always available at low latency, with the customer paying for this availability.

We’ll of course see platform improvements beyond just fixing current deficiencies, and these will be exciting to see.

Education
Many vendor-specific inherent drawbacks with Serverless are going to be mitigated through education. Everyone using such platforms needs to think actively about what it means to have so much of their ecosystems hosted by one or many application vendors. Questions that need to be considered are ones like ‘do we want to consider parallel solutions from different vendors in case one becomes unavailable? How do applications gracefully degrade in the case of a partial outage?’

Another area for education is technical operations. Many teams these days have fewer ‘Sys Admins’ than they used to, and Serverless is going to accelerate this change. But Sys Admins do more than just configure Unix boxes and chef scripts - they’re also often the people on the front line of support, networking, security and the like.

A true DevOps culture becomes even more important in a Serverless world since those other non Sys Admin activities still need to get done, and often times it’s developers who’ll be responsible for them. These activities may not come naturally to many developers and technical leads, so education and close collaboration with operations folk will be of utmost importance.

Increased transparency / clearer expectations from Vendors
And finally on the subject of mitigation Vendors are going to have to be even more clear in the expectations we can have of their platforms as we continue to rely on them for more of our hosting capabilities. While migrating platforms is hard, it’s not impossible, and untrustworthy vendors will see their customers taking their business elsewhere.

The emergence of patterns
Apart from the rawness of the underlying platforms our understanding of how and when to use Serverless architectures is still very much in its infancy. Right now teams are throwing all kinds of ideas at a Serverless platform and seeing what sticks. Thank goodness for pioneers!

But at some point soon we’re going to start seeing patterns of recommended practice emerge.

Some of these patterns will be in application architecture. For instance how big can FaaS functions get before they get unwieldy? Assuming we can atomically deploy a group of FaaS functions what are good ways of creating such groupings - do they map closely to how we’d currently clump logic into microservices or does the difference in architecture push us in a different direction?

Extending this further what are good ways of creating hybrid architectures between FaaS and traditional ‘always on’ persistent server components? What are good ways of introducing BaaS into an existing ecosystem? And, for the reverse, what are the warning signs that a fully- or mostly-BaaS system needs to start embracing or using more custom server-side code?

We’ll also see more usage-patterns emerge. One of the standard examples for FaaS is media conversion: “whenever a large media file is stored to an S3 bucket then automatically run processes to create smaller versions in another bucket.” But we need more usage-patterns to be catalogued in order to see if our particular use cases might be a good fit for a Serverless approach.

Beyond application architecture we’ll start seeing recommended operational patterns once tooling improves. How do we logically aggregate logging for a hybrid architecture of FaaS, BaaS and traditional servers? What are good ideas for discovery? How do we do canary releases for API-gateway fronted FaaS web applications? How do we most effectively debug FaaS functions?

Beyond ‘FaaSification’
Most usages of FaaS that I’ve seen so far are mostly about taking existing code / design ideas and ‘FaaSifying’ them - converting them to a set of stateless functions. This is powerful, but I also expect that we’ll start to see more abstractions and possibly languages using FaaS as an underlying implementation that give developers the benefits of FaaS without actually thinking about their application as a set of discrete functions.

As an example I don’t know whether Google use a FaaS implementation for their Dataflow product, but I could imagine someone creating a product or open source project that did something similar, and used FaaS as an implementation. A comparison here is something like Apache Spark . Spark is a tool for large-scale data processing offering very high level abstractions which can use Amazon EMR / Hadoop as its underlying platform.

Testing
As I discussed in the ‘Drawbacks’ section there is a lot of work to do in the area of integration and acceptance testing for Serverless systems. We’ll see vendors come out with their suggestions, which will likely be cloud based, and then I suspect we’ll see alternatives from old crusties like me who want to be able to test everything from their development machine. I suspect we’ll end up seeing decent solutions for both on- and offline testing, but it could take a few years.

Portable implementations
At present all popular Serverless implementations assume deployment to a 3rd-party Vendor system in the cloud. That’s one of the benefits to Serverless - less technology for us to maintain. But there’s a problem here if a company wants to take such technology and run it on their own systems and offer it as an internal service.

Similarly all the implementations have their own specific flavor of integration points - deployment, configuration, function interface, etc. This leads to the vendor lock-in drawbacks I mentioned earlier.

I expect that we’ll see various portable implementations created to mitigate these concerns. I’m going to discuss the 2nd one first.

Abstractions over Vendor implementations
We’re already starting to see something like this in open source projects like the Serverless Framework and the Lambada Framework. The idea here is that it would be nice to be able to code and operate our Serverless apps with a development-stage neutrality of where and how they are deployed. It would be great to be able to easily switch, even right now, between AWS API Gateway + Lambda, and Auth0 webtask, depending on the operational capabilities of each of the platforms.

I don’t expect such an abstraction to be complete until we see much more of a commoditization of products, but the good thing is that this idea can be implemented incrementally. We may start with something like a cross-vendor deployment tool - which may even be AWS’s Flourish project that I mentioned earlier - and build in more features from there.

One tricky part to this will be modeling abstracted FaaS coding interfaces without some idea of standardization, but I’d expect that progress could be made on non proprietary FaaS triggers first. For instance I expect we’ll see an abstraction of web-request and scheduled (‘cron’) Lambdas before we start seeing things like abstraction of AWS S3 or Kinesis Lambdas.

Deployable implementations
It may sound odd to suggest that we use Serverless techniques without using 3rd-party providers, but consider these thoughts:

Maybe we’re a large technical organization and we want to start offering a Firebase-like database experience to all of our mobile application development teams, but we want to use our existing database architecture as the back end.
We’d like to use FaaS style architecture for some of our projects, but for compliance / legal / etc. reasons we need to run our applications ‘on premise’.
In either of these cases there are still many benefits of using a Serverless approach without those that come from vendor-hosting. There’s a precedent here - consider Platform-as-a-Service (PaaS). The initial popular PaaS’s were all cloud based (e.g. Heroku), but fairly quickly people saw the benefits of running a PaaS environment on their own systems - a so-called ‘Private PaaS’ (e.g. Cloud Foundry).

I can imagine, like private PaaS implementations, seeing both open source and commercial implementations of both BaaS and FaaS concepts becoming popular. Galactic Fog is an example of an early-days open source project in this area, which includes its own FaaS implementation. Similarly to my point above about vendor abstractions we may see an incremental approach. For example the Kong project is an open source API Gateway implementation. At the time of writing it doesn’t currently integrate with AWS Lambda (although this is being worked on), but if it did this would be an interesting hybrid approach.

Community
I fully expect to see a huge growth of the Serverless community. Right now there’s been one conference and there are a handful of meetups around the world. I expect that we’ll start seeing something more like the massive communities that exist around Docker and Spring - many conferences, many communities, and more online fora than you can possibly keep track of.

Conclusion
Serverless, despite the confusing name, is a style of architecture where we rely to a smaller extent than usual on running our own server side systems as part of our applications. We do this through two techniques - Backend as a Service (BaaS), where we tightly integrate third party remote application services directly into the front-end of our apps, and Functions as a Service (FaaS), which moves server side code from long running components to ephemeral function instances.

Serverless is very unlikely to be the correct approach for every problem, so be wary of anyone who says it will replace all of our existing architectures. And be even more careful if you take the plunge into Serverless systems now, especially in the FaaS realm. While there are riches (of scaling and saved deployment effort) to be plundered, there also be dragons (of debugging, monitoring) lurking right around the next corner.

Those benefits shouldn't be quickly dismissed however since there are significant positive aspects to Serverless Architecture, including reduced operational and development costs, easier operational management, and reduced environmental impact. The most important benefit to me though is the reduced feedback loop of creating new application components - I’m a huge fan of ‘lean’ approaches, largely because I think there is a lot of value in getting technology in front of an end user as soon as possible to get early feedback, and the reduced time-to-market that comes with Serverless fits right in with this philosophy.

Serverless systems are still in their infancy. There will be many advances in the field over the coming years and it will be fascinating to see how they fit into our architectural toolkit.

For articles on similar topics…
…take a look at the tag: application architecture

Acknowledgements
Thanks to the following for their input into this article: Obie Fernandez, Martin Fowler, Paul Hammant, Badri Janakiraman, Kief Morris, Nat Pryce, Ben Rady, Carlos Nunez, John Chapin, Robert Bagge, Karel Sague Alfonso, Premanand Chandrasekaran, Augusto Marietti, Roberto Sarrionandia

Thanks to Badri Janakiraman and Ant Stanley who provided input for the sidebar on origins of the term.

Thanks to members of my former team at Intent Media for tackling this new technology with appropriately sceptical enthusiasm: John Chapin, Pete Gieser, Sebastián Rojas and Philippe René.

Finally thanks to all the people who've put thoughts out there already on this subject, especially those whose content I link to.

READ MORE ABOUT:  Cloud Programming Microservices
Share Excerpt

---

The beginning of every new tech buzzword is surrounded with developer
excitement. Through the excitement and alien-like technical terms, it may be
hard to the tell will this new buzzword bring any benefits to your business.

Serverless is one of the new top tech buzzwords at the moment. It started back
in 2014. with Amazon’s re:Invent announcement of AWS Lambda - a compute service
claiming:

- No servers to manage
- Continuous scaling and balancing
- Automatic fail-over
- Subsecond metering (paying only for used, not reserved time)

If you’re not a tech-savvy person (or you’re explaining serverless to one) these
things might not mean much. They sound like a bunch of technical words promising
to help you serve slightly more customers, a bit cheaper. That might be good
enough, but there wouldn’t be that much racket if it was just that.

So, what does serverless mean business-wise and in what ways can it benefit your
business?

- Shorter time to market
- Increased efficiency
- Your fixed costs have become variable costs
- Less waste
- Easier pivoting (more flexibility)
- Better service stability
- Better management of development and testing

Let’s explain.

1. Shorter time to market

For many companies, the path of delivering applications to market is a long one.
Along with product planning, design and development, you also have to think
about the needed infrastructure, setup and capacity.

With serverless, you no longer have to worry about renting and buying
infrastructure, its setup, and capacity planning. These steps are removed from
your product development process and are now the responsibility of your
serverless platform provider. You “only” have to think about how to properly
plan, design and develop your applications. This significantly shortens your
time to market, as the development cycle is shorter.

2. Increased efficiency by paying only for used, not reserved time

Imagine you want to buy a car.

A nice, but an also efficient one for you and your family.

But the salesman states that the car you wanted has to be run all the time.

Whether you’re using it or not.

On full gas.

Your car alternator may fail if you turn it on and off a lot, but your
serverless function won’t.

You’d think this guy might be insane. Why would you buy such a car?

The way that car is working is actually how most of the current infrastructure
your software is running on is working right now.

On full gas.

Let’s see it in the following example of a payment service for one of your
products.

Normally, to be able to run such a service, you’d need to rent or buy a server.
The server would need to run all the time, sitting idle until a payment request
comes. An average usage of the server would look like the following figure.

The top border represents the maximum amount of requests your server can
sustain. The left axis shows your estimated average server usage, going from 0
to 100%. The bottom axis shows the time during one working day.

This looks fine, because this is how your servers usually “need” to work.
Regardless of the quantity of requests, you “need” to pay for both the server
idle and working time, if you want to have a functioning service.

But if we simply inverse the perspective, you would get an average waste of the
same server, like in the next figure.

Currently, whether you’re renting virtual servers or owning a datacenter you’re
wasting resources*. You’re paying for the reserved time whether your
applications are being used or not.

*This diagram does not show the different dimensions of that waste. Memory, disk
space, power consumption and so on. With those, the waste is even bigger.

Serverless changes “the game”, so you pay only for the time it was used.

This diagram shows that with serverless, your capacity is strongly following
your usage. Therefore making minimum waste.

This might look OK, but where is the Y axis? And why did you remove the previous
black frame box around the edges?

The Y axis and the gray frame have moved, because with serverless, your capacity
is scaled automatically per your usage, by your serverless provider. Serverless
makes server capacity no longer your problem. That includes capacity planning,
infrastructure, setup and large DevOps teams.

3. Your fixed costs have become variable costs

Imagine your company has 10 million user requests daily. Each user request is
also making a couple of internal calls too, totaling up to 30 million requests.
(This is a simplified real-world use case from a client, so we won’t go into
details)

To handle that volume, currently you need to either rent a fleet of virtual
servers or setup your own datacenter. Incurring infrastructure monthly costs
ranging from several hundred to a couple of thousand dollars. If we add in the
cost of a team of DevOps engineers to setup and handle your infrastructure, the
data center costs, maintenance and so on, the cost goes much, much more.

Serverless computing services bill you on used request time. An average AWS
Lambda pricing states a $0.20 per one million requests . Seems extremely cheap
but that’s not your total. AWS Lambda is a compute service, so you will also
need data storage, notification services and so on. Additionally, serverless
(with AWS Lambda) recommends separating your application into many smaller
services. Causing the number of internal calls to soar, totaling up to at least
double or 60 million requests daily. That sounds a lot, but the cost for
computation services along with data storage and others you might need will be
ranging around $900 per month.

But that still not where the cost reduction comes from. The cost reduction comes
from the fact that serverless made your fixed costs become variable costs.

Serverless makes your fixed costs become variable costs.

Fixed costs are the ones independent of the output. They include buildings,
machinery, rent. Variable costs vary with output.

Traditional servers force you to have a fixed cost.

Whether you have or don’t have usage.

With serverless, your costs vary on your usage.

If today you had 60 million requests and tomorrow no requests, you’d pay around
$100 for today, and zero for tomorrow.

4. Less waste

When developing multiple products, certain features are repeatedly developed
over and over again. For example, payment processing or user authentication.

Imagine a car manufacturing company making their own tires for every new car
model, over and over again. The price of the car would be the one of a Formula
1.

Serverless with AWS Lambda functions focuses your team to develop product
services as independent components. These components can then be effectively
reused, reducing the waste in spent time and effort.

5. Easier pivoting (more flexibility)

Businesses, especially startups, often need to pivot their products or ideas.
When pivoting, usually you need to change the audience you’re targeting.
Sometimes even rethinking the way your applications work. Nowadays, many
applications are tightly coupled, which is a big problem. Even a slight change
in your product course can cause painful refactoring or rewrites.

Serverless increases your product flexibility. Serverless (with AWS Lambda)
recommends you to separate your application into many small independent
services. Thus increasing your product flexibility. Then if you need to pivot
your product to a different market, you refactor only the services you need.

6. Increased service stability

As a result of being independent, your newly-separated services are more stable.
How so?

Currently, a large number of applications are bundled in big blocks. You can
describe them as bundled services or applications packed into a single block.
Monoliths are not that bad. But they have a major flaw. A single service
crashing can cause the whole monolith to crash. Like washing multicolored
clothes, one cloth’s color can spoil the rest.

7. Better management of development and testing

Building an application consisting of many independent services will help you
have:

- Better project overview.
- Easier testing
- Better estimates
- Better project overview

Developing your applications as independent services will help your measure your
progress better. You’ll gain a better understanding how do your services work
and interact with each other.

Easier testing

Designing your applications as multiple single responsibility units makes them
easier to test. Usually while developing, you also need to setup multiple
environments and pay for them as well. With serverless setting up multiple
environments is free and easy.

Better estimates

Separate single units usually have a smaller scope. Small scope units are easier
to estimate, develop and test.

Nonetheless, there is no single approach, technology or strategy that is a
silver-bullet, it’s all based on your context. What are the potential
side-effects of serverless?

Serverless does bring a lot of benefits to the table. Nonetheless, there is no
single approach, technology or strategy that is a silver-bullet, it’s all based
on your context. Also with serverless, there are potential side-effects that
might make it unsuitable for your company or your case.

1. Vendor lock-in

Running your applications in a serverless environment can tightly couple your
applications and services with your platform provider. Even though your business
logic isn’t reliant on the service itself, it still needs a direct connection to
the platform provider services. With interface and protocol differences between
serverless platform providers “in the mix”, any potential move of your
applications to other serverless platforms will be a painful rewrite. You can
mitigate some of the bad effects by applying Hexagonal architecture.

2. SLA — Service Level Agreements

At the moment, for certain serverless services there are no strong Service-Level
Agreements. In the case of AWS Lambda there are no uptime or operational
agreements, yet. A paper by Gojko Adzic and Robert Chatley found that AWS Lambda
had an approximate uptime of 99.6%. That’s good enough for almost all
businesses. But in case of critical tasks requiring higher availability, Lambda
might not be suitable. AWS does not publish official uptime numbers for Lambda.

3. Maintaining many small services may be troubling

Some may debate on this. Maintaining and debugging many smaller services instead
of a few bundled applications does require more focus and dedication. Especially
for large-scale enterprise environments. You can avoid it by setting automated
testing as a prerogative and using AWS X-Ray.

4. Potentially slightly slower service start

Because your serverless provider is automatically scaling your applications, if
you don’t have any activity for a longer time some of your application instances
may be down when a new request arrives. The situation then requires a “cold”
start of your services, which may result in a higher latency of up to 1s. The
latency, naturally, depends on the environment. Node.js, Python have lower
latencies below 1 second, while Java going a bit higher (between 3 and 10s).

Hope you liked the article, feedback is very appreciated!

Thankful for your shares, comments and critics!

If you liked it, feel free to take a look at the book “Serverless Apps with Node
and Claudia.js” I’m authoring with Slobodan Stojanovic. Published by Manning
Publications.

Serverless Apps with Node and Claudia.js

First the buzzwords: Serverless computing. AWS Lambda. API Gateway. Node.js.
Microservices. Cloud-hosted functions… manning.com I’d like to say a big thank
you to my friends Slobodan Stojanovic, Gojko Adzic, Victoria Riquelme and Viktor
Tuba who have helped me with reviewing, restructuring and sharing their insights
how to improve the article.

You can also find me on Twitter, LinkedIn and Github.

---

When (and why) not to go serverless
Go Back
Archive
Delete
Favorite
Share
Display Options
When (and why) not to go serverless
By Andrea Passwater., serverless.comView OriginalMarch 21st, 2018
There are a lot of people out there championing the serverless movement. Serverless lowers administrative overhead. It takes server maintenance off developers’ plates forever and cuts server costs. The benefits are real.

But so are the drawbacks. If you’re considering serverless, read on.

#Observability is more difficult
It’s probably the biggest critique of serverless right now: you just lose some amount of critical insight into your functions.

Serverless encourages event-based architectures, which a lot of people aren’t familiar with. Add to that, that serverless is a new enough space that the available tooling is relatively immature. It can be hard to do things as simple as stack traces.


The observability talks have not just been practically useful, but also somewhat reassuring that there are still problems to solve with microservice/serverless architectures and it's not just me missing something obvious!


— Matthew Jones (@matt_rhys_jones) March 6, 2018
In the past year, logging and monitoring platforms such as Dashbird, IOpipe, and X-ray have vastly improved their options. Within the next one or two years, serverless observability should be much closer to parity. But there may always be the caveat that, by their very design, serverless functions are stateless. It makes them hard to debug in production by using anything except logs.

While there is tooling that keeps developers from flying blind, there is a lot of room for improvement in the serverless observability space.

#Latency
Serverless functions mean you’ll be dealing with cold starts.

Small caveat to say that there is a fairly simple workaround that many serverless developers use: keeping functions warm by hitting them at regular intervals.

But this is mostly effective for smaller functions. Things get a lot more complicated when you have larger functions or relatively complicated workflows.

To minimize cold start times, here are some things you should keep in mind:

Application architecture: keep your serverless functions small and focused; cold start times increase linearly with memory and code size
Choice of language: Python & Go can considerably lower cold start times, whereas C# & Java notoriously have the highest cold start times.
VPCs: cold start times increase due to extra overhead of provisioning networking resources
#Heavier reliance on vendor ecosystems
With serverless, you don’t manage the server. That also means you lose control over server hardware, runtimes and runtime updates (at the time of writing, Node.js 8 is out but AWS is still on Node.js 6). The provider also imposes concurrency and resource limits.

The specifics of your application architecture can suddenly become determined by the provider you’re using. If you go serverless with AWS Lambda, for example, the only databases you can use are DynamoDB or Serverless Aurora.

We’re talking here about vendor lock-in. There are a lot of discussions out there about the long-term impacts of going all-in on a single provider, with a wide disparity in opinions:


Instead of trying to avoid vendor lock-in, concentrate on switching cost. How easy is a solution to adopt now; and migrate away from later?


— Kelsey Hightower (@kelseyhightower) April 24, 2017
The CNCF is also actively working to initiate standardization across platforms, in order to make it easier to migrate applications and mitigate vendor lock-in in general.

#It’s harder to hire
A lot of developers don’t know what severless is. And even if they do, it’s a hazy enough concept that applicants can have a hard time imagining what their job would entail.

Having ‘serverless’ in a job title has a real chance of shrinking the size of your candidate pool, in a market where finding qualified people is already hard enough. Even if you’re willing to take developers without specific serverless experience, they may be too intimidated to apply anyway.

On the flip side—to a smaller group of experimenters and fast-paced environment lovers, up-and-coming technology stacks are a huge selling point.

#All that said—why use serverless?
If there are drawbacks to serverless, then why are people using it?

Well, overall it can add a lot of efficiency into application development and workflow.

These are the four main reasons people switch to serverless:

it scales with demand automatically
it significantly reduces server cost (70-90%), because you don’t pay for idle
it eliminates server maintenance
it frees up developer resources to take on projects that directly drive business value (versus spending that time on maintenance)

I have had *every* argument thrown at me. I then throw back: "I hardly have to manage anything and it scales and costs a lot less". #win


— 🦄 Paul Johnston 🦄 (@PaulDJohnston) August 14, 2017
There are some use cases for serverless which, despite any possible downsides, are especially hard to argue against. Serverless APIs are workhorses.

Along those lines, the number of digital businesses not just utilizing, but going fully serverless is increasing:


As of today @bustle has fully adopted serverless. We’re down to 15 ec2 instances mostly comprised of self-managed HA Redis. We serve upwards of a billion requests to 80 million people using SSR preact and react a month. We are a thriving example of modern JavaScript at scale.


— Tyler Love (@tyleralove) March 2, 2018
Our own website is a static, serverless site built using Lambda, the Serverless Framework, and Netlify. It’s never gone down and we spend zero hours a week maintaining it.

#TL;DR
As with all things in life, there are tradeoffs. Serverless means you gain efficiency, and trade some control & visibility.

---

https://medium.freecodecamp.org/im-afraid-you-re-thinking-about-aws-lambda-cold-starts-all-wrong-45078231fe7c

I’m afraid you’re thinking about AWS Lambda cold starts all wrong

Go Back
Archive
Delete
Favorite
Share
Display Options
I’m afraid you’re thinking about AWS Lambda cold starts all wrong
By Yan Cui, medium.freecodecamp.orgView OriginalJanuary 17th, 2018

When I dis­cuss AWS Lamb­da cold starts with folks in the con­text of API Gate­way, I often get respons­es along the line of:

Meh, it’s only the first request right? So what if one request is slow, the next mil­lion requests would be fast.
Unfor­tu­nate­ly, that is an over­sim­pli­fi­ca­tion of what hap­pens.

Cold start hap­pens once for each con­cur­rent exe­cu­tion of your func­tion.

API Gate­way reuses con­cur­rent exe­cu­tions of your func­tion if pos­si­ble. Based on my obser­va­tions, it might even queue up requests for a short time in the hope that one of the con­cur­rent exe­cu­tions would fin­ish and become reusable.

If user requests hap­pen one after anoth­er, then you will only expe­ri­ence one cold start in the process. You can sim­u­late this using Charles proxy by repeating a cap­tur­ed request with a con­cur­ren­cy set­ting of 1.


As you can see in the time­line below, only the first request expe­ri­enced a cold start. The response for this request was much slow­er than the rest.

1 out of 100 — that’s bear­able. Hell, it won’t even show up in my 99 per­centile laten­cy met­ric.


What if the user requests came in droves instead? After all, user behav­iours are unpre­dictable and unlike­ly to fol­low the nice sequen­tial pat­tern we see above. So let’s sim­u­late what hap­pens when we receive 100 requests with a con­cur­ren­cy of 10.



Now things don’t look quite as rosy — the first 10 requests were all cold starts! This is problematic if your traf­fic pat­tern is bursty around spe­cif­ic times of the day or spe­cif­ic events, for example:

Food order­ing ser­vices (like JustEat and Deliv­eroo) have bursts of traf­fic around meal times
e-com­mence sites have high­ly con­cen­trat­ed bursts of traf­fic around pop­u­lar shop­ping days of the year — like Cyber Mon­day and Black Fri­day
Bet­ting ser­vices have bursts of traf­fic around sport­ing events
Social net­works have bursts of traf­fic around notable events hap­pen­ing around the world
For these ser­vices, the sud­den bursts of traf­fic means API Gate­way would add more con­cur­rent exe­cu­tions of your Lamb­da func­tion. That equates to bursts of cold starts, and that’s bad news for you.

These are also the most cru­cial peri­ods for your busi­ness when you want your ser­vice to be on its best behav­ior.


If the spikes are predictable, then you can mitigate the effect of cold starts by pre-warming your API.

For example, in the case of a food ordering service, you know there will be a burst of traffic at noon. You can schedule a cron job using a CloudWatch scheduled event at 11:58am to trigger a Lambda function. This function would generate a burst of concurrent requests to force API Gateway to spawn the desired number of concurrent executions ahead of time.

You can use HTTP headers to tag these requests. The handling function can then distinguish them from normal user requests and short-circuit.


Does it not betray the ethos of serverless computing that you shouldn’t have to worry about scaling?

Yes, it does, but making users happy trumps everything else. Your users are not happy to wait for your function to cold start so they can order their food. The cost of switching to a competitor is so low nowadays, what’s stopping them from leaving you?

You could also con­sid­er reduc­ing the impact of cold starts instead, by reduc­ing the duration of cold starts:

Author­ your Lamb­da func­tions in a lan­guage that doesn’t incur a high cold start time — that is, Node.js, Python, or Go
Use high­er mem­o­ry set­ting for func­tions on the crit­i­cal path, includ­ing inter­me­di­ate APIs
Opti­miz­e your function’s depen­den­cies and pack­age size
Stay as far away from VPCs as you can! Lamb­da cre­ates ENIs (elas­tic net­work inter­face) to the tar­get VPC, which can add up to 10s (yeah, you’re read­ing it right) to your cold start
There are also two oth­er fac­tors to con­sid­er:

Exe­cu­tions that are idle for a while would be garbage col­lect­ed
Exe­cu­tions that have been active for a while (some­where between 4 and 7 hours) would be garbage col­lect­ed, too
What about APIs that are sel­dom used? In that case, every invocation might be a cold start if too much time passes between invocations. To your users, these APIs are always slow, so they’re used less, and it becomes a vicious cycle.

For these, you can use a cron job (as in, a CloudWatch scheduled event with a Lambda function as target) to keep them warm. The cron job would run every 5–10 mins and ping the API with a special request. By keeping these APIs warm, your users would not have to endure cold starts.


This approach is less effective for busy functions with lots of concurrent executions. The ping message would only reach one of the concurrent executions, and there is no way to direct it to specific executions. In fact, there is no reliable way to know the exact number of concurrent executions for a function at all.

Also, if the number of concurrent user requests drops, then it’s in your best interest to let idle executions be garbage collected. After all, you wouldn’t want to pay for unnecessary resources you don’t need.


This post is not intend­ed to be your one-stop guide to AWS Lamb­da cold starts. It’s intended to illus­trate that talking about cold starts is a more nuanced dis­cus­sion than “the first request.”

Cold starts are a char­ac­ter­is­tic of the plat­form that we have to live with. And we love the AWS Lamb­da plat­form and want to use it, as it deliv­ers on so many fronts. Nonetheless, it’s impor­tant to not let our own pref­er­ence blind us from what’s impor­tant. Keeping our users hap­py and building a prod­uct that they love is always the most important goal.

To that end, you do need to know the plat­form you’re build­ing on. With the cost of exper­i­men­ta­tion being so low, there’s no rea­son not to exper­i­ment with AWS Lamb­da your­self. Try to learn more about how it behaves and how you can make the most of it.

---

Why AWS Lambda and .zip is a recipe for serverless success
Go Back
Archive
Delete
Favorite
Share
Display Options
Why AWS Lambda and .zip is a recipe for serverless success
By Paul Johnston, PaulDJohnstonView OriginalMarch 15th, 2018
I’ve been involved in numerous discussions in recent days and weeks mainly on Twitter, but elsewhere, around when and how serverless is going to be working with, and supporting, containers instead of just “code”.

It’s mainly container folks who are absolutely desperate to bring their container fu to the serverless world, and start to make use of event driven provisioning and having to avoid some of the issues around provisioning of their own containers and the management that comes with that.

The conversation often boils down to…

“Well you’re using containers behind the scenes, so why can’t I just give you my container and you run that instead?”

So let’s try and answer that by explaining why .zip files are awesome.

How AWS Lambda runs your code
It’s relatively simple. You create an AWS Lambda function and specify a .zip file with the code in it. Yes there are various different runtimes and you need to get the .zip file structure correct, but the package received is simply a .zip file.

It’s just a .zip file.

And .zip files are simply a directory structure of files and folders that has been compressed into a standard format.

And that’s been around for a long time (1989 believe it or not).

That .zip file with code in it gets put into S3 and is linked to the Lambda function and at some point after it’s been uploaded, the Lambda function is invoked, and a cold start happens.

Then the magic happens (well it’s not actual magic, but it’s pretty clever).

In the background, we run an optimised execution environment for the runtime and version your function has specified, and we load your code into from the .zip file.

Then we execute your code (invoke the function) with the data in the event payload that has been sent to the function.

 Simple isn’t it?

Create function code
Zip the function code up
Create an AWS Lambda function
Now you have a function. What happens on an event?

Download the function code
Start an execution environment
Execution environment gets function code (the data in the .zip file) and bootstraps the runtime
Execute the code with the event data payload
That’s a cold start. More in-depth explanation can be found on the Become a Serverless Blackbelt video on youtube.

Note: slow cold starts are often due to overly complex frameworks and dependencies. See https://docs.aws.amazon.com/lambda/latest/dg/best-practices.html#function-code for more info e.g. for Java prefer dependency injection like Dagger or Guice, over Spring Framework.

A warm start is even simpler. It’s basically step 4 as steps 1 to 3 have been done already. The optimised execution environment is kept around for a while to be invoked, and if the event is triggered for which that function is required then the function is sent a new event payload and is invoked.

So it’s a “container”
There’s an execution environment of some sort in there behind the scenes running your code and AWS talked about that in the very beginning when Lambda was in preview (back then it was called a container).

https://aws.amazon.com/blogs/compute/container-reuse-in-lambda

With AWS Fargate you can build an actual container instead of just providing code in a .zip file and run it yourself, but you need to provision it yourself.

On the surface it seems like you’d get a better deal by building the container for a serverless scenario as you can control more factors.

You get to choose the exact version of the operating system if you really want. (As an example, you can create ‘FROM scratch’ docker images https://docs.docker.com/develop/develop-images/baseimages/)

You get to choose the exact libraries you want.

You get to choose the exact build versions and security patches.

You get to choose the security inside it as well.

You can scale with AWS Fargate as well and while you’re not managing servers, you’re still managing containers. And when scaling you’ll still have to consider the problem of cold starts. How fast does your container start up?

Warm starts are less of an issue though with containers as they are already running, but then you are paying for idle, which doesn’t happen with AWS Lambda. You only pay for invocations at that point.

But you also need to be able to manage and maintain the containers themselves. If somebody decides to build a badly designed container (inadvertently or due to inexperience) then the cold start on scaling may be compromised.

You also have to take into account that every single time there is a security patch needed to a container, that everybody needs to patch their own containers.

Remember Meltdown?


Adrian Cockroft had it right. You had to patch your containers and your instances/servers, but you didn’t have to patch Lambda functions.

Why?

Because you don’t control the AWS Lambda execution environment or server.

AWS controls it.

AWS patched it all for you.

Think about it for a moment.

You only gave them code in a .zip file.

Now with AWS Lambda, you still have to worry about library code that you put into functions needing security patches, but that’s a whole lot easier than having to worry about what actually executes that code.

And if you were going to have the same code as in the Lambda function anyway, but run it in your own container, then letting AWS run it in a Lambda function is removing the ops burden of managing the container.

But why .zip files?
Because .zip files are easy to create, easy to read (programmatically) and easy to work with.

In fact, they are ridiculously simple. Every developer can write code and make a zip file in several different ways.

But not only that, they are quick to extract and use.

And thinking about the build and deploy process, it’s far far easier to have a build process that looks like:

Write code
Test code
.zip code
Deploy code
Comparing it to “creating a Docker container” you have to create your Dockerfile and essentially create a series of commands to generate a server to run your code. While you can boilerplate this to an extent, the Dockerfile becomes a part of the system that needs to be maintained and managed, introducing both security issues and likely errors and bugs (especially if deployed over a period of time).

In terms of .zip files, step 3 is trivial, well understood, and very stable (nearly 30 years old). It is a step that is automatable by junior developers, and that makes development processes easier to understand, easier to teach, and very difficult to get wrong.

Assuming that the code is the same in both, why introduce the complexity of the container unless you have to?

Using .zip files as the unit of deployment allows developers to focus on what they should be focusing on: the business logic and the value it provides to the business.

Serverless needs containers, but we don’t need to worry about them
You know the joke about “Serverless — You know there are still servers right?”

There’s another one…

“Serverless — you know there are still containers right?”

You could say, we’re “containerless” just as much as we’re serverless.

Part of the purpose of serverless as a concept is that the whole team can stop worrying about the complexity and management of deployment and simply focus on development.

Containers definitely have their place and value, and don’t think that we in the serverless world are thinking that you’re all wrong and don’t know what you’re talking about. The serverless world wouldn’t exist without containers and it’s really important to understand that and realise that we know that too.

But the thing is that with AWS Lambda and serverless, we don’t even need to worry about what a container is, or why it matters. AWS does the creation, the optimisation, the securing, the provisioning, the scaling and the patching of those execution environments for us.

It also means that AWS could build and deploy improvements to that technology and give customers those improvements without having to make any changes.

Because it’s just a .zip file.

Serverless people simply don’t have to worry about what a container is, or how it really works.

Containers just don’t matter in the serverless world.

Because we write code.

And it runs on demand.

And it scales.

And it’s quick.

And if we ever needed a container, we could figure it out and run it on AWS Fargate.

Disclaimer
I currently work for AWS as a Senior Developer Advocate for Serverless based in the UK and working in EMEA.

Opinions expressed in this blog are mine and may or may not reflect the opinions of my employer.

EXPLORE THE BEST FROM: medium.com
Share Excerpt

---

Securing Serverless: A Newbie’s Guide
Go Back
Archive
Delete
Favorite
Share
Display Options
Securing Serverless: A Newbie’s Guide
By Jeremy Daly., www.jeremydaly.comView OriginalFebruary 22nd, 2018

So you’ve decided to build a serverless application. That’s awesome! May I be the first to welcome you to the future. 🤖 I bet you’ve done a lot of research. You’ve probably even deployed a few test functions to AWS Lambda or Google Cloud Functions and you’re ready to actually build something useful. You probably still have a bunch of unanswered questions, and that’s cool. We can still build some really great applications even if we only know the basics. However, when we start working with new things we typically make a bunch of dumb mistakes. While some are relatively innocuous, security mistakes can cause some serious damage.

I’ve been working with serverless applications since AWS launched Lambda in early 2015. Over the last few years I’ve developed many serverless applications covering a wide range of use cases. The most important thing I’ve learned: SECURE YOUR FUNCTIONS! I can tell you from personal experience, getting burned by an attack is no bueno. I’d hate to see it happen to you. 😢

To make sure it doesn’t happen to you, I’ve put together a list of 🔒Serverless Security Best Practices. This is not a comprehensive list, but it covers the things you ABSOLUTELY must do. I also give you some more things to think about as you continue on your serverless journey. 🚀

The Basics
Serverless is a new paradigm when it comes to building, deploying and maintaining applications. While there are some major benefits of using serverless (like no more patching or worrying about long-running compromised servers), it also introduces additional complexities in how we manage security and maintain our applications. Serverless also isn’t a magic bullet against OWASP’s Top Ten security risks (2017). All of these risks are still relevant and may even be harder to detect.

Below are the absolute minimum steps you need to take to protect your serverless application. I’m not trying to scare you, but try to imagine all life as you know it stopping instantaneously, and every molecule in your body exploding at the speed of light. That won’t actually happen if you fail to follow these recommendations, but it will feel like it. 💥

Least Privilege Principle
You’ve probably heard this before, especially if you’ve worked with AWS or other cloud services. The concept is pretty simple: “every module must be able to access only the information and resources that are necessary for its legitimate purpose.” (Wikipedia). Every AWS Lambda function requires an IAM Role. Make sure that you assign only permissions that the function MUST have. People love to use things like Action: -"sns:*". That means this function can do ANYTHING to the Simple Notification Service including creating new topics, deleting topics, and sending SMS messages. If your function doesn’t need to do everything (which is totally doesn’t), then don’t use a damn wildcard for permissions.

Beware of Third-Party Packages
Isn’t it great when other people write libraries for us so we don’t have to write our own? Yes, it is, but did you know that most of the people who write these packages aren’t very good at security? In the summer of 2017, a post on Github discussed an exploit that allowed the author to gain access to NPM accounts through a series of relatively simple attacks. This gave him the ability to affect nearly 54% of the NPM ecosystem. If a malicious user would have taken advantage of this, your application could have been compromised because you used require to pull in a dependency.

Does that mean I can’t use third-party dependencies in my serverless apps? Well, yes and no. There are some pretty amazing packages out there (not just for Node.js), but as a developer, you need to be aware of the security risks, especially when it comes to dependency chains. My first step when evaluating 3rd party packages is to look at the number of dependencies. If there are a lot of them (especially from multiple authors), then the risk is higher. You also need to look at the dependencies’ dependencies. Then the dependencies’ dependencies’ dependencies. This could obviously go on and on and drive you insane. I typically avoid packages with lots of dependencies. If I find a package that does a lot of stuff, I’ll often look at what packages it uses, and implement my own solution using its components. Sure it’s more work, but it makes me feel warm and fuzzy.

But I have to use XYZ package because it does the most awesomest thing ever!!! Okay, I get it, I’ve been there too. If you are going to use a third-party module with a lot of dependencies, then use package locks or NPM shrinkwrap. This will allow you to “lock” your dependencies so that no new updates will creep into your code until you’ve had a chance to review them. If you are using nvm (Node Version Manager), just remember that package locks weren’t automatic until v5 of NPM. So if you’re like me and develop your local Node.js apps using v6.10 to match Lambda’s runtime, you will have to implement this manually.

See also A9:2017-Using Components with Known Vulnerabilities

Protect User Data ✋
Users are trusting you with their private information, whether that be their email address, phone number, credit card data, or pants size. You have a responsibility to keep that data safe and secure. Your serverless application is obviously going to need access to data to do anything exciting. This means you’ll be passing data between other cloud services like Elasticache, RDS, and DynamoDB as well as potentially using other third-party APIs and webhooks. Data in transit should always be encrypted using a secure protocol like TLS. Traffic to and from your API Gateway always uses HTTPS, which is great, but make sure any front-end pages accessing that data are running HTTPS as well. DynamoDB now lets you automatically encrypt data at rest, but if using something like MySQL, make sure to encrypt passwords using a strong salted hashing function as well as encrypt other sensitive data using a secure key.

Another common mistake is exposing sensitive data through logs and alerts. If you’re using a third-party framework, it’s possible that built-in logging (which is great for development) can be a huge security hole. Exposing clear text passwords and other sensitive data to logs opens up another attack vector for hackers. Alerts can be even more dangerous. I always fire off an alert when something goes wrong with one of my serverless apps, but I never send sensitive data or a full stack dump. That information gets sent via SMS and/or email and becomes much easier to steal. Plus you’re now trusting your email and mobile providers with your customer’s sensitive data.

See also A3:2017- Sensitive Data Exposure

You might say to yourself, “that’s cool, I’ll just disable logging altogether and run my application in the dark.” Au contraire mon frère, because…

Logging is your Best Friend 📝
Another major problem with serverless applications is that logging is up to the developer to implement. This means that unless you console.log something, your application executes and then fades into the wind. Server-based applications typically have all kinds of logging that we can use to determine if something nefarious is happening. With serverless apps, we need to build our own logging mechanism so that we can properly monitor our app.

Here are a few suggestions on things you should definitely log:

Logins: be sure to log things like the IP address, device, etc.
Failed logins: log the number of failed attempts, IP address, device type, etc.
Account modifications: things like updated passwords, email changes, etc.
Other database interactions: confirmation of inserted, modified and deleted records
Financial transactions: e.g. credit cards, PayPal, Apple Pay, etc.: log transaction numbers, IP address, the amount, and the user account
In addition to simply logging information, make sure you can actually DO something with this data. While capturing the number of failed login attempts is helpful for a forensic audit, it will do little good if someone is brute force attacking your authentication system. Start by limiting logins from the same username to a maximum number of failed attempts. Next, keep a running counter of login failures from the same IP block. If that number reaches some threshold, send yourself an alert so you can investigate. Speaking of thresholds, things like database connections, queries per second, memory consumption, and average execution time are good indicators of suspicious activity. Set appropriate alarms in AWS CloudWatch so that spikes in these metrics will notify you immediately.

Finally, make sure you capture USEFUL error messages. It’s fine to return a “500: something went really wrong here” message to your users, but your system should capture as much detail as possible. This should include the stack trace, the input supplied (minus clear text passwords), the state of the application, the logged in user, and any other data that you can capture. When a major error occurs, send yourself a summary alert, just be sure not to include any sensitive data.

See also A10:2017- Insufficient Logging & Monitoring

Write Good Code 👨🏻‍💻
This is just plain ole good advice. Writing secure, well-tested code is critically important to securing your application. Code should be defensive, meaning it should be expecting someone to feed it bogus data. If the data pattern is unexpected, it should throw an error and notify you immediately. Your code should sanitize and escape all user supplied data. As Fox Mulder once said, “trust no one, and be careful of SQL injection attacks.” I’m paraphrasing, of course. But seriously, people will throw all kinds of junk at your app. You need to make sure you strip out or escape potentially malicious code (like SQL commands and <script> tags), set maximum string lengths (so many people forget this), and validate inputs with type and range checks.

Here are some other things you should consider when writing code for serverless apps:

Use proper parsing: Never use something dumb like eval(). JSON.parse() will only convert properly formatted user-supplied JSON. eval() could execute something on the backend and reek havoc.
Minimize side-effects: Try to write pure functions with no side-effects (other than logging). Impure functions mutate variables, state and data outside of their lexical scope, which can make debugging and testing code very difficult. Given the same input, a pure function will return the same output every single time. This makes writing predictable tests much easier and allows you to simply add new tests when you start logging real world input to your functions.
Be careful of frozen connections and variables: AWS Lambda “freezes” connections and variables outside of your main handler function and reuses these variables in successive executions. This feature is awesome because we can reuse database connections and save time by not needing to re-establish a connection every time the function runs. However, improperly used, this feature can leak data between user accounts and cause debugging headaches and corrupted user data. Never assign data specific to a user in a variable outside your main handler’s scope.
See also A8:2017- Insecure Deserialization

Access should be a Privilege, not a Right
Chances are you’ll be exposing functions to the public through an API. This means that anyone with an Internet connection can start banging up against your system, some for legitimate purposes, others just because they’re jackasses. While we want our actual users to have a smooth experience, let’s not make it easy for those with ill intent to take advantage of us. This means implementing proper authentication and access control.

If you’re not familiar with authentication, read up on things like OAuth, JWT, and Bearer tokens. You need to make sure that you use an authentication method to authenticate EVERY endpoint. This gets tricky with serverless apps because you need to build authentication into every function that gets accessed directly while accounting for the ephemeral nature of your functions. Unlike a server-based application, there is no session management built in to serverless. I typically store active tokens in Redis and check them against every request. This lets me enforce token timeouts, count invocations, and manually expire tokens. If you are new to this, I do not suggest that you build your own authentication system. AWS Cognito is a good solution and fairly easy to implement.

A word of advice: don’t rely solely on API keys if you are allowing users to modify data. Backend API calls for certain types of systems make authentication easier by using a static API key, but these can get compromised easily. If you do allow keys, limit what they can do and then provide additional authentication for actions that can destroy or modify data. Also, be aware of CSRF and never use something like cookie-based authentication.

Now that we’ve locked down access to the API itself, we also need to be aware of what our users can do once they’re authenticated. Building in ACLs, or Access Control Lists, is a great way to add extra security to your API. This is obviously a much larger discussion, but the bottom line is that not every user should be able to do everything. If you have admin functions built into your API, you want to make sure that an average user doesn’t have those same rights. Quick and dirty solution: assign a list of “permission ids” to each user, cache that with their token, protect every action in your system by checking against that list.

See also A2:2017-Broken Authentication and A5:2017-Broken Access Control

Protect Your Keys, Usernames and Passwords
Remember that time we talked about the Least Privilege Principle? The reason that’s so important is because access keys get leaked all the time. Sometimes someone does something really stupid and checks them into Github, other times someone hardcodes it into a script on a server that gets compromised. And third-party modules? Yeah, they can easily expose keys as well. Does this mean we should just give up on life? Of course not. But we do need to take steps to make sure that our keys are as secure as possible.

Here are some suggestions to keep access keys safe and minimize security risks to our applications:

Every developer should have separate keys: This is a little more work, but it makes it easy to shut off someone’s access AND it is great for limiting what developers can do with their keys.
Have separate keys for separate projects/products/components: Again, this is a little more work, but having different keys for different concerns mitigates the risk of a compromised key, limiting the scope of damage.
Rotate keys on a regular basis: I know, this one is a lot of work, but it is extremely important to keeping our apps secure. Think about it, real hackers don’t want you to know that you were hacked. Most are in this for profit, not glory, which means stealth attacks are much more common and therefore harder to detect. Not every compromised key will result in spinning up hundreds of virtual machines to mine Bitcoin, leaving most victims unaware that their customer data is being stolen. If you rotate your keys on a monthly (or more frequent 😬) basis, you can shut off a hacker’s access (even if you don’t know you were hacked). Pick someone to be your “keymaster”, call them Vinz Clortho, laugh at them because they have this crappy job, and then make them rotate keys on a regular basis and securely distribute them to developers.
Follow the Least Privilege Principle: I’m going to keep repeating this until you get it stuck in your head like a Bee Gees’ song. Developers almost certainly don’t need to be able to create EC2 instances or VPCs with their access keys. In this extremely rare case, create separate keys in addition to their normal developer keys. And for the love of all that is holy, DO NOT ever use the wildcard * for resources or actions!
Separate development and production environments: We’ll talk about this a bit more later, but limiting access to production environments is Cloud Security 101. Many companies create multiple cloud service accounts that completely separate development resources from production ones. This means that we developers can make all kinds of dumb mistakes without waking up the next day with the “we just got hacked and it was my fault” hangover. 🤦🏻‍♂️
Great, so now our keys are relatively safe, but what about usernames and passwords to our databases, external API keys, and other sensitive information? For some reason, many developers’ first instinct is to hard-code these into their scripts. Don’t do that. First of all, you’re mostly likely going to check that into your git repository, which isn’t very smart. And second, every developer with access to your code repository will know the credentials for that service… forever… until you change it. Both of these open up security risks that can expose clear text credentials for systems that store user and other sensitive data.

Here are some tips to securing your credentials and protecting backend systems:

Use AWS Systems Manager Parameter Store to store credentials: For AWS users, you can store encrypted values in the SSM Parameter Store and then give your Lambda functions access to them. It’s also possible to store these as environment variables so they do not need to be queried at runtime.
Again, Least Privilege Principle: Same thing applies when accessing other backend systems. If your application only needs to insert and select data from your MySQL database, create a user and password that ONLY has those permissions. Bonus if you limit it to certain tables too.
Separate development and production: I may sound like a broken record, but having separate systems (preferably in different accounts) that provide less restrictive access to wild and crazy developers, and Fort Knox-esque protection to production systems, significantly limits your risk of compromised credentials.
Implement CORS
Not the beer. 🍺  Cross-Origin Resource Sharing, or CORS, is a “mechanism that uses additional HTTP headers to let a user agent gain permission to access selected resources from a server on a different origin (domain) than the site currently in use.” (MDN Web Docs) Essentially, these extra headers tell the web browser whether or not your API is accessible from the domain it is calling from. CORS does not apply to programmatic API access (e.g. cURL calls), but it is a very important security component when accessing your API from a web browser.

A web browser will send a preflight OPTIONS request to your API. Your API should respond with headers like Access-Control-Allow-Origin, Access-Control-Allow-Methods and Access-Control-Allow-Headers. The Access-Control-Allow-Origin tells the browser which domains can access the API. If the current domain doesn’t match, the browser logs an error. This is an important security feature. First, you most likely don’t want someone else building a tool that duplicates access to your API. This can expose your users to all kinds of phishing attacks and other ways to compromise security. Second, a rogue script or plugin could attempt to steal user tokens and call your API on their behalf. CORS isn’t foolproof, but it is a piece of the larger security puzzle.

Common Attack Vectors
Earlier we discussed writing good code and how we should never trust data sent by a user to our systems. The reason for this is due to a number of attacks that don’t require compromising infrastructure security, but instead, simply take advantage of poorly written code. There are several common types of attacks, but the two most popular are Injection Attacks and Cross-Site Scripting Attacks (XSS).

Injection Attacks
Injection attacks can take many forms, but with web-accessible APIs, it typically involves an attacker sending SQL or system commands through your existing parameters. For example, if you return a user’s data using SELECT * FROM Users where user_id = ${request.user};, an attacker could pass in $request.user as 1 OR 2, allowing them to gain access to another user’s data. Or they could send it in as 1; DELETE * FROM Users;, which would delete all the data from your Users table! These types of attacks can affect NoSQL, ORMs, OS commands, and others.

The good news is that these types of attacks are relatively easy to thwart. Be sure to:

Use prepared statements: This will parameterize inputs unlike concatenated SQL queries.
Escape all user input: ;DELETE * FROM Users becomes ';DELETE * FROM Users', the added single quotes make a big difference.
Add LIMITS to queries: If you expect only ONE result (like retrieving a user’s info), then LIMIT your query to ONE record.
Check type, range, and length: If you are expecting a number between 1 and 10, validate that the input is a number between 1 and 10. If your text field has a maximum of 200 characters, make sure the input doesn’t exceed 200 characters.
See also A1:2017- Injection

XSS – Cross-Site Scripting Attacks
XSS attacks are usually the second phase of a successful Injection attack. These can be Reflected XSS, when unsanitized user input is returned back in an HTML response, Stored XSS, when unsanitized data is stored in a system’s datastore and returned back and displayed to a user, and DOM XSS, when SPAs and Javascript apps dynamically load malicious code. Following the suggestions above for preventing Injection attacks is a good first step, but your front-end can be vulnerable even if the backend is secure. A successful XSS attack can effectively take over a user’s session and give them authorized access to your API.

See also A7:2017- Cross-Site Scripting (XSS) for ways to mitigate XSS in your front-end systems.

DoS Attacks
I don’t want to spend a lot of time on this topic, but it is worth mentioning. I’m sure you already know this, but a DoS (or Denial-of-Service) attack is when an attacker tries to make your service unavailable by flooding it with requests. A DDoS (or Distributed Denial-of-Service) attack is the same thing, just from multiple sources. While DoS attacks are typically not a major “security” risk, meaning they are unlikely to result in a system or data breach, there are some things to consider in regard to your serverless application.

Serverless applications can scale almost indefinitely: This is good news and bad news. While your application might be able to scale up to defeat a DoS attack, your wallet might not. Thousands of requests per second could rack up some HUGE bills.
Data sources have a max capacity too: Even if you scale up your functions to handle a DoS attack, you still run the risk of overwhelming your backend data stores. Caching can help, but you should think about rate limiting database calls per user as well.
You can rate limit your API: AWS API Gateway lets you rate limit the number of API calls per second. This can help to mitigate charges, but it still results in your service being unavailable to your users during an attack. AWS supposedly automatically protects against DDoS attacks, but I’m not sure to what extent.
Turning Security up to an 11 🔊
If you’ve done the basics, which I agree is a lot to do, then you’re well on your way to having a secure serverless application. If you’d like to take your security to the next level, then here are a few more suggestions.

Use the ⚡Serverless Framework
The Serverless framework is amazing! I use it with every serverless project that I work on because it makes organizing, deploying, and securing my applications a lot easier. Learn more at Serverless.com.

Implement CI/CD
Continuous Integration and Continuous Deployment go hand in hand with separating development and production environments. Code reviews, automated testing, and automatic deployment to a production system will help to ensure that production keys, usernames/passwords, and other sensitive credentials aren’t unnecessarily exposed.

Create Different AMI Roles per Function
Least Privilege Principle!!! Most functions have different needs; creating a single role for all the functions in your application can open up security holes. By creating a different role for every function, especially on a team with multiple developers, you mitigate risk by restricting each function to its intended purpose.

Delete Old Functions
Old functions are a liability. As soon as a function is no longer necessary, remove it from your cloud service and delete its IAM role. You can always redeploy it later. Old functions can contain stale code that could compromise updated data structures, bypass new security enhancements, and more. Avoid the risk and remove the function.

Where Do We Go From Here?
So that’s it! Now, just like me, you are still NOT a serverless security expert! 😀  But hopefully you know more now than you did a few minutes ago and will feel more confident building your serverless apps.

If you want to learn more about serverless security, I suggest you read some of the following articles by people who know a lot more about security than I do.

Yan Cui’s excellent Many-faced threats to Serverless security – October 25, 2017
Hacking Severless Runtimes whitepaper by Andrew Krug and Graham Jones – July 15, 2017
Serverless Security implications—from infra to OWASP by Guy Podjarny – April 19, 2017
Did I miss something? Do you disagree with me? Did I turn you off to serverless architecture? Did my multiple 🚫 Ghostbusters references upset you? Let me know in the comments.

Did you like this post? 👍  Do you want more? 🙌  Follow me on Twitter or check out some of the projects I’m working on. You can join my mailing list too. I’ll email you went I post more stuff like this! 📪

Tags: amazon web services, api, api gateway, aws lambda, cors, faas, javascript, nodejs, security, serverless

READ MORE ABOUT:  Security

---

https://hackernoon.com/running-a-scalable-reliable-graphql-endpoint-with-serverless-db16e42dc266

Running a scalable & reliable GraphQL endpoint with Serverless
Part 3: AppSync Frontend: AWS Managed GraphQL Service

AWS AppSync architecture
Part 1: Introduction: GraphQL endpoints with API Gateway + AWS Lambda
Part 2: AppSync Backend: AWS Managed GraphQL Service
Part 3: AppSync Frontend: AWS Managed GraphQL Service (this post)
“AWS AppSync is a fully managed Serverless GraphQL service for real-time data queries, synchronization, communications and offline programming features.” — Part 2
Introduction
In this post, we will learn about building mini Twitter App’s client components using ReactJS and AWS AppSync. In particular, I will focus on :

User Authentication with AWS Amplify.
Mini Twitter App Components.
GraphQL Subscriptions.
GraphQL Mutations with Optimistic UI and Offline Support.
Serverless Client Deployment with Netlify and S3.
Let’s get started! 🏃

Note 1: In Part 2 we have created mini Twitter App’s backend GraphQL API using AWS AppSync, DynamoDB, ElasticSearch and AWS Lambda. We also deployed the API using new serverless-appsync-plugin.
Note 2: You can quickly get started with this App in the serverless-graphql repository using yarn start. Please make sure configs are set properly.
Note 3: AppSync Client also has SDK’s for native iOS, web, and React Native, with Android but in this post, we are going build a React JS App with JS SDK.
AppSync Client + AWS Amplify
AppSync Client uses Apollo Client 2.0 under the hood to simplify user authentication, manage offline logic and support real-time subscriptions.

On the other hand, you can use AppSync Client with AWS Amplify to simplify user authentication workflows in your application 🔑. AppSync provides authentication using API Key, Cognito User Pools or AWS IAM policies and AWS Amplify complements the same with methods provided in Auth Class for user sign-up, sign-in, password confirmation and sign-out.

import Amplify, { Auth } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react/dist/Auth';
import AWSAppSyncClient from 'aws-appsync';
import { ApolloProvider } from 'react-apollo';
const client = new AWSAppSyncClient({
  url: 'https://xxxx.appsync-api.us-east-1.amazonaws.com/graphql',
  region: 'us-east-1',
  auth: {
    // AWS Cognito User Pool
    type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
    jwtToken: async () =>
      (await Auth.currentSession()).getIdToken().getJwtToken(),

    // API KEY
    type: AUTH_TYPE.API_KEY,
    apiKey: 'xxxxxxxxxxxxx',
    // AWS IAM
    type: AUTH_TYPE.AWS_IAM
    credentials: () => Auth.currentCredentials(),
   },
});
const WithProvider = () => (
  <Router>
    <ApolloProvider client={client}>
  </Router>
);
export default withAuthenticator(WithProvider);
As seen in App.js code above, adding authentication to your application is as easy as wrapping your App’s main component with withAuthenticator higher order component. You can use aws-appsync-react and aws-amplify-react packages by AWS for all of these integrations.

Note: For this demo, I am using AWS Cognito User Pool for User Authentication and have created two test users (sidg_sid and nikgraf) in Cognito. Once the user is logged in, their session is persisted in localStorage by Amplify. So the user can leave the page, come back, and still be logged in! You can find more details in this post by Nader Dabit.

User Authentication with AWS AppSync + AWS Amplify + AWS Cognito
Mini Twitter App Components
Now, the exciting stuff begins! 💃

The basic structure of this App is created using create-react-app . Also, we are using styled-components to make our App look fancy 💅Given below are the five main components of this application.

UserLogin: users can log in or sign out from this App (previous section).
ProfileInfo: retrieve basic user profile info from DynamoDB.
ProfileTweets: retrieve a list of tweets from ElasticSearch.
TweetForm: users can send a tweet.
TweetSearch: users can search through a corpus of all tweets by keywords.
In order to make it all work, we take advantage of specific GraphQL operations:

Queries — fetch profile info and list of tweets for a given user.
Mutations — create and delete a tweet for a given user.
Subscriptions — followers of a given user can see his new tweets.

Various Components of mini Twitter App
Profile Info Component:
In this section, you will see how to wire up this component using ProfileInfoQuery , graphql from react-apollo .

The GraphQL schema for this App defines getUserInfo. The resolver for the query given below fetches data from DynamoDB for a given user handle.

export const ProfileInfoQuery = gql`
  query ProfileInfoQuery($handle: String!) {
    getUserInfo(handle: $handle) {
      name
      location
      description
      following
     }
  }
`;
The value of handle is parsed from JWT token and is available in context.identity.username or it can be provided as an input context.arguments.handle . The query above is resolved using the following mapping template in AppSync Backend.

{
    "version" : "2017-02-28",
    "operation" : "Query",
    "query" : {
        "expression": "handle = :handle",
        "expressionValues" : {
            ":handle" : {
                "S" : "${context.identity.username}"
            }
        }
    }
}
At the end, ProfileInfoComponent is:

import React from 'react';
import { graphql } from 'react-apollo';
import { ProfileInfoQuery } from '../queries';
const ProfileInfo = ({ data: { loading, getUserInfo }}) => {
  if (loading) { return ( <p>Loading ...</p> ); }
  return ( <div> <h4> {getUserInfo.name} </h4> </div> );
};
export default graphql(ProfileInfoQuery, {
  options: props => ({
    variables: {
      handle: props.handle,
    },
  }),
})(ProfileInfo);
Note: mini Twitter App’s GraphQL schema and resolvers are explained in Part 2.
Profile Tweets Component:
Data for this component is also retrieved from getUserInfo defined in AppSync schema. The resolver for this query hits ElasticSearch tweet index and retrieves tweets by handle.

export const ProfileTweetsQuery = gql`
  query ProfileTweetsQuery {
    getUserInfo {
      tweets(limit: 10) {
        items {
          tweet
          tweet_id
        }
        nextToken
      }
    }
  }
`;
Optimistic Response and Offline Support
Now, lets imagine the following scenario:

Scenario: You are coming back home after long day at work. You take the train from Station A to Station B. Now, you are also tweeting your thoughts on your favorite topic of interest but all of a sudden train goes through a tunnel, and now you are having network connectivity issues. How will your App handle this?
In this possible scenario, a user would expect the App to behave normally (oh yeah! users expect a lot 😉and it doesn’t take them a lot of time to click on that delete App button 💁). This is where Optimistic Response and Offline Support come to the rescue when backend is unreachable.

Our next component, TweetForm handles the scenario explained above. In this case, create tweet mutation puts a tweet record in ElasticSearch index.

export const AddTweetMutation = gql`
  mutation AddTweetMutation(
    $tweet: String!
  ) {
    createTweet(
      tweet: $tweet
    ) {
      tweet_id
      tweet
    }
  }
`;
Now, we need to add two more functionalities in our component, also explained in this post.

optimisticResponse defines the new response you would like to have available in the update function.
update takes two arguments, the proxy (which allows you to read from the cache) and the data you would like to use to make the update. We read the current cache (proxy.readQuery), add it our new item to the array of items, and then write back to the cache, which updated our UI.
export default graphql(AddTweetMutation, {
  props: ({ mutate }) => ({
    addTweet: tweet => {
      return mutate({
        variables: {
          tweet,
        },
        optimisticResponse: () => ({
          createTweet: {
            tweet,
            tweet_id: uuid(),
            __typename: 'Tweet',
          },
        }),
        update: (proxy, { data: { createTweet } }) => {
          const data = proxy.readQuery({
            query: ProfileTweetsQuery,
            variables: {
              tweet,
            },
          });
          data.meInfo.tweets.items.push(createTweet);
          proxy.writeQuery({
            query: ProfileTweetsQuery,
            data,
            variables: {
              tweet,
            },
          });
        },
      });
    },
  }),
})(TweetFormComponent);
and.. boom! You can see the magic yourself 👓

Let’s see how all this real-time stuff works:
The best part? All you need to get subscriptions working in the backend is to extend your GraphQL schema with 4 lines of code:
type Subscription {
  addTweet: Tweet
  @aws_subscribe(mutations: [“createTweet”]
}
Scenario: Let’s say we have two users (sidg_sid and nikgraf) following each other. In this case, both the users are subscribed to each other’s tweets. As shown below, when user sidg_sid sends a tweet it is immediately pushed to all his followers including nikgraf and vice-versa.

Real Time Subscriptions
Subscriptions in AWS AppSync are invoked as a response to a mutation. In addition, they are handled automatically by the AWS AppSync client SDK using MQTT over Websockets as the network protocol between the client and service. The following subscription is invoked every time a new tweet is added.

export const AddTweetSubscription = gql`
  subscription AddTweetSubscription {
    addTweet {
      __typename
      tweet_id
      tweet
    }
  }
`;

export default {
  AddTweetSubscription,
};
We now add this subscription to Profile Tweets Component by calling subscribeToMore function with AddTweetSubscription and user handle . The updateQuery adds a new tweet in the list of previous tweets for a given user.

const tweetsQuery = graphql(ProfileTweetsQuery, {
  options: props => ({
    variables: { ...variables, handle: props.handle },
    fetchPolicy: 'cache-and-network',
  }),
  props: props => ({
    ...props,
    subscribeToNewTweets: params =>
      props.data.subscribeToMore({
        document: AddTweetSubscription,
        variables: params,
        updateQuery: (prev, { subscriptionData: { data: { addTweet } } }) => {
          return {
            ...prev,
            getUserInfo: {
              ...prev.getUserInfo,
              tweets: {
                items: [addTweet, ...prev.getUserInfo.tweets.items],
              },
            },
          };
        },
      }),
  }),
});

export default compose(tweetsQuery)(ProfileTweetsComponent);
Search all Tweets Component
Last but not the least, users can also search through corpus of tweets by keyword. The resolver for this query maps to an ElasticSearch query in the backend.

export const SearchTweetsQuery = gql`
  query UserQuery($keyword: String!) {
    searchAllTweetsByKeyword(keyword: $keyword) {
      items {
        tweet
        tweet_id
      }
    }
  }
`;

ElasticSearch Query
At the end, SearchTweetsComponent is:

import React from 'react';
import { graphql } from 'react-apollo';
import { SearchTweetsQuery } from '../queries';
const Search = ({ data: { loading, searchAllTweetsByKeyword }}) => {
  if (loading) { return ( <p>Loading ...</p> ); }
return (
  <Container>
    {searchAllTweetsByKeyword.items.map((item, index) => (
      <Tweet key={index}>{item.tweet}</Tweet>
    ))}
  </Container>
);
};
export default graphql(SearchTweetsQuery, {
  options: props => ({
    variables: {
      handle: props.handle,
    },
  }),
})(Search);
Serverless Client Deployment with Netlify and/or S3
Deploy Netlify: yarn build && netlify deploy build
Deploy S3: yarn build && serverless client deploy
service: serverless-graphql-client

frameworkVersion: ">=1.21.0 <2.0.0"

provider:
  name: aws
  runtime: nodejs6.10
  stage: dev
  region: us-east-1

plugins:
  - serverless-finch

custom:
  client:
    bucketName: <unique bucket name>
    distributionFolder: build
Special Thanks
Nik Graf for working together to implement the client components.
Manuel and Nader for helping and reviewing the code.

Last but not the least, to everyone for encouraging me to write more and appreciating previous blogs.


I would like to end this blog with one of my favourite quotes —

“Imagination is more important than knowledge. For knowledge is limited, whereas imagination embraces the entire world, stimulating progress, giving birth to evolution.” — Albert Einstein

---

https://medium.freecodecamp.org/scheduling-slack-messages-using-aws-lambda-e56a8eb22818

Scheduling Slack messages using AWS Lambda
Migrating to serverless brings a lot of questions. How do you do some of the non-serverless tasks, such as a cronjob in a serverless application?

Let’s say you have a small Slack app that sends the top five stories from Hacker News to your Slack channel. At some point you decided to shut down the server where you run that app, but you still want to receive the stories. Serverless with AWS Lambda seems cool. But how do you trigger the AWS Lambda function at a specific time?


All diagrams are created using SimpleDiagrams 4 app
In case you’re not familiar, serverless is a method of deploying and running applications on cloud infrastructure, on a pay-per-use basis and without renting or buying servers. To learn more about serverless and how it works with AWS, see this guide.

You can trigger AWS Lambda functions with a variety of AWS services, such as API Gateway for APIs and S3 for files. For the full list of services, see the docs here. One of the available triggers is AWS CloudWatch Events.

Wait, isn’t CloudWatch for logs?

Well, it is. But it seems someone at AWS is a big fan of Dr. Jekyll and Mr. Hyde and in some cases a few different services are hidden behind the same name (hello Cognito).

Beside serving logs, Amazon CloudWatch has events that deliver a near real-time stream of system events that describe changes in AWS resources. Events can also schedule automated actions using cron or rate expressions. Bingo!

Application flow
How would the app work with CloudWatch Events?

You need to configure a CloudWatch scheduled event using cron syntax or rate expression (ie. 5 minutes). The CloudWatch event then triggers an AWS Lambda function at configured intervals. In your AWS Lambda function, you get the top five articles from the Hacker News API and post them to Slack using Incoming Webhooks.

You can see the flow in the figure below.


The flow of the serverless scheduled Slack messages
This sounds simple, right? Let’s see how it works in practice.

Sending scheduled messages
Before we begin, to be able to follow along with this tutorial, you need to have an AWS account, and AWS CLI and Node.js (v6+) need to be installed. You can get AWS CLI here.

You’ll also need to configure a Slack Incoming Webhook. To do so, follow this tutorial. At the end of the tutorial, you’ll get the webhook URL. Save that URL, because you’ll need it in a short while. Go, do it, I’ll wait here ⏳

Ok, times up! Let’s start with the fun part.

To start, create a new folder and start a new Node.js project in it (you can use npm init -y command).

As, you’ll need to send a few HTTP requests, install the minimal request promise module from NPM as a dependency. To do so, run the following command:

npm install minimal-request-promise --save
Minimal request promise is a small Node.js module that simply wraps native HTTP and HTTPS modules into JavaScript Promises.

Now that the dependency is ready, let’s take a look at the next figure with the project structure that you we will use.


Folder structure of your project
Even through the code is simple, we’ll split it into few small files to simplify the testing (see the intro to hexagonal architecture for more info). As you can see in the figure above, your code contains following files:

index.js - the initial file for your Lambda function that invokes the other two files and responds back to CloudWatch Events.
src/get-top-hackernews-stories.js - a file that gets five top stories with details from Hacker News.
src/send-slack-message.js - a file that formats and sends a Slack message.
Let’s start with the initial file. This file just requires the other two files and invokes the getTopHackerNewsStories and then the sendSlackMessage function. When both functions are ready, or if an error occurs, it responds back to the trigger (CloudWatch Event).

Your index.js file should look like the following code listing.

For readability, it doesn't contain event validation, which should be present in production code.

'use strict'
const getTopHackerNewsStories = require('./src/get-top-hackernews-stories')
const sendSlackMessage = require('./src/send-slack-message')
function scheduledSlackMessage(event, context, callback) {
  getTopHackerNewsStories()
    .then(stories => sendSlackMessage(stories))
    .then(() => callback(null))
    .catch(callback)
}
exports.handler = scheduledSlackMessage
The first of the two functions, getTopHackerNewsStories, makes an HTTP request to Hacker News API (no authentication required). As the API returns a list of story IDs, you need to get the first five IDs and send an HTTP request for each ID, to get the story’s details. Finally, you need to parse the response body (because the minimal request promise is not doing that under the hood) and return the results.

Your get-top-hackernews-stories.js file should look like the next code listing.

'use strict'
const rp = require('minimal-request-promise')
function getTopNews() {
  return rp.get('https://hacker-news.firebaseio.com/v0/topstories.json', {
    'Content-Type': 'application/json'
  })
    .then(response => {
      const storyIds = JSON.parse(response.body)
      return Promise.all(
        storyIds.slice(0, 5)
          .map(id => {
            return rp.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`, {
              'Content-Type': 'application/json'
            })
              .then(response => JSON.parse(response.body))
          })
      )
    })
}
module.exports = getTopNews
When you get the stories, the sendSlackMessage function formats the message and sends another HTTP request to the Slack Incoming Webhook URL, as shown in the following code listing.

Instead of hardcoding the Incoming Webhook URL, we will pass it as an AWS Lambda environment variable. To learn more about environment variables and other ways of sharing secrets in serverless apps, see this guide.

'use strict'
const rp = require('minimal-request-promise')
function sendSlackMessage(news, url = process.env.SlackWebhookUrl) {
  const body = JSON.stringify({
    text: 'Following posts are trending on Hacker News:',
    attachments: news.map(item => ({
      'author_name': `${item.score} points by ${item.by}`,
      title: item.title,
      'title_link': item.url
    }))
  })
  return rp.post(url, {
    headers: {
      'Content-Type': 'application/json'
    },
    body: body
  })
}
module.exports = sendSlackMessage
Now that the code is ready, let’s deploy the app and schedule messages.

Deploying, configuring, and testing the app
We’ll use Claudia.js to deploy our function to AWS Lambda. Before we continue, make sure you follow this tutorial to install Claudia and configure AWS access credentials.

Also, you’d need to create the env.json file in your project folder, to define the Slack Webhook URL. This file should have similar content to the next code listing. Make sure you replace the generic URL with the one you received when you configured the Slack application.

{
  "SlackWebhookUrl": "https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX"
}
Now that everything is ready, run the following command in your terminal to deploy your app:

claudia create --region eu-central-1 --handler index.handler --timeout 10 --set-env-from-json env.json
In this command, you do the following things:

Define the region where your Lambda function will be deployed. For the full list of supported regions, see the docs.
Define the handler file, which is a relative path to your entry point file, but with a .handler instead of .js extension.
Set the timeout, because default AWS Lambda is 3 seconds, but you need to do a few HTTP requests. To make it safe, increase the timeout to at least 10 seconds.
Set the environment variables from the JSON file you prepared.
After a few seconds, you’ll receive a JSON response like in the example below. You’ll also see claudia.json file in your project folder.

{
  "lambda": {
    "role": "scheduled-slack-messages-executor",
    "name": "scheduled-slack-messages",
    "region": "eu-central-1"
  }
}
This means that your AWS Lambda function is ready.

The next step is to create a CloudWatch Event. Let’s say you want to receive a message every day at 10 AM CET, because your cron is running in the GMT time zone. Your cron command should look like this: cron(0 9 * * ? *).

To setup an event every day at 10 AM, run the following command from your terminal:

aws events put-rule --name hackerNewsDigest --schedule-expression 'cron(0 9 * * ? *)'
This command will output the rule ARN, which you’ll need to save because you’ll need it in a second.

Amazon Resource Names (ARNs) are unique identifiers of AWS resources. Read more about ARNs in the docs here.

Now that your CloudWatch Event is ready, you need to permit it to trigger a Lambda function. To do so, run the following command from your terminal:

aws lambda add-permission \
  --statement-id 'hackernews-scheduled-messages' \
  --action 'lambda:InvokeFunction' \
  --principal 'events.amazonaws.com' \
  --source-arn ruleArn \
  --function-name functionName \
  --region region
In this command:

ruleArn is the ARN of the CloudWatch Event rule you recieved after running the previous command.
functionName is the name of your function from your claudia.json file.
region is the region from your claudia.json file.
Your command will return a JSON response. Find the Resource in the response and copy the Lambda ARN. It should look like the following:

arn:aws:lambda:eu-central-1:123456789012:function:scheduled-slack-messages
Finally, you’ll need to set the trigger by running the following command from your terminal:

aws events put-targets --rule hackerNewsDigest --targets '[{ "Id": "1", "Arn": "your Lambda ARN" }]'
And that’s it, your scheduled Slack event is ready. Next day at 10 AM CET you should receive a message that looks like the following figure.

In case you can’t wait for 10 AM and you want to see the result earlier, run the claudia test-lambda command from your terminal. Make sure you navigate to your project folder first.


Message received in Slack
More similar articles are on their way. If you want to stay up-to-date with my new articles, or you have a topic you would love to read about, follow and contact me on twitter - twitter.com/slobodan_.

As always, many thanks to my friend Aleksandar Simović for help and feeback on the article.

All illustrations are created using SimpleDiagrams4 app.
If you want to learn more about serverless apps in general, check out “Serverless Apps with Node and Claudia.js”, the book I wrote with Aleksandar Simovic for Manning Publications.

Serverless Apps with Node and Claudia.js

First the buzzwords: Serverless computing. AWS Lambda. API Gateway. Node.js. Microservices. Cloud-hosted functions…
www.manning.com
The book will teach you how to build and debug a real world serverless APIs (with DB, authentication and tests) using Node and Claudia.js. It also covers the migration of your existing app that is running on servers to a serverless app, how to build chatbots for Facebook Messenger and SMS (using Twilio), and Alexa skills.
