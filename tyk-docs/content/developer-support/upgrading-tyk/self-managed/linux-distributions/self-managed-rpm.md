---
title: "Upgrading Go Plugins On Self Managed - RPM"
date: 2024-02-6
tags: ["Upgrade Go Plugins", "Tyk plugins", "RPM", "Self Managed"]
description: "Explains how to upgrade Go Plugins on Self Managed (RPM)"
---

## Upgrading Custom Go Plugins

Refer to the table below for your current version followed by the target version you are upgrading into and follow the path accordingly.

| Path | Current Version | Target Version |
|------|-----------------|----------------|
| 1    | < 4.1.0         | < 4.1.0        |
| 2    | < 4.1.0         | >= 5.1.0       |
| 3    | >= 4.1.0        | >= 5.2.5       |

- Navigate into the plugins directory where your Go module exist
- Update accordingly based on which version of Tyk you are upgrading into

Example:
You are currently on version 4.0.8 and upgrading to 5.2.5, you would refer to “C”

## Initialise plugin for Gateway versions earlier then 4.2.0
**Path 1** all versions before 4.2.0

```
go get 
github.com/TykTechnologies/tyk@6c76e802a29838d058588ff924358706a078d0c5

# Tyk Gateway versions < 4.2 have a dependency on graphql-go-tools
go mod edit -replace github.com/jensneuse/graphql-go-tools=github.com/TykTechnologies/graphql-go-tools@v1.6.2-0.20220426094453-0cc35471c1ca

go mod tidy
go mod vendor
```

## Initialise plugin for Gateway versions earlier than 5.1.0
**Path 2** between Tyk 4.2.0 to 5.1.0

```
go get github.com/TykTechnologies/tyk@54e1072a6a9918e29606edf6b60def437b273d0a

# For Gateway versions earlier than 5.1 using the go mod vendor tool is required
go mod tidy
go mod vendor
```

## Initialise plugin for Gateway v5.1 and above
**Path 3** Tyk version 5.1 and above

```
go get github.com/TykTechnologies/tyk@ffa83a27d3bf793aa27e5f6e4c7106106286699d

# In Gateway version 5.1, the Gateway and plugins transitioned to using Go modules builds and don’t use Go mod vendor anymore
go mod tidy
```

Download the plugin compiler for the target version you’re upgrading to (e.g. 5.2.5).  See the Tyk Docker Hub repo https://hub.docker.com/r/tykio/tyk-plugin-compiler/tags for available versions. 

```
docker pull tykio/tyk-plugin-compiler:v5.2.5

# Once done with all upgrades you can remove the images
docker rmi image_name_or_id
```

Recompile your plugin with this version
```
docker run --rm -v `pwd`:/plugin-source \
           --platform=linux/amd64 \
           tykio/tyk-plugin-compiler:v5.2.5 plugin.so
```
Example:
{{< img src="/img/upgrade-guides/recompile_plugin.png" 
    alt="Recompile plugin example" width="600" height="auto">}}

### Using Bundles to ship your plugins

