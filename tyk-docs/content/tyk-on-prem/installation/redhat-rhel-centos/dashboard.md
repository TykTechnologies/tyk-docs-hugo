---
date: 2017-03-22T16:32:53Z
Title: Dashboard on Red Hat (RHEL) / CentOS
tags: ["Tyk Dashboard", "Self Managed", "Installation", "Red Hat", "CentOS"]
description: "How to install the Tyk Dashboard as part of the Tyk Stack on Red Hat or CentOS using Ansible or shell scripts"
menu:
  main:
    parent: "Red Hat (RHEL / CentOS) "
weight: 1 
aliases:
  - /get-started/with-tyk-on-premise/installation/redhat-rhel-centos/dashboard/
  - /getting-started/installation/with-tyk-on-premises/redhat-rhel-centos/dashboard/
---
{{< tabs_start >}}
{{< tab_start "Ansible" >}}
<br />
{{< note >}}
**Requirements**

[Ansible](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html) is required to run the following commands. Instructions on how install Tyk Dashboard with shell is in the <b>Shell</b> tab.
{{< /note >}}

## Getting Started
1. clone the [tyk-ansible](https://github.com/TykTechnologies/tyk-ansible) repository

```bash
$ git clone https://github.com/TykTechnologies/tyk-ansible
```

2. `cd` into the directory
```.bash
$ cd tyk-ansible
```

3. Run initialisation script to initialise environment

```bash
$ sh scripts/init.sh
```

4. Modify `hosts.yml` file to update ssh variables to your server(s). You can learn more about the hosts file [here](https://docs.ansible.com/ansible/latest/user_guide/intro_inventory.html)

5. Run ansible-playbook to install `tyk-dashboard`

```bash
$ ansible-playbook playbook.yaml -t tyk-dashboard
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
| dash.license | | Dashboard license|
| dash.service.host | | Dashboard server host if different than the hosts url |
| dash.service.port | `3000` | Dashboard server listening port |
| dash.service.proto | `http` | Dashboard server protocol |
| dash.service.tls | `false` | Set to `true` to enable SSL connections |

{{< tab_end >}}
{{< tab_start "Shell" >}}
## Install Tyk Dashboard on Red Hat

Tyk has its own signed RPMs in a YUM repository hosted by the kind folks at [packagecloud.io][1], which makes it easy, safe and secure to install a trusted distribution of the Tyk Gateway stack.

This tutorial will run on an [Amazon AWS][2] **Red Hat Enterprise Linux 7.1** instance. We will install the Tyk Dashboard with all dependencies stored locally.

We're installing on a `t2.micro` because this is a tutorial, you'll need more RAM and more cores for better performance.

This configuration should also work (with some tweaks) for CentOS.

### Prerequisites

*   Ensure port `3000` is open: This is used by the Dashboard to provide the GUI and the Developer Portal
*   EPEL (Extra Packages for Enterprise Linux) is a free, community based repository project from Fedora which provides high quality add-on software packages for Linux distribution including RHEL, CentOS, and Scientific Linux. EPEL isn't a part of RHEL/CentOS but it is designed for major Linux distributions. In our case we need it for Redis DB. Install EPEL using the instructions [here][3].
*   Install Redis DB using EPEL
*   Tyk requires Python 3.4. Install via the following command:

```bash
sudo yum install python34
```

### Step 1: Set up YUM Repositories

First, we need to install some software that allows us to use signed packages:
```bash
sudo yum install yum-utils wget
```


Next, we need to set up the various repository configurations for Tyk Dashboard, MongoDB and PostgreSQL:

### Step 2: Configure and Install the Tyk Dashboard

Create a file named `/etc/yum.repos.d/tyk_tyk-dashboard.repo` that contains the repository configuration below. https://packagecloud.io/tyk/tyk-dashboard/install#manual-rpm
```bash
[tyk_tyk-dashboard]
name=tyk_tyk-dashboard
baseurl=https://packagecloud.io/tyk/tyk-dashboard/el/7/$basearch
repo_gpgcheck=1
gpgcheck=1
enabled=1
gpgkey=https://keyserver.tyk.io/tyk.io.rpm.signing.key.2020
       https://packagecloud.io/tyk/tyk-dashboard/gpgkey
sslverify=1
sslcacert=/etc/pki/tls/certs/ca-bundle.crt
metadata_expire=300
```

We'll need to update our local cache, so run:
```bash
sudo yum -q makecache -y --disablerepo='*' --enablerepo='tyk_tyk-dashboard'
```

Finally, install Tyk dashboard and Redis.
```bash
sudo yum install -y tyk-dashboard redis
```
### Step 3: Start MongoDB, PostgreSQL and Redis

In many cases MongoDB/SQL or Redis might not be running. start redis:
```bash
sudo service redis start
```
**check [Getting started on Red Hat (RHEL / CentOS)]({{< ref "/content/tyk-on-premises/redhat-rhel-centos.md" >}}) on how to start MongoDB or PostgreSQL**
### Step 4: Configure Tyk Dashboard

We can set the Dashboard up with a similar setup command, the script below will get the Dashboard set up for the local instance.
Make sure to use the actual DNS hostname or the public IP of your instance as the last parameter.

{{< tabs_start >}}
{{< tab_start "MongoDB" >}}

```bash
sudo /opt/tyk-dashboard/install/setup.sh --listenport=3000 --redishost=<hostname> --redisport=6379 --mongo=mongodb://<Mongo IP Address>:<Mongo Port>/tyk_analytics --tyk_api_hostname=$HOSTNAME --tyk_node_hostname=http://localhost --tyk_node_port=8080 --portal_root=/portal --domain="XXX.XXX.XXX.XXX"
```

You need to replace `<hostname>` for `--redishost=<hostname>`, and `<Mongo IP Address>`, `<Mongo Port>` for `--mongo=mongodb://<Mongo IP Address>:<Mongo Port>/` with your own values to run this script.

{{< tab_end >}}
{{< tab_start "SQL" >}}

```bash
sudo /opt/tyk-dashboard/install/setup.sh --listenport=3000 --redishost=<hostname> --redisport=6379 --storage=postgres --connection_string="host=<Postgres Host Name> port=<Port> user=<User> password=<Password> dbname=<DB>" --tyk_api_hostname=$HOSTNAME --tyk_node_hostname=http://localhost --tyk_node_port=8080 --portal_root=/portal --domain="XXX.XXX.XXX.XXX"
```

You need to replace `<hostname>` for `--redishost=<hostname>`, and `<Postgres Host Name>`,`<Port>`, `<User>`, `<Password>`, `<DB>` for `--postgres="host=<Postgres Host Name> port=<Port> user=<User> password=<Password> dbname=<DB>"` with your own values to run this script.

{{< tab_end >}}
{{< tabs_end >}}

What we have done here is:

*   `--listenport=3000`: Told Tyk Dashboard (and Portal) to listen on port 3000.
*   `--redishost=<hostname>`: Tyk Dashboard should use the local Redis instance.
*   `--redisport=6379`: The Tyk Dashboard should use the default port.
*   `--domain="XXX.XXX.XXX.XXX"`: Bind the Dashboard to the IP or DNS hostname of this instance (required).
*   `--mongo=mongodb://<Mongo IP Address>:<Mongo Port>/tyk_analytics`: Use the local MongoDB (should always be the same as the Gateway).
*   `--storage=postgres`: In case, your preferred storage Database is postgres, use storage type postgres and specify connection string.
*   `--connection_string="host=<Postgres Host Name> port=<Port> user=<User> password=<Password> dbname=<DB>"`: Use the postgres instance provided in the connection string(should always be the same as the gateway).
*   `--tyk_api_hostname=$HOSTNAME`: The Tyk Dashboard has no idea what hostname has been given to Tyk, so we need to tell it, in this instance we are just using the local HOSTNAME env variable, but you could set this to the public-hostname/IP of the instance.
*   `--tyk_node_hostname=http://localhost`: The Tyk Dashboard needs to see a Tyk node in order to create new tokens, so we need to tell it where we can find one, in this case, use the one installed locally.
*   `--tyk_node_port=8080`: Tell the Dashboard that the Tyk node it should communicate with is on port 8080.
*   `--portal_root=/portal`: We want the Portal to be shown on /portal of whichever domain we set for the Portal.

### Step 5: Start Tyk Dashboard
```bash
sudo service tyk-dashboard start
```


Notice how we haven't actually started the gateway yet, because this is a Dashboard install, we need to enter a license first.

### Step 6: Enter Dashboard license

Add your license in `/var/opt/tyk-dashboard/tyk_analytics.conf` in the `license` field.

If all is going well, you will be taken to a Dashboard setup screen - we'll get to that soon.

### Step 7: Restart the Dashboard process

Because we've just entered a license via the UI, we need to make sure that these changes get picked up, so to make sure things run smoothly, we restart the Dashboard process (you only need to do this once) and (if you have it installed) then start the gateway:
```bash
sudo service tyk-dashboard restart 
```

### Step 8 - Go to the Tyk Dashboard URL

Go to:

```{copy.Wrapper}
127.0.0.1:3000
```

You should get to the Tyk Dashboard Setup screen:

![Tyk Dashboard Bootstrap Screen](/img/dashboard/system-management/bootstrap_screen.png)

### Step 9 - Create your Organisation and Default User

You need to enter the following:

* Your **Organisation Name**
* Your **Organisation Slug**
* Your User **Email Address**
* Your User **First and Last Name**
* A **Password** for your User
* **Re-enter** your user **Password**


{{< note success >}}
**Note**  

For a password, we recommend a combination of alphanumeric characters, with both upper and lower case letters.
{{< /note >}}


Click **Bootstrap** to save the details.

### Step 10 - Login to the Dashboard

You can now log in to the Tyk Dashboard from `127.0.0.1:3000`, using the username and password created in the Dashboard Setup screen.

## Configure your Developer Portal

To set up your [Developer Portal]({{< ref "/content/tyk-developer-portal.md" >}}) follow our Self-Managed [tutorial on publishing an API to the Portal Catalogue]({{< ref "/content/getting-started/tutorials/publish-api.md" >}}).

 [1]: https://packagecloud.io
 [2]: http://aws.amazon.com
 [3]: http://fedoraproject.org/wiki/EPEL#How_can_I_use_these_extra_packages.3F
{{< tab_end >}}
{{< tabs_end >}}
