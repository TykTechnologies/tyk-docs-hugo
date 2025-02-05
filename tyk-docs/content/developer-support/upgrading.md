---
date: 2017-03-27T16:05:33+01:00
title: Tyk Upgrading Guide
tags: ["configuration files backup", "backup tyk", "tyk.conf", "upgrade tyk", "database backup"]
tags: ["Analytics", "Distributed Analytics", "Redis", "Redis Shards", "analytics_config.enable_multiple_analytics_keys" ]
tags: ["do_not_track", "Analytics", "RPS", "Requests Per Second", "CPU", "high load", "high traffic"]
weight: 230
menu:
    main:
        parent: "FAQ"
aliases:
  - /developer-support/cloud-saas
  - /developer-support/documentation-projects/inclusive-naming
  - /developer-support/upgrading-tyk/deployment-model/self-managed/go-plugins
  - /developer-support/upgrading-tyk/deployment-model/self-managed/mdcb
  - /developer-support/backups/backup-apis-and-policies
  - /upgrading-tyk
  - /developer-support/upgrading-tyk/preparations/upgrade-guidelines
  - /developer-support/upgrading-tyk/preparations/upgrade-strategies
  - /developer-support/upgrading-tyk/deployment-model/cloud/upgrade-cloud-saas
  - /developer-support/upgrading-tyk/deployment-model/cloud/upgrade-hybrid
  - /developer-support/upgrading-tyk/deployment-model/cloud/upgrade-go-plugin
  - /developer-support/upgrading-tyk/deployment-model/self-managed/overview
  - /developer-support/upgrading-tyk/deployment-model/self-managed/docker
  - /developer-support/upgrading-tyk/deployment-model/self-managed/helm
  - /developer-support/upgrading-tyk/deployment-model/self-managed/kubernetes
  - /developer-support/upgrading-tyk/deployment-model/self-managed/linux-distributions/self-managed-deb
  - /developer-support/upgrading-tyk/deployment-model/self-managed/linux-distributions/self-managed-rpm
  - /developer-support/upgrading-tyk/deployment-model/open-source
  - /developer-support/upgrading-tyk/go-plugins
---

## Overview

This section provides guides and recommendations for upgrading your Tyk installation.

When upgrading Tyk, consider the following:

1. **Deployment model**: SaaS, Self-Managed, Hybrid, or OSS.
2. **Installation type**: Docker, Helm, K8S, or various Linux distributions.
3. **Components**: Depending on your model, upgrade relevant components such as Gateway, Pump, Dashboard, or Go Plugins.

These considerations are reflected in our structured upgrade guides, ensuring you have all necessary information in one place.

### Tyk Upgrade Standards and Recommendations
Our upgrade process adheres to the following standards:

- **Breaking changes:** Breaking changes are rare and will be explicitly stated in the release notes.
- **Configuration files:** Upgrades do not overwrite your configuration files. However, it’s good practice to routinely back up these files (using git or another tool) before upgrading, so any customizations are saved.
- **Migration scripts:** Migration scripts for your APIs, policies, or other assets are generally not required unless specified in the release notes.
- **Long Term Support:** Refer to our [versioning and long-term support policies]({{< ref "developer-support/release-notes/special-releases#long-term-support-releases" >}}) for details on major and minor releases, patches, and support dates.
- **Preparations:** Review the [preparation guidelines]({{< ref "#upgrade-guidelines" >}}) before starting the upgrade.
- **Release notes:** Always check the "Upgrade Instructions" section in the relevant release notes.
- **Backups:** Follow our [comprehensive backup guide]({{< ref "developer-support/faq#tyk-configuration" >}}) before starting the upgrade.
- Docker: Upgrading with Docker is straightforward—pull the new images from public repositories. Refer to the following links for our releases:

- **Docker:** Upgrading with Docker is straightforward - pull the new images from public repositories. Refer to the following links for our releases:
    - Docker & Kubernetes - Docker Hub - https://hub.docker.com/u/tykio
    - Helm install - Artifact Hub - https://artifacthub.io/packages/search?repo=tyk-helm
    - Linux - Packagecloud - https://packagecloud.io/tyk

   The above repositories will be updated when new versions are released
