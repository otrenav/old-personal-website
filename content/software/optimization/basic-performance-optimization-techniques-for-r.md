+++
title = "Basic Performance Optimization Techniques for R"
image = "/img/content/basic-performance-optimization-techniques-for-r/main.jpg"
slug = "basic-performance-optimization-techniques-for-r"
date = "2017-12-22"
draft = false
tags = [
    "R",
    "Optimization",
    "Vectorization"
]
promotion = "promotions/r-programming-by-example"
+++

During the last decades demand for computing power has steadily increased as the
data volume has become larger and models have become more complex. It is obvious
that minimizing the time needed for calculations has become an important task,
and it it not uncommon for the execution time of an R program to be measured in
hours, or even in days. As the volume of data to be analyzed increases, the
execution time can become prohibitively long, and it is often the case that data
scientists get stuck with these bottlenecks. When this happens, and if they
don't know much about performance optimization in R, they'll probably just
settle with reduced amounts of data, which can hinder their analysis. However,
fear not, R programs can be slow, but well-written R programs are usually fast
enough, and in this post I will show a couple of basic techniques you can use to
make your R implementations faster.

If you would like to understand more about why R can be slow sometimes and how
to deal with it, as well as more advanced topics on performance optimization
than what I'll show here, and many other areas of R programming, you may read my
recent book, ["*R Programming by Example*"](http://links.otrenav.com/r-programming-by-example) (Packt Publishing,
2017). If you do read it, make sure to send me any comments or questions you may
have! I appreciate them. :)

## Should I optimize for performance?

Firt of all, it's a well known fact that an inefficient algorithm implemented
efficiently can be orders of magnitude slower than an efficient algorithm
implemented inefficiently. This means that most of the time algorithm selection
is much more important than implementation optimization. Having said that, let's
assume you selected or designed a good-enough algorithm. Now, before you do any
performance optmization on your implementation, ask yourself, "*Should I invest
the time to optimize the implementation?*" Performance optimization can be a
very costly activity. Your time and your client's resources are valuable and
they probably are better spent on something else.

Let's say that for some reason you must make your implementation faster. The
first thing you must decide now is how fast is *fast enough*. Is your algorithm
required to simply finish within hours instead of days or do you need to to come
down to microsecond levels? Is this an absolute requirement or should you simply
do the best job you can within a specific timeframe? These are important
questions that you must consider before optimizing your implementation, and
sometimes the solution is not even optimization. It's not rare for clients to
prefer spending more money on using some type of *cloud resource* to tackle the
performance problem rather than spending your valuable time optimizing an
algorithm's performance. Specially if you can provide more business value doing
something else.

## What are Simple Moving Averages?

The algorithm we will work with is called *Simple Moving Average* (SMA). It's a
very well-known tool for doing *technical analysis* of time-series, specially
for financial markets and trading. The idea behind SMA is that you will compute
an *average* at each point in time by looking back at a predefined number
periods. For example, let's say you're looking at a minute-by-minute
time-series, and you are going to compute an `SMA(30)`. That means at each
observation in your time-series, you will take the observations that correspond
to the previous 30 minutes, and will save the average for these 30 observatinos
as the `SMA(30)` value for that point in time.

| {{<figure src="/img/content/basic-performance-optimization-techniques-for-r/time-series-sma.png" title="Time Series SMA">}}   |
|-------------------------------------------------------------------------------------------------------------------------------|
| Subsets for SMA(3) and SMA(4) non-`NA` values for monote time-series                                                          |

SMAs have three basic properties. First, SMAs are also a time-series, and they
have the same number of observations as the original time-series. Second, the
first `n - 1` elements in an `SMA(n)` are `NA` because at each of those points
in time there are not enough observations backwards to compute the required
average. Third, note that every time we move one time-unit forward we add one
observation at the *front* of the current subset, and we remove one observation
from its *back*, as the image above shows.

## Our first, very inefficient, attempt at an SMA

