+++
draft = true
+++

https://blog.cleancoder.com/uncle-bob/2013/02/10/ThePrinciplesOfCraftsmanship.html

At 8th Light, we are principled. These are things that we will and will not do. Each principle ties to a specific value in the Manifesto for Software Craftsmanship

###Well-Crafted Software

We humbly demonstrate our expertise by delivering quality software.
We do not inflate our abilities or claim expertise where we have none.
We continually master a variety of technologies and techniques.
We do not let unfamiliarity dissuade us from using the best tools.
We take responsibility for the correctness of our code by testing it thoroughly.
We do not tolerate preventable defects.
###Steadily Adding Value

We estimate with diligence.
We do not let fear or pressure make us promise what we can’t deliver.
We always apply our best efforts to complete our work.
We do not make excuses.
We work at a sustainable pace.
We do not burn out.
###A Community of Professionals

We embrace differences of opinion and personality.
We do not allow our current practice to impede improvement.
We prefer open source tools that we can inspect, evaluate, and improve.
We avoid proprietary products that lack transparency.
We teach anyone with a willingness to learn.
We do not hoard our knowledge or practices.
###Productive Partnerships

We show respect for our customers and fellow craftsmen.
We do not act unprofessionally or unethically.
We communicate our progress honestly and openly with our customers.
We do not conceal or embellish.
We partner with our customers to understand their business.
We do not propose solutions until we are sure we have found the right problem.

http://blogs.tedneward.com/post/craftsmanship-by-another-name/

"Craftsmanship", by another name
Posted on Apr 5, 2013 #Development Processes #Industry #Languages #Reading #Social
This blog, talking about the "1/10" developer as a sort of factored replacement for the "x10" developer, caught my eye over Twitter. Frankly, I'm not sure what to say about it, but there's a part of me that says I need to say something.

I don't like the terminology "1/10 developer". As the commenters on the author's blog suggest, it implies a denigration of the individual in question. I don't think that was the author's intent, but intentions don't matter--results do. You're still suggesting that this guy is effectively worthless, even if your intent is to say that his programming skills aren't great.

Some programmers shouldn't be. It's hard to say it, but yes, there are going to be some programmers at either end of the bell curve. (Assuming that skill in programming is a bell curve, and some have suggested that it's not, which is its own fascinating discussion, but for another day.) That means that some of the people writing code with you or for you are not going to be from the end you'd hope them to be from. That doesn't necessarily mean they should all immediately retire and take up farming.

Be careful how you measure. The author assumed that because this programmer wasn't able to churn out code at the same rate that the author himself could, the programmer in question was therefore one of these "1/10" programmers. Hubris is a dangerous thing in a CTO, even a temporary one--assuming that you could write it in "like, 2 hours, tops" is a dangerous, dangerous path. Every programmer I've ever known has looked at a feature or a story, thought, "Oh, that should only take me, like, 2 hours, tops" and then discovered later, to his/her chagrin, that there's a lot more involved in that than first considered. It's very possible the author/CTO is a wunderkind programmer who could do everything he talked about in, like, 1 or 2 hours, tops. It's also very possible that this author/CTO misunderstood the problem (which he never once seems to consider).

The teacher isn't finished teaching until the student learns. From the sound of the blog post, it doesn't sound like the author/CTO was really putting that much of an effort into teaching the programmer, but just "leading him step by step" to the solution. Give a man a fish... teach a man to fish.... Not all wunderkind programmer/author/CTOs are great teachers.

Some students just don't learn very well. The sword of teaching swings both ways, though: sometimes, some teachers just can't reach some students. It sucks, but it's life.

This programmer was a PhD candidate? The programmer in question, by the way, was (according to the blog) studying for a PhD at the time. And couldn't grasp MVC? Something is off here. I believe it, on the surface of it, because I worked with a guy who had graduated university with a PhD, and couldn't understand C++ and MFC to save his life, and got fired (and I inherited his project, which was a mess, to be blunt), but he'd spent all his time in university studying artificial intelligence, and had written it all using straight C code because that's what the libraries and platform he was using for his research demanded. I don't think he was a "1/10" developer, I think he was woefully mis-placed. Would you like an offensive lineman and put him as a slot receiver? Would you take a catcher and put him at pitcher? Would you take a Marketing guy and put him on server support? We need to stop thinking that all programmers are skilled alike--this is probably creating more problems than we really realize. Sure, on the whole, it sounds great that "craftsmen" should be able to pick up any tool and be just as effective with that tool as they are with any other--just like a drywaller can pick up a wrench and be just as effective a plumber, and pick up a circuit breaker and be just as effective an electrician. Right?

In the end reckoning, I don't think the "1/10" vs "10x" designation really does a whole lot--I have a hard time caring where the decimal point goes in this particular home-spun tale of metrics. And I'll even give the author the benefit of the doubt and assume the programmer he had was, in fact, from the lower end of the bell curve, and just wasn't capable of putting together the necessary abstractions in his head to get from point "A" to point "B", figuratively and literally.

But to draw this conclusion from a data point of one person? Seems a little sketchy, to me.

Software development, once again, thy name is hubris.

http://blogs.tedneward.com/post/more-on-craftsmanship/

More on "Craftsmanship"
Posted on Jan 25, 2013 #Development Processes #Industry #Languages #Reading #Social #C# #C++ #F# #Ruby #Scala #.NET #Java/J2EE #Parrot #Windows
TL;DR: To all those who dissented, you're right, but you're wrong. Craftsmanship is a noble meme, when it's something that somebody holds as a personal goal, but it's often coming across as a way to beat up and denigrate on others who don't choose to invest significant time and energy into programming. The Zen Masters didn't walk around the countryside, proclaiming "I am a Zen Master!"

Wow. Apparently I touched a nerve.

It's been 48 hours since I posted On the Dark Side of 'Craftsmanship', and it's gotten a ton of interest, as well as a few syndicated re-posts (DZone and a few others). Comments to the blog included a response from Dave Thomas, other blog posts have been brought to my attention, and Twitter was on FIRE with people pinging me with their thoughts, which turn out to be across the spectrum, approving and dissenting. Not at all what I really expected to happen, to be honest--I kinda thought it would get lost in the noise of others commenting around the whole thing.

But for whatever reason, it's gotten a lot of attention, so I feel a certain responsibility to respond and explain to some of the dissenters who've responded. Not to defend, per se, but to at least demonstrate some recognition and attempt to clarify my position where I think it's gotten mis-heard. (To those who approved of the message, thank you for your support, and I'm happy to have vocalized something you felt unable, unwilling, unheard, or too busy to vocalize yourself. I hope my explanations here continue to represent your opinions, but if not, please feel free to let me know.)

A lot of the opinions centered around a few core ideas, it seems, so let me try and respond to those first.

