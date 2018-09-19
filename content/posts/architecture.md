+++
title = "Placeholder"
date = "1990-03-29"
draft = true
tags = [
    ""
]
+++

> "Architecture is the fundamental organization of a system embodied in its
> components, their relationships to each other, and to the environment, and the
> principles guiding its design and evolution."

A good architecture tries its best to balance out these requirements by making
trade-offs, and delivering a system with good quality attributes while keeping
the people and resource costs under limits.

An architecture also provides a common language among the stakeholders, which
allows them to communicate efficiently via expressing these constraints, and
helping the architect zero-in towards an architecture that best captures these
requirements and their trade-offs.

## An architecture is influenced by its environment

Quality attribute requirements: In modern day web applications, it is very
common to specify the scalability and availability requirements of the
application as an early technical constraint, and capture it in the
architecture. This is an example of a technical context from a business
perspective.

Standards conformance: In some organizations where there is often a large set of
governing standards for software, especially those in the banking, insurance,
and health-care domains, these get added to the early constraints of the
architecture. This is an example of an external technical context.

Organizational constraints: It is common to see that organizations which either
have an experience with a certain architectural style or a set of teams
operating with certain programming environments which impose such a style (J2EE
is a good example), prefer to adopt similar architectures for future projects as
a way to reduce costs and ensure productivity due to current investments in such
architectures and related skills. This is an example of an internal business
context.

Professional context: An architect's set of choices for a system's architecture,
aside from these outside contexts, is mostly shaped from his set of unique
experiences. It is common for an architect to continue using a set of
architectural choices that he has had the most success with in his past for new
projects.

In modern day architectures, the job of the architect comes down to mixing and
matching existing sets of such readily available patterns to solve the problem
at hand.

## Why architecture?

### Aspect

Architecture selects quality attributes to be optimized for a system.

### Insight/Impact

Aspects such as scalability, availability, modifiability, security, and so on of
a system depend on early decisions and trade-offs while selecting an
architecture. You often trade one attribute in favor of another.

### Examples

A system that is optimized for scalability must be developed using a
decentralized architecture where elements are not tightly coupled. For example:
microservices, brokers.

### Aspect

Architecture facilitates early prototyping.

### Insight/Impact

Defining an architecture allows the development organization to try and build
early prototypes, which gives valuable insights into how the system would behave
without having to build the complete system top down.

### Examples

Many organizations build out quick prototypes of services—typically, by building
only the external APIs of these services and mocking the rest of the behavior.
This allows for early integration tests and figuring out interaction issues in
the architecture early on.

### Aspect

Architecture allows a system to be built component-wise.

### Inisght/Impact

Having a well-defined architecture allows to reuse and assemble the existing,
readily available components to achieve the functionality without having to
implement everything from scratch.

### Examples

Libraries or frameworks which provide ready-to-use building blocks for services.

For example: web application frameworks such as Django/RoR, and task
distribution frameworks such as Celery.

### Aspect

Architecture helps to manage changes to the system.

### Insight/Impact

An architecture allows the architect to scope out changes to the system in terms
of components that are affected and those which are not. This helps to keep
system changes to a minimum when implementing new features, performance fixes,
and so on.

### Examples

A performance fix for database reads to a system would need changes only to the
DB and Data Access Layer (DAL) if the architecture is implemented correctly. It
need not touch the application code at all. For example, this is how most modern
web frameworks are built.

## Why not build a system without a formal software architecture?

If you've been following the arguments so far thoroughly, it is not very
difficult to see the answer for it. It can, however, be summarized in the
following few statements:

- Every system has an architecture, whether it is documented or not
- Documenting an architecture makes it formal, allowing it to be shared among
  stakeholders, making change management and iterative development possible
- All the other benefits and characteristics of Software Architecture are ready
  to be taken advantage of when you have a formal architecture defined and
  documented.
- You may be still able to work and build a functional system without a formal
  architecture, but it would not produce a system which is extensible and
  modifiable, and would most likely produce a system with a set of quality
  attributes quite far away from the original requirements.

##

Many studies show that about 80% of the cost of a typical software system occurs
after the initial development and deployment. This shows how important
modifiability is to a system's initial architecture.

