---
title: "Install Tyk Enterprise Developer Portal in Red Hat environment using RPM"
date: 2022-02-08
tags: ["Tyk Enterprise Developer Portal", "Install Tyk Enterprise Developer Portal using RPM", "RHEL"]
description: "Guide for installing the Tyk Enterprise Developer Portal in Red Hat environment using RPM"
menu:
  main:
    parent: "Installation options"
weight: 6
---

This guide provides a step-by-step recipe for launching the Tyk Enterprise Developer Portal using an RPM package in Red Hat environment (RHEL / CentOS).

{{< warning success >}}
**Note**

This document is just an example. Customize all fields, including the username, password, root password, database name and more.

Be sure to update the connection DSN in the env-file accordingly.
{{< /warning >}}


### Prerequisites
To successfully install the Tyk Enterprise Developer Portal using RPM, your environment should satisfy the following requirements:
- Connectivity to [packagecloud.io](https://packagecloud.io). If your environment doesn't have connectivity to packagecloud, you will need to download the portal package and copy it to the target host.
- RPM Package Manager should be installed on the host machine.

### Download and install the portal package
#### Download the portal package
To start with, you need to download the portal package from [packagecloud.io](https://packagecloud.io). To keep things organized, first create a directory where all installation assets (packages and config files) will be stored:
```console
mkdir ~/portal-install
cd ~/portal-install
```

Next, download the portal package from [packagecloud.io](https://packagecloud.io/tyk/portal-unstable) by executing the command below.
Ensure to replace package-version with actual package version e.g. https://packagecloud.io/tyk/portal-unstable/packages/el/8/portal-1.7.0-1.x86_64.rpm/download.rpm?distro_version_id=205 for the portal v1.7.0 for x86_64.
```console
wget --content-disposition "https://packagecloud.io/tyk/portal-unstable/packages/<package-version>"
```

#### Install the portal package
Once the package is downloaded, you need to install using RPM. Execute the below command to so. Once again, ensure to replace `portal-1.7.0-1.x86_64.rpm` with an actual filename of the package you have downloaded on the previous step.  
```console
sudo rpm -i portal-1.7.0-1.x86_64.rpm
```

### Configure and launch the portal

#### Update the configuration file with your license

{{< note success >}}
**Note** 

SQLite support will be deprecated from Tyk 5.7.0. To avoid disrupution, please transition to PostgreSQL, MongoDB or one of the listed compatible alternatives.
{{< /note >}}

Before starting the portal service, you need to configure the portal. Once the rpm package has been installed, the portal configuration file will be located in `/opt/portal/portal.conf`.
Initially, the config file is filled with the default values. The minimal configuration change to start the portal is to add the `LicenseKey` property to the config file.
The below sample configuration will start the portal on portal 3001 with SQLite as a database, no TLS enabled, and all CMS assets (images, theme files, etc.) are stored in the filesystem.
You can, however, customize the provided example and make more suitable for your need using the [configuration]({{< ref "product-stack/tyk-enterprise-developer-portal/deploy/configuration" >}}) reference.
```json
{
  "HostPort": 3001,
  "LicenseKey": "<your-license-here>",
  "Database": {
    "Dialect": "sqlite3",
    "ConnectionString": "portal.db",
    "EnableLogs": false
  },
  "Blog": {
    "Enable": true
  },
  "Site": {
    "Enable": true
  },
  "Forms": {
    "Enable": false
  },
  "StoreSessionName": "portal-store-session-name",
  "PortalAPISecret": "123456",
  "Storage": "fs",
  "S3": {
    "AccessKey": "your-access-key-here",
    "SecretKey": "your-secret-key-here",
    "Region": "s3-region",
    "Endpoint": "if-any",
    "Bucket": "your-bucket-here",
    "ACL": "",
    "PresignURLs": true
  },
  "TLSConfig": {
    "Enable": false,
    "InsecureSkipVerify": false,
    "Certificates":[
      {
        "Name": "localhost",
        "CertFile": "portal.crt",
        "KeyFile": "portal.key"
      }
    ]
  }
}
```

#### Start the portal service
Now when the portal package is installed and the configuration is updated, it is time to start the portal by executing the following command:
```console
sudo systemctl start portal.service
```

To check status and log of the portal execute the following command:
```console
systemctl status portal.service
```

#### Bootstrap the portal
Now the portal is running on port 3001, but it needs to be bootstrapped by providing credentials for the super admin user since it's the first you are launching it. Follow the [bootstrapping]({{< ref "product-stack/tyk-enterprise-developer-portal/deploy/bootstrapping-portal" >}}) section of the documentation to bootstrap the portal via the UI or the admin API.