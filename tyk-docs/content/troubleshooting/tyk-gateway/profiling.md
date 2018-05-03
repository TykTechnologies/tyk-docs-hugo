---
date: 2017-03-27T17:23:27+01:00
title: Tyk Gateway Profiling
menu:
  main:
    parent: "Troubleshooting"
weight: 6
url: "/troubleshooting/tyk-gateway-profiling"
---

In some cases, to identify tricky issues like concurrency or memory related, it may be required to get information about Gateway process runtime, like memory or CPU usage details.
Tyk Gateway built on top of Go language, and inherits its powerful profiling tools, specifically Google's [`pprof`](https://github.com/google/pprof/blob/master/doc/pprof.md).

Tyk Gateway can generate various profiles in `pprof` supported format, which you can analyze by yourself, using `go tool pprof` command, or send this profiles to our support team.

There are two way to get profiles:
1. Running process with `--memprofile` and `--cpuprofile` flags, which will gather information about running process for the first 30 seconds, and will generate 2 files: `tyk.mprof` (memory profile) and `tyk.prof` (cpu profile).
2. Running with `--httpprofile` flag, which will expose special `/debug/pprof/` public web page, containing dynamic information about running process, where you can download various profiles:
    * goroutine    - stack traces of all current goroutines
    * heap         - a sampling of all heap allocations
    * threadcreate - stack traces that led to the creation of new OS threads
    * block        - stack traces that led to blocking on synchronization primitives
    * mutex        - stack traces of holders of contended mutexes
