+++
draft = true
+++

https://anaxi.com/blog/2018/11/25/do-not-measure-developers-measure-projects/

Do NOT Measure Developers – Measure Projects
	By John Lafleur 9 minutes read
Share on FacebookTweet about this on TwitterShare on LinkedInShare on Reddit

Have you ever heard about teams being managed through metrics, like bug close rate or lines of code produced per week? And the poorest performers according to those metrics would be let go. What happens next? The team will only focus on the meaningless easy-to-fix bugs to “juke the stats“! And in the end, the product quality becomes worse, not better, and maybe some valuable developers will have left. No wonder developers don’t trust productivity metrics. “I have seriously never seen metrics used that were not dysfunctional.”

In this article, I would like to debunk software development productivity metric myths. We’ll have a look at the list of:

the metrics you should only use with caution – that means they might be interesting in specific conditions and when used in a certain way;
the ones that are really useful and that you should introduce within your team, whether you’re a contributor, lead or manager.

Ok, let’s do this!

Metrics You Should Use VERY Carefully
1) Ticket close rate – for individual performance
If you don’t include story points or some equivalent, this might be the most misleading metric you could use. Using this metric assumes that all tickets have approximately the same amount of work, and that is just not true. You should never use this metric to evaluate the individual performance of developers. A developer could fix one bug that nobody managed to solve, one that is impacting every aspect of your product’s performances, and it could take him or her a full week. While another developer could fix 20 detailed bugs in the meantime. Which one had the most impact on your team and company?

Even if you have story points, in the best case in the above scenario, the bug would have a story point of 5, or the 20 bugs would have a story point of 1 each. And that is without considering that most teams don’t use points for bugs, only for features.

That being said, you could use this metric to identify issues like a developer being stuck on a specific task. The point is NOT to use it as a way to evaluate the developer’s performance, or your team will just game the metrics without producing any meaningful work. Use this metric only as a way to understand how you as the manager can better help your team.

2) Lines of code (LoC) produced – for individual performance
In the same example above, the huge bug fix could be a change of one line of code. How can you compare that to a developer who imported a library or changed every header of every file? You cannot. And similarly, you should never use this metric to evaluate individual performances of developers. You can use LoC in the same way – to understand when your team is having difficulties, or maybe importing too many libraries for the sake of the quality of the project!

Some people compute an “Impact” metric, based on the amount of code in the changes, the severity of those changes and the number of files that the changes affected. The overall goal is to be an improvement on the LoC. This is interesting, but I would strongly advise not to use them for individual performance evaluations. Indeed, the one-line bug fix example mentioned above still doesn’t work, as many other real-life examples show.

3) Code churn vs Code throughput
There are many different definitions of what code churn is. It’s typically measured as the percentage of a developer’s own code representing an edit to their own recent work. A sudden increase in churn rate may indicate that a developer is experiencing difficulty in solving a particular problem.

Some people consider code churn as non-productive work and not within the “code throughput,” and this is where the danger lies. Indeed, the code churn may indicate that the developer is optimizing a part of the code for better performance. Or that the product team is just indecisive and has the developers running in circles. The rule is to monitor any big changes to identify potential issues that the developers might meet, in order to help the team faster.

Can you use any metrics for individual performances?
Well, now that you (well…I) raise the question: No! Yup, you can quote me on this.
Metrics are subjective and informational. You can’t make any judgment on individual performances based on metrics. They only help you make inquiries to better understand the intricacies of the project. CLICK TO TWEET

The reality is that management is hard and always contextual. You need to dig deeper to understand the root causes of issues. Sometimes you will find that, indeed, a developer is actually a poor performer, but it’s because you made the effort to know your team and understand how they work together that you can identify if there is one member dragging it down. This is how you become a better manager who works towards better productivity and retention within your team.

And, if you have that top of mind, you might properly use the first 3 types of metrics mentioned above. You’ll also be on your way to using more useful metrics that will help you have a really good understanding of your team’s workflow velocity and quality.

