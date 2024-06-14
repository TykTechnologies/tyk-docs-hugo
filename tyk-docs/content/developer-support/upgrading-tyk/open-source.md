---
title: Upgrade Open Source
description: Explain how to upgrade Open-Source
---

The following guide explains how to upgrade Tyk Gateway (Open-Source).

## Common Standards

All our components share a few common standards:

- Upgrades do not overwrite your configuration files. However, it is a good practice to back up these files routinely (using git or another tool). We strongly recommend taking a backup before upgrading Tyk. The upgrade will deploy new copies of startup scripts, so any customisations should be saved in advance.

- You do not need to migrate or run migration scripts for your APIs, policies or other assets created in Tyk unless specifically stated in the release (and it rarely happens).

- Upgrading is trivial and similar to any other product upgrade done in Linux, Docker, Kubernetes or Helm. It essentially means pulling the new images from public directories. You can find the list of all our releases in the following links:

- Docker & Kubernetes - Docker Hub - https://hub.docker.com/u/tykio
- Helm install - Artifact Hub - https://artifacthub.io/packages/search?repo=tyk-helm
- Linux - Packagecloud - https://packagecloud.io/tyk

The above repositories will be updated when new versions are released

## Go Plugins

Follow our [guidelines]({{< ref "/developer-support/upgrading-tyk/go-plugins" >}}) for upgrading custom Go plugins.

## Production Environment Upgrade

Regardless of your deployment choice (Linux, Docker, Kubernetes), we recommend the following upgrade process:

1. Backup your gateway config file (tyk.conf or the name you chose for it)
2. Get/update the latest binary (i.e. update the docker image name in the command, Kubernetes manifest or values.yaml of Helm chart or get the latest packages with apt get)
3. Use deployment’s best practices for a rolling update (in local, non-shared, non-production environments simply restart the gateway)
4. Check the log to see that the new version is used and that the gateway is up and running
5. Check that the Gateway is healthy using the open */hello* API.
