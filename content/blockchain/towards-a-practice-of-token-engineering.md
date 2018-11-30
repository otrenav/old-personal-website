+++
draft = true
+++

Towards a practice of token engineering
Go Back
Archive
Delete
Favorite
Share
Display Options
Towards a practice of token engineering
By Trent Mcconaghy, bravenewcoin.comView OriginalMarch 30th, 2018
This article is a first stake in the ground towards a practice of token engineering: the theory, practice and tools to analyze, design, and verify tokenized ecosystems.

The first section of this article relates token designs to other fields and explains why “engineering”. The rest of this article is an attempt to draw us closer to this goal, by leveraging existing fields in three main ways:

1. Engineering, Game Theory, and More
This section relates token design to other fields.

1.1 The Tacoma Narrows Bridge
In the first week of my engineering studies, our solemn-faced professor showed us this:


How did the bridge collapse? The designers did anticipate for wind, after all. However, they failed to anticipate that the particular wind patterns would set up resonance with the bridge itself. When you have an appropriately timed force applied to a system in resonance, the amplitude of the resonance grows over time. The figure below illustrates, where green = non-resonant and red = resonant = disaster.

The video was to teach about responsibility. The designers of the bridge could have prevented the disaster by being thorough, and applying appropriate theory, practice, and tools. Other professors showed that video several times over the years during my studies. Those viewings culminated in a ceremony to receive iron rings upon graduation. All Canadian engineers have these rings. According to legend, the rings are forged from the metal of a collapsed bridge.

1.2 Game Theory and Mechanism Design
Game Theory is a scientific field that analyzes incentives, from an economic standpoint. It has a counterpart in economics for designing (synthesizing)incentivized systems, called Mechanism Design. In fact Mechanism Design is really the field for design of tokenized ecosystem, in theory. Researchers in that field have come up with a lot of great theory over the years, at literally Nobel prize levels of quality. Closely related is Economic Game Theory.

However, traditionally there hasn’t been a good way to reconcile that theory with practice. After all, how often does an academic economist (or anyone, really) get a chance to deploy an economy? Yet this is the exact problem we are confronted with in designing tokenized ecosystems. The closest are likely video game economies and public policy design.

However, it turns out that if you zoom in on Mechanism Design with a few practical constraints, you end up with Optimization Design! People doing Optimization Design have a tremendous amount of practical experience deploying optimizer systems over the years. Myself included: my first and second startups (ADA, Solido) did exactly that, for use in industrial-grade circuit design.

1.3 Other Related Fields
Many other fields have something to say about token design as well; at the very least in the sense that experts from those fields will find that many of their skills translate well to token design. These include everything from electrical engineering to complex systems, from economics to AI. I list a few below. And of course many of them have roots in good ol’ cybernetics.

1.4 Engineering and Token Design
What should we be calling this field in which we design tokenized ecosystems? I list some options below.

The first four terms are -biased. That’s fine; it makes sense for analyzing price movement, valuations, and so on.
I’m trained as an electrical engineer (EE). EEs doing circuit design have theory, have practice, and build systems that just work, such as the screen you’re reading and the chips that power it, to the lights over your head.

Engineering is about rigorous analysis, design, and verification of systems; all assisted by tools that reconcile theory with practice. Engineering is also a discipline of responsibility: being ethically and professionally accountable to the machines that you build, as illustrated by the Tacoma Narrows Bridge viewings and iron rings.

I saw the rise of the discipline of software engineering in the 90s; that made sense as it encouraged rigor and responsibility.

I’d love to see token ecosystem design become an engineering discipline, side-by-side with electrical engineering, software engineering, civil engineering, aerospace engineering, and so on. This implies that token ecosystem design would also become a field of rigorous analysis, design, and verification. It would have tools that reconcile theory with practice. It would be guided by a sense of responsibility. It would be token engineering.

[Note: As for “token” vs “incentive”, “token” is shorter and easier to compare to its economics counterpart “Tokenomics”.]

The image below shows how these fields relate. The goal is a practice of token engineering.

 2. Token Design as Optimization Design
Token design is like optimization design: at a high level, you encode intent with a block rewards function aka objective function, and you let it fly. As is often the case, Simon de la Rouviere saw this one first.

