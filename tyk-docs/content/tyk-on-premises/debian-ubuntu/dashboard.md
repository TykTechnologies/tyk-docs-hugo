---
date: 2017-03-22T16:08:31Z
Title: Dashboard on Ubuntu
tags: ["Tyk Dashboard", "Self-Managed", "Installation", "Ubuntu", "Debian"]
description: "How to install the Tyk Dashboard as part of the Tyk Stack on Ubuntu or Debian using Ansible or shell scripts"
menu:
  main:
    parent: "Debian / Ubuntu "
weight: 1
aliases:
  - /getting-started/installation/with-tyk-on-premises/on-ubuntu/dashboard/
  - /getting-started/installation/with-tyk-on-premises/debian-ubuntu/dashboard/
---
{{< tabs_start >}}
{{< tab_start "Ansible" >}}
<br />
{{< note >}}
**Requirements**

[Ansible](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html) is required to run the following commands. Instructions on how install Tyk Dashboard with shell is in the <b>Shell</b> tab.
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
| Debian | 10 | ✅ |
| Debian | 9 | ✅ |
| Ubuntu | 21 | ✅ |
| Ubuntu | 20 | ✅ |
| Ubuntu | 18 | ✅ |
| Ubuntu | 16 | ✅ |

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
## <a name="install-tyk-dashboard-ubuntu"></a>Install Tyk Dashboard on Ubuntu

Tyk has its own APT repositories hosted by the kind folks at [packagecloud.io][1], which makes it easy, safe and secure to install a trusted distribution of the Tyk Gateway stack.

This tutorial has been tested on Ubuntu 16.04 & 18.04 with few if any modifications. We will install the Tyk Dashboard with all dependencies locally.

### Prerequisites

- Have MongoDB/SQL and Redis installed - see [here][2] for details.
- Ensure port `3000` is available. This is used by the Tyk Dashboard to provide the GUI and the Developer Portal.

### Step 1: Set up our APT Repositories

First, add our GPG key which signs our binaries:

```bash
curl -L https://packagecloud.io/tyk/tyk-dashboard/gpgkey | sudo apt-key add -
```

Run update:

```bash
sudo apt-get update
```

Since our repositories are installed via HTTPS, you will need to make sure APT supports this:

```bash
sudo apt-get install -y apt-transport-https
```

Now lets add the required repos and update again (notice the `-a` flag in the second Tyk commands - this is important!):

```bash
echo "deb https://packagecloud.io/tyk/tyk-dashboard/ubuntu/ bionic main" | sudo tee /etc/apt/sources.list.d/tyk_tyk-dashboard.list

echo "deb-src https://packagecloud.io/tyk/tyk-dashboard/ubuntu/ bionic main" | sudo tee -a /etc/apt/sources.list.d/tyk_tyk-dashboard.list

sudo apt-get update
```

{{< note success >}}

**Note**  



