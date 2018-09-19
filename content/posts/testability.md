+++
title = "Placeholder"
date = "1990-03-29"
draft = true
tags = [
    ""
]
+++

Understanding testability

https://www.packtpub.com/mapt/book/application_development/9781786468529/3/ch03lvl1sec21/understanding-testability

The testability can be defined as follows:

"The degree of ease with which a software system exposes its faults through execution-based testing"

A software system with a high level of testability provides a high degree of exposure of its faults through testing, thereby giving the developers higher accessibility to the system's issues, and allowing them to find and fix bugs faster. A less testable system, on the other hand, would make it difficult for the developers to figure out issues with it, and can often lead to unexpected failures in production.

The testability is, thus, an important aspect in ensuring the quality, stability, and predictability of the software system in production.

Software testability and related attributes
A software system is testable if it gives up (exposes) its faults easily to the tester. Not only that, the system should behave in a predictable way for the tester to develop useful tests. An unpredictable system would give varying outputs to a fixed input at varying times, hence, is not testable (or very useful for that matter!).

More than unpredictability, complex or chaotic systems are also less amenable to testing. For example, a system whose behavior varies wildly across a spectrum under load doesn't make a good candidate for load testing. Hence, deterministic behavior is also important to assure the testability of a system.

Another aspect is the amount of control that the tester has on the substructures of the system. In order to design meaningful tests, a system should be easily identifiable to subsystems with their well-defined APIs, for which tests can be written . A software system that is complex, and doesn't provide easy access to its subsystems, by definition, becomes much less testable than the one which does.

This means that systems which are more structurally complex are more difficult to test than ones which aren't.

Let us list this down in an easy-to-read table.

Determinism

Complexity

Testability

High

Low

High

Low

High

Low

Testability – architectural aspects
Software testing generally implies that the software artifact being tested is being assessed for its functionality. However, in practical software testing, functionality is just one of the aspects that can fail. Testing implies assessing the software for other quality attributes such as performance, security, robustness, and so on.

Due to these different aspects of testing, software testability is usually grouped at different levels. We will take a look at these from the point of view of software architecture.

Here is a brief listing of the different aspects that usually fall under software testing:

Functional testing: This involves testing the software for verifying its functionality. A unit of software passes its functional test if it behaves exactly the way it is supposed to as per its development specifications. Functional testing is usually of two types:

White-box testing: These are usually tests implemented by the developers, who have visibility into the software code, themselves. The units being tested here are the individual functions, methods, classes, or modules that make up the software rather than the end user functionality. The most basic form of white-box testing is Unit testing. Other types are integration testing and system testing.

Black-box testing: This type of testing is usually performed by someone who is outside the development team. The tests have no visibility into the software code, and treat the entire system like a black box. Black-box testing tests the end user functionality of the system without bothering about its internal details. Such tests are usually performed by dedicated testing or QA engineers. However, nowadays, a lot of black-box tests on web-based applications can be automated by using testing frameworks like Selenium.

Other than functional testing, there are a lot of testing methodologies, which are used to assess the various architectural quality attributes of a system. We will discuss these next.

Performance testing: Tests which measure how a software performs with respect to its responsiveness and robustness (stability) under high workloads come within this category. Performance tests are usually categorized into the following:

Load testing: Tests that assess how a system performs under a certain specific load, either in terms of the number of concurrent users, input data, or transactions.

Stress testing: Tests the robustness and response of the system when some inputs present a sudden or high rate of growth and go to extreme limits. Stress tests typically tend to test the system slightly beyond its prescribed design limits. A variation of stress testing is running the system under a certain specified load for extended periods of time, and measuring its responsiveness and stability.

Scalability testing: Measure how much the system can scale out or scale up when the load is increased. For example, if a system is configured to use a cloud service, this can test the horizontal scalability—as in how the system auto scales to a certain number of nodes upon increased load, or vertical scalability—in terms of the degree of utilization of CPU cores and/or RAM of the system.

Security testing: Tests that verify the system's security fall into this category. For web-based applications, this usually involves verifying authorization of roles by checking that a given login or role can only perform a specified set of actions and nothing more (or less). Other tests that fall under security would be to verify proper access to data or static files to make sure that all sensitive data of an application is protected by proper authorization via logins.

Usability testing: Usability testing involves testing how much the user interface of a system is easy to use, is intuitive, and understandable by its end users. Usability testing is usually done via target groups comprising selected people who fall into the definition of the intended audience or end users of the system.

Installation testing: For software that is shipped to the customer's location and is installed there, installation testing is important. This tests and verifies that all the steps involved in building and/or installing the software at the customer's end work as expected. If the development hardware differs from the customer's, then the testing also involves verifying the steps and components in the end user's hardware. Apart from a regular software installation, installation testing is also important when delivering software updates, partial upgrades, and so on.

Accessibility testing: Accessibility, from a software standpoint, refers to the degree of usability and inclusion of a software system towards end users with disabilities. This is usually done by incorporating support for accessibility tools in the system, and designing the user interface by using accessible design principles. A number of standards and guidelines have been developed over the years, which allow organizations to develop software with a view to making the software accessible to such an audience. Examples are the Web Content Accessibility Guidelines (WCAG) of W3C, Section 508 of the Government of USA, and the like.

Accessibility testing aims to assess the accessibility of software with respect to these standards, wherever applicable.

There are various other types of software testing, which involves different approaches, and are invoked at various phases of software development, such as Regression testing, Acceptance testing, Alpha or Beta testing, and so on.

However, since our focus of discussion is on the architectural aspects of software testing, we will limit our attention to the topics mentioned in the previous list.

Testability – strategies
We saw in a previous section how testability varies according to the complexity and determinism of the software system under testing.

Being able to isolate and control the artifacts that are being tested is critical to software testing. Separation of concerns on the system being tested, as in being able to test components independently and without too much external dependency, is key to this.

Let us look at the strategies that the Software architect can employ in order to make sure that the components he is subjecting to tests provide predictable and deterministic behavior, which will provide valid and useful test results.

Reduce system complexity
As mentioned earlier, a complex system has lower testability. The system complexity can be reduced by techniques such as splitting systems into subsystems, providing well-defined APIs for systems to be tested, and so on. Here is a list of these techniques in some detail:

Reducing coupling: To isolate components so that coupling is reduced in the system. Inter-component dependencies should be well defined, and if possible, documented.

Increasing cohesion: To increase cohesion of modules, that is, to make sure that a particular module or class performs only a well-defined set of functions.

