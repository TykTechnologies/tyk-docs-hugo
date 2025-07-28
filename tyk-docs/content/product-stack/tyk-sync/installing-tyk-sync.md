---
title: "Install Tyk Sync"
tags: ["Tyk Sync", "Installation", "Docker", "API Management"]
description: "Learn how to install Tyk Sync using Docker or Packagecloud"
---

## Overview

**Tyk Sync** is a command line tool and library to manage and synchronise a Tyk installation with your version control system (VCS). It's especially helpful for DevOps teams aiming to automate deployments and manage API configurations efficiently.

On this page, you will find instructions on how to install Tyk Sync using Docker and Packagecloud.

## Installation Options

| Method           | Description                        |
| ---------------- | ---------------------------------- |
| **[Docker]({{< ref "#install-on-docker" >}})**       | Run Tyk Sync in a container |
| **[Packagecloud]({{< ref "" >}})** | Hosts packages for linux distributions |

## Install on Docker

1. **Pull the Docker image**

    Select a specific version from [Docker Hub](https://hub.docker.com/r/tykio/tyk-sync/tags)

    ```bash
    SYNC_VERSION=v2.1
    docker pull tykio/tyk-sync:$SYNC_VERSION
    ```

2. **Run Tyk Sync**

    ```bash
    docker run tykio/tyk-sync:$SYNC_VERSION version
    ```

## Install via Package Manager (Packagecloud)

The below instructions are for Debian/Ubuntu systems. For other distributions, refer to the [Packagecloud documentation](https://packagecloud.io/tyk/tyk-sync).

1. **Add the Tyk Sync repository**

    For Debian/Ubuntu systems:

    ```bash
    curl -s https://packagecloud.io/install/repositories/tyk/tyk-sync/script.deb.sh | sudo bash
    ```

2. **Install Tyk Sync**

    ```bash
    sudo apt-get install tyk-sync
    ```

3. **Verification**

    ```bash
    tyk-sync version
    ```