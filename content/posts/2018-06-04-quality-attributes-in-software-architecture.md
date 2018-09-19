Quality attributes in Software Architecture. Part I
Go Back
Archive
Delete
Favorite
Share
Display Options
Quality attributes in Software Architecture. Part I
By Nikolay Ashanin, hackernoon.comView OriginalMarch 28th, 2018

Image 1. Monument Valley game
Let’s continue investigating Software Architecture. We considered who is a Software Architect, what types of Software Architects exist and what the architect should do in the beginning of a project. When stakeholders are identified and requirements are collected, the question arises what to do next. After functional requirements are formulated — or the answer to the question “WHAT the system should do” is found, the software architect starts searching for the answer to the question “HOW the system should work”. Non-functional requirements help in that case.

Article series
The Path to Becoming a Software Architect
Stakeholders in Software Architecture
Types of Software Architects
Quality attributes in Software Architecture. Part I
TBD Quality attributes in Software Architecture. Part II
TBD Software Architect. Diagrams and documentation
Certificates in Software Architecture
TBD Software Architect. Resources, articles and books
TBD Software Architect. Design vs Architecture
What are non-functional requirements?
Non-functional requirements (NFRs) define the criteria that are used to evaluate the whole system, but not for specific behavior, and are also called quality attributes and described in detail in architectural specifications.

All NFRs can be divided into two main categories:

Attributes that affect system behavior, design, and user interface during work.
Attributes that affect the development and support of the system.
A situation in which the system has the desired combination of quality attributes, for example, of usability and performance or reliability, shows the success of the architecture and the quality of the software. When designing to meet any requirements, it is important to consider the impact on other attributes and find compromises between requirements. Along with this, the value or priority of each individual attribute differs from system to system. This article covers not all existing attributes, but those covered can be a good start for designing your system.

Quality attributes types (ISO/IEC FCD 25010 diagram)
To consider the types of quality attributes, we can use a diagram from ISO 25010:


Image 2. ISO/IEC FCD 25010 diagram
This standard describes the quality attributes for a software product. Next, we’ll look at what exactly each attribute means individually.


Performance shows the response of the system to performing certain actions for a certain period of time.

There are two ways how to measure performance:

Latency: Time spent on responding to an event
Channel capacity. The number of events that occur at a certain point in time.
In practice, the possible performance indicators include, for example:

Average/maximum number of system users per time unit.
Average page load time.
Average method execution time.
Here you can find interesting latency numbers which every developer should know.

Performance issues very often grow into problems that can affect everything, from the server’s capacity or the ways in which you develop your front-end to the efficiency of database queries or the capacity of communication channels.

Performance is almost always included in the list of key quality attributes that need to be considered by the architect, since it affects the entire system and can affect many parts of the architectural solution. Therefore, on the internet, you can find a large number of examples of how to deal with performance problems.


Interoperability is an attribute of the system or part of the system that is responsible for its operation and the transmission of data and its exchange with other external systems. A well-designed system facilitates integration with third-party systems. To improve the interoperability, you can use well-designed external interfaces, standardization systems, etc.

Naturally, there are a lot of problems for interaction:

Outdated external systems.
Different formats of data in similar external systems.
Different versions of the API in external systems.
Backwards compatibility of the API for integration.
Poor quality and lack of standards of external systems.
Interoperability cannot be ignored. In the best case, you will have to create additional layers for the interaction API. At worst, it will be necessary to rebuild the entire system.


Usability is one of the most important attributes, because, unlike in cases with other attributes, users can see directly how well this attribute of the system is worked out. One of the key problems of usability is too much interaction or too many actions necessary to accomplish a task. Incorrect sequences of steps in multistage interfaces are also a problem of usability. Data elements and controls may be designed not according to the accepted patterns of user experience, which also complicates the interaction. For example, if you are developing an iOS application, then it is important to use the guidelines from Apple, or the guidelines from Microsoft — for Windows desktop applications.

Examples of important indicators for this attribute are:

List of supported devices, OS versions, screen resolutions, and browsers and their versions.
Elements that accelerate user interaction, such as “hot keys”, “lists of suggestions”, and so on.
Average time a user needs to perform individual actions.
Support of accessibility for people with disabilities.

Reliability is an attribute of the system responsible for the ability to continue to operate under predefined conditions. Most often, the system fails due to the inaccessibility of external elements, such as databases, systems, and network connections.


