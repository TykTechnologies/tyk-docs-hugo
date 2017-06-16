---
date: 2017-03-24T13:10:22Z
title: Python
menu:
  main:
    parent: "Rich Plugins"
weight: 0
url: "/customise-tyk/plugins/rich-plugins/python"
---
### Requirements
Tyk supports [Python 3][1], the main requirement is to have the Python shared libraries installed, these are available as `libpython3.x` in most Linux distributions.

These Python modules are required as well:

*   [Protobuf][2]: provides [Protocol Buffers][3] support, you may install it using: `pip3 install protobuf` See the note below, the alternative installation method may guarantee higher performance.

*   [gRPC][4]: provides [gRPC][5] support: `pip3 install grpcio`

***Note:*** For better performance, we suggest building the C++ implementation of the Protocol Buffer library and its corresponding Python extension, as [suggested in the official documentation][6]. If this isn't available, a slower, pure-Python Protocol Buffer library is used.

### Building "protobuf" Python module for high performance

These instructions assume you're running Ubuntu 14.04.

Install the build tools: `apt-get install -y build-essential`

Fetch & install the latest Protocol Buffer library:

```
    cd /usr/src
    wget https://github.com/google/protobuf/releases/download/v3.1.0/protobuf-python-3.1.0.tar.gz
    tar -xvzf protobuf-python-3.1.0.tar.gz
    cd protobuf-3.1.0/
    ./configure -prefix=/usr
    make && make install
```

Install the Python build tools: `apt-get install -y python3-setuptools python3-dev` 

Build & install the Python module: 

```
    cd /usr/src
    cd protobuf-3.1.0/python
    python3 setup.py build --cpp_implementation && python3 setup.py install --cpp_implementation
```

### How to write Python Plugins?

We have created a demo Python plugin repository [here][7]

The project implements a simple middleware for header injection, using a Pre hook (see [Tyk custom middleware hooks][8]). A single Python script contains the code for it, see [mymiddleware.py][9].

 [1]: https://www.python.org/download/releases/3.0/
 [2]: https://pypi.python.org/pypi/protobuf
 [3]: https://developers.google.com/protocol-buffers/
 [4]: https://pypi.python.org/pypi/grpcio
 [5]: http://www.grpc.io/
 [6]: https://developers.google.com/protocol-buffers/docs/reference/python-generated#cpp_impl
 [7]: https://github.com/TykTechnologies/tyk-plugin-demo-python
 [8]: /docs/customise-tyk/plugins/javascript-middleware/middleware-scripting-guide/
 [9]: https://github.com/TykTechnologies/tyk-plugin-demo-python/blob/master/mymiddleware.py
