+++
draft = true
+++

http://www.cassandrahl.com/blog/7-steps-to-create-a-test-strategy-from-scratch/

7 Steps to Create a Test Strategy from Scratch
 20th November 2018  Cassandra H. Leung  Experience Reports, Productivity, Resources, Software Production
Reading Time: 4 minutes


I recently found myself in the situation of having to create a test strategy completely from scratch, for the “imminent” launch of a web app that I’d never actually seen or been involved in before.  Though faced with hurdles and pressured by time, it was a very interesting and enjoyable experience, where I felt that I added value and made a difference to the project.



Here are the seven steps I took to create a test strategy for a web app from scratch.





1. Understand the Architecture


My first step was to get a high-level overview of the system architecture.  Although I was officially working with the front-end team on this, it had come to my attention that the back end teams didn’t have a tester, and there were rumours that they had never tested the back end before.  It was important for me to understand all the systems that fed into the front-end (and there were many!), so that I could identify potential points for error and address them appropriately.



I had access to two front-end developers that had been working on the web app thus far, and they shared lots of useful information.  I also had another web tester with me, who would be carrying out the manual testing. Unfortunately, there was no product owner at the time, so we didn’t have anyone from the business side to consult, and no pre-defined launch scope, goals or MVP feature list.  We had to start from scratch and piece everything we had together as best as we could.



We spent the best part of a day gathered around a whiteboard, drawing models and diagrams, asking questions, noting open points and useful contacts.





2. Establish the Scope


With a good overview of the system architecture, the next important step was to establish what, out of all of that, was within the web team’s scope for testing.  Given the rumours around responsibility and previous testing efforts, I was keen to clarify the web team’s responsibility, and also confirm who, if not us, would be testing everything else.  I visited other teams to make sure their areas were addressed and tried to uncover any unknown expectations of the front-end team, or any gaps where no one had planned to test yet. Working on the “final layer” of the product, we had plenty of dependencies but little time, so a “divide and conquer” approach made sense.





3. Map the Features


Once we were sure of the team’s system level responsibility, we started mapping out the features of the product that would be included in the launch.  Since it was actually a rebuilt version of an existing product, we needed to understand how the two would differ, and get on the same page about the expectations of the new app.



This part was relatively straight-forward, but questioning during this exercise revealed some interesting miscellaneous information and considerations that hadn’t come up earlier.





4. Confirm the Scope


After we knew what to test, we needed to know how deep.  Some of the questions covered included:

How was this feature implemented?
How much is done by the API and how much is front-end?
Is there any potential for data loss here on our side?
What caching do we have in place and what impact might this have on changes to data or content?
Is this part already working in production, or was it rebuilt too?




5. Risk Storming


The two test strategy days ended with a risk storming session with Test Sphere, something I always find to be efficient and effective.  By the end of it, we had agreed on:

The six most important quality aspects for the launch
Quality aspects to put to one side until after the launch
Potential risks and how to mitigate them
What to automate and how
Additional actions required for a successful launch




6. Inform Decisions with Data


An important step in defining the test strategy was to consider data on what devices, operating systems, and browsers were being used to access the existing app.  Since one would be swapped out for the other, I wanted to use this information to understand how the majority of users would continue to reach the app, and use this to guide the combination of devices, OSs and browsers to use and focus on during testing.



The fun thing about my data analysis is that the segmentation wasn’t necessarily as I might have expected.  In my mind, that’s a sign that it was a good idea to look at real data, and not rely on assumptions.





7. Document


I took pictures of all the models, diagrams, and the risk storming board, but I needed to tidy it all up and make it available to everyone on the project.  I digitised the models using draw.io, summarised our findings and decisions, and drew insights from the data of existing visitors.  I think I spent another two days cleaning up and documenting everything, including the data analysis.



I was in somewhat of a rush to finish everything before leaving the office for two weeks, and after I left the office, I had the glaring realisation that I’d forgotten to sum everything up in a one page test plan.  These have been effective for me in the past, so I hope I won’t forget to do this again in future.





All in all, I’m really happy with the test strategy that I was able to create and document with the participants in such a short space of time, and with the various constraints and challenges of the project.



Have you created a test strategy from scratch before?  How did you go about it? Please share your experiences in the comments.
