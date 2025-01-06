---
title: "Install and Configure Tyk Enterprise Developer Portal"
date: 2022-02-08
linkTitle: API Management
tags: ["Tyk Enterprise Developer Portal", "Install Tyk Enterprise Developer Portal", "Bootstrap Tyk Enterprise Developer Portal"]
tags: ["Bootstrap Tyk Enterprise Developer Portal", "Tyk Enterprise Developer Portal"]
description: "Installation guide for the Tyk Enterprise Developer Portal"
aliases:
- tyk-stack/tyk-developer-portal/enterprise-developer-portal/install-tyk-enterprise-portal
- tyk-stack/tyk-developer-portal/enterprise-developer-portal/install-tyk-enterprise-portal/launching-portal/launching-portal
- tyk-stack/tyk-developer-portal/enterprise-developer-portal/install-tyk-enterprise-portal/bootstrapping-portal
- tyk-stack/tyk-developer-portal/enterprise-developer-portal/install-tyk-enterprise-portal/launching-portal/launching-portal-with-mysql
- tyk-stack/tyk-developer-portal/enterprise-developer-portal/install-tyk-enterprise-portal/launching-portal/launching-portal-with-postgresql
- tyk-stack/tyk-developer-portal/enterprise-developer-portal/install-tyk-enterprise-portal/launching-portal/launching-portal-with-sqlite
- tyk-stack/tyk-developer-portal/enterprise-developer-portal/install-tyk-enterprise-portal/launching-portal/launching-portal-using-helm
- tyk-stack/tyk-developer-portal/enterprise-developer-portal/install-tyk-enterprise-portal/configuration
- product-stack/tyk-enterprise-developer-portal/deploy/configuration
- product-stack/tyk-enterprise-developer-portal/api-documentation/list-of-endpoints/portal-1.9.0-list-of-endpoints
---

{{< note success >}}
**Tyk Enterprise Developer Portal**

If you are interested in getting access contact us at [support@tyk.io](<mailto:support@tyk.io?subject=Tyk Enterprise Portal Beta>)

{{< /note >}}

Tyk Enterprise Developer Portal is available as a Docker container. To  install Tyk Enterprise Developer Portal, you need to launch the Docker image for the portal with a database to store the portal metadata.
Optionally, you may decide to use S3 to store the portal CMS assets (image and theme files)

This guide explains how to install and bootstrap the Tyk Enterprise Developer Portal. On average, it should take around 5-10 minutes to install it depending on your setup.

## Enterprise Developer Portal Components

{{< img src="img/dashboard/portal-management/enterprise-portal/portal-deployment-diagram.png" width=800 alt="Portal deployment diagram" >}}
<br/>

The portal deployment comprises of three main components:
- The portal application itself
- The portal's main database that stores metadata related to the portal, such as API products, plans, developers, applications, and more
- The asset storage, which stores CMS assets such as images, themes, and OpenAPI specification files. The assets could reside in the portal's main database or separately in an S3 bucket or filesystem volume.

Optionally, there could be three additional components:
- **3rd party identity provider.** To [enable oAuth2.0 for your API Products]({{< ref "/content/tyk-stack/tyk-developer-portal/enterprise-developer-portal/api-access/dynamic-client-registration.md" >}}), you'll need to utilize an OpenID-compliant third-party identity provider.
It's essential to note that the [Tyk Stack]({{< ref "/content/tyk-stack.md" >}}) doesn't include third-party identity providers, so you should refer to your Identity Provider's documentation for instructions on configuring and deploying it.
This component is optional and required only for enabling oAuth2.0
- **[Tyk Identity Broker]({{< ref "/content/tyk-identity-broker/getting-started.md" >}})**. You only need this component if you want to configure Single Sign-On for the Tyk Enterprise Developer Portal.
For more guidance on this topic, please consult [the Single Sign-On section]({{< ref "/content/tyk-stack/tyk-developer-portal/enterprise-developer-portal/managing-access/enable-sso.md" >}}) of the documentation
- **Email server**. The portal is capable of sending notifications to both admin users and developers when specific events happen within the portal.
To enable this feature, you need to specify a connection configuration to an email server or service, and configure other email settings.
You can choose to use a server that is installed on your premises or an SMTP-compatible SaaS product.
For step-by-step instructions, please refer to [the Email Settings section]({{< ref "/content/tyk-stack/tyk-developer-portal/enterprise-developer-portal/customise-enterprise-portal/full-customisation/email-customization.md" >}})

## Portal Installation Process

The portal installation process comprises two steps:
1. **Install the portal application.** To install the portal and launch it in the bootstrap mode, you need to configure your portal instance by specifying settings such as TLS, log level, and database connection.
For further guidance on launching the portal, please refer to one of the installation options: [Docker container]({{< ref "product-stack/tyk-enterprise-developer-portal/deploy/install-tyk-enterprise-portal/install-portal-using-docker" >}}), [Docker Compose]({{< ref "product-stack/tyk-enterprise-developer-portal/deploy/install-tyk-enterprise-portal/install-portal-using-docker-compose" >}}), [Helm chart]({{< ref "product-stack/tyk-enterprise-developer-portal/deploy/install-tyk-enterprise-portal/install-portal-using-helm" >}}), or [RPM package]({{< ref "product-stack/tyk-enterprise-developer-portal/deploy/install-tyk-enterprise-portal/install-portal-using-rpm" >}}).
2. **[Bootstrap the portal]({{< ref "product-stack/tyk-enterprise-developer-portal/deploy/bootstrapping-portal" >}})** After you've launched the portal, it will wait for you to provide credentials for the super admin user before it starts accepting traffic.
Once you've created the super admin user, the portal will complete its installation process by creating the necessary database structure and initialising the required assets for its operations. You can [bootstrap]({{< ref "product-stack/tyk-enterprise-developer-portal/deploy/bootstrapping-portal" >}}) the portal either through the UI or using the bootstrap API.
Please refer to [the Bootstrapping section]({{< ref "/product-stack/tyk-enterprise-developer-portal/deploy/bootstrapping-portal" >}}) for implementing this step.

## Installation Options for Enterprise Developer Portal

The Tyk Enterprise Developer Portal supports multiple installation flavors. Check out the guides below to deploy the portal on the platform that suits you best. 

{{< grid >}}

{{< badge read="10 mins" href="product-stack/tyk-enterprise-developer-portal/deploy/install-tyk-enterprise-portal/install-portal-using-docker" image="/img/docker.png" alt="Docker install">}}
Install with Docker
{{< /badge >}}

{{< badge read="10 mins" href="/product-stack/tyk-enterprise-developer-portal/deploy/install-tyk-enterprise-portal/install-portal-using-docker-compose" image="/img/docker.png" alt="Docker-compose install">}}
Install with Docker Compose
{{< /badge >}}

{{< badge read="10 mins" href="/product-stack/tyk-enterprise-developer-portal/deploy/install-tyk-enterprise-portal/install-portal-using-new-helm" image="/img/k8s.png" alt="Kubernetes install">}}
Install on Kubernetes
{{< /badge >}}

{{< badge read="10 mins" href="/product-stack/tyk-enterprise-developer-portal/deploy/install-tyk-enterprise-portal/install-portal-using-rpm" image="/img/redhat-logo2.png" alt="Red Hat install">}}
Install on Red Hat
{{< /badge >}}

{{< /grid >}}

### Docker

This section explains how to install Tyk Enterprise Developer Portal in a container using Docker.
Depending on your preferences, you can use MariaDB, MySQL, PostgreSQL or SQLite as database.

In this recipe, the database and the portal container will run on the same network, with the database storing its data on a volume. The portal's CMS assets (images, files and themes) are stored in the database, although this guide provides links to the documentation to use a persistent volume or an S3 bucket as a storage medium for CMS assets.
Additionally, all settings for the Portal are configured using an env-file.

{{< warning success >}}
**Note**  

This document is just an example. Customize all fields, including the username, password, root password, database name and more.

Be sure to update the connection DSN in the env-file accordingly.
{{< /warning >}}


