---
date: 2017-03-22T16:39:29Z
Title: Tyk Pump on Red Hat (RHEL) / CentOS
tags: ["Tyk Pump", "Self Managed", "Installation", "Red Hat", "CentOS"]
description: "How to install the Tyk Pump as part of the Tyk Stack on Red Hat or CentOS using Ansible or shell scripts"
menu:
  main:
    parent: "Red Hat (RHEL / CentOS) "
weight: 2 
url: /tyk-on-prem/installation/redhat-rhel-centos/analytics-pump/
aliases:
  - /getting-started/installation/with-tyk-on-premises/redhat-rhel-centos/analytics-pump
---
{{< tabs_start >}}
{{< tab_start "Ansible" >}}
<br />
{{< note >}}
**Requirements**

[Ansible](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html) is required to run the following commands. Instructions on how install Tyk Pump with shell is in the <b>Shell</b> tab.
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

5. Run ansible-playbook to install `tyk-pump`

```bash
$ ansible-playbook playbook.yaml -t tyk-pump
```

## Supported Distributions
| Distribution | Version | Supported |
| --------- | :---------: | :---------: |
| Amazon Linux | 2 | ✅ |
| CentOS | 8 | ✅ |
| CentOS | 7 | ✅ |
| RHEL | 8 | ✅ |
| RHEL | 7 | ✅ |

{{< tab_end >}}
{{< tab_start "Shell" >}}
## Install Tyk Pump on Red Hat (RHEL) / CentOS

Tyk has it's own signed RPMs in a YUM repository hosted by the kind folks at [packagecloud.io][1], which makes it easy, safe and secure to install a trusted distribution of the Tyk Gateway stack.

This tutorial will run on an [Amazon AWS][2] *Red Hat Enterprise Linux 7.1* instance. We will install Tyk Pump with all dependencies stored locally.

We're installing on a `t2.micro` because this is a tutorial, you'll need more RAM and more cores for better performance.

This configuration should also work (with some tweaks) for CentOS.

### Prerequisites

We are assuming that Redis and either MongoDB or SQL are installed (these are installed as part of the Tyk Gateway and Dashboard installation guides)

### Step 1: Set up YUM Repositories

First, we need to install some software that allows us to use signed packages:
```bash
sudo yum install pygpgme yum-utils wget
```

Next, we need to set up the various repository configurations for Tyk and MongoDB:

Create a file named `/etc/yum.repos.d/tyk_tyk-pump.repo` that contains the repository configuration below: 

Make sure to replace `el` and `7` in the config below with your Linux distribution and version:
```bash
[tyk_tyk-pump]
name=tyk_tyk-pump
baseurl=https://packagecloud.io/tyk/tyk-pump/el/7/$basearch
repo_gpgcheck=1
gpgcheck=1
enabled=1
gpgkey=https://keyserver.tyk.io/tyk.io.rpm.signing.key.2020
       https://packagecloud.io/tyk/tyk-pump/gpgkey
sslverify=1
sslcacert=/etc/pki/tls/certs/ca-bundle.crt
metadata_expire=300
```

Finally we'll need to update our local cache, so run:
```bash
sudo yum -q makecache -y --disablerepo='*' --enablerepo='tyk_tyk-pump'
```

### Step 2: Install Packages

We're ready to go, you can now install the relevant packages using yum:
```bash
sudo yum install -y tyk-pump
```

**(You may be asked to accept the GPG key for our repos and when the package installs, hit yes to continue.)**

### Step 3: Configure Tyk Pump

If you don't complete this step, you won't see any analytics in your Dashboard, so to enable the analytics service, we need to ensure Tyk Pump is running and configured properly.

{{< tabs_start >}}
{{< tab_start "MongoDB" >}}
<br>
{{< note success >}}
**Note**

You need to replace `<hostname>` for `--redishost=<hostname>`, and `<Mongo IP Address>`, `<Mongo Port>` ` for `--mongo=mongodb://<Mongo IP Address>:<Mongo Port>/` with your own values to run this script.
{{< /note >}}

```bash
sudo /opt/tyk-pump/install/setup.sh --redishost=<hostname> --redisport=6379 --mongo=mongodb://<IP Address>:<Mongo Port>/tyk_analytics
```
{{< tab_end >}}
{{< tab_start "SQL" >}}
<br>
{{< note success >}}
**Note**

You need to replace `<hostname>` for `--redishost=<hostname>`, and `<Postgres Host Name>`,`<Port>`, `<User>`, `<Password>`, `<DB>` for `--postgres="host=<Postgres Host Name> port=<Port> user=<User> password=<Password> dbname=<DB>"` with your own values to run this script.
{{< /note >}}
```bash
sudo /opt/tyk-pump/install/setup.sh --redishost=<hostname> --redisport=6379 --postgres="host=<Postgres Host Name> port=<Port> user=<User> password=<Password> dbname=<DB>"
```
{{< tab_end >}}
{{< tabs_end >}}

### Step 4: Start Tyk Pump
```bash
sudo service tyk-pump start
```

That's it, the Pump should now be up and running.

You can verify if Tyk Pump is running and working by accessing the logs:
```bash
sudo journalctl -u tyk-pump
```


 [1]: https://packagecloud.io
 [2]: http://aws.amazon.com

{{< tab_end >}}
{{< tabs_end >}}