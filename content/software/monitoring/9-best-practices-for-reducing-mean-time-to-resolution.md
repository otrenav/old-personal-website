+++
draft = true
+++

https://blog.newrelic.com/engineering/best-practices-mttr/

9 Best Practices for Reducing Mean Time to Resolution (MTTR)
fredric@newrelic.com' By Fredric Paul • Nov. 14th, 2018 • Software Engineering
alerts, best practices, incident response, MTTD, MTTR

+1
Tweet
Share
Share
MTTR is one of the most widely used metrics in the systems reliability toolbox, but it’s not always clear what the acronym refers to, or how IT developers and operations teams can best minimize it.

In fact, depending on whom you talk to, MTTR could be defined wide variety of ways. Its original usage, before the digital age, was all about machine maintenance: mean time to repair represented the time it took to fix a problem a user had encountered with a physical device.

In today’s software-defined world, of course, MTTR is more likely to stand for mean time to restore or mean time to resolution. Notably, however, those are not identical concepts. Mean time to restore (sometimes called mean time to recovery) is the digital equivalent of mean time to repair: how long does it take to fix the customer’s immediate complaint?

Teams use mean time to resolution, on the other hand, to measure not just the speed of a fix, but also how long it takes to complete subsequent “clean ups” or proactive steps taken to ensure they don’t hit the problem again. Then and only then is an issue considered resolved. In this post, we’ll use this more-inclusive definition of MTTR.

As we go along, we’ll further define MTTR, and we’ll delve into related metrics designed to help ensure that you’re maximizing availability for your customers and meeting your service level agreements (SLAs). And we’ll provide nine best practices for reducing MTTR—all in the context of building a robust incident-response strategy.

MTTR, a gateway metric
Obviously, you want to have a low MTTR. This means you have a quick turnaround when incidents occur. But keep in mind that MTTR is just a mean, or average, statistical value. If your incidents and their resolutions are fairly similar, then MTTR is a much more helpful metric than if you often deal with outlier incidents that vary widely in terms of the time required to resolve them. When dealing with outliers, like any average value, MTTR may not provide a representative summary of your response capabilities.

“MTTR gives you a general idea of how well your incident response processes work and how intimately your system engineers understand the systems that they maintain,” says Nicholas Valler, a lead site reliability engineer at New Relic. “But at best, MTTR is an indicator of something that you try to optimize over time.”

Surprisingly, given that it includes the word, MTTR doesn’t take time into account. At least, it doesn’t consider the difference between peak times versus quiet times. “Google calls it the ‘error budget,’ where one minute during peak hours is equal to one hour during quiet times,” explains Dan Lebrero Berna, platforms team lead for Akvo, a big data consulting firm for global sustainable organizations. “A metric like that is more useful because it tells you how many people you were unable to service, or how many queries you couldn’t return, during the time the system was down.”

“It’s a multidimensional problem,” agrees Evan Nelson, a senior software engineer at New Relic. “Any single-dimensional metric is going to be only a summarization. It’s just one particular measuring stick. So, you can’t use any one, or maybe any two or three such metrics, to totally represent things.”

So rather than focus strictly on reducing MTTR, a more relevant approach might be to ask: How can I hone my incident response process to maximize availability for customers?

Let’s address that question with some best practices.

Best practices for accelerating incident response and reducing MTTR
First, though, more context. When talking about incident response, we need to ask: What defines an incident? This is an essential question, since the moment when we discover an incident is when the incident-response clock starts to tick.

Beth Long, senior solutions marketing manager at New Relic (and a former software engineer on our Reliability Engineering team), explains that incidents are systems outages or performance problems that possess three attributes:

They’re high stakes to the business. Incidents impact customers, directly or indirectly.
They’re urgent. Incidents must be resolved immediately. Your team has to function in a different mode than when it’s doing day-to-day engineering activities. During an incident, you’re solving a problem under time pressure. That’s a critical factor.
They involve collaboration. Any significant incident requires collaboration between multiple people, often from several parts of an organization. Coordinating those people during a high-stakes, high-pressure event requires a particular kind of management response—and it’s also a task that incurs costs that you must account for in the budget.
The following nine recommendations can not only help reduce your MTTR but also make your overall response to incidents more effective.

1. Create a robust incident-management action plan
At the most basic level, you must have a clear escalation policy that explains what to do if something breaks. You need a clear plan for whom to call, how to document what’s happening, and how to set the team in motion to solve the problem. “This is table stakes when striving to reduce MTTR,” says Berna.

