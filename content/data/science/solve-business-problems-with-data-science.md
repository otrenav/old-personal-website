+++
title = "Solve business problems with data science"
date = "1990-03-29"
draft = true
tags = [
    "Business",
    "Data Science"
]
+++

- TODO: https://medium.com/@jameschen_78678/solve-business-problems-with-data-science-155534b1995d

# Solve business problems with data science

Solve Business Problems with Data Science A generalized framework to data-driven
consulting projects

Overview

Here we propose a general framework to solve business problems with data
science. This 5-step framework will not only shed light on the subject to
someone from the non-technical background, but also allow data enthusiasts to
consistently deliver quality results in a timely manner. First we will start
with defining our business problems, which helps us clarify the scope of the
project at hand. After acquiring sufficient amount of understanding on the
business, we can move on to specifying objectives that can be achieved through
analytics. Next, we will examine the data we can get our hands on, and conduct
standardized processes to clean and explore the data. After data preparation
comes the model training step, where we will examine the performance of
different algorithms on the data and obtain the optimal model. Finally, we also
need to A/B test the model again with real data to see if an actual lift could
be found.

Step 1: Business Problems

From our experiences, it is not uncommon to get ambiguous problems at first,
from both internal and external clients. We will use an E-commerce client
project as a demonstration through out this blog post. “We’d like to increase
sales.” “We want to know how we can improve our business.” It is our
responsibility to dig more information out of our clients and make sure they
understand the reason why we are doing it. This is very similar to traditional
management consulting, where we need to slice the problem to smaller pieces that
can be tackled more effectively. For example, we can break down sales into
quantity and price by each product line, or we can break down sales into
purchases from new customers and existing customers, so change in trend can be
observed. There are numerous ways to slice the problems, and by having superb
domain expertise in the business, we will be able to do it more effectively. Of
course, in situations where decreases in multiple segments are observed, we need
to set up priorities, and focus on the segments that have the most impact on
sales over others. Let us assume that a severe decrease in quantity sold for
product A is observed, specifically from existing customers. The business
problem can thus be redefined as below. “What do we do when old customers are
not buying product A anymore?” After clarifying the business problem, we can
move on to creating objectives.

Step 2: Analytics Objectives

As opposed to creating SMART objectives, setting up sound analytics objectives
requires us to have deeper understanding on the three major learning approaches
in data science. We will focus on algorithms in supervised learning and
unsupervised learning here, while reinforcement learning is more popular among
applications such as deep learning and artificial intelligence.

Supervised Learning

Classification algorithms, such as k-Nearest Neighbors and Support Vector
Machine, allow us to classify data points into categorical outcomes. For
instance, we can classify all customers into purchasers and non-purchasers; we
can also predict if a new website visitor will be converted into member.
Regression algorithms, such as linear and polynomial regression, enable us to
predict numerical outcomes. For example, we can predict the dollar amount of
purchase by each customer; we can predict the number of days till a customer
visits our website again. In supervised learning, we tend to have a target
variable that can either be categorical or numerical, and we will use other
independent variables to predict the outcome of the target variable.

Unsupervised Learning

Clustering algorithms, including k-means and hierarchy clustering, let us group
data points with similar features. For example, we can segment our web visitors
based on their browsing behaviors, such as average time on page and average
number of pages viewed. Association rule algorithms, such as apriori principle
and Markov Chain, can uncover hidden patterns and relationships in our data. For
example, we can know which products are often viewed and bought together; we can
also predict the next web page to be viewed by a customer. Unlike supervised
learning, here we do not have a specific target variable, but rather a sequence
or relationship between the data points as output. Going back to the business
problem defined, we may still find that the algorithms above cannot be applied
to the problem directly. Therefore, we will need to transform the business
problem into below. “Can we acquire new customers that are more likely to buy
product A?” With the problem defined above, the analytics objective can be set
up as to find variables that can help us predict product A purchasers. In other
words, we want to find out what product A purchasers have in common, and focus
our marketing effort on potential customers with the same shared features. “Can
we promote other products that old customers are likely to buy?” With the
problem defined above, the analytics objective is to find patterns between other
products viewed and bought along with product A. We can then use email or SMS to
communicate the benefits of other products with existing customers. Now we have
covered step 1 and step 2, which require certain amount of domain expertise and
critical thinking. Another important take away is that we can finish steps 1 and
2 prior to examining per customer level data, so our thought process is less
likely to be constrained. Next we will move on to more technical steps of the
framework, using product A purchaser classification as a demonstration.

Step 3: Data Preparation

Sources and Extraction

We will first identify the sources that we can get our data from. In the case of
E-commerce, there is database to store demographic and transactional data of
customers. There is also Google Analytics, where web behavior data is stored on.
Given the popularity of social platforms such as Facebook, we can also get
social behavior data of our customers, including public posts and public fan
page likes.

