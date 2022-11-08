---
date: 2017-03-27T17:23:27+01:00
title: Tyk Gateway Profiling
menu:
  main:
    parent: "Tyk Gateway Troubleshooting"
weight: 6
url: "/troubleshooting/tyk-gateway/profiling"
---

In some cases, to identify tricky issues like concurrency or memory related issues, it may be required to get information about the Gateway process runtime. For example, memory or CPU usage details.
The Tyk Gateway is built using Go, and inherits its powerful profiling tools, specifically Google's [`pprof`](https://github.com/google/pprof/).

The Tyk Gateway can generate various profiles in the `pprof` supported format, which you can analyse by yourself, using the `go tool pprof` command, or you can send the profiles to our support team for analysis.

There are two way to get profiles:

1. Running the process with flags mentioned below which will gather information about the running process for the first 30 seconds, and will generate files containing profiling info:

    * `--memprofile` - memory profile, generates `tyk.mprof` file
    * `--cpuprofile` - CPU usage profile, generates `tyk.prof` file
    * `--blockprofile` - Blocking profile, generates `tyk.blockprof` file
    * `--mutexprofile` - Mutex profile, generates `tyk.mutexprof` file

2. Running with the `--httpprofile` flag, or set `enable_http_profiler` to `true` in tyk.conf, which will run a special `/debug/pprof/` public web page, containing dynamic information about the running process, and where you can download various profiles:

    * goroutine    - stack traces of all current goroutines
    * heap         - a sampling of all heap allocations
    * threadcreate - stack traces that led to the creation of new OS threads
    * block        - stack traces that led to blocking on synchronisation primitives
    * mutex        - stack traces of holders of contended mutexes
