---
date: 2017-03-22T16:24:18Z
Title: Gateway on Red Hat (RHEL) / CentOS
tags: ["Tyk Gateway", "Self Managed", "Installation", "Red Hat", "CentOS"]
description: "How to install the Tyk Gateway as part of the Tyk Stack on Red Hat or CentOS using Ansible or shell scripts"
menu:
  main:
    parent: "Red Hat (RHEL / CentOS) "
weight: 3 
url: /tyk-on-prem/installation/redhat-rhel-centos/gateway
aliases:
  - /getting-started/installation/with-tyk-on-premises/redhat-rhel-centos/gateway
---
{{< tabs_start >}}
{{< tab_start "Ansible" >}}
<br />
{{< note >}}
**Requirements**

[Ansible](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html) is required to run the following commands. Instructions on how install Tyk Gateway with shell is in the <b>Shell</b> tab.
{{< /note >}}

## Getting Started
1. clone the [tyk-ansible](https://github.com/TykTechnologies/tyk-ansible) repositry

```bash
$ git clone https://github.com/TykTechnologies/tyk-ansible
```

2. `cd` into the directory
```.bash
$ cd tyk-ansible
```

3. Run initalization script to initialize environment

```bash
$ sh scripts/init.sh
```

4. Modify `hosts.yml` file to update ssh variables to your server(s). You can learn more about the hosts file [here](https://docs.ansible.com/ansible/latest/user_guide/intro_inventory.html)

5. Run ansible-playbook to install `tyk-gateway`

```bash
$ ansible-playbook playbook.yaml -t `tyk-gateway-pro` or `tyk-gateway-hybrid`
```

## Supported Distributions
| Distribution | Version | Supported |
| --------- | :---------: | :---------: |
| Amazon Linux | 2 | ✅ |
| CentOS | 8 | ✅ |
| CentOS | 7 | ✅ |
| RHEL | 8 | ✅ |
| RHEL | 7 | ✅ |

## Variables
- `vars/tyk.yaml`

| Variable | Default | Comments |
| --------- | :---------: | --------- |
| secrets.APISecret | `352d20ee67be67f6340b4c0605b044b7` | API secret |
| secrets.AdminSecret | `12345` | Admin secret |
| gateway.service.host | | Gateway server host if different than the hosts url |
| gateway.service.port | `8080` | Gateway server listening port |
| gateway.service.proto | `http` | Gateway server protocol |
| gateway.service.tls | `false` | Set to `true` to enable SSL connections |
| gateway.sharding.enabled | `false` | Set to `true` to enable filtering (sharding) of APIs |
| gateway.sharding.tags | | The tags to use when filtering (sharding) Tyk Gateway nodes. Tags are processed as OR operations. If you include a non-filter tag (e.g. an identifier such as `node-id-1`, this will become available to your Dashboard analytics) |
| gateway.rpc.connString | | Use this setting to add the URL for your MDCB or load balancer host |
| gateway.rpc.useSSL | `true` | Set this option to `true` to use an SSL RPC connection|
| gateway.rpc.sslInsecureSkipVerify | `true` | Set this option to `true` to allow the certificate validation (certificate chain and hostname) to be skipped. This can be useful if you use a self-signed certificate |
| gateway.rpc.rpcKey | | Your organisation ID to connect to the MDCB installation |
| gateway.rpc.apiKey | | This the API key of a user used to authenticate and authorise the Gateway’s access through MDCB. The user should be a standard Dashboard user with minimal privileges so as to reduce any risk if the user is compromised. The suggested security settings are read for Real-time notifications and the remaining options set to deny |
| gateway.rpc.groupId | | This is the `zone` that this instance inhabits, e.g. the cluster/data-centre the Gateway lives in. The group ID must be the same across all the Gateways of a data-centre/cluster which are also sharing the same Redis instance. This ID should also be unique per cluster (otherwise another Gateway cluster can pick up your keyspace events and your cluster will get zero updates). |

{{< tab_end >}}
{{< tab_start "Shell" >}}
## Install Tyk API Gateway on Red Hat

Tyk has it's own signed RPMs in a YUM repository hosted by the kind folks at [packagecloud.io][1], which makes it easy, safe and secure to install a trusted distribution of the Tyk Gateway stack.

This tutorial will run on an [Amazon AWS][2] *Red Hat Enterprise Linux 7.1* instance. We will install Tyk Gateway with all dependencies stored locally.

We're installing on a `t2.micro` because this is a tutorial, you'll need more RAM and more cores for better performance.

This configuration should also work (with some tweaks) for CentOS.

### Prerequisites

*   Ensure port `8080` is open: this is used in this guide for Gateway traffic (API traffic to be proxied)
*   EPEL (Extra Packages for Enterprise Linux) is a free, community based repository project from Fedora which provides high quality add-on software packages for Linux distribution including RHEL, CentOS, and Scientific Linux. EPEL isn’t a part of RHEL/CentOS but it is designed for major Linux distributions. In our case we need it for Redis. Install EPEL using the instructions here.

### Step 1: Set up YUM Repositories

First, we need to install some software that allows us to use signed packages:
```bash
sudo yum install pygpgme yum-utils wget
```

Next, we need to set up the various repository configurations for Tyk and MongoDB:

### Step 2: Create Tyk Gateway Repository Configuration

Create a file named `/etc/yum.repos.d/tyk_tyk-gateway.repo` that contains the repository configuration below https://packagecloud.io/tyk/tyk-gateway/install#manual-rpm:
```bash
[tyk_tyk-gateway]
name=tyk_tyk-gateway
baseurl=https://packagecloud.io/tyk/tyk-gateway/el/7/$basearch
repo_gpgcheck=1
gpgcheck=1
enabled=1
gpgkey=https://keyserver.tyk.io/tyk.io.rpm.signing.key.2020
       https://packagecloud.io/tyk/tyk-gateway/gpgkey
sslverify=1
sslcacert=/etc/pki/tls/certs/ca-bundle.crt
metadata_expire=300
```

### Step 3: Install Packages

We're ready to go, you can now install the relevant packages using yum:
```bash
sudo yum install -y redis tyk-gateway
```

*(you may be asked to accept the GPG key for our two repos and when the package installs, hit yes to continue)*

### Step 4: Start Redis

In many cases Redis will not be running, so let's start those:
```bash
sudo service redis start
```

When Tyk is finished installing, it will have installed some init scripts, but it will not be running yet. The next step will be to setup the Gateway – thankfully this can be done with three very simple commands.

## Configure Tyk Gateway with the Dashboard

### Prerequisites

This configuration assumes that you have already installed Tyk Dashboard, and have decided on the domain names for your Dashboard and your Portal. **They must be different**. For testing purposes, it is easiest to add hosts entries to your (and your servers) `/etc/hosts` file.

### Set up Tyk

You can set up the core settings for Tyk Gateway with a single setup script, however for more involved deployments, you will want to provide your own configuration file.

{{< note success >}}
**Note**  

You need to replace `<hostname>` for `--redishost=<hostname>`with your own value to run this script.
{{< /note >}}

```bash
sudo /opt/tyk-gateway/install/setup.sh --dashboard=1 --listenport=8080 --redishost=<hostname> --redisport=6379
```

What we've done here is told the setup script that:

*   `--dashboard=1`: We want to use the Dashboard, since Tyk Gateway gets all it's API Definitions from the Dashboard service, as of v2.3 Tyk will auto-detect the location of the dashboard, we only need to specify that we should use this mode.
*   `--listenport=8080`: Tyk should listen on port 8080 for API traffic.
*   `--redishost=<hostname>`: Use Redis on the hostname: localhost.
*   `--redisport=6379`: Use the default Redis port.

### Starting Tyk

The Tyk Gateway can be started now that it is configured. Use this command to start the Tyk Gateway:
```bash
sudo service tyk-gateway start
```

#### Pro Tip: Domains with Tyk Gateway

Tyk Gateway has full domain support built-in, you can:

*   Set Tyk to listen only on a specific domain for all API traffic.
*   Set an API to listen on a specific domain (e.g. api1.com, api2.com).
*   Split APIs over a domain using a path (e.g. api.com/api1, api.com/api2, moreapis.com/api1, moreapis.com/api2 etc).
*   If you have set a hostname for the Gateway, then all non-domain-bound APIs will be on this hostname + the `listen_path`.


[1]: https://packagecloud.io
[2]: http://aws.amazon.com
{{< tab_end >}}
{{< tabs_end >}}