Providing well-defined interfaces: Try to provide well-defined interfaces for getting/setting the state of the components and classes involved. For example, getters and setters allow one to provide specific methods for getting and setting the value of a class's attributes. A reset method allows to set the internal state of an object to its state at the time of creation. In Python, this can be done by defining properties.

Reducing class complexity: To reduce the number of classes a class derives from. A metric called Response For Class (RFC) is a set of methods of a class C, plus the methods on other classes called by the methods of class C. It is suggested to keep the RFC of a class in manageable limits, usually not more than 50 for small- to medium-sized systems.

Improving predictability
We saw that having a deterministic behavior is very important to design tests that provide predictable results, and hence, can be used to build a test harness for repeatable testing. Here are some strategies to improve the predictability of the code under test:

Correct exception handling: – Missing or improperly-written exception handlers is one of the main reasons for bugs and thence, unpredictable behavior in software systems. It is important to find out places in the code where exceptions can occur, and then handle errors. Most of the time, exceptions occur when a code interacts with an external resource such as performing a database query, fetching a URL, waiting on a shared mutex, and the like.

Infinite loops and/or blocked wait: When writing loops that depend on specific conditions such as availability of an external resource, or getting handle to or data from a shared resource, say a shared mutex or queue, it is important to make sure that there are always safe exit or break conditions provided in the code. Otherwise, the code can get stuck in infinite loops that never break, or on never-ending blocked waits on resources causing bugs which are hard to troubleshoot and fix.

Logic that is time dependent: When implementing logic that is dependent on certain times of the day (hours or specific weekdays), make sure that the code works in a predictable fashion. When testing such code, one often needs to isolate such dependencies by using mocks or stubs.

Concurrency: When writing code that uses concurrent methods such as multiple threads and/or processes, it is important to make sure that the system logic is not dependent on threads or processes starting in any specific order. The system state should be initialized in a clean and repeatable way via well-defined functions or methods which allow the system behavior to be repeatable, and hence, testable.

Memory Management: A very common reason for software errors and unpredictability is incorrect usage and mismanagement of memory. In modern runtimes with dynamic memory management, such as Python, Java, or Ruby, this is less of a problem. However, memory leaks and unreleased memory leading to bloated software are still very much a reality in modern software systems.

It is important to analyze and be able to predict the maximum memory usage of your software system so that you allocate enough memory for it, and run it in the right hardware. Also, software should be periodically evaluated and tested for memory leaks and better memory management, and any major issues should be addressed and fixed.

Control and isolate external dependencies
Tests usually have some sort of external dependency. For example, a test may need to load/save data to/from a database. Another may depend on the test running on specific times of the day. A third may require fetching data from a URL on the Web.

However, having external dependencies usually complicates a test scenario. This is because external dependencies are usually not within the control of the test designer. In the aforementioned cases, the database may be in another data center, or the connection may fail, or the website may not respond within the configured time, or give a 50X error.

Isolating such external dependencies is very important in designing and writing repeatable tests. The following are a few techniques for the same:

Data sources: Most realistic tests require data of some form. More often than not, data is read from a database. However, a database being an external dependency, cannot be relied upon. The following are a few techniques to control data source dependencies:

Using local files instead of a database: Quite often, test files with prefilled data can be used instead of querying a database. Such files could be text, JSON, CSV, or YAML files. Usually, such files are used with mock or stub objects.

Using an in-memory database: Rather than connecting to a real database, a small in-memory database could be used. A good example is the SQLite DB, a file or memory-based database which implements a good, but minimal, subset of SQL.

Using a test database: If the test really requires a database, the operation can use a test database which uses transactions. The database is set up in the setUp() method of the test case, and rolled back in the tearDown() method so that no real data remains at the end of the operation.

Resource virtualization: In order to control the behavior of resources which are outside the system, one can virtualize them, that is, build a version of these resources which mimic their APIs, but not the internal implementation. Some common techniques for resource virtualization are as follows:

Stubs: Stubs provide standard (canned) responses to function calls made during a test. A Stub() function replaces the details of the function it replaces, only returning the response as required.

For example, here is a function that returns data for a given URL:

Copy
import hashlib
import requests

def get_url_data(url):
    """ Return data for a URL """

    # Return data while saving the data in a file
    # which is a hash of the URL
    data = requests.get(url).content
    # Save it in a filename
    filename = hashlib.md5(url).hexdigest()
    open(filename, 'w').write(data)
    return data
And the following is the stub that replaces it, which internalizes the external dependency of the URL:

Copy
import os

def get_url_data_stub(url):
    """ Stub function replacing get_url_data """

    # No actual web request is made, instead
    # the file is opened and data returned
    filename = hashlib.md5(url).hexdigest()
    if os.path.isfile(filename):
        return open(filename).read()
A more common way to write such a function is to combine both the original request and the file cache in the same code. The URL is requested just once—the first time the function is called—and in subsequent requests, the data from the file cache is returned.

Copy
def get_url_data(url):
    """ Return data for a URL """

    # First check for cached file - if so return its
    # contents. Note that we are not checking for
    # age of the file - so content may be stale.
    filename = hashlib.md5(url).hexdigest()
    if os.path.isfile(filename):
        return open(filename).read()

    # First time - so fetch the URL and write to the
    # file. In subsequent calls, the file contents will
    # be returned.
    data = requests.get(url).content
    open(filename, 'w').write(data)

    return data
Mocks: Mocks fake the API of the real-world objects they replace. One programs mock objects directly in the test by setting expectations—in terms of the type and order of the arguments the functions will expect and the responses they will return. Later, the expectations can be optionally verified in a verification step.

Note
The main difference between Mocks and Stubs is that a Stub implements just enough behavior for the object under test to execute the test. A Mock usually goes beyond by also verifying that the object under test calls the Mock as expected—for example, in terms of number and order of arguments.

When using a Mock object, part of the test involves verifying that the Mock was used correctly. In other words, both Mocks and Stubs answer the question, What is the result?, but Mocks also answer the question, How has the result been achieved?

We will see examples of writing unit test via mocks with Python later.

Fakes: The Fake objects have working implementations, but fall short of production usage because they have some limitations. A Fake object provides a very lightweight implementation, which goes beyond just stubbing the object.

For example, here is a Fake object that implements a very minimal logging, mimicking the API of the Logger object of the Python's logging module:

Copy
import logging

