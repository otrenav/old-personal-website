+++
draft = true
+++

- TODO: Get images

https://www.infoq.com/articles/serverless-sea-change?utm_source=infoqemail&utm_medium=architecture-design&utm_campaign=newsletter&utm_content=11272018

The Serverless Sea Change
Like  | Posted by Joe Emison
, reviewed by Thomas Betts
on Nov 23, 2018. Estimated reading time: 18 minutes | Discuss ShareShare |  Read laterReading List
Key Takeaways
A Serverless application is one that requires no server operations, and for which uptime (outside of bugs in bespoke code) has been entirely delegated to a service provider.A Serviceful Serverless application is one that leverages third-party services for as much back-end functionality as possible.The primary benefit of Serviceful Serverless applications is that they require orders of magnitude less back-end code than applications built other ways.Less code means less technical debt, better and more consistent ongoing software development velocity, and more likely successful maintenance by average developers.Just as the rise of Infrastructure-as-a-Service gave rise to a new optimal way of developing software (“cloud native”), so too does Serverless; you cannot lift and shift your cloud-native applications to Functions-as-a-Service (FaaS) platforms and expect them to be optimally designed.

Most of the writing on serverless applications either lacks enough detail to understand exactly why serverless has any real advantages over other methods of building software, or is far too in-the-weeds to understand how the particular discussion would be better than an alternate implementation that was not serverless. This article defines and explains how serverless is different from other application architectures and then walks through a "proof" of sorts to show that serverless application architectures, when done properly, are superior to non-serverless architectures. Finally, it concludes with a number of rules of thumb to help architects and developers realize the benefits of serverless. This article is an expansion of the concepts and examples presented by the author at QCon NY 2018 and Serverlessconf SF 2018.

What Are We Optimizing for?
Think about the Average Developer
If software is eating the world, then the success of organizations is increasingly driven by their ability to build and deploy software. And because most modern software is usually provided as Software-as-a-Service (SaaS), software development is perpetual: organizations need to increase software development resources over time (as opposed to building construction, which has a substantial capital investment up front and much smaller ongoing maintenance costs). So the organizations that can drive good software development velocity over the long haul should outperform those that cannot.

Accordingly, if we want to build the optimal software development organization for organizational success, we should make choices that make it easier for average software developers to maintain the development of the software. The primary cause of organizational pain around not being able to maintain reasonable development velocity is generally described as “technical debt”, but its cause is usually related to short-term thinking (writing the code without thought of maintainability) or assumptions about the abilities of future developers (assuming that the team writing the code will be the team continuing to develop it forever).

Less Code, Less Complexity
Related Vendor Content