It gets more specific than that. Token design is especially like evolutionary algorithms (EAs), where there are many agents “searching” at once and there is no top-down control of what each agent does. Agents live and die by their block reward or fitness. The table below summarizes the relation.

With such similarities, we can use best practices from optimization / EA to when doing token design. This is great news, because many people are Jedis in designing EAs and optimization systems.

 Let’s elaborate on each row in the table.

2.1 Goals
Both tokenized ecosystems and EAs have goals, in the form of objectives (things to maximize or minimize) and constraints (things that must be met). To get fancy, this can even be stochastic.

The tokenized ecosystem might give block rewards for an objective function of “maximize hash rate” whereas an EA objective might be “minimize error” in training a deep net. Constraints might be “must have stake ≥ threshold to participate” or “deep network layers=100” respectively.

Variants include single-objective optimization (1 objective, 0 constraints), constraint satisfaction (0 objectives, ≥1 constraints), and multi-objective constrained optimization (≥2 objectives, ≥1 constraints).

2.2 Measurement & Test
To test / measure success against the goals (objectives & constraints), a tokenized ecosystem relies on proofs and an optimizer measures fitness using e.g. a simulator.

For example, a Bitcoin node proves that a user was hashing by verifying that the user’s supplied nonce solves the the cryptographic puzzle.

An optimizer might test the goodness of a circuit by running a SPICE simulation of the circuit’s differential equations; simulation results can be verified by testing whether they indeed solved Kirchoff’s Current and Voltage Laws.

2.3 System Agents
In both systems, agents run about “doing things”.

In a tokenized ecosystem, network stakeholders such as miners (or users more generally) do whatever it takes to earn block rewards. They jostle about, doing what it takes to get more token rewards. For example, in Bitcoin some agents might design, build, and run ASIC chips to get higher hash rate. Other agents might pool their existing compute resources. The system does not need to explicitly model all stakeholders in the ecosystem. For example, Bitcoin doesn’t have specific roles for banks or nations or companies; it’s mostly all about the miners.

In an EA, you have individuals in a population. If they’re “good” they have higher fitness. For example, an individual may be a vector of 10,000 weights for a neural network. “Actions” of individuals are basically when they survive and have variants made of them, via operators like crossover (e.g. interpolation) or mutation (e.g. randomly perturbing each parameter).

2.4 System Clock
Each system has a clock, implying a time dimension by which progress is made / convergence is happening.

Batches. Typically, agents are processed in batches or epochs. A tokenized ecosystem periodically generates a new block and gives block rewards. The new block points to the old block; and new work in the system will add to the new block; and so on. This linked list of blocks implies a Lamport-style logical clock. In EAs, each batch is a generation where a whole population of individuals gets updated at once. Each generational loop might include: evaluate individuals, select the best, let them make children, repeat.

Continuous. In some systems, agents are processed more continuously rather than batches. These systems usually takes a bit more work to conceptualize, but may lead to better properties for some problems. For example in tokenized ecosystems, a Stellar transaction only needs validation from quorum slice participants, or another node gets added to a DAG (directed acyclic graph) like in Iota. In EAs, we have steady-state evolution where one individual at a time is replaced.

2.5 Incentives & Disincentives
The system itself cannot control how the agents behave. (Or at the very least, it shouldn’t need to control them.) As such, top-level behavior must be an emergent property of bottom-up actions by agents. This is necessary for tokenized ecosystems; otherwise they’d be centralized! It’s not an absolute must for EAs, but nonetheless a broad set of EAs take this approach for simplicity / elegance or meeting other design goals.

This means the system can only reward or punish behavior, aka carrots or sticks, aka incentives and disincentives. In designing the system, we design what rewards or punishments to give, and how to give them.

In tokenized ecosystems, rewards take the form of block rewards, and punishments by slashing stake. The former is typically the objective function; the latter is some (but not all) constraints.

In EAs, reward and punishment both come down to which individuals are selected to be parents for the next generation. Examples: randomly choose two individuals and keep the best, repeating until full (tournament selection); and chance of selection is proportional to fitness (roulette wheel selection). Crucially, the EA does not need to steer the individuals by e.g. providing a derivative. This is why a tokenized ecosystem is most like an EA, versus gradient-based optimizers that give top-down directives (using gradients to choose new individuals).

3. From Optimization Methodology to Token Methodology
3.1 Introduction
This section is some initial notes towards treating token design like the engineering discipline it deserves to grow into.

