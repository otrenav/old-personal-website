+++
draft = true
+++

https://hbr.org/2018/07/when-is-it-important-for-an-algorithm-to-explain-itself

Many efforts to apply machine learning get stuck due to concerns about the “black box” — that is, the lack of transparency around why a system does what it does. Sometimes this is because people want to understand why some prediction was made before they take life-altering actions, as when a computer vision system indicates a 95% likelihood of cancer from an x-ray of a patient’s lung. Sometimes it’s because technical teams need to identify and resolve bugs without disrupting the entire system. And now that the General Data Protection Regulation (GDPR) is in effect, businesses that handle consumer data are required to explain how automated systems make decisions, especially those that significantly affect individual lives, like allocating credit or hiring a candidate for a job. While GDPR only applies in Europe, businesses around the world anticipate that similar changes are coming and so are revisiting governance efforts.

If you search around the internet, you’ll find that most writing about algorithmic explainability falls into two camps. Advocates for rapid technology adoption often argue that humans are no better at explaining decisions than machines, and so we should table the question to accelerate innovation. These rhetorical arguments do not help professionals responsible for regulatory compliance. On the other hand, critics demand stringent requirements for transparency and vilify a “move fast and break things” culture. These arguments can stifle adoption, as not all machine learning use cases require the same level of oversight and accountability — some decisions are more important to be able to explain than others.

To succeed with applied machine learning, you have to step back and break down the problem. What does it mean for a mathematical or statistical procedure to be “appropriate” (as GDPR requires)? Do different use cases require different types of explanations? Who should be involved in decisions regarding business impact, regulatory compliance, technical approach, and even ethical values when companies integrate machine learning into business operations?

Let’s start by unpacking why a seemingly straightforward idea like a right to an explanation is hard to understand and implement in practice.

As with any technology, when you start a machine learning project you have to decide whether to build or buy. Working with a vendor complicates transparency because many software companies choose not to disclose what algorithms they use or the data they use to train them. Often, the reason given is to protect intellectual property or prevent a security breach. There’s also a complexity issue: If the vendor uses multiple public and private data sets to train their system, think about how difficult it would be to have auditing mechanisms to keep track of exactly what went into making a decision!

If you’re not using a vendor, but choosing to build something in-house, you have to decide whether you need only be able to explain what procedures you’ll be using — for example, the types of data and types of models — or whether you want to be able to explain the inner workings of a mathematical model.

The language in GDPR implies that it’s the procedure that requires explanation. Recital 71 says that “fair and transparent processing” means auditing how data is collected, keeping data accurate, securing data, and taking measures to identify and prevent any discriminatory effects. The focus is on data collection and integrity; statistical models need to be “appropriate.” None of these steps are trivial, but they are often overlooked in debates around explainability because there is so much focus on algorithms and models. For example, bias can creep into an algorithm at many points in the system. Your business may have historically underserved some ethnic population, so you may have collected little data about them. Ethnic and demographic communities may be tightly correlated with location data, leading a seemingly innocuous variable like GPS location to be proxy for ethnic discrimination. Once in production, models often encounter edge cases — situations, data, or individuals that aren’t enough like the data they’ve been trained on. It’s important to monitor for bias both before and after a system goes into production, and to take action to address unintended treatment.

One kind of explanation is to clarify the outcomes a system is designed to optimize for. In the example of an online credit application system, holding a system accountable would mean monitoring to ensure that denials were not correlated to protected attributes like ethnic background. The limitations of this outcomes-focused approach is that there is less insight into what an individual would need to do to intervene to change a decision in the future. An intervention-focused approach requires insight into the inner workings of a model. For example: “You didn’t qualify because you did not pay your last three rent checks. If you pay the next four in a row, your score will be high enough to pass our threshold score of 75%.”

When it’s important to understand the logic of a statistical model, we hit different challenges.

As I hinted at in my article about identifying machine learning opportunities, different machine learning algorithms are more and less easy to explain. A linear regression of the form y = mx + b isn’t too hard to explain: we only have to track m to know how x (input) relates to y (output). But what if “m” is shorthand for millions of relationships, defining complex functions in architectures? With deep learning we lose the ability to pinpoint how inputs relate to outputs because the number of variables included and the relationships between them become too complex to describe. So, for example, a deep neural network is able to indicate a 95% chance that an individual will default on a loan, but cannot articulate what aspects in the data formed that score. It’s a trade-off, as more complex algorithms unlock capabilities simpler statistical models like linear regression cannot handle — but at the cost of explainability. (It’s also worth remembering that when data scientists build simpler algorithms that may be easier to explain, they also bring with them biases and assumptions that influence what they see in the data; these subjective biases are hard to identify and control using technology.)

A final challenge in explainability is to make it clear what the model actually optimizes for. An ideal credit card customer is one who will frequently use the card he or she signs up for (long-term outcome), not just the person who accepts the credit card offer (short-term outcome). People who click on display ads aren’t often customers with high lifetime value, and most digital marketing efforts are only able to use clickstream data as proxies for direct sales. It’s hard to measure and get feedback on long-term outcomes, but these known unknowns can be the most valuable for a system’s performance.

This may seem daunting, but if the right people ask the right questions at the right time to inform a series of judgment calls and decisions, things become tractable.