**Prerequisites**
To successfully install the Tyk Enterprise Developer Portal with Docker, you should have installed [Docker](https://docs.docker.com/get-docker/) on the machine where you want to install the portal.

#### Using PostgreSQL

1. **Create a network for the portal deployment**

    To start with, you need to create a Docker network for communication between the database and the portal. Execute the following command to create it:
    ```console
    docker network create tyk-portal
    ```

2. **Create an init script for PostgreSQL**

    To initialize a PostgreSQL database, you need to create an init script that will later be used to launch the PostgreSQL instance.
    Copy the content below to a file named `init.sql`, which you will need in the next step.
    ```sql
    -- init.sql
    -- Creating user
    CREATE USER admin WITH ENCRYPTED PASSWORD 'secr3t';
    CREATE DATABASE portal;
    GRANT ALL PRIVILEGES ON DATABASE portal TO admin;
    ```

3. **Create the database volume and launch the database**

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

4. **Create an environment variables file**

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

5. **Pull and launch the portal container**

    To pull and launch the portal using Docker, use the command provided below.
    Ensure that you replace `<tag>` with the specific version of the portal you intend to launch before executing the command, e.g. `tykio/portal:v1.7` for the portal v1.7. You can browse all available versions on [Docker Hub](https://hub.docker.com/r/tykio/portal/tags) and in the [release notes section]({{< ref "developer-support/release-notes/portal#170-release-notes" >}}).
    ```console
    docker run -d \
        -p 3001:3001 \
        --env-file .env \
        --network tyk-portal \
        --name tyk-portal \
        tykio/portal:<tag>
    ```

    This command will launch the portal on localhost at port 3001. Now, you can bootstrap the portal and start managing your API products.

6. **Bootstrap the portal**

    Now the portal is running on port 3001, but it needs to be bootstrapped by providing credentials for the super admin user since it's the first time you are launching it.
    Follow the [bootstrapping section]({{< ref "product-stack/tyk-enterprise-developer-portal/deploy/bootstrapping-portal" >}}) of the documentation to bootstrap the portal via the UI or the admin API.

7. **Clean up**

    If you want to clean up your environment or start the installation process from scratch, execute the following commands to stop and remove the portal container:
    ```console
    docker stop tyk-portal
    docker rm tyk-portal
    docker stop tyk-portal-postgres
    docker rm tyk-portal-postgres
    docker volume rm tyk-portal-postgres-data
    ```

#### Using MySQL

1. **Create a network for the portal deployment**

    To start with, you need to create a Docker network for communication between the database and the portal. Execute the following command to create it:
    ```console
    docker network create tyk-portal
    ```

2. **Create the database volume and launch the database**

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

3. **Create an environment variables file**

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

4. **Pull and launch the portal container**

    To pull and launch the portal using Docker, use the command provided below.
    Ensure that you replace `<tag>` with the specific version of the portal you intend to launch before executing the command, e.g. `tykio/portal:v1.7` for the portal v1.7.
    You can browse all available versions on [Docker Hub](https://hub.docker.com/r/tykio/portal/tags) and in the [release notes]({{< ref "developer-support/release-notes/portal#170-release-notes" >}}) section.
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

5. **Bootstrap the portal**

    Now the portal is running on port 3001, but it needs to be bootstrapped by providing credentials for the super admin user since it's the first time you are launching it. Follow the [bootstrapping]({{< ref "product-stack/tyk-enterprise-developer-portal/deploy/bootstrapping-portal" >}}) section of the documentation to bootstrap the portal via the UI or the admin API.

6. **Clean up**

    If you want to clean up your environment or start the installation process from scratch, execute the following commands to stop and remove the portal container:
    ```console
    docker stop tyk-portal
    docker rm tyk-portal
    docker stop tyk-portal-mysql
    docker rm tyk-portal-mysql
    docker volume rm tyk-portal-mysql-data
    ```

#### Using Sqlite

{{< warning success >}}
**Warning**
SQLite is useful for quick deployment and testing, however we don't recommend using it in production.
{{< /warning >}}

{{< note success >}}
**Note** 

Tyk no longer supports SQLite as of Tyk 5.7.0. To avoid disruption, please transition to [PostgreSQL]({{< ref"planning-for-production/database-settings/postgresql#introduction" >}}), [MongoDB]({{< ref "planning-for-production/database-settings/mongodb" >}}), or one of the listed compatible alternatives.
{{< /note >}}

1. **Create a volume for the portal's database**

    To start with, you need to create a single volume for sqlite:
    ```console
    mkdir -p /tmp/portal/db
    chmod -R o+x,o+w /tmp/portal
    ```

2. **Create an environment variables file**

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

3. **Pull and launch the portal container**

    To pull and launch the portal using Docker, use the command provided below.
    Ensure that you replace `<tag>` with the specific version of the portal you intend to launch before executing the command, e.g. `tykio/portal:v1.7` for the portal v1.7.
    You can browse all available versions on [Docker Hub](https://hub.docker.com/r/tykio/portal/tags) and in the [release notes]({{< ref "developer-support/release-notes/portal#170-release-notes" >}}) section.
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

4. **Bootstrap the portal**

    Now the portal is running on port 3001, but it needs to be bootstrapped by providing credentials for the super admin user since it's the first time you are launching it. Follow the [bootstrapping]({{< ref "product-stack/tyk-enterprise-developer-portal/deploy/bootstrapping-portal" >}}) section of the documentation to bootstrap the portal via the UI or the admin API.

5. **Clean Up**

    If you want to clean up your environment or start the installation process from scratch, execute the following commands to stop and remove the portal container:
    ```console
    docker stop tyk-portal
    docker rm tyk-portal
    ```

    Since the SQLite data is persisted in the file system, you need to remove the following file for a complete deletion of the portal:
    ```console
    rm -rf /tmp/portal/db
    ```

### Docker Compose

This section provides a clear and concise, step-by-step recipe for launching the Tyk Enterprise Developer Portal in a container using Docker Compose.
Depending on your preferences, you can use MariaDB, MySQL, PostgreSQL or SQLite as database.

In this recipe, the database and the portal containers will run on the same network, with the database storing it's data on a volume. The portal's CMS assets (images, files and themes) are stored in the database, although this guide provides links to the documentation to use a persistent volume or an S3 bucket as a storage medium for CMS assets.
Additionally, all settings for the Portal are configured using an env-file.

{{< warning success >}}
**Note**

This document is just an example. Customize all fields, including the username, password, root password, database name and more.
{{< /warning >}}


**Prerequisites**

To successfully install the Tyk Enterprise Developer Portal with Docker Compose, you should have installed the following software:
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

#### Using PostgreSQL

1. **Create an init script for PostgreSQL**

    To initialize a PostgreSQL database, you need to create an init script that will later be used to launch the PostgreSQL instance.
    Copy the content below to a file named `init.sql`, which you will need in the next step.
    ```sql
    -- init.sql
    -- Creating user
    CREATE USER admin WITH ENCRYPTED PASSWORD 'secr3t';
    CREATE DATABASE portal;
    GRANT ALL PRIVILEGES ON DATABASE portal TO admin;
    ```

2. **Create an environment variables file for configuring the portal and the database**

    Creating an environment file to specify settings for the portal is the next step.

    Here is an example of a sample environment file. For a comprehensive reference of environment variables, please refer to the [configuration section]({{< ref "product-stack/tyk-enterprise-developer-portal/deploy/configuration" >}}) in the Tyk Enterprise Developer Portal documentation.
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

3. **Create a docker-compose file**

    Before launching the portal using docker-compose, you will need to create a `docker-compose.yaml` file. An example of the portal's docker-compose file is provided below, which you can use as a starting point and further customize to meet your specific requirements.

    Ensure that you replace `<tag>` with the specific version of the portal you intend to launch before executing the command, e.g. `tykio/portal:v1.7` for the portal v1.7. You can browse all available versions on [Docker Hub](https://hub.docker.com/r/tykio/portal/tags) and in the [release notes section]({{< ref "developer-support/release-notes/portal#170-release-notes" >}}).

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

4. **Pull and launch the portal container using docker-compose**

    To launch the portal using docker-compose, execute the command provided below.
    ```console
    docker-compose --env-file .env up -d
    docker-compose --env-file .env up -d
    ```

    This command will launch the portal on localhost at port 3001. Now, you can bootstrap the portal and start managing your API products.

5. **Bootstrap the portal**

    Now the portal is running on port 3001, but it needs to be bootstrapped by providing credentials for the super admin user since it's the first time you are launching it. Follow the [bootstrapping section]({{< ref "product-stack/tyk-enterprise-developer-portal/deploy/bootstrapping-portal" >}}) of the documentation to bootstrap the portal via the UI or the admin API. 

6. **Clean up**

    If you want to clean up your environment or start the installation process from scratch, execute the following commands to stop and remove the portal container:
    ```console
    docker-compose down
    docker-compose down
    ```

#### Using MySQL

1. **Create an environment variables file for configuring the portal and the database**

    The first step is to create an environment file to specify settings for the portal.

    Here is an example of a sample environment file. For a comprehensive reference of environment variables, please refer the [configuration section]({{< ref "product-stack/tyk-enterprise-developer-portal/deploy/configuration" >}}) in the Tyk Enterprise Developer Portal documentation.
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

2. **Create a docker-compose file**

    Before launching the portal using docker-compose, you will need to create a `docker-compose.yaml` file.
    An example of the portal's docker-compose file is provided below, which you can use as a starting point and further customize to meet your specific requirements.

    Ensure that you replace `<tag>` with the specific version of the portal you intend to launch before executing the command, e.g. `tykio/portal:v1.7` for the portal v1.7.
    You can browse all available versions on [Docker Hub](https://hub.docker.com/r/tykio/portal/tags) and in the [release notes section]({{< ref "developer-support/release-notes/portal#170-release-notes" >}}).

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

3. **Pull and launch the portal container using docker-compose**

    To launch the portal using docker-compose, execute the command provided below.
    ```console
    docker-compose --env-file .env up -d
    docker-compose --env-file .env up -d
    ```

    This command will launch the portal on localhost at port 3001. Now, you can bootstrap the portal and start managing your API products.

4. **Bootstrap the portal**

    Now the portal is running on port 3001, but it needs to be bootstrapped by providing credentials for the super admin user since it's the first you are launching it. Follow the [bootstrapping section]({{< ref "product-stack/tyk-enterprise-developer-portal/deploy/bootstrapping-portal" >}}) of the documentation to bootstrap the portal via the UI or the admin API.

5. **Clean up**

    If you want to clean up your environment or start the installation process from scratch, execute the following commands to stop and remove the portal container:
    ```console
    docker-compose down
    docker-compose down
    ```

#### Using Sqlite

1. **Create an environment variables file for configuring the portal and the database**

    Creating an environment file to specify settings for the portal is the next step.
    This is optional, as you can alternatively specify all the variables using the -e option when starting your deployment.

    Here is an example of a sample environment file. For a comprehensive reference of environment variables, please refer to the [configuration section({{< ref "product-stack/tyk-enterprise-developer-portal/deploy/configuration" >}})] in the Tyk Enterprise Developer Portal documentation.
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

2. **Create a docker-compose file**

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

3. **Pull and launch the portal container using docker-compose**

    To launch the portal using docker-compose, execute the command provided below.
    ```console
    docker-compose --env-file .env up -d
    docker-compose --env-file .env up -d
    ```

    This command will launch the portal on localhost at port 3001. Now, you can bootstrap the portal and start managing your API products.

4. **Bootstrap the portal**

    Now the portal is running on port 3001, but it needs to be bootstrapped by providing credentials for the super admin user since it's the first time you are launching it. Follow the [bootstrapping section]({{< ref "product-stack/tyk-enterprise-developer-portal/deploy/bootstrapping-portal" >}}) of the documentation to bootstrap the portal via the UI or the admin API.

5. **Clean up**

    If you want to clean up your environment or start the installation process from scratch, execute the following commands to stop and stop and remove the portal container:
    ```console
    docker-compose down
    docker-compose down
    ```

    Since the SQLite data is persisted in the mounted volume (`/tmp/portal/db` in the above example), to completely erase the deployment, you will also need to delete it for a complete clean-up:
    ```console
    rm -rf /tmp/portal/db
    rm -rf /tmp/portal/db
    ```

### Kubernetes

#### Using New Helm Chart

There are two ways to install Tyk Enterprise Developer Portal. You can enable `global.components.devPortal` during Tyk Self-Managed deployment by following the [Tyk Self-Managed installation instruction]({{< ref "product-stack/tyk-charts/tyk-stack-chart" >}}) using our `tyk-stack` umbrella chart. It will install Tyk Enterprise Developer Portal together with Tyk Gateway and Dashboard in the same namespace.

Alternatively, you can install Tyk Enterprise Developer Portal as standalone component using our `tyk-dev-portal` chart. This page provides a clear and concise, step-by-step guide for installing the Tyk Enterprise Developer Portal as standalone component using the new helm chart.

To install the portal using helm charts, you need to take the following steps:

- Create the `tyk-dev-portal-conf` secret
- Specify config settings for the portal in `values.yaml`
- Launch the portal using the helm chart

1. **Create the `tyk-dev-portal-conf` secret**

    Make sure the `tyk-dev-portal-conf` secret exists in your namespace. 
    This secret will automatically be generated if Tyk Dashboard instance was bootstrapped with [tyk-boostrap](https://artifacthub.io/packages/helm/tyk-helm/tyk-bootstrap) component chart 
    and `bootstrap.devPortal` was set to `true` in the `values.yaml`.

    If the secret does not exist, you can create it by running the following command.

    ```bash
    kubectl create secret generic tyk-dev-portal-conf -n ${NAMESPACE} \
    --from-literal=TYK_ORG=${TYK_ORG} \
    --from-literal=TYK_AUTH=${TYK_AUTH}
    ```

    The fields `TYK_ORG` and `TYK_AUTH` are the Tyk Dashboard _Organization ID_ and the Tyk Dashboard API _Access Credentials_ respectively. These can be obtained under your profile in the Tyk Dashboard.

2. **Config settings**

    You must set the following values in the `values.yaml` or with `--set {field-name}={field-value}` using the helm upgrade command:

    | Field Name | Description |
    | ---------- | ----------- |
    | `global.adminUser.email` and `global.adminUser.password` | Set portal admin username and email for bootstrapping |
    | `global.secrets.devPortal` | Enable portal bootstrapping by providing secret name |
    | `license` | Tyk license key for your portal installation |
    | `storage.type` | Portal storage type, e.g. *fs*, *s3* and *db* |
    | `image.tag` | Enterprise Portal version. You can get the latest version image tag from [Docker Hub](https://hub.docker.com/r/tykio/portal/tags) |
    | `database.dialect` | Portal database dialect, e.g. *mysql*, *postgres* and *sqlite3* |
    | `database.connectionString`| Connection string to the Portal's database, e.g. for the *mysql* dialect: `admin:secr3t@tcp(tyk-portal-mysql:3306)/portal?charset=utf8mb4&parseTime=true` |

    In addition to `values.yaml`, you can also define the environment variables described in the [configuration section]({{< ref "product-stack/tyk-enterprise-developer-portal/deploy/configuration.md" >}}) to further customize your portal deployment. These environment variables can also be listed as a name value list under the `extraEnvs` section of the helm chart.

3. **Launch the portal using the helm chart**

    Run the following command to update your infrastructure and install the developer portal:

    ```bash
    helm install tyk-dev-portal tyk-helm/tyk-dev-portal -f values.yaml -n tyk
    ```

###### Configuration
Please refer to this [guide]({{<ref "product-stack/tyk-charts/tyk-stack-chart">}}) for an explanation of all configuration options.

> **Note**: Helm chart supports Enterprise Portal v1.2.0+.

#### Using Legacy Helm Chart

{{< warning success >}}
**Note**

It is recommended to use new helm charts instead of legacy charts. Guide for new charts can be found [here]({{<ref "product-stack/tyk-enterprise-developer-portal/deploy/install-tyk-enterprise-portal/install-portal-using-new-helm.md">}})

{{< /warning >}}

To install the portal using helm charts, you need to take the following steps:

- Create the `tyk-enterprise-portal-conf` secret
- Specify config settings for the portal in `values.yaml`
- Launch the portal using the helm chart

This guide provides a clear and concise, step-by-step recipe for installing the Tyk Enterprise Developer Portal using helm charts.

1. **Create the `tyk-enterprise-portal-conf` secret**

    Make sure the `tyk-enterprise-portal-conf` secret exists in your namespace. This secret will automatically be generated during the Tyk Dashboard bootstrap if the `dash.enterprisePortalSecret` value is set to `true` in the `values.yaml`.

    If the secret does not exist, you can create it by running the following command.

    ```bash
    kubectl create secret generic tyk-enterprise-portal-conf -n ${NAMESPACE} \
    --from-literal=TYK_ORG=${TYK_ORG} \
    --from-literal=TYK_AUTH=${TYK_AUTH}
    ```

    Where `TYK_ORG` and `TYK_AUTH` are the Tyk Dashboard Organization ID and the Tyk Dashboard API Access Credentials respectively. Which can be obtained under your profile in the Tyk Dashboard.

2. **Config settings**

    {{< note success >}}
    **Note** 

    Tyk no longer supports SQLite as of Tyk 5.7.0. To avoid disruption, please transition to [PostgreSQL]({{< ref"planning-for-production/database-settings/postgresql#introduction" >}}), [MongoDB]({{< ref "planning-for-production/database-settings/mongodb" >}}), or one of the listed compatible alternatives.
    {{< /note >}}

    You must set the following values in the `values.yaml` or with `--set {field-name}={field-value}` with the helm upgrade command:

    | Field Name | Description |
    | ---------- | ----------- |
    | `enterprisePortal.enabled` | Enable Portal installation |
    | `enterprisePortal.bootstrap` | Enable Portal bootstrapping |
    | `enterprisePortal.license`| Tyk license key for your portal installation |
    | `enterprisePortal.storage.type`| Portal database dialect, e.g *mysql*, *postgres* or *sqlite3* |
    | `enterprisePortal.storage.connectionString` | Connection string to the Portal's database, e.g for the mysql dialect: `admin:secr3t@tcp(tyk-portal-mysql:3306)/portal?charset=utf8mb4&parseTime=true` |

    In addition to values.yaml, you can also define the environment variables described in the [configuration section]({{< ref "product-stack/tyk-enterprise-developer-portal/deploy/configuration.md" >}}) to further customize your portal deployment. These environment variables can also be listed as a name value list under the `extraEnvs` section of the helm chart.

3. **Launch the portal using the helm chart**

    Run the following command to update your infrastructure and install the developer portal:

    ```bash
    helm upgrade tyk-pro tyk-helm/tyk-pro -f values.yaml -n tyk
    ```

{{< note success >}}
In case this is the first time you are launching the portal, it will be necessary to bootstrap it before you can use it. For detailed instructions, please refer to the [bootstrapping documentation]({{< ref "product-stack/tyk-enterprise-developer-portal/deploy/bootstrapping-portal" >}}).
{{</ note >}}

> **Note**: Helm chart supports Enterprise Portal v1.2.0+.


### Red Hat (RHEL / CentOS)

This guide provides a step-by-step recipe for launching the Tyk Enterprise Developer Portal using an RPM package in Red Hat environment (RHEL / CentOS).

{{< warning success >}}
**Note**

This document is just an example. Customize all fields, including the username, password, root password, database name and more.

Be sure to update the connection DSN in the env-file accordingly.
{{< /warning >}}

**Prerequisites**

To successfully install the Tyk Enterprise Developer Portal using RPM, your environment should satisfy the following requirements:
- Connectivity to [packagecloud.io](https://packagecloud.io). If your environment doesn't have connectivity to packagecloud, you will need to download the portal package and copy it to the target host.
- RPM Package Manager should be installed on the host machine.

**Steps for Installation**

1. **Download the portal package**

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

2. **Install the portal package**

    Once the package is downloaded, you need to install using RPM. Execute the below command to so. Once again, ensure to replace `portal-1.7.0-1.x86_64.rpm` with an actual filename of the package you have downloaded on the previous step.  
    ```console
    sudo rpm -i portal-1.7.0-1.x86_64.rpm
    ```

3. **Update the configuration file with your license**

    {{< note success >}}
    **Note** 

    Tyk no longer supports SQLite as of Tyk 5.7.0. To avoid disruption, please transition to [PostgreSQL]({{< ref"planning-for-production/database-settings/postgresql#introduction" >}}), [MongoDB]({{< ref "planning-for-production/database-settings/mongodb" >}}), or one of the listed compatible alternatives.
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

4. **Start the portal service**

    Now when the portal package is installed and the configuration is updated, it is time to start the portal by executing the following command:
    ```console
    sudo systemctl start portal.service
    ```

    To check status and log of the portal execute the following command:
    ```console
    systemctl status portal.service
    ```

5. **Bootstrap the portal**

    Now the portal is running on port 3001, but it needs to be bootstrapped by providing credentials for the super admin user since it's the first you are launching it. Follow the [bootstrapping]({{< ref "product-stack/tyk-enterprise-developer-portal/deploy/bootstrapping-portal" >}}) section of the documentation to bootstrap the portal via the UI or the admin API.

## Bootstrapping Enterprise Developer Portal

When launching the Tyk Enterprise Developer portal for the first time, it starts in a special bootstrap mode, which is required to create the first admin user who will act as the super admin.
After launching the portal, you can bootstrap it using either the portal UI or the bootstrap API.

This section explains how to bootstrap the portal using both the portal UI and the bootstrap API.

### Bootstrapping the Portal via the UI
After launching the portal for the first time, you can use its UI to bootstrap it. The portal will display a form that allows you to create a super admin user and set their password. 

Navigate to the portal UI in your browser to start bootstrapping the portal. You should see the following:
{{< img src="img/dashboard/portal-management/enterprise-portal/portal-bootstrap-ui-empty.png" width=800 alt="Portal bootstrap UI" >}}

Enter the admin email, password, first name, and last name. Then click on the `Register to Developer portal` button to complete the bootstrapping process.

The bootstrap process should take no longer than a couple of seconds, so almost instantly the portal will display the following page, which confirms the successful bootstrap.
{{< img src="img/dashboard/portal-management/enterprise-portal/portal-bootstrap-successful.png" width=800 alt="Successful bootstrapping" >}}

Click on the `Login` button to proceed to the login page, where you can use the newly created super admin credentials to log in to the portal.

### Bootstrapping the Portal via the API
The second approach to bootstrap the portal is through the bootstrap API, which allows you to programmatically bootstrap the portal.

To bootstrap the portal via an API call, call the bootstrap API:
```shell
curl --location 'http://<your-portal-host>:<your-portal-port>/portal-api/bootstrap' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username":"super-admin@tyk.io",
    "password": "tyk123",
    "first_name":"John",
    "last_name":"Doe"
}'
```

The bootstrap API accepts the following parameters:
- **username** - email of the super admin, it is also used as their login
- **password** - the super admin login password
- **first_name** - first name of the super admin
- **last_name** - first name of the super admin

The bootstrap process should take no longer than a couple of seconds. You will receive the following response as a confirmation of the successful bootstrapping:
```json
{
    "code": "OK",
    "message": "Bootstrapped user successfully",
    "data": {
        "api_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJQcm92aWRlciI6Im5vbmUiLCJVc2VySUQiOiIkMmEkMTAkREF0czZhZTY0ZEZXSkFTbnR2OS8yLmMxcS91VTFhbTRGYk53RVJhTE1Ed2c0NHFsSXJnMkMifQ.ExTNl6UvjQA6WqrPE-7OkSNCBBixc2NGMnh3dnlk5Nw"
    }
}
```

{{< note success >}}
**Take a note of the api_token field**

You will need this to call other Portal APIs.
{{</ note >}}

### Login as the super admin
After you have bootstrapped the portal, either via the UI or the bootstrap API, you can use the super admin's login credentials to log in to the portal.
Open the portal UI in your browser and click on the 'Login' button to open the login page.
{{< img src="img/dashboard/portal-management/enterprise-portal/navigate-to-the-login-page.png" width=800 alt="Open the login page" >}}
<br/>

On the login page, enter the super admin credentials for logging into the portal:
{{< img src="img/dashboard/portal-management/enterprise-portal/login-page-after-bootstrapping.png" width=800 alt="Open the login page" >}}

<br/>

{{< note success >}}
**Congratulations!**


Now you have a fully functional portal.
{{</ note >}}

<br/>

You can continue configuring and customizing it either via the UI or the portal admin API. Please refer to [the Tyk Enterprise Developer Portal Concepts section]({{< ref "product-stack/tyk-enterprise-developer-portal/getting-started/enterprise-portal-concepts" >}}) for further guidance.

## Portal Environment Variable Configuration

To configure the Tyk Enterprise Developer Portal, you can use either a config file or environment variables.
The below table provides reference to all options available to you when configuring the portal.

### Portal settings
This section explains the general portal settings, including which port it will be listening on, how often it should synchronize API Products and plans with the Tyk Dashboard, and so on.
Most of these settings are optional, except for the PORTAL_LICENSEKEY. If you don't specify these settings, the default values will be used.
However, you can leverage the settings below to customize the deployment of your portal.

#### Sample storage setting section via config file
```json
{
  "HostPort": 3001,
  "RefreshInterval": 10,
  "LicenseKey": "your-license-key",
  "Theming": {
    "Theme": "default",
    "Path": "./themes"
  },
  "ProductDocRenderer": "stoplight",
  "LogLevel": "debug",
  "LogFormat": "dev",
  "TLSConfig": {
    "Enable": true,
    "InsecureSkipVerify": true,
    "Certificates": [
      {
        "Name": "localhost",
        "CertFile": "portal.crt",
        "KeyFile": "portal.key"
      }
    ],
    "MinVersion": "772"
  },
  "PortalAPISecret": "your-portal-api-secret"
}
```

#### Sample storage setting section via environment variables
```.ini
PORTAL_HOSTPORT=3001
PORTAL_REFRESHINTERVAL=10
PORTAL_LICENSEKEY=your-license-key
PORTAL_THEMING_THEME=default
PORTAL_THEMING_PATH=./themes
PORTAL_DOCRENDERER=stoplight
PORTAL_LOG_LEVEL=debug
PORTAL_LOG_FORMAT=dev
PORTAL_TLS_ENABLE=true
PORTAL_TLS_INSECURE_SKIP_VERIFY=true
PORTAL_TLS_CERTIFICATES = '[{"Name": "localhost","CertFile": "portal.crt","KeyFile": "portal.key"}]'
PORTAL_API_SECRET=your-portal-api-secret
```

#### PORTAL_HOSTPORT
**Config file:** HostPort <br/>
**Type:** `int` <br/>
**Description**: The port on which the portal will run inside the container. Not required. If it is not specified, the default value is 3001.

#### PORTAL_REFRESHINTERVAL
**Config file:** RefreshInterval <br/>
**Type:** `int` <br/>
**Description**: How the portal will synchronise API Products and plans with the Tyk Dashboard. The value is specified in minutes.
Not required. If it is not specified, the default value is 10.

#### PORTAL_LICENSEKEY
**Config file:** LicenseKey <br/>
**Type:** `string` <br/>
**Description**: A license key that Tyk provides. Required to start the portal.

#### PORTAL_THEMING_THEME
**Config file:** Theming.Theme <br/>
**Type:** `string` <br/>
**Description**: The name of a theme the portal should use after the start-up. You can change this later via the Themes UI.
It's not required to specify as the portal comes with only one theme named `default`,  therefore, PORTAL_THEMING_THEME defaults `default`.
However, if you already created [a theme]({{< ref "/content/tyk-stack/tyk-developer-portal/enterprise-developer-portal/customise-enterprise-portal/full-customisation/full-customisation.md" >}}) and want the portal to use when it's starts for the first time, then you can use this setting to achieve that.

#### PORTAL_THEMING_PATH
**Config file:** Theming.Path <br/>
**Type:** `string` <br/>
**Description**: Defines a folder where themes are located. Depending on the storage type that you use, you can specify either a relative or an absolute path:
- If you use the `fs` storage type, you can specify both a relative path (e.g., `./themes`) and an absolute path (e.g., `/themes`)
- If you use the `s3` or `db` storage type, however, you can only use an absolute path (e.g., `/themes`).

The default value for this variable is `./themes`, so it's important to redefine it if you plan to use the `s3` or `db` storage types.

#### PORTAL_THEMING_DISABLE_UPLOAD
**Config file:** Theming.DisableUpload <br/>
**Type:** `boolean` <br/>
**Description**: Disables uploading theme via the UI. The default value is `false`.

#### PORTAL_MAX_UPLOAD_SIZE
**Config file:** MaxUploadSize <br/>
**Type:** `int` <br/>
**Description**: Defines the maximum size in bytes of a theme file that can be uploaded via the UI. The default value is 33554432 bytes (32 mb).

Please note that the size of individual files should not exceed 5 MB. If the size of any individual file in a theme exceeds 5 MB, the theme will not be uploaded, even if the total size of all files is less than `PORTAL_MAX_UPLOAD_SIZE`.

#### PORTAL_DOCRENDERER
**Config file:** ProductDocRenderer <br/>
**Type:** `string` <br/>
**Options:**
- `stoplight` to use Stoplight as a documentation renderer;
- `redoc` to use Redoc as a documentation renderer.

**Description**: Use this setting to specify which OAS documentation renderer to use to render Open API Specification. Not required. If it is not specified, the default value is `stoplight`.

#### PORTAL_DCR_LOG_ENABLED
**Config file:** DCRLogEnabled <br/>
**Type:** `boolean` <br/>
**Description**: When enabled, the portal will print raw responses from OAuth2.0 Identity Provider for the DCR flow.
Raw responses from the Identity Providers may contain sensitive information, therefore we recommend enabling this option only for debugging purposes. Available options are:
- `true` for enabling the detailed logs;
- `false` for disabling the detailed logs.
The default value is `false`.

### Audit log settings
This section explains how to configure the audit log in the portal. When the audit log is enabled, each admins' action will leave a trace in the *portal.log* file located at in the directory specified by the `PORTAL_AUDIT_LOG_ENABLE` setting.

#### PORTAL_AUDIT_LOG_ENABLE
**Config file:** AuditLog.Enable <br/>
**Type:** `boolean` <br/>
**Description**: Enables the audit log capability. The default value is `false`.

#### PORTAL_AUDIT_LOG_PATH
**Config file:** AuditLog.Path <br/>
**Type:** `string` <br/>
**Description**: Path to a directory with the audit log file. When audit log is enabled, the portal will create a file called `portal.log` in that directory. All admin actions will be reflected in that file.

### Session management
This section explains how to configure session management for the portal. Using the settings below, you can configure:
- Name of the portal's session cookie.
- Various aspects of cookie security, including: should it be sent using an TLS-encrypted connection and is it accessible by Javascript API on the client-side?
- Cookie encryption key.
- Cookie lifetime.

#### PORTAL_SESSION_NAME
**Config file:** Session.Name <br/>
**Type:** `string` <br/>
**Description**: Name of the portal's cookie. Default value is `portal-session`.

#### PORTAL_SESSION_SECURE
**Config file:** Session.Secure <br/>
**Type:** `boolean` <br/>
**Description**: Controls whether the portal adds the `Secure` attribute to the `Set-Cookie` header in all responses from the portal's backend, except for the admin APIs. It's important to note that if the connection between the portal and the browser is not secured with TLS, the browser will ignore the `Secure` attribute.
We recommend enabling TLS and setting this attribute to `true` for all production environments. Default value is `false`.

#### PORTAL_SESSION_HTTPONLY
**Config file:** Session.HttpOnly <br/>
**Type:** `boolean` <br/>
**Description**: Controls whether the portal adds the `HttpOnly` attribute to the `Set-Cookie` header in all responses from the portal's backend, except for the admin APIs. This cookie attribute controls if the cookie is only accessible at the server and not by Javascript on the client side.
This is a security measure to prevent XSS attacks.

We recommend setting it to `true` in production environments. The default value is `true`.

#### PORTAL_SESSION_SAMESITE
**Config file:** Session.SameSite <br/>
**Type:** `string` <br/>
**Description**: Controls the value of the `SameSite` attribute for the portal’s cookie. The portal adds the `SameStie` attribute with the value specified in `PORTAL_SESSION_SAMESITE` to the `Set-Cookie` header in all responses from the portal's backend, except for the admin APIs.
Available options are:
- `None`;
- `Lax`;
- `Strict`.

The default value is `Strict`. If the value specified in the `PORTAL_SESSION_SAMESITE` setting does not match any of the above-mentioned options, it defaults to `Strict`.

#### PORTAL_SESSION_KEY
**Config file:** Session.Key <br/>
**Type:** `string` <br/>
**Description**: The cookie encryption key. The default value is a random 32-bytes string.

#### PORTAL_SESSION_LIFETIME
**Config file:** Session.LifeTime <br/>
**Type:** `int` <br/>
**Description**: The lifetime of the portal's session in seconds. The default value is 604800 seconds (7 days).

### PORTAL_SESSION_IDLE_TIMEOUT
**Config file:** Session.IdleTimeout <br/>
**Type:** `int` <br/>
**Description**: The duration in seconds before a portal session is considered idle. A session is deemed idle when there is no user activity, such as clicks, navigation, or input. Once the idle timeout is reached, the session will expire, requiring the user to log in again. The default value is 3600 seconds (1 hour).

#### PORTAL_ENABLE_HTTP_PROFILER
**Config file:** EnableHttpProfiler <br/>
**Type:** `boolean` <br/>
**Description**: Enables debugging of the portal by exposing the Golang profiling information at `/debug/pprof/`. The default value is `false`.

{{< note success >}}
**Profiling**

We recommend using the profiler only in non-production environments. Be sure to disable it in production by setting `PORTAL_ENABLE_HTTP_PROFILER` to `false`.

{{< /note >}}

#### PORTAL_LOG_LEVEL
**Config file:** LogLevel <br/>
**Type:** `string` <br/>
**Description**: Defines the log level, available options are:
- debug
- info
- warn
- error
- dpanic
- panic
- fatal

#### PORTAL_LOG_FORMAT
**Config file:** LogFormat <br/>
**Type:** `string` <br/>
**Description**: Defines the log format, available options are:
- `dev` for verbose human-readable output
- `prod` for output in json format.

#### PORTAL_TLS_ENABLE
**Config file:** TLSConfig.Enable <br/>
**Type:** `boolean` <br/>
**Description**: Enables TLS. The default value is `false`.

#### PORTAL_TLS_INSECURE_SKIP_VERIFY
**Config file:** TLSConfig.InsecureSkipVerify <br/>
**Type:** `boolean` <br/>
**Description**: Skip verification of self-signed certificates.

#### PORTAL_TLS_MIN_VERSION
**Config file:** TLSConfig.MinVersion <br/>
**Type:** `string` <br/>
**Description**: Minimum TLS version. Defaults to 769 (TLS 1.0).

Values for TLS Versions:

| TLS Version   | Value to Use   |
|---------------|----------------|
|      1.0      |      769       |
|      1.1      |      770       |
|      1.2      |      771       |
|      1.3      |      772       |

#### PORTAL_TLS_MAX_VERSION
**Config file:** TLSConfig.MaxVersion <br/>
**Type:** `string` <br/>
**Description**: Maximum TLS version. Defaults to 772 (TLS 1.3).

Values for TLS Versions:

| TLS Version   | Value to Use   |
|---------------|----------------|
|      1.0      |      769       |
|      1.1      |      770       |
|      1.2      |      771       |
|      1.3      |      772       |

#### PORTAL_TLS_CIPHER_SUITES
**Config file:** TLSConfig.CipherSuites <br/>
**Type:** `[]string` <br/>
**Description**: Array of allowed cipher suites as defined at https://golang.org/pkg/crypto/tls/#pkg-constants.

#### PORTAL_TLS_CERTIFICATES
**Config file:** TLSConfig.Certificates <br/>
**Type:** `json` <br/>
**Description**: JSON (or JSON-formatted string in case of environment variable) containing list of certificates. Each certificate is defined by three properties:
- Name
- CertFile
- KeyFile

#### PORTAL_API_SECRET
**Config file:** PortalAPISecret <br/>
**Type:** `string` <br/>
**Description**: API secret for enabling [Single Sign-on (SSO) flow]({{< ref "/content/tyk-stack/tyk-developer-portal/enterprise-developer-portal/managing-access/enable-sso.md" >}}) with the Tyk Identity Broker.
You can specify any string value in this setting. Omit this setting if you don't require SSO. 

### Response Headers Configuration
This section explains how to configure custom HTTP response headers that will be added to all responses from the Portal.

#### PORTAL_RESPONSE_HEADERS
**Config file:** ResponseHeaders <br/>
**Type:** `[]{Key: string, Value: string}` <br/>
**Description**: Configures custom HTTP response headers that will be added to all responses from the Portal. The value must be a JSON array of objects containing Key and Value fields.

**Example configuration via environment variable:**
```bash
export PORTAL_RESPONSE_HEADERS='[{"Key":"X-Frame-Options", "Value":"DENY"}, {"Key":"Content-Security-Policy", "Value":"default-src '\''self'\''"}]'
```

**Example configuration via config file:**
```json
{
  "ResponseHeaders": [
    {
      "Key": "X-Frame-Options",
      "Value": "DENY"
    },
    {
      "Key": "Content-Security-Policy",
      "Value": "default-src 'self'"
    }
  ]
}
```

**Common use cases include:**
- Security headers (X-Frame-Options, Content-Security-Policy)
- CORS headers
- Cache control headers
- Custom application headers

If the JSON format is invalid, the Portal will return an error message indicating the correct format:
```
Invalid value for PORTAL_RESPONSE_HEADERS. Valid Format: '[{"Key":"header-key", "Value":"value-for-given-key"}]'
```

### Storage settings
Using variables from this section, you can configure storage for the portal's CMS assets such as themes, images, and Open API Specification files. The portal supports two types of storage:
- S3 volume;
- And filesystem.

#### Sample storage setting section via config file
```json
{
  "Storage": "s3",
  "S3": {
    "AccessKey": "your-access-key",
    "SecretKey": "your-secret-key",
    "Region": "sa-east-1",
    "Endpoint": "https://s3.sa-east-1.amazonaws.com",
    "Bucket": "your-portal-bucket",
    "ACL": "private",
    "PresignURLs": true
    }
}
```

#### Sample storage setting section via environment variables
```.ini
PORTAL_STORAGE=s3
PORTAL_S3_AWS_ACCESS_KEY_ID=your-access-key
PORTAL_S3_AWS_SECRET_ACCESS_KEY=your-secret-key
PORTAL_S3_REGION=sa-east-1
PORTAL_S3_ENDPOINT=your-portal-bucket
PORTAL_S3_BUCKET=https://s3.sa-east-1.amazonaws.com
PORTAL_S3_ACL=private
PORTAL_S3_PRESIGN_URLS=true
```

#### PORTAL_STORAGE
**Config file:** Storage <br/>
**Type:** `string` <br/>
**Options:**
- `fs` to use file system storage type;
- `db` to use the portal's main database. If the `db` is selected as a storage type, the portal application will create appropriate structure in the database that 
- `s3` to use S3 volume for storing the portal assets.

**Description**: Defines which type of storage to use for the portal's CMS assets. Not required. If it is not specified, the default value is `fs`.

#### PORTAL_S3_AWS_ACCESS_KEY_ID
**Config file:** S3.AccessKey <br/>
**Type:** `string` <br/>
**Description**: Access key for your S3 bucket. This option is only required for the `s3` storage type and will be ignored for the `fs` and `db` storage types.

#### PORTAL_S3_AWS_SECRET_ACCESS_KEY
**Config file:** S3.SecretKey <br/>
**Type:** `string` <br/>
**Description**: Secret access key for your S3 bucket. This option is only required for the `s3` storage type and will be ignored for the `fs` and `db` storage types.

#### PORTAL_S3_REGION
**Config file:** S3.Region <br/>
**Type:** `string` <br/>
**Description**: AWS region where the S3 bucket is hosted. E.g., `sa-east-1`. This option is only required for the `s3` storage type and will be ignored for the `fs` and `db` storage types.

#### PORTAL_S3_ENDPOINT
**Config file:** S3.Endpoint <br/>
**Type:** `string` <br/>
**Description**: URL to object storage service. E.g., `https://s3.sa-east-1.amazonaws.com` or `https://play.min.io`. This option is only required for the `s3` storage type and will be ignored for the `fs` and `db` storage types.

#### PORTAL_S3_BUCKET
**Config file:** S3.Bucket <br/>
**Type:** `string` <br/>
**Description**: Name of the S3 bucket. Required only for the `s3` storage type. This option is only required for the `s3` storage type and will be ignored for the `fs` and `db` storage types.

#### PORTAL_S3_ACL
**Config file:** S3.ACL <br/>
**Type:** `string` <br/>
**Description**: ACL permissions are set on the bucket, with options including `private`, `public-read`, `public-read-write`, and `authenticated-read`.
If the bucket uses a policy to set permissions, you should leave the ACL value empty. This option is only required for the `s3` storage type and will be ignored for the `fs` and `db` storage types.

#### PORTAL_S3_PRESIGN_URLS
**Config file:** S3.PresignURLs <br/>
**Type:** `string` <br/>
**Description**: The PresignURLs option instructs the client to retrieve presigned URLs for the objects.
This is particularly useful if the bucket is private and you need to access the object directly, such as when displaying an image on a web page.
This option is only required for the `s3` storage type and will be ignored for the `fs` and `db` storage types.

#### PORTAL_ASSETS_CACHE_DISABLE
**Config file:** AssetsCache.Disable <br/>
**Type:** `boolean` <br/>
**Description**: If the storage type is set to `db`, an in memory cache will be used for the themes storage. This configuration disables the assets cache. The default value is `false`.

### TLS configuration
This section explains the TLS configuration settings to enable connection to the portal's UI over HTTPS.

#### PORTAL_TLS_ENABLE
**Config file:** TLSConfig.Enable <br/>
**Type:** `boolean` <br/>
**Description**: Enables or disables connection over https. When TLS is enabled, the portal will expect a TLS certificate to be provided via *PORTAL_TLS_CERTIFICATES*.
When TLS is enabled and no certificates are provided, the portal won't start. The default value is `false`.

#### PORTAL_TLS_CERTIFICATES
**Config file:** TLSConfig.Certificates <br/>
**Type:** `string` <br/>
**Description**: A JSON formatted string that provides the hostname , in addition to the paths to a TLS certificate and key file:
- `Name`: The hostname of the portal. This should match with the hostname of the certificate file.
- `CertFile`: The path to a TLS certificate file in the CRT format for the specified hostname.
- `KeyFile`: The path to a TLS key file for the specified hostname.
Example:
```json
[{"Name": "tyk.io","CertFile": "portal.crt","KeyFile": "portal.key"}]
```


### Database connection settings
This section provides a reference for the database connection settings used in the portal.
#### Sample database connection setting section via config file
```json
{
  "Database": {
    "Dialect": "mysql",
    "ConnectionString": "admin:secr3t@(localhost:3308)/portal?charset=utf8&parseTime=True&loc=Local",
    "EnableLogs": true,
    "MaxRetries": 3,
    "RetryDelay": 2000,
    "MaxOpenConnections": 20,
    "MaxIdleConnections": 2,
    "ConnectionMaxLifetime": 180000

  }
}
```

#### Sample database connection setting section via environment variables
```.ini
PORTAL_DATABASE_DIALECT="mysql"
PORTAL_DATABASE_CONNECTIONSTRING="admin:secr3t@(localhost:3308)/portal?charset=utf8&parseTime=True&loc=Local"
PORTAL_DATABASE_ENABLELOGS=true
PORTAL_DATABASE_MAXRETRIES=3
PORTAL_DATABASE_RETRYDELAY=5000
PORTAL_DATABASE_MAX_OPEN_CONNECTIONS=20
PORTAL_DATABASE_MAX_IDLE_CONNECTIONS=2
PORTAL_DATABASE_CONNECTION_MAX_LIFETIME=180000
```

#### PORTAL_DATABASE_DIALECT
**Config file:** Database.Dialect  <br/>
**Type:** `string` <br/>
**Description**: A database will be used to store the portal data. Available dialects are:
- `mysql`
- `postgres`
- `sqlite3`

#### PORTAL_DATABASE_CONNECTIONSTRING
**Config file:** Database.ConnectionString <br/>
**Type:** `string` <br/>
**Description**: Connection string to the selected database. This setting must be present if the `PORTAL_DATABASE_DIALECT` is specified.

#### PORTAL_DATABASE_ENABLELOGS
**Config file:** Database.EnableLogs <br/>
**Type:** `boolean` <br/>
**Description**: Enables logging connection to the database. We recommend disabling this in production environments.

#### PORTAL_DATABASE_MAXRETRIES
**Config file:** Database.MaxRetries <br/>
**Type:** `boolean` <br/>
**Description**: Defines how many times the portal will retry to connect to the database. Optional, the default value is 3.

#### PORTAL_DATABASE_RETRYDELAY
**Config file:** Database.MaxRetries <br/>
**Type:** `boolean` <br/>
**Description**: Defines delay between connect attempts (in milliseconds). Optional, the default value is 5000.

#### PORTAL_DATABASE_MAX_OPEN_CONNECTIONS
**Config file:** Database.MaxOpenConnections <br/>
**Type:** `int` <br/>
**Description**: Defines the maximum number of concurrent connections that the database can handle from the application. When the number of open connections reaches this limit, new requests will wait until a connection becomes available. Optional, the default value is unlimited.

#### PORTAL_DATABASE_MAX_IDLE_CONNECTIONS
**Config file:** Database.MaxIdleConnections <br/>
**Type:** `int` <br/>
**Description**: Defines the maximum number of idle connections in the database connection pool. Idle connections are open but not currently being used. Keeping some idle connections can improve performance by reducing the time it takes to establish a new connection when demand increases. Optional, the default value is 2.

#### PORTAL_DATABASE_CONNECTION_MAX_LIFETIME
**Config file:** Database.ConnectionMaxLifetime <br/>
**Type:** `int` <br/>
**Description**: Defines the maximum lifetime of a connection in milliseconds. This setting is optional. If not specified, the default value is 1800000 milliseconds (30 minutes). If set to `0`, the connection lifetime is unlimited, meaning connections are reused indefinitely unless closed due to errors or manually by the application.


### CORS settings
This section explains how to configure [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) for the portal.

#### PORTAL_CORS_ENABLE
**Config file:** CORS.Enable <br/>
**Type:** `boolean` <br/>
**Description**: Enables or disables the CORS settings for the portal. When disabled no CORS settings are applied.
In other words, any cross-origin request will be denied. When enabled, the below defined CORS settings are applied. The default value is `false`.

#### PORTAL_CORS_ALLOWED_ORIGINS
**Config file:** CORS.AllowedOrigins <br/>
**Type:** `[string]` <br/>
**Description**: A list of origin domains to allow access from. Wildcards are also supported, e.g. [`*.foo.com`] will allow access from any domain that ends with *.foo.com*.
By default, no origins are allowed. To apply this setting an array of the allowed origins.

To configure using a configuration file:
```json
{
  "CORS": {
    "AllowedOrigins": ["*.foo.com","*.bar.com"]
  }
}
```
To configure using an environment variable:
```console
PORTAL_CORS_ALLOWED_ORIGINS=*.foo.com,*.bar.com
```

#### PORTAL_CORS_ALLOWED_HEADERS
**Config file:** CORS.AllowedHeaders <br/>
**Type:** `[string]` <br/>
**Description**: Headers that are allowed within a request. To apply this setting, specify an array of the allowed headers. By default, no headers are allowed.

To configure using a configuration file:
```json
{
  "CORS": {
    "AllowedHeaders": ["X-Method-Override","X-API-Key"]
  }
}
```
To configure using an environment variable:
```console
PORTAL_CORS_ALLOWED_HEADERS=X-Method-Override,X-API-Key
```

#### PORTAL_CORS_ALLOWED_METHODS
**Config file:** CORS.AllowedMethods <br/>
**Type:** `[string]` <br/>
**Description**: A list of methods that are allowed access access. To apply this setting specify an array of the allowed methods. By default, `GET` and `POST` methods are allowed.

To configure using a configuration file:
```json
{
  "CORS": {
    "AllowedMethods": ["GET", "POST", "HEAD"]
  }
}
```
To configure using an environment variable:
```console
PORTAL_CORS_ALLOWED_METHODS=GET,POST,HEAD
```

#### PORTAL_CORS_MAX_AGE
**Config file:** CORS.MaxAge <br/>
**Type:** `int` <br/>
**Description**: Indicates how long the results of a preflight request can be cached. The default value is `0` which stands for no max age.

#### PORTAL_DISABLE_CSRF_CHECK
**Config file:** DisableCSRFCheck <br/>
**Type:** `bool` <br/>
**Description**: When set to `true`, disables CSRF protection for all routes. By default, CSRF protection is enabled to prevent cross-site request forgery attacks. Only disable this in development environments or when you have alternative security measures in place.

#### PORTAL_CORS_ALLOW_CREDENTIALS
**Config file:** CORS.AllowCredentials <br/>
**Type:** `boolean` <br/>
**Description**: Indicates whether the request can include user credentials like cookies, HTTP authentication or client side SSL certificates. The default is `false`.

#### PORTAL_TIB_ENABLED
**Config file:** TIB.Enabled <br/>
**Type:** `boolean` <br/>
**Description**: Enables or disables the Tyk Identity Broker (TIB) integration. When disabled, it will not appear in the UI. The default value is `false`.

#### PORTAL_NOTIFICATIONS_JOB_FREQUENCY
**Config file:** NotificationsJobFrequency <br/>
**Type:** `int` <br/>
**Description**: Defines the frequency of the notifications job that fetch notifications from the portal's database in minutes. The default value is `30` minutes.


### Sample config file
```json
{
  "HostPort": 3001,
  "RefreshInterval": 10,
  "LicenseKey": "your-license-key",
  "Theming": {
    "Theme": "default",
    "Path": "./themes"
  },
  "ProductDocRenderer": "stoplight",
  "LogLevel": "debug",
  "LogFormat": "dev",
  "TLSConfig": {
    "Enable": true,
    "InsecureSkipVerify": true,
    "Certificates": [
      {
        "Name": "localhost",
        "CertFile": "portal.crt",
        "KeyFile": "portal.key"
      }
    ]
  },
  "PortalAPISecret": "your-portal-api-secret",
  "Storage": "s3",
  "S3": {
    "AccessKey": "your-access-key",
    "SecretKey": "your-secret-key",
    "Region": "sa-east-1",
    "Endpoint": "https://s3.sa-east-1.amazonaws.com",
    "Bucket": "your-portal-bucket",
    "ACL": "private",
    "PresignURLs": true
  },
  "Database": {
    "Dialect": "mysql",
    "ConnectionString": "admin:secr3t@(localhost:3308)/portal?charset=utf8&parseTime=True&loc=Local",
    "EnableLogs": true,
    "MaxRetries": 3,
    "RetryDelay": 2000
  },
  "TIB": {
    "Enabled": true
  }
}
```
### Sample .env file
```ini
PORTAL_HOSTPORT=3001
PORTAL_REFRESHINTERVAL=10
PORTAL_LICENSEKEY=your-license-key
PORTAL_THEMING_THEME=default
PORTAL_THEMING_PATH=./themes
PORTAL_DOCRENDERER=stoplight
PORTAL_LOG_LEVEL=debug
PORTAL_LOG_FORMAT=dev
PORTAL_TLS_ENABLE=true
PORTAL_TLS_INSECURE_SKIP_VERIFY=true
PORTAL_TLS_CERTIFICATES = '[{"Name": "localhost","CertFile": "portal.crt","KeyFile": "portal.key"}]'
PORTAL_API_SECRET=your-portal-api-secret
PORTAL_STORAGE=s3
PORTAL_S3_AWS_ACCESS_KEY_ID=your-access-key
PORTAL_S3_AWS_SECRET_ACCESS_KEY=your-secret-key
PORTAL_S3_REGION=sa-east-1
PORTAL_S3_ENDPOINT=your-portal-bucket
PORTAL_S3_BUCKET=https://s3.sa-east-1.amazonaws.com
PORTAL_S3_ACL=private
PORTAL_S3_PRESIGN_URLS=true
PORTAL_DATABASE_DIALECT="mysql"
PORTAL_DATABASE_CONNECTIONSTRING="admin:secr3t@(localhost:3308)/portal?charset=utf8&parseTime=True&loc=Local"
PORTAL_DATABASE_ENABLELOGS=true
PORTAL_DATABASE_MAXRETRIES=3
PORTAL_DATABASE_RETRYDELAY=5000
PORTAL_TIB_ENABLED=true
```

## Airgap Environments

In highly secure environments, it is often necessary to configure a firewall precisely and to allow only the endpoints exposed for the portal, while banning all other routes.
For this purpose, we have prepared a list of all endpoints exposed by the Tyk Enterprise Developer Portal v1.9.0.

{{< note success >}}

Please note that this list only refers to v1.9.0 of the portal. The list of endpoints for other version might be different.  

{{< /note >}}


### List of the portal endpoints

#### Admin APIs
| **Resource**       | **Endpoint**                                                                           |
| ------------------ | -------------------------------------------------------------------------------------- |
| Providers          | /providers                                                                             |
| Providers          | /providers/{provider_id}                                                               |
| Providers          | /providers/{provider_id}/synchronize                                                   |
| Users              | /users                                                                                 |
| Users              | /users/{user_id}                                                                       |
| Users              | /users/{user_id}/custom-attributes                                                     |
| Users              | /users/{user_id}/custom-attributes/{custom-attribute_id}                               |
| Organizations      | /organisations                                                                         |
| Organizations      | /organisations/{organisation_id}                                                       |
| Teams              | /organisations/{organisation_id}/teams                                                 |
| Teams              | /organisations/{organisation_id}/teams                                                 |
| Products           | /products                                                                              |
| Products           | /products/{product_id}                                                                 |
| Product Docs       | /products/{product_id}/docs                                                            |
| Product Docs       | /products/{product_id}/docs/{doc_id}                                                   |
| Product Docs       | /products/{product_id}/docs/reorder                                                    |
| API Doc            | /products/{product_id}/api-details                                                     |
| API Doc            | /products/{product_id}/api-details/{api-id}                                            |
| API Doc            | /products/{product_id}/api-details/{api_id}/oas                                        |
| Plans              | /plans                                                                                 |
| Plans              | /plans/{plan_id}                                                                       |
| Catalogues         | /catalogues                                                                            |
| Catalogues         | /catalogues/{catalogue_id}                                                             |
| Catalogues         | /catalogues/{catalogue_id}/audiences                                                   |
| Catalogues         | /catalogues/{catalogue_id}/audiences/{audience_id}                                     |
| Access Requests    | /access_requests                                                                       |
| Access Requests    | /access_requests/{access_request_id}                                                   |
| Access Requests    | /access_requests/{access_request_id}/approve                                           |
| Access Requests    | /access_requests/{access_request_id}/reject                                            |
| Applications       | /apps                                                                                  |
| Applications       | /apps/{app_id}                                                                         |
| Applications       | /apps/{app_id}/access-requests                                                         |
| Applications       | /apps/{app_id}/access-requests/{access-request_id}                                     |
| Applications       | /apps/{app_id}/provision                                                               |
| Credentials        | /apps/{app_id}/access-requests/{access-request_id}/credentials                         |
| Credentials        | /apps/{app_id}/access-requests/{access-request_id}/credentials/{credential_id}         |
| Config             | /configs                                                                               |
| Pages              | /pages                                                                                 |
| Pages              | /pages/{page_id}                                                                       |
| Pages              | /pages/{page_id}/content-blocks                                                        |
| Pages              | /pages/{page_id}/content-blocks/{content-block_id}                                     |
| Themes             | /themes                                                                                |
| Themes             | /themes/{theme_id}                                                                     |
| Themes             | /themes/{theme_id}/activate                                                            |
| Themes             | /themes/{theme_id}/download                                                            |
| Themes             | /themes/upload                                                                         |
| Custom Attributes  | /extended_attributes                                                                   |
| Custom Attributes  | /extended_attributes/{extended_attribute_id}                                           |
| Custom Attributes  | /extended_attributes/{extended_attribute_id}/custom-attributes                         |
| Custom Attributes  | /extended_attributes/{extended_attribute_id}/custom-attributes/{custom_attribute_id}   |
| Custom Attributes  | /extended_attributes/{extended_attribute_id}/default-attributes                        |
| Custom Attributes  | /extended_attributes/{extended_attribute_id}/default-attributes/{default_attribute_id} |
| OAuth2.0 Providers | /oauth-providers                                                                       |
| OAuth2.0 Providers | /oauth-providers/{provider_id}                                                         |
| OAuth2.0 Providers | /oauth-providers/{provider_id}/client-types                                            |
| OAuth2.0 Providers | /oauth-providers/{provider_id}/client-types/{client_type_id}                           |
| Tags               | /products/{product_id}/tags                                                            |
| Tags               | /products/{product_id}/tags/{tag_name}                                                 |
| Client Types       | /products/{product_id}/client_types                                                    |
| Client Types       | /products/{product_id}/client_types/{client_type_id}                                   |

#### Admin dashboard endpoints
| **Resource**       | **Endpoint**                                                   |
| ------------------ | -------------------------------------------------------------- |
| Login              | /auth/password/login                                           |
| Logout             | /auth/password/logout                                          |
| Profile            | /admin/admin_profile                                           |
| Profile            | /admin/admin_profile/rotate                                    |
| Providers          | /admin/providers                                               |
| Providers          | /admin/providers/new                                           |
| Providers          | /admin/providers/{provider_id}                                 |
| Providers          | /admin/providers/{provider_id}/synchronize                     |
| Products           | /admin/api_products                                            |
| Products           | /admin/api_products/{api_product_id}                           |
| Products           | /admin/api_products/{api_product_id}/posts/{post_id}/move_up   |
| Products           | /admin/api_products/{api_product_id}/posts/{post_id}/move_down |
| Plans              | /admin/plans                                                   |
| Plans              | /admin/plans/{plan_id}                                         |
| Catalogues         | /admin/catalogues                                              |
| Catalogues         | /admin/catalogues/new                                          |
| Catalogues         | /admin/catalogues/{catalogue_id}                               |
| Product Docs       | /admin/product_docs                                            |
| Product Docs       | /admin/product_docs/{product_doc_id}                           |
| OAuth2.0 Providers | /admin/oauth2-0-providers                                      |
| OAuth2.0 Providers | /admin/oauth2-0-providers/new                                  |
| OAuth2.0 Providers | /admin/oauth2-0-providers/{oauth2.0-provider_id}               |
| OAuth2.0 Providers | /admin/oauth2-0-providers/ping                                 |
| Apps               | /admin/apps                                                    |
| Apps               | /admin/apps/{app_id}                                           |
| Access Requests    | /admin/access_requests                                         |
| Access Requests    | /admin/access_requests/{access_request_id}                     |
| Access Requests    | /admin/access_requests/{access_request_id}/approve             |
| Access Requests    | /admin/access_requests/{access_request_id}/reject              |
| Users              | /admin/users, admin/admin_users                                |
| Users              | /admin/users/new                                               |
| Users              | /admin/admin_users/new                                         |
| Users              | /admin/users/{user_id}                                         |
| Users              | /admin/admin_users/{user_id}                                   |
| Users              | /admin/users/{user_id}/activate                                |
| Users              | /admin/admin_users/{user_id}/activate                          |
| Users              | /admin/users/{user_id}/send_invite                             |
| Users              | /admin/admin_users/{user_id}/send_invite                       |
| Users              | /admin/users/{user_id}/deactivate                              |
| Users              | /admin/admin_users/{user_id}/deactivate                        |
| Organizations      | /admin/organisations                                           |
| Organizations      | /admin/organisations/new                                       |
| Organizations      | /admin/organisations/org:{organisation_id}                     |
| Teams              | /admin/teams                                                   |
| Teams              | /admin/teams/new                                               |
| Teams              | /admin/teams/{team_id}                                         |
| Invite Codes       | /admin/invite_codes                                            |
| Invite Codes       | /admin/invite_codes/new                                        |
| Invite Codes       | /admin/invite_codes/{invite_code_id}                           |
| Themes             | /admin/themes                                                  |
| Themes             | /admin/themes/new                                              |
| Themes             | /admin/themes/{theme_name}                                     |
| Themes             | /admin/themes/{theme_name}/activate                            |
| Themes             | /admin/themes/{theme_name}/                                    |
| Themes             | /files/download                                                |
| Pages              | /admin/pages                                                   |
| Pages              | /admin/pages/new                                               |
| Pages              | /admin/pages/{page_id}                                         |
| Pages              | /admin/pages/{page_id}/to_draft                                |
| Menus              | /admin/menus                                                   |
| Menus              | /admin/menus/new                                               |
| Menus              | /admin/menus/{menu_id}                                         |
| Menus              | /admin/menus/{menu_id}/menu_items/{menu_item_id}/move_up       |
| Menus              | /admin/menus/{menu_id}/menu_items/{menu_item_id}/move_down     |
| Menu Items         | /admin/menu_items                                              |
| Menu Items         | /admin/menu_items/new                                          |
| Menu Items         | /admin/menu_items/{menu_item_id}                               |
| Custom Attributes  | /admin/custom_attributes                                       |
| Custom Attributes  | /admin/custom_attributes/{custom_attribute_id}                 |
| Posts              | /admin/posts                                                   |
| Posts              | /admin/posts/new                                               |
| Posts              | /admin/posts/{post_id}                                         |
| Categories         | /admin/categories                                              |
| Categories         | /admin/categories/new                                          |
| Categories         | /admin/categories/{category_id}                                |
| Tags               | /admin/tags                                                    |
| Tags               | /admin/tags/new                                                |
| Tags               | /admin/tags/{tag_id}                                           |
| Settings           | /admin/general                                                 |
| About              | /admin/about                                                   |
| Webhooks           | /admin/webhooks                                                |
| Webhooks           | /admin/webhooks/new                                            |
| Webhooks           | /admin/webhooks/{webhook_id}                                   |
| Webhooks           | /admin/webhooks/ping                                           |

#### Live portal endpoints
| **Resource**      | **Endpoint**                                                  |
| ----------------- | ------------------------------------------------------------- |
| Auth              | /auth/password/login                                          |
| Auth              | /auth/password/register                                       |
| Auth              | /auth/password/logout                                         |
| Auth              | /auth/password/new                                            |
| Auth              | /auth/password/edit                                           |
| Auth              | /auth/password/recover                                        |
| Auth              | /auth/password/update                                         |
| Auth              | /api/sso                                                      |
| Auth              | /api/portal/developers                                        |
| Auth              | /api/portal/developers/ssokey/{id}                            |
| Auth              | /api/portal/developers/{id}                                   |
| Auth              | /sso                                                          |
| Posts             | /blog                                                         |
| Posts             | /blog/category/{category}                                     |
| Posts             | /blog/{year}/{month}/{day}/{path}                             |
| Pages             | /about-us                                                     |
| Pages             | /portal/catalogue-products                                    |
| Products          | /portal/catalogue-products/{product_name}                     |
| Products          | /portal/catalogue-products/{product_name}/{api}/docs          |
| Products          | /portal/catalogue-products/{product_name}/{api}/docs/download |
| OAS Spec Render   | /portal/catalogue-products/{product_name}/\*                  |
| Cart              | /portal/private/cart/provision                                |
| Cart              | /portal/private/cart/remove/{catalogue_id}/{product_id}       |
| Apps              | /portal/private/dashboard                                     |
| Apps              | /portal/private/apps                                          |
| Apps              | /portal/private/apps/{app_id}                                 |
| Apps              | /portal/private/apps/{app_id}/cert/{cert_id}                  |
| Credentials       | /portal/private/credentials                                   |
| Profile           | /portal/private/profile                                       |
| Organization Flow | /portal/private/organisation                                  |
| Organization Flow | /portal/private/users                                         |
| Organization Flow | /portal/private/users/{user_id}                               |
| Organization Flow | /portal/private/users/{user_id}/edit                          |
| Organization Flow | /portal/private/users/invite                                  |
| Analytics         | /portal/private/analytics                                     |
| Analytics         | /portal/private/analytics/api/chart/overview                  |
| Analytics         | /portal/private/analytics/api/chart/traffic                   |
| Analytics         | /portal/private/analytics/api/chart/error                     |
| Analytics         | /portal/private/analytics/api/chart/latency                   |

#### Assets endpoints
| **Resource** | **Endpoint**                |
|--------------| --------------------------- |
| Images       | /assets/images/\*           |
| Javascripts  | /assets/javascripts/\*      |
| Stylesheets  | /assets/stylesheets/\*      |
| Vendors      | /assets/vendor/bootstrap/\* |
| Vendors      | /assets/vendor/jquery/\*    |