You're confusing "craftsmanship" with a few people behaving badly. That may well be, but those who behaved badly included at least one who holds himself up as a leader of the craftsman movement and has held his actions up as indications of how "craftsmen" should behave. When you do this, you invite this kind of criticism and association. So if the movement is being given a black eye because of the actions of a single individual, well, now you know how a bunch of moderate Republicans feel about Paul Ryan.

Corey is a nice guy, he apologized, don't crucify him. Of course he is. Corey is a nice guy--and, speaking well to his character, he apologized almost immediately when it all broke. I learned a long time ago that "true sorry" means you (a) apologize for your actions, (b) seek to remedy the damage your actions have caused ("make it right", in other words), and (c) avoid making the same mistake in the future. From a distance, it seems like he feels contrition, and has publicly apologized for his actions. I would hope he's reached out to Heather directly to try and make things right with her, but that's between the two of them. Whether he avoids this kind of activity in the future remains to be seen. I think he will, but that's because I think he's learned a harsh lesson about being in the spotlight--it tends to be a harsh place to be. The rest of this really isn't about Corey and Heather anymore, so as far as I'm concerned, that thread complete.

You misunderstand the nature of "craftsmanship". Actually, no, I don't. At its heart, the original intent of "craftsmanship" was a constant striving to be better about what you do, and taking pride in the things that you do. It's related to the Japanese code of the samurai (kaizen) that says, in essence, that we are constantly striving to get better. The samurai sought to become better swordsmen, constantly challenging each other to prove the mettle against one another, improving their skills and, conditioning, but also their honor, by how they treated each other, their lord, their servants, and those they sought to protect. Kanban is a wonderful code, and one I have tried to live my entire life, even before I'd discovered it. Please don't assume that I misunderstand the teachings of your movement just because I don't go to the meetings.

Why you pick on "craftsmanship", anyway? If I want to take pride in what I do, what difference does it make? This is me paraphrasing on much of the dissent, and my response boils down to two basic thoughts:

If you think your movement is "just about yourself", why invent a label to differentiate yourself from the rest?
If you invent a label, it becomes almost automatic to draw a line between "us" and "them", and that in of itself almost automatically leads to "us vs them" behavior and mentality.
Look, I view this whole thing as kind of like religion: whatever you want to do behind closed doors, that's your business. But when you start waving it in other peoples' faces, then I have a problem with it. You want to spend time on the weekends improving your skills, go for it. You want to spend time at night learning a bunch of programming languages so you can improve your code and your ability to design systems, go for it. You want to study psychology and philosophy so you can understand other people better when it comes time to interact with them, go for it. And hey, you want to put some code up somewhere so people can point to it and help you get it better, go for it. But when you start waving all that time and dedication in my face, you're either doing it because you want recognition, or you want to suggest that I'm somehow not as good as you. Live the virtuous life, don't brag about it.
There were some specific blogs and comments that I think deserve discusson, too:

Dave Thomas was kind enough to comment on my blog:

I remember the farmer comment :) I think I said 30%, but I stand by what I said. And it isn't really an elitist stance. Instead, I feel that programming is hard work. At the end of a day of coding, I'm tired. And so I believe that if you are asking someone to do programming, then it is in both your and their interest that they are doing something they enjoy. Because if they don't enjoy it, then they are truly just a laborer, working hard at something that has no meaning to them. And as you spend 8 hours a day, 5 days a week doing it, that seems like an awful waste of an intelligent person's life.
Sure, programming is hard. So is house painting. They're different kinds of exhaustion, but it's exhaustion all the same. But, frankly, if somebody has chosen to take up a job that they do just because it's a job, that's their choice, and not ours to criticize, in my opinion. (And I remember it as 50%, because I very clearly remember saying the "way to insult half the room" crack after it, but maybe I misheard you. I do know others also heard it at 50%, because an attendee or two came up to talk about it after the panel. At least, that's how I remember it at the time. But the number itself is kinda meaningless, now that I think about it.)
The farming quote was a deliberate attempt at being shocking to make a point. But I still think it is valid. I'd guess that 30% of the developers I meet are not happy in their work. And I think those folks would be happier and more fulfilled doing something else that gave them more satisfaction.
Again, you and I are both in agreement, that people should be doing what they love, but that's a personal judgment that each person is permitted to make for themselves. There are aspects of our lives that we don't love, but we do because they make other people happy (Juliet and Charlotte driving the boys around to their various activities comes to mind, for example), and it is not our position to judge how others choose for themselves, IMHO.
No one should have to be a laborer.
And here, you and I will disagree quite fundamentally: as I believe it was Martin Luther King, Jr, who said, "If you are going to be a janitor, be the best janitor you know how to be." It seems by that statement that you are saying that people who labor with their bodies rather than your minds (and trust me, you may not be a laborer anymore, big publishing magnate that you are, but I know I sure still am) are somehow less well-off than those who have other people working for them. Some people don't want the responsibility of being the boss, or the owner. See the story of the mexican fisherman at the end of this blog.
Nate commented:

You have a logical fallacy by lumping together the people that derided Heather's code and people that are involved in software craftmanship. It's actually a huge leap of logic to make that connection, and it really retracts from the article.
As I point out later, the people who derided Heather's code were some of the same folks who hold up software craftsmanship. That wasn't me making that up.
Now you realise that you are planting your flag firmly in the 'craftmanship' camp while propelling your position upwards by drawing a line in the sand to define another group of people as 'labourers'. Or in other words attempt to elevate yourself by patronising others with the position you think you are paying them a compliment. Maybe you do not realise this?
No, I realize it, and it's a fair critique, which is why I don't label myself as a "craftsman". I have more to say on this below.
However, have you considered that the craft is not how awesome and perfect you and your code are, but what is applicable for the task at hand. I think most people who you would put into either camp share the same mix of attributes whether good or bad. The important thing is if the solution created does what it is designed to do, is delivered on time for when it is needed and if the environment that the solution has been created for warrants it, that the code is easily understandable by yourself and others (that matter) so it can be developed further over time and maintained.
And the very people who call themselves "craftsmen" criticized a piece of code that, as near as I can tell, met all of those criteria. Hence my reaction that started this whole thing.
I don't wish to judge you, and maybe you are a great, smart guy who does good in the world, but like you I have not researched anything about you, I have simply read your assessment above and come to a conclusion, that's being human I guess.
Oh, people judge each other all the time, and it's high time we stopped beating them up for it. It's human to judge. And while it would be politically correct to say, "You shouldn't judge me before you know me", fact is, of course you're going to do exactly that, because you don't have time to get to know me. And the fact that you don't know me except but through the blog is totally acceptable--you shouldn't have to research me in order to have an opinion. So we're all square on that point. (As to whether I'm a great smart guy who does good in the world, well, that's for others to judge in my opinion, not mine.)
The above just sounds like more of the same 'elitism' that has been ripe in this world from playground to the workplace since the beginning.
It does, doesn't it? And hopefully I clarify the position more clearly later.
In It's OK to love your job, Chad McCallum says that

The basic premise (or at least the one the author start out with) is that because there’s a self-declared group of “software craftspeople”, there is going to be an egotistical divide between those who “get it” and those who don’t.
Like it or not, Chad, that egotistical divide is there. You can "call bullshit" all day long, but look at the reactions that have popped up over this--people feel that divide, and frankly, it's one that's been there for a long, long time. This isn't just me making this up.
Chad also says,

It’s true the feedback that Heather got was unnecessarily negative. And that it came from people who are probably considered “software craftspeople”. That said, correlation doesn’t equal causation. I’m guessing the negative feedback was more because those original offenders had a bad day and needed to vent. And maybe the comments after that one just jumped on the bandwagon because someone with lots of followers and/or respect said it.

These are both things that can and have happened to anyone, regardless of the industry they work in. It’s extremely unfair to associate “someone who’s passionate about software development” to “person who’s waiting to jump on you for your mistakes”.

Unfortunately, Chad, the excuse that "others do it, too" is not an acceptable excuse. If everybody jumped off a cliff, would you do it, too? I understand the rationale--it's extremely hard being the one to go against the herd (I've got the psychological studies I can cite at you that prove it), but that doesn't make it OK or excuse it. Saying "it happens in other industries" is just an extension of that. In other industries, women are still explicitly discriminated against--does that make it OK for us to do that, too?
Chad closes his blog with "Stop calling us egotistical jerks just because we love what we do." To which I respond, "I am happy to do so, as soon as those 'craftsmen' who are acting like one, stop acting like one." If you're not acting like one, then there should be no argument here. If you're trying to tell me that your label is somehow immune to criticism, then I think we just have to agree to disagree.