Before we look at our first implementation, a few words about the data we will
use. The data comes from a very rough simulation for Bitcoin and Litecoin
prices. The actual data file can be downloaded
[here](/files/basic-performance-optimization-techniques-for-r/data.csv),
and it's a tabular structure where each observation is a price point with the
following variables: `timestamp` (string in `YYYY-MM-DD-HH-mm` format),
`price_usd` (float), `name` (string with either "Bitcoin" or "Litecoin"), and
`symbol` (string with either "BTC" or "LTC").

All our SMA implementations for this post will receive the following parameters:
`period` to specify how many observations to use for the SMA, `symbol` to denote
the asset we want to make the calculations for (either `"BTC"` for Bitcoin or
`"LTC"` for Litecoin), and the actual `data`, which assumes a structure as what
I defined in the previous paragraph. Furthermore, all implementations in this
post make two assumptions on `data`: the `timestamp` column is in increasing
order and we don't have *gaps* in the time-series, meaning that for every minute
we actually have price data. This allows us to skip any ordering procedures and
checking whether the SMA should contain `NA`'s internally when no data is
available. Both of these assumptions are valid in he case of the simulated data
linked above.

Now let's turn to the actual implmentations. Our first, and very inefficient,
SMA implementation is `sma_1()`, and it is programmed using a style that may
look fine for other types of languages, like Fortran or C++, but is not so for
R. First, let's define what some of the objects represent. The `end` integer
denotes the *end*, or right-extreme, of the SMA interval under consideration.
The `position` integer, which is the same as the `end` every time we start the
loop, denotes the actual observation we're currently using within the subset of
observations for any given average. The `sma` real will contain the actual SMA
for the `end` position. The `n_accumulated` integer keeps track of the number of
observations we have *accumulated* for a given subset and is used to know if we
have enough (meaning `period` of them). Finally, the `period_prices` data frame
contains a single column to store the prices for the current SMA calculation.

Second, note that since we have mixed data for Bitcoin and Litecoin prices, we
must check whether the observation at the current `end` corresponds to the
`symbol` we're interested in. If it's not, we simply ignore that iteration, but
if it is, then we will accumulate `period_prices` going backwards until the
number of accumulated prices is equal to the `period`, or the current `position`
is equal to 1, meaning that we're at the beginning of the time-series. Finally,
note that the `position` integer is increased regardless of whether the
observation was useful or not so that we don't get stuck.

Third, and finally, after the *while-loop* is finished we know that we either
have accumulated a number of prices equal to the `period` we are interested in,
or we encountered the beginning of the time-series. In the first case we compute
the *mean* of such prices by iterating over the `period_prices` dataframe, and
assign that as the `sma` value for the current `end` position. In the second
case, we simply record an `NA` since we were not able to compute the full
average.

```r
sma_1 <- function(period, symbol, data) {
    result <- data.frame(sma=numeric())
    for(end in 1:nrow(data)) {
        position <- end
        sma <- NA
        n_accumulated <- 0
        period_prices <- data.frame(price=numeric())
        if (data[end, "symbol"] == symbol) {
            while(n_accumulated < period & position >= 1) {
                if (data[position, "symbol"] == symbol) {
                    period_prices <- rbind(
                        period_prices,
                        data.frame(price=data[position, "price_usd"])
                    )
                    n_accumulated <- n_accumulated + 1
                }
                position <- position - 1
            }
            if (n_accumulated == period) {
                sma <- 0
                for (price in period_prices$price) {
                    sma <- sma + price
                }
                sma <- sma / period
            } else {
                sma <- NA
            }
            result <- rbind(result, data.frame(sma=sma))
        }
    }
    return(result)
}
```

If the implementation seems complicated, it's because it is. As we start
improving our code it will naturally be simplified, which will make it easier to
understand.

We take the first 100 observations, which correspond to 50 minutes of Bitcoin
price action, and we calculate the `SMA(10)` for them. Remember that according
to our data assumptions, these 100 observations are divided in 50 for Bitcoin
and 50 for Litecoin.

```r
data_original <- read.csv("./data.csv")
data   <- data_original[1:1000, ]
symbol <- "BTC"
period <- 10

s1 <- sma_1(period, symbol, data)
s1
#>         sma
#> 1        NA
#> ...      NA
#> 9        NA
#> 10 7999.910
#> 11 7999.231
#> 12 8000.703
#> 13 7999.489
#> 14 7999.924
#> 15 7999.360
#> 16 8000.284
#> 17 7999.978
#> 18 7999.306
#> 19 7999.508
#> 20 7998.562
(Truncated output)
```

