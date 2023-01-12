---
title: "Install Tyk Enterprise Portal"
date: 2022-02-08
tags: [""]
description: ""
menu:
  main:
    parent: "Tyk Enterprise Developer Portal"
weight: 2
---

{{< note success >}}
**Tyk Enterprise Developer Portal**

If you are interested in getting access contact us at [support@tyk.io](<mailto:support@tyk.io?subject=Tyk Enterprise Portal Beta>)

{{< /note >}}

## Installing Tyk Enterprise Developer Portal
We deliver the Tyk Enterprise Developer Portal as a Docker container. To  install Tyk Enterprise Developer Portal, you need to launch the Docker image for the portal.

We will explain the variables used by the Docker image for the portal and also how to get the portal running.

The following YouTube videos will run you through the installation process with MySQL and SQLite. Continue reading below for detailed instructions and explanations.

### With MySQL

{{< youtube 4Q9nMIY6jFY >}}

### With SQLite for POC purposes

{{< youtube odEtQjWCsN4 >}}

### Environment variables and .env file
#### Environment variables reference
The Tyk Enterprise Developer portal is configured by using the following environment variables that should be passed to the container during the start-up:
| Variable | Meaning | Required | Example value|
|-----------|----------|-------| ----|
| PORTAL_HOST_PORT | The port on which the portal will run inside the container. | No. If it is not specified, the default value is 3001. | 3001 |
|PORTAL_REFRESHINTERVAL| How the portal will synchronise API Products and plans with the Tyk Dashboard. The value is specified in minutes. | No. If it is not specified, the default value is 10. | 10 |
| PORTAL_DATABASE_DIALECT | A database will be used to store the portal data. Available dialects are mysql, postgres, and sqlite3. | No. If it is not specified, the portal will sqlite3 inside the container, we don't recommend this configuration for production environments. | `mysql` |
| PORTAL_DATABASE_CONNECTIONSTRING | Connection string to the selected database. | It is required if `PORTAL_DATABASE_DIALECT` is specified. | `login:password@tcp(the-database-host:3306)/portal?charset=utf8mb4&parseTime=true` |
| PORTAL_DATABASE_ENABLELOGS | It enables logging connection to the database. We recommend disabling this in production environments. | No. If it is not specified, the default value is `false`.  | `false` |
| PORTAL_THEMING_THEME | It defines which theme the portal should use after the start-up. You can change this later via the Themes UI. By default, the portal comes with only one theme named `default`,  therefore, PORTAL_THEMING_THEME should be equal to `default`. | No. If it is not specified, the default value is `default`.  | `default` |
| PORTAL_LICENSEKEY | A licence key that Tyk provides. | Yes. You can't use the portal without a licence key. | XXXX |
| ADMIN_EMAIL | The portal super admin email address for bootstrapping. | Yes. It must be specified on the first launch. | admin@tyk.io |
| ADMIN_PASSWORD | The portal super admin password for bootstrapping | Yes. It must be specified on the first launch. | secr3t |
| PROVIDER_NAME | You can specify connection settings to your Tyk Dashboard either via the Provider UI or using `PROVIDER_NAME` and `PROVIDER_DATA` variables. `PROVIDER_NAME` defines the name of your Tyk instance as it will appear in the UI. Later you can add more instances of the Tyk Dashboard using UI. | Yes. The default value is `Tyk Dashboard (Edit Me)`. | Tyk Dashboard |
| PROVIDER_DATA | It defines connection data for the Tyk Dashboard instance.| Yes. URL specifies the location of the dashboard. Secret refers to the Tyk Dashboard API Access Credentials found within the dashboard. OrgID refers to the Organisation ID found within the dashboard. | `{"URL": "http://localhost:8000", "Secret": "your-dash-user-secret-here", "OrgID": "5fc07983cbfb8149a63a4ae3"}`


In a production environment, on the first launch you need to specify at least the following environment variables:
* PORTAL_LICENSEKEY;
* PORTAL_DATABASE_DIALECT;
* PORTAL_DATABASE_CONNECTIONSTRING;
* ADMIN_EMAIL;
* ADMIN_PASSWORD.

#### .env file
If you have multiple environment variables, you can substitute them by adding them to a default environment variable file named .env or providing a path to your environment variables file using the --env-file command-line option.
The below example demonstrates the .env file:
```.ini
ADMIN_EMAIL=admin@tyk.io  
ADMIN_PASSWORD=secr3t  
PORTAL_HOST_PORT=3001  
PORTAL_REFRESHINTERVAL=10  
PORTAL_DATABASE_DIALECT=mysql  
PORTAL_DATABASE_CONNECTIONSTRING=admin:secr3t@tcp(tyk-portal-mysql:3306)/portal?charset=utf8mb4&parseTime=true  
PORTAL_DATABASE_ENABLELOGS=false  
PORTAL_THEMING_THEME=default  
PORTAL_THEMING_PATH=./themes  
PORTAL_LICENSEKEY=XXX
```


### Launch the Tyk Enterprise Developer portal using docker
To launch the Tyk Enterprise Developer portal, specify the environment variables described above or specify a .env file. The following example demonstrates how to launch the portal using the .env file:

```.bash
docker run -d \
-p 3001:3001 \
--env-file .env \
--name tyk-portal \
tykio/portal:v1.0.0 --bootstrap
```

This command will launch the portal on port 3001 and **bootstrap**  the portal. Now you can access your portal on port 3001.

