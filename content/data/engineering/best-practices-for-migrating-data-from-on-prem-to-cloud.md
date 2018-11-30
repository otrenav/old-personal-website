+++
draft = true
+++

https://www.alooma.com/blog/best-practices-for-migrating-data-from-on-prem-to-cloud

Best Practices for Migrating from On-Prem to Cloud
by Rami Amar
14 min read  • 30 Jul 2018
The advantages of migrating to the cloud are very clear and the industry is showing it. According to the IDC Worldwide Quarterly Cloud IT Infrastructure Tracker, deployment in cloud environments will increase by 18.2% in 2017 to $44.2 billion. The chart below illustrates that by 2019, the forecasted split between cloud and traditional data centers will be almost equal.

IDC Worldwide Quarterly Cloud IT

Reasons to move to the cloud
Before we explain the best practices for migrating from on-prem to cloud, let’s start with the main reasons why you should: cost efficiency, performance and security.

Cost efficiency
Ultimately the underlying driver for making the move from legacy on-premise enterprise data warehouse to the cloud is cost efficiency. Cost encompasses not just the direct cost of owning or licensing the data center equipment, but also the cost of third party service, maintenance and management, training and policy. These indirect costs can make up a significant proportion of the expenses of running on-premise data centers.

Let’s look closer at the cost of maintenance, management and training.

Maintaining on-prem computing infrastructure requires: space, construction, electricity, air conditioning, hardware procurement, operating systems, networking, physical security, and more. Instead, you can shift these costs to a cloud service provider to dramatically save money.

Managing an on-prem environment also takes deep expertise and experience. With the unstoppable trend towards cloud, the cost of finding and training engineering talent will become harder and more expensive. From the recruiting of specialists, to project management of any new software installation, to monitoring and incident response. It’s a tremendous hassle that costs your organization much more than the actual computing resources. Conversely, it is the business of cloud service providers to run and manage cloud data centers in an aggressively growing market, saving you this headache.

Performance
The downside of investing everything into owning your own on-premise environment is inflexibility. It is a long-term commitment, which hinders your organization from obtaining the latest and greatest technology. Financially the combined upfront capex costs of buying the equipment and depreciation costs as it ages, adds up very quickly too.

On the flipside, cloud service infrastructure affords you flexibility and the best equipment in the industry: the newest Intel processors, the most optimized RAM memory, petabit networking, SSD storage, arrays of GPUs, and even cloud programmable hardware. This comes with a wide ecosystem of software platforms: managed databases and warehouses, orchestration platforms, caching, queueing systems, and just about anything you need for any software architecture. The impact on your business is virtually immediate, especially if you operate in a competitive market where leaders move fast.

Security
Many who have an on-premise data infrastructure are concerned about security. The reality is that it’s hard to be more secure and in control than housing your data center within your own perimeter. Ultimately security on-premise is only as reliable as the security policies put in place and enforced. This policy overhead is not insignificant and can’t be ignored.

Cloud service providers such as AWS, Google Cloud Platform and Snowflake, understand fully that thousands of customers entrust their data security to them. Consequently, cloud service providers are required to meet the highest security standards in the industry, set by health, financial, and government institutions. This enables certifications like SOC2, ISO27001, HIPAA, and PCI to be much easier to obtain when running on a computing infrastructure that is already certified. Authentication, authorization, logging, and auditing is built in to all cloud platforms.

Security measures like network and application firewalls, DDOS protection and identity management are standardized, tested, and made available for setup and configuration. Although cloud environments have a completely secure computing layer and the virtual (or logical) computing layer has all the enterprise grade security mechanisms, it is still up to you to implement proper security policies for your architecture - as you would for an on-prem setup. Given that you are not 100% in control of your cloud environment, it does present more risk than on-prem.

A Proposed Migration Plan
A common misconception about cloud migration is that it will be a one time trip. But the reality is that the process of migrating data infrastructure to the cloud should happen gradually. A successful migration should feel as seamless as possible to the organization, so work isn't disrupted. The journey somewhat resembles the true story about the 59 story Citigroup Center in New York, which underwent critical infrastructure reinforcements performed nightly over several months, so the public and building occupants wouldn’t notice. Likewise, when planning a major data migration the goal is to ensure everything is done step by step, while minimizing downtime and disruption to users. This is why you should be prepared for a migration process which can take anywhere from several months to a year.