I removed results 2 through 8 to save space because, as we know at this point,
they are all `NA` values. Everything seems to be working fine, so now we need to
measure how much time it takes to execute this code. To measure it, we use the
`microbenchmark` function, from the `microbenchmark` package, and specify
microseconds as our unit. This will execute our SMA code 100 times and provide
statistics about how much time it took, which can be extracted with the
`summary()` function. In this case, we are interested in the median, so that's
what we ask for.

```r
library(microbenchmark)

performance <- microbenchmark(s1 <- sma_1(period, symbol, data), unit = "us")
summary(performance)$median
#> [1] 142136
```

The median time for our `sma_1()` implementation was 142136 microseconds, which
is our base case for comparison. Let's say our goal is to get it close to 200
microseconds. In the following sections we will see how to achieve this by
making a couple of simple changes.

## Move checks out of iterative processes

Let's start with the obvious, move checks out of iterative processes. In this
case we are unnecessarily checking whether we are working with a `symbol`, and
to make it worse, we do it in two different places. Believe or not, I often see
code that can be faster by simply moving checks out of iterative processes, as
is the case here. To fix this, we simply introduce a filter at the beginning of
the function that keeps only observations that contain the correct `symbol`.
After doing so, we can be sure that all observations have the *correct* symbol.

Doing so reduces two indentation levels in our code since these checks were
nested. Doing so feel great, doesn't it? Now it seems that we have a much
simpler implementation which intuitively will perform much better.

```r
sma_2 <- function(period, symbol, data) {
    data <- data[data$symbol == symbol, ]
    result <- data.frame(sma=numeric())
    for(end in 1:nrow(data)) {
        position <- end
        sma <- NA
        n_accumulated <- 0
        period_prices <- data.frame(price=numeric())
        while(n_accumulated < period & position >= 1) {
            period_prices <- rbind(
                period_prices,
                data.frame(price=data[position, "price_usd"])
            )
            n_accumulated <- n_accumulated + 1
            position <- position - 1
        }
        if (n_accumulated == period) {
            sma <- 0
            for (price in period_prices$price) {
                sma <- sma + price
            }
            sma <- sma / period
        } else {
            sma <- NA
        }
        result <- rbind(result, data.frame(sma=sma))
    }
    return(result)
}
```

Now, it wouldn't be a correct comparison if we measured implementations that do
different things, would it? Checking that our implementations produce the same
results is useful to increase our confidence that every change we make does not
introduce unexpected behavior. It's very similar to unit-testing.

Also, as you probably know, with *real* numbers you're better of checking that
they are *close enough* as opposed to *exactly the same*. If you check for
identical numbers, you may get a `FALSE` result due to one of the numbers having
a difference of 0.000000001, which is not significant in our case. In this case,
we specify 0.001 as our *significant* value threshold, and test that each pair
of numbers has a difference lower or equal to that threshold.

As can be seen in the comparison, all values are the same so we can proceed with
confidence.

```r
performance <- microbenchmark(s2 <- sma_2(period, symbol, data), unit = "us")
all(s1$sma - s2$sma <= 0.001, na.rm = TRUE)
#> TRUE
summary(performance)$median
#> [1] 97514.58
```

Our intuition was correct, the median time for `sma_2()` was 97514.58
microseconds, which is around 68% of the median execution time for `sma_1()`.
Tha's a significant improvement for just getting checks out of iterative
processes.

## Use the simplest data structure possible

Many R users would agree that data frames are a basic tool for data analysis.
They are an intuitive way to represent a typical dataset with rows and columns
representing observations and variables, and they can be very flexible. However,
their convenience comes with a performance cost that people often don't mention.

As you can see in `sma_3()` the code is practically the same as `sma_2()`,
except that the `result` and `period_prices` objects are no longer data frames.
Instead they have become vectors. We are still dynamically expanding their
lengths when recursively calling the `c()` function, which is something you
shouldn't be doing for performant code, but we will take it step by step.