Paul Pagel (on a site devoted to software craftsmanship, no less) responded as well with his Humble Pursuit of Mastery. He opens with:

I have been reading on blogs and tweets the sentiment that "software craftsmanship is elitism". This perception is formed around comments of code, process, or techniques. I understand a craftsman's earned sense of pride in their work can sometimes be inappropriately communicated.
I don't think I commented on code, process or technique, so I can't be sure if this is directly refuting what I'm saying, but I note that Paul has already touched on the meme he wants to communicate in his last phrase: the craftsman's "earned sense of pride". I have no problem with the work being something that you take pride in; I note, however, that "pride goeth before a fall", and note that, again, Ozymandias was justifiably proud of his accomplishments, too.
Paul then goes through a summation of his career, making sure to smallcaps certain terms with which I have no argument: "sacrifice", "listen", "practicing", "critique" and "teaching". And, in all honesty, these are things that I embrace, as well. But I start getting a little dubious about the sanctity of your terminology, Paul, when it's being used pretty blatantly as an advertising slogan and theme all over the site--if you want the term to remain a Zen-like pursuit, then you need to keep the commercialism out of it, in my opinion, or you invite the kind of criticism that's coming here (explicit or implicit).

Paul's conclusion wraps up with:

Do sacrificing, listening, practice, critiquing, and teaching sound like elitist qualities to you? Software craftsmanship starts out as a humble endeavor moving towards mastery. I won't let 140 or 1000 characters redefine the hours and years spent working hard to become a craftsman. It gave me humility and the confidence to be a professional software developer. Sometimes I let confidence get the better of me, but I know when that happens I am not honoring the spirit of craftsmanship which I was trained.
Humility enough to trademark your phrase "Software is our craft"? Humility enough to call yourself a "driving force" behind software craftsmanship? Don't get me wrong, Paul, there is a certain amount of commercialism that any consultant must adopt in order to survive--but either please don't mix your life-guiding principles with your commercialism, or else don't be surprised when others take aim at your "humility" when you do. It's the same when ministers stand in a multi-million dollar building on a Sunday morning and talk about the parable of the widow giving away her last two coppers--that smacks of hypocrisy.
Finally, Matt van Horn wrote in Crafsmanship, a rebuttal that:

there is an allusion to software craftsmen as being an exclusive group who agre on the “right” tools and techniques. This could not be further from the truth. Anyone who is serious about their craft knows that for every job there are some tools that are better and some that are worse.
... but then he goes right into making that exact mistake:
Now, I may not have a good definition of elegant code, but I definitely know it when I see it – regardless of who wrote it. If you can’t see that
(1..10).each{|i| puts i}

is more elegant than
x = 0
while true do
  x = x + 1
  if x > 10
    break
  end
  puts x
end
then you must near the beginning of your journey towards mastery. Practicing your craft develops your ability to recognize these differences, just as a skilled tailor can more easily spot the difference between a bespoke suit and something from Men’s Wearhouse.
Matt, you kind of make my point for me. What makes it elegant? You take it as self-evident. I don't. As a matter of fact, I've been asking this question for some years now, "What makes code 'elegant', as opposed to 'ugly'? Ironically, Elliott Rusty Harold just blogged about how this style of coding is dangerous in Java, and got crucified for it, but he has the point that functional style (your first example) doesn't JIT as well as the more imperative style right now on the JVM (or on the CLR, from what I can tell). Are you assuming that this will be running on a native Ruby implementation, on JRuby, IronRuby, ...? You have judged the code in the second example based on an intrinsic value system that you may have never questioned. To judge, you have to be able to explain your judgments in terms of the value system. And the fact that you judge without any context, kind of speaks directly to the point I was trying to make: "craftsmen", it seems, have this tendency to judge in absence of context, because they are clearly "further down their journey towards mastery", to use your own metaphor.
Or, to put it much more succinctly, "Beauty is in the eye of the beholder".

Matt then tells me I missed the point of the samurai and tea master story:

inally, he closes with a famous zen story, but he entirely misses the point of it. The story concerns a tea master, and a samurai, who get into a duel. The tea master prevails by bringing the same concentration to the duel that he brings to his tea ceremony. The point that Ted seems to miss here is that the tea master is a craftsman of the highest order. A master of cha-do (the way of tea) is able to transform the simple act of making and pouring a cup of tea into something transcendant by bringing to this simple act a clear mind, a good attitude, and years of patient, humble practice. Arguably he prevails because he has perfected his craft to a higher degree than the samurai has perfected his own. That is why he has earned the right to wear the garb of a samurai, and why he is able to face down his opponent.
Which, again, I find funny, because most Zen masters will tell you that the story--any Zen story, in fact--has no "definitive" meaning, but has meaning based on how you interpret it. (There are a few Zen parables that reinforce this point, but it gets a little meta to justify my understanding of a Zen story by quoting another Zen story.) How Matt chooses to interpret that parable is, of course, up to him. I choose to interpret the story thusly: the insulted samurai felt that his "earned sense of pride" at his sword mastery was insulted by the tea master--clearly no swordsman, as it says in the story--wore robes of a rank and honor that he had not earned. And clearly, the tea master was no swordsman. But what the tea master learned from his peer was not how to use his concentration and discipline to improve his own swordsmanship, but how to demonstrate that he had, in fact, earned a note of mastery through an entirely different discipline than the insulted samurai's. The tea master still has no mastery of the sword, but in his own domain, he is an expert. This was all the insulted samurai needed to see, that the badge of honor had been earned, and not just imposed by a capricious (and disrespectful) lord. Put a paintbrush and canvas into the hands of a house painter, and you get pretty much a mess--but put a spray painter in the hands of Leonardo, and you still get a mess. In fact, to really do the parable justice, we should see how much "craft" Matt can bring when asked to paint a house, because that's about how much relevance swordsmanship and house painting have in relationship to one another. (All analogies fail eventually, by the way, and we're probably reaching the boundaries of this one.)
Billy Hollis is a master with VB, far more than I ever will be; I know C++ far better than he ever will. I respect his abilities, and he, mine. There is no argument here. But more importantly, there are friends I've worked with in the past who are masters with neither VB nor C++, nor any other programming language, but chose instead to sink their time and energy into skiing, pottery, or being a fan of a television show. They chose to put their energies--energies the "craftsmen" seem to say should be put towards their programming--towards things that bring them joy, which happen to not be programming.

Which brings me to another refrain that came up over and over again: You criticize the craftsman, but then you draw a distinction between "craftsman" and "laborer". You're confusing (or confused). First of all, I think it important to disambiguate along two axes: those who are choosing to invest their time into learning to write better software, and those who are choosing to look at writing code as "just" a job as one axis, and along a second axis, the degree to which they have mastered programming. By your own definitions, "craftsmen", can one be early in your mastery of programming and still be a "craftsman"? Can one be a master bowler who's just picked up programming and be considered a "craftsman"? Is the nature of "craftsmanship" a measure of your skill, or is it your dedication to programming, or is it your dedication to something in your life, period? (Remember, the tea master parable says that a master C++ developer will see the master bowler and respect his mastery of bowling, even though he can't code worth a crap. Would you call him a "craftsman"?)

Frankly, I will say, for the record, that I think there are people programming who don't want to put a ton of time and energy into learning how to be better programmers. (I suspect that most of them won't ever read this blog, either.) They see the job as "just a job", and are willing to be taught how to do things, but aren't willing to go off and learn how to do them on their own. They want to do the best job they can, because they, like any human being, want to bring value to the world, but don't have that passion for programming. They want to come in at 9, do their job, and go home at 5. These are those whom I call "laborers". They are the "fisherman" in the following story:

The businessman was at the pier of a small coastal Mexican village when a small boat with just one fisherman docked. Inside the small boat were several large yellowfin tuna. The businessman complimented the Mexican on the quality of his fish and asked how long it took to catch them. The Mexican replied only a little while.

The businessman then asked why he didn't stay out longer and catch more fish? The Mexican said he had enough to support his family's immediate needs. The businessman then asked, but what do you do with the rest of your time? The Mexican fisherman said, "I sleep late, fish a little, play with my children, take a siesta with my wife, Maria, stroll into the village each evening where I sip wine and play guitar with my amigos; I have a full and busy life, señor."

The businessman scoffed, "I am a Harvard MBA and I could help you. You should spend more time fishing and with the proceeds buy a bigger boat. With the proceeds from the bigger boat you could buy several boats; eventually you would have a fleet of fishing boats. Instead of selling your catch to a middleman, you would sell directly to the processor and eventually open your own cannery. You would control the product, processing and distribution. You would need to leave this small coastal fishing village and move to Mexico City, then LA and eventually New York City where you would run your expanding enterprise."

The Mexican fisherman asked, "But señor, how long will this all take?" To which the businessman replied, "15-20 years." "But what then, señor?" The businessman laughed and said, "That's the best part! When the time is right you would announce an IPO and sell your company stock to the public and become very rich. You would make millions." "Millions, señor? Then what?" The businessman said, "Then you would retire. Move to a small coastal fishing village where you would sleep late, fish a little, play with your kids, take a siesta with your wife, stroll to the village in the evenings where you could sip wine and play your guitar with your amigos."

What makes all of this (this particular subject, craftsmanship) particularly hard for me is that I like the message that craftsmanship brings, in terms of how you conduct yourself. I love the book Apprenticeship Patterns, for example, and think that anyone, novice or master, should read this book. I have taken on speaking apprentices in the past, and will continue to do so well into the future. The message that underlies the meme of craftsmanship--the constant striving to improve--is a good one, and I don't want to throw the baby out with the bathwater. If you have adopted "craftsmanship" as a core value of yours, then please, by all means, continue to practice it! Myself, I choose to do so, as well. I have mentored programmers, I have taken speaking apprentices, and I strive to learn more about my craft by branching my studies out well beyond software--I am reading books on management, psychology, building architecture, and business, because I think there is more to software than just the choice of programming language or style.

But be aware that if you start telling people how you're living your life, there is an implicit criticism or expectation that they should be doing that, as well. And when you start criticizing other peoples' code as being "unelegant" or "unbeautiful" or "unclean", you'd better be able to explain your value system and why you judged it as so. Humility is a hard, hard path to tread, and one that I have only recently started to see the outlines of; I am guilty of just about every sin imaginable when it comes to this subject. I have created "elegant" systems that failed their original intent. I have criticized "ugly" code that, in fact, served the purpose well. I have bragged of my own accomplishments to those who accomplished a lot more than I did, or ever will. And I consider it amazing to me that my friends who've been with me since long before I started to eat my justly-deserved humble pie are still with me. (And that those friends are some amazing people in their own right.; if a man is judged by the company he keeps, then by looking around at my friends, I am judged to be a king.) I will continue to strive to be better than I am now, though, even within this discussion right now: those of you who took criticism with my post, you have good points, all of you, and I certainly don't want to stop you from continuing on your journeys of self-discovery, either.

And if we ever cross paths in person, I will buy you a beer so that we can sit down, and we can continue this discussion in person.

http://blogs.tedneward.com/post/last-thoughts-on-craftsmanship/

Last Thoughts on "Craftsmanship"
Posted on Feb 2, 2013 #Development Processes #Industry #Languages #Reading #Social #C# #C++ #F# #Visual Basic #.NET #Java/J2EE #Parrot #Windows
TL;DR Live craftsmanship, don't preach it. The creation of a label serves no purpose other than to disambiguate and distinguish. If we want to hold people accountable to some sort of "professionalism", then we have to define what that means. I found Uncle Bob's treatment of my blog heavy-handed and arrogant. I don't particularly want to debate this anymore; this is my last take on the subject.

I will freely admit, I didn't want to do this. I really didn't. I had hoped that after my second posting on the subject, the discussion would kind of fade away, because I think we'd (or I'd, at least) wrought about the last few drops of discussion and insight and position on it. The same memes were coming back around, the same reactions, and I really didn't want to perpetuate the whole thing ad infinitum because I don't really think that's the best way to reach any kind of result or positive steps forward. I'd said my piece, I was happy about it.

Alas, such was not to be. Uncle Bob posted his thoughts, and quite frankly, I think he did a pretty bad job of hearing what I had to say, couching it in terms of populism (I stopped counting the number of times he used that word at six or so) even as he framed in it something of his own elitist argument.

