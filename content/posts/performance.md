+++
title = "Placeholder"
date = "1990-03-29"
draft = true
tags = [
    ""
]
+++

Scalability and performance

How do we measure the scalability of a system? Let's take an example, and see how this is done.

Let's say our application is a simple report generation system for employees. It is able to load employee data from a database, and generate a variety of reports in bulk, such as pay slips, tax deduction reports, employee leave reports, and so on.

The system is able to generate 120 reports per minute—this is the throughput or capacity of the system expressed as the number of successfully completed operations in a given unit of time. Let's say the time it takes to generate a report at the server side (latency) is roughly 2 seconds.

Let us say, the architect decides to scale up the system by doubling the RAM on its server

Once this is done, a test shows that the system is able to increase its throughput to 180 reports per minute. The latency remains the same at 2 seconds.

So at this point, the system has scaled close to linear in terms of the memory added. The scalability of the system expressed in terms of throughput increase is as follows:

Scalability (throughput) = 180/120 = 1.5X

As a second step, the architect decides to double the number of servers on the backend—all with the same memory. After this step, he finds that the system's performance throughput has now increased to 350 reports per minute. The scalability achieved by this step is given as follows:

Scalability (throughput) = 350/180 = 1.9X

The system has now responded much better with a close to linear increase in scalability.

After further analysis, the architect finds that by rewriting the code that was processing reports on the server to run in multiple processes instead of a single process, he is able to reduce the processing time at the server, and hence, the latency of each request by roughly 1 second per request at peak time. The latency has now gone down from 2 seconds to 1 second.

The system's performance with respect to latency has become better by

Performance (latency): X = 2/1 = 2X

How does this improve scalability? Since the time taken to process each request is lesser now, the system overall will be able to respond to similar loads at a faster rate than what it was able to earlier. With the exact same resources, the system's throughput performance, and hence, scalability has increased assuming other factors remain the same.

Let's summarize what we discussed so far as follows:

In the first step, the architect increased the throughput of a single system by scaling it up by adding extra memory as a resource, which increased the overall scalability of the system. In other words, he scaled the performance of a single system by scaling up, which boosted the overall performance of the whole system.

In the second step, he added more nodes to the system, and hence, its ability to perform work concurrently, and found that the system responded well by rewarding him with a near-linear scalability factor. In other words, he increased the throughput of the system by scaling its resource capacity. Thus, he increased scalability of the system by scaling out, that is, by adding more compute nodes.

In the third step, he made a critical fix by running a computation in more than one process. In other words, he increased the concurrency of a single system by dividing the computation to more than one part. He found that this increased the performance characteristic of the application by reducing its latency, potentially setting up the application to handle workloads better at high stress.

We find that there is a relation between Scalability, Performance, Concurrency, and Latency. This can be explained as follows:

When performance of one of the components in a system goes up, generally the performance of the overall system goes up.

When an application scales in a single machine by increasing its concurrency, it has the potential to improve performance, and hence, the net scalability of the system in deployment.

When a system reduces its performance time, or its latency, at the server, it positively contributes to scalability.

We have captured these relationships in the following table:

Concurrency

Latency

Performance

Scalability

High

Low

High

High

High

High

Variable

Variable

Low

High

Poor

Poor

An ideal system is one that has good concurrency and low latency; such a system has high performance, and would respond better to scaling up and/or scaling out.

A system with high concurrency, but also high latency, would have variable characteristics—its performance, and hence, scalability would be potentially very sensitive to other factors such as current system load, network congestion, geographical distribution of compute resources and requests, and so on.

A system with low concurrency and high latency is the worst case—it would be difficult to scale such a system, as it has poor performance characteristics. The latency and concurrency issues should be addressed before the architect decides to scale the system horizontally or vertically.

Scalability is always described in terms of variation in performance throughput.

---

Concurrency
A system's concurrency is the degree to which the system is able to perform work simultaneously instead of sequentially. An application written to be concurrent in general, can execute more units of work in a given time than one which is written to be sequential or serial.

When one makes a serial application concurrent, one makes the application better utilize the existing compute resources in the system—CPU and/or RAM—at a given time. Concurrency, in other words, is the cheapest way of making an application scale inside a machine in terms of the cost of compute resources.

