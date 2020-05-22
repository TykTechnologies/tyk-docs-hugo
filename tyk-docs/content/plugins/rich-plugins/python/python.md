---
date: 2017-03-24T13:10:22Z
title: Python
menu:
  main:
    parent: "Rich Plugins"
weight: 4
url: "/plugins/rich-plugins/python"
---
### Requirements

Since v2.9, Tyk supports any currently stable [Python 3.x version](https://www.python.org/downloads/). The main requirement is to have the Python shared libraries installed, these are available as `libpython3.x` in most Linux distributions.

* Python3-dev
* [Protobuf](https://pypi.org/project/protobuf/): provides [Protocol Buffers](https://developers.google.com/protocol-buffers/) support 
* [gRPC](https://pypi.org/project/grpcio/): provides [gRPC](http://www.grpc.io/) support


These instructions assume you're running a current Ubuntu LTS version.

Install the build tools: `apt-get install -y build-essential`

### Install the Required Modules

```{.copyWrapper}
apt install python3 python3-dev python3-pip
pip3 install protobuf grpcio
```

### How to write Python Plugins?

We have created [a demo Python plugin repository](https://github.com/TykTechnologies/tyk-plugin-demo-python).


The project implements a simple middleware for header injection, using a Pre hook (see [Tyk custom middleware hooks](/docs/plugins/rich-plugins/rich-plugins-work/#coprocess-dispatcher---hooks). A single Python script contains the code for it, see [middleware.py](https://github.com/TykTechnologies/tyk-plugin-demo-python/blob/master/middleware.py).