+++
title = "Placeholder"
date = "1990-03-29"
draft = true
tags = [
    ""
]
+++

> "Architecture is the fundamental organization of a system embodied in its
> components, their relationships to each other, and to the environment, and the
> principles guiding its design and evolution."

A good architecture tries its best to balance out these requirements by making
trade-offs, and delivering a system with good quality attributes while keeping
the people and resource costs under limits.

An architecture also provides a common language among the stakeholders, which
allows them to communicate efficiently via expressing these constraints, and
helping the architect zero-in towards an architecture that best captures these
requirements and their trade-offs.

## An architecture is influenced by its environment

Quality attribute requirements: In modern day web applications, it is very
common to specify the scalability and availability requirements of the
application as an early technical constraint, and capture it in the
architecture. This is an example of a technical context from a business
perspective.

Standards conformance: In some organizations where there is often a large set of
governing standards for software, especially those in the banking, insurance,
and health-care domains, these get added to the early constraints of the
architecture. This is an example of an external technical context.

Organizational constraints: It is common to see that organizations which either
have an experience with a certain architectural style or a set of teams
operating with certain programming environments which impose such a style (J2EE
is a good example), prefer to adopt similar architectures for future projects as
a way to reduce costs and ensure productivity due to current investments in such
architectures and related skills. This is an example of an internal business
context.

Professional context: An architect's set of choices for a system's architecture,
aside from these outside contexts, is mostly shaped from his set of unique
experiences. It is common for an architect to continue using a set of
architectural choices that he has had the most success with in his past for new
projects.

In modern day architectures, the job of the architect comes down to mixing and
matching existing sets of such readily available patterns to solve the problem
at hand.

## Why architecture?

### Aspect

Architecture selects quality attributes to be optimized for a system.

### Insight/Impact

Aspects such as scalability, availability, modifiability, security, and so on of
a system depend on early decisions and trade-offs while selecting an
architecture. You often trade one attribute in favor of another.

### Examples

A system that is optimized for scalability must be developed using a
decentralized architecture where elements are not tightly coupled. For example:
microservices, brokers.

### Aspect

Architecture facilitates early prototyping.

### Insight/Impact

Defining an architecture allows the development organization to try and build
early prototypes, which gives valuable insights into how the system would behave
without having to build the complete system top down.

### Examples

Many organizations build out quick prototypes of services—typically, by building
only the external APIs of these services and mocking the rest of the behavior.
This allows for early integration tests and figuring out interaction issues in
the architecture early on.

### Aspect

Architecture allows a system to be built component-wise.

### Inisght/Impact

Having a well-defined architecture allows to reuse and assemble the existing,
readily available components to achieve the functionality without having to
implement everything from scratch.

### Examples

Libraries or frameworks which provide ready-to-use building blocks for services.

For example: web application frameworks such as Django/RoR, and task
distribution frameworks such as Celery.

### Aspect

Architecture helps to manage changes to the system.

### Insight/Impact

An architecture allows the architect to scope out changes to the system in terms
of components that are affected and those which are not. This helps to keep
system changes to a minimum when implementing new features, performance fixes,
and so on.

### Examples

A performance fix for database reads to a system would need changes only to the
DB and Data Access Layer (DAL) if the architecture is implemented correctly. It
need not touch the application code at all. For example, this is how most modern
web frameworks are built.

## Why not build a system without a formal software architecture?

If you've been following the arguments so far thoroughly, it is not very
difficult to see the answer for it. It can, however, be summarized in the
following few statements:

- Every system has an architecture, whether it is documented or not
- Documenting an architecture makes it formal, allowing it to be shared among
  stakeholders, making change management and iterative development possible
- All the other benefits and characteristics of Software Architecture are ready
  to be taken advantage of when you have a formal architecture defined and
  documented.
- You may be still able to work and build a functional system without a formal
  architecture, but it would not produce a system which is extensible and
  modifiable, and would most likely produce a system with a set of quality
  attributes quite far away from the original requirements.

##

Many studies show that about 80% of the cost of a typical software system occurs
after the initial development and deployment. This shows how important
modifiability is to a system's initial architecture.

Modifiability can be defined as the ease with which changes can be made to a
system, and the flexibility at which the system adjusts to the changes. It is an
important quality attribute, as almost every software system changes over its
lifetime—to fix issues, for adding new features, for performance improvements,
and so on.

From an architect's perspective, the interest in modifiability is about the
following:

- Difficulty: The ease with which changes can be made to a system
- Cost: In terms of time and resources required to make the changes
- Risks: Any risk associated with making changes to the system

Now, what kind of changes are we talking about here? Is it changes to code,
changes to deployment, or changes to the entire architecture?

The answer is: it can be at any level.