Metrics That You Should Absolutely Use
I will list these metrics in 2 different categories: velocity and quality. Let me know if I forgot any; I would be happy to update the article.

Velocity-Related Metrics
These metrics are the most controversial ones, because so many people (including me) learned to hate agile story points. But here are alternatives that I hope will make you think twice that you shouldn’t measure “velocity.”

4) Commit frequency
This metric is interesting if you want to introduce a best practice to commit every day. It’s also a great way to see the hidden costs of interruptions. Non-coding tasks such as planning, meetings, and chasing down specs are inevitable. Teams often lose at least one day each week to these activities. Monitoring the commit frequency enables you to see which meetings have an impact on your team’s ability to push code.

Managers should strive to protect their team’s attention and ensure process-overhead does not become a burden.

5) Service Level Agreement (SLA)
Every team has its own definition of SLA. But here is the one that Airbnb uses and that I personally find very interesting. The SLA is the % of blocker bugs that your team fixed and deployed within a certain time (e.g., 24 hours for blocker bugs and 5 days for critical bugs). What I really like about this metric is that it gives you a great understanding of your product quality from a user’s standpoint.

Note that this metric is velocity related in my mind, as it shows your team’s velocity and not the quality of the software produced.

6) Pull requests-related velocity

the number of pull requests opened per week
the number of pull requests merged per week
the number of production deploys per week
the average time-to-merge (or % of Pull Requests (PRs) merged under a certain threshold). This is somewhat equivalent to the “Commit-to-Deploy Time” (time it takes for the code to go from committing to deploy: in between, it could go through testing, QA, and staging, depending on your organization). It’s a very interesting metric that shows you what roadblocks you’re encountering in your workflow.
These metrics could give you a sense of the constant throughput of your engineering team. For instance, if that number doesn’t grow when you hire more people, there might be a problem related to a new process in place or a technical debt that needs to be addressed. However, if it increases too quickly you might have a quality issue.

Don’t forget that measuring the speed of a team without evaluating the quality of the work can be very misleading and is extremely dangerous.

Quality-Related Metrics
Quality isn’t a goal in itself. The confidence in being able to grow and change behaviors in a safe manner is what matters.

7) Test coverage ratio
You don’t need 100% coverage, for sure. However, knowing where you stand and keeping track of it helps to see if you are trading velocity for quality.

8) Pull request quality
Pull requests can give you great visibility on the overall complexity of the code base. The more complex the code base is, the higher the chances the following metrics will be high:

the % of times pull requests break the build or fail to pass the test suite;
the % of merged vs rejected pull requests;
the number of comments by pull request – you don’t want a number that’s too low, but you also don’t want a number that is too high.
9) Number of bugs in the project
The number of bugs will, in general, start increasing in the middle of a project’s lifecycle. A few days or weeks (depending on the size of the project) before the deadline, the team will focus on reducing the number of the bugs, until the number of bugs reaches a kind of asymptote. This asymptote is eventually representative of the overall quality of the project’s product. So tracking the overall number of bugs (distinguishing their priorities) is a good indicator.

Another metric could be the number of found bugs, or bug fixes versus features shipped, on a weekly or monthly basis. It should indicate the quality level of the implementation.

10) Age of dependencies
Another indicator of the technical debt is how outdated the dependencies used in your code base are. It could be interesting to track this.

Technical debt is normal and will be present in every project, and the notion of quality is subjective. Use of metrics such as the ones I have discussed in this article can help you define a set of criteria with your team that will help you gain some perspective on the quality of the team’s work.

—

The main point of this article is that if you measure metrics at the project or team level, your developers won’t game the metrics. As @raffi said, “You can’t game what you don’t measure.” And gaming metrics is always superficial.

Please let me know if you don’t agree on any of the metrics I listed, or if I missed any. Let’s consider this article as a starting point for a conversation.
