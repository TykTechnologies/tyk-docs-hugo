---
title: Upgrading Tyk
weight: 251
menu:
    main:
        parent: "FAQ"
url: "/upgrading-tyk"
---

## Introduction
Follow the instructions relevant to your Tyk setup to upgrade your Tyk components.
Note: Upgrading Tyk will not overwrite your configuration files.  However, it is especially good practice to routinely back these files up, especially right before upgrading your software.

## Tyk Cloud Classic
Tyk Cloud Classic users are automatically upgraded to the latest version as soon as it's released.

## Tyk Multi-Cloud Gateway
We recommend you upgrade your Tyk Multi-Cloud Gateway in the following way:

 1. Take a backup of your `tyk.conf` and `start.sh` files. This is important if you have modified your Docker Container in your current version.
 2. Re-run the start.sh script:

### For MacOS Users
From a Terminal:

```{.copyWrapper}
curl "https://raw.githubusercontent.com/lonelycode/tyk-hybrid-docker/master/start.sh" -o "start.sh"
chmod +x start.sh
./start.sh [PORT] [TYK-SECRET] [RPC-CREDENTIALS] [API CREDENTIALS]
```
### For Linux Users
```{.copyWrapper}
wget https://raw.githubusercontent.com/lonelycode/tyk-hybrid-docker/master/start.sh
chmod +x start.sh
sudo ./start.sh [PORT] [TYK-SECRET] [RPC-CREDENTIALS] [API CREDENTIALS]
```

This command will start the Docker container and be ready to proxy traffic (you will need to check the logs of the container to make sure the login was successful).

#### Parameters:
*   `PORT`: The port for Tyk to listen on (usually 8080).
*   `TYK-SECRET`: The secret key to use so you can interact with your Tyk node via the REST API.
*   `RPC-CREDENTIALS`: Your **Organisation ID**. This can be found from the System Management > Users section from the Dashboard. Click **Edit** on a User to view the Organisation ID.
*   `API-CREDENTIALS`: Your **Tyk Dashboard API Access Credentials**. This can be found from the System Management > Users section from the Dashboard. Click **Edit** on a User to view the Tyk Dashboard API Access Credentials. ![API key location][1]

#### Check everything is working

To check if the node has connected and logged in, use the following command:
```{.copyWrapper}
sudo docker logs --tail=100 --follow tyk_hybrid
```

  
This will show you the log output of the Multi-Cloud container, if you don't see any connectivity errors, and the log output ends something like this:
```
time="Jul  7 08:15:03" level=info msg="Gateway started (vx.x.x.x)"
time="Jul  7 08:15:03" level=info msg="--> Listening on port: 8080"
```

Then the Gateway has successfully re-started.

## Tyk Self-Managed

In a production environment, where we recommend installing the Dashboard, Gateway and Pump on separate machines, you should upgrade components in the following sequence:

1. Tyk Dashboard
2. Tyk Gateway
3. Tyk Pump

Tyk is compatible with a blue-green or rolling update strategy.

For a single machine installation, you should follow the instructions below for your operating system.

Our repositories will be updated at [https://packagecloud.io/tyk](https://packagecloud.io/tyk) when new versions are released. As you set up these repositories when installing Tyk to upgrade all Tyk components  you can run:

### For Ubuntu

```{.copyWrapper}
sudo apt-get update && sudo apt-get upgrade
```

### For RHEL
```{.copyWrapper}
sudo yum update
```
{{< note success >}}
**Note**  

For the Tyk Gateway before v2.5 and Tyk Dashboard before v1.5 there's a known Red Hat bug with init scripts being removed on package upgrade. In order to work around it, it's required to force reinstall the packages, e.g.:
`sudo yum reinstall tyk-gateway tyk-dashboard`
{{< /note >}}

## Tyk Multi Data Centre Bridge

Our recommended sequence for upgrading a MDCB installation is as follows:

Master DC first in the following order:

1. MDCB
2. Pump (if in use)
3. Dashboard
4. Gateway

Then your worker DC Gateways in the following order:

1. Pump (if in use)
2. Gateway

We do this to be backwards compatible and upgrading MDCB first followed by the master DC then worker DC Gateways ensures that:

1. It's extremely fast to see if there are connectivity issues, but the way Gateways in worker mode work means they keep working even if disconnected
2. It ensures that we don't have forward compatibility issues (new Gateway -> old MDCB)

Tyk is compatible with a blue-green or rolling update strategy.

## Tyk Go Plugins

We release a new version of our Tyk Go plugin compiler binary with each release. You will need to rebuild your Go plugins when updating to a new release. See [Rebuilding Go Plugins](/plugins/golang-plugins/golang-plugins/#when-upgrading-your-tyk-installation) for more details.

## Migrating from MongoDB to SQL

We have a [migration tool]({{< ref "/content/planning-for-production/database-settings/postgresql.md#migrating-from-an-existing-mongodb-instance" >}}) to help you manage the switch from MongoDB to SQL.

## Don't Have Tyk Yet?

Get started now, for free, or contact us with any questions.

* [Get Started](https://tyk.io/pricing/compare-api-management-platforms/#get-started)
* [Contact Us](https://tyk.io/about/contact/)

[1]: /img/dashboard/system-management/api_access_cred_2.5.png
