+++
draft = true
+++

Architecting Multi-Region SaaS Solutions on AWS
Go Back
Archive
Delete
Favorite
Share
Display Options
Architecting Multi-Region SaaS Solutions on AWS
By Tod Golding, aws.amazon.comView OriginalMarch 26th, 2018
As software-as-a-service (SaaS) organizations grow and begin to extend their global reach, they must consider how their larger geographic footprint will shape and influence the architecture of their systems. Operations, deployment, agility, security, and scale all can be impacted by the move to a geographically distributed SaaS model.

This move to a multi-region model often represents a major shift for SaaS organizations. The more complexity that is added to a system’s operational and deployment profile, the more challenging it becomes to maintain the agility goals that are often associated SaaS delivery models.

This challenge of embracing the need for multi-region distribution while remaining responsive to your market is the focus of this blog post. The goal here is to explore the factors that are often behind a SaaS organization’s adoption of a multi-region strategy. With this motivation as a backdrop, we can dig into the architectural patterns and strategies that are commonly used when building, deploying, and managing multi-region SaaS environments.

Scoping the Multi-Region Problem
The topic of multi-region architecture is very broad, covering a wide range of architectural considerations that can influence many dimensions of your system’s architecture. AWS has a collection of useful resources that provide good general guidance on multi-region architecture. There are blog posts and whitepapers that look at the multi-region capabilities of individual services, networking models, and general failover patterns. A sampling of multi-region reference materials are included at the end of this post.

For the purposes of our discussion, it makes more sense to focus on the nuances and motivations associated with multi-region SaaS environments. This guidance, paired with the broader coverage of multi-region strategies, should equip you with a foundational set of considerations that can be factored into your overall multi-region strategy.

What’s Behind the Move to Multi-Region SaaS?
Before we look at multi-region architecture, let’s start by understanding the dynamics that push some SaaS providers to a multi-region model. In many cases, SaaS ISVs can address basic geographic challenges through classic, edge-based content distribution strategies. Amazon CloudFront, for example, can be used to solve the latency issues that are often associated with geographic distribution.

There is a point at which this problem moves away from static content distribution and becomes more focused on availability, performance, and regional considerations. In these cases, you must introduce new and often custom mechanisms to achieve your multi-region goals. Below is a list of the common factors that often motivate a SaaS provider’s move toward a multi-region model.

Failover: The ability to withstand regional system failures, enabling part or all of a system to effectively transition load to an alternate region.
Latency: The need to process and serve non-static data without incurring the overhead of long network hops.
Compliance: Variations in regional compliance requirements means data and services must be regionally hosted.
Failover is a fairly broad multi-region topic that is often more about adopting a disaster recovery model that can withstand regionalized application issues. In this mode, SaaS providers are often looking at ways to replicate some or all of their environment to another region. In the event of a failure, their system can gracefully redirect traffic to another region.

Failover can be implemented in a number of different models and at varying levels of granularity in your solution. The approach you choose here would be driven by the nature of your architecture and the decomposition of your system. It can also be influenced by the replication capabilities of the various tools and services you are using in your solution. Having a robust failover strategy may be of particular interest to SaaS providers where all of a region’s customers could be hosted in a single, shared infrastructure footprint. In this model, you may opt to for a cross-region model to limit the blast radius of a region-centric application issue.

Latency and compliance, on the other hand, are more common drivers of multi-region adoption by SaaS providers. For some global SaaS providers, the access patterns and general usage models for their applications make housing their solution in a single region challenging. While edge-based content can help, there are some application flows that may not be adequately covered by a content delivery network (CDN). You may have aspects of your application that are transacting data that must be served directly by one or more application services. In these cases, you may quickly reach a tipping point where it becomes natural to deploy some or all of your application directly into a region. If, for example, you were building an ad serving platform that required millisecond rendering of ads, you may find that serving content from a single region may not be adequate.

Compliance is often driven by the regional regulations that govern data privacy. Data sovereignty and General Data Protection Regulation (GDPR) requirements will often impose restrictions that can only be successfully addressed through some flavor of a multi-region strategy. Even in these scenarios, there may be an option to pick and choose those parts of your application that are subject to the regional compliance issues. In these cases, you may find yourself balancing the complexity of deploying and managing a more complex architectural footprint. Typically, in these scenarios, SaaS providers prefer to move their entire solution into a region.

The Impact of a Multi-Region Model
Now that we have a good handle on some of the common themes that can push a SaaS provider toward a multi-region model, let’s look at how the adoption of a multi-region model impacts the design, architecture, operations, and agility of your SaaS solution. The over-arching goal here is to find to a way to introduce the notion of multi-region without completely compromising the agility goals that are fundamental to most SaaS solutions.