- If you experience issues with the new version you pulled, contact Tyk Support or visit [Tyk community forum](https://community.tyk.io/).

### Tyk Upgrade Guides for different Deployment Models
Use the table below to find the appropriate upgrade guide for your platform:

| Platform             | Guide            | Description |
|----------------------| ---------------- | ----------- |
| **Tyk Cloud**        | [Cloud SaaS]({{< ref "#tyk-cloud" >}}) | Guide to Tyk Cloud SaaS |
|                      | [Hybrid]({{< ref "#tyk-hybrid" >}}) | Guide for Hybrid environments with Gateway Data Plane(s) deployed locally or with a third-party cloud provider |
|                      | [Go plugin]({{< ref "#go-plugin" >}}) | Guide for upgrading Go plugin on the Tyk Cloud |
| **Tyk Self Managed** | [RHEL and CentOS]({{< ref "#linux---redhat-centos" >}}) | Guide for RPM-based Linux distributions |
|                      | [Debian and Ubuntu]({{< ref "#linux---debian" >}}) | Guide for DEB-based Linux distributions |
|                      | [Docker]({{< ref "#docker" >}}) | Guide for upgrading Docker images |
|                      | [Helm]({{< ref "#helm" >}}) | Guide for upgrading Helm Charts |
|                      | [Kubernetes]({{< ref "#kubernetes" >}}) | Guide for upgrading Kubernetes environment |
| **Tyk MDCB Self Managed** | [MDCB]({{< ref "#upgrade-mdcb" >}}) | Guide for upgrading Mutli Data Center Bridge (MDCB) |
| **Tyk Open Source**  | [Tyk Gateway]({{< ref "#open-source-upgrade-guide" >}}) | Guide for upgrading Tyk open source environment |

### Supporting Tools
Tyk offers supporting tools for database migration and backing up APIs and policies.

##### Migrating from MongoDB to SQL

Use our [migration tool]({{< ref "tyk-self-managed#migrating-from-an-existing-mongodb-instance" >}}) to manage the switch from MongoDB to SQL.

##### Backup APIs Script

Utilize our bash [backup script]({{< ref "developer-support/upgrading#backup-apis-and-policies" >}}) to export and restore all Tyk API Definitions and Policies.

## Preparations

### Upgrade Guidelines

When considering upgrading your current configuration to a new Tyk release, we recommend you consider the following:

#### Upgrade strategy

Which strategy do you intend to use?

  - If following the [Blue-Green upgrade]({{< ref "#blue-green-upgrade" >}}) strategy, has the green environment been configured and verified as production-ready?
  - If pursuing the [Rolling upgrade]({{< ref "#rolling-upgrade" >}}) strategy, do all Tyk components have a second instance?
  - If you'll have downtime, estimate the expected duration of the upgrade process and plan for potential downtime.

#### Backups
Have backups been performed?

  - Databases: Have databases been properly backed up?
  - configuration files: Have you safely back up these file (using version control system such as *git*)?
  - Testing: Have you tested the backups to verify they can be successfully restored in a separate environment?
  - Backup guide: Have you checke our [comprehensive guide for backing up Tyk]({{< ref "developer-support/faq#tyk-configuration" >}})?

#### Go plugins
Do you use custom go plugins with your APIs?

  - Go plugin must be [recompiled]({{< ref "#go-plugins-upgrade-guide" >}}) for the new version.
  - Identify all Go plugins in use with all your API definitions.
  - Allow sufficient time for testing and troubleshooting Go plugins after the upgrade.

#### Linux users
Which Linux distributions is currently in use?

- Was Tyk deployed via a repository or a local package file `.rpm` (used be *CentOS* and *RHEL*) or `.deb` (*Debian*
    and its derivative *Ubuntu*)?
- Is the targeted version available on [packagecloud.io/tyk](https://packagecloud.io/tyk) or in an intended repository?

#### Communication
Communicate with stakeholders and users about the upgrade schedule and expected impact on services.

#### Upgrade Checklist:

  - Choose an upgrade strategy or manage downtime
  - Check Linux distribution and Tyk version availability
  - Perform and test backups
  - Identify and plan for custom Go plugin recompilation and testing
  - Communicate with stakeholders

#### Next Steps {#next-steps}

Use the [Upgrade Guides ToC]({{< ref "#tyk-upgrade-guides-for-different-deployment-models" >}}) to choose the appropriate upgrade guide for
your platform.

### Upgrade Strategies

Tyk is compatible with both rolling and blue-green upgrade strategies.

#### Rolling Upgrade

A rolling upgrade updates servers incrementally rather than simultaneously. This approach helps reduce application downtime and mitigates the risk of unforeseen consequences or errors during software updates.

**Steps for Rolling Upgrade:**
1. **Redundancy:** Ensure there are at least two instances of each Tyk component that needs upgrading.
2. **Load Balancer:** Use a load balancer to distribute traffic for the Dashboard and Gateway components, ensuring continuous availability during the upgrade process. Note that the Pump operates with one-way traffic and does not require load balancing.
3. **Upgrade Process:**
   - Direct traffic to one instance while upgrading the other.
   - Once the first instance is upgraded, switch traffic to it and upgrade the remaining instance.
   - After both instances are upgraded, configure the load balancer to route traffic to both instances simultaneously.

#### Blue-Green Upgrade

A blue-green deployment involves two identical production environments, labeled blue and green. At any time, only one environment is live and serving traffic, while the other is inactive. For example, if the blue environment is live, the green environment will be inactive, and vice versa.

**Steps for Blue-Green Upgrade:**
1. **Replication:** Replicate the entire environment into a separate environment.
2. **Traffic Routing:** Use a load balancer or DNS to route traffic to the green environment (current production) while the blue environment undergoes the upgrade.
3. **Upgrade Process:**
   - A VM snapshot is a recommended method for replication, but other methods such as a new deployment process can also be used.
   - If using a new deployment process, follow the [deployment instructions]({{< ref "getting-started/installation" >}}) appropriate for your platform.
4. **Switch Environments:** Once the upgrade is complete, switch the traffic to the upgraded environment.


## Deployment Model

### Tyk Cloud Upgrade Guide

#### Tyk Cloud

**Preparations**

Before proceeding with the upgrade process, ensure that you have thoroughly reviewed and completed the steps outlined in
the [upgrade guidelines]({{< ref "#upgrade-guidelines" >}}).
Once you have adequately prepared, follow the instructions below to upgrade your Tyk components and plugins in this
specified order. Adhering to the provided sequence is crucial for a smooth and successful upgrade.

**Step 1. Upgrade Control Plane**

Follow our guide for [upgrading Cloud Control Planes]({{< ref "tyk-cloud#upgrade-control-planes" >}}).

**Step 2. Upgrade Go Plugins**

Follow our guide for deploying your [Go plugins on Tyk Cloud]({{< ref "#go-plugin" >}}). Subsequently, follow the steps below according to the target upgrade version of the Gateway.

**Gateway Versions < 4.1.0.**

1. Proceed with [upgrading your Tyk Data Plane (Gateway)](#upgrading-cloud-data-planes)
2. Update the [custom_middleware_bundle]({{< ref "/plugins/how-to-serve-plugins/plugin-bundles" >}}) field in the API Definitions of all APIs that use your plugin. The field should be updated to use the new bundle file containing your upgrade plugin.
3. Validate that your plugin is working per your expectations.

**Gateway Versions >= 4.1.0**

1. Update the [custom_middleware_bundle]({{< ref "/plugins/how-to-serve-plugins/plugin-bundles" >}}) field in the API Definitions of all APIs that use your plugin. The field should be updated to use the new bundle file containing your upgraded plugin.

2. Validate that your plugin is working per your expectations as at this stage, your Gateway will be running the plugin for your current version still.

  {{< note success >}}
  **Note**

  This step is a sanity check to catch any potential issues with the bundle for the current version and will ensure that any requests that your Gateway processes prior to being upgraded are able to invoke the plugin as you expect.

  {{< /note >}}

3. Proceed with [upgrading your Tyk Data Plane (Gateway)](#upgrading-cloud-data-planes). Given that you loaded your target version plugin in step 1, this version will be loaded automatically once you upgrade.
4. Validate that your plugin is working per your expectations, as the Gateway now should have loaded the plugin for the target version automatically.

###### Step 3. Upgrade Cloud Data Plane {#upgrading-cloud-data-planes}

Follow our guide for [upgrading Cloud Data Planes]({{< ref "tyk-cloud#managing-cloud-data-plane" >}}).

**Upgrade Guide Video**
Please refer to our [upgrade guide video](https://tyk-1.wistia.com/medias/t0oamm63ae) below for visual guidance:

<div>
<iframe src="https://fast.wistia.net/embed/iframe/t0oamm63ae" title="Wistia video player" allowfullscreen frameborder="0" scrolling="no" class="responsive-frame" name="wistia_embed" ></iframe>
</div>

#### Tyk Hybrid

A Hybrid SaaS deployment is a shared responsibility model where Tyk is responsible for hosting the Control Plane while the client is responsible hosting their Data Plane, be it hosted on a public cloud provider or on their own infrastructure.

The **control plane** includes the following components:
- Tyk Dashboard
- Tyk Control Plane
- MDCB
- MongoDB
- Redis (Master Instance)

The **self-managed data plane** includes the following components:
- Hybrid Gateway(s) 
- Redis instance 
- Tyk Pump (optional)

After following the guidelines for [preparing for upgrade]({{< ref "#upgrade-guidelines" >}}),
follow the instructions below to upgrade your self-managed Tyk components and plugins.


**Upgrade Order**

1. Upgrade the control plane on Tyk Cloud
2. Upgrade your Tyk self-managed data plane. When upgrading your data plane, upgrade the components in the
following order:
   1. Go Plugins (if applicable)
   2. Hybrid Pump (if applicable)
   3. Hybrid Gateway(s)

**Step 1. Upgrade your control plane**

See Tyk Guide for how to [upgrade Control Planes]({{< ref "tyk-cloud#upgrade-control-planes" >}})

**Step 2 Upgrade Go plugins**

Follow our guide for [upgrading your Go plugins on Tyk Cloud]({{< ref "#go-plugin" >}}). Subsequently, follow the steps below according to the target upgrade version of the Gateway.

**Gateway Versions < 4.1.0**

1. Proceed with upgrading your [Tyk Data Plane Hybrid Gateways](#upgrading-data-plane-hybrid-gateways).
2. Update the [custom_middleware_bundle]({{< ref "/plugins/how-to-serve-plugins/plugin-bundles" >}})
field in the API Definitions of all APIs that use your plugin. The field should be updated to use the new bundle file
containing your upgrade plugin.
3. Validate that your plugin is working per your expectations.

**Gateway Versions >= 4.1.0**

1. Update the [custom_middleware_bundle]({{< ref "/plugins/how-to-serve-plugins/plugin-bundles" >}})
field in the API Definitions of all APIs that use your plugin. The field should be updated to use the new bundle file
containing your upgraded plugin.
2. Validate that your plugin is working per your expectations as at this stage, your Gateway will be running the plugin
for your current version still.

  {{< note success >}}
  **Note**

  This step is a sanity check to catch any potential issues with the bundle for the current version and will ensure that
  any requests that your Gateway processes prior to being upgraded are able to invoke the plugin as you expect.

  {{< / note>}}

3. Proceed with upgrading your [Tyk Data Plane Hybrid Gateways](#upgrading-data-plane-hybrid-gateways). Given that you
loaded your target version plugin in step 1, this version will be loaded automatically once you upgrade.
4. Validate that your plugin is working per your expectations.

###### Step 3. Upgrade your Tyk Data Plane Hybrid Gateway(s){#upgrading-data-plane-hybrid-gateways}

Follow the instructions for component deployment type:

- [Docker]({{< ref "#docker" >}})
- [Helm]({{< ref "#helm" >}})
- [Linux Debian]({{< ref "#linux---debian" >}})
- [Linux RHEL/CENTOS]({{< ref "#linux---redhat-centos" >}})

**Upgrade Guide Video**

Please refer to our [video](https://tyk-1.wistia.com/medias/4nf9fggatz) for further supporting with upgrading Tyk Self-Managed (RPM).

<div>
<iframe src="https://fast.wistia.net/embed/iframe/4nf9fggatz" title="Wistia video player" allowfullscreen frameborder="0" scrolling="no" class="responsive-frame" name="wistia_embed" ></iframe>
</div>

#### Go Plugin

This guide explains how to deploy your custom Go plugins on Tyk Cloud:
1. Navigate into the plugins directory that contains your Go module
2. [Compile your custom Go plugins]({{< ref "#go-plugins-upgrade-guide" >}}).
3. Use the table below to follow the deployment process for the version of Tyk you are upgrading to:

| Path | Current Version | Target Version |
| ---  | --- | --- |
| [Path 1](#path-1)    | < 4.1.0 | < 4.1.0 |
| [Path 2](#path-2)    | >= 4.1.0 | >= 4.2.0 |

**Path 1 - Current Version < 4.1.0 and Target Version < 4.1.0**

1. [Create a plugin bundle]({{< ref "plugins/how-to-serve-plugins/plugin-bundles" >}}) that includes the newly compiled version

    {{< img src="img/developer-support/path1-step5-bundle-contents.png" alt="Bundle ZIP example" width="800">}}

    Your manifest.json will look something like this:

    ```json
    {
      "file_list": [
          "CustomGoPlugin.so"
      ],
      "custom_middleware": {
        "pre": [
        {
          "name": "AddHeader",
          "path": "CustomGoPlugin.so",
          "require_session": false,
          "raw_body_only": false
        }],
        "driver": "goplugin",
        "id_extractor": {
        "extract_from": "",
        "extract_with": "", 
        "extractor_config": {}}
      },
      "checksum": "",
      "signature": ""
    }
    ```

2. [Upload this bundle]({{< ref "tyk-cloud#uploading-your-bundle" >}}) to your configured S3 bucket if using Cloud SaaS. If you're using Hybrid SaaS, upload this bundle to your bundle server.


**Path 2 - Current Version >= 4.1.0 and Target Version >= 4.2.0**

1. [Create a plugin bundle]({{< ref "plugins/how-to-serve-plugins/plugin-bundles" >}}) that includes both your current version’s plugin along with the newly compiled version

    {{< img src="img/developer-support/path2-step5-bundle-contents.png" alt="Bundle ZIP example" width="800">}}
    
    Your `manifest.json` will look something like this:

    ```json
    {
      "file_list": [
          "CustomGoPlugin.so",
          "CustomGoPlugin_v4.3.3_linux_amd64.so"
      ],
      "custom_middleware": {
        "pre": [
        {
          "name": "AddHeader",
          "path": "CustomGoPlugin.so",
          "require_session": false,
          "raw_body_only": false
        }],
        "driver": "goplugin",
        "id_extractor": {
          "extract_from": "",
          "extract_with": "", 
          "extractor_config": {}
        }
      },
      "checksum": "",
      "signature": ""
    }
    ```
    In this example -
    - the *CustomGoPlugin.so* in the file list would be the filename of the plugin you're using with your
    current version.  You will already have this file available as this is what has been running in your environment.
    - The *CustomGoPlugin_v4.3.3_linux_amd64.so* file represents the plugin compiled for the target version.
    - *“_v4.3.3_linux_amd64”* postfix is generated automatically by the compiler. If your target version was 5.2.0,
    then *“_v5.2.0_linux_amd64”* would be appended to the shared object filename that the compiler creates
    - Your bundle zip file should include both the current version and target versions of the plugin.

2. [Upload this bundle]({{< ref "tyk-cloud#uploading-your-bundle" >}}) to your configured S3 bucket if using Cloud SaaS. If you're using Hybrid SaaS, upload this bundle to your bundle server.


### Tyk Self Managed Upgrade Guide 

**Preparations**

Before proceeding with the upgrade process, ensure that you have thoroughly reviewed and completed the steps outlined in
the [upgrade guidelines]({{< ref "#upgrade-guidelines" >}}).
Once you have adequately prepared, follow the instructions below to upgrade your Tyk components and plugins in this
specified order. Adhering to the provided sequence is crucial for a smooth and successful upgrade.

**Upgrade Order**

In a production environment where the Dashboard, Gateway, and Pump are installed on separate machines, you should always
upgrade components in the following sequence:

1. Tyk Dashboard
2. Tyk Gateway
3. Tyk Pump

###### Upgrade order with Multi Data Center Bridge (MDCB) {#upgrade-mdcb}

For Enterprise customers, the Tyk control plane contains all the standard components of a Self-Managed installation with
the addition of the [Multi Data Center Bridge]({{< ref "tyk-multi-data-centre" >}}) (MDCB).

Our recommended sequence for upgrading a self-managed MDCB installation is as follows:

**Stage 1: Upgrade the components of the **Tyk control plane** in this order:**

1. MDCB
2. Tyk Pump (if applicable)
3. Tyk Dashboard
4. Tyk Gateway

**Stage 2: Next, upgrade the components in **Tyk data planes**, in this order:**

1. Go Plugins (if applicable)
2. Tyk Pump (if applicable)
3. Tyk Gateway

This sequence of control plane first and data plane second ensures:
1. Forward compatibility - ensures that we don't have [forward-compatibility](https://en.wikipedia.org/wiki/Forward_compatibility#:~:text=Forward%20compatibility%20for%20the%20older,format%20of%20the%20older%20system.)
issues of new Gateway using old MDCB.
2. Connectivity issues - It's extremely fast to see if there are connectivity issues and gateways (in Hybrid mode) will
continue to function even if disconnected from their control plane.

#### Upgrade guides
We provide upgrade guides for Linux, Docker, Helm and K8S. To continue the upgrade process, please refer to the relevant
installation guide under this section.

#### Docker

**Step 1. Upgrade Tyk Dashboard**

Upgrading *Tyk Dashboard* is the same as *Tyk Gateway* just with the name of the docker image of tyk dashboard
`tykio/tyk-dashboard`. Please check the instruction for Tyk Gateway in the next section.

**Step 2. Upgrade Tyk Gateway and Tyk Pump**

Follow our [Tyk OSS guide]({{< ref "#go-plugins-upgrade-guide" >}}) for upgrading Tyk Gateway and Tyk Pump

#### Helm

{{< note success >}}
**Upgrade instructions for *Tyk Dashboard*, *Tyk Pump* and *MDCB***

The instruction below refer to upgrading *Tyk Gateway*. You can follow the same steps for *Tyk Dashboard*, *Tyk Pump*
and *MDCB*.

{{< /note >}}

**Upgrade Tyk Gateway**

1. Backup your gateway config file (`tyk.conf` or the name you chose for it), `.env` and `values.yaml`. Even if
you’re using the environment variables from the `values.yaml` to define your configuration, there still might be a config
file used and loaded with field values you relay on.
2. Backup your `.env` and `values.yaml`
3. Update the image version in your values.yaml
   <br>
   For example, in this [values.yaml](https://github.com/TykTechnologies/tyk-charts/blob/83de0a184014cd027ec6294b77d034d6dcaa2a10/components/tyk-gateway/values.yaml#L142)
   change the version of the tag `tag: v5.3` to the version you want.
4. Run `Helm upgrade` with your relevant `values.yaml` file/s.
   <br>
   Check the [helm upgrade docs](https://helm.sh/docs/helm/helm_upgrade/) for more details on the `upgrade` command.

#### Kubernetes

{{< note success >}}
**Upgrade instructions for *Tyk Dashboard*, *Tyk Pump* and *MDCB***

The instruction below refer to upgrading *Tyk Gateway*. You can follow the same steps for *Tyk Dashboard*, *Tyk Pump*
and *MDCB*.

{{< /note >}}


**Simple Kubernetes Environment Upgrade**

When upgrading a non-production environment, where it's okay to have a brief downtime and you can simply restart your
gateways, the upgrade is trivial as with any other image you want to upgrade in Kubernetes:

In a similar way to docker:
1. Backup your gateway config file (`tyk.conf` or the name you chose for it)
2. Update the image version in the manifest file.
3. Apply the file/s using kubectl

```console
$ kubectl apply -f .
``` 
You will see that the deployment has changed.

Now you can check the gateway pod to see the latest events (do `kubectl get pods` to get the pod name):
    
```console
$ kubectl describe pods <gateway pod name>
```
You should see that the image was pulled, the container got created and the gateway started running again, similar to the following output:

```bash
Events:
  Type    Reason     Age   From               Message
  ----    ------     ----  ----               -------
  Normal  Scheduled  118s  default-scheduler  Successfully assigned tyk/tyk-gtw-89dc9f554-5487c to docker-desktop
  Normal  Pulling    117s  kubelet            Pulling image "tykio/tyk-gateway:v5.0"
  Normal  Pulled     70s   kubelet            Successfully pulled image "tykio/tyk-gateway:v5.0" in 47.245940479s
  Normal  Created    70s   kubelet            Created container tyk-gtw
  Normal  Started    70s   kubelet            Started container tyk-gtw
```

4. Check the log to see that the new version is used and if the gateway is up and running
```console
$ kubectl logs service/gateway-svc-tyk-gateway-tyk-headless --tail=100 --follow 
Defaulted container "gateway-tyk-headless" out of: gateway-tyk-headless, setup-directories (init)
time="Jul 17 20:58:27" level=info msg="Tyk API Gateway 5.1.0" prefix=main
...
```
5. Check the gateway is healthy
```console
$ curl  localhost:8080/hello | jq .
{
  "status": "pass",
  "version": "5.1.0",
  "description": "Tyk GW",
  "details": {
    "redis": {
      "status": "pass",
      "componentType": "datastore",
      "time": "2023-07-17T21:07:27Z"
    }
  }
}
```

**Upgrade Tyk K8S Demo deployment**

1. In the [Tyk k8s Demo](https://github.com/TykTechnologies/tyk-k8s-demo/blob/main/README.md) repo, change the version in [.env file](https://github.com/TykTechnologies/tyk-k8s-demo/blob/893ce2ac8b13b4de600003cfb1d3d8d1625125c3/.env.example#L2), `GATEWAY_VERSION=v5.1` to the version you want
2. Restart the deployment
3. Check the log file

#### Linux - Debian

The following guide explains how to upgrade Tyk Self-Managed running on Debian

**Upgrade Guide Video**

Please refer to our [upgrade guide video](https://tyk-1.wistia.com/medias/dcyna9zwqf) below for visual guidance of
upgrading Tyk Self-Managed (DEB).

<div>
<iframe src="https://fast.wistia.net/embed/iframe/dcyna9zwqf" title="Wistia video player" allowfullscreen frameborder="0" scrolling="no" class="responsive-frame" name="wistia_embed" ></iframe>
</div>

**Preparations**

After reviewing guidelines for [preparing for upgrade]({{< ref "#upgrade-guidelines" >}}),
follow the instructions below to upgrade your Tyk components and plugins.

**Upgrade order:**

Please note that upgrade order is as explained in the upgrade [overview]({{< ref "#tyk-self-managed-upgrade-guide" >}})

**Distro versions**

Tyk supports the following version for *Debian* and its derivative *Ubuntu*:

| Distribution | Version | 
|--------------|---------|
| Debian       | 11      |
| Ubuntu       | 20      |
| Ubuntu       | 18      |
| Ubuntu       | 16      | 

Our repositories will be updated at https://packagecloud.io/tyk when new versions are released.

During the initial deployment of Tyk, your team may have utilized APT repositories or directly downloaded the .deb files. To verify the presence of APT repositories on the server, inspect the following locations:

- Dashboard: `/etc/apt/sources.list.d/tyk_tyk-dashboard.list`
- Gateway: `/etc/apt/sources.list.d/tyk_tyk-gateway.list`
- Pump: `/etc/apt/sources.list.d/tyk_tyk-pump.list`

If the above files are not present, it could be worth checking internally that the initial deployment was done by manually downloading and installing the .deb files. This is common in airtight environments without internet access.

**Verify Target Package Availability**

Depending on the Linux distribution that you are using, ensure that you are pulling the correct version and distribution
from the [packagecloud.io/tyk](https://packagecloud.io/tyk) repository.

The package name contains the version number and the distro/version column displays the specific distribution release.

{{< img src="/img/upgrade-guides/deb_packages.png" 
    alt="Package names" >}}

##### Backups

**Configuration files:**

Please take a backup of below configuration files of each Tyk component. This will be useful in case you need to cross reference configuration changes or need to rollback your deployment. 

- Dashboard Configuration File: `/opt/tyk-dashboard/tyk_analytics.conf`
- Gateway Configuration File: `/opt/tyk-gateway/tyk.conf`
- Pump Configuration File: `/opt/tyk-pump/pump.conf`

**Databases**

{{< note >}}
**Note** 

Redis and MongoDB are not Tyk products and what we provide here are basic backup and restore instructions. It is advisable to consult the official documentation for Redis and MongoDB on backups.
{{< /note >}}

**Redis**

For more detailed instructions on managing Redis backups, please refer to the official Redis documentation:
https://redis.io/docs/management/persistence/

The Redis SAVE command is used to create a backup of the current redis database. The SAVE command performs a synchronous save of the dataset producing a point in time snapshot of all the data inside the Redis instance, in the form of an RDB file.

```bash
# Using SAVE, if the previous dump.rdb file exists in the working directory, it will be overwritten with the new snapshot

SAVE
```

**Example - SAVE**

{{< img src="/img/upgrade-guides/redis_save.png" 
    alt="Redis SAVE example" width="600" height="auto">}}

To restore Redis data, follow these steps:

- Move the Redis backup file (dump.rdb) to your Redis directory.
- Start the Redis server

To locate your Redis directory, you can use the CONFIG command. Specifically, the CONFIG GET command allows you to read
the configuration parameters of a running Redis server.

**Example - CONFIG**

{{< img src="/img/upgrade-guides/redis_config.png" 
    alt="Redis CONFIG example" width="600" height="auto">}}

**MongoDB**

For detailed instructions on performing backups in MongoDB, please refer to the official MongoDB documentation:
https://www.mongodb.com/docs/manual/core/backups/

To capture a snapshot of a MongoDB database from a remote machine and store it locally, utilize the mongodump command on the primary node. Specify the host and port number (default is 27017) of the remote server, along with additional parameters such as the database name, user credentials and password. Lastly, designate the directory where the snapshot should be created.

```bash
mongodump --db tyk_analytics --out /path/to/dump/directory
```

**Example**

{{< img src="/img/upgrade-guides/mongo_dump.png" 
    alt="Mongo DUMP example" height="600">}}

To restore a database using a previously saved snapshot, simply employ the mongorestore command.

```bash
mongorestore --host <hostname> --port <port> --username <username> --password <password> /path/to/dump/directory
```

**Steps for Upgrading Tyk Packages**

Before executing the upgrade, ensure that you have consulted and performed all the necessary steps in the [pre upgrade checklist]({{< ref "#upgrade-guidelines" >}}).

**Step 1. Update Tyk Repositories**

Fetch and update information about the available packages from the specified repositories. 

```bash
sudo apt-get update
```

**Step 2. Verify availability of target upgrade packages**

List current versions of Tyk using the command below:

```bash
dpkg -l | grep -i tyk
```

**Example**

{{< img src="/img/upgrade-guides/check_packages.png" 
    alt="Check packages" height="600">}}

List available versions of upgradable packages of Tyk components and ensure that the version you are planning to upgrade to is listed in the output of the above command.

```bash
apt list -a 'tyk*'
```

**Example**

{{< img src="/img/upgrade-guides/list_packages.png" 
    alt="List packages example" width="600">}}

**Step 3. Upgrade Tyk Components**

**Note:** Please specify the exact version you are upgrading into.

```bash
sudo apt-get install tyk-dashboard=<desired-version>
```

```bash
sudo apt-get install tyk-gateway=<desired-version>
```

```bash
sudo apt-get install tyk-pump=<desired-version>
```

**Example**

{{< img src="/img/upgrade-guides/install_deb.png" 
    alt="apt-get install example" width="600" height="auto">}}

**Step 4. Restart Components**

After upgrading Tyk, restart the services

```bash
# Restart Services
systemctl restart tyk-dashboard
systemctl restart tyk-gateway
systemctl restart tyk-pump

# Check status of Tyk Components
systemctl status tyk-dashboard
systemctl status tyk-gateway
systemctl status tyk-pump
```

**Step 5. Health check on upgraded Tyk components**

Perform a health check on all 3 Tyk Components. The host and port number varies on your setup.

**Tyk Dashboard**

```curl
curl http://localhost:3000/hello
```

**Tyk Gateway**

```curl
curl http://localhost:8080/hello
```

**Tyk Pump**

```curl
curl http://localhost:8083/health
```

##### Reverting the Upgrade

If the upgrade fails you can revert to the old version by following the steps below.

**Step 1. Inspect package logs**

In case the upgrade fails for some reason, you can use the command below to check your history of package installs:

```bash
cat /var/log/apt/history.log
```

**Step 2. Revert**

Manually reverting to a previous version can be done by installing or uninstalling a package. For instance, to roll back to the previous version, you can use this command:

```bash
sudo apt-get install tyk-dashboard=<previous version>
```

{{< note >}}
**Note**  

These commands are provided as general guidelines and should be used with caution. It's advisable to consult with your system administrator or seek assistance from a qualified professional before executing any system-level commands
{{< /note >}}

#### Linux - RedHat (CentOS) 

The following guide explains how to upgrade Tyk Self-Managed running on RHL


**Upgrade guide video**

Please refer to our [upgrade guide video](https://tyk-1.wistia.com/medias/p2c7gjzsk6) below for visual guidance of
upgrading Tyk Self-Managed (RPM).

<div>
<iframe src="https://fast.wistia.net/embed/iframe/p2c7gjzsk6" title="Wistia video player" allowfullscreen frameborder="0" scrolling="no" class="responsive-frame" name="wistia_embed" ></iframe>
</div>

---

**Preparations**

After reviewing guidelines for [preparing for upgrade]({{< ref "#upgrade-guidelines" >}}),
follow the instructions below to upgrade your Tyk components and plugins.

**Upgrade order:**
Please note that upgrade order is as explained in the upgrade [overview]({{< ref "#tyk-self-managed-upgrade-guide" >}})

**Distro versions**

Tyk supports the following Centos and Rhel distributions:

| Distribution | Version |
|--------------|---------|
| Centos       | 7       |
| Rhel         | 9       |
| Rhel         | 8       |
| Rhel         | 7       |

Our repositories will be updated at https://packagecloud.io/tyk when new versions are released.

During the initial deployment of Tyk, your team may have utilized YUM repositories or directly downloaded the .rpm files. To verify the presence of YUM repositories on the server, inspect the following locations:

- Dashboard: `/etc/yum.repos.d/tyk_tyk-dashboard.repo`
- Gateway: `/etc/yum.repos.d/tyk_tyk-gateway.repo`
- Pump: `/etc/yum.repos.d/tyk_tyk-pump.repo`

If the above files are not present, it is worthwhile checking internally that the initial deployment was done by manually downloading and installing the .rpm files. This is common in airtight environments without internet access.

**Verify Target Package Availability**

Depending on the Linux distribution that you are using, ensure that you are pulling the correct version and distribution from the [packagecloud.io/tyk](https://packagecloud.io/tyk) repository.

The package name contains the version number and the distro/version column displays the specific distribution release.

{{< img src="/img/upgrade-guides/rpm_packages.png" 
    alt="Package names" >}}

##### Backups

Before upgrading, ensure that the configuration files and databases are backed up.

**Configuration files**

Please take a backup of the following configuration files for each Tyk component. This will be useful in case you need to cross reference configuration changes or need to rollback your deployment. 

- Dashboard Configuration File: `/opt/tyk-dashboard/tyk_analytics.conf`
- Gateway Configuration File: `/opt/tyk-gateway/tyk.conf`
- Pump Configuration File: `/opt/tyk-pump/pump.conf`

**Databases**

{{< note >}}
**Note** 

Redis and MongoDB are not Tyk products and what we provide here are basic backup and restore instructions. It is advisable to consult the official documentation for Redis and MongoDB on backups.
{{< /note >}}

**Redis**

For more detailed instructions on managing Redis backups, please refer to the official Redis documentation:
https://redis.io/docs/management/persistence/

The Redis SAVE command is used to create a backup of the current Redis database. The SAVE command performs a synchronous save of the dataset producing a point in time snapshot of all the data inside the Redis instance, in the form of an RDB file.

```bash
# Using SAVE, if the previous dump.rdb file exists in the working directory, it will be overwritten with the new snapshot

SAVE
```

**Example**

{{< img src="/img/upgrade-guides/redis_save.png" 
    alt="Redis SAVE example" width="600" height="auto">}}

To restore Redis data, follow these steps:

- Move the Redis backup file (dump.rdb) to your Redis directory.
- Start the Redis server

To locate your Redis directory, you can use the CONFIG command. Specifically, the CONFIG GET command allows you to read the configuration parameters of a running Redis server.
Example:
{{< img src="/img/upgrade-guides/redis_config.png" 
    alt="Redis CONFIG example" width="600" height="auto">}}

**MongoDB**

For detailed instructions on performing backups in MongoDB, please refer to the official MongoDB documentation:
https://www.mongodb.com/docs/manual/core/backups/

To capture a snapshot of a MongoDB database from a remote machine and store it locally, utilize the mongodump command on the primary node. Specify the host and port number (default is 27017) of the remote server, along with additional parameters such as the database name, user credentials and password. Lastly, designate the directory where the snapshot should be created.

```bash
mongodump --db tyk_analytics --out /path/to/dump/directory
```

**Example**

{{< img src="/img/upgrade-guides/mongo_dump.png" 
    alt="Mongo DUMP example" height="600">}}

To restore a database using a previously saved snapshot, simply employ the mongorestore command.

```bash
mongorestore --host <hostname> --port <port> --username <username> --password <password> /path/to/dump/directory
```

##### Upgrade Tyk Packages

Before executing the upgrade, ensure that you have consulted and performed all the necessary steps in the [pre upgrade checklist]({{< ref "#upgrade-guidelines" >}}).

**Step 1. Update Tyk Repositories**

Fetch and update information about the available packages from the specified repositories. 

```bash
sudo yum -q makecache -y --disablerepo='*' --enablerepo='tyk_tyk-dashboard'
sudo yum -q makecache -y --disablerepo='*' --enablerepo='tyk_tyk-gateway'
sudo yum -q makecache -y --disablerepo='*' --enablerepo='tyk_tyk-pump'

Or
# To update ALL repositories in your system instead

sudo yum -q makecache -y
```

**Step 2. Verify availability of target upgrade packages**

List current versions of Tyk using the command below:

```bash
rpm -qa | grep -i tyk
```

**Example**

{{< img src="/img/upgrade-guides/list_rpm.png" 
    alt="List RPM packages example" width="600" height="auto">}}

List available versions of upgradable packages of Tyk components and ensure that the version you are planning to upgrade to is listed in the output of the above command.

```bash
yum --showduplicates list tyk*
```

Example:
{{< img src="/img/upgrade-guides/list_package.png" 
    alt="List version example" width="600" height="auto">}}
{{< img src="/img/upgrade-guides/list_package_2.png" 
    alt="List version example" width="600" height="auto">}}

**Step 3. Upgrade Tyk Components**

**Note:** Please specify the exact version you are upgrading into.

```bash
yum update tyk-dashboard-<desired-version>
yum update tyk-gateway-<desired-version>
yum update tyk-pump-<desired-version>
```

**Example**

{{< img src="/img/upgrade-guides/yum_update.png" 
    alt="Update example" height="600" width="auto" >}}

**Step 4. Restart Tyk Components**

After upgrading Tyk, restart the services

```bash
# Restart Services
systemctl restart tyk-dashboard
systemctl restart tyk-gateway
systemctl restart tyk-pump

# Check status of Tyk Components
systemctl status tyk-dashboard
systemctl status tyk-gateway
systemctl status tyk-pump
```

**Step 5. Health check on upgraded Tyk components**

Perform a health check on all 3 Tyk Components. The host and port number varies on your setup.

**Tyk Dashboard**

```curl
curl http://localhost:3000/hello
```

**Tyk Gateway**

```curl
curl http://localhost:8080/hello
```

**Tyk Pump**

```curl
curl http://localhost:8083/health
```

##### Reverting the Upgrade

If the upgrade fails you can revert to the old version by following the steps below.

**Step 1. Inspect package logs**

Use the command below to fetch information for all updates, noting the ID for the specific “update” action to revert to allow verifiying the packages:

```bash
yum history
```

**Step 2. Verify update**

Display details of the specific "update" transaction, replacing ID noted in the previous step

```bash
yum history info <ID>
```

**Example**

{{< img src="/img/upgrade-guides/yum_history.png" 
    alt="Update example" height="600" width="auto" >}}

**Step 3. Revert**

If you encounter difficulties after an upgrade and wish to revert the changes, you can use the following commands as a guide.

If you're experiencing issues specifically related to the upgrade and want to undo those changes only, you can use the *yum history undo* command. This will undo the changes for a specific update transaction only.

```bash
yum history undo <ID>
```

If you encounter issues after the upgrade and wish to revert your system to its previous state entirely, you can use the *yum history rollback* command. This command will rollback the system to a specific point in time, undoing all transactions that occurred after that point. 

```bash
yum history rollback <ID>
```

{{< note >}}
**Note**  
These commands are provided as general guidelines and should be used with caution. It's advisable to consult with your system administrator or seek assistance from a qualified professional before executing any system-level commands
{{< /note >}}



### Open Source Upgrade Guide 

The following guide explains how to upgrade Tyk Gateway when using Docker. For guides of other installation types check
the "Self-manged" section, and look for the instruction regarding Tyk Gateway.

Before proceeding with the upgrade process, ensure that you have thoroughly reviewed and completed the steps outlined in
the [pre-upgrade guidelines]({{< ref "#upgrade-guidelines" >}}). Once you
have adequately prepared, follow the instructions below to upgrade your Tyk components and plugins in this specified
order. Adhering to the provided sequence is crucial for a smooth and successful upgrade.

**Upgrade Order**

In a production environment, where we recommend installing the Dashboard, Gateway, and Pump on separate machines, you
should upgrade components in the following sequence:

1. Tyk Gateway
2. Tyk Pump

**Steps for Upgrading Tyk Gateway**

**Development Environment Upgrade**

In a development environment where you can simply restart your gateways, follow these steps:

1. Backup your gateway config file (`tyk.conf` or the name you chose for it)
2. Update the image version in the docker command or script
3. Restart the gateway. For example, update the following command to `v5.1` and run it as follows:

```docker
$ docker run \
  --name tyk_gateway \
  --network tyk \
  -p 8080:8080 \
  -v $(pwd)/tyk.standalone.conf:/opt/tyk-gateway/tyk.conf \
  -v $(pwd)/apps:/opt/tyk-gateway/apps \
  docker.tyk.io/tyk-gateway/tyk-gateway:v5.3
```

For full installation details, check the usual [installation page]({{< ref "tyk-open-source#install-tyk-gateway-with-docker" >}}).

**Docker compose upgrade in a simple environment**

For non-production environments where brief downtime is acceptable, you can upgrade by simply restarting your gateways.
Follow these steps:

1. Backup your gateway config file (`tyk.conf` or the name you chose for it)
2. Update the image version in the `docker-compose.yaml` file.
   <br>
   For example, Tyk Gateway version `4.3.3` is defined in this [docker-compose.yaml](https://github.com/TykTechnologies/tyk-gateway-docker/blob/e44c765f4aca9aad2a80309c5249ff46b308e46e/docker-compose.yml#L4)
   `image: docker.tyk.io/tyk-gateway/tyk-gateway:v4.3.3`. Change `4.3.3` to the version you want to use.
3. Restart the gateway (or stop and start it)
```console
$ docker compose restart
```
4. Check the log to see that the new version is used and if the gateway is up and running
5. Check that the gateway is healthy
```console
$ curl  localhost:8080/hello | jq .
{
  "status": "pass",
  "version": "5.3.0",
  "description": "Tyk GW",
  "details": {
    "redis": {
      "status": "pass",
      "componentType": "datastore",
      "time": "2023-07-17T21:07:27Z"
    }
  }
}
```

**Production Environment Upgrade**

1. Backup your Gateway config file
2. Use Docker's best practices for a [rolling update](https://docs.docker.com/engine/swarm/swarm-tutorial/rolling-update/)
3. Review and complete the steps outlined in the [pre-upgrade guidelines]({{< ref "#upgrade-guidelines" >}}).
4. Define the version in your setup script (for example in `.env` file). The new image will be pulled once it's executed.
If your script is doing `docker pull`, update the version of the gateway in that command to the target version.
5. Check the log to see that the new version is used and if the gateway is up and running
6. Check that the Gateway is healthy using the open */hello* API ( run `curl  localhost:8080/hello | jq .`)

**Upgrade Tyk Pump**

Docker Instructions for upgrading *Tyk Pump* is the same as the above for *Tyk Gateway* just with
the name of the docker image of Tyk Pump `tykio/tyk-pump-docker-pub`


### Go Plugins Upgrade Guide

This guide shows you how to compile your custom Go plugins for upgrade.

The table below links you to the upgrade steps for the version of Tyk you are upgrading from and to:

| Upgrade process | Current Version | Target Version |
|-----------------|-----------------|----------------|
| [Path 1](#path-1)    | < 4.1.0         | < 4.1.0        |
| [Path 2](#path-2)    | < 4.1.0         | >= 4.1.0       |
| [Path 3](#path-3)    | >= 4.1.0        | >= 5.1.0       |

#### Path 1 - Current Version < 4.1.0 and Target Version < 4.1.0 {#path-1}
 1. Open a terminal/command prompt in the directory of your plugin source file(s)
 2. Run the following commands to initialise your plugin:

```bash
go get 
github.com/TykTechnologies/tyk@6c76e802a29838d058588ff924358706a078d0c5

# Tyk Gateway versions < 4.2 have a dependency on graphql-go-tools
go mod edit -replace github.com/jensneuse/graphql-go-tools=github.com/TykTechnologies/graphql-go-tools@v1.6.2-0.20220426094453-0cc35471c1ca

go mod tidy
go mod vendor
```

#### Path 2 - Current Version < 4.1.0 and Target Version >= 4.1.0 {#path-2}
1. Open a terminal/command prompt in the directory of your plugin source file(s)  
2. Based on your Target Version run the appropriate commands to initialize your plugin:

- **Target Version <= v4.2.0**  
    ```bash
    go get github.com/TykTechnologies/tyk@6c76e802a29838d058588ff924358706a078d0c5
    # Tyk Gateway versions < 4.2 have a dependency on graphql-go-tools
    go mod edit -replace github.com/jensneuse/graphql-go-tools=github.com/TykTechnologies/graphql-go-tools@v1.6.2-0.20220426094453-0cc35471c1ca
    go mod tidy
    go mod vendor
    ```
- **Target Version > v4.2.0 and < v5.1**
    ```bash
    go get github.com/TykTechnologies/tyk@54e1072a6a9918e29606edf6b60def437b273d0a
    # For Gateway versions earlier than 5.1 using the go mod vendor tool is required
    go mod tidy
    go mod vendor
    ```
- **Target Version >= v5.1.0**
    ```bash
    go get github.com/TykTechnologies/tyk@ffa83a27d3bf793aa27e5f6e4c7106106286699d
    # In Gateway version 5.1, the Gateway and plugins transitioned to using Go modules builds and don't use Go mod vendor anymore
    go mod tidy
    ```


#### Path 3 - Current Version >= 4.1.0 and Target Version >= 5.1.0 {#path-3}
1. Open a terminal/command prompt in the directory of your plugin source file(s)  
2. Based on your Target Version run the appropriate commands to initialise your plugin:

- **Target Version > v4.2.0 and < v5.1.0**
    ```bash
    go get github.com/TykTechnologies/tyk@54e1072a6a9918e29606edf6b60def437b273d0a
    # For Gateway versions earlier than 5.1 using the go mod vendor tool is required
    go mod tidy
    go mod vendor
    ```
    - **Target Version >= v5.1.0**
    ```bash
    go get github.com/TykTechnologies/tyk@ffa83a27d3bf793aa27e5f6e4c7106106286699d
    # In Gateway version 5.1, the Gateway and plugins transitioned to using
    # Go modules builds and don't use Go mod vendor anymore
    go mod tidy
    ```

#### Compile the plugins

Download the plugin compiler for the target Gateway version you’re upgrading to (e.g. 5.2.5). Docker images for plugin compiler versions are available in the [Tyk Docker Hub](https://hub.docker.com/r/tykio/tyk-plugin-compiler/tags). 

```bash
docker pull tykio/tyk-plugin-compiler:v5.2.5
```

Recompile your plugin with this version

```bash
docker run --rm -v "$(pwd)":/plugin-source \
           --platform=linux/amd64 \
           tykio/tyk-plugin-compiler:v5.2.5 plugin.so
```

Example:
{{< img src="/img/upgrade-guides/recompile_plugin.png" 
    alt="Recompile plugin example" width="600" height="auto">}}

You can remove the plugin complier images once your plugin has been successfully recompiled:

```bash
docker rmi plugin_compiler_image_name_or_id
```


## Backup APIs and Policies 

Backing up Tyk APIs and Policies is crucial for ensuring business continuity and data integrity. It safeguards against accidental data loss, system failures or corruption. This provides the opportunity to rollback to a stable state during upgrades or migrations, allowing you to restore configurations to a previous state to prevent disruptions with your API infrastructure.
If you are using Self Managed deployment then we recommend that you use [Tyk Sync]({{< ref "api-management/automations/sync" >}}) to backup your Tyk APIs and policies. 

### Export And Restore APIs and Policies

To facilitate backing up APIs and policies we have provided a Bash script [backup](https://github.com/TykTechnologies/backup) that can be used to export and restore all Tyk API definitions and Policies from Tyk Dashboard. This will be done by the *export* and *import* commands respectively. The script can be used on both Tyk Cloud and Self Managed deployments. The script is helpful for Tyk Cloud users who want to export their Tyk OAS APIs since *tyk-sync* does not currently support it on Tyk Cloud.

#### Export APIs and Policies

To export all APIs and Policies use the *export* command:

```bash
./backup.sh export --url https://my-tyk-dashboard.com --secret mysecretkey --api-output apis.json --policy-output policies.json
```

This will export all your API definitions and policies to *apis.json* and *policies.json* files.

#### Import APIs and Policies

To import all your APIs and Policies, use the *import* command:

```bash
./backup.sh import --url https://my-tyk-dashboard.com --secret mysecretkey --api-file apis.json --policy-file policies.json
```

This will restore the API definitions and policies from the apis.json and policies.json files.