class FakeLogger(object):
    """ A class that fakes the interface of the
    logging.Logger object in a minimalistic fashion """

    def __init__(self):
        self.lvl = logging.INFO

    def setLevel(self, level):
        """ Set the logging level """
        self.lvl = level

    def _log(self, msg, *args):
        """ Perform the actual logging """

        # Since this is a fake object - no actual logging is
        # done.
        # Instead the message is simply printed to standard
        # output.

        print (msg, end=' ')
        for arg in args:
            print(arg, end=' ')
        print()

    def info(self, msg, *args):
        """ Log at info level """
        if self.lvl<=logging.INFO: return self._log(msg, *args)

    def debug(self, msg, *args):
        """ Log at debug level """
        if self.lvl<=logging.DEBUG: return self._log(msg, *args)

    def warning(self, msg, *args):
        """ Log at warning level """
        if self.lvl<=logging.WARNING: return self._log(msg, *args)

    def error(self, msg, *args):
        """ Log at error level """
        if self.lvl<=logging.ERROR: return self._log(msg, *args)

    def critical(self, msg, *args):
        """ Log at critical level """
        if self.lvl<=logging.CRITICAL: return self._log(msg, *args)
The FakeLogger class in the preceding code implements some main methods of the logging.Logger class, which it is trying to fake.

It is ideal as a fake object for replacing the Logger object for implementing tests.

---

White-box testing principles
From a software architecture perspective, one of the most important steps of testing is at the time the software is developed. The behavior or functionality of a software, which is apparent only to its end users, is an artifact of the implementation details of the software.

Hence, it follows that a system which is tested early and tested often has a higher likelihood to produce a testable and robust system, which provides the required functionality to the end user in a satisfactory manner.

The best way, therefore, to start implementing testing principles is right from the source, that is, where the software is written, and by the developers. Since the source code is visible to the developer, this testing is often called White-box testing.

So, how do we make sure that we can follow the correct testing principles, and perform due diligence while the software is getting developed? Let us take a look at the different types of testing that are involved during the development stage before the software ends up in front of the customer.

Unit testing
Unit testing is the most fundamental type of testing performed by developers. A unit test applies the most basic unit of software code—typically, functions or class methods—by using executable assertions, which check the output of the unit being tested against an expected outcome.

In Python, support for unit testing is provided by the unittest module in the standard library.

The unit test module provides the following high-level objects.

Test cases: The unittest module provides the TestCase class, which provides support for test cases. A new test case class can be set up by inheriting from this class, and setting up the test methods. Each test method will implement unit tests by checking the response against an expected outcome.

Test fixtures: Test fixtures represent any setup or preparation required for one or more tests followed by any cleanup actions. For example, this may involve creating temporary or in-memory databases, starting a server, creating a directory tree, and the like. In the unittest module, support for fixtures is provided by the setUp() and tearDown() methods of the TestCase class and the associated class and module methods of the TestSuite class.

Test suites: A test suite is an aggregation of related test cases. A test suite can also contain other test suites. A test suite allows to group test cases that perform functionally similar tests on a software system, and whose results should be read or analyzed together. The unittest module provides support for test suites through the TestSuite class.

Test runners: A test runner is an object that manages and runs the test cases, and provides the results to the tester. A test runner can use a text interface or a GUI.

Test results: Test result classes manage the test result output shown to the tester. Test results summarize the number of successful, failed, and erred-out test cases. In the unittest module, this is implemented by the TestResult class with a concrete, default implementation of the TextTestResult class.

Other modules that provide support for Unit testing in Python are nose (nose2) and py.test. We will discuss each of these briefly in the following sections.

Unit testing in action
Let us take a specific unit-testing task, and then try to build a few test cases and test suites. Since the unittest module is the most popular, and available by default in the Python standard library, we will start with it first.

For our test purposes, we will create a class that has a few methods, which are used for date/time conversions.

The following code shows our class:

Copy
""" Module datetime helper - Contains the class DateTimeHelper providing some helpful methods for working with date and datetime objects """

import datetime
class DateTimeHelper(object):
    """ A class which provides some convenient date/time
    conversion and utility methods """

    def today(self):
        """ Return today's datetime """
        return datetime.datetime.now()

    def date(self):
        """ Return today's date in the form of DD/MM/YYYY """
        return self.today().strftime("%d/%m/%Y")

    def weekday(self):
        """ Return the full week day for today """
        return self.today().strftime("%A")

    def us_to_indian(self, date):
        """ Convert a U.S style date i.e mm/dd/yy to Indian style dd/mm/yyyy """

        # Split it
        mm,dd,yy = date.split('/')
        yy = int(yy)
        # Check if year is >16, else add 2000 to it
        if yy<=16: yy += 2000
        # Create a date object from it
        date_obj = datetime.date(year=yy, month=int(mm), day=int(dd))
        # Retur it in correct format
        return date_obj.strftime("%d/%m/%Y")
Our class DateTimeHelper has a few methods, which are as follows:

date: Returns the day's timestamp in the dd/mm/yyyy format

weekday: Returns the day's weekday, for example, Sunday, Monday, and so on

us_to_indian: Converts a US date format (mm/dd/yy(yy)) to the Indian format (dd/mm/yyyy)

Here is a unittest TestCase class, which implements a test for the last method:

Copy
""" Module test_datetimehelper -  Unit test module for testing datetimehelper module """

import unittest
import datetimehelper

class DateTimeHelperTestCase(unittest.TestCase):
     """ Unit-test testcase class for DateTimeHelper class """

    def setUp(self):
        print("Setting up...")
        self.obj = datetimehelper.DateTimeHelper()

    def test_us_india_conversion(self):
        """ Test us=>india date format conversion """

        # Test a few dates
        d1 = '08/12/16'
        d2 = '07/11/2014'
        d3 = '04/29/00'
        self.assertEqual(self.obj.us_to_indian(d1), '12/08/2016')
        self.assertEqual(self.obj.us_to_indian(d2), '11/07/2014')
        self.assertEqual(self.obj.us_to_indian(d3), '29/04/2000')

if __name__ == "__main__":
    unittest.main()
Note that in the main part of the testcase code, we just invoke unittest.main(). This automatically figures out the test cases in the module, and executes them. The following image shows the output of the test run:


Output of the unit-test case for datetimehelper module - version #1

As we can see from the output, this simple test case passes.

Extending our unit test case
You may have noted that the first version of the unit test case for the datetimehelper module contained a test only for one method, namely, the method that converts the US date format to the Indian one.

However, what about the other two methods? Shouldn't we write unit tests for them too?

The problem with the other two methods is that they get data from today's date. In other words, the output is dependent on the exact day that the code is run. Hence, it is not possible to write a specific test case for them by feeding in a date value, and expecting the result to match an outcome as the code is time dependent. We need a way to control this external dependency.