To start, non-technical stakeholders involved in a machine learning project need some training to build intuitions about how statistical systems work. They don’t need to code or to be data scientists, but they do need to appreciate that machine learning systems output correlations and not causes. They need to appreciate that a minority group not well represented in a data set may receive unfair treatment from an algorithm, not because of any malice on the part of the data scientists, but because models tend to learn relationships that help predict large parts of the dataset, at the expense of accuracy with respect to less well-represented examples.

Next, during pre-project discussions, a diverse group of stakeholders from the business, data science, IT, privacy, compliance should have a seat at the table. (Companies should also consider explicitly making it someone’s role to question the algorithm, like the “red teams” sometimes used in high-stakes decision-making.) It’s important to get clear on regulatory requirements or ethical risks before any work begins to avoid sunk costs on interesting applications that won’t meet requirements under new regulations like GDPR or risk denigrating consumer trust.

These cross-functional design groups should consider questions like:

What type of accountability matters for the use case? Explainability is not always important. For example, if a law firm uses machine learning to find documents relevant for a case, what matters is that they don’t miss something important, not explaining why one document is relevant and another isn’t. Here, the right metric for data scientists to focus on is known as “recall,” the fraction of relevant instances that have been retrieved over the total amount of relevant instances, across a document set. The data science team should embed this into their model testing and quality assurance processes.

Where does a particular machine learning model sit in the entire business process? A business analyst should map out the end-to-end business process. Often one process actually includes many machine learning models with different explainability requirements. For example, a bank using machine learning to acquire new credit card customers will have at least two models: one to evaluate risk and approve the card (which requires greater explainability) and another to predict propensity to convert and to personalize offers (which requires lower explainability). Compliance functions should inform business analysts of the regulatory requirements at each phase in the business process and data scientists should keep these restrictions in mind as opposed to only selecting the machine learning technique that has the best performance on a task.

What processes will we use to govern outcomes? Machine learning systems are optimization tools, and one way to govern them is to shift from explaining what features in data led to which outcomes to declaring a higher-level policy on desired outcomes and holding systems accountable to achieving that policy. Here, data scientists should have responsibility to evaluate their models for bias towards sensitive data types like gender or ethnic background during quality assurance and, most importantly, after the model goes live. Statistical systems do well in the middle of the bell curve where they have lots of data, but can produce unexpected results on less well-represented cases or new behavior. Someone should be made responsible to audit and monitor model performance over time and identify any actions against business policy. The technical, business, and compliance teams should meet regularly to review performance and adjust the model to achieve fair outcomes. The business should document how frequently models are updated and have a process to communicate this and how it impacts predictions and any changes to consumers impacted by the system.

Much of the conversation around explainability and interpretability focuses narrowly on the inner workings of machine learning models, leading to fear of black boxes or rhetorical arguments that humans are no better at explaining their behavior and decisions than the most opaque machine. For businesses to succeed with machine learning, they have to step back and break down the problem, considering the impact of systems holistically and thinking critically about what meaningful accountability entails for different use cases. In some cases, individuals will indeed require more direct explanations, be that for psychological comfort (being diagnosed with cancer) or to intervene to change an outcome (modifying actions to get a housing loan in the future after one has been denied). But there are many processes that can be governed by setting policies for desired outcomes, monitoring results to track discrepancies, and updating models or data collection procedures to improve future results. Getting clear on what matters and making judgment calls on how much error a business can accept is the skill business leaders need to develop.

https://www.infoq.com/articles/Can-People-Trust-Algorithm-Decisions?utm_source=infoqemail&utm_medium=ai-ml-data-eng&utm_campaign=newsletter&utm_content=06262018

Key Takeaways
Society should demand transparency as well as legal and financial accountability for the use of algorithms in automated decision making. Otherwise, neither the public, nor a regulatory agency, will be able to understand or regulate complex algorithms, and the complex interconnections between the networks of data that these algorithms use.There is no consensus on how to define, avoid, or even make explicit, bias in the algorithms that are used in executing public policy or in scientific research.The seamless and convenient nature of many technologies, such as personalized homes, makes it difficult to understand where data comes from, how it is used by algorithms, and where it goes.Companies and individuals, especially when working in the public sector, should assume that the results of algorithmic decisions will have to be explained to people who are adversely affected by them in a timely fashion so they can appeal or challenge these decisionsIt is also seems reasonable to assume that how an individual's data is being used will have to be explained.
The use of automated decision making is increasing.

The algorithms underlying these systems can produce results that are incomprehensible, or socially undesirable. How can regulators determine the safety or effectiveness of algorithms embedded in devices or machines if they cannot understand them? How can scientists understand a relationship based on an algorithmic discovery?

Examples of such areas are:  determining who is let out on bail or gets financial credit, predicting  where crime will take place, ascertaining violations of anti-discrimination laws, or adjudicating fault in an accident with a self-driving car.

Related Vendor Content

