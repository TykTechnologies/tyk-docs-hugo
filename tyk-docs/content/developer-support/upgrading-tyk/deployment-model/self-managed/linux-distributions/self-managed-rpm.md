---
title: "Upgrading On RedHat (CentOS) - RPM"
date: 2024-02-6
tags: ["Upgrade Go Plugins", "Tyk plugins", "RPM", "Self Managed"]
description: "Explains how to upgrade on Self Managed (RPM)"
---

The following guide explains how to upgrade Tyk Self-Managed running on RHL


## Upgrade guide video

Please refer to our [upgrade guide video](https://tyk-1.wistia.com/medias/p2c7gjzsk6) below for visual guidance of
upgrading Tyk Self-Managed (RPM).

<div>
<iframe src="https://fast.wistia.net/embed/iframe/p2c7gjzsk6" title="Wistia video player" allowfullscreen frameborder="0" scrolling="no" class="responsive-frame" name="wistia_embed" ></iframe>
</div>

---

## Preparations
After reviewing guidelines for [preparing for upgrade]({{< ref "developer-support/upgrading-tyk/preparations/upgrade-guidelines" >}}),
follow the instructions below to upgrade your Tyk components and plugins.

**Upgrade order:**
Please note that upgrade order is as explained in the upgrade [overview]({{< ref "developer-support/upgrading-tyk/deployment-model/self-managed/overview" >}})


## Distro versions

Tyk supports the following Centos and Rhel distributions:

| Distribution | Version |
|--------------|---------|
| Centos       | 7       |
| Rhel         | 9       |
| Rhel         | 8       |
| Rhel         | 7       |

Our repositories will be updated at https://packagecloud.io/tyk when new versions are released.

During the initial deployment of Tyk, your team may have utilised YUM repositories or directly downloaded the .rpm files. To verify the presence of YUM repositories on the server, inspect the following locations:

- Dashboard: `/etc/yum.repos.d/tyk_tyk-dashboard.repo`
- Gateway: `/etc/yum.repos.d/tyk_tyk-gateway.repo`
- Pump: `/etc/yum.repos.d/tyk_tyk-pump.repo`

If the above files are not present, it is worthwhile checking internally that the initial deployment was done by manually downloading and installing the .rpm files. This is common in airtight environments without internet access.

### Verify Target Package Availability

Depending on the Linux distribution that you are using, ensure that you are pulling the correct version and distribution from the [packagecloud.io/tyk](https://packagecloud.io/tyk) repository.

The package name contains the version number and the distro/version column displays the specific distribution release.

{{< img src="/img/upgrade-guides/rpm_packages.png" 
    alt="Package names" >}}

## Backups

Before upgrading, ensure that the configuration files and databases are backed up.

### Configuration files

Please take a backup of the following configuration files for each Tyk component. This will be useful in case you need to cross reference configuration changes or need to rollback your deployment. 

- Dashboard Configuration File: `/opt/tyk-dashboard/tyk_analytics.conf`
- Gateway Configuration File: `/opt/tyk-gateway/tyk.conf`
- Pump Configuration File: `/opt/tyk-pump/pump.conf`

### Databases

{{< note >}}
**Note** 
Redis and MongoDB are not Tyk products and what we provide here are basic backup and restore instructions. It is advisable to consult the official documentation for Redis and MongoDB on backups.
{{< /note >}}

#### Redis
For more detailed instructions on managing Redis backups, please refer to the official Redis documentation:
https://redis.io/docs/management/persistence/

The Redis SAVE command is used to create a backup of the current Redis database. The SAVE command performs a synchronous save of the dataset producing a point in time snapshot of all the data inside the Redis instance, in the form of an RDB file.

```bash
# Using SAVE, if the previous dump.rdb file exists in the working directory, it will be overwritten with the new snapshot

SAVE
```

##### Example
{{< img src="/img/upgrade-guides/redis_save.png" 
    alt="Redis SAVE example" width="600" height="auto">}}

To restore Redis data, follow these steps:

- Move the Redis backup file (dump.rdb) to your Redis directory.
- Start the Redis server

To locate your Redis directory, you can use the CONFIG command. Specifically, the CONFIG GET command allows you to read the configuration parameters of a running Redis server.
Example:
{{< img src="/img/upgrade-guides/redis_config.png" 
    alt="Redis CONFIG example" width="600" height="auto">}}

#### MongoDB
For detailed instructions on performing backups in MongoDB, please refer to the official MongoDB documentation:
https://www.mongodb.com/docs/manual/core/backups/

To capture a snapshot of a MongoDB database from a remote machine and store it locally, utilise the mongodump command on the primary node. Specify the host and port number (default is 27017) of the remote server, along with additional parameters such as the database name, user credentials and password. Lastly, designate the directory where the snapshot should be created.

```bash
mongodump --db tyk_analytics --out /path/to/dump/directory
```

##### Example
{{< img src="/img/upgrade-guides/mongo_dump.png" 
    alt="Mongo DUMP example" height="600">}}

To restore a database using a previously saved snapshot, simply employ the mongorestore command.

```bash
mongorestore --host <hostname> --port <port> --username <username> --password <password> /path/to/dump/directory
```

## Upgrade Tyk Packages

Before executing the upgrade, ensure that you have consulted and performed all the necessary steps in the [pre upgrade checklist]({{< ref "developer-support/upgrading-tyk/preparations/upgrade-guidelines" >}}).

### 1. Update Tyk Repositories

Fetch and update information about the available packages from the specified repositories. 

```bash
sudo yum -q makecache -y --disablerepo='*' --enablerepo='tyk_tyk-dashboard'
sudo yum -q makecache -y --disablerepo='*' --enablerepo='tyk_tyk-gateway'
sudo yum -q makecache -y --disablerepo='*' --enablerepo='tyk_tyk-pump'

Or
# To update ALL repositories in your system instead

sudo yum -q makecache -y
```

### 2. Verify availability of target upgrade packages

List current versions of Tyk using the command below:

```bash
rpm -qa | grep -i tyk
```

#### Example
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

### 3. Upgrade Tyk Components

**Note:** Please specify the exact version you are upgrading into.

```bash
yum update tyk-dashboard-<desired-version>
yum update tyk-gateway-<desired-version>
yum update tyk-pump-<desired-version>
```

#### Example
{{< img src="/img/upgrade-guides/yum_update.png" 
    alt="Update example" height="600" width="auto" >}}

### 4. Restart Tyk Components

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

### 5. Health check on upgraded Tyk components

Perform a health check on all 3 Tyk Components. The host and port number varies on your setup.

#### Tyk Dashboard
```curl
curl http://localhost:3000/hello
```

#### Tyk Gateway
```curl
curl http://localhost:8080/hello
```

#### Tyk Pump
```curl
curl http://localhost:8083/health
```

## Revert upgrade

If the upgrade fails you can revert to the old version by following the steps below.

### 1. Inspect package logs

Use the command below to fetch information for all updates, noting the ID for the specific “update” action to revert to allow verifiying the packages:

```bash
yum history
```

### 2. Verify update

Display details of the specific "update" transaction, replacing ID noted in the previous step

```bash
yum history info <ID>
```

#### Example
{{< img src="/img/upgrade-guides/yum_history.png" 
    alt="Update example" height="600" width="auto" >}}

### 3. Revert

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
