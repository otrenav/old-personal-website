+++
draft = true
+++

7 essential technologies for a modern data architecture
Go Back
Archive
Delete
Favorite
Share
Display Options
7 essential technologies for a modern data architecture
By Jim Scott, www.infoworld.comView OriginalFebruary 21st, 2018
The re-platforming of enterprise IT infrastructure is no small undertaking. Re-platforming is usually sparked by a shifting set of key business drivers, and that is precisely the case today. Simply put, the platforms that have dominated enterprise IT for nearly 30 years can no longer handle the workloads needed to drive businesses forward.

At the center of this digital transformation is data, which has become the most valuable currency in business. Organizations have long been hamstrung in their use of data by incompatible formats, limitations of traditional databases, and the inability to flexibly combine data from multiple sources. New technologies promise to change all that.

[ Which NoSQL database should you use? Let InfoWorld be your guide. NoSQL grudge match: MongoDB and Couchbase Server go nose to nose. • NoSQL standouts: The best key-value databases. • NoSQL standouts: The best document databases. | Go deep into analytics and big data with the InfoWorld Big Data and Analytics Report newsletter. ]
Improving the deployment model of software is one major facet to removing barriers to data usage. Greater “data agility” also requires more flexible databases and more scalable real-time streaming platforms. In fact no fewer than seven foundational technologies are combining to deliver a flexible, real-time “data fabric” to the enterprise.

Unlike the technologies they are replacing, these seven software innovations are able to scale to meet the needs of both many users and many use cases. For businesses, they have the power to enable faster and more intelligent decisions and to create better customer experiences.

1. NoSQL databases
The RDBMS has dominated the database market for nearly 30 years. But the traditional relational database has been shown to be less than adequate in the face of ever-growing data volumes and the accelerated pace at which data must be handled. NoSQL databases have been taking over because of their speed and ability to scale. In the case of document databases, they offer a far simpler model from a software engineering perspective. This simpler development model increases speed-to-market and helps the business respond more quickly to the needs of customers and internal users.

2. Real-time streaming platforms
Responding to customers in real-time is critical to the customer experience. It’s no mystery why consumer-facing industries have experienced massive disruption in the last 10 years. It has everything to do with the ability of companies to react to the user in real time. Telling a customer that you will have an offer for them in 24 hours is no good because they will have already executed the decision they made 23 hours ago. Moving to a real-time model requires event streaming.

Message-driven applications have been around for years. However, today’s streaming platforms scale far better—at far lower cost—than their predecessors. The recent advancement in streaming technologies opens the door to many new ways to optimize a business. Reacting to a customer is one facet. By providing a real-time feedback loop to software development and testing teams, event streams can also help companies improve product quality and get new software out the door faster.

3. Docker and containers
Containers hold significant benefits for both developers and operators as well as for the organization itself. The traditional approach to infrastructure isolation was that of static partitioning, the allocation of a separate, fixed slice of resources (be it a physical server or a virtual machine) to each workload. Static partitions made it easier to troubleshoot issues, but at the significant cost of delivering substantially underutilized hardware. Web servers, for example, would consume on average only about 10 percent of the total compute available.

The great benefit of container technology is its ability to create a new type of isolation. Those who least understand containers might believe they can achieve the same benefits by using tools like Ansible, Puppet, or Chef, but in fact these technologies are highly complementary. Further, no matter how hard you try, those automation tools cannot create the isolation required to move workloads freely between disparate infrastructure and hardware setups. The same container can run on bare-metal hardware in an on-premises data center or in a virtual machine in the public cloud—no changes necessary. That is true workload mobility.

4. Container repositories
A container repository is critical to agility. Without a devops process for building container images, and a repo for storing them, each container would have to be built on every machine in which that container could run. With the repository, container images can be launched on any machine configured to read from that repository. Where this gets even more complicated is when dealing with multiple data centers. If a container image is built in one data center, how do you move the image to another data center? Ideally, by leveraging a converged data platform, you will have the ability to mirror the repository between data centers. A critical detail here is that mirroring capabilities between on-premises and the cloud might be vastly different than between your on-premises data centers. A converged data platform will solve this problem for you by offering those capabilities regardless of the physical or cloud infrastructure you use in your organization.

5. Container orchestration
Instead of static hardware partitions, each container appears to be its entirely own private operating system. Unlike virtual machines, containers do not require a static partition of compute and memory. This enables administrators to launch large numbers of containers on servers without having to worry so much about exact amounts of memory. With container orchestration tools like Kubernetes, it becomes very easy to launch containers, kill them, move them, and relaunch them elsewhere in an environment.