##

> "Performance of a computer system is the amount of work accomplished by a
> system using a given unit of computing resource. Higher the work/unit ratio,
> higher the performance."

The unit of computing resource to measure performance can be one of the
following:

- Response time: How much time a function or any unit of execution takes to
  execute in terms of real time (user time) and clock time (CPU time).
- Latency: How much time it takes for a system to get its stimulation, and then
  provide a response. An example is the time it takes for the request-response
  loop of a web application to complete, measured from the end-user perspective.
- Throughput: The rate at which a system processes its information. A system
  which has higher performance would usually have a higher throughput, and
  correspondingly higher scalability. An example is the throughput of an
  e-commerce website measured as the number of transactions completed per
  minute.

Performance is closely tied to scalability, especially, vertical scalability.

## Availability

Availability refers to the property of readiness of a software system to carry
out its operations when the need arises.

Availability of a system is closely related to its reliability. The more
reliable a system is, the more available it is.

Another factor which modifies availability is the ability of a system to recover
from faults. A system may be very reliable, but if the system is unable to
recover either from complete or partial failures of its subsystems, then it may
not be able to guarantee availability. This aspect is called recovery.

The availability of a system can be defined as follows:

"Availability of a system is the degree to which the system is in a fully
operable state to carry out its functionality when it is called or invoked at
random."

Mathematically, this can be expressed as follows:

- Availability = MTBF/(MTBF + MTTR)

Take a look at the following terms used in the preceding formula:

- MTBF: Mean time between failures
- MTTR: Mean time to repair

This is often called the mission capable rate of a system.

Techniques for Availability are closely tied to recovery techniques. This is due
to the fact that a system can never be 100% available. Instead, one needs to
plan for faults and strategies to recover from faults, which directly determines
the availability. These techniques can be classified as follows:

- Fault detection: The ability to detect faults and take action helps to avert
  situations where a system or parts of a system become unavailable completely.
  Fault detection typically involves steps such as monitoring, heartbeat, and
  ping/echo messages, which are sent to the nodes in a system, and the response
  measured to calculate if the nodes are alive, dead, or are in the process of
  failing.
- Fault recovery: Once a fault is detected, the next step is to prepare the
  system to recover from the fault and bring it to a state where the system can
  be considered available. Typical tactics used here include Hot/Warm Spares
  (Active/Passive redundancy), Rollback, Graceful Degradation, and Retry.
- Fault prevention: This approach uses active methods to anticipate and prevent
  faults from occurring so that the system does not have a chance to go to
  recovery.

Availability of a system is closely tied to the consistency of its data via the
CAP theorem which places a theoretical limit on the trade-offs a system can make
with respect to consistency versus availability in the event of a network
partition. The CAP theorem states that a system can choose between being
consistent or being available—typically leading to two broad types of systems,
namely, CP (consistent and tolerant to network failures) and AP (available and
tolerant to network failures).

Availability is also tied to the system's scalability tactics, performance
metrics, and its security. For example, a system that is highly horizontally
scalable would have a very high availability, since it allows the load balancer
to determine inactive nodes and take them out of the configuration pretty
quickly.

A system which instead tries to scale up may have to monitor its performance
metrics carefully. The system may have availability issues even when the node on
which the system is fully available if the software processes are squeezed for
system resources such as CPU time or memory. This is where performance
measurements become critical, and the system's load factor needs to be monitored
and optimized.

With the increasing popularity of web applications and distributed computing,
security is also an aspect that affects availability. It is possible for a
malicious hacker to launch remote denial of service attacks on your servers, and
if the system is not made foolproof against such attacks, it can lead to a
condition where the system becomes unavailable or only partially available.

http://blogs.tedneward.com/post/more-thoughts-on-architects-and-architecture/

More Thoughts on Architects and Architecture
Posted on Jul 29, 2008
Speaking of things crossing my Inbox, Shane Paterson sent me this email:

Hi Ted,

How’s things in the USA?

I just wrote the following little blog entry I wanted to share with you, which I thought you may find interesting.

I used to work with a Naval Architect a few years back. On day we were discussing where the name "Naval Architect" came from. He explained that "Naval Architecture" is really "Naval Engineering" or "Ship Engineering". The word Engineering came into use AFTER the industrial revolution, however ship design existed hundreds of years before. At that time, people needed a name for ship designers, so they reasoned that Architects designed buildings, therefore ship designers must be a kind of Architect too - hence the name "Naval Architect".

Clearly IT didn't exist before the industrial revolution, and IT Architects don't design buildings, so the question begs to be asked "How did we end up with the word Architecture being used for a role in IT". It seems to me to be a rather vague and grandiose name for a role which is probably better described by the use of the word "Engineer".

