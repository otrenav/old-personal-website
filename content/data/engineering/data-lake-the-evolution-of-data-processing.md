+++
draft = true
+++

https://www.kdnuggets.com/2018/06/data-lake-evolution-data-processing.html

This post examines the evolution of data processing in data lakes, with a particular focus on the concepts, architecture and technology criteria behind them. KNIME Spring Summit 2019 18-22 March, Berlin.<br>Use KDNUGGETS for 10% off
KNIME Spring Summit 2019
18-22 March, Berlin.
Use KDNUGGETS for 10% off

c comments
By Nebojsa Arezina, SmartCat.

In recent years, rapid technology advancements have led to a dramatic increase in information traffic. Our mobile networks have increased coverage and data throughput. Landlines are being slowly upgraded from copper to fiber optics.

Thanks to this, more and more people are constantly online through various devices using many different services. Numerous cheap information sensing IoT devices increasingly gather data sets - aerial information, images, sound, RFID information, weather data, etc.
All this progress results in more data being shared online. Data sets have rapidly risen in both volume and complexity, and traditional data processing applications started being inadequate to deal with.

This vast volume of data has introduced new challenges in data capturing, storage, analysis, search, sharing, transfer, visualization, querying, updating, and information privacy.
Inevitably, these challenges required completely new architecture design and new technologies, which help us to store, analyze, and gain insights from these large and complex data sets.

Here I will present the Data Lake architecture, which introduces an interesting twist on storing and processing data. Data Lake is not a revolution in the big data world, a one-size-fits-all solution, but a simple evolutionary step in data processing, which naturally came to be.

Concepts
“(Data Lake is) A centralized, consolidated, persistent store of raw, un-modeled and un-transformed data from multiple sources, without an explicit predefined schema, without externally defined metadata, and without guarantees about the quality, provenance and security of the data.”

This definition shows one of the key concepts of Data Lake - it stores raw, unaltered data. Traditionally, we would try to filter and structure data before it comes into our data warehouse.

Two things emerge from this - structuring and transforming data on ingestion incurs a performance hit, and potential data loss. If we try to do complex computations on a large amount of incoming data, we will most likely have serious performance issues. If we try to structure data on ingestion, we might realize later on that we need pieces of data discarded during structuring.

The thing is, with vast and complex data, it is most likely that we won’t know what insights you can extract from it. We don’t know what value, if any, collected data will bring to our business. If we try to guess, there is a fair chance of guessing wrong.

What do we do then? We store raw data. Now, we don’t want to just throw it in there, as that will lead to a data swamp - a pool of stale data, without any information on what it represents. Data should be enriched with metadata, describing its origin, ingestion time, etc. We can also partition data on ingestion, which makes processing more efficient later on. If we don’t get the right partitioning on the first try, we’ll still have all of it, and can re-partition it without any data loss.

Ingesting data in this way leads to no quality guarantees at all, and with no access control. If we don’t really know what is in there, we can’t set up efficient security around it. All of this will come later, when data is processed. Everybody with access to Data Lake will potentially have unrestricted access to raw data.

We can introduce a trivial security system scheme, by enabling selective access to data partitions. This is a rather coarse-grained security, and it may, or may not, bring any value.

Architecture
The previous definition focused on emphasizing the core concept of Data Lake system. Let’s expand it a bit:

“Data Lake supports agile data acquisition, natural storage model for complex multi-structured data, support for efficient non-relational computation, and provision for cost-effective storage of large and noisy data-sets.”

This addition to our first definition gives us a clearer image of what Data Lake should be.

We should be able to gather data from different sources, using different protocols, to store both relational and non-relational data, and offer API for analyzing and processing. All of this should be flexible enough so it can scale both up and down.

Usually, Data Lake is separated in three layers: ingestion, caching, and processing.


Any of these layers can contain multiple technologies, with each of them offering different APIs and functionality. Every application/technology in each of these layers should be able to benefit from both horizontal and vertical scaling, and to be fault-tolerant to a degree. Each of these systems should be orchestrated using resource manager, to offer elasticity in cost, capacity and fault tolerance.

The purpose of the ingestion layer is to act as a storage layer for raw data that is incoming to Data Lake system. This layer must not force the user to apply schema to incoming data, but can offer it as an option. We might want to enrich data with metadata, so we might want to structure it a bit, after all.

Incoming data usually consists of time series, messages, or events. This data is usually gathered from sensors of Iot devices, weather stations, industrial systems, medical equipment, warehouses, social networks, media, user portals, etc.

Support for data partitioning, even though not mandatory, is highly encouraged, as we may partition ingestion data to try and improve performance when processing it.

The purpose of the caching layer is to temporarily or permanently store processed (or pre-processed) data, relational or non-relational. Data which is stored here is either ready for visualization/consumption by external systems, or is prepared for further processing.

Applications residing in the processing layer will take data from the ingestion layer, process it, structure it in some way, and store it here, optionally partitioning it in a certain manner.
It is usual to have a data set, used by downstream systems, scattered around different storage systems found inside the caching layer (relational, NoSQL, indexing engines, etc.).

The purpose of the processing layer is to offer one or more platforms for distributed processing and analysis of large data sets. It can access data stored in both the ingestion and caching layer.

Usually, technologies found here are implemented using master-worker architecture - master node analyzes data processing algorithms coded in applications which are submitted to it, creates strategy of execution, and then distributes workload over multiple worker instances, so they can execute it in parallel. With this type of architecture, the processing layer can easily be scaled to fit the needs of computational power required for specific use-case.

Technologies Criteria
Looking back at previously stated Data Lake properties, let’s define the criteria that the technology stack used to implement it needs to meet.

Scalability. Technologies need to be able to accept a vast and increasing amount of data in a performant way.
Durability. Data needs to be safely persisted, and prevention of data loss needs to be supported (by using replication, backups, or some other mechanism)
Support for ingesting unstructured (schema-less) data.
Support for efficient handling of stream-like data (time series, events/messages).
Support for data erasure, to be able to remove unneeded data, or data that is not allowed to be present, due to privacy/legal concerns.
Support for data updates.
Support for different access patterns - random access, search/query languages, bulk reads. Different downstream systems might have different requirements in accessing data, depending on their use-cases.
Conclusion
In this part, we explored the core idea behind Data Lake, its architecture, and functional requirements that it needs to satisfy.

In the next part of this series, we will examine what technologies can be used to implement a fully functional Data Lake system.

Original. Reposted with permission.
