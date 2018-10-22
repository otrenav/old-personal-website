+++
title = "Data Analysis Debt"
date = "1990-03-29"
draft = true
tags = [
    "Clean Code",
    "Technical Debt"
]
+++

- TODO: Write this post

Source: https://www.oreilly.com/ideas/what-is-machine-learning-debt

For a practical guide to integrate and test machine learning algorithms, check
out Matthew Kirk’s Thoughtful Machine Learning with Python.  We truly live in an
exceptional point in history. The ability to ask your TV to queue up the next
episode of Game of Thrones, or to have it “learn” what you like to watch, and
then suggest new options, is staggering. For years, companies have latched on to
the trend of utilizing machine learning algorithms for great effect, whether
it’s trading on Wall Street or recognizing cat images.  But there’s a catch:
there are many problems associated with shipping machine learning code. Among
them, the most important problems relate to three types of debt, which,
together, multiply into a type of debt specific to machine learning projects:
Code debt Data debt Math debt Debt is a term many software engineers use to
describe a general growth of complexity over time. In general, it’s something
that is an obligation to revisit something in the future. We’ll get into the
definition of each type of debt, but know that debt generally increases as a
project matures.  In this article, we’ll talk about how you will encounter these
issues as you deploy your code as well as ways of mitigating the risk.  Code
debt

Many of us know about “code debt,” or “technical debt.” This type of debt
entails an obligation to revisit and refactor old code that may no longer suit
the project. Code debt is elusive to measure, but one thing is clear: as a
project ages, you sometimes need to make short-term tradeoffs to deliver a new
feature or ship new code. Usually, short-term tradeoffs sacrifice simplicity or
stability of the code in order to get something working.  Over time, if code
debt isn’t addressed, the software becomes complicated to work on. As code debt
accrues, entropy increases, which has an inverse relationship with productivity
in a software team. This is why you hear stories of startups shipping tons of
features and then slowing down substantially—shipping additional features
becomes more complex, usually due to code debt.  The true cost of code debt is
two-fold: It decreases productivity over the long term, which might lead to your
team failing to deliver a product to the market.  It can increase server cost,
which can have debilitating effects for a small company.  While it can be
difficult to determine when or how to “pay off” code debt, the effects are
real. Taking time to refactor, rethink, and redo code has a polishing effect
(similar to the experience of not realizing how dirty something is until you
wipe it off). Paying off code debt has mostly to do with revisiting your initial
assumptions and clearing up some of the existing code for future use.  Data debt

