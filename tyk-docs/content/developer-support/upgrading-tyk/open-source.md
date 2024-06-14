---
title: Upgrading Tyk Gateway (Open Source)
description: Explain how to upgrade Open-Source
---

The following guide explains how to upgrade Tyk Gateway (Open-Source).

Ensure that you have consulted our [upgrade guidelines]({{< ref "/developer-support/upgrading-tyk/upgrade-prerequisites" >}}) before upgrading.

---

## Common Standards

All our components share a few common standards:

- Upgrades do not overwrite your configuration files. However, it is a good practice to back up these files routinely (using git or another tool). We strongly recommend taking a backup before upgrading Tyk. The upgrade will deploy new copies of startup scripts, so any customisations should be saved in advance.

- You do not need to migrate or run migration scripts for your APIs, policies or other assets created in Tyk unless specifically stated in the release (and it rarely happens).

- Upgrading is trivial and similar to any other product upgrade done in Linux, Docker, Kubernetes or Helm. It essentially means pulling the new images from public directories. You can find the list of all our releases in the following links:

    - Docker & Kubernetes - Docker Hub - https://hub.docker.com/u/tykio
    - Helm install - Artifact Hub - https://artifacthub.io/packages/search?repo=tyk-helm
    - Linux - Packagecloud - https://packagecloud.io/tyk

The above repositories will be updated when new versions are released

---

## Upgrade Process

Regardless of your deployment choice (Linux, Docker, Kubernetes), we recommend the following upgrade process:

1. Backup your gateway config file (tyk.conf or the name you chose for it)
2. Follow our [guidelines]({{< ref "/developer-support/upgrading-tyk/go-plugins" >}}) for upgrading custom Go plugins.
3. Get/update the latest binary (i.e. update the docker image name in the command, Kubernetes manifest or values.yaml of Helm chart or get the latest packages with apt get)
4. Use deployment’s best practices for a rolling update (in local, non-shared, non-production environments simply restart the gateway). Consult our [upgrade strategy]({{< ref "/developer-support/upgrading-tyk/upgrade-strategy" >}}) documentation for further details.
5. Check the log to see that the new version is used and that the gateway is up and running
6. Check that the Gateway is healthy using the open */hello* API.

---

## Further Resources

Consult our guides for upgrading Tyk on:

- [Docker]({{< ref "/developer-support/upgrading-tyk/self-managed/docker" >}})
- [Helm]({{< ref "/developer-support/upgrading-tyk/self-managed/helm" >}})
- [Kubernetes]({{< ref "/developer-support/upgrading-tyk/self-managed/kubernetes" >}})

We also provide guides that explain how to upgrade Tyk linux packages:

- [RHEL (Cent OS)]({{< ref "/developer-support/upgrading-tyk/self-managed/linux-distributions/self-managed-rpm" >}})
- [Debian (Cent OS)]({{< ref "/developer-support/upgrading-tyk/self-managed/linux-distributions/self-managed-deb" >}})