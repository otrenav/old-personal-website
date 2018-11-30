+++
draft = true
+++

https://www.fastly.com/blog/7-business-uses-for-logging

Logging is too often an afterthought. Companies build systems or install a network, then slap some instrumentation on and assume the built-in logs will provide the information they need when they need it. But logging is a feature and like any other functionality, it needs thoughtful analysis and design to be effective.

To create effective logs, you first need to consider what you’re trying to achieve in capturing and maintaining logs. Logging processes should be set during the requirements and design stage and kept proportionate to the level of risk of the monitored system. If you don’t begin with a clear business goal and proactively plan your logging strategy, you take the risk that you’ll find yourself either without the data you need at a critical moment, or overloaded with extraneous information. Ultimately, either case limits the usability of your logging efforts.

Here are 7 ways you can use logs in your business:

1. Monitor and improve your security.
Security is one of the prominent reasons that organizations collect log info. For most security purposes, logs shouldn’t be collected and then simply set aside. They should both be reviewed in a timely manner to address immediate security concerns and also stored (in a secure manner of course) to allow you to identify important patterns and trends over time. “Having security logs without procedures to actively review and analyze them is of little use in the ongoing management of information security defenses,” says the PCI Security Standards Council. If security is a primary rationale for logging in your organization, you must ensure that the proper processes are in place to utilize logs.

2. Understand how your customers use your product.
Logs contain a wealth of data that can feed into analytics programs and inform your business decision making. Use the data captured in logs to track what users really do with your application, figure out what causes them to abandon transactions, and what are the most popular features. With analytics you can gain insight into what features you should add, remove, or adjust within your product to increase revenue.

3. Troubleshoot performance problems.
In addition to security, performance monitoring and troubleshooting are some of the primary purposes for generating log files. Your logs can help you determine the severity of a problem through comparing today’s data to baseline data captured in previous logs. And ongoing monitoring of logs with trend analysis can identify developing problems before they have a measurable effect on users. In the case of a problem, the information in log files can help you identify contributing factors and quickly resolve them. To really understand your application performance, you’ll need logs that capture metrics for all aspects of the system, including network, web server, database, and any other components. Logs can also help you identify an often-overlooked performance issue: underutilized systems.

4. Provide better user support.
Providing production support to users is often difficult because users can’t always describe the problem accurately or state clearly articulate the the actions they took leading up to the problem. Log files that track user clicks or capture the parameters of user requests provide an accurate and accessible picture of users’ behavior that enables a help desk team to rapidly understand the problem and resolve it.

5. Satisfy compliance mandates.
Many compliance standards and legal regulations require maintaining an audit trail showing who has accessed, modified, or deleted data. Logs can record and preserve the data required to satisfy those mandates.

6. Understand and improve your IT operations.
In coordination with analytics, log files can enable you to identify trouble spots and perform proactive maintenance on your systems. This allows you to move away from reactive troubleshooting to predicting and addressing potential issues before they cause larger problems.

7. Transfer data and integrate systems.
Jay Kreps was an engineer at LinkedIn when he wrote about how the firm uses logs. “The usefulness of the log comes from simple function that the log provides: producing a persistent, re-playable record of history,” he writes. Kreps goes further to say that well-managed logs support data integration by “making all of an organization’s data easily available in all its storage and processing systems.” Logs are a means to replicate data between nodes of an application as well as support external data feeds from the system.

For every business use for logging, remember
Regardless of how you intend to use your logs, think strategically from the start about the value you hope to extract from your logs, and build your logging program around those objectives. You should know how logs will be reviewed, how you’ll respond to alerts, and how you’ll keep the accumulation and security of logs under control.

And remember, as Marcus Ranum tells us, “Logs are just data… Processed and
analyzed, they become information. Put another way… If a tree falls on your
network and it shows up in your syslog and nobody is reading it, you’re still
squished.” You have to make the effort to use your logs to get the value out of
them.