Availability is part of reliability and is expressed as the ratio of the available system time to the total working time. Important indicators for this attribute are:

Availability.
Planned downtime.
Time needed to update the software, and so on.
Availability is often expressed in the number of nines after the comma, that is nines of availability (hours / minutes / seconds):

2 9’s (99%) = up to 87.6h / 5256.0m / 315360.0 seconds of downtime per year.
3 9’s (99.9%) = up to 8.76h / 525.6m / 31536.0 seconds of downtime per year.
4 9’s (99.99%) = up to 0.876h / 52.559999999999995m / 3153.6 seconds of downtime per year.
5 9’s (99.999%) = up to 0.0876h / 5.256m / 315.36 seconds of downtime per year.
6 9’s (99.9999%) = up to 0.00876h / 0.5256000000000001m / 31.536 seconds of downtime per year.
7 9’s (99.99999%) = up to 8.76E-4h / 0.05256m / 3.1536 seconds of downtime per year.
For example, availability is one of the main criteria for tier-ranking of data centers in the USA.


Security is responsible for the ability of the system to reduce the likelihood of malicious or accidental actions as well as the possibility of theft or loss of information. There are a number of measures that are used to protect systems: authentication, encryption, audit, and others.

Examples of this attribute in the work of the system are:

The ability of the system to detect DDoS attacks and respond to them.
Restrictions of user access in accordance with authentication/authorization.
Prevention of SQL injection.
Encryption of passwords and content.
Secure connection.

Maintainability is the ability of the system to support changes. Changes can be related to new business requirements or correction of old errors and affect system components or separate methods. Also, maintainability affects the time needed to restore the system after a failure. Excessive dependencies between components have a very negative effect on maintainability. In programming, there is a notion of anti-pattern spaghetti code which means excessive coherence in the code. In architecture, there is no such thing, but architecture is very close to programming in this sense. It is because of the maintainability attribute that such concepts as separation of responsibility, microservice architectures, and modularity have appeared. At the same time, this attribute affects not only development processes, but also management processes (for example, splitting teams into product-related parts).


Modifiability determines how many common changes need to be made to the system to make changes to each individual item. Ideal is the case where each change affects only one element.


Testability shows how well the system allows performing tests, according to predefined criteria. In addition to testing performance, testability makes it possible to effectively divide the system into subsystems.

The main indicators for this attribute are:

Percentage of coverage with modular, integration, or unit tests.
The final list of required test environments as well as the final list of used approaches to testing (manual/automatic, regression, integration, etc.).
There are other very important quality attributes which are not covered by the standard but cannot be ignored in this article.


Scalability is the ability of the system to handle load increases without decreasing performance, or the possibility to rapidly increase the load.

There are two ways to improve scalability:

Vertical: To increase, we add more resources, such as memory, disks or processors into one system.
Horizontal: We increase the number of computing units and divide the load.
The key indicators for measuring this attribute are:

If the system allows for horizontal scaling.
The time needed to increase scaling, in seconds.
Scaling limitations: the number of servers or the network capacity.
Possibility to scale: the increase in the number of transactions or the amount of content.
And this is only a small part of the indicators which you need to follow when designing. Scalability is one of the most important attributes, no matter what stage the project is at.


Reusability is a chance of using a component or system in other components/systems with small or no change. Allocation of responsibilities, modularization, decreasing of copy-paste are all about reusability. Copying code, or worse, using different components for the same result in different places, is one of the biggest problems of reusability.


Supportability is the ability of the system to provide useful information for identifying and solving problems. The main problems in ensuring supportability can be addressed with the following means:

No diagnosis: How the activity and performance of the system are controlled. This includes various types of logging.
No tools for troubleshooting: This includes backups, various systems for creating snapshots of the system, and tools for auditing the system. When the system fails, it is always more pleasant to wait for an automatic restart than to solve the issue manually.
No health checking: This includes a variety of systems for measuring compilation time, deployment time, database size, or mobile application size.
Most often these are not considered in start-ups or small projects initially. The cost of maintaining the supportability attribute is high, and the result is only visible on a large scale. However, with the growth of the team and the product, this attribute becomes one of the key ones.

This article is divided into two parts. In the second part, let’s consider the approaches how to prioritize quality attributes and answer the question why it is so important to find the right priorities.


READ MORE ABOUT:  Architecture Ux Career EXPLORE THE BEST FROM: hackernoon.com