Since demographic and transaction data are stored in-house, the extraction is
relatively straight forward. In order to extract per visitor level data on web
behaviors, or clickstreams, from Google Analytics, we need to first set up
custom dimensions such as browser id, login id, and timestamp. We can then
export the data using the Analytics API by Google. As for social data from
Facebook, there is more manual work. Sometimes users can sign-up via their
Facebook accounts, and we can get their profiles accordingly. We can also map
email addresses and phone numbers from our database to find the profiles. Since
the Graph API by Facebook does not provide such information, we will also need
to scrape the content ourselves. Cleansing and Transformation Since we have
extracted data from three distinctive sources above, it is highly likely that
the formats are very different, and hence we need to compile the data to a per
customer level dataframe. That is, each observation, or row, is a representation
of a single customer; each variable, or column, represents a single behavior or
identity of that customer. Undoubtedly we will have missing values in our
dataframe, as some customers may have never bought from us, hence no
transactional data; some customers may have made purchases at physical stores
only, hence no web behavior data can be acquired. While removing the
observations with missing values may be an easy solution, we risk losing
valuable information. As a result, it is highly recommended to use more feasible
approaches, such as using regression to predict missing values. When
transforming data into a dataframe, sometimes we need to rely on experiences and
domain expertise to engineer new variables from a number of currently available
variables. For example, in transactional data, customers may have purchased
different quantities and different products, in a list format. We will need to
create a set of dummy variables to represent all the products available, and
record the purchase quantity as observations, in order to include purchase
information in the per customer level dataframe. Similar transformations can be
found in web behavior data as well, since customers may have visited our website
from different media channels, a single default variable Source provided by
Google Analytics may not be sufficient. Exploration and Visualization When the
dataframe is complete, we can start exploring the relationships between
variables. A common practice is to find the correlation between any two
variables. In addition, we can also calculate the statistical metrics of each
variable, such as maximum value, minimum value, mean and median, in order to
find extreme values, or outliers, that should be neglected. It is important to
explore the dataframe prior to model training, as we can obtain more meaningful
understanding on the characteristics and limitations of the data at hand, and we
can also know if it is necessary to include additional engineered variables.

Step 4: Model Development

Selection

There are a number of classification algorithms we can choose from, and it is
important to know the pros and cons of each algorithm, such as the trade off
between predictability and interpretability. Since the analytics objective is to
first identify variables that will help us predict product A purchasers, and
then use the identified variables to acquire new customers, an algorithm that
can return comprehensive results is more ideal, as opposed to more powerful
blackbox algorithms. In terms of interpretability, our top algorithm choice is
the Classification and Regression Tree (CART). However, we would still want to
use other algorithms, including k-Nearest Neighbors (kNN), linear and quadratic
discriminant analysis (LDA/QDA), logistic regression, random forests, boosting,
and Support Vector Machine (SVM) as predition benchmarks.

Training

Here we will need to divide the dataframe into training (70%), validation (20%),
and testing(10%) data sets. We will use the training set to train models, and
obtain unbiased result with the validation set. After tuning parameters to
obtain better performance on validation set, we will evaluate the final model
performance with the testing set, which is unseen data and can again return
unbiased results and prevent over-fitting.

Evaluation

There is a variety of evaluation metrics, such as confusion matrix, gain and
lift charts, Gini coefficient, R-squared and adjusted R-squared, area under the
ROC curve (AUC), and Mean Squared Error (MSE). These metrics will allow us to
evaluate the performance of our algorithms. It is also important to know which
metrics to use depending on different situations. For example, when target
variable has a skewed distribution, that is, the proportion of product A
purchasers only accounts for 1% of all customers, we may get misleading results
if we rely on confusion matrix to evaluate the model accuracy, since by labeling
all customers as non product A purchasers, we can randomly achieve 99% accuracy.
Instead, other metrics such as MSE may provide us with more adequate evaluation.

Validation

We can also tune the parameters of our algorithms to achieve better results on
the validation data set. For example, in the random forests algorithm, we need
to specify the number of nodes to include, whether to include all variables,
half the amount of variables, or squared-root of the variables. This is a
relatively time consuming step, as we have to explore different options on all
the selected models. By doing so, we are tuning our algorithms to fit the
validation set better, which inevitably results in over-fitting situations.

Testing

Finally, in order to obtain un-biased performance on the final model, we will
apply the algorithm with tuned parameters to the testing data, in order to
evaluate the true performance.

Step 5: Performance Testing

With the tested final model, before actual implementation or actual marketing
campaign, we need to do testing to see if there is an actual lift. For example,
the final model indicated that product A purchasers are male customers in their
30s, who visit our website from Google paid search via their PCs, and most often
on Saturday nights. We can spend a small budget on Google paid search to see if
this particular segment purchases more against other segments. Alternatively, we
can also A/B test each variable, such as PC versus Mobile or Saturday nights
versus non-Saturday nights. To properly set up and interpret the A/B testing
results, we need to keep a few things in mind, such as sample size, confidence
level, and the confidence interval for proportion. For instance, when we are
testing this particular segment against other segments, since we already know
the normal purchase rate is around 5%, with 1,000 customers as the sample size,
a 95% confidence interval for other segments would be between 3.81% and 6.53%.
If we estimate the purchase rate of the identified segment to be at 10%, then
with the same 1,000 sample size, the confidence interval is between 8.29% and
12.02%, which does not overlap with the confidence interval for other segments.
As a result, we can conclude that with 95% confidence, sample size of 1,000
customers is sufficient enough for us to say that the identified segment indeed
has an actual lift on purchases. However, if the estimated purchase rate of the
identified segment is lower than 10%, then we may need to conduct the test on
more than 1,000 customers. If we are happy with the A/B testing results, we can
go ahead and create larger scale marketing campaigns.

Final Thoughts

This sums up for the blog post. We have covered the 5-step framework to solve
business problems with data science. While we use an E-commerce client as the
demonstration case, potential applications are not limited to digital marketing
only. In terms of the three pillars in data science — domain expertise and
critical thinking, hacking and programming, mathematics and statistics, steps 1
and 2 require industry knowledge and creativity; hacking and programming skills
come in handy when we are extracting and cleaning data from different sources;
math and statistical background are necessary to understanding the advantages
and limitations on different algorithms as well as result interpretations. The
5-step framework is of course a general approach, while the order of some
sub-steps is interchangeable, and should be modified and tailored to fit
different client projects.
