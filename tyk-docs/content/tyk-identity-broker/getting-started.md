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

```json
"identity_broker": {
    "enabled": true,
},
```

This settings behaves as follows:

* If `enabled` = `false` then neither the external or internal TIB will be loaded
* If `enabled` = `true` and the tib host is not present the internal TIB will be loaded
* If `enabled` = `true` and the tib host is set, then external TIB will be loaded

### Configure secret for hashing session cookies
To secure session cookies within Tyk Identity Broker (TIB) when integrating with social providers, setting the `TYK_IB_SESSION_SECRET` environment variable is crucial. This variable plays a pivotal role in hashing session cookies, thereby enhancing security. By default, if this variable isn't explicitly set, TIB falls back to using the Tyk Dashboard's admin_secret when it's embedded in the dashboard.

For a seamless and secure setup, start by generating a strong, unique secret string. It is recommended to use a string with 32 or 64 bytes to ensure optimal security, this string will be your session secret. In a Linux, Unix, or MacOS environment, you can set this variable by running the command `export TYK_IB_SESSION_SECRET='your_secret'`.

## Installing TIB as separate application

If you wish to install TIB as a separate application rather than use the embedded version then you have the following options:

### Via Docker

You can install via [Docker](https://hub.docker.com/r/tykio/tyk-identity-broker/).

### Via Packages

You can install via [packages](https://packagecloud.io/tyk/tyk-identity-broker/install#bash-deb) (deb or rpm).

### Via Helm Chart for Kubernetes

[Tyk Helm Chart]({{<ref "product-stack/tyk-charts/overview">}}) does not support installing TIB as separate application. If you want to enable embedded TIB in Dashboard, you can do so by updating `tib.enabled` to `true` in `tyk-dashboard` chart. If you are using an umbrella chart from us (e.g. `tyk-stack` and `tyk-control-plane`), you can do so by updating `tyk-dashboard.tib.enabled` to `true`.

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
