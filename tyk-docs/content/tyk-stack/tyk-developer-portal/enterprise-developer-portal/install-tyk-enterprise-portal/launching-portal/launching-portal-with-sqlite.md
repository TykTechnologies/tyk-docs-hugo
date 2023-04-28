---
title: "Launch Tyk Enterprise Developer Portal with SQLite"
date: 2022-02-08
tags: ["Tyk Enterprise Developer Portal", "Install Tyk Enterprise Developer Portal with SQLite"]
description: "Guide for installing the Tyk Enterprise Developer Portal with SQLite"
menu:
  main:
    parent: "Launching the Tyk Enterprise Developer Portal"
weight: 2
---

## Installing the Tyk Enterprise Developer Portal with SQLite
This guide offers a concise, step-by-step recipe for launching the Tyk Enterprise Developer Portal in a container using SQLite. In this recipe, the database file is stored on a volume, and all settings for the Portal are configured using an env-file.

{{< warning success >}}
**Warning**

SQLite is useful for quick deployment and testing, however we don't recommend using it in production.
{{< /warning >}}

### Prerequisites
To successfully install the Tyk Enterprise Developer Portal with SQLite using Docker or Docker Compose, you should have installed the following software:
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/) (required for docker-compose setup only)

### Prepare config file and data volumes
#### Create volumes for the portal's database, themes and assets
If you intend to deploy the portal with the `fs` [type of storage]({{< ref "/content/tyk-stack/tyk-developer-portal/enterprise-developer-portal/install-tyk-enterprise-portal/configuration.md#portal_storage" >}}), it will be necessary to create three distinct volumes. These volumes are required for sqlite, portal themes, and assets respectively.
```shell
mkdir -p /tmp/portal/db       # create volume for the portal database
mkdir -p /tmp/portal/themes   # create volume for the portal themes
mkdir -p /tmp/portal/system   # create volume for the portal assets (images and OpenAPI Specification files)
chmod -R o+x,o+w /tmp/portal  # grant permission
```

Alternatively, if you intend to use the `s3` [type of storage]({{< ref "/content/tyk-stack/tyk-developer-portal/enterprise-developer-portal/install-tyk-enterprise-portal/configuration.md#portal_storage" >}}), you will only need to create a single volume for sqlite:
```shell
mkdir -p /tmp/portal/db       # create volume for the portal database
chmod -R o+x,o+w /tmp/portal  # grant permission
```

#### Create an environment file
Creating an environment file to specify settings for the portal is the next step. This is optional, as you can alternatively specify all the variables using the -e option when starting your deployment.

Here is an example of a sample environment file. For a comprehensive reference of environment variables, please refer to the Configuration section in the Tyk Enterprise Developer Portal documentation: [the Configuration section]({{< ref "/content/tyk-stack/tyk-developer-portal/enterprise-developer-portal/install-tyk-enterprise-portal/configuration.md" >}}).
```ini
PORTAL_HOST_PORT=3001
PORTAL_DATABASE_DIALECT=sqlite3
PORTAL_DATABASE_CONNECTIONSTRING=db/portal.db
PORTAL_DATABASE_ENABLELOGS=false
PORTAL_THEMING_THEME=default
PORTAL_THEMING_PATH=./themes
PORTAL_LICENSEKEY=<your-license-here>
```

Once you have completed this step, you are ready to launch the portal application with SQLite either by using a Docker container or via Docker Compose.

### Launch the portal with SQLite using Docker container
This section outlines the process of launching the portal application with SQLite using a Docker container. By following this guide, you will learn how to effectively configure, launch, and dismantle the portal application using Docker.
#### Pull and launch the portal container
To pull and launch the portal using Docker, use the command provided below. Before executing the command, ensure that you replace `<tag>` with the specific version of the portal you intend to launch. The latest version of the portal is `tykio/portal:v1.3`, and you can browse all available versions on [Docker Hub](https://hub.docker.com/r/tykio/portal/tags).
```shell
docker run -d \
    -p 3001:3001 \
    --env-file .env \
    --mount type=bind,src=/tmp/portal/db,dst=/opt/portal/db \
    --mount type=bind,src=/tmp/portal/themes,dst=/opt/portal/themes \
    --mount type=bind,src=/tmp/portal/system,dst=/opt/portal/public/system \
    --name tyk-portal \
    tykio/portal:<tag>
```

The above command will launch the portal on port 3001.
{{< note success >}}
In case this is the first time you are launching the portal, it will be necessary to bootstrap it before you can use it. For detailed instructions, please refer to [the bootstrapping documentation]({{< ref "/content/tyk-stack/tyk-developer-portal/enterprise-developer-portal/install-tyk-enterprise-portal/bootstrapping-portal.md" >}}).
{{</ note >}}

#### Clean up
If you want to clean up your environment or start the installation process from scratch, execute the following commands to stop and dismantle the portal container:
```shell
docker stop tyk-portal    # stop the portal container
docker rm tyk-portal      # remove the portal container
```

Since the portal data is persisted in the mounted volumes (`/tmp/portal/db`, `/tmp/portal/themes`, and `/tmp/portal/system` in the above example), to completely erase the deployment, you will also need to delete them:
```shell
# remove the database volume
rm -rf /tmp/portal/db
# remove the themes volume
rm -rf /tmp/portal/themes
# remove the assets volume
rm -rf /tmp/portal/system
```

### Launch the portal with SQLite using docker-compose
This section outlines the process of launching the portal application with SQLite using docker-compose. By following this guide, you will learn how to effectively configure, launch, and dismantle the portal application using docker-compose.
#### Create docker-compose file
Before launching the portal using docker-compose, you will need to create a `docker-compose.yaml` file. An example of the portal's docker-compose file is provided below, which you can use as a starting point and further customize to meet your specific requirements.
```yaml
version: '3.6'
services:
  tyk-portal:
    image: tykio/portal:<tag>
    volumes:
      - /tmp/portal/themes:/opt/portal/themes
      - /tmp/portal/db:/opt/portal/db
      - /tmp/portal/system:/opt/portal/public/system
    ports:
      - 3001:3001
    environment:
      - PORTAL_DATABASE_DIALECT=${PORTAL_DATABASE_DIALECT}
      - PORTAL_DATABASE_CONNECTIONSTRING=${PORTAL_DATABASE_CONNECTIONSTRING}
      - PORTAL_THEMING_THEME=${PORTAL_THEMING_THEME}
      - PORTAL_THEMING_PATH=${PORTAL_THEMING_PATH}
      - PORTAL_LICENSEKEY=${PORTAL_LICENSEKEY}
```

#### Pull and launch the portal container using docker-compose
To launch the portal using docker-compose, execute the command provided below.
```shell
docker-compose --env-file .env up -d
```

#### Clean up
If you want to clean up your environment or start the installation process from scratch, execute the following commands to stop and dismantle the portal container:
```shell
docker-compose down       # to just shutdown the stack
```

Since the portal data is persisted in the mounted volumes (`/tmp/portal/db`, `/tmp/portal/themes`, and `/tmp/portal/system` in the above example), to completely erase the deployment, you will also need to delete them:
```shell
# remove the database volume
rm -rf /tmp/portal/db
# remove the themes volume
rm -rf /tmp/portal/themes
# remove the assets volume
rm -rf /tmp/portal/system
```