```r
sma_3 <- function(period, symbol, data) {
    data <- data[data$symbol == symbol, ]
    result <- NULL
    for(end in 1:nrow(data)) {
        position <- end
        sma <- NA
        n_accumulated <- 0
        period_prices <- NULL
        while(n_accumulated < period & position >= 1) {
            period_prices <- c(period_prices, data[position, "price_usd"])
            n_accumulated <- n_accumulated + 1
            position <- position - 1
        }
        if (n_accumulated == period) {
            sma <- 0
            for (price in period_prices) {
                sma <- sma + price
            }
            sma <- sma / period
        } else {
            sma <- NA
        }
        result <- c(result, sma)
    }
    return(result)
}
```

We proceed to check for correctness and benchmark. However, we must make a small
change since `sma_1()` returns a data frame, but `sma_3()` returns a vector. We
need to make sure we're comparing using the correct syntax, as is shown below.

```r
performance <- microbenchmark(s3 <- sma_3(period, symbol, data), unit = "us")
all(s1$sma - s3 <= 0.001, na.rm = TRUE)
#> TRUE
summary(performance)$median
#> [1] 4425.707
```

As we can see, the median time for `sma_3()` was 4425.707 microseconds. Removing
these dataframe structures allowed us to only take around 4% of the previous
median time! That's amazing for such an easy change, isn't it? But, we can do
better ;).

## Vectorize arithmetic operations

Vectorization means removing a manual looping mechanism in favor of operations
optimized to do the same thing without the need for explicit loops. Vectorizing
is a fundamental tool in R and you should get used to programming using it
instead of explicit loops whenever possible.

> Tip: explicit loops may be efficient in other languages, like Fortran and C++.
> However, in R you're better off using vectorization most of the time.

There are various ways of vectorizing operations. A common use for vectorization
is for matrix or vector operations. Instead of iterating through elements in
different vectors or matrices, and multipliying and adding them accordingly, you
can simply use the `%*%` operator. Another way of vectorizing code is to replace
loops with R built-in functions, and that's what we will use here.

The while-loop in combination with the if-conditional that follows it, are used
to keep track of the number of accumulated `period_prices` using the
`n_accumulated` integer, and applying the necessary arithmetic operations to
caculate the required average. This seems cumbersome, and we can do much better.
To fix this, we will create a `start` position that will be equal to the `end`
position for the current subset, minus one to make sure indexes match correctly.
Then, instead of iterating through accumulated prices, we will simply extract
the range of values from `start` to `end`, and take their average using the
vectorized `mean()` function. Note that we still need to check whether there are
enough observations backwards, which we do by checking that the `start` position
is greater or equal to one.

```r
sma_4 <- function(period, symbol, data) {
    data <- data[data$symbol == symbol, ]
    result <- NULL
    for(end in 1:nrow(data)) {
        start <- end - period + 1
        if (start >= 1) {
            sma <- mean(data[start:end, "price_usd"])
        } else {
            sma <- NA
        }
        result <- c(result, sma)
    }
    return(result)
}
```

As you may have noted, our code is becoming more expressive as we continue to
making it simpler. When programming with R, this happens often when
vectorization comes into play, which is another advantage of using it.

Note that this change would not have been possible if we had not filtered the
data at the top of the function, since we would have observations that
correspond to different symbols mixed among themselves and our `start:end`
interval would pick observations that contain other symbols. This goes to show
that sometimes optimizations depend on each other, and one can't be applied
without applying a previous one, and this relations are often found
accidentally.

Again, we check for correctness and benchmark.

```r
performance <- microbenchmark(s4 <- sma_4(period, symbol, data), unit = "us")
all(s1$sma - s4 <= 0.001, na.rm = TRUE)
#> TRUE
summary(performance)$median
#> [1] 561.0705
```

Now, the median time for `sma_4()` was 561.0705 microseconds, which is only 12%
of the previous best value. As you can see, using vectorized arithmetic not only
makes our code easier to read, but also makes it faster. Cool, huh?