Bob first points us all at the Manifesto for Software Craftsmanship. Because everyone who calls themselves a craftsman has to obey this manifesto. It's in the rules somewhere. Sort of like the Agile Manifesto--if you're not a signatory, you're doing it wrong.

(Oh, I know, to suggest that there is even the smallest thing wrong with the Agile Manifesto borders on heresy. Which, if that's the reaction you have, should be setting off a few warning bells in your head--something about replacing dogma with dogma.)

And you know what? I actually agree with most of the principles of the Craftsmanship Manifesto. It's couched in really positive, uplifting language: who doesn't want "well-crafted" software, or "steadily-increasing value", or "productive partnerships"? It's a wonderfully-worded document that unfortunately is way short on details, but hey, it should be intuitively obvious to anyone who is a craftsman, right?

See, this is part of my problem. Manifestos tend to be long on rhetoric, but very, very short on details. The Agile Manifesto is another example. It stresses "collaboration" and "working software" and "interactions" and "responding to change", but then people started trying to figure out how to apply this, and we got into the knife-fights that people arguing XP vs. Scrum vs. Kanban vs. your-homebrewed-craptaculous-brand-of-"little-a"-agile turned into brushfire wars. It's wonderful to say what the end result should be, but putting that into practice is a whole different ball of wax. So I'm a little skeptical any time somebody points to a Manifesto and says, "I believe in that, and that should suffice for you".

Frankly, if we want this to have any weight whatsoever, I think we should model something off the Hippcratic Oath, instead--it at least has prescriptive advice within it, telling doctors what they can and cannot (or, perhaps worded more accurately, should or should not) do. (I took something of a stab at this six years ago. It could probably use some work and some communal input; it was a first iteration.)

Besides (beware the accusation coming of my attempt at a false-association argument here, this is just for snarkiness purposes!), other manifestos haven't always worked out so well.

So by "proving [that I misinterpreted the event] by going to the Manifesto", you're kind of creating a circular argument: "What happened can't have been because of Software Craftsmanship, because look, there, in the Manifesto, it says we don't do that, so clearly, we can't have done that. It says it, right there! Seriously!"

The Supposed "Segregation"
Bob then says I'm clearly mistaken about "craftsmen" creating a segregation, because there's nothing about segregation in the manifesto:

any intimation of those who "get it" vs. those who don't; or any mention of the "right" tools or the "right" way. Indeed, what I see instead is a desire to steadily add value by writing well-crafted software while working in a community of professionals who behave as partners with their customers. That doesn't sound like "narcissistic, high-handed, high-minded" elitism to me.
Hold on to that thought for a bit.
Bob then goes on an interesting leap of logical assumption here. He takes my definition of a "software laborer":

"somebody who comes in at 9, does what they're told, leaves at 5, and never gives a rat's ass about programming except for what they need to know to get their job done [...] who [crank] out one crappy app after another in (what else?) Visual Basic, [that] were [...] sloppy, bloated, ugly [...] cut-and-paste cobbled-together duct-tape wonders."
and interprets it as
Now let's look past the hyperbole, and the populist jargon, and see if we can identify just who Ted is talking about. Firstly, they work 9-5. Secondly, they get their job done. Thirdly, they crank out lots of (apparently useful) apps. And finally, they make a mess in the code. The implication is that they are not late, have no defects, and their projects never fail.
That's weird. I go back and read my definition over and over again, and nowhere do I see me suggesting that they are never late, no-defect, and never-fail projects. Is it possible that Bob is trying to set up his next argument by reductio ad absurdum, basically by saying, "These laborers that Ted sets up, they're all perfect! They walk on water! They must be the illegitimate offspring of Christ himself! Have you met them? No? Oh, then they must not exist, and therefore his entire definition of the 'laborer' is whack, as these young-un kids like to say."
(See what I did there? I make Bob sound old and cantankerous. Not that he would do the same to himself, trying to use his years of experience as a subtle bludgeon to anyone who's younger and therefore less experienced--less professional, by implication--in his argument, right?

Programming is barely 60 years old. I, personally, have been programming for 43+ of those years.
Oh.)
Having sort of wrested my definition of the laborer away from me, Bob goes on:

I've never met these people. In my experience a mess in the code equates to lots of overtime, deep schedule overruns, intolerable defect rates, and frequent project failure -- not to mention eventual redesign.
Funny thing. I've seen "crafted" projects that fell to the same victims. Matter of fact, I had a ton of people (so it's not just my experience, folks, clearly there's a few more examples out there) email and comment to me that they saw "craftsmen" come in and take what could've been a one-week project and turn it into a six-month-or-more project by introducing a bunch of stuff into the project that didn't really need to be there, but were added in order to "add value" to the code and make it "well-crafted". (I could toss off some of the software terms that were cited as the reasons behind the "adding of value"--decoupled design, dependency injection, reusability, encapsulation, and others--but since those aren't in the Manifesto either, it's easy to say in the abstract that the people who did those projects weren't really adding value, even though these same terms seem to show up on every singe project during architecture and design, agile or otherwise.)
Bob goes on to sort of run with this theme:

Ted has created a false dichotomy that appeals to a populist ideology. There are the elite, condescending, self-proclaimed craftsmen, and then there are the humble, honorable, laborers. Ted then declares his allegiance to the latter... .
Well, last time I checked, all I have to do to be listed amongst the craftsmen is sign a web page, so "self-proclaimed" seems pretty accurate as a title. And "elite"? I dunno, can anyone become a craftsman? If so, then the term as a label has no meaning; if not, then yes, there's some kind of segregation, and it sure sounds like you're preaching from on high, particularly when you tell me that I've created a "false dichotomy" that appeals to a "populist ideology":
Generally, populists tend to claim that they side with "the people" against "the elites". While for much of the twentieth century, populism was considered to be a political phenomenon mostly affecting Latin America, since the 1980s populist movements and parties have enjoyed degrees of success in First World democracies such as the USA, Canada, Italy, the Netherlands and Scandinavian countries.
So apparently I'm trying to appeal to "the people", even though Bob will later tell us that we're all the same people. (Funny how there's a lot of programmers who feel like they're being looked down on by the elites--and this isn't my interpretation, read my blog's comments and the responses that have mushroomed on Twitter.) Essentially, Bob will argue later that there is no white-collar/blue-collar divide, even though according to him I'm clearly forming an ideology to appeal to people in the blue-collar camp.
So either I'm talking into a vacuum, or there's more of a divide than Bob thinks. You make the call on that one.

Shall we continue?

