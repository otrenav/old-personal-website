+++
title = "Large data files in data analysis"
date = "1990-03-29"
draft = true
tags = [
    "Large Files",
    "Data Analysis"
]
+++

- TODO: Write this post

Source: http://machinelearningmastery.com/large-data-files-machine-learning/

Exploring and applying machine learning algorithms to datasets that are too
large to fit into memory is pretty common.

This leads to questions like:

How do I load my multiple gigabyte data file?  Algorithms crash when I try to
run my dataset; what should I do?  Can you help me with out-of-memory errors?
In this post, I want to offer some common suggestions you may want to consider.

7 Ways to Handle Large Data Files for Machine Learning 7 Ways to Handle Large
Data Files for Machine Learning Photo by Gareth Thompson, some rights reserved.
1. Allocate More Memory

Some machine learning tools or libraries may be limited by a default memory
configuration.

Check if you can re-configure your tool or library to allocate more memory.

A good example is Weka, where you can increase the memory as a parameter when
starting the application.

2. Work with a Smaller Sample

Are you sure you need to work with all of the data?

Take a random sample of your data, such as the first 1,000 or 100,000 rows. Use
this smaller sample to work through your problem before fitting a final model on
all of your data (using progressive data loading techniques).

I think this is a good practice in general for machine learning to give you
quick spot-checks of algorithms and turnaround of results.

You may also consider performing a sensitivity analysis of the amount of data
used to fit one algorithm compared to the model skill. Perhaps there is a
natural point of diminishing returns that you can use as a heuristic size of
your smaller sample.

3. Use a Computer with More Memory

Do you have to work on your computer?

Perhaps you can get access to a much larger computer with an order of magnitude
more memory.

For example, a good option is to rent compute time on a cloud service like
Amazon Web Services that offers machines with tens of gigabytes of RAM for less
than a US dollar per hour.

I have found this approach very useful in the past.

See the post:

How To Develop and Evaluate Large Deep Learning Models with Keras on Amazon Web
Services
4. Change the Data Format

Is your data stored in raw ASCII text, like a CSV file?

Perhaps you can speed up data loading and use less memory by using another data
format. A good example is a binary format like GRIB, NetCDF, or HDF.

There are many command line tools that you can use to transform one data format
into another that do not require the entire dataset to be loaded into memory.

Using another format may allow you to store the data in a more compact form that
saves memory, such as 2-byte integers, or 4-byte floats.

5. Stream Data or Use Progressive Loading

Does all of the data need to be in memory at the same time?

Perhaps you can use code or a library to stream or progressively load data
as-needed into memory for training.

This may require algorithms that can learn iteratively using optimization
techniques such as stochastic gradient descent, instead of algorithms that
require all data in memory to perform matrix operations such as some
implementations of linear and logistic regression.

For example, the Keras deep learning library offers this feature for
progressively loading image files and is called flow_from_directory.

Another example is the Pandas library that can load large CSV files in chunks.

6. Use a Relational Database

Relational databases provide a standard way of storing and accessing very large
datasets.

Internally, the data is stored on disk can be progressively loaded in batches
and can be queried using a standard query language (SQL).

Free open source database tools like MySQL or Postgres can be used and most
(all?) programming languages and many machine learning tools can connect
directly to relational databases. You can also use a lightweight approach, such
as SQLite.

I have found this approach to be very effective in the past for very large
tabular datasets.

Again, you may need to use algorithms that can handle iterative learning.

7. Use a Big Data Platform

In some cases, you may need to resort to a big data platform.

That is, a platform designed for handling very large datasets, that allows you
to use data transforms and machine learning algorithms on top of it.

Two good examples are Hadoop with the Mahout machine learning library and Spark
wit the MLLib library.

I do believe that this is a last resort when you have exhausted the above
options, if only for the additional hardware and software complexity this brings
to your machine learning project.

Nevertheless, there are problems where the data is very large and the previous
options will not cut it.

Summary

In this post, you discovered a number of tactics that you can use when dealing
with very large data files for machine learning.

Are there other methods that you know about or have tried?  Share them in the
comments below.

Have you try any of these methods?  Let me know in the comments.