“Data debt” is an even more amorphous and much more dangerous piece of debt for
any project. This type of debt involves relying on “facts” about a data set that
may or may not be true, or which may have been true at one point but no longer
apply. Data debt is even more illusive than code debt, and it can have even
worse effects.  We often create data debt by betting on a particular data source
and hoping it will solve a particular problem. Sometimes these bets work out,
but other times—as models evolve—you might find yourself struggling with the
data. Especially if your work involves feature transformation or selection
algorithms, both of which increase the complexity of the data.  As an example,
remember the 2007 housing market crash? In a way—the crash can actually be
attributed to a piece of data debt. There was an assumption in the real estate
industry, at the time, that housing values always increase and that you simply
couldn’t lose money on a mortgage. (For a great book on the subject, check out
The Big Short by Michael Lewis, or the movie.) They were wrong, oh so wrong.
So, how can we know if data debt is rearing its ugly head? Below are three of
the most common pieces of data debt to look out for: Correlation changes Black
swans Unstable data Correlation changes In 2007 when the housing market crashed,
a lot of the stock market’s correlations changed substantially. In the case of
the housing market crash, factors such as loan ratings all of a sudden became
poor estimators of future performance.  Finance is a good example of correlation
changes. Stocks are almost never stable. That is because financial markets are
effectively a zero sum game. While one person is trading stocks, and exploiting
momentum, the other person is exploiting reversal, making it difficult to rely
on correlations.  This can also happen to a machine learning project when a
market shifts, when people change their minds, or stop shopping for a particular
item. For instance, while you are doing a home improvement project, you might
want a website to recommend toilets, but there’s no longer a need for this
recommendation after you buy one.  Black swans In general, “black swans” can
kill any model (for a more extensive discussion, see the book by Nassim Taleb,
The Black Swan). A black swan is a metaphor for a surprising event. If you spend
your entire life seeing white swans, if one day you see a black one, you would
be surprised. Just because you haven’t seen a black swan doesn’t mean they don’t
exist. If you built a machine learning model on an observable generalization,
then most likely you would have an issue as soon as black swans started showing
up.  A good example of black swans in machine learning relates to musical
suggestions. Let’s take Spotify for an example: while they’re adding new
features such as “Discover Weekly,” sometimes they get stuck in local minima and
don’t offer users something new. Personally, I like Bach, the Blackbyrds, and
Bad Brains—that will be hard for a machine learning model to take as input to
produce new recommendations, without prior information.  Unstable data Lastly,
unstable data is a major concern. If your data source is unreliable and gives
you wild information, it might be a good idea to smooth out the data using some
sort of filter—or to just kill all outliers.  For example, many machine learning
projects rely on user input, such as survey data. Survey data is almost never
stable, even while randomizing the ordering of inputs. Most of the time, users
just want to get through the survey instead of answering correctly or
thoughtfully. A great example of this is Netflix asking you which movies you
like—you might rush through it and end up with a lot of extraneous
recommendations.  Math debt We’ve talked about code and data, but without math,
we don’t really get the benefits of machine learning algorithms. Most machine
learning algorithms don’t rely on very complicated mathematics, but they do
require configuration and tweaking, and can become quite complicated in nature.
While most algorithms are quite elegant, they can become complicated in
production. When we utilize a feature engineering algorithm like PCA, or ICA, it
feeds into a meta-heuristic-like “bagging” or “boosting,” which gets put into a
convolutional neural net. That is an immense amount of complexity.  The caveat I
can give here is that math itself is a piece of debt. The more complicated the
model, the more likely that we are going to: not intuitively understand the
model have difficulty maintaining it have difficulty configuring it
Multiplicative debt The amount of debt you accrue in a machine learning project
can quickly multiply. For instance, a machine learning project that has issues
with data and math debt will compound in complexity, and together, both types of
debt will make it a difficult project to maintain.  While some pieces of debt
are hard to mitigate, we do have some things within our control.  The Solution:
Tests, SOLID, and visualization

To overcome all of these pieces of debt is a tall order. Machine learning, while
simple in theory, can become quite complicated in production. Thankfully,
though, there are methods for reducing and preventing overall project debt.
Tests First and foremost: write tests. While you don’t have to write in a
TDD-fashion, tests serve as a scientific method for machine learning. They also
can be applied to accuracy, precision, and recall of models, which greatly
increases the stability of a project.  SOLID SOLID is a set of principles that
generally lead to good code. Solid code becomes important with respect to
machine learning projects as well. The SOLID principles include: Single
responsibility: code, data, and math should only do one thing.  Open closed:
extend code, data, and math, but don’t modify it.  Liskov substitution: you
should be able to substitute any type of code, data, and math.  Interface
segregation: code, data, and math should be well-formed through interfaces.
Dependency inversion: code, data, and math can rely on abstractions well.
Visualization Presentation is very important to running a successful machine
learning project. Without visualization, we actually don’t have many tools for
evaluating the complexity of data and math.  Visualizations can include: Boxplot
data to get a sense of distributions A flowchart of an algorithm T-SNE
(t-distributed stochastic neighbor embedding): A generalized method for
visualizing n-dimensions Clustering Images from deep learning methods Conclusion

While simple in theory, machine learning code can be difficult to turn into a
production application that is road tested and stable; this has mostly to do
with the downsides of code debt, data debt, and math debt. These three distinct
classes of technical debt end up multiplying and debilitating teams before they
get off the ground.  But there is a path forward: by using good coding
practices, tests, and visualizations, you can avoid a lot of the pitfalls.  For
a practical guide to integrate and test machine learning algorithms, check out
Matthew Kirk’s Thoughtful Machine Learning with Python.