Concurrency can be achieved using different techniques. The common ones include the following:

Multithreading: The simplest form of concurrency is to rewrite the application to perform parallel tasks in different threads. A thread is the simplest sequence of programming instructions that can be performed by a CPU. A program can consist of any number of threads. By distributing tasks to multiple threads, a program can execute more work simultaneously. All threads run inside the same process.

Multiprocessing: Another way to concurrently scale up a program is to run it in multiple processes instead of a single process. Multiprocessing involves more overhead than multithreading in terms of message passing and shared memory. However, programs that perform a lot of CPU-intensive computations can benefit more from multiple processes than multiple threads.

Asynchronous Processing: In this technique, operations are performed asynchronously with no specific ordering of tasks with respect to time. Asynchronous processing usually picks tasks from a queue of tasks, and schedules them to execute at a future time, often receiving the results in callback functions or special future objects. Asynchronous processing usually happens in a single thread.

There are other forms of concurrent computing, but in this chapter, we will focus our attention on only these three.

Python, especially Python 3, has built-in support for all these types of concurrent computing techniques in its standard library. For example, it supports multi-threading via its threading module, and multiple processes via its multiprocessing module. Asynchronous execution support is available via the asyncio module. A form of concurrent processing that combines asynchronous execution with threads and processes is available via the concurrent.futures module.

In the coming sections we will take a look at each of these in turn with sufficient examples.

Note
NOTE: The asyncio module is available only in Python 3

Concurrency versus parallelism
We will take a brief look at the concept of concurrency and its close cousin, namely parallelism.

Both concurrency and parallelism are about executing work simultaneously rather than sequentially. However, in concurrency, the two tasks need not be executed at the exact same time; instead, they just need to be scheduled to be executed simultaneously. Parallelism, on the other hand, requires that both the tasks execute together at a given moment in time.

To take a real-life example, let's say you are painting two exterior walls of your house. You have employed just one painter, and you find that he is taking a lot more time than you thought. You can solve the problem in these two ways:

Instruct the painter to paint a few coats on one wall before switching to the next wall, and doing the same there. Assuming he is efficient, he will work on both the walls simultaneously (though not at the same time), and achieve the same degree of finish on both walls for a given time. This is a concurrent solution.

Employ one more painter. Instruct the first painter to paint the first wall, and the second painter to paint the second wall. This is a parallel solution.

Two threads are performing bytecode computations in a single core CPU do not exactly perform parallel computation, as the CPU can accommodate only one thread at a time. However, they are concurrent from a programmer's perspective, since the CPU scheduler performs fast switching in and out of the threads so that they appear to run in parallel.

However, on a multi-core CPU, two threads can perform parallel computations at any given time in its different cores. This is true parallelism.

Parallel computation requires that the computation resources increase at least linearly with respect to its scale. Concurrent computation can be achieved by using the techniques of multitasking, where work is scheduled and executed in batches, making better use of existing resources.

Note
In this chapter, we will use the term concurrent uniformly to indicate both types of execution. In some places, it may indicate concurrent processing in the traditional way, and in some other, it may indicate true parallel processing. Use the context to disambiguate.

Concurrency in Python – multithreading
We will start our discussion of concurrent techniques in Python with multithreading.

Python supports multiple threads in programming via its threading module. The threading module exposes a Thread class, which encapsulates a thread of execution. Along with this, it also exposes the following synchronization primitives:

A Lock object, which is useful for synchronized protected access to share resources, and its cousin RLock.

A Condition object, which is useful for threads to synchronize while waiting for arbitrary conditions.

An Event object, which provides a basic signaling mechanism between threads.

A Semaphore object, which allows synchronized access to limited resources.

A Barrier object, which allows a fixed set of threads to wait for each other, synchronize to a particular state, and proceed.

Thread objects in Python can be combined with the synchronized Queue class in
the queue module for implementing thread-safe producer/consumer workflows.

---

Multithreading versus multiprocessing
Now that we have come to the end of our discussion on multi-processing, it is a good time to compare and contrast the scenarios where one needs to choose between scaling using threads in a single process or using multiple processes in Python.

Here are some guidelines.

Use multithreading in the following cases:

The program needs to maintain a lot of shared states, especially mutable ones. A lot of the standard data structures in Python, such as lists, dictionaries, and others, are thread-safe, so it costs much less to maintain a mutable shared state using threads than via processes.

The program needs to keep a low memory foot-print.

The program spends a lot of time doing I/O. Since the GIL is released by threads doing I/O, it doesn't affect the time taken by the threads to perform I/O.

The program doesn't have a lot of data parallel operations which it can scale across multiple processes

Use multiprocessing in these scenarios:

The program performs a lot of CPU-bound heavy computing: byte-code operations, number crunching, and the like on reasonably large inputs.

The program has inputs which can be parallelized into chunks and whose results can be combined afterwards – in other words, the input of the program yields well to data-parallel computations.

The program doesn't have any limitations on memory usage, and you are on a modern machine with a multicore CPU and large enough RAM.

There is not much shared mutable state between processes that need to be synchronized—this can slow down the system, and offset any benefits gained from multiple processes.

Your program is not heavily dependent on I/O—file or disk I/O or socket I/O.

Concurrecy in Python - Asynchronous Execution
We have seen two different ways to perform concurrent execution using multiple threads and multiple processes. We saw different examples of using threads and their synchronization primitives. We also saw a couple of examples using multi-processing with slightly varied outcomes.

Apart from these two ways to do concurrent programming, another common technique is that of asynchronous programming or asynchronous I/O.

In an asynchronous model of execution, tasks are picked to be executed from a queue of tasks by a scheduler, which executes these tasks in an interleaved manner. There is no guarantee that the tasks will be executed in any specific order. The order of execution of tasks depend upon how much processing time a task is willing to yield to another task in the queue. Put in other words, asynchronous execution happens through co-operative multitasking.

Asynchronous execution usually happens in a single thread. This means no true data parallelism or true parallel execution can happen. Instead, the model only provides a semblance of parallelism.

As execution happens out of order, asynchronous systems need a way to return the results of function execution to the callers. This usually happens with callbacks, which are functions to be called when the results are ready or using special objects that receive the results, often called futures.

Python 3 provides support for this kind of execution via its asyncio module
using coroutines. Before we go on to discuss this, we will spend some time
understanding pre-emptive multitasking versus cooperative multitasking, and how
we can implement a simple cooperative multitasking scheduler in Python using
generators.

---

Scaling workflows – message queues and task queues
One important aspect of scalability is to reducing coupling between systems. When two systems are tightly coupled, they prevent each other from scaling beyond a certain limit.

For example, a code written serially, where data and computation is tied into the same function, prevents the program from taking advantage of the existing resources like multiple CPU cores. When the same program is rewritten to use multiple threads (or processes) and a message passing system like a queue in between, we find it scales well to multiple CPUs. We've seen such examples aplenty in our concurrency discussion.

In a much similar way, systems over the Web scale better when they are decoupled. The classic example is the client/server architecture of the Web itself, where clients interact via well-known RestFUL protocols like HTTP, with servers located in different places across the world.

Message queues are systems that allow applications to communicate in a decoupled manner by sending messages to each other. The applications typically run in different machines or servers connected to the Internet, and communicate via queuing protocols.

One can think of a message queue as a scaled-up version of the multi-threaded synchronized queue, with applications on different machines replacing the threads, and a shared, distributed queue replacing the simple in-process queue.

Message queues carry packets of data called messages, which are delivered from the Sending Applications to the Receiving Applications. Most Message Queue provide store and forward semantics, where the message is stored on the queue till the receiver is available to process the message.

Here is a simple schematic model of a Message Queue:


Schematic model of a distributed message queue

The most popular and standardized implementation of a message queue or message-oriented middleware (MoM) is the Advanced Message Queuing Protocol (AMQP). AMQP provides features such as queuing, routing, reliable delivery, and security. The origins of AMQP are in the financial industry, where reliable and secure message delivery semantics are of critical importance.

The most popular implementations of AMQP (version 1.0) are Apache Active MQ, RabbitMQ, and Apache Qpid.

RabbitMQ is a MoM written in Erlang. It provides libraries in many languages including Python. In RabbitMQ, a message is always delivered via exchanges via routing keys which indicate the queues to which the message should be delivered.

We won't be discussing RabbitMQ in this section anymore, but will move on to a
related, but slightly different, middleware with a varying focus, namely,
Celery.

---

Celery – a distributed task queue
Celery is a distributed task queue written in Python, which works using distributed messages. Each execution unit in celery is called a task. A task can be executed concurrently on one or more servers using processes called workers. By default, celery achieves this using multiprocessing, but it can also use other backend such as gevent, for example.

Tasks can be executed synchronously or asynchronously with results available in the future, like objects. Also, task results can be stored in storage backend such as Redis, databases, or in files.

Celery differs from message queues in that the basic unit in celery is an executable task—a callable in Python—rather than just a message.

Celery, however, can be made to work with message queues. In fact, the default broker for passing messages in celery is RabbitMQ, the popular implementation of AMQP. Celery can also work with Redis as the broker backend.

Since Celery takes a task, and scales it over multiple workers; over multiple servers, it is suited to problems involving data parallelism as well as computational scaling. Celery can accept messages from a queue and distribute it over multiple machines as tasks for implementing a distributed e-mail delivery system, for example, and achieve horizontal scalability. Or, it can take a single function and perform parallel data computation by splitting the data over multiple processes, achieving parallel data processing.

In the following example, we will take our Mandelbrot fractal program and, rewrite it to work with Celery. We will try to scale the program by performing data parallelism, in terms of computing the rows of the Mandelbrot set over multiple celery workers—in a similar way to what we did with PyMP.

The Mandelbrot set using Celery
For implementing a program to take advantage of Celery, it needs to be implemented as a task. This is not as difficult as it sounds. Mostly, it just involves preparing an instance of the celery app with a chosen broker backend, and decorating the callable we want to parallelize – using the special decorator @app.task where app is an instance of Celery.

We will look at this program listing step by step, since it involves a few new things. The software requirements for this session are as follows:

Celery

An AMQP backend; RabbitMQ is preferred

Redis as a result storage backend

First we will provide the listing for the Mandelbrot tasks module:

Copy
# mandelbrot_tasks.py
from celery import Celery

app = Celery('tasks', broker='pyamqp://guest@localhost//',
             backend='redis://localhost')

@app.task
def mandelbrot_calc_row(y, w, h, max_iteration = 1000):
    """ Calculate one row of the mandelbrot set with size w x h """

    y0 = y * (2/float(h)) - 1 # rescale to -1 to 1

    image_rows = {}
    for x in range(w):
        x0 = x * (3.5/float(w)) - 2.5 # rescale to -2.5 to 1

        i, z = 0, 0 + 0j
        c = complex(x0, y0)
        while abs(z) < 2 and i < max_iteration:
            z = z**2 + c
            i += 1

        color = (i % 8 * 32, i % 16 * 16, i % 32 * 8)
        image_rows[y*w + x] = color

    return image_rows
Let us analyze this preceding code:

We first do the imports required for celery. This requires importing the Celery class from the celery module.

We prepare an instance of the Celery class as the celery app using AMQP as the message broker and Redis as the result backend. The AMQP configuration will use whatever AMQP MoM is available on the system (in this case, it is RabbitMQ).

We have a modified version of mandelbrot_calc_row. In the PyMP version, the image_rows dictionary was passed as an argument to the function. Here, the function calculates it locally and returns a value. We will use this return value at the receiving side to create our image.

We decorated the function using @app.task, where app is the Celery instance. This makes it ready to be executed as a celery task by the celery workers.

Next is the main program, which calls the task for a range of y input values and creates the image:

Copy
# celery_mandelbrot.py
import argparse
from celery import group
from PIL import Image
from mandelbrot_tasks import mandelbrot_calc_row

def mandelbrot_main(w, h, max_iterations=1000,
output='mandelbrot_celery.png'):
    """ Main function for mandelbrot program with celery """

    # Create a job – a group of tasks
    job = group([mandelbrot_calc_row.s(y, w, h, max_iterations) for y in range(h)])
    # Call it asynchronously
    result = job.apply_async()

    image = Image.new('RGB', (w, h))

    for image_rows in result.join():
        for k,v in image_rows.items():
            k = int(k)
            v = tuple(map(int, v))
            x,y = k % args.width, k // args.width
            image.putpixel((x,y), v)

    image.save(output, 'PNG')
    print('Saved to',output)
The argument parser is the same so is not reproduced here.

This last bit of code introduces some new concepts in celery, so needs some explanation. Let us analyze the code in some detail:

The mandelbrot_main function is similar to the previous mandelbrot_calc_set function in its arguments.

This function sets up a group of tasks, each performing mandelbrot_calc_row execution on a given y input over the entire range of y inputs from 0 to the height of the image. It uses the group object of celery to do this. A group is a set of tasks which can be executed together.

The tasks are executed by calling the apply_async function on the group. This executes the tasks asynchronously in the background in multiple workers. We get an async result object in return—the tasks are not completed yet.

We then wait on this result object by calling join on it, which returns the results—the rows of the image as a dictionary from each single execution of the mandelbrot_calc_row task. We loop through this, and do integer conversions for the values, since celery returns data as strings, and put the pixel values in the image.

Finally, the image is saved in the output file.

So how does celery execute the tasks? This needs the celery program to run, processing the tasks module with a certain number of workers. Here is how we start it in this case:


Celery console—workers starting up with the Mandelbrot task as target

The command starts celery with tasks loaded from the module mandelbrot_tasks.py with a set of 4 worker processes. Since the machine has 4 CPU cores, we have chosen this as the concurrency.

Note
Note that Celery will automatically default the workers to the number of cores if not specifically configured.

The program ran under 15 seconds, twice as faster than the single-process version and also the PyMP version.

If you observe the celery console, you will find a lot of messages getting echoed, since we configured celery with the INFO log level. All these are info messages with data on the tasks and their results:

The following screenshot shows the result of the run for 10000 iterations. This performance is slightly better than that of the similar run by the PyMP version earlier, by around 20 seconds:


Celery Mandelbrot program for a set of 10000 iterations.

Celery is used in production systems in many organizations. It has plugins for some of the more popular Python web application frameworks. For example, celery supports Django out-of-the-box with some basic plumbing and configuration. There are also extension modules such as django-celery-results, which allow the programmer to use the Django ORM as celery results backend.

It is beyond the scope of this chapter and book to discuss this in detail so the reader is suggested to refer to the documentation available on this on the celery project website.

Serving with Python on the Web—WSGI
Web Server Gateway Interface (WSGI) is a specification for a standard interface between Python web application frameworks and web servers.

In the early days of Python web applications, there was a problem of connecting web application frameworks to web servers, since there was no common standard. Python web applications were designed to work with one of the existing standards of CGI, FastCGI, or mod_python (Apache). This meant that an application written to work with one web server might not be able to work with another. In other words, interoperability between the uniform application and web server was missing.

WSGI solved this problem by specifying a simple, but uniform, interface between servers and web application frameworks to allow for portable web application development.

WSGI specifies two sides: the server (or gateway) side, and the application or framework side. A WSGI request gets processed as follows:

The server side executes the application, providing it with an environment and a callback function

The application processes the request, and returns the response to the server using the provided callback function

Here is a schematic diagram showing the interaction between a web server and web application using WSGI:


Schematic diagram showing WSGI protocol interaction

Following is the simplest function that is compatible with the application or framework side of WSGI is:

Copy
def simple_app(environ, start_response):
    """Simplest possible application object"""

    status = '200 OK'
    response_headers = [('Content-type', 'text/plain')]
    start_response(status, response_headers)
    return ['Hello world!\n']
The preceding function can be explained as follows:

The environ variable is a dictionary of environment variables passed from the server to the application as defined by the Common Gateway Interface (CGI) specification. WSGI makes a few of these environment variables mandatory in its specification.

The start_response is a callable provided as a callback from the server side to the application side to start response processing on the server side. It must take two positional arguments. The first should be a status string with an integer status code, and the second, a list of (header_name, header_value), tuples describing the HTTP response header.

Note
For more details, the reader can refer to the WSGI specification v1.0.1, which is published on the Python language website as PEP 3333.

Note
Python Enhancement Proposal (PEP) is a design document on the Web, that describes a new feature or feature suggestion for Python, or provides information to the Python community about an existing feature. The Python community uses PEPs as a standard process for describing, discussing, and adopting new features and enhancements to the Python programming language and its standard library.

WSGI middleware components are software that implement both sides of the specification, and hence, provide capabilities such as the following:

Load balancing of multiple requests from a server to an application

Remote processing of requests by forwarding requests and responses over a network

Multi-tenancy or co-hosting of multiple servers and/or applications in the same process

URL-based routing of requests to different application objects

The middleware sits in between the server and application. It forwards requests from server to the application and responses from application to the server.

There are a number of WSGI middleware an architect can choose from. We will briefly look at two of the most popular ones, namely, uWSGI and Gunicorn.

uWSGI – WSGI middleware on steroids
uWSGI is an open source project and application, which aims to build a full stack for hosting services. The WSGI of the uWSGI project stems from the fact that the WSGI interface plugin for Python was the first one developed in the project.

Apart from WSGI, the uWSGI project also supports Perl Webserver Gateway Interface (PSGI) for Perl web applications, and the rack web server interface for Ruby web applications. It also provides gateways, load balancers, and routers for requests and responses. The Emperor plugin of uWSGI provides management and monitoring of multiple uWSGI deployments of your production system across servers.

The components of uWSGI can run in preforked, threaded, asynchronous. or green-thread/co-routine modes.

uWSGI also comes with a fast and in-memory caching framework, which allows the responses of the web applications to be stored in multiple caches on the uWSGI server. The cache can also be backed with a persistence store such as a file. Apart from a multitude of other things, uWSGI also supports virtualenv based deployments in Python.

uWSGI also provides a native protocol, that is used by the uWSGI server. uWSGI version 1.9 also adds native support for the web sockets.

Here is a typical example of a uWSGI configuration file:

Copy
[uwsgi]

# the base directory (full path)
chdir           = /home/user/my-django-app/
# Django's wsgi file
module          = app.wsgi
# the virtualenv (full path)
home            = /home/user/django-virtualenv/
# process-related settings
master          = true
# maximum number of worker processes
processes       = 10
# the socket
socket          = /home/user/my-django-app/myapp.sock
# clear environment on exit
vacuum          = true
A typical deployment architecture with uWSGI looks like what is depicted in the following diagram. In this case, the web server is Nginx, and the web application framework is Django. uWSGI is deployed in a reverse-proxy configuration with Nginx, forwarding request and responses between Nginx and Django:


uWSGI deployment with Nginx and Django

Note
The Nginx web server supports a native implementation of the uWSGI protocol since version 0.8.40. There is also a proxy module support for uWSGI in Apache named mod_proxy_uwsgi.

uWSGI is an ideal choice for Python web application production deployments where one needs a good balance of customization with high performance and features. It is the swiss-army-knife of components for WSGI web application deployments.

Gunicorn – unicorn for WSGI
The Gunicorn project is another popular WSGI middleware implementation, which is opensource. It uses a preforked model, and is a ported version from the unicorn project of Ruby. There are different worker types in Gunicorn, like uWSGI supporting synchronous and asynchronous handling of requests. The asynchronous workers make use of the Greenlet library which is built on top of gevent.

There is a master process in Gunicorn that runs an event loop, processing and reacting to various signals. The master manages the workers, and the workers process the requests, and send responses.

Gunicorn versus uWSGI
Here are a few guidelines when choosing whether to go with Gunicorn or uWSGI for your Python web application deployments:

For simple application deployments which don't need a lot of customization, gunicorn is a good choice. uWSGI has a bigger learning curve when compared to Gunicorn, and takes a while to get used to. The defaults in Gunicorn work pretty well for most deployments.

If your deployment is homogenously Python, then Gunicorn is a good choice. On the other hand, uWSGI allows you to perform heterogeneous deployments due to its support for other stacks such as PSGI and Rack.

If you want a more full-featured WSGI middleware, which is heavily customizable, then uWSGI is a safe bet. For example, uWSGI makes Python virtualenv-based deployments simple, whereas, Gunicorn doesn't natively support virtualenv; instead, Gunicorn itself has to be deployed in the virtual environment.

Since Nginx supports uWSGI natively, it is very commonly deployed along with Nginx on production systems. Hence, if you use Nginx, and want a full-featured and highly customizable WSGI middleware with caching, uWSGI is the default choice.

With respect to performance, both Gunicorn and uWSGI score similarly on different benchmarks published on the Web.

Scalability architectures
As discussed, a system can scale vertically, or horizontally, or both. In this section, we will briefly look at a few of the architectures that an architect can choose from when deploying his systems to production to take advantage of the scalability options.

Vertical scalability architectures
Vertical scalability techniques comes in the following two flavors:

Adding more resources to an existing system: This could mean adding more RAM to a physical or virtual machine, adding more vCPUs to a virtual machine or VPS, and so on. However, none of these options are dynamic, as they require stopping, reconfiguring, and restarting the instance.

Making better use of existing resources in the system: We have spent a lot of this chapter discussing this approach. This is when an application is rewritten to make use of the existing resources, such as multiple CPU cores, more effectively by concurrency techniques such as threading, multiple processes, and/or asynchronous processing. This approach scales dynamically, since no new resource is added to the system, and hence, there is no need for a stop/start.

Horizontal scalability architectures
Horizontal scalability involves a number of techniques that an architect can add to his tool box, and pick and choose from. They include the ones listed next:

Active redundancy: This is the simplest technique of scaling out, which involves adding multiple, homogenous processing nodes to a system typically fronted with a load balancer. This is a common practice for scaling out web application server deployments. Multiple nodes make sure that an even if one or a few of the systems fail, the remaining systems continue to carry out request processing, ensuring no downtime for your application.

In a redundant system, all the nodes are actively in operation, though only one or a few of them may be responding to requests at a specific time.

Hot standby: A hot standby (hot spare) is a technique used to switch to a system that is ready to server requests, but is not active till the moment the main system go down. A hot spare is in many ways exactly similar to the main node(s) that is serving the application. In the event of a critical failure, the load balancer is configured to switch to the hot spare.

The hot spare itself may be a set of redundant nodes instead of just a single node. Combining redundant systems with a hot spare ensures maximum reliability and failover.

Note
A variation of a hot standby is a software standby, which provides a mode in the application that switches the system to a minimum Quality of Service (QoS) instead of offering the full feature at extreme load. An example is a web application that switches to the read-only mode under high loads, serving most users but not allowing writes.

Read replicas: The response of a system that is dependent on read-heavy operations on a database can be improved by adding read-replicas of the database. Read replicas are essentially database nodes that provide hot backups (online backups), which constantly sync from the main database node. Read replicas, at a given point of time, may not be exactly consistent with the main database node, but they provide eventual consistency with SLA guarantees.

Cloud service providers such as Amazon make their RDS database service available with a choice of read replicas. Such replicas can be distributed geographically closer to your active user locations to ensure less response time and failover in case the master node goes down, or doesn't respond.

Read replicas basically offer your system a kind of data redundancy.

Blue-green deployments: This is a technique where two separate systems (labeled blue and green in the literature) are run side by side. At any given moment, only one of the systems is active and is serving requests. For example, blue is active, green is idle.

When preparing a new deployment, it is done on the idle system. Once the system is ready, the load balancer is switched to the idle system (green), and away from the active system (blue). At this point, green is active, and blue is idle. The positions are reversed again in the next switch.

Blue-green deployments, if done correctly, ensure zero to minimum downtime of your production applications.

Failure monitoring and/or restart: A failure monitor is a system that detects failure of critical components—software or hardware—of your deployments, and either notifies you, and/or takes steps to mitigate the downtime.

For example, you can install a monitoring application on your server that detects when a critical component, say, a celery or rabbitmq server, goes down, sends an e-mail to the DevOps contact, and also tries to restart the daemon.

Heartbeat monitoring is another technique where a software actively sends pings or heartbeats to a monitoring software or hardware, which could be in the same machine or another server. The monitor will detect the downtime of the system if it fails to send the heartbeat after a certain interval, and could then inform and/or try to restart the component.

Nagios is an example of a common production monitoring server, usually deployed in a separate environment, and monitors your deployment servers. Other examples of system-switch monitors and restart components are Monit and Supervisord.

Apart from these techniques, the following best practices should be followed when performing system deployments to ensure scalability, availability, and redundancy/failover:

Cache it: Use caches, and if possible, distributed caches, in your system as much as possible. Caches can be of various types. The simplest possible cache is caching static resources on the content delivery network (CDN) of your application service provider. Such a cache ensures geographic distribution of resources closer to your users, which reduces response, and hence, page-load times.

A second kind of cache is your application's cache, where it caches responses and database query results. Memcached and Redis are commonly used for these scenarios, and they provide distributed deployments, typically, in master/slave modes. Such caches should be used to load and cache most commonly requested content from your application with proper expiry times to ensure that the data is not too stale.

Effective and well-designed caches minimize system load, and avoid multiple, redundant operations that can artificially increase load on a system and decrease performance:

Decouple: As much as possible, decouple your components to take advantage of the shared geography of your network. For example, a message queue may be used to decouple components in an application that need to publish and subscribe data instead of using a local database or sockets in the same machine. When you decouple, you automatically introduce redundancy and data backup to your system, since the new components you add for decoupling—message queues, task queues, and distributed caches—typically come with their own stateful storage and clustering.

The added complexity of decoupling is the configuration of the extra systems. However, in this day and age, with most systems being able to perform auto configuration or providing simple web-based configurations, this is not an issue.

You can refer to literature for application architectures that provide effective decoupling, such as observer patterns, mediators, and other such middleware:

Gracefully degrade: Rather than being unable to answer a request and providing timeouts, arm your systems with graceful degradation behaviors. For example, a write-heavy web application can switch to the read-only mode under heavy load when it finds that the database node is not responding. Another example is when a system which provides heavy, JS-dependent dynamic web pages could switch to a similar static page under heavy loads on the server when the JS middleware is not responding well.

Graceful degradation can be configured on the application itself, or on the load balancers, or both. It is a good idea to prepare your application itself to provide a gracefully downgraded behavior, and configure the load balancer to switch to that route under heavy loads.

Keep data close to the code: A golden rule of performance-strong software is to provide data closer to where the computation is. For example, if your application is making 50 SQL queries to load data from a remote database for every request, then you are not doing this correctly.

Providing data close to the computation reduces data access and transport times, and hence, processing times, decreasing latency in your application, and making it more scalable.

There are different techniques for this: caching, as discussed earlier, is a favored technique. Another one is to split your database to a local and remote one, where most of the reads happen from the local read replica, and writes (which can take time) happen to a remote write master. Note that local in this sense may not mean the same machine, but typically, the same data center, sharing the same subnet if possible.

Also, common configurations can be loaded from an on-disk database like SQLite or local JSON files, reducing the time it takes for preparing the application instances.

Another technique is to not store any transactional state in the application tier or the frontend, but to move the state closer to the backend where the computation is. Since this makes all application server nodes equal in terms of not having any intermediate state, it also allows you to front them with a load-balancer, and provide a redundant cluster of equals, any of which can serve a given request.

Design according to SLAs: It is very important for an architect to understand the guarantees that the application provides to its users, and design the deployment architecture accordingly.

The CAP theorem ensures that if a network partition in a distributed system fails, the system can guarantee only one of consistency or availability at a given time. This groups distributed systems into two common types, namely, CP and AP systems.

Most web applications in today's world are AP. They ensure availability, but data is only eventually consistent, which means they will serve stale data to users in case one of the systems in the network partition, say the master DB node, fails.

On the other hand. a number of businesses such as banking, finance, and healthcare need to ensure consistent data even if there is a network partition failure. These are CP systems. The data in such systems should never be stale, so, in case of a choice between availability and consistent data, they will chose the latter.

The choice of software components, application architecture, and the final
deployment architecture are influenced by these constraints. For example, an AP
system can work with NoSQL databases which guarantee eventual consistent
behavior. It can make better use of caches. A CP system, on the other hand, may
need ACID guarantees provided by Relational Database Systems (RDBMs).