There are three broad types of incident-management strategies:

Ad hoc. Younger, smaller companies typically use this approach. When an incident occurs, the team figures out who knows that technology or system best, and assigns a resource to fix it. There’s not a lot of structure.
Rigid. This is the traditional information technology systems management (ITSM) approach often used by larger, more conventionally organized enterprises. IT is generally in charge of incident management in this kind of structure. Change management concerns are paramount, and teams must follow very strict procedures and protocols.
Fluid. This is the approach that more modern companies—especially companies that have undergone digital transformations—take. Responses are shaped to the specific nature of individual incidents, and they involve significant cross-functional collaboration and training to solve problems more efficiently. This approach is based on Lean principles of constant experimentation and learning, so response processes evolve continuously over time.
Long recommends the third approach. “You’re always going to experience incidents that are new and unexpected and where no one really knows what’s going on,” she says. “With those incidents, it’s really important to have as many people as possible with different understandings of the system in the same room, and to be prepared to be fluid and to evolve your processes.”

2. Define roles in your incident-management command structure
The primary role in a healthy incident-management process is that of the incident commander. This is the person responsible for directing both the engineering and communication responses (the latter of which is very important in outages that impact customers). The incident commander makes sure that the right people are aware of the issue. Incident commanders don’t dictate the technical response—that is left to the technical lead—but they act as centralized points of leadership during incidents, and they help teams to make essential tradeoffs during the response process.

Some companies assign semi-permanent incident commander roles, while other companies rotate staff members into the role. At New Relic, for example, any engineer can be an incident commander, since the first person to respond to a customer-impacting alert will typically assume that role.

Read more about New Relic’s on-call and incident response practices.

For each incident, you should also have a technical lead and a communications lead, each of whom reports to the incident commander.

In some cases, you may have more than one technical lead, depending on how many systems are impacted. The technical lead should be the subject matter expert on that particular area of the system, so they can speed the resolution and optimize a team’s MTTR performance.

The communications lead often hails from a firm’s customer support organization. This person should have a deep understanding of the impact of the outage on customers; they will relay these insights to the incident commander, who in turn will provide updates about how the resolution is progressing that the communications lead can share with affected customers.

