---
date: 2017-03-22T16:47:24Z
Title: "Docker "
tags: ["Tyk Stack", "Self-Managed", "Installation", "Docker"]
description: "How to install the Tyk stack components using Docker in a self-managed environment"
menu:
  main:
    parent: "Self-Managed Installation"
weight: 1
aliases:
  - /get-started/with-tyk-on-premise/installation/docker
  - /get-started/with-tyk-on-premise/installation/docker/
  - /get-started/with-tyk-on-premise/installation/docker/docker-quickstart/
  - /getting-started/installation/with-tyk-on-premises/docker/
---

Tyk has three containers that are available to set up a Docker installation:

* [The Tyk Gateway container](https://hub.docker.com/r/tykio/tyk-gateway/)
* [The Tyk Dashboard container](https://hub.docker.com/r/tykio/tyk-dashboard/)
* [The Tyk Pump container](https://hub.docker.com/r/tykio/tyk-pump-docker-pub/)

All three are required for a full deployment. We recommend that each container is installed on a separate machine for optimum performance.

From v5.5.0 onwards, these images are based on [distroless](https://github.com/GoogleContainerTools/distroless). This means that you will not be able to obtain a shell with `docker run --rm -it tykio/tyk-gateway:v5.5.0 sh`. The image can be inspected with tools like [dive](https://github.com/wagoodman/dive) or [Docker Desktop](https://www.docker.com/products/docker-desktop/).

We also have a [Docker Tyk Pro Demo]({{< ref "tyk-on-premises/docker/docker-pro-demo" >}}), which installs our full Self-Managed solution, which includes our Gateway, Dashboard, and analytics processing pipeline. This demo will run Tyk Self-Managed on your machine.