Before we move to the next section, I just want to mention that there are many
other vectorized functions in R that may help speed your code. Some examples are
`which()`, `where()`, `any()`, `all()`, `cumsum()`, and `cumprod()`. When
working with matrices you may use `rowSums()`, `colSums()`, `lower.tri()`,
`upper.tri()`, and many others. When dealing with something that seems that
could be vectorized, chances are there's already a function for that.

## Vectorize iterations

Now we will use another approach to vectorization which involves using the
family of `*apply()` functions (e.g. `lapply()`, `sapply()`, and so on). These
functions allow us to apply another function to each element in the object we
pass it's, regardless of whether the funciton R bult-in function, comes from
external package, or is created by us. This will produce simpler code than
explicit loops and will also make your implementation faster because these
functions are highly optimized. Whenever you can, you should use these functions
instead of explicit iterations.

> NOTE: Technically, the `apply()` function is not as optimized as the other
> functions in its family, so the performance gains won't be as much as with the
> other ones, but code clarity will indeed increase.

To use this technique, we will abstract the logic within the for-loop into its
own function named `sma_from_position()`, and we wil use the `sapply()` function
to apply it to each of the subsets in the data. To do this we send the `end`
integer as the first argument to the `sapply()` function, followed by the
function we want to apply (note that we don't use parenthesis because we want to
send the function object, not call the function and then pass its result), and
since `period` and `data` are fixed objects we can pass them along after the
function name as the remaining two arguments fro `sma_from_position()`.

An added benefit of the `sapply()` function is that it takes care of the memory
pre-allocation for us, which is a very efficient way to reduce execution time in
R. Also, note that instead of using an explicit *if-else* conditional, we use
the `ifelse()` function, which takes the condition to be checked as its first
argument, the desired result in case of the condition being met as its second
argument, and the desired result in case the condition is not met as its third
argument. Finally, note that to remove the use of the remaining data frame even
more, we keep only the `price_usd` variable data, in the first line of the
`sma_5()` function.

```r
sma_5 <- function(period, symbol, data) {
    data <- data[data$symbol == symbol, "price_usd"]
    return(sapply(1:length(data), sma_from_position, period, data))
}

sma_from_position <- function(end, period, data) {
    start <- end - period + 1
    return(ifelse(start >= 1, mean(data[start:end]), NA))
}
```

Again, we benchmark and check for correctness. This is the last one, I promise.

```r
performance <- microbenchmark(s5 <- sma_5(period, symbol, data), unit = "us")
all(s1$sma - s5 <= 0.001, na.rm = TRUE)
#> TRUE
summary(performance)$median
#> [1] 224.731
```

The median time for `sma_5()` is 224.731 microseconds, which 40% of our previous
best time. We will stop here, but note that we almost achieved our goal of 200
microseconds. This means that we have achieved performance improvements in the
orders of magnitude. Did you think it was possible by these types of simple
changes?

## Conclusion

The performance improvement has been drastic. Our best, implementation takes
around 0.15% of our initial benchmark time. This means that if we were actually
using this code with data that required our best implementation to take 1 hour
to finish, the implementation we started with would take around 26 days to
achieve the same results. The fact that we can achieve this level of performance
improvement with such simple changes is surprising to me, and that's why, as I
mentioned in the introduction, good R code can often be faste enough, but bad R
code can be painfully slow.

| Implementation | Microseconds Median | % from `sma_1` |
|----------------|---------------------|----------------|
| `sma_1`        | 142,136             | 100 %          |
| `sma_2`        | 97,514              | 68 %           |
| `sma_3`        | 4,425               | 3 %            |
| `sma_4`        | 561                 | 0.39 %         |
| `sma_5`        | 224                 | 0.15 %         |

To further reduce the execution time of our implementations we would have to
resort to more advanced techniques such as parallelization and/or delegation to
statically typed languages, like Fortran or C++.

To learn more about the topics covered in this post, such as learning how to
parallelize your code or how to delegate it to Fortran or C++, as well as how to
find what parts of your code are performance bottlenecks, you may read my recent
book, ["*R Programming by Example*"](http://links.otrenav.com/r-programming-by-example) (Packt Publishing,
2017). In it I use three real-world examples to teach basic-to-advanced
techniques for R programming. As I said before, if you do read it, make sure to
send me any comments or questions you may have! I appreciate them. :)
