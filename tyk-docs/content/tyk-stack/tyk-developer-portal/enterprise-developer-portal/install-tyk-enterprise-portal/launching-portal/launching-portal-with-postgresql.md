---
title: "Launch Tyk Enterprise Developer Portal with PostgreSQL"
date: 2022-02-08
tags: ["Tyk Enterprise Developer Portal", "Install Tyk Enterprise Developer Portal with PostgreSQL"]
description: "Guide for installing the Tyk Enterprise Developer Portal with PostgreSQL"
menu:
  main:
    parent: "Launch the Tyk Enterprise Developer Portal"
weight: 3
---

## Installing the Tyk Enterprise Developer Portal with PostgreSQL
This guide provides a clear and concise, step-by-step recipe for launching the Tyk Enterprise Developer Portal in a container using PostgreSQL.

In this recipe, the database and the portal container will run on the same network, with the database storing its data on a volume.
Additionally, all settings for the Portal are configured using an env-file.

>**Note**: This document is just an example. Customize all fields, including the username, password, root password, database name, and more.
> Be sure to update the connection DSN in the env-file accordingly.

### Prerequisites
To successfully install the Tyk Enterprise Developer Portal with PostgreSQL using Docker or Docker Compose, you should have installed the following software:
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/) (required for docker-compose setup only)

### Prepare config file and data volumes
#### Create a network for the portal deployment
To start with, you need to create a Docker network for communication between the database and the portal. Execute the following command to create it:
```shell
docker network create tyk-portal
```

#### Create an init script for PostgreSQL
To initialize a PostgreSQL database, you need to create an init script that will later be used to launch the PostgreSQL instance.
Copy the content below to a file named `init.sql`, which you will need in the next step
```sql
-- init.sql
-- Creating user
CREATE USER admin WITH ENCRYPTED PASSWORD 'secr3t';
CREATE DATABASE portal;
GRANT ALL PRIVILEGES ON DATABASE portal TO admin;
```

#### Create the database volume and launch the database
The next step is to launch the PostgreSQL database for the portal. To achieve this, please follow these steps and execute the commands below:
```shell
# create volume for the database container
$ docker volume create tyk-portal-postgres-data

# create the database container and specify connection settings for the database
$ docker run \
-d \
--name tyk-portal-postgres \
--restart on-failure:5 \
-e POSTGRES_PASSWORD=secr3t \
-e PGDATA=/var/lib/postgresql/data/pgdata \
--mount type=volume,source=tyk-portal-postgres-data,target=/var/lib/postgresql/data/pgdata \
--mount type=bind,src=$(pwd)/init.sql,dst=/docker-entrypoint-initdb.d/init.sql \
--network tyk-portal \
-p 5432:5432 \
postgres:10-alpine
```
>**Note**: The above PostgreSQL configuration is an example. You can customize deployment of your PostgreSQL instance. Please refer to [the PostgreSQL documentation](https://www.postgresql.org/docs/current/installation.html) for further guidance.

#### Create volumes for the portal’s themes and assets
This guide utilizes the `fs` [storage type]({{< ref "/content/tyk-stack/tyk-developer-portal/enterprise-developer-portal/install-tyk-enterprise-portal/configuration.md#storage-settings" >}}) for the portal's CMS assets.
This means that all images, theme files, and OpenAPI Specifications will be stored on the host filesystem. Therefore, you need to create file system volumes for the portal assets.

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

Here is an example of a sample environment file. For a comprehensive reference of environment variables, please refer to [the Configuration section]({{< ref "/content/tyk-stack/tyk-developer-portal/enterprise-developer-portal/install-tyk-enterprise-portal/configuration.md" >}}) in the Tyk Enterprise Developer Portal documentation.
```ini
PORTAL_HOST_PORT=3001
PORTAL_DATABASE_DIALECT=postgres
PORTAL_DATABASE_CONNECTIONSTRING=host=tyk-portal-postgres port=5432 dbname=portal user=admin password=secr3t sslmode=disable
PORTAL_DATABASE_ENABLELOGS=false
PORTAL_THEMING_THEME=default
PORTAL_THEMING_PATH=./themes
PORTAL_LICENSEKEY=<your-license-here>
```

Once you have completed this step, you are ready to launch the portal application with PostgreSQL either by using a Docker container or via Docker Compose.

### Launch the portal with PostgreSQL using Docker container
This section outlines the process of launching the portal application with PostgreSQL using a Docker container. By following this guide, you will learn how to effectively configure, launch, stop and clean up the portal application using Docker.

#### Pull and launch the portal container
To pull and launch the portal using Docker, use the command provided below. Before executing the command, ensure that you replace `<tag>` with the specific version of the portal you intend to launch. The latest version of the portal is `tykio/portal:v1.3`, and you can browse all available versions on [Docker Hub](https://hub.docker.com/r/tykio/portal/tags).
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
docker stop tyk-portal                        # stop the portal container
docker rm tyk-portal                          # remove the portal container
docker stop tyk-portal-postgres               # stop the database container
docker rm tyk-portal-postgres                 # remove the database container
docker volume rm tyk-portal-postgres-data     # remove the database container volume
```

Since the portal data is persisted in the mounted volumes ( `/tmp/portal/themes`, and `/tmp/portal/system` in the above example), to completely erase the deployment, you will also need to delete them:
```shell
# remove the themes volume
rm -rf /tmp/portal/themes
# remove the assets volume
rm -rf /tmp/portal/system
```

### Launch the portal with PostgreSQL using docker-compose
This section outlines the process of launching the portal application with PostgreSQL using docker-compose. By following this guide, you will learn how to effectively configure, launch, stop and clean up the portal application using docker-compose.
#### Create docker-compose file
Before launching the portal using docker-compose, you will need to create a `docker-compose.yaml` file. An example of the portal's docker-compose file is provided below, which you can use as a starting point and further customize to meet your specific requirements.

Ensure that you replace `<tag>` with the specific version of the portal you intend to launch before executing the command. The latest version of the portal is `tykio/portal:v1.3`, and you can browse all available versions on [Docker Hub](https://hub.docker.com/r/tykio/portal/tags).
```yaml
version: '3.6'
services:
  tyk-portal:
    depends_on:
      - tyk-portal-postgres
    image: tykio/portal:<tag>
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

  tyk-portal-postgres:
    image: postgres:10-alpine
    volumes:
      - tyk-portal-postgres-data:/var/lib/postgresql/data/pgdata
      - ${PWD}/init.sql:/docker-entrypoint-initdb.d/init.sql
    networks:
      - tyk-portal
    environment:
      - POSTGRES_PASSWORD=secr3t
      - PGDATA=/var/lib/postgresql/data/pgdata

volumes:
  tyk-portal-postgres-data:

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