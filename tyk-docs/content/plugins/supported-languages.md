---
date: 2017-03-24T15:45:13Z
title: Supported Languages
menu:
  main:
    parent: "Custom Plugins"

---

Tyk recommends using Go plugins for performance, flexibility, and nativity reasons (all Tyk components are written in Go).

The following languages are supported for custom plugins:
*   [Golang native plugins]({{< ref "plugins/supported-languages/golang" >}}) - fast, native performance
*   [JavaScript Plugins]({{< ref "plugins/supported-languages/javascript-middleware" >}}) (JSVM Middleware) - simple with limited direct API when performance not important (same with Python / Lua)
*   [Rich Plugins]({{< ref "plugins/supported-languages/rich-plugins" >}}) includes Python, Lua, gRPC - With gRPC, you can write plugins in Java, .NET, C++ / C#, PHP, and all other [gRPC supported languages](https://grpc.io/docs/languages/).
Rich plugins give ultimate flexibility in the language of implementation, however, there are some performance and management overheads when compared with native GoLang plugin.


**Common To All Plugin Languages:**

* Make Layer 4 (TCP) or Layer 7 (HTTP/REST/SOAP) calls
* Open Persistent Connections
* Modify the request in-flight
* Used to stop the request and return a [custom response]({{< ref "plugins/plugin-types/request-plugins#return-overrides--returnoverrides" >}})
* Be served using [Bundles]({{< ref "plugins/how-to-serve-plugins" >}}) or by files on the file system, except gRPC of course which by definition is served by some webserver in the language of your choosing


## Plugin Hook Types

Tyk provide 5 different phases, i.e. hooks to inject custom plugin throughout the [API execution lifecycle]({{< ref "concepts/middleware-execution-order" >}}). There are performance advantages to picking the correct phase, and of course that depends on your use case and what functionality you need.

Not all hooks are supported in every language. The following table shows you which plugin  language support which phase/hook:

|            | Auth   |   Pre    | Post-Auth | Post | Response   
|------------|--------|----------|-----------|------|-----------|
| GoLang     | ✅     |✅	        |✅         |✅    |✅
| JavaScript | ❌		 |✅	        |❌	       |✅ 	 |❌
| gRPC       | ✅		 |✅	        |✅	       |✅	   |✅
| Python     | ✅		 |✅	        |✅	       |✅	   |✅
| Lua        | ✅	   |✅	        |✅	       |✅	   |❌

More reading on the [hook types]({{< ref "plugins/supported-languages/rich-plugins/rich-plugins-work#coprocess-dispatcher---hooks" >}}) in rich plugins and explanation with common use case for each [hook type]({{<ref "plugins/plugin-types/plugintypes">}}) 


## Plugin Driver Names
We use the following Plugin driver names:

| Plugin     | Name      | 
| ---------- | --------- |
| GoLang     | goplugin  |
| JavaScript | otto      |
| gRPC       | grpc      |
| Python 		 | python    |
| Lua        | lua	     |


## Limitations

What are the limitations to using this programming Language?

|   | GoLang |   JavaScript     | gRPC      | Python    |  Lua   
|---|--------|------------------|-----------|-----------|-----------|
| Runs in Gateway process | ✅<br>Runs<br>natively | ✅<br>Built-In JSVM Interpreter | ❌<br>Standalone server	| ✅<br>Tyk talks with Python interpreter	|✅
| Built-in SDK | ✅<br>All Gateway Functionality | ✅<br>[Yes]({{< ref "plugins/supported-languages/javascript-middleware/javascript-api" >}})	| ❌	| ✅<br>[Yes]({{< ref "plugins/supported-languages/rich-plugins/python/tyk-python-api-methods" >}})	| ❌
| TCP Connections<p>(DBs, Redis, etc)</p> | ✅ | ❌<br>Very Limited | ✅ | ✅ | ✅ | 

## Custom Plugin Table

We have put together a [GitHub repo with a table of custom plugins](https://github.com/TykTechnologies/custom-plugins#custom-gateway-plugins) in various languages that you can experiment with. If you would like to submit one that you have developed, feel free to open an issue in the repo.

## Differences between Rich Plugins and JSVM middleware

### JavaScript
The JavaScript Virtual Machine provides pluggable middleware that can modify a request on the fly and are designed to augment a running Tyk process, are easy to implement and run inside the Tyk process in a sandboxed *ECMAScript* interpreter. This is good, but there are some drawbacks with the JSVM:

*   **Performance**: JSVM is performant, but is not easy to optimize and is dependent on the [otto interpreter](https://github.com/robertkrimen/otto) - this is not ideal. The JSVM also requires a copy of the interpreter object for each request to be made, which can increase memory footprint.
*   **Extensibility**: JSVM is a limited interpreter, although it can use some NPM modules, it isn't NodeJS so writing interoperable code (especially with other DBs) is difficult.
*   **TCP Access**: The JSVM has no socket access so working with DB drivers and directly with Redis is not possible.

### Rich Plugins
Rich Plugins can provide replacements for existing middleware functions (as opposed to augmentation) and are designed to be full-blown, optimized, highly capable services. They enable a full customized architecture to be built that integrates with a user's infrastructure.

Rich Plugins bring about the following improvements:

*   **Performance**: Run on STDIN (unix pipes), which are extremely fast and run in their own memory space, and so can be optimized for performance way beyond what the JSVM could offer.
*   **Extensibility**: By allowing any language to be used so long as GRPC is supported, the extensibility of a CPH is completely open.
*   **TCP Access**: Because a plugin is a separate process, it can have it's own low-level TCP connections opens to databases and services.
