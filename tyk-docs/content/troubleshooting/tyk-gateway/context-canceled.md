---
title: "proxy error: context cancelled"
menu:
  main:
    parent: "Tyk Gateway Troubleshooting"
weight: 8
---

In some cases you can see "proxy error: context canceled" error message in the Gateway logs.
The error itself means that the connection was closed unexpectedly. 
It can happen for various reasons, and in some cases it is totally fine: for example client can have unstable mobile internet.

When it happens on the high load, it can be a lot of different reasons.
For example your OS is running out of system limits, like number of opened sockets, and to validate it, you need to try your system limits.
See this guide https://tyk.io/docs/planning-for-production/#resource-limits.

Additionally, it can be CPU bottleneck: you can't process more than your machine  can do.
And note that it is not only about the actual utilisation %, it is also about context switches it has to do. 
E.g. having one job which consume 100% of your CPU/cores vs having a few thousands jobs, causing CPU constantly switch between them. 
Such problems cause internal request processing queues, which cause latency growth (highly recommend measure it). 
And in some cases latency can grow so big, that some clients can just disconnect/timeout because of it. 

Additionally, highly recommend read the following blog post https://tyk.io/performance-tuning-your-tyk-api-gateway/.
For example, you can trade memory for performance, and context switch reduction by tuning garbage collector to run less frequently: see `Tuning Tyk’s Garbage Collector` section.


Also note that it is not Tyk or Golang specific.
The problem described above will happen with any webserver on high scale. 
So in general if you see a lot of "context" errors on high load, use it as a sign that the process is really struggling with the given load, and you need scale it up, either vertically or horizontally. 