After putting new infrastructure components in place—i.e. a document database such as MapR-DB or MongoDB), an event streaming platform such as MapR-ES or Apache Kafka, orchestration tools such as Kubernetes—and implementing a devops process for building and deploying software in Docker containers, we then must move to the question of what we should deploy in those containers. This brings us to microservices.

6. Microservices
Historically speaking, the concept of microservices is nothing new. The difference today is that the enabling technologies—NoSQL databases, event streaming, container orchestration—can scale with the creation of thousands of microservices. Without these new approaches to data storage, event streaming, and infrastructure orchestration, large-scale microservices deployments would not be possible. The infrastructure needed to manage the vast quantities of data, events, and container instances would not be able to scale to the required levels.

Microservices are all about delivering agility. A service that is micro in nature generally consists of a single function, or a small group of functions. The smaller and more focused the functional unit of the work, the easier it will be to create, test, and deploy the service. These services must be decoupled, or you lose the agility microservices promise. Microservices can rely on other services, but generally through either load balanced REST APIs or event streams. Using event streams allows you to leverage request and response topics to easily keep track of the history of events. This approach has a major benefit for troubleshooting as the entire request flow and all of the data in the requests can be replayed at any point in time.

Because microservices encapsulate a small unit of work and because they are decoupled from one another, there are few hurdles to replacing or upgrading the service over time. Under the old model, reliance on tight coupling like RPC meant having to shut down all the connections and then later reestablish them. Load balancing was another huge issue for those implementations as manual configuration made them error prone.

7. Function as a service
As we have seen microservices taking hold in the industry so have we seen the rise of serverless compute or what is perhaps more accurately referred to as function as a service (FaaS). FaaS enables the creation of microservices in such a way that the code can be wrapped in a lightweight framework (i.e. a shim or sidecar), built into a container, executed on demand (based on some trigger), and then automatically load balanced, thanks to the lightweight framework. The beauty of FaaS is that it frees the developer to focus almost exclusively on the function. Thus FaaS looks to be the logical conclusion of the microservices approach.

The triggering event is a critical component of FaaS. Without it there is no way for the functions to be invoked, and resources consumed, only when work needs to be done. The automatic invocation of the functions is what makes FaaS truly valuable. Imagine for a moment that every time someone reads a user’s profile there is an audit event—a function that must run to notify a security team. More specifically, maybe it filters out only certain types of records. It can be selective, and after all it is a business function that is completely customizable. It is important to note that putting a workflow like this in place is tremendously simple with a deployment model such as FaaS.

Putting it all together
The magic behind a triggering service is really nothing more than events in an event stream. Certain types of events are used as triggers more often than others, but any event you wish to be a trigger can be a trigger. A trigger event could be a document update, running an OCR process over the new document and then adding the text from the OCR process to a NoSQL database. If we think in even more interesting ways, whenever an image is uploaded it could be run through a machine learning framework for image identification and scoring. There is no fundamental limitation here. A trigger event is defined, something happens, the event triggers the function, and the function does its job.

FaaS will be the next phase in the adoption of microservices. However, there is one major factor that must be considered when approaching FaaS, and that is vendor lock-in. FaaS hides the specific storage mechanisms, the specific hardware infrastructure, and the orchestration, which are all great things for the developer. But because of this abstraction, a hosted FaaS offering is one of the greatest vendor lock-in opportunities our industry has ever seen. Because the APIs are not standardized, migrating from a FaaS offering in the public cloud is nearly impossible without throwing away nearly 100 percent of the work that has been performed. If FaaS is approached in a more methodical way, by leveraging events from a converged data platform, then it becomes easier to move between cloud providers.

If you’d like to learn more about leveraging microservices and containers I would encourage you to download the (free) book I wrote: Microservices and Containers: Mastering the Cloud, Data, and Digital Transformation. Many additional topics are covered including machine learning applications and additional frameworks that can be used. If you have any questions, please email me at jscott@mapr.com or contact me on Twitter.

Jim Scott is director of enterprise strategy and architecture at MapR Technologies. Jim helped build the Hadoop community in Chicago as cofounder of the Chicago Hadoop Users Group. He has implemented big data solutions to support a variety of enterprise use cases from OLTP at a rate of 60B transactions per day to full data center monitoring and retail analytics. Jim speaks at many industry events around the world on big data technologies and is the creator of the enterprise data-fabric architecture, Zeta Architecture. Jim is on Twitter as @kingmesal.

New Tech Forum provides a venue to explore and discuss emerging enterprise technology in unprecedented depth and breadth. The selection is subjective, based on our pick of the technologies we believe to be important and of greatest interest to InfoWorld readers. InfoWorld does not accept marketing collateral for publication and reserves the right to edit all contributed content. Send all inquiries to newtechforum@infoworld.com.

READ MORE ABOUT:  Microservices