He strengthens his identity with, and affinity for, these laborers by telling a story about a tea master and a samurai (or was it some milk and a cow) which further extends and confuses the false dichotomy.
Nice non-sequitur there, Bob! By tossing in that "some milk and a cow", you neatly rob my Zen story of any power whatsoever! You just say it "extends and confuses the false dichotomy", without any real sort of analysis or discussion (that comes later, if you read through to the end), and because you're a craftsman, and I'm just appealing to populist ideology, my story no longer has any meaning! Because reductio ad make-fun-of-em is also a well-recognized and well-respected logical analysis in debating circles.
Oh, the Horror! ... of Ted's Psyche
Not content to analyze the argument, because clearly (he says this so many times, it must be true) my argument is so weak as to not stand on its own (even though I'm not sure, looking back at this point, that Bob has really attacked the argument itself at all, other than to say, "Look at the Manifesto!"), he decides to engage in a little personal attack:

I'm not a psychoanalyst; and I don't really want to dive deep into Ted's psyche to unravel the contradictions and false dichotomies in his blog. However, I will make one observation. In his blog Ted describes his own youthful arrogance as a C++ programmer... It seems to me that Ted is equating his own youthful bad behavior with "craftsmanship". He ascribes his own past arrogance and self-superiority with an entire movement. I find that very odd and very unfortunate. I'm not at all sure what prompted him to make such a large and disconnected leap in reasoning. While it is true that the Software Craftsmanship movement is trying to raise awareness about software quality; it is certainly not doing so by promoting the adolescent behavior that Ted now disavows.
Hmm. One could argue that I'm just throwing out that I'm not perfect nor do I need to profess to be, but maybe that's not a "craftsman's" approach. Or that I was trying to show others my mistakes so they could learn from them. You know, as a way of trying to build a "community of professionals", so that others don't have to go through the mistakes I made. But that would be psychoanalyzing, and we don't want to do that. Others didn't seem to have the problem understanding the "very large and disconnected leap in reasoning", and I would hate to tell someone with over twice my years of experience programming how to understand a logical argument, so how about let's frame the discussion this way: I tend to assume that someone behaving in a way that I used to behave (or still behave) is doing so for the same reasons that I do. (It's a philosophy of life that I've found useful at times.) So I assume that craftsmen take the path they take because they want to take pride in what they do--it's important to them that their code sparkle with elegance and beauty, because that's how code adds value.
Know what? I think one thing that got lost somewhere in all this debate is that value is only value if it's of value to the customer. And in a lot of the "craftsmanship" debates, I don't hear the customer's voice being brought up all that much.

You remember all those crappy VB apps that Bob maligned earlier? Was the customer happy? Did anybody stop to ask them? Or was the assumption that, since the code was crappy, the customer implicitly must be unhappy as well? Don't get me wrong, there's a lot of crappy code out there that doesn't make the customer happy. As a matter of fact, I'll argue that any code that doesn't make the customer happy is crap, regardless of what language it's written in or what patterns it uses or how decoupled or injected or new databases it stores data into. Value isn't value unless it's value to the person who's paying for the code.

Bob Discusses the Dichotomy
Eh, I’m getting tired of writing all this, and I’m sure you’re getting tired of reading it, so let’s finish up and call it a day. Bob goes on to start dissecting my false dichotomy, starting with:

Elitism is not encouraged in the Software Craftsmanship community. Indeed we reject the elitist attitude altogether. Our goal is not to make others feel bad about their code. Our goal is to teach programmers how to write better code, and behave better as professionals. We feel that the software industry urgently needs to raise the bar of professionalism.
Funny thing is, Bob, one could argue that you’re taking a pretty elitist stance yourself with your dissection of my blog post. Nowhere do I get the benefit of the doubt, nor is there an effort to try and bring yourself around to understand where I’m coming from; instead, I’m just plain wrong, and that’s all there is to it. Perhaps you will take the stance that “Ted started it, so therefore I have to come back hard”, but that doesn’t strike me as humility, that strikes me as preaching from a pulpit in tone. (I’d use a Zen story here to try and illustrate my point, but I’m afraid you’d characterize it as another “milk and a cow” story.)
But "raising the bar of professionalism", again, misses a crucial point, one that I've tried to raise earlier: Who defines what that "professionalism" looks like? Does the three-line Perl hack qualify as "professionalism" if it gets the job done for the customer so they can move on? Or does it need to be rewritten in Ruby, using convention over configuration, and a whole host of dynamic language/metaprogramming/internal DSL tricks? What defines professionalism in our world? In medicine, it's defined pretty simply: is the patient healthier or not after the care? In the legal profession, it's "did we represent the client to the best of our ability while remaining in compliance with the rules of ethics laid down by the bar and the laws of the entity in which we practice?" What defines "professionalism" in software? When you can tell me what that looks like, in concrete, without using words that allow for high degree of interpretation, then we can start to make progress towards whether or not my "laborers" are, in actuality, professionals.

We continue.

There are few "laborers" who fit the mold that Ted describes. While there are many 9-5 programmers, and many others who write cut-paste code, and still others who write big, ugly, bloated code, these aren't always the same people. I know lots of 12-12 programmers who work hellish hours, and write bloated, ugly, cut-paste code. I also know many 9-5 programmers who write clean and elegant code. I know 9-5ers who don't give a rat's ass, and I know 9-5ers who care deeply. I know 12-12ers who's only care is to climb the corporate ladder, and others who work long hours for the sheer joy of making something beautiful.
Of course there aren't, Bob, you took my description and sort of twisted it. (See above.) And yes, I'll agree with you, there's lots of 9-5 developers, and lots of 12-12 developers, lots of developers who write great code, and lots of developers who write crap code and what's even funnier about this discussion is that sometimes they're all the same person! (They do that just to defy this kind of stereotyping, I'm sure.) But maybe it's just the companies I've worked for compared to the companies you've worked for, but I can rattle off a vastly larger list of names who fit in the "9-5" category than those who fit into the "12-12" category. All of them wanted to do a good job, I believe, but I believe that because I believe that every human being innately wants to do things they are proud of and can point to with a sense of accomplishment. Some will put more energy into it than others. Some will have more talent for it than others. Just like dancing. Or farming. Or painting. Or just about any endeavor.
The Real Problem
Bob goes on to talk about the youth of our industry, but I think the problem is a different one. Yes, we’re a young industry, but frankly, so is Marketing and Sales (they’ve only really existed in their modern forms for about sixty or seventy years, maybe a hundred if you stretch the definitions a little), and ditto for medicine (remember, it was only about 150 years ago that surgeons were also barbers). Yes, we have a LOT to learn yet, and we’re making a lot of mistakes, I think, because our youth is causing us to reach out to other, highly imperfect metaphor/role-model industries for terminology and inspiration. (Cue the discussion of “software architecture” vs “building architecture” here.) Personally, I think we’ve learned a lot, we’re continuing to learn more, and we’re reaching a point where looking at other industries for metaphors is reaching a practical end in terms of utility to us.

The bigger problem? Economics. The supply and demand curve.

Neal Ford pointed out on an NFJS panel a few years back that the demand for software vastly exceeds the supply of programmers to build it. I don't know where he got that--whether he read that somewhere or that formed out of his own head--but he's absolutely spot-on right, and it seriously throws the whole industry out of whack.

