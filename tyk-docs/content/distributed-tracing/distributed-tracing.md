---
title: "Distributed Tracing"
date: 2019-07-29T10:28:52+03:00
weight: 121
menu: "main"
url: "/opentracing"
---
> Distributed tracing, also called distributed request tracing, is a method used to profile and monitor applications, especially those built using a microservices architecture. Distributed tracing helps pinpoint where failures occur and what causes poor performance.  


> OpenTracing is comprised of an API specification, frameworks and libraries that have implemented the specification, and documentation for the project. OpenTracing allows developers to add instrumentation to their application code using APIs that do not lock them into any one particular product or vendor.

Tyk supports  [OpenTracing](https://opentracing.io/).This allows services which have distributed tracing enabled for instrumentation to work seamless with Tyk gateway.

When distributed tracing is enabled, Tyk will trace every request that comes into the gateway,this means services will get limited tracing insight when they don't implement opentracing. 

Storage and visualisation of tracing data are not provided by Tyk, users are
required to configure where the tracing data is being sent.

## Supported tracers
- [Jaeger](https://www.jaegertracing.io/)
- [Zipkin](https://zipkin.io/)

## Enabling distributed tracing
To enable distributed tracing, add the following tracing configuration on your `tyk.conf`

```{.json}
{
  "tracing": {
    "enabled": true,
    "name": "${tracer_name}",
    "options": {}
  }
}
```

- `name` is the name of the supported tracer
- `enabled`: set this to true to enable tracing
- `options`: key/value pairs for configuring the enabled tracer. See the
 supported tracer documentation for more details.

Tyk will automatically propagate tracing headers to APIs  when tracing is enabled.
