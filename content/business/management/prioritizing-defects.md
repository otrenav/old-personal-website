+++
draft = true
+++

https://www.caktusgroup.com/blog/2018/04/30/prioritizing-defects/?utm_campaign=july2018-newsletter&utm_source=hs_email&utm_medium=email&utm_content=64418338&_hsenc=p2ANqtz-90LnBAhMppxptVQIPDzcDRiS7Nx1c3lFp0hLKhiqZKtq82iflKbNgwzh-ZznL_9wqjdelc52SVg4PwS8-2m9MMUK2aLA&_hsmi=64418338

A defect, or bug, in a software product can be defined as a flaw in the system that leads to a measurable or observable deviation from its expected result. During development, it’s part of the quality assurance process to prioritize defects in order to minimize the impact to the end product and meet the agreed-upon quality level for the product. This prioritization can seem like a dark art. How do we decide what gets addressed and what doesn’t?

Assessing the impact of a defect
We fix bugs because they have an impact on the product being built. Since resources (in the form of time, people, money, etc.) are limited, we devote them to fixing bugs that have the highest estimated impact. We can assess the estimated impact of a defect using two metrics: how much the defect may cost and how severe it is.

How much is this defect going to cost us?
A defect in a live software environment has three kinds of costs associated with it: direct costs, indirect costs, and correction costs.

Direct costs
Defects that directly impact the ability for a software product to earn money, or directly lose money, result in direct costs. A defect can result in data loss, incorrect orders, decreased user costs (or increased user costs that you later have to reimburse), or damage to software, hardware, or people.

A famous, and extreme, example of direct defect costs is the 1998 Mars Climate Orbiter mishap, where a multi-million dollar mission to Mars ended in the disintegration of the orbiter module due to a calculation error: trajectory units were calculated using imperial units rather than metric.

Indirect costs
Indirect costs are incurred when the end user is dissatisfied with the product. These costs can take the form of lower-than-expected sales, increased tech/customer support requirements, legal fees, cancellation of licenses, etc.

For example, if your software product allows the purchasing of items, but only 50% of users who start to purchase an item actually complete the transaction, there’s a significant portion of potential revenue that you are not recognizing because half your end users are giving up. Maybe there’s a bug that occurs when they edit the quantity of an item in their cart and the checkout form loses their shipping address. This seems very simple, but the indirect cost of frustration can be high.

Correction costs
The costs of fixing defects increase as you proceed through the stages of the software development life cycle (SDLC). If the project is over, you may end up paying more for developers to dive back into the code, debug, and resolve, than you would if they were actively working in the code prior to release.

Complexity also increases correction costs; the more complex a system, the more entangled a defect is likely to be in other components. This entails more debugging, unit testing, and regression testing. A live product is the most complex, thus the cost of fixing a defect is most expensive after it has gone live.

These costs may present themselves as dollar amounts, but often require time and staff resources as well. The general rule is, the earlier in the SDLC a defect is identified and corrected, the lower the cost.

How severe is the defect?
Severity is a factor used to identify how much a defect impairs product usage. There are many scales of severity, but an example is:

Severity 1 - System failure or crash, product is unreleasable (often labeled as Critical, Urgent, or Must Fix).
Severity 2 - Malfunction of a component or system, core functionality is impaired.
Severity 3 - Incorrect function of a component or system, functionality does not work as intended. Product is usable but with workarounds.
Severity 4 - Minor deviation, system is usable.
Severity 5 - Very minor deviation, system is usable.
Severity is usually set by the testing team.

Assigning priority
Now that our project manager (PM) has assessed the cost and severity of the defect, they consult two additional aspects of the project to assign priority: schedule and quality bar.

Project schedule
The status of the project schedule helps inform how urgent it is to correct the defect. Fixing bugs requires resources and it’s important to know resource availability. Project progress against the schedule can also inform what types of defects need to be addressed. In general, the closer the project is to release, the more discerning the PM needs to be about high priority defects.

Example 1: The project is a video game and the next milestone is a live demo for a specific conference. Everything included in the demo needs to be correct, so defects related to this feature set may be prioritized high. Defects that don’t apply to the demo may be prioritized as low until after the conference.

Example 2: The project is a web app that is two weeks from release. Defects that can’t be reproduced reliably, or don’t impact core functionality, or only impact a very small number of users, may be deprioritized in order to make room to fix defects that do impact core functionality and large sets of the user base.

Quality bar
If a level of quality is targeted and agreed upon by stakeholders, this quality bar can provide direction regarding priority. If the documented level of quality for a project states that all severity 1, 2, and 3 bugs occurring on a specific browser will be fixed, those bugs will get prioritized over those that occur in another browser.

Note that severity does not equal priority. Often you will see correlation between the two, but it should not be assumed that a severity 2 will be a high priority issue, or that a severity 5 will be a low priority issue. For example: a spelling error is usually a severity 5 issue, since it doesn’t affect the usage of the system. However, if the spelling error is in the product or company name, that defect is a High priority issue.

Deciding what to fix and what to defer
Priority scales generally go from high to low, with varying grades in between. Defects are usually fixed in order of priority, from high to low. In every project it becomes necessary not only to assign priority to defects, but also to call out specific defects that will be deferred or not addressed during this phase of development. Some defects aren’t worth the resources needed to correct them.

An example might be a graphics error: if you’ve played a 3D video game, you’ve no doubt encountered visuals in the environment that overlap or are placed oddly. Maybe there are two pieces of terrain that intersect incorrectly, or a plant that is floating above the ground. These are simple issues, but fixing them requires a person to edit the environment, a new build process, and a new testing pass.

Any edits to the environment, which is complex and made of many intricate pieces, has the chance to cause new defects. At some point the cost of fixing a floating plant is not worth it because the impact on the end user is negligible, the game still works, the potential to introduce more defects is too high, and assigning resources to this defect means taking resources away from fixing defects with more severe consequences.

Deciding what defects make the cut and which ones don’t is not done lightly. However, those decisions are crucial to releasing products in a timely fashion without an extreme amount of expense. Often PMs will involve stakeholders, QA, and other team members when making these decisions to ensure that all parties are accurately informed and able to give their input. Remember: bugs are part of software development.

Choosing which bugs get squashed and which bugs enter the wild is difficult, but necessary for the success of your product. Resources not absorbed by fixing the small, low-impact defects are resources that can be reallocated to delivering high quality, high value features.

If you need assistance prioritizing an overwhelming list of defects, you can reach out to our experienced project managers, QA team, and developers who can advise on best practices.
