---
date: 2017-03-22T16:14:35Z
Title: Tyk Pump on Ubuntu
menu:
  main:
    parent: "On Ubuntu"
weight: 2
---

## Install Tyk Pump on Ubuntu

### What is Tyk Pump?

Tyk Pump is responsible for moving analytics between the API Gateway and the Dashboard database, it can also send data to other sinks such as ElasticSearch, StatsD and InfluxDB.

Tyk has it's own APT repositories hosted by the kind folks at [packagecloud.io][1], which makes it easy, safe and secure to install a trusted distribution of the Tyk Pump application.

#### Tutorial

This tutorial has been tested Ubuntu 16.04 & 18.04 with few if any modifications.

### Prerequisites

- You have installed MongoDB and Redis.
- You have installed the Tyk Dashboard.

#### Step 1: Set up our APT repositories

First, add our GPG key which signs our binaries:

```{.copyWrapper}
curl -L https://packagecloud.io/tyk/tyk-pump/gpgkey | sudo apt-key add -
```

Run update:

```{.copyWrapper}
sudo apt-get update
```

Since our repositories are installed via HTTPS, you will need to make sure APT supports this:

```{.copyWrapper}
sudo apt-get install -y apt-transport-https
```

Now lets add the required repos and update again (notice the `-a` flag in the second Tyk commands - this is important!):

```{.copyWrapper}
echo "deb https://packagecloud.io/tyk/tyk-pump/ubuntu/ bionic main" | sudo tee /etc/apt/sources.list.d/tyk_tyk-pump.list

echo "deb-src https://packagecloud.io/tyk/tyk-pump/ubuntu/ bionic main" | sudo tee -a /etc/apt/sources.list.d/tyk_tyk-pump.list

sudo apt-get update
```

**What we've done here is:**

- Added the Tyk Pump repository
- Updated our package list

#### Step 2: Install the Tyk Pump

We're now ready to install the Tyk Pump. To install it, run:

```{.copyWrapper}
sudo apt-get install -y tyk-pump
```

What we've done here is instructed apt-get to install Tyk Pump without prompting. Wait for the downloads to complete.

When Tyk Pump is finished installing, it will have installed some `init` scripts, but it will not be running yet. The next step will be to setup each application - thankfully this can be done with three very simple commands.

#### Verify the origin key (optional)

Debian packages are signed with the repository keys. These keys are verified at the time of fetching the package and is taken care of by the `apt` infrastructure. These keys are controlled by PackageCloud, our repository provider. For an additional guarantee, it is possible to verify that the package was indeed created by Tyk by verifying the `origin` certificate that is attached to the package.

First, you have to fetch Tyk's signing key and import it.

```{.copyWrapper}
wget https://keyserver.tyk.io/tyk.io.deb.signing.key
gpg --import tyk.io.deb.signing.key
```

Then, you have to either,
- sign the key with your ultimately trusted key
- trust this key ultimately

The downloaded package will be available in `/var/cache/apt/archives`. Assuming you found the file `tyk-gateway-2.9.3_amd64.deb` there, you can verify the origin signature.

```{.copyWrapper}
gpg --verify d.deb
gpg: Signature made Wed 04 Mar 2020 03:05:00 IST
gpg:                using RSA key F3781522A858A2C43D3BC997CA041CD1466FA2F8
gpg: Good signature from "Team Tyk (package signing) <team@tyk.io>" [ultimate]
```

#### Step 3: Configure Tyk Pump

If you don't complete this step, you won't see any analytics in your Dashboard, so to enable the analytics service, we need to ensure Tyk Pump is running and configured properly.

> **NOTE**: You need to replace `<hostname>` for `--redishost=<hostname>`, and `<IP Address>` for `--mongo=mongodb://<IP Address>/` with your own values to run this script.

```{.copyWrapper}
sudo /opt/tyk-pump/install/setup.sh --redishost=<hostname> --redisport=6379 --mongo=mongodb://<IP Address>/tyk_analytics
```

#### Step 4: Start Tyk Pump

```{.copyWrapper}
sudo service tyk-pump start
sudo service tyk-pump enable
```

You can verify if Tyk Pump is running and working by tailing the log file:

```{.copyWrapper}
sudo tail -f /var/log/upstart/tyk-pump.log
```

[1]: https://packagecloud.io
