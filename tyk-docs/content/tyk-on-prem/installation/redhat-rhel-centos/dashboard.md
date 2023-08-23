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

This configuration should also work (with some tweaks) for CentOS.

### Prerequisites

*   Ensure port `3000` is open: This is used by the Dashboard to provide the GUI and the Classic Developer Portal
Follow the steps provided in this link [Getting started on Red Hat (RHEL / CentOS)]({{< ref "tyk-on-premises/redhat-rhel-centos.md" >}}) to install and configure Tyk dependencies.

### Step 1: Set up YUM Repositories

First, install two package management utilities `yum-utils`and a file downloading tool `wget`:
```bash
sudo yum install yum-utils wget
```
Then install Python:
```bash
sudo yum install python3
```

### Step 2: Configure and Install the Tyk Dashboard

Create a file named `/etc/yum.repos.d/tyk_tyk-dashboard.repo` that contains the repository configuration settings for YUM repositories `tyk_tyk-dashboard` and `tyk_tyk-dashboard-source` used to download packages from the specified URLs, including GPG key verification and SSL settings, on a Linux system.

Make sure to replace `el` and `8` in the config below with your Linux distribution and version:
```bash
[tyk_tyk-dashboard]
name=tyk_tyk-dashboard
baseurl=https://packagecloud.io/tyk/tyk-dashboard/el/8/$basearch
repo_gpgcheck=1
gpgcheck=0
enabled=1
gpgkey=https://packagecloud.io/tyk/tyk-dashboard/gpgkey
sslverify=1
sslcacert=/etc/pki/tls/certs/ca-bundle.crt
metadata_expire=300

[tyk_tyk-dashboard-source]
name=tyk_tyk-dashboard-source
baseurl=https://packagecloud.io/tyk/tyk-dashboard/el/8/SRPMS
repo_gpgcheck=1
gpgcheck=0
enabled=1
gpgkey=https://packagecloud.io/tyk/tyk-dashboard/gpgkey
sslverify=1
sslcacert=/etc/pki/tls/certs/ca-bundle.crt
metadata_expire=300
```

We'll need to update the YUM package manager's local cache, enabling only the `tyk_tyk-dashboard` repository while disabling all other repositories `--disablerepo='*' --enablerepo='tyk_tyk-dashboard'`, and confirms all prompts `-y`.
```bash
sudo yum -q makecache -y --disablerepo='*' --enablerepo='tyk_tyk-dashboard'
```

Install Tyk dashboard:
```bash
sudo yum install -y tyk-dashboard
```

### Step 3: Confirm Redis and MongoDB or PostgreSQL are running
Start Redis since it is always required by the Dashboard.
```bash
sudo service redis start
```
Then start either MongoDB or PostgreSQL depending on which one you are using.
```bash
sudo systemctl start mongod
```
```bash
sudo systemctl start postgresql-13
```
### Step 4: Configure Tyk Dashboard

We can set the Dashboard up with a similar setup command, the script below will get the Dashboard set up for the local instance.
Make sure to use the actual DNS hostname or the public IP of your instance as the last parameter.

{{< tabs_start >}}
{{< tab_start "MongoDB" >}}

```bash
sudo /opt/tyk-dashboard/install/setup.sh --listenport=3000 --redishost=<Redis Hostname> --redisport=6379 --mongo=mongodb://<Mongo IP Address>:<Mongo Port>/tyk_analytics --tyk_api_hostname=$HOSTNAME --tyk_node_hostname=http://localhost --tyk_node_port=8080 --portal_root=/portal --domain="XXX.XXX.XXX.XXX"
```

Replace `<Redis Hostname>`, `<Mongo IP Address>` and `<Mongo Port>` with your own values to run this script.

{{< tab_end >}}
{{< tab_start "SQL" >}}

