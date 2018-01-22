---
title: Upgrading Tyk
weight: 251
menu: "main"
url: "/upgrading-tyk"
---

## <a name="intro"></a>Introduction
Depending on the version of Tyk you have installed, upgrading to the latest version works as follows:
## <a name="cloud"></a>Tyk Cloud
Tyk Cloud users are automatically upgraded to the latest version as soon as it's released.
## <a name="hybrid"></a>Tyk Hybrid Gateway
We recommend you upgrade your Tyk Hybrid Gateway in the following way:
1. Take a backup of your tyk.conf, tyk-analytics.conf and start.sh files. This is important if you have modified your Docker Container in your current version.
2. Re-run the start.sh script:

### For Mac OS Users
From a Terminal:

```{.copyWrapper}
curl "https://raw.githubusercontent.com/lonelycode/tyk-hybrid-docker/master/start.sh" -o "start.sh"
chmod +x start.sh
./start.sh [PORT] [TYK-SECRET] [RPC-CREDENTIALS] [API CREDENTIALS]
```
### For Linux Users
```{.copyWrapper}
wget https://raw.githubusercontent.com/lonelycode/tyk-hybrid-docker/master/start.sh
chmod +x start.sh
sudo ./start.sh [PORT] [TYK-SECRET] [RPC-CREDENTIALS] [API CREDENTIALS]
```

#### Parameters:
*   `PORT`: The port for Tyk to listen on (usually 8080).
*   `TYK-SECRET`: The secret key to use so you can interact with your Tyk node via the REST API.
*   `RPC-CREDENTIALS`: Your Organisation ID, this can be found in the Dashboard Users - User section. See Step 1 above.
*   `API-CREDENTIALS`: Your Tyk Cloud API credentials - these can be found in the Users section of your dashboard.
The `TYK-SECRET` should be a secret key you define so you can interact with your Tyk node programmatically.

This command will start the Docker container and be ready to proxy traffic (you will need to check the logs of the container to make sure the login was successful).

3. Check everything is working

To check if the node has connected and logged in, use the following command:
```{.copyWrapper}
sudo docker logs --tail=100 --follow tyk_hybrid
```

  
This will show you the log output of the hybrid container, if you don't see any connectivity errors, and the log output ends something like this:
```
time="Jul  7 08:15:03" level=info msg="Gateway started (vx.x.x.x)"
time="Jul  7 08:15:03" level=info msg="--> Listening on port: 8080"
```

Then the gateway has successfully re-started.

## <a name="on-premises"></a>Tyk On-Premises

Our repositories will be updated at [https://packagecloud.io/tyk](https://packagecloud.io/tyk) when new versions are released. As you set up these repositories when installing Tyk to upgrade all Tyk components  you can run:

### For Ubuntu

```{.copyWrapper}
sudo apt-get update && sudo apt-get upgrade
```

### For RHEL
```{.copyWrapper}
sudo yum update
```


> **Note**: In Tyk Gateway before 2.5 and Tyk Dashboard before 1.5 there's a known Red Hat bug with init scripts being removed on package upgrade. In order to work around it, it's required to force reinstall the packages, e.g.:
`sudo yum reinstall tyk-gateway tyk-dashboard`


