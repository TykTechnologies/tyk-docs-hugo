---
title: "Launch Tyk Enterprise Developer Portal with MySQL"
date: 2022-02-08
tags: ["Tyk Enterprise Developer Portal", "Install Tyk Enterprise Developer Portal with MySQL"]
description: "Guide for installing the Tyk Enterprise Developer Portal with MySQL"
menu:
  main:
    parent: "Launch the Tyk Enterprise Developer Portal"
weight: 3
---

## Installing the Tyk Enterprise Developer Portal with MySQL
This guide provides a clear and concise, step-by-step recipe for launching the Tyk Enterprise Developer Portal in a container using either MySQL or MariaDB.

In this recipe, the database and the portal container will run on the same network, with the database storing its data on a volume.
Additionally, all settings for the Portal are configured using an env-file.

>**Note**: This document is just an example. Customize all fields, including the username, password, root password, database name, and more.
> Be sure to update the connection DSN in the env-file accordingly.


### Prerequisites
To successfully install the Tyk Enterprise Developer Portal with MySQL or MariaDB using Docker or Docker Compose, you should have installed the following software:
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/) (required for docker-compose setup only)

### Prepare config file and data volumes
#### Create a network for the portal deployment
To start with, you need to create a Docker network for communication between the database and the portal. Execute the following command to create it:
```shell
docker network create tyk-portal
```