Here is where Mocking comes to our rescue. Remember that we had discussed Mock objects as a way to control external dependencies. We can use the patching support of unittest.mock library, and patch the method that returns today's date to return a date that we control. This way, we are able to test the methods that depend on it.

Here is the modified test case with support added for the two methods using this technique:

Copy
""" Module test_datetimehelper -  Unit test module for testing datetimehelper module """

import unittest
import datetime
import datetimehelper
from unittest.mock import patch

class DateTimeHelperTestCase(unittest.TestCase):
    """ Unit-test testcase class for DateTimeHelper class """

    def setUp(self):
        self.obj = datetimehelper.DateTimeHelper()

    def test_date(self):
        """ Test date() method """

        # Put a specific date to test
        my_date = datetime.datetime(year=2016, month=8, day=16)

        # Patch the 'today' method with a specific return value
        with patch.object(self.obj, 'today', return_value=my_date):
            response = self.obj.date()
            self.assertEqual(response, '16/08/2016')

    def test_weekday(self):
        """ Test weekday() method """

        # Put a specific date to test
        my_date = datetime.datetime(year=2016, month=8, day=21)

        # Patch the 'today' method with a specific return value
        with patch.object(self.obj, 'today', return_value=my_date):
            response = self.obj.weekday()
            self.assertEqual(response, 'Sunday')

    def test_us_india_conversion(self):
        """ Test us=>india date format conversion """

        # Test a few dates
        d1 = '08/12/16'
        d2 = '07/11/2014'
        d3 = '04/29/00'
        self.assertEqual(self.obj.us_to_indian(d1), '12/08/2016')
        self.assertEqual(self.obj.us_to_indian(d2), '11/07/2014')
        self.assertEqual(self.obj.us_to_indian(d3), '29/04/2000')

if __name__ == "__main__":
    unittest.main()
As you can see, we have patched the today method to return a specific date in the two test methods. This allows us to control the method's output, and, in turn, compare the result with a specific outcome.

Here is the new output of the test case:


Output of the unit-test case for datetimehelper module with two more tests - version #2

Tip
NOTE: unittest.main is a convenience function on the unittest module, which makes it easy to load a set of test cases automatically from a module and run them.

To find out more details of what is happening when the tests are run, we can make the test runner show more information by increasing the verbosity. This can be done either by passing the verbosity argument to unittest.main, or by passing the -v option on the command line as follows:


Producing verbose output from the unit-test case by passing the -v argument

Nosing around with nose2
There are other unit-testing modules in Python which are not part of the standard library, but are available as third-party packages. We will look at the first one named nose. The most recent version (at the time of writing) is version 2, and the library has been renamed as nose2.

The nose2 package can be installed by using the Python package installer, pip.

Copy
$ pip install nose2
Running nose2 is very simple. It automatically detects Python test cases to run in the folder that it is run from by looking for classes derived from unittest.TestCase, and also functions starting with test.

In the case of our datetimehelper test-case, nose2 picks it up automatically. Simply run it from the folder containing the module. Here is the test output:


Running unit-tests using nose2

The preceding output doesn't, however, report anything, since, by default, nose2 runs quietly. We can turn on some reporting of tests by using the verbose option (-v).


Running unit-tests using nose2, with verbose output

The nose2 also supports reporting code coverage by using plugins. We will look at code coverage in a later section.

Testing with py.test
The py.test package, commonly known as pytest, is a full-featured, mature testing framework for Python. Like nose2, py.test also supports test discovery by looking for files starting with certain patterns.

The py.test can also be installed with pip.

Copy
$ pip install pytest
Like nose2, test execution with py.test is also easy. Simply run the executable pytest in the folder containing the test cases.


Test discovery and execution with py.test

Like nose2, pytest also comes with its own plugin support, the most useful among them being the code coverage plugin. We will see examples in a later section.

It is to be noted that pytest doesn't require test cases to be derived formally from the unittest.TestCase module. Py.test automatically discovers tests from any modules containing classes prefixed with Test, or from functions prefixed with test_.

For example, here is a new test case without any dependency on the unittest module but with the test case class derived from object, the most base type in Python. The new module is called test_datetimehelper_object.

Copy
""" Module test_datetimehelper_object - Simple test case with test class derived from object """

import datetimehelper

class TestDateTimeHelper(object):

    def test_us_india_conversion(self):
        """ Test us=>india date format conversion """

        obj = datetimehelper.DateTimeHelper()
        assert obj.us_to_indian('1/1/1') == '01/01/2001'
Note how this class has zero dependency on the unittest module, and defines no fixtures. Here is the output of running pytest on the folder now:


Test case discovery and execution without unittest module support using py.test

The pytest has picked up the test case in this module, and executed it automatically as the output shows.

The nose2 also has similar capabilities to pick up such test cases. The next image shows the output of nose2 with the new test case defined.


Test case discovery and execution without unittest module support using nose2

The preceding output shows that the new test has been picked up and executed.

The unittest module, nose2, and py.test packages provide a lot of support for developing and implementing test cases, fixtures, and test suites in a very flexible and customizable manner. Discussing all the multitude of options of these tools is beyond the scope of this chapter, as our focus is on getting to know these tools to understand how we can use them to satisfy the architectural quality attribute of testability.

So, at this point, we will go on to the next major topic in unit testing, that of code coverage. We will look at these three tools, namely, unittest, nose2, and py.test, and see how they allow the architect to help his developers and testers find information about the code coverage in their unit tests.

Code coverage
Code coverage is measured as the degree to which the source code under test is covered by a specific test suite. Ideally, test suites should aim for higher code coverage, as this would expose a larger percentage of the source code to tests, and help to uncover bugs.

Code coverage metrics are reported typically as a percentage of Lines of Code (LOC), or a percentage of the subroutines (functions) covered by a test suite.

Let us now look at different tools support for measuring code coverage. We will continue to use our test example (datetimehelper) for these illustrations too.

Measuring coverage using coverage.py
Coverage.py is a third-party Python module, which works with test suites and cases written with the unittest module, and reports their code coverage.

Coverage.py can be installed, like other tools shown here so far, using pip.

Copy
$ pip install coverage
This last command installs the coverage application, which is used to run and report code coverages.

Coverage.py has two stages: first, where it runs a piece of source code, and collects coverage information, and next, where it reports the coverage data.

To run coverage.py, use the following syntax:

Copy
    $ coverage run <source file1> <source file 2> …
Once the run is complete, report the coverage using this command:

Copy
    $ coverage report -m
For example, here is the output with our test modules:


Test coverage report for datetimehelper module using coverage.py

