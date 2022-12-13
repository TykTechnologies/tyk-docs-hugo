---
date: 2017-03-24T15:45:13Z
title: Supported Languages
menu:
  main:
    parent: "Custom Plugins"
weight: 8
url: "/plugins/supported-languages"
---

There are 5 different places in the [API lifecycle]({{ ref "concepts/middleware-execution-order" >}}) you can inject custom plugins.  There are performance advantages to picking the correct phase, and of course that depends on your use case and what functionality you need.

**All Plugin Languages can:**

* Make Layer 4 (TCP) or Layer 7 (HTTP/REST/SOAP) calls
* Open Persistent Connections
* Modify the request in-flight
* Can Stop the Request <sup>3</sup>
* Be served using Bundles <sup>4</sup> or by files on the file system, except gRPC of course which by definition is served by some webserver in the language of your choosing

## Plugin Support
What Language do I want to write my middleware in and can I use it in this phase?

|                          | Auth   |   Pre     | Post-Auth | Post | Response   
|--------------------------|--------|-----------|-----------|------|-----------|
| GoLang                   | ✅     |✅	        |✅        |✅    |✅
| JavaScript               | ❌		 |✅	        |❌	      |✅ 	  |❌
| gRPC <sup>2</sup> (Rich) <sup>1</sup>  | ✅		 |✅	        |✅	      |✅	  |✅
| Python (Rich) <sup>1</sup>| ✅		 |✅	        |✅	      |✅	  |✅
| Lua (Rich) <sup>1</sup>   | ✅	   |✅	        |✅	      |✅	  |❌

[More reading on the hook locations]({{< ref "plugins/supported-languages/rich-plugins/rich-plugins-work/#coprocess-dispatcher---hooks" >}})

## Plugin Driver Names

We use the following Plugin driver names:

| Plugin                   | Name      | 
|--------------------------|-----------|
| GoLang                   | goplugin  |
| JavaScript               | otto      |
| gRPC                     | grpc      |
| Python              		 | python    |
| Lua                      | lua	     |


## Limitations

What are the limitations to using this programming Language?

|                                   | GoLang |   JavaScript     | gRPC      | Python    |  Lua   
|-----------------------------------|--------|------------------|-----------|-----------|-----------|
| Runs in Gateway process           | ✅<br>Runs<br>natively		  |✅<br>Built-In JSVM Interpreter	              |❌<br>Standalone server	|✅<br>Tyk talks with Python interpreter	|✅
| Built-in SDK                      | ✅	<br>All Gateway Functionality  |[Yes]({{ ref "plugins/supported-languages/javascript-middleware/javascript-api" >}})	|❌	|[Yes]({{< ref "plugins/supported-languages/rich-plugins/python/tyk-python-api-methods" >}})	|❌
| TCP Connections<p>(DBs, Redis, etc)</p> | ✅ | ❌<br>Very Limited <sup>5</sup> | ✅ | ✅ | ✅ | 

## Custom Plugin Table

We have put together a [GitHub repo with a table of custom plugins](https://github.com/TykTechnologies/custom-plugins#custom-gateway-plugins) in various languages that you can experiment with. If you would like to submit one that you have developed, feel free to open an issue in the repo.

## Differences between Rich Plugins and JSVM middleware
The JavaScript Virtual Machine provides pluggable middleware that can modify a request on the fly and are designed to augment a running Tyk process, are easy to implement and run inside the Tyk process in a sandboxed ECMAScript interpreter. This is good, but there are some drawbacks with the JSVM:

*   **Performance**: JSVM is performant, but is not easy to optimise and is dependent on the [otto interpreter](https://github.com/robertkrimen/otto) - this is not ideal. The JSVM also requires a copy of the interpreter object for each request to be made, which can increase memory footprint.
*   **Extensibility**: JSVM is a limited interpreter, although it can use some NPM modules, it isn't NodeJS so writing interoperable code (especially with other DBs) is difficult.
*   **TCP Access**: The JSVM has no socket access so working with DB drivers and directly with Redis is not possible.

Rich Plugins can provide replacements for existing middleware functions (as opposed to augmentation) and are designed to be full-blown, optimised, highly capable services. They enable a full customised architecture to be built that integrates with a user's infrastructure.

Rich Plugins bring about the following improvements:

*   **Performance**: Run on STDIN (unix pipes), which are extremely fast and run in their own memory space, and so can be optimised for performance way beyond what the JSVM could offer.
*   **Extensibility**: By allowing any language to be used so long as GRPC is supported, the extensibility of a CPH is completely open.
*   **TCP Access**: Because a plugin is a separate process, it can have it's own low-level TCP connections opens to databases and services.

## Footnotes
[1] Rich Plugins - [Plugin Languages with extensive capability]({{ ref "plugins/supported-languages/rich-plugins" >}})

[2] gRPC - Using gRPC, you can write plugins in Java, .NET, C++ / C#, PHP, [and all other supported languages](https://grpc.io/docs/languages/)

[3] ReturnOverrides - [Can be used to stop the request and return a response / error]({{< ref "plugins/request-plugins/#return-overrides-returnoverrides" >}})

[4] [How To Serve Middleware]({{< ref "plugins/how-to-serve-plugins" >}})