When, Where & Why to Use NoSQL?Obtain a holistic view of your application behaviour and troubleshoot errors with Site24x7Gartner: A Look at Emerging Types of Machine Learning for Fraud DetectionThe Complete Developer’s Guide to Azure - Download the eBook
[Free O'Reilly eBook] - Kubernetes Cookbook
Related Sponsor


NGINX Plus is the complete application delivery platform for the modern web. Start your 30 day free trial.

If we want to optimize for ease of long-term development of a piece of software, there are two basic strategies that we should follow: less bespoke code and less complexity. In general, having less code that you have to maintain will be easier to maintain than having more code. Note that the strategy here refers to bespoke code; using well-documented and well-maintained libraries or services doesn’t add to your pain in the way that having to write and maintain that code yourself does.

The other high-level strategy to make software easier to maintain is to reduce the complexity within the codebase. Perhaps the best way to think about complexity is the concept of cyclomatic complexity, applied to the entire deployment (as opposed to just bespoke code). Consider all of the different pieces of software, systems administration, database administration, network administration, and IT operations that are necessary to get a particular route up and running for an end user. Reducing the number of pieces required for the routes should increase maintainability.

Serverless
Today, in greenfield software development, the best way to optimize for long-term software maintainability through less code and less complexity is with serverless software architectures.

Definition
There is a lot of noise around the definition of serverless (“but there are still servers!”; “it’s just a bad name”), but I think that the name is appropriate and meaningful when you understand that it means:

no server operations
not our uptime
Serverless is the final step along a path we have been taking for the past 25 years in SaaS, as we have slowly handed off more and more responsibilities to service providers. We have moved from our own data centers to colocation facilities to dedicated hosting to infrastructure-as-a-service VMs to containers, but each of these has required that we do some amount of individualized systems work. In the beginning we had the whole host of issues, from capacity management (and capex spend) on down; but even with containers, some still remain, like patching and handling failure of third-party applications (e.g., web servers).

Serverless takes the number of individualized server operations down to zero, because everything is multi-tenant, and run by the service provider (note: running functions on your own Kubernetes cluster is not “serverless” by my definition). In serverless, you do not handle any hardware setup, capex, operating-system installation & patching, application installation & patching, or third-party application failures.

The corollary to “no server operations” is “not our uptime”. Whether or not you are up—beyond errors in your own code—is up to the service provider. For many people, this is terrifying (perhaps because they don’t trust the provider; perhaps because they fear their job is no longer necessary), but if your goal is less code and less complexity, as long as the service provider is reliable, this is the best way to achieve your goal.

The Benefits of Proper Serverless
Not all serverless architectures are equal, and it is possible to build serverless applications that are much harder to maintain than even a typical three-tier monolithic application. However, if done correctly—more on this later—serverless applications give substantial benefits over other application architectures which cannot run serverlessly: fewer interdependencies; fewer liabilities; an opinionated and effective microservices architecture; and isolated production-equivalent environments for all.

Fewer interdependencies exist with proper serverless architectures, because overall application complexity is lower. Serverless applications consist of application front-end code, back-end functions, third-party services (e.g., Twilio, Algolia), and configuration of those functions and services. Serverless applications do not deal with operating systems, third-party server applications like a web server, or any deployment code that is specific to a single VM or container. Because of this, fewer developers working on a serverless application are blocked waiting on another team or another team member than on VM-or container-based applications.

Source code is a liability. Serverless applications can have the least amount of code of any application architecture. We will walk through an example in the next section demonstrating how much code can be eliminated by leveraging the most effective services.

Even though Martin Fowler wisely advises starting with monolithic architectures before attempting to break an application into microservices, as we move to thick clients with functions in an automatically scalable back end, we are getting a solid microservices architecture for free. If our application needs to scale to greater and greater user counts, we will have much less pain around scaling the application, as we already have separated front end from functions, and functions from each other (if you’ve listened to the advice in this article!)

Finally, because serverless applications are billed per use with no idle cost, it is cheaper to provide every developer with a separate and identical-to-production environment than it is to provide a single development environment for all developers in a VM- or container-based architecture. This gives significant benefits to developer velocity (no developer can block another by screwing up a shared environment), the application deployment code (if you can deploy for all developers, it’s automated!), and limits bugs based upon environmental differences.

Proof: An Example
Let’s walk through a specific application example, suggested by “keepingscore” on Hacker News as an application that cannot and should not be built serverlessly:

“[The author of this article] is operating in the mindset that the backend is just a dumb persistence layer with auth. If all the problems [he is] solving fit into that world view than [sic] more power to him. I’m a backend team lead for a travel company. To render that list of flights and hotels to the Android app it’s not a database lookup. It’s hundreds of soap and rest calls stitching together airlines and hotel data from multiple platforms. This isn’t something I can do on the front end. And even if I could I wouldn’t want to replicate this logic between iOS, Android, web and our internal support portals.”

The Application
Using the above description, let’s consider an application that consists of a web site and two mobile app front ends (Android and iOS) that interact with a back end that provides user management; the ability to search, buy, and share itineraries for flights and hotels; and a reporting layer necessary for internal accounting.

More specifically, we might consider the following high-level set of features:

User management
Sign up, in, out, forgot password
Save user preferences
UI: Search and Purchase
Auto-fill criteria (e.g., airport codes)
Submit search criteria
Pay
UI: Share and Modify:
View, Share itineraries with other users
Change (incl. cancel) itineraries
Back end: search and purchase
Hit multiple APIs in parallel
Coalesce responses, apply filters
Purchase itinerary
Back end: Reporting
Run analytical reports on purchases, itineraries
We will now walk through different architecture options to show that a proper serverless architecture provides the above-mentioned benefits in ways that other architectures do not. Note that we do not need to talk about the clients, because we can assume all client-side code will be the same across these different architectures; the only thing that will be different is how the back end is implemented (also note that end users don’t care how the back end is implemented as long as it works).

Architecture 1: Typical Three-Tier


In a typical modern three-tier architecture, a relational database with a cache layer is used through an application server. From a server ops standpoint, some of the tasks that are required—even if using containers—are: provisioning and patching web servers and database software; bootstrapping images; baking images; and container/VM failover. And if using VMs or your own machines, the list is even longer.

Additionally, all code needed to drive the front end is typically bespoke. I have come up with lines-of-code estimates by looking at a variety of sample applications, and estimate the back end to be the following for this architecture:

Search APIs & Coalesce

10,000

Show My Trips & Share

7,500

Application Scaffolding

5,000

User Management

5,000

Reporting

5,000

Purchase

2,500

Typeahead for UI

1,500

Total

36,500

Architecture 2: Functions-as-a-Service (FaaS) Only


(note that the icons here are from AWS, but this could be deployed on many different IaaS providers)

Initially, when AWS Lambda was announced in 2014, serverless application architectures looked a lot like the above, essentially decomposing the monolithic application in our Architecture 1 into a series of functions (microservices) that would call each other and interact with the persistence layer in response to client requests. However, I do not view this architecture as a significant improvement on the three-tier one; although it has some benefits, it’s also a potential minefield of new complexity.

From the benefit side, this architecture has eliminated the server operations needed for the three-tier architecture. It is a true serverless architecture.

However, having all these new functions/microservices deployed and calling each other can be highly problematic. Functions-as-a-Service (FaaS) aren’t direct analogues to functions within an application. They have much higher overhead to calling, and infinite loops are going to cost serious money (as each invocation is charged). Debugging a nest of FaaS is also much harder than stepping through an application in a debugger. Finally, you’re not really eliminating many lines of code in this example, so the core requirements to drive application maintainability just aren’t here:

Search APIs & Coalesce

10,000

Show My Trips & Share

7,500

Application Scaffolding

5,000

User Management

5,000

Reporting

5,000

Purchase

2,500

Typeahead for UI

1,500

Total

31,500

Architecture 3: Serviceful Serverless


(note that the icons here are from AWS, but there are non-AWS options for this)

Here is a much better serverless architecture, which I will call a Serviceful Serverless application. In this architecture, all aspects of the application that do not need to be unique or differentiated from standard functionality (e.g., user management and authentication) are handled by a managed service (e.g., AWS Cognito, Auth0, Google Firebase Auth).

Search APIs & Coalesce

10,000

Show My Trips & Share

7,500

Application Scaffolding

5,000

User Management

5,000

Reporting

5,000

Purchase

1,000

Typeahead for UI

1,500

Total (orig: 36,500)

11,000

Wait--How Is That Possible?
One immediate reaction that some practitioners have to the above table is disbelief and skepticism--disbelief that any such reductions in code count are possible, and skepticism that, if it is possible, that the architecture is flexible and extensible enough for continued development as new feature requests come up. There is only so much that I can do in this article to convince you that these architectures do deliver extensible, extremely low-line-of-code-count applications; the best way for you to understand is to try them.

That said, it is worth pointing out a few things to help one understand at a high level how the line count and extensibility is achieved. First, it’s worth looking at sample Serviceful Serverless projects to see how they work. AWS has built a group calendar application that is (as of November 2018) 702 lines of Javascript for a web (React) version, and 508 lines of Java for a native Android version. If you’re looking for a good quickstart to play with, AWS Amplify and Google Firebase offer options that will have you up and running in less than an hour.

Second, one of the key innovations in Serviceful Serverless applications is that a fair amount of things that had previously been in code can be done in service configuration, which--depending on the service--is sometimes in a Turing-incomplete language. Turing-incomplete languages are excellent for configuration, and also end up being many fewer lines of code because of how specific they are to the service they are configuring.

Finally, unlike committing to a low-code platform, you always have the option to do things as you would have before, and just write your own code instead of leveraging the existing services, where it is necessary. In other words, the worst-case scenario in Serviceful Serverless architectures is that, for parts of the application, you are doing things as you did before. But for other parts of the application--ones that can leverage what 90% of applications need--you get to drive the vast majority of the work to a service that you don’t build or maintain.

More Details on Serviceful Serverless
A key part of Serviceful Serverless is that instead of having a really light/small “gateway” to your backend functions, there is a managed service handling the API calls from the client and routing them to various services and functions as needed. Perhaps the best example of this type of service today is AWS AppSync, although Google Firebase and Hasura provide API hub services as well (note that these services are more highly differentiated than FaaS services today, so read and test before you pick!).

One huge benefit to these API hub services is that you can route most requests directly to and from your persistence layer through them without needing bespoke code. That’s right—in the above FaaS-centric architecture, and in the three-tier application, every read from and write to the database goes through application code that you must write and maintain. In the above serverless architecture, the API hub can handle many of those requests—including with fine-grained access control (see, e.g., https://docs.aws.amazon.com/appsync/latest/devguide/security.html#amazon-cognito-user-pools-authorization and https://firebase.google.com/docs/database/security/user-security).

The impact of switching to managed services for all back-end functionality that can use them, and leveraging an API hub to handle simple reads and writes from/to data stores, is that the number of lines of bespoke code goes down dramatically, and delivers on application maintainability in a way that no other architecture can.

The Counter-Arguments
As with every set of alternatives, you are often trading one risk for another. Moving from a typical three-tier application architecture—or a multitude of two-tier microservices—to a Serviceful Serverless architecture helps make applications more maintainable, but with some new risks. I believe that in the vast majority of cases, these risks are a more-than-acceptable tradeoff, but I don’t want to ignore them.

Not Our Uptime
In my definition of serverless, I specifically call out uptime as something that we will not have control of within serverless applications. The data shows that the major IaaS providers are far better at staying up than the average (or even way-above-average) IT operations team is, and so I have no problem with paying them much less money than I would pay an internal operations team to keep my serverless application up (including handling automated failover for me).

That said, if you build an application that is reliant upon a number of different service providers to all be up as close to 100% of the time as possible, as you increase that number of service providers, you will increase the likelihood that your application will be down at any one time. In general, it is better for your uptime to have fewer providers. Additionally, it is wise to build some resilience into your application that can handle non-essential service availability (e.g., default to communicating with them asynchronously).

Vendor Lock-in
You can’t talk about differentiated services without someone knee-jerking about vendor lock-in. And certainly there are brutal cases of IT vendors using the reliance that organizations have on them to extract more and more of the value of their products to extremely painful levels. But if you’re going to fret about vendor lock-in, you should at least have to convince yourself that it will be unnecessarily hard to migrate off the particular vendor.

In the case of the Serviceful Serverless application architecture above, you can migrate off by writing the bespoke code you avoided writing by using the architecture. In other words, the cost of migration is just moving from the 11,000 lines of code to the 36,500 lines of code. And if you deem writing 25,000 lines of code as fairly expensive (and it is! Remember, you have to maintain all that new code!), then perhaps the amount you’re paying the vendor is reasonable. But if you think it’s cheaper to write the code, then you can write the code. Also, it won’t be that hard to write the code because the APIs are so well documented and you already have code that works with them (and hopefully tests around that code).

In other words, by using a Serviceful Serverless architecture, you are avoiding writing code by leveraging another team that is writing that code for you, and that you are only paying for by use. If, at some point, you feel that the price you are paying per use it too high, you can take that functionality in-house, and write it yourself. This is not like database- or virtualization-layer lock-in, where data is being constantly written and persisted; this is stateless application code that is much easier to swap out.

Rules of Thumb
One of the most difficult things in adopting new architectural concepts is understanding whether you’re doing things correctly. So I have three “rules of thumb” for you to think through whether an application is properly driving the benefits of Serviceful Serverless.

Thick Clients, Not Thick Middle Tiers
While you will want to have common logic in your back end (like the hotel/flight search in the above example), you are purposefully offloading a lot of what would have been in the middle tier of an application written ten years ago to services (e.g., Cloudinary for image-handling or Algolia for search) or thick clients (e.g.,  Javascript frameworks). The vast majority of bespoke code should be in the customer interaction layer. This does not mean that you won’t have back-end code (like the API integration mentioned in the example above), but rather that there is usually substantial value in being able to control the details of all end-user interactions, but generally little-to-no value in writing back-end functionality that can be purchased elsewhere.

Functions Are Glue, Not Calling Each Other
Functions calling functions within a serverless architecture is a bad decision, as described above. From the difficulty of debugging to the overhead of invocation to the insane cost of infinite loops, you will be profoundly better off if you eliminate this cause of cyclomatic complexity. Instead, your bespoke code functions should be glue between services, like taking a client request, pulling data from various APIs, coalescing it into a compact data structure, and sending it both to a data store and the client.

Custom Research, Not Custom Code
If you are building a Serviceful Serverless application, you will need to spend significantly more time on research than you would with an application where you will write everything. This is because you will be implementing much more functionality of the application on services, and you need to verify that you are selecting the correct service. You also need to figure out the right way to integrate the service with your application. So instead of spending an hour or two looking for packages you might leverage, you should think about spending days and even weeks writing proof-of-concept code and testing different options.

Another way to say this is in two equations:

2 Weeks Research + 1 Day Development → N Lines of Code to Maintain

1 Day Research + 2 Weeks Development → 10 ⋅ N Lines of Code to Maintain

On average, ten times more lines of code is ten times more technical debt, which means increasingly slower and less predictable future development velocity, and systems that cannot be well maintained by the average developer.