Create or update your plugin bundle in your manifest.json file that includes both your current version’s plugin along with the newly compiled version, your manifest.json will look something like this:
```
{
 "file_list": [
    "plugin.so",
    "plugin_v5.2.5_linux_amd64.so"
  ],
  "custom_middleware": {
  "post": [
  {
    "name": "AddFooBarHeader",
  "path": "plugin.so",
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
In this example, the **plugin.so** in the file list would be the filename of your current version’s plugin. You will already have this on hand as this is what has been running in your environment.

**plugin_v5.2.5_linux_amd64.so** is the plugin compiled for the target version.  The “_v5.2.5_linux_amd64” is generated automatically by the compiler. 

If your target version was 5.2.0, then “_v5.2.0_linux_amd64” would be appended to the shared object file output by the compiler instead.

### Build the bundle

Using Tyk’s inbuilt bundle cli command to create a .zip file
```
/opt/tyk-gateway/tyk bundle build -m manifest.json -o plugin.zip -y
```
Example:
{{< img src="/img/upgrade-guides/bundle_zip.png" 
    alt="Bundle ZIP example" width="800">}}

Upload the bundle ID in you Dashboard GUI under API settings - Advanced Options

Example:
{{< img src="/img/upgrade-guides/plugin_example.png" 
    alt="Plugin example" width="800">}}

At this stage, even if you are still running on Tyk version 4.0.8, Tyk is smart enough to know which plugin to use within your manifest.json.

Follow the steps below to upgrade your deployment to Tyk 5.2.5 and test your plugin when making the call, it should automatically use the newer version of plugin which is **plugin_v5.2.5_linux_amd64.so**

## Upgrading Tyk Components

In a production environment, where we recommend installing the Dashboard, Gateway and Pump on separate machines, you should upgrade components in the following sequence:

1. Tyk Dashboard
2. Tyk Gateway
3. Tyk Pump

Please ensure that you have considered whether you will be using a blue-green or rolling update strategy and have consulted the [pre-upgrade checks]({{< ref "developer-support/upgrading-tyk/upgrade-prerequisites" >}}) before performing the upgrade.

Our repositories will be updated at https://packagecloud.io/tyk when new versions are released.

## Upgrade Strategy

#### Rolling Upgrade
Rather than updating all servers simultaneously, the organisation will install the updated software package on one server or subset of servers at a time. A rolling deployment helps reduce application downtime and prevent unforeseen consequences or errors in software updates.


For this strategy, it is important to have redundancy by deploying two instances of each Tyk component that needs upgrading. A load balancer should be used to distribute traffic for the Dashboard and Gateway components, ensuring seamless availability during the upgrade process. Pump, however, operates with one-way traffic and doesn't require load balancing.

Ensure the load balancer directs traffic to one instance while the other is undergoing an upgrade process. Then, switch the traffic to the upgraded instance while the other is being upgraded. Once both instances have been successfully upgraded, the load balancer can route traffic to both instances simultaneously.

#### Blue-Green Upgrade
In a typical blue-green deployment, there are two identical production environments, labelled blue and green. At any given time, only one of these environments is live and serving traffic, while the other environment is inactive. For example, if the blue environment is live, the green environment will be inactive, and vice versa.

For this strategy, you will need to replicate the entire environment onto a separate environment. The load balancer or DNS will route traffic to the green environment which is the current production environment while the blue environment will go through the upgrade process. A VM snapshot is a good way to replicate the environment but you may use other methods such as a new deployment process or the blue environment. If the latter is your choice, you may skip this manual and follow the deployment instructions on our documentation - https://tyk.io/docs

## Operating System

Tyk supports the following distributions:

| Distribution | Version |
|--------------|---------|
| Centos       | 7       |
| Rhel         | 9       |
| Rhel         | 8       |
| Rhel         | 7       |

During the initial deployment of Tyk, your team may have utilised YUM repositories or directly downloaded the .rpm files. To verify the presence of YUM repositories on the server, inspect the following locations:

- Dashboard: /etc/yum.repos.d/tyk_tyk-dashboard.repo
- Gateway: /etc/yum.repos.d/tyk_tyk-gateway.repo
- Pump: /etc/yum.repos.d/tyk_tyk-pump.repo"

If the above files are not present, it is worthwhile checking internally that the initial deployment was done by manually downloading and installing the .rpm files. This is common in airtight environments without internet access.

#### Target Package Version

Depending on the Linux distribution that you are using, ensure that you are pulling the correct version and distribution. 

The package name contains the version number and the distro/version column shows the specific OS and version.

{{< img src="/img/upgrade-guides/rpm_packages.png" 
    alt="Package names" >}}

## Backup

Before upgrading, ensure that the configuration files and databases are backed up.

#### Configuration files

Please take a backup of the following configuration files for each Tyk component. This will be useful in case you need to cross reference configuration changes or need to rollback your deployment. 

- Dashboard Configuration File: /opt/tyk-dashboard/tyk_analytics.conf
- Gateway Configuration File: /opt/tyk-gateway/tyk.conf
- Pump Configuration File: /opt/tyk-pump/pump.conf

#### Databases

Redis and MongoDB are not Tyk products and what we provide here are basic backup and restore instructions. It is advisable to consult the official documentation for Redis and MongoDB on backups.

##### Redis
https://redis.io/docs/management/persistence/

The Redis SAVE command is used to create a backup of the current Redis database. The SAVE command performs a synchronous save of the dataset producing a point in time snapshot of all the data inside the Redis instance, in the form of an RDB file.

```bash
# Using SAVE, if the previous dump.rdb file exists in the working directory, it will be overwritten with the new snapshot

