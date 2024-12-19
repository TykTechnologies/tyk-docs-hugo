---
date: 2023-12-13T10:10:22Z
title: Python
menu:
  main:
    parent: "Rich Plugins"
weight: 4
aliases:
  - /customise-tyk/plugins/rich-plugins/rich-plugins-work/
  - /customise-tyk/plugins/rich-plugins/python/
  - /plugins/rich-plugins/python
---

### Requirements

Since v2.9, Tyk supports any currently stable [Python 3.x version](https://www.python.org/downloads/). The main requirement is to have the Python shared libraries installed. These are available as `libpython3.x` in most Linux distributions.

- Python3-dev
- [Protobuf](https://pypi.org/project/protobuf/): provides [Protocol Buffers](https://developers.google.com/protocol-buffers/) support
- [gRPC](https://pypi.org/project/grpcio/): provides [gRPC](http://www.grpc.io/) support

### Important Note Regarding Performance

Python plugins are [embedded](https://docs.python.org/3/extending/embedding.html) within the Tyk Gateway process. Tyk Gateway integrates with Python custom plugins via a [cgo](https://golang.org/cmd/cgo) bridge.

`Tyk Gateway` <-> CGO <-> `Python Custom Plugin`

In order to integrate with Python custom plugins, the *libpython3.x.so* shared object library is used to embed a Python interpreter directly in the Tyk Gateway. Further details can be found [here]({{< ref "plugins/supported-languages/rich-plugins/rich-plugins-work#coprocess-gateway-api" >}})

This allows combining the strengths of both Python and Go in a single application. However, it's essential to be aware of the potential complexities and performance implications of mixing languages, as well as the need for careful memory management when working with Python objects from Go.

The Tyk Gateway process initialises the Python interpreter using [Py_initialize](https://docs.python.org/3/c-api/init.html#c.Py_Initialize). The Python [Global Interpreter Lock (GIL)](https://docs.python.org/3/glossary.html/#term-global-interpreter-lock) allows only one thread to execute Python bytecode at a time, ensuring thread safety and simplifying memory management. While the GIL simplifies these aspects, it can limit the scalability of multi-threaded applications, particularly those with CPU-bound tasks, as it restricts parallel execution of Python code.

In the context of custom Python plugins, API calls are queued and the Python interpreter handles requests sequentially, processing them one at a time. Subsequently, this would consume large amounts of memory, and network sockets would remain open and blocked until the API request is processed.

### Install the Python development packages

{{< tabs_start >}}

{{< tab_start "Docker" >}}
{{< note success >}}
**Note**

Starting from Tyk Gateway version `v5.3.0`, Python is no longer bundled with the official Tyk Gateway Docker image by default, to address security vulnerabilities in the Python libraries highlighted by [Docker Scout](https://docs.docker.com/scout/).
<br>
Whilst Python plugins are still supported by Tyk Gateway, if you want to use them you must extend the image to add support for Python. For further details, please refer to the [release notes]({{< ref "developer-support/release-notes/gateway" >}}) for Tyk Gateway `v5.3.0`.
{{< /note >}}

If you wish to use Python plugins using Docker, you can extend the official Tyk Gateway Docker image by adding Python to it.

This example Dockerfile extends the official Tyk Gateway image to support Python plugins by installing python and the required modules:

```dockerfile
ARG BASE_IMAGE
FROM ${BASE_IMAGE} AS base

FROM python:3.11-bookworm
COPY --from=base /opt/tyk-gateway/ /opt/tyk-gateway/
RUN pip install setuptools && pip install google && pip install 'protobuf==4.24.4'

EXPOSE 8080 80 443

ENV PYTHON_VERSION=3.11
ENV PORT=8080

WORKDIR /opt/tyk-gateway/

ENTRYPOINT ["/opt/tyk-gateway/tyk" ]
CMD [ "--conf=/opt/tyk-gateway/tyk.conf" ]
```

To use this, you simply run `docker build` with this Dockerfile, providing the Tyk Gateway image that you would like to extend as build argument `BASE_IMAGE`.
As an example, this command will extend Tyk Gateway `v5.3.0` to support Python plugins, generating the image `tyk-gateway-python:v5.3.0`:

```bash
docker build --build-arg BASE_IMAGE=tykio/tyk-gateway:v5.3.0 -t tyk-gateway-python:v5.3.0 .
```

{{< tab_end >}}

{{< tab_start "Ubuntu/Debian" >}}

```apt
apt install python3 python3-dev python3-pip build-essential
```

### Install the Required Python Modules

Make sure that "pip" is available in your system, it should be typically available as "pip", "pip3" or "pipX.X" (where X.X represents the Python version):

```pip3
pip3 install protobuf grpcio
```

{{< tab_end >}}

{{< tab_start "Red Hat or CentOS" >}}

```yum
yum install python3-devel python3-setuptools
python3 -m ensurepip
```

### Install the Required Python Modules

Make sure that "pip" is now available in your system, it should be typically available as "pip", "pip3" or "pipX.X" (where X.X represents the Python version):

```pip3
pip3 install protobuf grpcio
```

{{< tab_end >}}

{{< tabs_end >}}

### Python versions

Newer Tyk versions provide more flexibility when using Python plugins, allowing the users to set which Python version to use. By default, Tyk will try to use the latest version available.

To see the Python initialisation log, run the Tyk gateway in debug mode.

To use a specific Python version, set the `python_version` flag under `coprocess_options` in the Tyk Gateway configuration file (tyk.conf).

{{< note success >}}
**Note**

Tyk doesn't support Python 2.x.
{{< /note >}}

### Troubleshooting

To verify that the required Python Protocol Buffers module is available:

```python3
python3 -c 'from google import protobuf'
```

No output is expected from this command on successful setups.

### How do I write Python Plugins?

We have created [a demo Python plugin repository](https://github.com/TykTechnologies/tyk-plugin-demo-python).

The project implements a simple middleware for header injection, using a Pre hook (see [Tyk custom middleware hooks]({{< ref "plugins/supported-languages/rich-plugins/rich-plugins-work#coprocess-dispatcher---hooks" >}}). A single Python script contains the code for it, see [middleware.py](https://github.com/TykTechnologies/tyk-plugin-demo-python/blob/master/middleware.py).
