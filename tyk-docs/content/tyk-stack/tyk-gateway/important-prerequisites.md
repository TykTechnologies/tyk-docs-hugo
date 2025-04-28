---
date: 2020-02-18T15:08:55Z
Title: Useful Configurations when Getting started
aliases:
  - /getting-started/tutorials/important-prerequisites/
---

These are some common settings that you need before proceeding with other parts of our tutorials.

## Tyk Config

### Path to Tyk API Definitions configurations directory

You may need to explicitly define the path in your Tyk config to the directory where you will add
the API definitions for Tyk to serve.

```yaml
...
"app_path": "/opt/tyk-gateway/apps",
...
```

### Path to Policies file

You need to explicitly set the path to your Policies JSON file in your Tyk config.

```yaml
...
  "policies": {
    "policy_source": "file",
    "policy_record_name": "policies/policies.json"
  },
...
```

### Remove Tyk Dashboard related config options

Some config options for the Community Edition are not compatible with the Dashboard
version, which requires a license. So, **remove** any section in your Tyk config which
starts with:

```yaml
...
"db_app_conf_options" {
  ...
},
...
```

## Hot reload is critical in Tyk CE

Each time you add an API definition in Tyk CE, you need to make a hot reload API call as follows:

```curl
curl -H "x-tyk-authorization: {your-secret}" -s https://{your-tyk-host}:{port}/tyk/reload/group | python -mjson.tool
```