`bionic` is the code name for Ubuntu 18.04. Please substitute it with your particular [ubuntu release](https://wiki.ubuntu.com/Releases), e.g. `focal`.

{{< /note >}}

**What we've done here is:**

- Added the Tyk Dashboard repository
- Updated our package list

### Step 2: Install the Tyk Dashboard

We're now ready to install the Tyk Dashboard. To install run:

```bash
sudo apt-get install -y tyk-dashboard
```

What we've done here is instructed `apt-get` to install the Tyk Dashboard without prompting. Wait for the downloads to complete.

When the Tyk Dashboard has finished installing, it will have installed some `init` scripts, but it will not be running yet. The next step will be to setup each application - thankfully this can be done with three very simple commands.

#### Verify the origin key (optional)

Debian packages are signed with the repository keys. These keys are verified at the time of fetching the package and is taken care of by the `apt` infrastructure. These keys are controlled by PackageCloud, our repository provider. For an additional guarantee, it is possible to verify that the package was indeed created by Tyk by verifying the `origin` certificate that is attached to the package.

First, you have to fetch Tyk's signing key and import it.

```bash
wget https://keyserver.tyk.io/tyk.io.deb.signing.key
gpg --import tyk.io.deb.signing.key
```

Then, you have to either,
- sign the key with your ultimately trusted key
- trust this key ultimately

The downloaded package will be available in `/var/cache/apt/archives`. Assuming you found the file `tyk-gateway-2.9.4_amd64.deb` there, you can verify the origin signature.

```bash
gpg --verify d.deb
gpg: Signature made Wed 04 Mar 2020 03:05:00 IST
gpg:                using RSA key F3781522A858A2C43D3BC997CA041CD1466FA2F8
gpg: Good signature from "Team Tyk (package signing) <team@tyk.io>" [ultimate]
```

## Configure Tyk Dashboard
{{< tabs_start >}}
{{< tab_start "MongoDB" >}}
### Prerequisites

You need to ensure the MongoDB and Redis services are running before proceeding.

{{< note success >}}
**Note**  

You need to replace `<hostname>` for `--redishost=<hostname>`, and `<IP Address>` for `--mongo=mongodb://<IP Address>/` with your own values to run this script.
{{< /note >}}


You can set your Tyk Dashboard up with a helper setup command script. This will get the Dashboard set up for the local instance:

```bash
sudo /opt/tyk-dashboard/install/setup.sh --listenport=3000 --redishost=<hostname> --redisport=6379 --mongo=mongodb://<IP Address>/tyk_analytics --tyk_api_hostname=$HOSTNAME --tyk_node_hostname=http://localhost --tyk_node_port=8080 --portal_root=/portal --domain="XXX.XXX.XXX.XXX"
```

{{< note success >}}
**Note**  

Make sure to use the actual DNS hostname or the public IP of your instance as the last parameter.
{{< /note >}}


What we have done here is:

- `--listenport=3000`: Told the Tyk Dashboard (and Portal) to listen on port 3000.
- `--redishost=<hostname>`: The Tyk Dashboard should use the local Redis instance.
- `--redisport=6379`: The Tyk Dashboard should use the default port.
- `--domain="XXX.XXX.XXX.XXX"`: Bind the Tyk Dashboard to the IP or DNS hostname of this instance (required).
- `--mongo=mongodb://<IP Address>/tyk_analytics`: Use the local MongoDB (should always be the same as the gateway).
- `--tyk_api_hostname=$HOSTNAME`: The Tyk Dashboard has no idea what hostname has been given to Tyk, so we need to tell it, in this instance we are just using the local HOSTNAME env variable, but you could set this to the public-hostname/IP of the instance.
- `--tyk_node_hostname=http://localhost`: The Tyk Dashboard needs to see a Tyk node in order to create new tokens, so we need to tell it where we can find one, in this case, use the one installed locally.
- `--tyk_node_port=8080`: Tell the Tyk Dashboard that the Tyk node it should communicate with is on port 8080.
- `--portal_root=/portal`: We want the portal to be shown on `/portal` of whichever domain we set for the portal.
{{< tab_end >}}
{{< tab_start "SQL" >}}
### Prerequisites

You need to ensure the PostgreSQL and Redis services are running before proceeding.

{{< note success >}}
**Note**  

You need to replace `<hostname>` for `--redishost=<hostname>`, and `<Postgres Host Name>`, `<Port>`, `<User>`, `<Password>`, `<DB>` for `--connection_string="host=<Postgres Host Name> port=<Port> user=<User> password=<Password> dbname=<DB>"` with your own values to run this script.
{{< /note >}}


You can set the Tyk Dashboard up with a helper setup command script. This will get the Dashboard set up for the local instance:

```bash
sudo /opt/tyk-dashboard/install/setup.sh --listenport=3000 --redishost=<hostname> --redisport=6379 --storage=postgres --connection_string="host=<Postgres Host Name> port=<Port> user=<User> password=<Password> dbname=<DB>" --tyk_api_hostname=$HOSTNAME --tyk_node_hostname=http://localhost --tyk_node_port=8080 --portal_root=/portal --domain="XXX.XXX.XXX.XXX"
```

{{< note success >}}
**Note**  

Make sure to use the actual DNS hostname or the public IP of your instance as the last parameter.
{{< /note >}}


What we have done here is:

- `--listenport=3000`: Told the Tyk Dashboard (and Portal) to listen on port 3000.
- `--redishost=<hostname>`: The Tyk Dashboard should use the local Redis instance.
- `--redisport=6379`: The Tyk Dashboard should use the default port.
- `--domain="XXX.XXX.XXX.XXX"`: Bind the dashboard to the IP or DNS hostname of this instance (required).
- `--storage=postgres`: Use storage type postgres.
- `--connection_string="host=<Postgres Host Name> port=<Port> user=<User> password=<Password> dbname=<DB>"`: Use the postgres instance provided in the connection string(should always be the same as the gateway).
- `--tyk_api_hostname=$HOSTNAME`: The Tyk Dashboard has no idea what hostname has been given to Tyk, so we need to tell it, in this instance we are just using the local HOSTNAME env variable, but you could set this to the public-hostname/IP of the instance.
- `--tyk_node_hostname=http://localhost`: The Tyk Dashboard needs to see a Tyk node in order to create new tokens, so we need to tell it where we can find one, in this case, use the one installed locally.
- `--tyk_node_port=8080`: Tell the dashboard that the Tyk node it should communicate with is on port 8080.
- `--portal_root=/portal`: We want the portal to be shown on `/portal` of whichever domain we set for the portal.
{{< tab_end >}}
{{< tabs_end >}}


### Step 1: Enter your Tyk Dashboard License

Add your license in `/opt/tyk-dashboard/tyk_analytics.conf` in the `license` field.

### Step 2: Start the Tyk Dashboard

Start the dashboard service, and ensure it will start automatically on system boot.

```bash
sudo systemctl start tyk-dashboard
sudo systemctl enable tyk-dashboard
```

### Step 3: Install your Tyk Gateway

Follow the [Gateway installation instructions]({{< ref "tyk-on-premises/debian-ubuntu/gateway" >}}) to connect to your Dashboard instance before you continue on to step 4.

### Step 4: Bootstrap the Tyk Dashboard with an initial User and Organization

Go to:

```bash
127.0.0.1:3000
```

You should get to the Tyk Dashboard Setup screen:

{{< img src="/img/dashboard/system-management/bootstrap_screen.png" alt="Tyk Dashboard Bootstrap Screen" >}}

### Step 5 - Create your Organization and Default User

You need to enter the following:

- Your **Organization Name**
- Your **Organization Slug**
- Your User **Email Address**
- Your User **First and Last Name**
- A **Password** for your User
- **Re-enter** your user **Password**

{{< note success >}}
**Note**  

For a password, we recommend a combination of alphanumeric characters, with both upper and lower case
letters.
{{< /note >}}

Click **Bootstrap** to save the details.

### Step 6 - Login to the Tyk Dashboard

You can now log in to the Tyk Dashboard from `127.0.0.1:3000`, using the username and password created in the Dashboard Setup screen.

## Configure your Developer Portal

To set up your [Developer Portal]({{< ref "/content/tyk-developer-portal.md" >}}) follow our Self-Managed [tutorial on publishing an API to the Portal Catalog]({{< ref "/content/getting-started/tutorials/publish-api.md" >}}).

[1]: https://packagecloud.io/tyk
[2]: /getting-started/installation/with-tyk-on-premises/on-ubuntu


{{< tab_end >}}
{{< tabs_end >}}
