---
title: "Install Tyk Enterprise Developer Portal using Docker"
date: 2022-02-08
tags: ["Tyk Enterprise Developer Portal", "Install Tyk Enterprise Developer Portal using Docker"]
description: "Guide for installing the Tyk Enterprise Developer Portal using Docker"
menu:
main:
parent: "Installation options"
weight: 2
---

This guide provides a clear and concise, step-by-step recipe for launching the Tyk Enterprise Developer Portal in a container using Docker.
Depending on your preferences, you can use MariaDB, MySQL, PostgreSQL or SQLite as database.

In this recipe, the database and the portal container will run on the same network, with the database storing its data on a volume. The portal's CMS assets (images, files and themes) are stored in the database, although this guide provides links to the documentation to use a persistent volume or an S3 bucket as a storage medium for CMS assets.
Additionally, all settings for the Portal are configured using an env-file.

{{< warning success >}}
**Note**  

This document is just an example. Customize all fields, including the username, password, root password, database name and more.

Be sure to update the connection DSN in the env-file accordingly.
{{< /warning >}}


### Prerequisites
To successfully install the Tyk Enterprise Developer Portal with Docker, you should have installed [Docker](https://docs.docker.com/get-docker/) on the machine where you want to install the portal.

{{< tabs_start >}}

{{< tab_start "PostgreSQL" >}}
### Prepare an environment variables file, data volumes, and network
#### Create a network for the portal deployment
To start with, you need to create a Docker network for communication between the database and the portal. Execute the following command to create it:
```console
docker network create tyk-portal
```

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

#### Create the database volume and launch the database
The next step is to launch the PostgreSQL database for the portal. To achieve this, create a data volume for the database first:
```console
docker volume create tyk-portal-postgres-data
```

Then launch the PostgreSQL instance by executing the following command:
```container
docker run \
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
**Note**

{{< warning success >}}
The above PostgreSQL configuration is an example. You can customize deployment of your PostgreSQL instance. Please refer to [the PostgreSQL documentation](https://www.postgresql.org/docs/current/installation.html) for further guidance.
{{< /warning >}}

#### Create an environment variables file
Creating an environment variables file to specify settings for the portal is the next step.
This is optional, as you can alternatively specify all the variables using the -e option when starting your deployment.

Here is an example of a sample environment file. For a comprehensive reference of environment variables, please refer to the [configuration section]({{< ref "product-stack/tyk-enterprise-developer-portal/deploy/configuration" >}}) in the Tyk Enterprise Developer Portal documentation.
```ini
PORTAL_HOSTPORT=3001
PORTAL_DATABASE_DIALECT=postgres
PORTAL_DATABASE_CONNECTIONSTRING=host=tyk-portal-postgres port=5432 dbname=portal user=admin password=secr3t sslmode=disable
PORTAL_DATABASE_ENABLELOGS=false
PORTAL_THEMING_THEME=default
PORTAL_STORAGE=db
PORTAL_LICENSEKEY=<your-license-here>
```

Once you have completed this step, you are ready to launch the portal application with PostgreSQL in a Docker container.

### Launch the portal with PostgreSQL in a Docker container

#### Pull and launch the portal container
To pull and launch the portal using Docker, use the command provided below.
Ensure that you replace `<tag>` with the specific version of the portal you intend to launch before executing the command, e.g. `tykio/portal:v1.7` for the portal v1.7. You can browse all available versions on [Docker Hub](https://hub.docker.com/r/tykio/portal/tags) and in the [release notes section]({{< ref "product-stack/tyk-enterprise-developer-portal/release-notes/portal-1.7.0.md" >}}).
```console
docker run -d \
    -p 3001:3001 \
    --env-file .env \
    --network tyk-portal \
    --name tyk-portal \
    tykio/portal:<tag>
```

This command will launch the portal on localhost at port 3001. Now, you can bootstrap the portal and start managing your API products.

#### Bootstrap the portal
Now the portal is running on port 3001, but it needs to be bootstrapped by providing credentials for the super admin user since it's the first time you are launching it.
Follow the [bootstrapping section]({{< ref "product-stack/tyk-enterprise-developer-portal/deploy/bootstrapping-portal" >}}) of the documentation to bootstrap the portal via the UI or the admin API.

#### Clean up
If you want to clean up your environment or start the installation process from scratch, execute the following commands to stop and remove the portal container:
```console
docker stop tyk-portal
docker rm tyk-portal
docker stop tyk-portal-postgres
docker rm tyk-portal-postgres
docker volume rm tyk-portal-postgres-data
```

{{< tab_end >}}
{{< tab_start "MySQL or MariaDB" >}}
### Prepare an environment variables file, data volumes, and network
#### Create a network for the portal deployment
To start with, you need to create a Docker network for communication between the database and the portal. Execute the following command to create it:
```console
docker network create tyk-portal
```

#### Create the database volume and launch the database
The next step is to launch the MySQL database for the portal. To achieve this, create a data volume for the database first:
```console
docker volume create tyk-portal-mysql-data
```

Then launch the MySQL instance by executing the following command:
```console
docker run \
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
{{< warning success >}}
**Note**  

The above MySQL configuration is an example. You can customize deployment of your MySQL instance.

Please refer to the [MySQL documentation](https://dev.mysql.com/doc/refman/5.7/en/charset-applications.html) for further guidance.
{{< /warning >}}

{{< note success >}}
**Note** 

SQLite support will be deprecated from Tyk 5.7.0. To avoid disrupution, please transition to PostgreSQL, MongoDB or one of the listed compatible alternatives.
{{< /note >}}

#### Create an environment variables file
Creating an environment variables file to specify settings for the portal is the next step.
This is optional, as you can alternatively specify all the variables using the -e option when starting your deployment.

Here is an example of a sample environment file. For a comprehensive reference of environment variables, please refer to the [configuration]({{< ref "/content/product-stack/tyk-enterprise-developer-portal/deploy/configuration.md" >}}) section in the Tyk Enterprise Developer Portal documentation.
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

Once you have completed this step, you are ready to launch the portal application with MySQL in a Docker container or via Docker Compose.

### Launch the portal with MySQL in a Docker container

#### Pull and launch the portal container
To pull and launch the portal using Docker, use the command provided below.
Ensure that you replace `<tag>` with the specific version of the portal you intend to launch before executing the command, e.g. `tykio/portal:v1.7` for the portal v1.7.
You can browse all available versions on [Docker Hub](https://hub.docker.com/r/tykio/portal/tags) and in the [release notes]({{< ref "product-stack/tyk-enterprise-developer-portal/release-notes/portal-1.7.0.md" >}}) section.
```console
docker run -d \
    -p 3001:3001 \
    --env-file .env \
    --network tyk-portal \
    --name tyk-portal \
    --mount type=bind,src=/tmp/portal/themes,dst=/opt/portal/themes \
    --mount type=bind,src=/tmp/portal/system,dst=/opt/portal/public/system \
    tykio/portal:<tag>
```

This command will launch the portal on localhost at port 3001. Now, you can bootstrap the portal and start managing your API products.

#### Bootstrap the portal
Now the portal is running on port 3001, but it needs to be bootstrapped by providing credentials for the super admin user since it's the first time you are launching it. Follow the [bootstrapping]({{< ref "product-stack/tyk-enterprise-developer-portal/deploy/bootstrapping-portal" >}}) section of the documentation to bootstrap the portal via the UI or the admin API.

#### Clean up
If you want to clean up your environment or start the installation process from scratch, execute the following commands to stop and remove the portal container:
```console
docker stop tyk-portal
docker rm tyk-portal
docker stop tyk-portal-mysql
docker rm tyk-portal-mysql
docker volume rm tyk-portal-mysql-data
```

{{< tab_end >}}
{{< tab_start "SQLite" >}}
{{< warning success >}}
**Warning**
SQLite is useful for quick deployment and testing, however we don't recommend using it in production.
{{< /warning >}}

### Prepare an environment variables file and data volumes
#### Create a volume for the portal's database
To start with, you need to create a single volume for sqlite:
 ```console
mkdir -p /tmp/portal/db
chmod -R o+x,o+w /tmp/portal
```

#### Create an environment variables file
Creating an environment variables file to specify settings for the portal is the next step.
This is optional, as you can alternatively specify all the variables using the -e option when starting your deployment.

Here is an example of a sample environment file. For a comprehensive reference of environment variables, please refer to the [configuration]({{< ref "product-stack/tyk-enterprise-developer-portal/deploy/configuration" >}})] section in the Tyk Enterprise Developer Portal documentation.
```ini
PORTAL_HOSTPORT=3001
PORTAL_DATABASE_DIALECT=sqlite3
PORTAL_DATABASE_CONNECTIONSTRING=db/portal.db
PORTAL_DATABASE_ENABLELOGS=false
PORTAL_THEMING_THEME=default
PORTAL_STORAGE=db
PORTAL_LICENSEKEY=<your-license-here>
```

Once you have completed this step, you are ready to launch the portal application with SQLite in a Docker container.

### Launch the portal with SQLite in a Docker container

#### Pull and launch the portal container
To pull and launch the portal using Docker, use the command provided below.
Ensure that you replace `<tag>` with the specific version of the portal you intend to launch before executing the command, e.g. `tykio/portal:v1.7` for the portal v1.7.
You can browse all available versions on [Docker Hub](https://hub.docker.com/r/tykio/portal/tags) and in the [release notes]({{< ref "product-stack/tyk-enterprise-developer-portal/release-notes/portal-1.7.0.md" >}}) section.
```console
docker run -d \
    -p 3001:3001 \
    --env-file .env \
    --mount type=bind,src=/tmp/portal/db,dst=/opt/portal/db \
    --mount type=bind,src=/tmp/portal/themes,dst=/opt/portal/themes \
    --mount type=bind,src=/tmp/portal/system,dst=/opt/portal/public/system \
    --name tyk-portal \
    tykio/portal:<tag>
```

This command will launch the portal on localhost at port 3001. Now, you can bootstrap the portal and start managing your API products.

#### Bootstrap the portal
Now the portal is running on port 3001, but it needs to be bootstrapped by providing credentials for the super admin user since it's the first time you are launching it. Follow the [bootstrapping]({{< ref "product-stack/tyk-enterprise-developer-portal/deploy/bootstrapping-portal" >}}) section of the documentation to bootstrap the portal via the UI or the admin API.

#### Clean up
If you want to clean up your environment or start the installation process from scratch, execute the following commands to stop and remove the portal container:
```console
docker stop tyk-portal
docker rm tyk-portal
```

Since the SQLite data is persisted in the file system, you need to remove the following file for a complete deletion of the portal:
```console
rm -rf /tmp/portal/db
```
{{< tab_end >}}
{{< tabs_end >}}