Perhaps instead of the names "Solution Architect" and "Enterprise Architect" we should actually be using the names "IT Solution Engineer", "IT Enterprise Engineer"?

I've heard this idea put forward before, and I have to say, I'm not overly fond of it, because I believe that what we do as architects is fundamentally different from what a civil engineer does when he engages in the architect's role.

When a civil architect--be it Frank Lloyd Wright or the folks who designed the I-35 bridge in Minnesota--sits down to draw up the plans for a given project, they do so under a fairly strict set of laws and codes governing the process. Not only must the civic restrictions about safety and appearance be honored and respected, but also the basic physical laws of the universe--weight loads, stress, wind shear and harmonics (which the engineers of the first infamous Tacoma Narrows bridge discovered, to everlasting infamy). Ignoring these has disastrous consequences, and a discipline of mathematical calculation joins in with legal regulation to ensure that those laws are obeyed. Only then can the architect engage in the artistry that Lloyd Wright made so much a part of his craft.

Software architecture, though, is a different matter. Not only do we mostly enjoy complete freedom from legal regulation (Sarbannes-Oxley compliance being perhaps the most notable exception, and even then it routinely fails to apply at the small- to medium-sized project levels), we can also ignore most of the laws of physics (the speed of digital signal across a cable or through the air being perhaps our most notable barrier at the moment). "Access data in Tokyo from a web server in Beijing and send the rendered results to a browser in San Francisco? Sure, yeah, no problem, so long as there's a TCP/IP connection, I don't see why not...." There's just so much less by way of physical restrictions in software than there is in civil (or any other kind) of engineering, it seems.

And that sort of hits the central point squarely on the head--there's a lot we don't know about building software yet. We keep concocting these tortured metaphors and imperfect analogies to other practices, industries and disciplines in an attempt to figure out how best to build software, and they keep leading us astray in various ways. When's the last time you heard an accountant say, "Well, what I do is kinda like what the clerk in a retail store does--handle money--so therefore I should take ideas on how to do my job better from retail store clerks"? Sure, maybe the basic premise is true at some levels, but clearly the difference is in the details. And analogies and metaphors have this dangerous habit--they cause us to lose sight of those limitations, in the pursuit of keeping the analogy pure. Remember when everybody was getting purist about objects, such that an automobile repair shop's accounting system had to model "Car" as an object having an "Engine" object and four "Tire" objects and so on, not because these were things that needed to be repaired and tracked somehow, but because cars in real life have an engine and four tires and other things? (Stroustrup even touches on this at one point, talking about an avionics system which ran into design difficulties trying to decide if "Cloud" objects were owned by the "Sky" object, or something along those lines.) All analogies break down somewhere.

