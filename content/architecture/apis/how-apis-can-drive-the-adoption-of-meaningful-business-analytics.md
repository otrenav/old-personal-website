+++
draft = true
+++

How APIs Can Drive The Adoption of Meaningful Business Analytics
Byprogrammableweb.com7 mins
View Original
As more enterprises embrace digital business models, they are evolving toward becoming data-driven organizations and harnessing analytics to understand the business' dynamics, detect patterns, and predict future developments. However, the challenges associated with collecting data and building custom analyses have hindered the adoption of analytics. Consequently, even when adopted, analytics as a discipline is nowhere near having the transformational impact once predicted.

Increasingly, it is becoming clear that APIs are key to simplifying the implementation of analytics and opening the doors to adoption. Already, APIs are the mechanism of choice among digitally driven businesses for connecting their internal and external services, applications, data, identities, and other digital assets. As a result, APIs can provide a significantly easier-to-use alternative to the traditional ad-hoc data collection and data analysis approaches that have been adopted while converting information into the intelligence required by today's data-driven organizations.

This article explores the challenges of embracing analytics using traditional approaches, examines how API management is well-positioned to address these challenges, and then presents a solution blueprint for using API management to mine valuable data for analytics.

Three Roadblocks to Analytics Adoption
In implementing analytics, organizations face three critical challenges, each of which has the potential to delay or derail the project.

First, unlike with API management (and given the highly decentralized nature of much of the source data), there are no turnkey analytics solutions. Instead, an organization has to build a custom solution by combining different analytics products or open source projects. This, in turn, requires the development team to write significant amounts of code to integrate the necessary technologies and existing systems.

Second, an enterprise will need to employ data engineers (developers) and data scientists (architects) who have a deep understanding of statistics, machine learning, and systems. These experts decide what insights are useful, determine which key performance indicators (KPIs) to track, design a system to collect data, get other groups in the organization to add data collection code, and implement the analysis logic. Unfortunately, this talent is in short supply.

Third, to collect data, organizations need to add instrumentation (sensors) across the organization to generate events that signal notable activities. Such a project requires coordination across multiple groups—ranging anywhere from 10 to 20 teams in large enterprises. Additionally, organizations may need to wait for the instrumentations to be shipped to them. As a result, the instrumentation process can be expensive and time-consuming.

Consequently, despite the potential far-reaching impact of analytics, adoption has been limited to date.

Bringing Down Barriers via API-Driven Analytics
API management has the potential to enable the wider use of analytics due to two factors. API management solutions have seen extensive adoption—growing at more than 35% per year since 2016 as businesses, customers and partners seek to expose business activities as APIs to enable more flexible integration and faster time-to-automation. This API technology is backed by mature tools and a strong ecosystem.

Therefore, rather than building a turnkey analytics solution, we should be thinking about building a turnkey API-driven analytics solution as an integral part of API management tools. Such a solution is feasible and powerful for a couple of reasons.

To start, API management sits at the crossroad of all communications happening within or without the organization. Even websites and other user interfaces (UIs) call these APIs to carry out their backend functions. So, we can instrument API management tools instead of the actual systems. This can be done once as part of the API management framework, which can be updated as needed. Then, by collecting messages that go through the APIs, we can get a full view of the organization. This eliminates the need for an enterprise to coordinate teams to add instrumentation to systems. It also removes the challenge of managing the multiple formats of data collected via the system instrumentations of traditional analytics.

Instead, since all data is collected through one logical layer within the API management system, the format of the data is known. This enables the development of a turnkey API-driven analytics solution that supports common use cases as out-of-the-box scenarios. These include fraud detection, customer journey tracking, and segment analysis, among others. A team of skilled data scientists—whether within a software vendor, systems integration firm, or enterprise development team—can invest in building complex analyses that cover the most common use cases. The analyses for these scenarios then can be used either by multiple organizations or groups within a large enterprise.

The next section describes a blueprint for a turnkey API-driven analytics solution that follows the processes here.

A Blueprint for API-Driven Analytics
In a turnkey API-driven analytics solution, we can instrument API management tools instead of instrumenting the every system or subsystem across the whole enterprise.

The following picture shows a high-level blueprint of an API-driven analytics solution that is layered on top of API management.


In the approach illustrated here, data collected at API layer includes information about:

The request and response, including timestamps, headers, full message, message size, and request path URL
The invoker details: IP address, username, and user agent
Processing and transformations, including time started, time end, outcome, errors, API name, hostname, and protocol
Using only the above information, the analytics system can build a detailed picture of which users are invoking what APIs, from where, and when. That view can be further analyzed to understand what loads are being received by the API. Or how about the customer journey through insights into what activities lead a customer to buy a product or service?

However, the views listed above will be too technical for many users without one more level of mapping to business concepts. Following are some examples of such mappings:

Instead of seeing how many requests are received, it's useful to know which money flows are related to each request.
Instead of knowing just the API name, it is useful to understand what business unit the API belongs to and the average cost to serve a request.
Instead of just seeing the customer name, it is useful to pull in customer demographics and slice and dice the data based on those demographics.
To deliver more business-level insights, the data collection layer has to go beyond the obvious and collect additional information. Let's explore two techniques for accomplishing this.

The first technique is to annotate the API definition with information about what interesting data is available inside the message content. This enables the data collection layer to automatically extract the information and send it to the analytics system. Most messages use XML or XPath, and instructions to extract information can be provided as XPath or JSON XPath expressions.

The second technique is to annotate the API definitions with details about data sets that can be joined with collected data to enable further processing. For example, a data set might provide customer demographic data that can be joined against customer names or other information, such as the (aforementioned) business unit the API belongs to and the average cost to serve a request.

As mentioned earlier, all data is collected through one logical layer, so the format of the data is known. Therefore a team of skilled data scientists can invest in building complex analyses that cover the most common use cases, for example:

Building a detailed analysis of revenue and cost contribution by different business units, APIs, business activities, different customer segments, and geographies on an ongoing basis.
Trend analysis and forecasting of incoming and outgoing money flows based on trends and historical data.
Customer journey analysis that explores how the sales pipeline converts to customers and what activities have a higher likelihood of leading to conversions.
Fraud detection based on overall activities as well as individual customers when they deviate from normal behavior
Implementing such turnkey solutions would enable companies to concentrate their resources and invest their time and knowledge in delivering the best offerings and experiences, rather than having to rediscover the analyses and build them from the scratch. Turnkey analytics won't cover all use cases. However, they can cover enough key use cases such that the analytics add recognized value from day one. As needed, teams then can build their own analytics apps on top the collected data to handle edge cases.

Finally, APIs, themselves, can trigger actions with the support of the turnkey solution. The solution and design described here can be built on top of existing analytics solutions, such as MapReduce systems, machine-learning frameworks, and stream processors.

Conclusion
API management instrumentation provides an opportunity to build turnkey API-driven analytics solutions that will minimize or even eliminate the need to coordinate multiple teams by making it possible to collect data through one logical layer and provide turnkey analytics scenarios for the organization. As a result, an analytics system that is integrated and built to work closely with API management tools can drastically reduce the cost of applying analytics and make it useful from the day one.