Modifiability can be defined as the ease with which changes can be made to a
system, and the flexibility at which the system adjusts to the changes. It is an
important quality attribute, as almost every software system changes over its
lifetime—to fix issues, for adding new features, for performance improvements,
and so on.

From an architect's perspective, the interest in modifiability is about the
following:

- Difficulty: The ease with which changes can be made to a system
- Cost: In terms of time and resources required to make the changes
- Risks: Any risk associated with making changes to the system

Now, what kind of changes are we talking about here? Is it changes to code,
changes to deployment, or changes to the entire architecture?

The answer is: it can be at any level.

##

> "Performance of a computer system is the amount of work accomplished by a
> system using a given unit of computing resource. Higher the work/unit ratio,
> higher the performance."

The unit of computing resource to measure performance can be one of the
following:

- Response time: How much time a function or any unit of execution takes to
  execute in terms of real time (user time) and clock time (CPU time).
- Latency: How much time it takes for a system to get its stimulation, and then
  provide a response. An example is the time it takes for the request-response
  loop of a web application to complete, measured from the end-user perspective.
- Throughput: The rate at which a system processes its information. A system
  which has higher performance would usually have a higher throughput, and
  correspondingly higher scalability. An example is the throughput of an
  e-commerce website measured as the number of transactions completed per
  minute.

Performance is closely tied to scalability, especially, vertical scalability.

## Availability

Availability refers to the property of readiness of a software system to carry
out its operations when the need arises.

Availability of a system is closely related to its reliability. The more
reliable a system is, the more available it is.

Another factor which modifies availability is the ability of a system to recover
from faults. A system may be very reliable, but if the system is unable to
recover either from complete or partial failures of its subsystems, then it may
not be able to guarantee availability. This aspect is called recovery.

The availability of a system can be defined as follows:

"Availability of a system is the degree to which the system is in a fully
operable state to carry out its functionality when it is called or invoked at
random."

Mathematically, this can be expressed as follows:

- Availability = MTBF/(MTBF + MTTR)

Take a look at the following terms used in the preceding formula:

- MTBF: Mean time between failures
- MTTR: Mean time to repair

This is often called the mission capable rate of a system.

Techniques for Availability are closely tied to recovery techniques. This is due
to the fact that a system can never be 100% available. Instead, one needs to
plan for faults and strategies to recover from faults, which directly determines
the availability. These techniques can be classified as follows:

- Fault detection: The ability to detect faults and take action helps to avert
  situations where a system or parts of a system become unavailable completely.
  Fault detection typically involves steps such as monitoring, heartbeat, and
  ping/echo messages, which are sent to the nodes in a system, and the response
  measured to calculate if the nodes are alive, dead, or are in the process of
  failing.
- Fault recovery: Once a fault is detected, the next step is to prepare the
  system to recover from the fault and bring it to a state where the system can
  be considered available. Typical tactics used here include Hot/Warm Spares
  (Active/Passive redundancy), Rollback, Graceful Degradation, and Retry.
- Fault prevention: This approach uses active methods to anticipate and prevent
  faults from occurring so that the system does not have a chance to go to
  recovery.

Availability of a system is closely tied to the consistency of its data via the
CAP theorem which places a theoretical limit on the trade-offs a system can make
with respect to consistency versus availability in the event of a network
partition. The CAP theorem states that a system can choose between being
consistent or being available—typically leading to two broad types of systems,
namely, CP (consistent and tolerant to network failures) and AP (available and
tolerant to network failures).

Availability is also tied to the system's scalability tactics, performance
metrics, and its security. For example, a system that is highly horizontally
scalable would have a very high availability, since it allows the load balancer
to determine inactive nodes and take them out of the configuration pretty
quickly.

A system which instead tries to scale up may have to monitor its performance
metrics carefully. The system may have availability issues even when the node on
which the system is fully available if the software processes are squeezed for
system resources such as CPU time or memory. This is where performance
measurements become critical, and the system's load factor needs to be monitored
and optimized.

With the increasing popularity of web applications and distributed computing,
security is also an aspect that affects availability. It is possible for a
malicious hacker to launch remote denial of service attacks on your servers, and
if the system is not made foolproof against such attacks, it can lead to a
condition where the system becomes unavailable or only partially available.
