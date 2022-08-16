---
date: 2020-04-06T17:49:59Z
title: Benchmarks
menu:
  main:
    parent: "Planning for Production"
weight: 3
url: "/planning-for-production/benchmarks"
---

As an API Gateway introduces an extra hop and is also the single point of entry into the ecosystem, it needs to be super performant.  Tyk was designed to be performant from day one, which is also why it is written in GO.

## TL;DR Benchmark results
The following table summarises different performance tests using Amazon EC2 virtual instances.
This is with Tyk performing authentication, rate limiting, and gathering analytics.

*There is a 0.4 ms delay between upstream and load generator.*

|     Hardware specs      |   Max Throughput (RPS)  |  P99 Latency *  |    EC2 Cost *   |
|-------------------------|-------------------------|-----------------|-------------------|
| Amazon EC2 (t2.micro)   | 2,954 req / sec         | 32.9 ms         | $ 0.0116 / hour   |
| Amazon EC2 (t2.medium)  | 4,903 req / sec         | 22.2 ms         | $ 0.0464 / hour   |
| Amazon EC2 (m4.large)   | 4,190 req / sec         | 25.2 ms         | $ 0.10 / hour     |
| Amazon EC2 (c5.2xlarge) | 23,667 req / sec        | 4.93 ms         | $ 0.34 / hour     |
| Amazon EC2 (c5.9xlarge) | 69,133 req / sec        | 1.2 ms          | $ 1.53 / hour     |


More information on how to recreate these results yourself:

https://tyk.io/a-manual-for-simple-performance-testing-with-tyk-on-aws/

{{< note success >}}
**Note**  

EC2 instance cost is variable and documented as of April 6, 2020 
https://aws.amazon.com/ec2/pricing/on-demand/
<br/>
For these tests, Tyk was deployed in Docker, so add & subtract 10% from throughput and P99 latency, respectively, to account for the decreased overhead if you plan to run from host.
<br/>
The P99 Latency is a metric which means that 99% of all API requests experience a lower latency than the given figure.
{{< /note >}}


## Performance Tuning

We have a blog post - [Performance tuning your Gateway](https://tyk.io/performance-tuning-your-tyk-api-gateway/) that walks you through getting seriously low latency and high throughput from a 2-virtual-core commodity server with just 4GB of RAM.

The outcome of following the recommendations in the post is:

* Increase throughput from ~5000 requests per second to ~6400 requests per second
* Reduce 95th %ile gateway latency by ~54% (9.2ms to 4.2ms)
* Reduce CPU consumption by ~40%

All this just by tweaking the GOGC environment variable.
