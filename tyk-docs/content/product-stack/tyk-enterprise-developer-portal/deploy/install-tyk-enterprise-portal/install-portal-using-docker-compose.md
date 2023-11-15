---
title: "Install Tyk Enterprise Developer Portal using Docker Compose"
date: 2022-02-08
tags: ["Tyk Enterprise Developer Portal", "Install Tyk Enterprise Developer Portal using Docker Compose"]
description: "Guide for installing the Tyk Enterprise Developer Portal using Docker Compose"
menu:
main:
parent: "Installation options"
weight: 3
aliases:
- tyk-stack/tyk-developer-portal/enterprise-developer-portal/install-tyk-enterprise-portal/launching-portal/launching-portal-with-mysql
- tyk-stack/tyk-developer-portal/enterprise-developer-portal/install-tyk-enterprise-portal/launching-portal/launching-portal-with-postgresql
- tyk-stack/tyk-developer-portal/enterprise-developer-portal/install-tyk-enterprise-portal/launching-portal/launching-portal-with-sqlite
---

This guide provides a clear and concise, step-by-step recipe for launching the Tyk Enterprise Developer Portal in a container using Docker Compose.
Depending on your preferences, you can use MariaDB, MySQL, PostgreSQL, or SQLite as database.

In this recipe, the database and the portal container will run on the same network, with the database storing its data on a volume. The portal's CMS assets (images, files, themes) are stored in the database although this guide provides links to the documentation to use a persistent volume or an S3 bucket as a storage for CMS assets.
Additionally, all settings for the Portal are configured using an env-file.

>**Note**: This document is just an example. Customize all fields, including the username, password, root password, database name, and more.
> Be sure to update the connection DSN in the env-file accordingly.


### Prerequisites
To successfully install the Tyk Enterprise Developer Portal with Docker Compose, you should have installed the following software:
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

{{< tabs_start >}}

{{< tab_start "PostgreSQL" >}}
### Create an init script for PostgreSQL and an environment variables file
#### Create an init script for PostgreSQL
To initialize a PostgreSQL database, you need to create an init script that will later be used to launch the PostgreSQL instance.
Copy the content below to a file named `init.sql`, which you will need in the next step.
```sql
-- init.sql
-- Creating user
CREATE USER admin WITH ENCRYPTED PASSWORD 'secr3t';
CREATE DATABASE portal;
GRANT ALL PRIVILEGES ON DATABASE portal TO admin;
```

#### Create an environment variables file for configuring the portal and the database
Creating an environment file to specify settings for the portal is the next step.

Here is an example of a sample environment file. For a comprehensive reference of environment variables, please refer to [the Configuration section]({{< ref "/content/product-stack/tyk-enterprise-developer-portal/deploy/configuration.md" >}}) in the Tyk Enterprise Developer Portal documentation.
```ini
PORTAL_HOSTPORT=3001
PORTAL_DATABASE_DIALECT=postgres
PORTAL_DATABASE_CONNECTIONSTRING=host=tyk-portal-postgres port=5432 dbname=portal user=admin password=secr3t sslmode=disable
PORTAL_DATABASE_ENABLELOGS=false
PORTAL_THEMING_THEME=default
PORTAL_LICENSEKEY=<your-license-here>
PORTAL_STORAGE=db
```

Once you have completed this step, you are ready to launch the portal application with PostgreSQL via Docker Compose.

### Create a docker-compose file and launch the stack 
#### Create a docker-compose file
Before launching the portal using docker-compose, you will need to create a `docker-compose.yaml` file. An example of the portal's docker-compose file is provided below, which you can use as a starting point and further customize to meet your specific requirements.