Coverage.py reports that our tests cover 93% of the code in the datetimehelper module, which is pretty good code coverage. (You can ignore the report on the test module itself.)

Measuring coverage using nose2
The nose2 package comes with plugin support for code coverage. This is not installed by default. To install the code coverage plugin for nose2, use this command:

Copy
$ pip install cov-core
Now, nose2 can be run with the code coverage option to run the test cases, and to report coverage in one shot. This can be done as follows:

Copy
$ nose2 -v -C
Note
NOTE: Behind the scenes cov-core makes use of coverage.py to get its work done, so the metric report of coverage by both coverage.py and nose2 is the same.

Here is the output of running test coverage using nose2:


Test coverage report for datetimehelper module using nose2

By default, the coverage report is written to the console. To produce other forms of output, the –coverage-report option can be used. For example, --coverage-report html will write the coverage report in the HTML format to a subfolder named htmlcov.


Producing HTML coverage output using nose2

Here is how the HTML output looks in the browser:


HTML coverage report as viewed in the browser

Measuring coverage using py.test
Pytest also comes with its own coverage plugin for reporting code coverage. Like nose2, it utilizes coverage.py behind the scenes to get the work done.

To provide support for code coverage for py.test, the package pytest-cov needs to be installed as follows:

Copy
$ pip install pytest-cov
To report code coverage of test cases in the current folder, use the following command:

Copy
$ pytest –cov
Here is a sample output of pytest code coverage:


Running code coverage for current folder using py.test

Mocking things up
We saw an example of using the patch support of unittest.mock in our test example earlier. However, the Mock support provided by unittest is even more powerful than this, so let us look at one more example to understand its power and applicability in writing unit tests.

For the purpose of this illustration, we will consider a class that performs keyword search on a large dataset, and returns the results ordered by weightage. Assume that the dataset is stored in a database, and the results are returned as a list of (sentence, relevance) tuples, where sentence is the original string with a match for the keyword, and relevance is its hit weightage in the result set.

Here is the code:

Copy
"""
Module textsearcher - Contains class TextSearcher for performing search on a database and returning results
"""

import operator

class TextSearcher(object):
    """ A class which performs a text search and returns results """

    def __init__(self, db):
        """ Initializer - keyword and database object """

        self.cache = False
        self.cache_dict = {}
        self.db = db
        self.db.connect()

    def setup(self, cache=False, max_items=500):
        """ Setup parameters such as caching """

        self.cache = cache
        # Call configure on the db
        self.db.configure(max_items=max_items)

    def get_results(self, keyword, num=10):
        """ Query keyword on db and get results for given keyword """

        # If results in cache return from there
        if keyword in self.cache_dict:
            print ('From cache')
            return self.cache_dict[keyword]

        results = self.db.query(keyword)
        # Results are list of (string, weightage) tuples
        results = sorted(results, key=operator.itemgetter(1), reverse=True)[:num]
        # Cache it
        if self.cache:
            self.cache_dict[keyword] = results

        return results
The class has the following three methods:

__init__: The initializer, it accepts an object that acts as a handle to the data source (database); also initializes a few attributes, and connects to the database

setup: It sets up the searcher, and also configures the database object

get_results: It performs a search using the data source (database), and returns the results for a given keyword

We now want to implement a unit test case for this searcher. Since the database is an external dependency, we will virtualize the database object by mocking it. We will test only the searcher's logic, callable signatures, and return data.

We will develop this program step by step so that each step of Mocking is clear to you. We will use a Python interactive interpreter session for the same.

First, the mandatory imports.

Copy
>>> from unittest.mock import Mock, MagicMock
>>> import textsearcher
>>> import operator
Since we want to Mock the DB, the first step is to do that exactly.

Copy
>>> db = Mock()
Now let us create the searcher object. We are not going to Mock this, as we need to test the calling signature and the return value of its methods.

Copy
>>> searcher = textsearcher.TextSearcher(db)
At this point, the database object has been passed to the __init__ method of the searcher, and connect has been called on it. Let's verify this expectation.

Copy
>>> db.connect.assert_called_with()
No issues, so the assertion has succeeded! Let us now set up the searcher.

Copy
>>> searcher.setup(cache=True, max_items=100)
Looking at the code of the TextSearcher class, we realize that the preceding call should have called configure on the database object with the parameter max_items set to the value 100. Let's verify this.

Copy
>>> searcher.db.configure.assert_called_with(max_items=100)
<Mock name='mock.configure_assert_called_with()' id='139637252379648'>
Bravo!

Finally, let us try and test the logic of the get_results method. Since our database is a Mock object, it won't be able to do any actual query, so we pass some canned results to its query method, effectively mocking it.

Copy
>>> canned_results = [('Python is wonderful', 0.4),
...                       ('I like Python',0.8),
...                       ('Python is easy', 0.5),
...                       ('Python can be learnt in an afternoon!', 0.3)]
>>> db.query = MagicMock(return_value=canned_results)
Now we set up the keyword and the number of results, and call get_results using these parameters.

Copy
>>> keyword, num = 'python', 3
>>> data = searcher.get_results(python, num=num)
Let's inspect the data.

Copy
>>> data
[('I like Python', 0.8), ('Python is easy', 0.5), ('Python is wonderful', 0.4)]
Looks good!

In the next step, we verify that get_results has indeed called query with the given keyword.

Copy
>>> searcher.db.query.assert_called_with(keyword)
Finally, we verify that the data returned has been sorted right and truncated to the number of results (num) value we passed.

Copy
>>> results = sorted(canned_results, key=operator.itemgetter(1), reverse=True)[:num]
>>> assert data == results
True
All good!

The example shows how to use Mock support in the unittest module in order to mock an external dependency and effectively virtualize it, at the same time testing the program's logic, control flow, callable arguments, and return values.

Here is a test module combining all these tests into a single test module, and the output of nose2 on it.

Copy
"""
Module test_textsearch - Unittest case with mocks for textsearch module
"""

from unittest.mock import Mock, MagicMock
import textsearcher
import operator

def test_search():
    """ Test search via a mock """

    # Mock the database object
    db = Mock()
    searcher = textsearcher.TextSearcher(db)
    # Verify connect has been called with no arguments
    db.connect.assert_called_with()
    # Setup searcher
    searcher.setup(cache=True, max_items=100)
    # Verify configure called on db with correct parameter
    searcher.db.configure.assert_called_with(max_items=100)

    canned_results = [('Python is wonderful', 0.4),
                      ('I like Python',0.8),
                      ('Python is easy', 0.5),
                      ('Python can be learnt in an afternoon!', 0.3)]
    db.query = MagicMock(return_value=canned_results)

    # Mock the results data
    keyword, num = 'python', 3
    data = searcher.get_results(keyword,num=num)
    searcher.db.query.assert_called_with(keyword)

    # Verify data
    results = sorted(canned_results, key=operator.itemgetter(1), reverse=True)[:num]
    assert data == results