First, I describe a structured methodology for optimization design. Then I describe how a similar methodology could be applied for incentive design.

Next, I describe key tools used in circuit design: simulators and CAD tools; and how they might be applied for circuit design.

Finally, I start to enumerate some design patterns.

3.2 Optimization Methodology
These communities only partly talk to each other. But practitioners of the algorithms all do something very similar. They want to ship optimizer systems that just work. They follow the following steps. Some do it implicitly, though the pros do it systematically:

Formulate the problem: They assume that the algorithm “just works” and they focus on formulating the problem in terms of objectives and constraints (goal) and design space (where can the optimizer explore, which is really just constraints).
Try an existing solver: Then they run the algorithm against those goals and let it “solve”. Code for optimization algorithms are often simply called “solvers”. If this doesn’t work, practitioners will iterate by trying different problem formulations, or different solvers and solver parameters.
New solver? If the previous solving step doesn’t work, even after repeated tries on various formulations, then practitioners consider rolling their own solver, i.e. designing a new optimization algorithm.
Let’s explore each step in more detail.

Step 1. Formulate the Optimization Problem

Look in almost any optimization-related paper, and you’ll see it display the objectives and constraints. In examples from my own work, equation (1) of this paper (in sec. 5) is a formulation for a multi-objective constrained optimization across a search space defined by a grammar. Here’s a snippet:

As another example. Equations (1) and (2) of this paper (in sec. 2) lay out a stochastic single-objective (“maximize yield”) optimization search problem across an n-dimensional continuous-valued variable space.

Formulating a problem in objectives, constraints, and design space is not easy. In fact, after all these years, it’s still an art that takes a lot of creativity (which means it’s fun!). There are often many ways to formulate a problem, and all are not equal. Fortunately, you can get better with practice. I watch friends in the EA community and circuit computer-aided design (CAD) community who have supreme skills in the art of formulating problems.

Step 2. Try an Existing Solver

Ideally you can formulate the problem such that you can apply an existing solver or algorithm. Then, you simply run it and see how it does.

If it works: you’re done, and you can stop now!

There’s at least two ways it might not work. First, If the solver doesn’t converge well enough, then you can try different problem formulations, solvers or solver parameters.

Second, the solver could converge too “well”, where it finds a design that is wonky. To address this, you can modify the problem: add a new constraint or improve the accuracy of the model / simulator. If you finds yourself in tedious iterations of adding constraints (“AI whack-a-mole”) then you’ll probably want to re-think your broader approach to the problem.

Step 3. New Solver? Design a New Optimization Algorithm, If Needed

Sometimes you come across a problem where none of the existing solvers are good enough. Perhaps you need better scale, or perhaps you need to handle some constraint that’s hard to model, or perhaps something else. That’s when you go and do research on algorithm design. When you’re doing this, you’ll usually leverage existing building blocks, and add in your own ideas. Designing new algorithms can take a tremendous amount of time, but done well, you may be able to solve the problem at hand with order-of-magnitude improvements, for example FFX.

(And, did I mention it’s fun?)

3.3 Token Methodology
Block rewards are a manifestation of the network’s objective function — the thing you want to minimize or maximize. This generalizes. Token design is like design of optimization algorithms. Therefore:

4. Token Design Patterns : A Starting Point
Every mature engineering field has its corpus of building blocks. We have books for design patterns in architecture, software, analog circuits and, yes, optimizers. But, no one’s written the book on token design patterns, yet.

However, building blocks are starting to emerge. Some have seen popularity explode quickly (e.g. TCRs). The paragraphs below explore these blocks. Sometimes they form core token mechanics; sometimes they get bolted in to solve particular problems. This list is just a starting point.

Other ways to frame or group building blocks include:

This enumeration of patterns is just a starting point; I look forward to watching it grow.

5. Tools We Need: Simulators, CAD Tools
5.1 What
Professional engineers building things that “just work” use software tools for it. Software engineers often use integrated design environments (IDEs) that are free or relatively cheap.

But you can get much more sophisticated. In circuit design, the key tools are simulators and CAD tools. The tool stacks can become quite sophisticated over time. But with these tools, it enables a team of 10 engineers to design a billion-transistor chip in a matter of months. A good engineer might be running $1M worth of tools (that’s the annual licensing cost!).

