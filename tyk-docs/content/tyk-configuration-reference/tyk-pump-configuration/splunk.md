---
date: 2017-03-27T15:47:05+01:00
title: Splunk Setup
menu:
    main:
        parent: "Tyk Pump Configuration"
weight: 4 
url: /tyk-configuration-reference/tyk-pump-configuration/splunk/
---

This is a step by step guide to setting Splunk to receive logs from the Tyk Pump.

The assumptions are that you have Docker installed and Tyk Pro On-premises already running.

## 1.   Run Splunk using Docker
Assuming you have Docker installed locally, run the following from a terminal:

```{.copyWrapper}
$ docker run \
-p 8000:8000 \
-p 8088:8088 \
-v splunk-data:/opt/splunk/var \
-v splunk-data:/opt/splunk/etc \
-e SPLUNK_START_ARGS=--accept-license \
-e SPLUNK_PASSWORD=mypassword \
splunk/splunk:latest
```

## 2. Setup a collector in Splunk

A) Visit http://localhost:8000 and log into the Splunk Dashboard using the username `admin` and the password we set in the Docker run command, `mypassword`

B) Create a new Data input
![Step1](/img/pump/splunk_step1.png)

C) Select `HTTP Event Collector -> Add New`  
![Step2](/img/pump/splunk_step2.png)

D) Set the name to "tyk" and then leave everything else as default
![Step2b](/img/pump/splunk_step2b.png)

Grab your token at the end page:
![Step3](/img/pump/splunk_step3.png)

### 3. Add the Splunk bit to pump.conf

Edit your pump's `pump.conf` and add this bit to the "Pumps" section, like so, adding the token from step #1:

Make sure to add your token from the previous step into the `collector_token` field above

```json
{
    "pumps": {
        "splunk": {
            "type": "splunk",
            "meta": {
                "collector_token": "<token>",
                "collector_url": "https://localhost:8088/services/collector/event",
                "ssl_insecure_skip_verify": true
            }
        }
    }
}
```
{{< note success >}}
**Note**  

Make sure that the `localhost` value matches with your setup. Head on over to our [community forum](https://community.tyk.io/) to ask for help if you are stuck here.
{{< /note >}}


### 4. Restart Tyk Pump to pickup the Splunk config

If you are running Tyk Pump in Docker:

`$ docker restart tyk-pump`

### 5. PROFIT!

Let's make a few API calls against Tyk, and see if they flow into Splunk

```bash
$ curl localhost:8080/loan-service-api/

{
    "error": "Key not authorized"
}%
```

Success:
![Step4](/img/pump/splunk_step4.png)
