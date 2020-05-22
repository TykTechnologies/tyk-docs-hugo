---
title: "Installation on AWS"
menu:
  main:
    parent: "With Tyk Multi-Cloud"
weight: 3
---

> **NOTE**: Tyk Multi-Cloud has superseded our Hybrid offering. See [Tyk Multi-Cloud](https://tyk.io/api-gateway/cloud/#multi-cloud) for more details. You can get a free 30 day trial of Tyk Multi-Cloud.

Tyk Multi-Cloud Gateway can be installed on AWS infrastructure using our AWS Marketplace AMI product. Once subscribed to it and a Tyk Cloud account is created please follow this guide to set up an instance.

## Requirements

To get started make sure you have:

1. A Tyk Multi-Cloud account. Click [here](/docs/getting-started/installation/with-tyk-multi-cloud/create-an-account/) for details of how to create one
2. A subscription to the [Tyk Hybrid Gateway AMI from the AWS Marketplace](https://aws.amazon.com/marketplace/pp/B07BVPCL4R)

The steps below outline the Hybrid AMI install, though for a PoC there is a [docker image](https://github.com/TykTechnologies/tyk-hybrid-docker) for the Hybrid Gateway

## Quick setup

This guide assumes the "1-Click" install was selected on the Marketplace and an instance is already running. At the end we also provide several "user data" samples for use through `cloud-init` [automation](#automation), and of course any automation tool of choice can be used with our AMIs.

### To obtain Hybrid credentials

1.  Go to <https://admin.cloud.tyk.io> and login with your new details.
2.  Click "Users" and select your name, you will see your Organisation ID, take note of this:
    
![RPC credentials](/docs/img/dashboard/system-management/org_id.png)

### To setup a Tyk Hybrid Gateway instance provisioned by the "1-Click" option

1. Connect to the instance using SSH (make sure to use the key specified during the provisioning), e.g. `ssh -i your_key.pem ec2-user@instance.address`
2. Once inside the instance execute `sudo /opt/tyk-gateway/setup_hybrid.sh -o your-organisation-id -k your-api-key` (more options described below)
3. If everything went well, Tyk Hybrid Gateway will be running on port 8080, with a Redis storage server running on the same instance
4. Make sure your EC2 security groups attached to the instance allow inbound traffic on port 8080

That's it, a fully ready to use Tyk Gateway connected to a Hybrid account is set up and should be available for use through the instance's address.

## Configuration

The Gateway can be more finely tuned for this first setup using the following command line options to the `setup_hybrid.sh` script:

* `-s` or `--secret`: the Gateway node secret to be used for admin API, if not specified — it would be auto-generated and displayed by the script
* `-t` or `--type`: type of the process to use (can be `python`, `lua` or left out for default), if specified this starts a gateway process ready to use with either Python or Lua plugins (see documentation on customising Tyk)
* `-o` or `--orgid`: the organisation ID, taken from the Cloud dashboard
* `-k` or `--apikey`: the API key, taken from the Cloud dashboard
* `-p` or `--port`: listen port for the Tyk Gateway process (the same port should be open for the instance ingress)
* `-c` or `--conf`: replace the default tyk.conf with a custom one from location on local FS specified by this option
* `--redis-host`: Redis storage hostname, if not specified a local Redis server will be started and used for this instance
* `--redis-port`: Redis storage server port, defaults to 6379
* `--redis-user`: Redis storage authentication username, defaults to empty
* `--redis-pass`: Redis storage authentication password, defaults to empty
* `--redis-db`: Redis storage database number, defaults to 0
* `--redis-use-ssl`: if set, the Redis connection will assume it's encrypted (use with Redis providers that support in-transit encryption)
* `--no-bind-slugs`: if set, the gateway will listen to API IDs as root paths instead of API slugs (default)

This is just a portion of the [configuration options available for the Tyk Gateway](/docs/tyk-configuration-reference/tyk-gateway-configuration-options/) to facilitate a quick setup. Others may be set by either editing or replacing the `/opt/tyk-gateway/tyk.conf` file or adding [environment variables](/docs/tyk-configuration-reference/environment-variables/) to `/etc/default/tyk-gateway` file.


## Automation

While the instructions above are sufficient for manually setting up a single Tyk Gateway instance, one may need to launch more with the help of automation. One common way to do this on AWS is by using an EC2 auto-scaling group.

The AMI to which a customer subscribes may be specified in a launch configuration for the auto-scaling group, however instances launched this way would not be in a configured state. In order to configure them on launch automatically, "user data" can be specified in the launch configuration in order to instruct `cloud-init` to perform certain actions once on launched instances. This allows to do initial setup immediately or install some provisioning tool (like puppet, chef, ansible, salt, etc.) and run it.

Here's a very simple "user data" snippet that configures a Tyk Hybrid Gateway process using `setup_hybrid.sh` script the same way as the [Quick setup](#quick-setup) instructions:

```{.copyWrapper}
#cloud-config
runcmd:
  - [ /opt/tyk-gateway/setup_hybrid.sh, -o, "orgidhere", -k, "apikeyhere", -s, "gwapisecrethere"]
```

Or alternatively, a more verbose sample that does the same without using the script in case a more granular configuration is required:

```{.copyWrapper}
#cloud-config
write_files:
  - content: |
    TYK_GW_LISTENPORT=8080
    TYK_GW_SECRET="test12345replaceme"
    TYK_GW_STORAGE_HOST="localhost"
    TYK_GW_STORAGE_PORT=6379
    TYK_GW_STORAGE_USERNAME=""
    TYK_GW_STORAGE_PASSWORD=""
    TYK_GW_SLAVEOPTIONS_RPCKEY="orgidhere"
    TYK_GW_SLAVEOPTIONS_APIKEY="apikeyhere"
  path: /etc/default/tyk-gateway

runcmd:
  - [ systemctl, enable, tyk-gateway ]
  - [ mv, /opt/tyk-gateway/tyk_hybrid.conf, /opt/tyk-gateway/tyk.conf ]
  - [ systemctl, start, redis]
  - [ systemctl, enable, redis ]
  - [ systemctl, start, tyk-gateway ]
```

## Notes on AMI

The Tyk Hybrid Gateway AMI is based on the latest (at the moment of creation) Amazon Linux AMI, which itself is based on CentOS 7. Please refer to [Amazon Linux documentation](https://aws.amazon.com/amazon-linux-2/) for details as well as [our notes on init systems](/docs/getting-started/installation/with-tyk-on-premises/#init-systems) used in Linux distributions for details on how to manage the process and extract service logs.

Attributes for [ENA/SR-IOV](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/enhanced-networking.html) are set on this AMI and since Amazon Linux comes pre-packaged with related drivers it's eligible for use with EC2 instance types supporting these types of networking (such as "c5" class).
