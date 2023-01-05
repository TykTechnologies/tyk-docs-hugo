---
title: "Debian / Ubuntu"
date: 2021-01-20
tags: ["Tyk Gateway", "Open Source", "Installation", "Ubuntu", "Debian"]
description: "How to install the open source Tyk Gateway on Ubuntu or Debian using Ansible or with shell scripts"
menu:
  main:
    parent: "Open Source Installation" # Child of APIM -> OSS
weight: 5
aliases:
  - /tyk-on-premises/on-ubuntu/
  - /tyk-oss/ce-ubuntu/
---
{{< tabs_start >}}
{{< tab_start "Ansible" >}}
<br />
{{< note >}}
**Requirements**

*   [Ansible](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html) is required to run the following commands. Instructions on how install Tyk CE with shell is in the <b>Shell</b> tab.
*   Ensure port `8080` is open: this is used in this guide for Gateway traffic (the API traffic to be proxied).
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

3. Run initalisation script to initialise environment

```bash
$ sh scripts/init.sh
```

4. Modify `hosts.yml` file to update ssh variables to your server(s). You can learn more about the hosts file [here](https://docs.ansible.com/ansible/latest/user_guide/intro_inventory.html)

5. Run ansible-playbook to install `tyk-ce`

```bash
$ ansible-playbook playbook.yaml -t tyk-ce -t redis
```

You can choose to not install Redis by removing the `-t redis`. However Redis is a requirment and needs to be installed for the gateway to run.

## Supported Distributions
| Distribution | Version | Supported |
| --------- | :---------: | :---------: |
| Debian | 11 | ✅ |
| Debian | 10 | ❌ |
| Debian | 9 | ❌ |

| Ubuntu | 20 | ✅ |
| Ubuntu | 18 | ✅ |
| Ubuntu | 16 | ✅ |

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

{{< tab_end >}}
{{< tab_start "Shell" >}}
{{< note >}}
**Requirements**

*   Ensure port `8080` is open: this is used in this guide for Gateway traffic (the API traffic to be proxied).
{{< /note >}}

### Install Redis

```bash
sudo apt-get install -y redis-server
```

## Installation

First import the public key as required by Ubuntu APT

```bash
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
```

### Run Installation Scripts via our PackageCloud Repositories

From [https://packagecloud.io/tyk/tyk-gateway](https://packagecloud.io/tyk/tyk-gateway) you have the following options:

* Via the correct package for your Ubuntu version. We have packages for the following:
 * Xenial
 * Trusty
 * Precise

* Via Quick Installation Instructions. You can use: 
 * [Manual Instructions](https://packagecloud.io/tyk/tyk-gateway/install#manual-deb)
 * [Chef](https://packagecloud.io/tyk/tyk-gateway/install#chef)
 * [Puppet](https://packagecloud.io/tyk/tyk-gateway/install#puppet)
 * [CI and Build Tools](https://packagecloud.io/tyk/tyk-gateway/ci)

### Configuring The Gateway 

You can set up the core settings for the Tyk Gateway with a single setup script, however for more involved deployments, you will want to provide your own configuration file.

{{< note success >}}
**Note**  

You need to replace `<hostname>` for `--redishost=<hostname>` with your own value to run this script.
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

### Starting Tyk

The Tyk Gateway can be started now that it is configured. Use this command to start the Tyk Gateway:
```bash
sudo service tyk-gateway start
```
{{< tab_end >}}
{{< tabs_end >}}
## Next Steps Tutorials

Follow the Tutorials on the Community Edition tabs for the following:

1. [Add an API]({{< ref "getting-started/create-api" >}})
2. [Create a Security Policy]({{< ref "getting-started/create-security-policy" >}})
3. [Create an API Key]({{< ref "getting-started/create-api-key" >}})
