---
date: 2017-03-22T14:14:38Z
title: Install the Hybrid Gateway
menu:
  main:
    parent: "With Tyk Hybrid"
weight: 2
---


## <a name="requirements"></a>Requirements

> **Warning**: Our Tyk Hybrid Gateway Docker container includes Redis Server. This only works in a single node, Proof of Concept type installation. For two or more nodes, you need to have a separate Redis, shared across all hybrid instances, and set it using `start.sh` script arguments: `./start.sh PORT SECRET ORGID APIKEY (REDIS HOST) (REDIS PORT) (REDIS PW)`. See the official [Redis Docker Repository](https://hub.docker.com/_/redis/) to install Redis.

To install the Tyk Hybrid Gateway, you need:

1.  A Docker-enabled host
2.  Access to the shell of this host
3.  Port 8080 and 9091 open
4.  A Tyk Hybrid account. Click [here][2] for details of how to create one or to upgrade from a Cloud account.

## <a name="installation"></a>Install the Hybrid Gateway

### Step 1: Get your credentials

1.  Go to <https://admin.cloud.tyk.io> and login with your new details.
2.  Click "Users" and select your name, you will see your Organisation ID, take note of this:
    
    ![RPC credentials][1]

### Step 2: Installation

To get started with a hybrid node, ensure you have Docker installed, then run the following in the terminal:

For Mac OSX users:

Open a CLI that can access the `docker` command, and then:

```{.copyWrapper}
curl "https://raw.githubusercontent.com/lonelycode/tyk-hybrid-docker/master/start.sh" -o "start.sh"
chmod +x start.sh
./start.sh [PORT] [TYK-SECRET] [RPC-CREDENTIALS] [API CREDENTIALS]
```


For Linux users:

```{.copyWrapper}
wget https://raw.githubusercontent.com/lonelycode/tyk-hybrid-docker/master/start.sh
chmod +x start.sh
sudo ./start.sh [PORT] [TYK-SECRET] [RPC-CREDENTIALS] [API CREDENTIALS]
```


The parameters explained:

*   `PORT`: The port for Tyk to listen on (usually 8080).
*   `TYK-SECRET`: The secret key to use so you can interact with your Tyk node via the REST API.
*   `RPC-CREDENTIALS`: Your Organisation ID, this can be found in the Dashboard Users -> User section. See Step 1 above.
*   `API-CREDENTIALS`: Your Tyk Cloud API credentials - these can be found in the Users section of your dashboard.

The `TYK-SECRET` should be a secret key you define so you can interact with your Tyk node programatically.

This command will start the Docker container and be ready to proxy traffic (you will need to check the logs of the container to make sure the login was successful).

### Step 3: Check everything is working

To check if the node has connected and logged in, type:

```{.copyWrapper}
sudo docker logs --tail=100 --follow tyk_hybrid
```

  
This will show you the log output of the hybrid container, if you don't see any connectivity errors, and the log output ends something like this:

```
time="Jul  7 08:15:03" level=info msg="Gateway started (vx.x.x.x)"
time="Jul  7 08:15:03" level=info msg="--> Listening on port: 8080"
```
 
  
Then the gateway has successfully started.

## <a name="upgrade-hybrid"></a>Upgrading the Hybrid Gateway

To upgrade your Hybrid Gateway, see [Upgrading Tyk](https://tyk.io/docs/upgrading-tyk/#hybrid).

 [1]: /docs/img/dashboard/system-management/api_access_cred_2.5.png
 [2]: /docs/get-started/with-tyk-hybrid/create-an-account/