Now, to go back to architects and architecture. At the risk of offering up yet another of those tortured metaphors, let me proffer my own architect analogy: an architect is not like a construction architect, but more like the conductor of a band or symphony. Yes, the band could play without him, but at the end of the day, the band plays better with one guy coordinating the whole thing. The larger the band, the more necessary a conductor becomes. Sometimes the conductor is the same thing as the composer (and perhaps that's the most accurate analogous way to view this), in which case it's his "vision" of how the music in his head should come out in real life, and his job is to lead the performers into contributing towards that vision. Each performer has their own skills, freedom to interpret, and so on, but within the larger vision of the work.

Is it a perfect analogy? Heavens, no. It falls apart, just as every other analogy does, if you stress it too hard. But it captures the essence of art and rigor that I think seeing it as "architecture" along the lines of civil engineering just can't. At least, not easily.

https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html

The Clean Architecture
13 August 2012

Clean architecture image: https://blog.cleancoder.com/uncle-bob/images/2012-08-13-the-clean-architecture/CleanArchitecture.jpg

Over the last several years we’ve seen a whole range of ideas regarding the architecture of systems. These include:

Hexagonal Architecture (a.k.a. Ports and Adapters) by Alistair Cockburn and adopted by Steve Freeman, and Nat Pryce in their wonderful book Growing Object Oriented Software
Onion Architecture by Jeffrey Palermo
Screaming Architecture from a blog of mine last year
DCI from James Coplien, and Trygve Reenskaug.
BCE by Ivar Jacobson from his book Object Oriented Software Engineering: A Use-Case Driven Approach
Though these architectures all vary somewhat in their details, they are very similar. They all have the same objective, which is the separation of concerns. They all achieve this separation by dividing the software into layers. Each has at least one layer for business rules, and another for interfaces.

Each of these architectures produce systems that are:

Independent of Frameworks. The architecture does not depend on the existence of some library of feature laden software. This allows you to use such frameworks as tools, rather than having to cram your system into their limited constraints.
Testable. The business rules can be tested without the UI, Database, Web Server, or any other external element.
Independent of UI. The UI can change easily, without changing the rest of the system. A Web UI could be replaced with a console UI, for example, without changing the business rules.
Independent of Database. You can swap out Oracle or SQL Server, for Mongo, BigTable, CouchDB, or something else. Your business rules are not bound to the database.
Independent of any external agency. In fact your business rules simply don’t know anything at all about the outside world.
The diagram at the top of this article is an attempt at integrating all these architectures into a single actionable idea.

The Dependency Rule
The concentric circles represent different areas of software. In general, the further in you go, the higher level the software becomes. The outer circles are mechanisms. The inner circles are policies.

The overriding rule that makes this architecture work is The Dependency Rule. This rule says that source code dependencies can only point inwards. Nothing in an inner circle can know anything at all about something in an outer circle. In particular, the name of something declared in an outer circle must not be mentioned by the code in the an inner circle. That includes, functions, classes. variables, or any other named software entity.

By the same token, data formats used in an outer circle should not be used by an inner circle, especially if those formats are generate by a framework in an outer circle. We don’t want anything in an outer circle to impact the inner circles.

Entities
Entities encapsulate Enterprise wide business rules. An entity can be an object with methods, or it can be a set of data structures and functions. It doesn’t matter so long as the entities could be used by many different applications in the enterprise.

If you don’t have an enterprise, and are just writing a single application, then these entities are the business objects of the application. They encapsulate the most general and high-level rules. They are the least likely to change when something external changes. For example, you would not expect these objects to be affected by a change to page navigation, or security. No operational change to any particular application should affect the entity layer.

Use Cases
The software in this layer contains application specific business rules. It encapsulates and implements all of the use cases of the system. These use cases orchestrate the flow of data to and from the entities, and direct those entities to use their enterprise wide business rules to achieve the goals of the use case.

We do not expect changes in this layer to affect the entities. We also do not expect this layer to be affected by changes to externalities such as the database, the UI, or any of the common frameworks. This layer is isolated from such concerns.

We do, however, expect that changes to the operation of the application will affect the use-cases and therefore the software in this layer. If the details of a use-case change, then some code in this layer will certainly be affected.

Interface Adapters
The software in this layer is a set of adapters that convert data from the format most convenient for the use cases and entities, to the format most convenient for some external agency such as the Database or the Web. It is this layer, for example, that will wholly contain the MVC architecture of a GUI. The Presenters, Views, and Controllers all belong in here. The models are likely just data structures that are passed from the controllers to the use cases, and then back from the use cases to the presenters and views.

Similarly, data is converted, in this layer, from the form most convenient for entities and use cases, into the form most convenient for whatever persistence framework is being used. i.e. The Database. No code inward of this circle should know anything at all about the database. If the database is a SQL database, then all the SQL should be restricted to this layer, and in particular to the parts of this layer that have to do with the database.

Also in this layer is any other adapter necessary to convert data from some external form, such as an external service, to the internal form used by the use cases and entities.

Frameworks and Drivers.
The outermost layer is generally composed of frameworks and tools such as the Database, the Web Framework, etc. Generally you don’t write much code in this layer other than glue code that communicates to the next circle inwards.

This layer is where all the details go. The Web is a detail. The database is a detail. We keep these things on the outside where they can do little harm.

Only Four Circles?
No, the circles are schematic. You may find that you need more than just these four. There’s no rule that says you must always have just these four. However, The Dependency Rule always applies. Source code dependencies always point inwards. As you move inwards the level of abstraction increases. The outermost circle is low level concrete detail. As you move inwards the software grows more abstract, and encapsulates higher level policies. The inner most circle is the most general.

Crossing boundaries.
At the lower right of the diagram is an example of how we cross the circle boundaries. It shows the Controllers and Presenters communicating with the Use Cases in the next layer. Note the flow of control. It begins in the controller, moves through the use case, and then winds up executing in the presenter. Note also the source code dependencies. Each one of them points inwards towards the use cases.

We usually resolve this apparent contradiction by using the Dependency Inversion Principle. In a language like Java, for example, we would arrange interfaces and inheritance relationships such that the source code dependencies oppose the flow of control at just the right points across the boundary.

For example, consider that the use case needs to call the presenter. However, this call must not be direct because that would violate The Dependency Rule: No name in an outer circle can be mentioned by an inner circle. So we have the use case call an interface (Shown here as Use Case Output Port) in the inner circle, and have the presenter in the outer circle implement it.

The same technique is used to cross all the boundaries in the architectures. We take advantage of dynamic polymorphism to create source code dependencies that oppose the flow of control so that we can conform to The Dependency Rule no matter what direction the flow of control is going in.

What data crosses the boundaries.
Typically the data that crosses the boundaries is simple data structures. You can use basic structs or simple Data Transfer objects if you like. Or the data can simply be arguments in function calls. Or you can pack it into a hashmap, or construct it into an object. The important thing is that isolated, simple, data structures are passed across the boundaries. We don’t want to cheat and pass Entities or Database rows. We don’t want the data structures to have any kind of dependency that violates The Dependency Rule.

For example, many database frameworks return a convenient data format in response to a query. We might call this a RowStructure. We don’t want to pass that row structure inwards across a boundary. That would violate The Dependency Rule because it would force an inner circle to know something about an outer circle.

So when we pass data across a boundary, it is always in the form that is most convenient for the inner circle.

Conclusion
Conforming to these simple rules is not hard, and will save you a lot of headaches going forward. By separating the software into layers, and conforming to The Dependency Rule, you will create a system that is intrinsically testable, with all the benefits that implies. When any of the external parts of the system become obsolete, like the database, or the web framework, you can replace those obsolete elements with a minimum of fuss.

https://blog.cleancoder.com/uncle-bob/2012/05/15/NODB.html

NO DB
15 May 2012
In the United States, in 1920, the manufacture, sale, and importation of alcoholic beverages was prohibited by a constitutional amendment. That amendment was repealed thirteen years later. During that period of prohibition, the beer industry died.

In 1933, when prohibition was lifted, a few giant grain companies started brewing beer. They completely cornered the market. And for nearly 50 years, we in the United State drank this fizzy bodily effluent and called it “beer”. The only way to tolerate the flavor was to drink it very cold.

As a teenager in the ‘60s, I never understood the attraction. Why beer? It was a pale, yellow, distasteful fluid derived from the urine of sick boars, and had no redeeming qualities that I could see.

In 1984, I went to England; and the scales dropped from my eyes. At last I understood. I had tasted beer for the first time; and I found it to be good.

Since those days the beer situation in the United States has improved dramatically. New beer companies are springing up all over the country; and in many cases the beer they make is actually quite good. We don’t have anything quite so nice as a good english bitter; but we’re getting close.

In the ‘80s a few giant database companies cornered the market. They did this by promulgating fear, uncertainty, and doubt amongst managers and marketing people. The word “relational” became synonymous with “good”; and any other kind of data storage mechanism was prohibited.

I was the lead developer in a startup in those days. Our product measured the quality of T1 communications lines. Our data model was relatively simple, and we kept the data in flat files. It worked fine.

But our marketing guy kept on telling us that we had to have a relational database. He said that customers would demand it. I found that to be a strange claim since we hadn’t sold even one system at that time, and no customer had ever mentioned our data storage technology. But the marketing guy was adamant. We just had to have a relational database. Flat files were prohibited.

As the lead developer, responsible for the quality of the software, my view of a relational database was that it would be a big, stogy, slow, expensive pain in the rear. We didn’t have complex queries. We didn’t need massive reporting capabilities. We certainly didn’t need a process with a multi-megabyte footprint sitting in memory and burning cycles. (Remember, this was the ‘80s). So I fought against this idea with everything I had; because it was the wrong technical solution.

This was not a politically astute move for me. Over a period of several months, a hardware engineer who managed to write a few lines of code, was moved into the software group. He was gradually given more and more responsibility, and was eventually named my co-manager. He and I would “share” the responsibility for leading the software team.

Uh huh. Sure. Right. A hardware guy with no real software experience was going to “help” me lead the team. And what do you think his first issue was? Why it was to get a relational database into our system!

I left a month later and started my consulting career. It was best career move I have ever made. The company I left no longer exists. I don’t think they ever made a dime.

I watched the relational database market grow during the ‘90s. I watched as all other data storage technologies, like the object databases, and the B-tree databases dwindled and died; like the beer companies in the 20s. By the end of the ‘90s, only the giants were left.

Those giants were marketing up a storm. They were gods. They were rulers. During the dot com bubble, one of them actually had the audacity to buy television ads that claimed that their product was “the power that drove the internet”. That reminded me of a beer slogan from the ‘70s “Ya gotta grab for all the gusto in life ya can.” Oh brother.

During this time I watched in horror as team after team put the database at the center of their system. They had been convinced by the endless marketing hype that the data model was the most important aspect of the architecture, and that the database was the heart and soul of the design.

I witnessed the rise of a new job function. The DBA! Mere programmers could not be entrusted with the data – so the marketing hype told us. The data is too precious, too fragile, too easily corrupted by those undisciplined louts. We need special people to manage the data. People trained by the database companies. People who would safeguard and promulgate the giant database companies’ marketing message: that the database belongs in the center. The center of the system, the enterprise, the world, the very universe. MUAHAHAHAHAHAHA!

I watched as SQL slipped through every crack and crevice in the system. I ran screaming from systems in which SQL had leaked into the UI. I railed endlessly against the practice of moving all business rules into stored procedures. I quailed and quaked and ranted and raved as I read through entire mail-merge programs written in SQL.

I hammered and hammered as I saw tables and rows permeating the source code of system after system. I hammered out danger. I hammered out a warning. I hammered out that the schema had become “The Blob”, consuming everything in sight. But I knew all my hammering was just slinging pebbles at a behemoth.

And then, in the first decade of the 21st century, the prohibition was lifted, and the NOSQL movement was born. I considered it a kind of miracle, a light shining forth in the wilderness. Finally, someone realized that there might just be some systems in the world that did not require a big, fat, horky, slow, expensive, bodily effluent, memory hog of a relational database!

I watched in glee as I saw BigTable, Mongo, CouchDB, and all the other cute little data storage systems begin to spring up; like little micro-breweries in the ‘80s. The beer was back! And it was starting to taste good.

But then I noticed something. Some of the systems using these nice, simple, tasty, non-relational databases were being designed around those databases. The database, wrapped in shiny new frameworks, was still sitting at the center of the design! That poisonous old relational marketing hype was still echoing through the minds of the designers. They were still making the fatal mistake.

“Stop You don’t understand. You don’t understand.” But the momentum was too great. An enormous wave of frameworks rose up and smashed down on our industry, washing over the land. Those frameworks wrapped up the databases and fought to grab and hold the center of our applications. They claimed to master and tame the databases. They even claimed to be able to turn a relational database into a NoSQL database. And the frameworks cried out with a great voice heard all over the land: “Depend on me, and I’ll set you free!”

The name of this article is “No DB”. Perhaps after that rant you are getting an inkling of why I named it that.

The center of your application is not the database. Nor is it one or more of the frameworks you may be using. The center of your application are the use cases of your application.

It makes me crazy when I hear a software developer describe his system as a “Tomcat system using Spring and Hibernate using Oracle”. The very wording puts the frameworks and the database at the center.

What do you think the architecture of that system would look like? Do you think you’d find the use cases at the center of the design? Or would you find the source code arranged to fit nicely into the pattern of the frameworks? Would you find business objects that looked suspiciously like database rows? Would the schema and the frameworks pollute everything?

Here’s what an application should look like. The use cases should be the highest level and most visible architectural entities. The use cases are at the center. Always! Databases and frameworks are details! You don’t have to decide upon them up front. You can push them off until later, once you’ve got all the use cases and business rules figured out, written, and tested.

What is the best time to determine your data model? When you know what the data entities are, how they are related, and how they are used. When do you know that? When you’ve gotten all the use cases and business rules written and tested. By that time you will have identified all the queries, all the relationships, all the data elements, and you’ll be able to construct a data model that fits nicely into a database.

Does this change if you are using a NoSql database? Of course not! You still focus on getting the use cases working and tested before you even think about the database; no matter what kind of database it ends up being.

If you get the database involved early, then it will warp your design. It’ll fight to gain control of the center, and once there it will hold onto the center like a scruffy terrier. You have to work hard to keep the database out of the center of your systems. You have to continuously say “No” to the temptation to get the database working early.

We are heading into an interesting time. A time when the prohibition against different data storage mechanisms has been lifted, and we are free to experiment with many novel new approaches. But as we play with our CouchDBs and our Mongos and BigTables, remember this: The database is just a detail that you don’t need to figure out right away.

https://blog.cleancoder.com/uncle-bob/2011/11/22/Clean-Architecture.html

Clean Architecture
22 November 2011
In the weeks since I started talking about the need to clean up our architecture, I’ve noticed a surprising resistance to the idea. Apparently the notion that it’s a good idea to hide the framework, UI, or database from the application code is not universally accepted.

I first blogged about this topic here , I did a whole cleancoders.com episode on the topic. I’ve also done several keynotes on the topic, the slides for which are here, and a video recording of which is here.

One somewhat dissenting view, written by The Frustrated Architect in his coding {the} architecture blog is here. He shows a picture, which I’ll repeat: The point he’s trying to make is that if the UI and Database are a much larger part of the system than the business rules, then the architecture of the system should be more oriented around those larger elements. Of course I disagree. No matter how large any one part of the system is, the other parts should be decoupled from it.

Other dissenting (or perhaps a better word is “skeptical”) views have been less formal. One person simply asked me: “Have you ever actually done this – in a Rails project”, as if Rails was somehow special and changed the game so much that the normal rules of good design don’t apply.

Other folks have worried that the net result of my advice would be lots of duplicated code, and lots of rote copying of data from one data structure to another across the layers of the system. Certainly I don’t want this either; and nothing I have suggested would inevitably lead to repetition of data structures and an inordinate of field copying. I’ll explain why below.

One particularly colorful complaint was: “This sounds like a dogmatic rant, I want to see code.” While I sympathize with that view, the concepts here are just not that difficult to grasp; and, in fact, lots of code would obscure them more than help.

Not Rocket Science.
This isn’t rocket science. The basic idea is very simple. You separate the UI from the business rules by passing simple data structures between the two. You don’t let your controllers know anything about the business rules. Instead, the controllers unpack the HttpRequest object into a simple vanilla data structure, and then pass that data structure to an interactor object that implements the use case by invoking business objects. The interactor then gathers the response data into another vanilla data structure and passes it back to the UI. The views do not know about the business objects. They just look in that data structure and present the response. There are, of course, more details than that; and they are well described in the references above. But at the bottom, that’s all there is to it.

The benefit should be obvious. The application code is completely decoupled from the UI. You can test the application code without the UI present. You don’t need to fire up the web server, or the container, or Rails, or any of the other frameworks in order to run your tests. What’s more, if you don’t like your current UI, you can change it by replacing it with another.

Is this a perfect scheme? Of course not. Might one kind of UI be so different from another that they couldn’t share a common interface? Of course that’s possible. Does that mean this kind of decoupling is a waste? Are you kidding me?

It’ll slow me down.
No it won’t. For goodness sake, it will speed you up. You’ll be able to run your tests without delay. You’ll be able to defer decisions about the UI. You’ll be able to test business rules without the UI present. That kind of flexibility and decoupling always speeds you up. If there’s one thing we’ve learned about coupling over the last fifty years it that nothing is better as slowing you down.

We shouldn’t defer decisions.
One of the more strident comments I’ve made about architecture is that a good architecture allows you to defer critical decisions like the UI, frameworks, database, etc. One point made by several people is that customers don’t want the UI deferred. DBAs don’t want the database deferred. From iteration to iteration they want to see the whole system working, including the UI, the Database, and the frameworks. They don’t want an iteration to be spent solely on business rules. Indeed, good agile practices specifically demand long skinny slices through the entire architecture.

Of course I agree with all of that. However long skinny slices don’t have to be coupled. A good architecture allows you to defer critical decisions, it doesn’t force you to defer them. However, if you can defer them, it means you have lots of flexibility. For example, you could create an interim simple UI for the first few sprints, and then replace it with a more capable UI later.

What about convention over configuration?
The Rails mantra of depending on conventions rather than configuring everything is a powerful idea; and one that I fully agree with. But that doesn’t mean you should couple your system. Conventions do not necessarily cause coupling! There is no reason, for example, why the model objects in Rails should hold business rule methods. Keeping the business rules separate and decoupled from the ActiveRecord derivatives does not violate any Rails conventions. Even if it did, I think decoupling trumps convention.

What about GOOS?
One of the better books about software design is “Growing Object Oriented Software” by Steve Freeman and Nat Pryce. They recommend an outside-in approach to developing systems. You start at the interface and work your way in to the business rules.

At first this sounds like it contradicts my advice. After all, I focus on the use-cases and consider the UI to be a annoying little detail. However, there’s nothing wrong with working on the annoying little details first, so long as you decouple your business rules from them. There’s nothing in the GOOS ideology that opposed decoupling the business rules from the UI.

Now, truth be told, I don’t use the GOOS methodology. I prefer an inside-out approach. I like to focus on the business rules first, and then put a UI around it later. But that does’t mean that the GOOS technique is bad (it’s not) or that if you follow GOOS you won’t have a decoupled architecture (you’d better!).

Oh no, it’s Big Up Front Design!
No it’s not. I’m not telling you to spend months and months drawing UML diagrams. I’m telling you to decouple. You can do that decoupling while you are writing your code and making your tests pass. You don’t need a big up front plan in order to create a nicely decoupled architecture. All you have to do is think about the problem while you are coding it.

However, I should point out that there is nothing whatever wrong with spending a few hours, or even a day or two, pondering the shape of your system. There’s nothing wrong with drawing some UML, or other diagrams in order to get some ideas about how your system should be structured. I don’t want you doing this for months, but there’s nothing wrong with thinking. (see: Hammock Driven Development)

This ain’t new.
I’ve been surprised by the reactions to these ideas. I understand that people naturally resist change; and that lots of programmers aren’t used to the ideas of decoupling (read that clause several times and weep). But this is not some new idea that occurred to me out of the blue. These ideas are old. They come from people like David Parnas, Tom Demarco, Grady Booch, Ivar Jacobson, and many, many others. The fact that they are old doesn’t necessarily mean that they are good; but in this case – they are.

What happened to us? How did we forget these rules? When did the old rules of coupling and cohesion evaporate from our awareness? Are we really so naive as to think that the best way to write a complex system is to throw a bunch of components into a bag and shake it until it works?

https://blog.cleancoder.com/uncle-bob/2011/09/30/Screaming-Architecture.html

Screaming Architecture
30 September 2011
Imagine that you are looking at the blueprints of a building. This document, prepared by an architect, tells you the plans for the building. What do these plans tell you?

If the plans you are looking at are for a single family residence, then you’ll likely see a front entrance, a foyer leading to a living room and perhaps a dining room. There’ll likely be a kitchen a short distance away, close to the dining room. Perhaps a dinette area next to the kitchen, and probably a family room close to that. As you looked at those plans, there’d be no question that you were looking at a house. The architecture would scream: house.

Or if you were looking at the architecture of a library, you’d likely see a grand entrance, an area for check-in-out clerks, reading areas, small conference rooms, and gallery after gallery capable of holding bookshelves for all the books in the library. That architecture would scream: Library.

So what does the architecture of your application scream? When you look at the top level directory structure, and the source files in the highest level package; do they scream: Health Care System, or Accounting System, or Inventory Management System? Or do they scream: Rails, or Spring/Hibernate, or ASP?

The Theme of an Architecture
Go back and read Ivar Jacobson’s seminal work on software architecture: Object Oriented Software Engineering. Notice the subtitle of the book: A use case driven approach. In this book Ivar makes the point that software architectures are structures that support the use cases of the system. Just as the plans for a house or a library scream about the use cases of those buildings, so should the architecture of a software application scream about the use cases of the application.

Architectures are not (or should not) be about frameworks. Architectures should not be supplied by frameworks. Frameworks are tools to be used, not architectures to be conformed to. If your architecture is based on frameworks, then it cannot be based on your use cases.

The Purpose of an Architecture
The reason that good architectures are centered around use-cases is so that architects can safely describe the structures that support those use-cases without committing to frameworks, tools, and environment. Again, consider the plans for a house. The first concern of the architect is to make sure that the house is usable, it is not to ensure that the house is made of bricks. Indeed, the architect takes pains to ensure that the homeowner can decide about bricks, stone, or cedar later, after the plans ensure that the use cases are met.

A good software architecture allows decisions about frameworks, databases, web-servers, and other environmental issues and tools, to be deferred and delayed. A good architecture makes it unnecessary to decide on Rails, or Spring, or Hibernate, or Tomcat or MySql, until much later in the project. A good architecture makes it easy to change your mind about those decisions too. A good architecture emphasizes the use-cases and decouples them from peripheral concerns.

But what about the Web?
Is the web an architecture? Does the fact that your system is delivered on the web dictate the architecture of your system? Of course not! The Web is a delivery mechanism, and your application architecture should treat it as such. The fact that your application is delivered over the web is a detail and should not dominate your system structure. Indeed, the fact that your application is delivered over the web is something you should defer. Your system architecture should be as ignorant as possible about how it is to be delivered. You should be able to deliver it as a console app, or a web app, or a thick client app, or even a web service app, without undue complication or change to the fundamental architecture.

Frameworks are tools, not ways of life.
Frameworks can be very powerful and very useful. Framework authors often believe in their frameworks. The examples they write for how to use their frameworks are told from the point of view of a true believer. Other authors who write about the framework also tend to be disciples of the true belief. They show you the way to use the framework. Often it is an all-encompassing, all-pervading, let-the-framework-do-everything position. This is not the position you want to take.

Look at each framework with a jaded eye. View it skeptically. Yes, it might help, but at what cost. How should I use it, and how should I protect myself from it. How can I preserve the use-case emphasis of my architecture? How can I prevent the framework from taking over that architecture.

Testable Architectures.
If you system architecture is all about the use cases, and if you have kept your frameworks at arms-length. Then you should be able to unit-test all those use cases without any of the frameworks in place. You shouldn’t need the web server running in order to run your tests. You shouldn’t need the database connected in order to run your tests. Your business objects should be plain old objects that have no dependencies on frameworks or databases or other complications. Your use case objects should coordinate your business objects. And all of them together should be testable in-situ, without any of the complications of frameworks.

Conclusion
Your architectures should tell readers about the system, not about the frameworks you used in your system. If you are building a health-care system, then when new programmers look at the source repository, their first impression should be: “Oh, this is a heath-care system”. Those new programmers should be able to learn all the use cases of the system, and still not know how the system is delivered. They may come to you and say: “We see some things that look sorta like models, but where are the views and controllers”, and you should say: “Oh, those are details that needn’t concern you at the moment, we’ll show them to you later.”
