---
date: 2017-03-22T16:19:08Z
Title: "Red Hat (RHEL / CentOS) "
tags: ["Tyk Gateway", "Self Managed", "Installation", "Red Hat", "CentOS"]
description: "How to install the Tyk Stack on Red Hat or CentOS using Ansible or with shell scripts"
menu:
  main:
    parent: "Self-Managed Installation"
weight: 4
aliases:
  - /tyk-api-gateway-v-2-0/installation-options-setup/install-tyk-pro-edition-on-red-hat/
  - /getting-started/installation/with-tyk-on-premises/redhat-rhel-centos/
---


Select the preferred way of installing Tyk by selecting **Shell** or **Ansible** tab for instructions.

{{< tabs_start >}}
{{< tab_start "Shell" >}}

## Supported Distributions
| Distribution | Version | Supported |
| --------- | :---------: | :---------: |
| CentOS | 7 | ✅ |
| RHEL | 9 | ✅ |
| RHEL | 8 | ✅ |
| RHEL | 7 | ✅ |


## Install and Configure Dependencies

### Redis

Tyk Gateway has a [dependency]({{< ref "/planning-for-production/redis#supported-versions" >}}) on Redis. Follow the steps provided by Red Hat to make the installation of Redis, conducting a [search](https://access.redhat.com/search/?q=redis) for the correct version and distribution.

### Storage Database

Tyk Dashboard has a dependency on a storage database that can be [PostgreSQL]({{< ref "/planning-for-production/database-settings/postgresql" >}}) or [MongoDB]({{< ref "/planning-for-production/database-settings/mongodb" >}}).
  
{{< tabs_start >}}
{{< tab_start "PostgreSQL" >}}
### Install PostgreSQL

Check the PostgreSQL supported [versions]({{< ref "/planning-for-production/database-settings/postgresql" >}}). Follow the steps provided by [PostgreSQL](https://www.postgresql.org/download/linux/redhat/) to install it.

Configure PostgreSQL

Create a new role/user
```console
sudo -u postgres createuser --interactive
```
The name of the role can be "tyk" and say yes to make it a superuser

Create a matching DB with the same name. Postgres authentication system assumes by default that for any role used to log in, that role will have a database with the same name which it can access.
```console
sudo -u postgres createdb tyk
```
Add another user to be used to log into your operating system

```console
sudo adduser tyk
```
Log in to your Database
```console
sudo -u tyk psql
```
Update the user “tyk” to have a password
```console
ALTER ROLE tyk with PASSWORD '123456';
```
Create a DB (my example is tyk_analytics)
```console
sudo -u tyk createdb tyk_analytics
```
{{< tab_end >}}
{{< tab_start "MongoDB" >}}
<br>
Check the MongoDB supported [versions]({{< ref "/planning-for-production/database-settings/mongodb" >}}). Follow the steps provided by [MongoDB](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-red-hat/) to install it.

Optionally initialize the database and enable automatic start:
```console
# Optionally ensure that MongoDB will start following a system reboot
sudo systemctl enable mongod
# start MongoDB server
sudo systemctl start mongod
```
{{< tab_end >}}
{{< tabs_end >}}

## Install Tyk Self-Managed on Red Hat (RHEL) / CentOS

You can install Tyk on RHEL or CentOS using our YUM repositories. Follow the guides and tutorials in this section to have Tyk up and running in no time.

The order is to install Tyk Dashboard, then Tyk Pump and then Tyk Gateway for a full stack.

- [Dashboard]({{< ref "tyk-on-prem/installation/redhat-rhel-centos/dashboard" >}})
- [Pump]({{< ref "tyk-on-prem/installation/redhat-rhel-centos/analytics-pump" >}})
- [Gateway]({{< ref "tyk-on-prem/installation/redhat-rhel-centos/gateway" >}})

{{< note success >}}
**Note**  

For a production environment, we recommend that the Tyk Gateway, Tyk Dashboard and Tyk Pump are installed on separate machines. If installing multiple Tyk Gateways, you should install each on a separate machine. See [Planning for Production]({{< ref "planning-for-production" >}}) for more details.
{{< /note >}}


{{< tab_end >}}
{{< tab_start "Ansible" >}}

## Supported Distributions
| Distribution | Version | Supported |
| --------- | :---------: | :---------: |
| CentOS | 7 | ✅ |
| RHEL | 8 | ✅ |
| RHEL | 7 | ✅ |


## Requirements

[Ansible](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html) - required for running the commands below. 

## Getting Started
1. clone the [tyk-ansible](https://github.com/TykTechnologies/tyk-ansible) repositry

```console
$ git clone https://github.com/TykTechnologies/tyk-ansible
```

2. `cd` into the directory
```console
$ cd tyk-ansible
```

3. Run initialisation script to initialise environment

```console
$ sh scripts/init.sh
```

4. Modify `hosts.yml` file to update ssh variables to your server(s). You can learn more about the hosts file [here](https://docs.ansible.com/ansible/latest/user_guide/intro_inventory.html)

5. Run ansible-playbook to install the following:
- Redis
- MongoDB or PostgreSQL
- Tyk Dashboard
- Tyk Gateway
- Tyk Pump

```console
$ ansible-playbook playbook.yaml -t tyk-pro -t redis -t `mongodb` or `pgsql`
```

You can choose to not install Redis, MongoDB or PostgreSQL by removing the `-t redis` or `-t mongodb` or `-t pgsql` However Redis and MongoDB or PostgreSQL are a requirement and need to be installed for the Tyk Pro installation to run.

## Variables
- `vars/tyk.yaml`

| Variable | Default | Comments |
| --------- | :---------: | --------- |
| secrets.APISecret | `352d20ee67be67f6340b4c0605b044b7` | API secret |
| secrets.AdminSecret | `12345` | Admin secret |
| redis.host |  | Redis server host if different than the hosts url |
| redis.port | `6379` | Redis server listening port |
| redis.pass |  | Redis server password |
| redis.enableCluster | `false` | Enable if redis is running in cluster mode |
| redis.storage.database | `0` | Redis server database |
| redis.tls | `false` | Enable if redis connection is secured with SSL |
| mongo.host |  | MongoDB server host if different than the hosts url |
| mongo.port | `27017` | MongoDB server listening port  |
| mongo.tls | `false` | Enable if mongo connection is secured with SSL |
| pgsql.host |  | PGSQL server host if different than the hosts url |
| pgsql.port | `5432` | PGSQL server listening port  |
| pgsql.tls | `false` | Enable if pgsql connection is secured with SSL |
| dash.license | | Dashboard license|
| dash.service.host | | Dashboard server host if different than the hosts url |
| dash.service.port | `3000` | Dashboard server listening port |
| dash.service.proto | `http` | Dashboard server protocol |
| dash.service.tls | `false` | Set to `true` to enable SSL connections |
| gateway.service.host | | Gateway server host if different than the hosts url |
| gateway.service.port | `8080` | Gateway server listening port |
| gateway.service.proto | `http` | Gateway server protocol |
| gateway.service.tls | `false` | Set to `true` to enable SSL connections |
| gateway.sharding.enabled | `false` | Set to `true` to enable filtering (sharding) of APIs |
| gateway.sharding.tags | | The tags to use when filtering (sharding) Tyk Gateway nodes. Tags are processed as OR operations. If you include a non-filter tag (e.g. an identifier such as `node-id-1`, this will become available to your Dashboard analytics) |
| gateway.rpc.connString | | Use this setting to add the URL for your MDCB or load balancer host |
| gateway.rpc.useSSL | `true` | Set this option to `true` to use an SSL RPC connection|
| gateway.rpc.sslInsecureSkipVerify | `true` | Set this option to `true` to allow the certificate validation (certificate chain and hostname) to be skipped. This can be useful if you use a self-signed certificate |
| gateway.rpc.rpcKey | | Your organisation ID to connect to the MDCB installation |
| gateway.rpc.apiKey | | This the API key of a user used to authenticate and authorise the Gateway’s access through MDCB. The user should be a standard Dashboard user with minimal privileges so as to reduce any risk if the user is compromised. The suggested security settings are read for Real-time notifications and the remaining options set to deny |
| gateway.rpc.groupId | | This is the `zone` that this instance inhabits, e.g. the cluster/data-centre the Gateway lives in. The group ID must be the same across all the Gateways of a data-centre/cluster which are also sharing the same Redis instance. This ID should also be unique per cluster (otherwise another Gateway cluster can pick up your keyspace events and your cluster will get zero updates). |

- `vars/redis.yaml`

| Variable | Default | Comments |
| --------- | :---------: | --------- |
| redis_bind_interface | `0.0.0.0` | Binding address of Redis |

Read more about Redis configuration [here](https://github.com/geerlingguy/ansible-role-redis).

- `vars/mongodb.yaml`

| Variable | Default | Comments |
| --------- | :---------: | --------- |
| bind_ip | `0.0.0.0` | Binding address of MongoDB |
| mongodb_version | `4.4` | MongoDB version |

Read more about MongoDB configuration [here](https://github.com/ansible-collections/community.mongodb).

- `vars/pgsql.yaml`

| Variable | Default | Comments |
| --------- | :---------: | --------- |
| postgresql_databases[] | `[]` | Array of DBs to be created |
| postgresql_databases[].name | `tyk_analytics` | Database name |
| postgresql_users[] | `[]` | Array of users to be created |
| postgresql_users[`0`].name | `default` | User name |
| postgresql_users[`0`].password | `topsecretpassword` | User password |
| postgresql_global_config_options[] | `[]` | Postgres service config options |
| postgresql_global_config_options[`1`].option | `listen_addresses` | Listen address binding for the service |
| postgresql_global_config_options[`1`].value | `*` | Default value to listen to all addresses |
| postgresql_hba_entries[] | `[]` | Host based authenticaiton list|
| postgresql_hba_entries[`4`].type | `host` | Entry type |
| postgresql_hba_entries[`4`].database | `tyk_analytics` | Which database this entry will give access to |
| postgresql_hba_entries[`4`].user | `default` | What users this gain access from this entry |
| postgresql_hba_entries[`4`].address | `0.0.0.0/0` | What addresses this gain access from this entry |
| postgresql_hba_entries[`4`].auth_method | `md5` | What authentication method to to use for the users |

Read more about PostgreSQL configuration [here](https://github.com/geerlingguy/ansible-role-postgresql).

{{< tab_end >}}
{{< tabs_end >}}