Here is the output of nose2 on this test case:


Running testsearcher test-case using nose2

For good measure, let us also look at the coverage of our mock test example, the test_textsearch module, using the py.test coverage plugin.


Measuring coverage of textsearcher module via test_textsearch test-case using py.test

So our Mock test has a coverage of 90%, missing just two statements out of 20. Not bad!

Tests inline in documentation – doctests
Python has unique support for another form of inline code tests, which are commonly called doctests. These are inline unit tests in a function, class or module documentation, which add a lot of value by combining code and tests in one place without having to develop or maintain separate test suites.

The doctest module works by looking for pieces of text in code documentation that look like Python strings, and executing those sessions to verify that they work exactly as found. Any test failures are reported on the console.

Let us look at a code example to see this in action. The following piece of code implements the simple factorial function by using an iterative approach:

Copy
"""
Module factorial - Demonstrating an example of writing doctests
"""

import functools
import operator

def factorial(n):
    """ Factorial of a number.

    >>> factorial(0)
    1
    >>> factorial(1)
    1
    >>> factorial(5)
    120
    >>> factorial(10)
    3628800

    """

    return functools.reduce(operator.mul, range(1,n+1))

if __name__ == "__main__":
    import doctest
    doctest.testmod(verbose=True)
Let's look at the output of executing this module.


Output of doctest for the factorial module

The doctest reports that one out of four tests failed.

A quick scan of the output tells us that we forgot to code in the special case to compute the factorial for zero. The error occurs because the code tries to compute range(1, 1), which raises an exception with reduce.

The code can be easily rewritten to fix this. Here is the modified code:

Copy
"""
Module factorial - Demonstrating an example of writing doctests
"""

import functools
import operator

def factorial(n):
    """ Factorial of a number.

    >>> factorial(0)
    1
    >>> factorial(1)
    1
    >>> factorial(5)
    120
    >>> factorial(10)
    3628800
    """

    # Handle 0 as a special case
    if n == 0:
        return 1

    return functools.reduce(operator.mul, range(1,n+1))

if __name__ == "__main__":
    import doctest
    doctest.testmod(verbose=True)
The next image shows the fresh output of executing the module now:


Output of doctest for factorial module after the fix

Now all the tests pass.

Note
NOTE: We turned on the verbose option of the doctest module's testmod function in this example in order to show the details of the tests. Without this option, doctest would be silent if all the tests passed, producing no output.

The doctest module is very versatile. Rather than just Python code, it can also load Python interactive sessions from sources like text files, and execute them as tests.

Doctest examines all docstrings including function, class, and module doc-strings to search for Python interactive sessions.

Note
NOTE: The pytest package comes with built-in support for doctests. To allow pytest to discover and run doctests in the current folder, use the following command:

Copy
$ pytest –doctest-modules
Integration tests
Unit tests, though very useful to discover and fix bugs during white-box testing early on in the software development life cycle, aren't enough by themselves. A software system is fully functional only if the different components work together in expected ways in order to deliver the required functionality to the end user, satisfying the pre-defined architectural quality attributes. This is where integration tests assume importance.

The purpose of integration tests is to verify the functional, performance, and other quality requirements on the different functional subsystems of a software system, which act as a logical unit, providing certain functionality. Such subsystems deliver some piece of functionality through the cumulative action of their individual units. Though each component may have defined its own unit test, it is also important to verify the combined functionality of the system by writing integration tests.

Integration tests are usually written after unit testing is completed, and before validation testing is done.

It would be instructional to list down the advantages provided by integration tests at this point, as this could be useful for any software architect who is at a phase where he has designed and implemented his unit tests for the different components.

Testing component interoperability: Each unit in a functional subsystem could be written by different programmers. Though each programmer is aware of how his component should perform, and may have written unit tests for the same, the entire system may have issues working in unison, as there could be errors or misunderstanding in the integration points where components talk to each other. Integration testing would reveal such mistakes.

Testing for system requirement modifications: The requirements may have changed during the time of implementation. These updated requirements may not have been unit tested, hence, an integration test becomes very useful to reveal issues. Also some parts of the system may not have implemented the requirements correctly, which can also be revealed by an appropriate Integration test.

Testing external dependencies and APIs: Software components these days use a lot of third-party APIs, which are usually mocked or stubbed during unit tests. Only an integration test would reveal how these APIs would perform and expose any issues either in the calling convention, response data, or performance with them.

Debugging hardware issues: Integration tests are helpful in getting information about any hardware problems, and debugging such tests gives the developer(s) data about whether an update or change in the hardware configuration is required.

Uncovering exceptions in code paths: Integration tests can also help developers figure out exceptions that they may not have handled in their code, as unit tests wouldn't have executed paths or conditions which raised such errors. Higher code coverage can identify and fix a lot of such issues. However, a good integration test combining known code paths for each functionality with high coverage is a good formula for making sure most potential errors that may occur during usage are uncovered and executed during testing.

There are three approaches to writing integration tests. These are as follows:

Bottom-up: In this approach, components at the lower level are tested first, and these test results are used to integrate tests of the higher-level components in the chain. The process repeats until we reach the top of the hierarchy of the components with respect to the control flow. In this approach, critical modules at the top of the hierarchy may be tested inadequately.

If the top-level components are under development, Drivers may be required to simulate (Mock) them.


Bottom-Up strategy of integration testing

Top-down: Test development and testing happens top-down, following the workflow in the software system. Hence, components at the top level of the hierarchy are tested first and the lower-level modules are tested last. In this approach, critical modules are tested on priority, so we can identify major design or development flaws first and fix them. However, lower-level modules may be tested inadequately.

Lower-level modules can be replaced by Stubs which mock their functionality. Early prototypes are possible in this approach, as lower-level module logic can be stubbed out.


Top-Down strategy of integration testing

Big-bang: This is the approach is one where all the components are integrated and tested at the very end of development. Since the integration tests come at the end, this approach saves time for development. However, this may not give enough time to test critical modules, as there may not be enough time to spend equally on all the components.

There is no specific software for general integration testing. A certain class of applications, such as web frameworks, define their own specific integration test frameworks. For example, some web frameworks like Django, Pyramid, and Flask have some specific testing frameworks developed by their own communities.

