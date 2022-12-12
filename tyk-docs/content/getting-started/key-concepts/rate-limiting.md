---
title: "Rate Limiting in Tyk"
date: 2021-02-04
menu:
  main:
    parent: "Key Concepts"
weight: 65
---

In the realm of API management, rate limiting is one of the fundamental aspects of managing traffic to your APIs. Rate limiting can easily become one of the easiest and most efficient ways to control traffic to your APIs.

Rate limiting can help with API overuse caused by accidental issues within client code which results in the API being slammed with requests. On the malicious side, a denial of service attack meant to overwhelm the API resources can also be easily executed without rate limits in place.

## What is rate limiting and how does it work?

Rate limits are calculated in Requests Per Second (RPS). For example, let’s say a developer only wants to allow a client to call the API a maximum of 10 times per minute. In this case the developer would apply a rate limit to their API expressed as "10 requests per 60 seconds". This means that the client will be able to successfully call the API up to 10 times within any 60 second interval and after that the user will get an error stating their rate limit has been exceeded if they call it an 11th time within that time frame.

## The different types of rate limiting

Tyk has two approaches to rate limiting: 

### Key-level rate limiting 

Key-level rate limiting is more focused on controlling traffic from individual sources and making sure that users are staying within their prescribed limits. This approach to rate limiting allows you to configure a policy to rate limit in two possible ways: limiting the rate of calls the user of a key can make to all available APIs, another form of global rate limiting just from one specific user, and limiting the rate of calls to specific individual APIs, also known as a “per API rate limit”.

### API-level rate limiting 

API-level rate limiting assesses all traffic coming into an API from all sources and ensures that the overall rate limit is not exceeded. Overwhelming an endpoint with traffic is an easy and efficient way to execute a denial of service attack. By using a global rate limit you can easily ensure that all incoming requests are within a specific limit. This limit may be calculated by something as simple as having a good idea of the maximum amount of requests you could expect from users of your API. It may also be something more scientific and precise like the amount of requests your system can handle while still performing at a high-level. This may be easily uncovered with some performance testing in order to establish this threshold.

When rate limiting measures are put in place, they are assessed in this order (if applied):

1. API-level global rate limit
2. Key-level global rate limit
3. Key-level per-API rate limit

## When might you want to use rate limiting?

For key-level rate limiting you will be aiming to ensure that one particular user or system accessing the API is not exceeding a determined rate. This makes sense in a scenario such as APIs which are associated with a monetisation scheme where you may allow so many requests per second based on the tier in which that consumer is subscribed or paying for.

An API-level global rate limit may be used as an extra line of defence around attempted denial of service attacks. For instance, if you have load tested your current system and established a performance threshold that you would not want to exceed to ensure system availability and/or performance then you may want to set a global rate limit as a defence to make sure that it is not exceeded.

Of course, there are plenty of other scenarios where applying a rate limit may be beneficial to your APIs and the systems that your APIs leverage behind the scenes. The simplest way to figure out which type of rate limiting you’d like to apply can be determined by asking a few questions:

Do you want to protect against denial of service attacks or overwhelming amounts of traffic from **all users** of the API? **You’ll want to use an API-level global rate limit!**

Do you want to limit the number of requests a specific user can make to **all APIs** they have access to? **You’ll want to use a key-level global rate limit!**

Do you want to limit the number of requests a specific user can make to **specific APIs** they have access to? **You’ll want to use a key-level per-API rate limit.**