Caching Strategies Explained
Take the 2019 State of Database DevOps Survey (Win a $250 Amazon Gift Card)Microservices for Java Developers (By O'Reilly) - Download Now#noprojects: Download the Free Mini-Book (By InfoQ)IoT with Azure: A Developer’s Guide
Related Sponsor




It is unclear if the algorithms can detect their own flaws any more than a human being can determine if they are truly mentally ill.  There is no line of code in these algorithms that says do a bad thing to someone.

What can we do to solve this problem?

Panelists:

Rebecca Williams - professor of public law and criminal law, in association with Pembroke College, Oxford University
Andrew Burt - chief privacy officer & legal engineer at Immuta
Michael Veale - University College London, Department of Science, Technology, Engineering and Public Policy
InfoQ: People are often unaware of the role of algorithms in society. What is the best way to educate people about the benefits and problems associated with the growing pervasive use of algorithms?

Andrew Burt: What we need most is history and context - about how this type of technology has been used before, and about what’s different now, especially when it comes to what’s commonly referred to as “AI.” We have, on the one hand, people like Elon Musk declaring that AI is an existential threat to life on earth, which is having a real impact on the way the public thinks about AI. And we have, on the other hand, some diehard proponents of AI suggesting it will solve every problem we have. The truth is, of course, on neither extreme. What’s more, not every challenge AI poses is new. We’ve already developed tools and practices to confront some of these challenges in other areas. So I think everyone would benefit from a broader discussion that places the challenges of AI in perspective, and lets us build off of past successes and correct mistakes in how we adopted earlier technologies. There’s a lot of good we can do if we get this right. Conversely, there’s a lot of harm that could come about if we get this wrong - discriminatory harms, missed opportunities, and more. The stakes are high.

Rebecca Williams: Articles 13(2)(f), 14(2)(g) and 15(1)(h) of the GDPR state that data subjects have “the right to know the existence of automated decision-making including profiling”. So whatever else they are entitled to by way of information about the process, at the very least people will have to be told when a particular decision about them or concerning them is being made using an automated process. The hope is that that will raise some awareness of when and where these systems are being used.

In terms of education, obviously the earlier we start with these issues the better. Schools increasingly teach coding to students as well as ethical issues such as citizenship or personal and social education, so the more that can be done to raise awareness and discussion in those contexts, the better prepared future generations will be when they come to design, operate and interact with these systems. This is definitely something that Universities can also help to facilitate. There are already contexts in which academics visit schools to support learning and it would be great if this could happen on this subject too.

That of course leaves the question of how we can reach those who went through their school education before these kinds of concerns had arisen. The same challenges arise here as arise in relation to the dissemination of any kind of information: people will tend to rely on certain sources rather than others, giving rise to the risk of echo-chambers and misinformation. There will certainly be a role for the mainstream media here and balanced, scientifically-based reporting by those media will be vital, as always, but the less reliance the public place on such sources of information, the less effective this will be. There will certainly be a role for institutions like the Information Commissioner’s Office to provide advice and information for citizens through its website, and again as an academic I would be keen to see Universities assisting in this context too, either by supporting these other outlets or through direct public engagement.

Michael Veale: In technology design, there has been a big trend towards making systems “seamless”. In short, this means that people can focus on what they want to do, not how they want to do it, which is usually really great for individuals to help them achieve what they want. Smart homes are an example of this, although many are a bit too clunky to have totally earned that title. Yet with a range of algorithmic systems today, too much seamlessness means that individuals don’t get a chance to question whether this system works the way they want it to. Your smart home might be personalised, but you can’t see where, and to whom, it is sending the data. Your Facebook news feed might seem compelling, but you can’t see who is being excluded, and why.

We could run courses about algorithms in society, but that’s unlikely to solve deeper problems. Technologies move fast. My young cousin told me the other day that at school, they’d been learning about cybersecurity. “They told us not to click on pop-ups” she said. “But how will I know what a pop-up looks like?”. Browsers have moved so quickly to block them, and on mobile devices it’s simply not the paradigm at all anymore. So that one-off education, unless it is building general critical skills, usually is a bit too much of a moving target.

So consequently, we need to imbue education into the products and services we use everyday. These services should explain themselves, not necessarily with a passage of text, or a manual, but by virtue of clever design that makes it clear when data flows, automated decisions, and other behaviours are happening. Where that’s the case, individuals should be able to drill-down further to see and learn more if interested: and then they’ll no doubt get more of a feel for what is happening around them even when the options to perceive and drill down are not there.

InfoQ: Algorithms will often be used in executing public policy or in scientific research that will affect public policy.  Legal requirements, value judgements, and bias are almost unavoidable. How can social values be made explicitly visible, and bias be avoided in algorithmic programming and in interpreting the results?

Burt: On the technology side, there are all sorts of important tools that are being developed to help minimize many of these downsides. A tool called LIME, which helps explain so-called black box algorithms, is one great example. A data scientist named Patrick Hall really deserves a shout out for doing some great work on interpretability in machine learning. And there are many more examples to cite. Our legal engineering and data science teams are staying on top of all these developments at Immuta.

But I think what’s often overlooked is the procedural side. The processes used to develop and deploy ML are incredibly important, and model risk management frameworks like the Federal Reserve Board’s SR 11-7 have long recognized this fact. That regulation applies to the use of algorithms within financial institutions in the US. The folks at the AI Now Institute have also come forward with what they’re calling algorithmic impact assessments, which offer another framework for this type of approach.

There’s a lot out there, frankly, and we’ll be releasing a white paper shortly summing up some of these best practices - both technical and procedural - to help our customers and others manage the risks of deploying machine learning models in practice. We’re hard at work finalizing that whitepaper, and are excited to release it in the next few months.

Williams: There are various different ways we can approach this issue. First, it is vital to examine carefully the data used to train and operate automated decision-making systems. If the data itself is biased, the outcome will be too. There has been a lot of discussion of the risk prediction systems used in the criminal justice context in a number of US states and the difficulty with such systems is that they tend to over-predict recidivism by black defendants while under-predicting it for white defendants. But just to take an example, one potential predictor of risk used might be prior arrests for more minor possession offences. And yet such offences are most likely to be detected by stop and search, and stop and search tactics tend to skew in the same direction: over predicting a reason to stop and search black people while under predicting the need to stop and search white people. So because stop and search is skewed against black people in favour of white, more black people are found to be in possession than white and thus black people are calculated to have a higher risk of recidivism than white people. The initial discrimination in data collection thus feeds through the whole system into the output. So if we think our initial data is likely to produce this kind of skewed effect we should think carefully about whether or not it is appropriate to use it, and we may need to think about imposing duties to gather counterbalancing data.

Second, there are important policy choices to be made in the process of coding the system. Krishna Gummadi’s work has shown that it is not always possible to have one’s cake and eat it. Usually it will be necessary to choose between different measures of accuracy. So for example a system which has the most accurate method of prediction on aggregate, taken across all cases, might also have the biggest problem with producing skewed results in relation to particular categories of case, as above. Or, conversely, a system which has maximum accuracy in relation to any particular category (such as ethnic status or gender) might not have such a high degree of accuracy across all categories on aggregate. It is vital that any such policy choices between different systems are understood as being just that; they are policy choices which must be made openly and transparently and by an entity which can then be held accountable for making them, not unconsciously by anonymous coders.

Third, even if we are confident that we have done all we can ex ante to gather balanced data and make responsible coding choices, it will also be necessary ex post to ensure that such systems are subject to regular audit to ensure that they are not spontaneously generating forms of discrimination that we had not predicted. It will be necessary to do this even if we are not sure why it is happening, but, fourth, it is also vital that we do everything we can to make the algorithms themselves transparent and accountable, so that if an audit of this kind does pick up a problem we can see where and how it has arisen. There are a number of people working on this and a group of us in Aberdeen (Prof Pete Edwards), Oxford and Cambridge (Dr Jat Singh) have just received an EPSRC grant to work further on this issue.

In terms of the sources of regulation for each of these four issues, the systems will be used by both public and private entities. Where they are operated by public or governmental entities I think there is definitely a role for our existing public law to play in holding such entities to account and imposing further duties of transparency, fairness etc, which are already inherent in public law. For private entities the challenge will be to think which of these duties of transparency, accountability and fairness should be carried across into the private sector as the price for the increased power offered by such systems.

Veale: Most useful evidence is causal in nature. We want to know what causes what, and how the world works. Machine learning algorithms aren’t so good at that, and their results and predictive power can be quite brittle as a result. The main way to make social values explicitly visible is to slow down and recognise that our aims are often not just prediction, but understanding. We are in huge danger of training a generation of people who can do the former but not the latter. When you build causal models, you have got a greater opportunity to discuss if this is how you want the world to work and behave. Perhaps it is, perhaps it isn’t: but it’s a conversation that’s more visible, and much easier to have and to communicate.

InfoQ: In May of this year, the European Union General Data Protection Regulation (GDPR) comes into effect. Among its provisions is Article 22 which deals with automated individual decision making. Many people argue this rule requires not only that  the privacy rights for data must be respected, but that decisions made by algorithms be explainable.

Do you agree with this interpretation of the regulation? Does this regulation require data be removed from use by algorithms? If so, could this reduce the effectiveness of the algorithm? In general is the European Union's approach a valid one, or is the "law of unintended consequences" going to make it worse?

Burt: There’s a huge debate going on in the legal community over how, exactly, the GDPR will impact the deployment of machine learning. And given that the GDPR only came into effect within the last month, there’s a lot that’s still up in the air. But my take is that Article 22 needs to be read alongside Articles 13-15, which state that data subjects have a right to “meaningful information about the logic involved” in cases of automated decision-making. In practice, I think this is going to mean that data subjects are going to have the right to be educated about when, why, and most importantly, how something like a machine learning model is using their data. As with any legal analysis, there’s a ton of nuance here. So I’d encourage readers to check out an earlier article I put together on the subject for the International Association of Privacy Professionals. It’s also worth mentioning that a group called the Working Party 29, which has a huge influence on how EU privacy laws are enforced, has come out with its own guidance on this subject, flatly stating that automated decision-making is prohibited by default under the GDPR, with certain exemptions.

Williams: You’ll already know that there has been an intense debate between Goodman and Flaxman who argue that the GDPR gives a full ‘right to explanation’, while Wachter, Mittelstadt and Floridi, in my view more plausibly, argue that it will be sufficient for the data subject to be told of the existence of a machine learning component and what measures of accuracy are being used to check it. I agree with them that the data subject should be told more than just which data points are being used, but also how they are weighed in the circumstances. As I mentioned above, where the system is being operated by a public entity I think there is significant potential for an analogy to be drawn with our current approach to Closed Material Procedure decisions, where if the impact on the individual is significant (s)he has the right to know at least the ‘gist’ of the case against him/her so that (s)he can make ‘meaningful’ use of the right to reply. That might just involve ex ante explanation, as Wachter, Mittelstadt and Floridi suggest, but it might include ex post explanation too. In relation to private entities the situation is more difficult as they are generally subject to fewer duties, although our existing law on discrimination will do some work and there is also the potential for public-style duties to be attached to the use of such systems even in a private context.

Art 17 allows for the right to erasure of personal data, but not where the processing is necessary to comply with a legal obligation. The key distinction here is between individual and general data. For removal of individual data there are some limited rights, like those in Art 17, but for any duty or obligation to remove general data (i.e. data affecting a whole category of people, such as the stop and search data above), you might have to look either to more general provisions in the regulation like ‘suitable measures to safeguard the data subject’s rights and freedoms and legitimate interests’, or general duties in, e.g. public law (where the processor is public/governmental) or law prohibiting discrimination.

Again, that depends on whether what is being used is individual or general data. Removing skewed general data might make the algorithm more accurate, whereas removing accurate individual data in relation to particular kinds of applicants might make it more inaccurate and give rise to the skewing effect.

I don’t think anyone knows the answer to that for certain at this point! I do think it will be necessary to remember the ex post audits I discussed above, so that if in practice we do see unintended consequences there is an opportunity to catch those and remedy them.

Veale: Article 22 in the GDPR is a really old provision. It dates back from French law in 1978, and much of it is unchanged from Article 15 of the Data Protection Directive in 1995 (the UK Data Protection Act 1998). Yet it hasn’t been used much, and some scholars have called it a “second-class right” as a result.

The fundamental purpose of Article 22 is to ensure that if an organisation wants to take a fully automated, potentially significant decision about someone, they need to have a legal basis to do it (freely given consent, necessity for performing a contract, or legal obligation). If the organisation doesn’t have one of these, they can’t take the decision. If they do secure one, they have to put safeguards into place to ensure the decision is taken fairly, including allowing an individual to challenge the decision. It’s unclear in many cases how that challenge will work: many significant decisions are taken very quickly. If a video of a topical, political event is automatically removed from Youtube, how quickly can it be brought back up? If its time of relevance has past, a human review is of little use.

Another one of these safeguards, beyond human challenge, is described in Recital 71 of the GDPR. Recitals, which begin a European law, are meant to illustrate its spirit and context, but in highly fought over laws like the GDPR, they have become, frustratingly for lawyers, a place to put things that really should be in the main, binding articles. This explanation safeguard, unlike others like the right to human intervention, was placed there, and so we will see if and when the European Court of Justice thinks it is binding on data controllers.

Yet let’s not forget the actual meaning of Article 22, which isn’t just about explanations. It definitely restricts some uses of algorithmic systems people think are unfair. Automated hiring and CV filtering, for example, are techniques which are highly suspect under Article 22. When you are deciding to interview someone automatically, using one of the analytic products on the market today, you are likely making a solely automated, significant decision. What is your legal basis? You don’t have a contract, and probably don’t have a legal obligation, so that leaves consent. Consent in any employment context is highly problematic due to the power imbalances, and can rarely be seen as freely given. Personally, I think that Article 22 renders a lot of large scale, automatic hiring practices very legally suspect.

InfoQ: What do you think is the critical issue facing societies with widespread use of algorithms instead of humans to make critical decisions?

Burt: In two words: silent failures. As we begin to rely more on more on complex algorithms, especially various forms of neural networks, our ability to explain their inner-workings is going to get progressively harder. This isn’t simply because these models are hard to interpret, but because the networks we’re connecting them to are becoming more and more complex. Every day, the world of IT gets harder to manage - we have more endpoints, more data, more databases, and more storage technologies than ever before. And so I believe our biggest challenge lies in being able to understand the data environments we are relying on. Because if we don’t, there’s a very real possibility that we’ll be constantly confronting silent failures, where something has gone wrong that we simply don’t know about, with very real - and potentially devastating - consequences.

Williams: I think most people would encapsulate this in the word ‘fairness’. But that really boils down into transparency and accountability: (1) We need to know as much as possible about what these systems are doing, how and why. (2) There needs to be an appropriate entity to hold accountable for them, and an appropriate and accessible system for holding that entity accountable.

Our legal and regulatory structures need to provide and incentivise these two things, working closely with the computer scientists who generate the systems.

Veale: The biggest issue here is that algorithms take maintenance and oversight which can be hard to do at a small scale. They theoretically allow a huge volume and speed of automated decisions, many more than a human can do. Small organisations can really benefit from that. Previously, if organisations wanted a lot of decision-making to happen, they needed a lot of people. Those people could provide oversight and feedback, even if they brought their own biases. Now, a few individuals can deploy and manage huge decision-making infrastructures, but they don’t bring the human capacity to look over them and maintain them. This creates a huge imbalance, particularly for low capacity organisations who might be tempted by relying on automation and on machine learning. In these cases, external oversight is needed; but who provides that? Who pays for it? And how does it really get to grips with some hidden challenges that algorithmic decision-making might cause, challenges which are often buried deep within organisations and their work politics?

Conclusion
Failing to take into consideration what the public fears, or the inability to foresee adverse consequences has impeded technologies such as nuclear energy and genetically modified crops.

New York City is establishing a task force to propose recommendations for obtaining explanation and mitigations for people affected by the use of algorithms by city agencies. The European Union’s General Data Protection Regulation is another attempt to start to deal with the issue.

 Carl Jung is reputed to have said that within every human being hides a lunatic. If algorithms model human behavior, what does that mean for society?

About the Panelists
Andrew Burt is chief privacy officer and legal engineer at Immuta, the world’s leading data management platform data science. He is also a visiting fellow at Yale Law School’s Information Society Project. Previously, Burt was a special advisor for policy to the head of the FBI Cyber Division, where he served as lead author on the FBI’s after-action report on the 2014 attack on Sony. Burt has published articles on technology, history and law in the New York Times, the Financial Times, the Los Angeles Times, Slate, and the Yale Journal of International Affairs, among others. His book, American Hysteria: The Untold Story of Mass Political Extremism in the United States, was called “a must-read book dealing with a topic few want to tackle” by Nobel laureate Archbishop Emeritus Desmond Tutu. Burt holds a JD from Yale Law School and a BA from McGill University. He is a term-member of the Council on Foreign Relations, a member of the Washington, DC, and Virginia State Bars, and a Global Information Assurance Certified (GIAC) cyber incident response handler.

Rebecca Williams is professor of public law and criminal law at the University of Oxford. Her work includes examining optimum methods of decision-making and the use of criminal law as a form of regulation. Increasingly her work also focuses on the relationship of law and technology and the ways in which the law will need to develop in order to keep pace with technological developments.

Michael Veale is a doctoral research in responsible public sector machine
learning at University College London, specialising in the fairness and
accountability of data-driven tools in the public sector, as well as the
interplay between advanced technologies and data protection law. His research
has been cited by international bodies and regulators, in the media, as well as
debated in Parliament. He has acted as consultant on machine learning and
society for the World Bank, the Royal Society and the British Academy, and
previously worked on IoT, health and ageing at the European Commission. Veale
tweets at @mikarv.

https://venturebeat.com/2018/11/16/mit-researchers-show-how-to-detect-and-address-ai-bias-without-loss-in-accuracy/

MIT researchers show how to detect and address AI bias without loss in accuracy
KHARI JOHNSON@KHARIJOHNSON	NOVEMBER 16, 2018 10:00 AM

Above: The artificial intelligence booth on the exhibition floor of Facebook's 2016 F8 developer conference.

Image Credit: Jordan Novet/VentureBeat

MOST READ
 Diane Greene speaks at Google I/O in 2013.
Google Cloud CEO Diane Greene steps down
 Google's London HQ at 6 Pancras Square. October 11, 2018.
Google’s AI system can grade prostate cancer cells with 70% accuracy

ProBeat: Amazon’s HQ2 was a perfect bait and switch
 Gameband promised cool watches that you could play games on.
Gameband officially throws in the towel on crowdfunded wearable

MIT researchers show how to detect and address AI bias without loss in accuracy

UPCOMING EVENTS
BLUEPRINT: Mar. 26 - 28
GamesBeat Summit: April 23 - 24

Bias in AI leads to poor search results or user experience for a predictive model deployed in social media, but it can seriously and negatively affect human lives when AI is used for things like health care, autonomous vehicles, criminal justice, or the predictive policing tactics used by law enforcement.

In the age of AI being deployed virtually everywhere, this could lead to ongoing systematic discrimination.

Recommended videosPowered by AnyClip
Google Admits 'Black Mode' Helps Battery Life
Google CEO Is Ending Company's Party Culture By Limiting Drinking At Work
Google Adds Android Support
Google Buys Into Finnish Wind Energy
Google's New York Expansion
Google Walkout Protests Discrimination And Sexual Harassment
NOW PLAYINGGooglers Walk Out Protesting Sexual Misconduct

That’s why MIT Computer Science AI Lab (CSAIL) researchers have created a method to reduce bias in AI without reducing the accuracy of predictive results.

“We view this as a toolbox for helping machine learning engineers figure out what questions to ask of their data in order to diagnose why their systems may be making unfair predictions,” said MIT professor David Sontag in a statement shared with VentureBeat. The paper was written by Sontag together with Ph.D. student Irene Chen and postdoctoral associate Fredrik D. Johansson.

The key, Sontag said, is often to get more data from underrepresented groups. For example, the researchers found in one case an AI model was twice as likely to label women as low-income and men as high-income. By increasing the representation of women in the dataset by a factor of 10, the number of inaccurate results was reduced 40 percent.

Traditional methods may suggest randomization of datasets related to a majority population as a way to resolve unequal results for different populations, but this approach can mean a tradeoff for less predictive accuracy to achieve fairness for all populations.

“In this work, we argue that the fairness of predictions should be evaluated in context of the data, and that unfairness induced by inadequate samples sizes or unmeasured predictive variables should be addressed through data collection, rather than by constraining the model,” reads the paper titled “Why is my classifier discriminatory?”

Differences in predictive accuracy can sometimes be explained by a lack of data or unpredictable outcomes. The researchers suggest AI models be analyzed for model bias, model variance, and outcome noise before undergoing fairness criteria critiques.

“This exposes and separates the adverse impact of inadequate data collection and the choice of the model on fairness. The cost of fairness need not always be one of predictive accuracy, but one of investment in data collection and model development. In high-stakes applications, the benefits often outweigh the costs,” the paper reads.

Once these evaluations have taken place, the group of researchers suggest procedures for estimating the impact of collecting additional training samples, then clustering data to identify subpopulations getting unequal results to guide additional variable collection.

This approach was used to achieve equal results for income based on census data, text book reviews, and death rates of patients in critical care.

The results will be presented next month at Neural Information Processing Systems (NIPS) in Montreal.

As concern has grown in the past year over the potential of bias in AI producing inaccurate results that impact human lives, a number of tools and approaches have been introduced.

This spring, startup Pymetrics open-sourced its bias detection tool Audit AI, while in September, IBM launched an algorithmic bias detection cloud service, and Google introduced AI bias visualization with the What-If tool and TensorBoard.

Other best practices meant to reduce the potential for bias in AI include proposed factsheets for datasets from IBM, and datasheets for Datasets, an approach to sharing essential information about datasets used to train AI models, recommended by Microsoft Research’s Timnit Gebru and AI Now Institute cofounder Kate Crawford.

https://www.theverge.com/2018/11/16/18098790/data-craft-bots-society-social-media-metadata

The bots of the future are going to use our own metadata to seem more human
A new Data & Society report suggests social media manipulators are now in the business of ‘data craft’
By Bijan Stephen  Nov 16, 2018, 2:53pm EST
SHARE

Illustration by Alex Castro / The Verge
Today the internet is a quagmire of captial-c Content, made navigable by retweets, likes, and favorites; everything posted can be quantified by its corresponding reactions. Though in aggregate it may seem like noise, to people in the business of disinformation, there’s a valuable signal there to be picked apart and studied. Our activity on social platforms — those favorites and likes and retweets — are a form of metadata that can help manipulators and their bots appear human to the algorithms that police social networks. And that problem is about to get a lot worse: bots are starting to mimic your social media activity in order to look more human.

“For users and platforms alike, it is getting harder to discern ‘real’ users and authentic account activities from fake, spammy, and malicious manipulations,” writes the researcher Amelia Acker in a recent Data & Society report that explores how metadata — your likes, comments, reactions — is being used to hoodwink the public in new and increasingly lifelike ways. “Manipulators are getting craftier at faking what looks like authentic behavior on social media.”

Those manipulators are manifold: services like Devumi, which sells followers to celebrities, businesses, and people who aspire to be influencers; political meddlers, like Russia’s Internet Research Agency, which attempt to influence elections using social media tools; or, even more seriously, repressive governments who want to gain support for unethical or otherwise unsavory policies, like the one in Myanmar that set up a host of sockpuppet Facebook pages to make a genocide more palatable to the public. Because more than half of Americans get their news primarily from social media, the Data & Society report concludes, these manipulations are becoming ever more harmful.

People using metadata to create disinformation bots, Acker tells The Verge, are getting it from “three stages of accessibility: there’s the stuff on the user interface that users like you and me can read with our eyes and can be scraped and read by machines,” meaning the metadata you generate when you’re using social media — comments, retweets, reactions, and the like. “Then,” she says, “there’s stuff that you can get access to through the API, which may be a little bit more precise, or a little bit more specific about the account setup” — say, the places you’re sending tweets from, or the date and time you created your account, right down to the second.


Then there’s what Acker calls the “macro layer”: the level that the platforms have exclusive access to. That’s the most important stuff — it’s the data we don’t see unless platforms like Facebook and Twitter get caught doing something they shouldn’t be (as in Twitter’s recent data dump of accounts and tweets related to Russia’s Internet Research Agency and Iran).

“But we can imagine what those dossiers look like,” says Acker, because researchers who investigate disinformation campaigns are using them already in their work. Those dossiers she mentions are composed of all the information that “everyone’s creating when they’re using social media.”

In the report, Acker dubs the manipulation of this information data craft: “a collection of practices that create, rely on, or even play with the proliferation of data on social media by engaging with new computational and algorithmic mechanisms of organization and classification.” Manipulators and bot-makers are in the business of data craft, optimizing for maximum impact.

Bots are increasingly good at mimicking people, even if only to fool the algorithms that are the first line of defense against spam and influence operations. “When I’m looking at a disinformation bot, it’s not always clear to me whether that person is trying to appear to be a real person to me, a human reader, or if they’re just trying to appear to be a real person to the automated limits,” says Acker. They also might exist, she adds, simply to find the limits of these auto-filters.

The overall point of these bots, she explains, is to fly just under the radar. And while that radar is pretty good — both Facebook and Twitter have made large strides in using machine learning to combat malicious spam — it’s still difficult to catch inauthentic accounts at scale. Partially this is because doing so might snap up legitimate accounts that only appear to be fake, but also partly because the real manipulators are getting smarter.

To appear human to a human reader, meanwhile, is a totally different task that’s much more labor intensive; it’s a lot harder to fool a person than it is to fool a program. Even so, there’s a template for it.

“The idea is that you have to sort of create some astroturfing across platforms or across sites to signal that you are real, that you’re not just like an avatar or username on one platform,” Acker says. “Deep cover” — hiding a fake account in plain sight — “comes from early accounts of sockpuppets online, and the idea that you have to have at least one or two or three different channels in order to be a reliable fake person online.”

If you’ve ever Googled yourself, you know that being alive means generating data. There’s reams and reams of it now, more than ever before, because of how computers can quantify a life. That information — which now includes everything from your heart rate to your recent purchases — is mostly used to advertise to us, which is why your Amazon recommendations look the way they do. It’s just something that could also be spoofed eventually, so that bots might appear just as alive.

“I suppose that future bots will be, like, better at creating activity data, as opposed to just like sort of flat messages,” Acker says, although she did preface her predictions by saying she’s not really in the business of making them. “They’ll be better at interacting, better at creating check-ins and tags, better at incorporating, you know, more informal ways that people communicate, like with emoji.” Acker also thinks that different kinds of bots will spring up, ones that are focused on pushing messages through filter bubbles; bots that are intended to sow doubt in processes or people; and deep cover bots, which wouldn’t be noticeable until they were activated, like proverbial sleeper agents — all that means understanding metadata and how it’s used will only become more important in the future.

“Probably, future bots will be better at jumping across platforms,” she says, which is a problem because it’s currently very difficult to moderate across platforms. “Like the hopscotching from chans to Reddit to Facebook,” Acker continues. “More coordinated efforts across platforms I think is probably where we’ll see... I don’t know, I don’t want to say innovation.”

https://insidebigdata.com/2018/08/20/machine-learning-bias-ai-systems/

4 Sources of Machine Learning Bias & How to Mitigate the Impact on AI Systems
August 20, 2018 by Editorial Team Leave a Comment Print Friendly
+1
Tweet
199
Share
17
Share
Pin
2
218 SHARES
 This guest post from Alegion explores the reality of machine learning bias and how to mitigate its impact on AI systems.

Artificial intelligence (AI) isn’t perfect. It exists as a combination of algorithms and data; bias can occur in both of these elements.

When we produce AI training data, we know to look for biases that can influence machine learning (ML). In our experience, there are four distinct types of bias that data scientists and AI developers should avoid vigilantly.

AI systems
The key to successfully mitigating bias is to first understand how and why it occurs. (Photo: Pixabay; Seanbatty)

 Algorithm Bias

Bias in this context has nothing to do with data. It’s actually a mathematical property of the algorithm that is acting on the data. Managing this kind of bias and its counterpart, variance, is a core data science skill.

Algorithms with high bias tend to be rigid. As a result they can miss underlying complexities in the data they consume. However, they are also more resistant to noise in the data, which can distract algorithms with lower bias.

By contrast, algorithms with high variance can accommodate more data complexity, but they’re also more sensitive to noise and less likely to process with confidence data that is outside the training data set.

Data scientists are trained in techniques that produce an optimal balance between algorithmic bias and variance. It’s a balance that has to be revisited over and over, as models encounter more data and are found to predict with more or less confidence.

Sample Bias

Sample bias occurs when the data used to train the algorithm does not accurately represent the problem space the model will operate in.

Algorithms with high variance can accommodate more data complexity, but they’re also more sensitive to noise and less likely to process with confidence data that is outside the training data set.
For example, if an autonomous vehicle is expected to operate in the daytime and at night, but is trained only on daytime data, its training data has sample bias. The model driving the vehicle is highly unlikely to learn how to operate at night with incomplete and unrepresentative training data.

Data scientists use a variety of techniques to:

Select samples from populations and validate their representativeness
Identify population characteristics that need to be captured in samples
Analyze a sample’s fit with the population
Prejudicial Bias

Prejudicial bias tends to dominate the headlines around AI failures, because it often touches on cultural and political issues. It occurs when training data content is influenced by stereotypes or prejudice within the population. Data scientists and organizations need to make sure the algorithm doesn’t learn and manifest outputs that echo stereotypes or prejudice.

For example, an algorithm that is exposed to annotated images of people at home and at work could deduce that all mothers are female, and this would be true in the sample data and the overall population. But the algorithm could also deduce that all nurses are female, which is not true.

Minimizing prejudicial bias requires sensitivity to the ways prejudice and stereotyping influence data. To address this form of bias, organizations must place constraints on input (training) data, and on outputs (results), and train the data scientists to avoid introducing their own societal prejudices into training data.

Measurement Bias

Measurement bias is the outcome of faulty measurement, and it results in systematic distortion of data. The distortion could be the fault of a device. For example, a camera with a chromatic filter will generate images with a consistent color bias and a 11-⅞–inch long “foot ruler” will always overrepresent lengths.

Measurement bias also occurs when data collections are designed poorly. For example, a survey with leading questions will influence responses in a consistent direction, and the output of a data-labeling tool may inadvertently be influenced by workers’ regional phraseology.

There are several ways to mitigate measurement bias. First, organizations must regularly compare the outputs of different measuring devices. Second, they should comply with survey design best practices. Third, they should train labeling and annotation workers before putting them to work on real data.

Ignore AI Bias At Your Own Risk

The key to successfully mitigating bias is to first understand how and why it occurs. Humans play a role in every aspect of ML and AI, from data assembly and annotation to algorithm development and beyond. This means AI systems always contain a degree of human error. Ignoring this reality puts your organization at risk.

Navigating bias is a challenge for all data science teams, even the most experienced. But it’s critical that these teams remain vigilant in the fight to protect the integrity of their data.

Alegion provides human intelligence solutions designed for AI & machine learning initiatives, digital content management and moderation.