#### Bootstrapping
**The portal must be bootstrapped on the first launch.** You can remove the `--bootstrap` command later if you don't want the portal to try bootstrapping. However, if `--bootstrap` is specified, the portal  will firstly check if it's already bootstrapped. If your portal is already bootstrapped, it is safe to launch the portal using `--bootstrap` command. Neither of your assets will be modified.


### Launch the Tyk Enterprise Developer portal with MySQL
This guide demonstrates two approaches for setting up and running the portal with MySQL database: using docker-compose and using separate Docker containers.
To launch the portal with other databases you can use this guide as a reference.
#### Installing Tyk Enterprise Developer Portal by using separate Docker containers
1. Create a network to connect your containers.
```.bash  
docker network create tyk-portal
```
2. Create a volume for the MySQL database.
```.bash
docker volume create tyk-portal-mysql-data
```
3. Launch the MySQL container by using `docker run`. 
You can refer to the [MySQL configuration guide](https://dev.mysql.com/doc/refman/5.7/en/charset-applications.html) for other configuration options.
```.bash
docker run -d \  
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
4. Create a .env file as described above.
5. Launch the portal by executing the following command to finish the installation.
```.bash
docker run -d \
-p 3001:3001 \
--env-file .env \
--network tyk-portal \
--name tyk-portal \
tykio/portal:v1.0.0 --bootstrap
```
6. Now you should be able to access the portal on port 3001.
7. Execute the cleanup commands to clean up the installation:
```.bash  
docker stop tyk-portal                 # stop the portal container
docker rm tyk-portal                   # remove the portal container
docker stop tyk-portal-mysql           # stop the database container
docker rm tyk-portal-mysql             # remove the database container
docker volume rm tyk-portal-mysql-data # remove the database container volume
```

#### Installation by using separate docker-compose
1. Create the docker-compose file:
```.yaml
version: '3.6'  
services:  
  tyk-portal:
    depends_on:
      - tyk-portal-mysql
    image: tykio/portal:v1.0.0
    command: --bootstrap
    networks:
      - tyk-portal
    ports:
      - 3001:3001
    environment:
      - ADMIN_EMAIL=${ADMIN_EMAIL}
      - ADMIN_PASSWORD=${ADMIN_PASSWORD}
      - PROVIDER_DATA=${PROVIDER_DATA}
      - PROVIDER_NAME=${PROVIDER_NAME}
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
2. Create the .env file. This time you will need to specify variables for MySQL as well. You can use the following example as a blueprint:
```.ini
MYSQL_ROOT_PASSWORD=sup3rsecr3t  
MYSQL_DATABASE=portal  
MYSQL_USER=admin  
MYSQL_PASSWORD=secr3t0  
ADMIN_EMAIL=admin@tyk.io  
ADMIN_PASSWORD=secr3t  
PORTAL_HOST_PORT=3001  
PORTAL_REFRESHINTERVAL=10  
PORTAL_DATABASE_DIALECT=mysql  
PORTAL_DATABASE_CONNECTIONSTRING=admin:secr3t@tcp(tyk-portal-mysql:3306)/portal?charset=utf8mb4&parseTime=true  
PORTAL_DATABASE_ENABLELOGS=false  
PORTAL_THEMING_THEME=default  
PORTAL_THEMING_PATH=./themes  
PORTAL_LICENSEKEY=XXX  
PROVIDER_DATA={"URL":"http://192.168.1.55:3000","Secret":"eb18a1d86ae7492f55e6190ffde6ad55","OrgID":"617006c1829b6f0001c6c039"}  
PROVIDER_NAME=tyk@localhost
```
3. Launch the docker-compose file:
```.bash
docker-compose --env-file .env up -d
```
4. Now you should be able to access the portal on port 3001.
5. Run the following commands to shutdown the stack:
```.bash
docker-compose down       # to just shutdown the stack
```
or
```.bash
docker-compose down -v    # to shutdown the stack and remove the volume
```

### Launch the Tyk Enterprise Developer portal using helm
1. Make sure the `tyk-enterprise-portal-conf` secret exists in your namespace.

If it does not, you can create it by running the following command. 

```
kubectl create secret generic tyk-enterprise-portal-conf -n ${NAMESPACE} \
  --from-literal=TYK_ORG=${TYK_ORG} \
  --from-literal=TYK_AUTH=${TYK_AUTH}
```

Where `TYK_ORG` and `TYK_AUTH` are the Tyk Dashboard Organisation ID and the Tyk Dashboard API Access Credentials respectively. Which can be obtained under your profile in the Tyk Dashboard. 

This secret will automatically be generated during the Tyk Dashboard bootstrap if the `dash.enterprisePortalSecret` value is set to `true` in the `values.yaml`.

2. You must set the following values in the `values.yaml` or with `--set {field-name}={field-value}`with the helm upgrade command:

|  | Description| Field name |
|--|--|--|
|1.| Enable portal installation | `enterprisePortal.enabled` |
|2.| Enable portal bootstrapping | `enterprisePortal.bootstrap` |
|3.| Portal license | `enterprisePortal.license` |
|4.| Portal storage type | `enterprisePortal.storage.type` |
|5.| Portal storage connection string | `enterprisePortal.storage.connectionString`|

3. Run the following command to update your infrastructure and install the developer portal.

`helm upgrade tyk-pro tyk-helm/tyk-pro -f values.yaml -n tyk`
