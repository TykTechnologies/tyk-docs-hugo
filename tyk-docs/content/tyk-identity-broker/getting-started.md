--- 
date: 2021-18-01T15:00:00+13:00
title: Getting Started with TIB
menu:
  main:
    parent: "Tyk Identity Broker"
weight: 1
aliases:
  - /getting-started/tyk-components/tyk-identity-broker/getting-started/
---

## Requirements

TIB requires:

- Tyk Gateway v1.9.1+
- Redis
- Tyk Dashboard v0.9.7.1+ (Only if you want to do SSO to Tyk Dashboard UI or Tyk Developer Portal)

## Installation

The simplest way to use TIB is the embedded version, starting from Tyk Dashboard v3.0 TIB is built-in to the dashboard, in this case TIB will store the profiles in the same mongo database configured for dashboard (in the standalone TIB the profiles will be stored in file indicated when the app is started). 


### Configuration

For the embedded TIB you don't have to do anything, only ensure that in the Dashboard's config file `identity_broker` is not pointing to an external service, and `identity_broker.enabled` is set to `true`. For example:

```
"identity_broker": {
    "enabled": true,
},
```

This settings behaves as follows:

* If `enabled` = `false` then neither the external or internal TIB will be loaded
* If `enabled` = `true` and the tib host is not present the internal TIB will be loaded
* If `enabled` = `true` and the tib host is set, then external TIB will be loaded

## Installing TIB as separate application

If you wish to install TIB as a separate application rather than use the embedded version then you have the following options:

### Via Docker

You can install via [Docker](https://hub.docker.com/r/tykio/tyk-identity-broker/).

### Via Packages

You can install via [packages](https://packagecloud.io/tyk/tyk-identity-broker/install#bash-deb) (deb or rpm).

### Via Helm Chart for Kubernetes

Once you have installed the Gateway and Dashboard you can configure TIB by adding its configuration environment variables under the `tib.extraEnvs` section and providing the `profiles.json` as a ConfigMap - see below. See our [TIB GitHub repo](https://github.com/TykTechnologies/tyk-identity-broker#how-to-configure-tib). Once you complete your modifications you can run the following command from the root of the repository to update your helm chart.

```console
helm upgrade tyk-pro ./tyk-pro -n tyk
```

This chart implies there's a ConfigMap with a `profiles.json` definition in it. First create a ConfigMap in your cluster, and then use `tib.configMap.profiles` value to reference the name of this ConfigMap (tyk-tib-profiles-conf by default).

## Setting Absolute Paths

No command line arguments are needed, but if you are running TIB from another directory or during startup, you will need to set the absolute paths to the profile and config files:

```bash
Usage of ./tyk-auth-proxy:
  -c=string
        Path to the config file (default "tib.conf")
  -p#=string
        Path to the profiles file (default "profiles.json")
```

See [how to configure TIB](https://github.com/TykTechnologies/tyk-identity-broker#how-to-configure-tib) 