SAVE
```

Example:
{{< img src="/img/upgrade-guides/redis_save.png" 
    alt="Redis SAVE example" width="600" height="auto">}}

To restore Redis data, follow these steps:

- Move the Redis backup file (dump.rdb) to your Redis directory.
- Start the Redis server

To locate your Redis directory, you can use the CONFIG command. Specifically, the CONFIG GET command allows you to read the configuration parameters of a running Redis server.
Example:
{{< img src="/img/upgrade-guides/redis_config.png" 
    alt="Redis CONFIG example" width="600" height="auto">}}

##### MongoDB
https://www.mongodb.com/docs/manual/core/backups/

To capture a snapshot of a MongoDB database from a remote machine and store it locally, utilise the mongodump command on the primary node. Specify the host and port number (default is 27017) of the remote server, along with additional parameters such as the database name, user credentials, and password. Lastly, designate the directory where the snapshot should be created.

```bash
mongodump --db tyk_analytics --out /path/to/dump/directory
```

Example:
{{< img src="/img/upgrade-guides/mongo_dump.png" 
    alt="Mongo DUMP example" height="600">}}

To restore a database using a previously saved snapshot, simply employ the mongorestore command.

```bash
mongorestore --host <hostname> --port <port> --username <username> --password <password> /path/to/dump/directory
```
Example:
{{< img src="/img/upgrade-guides/mongo_restore.png" 
    alt="Mongo DUMP example" height="600">}}

## Upgrade Tyk Packages

Before executing the upgrade, ensure that you have consulted and performed all the necessary steps in the [pre upgrade checklist]({{< ref "developer-support/upgrading-tyk/upgrade-prerequisites" >}}). 

#### 1. Update Tyk Repositories

Fetch and update information about the available packages from the specified repositories. 
```
sudo yum -q makecache -y --disablerepo='*' --enablerepo='tyk_tyk-dashboard'
sudo yum -q makecache -y --disablerepo='*' --enablerepo='tyk_tyk-gateway'
sudo yum -q makecache -y --disablerepo='*' --enablerepo='tyk_tyk-pump'

Or
# To update ALL repositories in your system instead

sudo yum -q makecache -y
```

#### 2. Verify availability of target upgrade packages

List current versions of Tyk using below command:

```bash
rpm -qa | grep -i tyk
```

Example:
{{< img src="/img/upgrade-guides/list_rpm.png" 
    alt="List RPM packages example" width="600" height="auto">}}

List available versions of upgradable packages of Tyk components and ensure that the version you are planning to upgrade to is listed in the output of the above command.

```bash
yum --showduplicates list tyk*
```

Example:
{{< img src="/img/upgrade-guides/list_versions.png" 
    alt="List version example" height="600">}}

#### 3. Upgrade Tyk Components

**Note:** Please specify the exact version you are upgrading into.

```bash
yum update tyk-dashboard-<desired-version>
yum update tyk-gateway-<desired-version>
yum update tyk-pump-<desired-version>
```

Example:
{{< img src="/img/upgrade-guides/yum_update.png" 
    alt="Update example" height="600" width="auto" >}}

#### 4. Restart Tyk Components

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

#### 5. Health check upgraded Tyk components

Perform a health check on all 3 Tyk Components. The host and port number varies on your setup.

##### Tyk Dashboard
```bash
curl http://localhost:3000/hello
```

##### Tyk Gateway
```bash
curl http://localhost:8080/hello
```

##### Tyk Pump
```bash
curl http://localhost:8083/health
```

## How to revert

If the upgrade fails you can revert to the old version by following the steps below.

#### 1. Inspect package logs

Use the command below to fetch information for all updates, noting the ID for the specific “update” action to revert to allow verifiying the packages:

```bash
yum history
```

#### 2. Verify update

Display details of the specific "update" transaction, replacing ID noted in the previous step

```bash
yum history info <ID>
```

Example:
{{< img src="/img/upgrade-guides/yum_history.png" 
    alt="Update example" height="600" width="auto" >}}

#### 3. Revert

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
