---
date: 2017-03-24T13:10:22Z
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

* Python3-dev
* [Protobuf](https://pypi.org/project/protobuf/): provides [Protocol Buffers](https://developers.google.com/protocol-buffers/) support 
* [gRPC](https://pypi.org/project/grpcio/): provides [gRPC](http://www.grpc.io/) support

### Install the Python development packages

If you're using Ubuntu/Debian:

```{.copyWrapper}
apt install python3 python3-dev python3-pip build-essential
```

If you're using Red Hat or CentOS:

```{.copyWrapper}
yum install python3-devel python3-setuptools
python3 -m ensurepip
```

### Install the Required Python Modules

Make sure that "pip" is now available in your system, it should be typically available as "pip", "pip3" or "pipX.X" (where X.X represents the Python version):

```{.copyWrapper}
pip3 install protobuf grpcio
```

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

```{.copyWrapper}
python3 -c 'from google import protobuf'
```

No output is expected from this command on successful setups.

### How do I write Python Plugins?

We have created [a demo Python plugin repository](https://github.com/TykTechnologies/tyk-plugin-demo-python).


The project implements a simple middleware for header injection, using a Pre hook (see [Tyk custom middleware hooks](/docs/plugins/rich-plugins/rich-plugins-work/#coprocess-dispatcher---hooks). A single Python script contains the code for it, see [middleware.py](https://github.com/TykTechnologies/tyk-plugin-demo-python/blob/master/middleware.py).
