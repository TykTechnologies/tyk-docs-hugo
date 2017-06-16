---
date: 2017-03-22T14:14:38Z
title: Install the Hybrid Gateway
menu:
  main:
    parent: /with-tyk-hybrid
weight: 1
---


## <a name="requirements"></a>Requirements

To install the Tyk Hybrid Gateway, you need:

1.  A Docker-enabled host
2.  Access to the shell of this host
3.  Port 80, 8080 and 9090 open
4.  A Tyk Hybrid account. Click [here][2] for details of how to create one or to upgrade from a Cloud account.

## <a name="installation"></a>Install the Hybrid Gateway

### Step 1: Get your credentials

1.  Go to <https://admin.cloud.tyk.io> and login with your new details.
2.  Click "Users" and select your name, you will see your RPC credentials, take note of these:
    
    ![RPC credentials][1]

### Step 2: Installation

To get started with a hybrid node, ensure you have Docker installed, then run the following in the terminal:

For Mac OSX users:

Open a CLI that can access the `docker` command, and then:

```
	curl "https://raw.githubusercontent.com/lonelycode/tyk-hybrid-docker/master/start.sh" -o "start.sh"
	chmod +x start.sh
	./start.sh [PORT] [TYK-SECRET] [RPC-CREDENTIALS] [API CREDENTIALS]
```


For Linux users:

```
	wget https://raw.githubusercontent.com/lonelycode/tyk-hybrid-docker/master/start.sh
	chmod +x start.sh
	sudo ./start.sh [PORT] [TYK-SECRET] [RPC-CREDENTIALS] [API CREDENTIALS]
```


The parameters explained:

*   `PORT`: The port for Tyk to listen on (usually 8080).
*   `TYK-SECRET`: The secret key to use so you can interact with your Tyk node via the REST API.
*   `RPC-CREDENTIALS`: Your organisation ID, this can be found in the Dashboard Users -> User section.
*   `API-CREDENTIALS`: Your Tyk Cloud API credentials - these can be found in the Users section of your dashboard.

The `TYK-SECRET` should be a secret key you define so you can interact with your Tyk node programatically.

This command will start the Docker container and be ready to proxy traffic (you will need to check the logs of the container to make sure the login was successful).

### Step 3: Check everything is working

To check if the node has connected and logged in, type:

`sudo docker logs --tail=100 --follow tyk_hybrid`

  
This will show you the log output of the hybrid container, if you don't see any connectivity errors, and the log output ends something like this:

```
	time="Jul  7 08:15:03" level=info msg="Gateway started (vx.x.x.x)"
	time="Jul  7 08:15:03" level=info msg="--> Listening on port: 8080"
```
 
  
Then the gateway has successfully started.

## <a name="upgrade-hybrid"></a>Upgrading the Hybrid Gateway

To upgrade your Hybrid Gateway to the latest version:

### Step 1: Backup your Docker Container Configuration File
If you have modified your Docker container in the current version, you should take a backup of your tyk.conf configuration file.

### Step 2: Run the start.sh script again
Run the start.sh script again as in [Step 2] (/docs/get-started/with-tyk-hybrid/tutorials/install-hybrid-gateway/#installation) in the Install section.

 [1]: /docs/img/dashboard/system-management/userCredentials.png
 [2]: /docs/get-started/with-tyk-hybrid/create-an-account/