3. Train the entire team on different roles and functions
Intensive cross-training on different incident-response roles and functions within your engineering teams can go a long way toward reducing MTTR. You’ll always have specialists on specific systems and technologies, but you don’t want to constantly overload those individuals. This can detract from their ability to do their “day jobs” and ultimately lead to burnout. Other members of the team should have enough understanding of how things work to resolve issues if they happen to be on call when an incident arises. Comprehensive “runbooks” (see best practice #6, below) can be a great resource in these situations.

Above all, you want to avoid situations where one person is the only source of knowledge for a particular system or technology. If that person goes on vacation or abruptly leaves the organization, you’ll be left high and dry. Look around your engineering organizations, assess your dependencies on specific individuals, and put redundancies in place—just as you do with your systems resources.

4. Monitor, monitor, monitor
“You can’t fix something if you don’t know what the problem is. You absolutely need visibility into your infrastructure,” says Nelson. “The more data you have available, the more likely and more quickly you’re going to be able to identify the root cause of what’s happened.”

If your database is down, and the only signal you have is that the server’s power light is off, you’ve got major problems, says Nelson. You’re not going to able to diagnose a problem very easily. You need monitoring tools in place to continuously feed you data on how your systems are performing.

“Compare that [no power light] scenario to having metrics flowing into your system in real time telling you how many queries are coming in, what the memory flow is, and how long it’s taking to respond to queries,” says Nelson. “All these things can help you formulate a theory of what exactly is causing your customer-visible impacts.”

Monitoring helps in two phases of MTTR. First, it helps you diagnose the problem. Second, it helps you answer specific operational questions while resolving the problem. By watching how the monitoring data changes as you make corrections and tinker with system components, you can quickly work your way into an effective response to an incident.

5. Carefully calibrate your alerting tools
With all of the monitoring tools available today, it’s possible to have too much information about your systems, which makes it difficult to develop a clear plan for how to use the data. This is where programmatic alerting becomes essential.

Mean time to detection (MTTD) measures how long it takes you to detect the occurrence of a customer-impacting issue in your system. The earlier you catch the problem, the sooner you can reduce your MTTR.

A practical first step is to set alerts in the form of thresholds for service level indicators (SLIs). Service level indicators are simple metrics or thresholds, which you can track with automated monitoring tools, that indicate when a serious problem might be happening or is about to happen. “You might say, ‘if throughput drops below this threshold, that indicates that something is wrong somewhere in the system,’” says Long. “Or, ‘if latency spikes for more than this amount of time, then we need to look into it.’ It’s basically ways to quantify whether your system is healthy or not.”

For example, even if team members don’t know all the intricacies of a downstream customer-facing database, they can monitor thresholds and learn that a problem may be about to occur. When a system reaches a SLI threshold, it can ping engineers to address the potential incident before customer calls and tweets start pouring in.

One big caveat is that alert thresholds must be well-tuned. “If you get alerted too often, or about things you can’t do anything about, alert fatigue sets in,” says Nelson. “You want to tune your alerts to incidents that are actionable.”

“You should always be monitoring, always recording everything,” agrees Valler. “You don’t want to be woken up in the middle of the night for every little thing.”

Don’t miss: New Relic’s guide to Effective Alerting in Practice.

6. Create runbooks
As you develop incident response procedures, and establish monitoring and alerting practices, be sure to document everything. Write everything down, and use these notes to create “runbooks”—documentation that tells on-call responders exactly what to do when a specific problem occurs.

“Runbooks are never going to be comprehensive because it’s a very complicated world out there, and you’re never going to be able to account for every scenario,” says Nelson. “But if you can account for the common scenarios, and at least give some troubleshooting steps and some suggestions on possible solutions … well, that’s a big help at 2 a.m. when you get paged and your brain is not functioning at full power.”

Use runbooks to collect all of your team’s “tribal knowledge” about a given incident-response scenario in one document. In addition to helping you reduce MTTR, runbooks are useful for training new team members, and they’re especially helpful when important members of the team leave the organization.

7. Follow up on incidents to uncover root causes
Whether you call it a postmortem, an incident retrospective, or a day-after analysis, part of reducing MTTR involves having a strong incident follow-up procedure. This is where you explore what happened, figure out how it happened, identify root causes, and strategize ways to prevent the problem from happening again.

Along with blameless retrospectives, New Relic uses a don’t-repeat-incidents (DRI) process. The DRI model compels us to stop any new work on a service involved in an incident until we fix or mitigate the root cause of the incident. “[DRI] has become a very important part of our incident response ecosystem,” says Valler. “It’s very shortsighted not to do this, because if you don’t resolve why something happened, you’re just going to have to go through the same fire drill again and again.”

If your organization is constantly in emergency mode, your people will get burned out. And that’s the last thing you want. “You need your people to arrive to each incident fresh for the fight,” says Valler.

Learn: How and Why New Relic Holds Blameless Retrospectives.

8. Practice failure through chaos engineering
Chaos engineering is the practice of attempting to randomly inject problems into your systems—in a highly controlled way, of course—so you can test how resilient your system is. “Chaos engineering helps you learn where your blind spots are, and what you need to do to make your systems more resilient,” says Berna. “You learn … where systems can be made more available or more resilient. Plus the fact that you have to practice will help you test all your incident management routines—the processes, the escalations, the policies, the monitoring and alerting. All this will reduce your MTTR.”

Chaos engineering can answer critical questions: Did a system fail in the way you expected? Were you able to fix it promptly? What did the monitoring data look like? How long did it take for the service to be available again? “Practicing failure and practicing recovering from failure is the best, most proactive way to improve your MTTR,” adds Berna.

9. Focus on the correct fix—not the fastest one
Above all, resist the urge to take shortcuts in order to reduce your MTTR. Remember: The metric is an average based upon all of your incident responses. Fixing something in a haphazard way this time could prolong the time required to fix it next time. “Yes, you will always have to make tradeoffs,” says Valler. “But you want to move into the direction of fixing a problem permanently rather than putting a temporary band aid on it.

In other words, take the time fix it right the first time.

Beyond MTTR
MTTR is important, but it’s hardly the only metric for measuring incident response. Sure, you want to minimize time to resolution, but don’t spend countless people-hours trying to optimize resolution time.

Instead, put tools in place (like New Relic) that feed you a continuous stream of real-time data—coordinated with carefully calibrated alert policies—and use those tools alongside a robust incident management process. That’s the best way to ensure you can systematically and efficiently resolve incidents as fast as possible.

alerts, best practices, incident response, MTTD, MTTR
