---
date: 2018-05-18T15:46:41Z
Title: Heroku
tags: ["Tyk Stack", "Self-Managed", "Installation", "Heroku"]
description: "How to install the Tyk Stack on Heroku"
menu:
  main:
    parent: "Self-Managed Installation"
weight: 6
aliases:
  - /getting-started/with-tyk-on-premises/installation/on-heroku/
  - /tyk-on-premises/installation/on-heroku
  - /tyk-on-premises/heroku/
---

## Install Tyk API Gateway on Heroku

A full Tyk Self-Managed installation can be deployed to Heroku dynos and workers using [Heroku Container Registry and Runtime](https://devcenter.heroku.com/articles/) functionality. This guide will utilize [Tyk Docker images](https://hub.docker.com/u/tykio/) with a small amount of customization as well as an external MongoDB service.


## Prerequisites

1. Docker daemon installed and running locally
2. [Heroku account](https://www.heroku.com/), the free plan is sufficient for a basic PoC but not recommended for production usage
3. [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) installed
4. MongoDB service (such as [Atlas](https://www.mongodb.com/cloud/atlas), [mLab](https://elements.heroku.com/addons/mongolab), [Compose](https://www.compose.com/) or your own deployment), this guide is based on MongoDB Atlas but others should work as well
5. [Tyk License](https://tyk.io/pricing/on-premise/) (note that in case of running multiple gateway dynos, license type must match)
6. Checkout the [Tyk quickstart repository](https://github.com/TykTechnologies/tyk-pro-heroku) from GitHub
7. Python 2 or 3 in order to execute the bootstrap script

## Creating Heroku Apps

We will create two Heroku apps, one for the Tyk Gateway (with [Redis add-on](https://devcenter.heroku.com/articles/heroku-redis) attached to it) and another for the Dashboard and Pump.

Given Heroku CLI is installed and your Heroku account is available, log into it:
```{.copyWrapper}
heroku login
```

Now create the Gateway app and note down its name:
```{.copyWrapper}
heroku create
```
```
Creating app... done, ⬢ infinite-plains-14949
https://infinite-plains-14949.herokuapp.com/ | https://git.heroku.com/infinite-plains-14949.git
```
{{< note success >}}
**Note**  

`--space` flag must be added to the command if the app is being created in a private space, see more details in the [section on Heroku private spaces](#heroku-private-spaces).
{{< /note >}}

Provision a Redis add-on (we'll use a `hobby-dev` plan for demonstration purposes but that's not suitable for production), replacing the app name with your own:
```{.copyWrapper}
heroku addons:create heroku-redis:hobby-dev -a infinite-plains-14949
```
```
Creating heroku-redis:hobby-dev on ⬢ infinite-plains-14949... free
Your add-on should be available in a few minutes.
! WARNING: Data stored in hobby plans on Heroku Redis are not persisted.
redis-infinite-35445 is being created in the background. The app will restart when complete...
Use heroku addons:info redis-infinite-35445 to check creation progress
Use heroku addons:docs heroku-redis to view documentation
```

Once add-on provisioning is done, the info command (replacing the add-on name with your own) will show the following output:
```{.copyWrapper}
heroku addons:info redis-infinite-35445
```
```
=== redis-infinite-35445
Attachments:  infinite-plains-14949::REDIS
Installed at: Sun May 18 2018 14:23:21 GMT+0300 (EEST)
Owning app:   infinite-plains-14949
Plan:         heroku-redis:hobby-dev
Price:        free
State:        created
```

Time to create the Dasboard app and note down its name as well:
```{.copyWrapper}
heroku create
```
```
Creating app... done, ⬢ evening-beach-40625
https://evening-beach-40625.herokuapp.com/ | https://git.heroku.com/evening-beach-40625.git
```

Since the Dashboard and Pump need access to the same Redis instance as the gateway, we'll need to share the Gateway app's add-on with this new app:
```{.copyWrapper}
heroku addons:attach infinite-plains-14949::REDIS -a evening-beach-40625
```
```
Attaching redis-infinite-35445 to ⬢ evening-beach-40625... done
Setting REDIS config vars and restarting ⬢ evening-beach-40625... done, v3
```

To check that both apps have access to the same Redis add-on, we can utilize the `heroku config` command and check for the Redis endpoint:
```{.copyWrapper}
heroku config -a infinite-plains-14949 | grep REDIS_URL
heroku config -a evening-beach-40625 | grep REDIS_URL
```

Their outputs should match.

## Deploy the Dashboard

It's recommended to start with the Dashboard so in your Heroku quickstart clone run:
```{.copyWrapper}
cd analytics
ls dashboard
```
```
bootstrap.sh  Dockerfile.web  entrypoint.sh  tyk_analytics.conf
```

You will find it contains a `Dockerfile.web` for the web dyno, a config file for the Dashboard, entrypoint script for the Docker container and a bootstrap script for seeding the dashboard instance with sample data. All these files are editable for your purposes but have sane defaults for a PoC.

{{< note success >}}
**Note**  

You can use the `FROM` statement in `Dockerfile.web` to use specific dashboard version and upgrade when needed instead of relying on the `latest` tag.
{{< /note >}}


The [Dashboard configuration]({{< ref "tyk-dashboard/configuration" >}}) can be changed by either editing the `tyk_analytics.conf` file or injecting them as [environment variables]({{< ref "tyk-environment-variables" >}}) via `heroku config`. In this guide we'll use the latter for simplicity of demonstration but there is merit to both methods.

First let's set the license key:
```{.copyWrapper}
heroku config:set TYK_DB_LICENSEKEY="your license key here" -a evening-beach-40625
```
```
Setting TYK_DB_LICENSEKEY and restarting ⬢ evening-beach-40625... done, v4
TYK_DB_LICENSEKEY: should show your license key here
```

Now the MongoDB endpoint (replacing with your actual endpoint):
```{.copyWrapper}
heroku config:set TYK_DB_MONGOURL="mongodb://user:pass@mongoprimary.net:27017,mongosecondary.net:27017,mongotertiary.net:27017" -a evening-beach-40625
```
```
Setting TYK_DB_MONGOURL and restarting ⬢ evening-beach-40625... done, v5
TYK_DB_MONGOURL: mongodb://user:pass@mongoprimary.net:27017,mongosecondary.net:27017,mongotertiary.net:27017
```

And enable SSL for it if your service supports/requires this:
```{.copyWrapper}
heroku config:set TYK_DB_MONGOUSESSL="true" -a evening-beach-40625
```
```
Setting TYK_DB_MONGOUSESSL and restarting ⬢ evening-beach-40625... done, v6
TYK_DB_MONGOUSESSL: true
```

Since the Tyk Dashboard needs to access gateways sometimes, we'll need to specify the Gateway endpoint too, which is the Gateway app's URL:
```{.copyWrapper}
heroku config:set TYK_DB_TYKAPI_HOST="https://infinite-plains-14949.herokuapp.com" -a evening-beach-40625
heroku config:set TYK_DB_TYKAPI_PORT="443" -a evening-beach-40625
```
```
Setting TYK_DB_TYKAPI_HOST and restarting ⬢ evening-beach-40625... done, v7
TYK_DB_TYKAPI_HOST: https://infinite-plains-14949.herokuapp.com
Setting TYK_DB_TYKAPI_PORT and restarting ⬢ evening-beach-40625... done, v8
TYK_DB_TYKAPI_PORT: 443
```

This is enough for a basic Dashboard setup but we recommend also changing at least node and admin secrets with strong random values, as well as exploring other config options.

Since the Tyk Pump is also a part of this application (as a worker process), we'll need to configure it too.

```{.copyWrapper}
ls pump
```
```
Dockerfile.pump  entrypoint.sh  pump.conf
```

Same principles apply here as well. Here we'll need to configure MongoDB endpoints for all the Pumps (this can also be done in the `pump.conf` file):
```{.copyWrapper}
heroku config:set PMP_MONGO_MONGOURL="mongodb://user:pass@mongoprimary.net:27017,mongosecondary.net:27017,mongotertiary.net:27017" -a evening-beach-40625
heroku config:set PMP_MONGO_MONGOUSESSL="true"

heroku config:set PMP_MONGOAGG_MONGOURL="mongodb://user:pass@mongoprimary.net:27017,mongosecondary.net:27017,mongotertiary.net:27017" -a evening-beach-40625
heroku config:set PMP_MONGOAGG_MONGOUSESSL="true"
```

With the configuration in place it's finally time to deploy our app to Heroku.

First, make sure CLI is logged in to Heroku containers registry:
```{.copyWrapper}
heroku container:login
```
```
Login Succeeded
```

Provided you're currently in `analytics` directory of the quickstart repo:
```{.copyWrapper}
heroku container:push --recursive -a evening-beach-40625
```
```
=== Building web (/tyk-heroku-docker/analytics/dashboard/Dockerfile.web)
Sending build context to Docker daemon  8.192kB
Step 1/5 : FROM tykio/tyk-dashboard:v1.6.1
 ---> fdbc67b43139
Step 2/5 : COPY tyk_analytics.conf /opt/tyk-dashboard/tyk_analytics.conf
 ---> 89be9913798b
Step 3/5 : COPY entrypoint.sh /opt/tyk-dashboard/entrypoint.sh
 ---> c256152bff29
Step 4/5 : ENTRYPOINT ["/bin/sh", "-c"]
 ---> Running in bc9fe7a569c0
Removing intermediate container bc9fe7a569c0
 ---> f40e6b259230
Step 5/5 : CMD ["/opt/tyk-dashboard/entrypoint.sh"]
 ---> Running in 705273810eea
Removing intermediate container 705273810eea
 ---> abe9f10e8b21
Successfully built abe9f10e8b21
Successfully tagged registry.heroku.com/evening-beach-40625/web:latest
=== Building pump (/tyk-heroku-docker/analytics/pump/Dockerfile.pump)
Sending build context to Docker daemon   5.12kB
Step 1/5 : FROM tykio/tyk-pump-docker-pub:v0.5.2
 ---> 247c6b5795a9
Step 2/5 : COPY pump.conf /opt/tyk-pump/pump.conf
 ---> 1befeab8f092
Step 3/5 : COPY entrypoint.sh /opt/tyk-pump/entrypoint.sh
 ---> f8ad0681aa70
Step 4/5 : ENTRYPOINT ["/bin/sh", "-c"]
 ---> Running in 0c30d35b9e2b
Removing intermediate container 0c30d35b9e2b
 ---> b17bd6a8ed44
Step 5/5 : CMD ["/opt/tyk-pump/entrypoint.sh"]
 ---> Running in a16acb453b62
Removing intermediate container a16acb453b62
 ---> 47ac9f221d8d
Successfully built 47ac9f221d8d
Successfully tagged registry.heroku.com/evening-beach-40625/pump:latest
=== Pushing web (/tyk-heroku-docker/analytics/dashboard/Dockerfile.web)
The push refers to repository [registry.heroku.com/evening-beach-40625/web]
c60cf00e6e9b: Pushed 
11d074829795: Pushed 
8b72aa2b2acc: Pushed 
ca2feecf234c: Pushed 
803aafd71223: Pushed 
43efe85a991c: Pushed 
latest: digest: sha256:b857afaa69154597558afb2462896275ab667b729072fac224487f140427fa73 size: 1574
=== Pushing pump (/tyk-heroku-docker/analytics/pump/Dockerfile.pump)
The push refers to repository [registry.heroku.com/evening-beach-40625/pump]
eeddc94b8282: Pushed 
37f3b3ce56ab: Pushed 
4b61531ec7dc: Pushed 
eca9efd615d9: Pushed 
0f700064c5a1: Pushed 
43efe85a991c: Mounted from evening-beach-40625/web 
latest: digest: sha256:f45acaefa3b47a126dd784a888c89e420814ad3031d3d4d4885e340a59aec31c size: 1573
```

This has built Docker images for both dashboard and pump, as well as pushed them to Heroku registry and automatically deployed to the application.

Provided everything went well (and if not, inspect the application logs), you should be seeing the Dashboard login page at your app URL (e.g "https://evening-beach-40625.herokuapp.com/").

However, it doesn't yet have any accounts. It order to populate it please run the `dashboard/bootstrap.sh` script:
```{.copyWrapper}
dashboard/bootstrap.sh evening-beach-40625.herokuapp.com
```
```
Creating Organization
ORGID: 5b016ca530867500050b9e90
Adding new user
USER AUTH: a0f7c1e878634a60599dc037489a880f
NEW ID: 5b016ca6dcd0056d702dc40e
Setting password

DONE
====
Login at https://evening-beach-40625.herokuapp.com/
User: c7ze82m8k3@default.com
Pass: test123
```

It will generate a default organization with random admin username and a specified password. The bootstrap script can be edited to suit your needs as well as just editing the user info in the dashboard.

If this was successful, you should be able to log into your dashboard now.

The last step in this app is to start the Pump worker dyno since by default only the web dyno is enabled:
```{.copyWrapper}
heroku dyno:scale pump=1 -a evening-beach-40625
```
```
Scaling dynos... done, now running pump at 1:Free
```

At that point the dyno formation should look like this:
```{.copyWrapper}
heroku dyno:scale -a evening-beach-40625
```
```
pump=1:Free web=1:Free
```

## Deploy the Gateway

The process is very similar for the Tyk Gateway, except it doesn't have a worker process and doesn't need access to MongoDB.

```{.copyWrapper}
cd ../gateway
ls
```
```
Dockerfile.web  entrypoint.sh  tyk.conf
```

All these files serve the same purpose as with the Dasboard and the Pump. [Configuration]({{< ref "tyk-oss-gateway/configuration" >}}) can either be edited in `tyk.conf` or [injected]({{< ref "tyk-environment-variables" >}}) with `heroku config`.

To get things going we'll need to set following options for the Dashboard endpoint (substituting the actual endpoint and the app name, now for the gateway app):
```{.copyWrapper}
heroku config:set TYK_GW_DBAPPCONFOPTIONS_CONNECTIONSTRING="https://evening-beach-40625.herokuapp.com" -a infinite-plains-14949
heroku config:set TYK_GW_POLICIES_POLICYCONNECTIONSTRING="https://evening-beach-40625.herokuapp.com" -a infinite-plains-14949
```
```
Setting TYK_GW_DBAPPCONFOPTIONS_CONNECTIONSTRING and restarting ⬢ infinite-plains-14949... done, v4
TYK_GW_DBAPPCONFOPTIONS_CONNECTIONSTRING: https://evening-beach-40625.herokuapp.com
Setting TYK_GW_POLICIES_POLICYCONNECTIONSTRING and restarting ⬢ infinite-plains-14949... done, v5
TYK_GW_POLICIES_POLICYCONNECTIONSTRING: https://evening-beach-40625.herokuapp.com
```

Since the Redis configuration will be automatically discovered (it's already injected by Heroku), we're ready to deploy:
```{.copyWrapper}
heroku container:push --recursive -a infinite-plains-14949
```
```
=== Building web (/tyk-heroku-docker/gateway/Dockerfile.web)
Sending build context to Docker daemon  6.144kB
Step 1/5 : FROM tykio/tyk-gateway:v2.6.1
 ---> f1201002e0b7
Step 2/5 : COPY tyk.conf /opt/tyk-gateway/tyk.conf
 ---> b118611dc36b
Step 3/5 : COPY entrypoint.sh /opt/tyk-gateway/entrypoint.sh
 ---> 68ad364030cd
Step 4/5 : ENTRYPOINT ["/bin/sh", "-c"]
 ---> Running in 859f4c15a0d2
Removing intermediate container 859f4c15a0d2
 ---> 5f8c0d1b378a
Step 5/5 : CMD ["/opt/tyk-gateway/entrypoint.sh"]
 ---> Running in 44c5e4c87708
Removing intermediate container 44c5e4c87708
 ---> 86a9eb509968
Successfully built 86a9eb509968
Successfully tagged registry.heroku.com/infinite-plains-14949/web:latest
=== Pushing web (/tyk-heroku-docker/gateway/Dockerfile.web)
The push refers to repository [registry.heroku.com/infinite-plains-14949/web]
b8a4c3e3f93c: Pushed 
0b7bae5497cd: Pushed 
e8964f363bf4: Pushed 
379aae48d347: Pushed 
ab2b28b92877: Pushed 
021ee50b0983: Pushed 
43efe85a991c: Mounted from evening-beach-40625/pump 
latest: digest: sha256:d67b8f55d729bb56e06fe38e17c2016a36f2edcd4f01760c0e62a13bb3c9ed38 size: 1781
```

Inspect the logs (`heroku logs -a infinite-plains-14949`) to check that deployment was successful, also the node should be registered by the Dashboard in "System Management" -> "Nodes and Licenses" section.

You're ready to follow the guide on [creating and managing your APIs]({{< ref "getting-started/create-api" >}}) with this Heroku deployment.

{{< note success >}}
**Note**  

To use the [geographic log distribution]({{< ref "tyk-stack/tyk-manager/analytics/geographic-distribution" >}}) feature in the Dashboard please supply the GeoLite2 DB in the `gateway` directory, uncomment the marked line in `Dockerfile.web` and set the `analytics_config.enable_geo_ip` setting (or `TYK_GW_ANALYTICSCONFIG_ENABLEGEOIP` env var) to `true`.
{{< /note >}}

## Heroku Private Spaces

Most instructions are valid for [Heroku Private Spaces runtime](https://devcenter.heroku.com/articles/private-spaces). However there are several differences to keep in mind.

Heroku app creation commands must include the private space name in the `--space` flag, e.g.:
```{.copyWrapper}
heroku create --space test-space-virginia
```

When deploying to the app, the container must be released manually after pushing the image to the app:
```{.copyWrapper}
heroku container:push --recursive -a analytics-app-name
heroku container:release web -a analytics-app-name
heroku container:release pump -a analytics-app-name
```

Similarly, the Gateway:
```{.copyWrapper}
heroku container:push --recursive -a gateway-app-name
heroku container:release web -a gateway-app-name
```

Please allow several minutes for the first deployment to start as additional infrastructure is being created for it. Next deployments are faster.

Private spaces maintain stable set of IPs that can be used for allowing fixed set of IPs on your upstream side (e.g. on an external database service). Find them using the following command:
```{.copyWrapper}
heroku spaces:info --space test-space-virginia
```

Alternatively VPC peering can be used with the private spaces if external service supports it. This way exposure to external network can be avoided. For instance, see [MongoDB Atlas guide](https://www.mongodb.com/blog/post/integrating-mongodb-atlas-with-heroku-private-spaces) for setting this up.

The minimal Heroku Redis add-on plan that installs into your private space is currently `private-7`. Please refer to [Heroku's Redis with private spaces guide](https://devcenter.heroku.com/articles/heroku-redis-and-private-spaces) for more information.

Apps in private spaces don't enable SSL/TLS by default. It needs to be configured in the app settings along with the domain name for it. If it's not enabled, please make sure that configs that refer to corresponding hosts are using HTTP instead of HTTPS and related ports (80 for HTTP).

## Gateway Plugins

In order to enable [rich plugins]({{< ref "plugins/supported-languages/rich-plugins" >}}) for the Gateway, please set the following Heroku config option to either `python` or `lua` depending on the type of plugins used:
```{.copyWrapper}
heroku config:set TYK_PLUGINS="python" -a infinite-plains-14949
```
```
Setting TYK_PLUGINS and restarting ⬢ infinite-plains-14949... done, v9
TYK_PLUGINS: python
```

After re-starting the Gateway, the logs should be showing something similar to this:
```
2018-05-18T13:13:50.272511+00:00 app[web.1]: Tyk will be using python plugins
2018-05-18T13:13:50.311510+00:00 app[web.1]: time="May 18 13:13:50" level=info msg="Setting PYTHONPATH to 'coprocess/python:middleware/python:event_handlers:coprocess/python/proto'"
2018-05-18T13:13:50.311544+00:00 app[web.1]: time="May 18 13:13:50" level=info msg="Initializing interpreter, Py_Initialize()"
2018-05-18T13:13:50.497815+00:00 app[web.1]: time="May 18 13:13:50" level=info msg="Initializing dispatcher"
```

Set this variable back to an empty value in order to revert back to the default behavior.

## Upgrading or Customizing Tyk

Since this deployment is based on Docker images and containers, upgrading or making changes to the deployment is as easy as building a new image and pushing it to the registry.

Specifically, upgrading version of any Tyk components is done by editing the corresponding `Dockerfile` and replacing the base image version tag. E.g. changing `FROM tykio/tyk-gateway:v2.5.4` to `FROM tykio/tyk-gateway:v2.6.1` will pull the Tyk gateway 2.6.1. We highly recommend specifying concrete version tags instead of `latest` for better house keeping.

Once these changes have been made just run `heroku container:push --recursive -a app_name` on the corresponding directory as shown previously in this guide. This will do all the building and pushing as well as gracefully deploying on your Heroku app.


Please refer to [Heroku documentation on containers and registry](https://devcenter.heroku.com/articles/container-registry-and-runtime) for more information.