```bash
sudo /opt/tyk-dashboard/install/setup.sh --listenport=3000 --redishost=<Redis Hostname> --redisport=6379 --storage=postgres --connection_string=postgresql://<User>:<Password>@<PostgreSQL Hostname>:<PostgreSQL Port>/<PostgreSQL DB> --tyk_api_hostname=$HOSTNAME --tyk_node_hostname=http://localhost --tyk_node_port=8080 --portal_root=/portal --domain="XXX.XXX.XXX.XXX"
```

Replace `<Redis Hostname>`,`<PostgreSQL Hostname>`,`<PostgreSQL Port>`, `<PostgreSQL User>`, `<PostgreSQL Password>` and `<PostgreSQL DB>` with your own values to run the script.

{{< tab_end >}}
{{< tabs_end >}}

With these values your are configuring the following:

*   `--listenport=3000`: Tyk Dashboard (and Portal) to listen on port `3000`.
*   `--redishost=<hostname>`: Tyk Dashboard should use the local Redis instance.
*   `--redisport=6379`: The Tyk Dashboard should use the default port.
*   `--domain="XXX.XXX.XXX.XXX"`: Bind the Dashboard to the IP or DNS hostname of this instance (required).
*   `--mongo=mongodb://<Mongo IP Address>:<Mongo Port>/tyk_analytics`: Use the local MongoDB (should always be the same as the Gateway).
*   `--storage=postgres`: In case, your preferred storage Database is PostgreSQL, use storage type "postgres" and specify connection string.
*   `--connection_string=postgresql://<User>:<Password>@<PostgreSQL Host Name>:<PostgreSQL Port>/<PostgreSQL DB>`: Use the PostgreSQL instance provided in the connection string (should always be the same as the gateway).
*   `--tyk_api_hostname=$HOSTNAME`: The Tyk Dashboard has no idea what hostname has been given to Tyk, so we need to tell it, in this instance we are just using the local HOSTNAME env variable, but you could set this to the public-hostname/IP of the instance.
*   `--tyk_node_hostname=http://localhost`: The Tyk Dashboard needs to see a Tyk node in order to create new tokens, so we need to tell it where we can find one, in this case, use the one installed locally.
*   `--tyk_node_port=8080`: Tell the Dashboard that the Tyk node it should communicate with is on port 8080.
*   `--portal_root=/portal`: We want the Portal to be shown on /portal of whichever domain we set for the Portal.

### Step 5: Start Tyk Dashboard
```bash
sudo service tyk-dashboard start
```
{{< note success >}}
**Note**  

To check the logs from the deployment run:
```bash
sudo journalctl -u tyk-dashboard 
```
{{< /note >}}

Notice how we haven't actually started the gateway yet, because this is a Dashboard install, we need to enter a license first.

{{< note success >}}
**Note**  

When using PostgreSQL you may receive the error: `"failed SASL auth (FATAL: password authentication failed for user...)"`, follow these steps to address the issue:
1. Open the terminal or command prompt on your PostgreSQL server.
2. Navigate to the location of the `pg_hba.conf` file. This file is typically located at `/var/lib/pgsql/13/data/pg_hba.conf`.
3. Open the `pg_hba.conf` file using a text manipulation tool.
4. In the  `pg_hba.conf` file, locate the entry corresponding to the user encountering the authentication error. This entry might resemble the following:
```bash
host    all    all    <IP_address>/<netmask>    scram-sha-256
```
5. In the entry, find the METHOD column. It currently has the value scram-sha-256.
6. Replace scram-sha-256 with md5, so the modified entry looks like this:
```bash
host    all    all    <IP_address>/<netmask>    md5
```
7. Save the changes you made to the `pg_hba.conf` file.
8. Restart the PostgreSQL service to apply the modifications:
```bash
sudo systemctl restart postgresql-13
```
 {{< /note >}}

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

{{< img src="/img/dashboard/system-management/bootstrap_screen.png" alt="Tyk Dashboard Bootstrap Screen" >}}

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

 [1]: https://packagecloud.io/tyk/tyk-dashboard/install#manual-rpm
{{< tab_end >}}
{{< tabs_end >}}