Ensure that you replace `<tag>` with the specific version of the portal you intend to launch before executing the command, e.g. `tykio/portal:v1.7` for the portal v1.7. You can browse all available versions on [Docker Hub](https://hub.docker.com/r/tykio/portal/tags) and in [the release notes section]({{< ref "product-stack/tyk-enterprise-developer-portal/release-notes/portal-1.7.0.md" >}}).
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
      - PORTAL_STORAGE=${PORTAL_STORAGE}

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

This command will launch the portal on localhost at port 3001. Now, you can bootstrap the portal and start managing your API products.

#### Bootstrap the portal
Now the portal is running on port 3001, but it needs to be bootstrapped by providing credentials for the super admin user since it's the first you are launching it. Follow [the bootstrapping section]({{< ref "product-stack/tyk-enterprise-developer-portal/deploy/bootstrapping-portal" >}}) of the documentation to bootstrap the portal via the UI or the admin API. 

#### Clean up
If you want to clean up your environment or start the installation process from scratch, execute the following commands to stop and remove the portal container:
```shell
docker-compose down
```

{{< tab_end >}}
{{< tab_start "MySQL or MariaDB" >}}
### Create an environment variables file for configuring the portal and the database
The first step is to create an environment file to specify settings for the portal.

Here is an example of a sample environment file. For a comprehensive reference of environment variables, please refer [the Configuration section]({{< ref "/content/product-stack/tyk-enterprise-developer-portal/deploy/configuration.md" >}}) in the Tyk Enterprise Developer Portal documentation.
```ini
MYSQL_ROOT_PASSWORD=sup3rsecr3t
MYSQL_DATABASE=portal
MYSQL_USER=admin
MYSQL_PASSWORD=secr3t
PORTAL_HOSTPORT=3001
PORTAL_DATABASE_DIALECT=mysql
PORTAL_DATABASE_CONNECTIONSTRING=admin:secr3t@tcp(tyk-portal-mysql:3306)/portal?charset=utf8mb4&parseTime=true
PORTAL_DATABASE_ENABLELOGS=false
PORTAL_THEMING_THEME=default
PORTAL_STORAGE=db
PORTAL_LICENSEKEY=<your-license-here>
```

Once you have completed this step, you are ready to launch the portal application with MySQL via Docker Compose.

### Create a docker-compose file and launch the stack
#### Create a docker-compose file
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
      - PORTAL_STORAGE=${PORTAL_STORAGE}

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

This command will launch the portal on localhost at port 3001. Now, you can bootstrap the portal and start managing your API products.

#### Bootstrap the portal
Now the portal is running on port 3001, but it needs to be bootstrapped by providing credentials for the super admin user since it's the first you are launching it. Follow [the bootstrapping section]({{< ref "product-stack/tyk-enterprise-developer-portal/deploy/bootstrapping-portal" >}}) of the documentation to bootstrap the portal via the UI or the admin API.

#### Clean up
If you want to clean up your environment or start the installation process from scratch, execute the following commands to stop and remove the portal container:
```shell
docker-compose down
```
{{< tab_end >}}

{{< tab_start "SQLite" >}}
### Create an environment variables file for configuring the portal and the database
Creating an environment file to specify settings for the portal is the next step.
This is optional, as you can alternatively specify all the variables using the -e option when starting your deployment.

Here is an example of a sample environment file. For a comprehensive reference of environment variables,
please refer to [the Configuration section({{< ref "/content/product-stack/tyk-enterprise-developer-portal/deploy/configuration.md" >}})] in the Tyk Enterprise Developer Portal documentation.
```ini
PORTAL_HOSTPORT=3001
PORTAL_DATABASE_DIALECT=sqlite3
PORTAL_DATABASE_CONNECTIONSTRING=db/portal.db
PORTAL_DATABASE_ENABLELOGS=false
PORTAL_THEMING_THEME=default
PORTAL_THEMING_PATH=./themes
PORTAL_LICENSEKEY=<your-license-here>
PORTAL_STORAGE=db
```

Once you have completed this step, you are ready to launch the portal application with SQLite via Docker Compose.

### Create a docker-compose file and launch the stack

#### Create a docker-compose file
Before launching the portal using docker-compose, you will need to create a `docker-compose.yaml` file.
An example of the portal's docker-compose file is provided below, which you can use as a starting point and further customize to meet your specific requirements.
```yaml
version: '3.6'
services:
  tyk-portal:
    image: tykio/portal:<tag>
    volumes:
      - /tmp/portal/db:/opt/portal/db
    ports:
      - 3001:3001
    environment:
      - PORTAL_DATABASE_DIALECT=${PORTAL_DATABASE_DIALECT}
      - PORTAL_DATABASE_CONNECTIONSTRING=${PORTAL_DATABASE_CONNECTIONSTRING}
      - PORTAL_THEMING_THEME=${PORTAL_THEMING_THEME}
      - PORTAL_THEMING_PATH=${PORTAL_THEMING_PATH}
      - PORTAL_LICENSEKEY=${PORTAL_LICENSEKEY}
      - PORTAL_STORAGE=${PORTAL_STORAGE}
```

#### Pull and launch the portal container using docker-compose
To launch the portal using docker-compose, execute the command provided below.
```shell
docker-compose --env-file .env up -d
```

This command will launch the portal on localhost at port 3001. Now, you can bootstrap the portal and start managing your API products.

#### Bootstrap the portal
Now the portal is running on port 3001, but it needs to be bootstrapped by providing credentials for the super admin user since it's the first you are launching it. Follow [the bootstrapping section]({{< ref "product-stack/tyk-enterprise-developer-portal/deploy/bootstrapping-portal" >}}) of the documentation to bootstrap the portal via the UI or the admin API.

#### Clean up
If you want to clean up your environment or start the installation process from scratch, execute the following commands to stop and stop and remove the portal container:
```shell
docker-compose down
```

Since the SQLite data is persisted in the mounted volume (`/tmp/portal/db` in the above example), to completely erase the deployment, you will also need to delete it for a complete clean-up:
```shell
rm -rf /tmp/portal/db
```

{{< tab_end >}}

{{< tabs_end >}}