Migrate Existing Data

Step 1 - Migrate Existing Data
The first step is to create an initial copy of your existing data in a cloud data warehouse. This process will require choosing the right cloud data warehouse for your organization, and then making an initial copy of all your data.

There are two main challenges in this step. The first is to experiment and choose the right infrastructure for your organization. To do this, you might select a smaller data set and migrate it to several different data warehouses for comparison. The second challenge is to copy all of your existing data. This could be hundreds of terabytes of data, an amount that is not easily transferred over the internet to the cloud. Google and Amazon both provide various means of overcoming this challenge, by physically transporting your hard drives, trucks and USPS.

Be aware that copying the raw data is just one part of this initial migration. You must verify the format and schema of the data you export from your warehouse, and then import your data’s schema into the cloud data warehouse before actual loading. Lastly, to continue onto step 2, you must mark the point in time of the exported snapshot, and use it when setting up an ongoing replication mechanism.

Step 2 - Set up Ongoing Replication
After exporting a first snapshot of your on-prem data warehouse, and copying it to your cloud data warehouse, the next step would be to set up an ongoing synchronization process. Ongoing replication is more complicated than a single copy operation, as it is actually a series of incremental copy operations.

Each operation requires capturing changes to the data and its schema, and applying those changes to the cloud data warehouse. Some changes, like deleted data or altered column types, may require tailored solutions in order to be applied on the cloud data warehouse. More technical challenges will be described later in this post.

Any synchronization solution should be benchmarked for latency and reliability, as these parameters are crucial to the success of the organization’s migration to the cloud. You may build this synchronization out yourself, or use a data pipelining service to handle the continuous replication of data and schemas. Once this foundation level is secured, you may go about migrating the rest of your infrastructure one component after another.

Step 3 - Migrate BI
From our experience, the first core functionality an organization will be willing to move to the cloud is its analytics infrastructure. Since it is a major component of an organization’s data infrastructure, yet not the absolute core, it makes for an ideal and less risky migration target. Moreover, there are various data analysis teams in every organization, and it will be easier to start with a small and innovative group to lead the change. Find this group, and work with them on setting up a BI tool which will work with your cloud data warehouse.

Some examples of BI tools are Tableau, Looker, Periscope, Chartio, and even the open source Redash. With a team of leading analysts and a fully synchronized cloud data warehouse, you can work on porting reports and dashboards which will prove the value of the cloud data warehouse. If done correctly, this will create a ripple effect in your organization, bringing more data consumers to want to move to the cloud.

Step 4 - Migrate your legacy data applications
At this point of the migration, your organization should be buzzing with a new cloud data warehouse that runs 5x more reports, each at least 10x faster than the on-prem data warehouse. With such winds blowing in your sails, you may complete migrating all BI teams to use the cloud BI tools, and then prioritize migration of your custom reporting tools and data applications.

These will bring up more technical challenges as you might discover that ODBC drivers need to be replaced, and queries need to be adjusted or rewritten. Changes to the data model may also be required, to fully utilize the performance advantages of your cloud data warehouse. Relying on a data synchronization mechanism that can accommodate for transformations, will make the implementation of these data model changes more dynamic and flexible.

It’s best to work with the various data engineering teams in your organization to instruct them about usage of new cloud data warehouse and the migration tools you used. Share as much of the migration experience to empower more change agents in the organization. Roll out newly migrated applications progressively, and build a rollback safety net to minimize interruption to your org’s efficiency.

Step 5 - Migrate your Legacy ETL processes
Once all legacy data applications have been migrated to your cloud, the last step is to point your ETL processes to your cloud data warehouse. In some cases it will be just a change of configuration, and in others it may require a complete re-write. Luckily, in the space of cloud ETL, there are several comprehensive services that may save you much of the work. Completing this step will essentially render your on-prem data warehouse out of sync and therefore obsolete.

