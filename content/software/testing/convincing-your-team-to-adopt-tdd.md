+++
draft = true
+++

https://dzone.com/articles/convincing-your-team-to-adopt-tdd?utm_medium=feed&utm_source=feedpress.me&utm_campaign=Feed:%20dzone

Convincing Your Team to Adopt TDD
Learn why your team should implement test-driven development and the best methods to train and get everyone on board.
  by Jeff Langr  ·  Nov. 23, 18 · DevOps Zone · Opinion
Like (1)
  Comment (2)
Save   Tweet  9,404 Views Can you release faster without sacrificing quality? See how with our free ebook Strategies for a Successful Test Automation Project and a free trial of Ranorex Studio today!
Test-driven development is a simpler concept than agile itself: all you need to know, technically, is its red-green-refactor cycle — write a test, watch it fail, get it to pass, clean up the design.

And yet, many developers struggle to adopt TDD. The common reasons people give are that TDD is awkward and unnatural, and some people think it is ineffective. But I don’t believe TDD is ineffective, and neither do many other “test-infected” TDD practitioners. As far as being unnatural, I’ve seen plenty of developers immediately embrace the rhythm of TDD.

I think the real challenge is with breaking ingrained habits.

Seasoned developers have survived because they’ve learned a technique for building software that works for them. They have ingrained habits about their approach to transforming a business need into code. These developers don’t need TDD. Habits are comforting friends; why would we discard them? Efforts to grow TDD in an organization can only succeed with the acknowledgment that we are breaking one palatable, long-ingrained habit and replacing it with another.

Motivations
Everyone is motivated by a set of factors, but these can vary wildly from person to person, ranging from the gratification provided by delivering a usable product to the sheer need for a paycheck.

To encourage people to accept that TDD might be a way they could work more effectively, we can help them see some of its potential benefits:

Preventing logic defects from getting integrated

Diminishing the time spent in debugging

Supporting the ability to keep the codebase well-organized and readable

Minimizing redundant amounts of code

Promoting the ability to deliver frequently and with high confidence

Providing a simple rhythm that helps developers continually and consistently make progress

Creating a body of tests that act as living documentation on intended capabilities in the code

Most developers will identify with the pains that these benefits address. For example, the inability to deliver product often is one of the larger demotivators for developers. For another example, delivered defects are extremely embarrassing and can even damage careers. Just talking about benefits won’t convince anyone, however; they have to feel it. (And then you have to help remind them as they practice TDD, when the little payoffs toward the benefits come.) Proper guidance is essential. Start small and simple: try, discuss, repeat. Use canned examples first, then continue to move incrementally closer to their daily, “real-world” challenges.

Repetition of both TDD and the messages about its goals will help the ideas stick. Eventually one of the possible benefits will resonate as a transforming idea. The light bulb will go on, enabling a much easier journey from that point. Until that light bulb goes on, however, everyone needs guidance. TDD training (whether guided or self-managed) is usually short, and two to three days isn’t enough time to convince anyone. Beyond training, programmers need a support system.

After Training
There’s no better way to ingrain a new habit than sitting with folks willing to help you. It’s far too easy otherwise to stumble back to your cube and fall into old, comfortable habits. A pair can provide great support and prevent you from backsliding. Better, a mob that’s adopted TDD will always insist on doing the right thing.

But what if you’re stuck in the lonely confines of your cube with no one to actively help? (That sounds dreadful.) Most likely, this circumstance suggests your interest in TDD is a minority viewpoint in your team, in which case you’re going to have a steep uphill battle in adopting the practice. You’ll need to find one way or another to get the quorum of your team on board with TDD. Sometimes that means helping your teammates get to the point of being test-infected, just like you are. All of the above advice applies.

Repeating the Message
Most developers new to TDD offer a quick response when asked, “Why do you want to do this?” Invariably the answer revolves around fewer defects. Personally, I don’t think that’s enough, given the cost of the investment in the first place. I believe that the above list of benefits is achievable by any team.

I’ve been at a few organizations recently where the messages echoing through the conference rooms and hallways was counterproductive. “Just get it done” is a mentality that I’ve heard upper management repeat, for example. These messages can destroy the ability for teams to succeed at TDD because they trickle down and are embraced by people who demand that work be delivered, never mind other consequences. Your management might be paying the bill for TDD education and support, but you must also find a way to get them to repeat the right messages. At least every few months, you’ll want them to remind us all why we’ve invested in working this way.

I’ve found that giving your management regular fodder can help. Collect quotes and great stories as you go. “Hey, we prevented this expensive defect” always sounds good, but so does “I love how doing TDD makes us more confident and able to regularly ship code.” Eventually, you’ll hear them tell the same stories. Market the message at your level, as well. Brown bags, competitions, randoris, stand-downs, and so on are great and enjoyable opportunities to reinforce what we’re trying to accomplish.

Scaling
I worked at an insurance company many years back. At the time I arrived, they had one successful team that had fully embraced TDD and pairing. My goal was to pair with other developers to spark interest. Eventually, some asked, “Can I get on that team doing TDD? It looks like they’re having a lot of fun.”

Over time (and continuing after I left), the test-driving team would occasionally swap in and assimilate interested parties. Meanwhile, they’d swap out their test-infected folks who were interested in helping seed new teams, each starting with a quorum of folks ready to help. The cross-pollination allowed them to gradually build up several teams. It took a while, but progress was almost guaranteed.

In fact, this steady cross-pollination approach to growing TDD across an organization is the only practical approach I’ve seen actually work. Few organizations have the money to hire enough coaches to cover several teams simultaneously. (“Enough” means you’ve covered each team with a sufficient number of coaches, or strong-willed and test-infected team members, to ensure that developers don’t backslide. And it only takes a few hours for some of us to backslide.)

In lieu of sufficient coaches, then, slow growth works. The bulk of the team must insist on sticking with TDD, then we can cross-pollinate to start growing more like-minded people. Mobbing, or at least pairing, can be the glue that makes it all really stick.

Things Not to Do
Code coverage remains a pointless number for tracking progress toward TDD adoption (it can, however, provide educational insights for you as you learn how to properly practice TDD).

Telling your team they must do TDD, or else, without helping them understand its benefits is similarly pointless. Many people will do it poorly out of spite if they can’t find the personal rewards.

Assuming we’re all smart enough to figure out TDD on our own is folly. Professionals in so many other fields are humble and wise enough to enlist coaches. Why don’t we?

TDD is a simple concept that provides a gratifying experience for many developers, yet it remains a hard pill for many others to swallow. To succeed in growing TDD, you’ll need a wide-ranged approach that touches on the myriad, very personal reasons that people do (or don’t do) things.