Now You’re Playing with Power” — Nintendo 1980s marketing slogan
Let’s get some power tools for this new field. We need:

5.2 Simulator and CAD Tools from Circuit Design
The figure below shows an example of a circuit simulator environment. The top left is a schematic editor to inputting the design. For analog circuits this is the choice of resistors, capacitors, transistors etc; how they are connected; and what their sizes are. That input is then automatically converted to a set of differential equations that are then solved using the simulator. The other three windows show results of various simulations. Clockwise from top right are bias (dc) analysis, time-based (transient) analysis, and frequency (ac) analysis.

The next two images are from CAD tools that I helped to develop. Below is a tool that verifies that the chip will not fail across a range of worst-case “PVT” conditions: extremes in power supply voltage, temperature, load, etc. Under the hood, it’s got a global optimizer that tries to optimize towards failure.

 The image below shows a tool to explore the design space. It reports relative impact of variables on various outputs (left), and how the design variables map to outputs (right). The engineer can change the designs by dragging the orange crosshairs.

These and other tools are now widely used to design modern chips. Simulators came on stream in the 1970s and CAD tools in the 1980s; and no one’s looked back. These tools are crucial to modern chip design. It costs >$50M to manufacture a design on a modern process; it would be, well, stupid to not verify and optimize that design to the best possible level before committing the $50M.

Yet in the world of token design, we are building and deploying what we hope to be billion-dollar ecosystems, with barely any tools. It isn’t even 1970 yet. I look forward to the day when we get to this level for token engineering!

5.3 Limitations of Tools
I acknowledge a key difference between complex chips and economies: humans in the loop. Chips are closed systems. Humans make the modeling of an economy a lot messier. However, I have hope that we can improve on the status quo of “nothing”, because we build systems every day that involve humans. Here are a few complementary ideas.

One option is to not try modeling black swans, but simply minimize potential negative impacts if they do occur.

Or, we could have humans in the loop as part of the “simulator” where they are incentivized to come up with attacks. This formalizes an existing practice: people doing token design get their friends to dream up new attacks, then they update the constraints list then the design accordingly. I’ve found myself in dozens of such conversations.

Simulation will never be perfect. So, we should ensure that the system itself is evolvable, towards the intent of the community. The tools for this are governance, staking, and more. Governance may be as simple as hard forks, for example to change the objective function or add constraints. Staking helps convert zero sum to positive sum for the community of token holders.

5.4 Extrinsic vs. Intrinsic Motivation
Extrinsic motivation is encouragement from an outside force; behavior is performed based on the expectance of an outside reward [to convince] someone into doing something that they would not do on their own…
Intrinsic means innate or within; hence intrinsic motivation is the stimulation or drive stemming from within oneself. … Intrinsic motivation is often associated with intrinsic rewards because the natural rewards of a task are the motivating forces that encourage an individual in the first place.” [Link]
This article has focused mostly on extrinsic motivation: figure out what we’re trying to optimize for, and then directly optimize for that. However, extrinsic motivation can have problems. In education, extrinsic rewards reduce intrinsic motivation of children to learn, and hinder self-determination and independent thinking. Fortunately there are teaching styles that encourage intrinsic motivation [link].

For tokenized ecosystems, we must be similarly careful. Extrinsic motivation works for some goals like “maximize security” or “maximize sharing of data”. But it can be dangerous in some places. Let’s say you’re building a decentralized reputation system. Directly tokenizing reputation would incentivize people to game their reputation for money, leading to all sorts of poor behavior. It can also be controlling, like we’ve seen with China. Just say no to Whuffie (please).

One possible answer is for the system to support intrinsic motivation rather than extrinsic. In the classroom, this means tactics like: provide choices, minimize pressure, allow alternative solutions, encourage originality, and promote success. Some of these might translate to token design. One example is to simply filter out the bad actors with economic stake, e.g. with a TCR. Or, we could promote success via stake machines.

6. Conclusion
This article described how we can leverage existing fields to help design tokenized ecosystems: token design as optimization design; token design patterns; and token design tools inspired by circuit design tools. The overall goal is a practice of token engineering. We’ll get there!

The next article in this series applies these techniques to two case studies: analysis of Bitcoin, and design of Ocean Protocol.

READ MORE ABOUT:  Blockchain