#### Create the database volume and launch the database
The next step is to launch the MySQL database for the portal. To achieve this, please follow these steps and execute the commands below:
```shell
# create volume for the database container
$ docker volume create tyk-portal-mysql-data

# create the database container and specify connection settings for the database
$ docker run \
-d \
--name tyk-portal-mysql \
--restart on-failure:5 \
-e MYSQL_ROOT_PASSWORD=sup3rsecr3t \
-e MYSQL_DATABASE=portal \
-e MYSQL_USER=admin \
-e MYSQL_PASSWORD=secr3t \
--mount type=volume,source=tyk-portal-mysql-data,target=/var/lib/mysql \
--network tyk-portal \
-p 3306:3306 \
mysql:5.7 --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci --sql-mode=ALLOW_INVALID_DATES
```
>**Note**: The above MySQL configuration is an example. You can customize deployment of your MySQL instance.
> Please refer to [the MySQL documentation](https://dev.mysql.com/doc/refman/5.7/en/charset-applications.html) for further guidance.

#### Create volumes for the portal’s themes and assets
This guide utilizes the `fs` [storage type]({{< ref "/content/tyk-stack/tyk-developer-portal/enterprise-developer-portal/install-tyk-enterprise-portal/configuration.md#storage-settings" >}}) for the portal's CMS assets.
This means that all images, theme files, and OpenAPI Specifications will be stored on the host filesystem.
Therefore, you need to create file system volumes for the portal assets.

If you prefer to use the `s3` storage type, please refer to [the Storage Settings section]({{< ref "/content/tyk-stack/tyk-developer-portal/enterprise-developer-portal/install-tyk-enterprise-portal/configuration.md#storage-settings" >}}) for further instructions.
If you've decided to proceed with the `s3` type of storage, you can skip this step of creating the below volumes.
```shell
# create folder
mkdir -p /tmp/portal/themes
# create volume for the portal assets (images and OpenAPI Specification files)
mkdir -p /tmp/portal/system
# grant permission
chmod -R o+x,o+w /tmp/portal
```

#### Create an environment file
Creating an environment file to specify settings for the portal is the next step.
This is optional, as you can alternatively specify all the variables using the -e option when starting your deployment. 

Here is an example of a sample environment file. For a comprehensive reference of environment variables, please refer [the Configuration section]({{< ref "/content/tyk-stack/tyk-developer-portal/enterprise-developer-portal/install-tyk-enterprise-portal/configuration.md" >}}) in the Tyk Enterprise Developer Portal documentation.
```ini
MYSQL_ROOT_PASSWORD=sup3rsecr3t
MYSQL_DATABASE=portal
MYSQL_USER=admin
MYSQL_PASSWORD=secr3t
PORTAL_HOST_PORT=3001
PORTAL_DATABASE_DIALECT=mysql
PORTAL_DATABASE_CONNECTIONSTRING=admin:secr3t@tcp(tyk-portal-mysql:3306)/portal?charset=utf8mb4&parseTime=true
PORTAL_DATABASE_ENABLELOGS=false
PORTAL_THEMING_THEME=default
PORTAL_THEMING_PATH=./themes
PORTAL_LICENSEKEY=<your-license-here>
```

Once you have completed this step, you are ready to launch the portal application with MySQL either by using a Docker container or via Docker Compose.

### Launch the portal with MySQL using Docker container
This section outlines the process of launching the portal application with MySQL using a Docker container.
By following this guide, you will learn how to effectively configure, launch, stop and clean up the portal application using Docker.

#### Pull and launch the portal container
To pull and launch the portal using Docker, use the command provided below. Before executing the command, ensure that you replace `<tag>` with the specific version of the portal you intend to launch.
The latest version of the portal is `tykio/portal:v1.3`, and you can browse all available versions on [Docker Hub](https://hub.docker.com/r/tykio/portal/tags).
```shell
docker run -d \
    -p 3001:3001 \
    --env-file .env \
    --network tyk-portal \
    --name tyk-portal \
    --mount type=bind,src=/tmp/portal/themes,dst=/opt/portal/themes \
    --mount type=bind,src=/tmp/portal/system,dst=/opt/portal/public/system \
    tykio/portal:<tag>
```

The above command will launch the portal on port 3001.
{{< note success >}}
In case this is the first time you are launching the portal, it will be necessary to bootstrap it before you can use it.
For detailed instructions, please refer to [the bootstrapping documentation]({{< ref "/content/tyk-stack/tyk-developer-portal/enterprise-developer-portal/install-tyk-enterprise-portal/bootstrapping-portal.md" >}}).
{{</ note >}}

#### Clean up
If you want to clean up your environment or start the installation process from scratch, execute the following commands to stop and remove the portal container:
```shell
docker stop tyk-portal                    # stop the portal container
docker rm tyk-portal                      # remove the portal container
docker stop tyk-portal-mysql              # stop the database container
docker rm tyk-portal-mysql                # remove the database container
docker volume rm tyk-portal-mysql-data    # remove the database container volume
```

Since the portal data is persisted in the mounted volumes ( `/tmp/portal/themes`, and `/tmp/portal/system` in the above example), to completely erase the deployment, you will also need to delete them:
```shell
# remove the themes volume
rm -rf /tmp/portal/themes
# remove the assets volume
rm -rf /tmp/portal/system
```

### Launch the portal with MySQL using docker-compose
This section outlines the process of launching the portal application with MySQL using docker-compose.
By following this guide, you will learn how to effectively configure, launch, stop and clean up the portal application using docker-compose.
#### Create docker-compose file
Before launching the portal using docker-compose, you will need to create a `docker-compose.yaml` file.
An example of the portal's docker-compose file is provided below, which you can use as a starting point and further customize to meet your specific requirements.

Ensure that you replace `<tag>` with the specific version of the portal you intend to launch before executing the command.
The latest version of the portal is `tykio/portal:v1.3`, and you can browse all available versions on [Docker Hub](https://hub.docker.com/r/tykio/portal/tags).
```yaml
version: '3.6'
services:
  tyk-portal:
    depends_on:
      - tyk-portal-mysql
    image: tykio/portal:<tag>
    volumes:
      - /tmp/portal/themes:/opt/portal/themes
      - /tmp/portal/system:/opt/portal/public/system
    networks:
      - tyk-portal
    ports:
      - 3001:3001
    environment:
      - PORTAL_DATABASE_DIALECT=${PORTAL_DATABASE_DIALECT}
      - PORTAL_DATABASE_CONNECTIONSTRING=${PORTAL_DATABASE_CONNECTIONSTRING}
      - PORTAL_THEMING_THEME=${PORTAL_THEMING_THEME}
      - PORTAL_THEMING_PATH=${PORTAL_THEMING_PATH}
      - PORTAL_LICENSEKEY=${PORTAL_LICENSEKEY}

  tyk-portal-mysql:
    image: mysql:5.7
    command: --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci
    volumes:
      - tyk-portal-mysql-data:/var/lib/mysql
    networks:
      - tyk-portal   
    environment:
      - MYSQL_ROOT_PASSWORD=${MYSQL_ROOT_PASSWORD}
      - MYSQL_DATABASE=${MYSQL_DATABASE}
      - MYSQL_USER=${MYSQL_USER}
      - MYSQL_PASSWORD=${MYSQL_PASSWORD}

volumes:
  tyk-portal-mysql-data:

networks:
  tyk-portal:
```

#### Pull and launch the portal container using docker-compose
To launch the portal using docker-compose, execute the command provided below.
```shell
docker-compose --env-file .env up -d
```

#### Clean up
If you want to clean up your environment or start the installation process from scratch, execute the following commands to stop and remove the portal container:
```shell
docker-compose down       # to just shutdown the stack
```

Since the portal data is persisted in the mounted volumes (`/tmp/portal/themes` and `/tmp/portal/system` in the above example), to completely erase the deployment, you will also need to delete them:
```shell
# remove the themes volume
rm -rf /tmp/portal/themes
# remove the assets volume
rm -rf /tmp/portal/system
```