Congratulations!

The Challenges That Lie Ahead
Despite breaking the migration plan down into what seems like five simple steps, the truth is that the journey isn’t over. There are many technical challenges you have to navigate. We will explore some of them here:

Challenge 1 - Replanning your data model
Cloud data warehouses support a different type of schemas, which has its advantages and disadvantages. Data types may be different. AWS Redshift is PostgreSQL compatible, and therefore has the most familiar set of data types. BigQuery, on the other hand, uses STRING instead of VARCHAR, and employes RECORD (semi structured objects) and REPEATED (arrays) types. Snowflake introduces VARIANT, OBJECT, and ARRAY, for supporting semi structured data.

There is also a wide set of eclectic data types which are not supported at all (BLOBs, geographical coordinates, etc.). Furthermore, cloud data warehouses encourage an approach of schema denormalization for increased performance. The increased storage required to hold denormalized data is relatively cheap. In contrast, running JOINS on tables stored on distributed servers is very expensive, and will not lead to the desired performance improvements. To increase complexity on these differences, it is not enough to adjust the data model once. It is required to keep the two data models in continuous synchronization as they change over time. The data model will surely change over the period of the migration.

Challenge 2 - Security
We described earlier the advantages of relying on the large cloud providers’ government grade security. But this type of security mostly applies to the hardware and IaaS (infrastructure as a service) levels. Contrary to this security level, the ease of the cloud and the pressure to make a fast and reliable migration will also bring some promiscuity. It’s very easy to just provide all developers and data consumers with permission to any cloud resource, postponing the tedious permissions management to "future us". The more this is postponed, that harder it is to impose stricter security permissions.

Our advice is to take this into consideration right after the migration gains wide organization credit and momentum. This is the point where permissions may get out of control, but it is also an opportunity to map out all of the groups and roles that will require access to cloud resources and plan security policies accordingly. Study carefully your cloud provider’s tools for managing roles and permissions, as they are very comprehensive and will let you define almost any policy you’d like. If configured and audited correctly, it’s another big win in the long migration journey.

Challenge 3 - Connecting custom data applications to your data warehouse
Another obstacle is adjusting the interfaces your custom data applications use to connect to your data warehouse. In other words, though the ODBC/JDBC drivers are supported and actively maintained, they hardly behave identically to one another. Changing an application’s database driver might require various query adjustments. Some changes will be obvious upon first use, as the SQL statements may result in visible errors. Other changes are less obvious, as different ODBC drivers may make slight data conversions. Examples of such conversions may be the precision of floating point numbers, the timezone format of timestamps, and the way NULL values are handled.

These changes will only appear as data discrepancies, and will take more rigorous testing to detect. The upside of facing these kind of obstacles is the larger amount of engineers involved. Every application usually has a maintainer, so the obstacles can be overcome by a larger work force. As long as knowledge of these adjustments is shared, the whole organization can overcome them faster.

Challenge 4 - Writing and using stored procedures
Lastly, a very common on-prem data warehouse feature that is often overlooked and is missing from their cloud competitors is the ability to write and use stored procedures. The leading cloud data warehouses, Snowflake, Redshift, and BigQuery, all support user defined functions (defined in Python, SQL, or JavaScript), but for many this is not enough. The layer of stored procedures on a data warehouse is like a repository of miniature data applications, which save a lot of work and help in preserving organization specific knowledge. The common alternative is to use a separate platform for scheduling parametrized queries or tasks orchestration. There are open source options like Luigi and Airflow as well as commercial cloud based alternatives.

See you in the cloud
We’ve laid out our reasoning for why migrating from on-prem to the cloud is worth it, specifically cost efficiency, performance and security benefits. We have outlined a five stage approach to planning and executing your cloud migration and highlighted some complex challenges to be aware of during your journey.

Being armed with this knowledge will help you best prepare to make your migration as smooth as possible. If you’re thirsting for more information or would like to watch a demo of how we migrate data from an Oracle EDW to a cloud data warehouse, watch the video below:
