Bringing Back the Science to Data Science; With the Help of Software Architects
infocus.dellemc.comView OriginalApril 11th, 2018
The increasing push to leverage the vast amount of collected data via the Internet of Things (IoT) for machine-learning-based solutions is putting new, nonscientific demands on data scientists. But as we found in a recent collaboration with software architects, there is much to be gained by incorporating different domain expertise into building great data-based solutions.

Not only did we fulfill a customer’s request for a key monitoring system for mission-critical applications, we were also able to bring back the science to data science in the process.

Our Changing Data Science Role
The IT world is advancing towards machine-learning-based solutions for monitoring and analyzing the behavior of systems and applications. The huge growth in systems’ complexity and the number of hosted micro-services, as well as the vast amount of collected data requires the use of automatic, human-assisting and data-driven algorithms that can easily adjust with time.

The IoT takes data, along with the data scientists that analyze it, to the front line of production. Data insights and proof of concepts (POC) are no longer just a nice-to-have for IT organizations; data scientists today are contributing to the creation of solutions and the time they have to turn a POC into a solution running in a production environment has become shorter and shorter.

Our Data Science Solutions team recently developed such a solution called ITOA (IT Operations Analytics) for one of Dell’s strategic customers. This is a monitoring system designed for mission-critical applications that can integrate multiple Key Performance Indicators (KPIs) extracted from the application log-data into one normalized health score showing the system state. The solution enables faster detection of significant abnormal behavior of the system as well as better investigation capabilities when such behavior occurs.

Creating such a solution that transforms and analyzes huge amounts of data in real-time is extremely challenging, requiring an elaborate pipeline design for its successful application.


Figure 1: The ITOA solution developed by DS team. The data is collected as system-logs whose values are then transformed into continuous time-series
Photo by: for example the instantaneous counts of a specific operation
Importance of a Correct Design
One of the main advantages of the solution we eventually delivered is the fact that the methodology used can be applied to any log-generating system, as it monitors data arriving from system logs by transforming the discrete values appearing in the logs into continuous time-series (see figure 1 for an overview of the solution pipeline). These time-series features are the result of multiple functions and transformations applied on the collected raw data and represent the different monitored aspects of the system.

A common misconception regarding data science projects is that data scientists invest most of their time on choosing, training and evaluating the Machine Learning (ML) model on the available data. In practice, the vast amount of the data scientists’ time is spent before even considering the ML model they wish to apply. A typical DS project normally includes multiple pre-processing steps of the raw data before it can be injected into an ML model (see figure 2 for a sketch of a typical DS project life-cycle).

In a production environment, these steps need to be performed iteratively and efficiently.  As systems and data nowadays become more and more complicated, chances are that the typical data scientist will not possess the required set of skills to correctly design the pipeline of such a solution.


Figure 2: A typical DS project life-cycle includes multiple pre-processing steps of the raw data before applying the ML model. A vast amount of the data scientist time is spent in these preliminary stages
For example, in the ITOA project the ML model generating the instantaneous health score is not applied on the data in its raw form but rather on a substantially transformed version of it called the “features’ residuals.” Generating these “residuals vectors” involves collecting log-data from multiple data sources, parsing the logs into field and values pairs, converting the values into continuous time-series and completing missing values. Only after applying time series modeling methods and calculating the difference between the expected and actual value for each KPI separately, these residuals are combined and used as input for the model to learn the normal behavior of the system.

If you are a data scientist, whose main expertise lies in applying ML algorithms and statistics and not in system design, successfully implementing such a sophisticated solution can become extremely challenging. What’s more, after running it for some time you would obviously like to evaluate how well it is working and consider possible improvements. This requires changing some parameters of the system in a controlled manner and examining how it affects its performance. But this becomes extremely difficult if the code you wrote is too long and tangled and you have no idea how changing one part of it may affect the entire pipeline.

Code Architecture Enhances Innovation
By definition, “data science” is the science of data, where we study the system behavior by manipulating and transforming the data to extract insights and make predictions. “Science” requires systematically building and organizing a substantial knowledge-base one can rely on when conducting experiments, extending and refining the technology.

Luckily, we had the opportunity to work with professional software architects from the Service Providers technology team that translated our data science requirements into a solution designed according to a set of essential programming principles.

Products that rely on insights extracted from data must comply with specific constraints to allow for their successful application, evaluation and evolution. These dictate a solution that is: modular, for easy debugging and maintenance, extendable, for straightforward integration and testing of new data-based features and general, to enable the application of the solution on any log-generating system (see figure 3 for the solution UML).


Figure 3: A sketch for the solution that was developed with collaboration of software architects. The solution is extremely modular with complete separation of the classes responsible for communicating with the data-base/ holding the data/ modeling the data and more.
We found working in collaboration with software architects is imperative for designing reliable reproducible experiments. By following the programming principles mentioned above we were able to extend the code to include specific data manipulation which could be straightforwardly tested for their effect on the results. A proper design also helps to identify and tackle different types of runtime errors since it is highly modular, with each class only responsible for performing a specific task, it is relatively easy to make specific configuration changes that can clearly distinguish software from hardware issues.

Figure 4: One example for consuming the solution results. Upper left: The health score as a function of time. Lower left: All the monitored features as a function of time. Right: The average health-score. Notice the solution ability to capture the abnormal behavior out of seemingly noisy data.

Summary
There is much to be gained by incorporating different domain expertise into your data science project (see figure 4 for an example dashboard that is built on top of the analytical engine). The resultant symbioses can lead to solutions at a whole new level, not to mention creating a cross pollination from which both sides can benefit. Such cooperation is often hampered by a lack of cross-teams communication and the tendency of each group to operating separately, applying the same old traditional practices. Yet this and similar experiences show us that instead of dreading the possibility of collaboration, we should embrace it.