The following sections highlight some of the key areas that require consideration as you move to a multi-region SaaS model. This is not a comprehensive list, but it does represent some of the common challenges that are confronted by SaaS organizations.

Tenant Onboarding
Providing a frictionless onboarding experience is essential to SaaS organizations. The goal here is to streamline the process of acquiring and provisioning new customer environments. Of course, if your solution is hosted in multiple regions, this can add a wrinkle to your onboarding process.

Figure 1 provides an illustration of one approach to take when onboarding tenants in a multi-region model. You’ll notice we have a group of new tenants signing up for our SaaS solution in a number of regions. In this model, the tenants provide data during the signup process that distinguishes their target region. A shared onboarding service would then be responsible for orchestrating the provisioning of the new tenants in their designated regions.


Figure 1 – A centralized onboarding model.
This model attempts to centralize the onboarding process in a single region. This simplifies and streamlines the process, but it can also present a challenge in terms of compliance. By collecting a users’ information outside each region, it’s likely you will violate the sovereignty requirements of a given region. However, if you are not facing compliance issues, then you could find the approach appealing.

The alternative to this strategy is to decentralize some aspects of your onboarding process. Figure 2 represents an alternated approach to this problem that distributes the onboarding process to each region.


Figure 2 – A decentralized onboarding model.
The basic difference is that the onboarding experience is now hosted in each region, allowing you to ensure any data collected about the tenant is managed within the scope of the region. The main challenge of this model is determining how tenants will be redirected to each regional onboarding experience. In this case, we introduced a landing/routing page that allows users to opt into the region of their choosing. This is just one option, and each solution may take a different approach to landing their tenants in the correct region. They key takeaway is that the actual onboarding and collection of a tenant’s data is localized to a region.

In this more distributed model, you do add some complexity to your deployment model and lose the ability to manage and deploy a centralized experience. Still, if you are deploying into regions with GDPR or general data sovereignty requirements, this is often your only option.

Multi-Region Identity
Once you’ve successfully onboarded a tenant, you still have to decide how your multi-region environment will support authentication. While it would be nice to have a centralized model identity provider for all of your users, the centralization of this data does not align with any of the fundamental data sovereignty requirements that govern the management of personal information.

With this in mind, your approach to identity should focus on the tenant experience and the introduction of a mechanism that can effectively route your identity management to each region. In many respects, the challenges outlined here overlap with the onboarding discussion above. Now, however, you must have a non-invasive model for routing users to a region-centric authentication experience.

Ideally, you would like this to be a relatively seamless experience for your tenants where the routing to a given region is mostly transparent. One common approach to resolving this is to embed tenant context in the URL of your application. Figure 3 provides a sample of what this might look like in practice.

Figure 3 – Using URLs to route tenant authentication.

With this model, each tenant is assigned a unique URL that was provisioned as part of their onboarding experience. In this example, we have created subdomains that prepend the tenant scope to the application’s URL. This subdomain uses traditional DNS routing (shown as Amazon Route 53 in Figure 3) to direct each tenant to the appropriate region.

Once you are routed to the appropriate region, your SaaS solution relies on a regionally hosted identity provider to manage and authenticate users of your system. In this case, we’ve shown Amazon Cognito as the identity provider for each region.

While this model adds a configuration element and more moving parts to your tenant provisioning process, it also yields a much more intuitive experience for end users. It’s also important to note the tenant identifier that was prepended to the subdomain should never map directly to any internal representation you might have of your actual tenant identifier. Instead, this surfaces as a unique subdomain that only serves the purpose of routing users to their regions.

There are some scenarios where your application may need to rely on the tenant to select a target region or environment before they can authenticate. This shows up in cases where a user may have the option to have accounts in multiple regions. In these cases, surfacing the region as part of the authentication experience may be unavoidable.

For some solutions, you may be required to support identity portability where a user wants to move their existing identity from one region to another. This, too, may require additional workflows in your user management system to enable transfers of this nature. It also has the potential to challenge compliance regulations.

Management and Monitoring
Even as you distribute customer environments to individual regions, you’d still prefer to have a centralized model for managing and monitoring the overall health of tenants. In fact, as you move to a more distributed multi-region model, the need for robust operational tooling becomes more pronounced. The key is to put in place a mechanism that efficiently scales your operational footprint, allowing you to observe the regional and global health of your SaaS environments through a centralized experience.

