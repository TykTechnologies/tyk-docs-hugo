---
date: 2020-04-06T17:49:59Z
title: Benchmarks
tags: ["Benchmarks", "Performance", "Scaling", "infrastructure", "tuning"]
description: "How to benchmark, tune, and performance test your Tyk infrastructure"
menu:
  main:
    parent: "Planning for Production"
weight: 3
---

As an API Gateway introduces an extra hop and is also the single point of entry into the ecosystem, it needs to be super performant.  Tyk was designed to be performant from day one, which is also why it is written in GO.


1. [Tyk Performance Benchmarks][0]

What are the performance benchmarks for Tyk Gateway across:
- The Tyk feature set
- Multiple Clouds
- CPU scalability
- Compared to competitors


2. [Performance tuning your Gateway][1]

Step by step process to performance tuning your Gateway for that squeeze.

3. [Manual performance testing on AWS][2]

Best practice guide for setting up a manual performance test on AWS .




[0]: https://tyk.io/blog/performance-benchmarks
[1]: https://tyk.io/performance-tuning-your-tyk-api-gateway/
[2]: https://tyk.io/a-manual-for-simple-performance-testing-with-tyk-on-aws/