If the software labor market were like painting, or car repair, or accounting, then the finite demand for people in those positions would mean that those who couldn't meet customer satisfaction would eventually starve and die. Or, more likely, take up some other career. It's a natural way to take the bottom 20% of the bell curve (the portion out to the far right) of potential practitioners, and keep them from ruining some customers' life. If you're a terrible painter, no customers will use you (at least, not twice), and while I suppose you could pick up and move to a new market every year or so until you're run out of town on a rail for crappy work, quite honestly, most people will just give up and go do something else. There are thousands--millions--of actors and actresses in Southern California that never make it to stage or screen, and they wait tables until they find a new thing to pursue that adds value to their customers' lives in such a way that they can make a living.

But software... right now, if you walk out into the middle of the street in San Francisco wearing a T-shirt that says, "I write Rails code", you will have job offers flying after you like the paper airplanes in Disney's just-released-to-the-Internet video short. IT departments are throwing huge amounts of cash into mechanisms, human or otherwise, working or otherwise, to help them find developers. Software engineering has been at the top of the list of "best jobs" for several years, commanding high salaries in a relatively stress-free environment, all in a period of time that many of equated to be the worst economic cycle since the Great Depression. Don't believe me? Take a shot yourself, go to a Startup Weekend and sign up as a developer: there are hundreds of people with new app ideas (granted, most of them total fantasy) who are just looking for a "technical co-founder" to help them see their dream to reality. IT departments will take anybody right now, and I do mean anybody. I'm reasonably convinced that half the reason software development outsourcing overseas happens is because it's a choice between putting up with doing the development overseas, even with all of the related problems and obstacles that come up, or not doing the development at all for lack of being able to staff the team to do it. (Which would you choose, if you were the CTO--some chance of success, or no chance at all?)

Wrapping up
Bob wraps up with this:

The result is that most programmers simply don’t know where the quality bar is. They don’t know what disciplines they should adopt. They don’t know the difference between good and bad code. And, most importantly, they have not learned that writing good clean code in a disciplined manner is the fastest and best way get the job done well.
We, in the Software Craftsmanship movement are trying to teach those lessons. Our goal is to raise the awareness that software quality matters. That doing a good job means having pride in workmanship, being careful, deliberate, and disciplined. That the best way to miss a deadline, and lay the seeds of defeat, is to make a mess.

We, in the Software Craftsmanship movement are promoting software professionalism.

Frankly, Bob, you sort of reject your own “we’re not elitists” argument by making it very clear here: “most programmers simply don’t know where the quality bar is. They don’t know …. They don’t know…. They have not learned. … We, in the Software Craftsmanship movement are trying to teach those lessons.” You could not sound more elitist if you quoted the colonial powers “bringing enlightenment” to the “uncivilized” world back in the 1600s and 1700s. They are an ignorant, undisciplined lot, and you have taken this self-appointed messiah role to bring them into the light.
Seriously? You can't see how that comes across as elitist? And arrogant?

Look, I really don't mean to perpetuate this whole argument, and I'm reasonably sure that Uncle Bob is already firing up his blog editor to point out all the ways in which my "populist ideology" is falsly dichotomous or whatever. I'm tired of this argument, to be honest, so let me try to sum up my thoughts on this whole mess in what I hope will be a few, easy-to-digest bullet points:

Live craftsmanship, don't preach it. If you hold the craftsman meme as a way of trying to improve yourself, then you and I have no argument. If you put "software craftsman" on your business cards, or website, or write Manifestos that you try to use as a bludgeon in an argument, then it seems to me that you're trying to distinguish yourself from the rest, and that to me smacks of elitism. You may not think of yourself as covering yourself in elitism, but to a lot of the rest of the world, that's exactly how you're coming off. Sorry if that's not how you intended it.
Value is only value if the customer sees it as value. And the customer gets to define what is valuable to them, not you. You can (and should) certainly try to work with them to understand what they see as value, and you can (and should) certainly try to help them see how there may be value in ways they don't see today. But at the end of the day, they are the customer, they are paying the checks, and even after advising them against it, if they want to prioritize quick-and-dirty over longer-and-elegant, then (IMHO) that's what you do. Because they may have reasons for choosing that approach that they simply don't care to share with you, and it's their choice.
The creation of a label serves no purpose other than to disambiguate and distinguish. If there really is no blue-collar programming workforce, Bob, then I challenge you to drop the term "craftsman" from your bio, profile, and self-description anywhere it appears, and replace it with "programer". Or else refer to all software developers as "craftsmen" (in which case the term becomes meaningless, and thus useless). Because, let's face it, how many doctors do you know who put "Hippocratic-sworn" somewhere on their business cards?
If we want to hold people accountable to some sort of "professionalism", then we have to define what that means. The definition of the term "professional" is not really what we want, in practice, for it's usually defined as "somebody who got paid to do the job". The Craftsmanship Manifesto seems to want some kind of code of ethics or programmer equivalent to the Hippocratic Oath, so that the third precept isn't "a community of people who are paid to do what they do", but something deeper and more meaningful and concrete. (I don't have that definition handy, by the way, so don't look to me for it. But I will also roundly reject anyone who tries to use the Potter Stewart-esque "I can't define it but I know it when I see it" approach, because now we're back to individual interpretation.)
I found Uncle Bob's treatment of my blog heavy-handed and arrogant. In case that wasn't obvious. And I reacted in similar manner, something for which I will apologize now. By reacting in that way, I'm sure I perpetuate the blog war, and truthfully, I have a lot of respect for Bob's technical skills; I was an avid fan of his C++ articles for years, and there's a lot of good technical ideas and concepts that any programmer would be well-advised to learn. His technical skill is without question; his compassion and empathy, however, might be. (As are mine, for stooping to that same level.)
Peace out.

https://blog.cleancoder.com/uncle-bob/2011/01/17/software-craftsmanship-is-about.html

What Software Craftsmanship is about
17 January 2011
TL;DR.


I’ve gone from Dan North’s post, to Gil Zilberfeld’s to Michael Feather’s to Jason Gorman’s. It would appear that we, in the software craftsmanship movement have not been clear. I hope this blog clears a few things up.

Why is there a software craftsmanship movement? What motivated it? What drives it now? One thing; and one thing only.

We are tired of writing crap.

That’s it. The fat lady sang. Good nite Gracy. Over and out.

We’re tired of writing crap. We are tired of embarrassing ourselves and our employers by delivering lousy software. We have had enough of telling our customers to reboot at midnight. We don’t want bug lists that are a thousand pages long. We don’t want code that grows more tangled and corrupt with every passing day. We’re tired of doing a bad job. We want to start doing a good job.

That’s … what … this … is … about. Nothing else.

What we are not doing:

We are not putting code at the center of everything.
We are not turning inward and ignoring the business and the customer.
We are not inspecting our navels.
We are not offering cheap certifications.
We are not forgetting that our job is to delight our customers.
What we will not do anymore:

We will not make messes in order to meet a schedule.
We will not accept the stupid old lie about cleaning things up later.
We will not believe the claim that quick means dirty.
We will not accept the option to do it wrong.
We will not allow anyone to force us to behave unprofessionally.
What we will do from now on:

We will meet our schedules by knowing that the only way to go fast is to go well.
We will delight our customers by writing the best code we can.
We will honor our employers by creating the best designs we can.
We will honor our team by testing everything that can be tested.
We will be humble enough to write those tests first.
We will practice so that we become better at our craft.
We will remember what our grandmothers and grandfathers told us:

Anything worth doing is worth doing well.
Slow and steady wins the race.
Measure twice cut once.
Practice, Practice, Practice.
I suppose that some people might look askance at our code katas and our code retreats, and our practice sessions. They might think that we’re turning inwards and abandoning our customers. They might think that we’ve given up on the real world and have yielded to the temptation to entertain ourselves. I can see how someone might come to that conclusion.

But they are as wrong as the day is long. We are doing this because we care about the customer. We are dedicating time and effort to being the best that we can be so that our employers will get the best possible value out of us.

Do you think the only time musicians play their instruments is when they are on stage? Do you think the only time that batters hit balls is during games? Do you think the only time lawyers give a closing is at trial? Of course not. These people are professionals; and professionals practice! Professionals study the minutia of their disciplines. Professionals know all the little tricks and quirks. They know the history, the theories, the anecdotes. They know techniques and methods. They know good options and bad options and how to tell them apart. And they know all this stuff because they practice, practice practice.

So when you see someone wearing a green wrist-band that says “Clean Code” or “Test First” or “Test Obsessed”, it’s not because they’ve joined a movement, or signed a manifesto, or that they somehow feel superior to everyone else. They aren’t participants in a holy war. They aren’t trying to join a tribe and huddle around a campfire. The green band is a personal thing. It’s a promise made to one’s self: “I will do a good job. I will not rush. I will write tests. I will go fast by going well. I will not write crap. And I will practice, practice practice so that I can be a professional.”

https://blog.cleancoder.com/uncle-bob/2013/02/01/The-Humble-Craftsman.html

The Humble Craftsman
01 February 2013
There is another side to Ted Neward’s blog; and it’s a side that I agree with. I believe Ted’s overall thesis and analysis was wrong. Software Craftsmanship does not automatically give us a blue-collar/white-collar dichotomy; it does not automatically separate those who “get it” from those who don’t. It does not automatically create a condescending elite who lord their self-perceived superiority over the unwashed masses. And, in case you hadn’t noticed, I really disliked Ted’s manipulative appeal to populism.

However, Ted was not entirely wrong either. Because there are folks (and, to my shame, I’ve sometimes numbered among them) who have behaved badly when pointing out problems or deficiencies in other peoples’ code. To those people (and to myself) I’d like to make the following points.

It takes a lot of courage to put code out on github for everyone to see. It requires a willingness to be exposed, ridiculed, and belittled. It shows a desire to share, and a hunger to learn. It is possibly the most honorable and selfless act a programmer can make. That act should not be rewarded by haughty condescension. No one should point the their fingers and snicker with their buddies. The honorable act of sharing should be respected, not denigrated.

What does it take to be a craftsman? It takes time. It takes experience. It takes mentoring. And, it takes a lot of trial and error. In our industry the best, and possibly the only, way to refine your skill is to make lots and lots of mistakes; and to learn from others who have made lots and lots of mistakes. So thank goodness for those mistakes, and thank goodness for the people who made them. Without them, we’d have learned nothing. And especially thank the people who were willing to expose their mistakes to the world.

Several years ago I stumbled upon some open source code that I thought was a good example of bad code. It was written in 2002 by David Gregory. I wrote to David, and asked if I could use his code as an example in my book “Clean Code”. He graciously agreed. His is one of the most courageous acts I’ve encountered.

Bob: “Excuse me, David, do you mind if I rip this code, that has your name all over it, to shreds in front of a million people?”

David: “Sure, Bob. Go right ahead.”

Would you have allowed that? Would you have had the courage to let Uncle Bob point out every minuscule problem in your code in front of a huge audience of young and eager programmers? Could you have withstood that negative review as, year after year, it was published over and over again, in country after country, and language after language? Could you have tolerated being the person who wrote the example of bad code?

I owe a lot to David, and so does everyone who read my book and learned anything from it. Were it not for heroes like David, we could not advance the cause of craftsmanship at all.

BTW, I should point out that David’s code was not really all that bad. For Java, in 2002, it was considerably better than average. When one writes a book about clean code, the only examples that make sense to use are those where the difference is small enough to be seen.

When someone shares their code, the respectful and honorable thing to do is to carefully critique that code. No one’s code is above criticism. Criticism is, after all, how we learn. Respectfully criticizing someone’s code is one of the highest honors you can pay to the author. Just remember, you respect the person, not the code. The code is fair game.

Reviewing and criticizing code is a balancing act. To do it well requires a delicate combination of ruthlessness and humility. You have to be able to say that certain things are just silly – even stupid.

For example, this is stupid:

/**
 * Default Constructor
 */
public MyClass() {}
Can I say that? Can I say “stupid”. Yeah, I can. Because I’ve been there. I’ve been stupid. And I’ll be stupid again. I’m the guy who wrote that code. I’m the guy who wrote a 3,000 line C function named gi (which stood for Graphic Interpreter). I’m the guy who wrote an 2,000 line O(n**3) algorithm for calculating the area of a thousand-sided polygon because I couldn’t be bothered to look up the lovely 30 line, O(n) solution. I’m the guy who got fired, while my wife was pregnant with our first child, because I couldn’t be bothered to think about schedules that were real important to my employer. Yeah. Me. The stupid one. So I’m allowed. I can use that word.

And if you use that word, or any other adjective that means the same thing, just remember you are using a word that describes yourself; because the only way you can know what’s stupid, is to have done something that stupid in the past.

And that’s a good way to describe a craftsman. A craftsman is someone who has done some really stupid things and wants to avoid doing them in the future, and to help others to avoid doing them too.

If you want to bear the title of “Craftsman”, then you must respect every person who shares their code; and show them the honor that they deserve. You treat each sharing event as a courtesy paid to you; and return that courtesy with courtesy. This doesn’t mean the code is above criticism. It just means that when you criticize, you do so with courtesy, respect, and a humble acknowledgement of your own failings.

So if you see some bad code out there. There’s nothing wrong with pointing it out. Indeed, you should point it out. Just remember that the only reason you recognize it as bad code is because either you, or someone who has taught you, has written bad code like that in the past. So be humble. Acknowledge our shared stupidity. Commiserate just how difficult writing good clean code is, and how easy it is to do stupid things without knowing it.

And never, ever, EVER, point your finger and snicker with your buddies like a gaggle of gossipy highschoolers.

A special thanks to Kelly Sommers (@kellabyte) for sending me the email that inspired this blog.