Another example is the popular webtest framework, which is useful for automated testing of the Python WSGI applications. A detailed discussion of such frameworks is outside the scope of this chapter and this book.

Test automation
There are a number of tools on the Internet that are useful for automating integration testing of software applications. We will take a quick look at some of the popular ones here.

Test automation using Selenium Web Driver
Selenium has been a popular choice for automating Integration, Regression, and Validation tests for a number of software applications. Selenium is free and open source, and comes with support for most popular web browser engines.

In Selenium, the primary object is a web driver, which is a stateful object on the client side, representing a browser. The web driver can be programmed to visit URLs, perform actions (such as clicking, filling forms, and submitting forms), effectively replacing the human test subject, who usually performs these steps manually.

Selenium provides client driver support for most popular programming languages and runtimes.

To install the Selenium web driver in Python, use the following command:

Copy
$ pip install selenium
We will look at a small example that uses Selenium along with pytest in order to implement a small automation test, which will test the Python website (http://www.python.org) for some simple test cases.

Here is our test code. The module is named selenium_testcase.py.

Copy
"""
Module selenium_testcase - Example of implementing an automated UI test using selenium framework
"""

from selenium import webdriver
import pytest
import contextlib

@contextlib.contextmanager
@pytest.fixture(scope='session')
def setup():
    driver = webdriver.Firefox()
    yield driver
    driver.quit()

def test_python_dotorg():
    """ Test details of python.org website URLs """

    with setup() as driver:
        driver.get('http://www.python.org')
        # Some tests
        assert driver.title == 'Welcome to Python.org'
        # Find out the 'Community' link
        comm_elem = driver.find_elements_by_link_text('Community')[0]
        # Get the URL
        comm_url = comm_elem.get_attribute('href')
        # Visit it
        print ('Community URL=>',comm_url)
        driver.get(comm_url)
        # Assert its title
        assert driver.title == 'Our Community | Python.org'
        assert comm_url == 'https://www.python.org/community/'
Before running the preceding example and showing the output, let us inspect the functions a bit.

Function setUp is a test fixture, which sets up the main object required for our test, that is, the Selenium Web driver for Firefox. We convert the setUp function to a context manager by decorating it with the contextmanager decorator from the contextlib module. At the end of the setUp function, the driver exits, since its quit method is called.

In the test function test_python_dot_org, we set up a rather simple, contrived test for visiting the main Python website URL, and checking its title via an assertion. We then load the URL for the Python community by locating it on the main page, and then visit this URL. We finally assert its title and URL before ending our tests.

Let us see the program in action. We will specifically ask pytest to load only this module, and run it. The command line for this is as follows:

Copy
$ pytest -s selenium_testcase.py
The Selenium driver will launch the browser (Firefox), and open a window automatically, visiting the Python website URL while running the tests. The console output for the test is shown in the following image:


Console output of simple selenium test case on the Python programming language website

Selenium can be used for more complex test cases, as it provides a number of methods for inspecting the HTML of pages, locating elements, and interacting with them. There are also plugins for Selenium, which can execute the JavaScript content of the pages to make the testing support complex interactions via JavaScript (such as AJAX requests).

Selenium can also be run on the server. It provides support for remote clients via its remote driver support. Browsers are instantiated on the server (typically, using virtual X sessions), whereas, the tests can be run and controlled from client machines via the network.

Test-Driven Development
Test-Driven Development (TDD), is an agile practice of software development, which uses a very short development cycle, where code is written to satisfy an incremental test case.

In TDD, a functional requirement is mapped to a specific test case. Code is written to pass the first test case. Any new requirement is added as a new test case. Code is refactored to support the new test case. The process continues till the code is able to support the entire spectrum of user functionality.

The steps in TDD are as follows:

Define a few starting test cases as a specification for the program.

Write code to make the early test cases pass.

Add a new test case defining new functionality.

Run all the tests, and see if the new test fails or passes.

If the new test fails, write some code for the test to pass.

Run the tests again.

Repeat steps 4 to 6 till the new test passes.

Repeat steps 3 to 7 to add a new functionality via test cases.

In TDD, the focus is on keeping everything simple, including the unit test cases and the new code that is added to support the test cases. TDD practitioners believe that writing tests upfront allows the developer to understand the product requirements better, allowing a focus on software quality from the very beginning of the development lifecycle.

In TDD, often, a final refactoring step is also done after many tests have been added to the system in order to make sure no coding smells or antipatterns are introduced, and to maintain code readability and maintainability.

There is no specific software for TDD, rather, it is a methodology and process for software development. Most of the time, TDD uses unit tests, so, the toolchain support is mostly the unittest module and the related packages that we've discussed in this chapter.

TDD with palindromes
Let us understand TDD as discussed earlier with a simple example of developing a program in Python, which checks whether an input string is a palindrome.

Note
A Palindrome is a string that reads the same in both directions. For example, bob, rotator, and Malayalam are palindromes. So is the sentence, Madam, I'm Adam when you get rid of the punctuations.

Let us follow the steps of TDD. Initially, we need a test case that defines the basic specification of the program. Our first version of the test code looks like this:

Copy
"""
Module test_palindrome - TDD for palindrome module
"""

import palindrome

def test_basic():
    """ Basic test for palindrome """

    # True positives
    for test in ('Rotator','bob','madam','mAlAyAlam', '1'):
        assert palindrome.is_palindrome(test)==True

    # True negatives
    for test in ('xyz','elephant', 'Country'):
        assert palindrome.is_palindrome(test)==False
Note that the preceding code not only gives us a specification for the program in terms of its early functionality, but also gives a function name and signature—in terms of the argument and return value. We can list down the requirements for the first version by looking at the test.

The function is named is _palindrome. It should accept a string, and return True if it is a palindrome, and False otherwise. The function sits in the module palindrome.

The function should treat strings as case-insensitive.

With these specifications, here is our first version of the palindrome module:

Copy
def is_palindrome(in_string):
    """ Returns True whether in_string is palindrome, False otherwise """

    # Case insensitive
    in_string = in_string.lower()
    # Check if string is same as in reverse
    return in_string == in_string[-1::-1]
Let us check if this passes our test. We will run py.test on the test module to verify this.


Test output of test_palindrome.py version #1

As you can see in the last image, the basic test passes; so, we've got a first version of palindrome module, which works and passes its tests.

Now as per the TDD step, let's go to step (3), and add a new test case. This adds a check for testing palindrome strings with spaces. Here is the new test module with this extra test:

Copy
"""
Module test_palindrome - TDD for palindrome module
"""

import palindrome

def test_basic():
    """ Basic test for palindrome """

    # True positives
    for test in ('Rotator','bob','madam','mAlAyAlam', '1'):
        assert palindrome.is_palindrome(test)==True

    # True negatives
    for test in ('xyz','elephant', 'Country'):
        assert palindrome.is_palindrome(test)==False

def test_with_spaces():
    """ Testing palindrome strings with extra spaces """

    # True positives
    for test in ('Able was I ere I saw Elba',
                 'Madam Im Adam',
                 'Step on no pets',
                 'Top spot'):
        assert palindrome.is_palindrome(test)==True

    # True negatives
    for test in ('Top post','Wonderful fool','Wild Imagination'):
        assert palindrome.is_palindrome(test)==False
Let's run the updated test and see the results.


Test output of test_palindrome.py version #2

The test fails, because the code is not enabled to process palindrome strings with spaces in them. So let us do as TDD step (5) says, and write some code to make this test pass.

Since it is clear we need to ignore spaces, a quick fix is to purge all spaces from the input string. Here is the modified palindrome module with this simple fix:

Copy
"""
Module palindrome - Returns whether an input string is palindrome or not
"""

import re

def is_palindrome(in_string):
    """ Returns True whether in_string is palindrome, False otherwise """

    # Case insensitive
    in_string = in_string.lower()
    # Purge spaces
    in_string = re.sub('\s+','', in_string)
    # Check if string is same as in reverse
    return in_string == in_string[-1::-1]
Let's now repeat step (4) of TDD to see if the updated code makes the test pass.


Console output of test_palindrome.py version #2, after code updates

Surely, the code passes the test now!

What we just saw was an instance of TDD with one update cycle for implementing a module in Python, which checks strings for palindromes. In a similar way, one can keep adding tests, and keep updating the code as per step (8) of TDD, thereby adding new functionality while maintaining the updated tests naturally via the process.

We conclude this section with the final version of our palindrome test case, which adds a testcase for checking for strings with extra punctuations.

Copy
"""
Module test_palindrome - TDD for palindrome module
"""

import palindrome

def test_basic():
    """ Basic test for palindrome """

    # True positives
    for test in ('Rotator','bob','madam','mAlAyAlam', '1'):
        assert palindrome.is_palindrome(test)==True

    # True negatives
    for test in ('xyz','elephant', 'Country'):
        assert palindrome.is_palindrome(test)==False

def test_with_spaces():
    """ Testing palindrome strings with extra spaces """

    # True positives
    for test in ('Able was I ere I saw Elba',
                 'Madam Im Adam',
                 'Step on no pets',
                 'Top spot'):
        assert palindrome.is_palindrome(test)==True

    # True negatives
    for test in ('Top post','Wonderful fool','Wild Imagination'):
        assert palindrome.is_palindrome(test)==False


def test_with_punctuations():
    """ Testing palindrome strings with extra punctuations """

    # True positives
    for test in ('Able was I, ere I saw Elba',
                 "Madam I'm Adam",
                 'Step on no pets.',
                 'Top spot!'):
        assert palindrome.is_palindrome(test)==True

    # True negatives
    for test in ('Top . post','Wonderful-fool','Wild Imagination!!'):
        assert palindrome.is_palindrome(test)==False
And here is the updated palindrome module which makes this test pass:

Copy
"""
Module palindrome - Returns whether an input string is palindrome or not
"""

import re
from string import punctuation

def is_palindrome(in_string):
    """ Returns True whether in_string is palindrome, False otherwise """

    # Case insensitive
    in_string = in_string.lower()
    # Purge spaces
    in_string = re.sub('\s+','', in_string)
    # Purge all punctuations
    in_string = re.sub('[' + re.escape(punctuation) + ']+', '', in_string)
    # Check if string is same as in reverse
    return in_string == in_string[-1::-1]
Let's inspect the final output of the test _palindrome module on the console.


Console output of test_palindrome.py version #3, with matching code updates

Summary
In this chapter, we revisited the definition of testability and its related architectural quality aspects, such as complexity and determinism. We looked at the different architectural aspects that are tested and got an understanding of the type of tests that are usually performed by the software testing process.

We then discussed the various strategies for improving the testability of software, and looked at techniques to reduce system complexity, improve predictability, and to control and manage external dependencies. Along the way, we learned the different ways to virtualize and manage external dependencies, such as fakes, mocks and stubs, by way of examples.

We then looked at unit testing and its various aspects mainly from the perspective of the Python unittest module. We saw an example by using a datetime helper class, and explained how to write effective unit tests—a simple example followed by an interesting example of patching functions using the Mock library of unittest.

We then introduced, and learned quite a bit about, the two other well-known testing frameworks in Python, namely, nose2 and py.test. Next we discussed the very important aspect of code coverage, and saw examples of measuring code coverage using the coverage.py package directly, and also by using it via plugins of nose2 and pytest.

In the next section, we sketched an example of a textsearch class for using advanced mock objects, where we mocked its external dependency and wrote a unit test case. We went on to discuss the Python doctest support of embedding tests in the documentation of classes, modules, methods, and functions via the doctest module while looking at examples.

The next topic was integration tests, where we discussed the different aspects and advantages of integration tests, and looked at the three different ways in which tests can be integrated in a software organization. Test automation via Selenium was discussed next with an example of automating a couple of tests on the Python language website using Selenium and py.test.

We ended the chapter with a quick overview of TDD, and discussed an example of writing a program for detecting palindromes in Python using the TDD principles, where we developed the program using tests in a step-by-step fashion.

In the next chapter, we will look at one of the most critical quality attribute of architecture when developing software—namely, Performance.

---

"The degree to which the system is able to meet its throughput and/or latency
requirements in terms of the number of transactions per second or time taken for
a single transaction."

We've already taken an overview of measuring performance in the introductory chapter. Performance can be measured either in terms of response time/latency or in terms of throughput. The former is the time it takes for the application to complete a request/response loop on average. The latter is the rate at which the system processes its input in terms of the number of requests or transactions successfully completed per minute.

The performance of a system is a function of its software and of its hardware capabilities. A badly written piece of software could still be made to perform better by scaling the hardware – for example, the amount of RAM.

Similarly a piece of software can be made to work better on existing hardware by increasing its performance – for example, by rewriting routines or functions to be more efficient in terms of time or memory or by modifying the architecture.

However, the right type of performance engineering is the one where the software is tuned for the hardware in an optimal fashion so that software scales linearly or better with respect to the available hardware.
