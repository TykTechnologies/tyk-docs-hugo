---
title: "Red Hat (RHEL / CentOS)"
date: 2021-01-20
tags: ["Tyk Gateway", "Open Source", "Installation", "Red Hat", "CentOS"]
description: "How to install the open source Tyk Gateway on Red Hat or CentOS using Ansible or with shell scripts"
menu:
  main:
    parent: "Open Source Installation" # Child of APIM -> OSS
weight: 4
aliases:
  - /tyk-oss/ce-centos/
  - /tyk-oss/ce-redhat/
---

The Tyk Gateway can be installed following different installation methods including *Shell* and *Ansible*. Please select by clicking the tab with the installation path most suitable for you.

{{< tabs_start >}}
{{< tab_start "Shell" >}}

## Supported Distributions

| Distribution | Version | Supported |
| --------- | :---------: | :---------: |
| CentOS | 8 | ✅ |
| CentOS | 7 | ✅ |
| RHEL | 8 | ✅ |
| RHEL | 7 | ✅ |

## Requirements

Before you begin the installation process, make sure you have the following:

*   Ensure port `8080` is open for Gateway traffic (the API traffic to be proxied).
*   The Tyk Gateway has a [dependency](https://tyk.io/docs/planning-for-production/redis/#supported-versions) on Redis. Follow the steps provided by Red Hat to make the installation of Redis, conducting a [search](https://access.redhat.com/search/?q=redis) for the correct version and distribution.

## Step 1: Create Tyk Gateway Repository Configuration

Create a file named `/etc/yum.repos.d/tyk_tyk-gateway.repo` that contains the repository configuration settings for YUM repositories `tyk_tyk-gateway` and `tyk_tyk-gateway-source` used to download packages from the specified URLs. This includes GPG key verification and SSL settings, on a Linux system.

Make sure to replace `el` and `8` in the config below with your Linux distribution and version:
```bash
[tyk_tyk-gateway]
name=tyk_tyk-gateway
baseurl=https://packagecloud.io/tyk/tyk-gateway/el/8/$basearch
repo_gpgcheck=1
gpgcheck=0
enabled=1
gpgkey=https://packagecloud.io/tyk/tyk-gateway/gpgkey
sslverify=1
sslcacert=/etc/pki/tls/certs/ca-bundle.crt
metadata_expire=300

[tyk_tyk-gateway-source]
name=tyk_tyk-gateway-source
baseurl=https://packagecloud.io/tyk/tyk-gateway/el/8/SRPMS
repo_gpgcheck=1
gpgcheck=0
enabled=1
gpgkey=https://packagecloud.io/tyk/tyk-gateway/gpgkey
sslverify=1
sslcacert=/etc/pki/tls/certs/ca-bundle.crt
metadata_expire=300
```

Update your local yum cache by running:
```bash
sudo yum -q makecache -y --disablerepo='*' --enablerepo='tyk_tyk-gateway'
```

## Step 2: Install Tyk Gateway

Install the Tyk Gateway using yum:
```bash
sudo yum install -y tyk-gateway
```
{{< note success >}}
**Note**

You may be asked to accept the GPG key for our two repos and when the package installs, hit yes to continue.
{{< /note >}}

## Step 3: Start Redis

If Redis is not running then start it using the following command:
```bash
sudo service redis start
```
## Step 4: Configuring The Gateway

You can set up the core settings for the Tyk Gateway with a single setup script, however for more complex deployments you will want to provide your own configuration file.

{{< note success >}}
**Note**

Replace `<hostname>` in `--redishost=<hostname>` with your own value to run this script.
{{< /note >}}

```bash
sudo /opt/tyk-gateway/install/setup.sh --listenport=8080 --redishost=<hostname> --redisport=6379 --domain=""
```

What you've done here is told the setup script that:

*   `--listenport=8080`: Listen on port `8080` for API traffic.
*   `--redishost=<hostname>`: The hostname for Redis.
*   `--redisport=6379`: Use port `6379` for Redis.
*   `--domain=""`: Do not filter domains for the Gateway, see the note on domains below for more about this.

In this example, you don't want Tyk to listen on a single domain. It is recommended to leave the Tyk Gateway domain unbounded for flexibility and ease of deployment.

## Step 5: Start the Tyk Gateway

The Tyk Gateway can be started now that it is configured. Use this command to start the Tyk Gateway:
```bash
sudo service tyk-gateway start
```
{{< tab_end >}}
{{< tab_start "Ansible" >}}

## Supported Distributions

| Distribution | Version | Supported |
| --------- | :---------: | :---------: |
| CentOS | 8 | ✅ |
| CentOS | 7 | ✅ |
| RHEL | 8 | ✅ |
| RHEL | 7 | ✅ |

## Requirements
Before you begin the installation process, make sure you have the following:

- [Git](https://git-scm.com/download/linux) - required for getting the installation files.
- [Ansible](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html) - required for running the commands below.
- Ensure port `8080` is open: this is used in this guide for Gateway traffic (the API traffic to be proxied).

## Getting Started
1. clone the [tyk-ansible](https://github.com/TykTechnologies/tyk-ansible) repository

```console
$ git clone https://github.com/TykTechnologies/tyk-ansible
```

2. `cd` into the directory
```console
$ cd tyk-ansible
```

3. Run the initalisation script to initialise your environment

```console
$ sh scripts/init.sh
```

4. Modify the `hosts.yml` file to update ssh variables to your server(s). You can learn more about the hosts file [here](https://docs.ansible.com/ansible/latest/user_guide/intro_inventory.html)

5. Run ansible-playbook to install `tyk-gateway-ce`

```console
$ ansible-playbook playbook.yaml -t tyk-gateway-ce -t redis
```
{{< note success >}}
**Note**  

Installation flavors can be specified by using the -t {tag} at the end of the ansible-playbook command. In this case we are using:
  -`tyk-gateway-ce`: Tyk Gateway with CE config
  -`redis`: Redis database as Tyk Gateway dependency
{{< /note >}}

## Variables
- `vars/tyk.yaml`

| Variable | Default | Comments |
| --------- | :---------: | --------- |
| secrets.APISecret | `352d20ee67be67f6340b4c0605b044b7` | API secret |
| secrets.AdminSecret | `12345` | Admin secret |
| redis.host |  | Redis server host if different than the hosts url |
| redis.port | `6379` | Redis server listening port |
| redis.pass |  | Redis server password |
| redis.enableCluster | `false` | Enable if redis is running in cluster mode |
| redis.storage.database | `0` | Redis server database |
| redis.tls | `false` | Enable if redis connection is secured with SSL |
| gateway.service.host | | Gateway server host if different than the hosts url |
| gateway.service.port | `8080` | Gateway server listening port |
| gateway.service.proto | `http` | Gateway server protocol |
| gateway.service.tls | `false` | Set to `true` to enable SSL connections |
| gateway.sharding.enabled | `false` | Set to `true` to enable filtering (sharding) of APIs |
| gateway.sharding.tags | | The tags to use when filtering (sharding) Tyk Gateway nodes. Tags are processed as OR operations. If you include a non-filter tag (e.g. an identifier such as `node-id-1`, this will become available to your Dashboard analytics) |

- `vars/redis.yaml`

| Variable | Default | Comments |
| --------- | :---------: | --------- |
| redis_bind_interface | `0.0.0.0` | Binding address of Redis |

Read more about Redis configuration [here](https://github.com/geerlingguy/ansible-role-redis).

{{< tab_end >}}{{< tabs_end >}}
## Next Steps Tutorials

Follow the Tutorials on the Community Edition tabs for the following:

1. [Add an API]({{< ref "getting-started/create-api" >}})
2. [Create a Security Policy]({{< ref "getting-started/create-security-policy" >}})
3. [Create an API Key]({{< ref "getting-started/create-api-key" >}})