There are a number of different approaches that can be taken to centrally aggregate the data from each of your regions. The model you choose will be driven by the stack and tooling that best fits your application. Some solutions, for example, capture data locally then replicates it across regions. Others might stream log data directly to some centralized repository.

Fortunately, the APN Partner community includes a number of different solutions in the management monitoring domain that can simplify your path to multi-region monitoring. Sumologic, New Relic, Datadog, and Dynatrace are among the rich collection of monitoring Partner solutions you may want to consider. Each of these products has its own model for capturing and analyzing multi-region environments.

AWS also has networking constructs that can be useful in building out your management environment. Cross-region VPC peering, for example, is used by some organizations to manage distributed environments. This can add security to your management footprint and may simplify the automation and deployment experience. As you might suspect, you will need to factor GDPR into your monitoring strategy. In some cases, you may need to ensure the data you’re logging is completely sanitized and complies with the requirements outlined in GDPR regulations.

Deployment Automation
Agility is one of the driving forces behind the adoption of a SaaS delivery model. However, as you move to a multi-region footprint, this has the potential to add complexity to your environment and undermine agility goals. Deployment, for example, becomes a much more involved process as you consider the automation and DevOps pipeline implications associated with releasing your product in multiple regions.

The key to maintaining agility in a multi-region model is to limit the amount of variation that is introduced for each deployment. This is really just an extension of core DevOps tenets with additional emphasis on creating automated, repeatable deployment processes that manage all aspects of configuration through code.

Figure 4 provides a conceptual view of a multi-region pipeline. The goal here is to view each regional deployment as a clone of the environment that might have originally been hosted in a single region. As you move to a multi-region model, the pipeline must deploy each change (in this case, each microservice) to the target region with the hope that the service requires minimal region-specific changes. Ultimately, the more universal your footprint across all regions, the more likely you’ll be able to release new features without feeling the multi-region model is hindering your agility.

Figure 4 – Multi-region deployment authentication.

While our goal here is to minimize variation, it’s also possible that some region-specific requirements could add new elements to your pipeline. It would not be uncommon, for example, to see downstream steps added to your pipeline in each region responsible for performing compliance validation. There may nuances based on AWS service variations that could introduce regional configuration and deployment variations, but the goal would still be to view these as extensions of your overall pipeline.

Billing
Like management and monitoring, billing is a service that should be implemented using a centralized model. Ultimately, you’d like to have one experience that manages SaaS customer accounts, policies, and billing activity. The idea is that metering and activity data needed to generate a SaaS bill should be published from each region to a centralized system that is responsible for aggregating the information and generating a bill. This same system would be responsible for pushing updates to customers’ status, policies, and configuration to each region.

Of course, while this is the preferred state, it is also complicated by compliance and regulations. In situations where you face sovereignty or GDPR requirements, you need to build a more decentralized billing model that prevents customer information from leaving a region. So, while the mechanics of billing would be the same across all regions, you would still be required to have each region generate its own bill. This obviously adds complexity and inefficiency to your billing process but may be unavoidable.

Multi-Region or Multi-Availability Zone
The move to a multi-region model often represents a natural progression for SaaS organizations that face regionalized latency and compliance hurdles. However, when multi-region is adopted purely as a failover strategy, the discussion gets more complicated. In some instances, you may find that a multi-Availability Zone approach will satisfy the failover requirements of your solution without requiring you to absorb the added overhead of a multi-region model.

Ultimately, this comes down to having a firm handle on the factors driving your need for multi-region adoption. As you look at your options, weigh the impact these choices will have on the overall complexity and agility of your solution.

Making the Move
The move to a multi-region model is no trivial undertaking. As you can see from the items covered above, there are a number of factors to consider when thinking about how to deliver SaaS solutions in a multi-region environment. Onboarding, identity, operations—all of these areas require specific architectural strategies that address the requirements imposed by a multi-region model. In making this transition, you must remain focused on creating a seamless experience for customers.

Multi-region environments also have the potential to impact the agility of your organization. It is essential that your multi-region approach places an even higher premium on your ability to automate and manage your solution to ensure you can continue to release features and functionality at a rapid pace.

Additional Resources and Next Steps
About AWS SaaS Factory
AWS SaaS Factory provides AWS Partner Network (APN) Partners with resources that help accelerate and guide their adoption of a SaaS delivery model. SaaS Factory includes reference architectures for building SaaS solutions on AWS; Quick Starts that automate deployments for key workloads on AWS; and exclusive training opportunities for building a SaaS business on AWS. APN Technology Partners who develop SaaS Solutions are encouraged to join the program!

Learn more about AWS SaaS Factory >>

Share Excerpt
