---
title: MongoDB X.509 Client Authentication
tags: ["MongoDB", "x509"]
description: "Setting up MongoDB with X509 Client Authentication between Tyk Components"
menu:
  main:
    parent: "MongoDB"
weight: 2
---

You can use the *MongoDB X509 Certificate* flow to authenticate the *Tyk Dashboard*, *Tyk Pump*, and *Tyk MDCB* with your *MongoDB* install.  This is slightly different from [AWS DocumentDB setup instructions]({{< ref "frequently-asked-questions/how-to-connect-to-documentdb" >}}).

## Setting Up

Before we get into the configuration, we need to understand the two key components: connection strings and certificates.

### 1. Connection Strings


1) You must specify a username (and password if needed) in the connection string.  [Why do you need a username at all?](https://docs.mongodb.com/manual/tutorial/configure-x509-client-authentication/)

2) We must specify the following parameters: `?authSource=$external&authMechanism=MONGODB-X509"`

**An example of a connection string would be:**

```bash
"mongodb://CN=tyk-mongo-client,OU=TykTest@<host>:<port>/<db>?authSource=$external&authMechanism=MONGODB-X509"
```

##### Passwords
If you have to include a password, you can do it after the username in basic auth format:

```bash
"mongodb://CN=tyk-mongo-client,OU=TykTest,O=TykTest:mypassword@<host>:<port>/<db>?authSource=$external&authMechanism=MONGODB-X509"
```

##### URL Encoding Protected Characters
Note that you must url encode the `:` character into `%40`.   So replace any `:` in the username field into the URL encoded version.

### 2. Certificates

You'll need to provide two certificates to complete the X509 Client Authentication:

**CA Cert** containing just the public key of the Certificate Authority (CA).

**Client Cert** containing both the public and private keys of the client.

# Configuration

Here's what it looks like all put together:

## Tyk Dashboard
Your `tyk_analytics.conf` should include these fields at the root level:

```json
{
  ...
  "mongo_url": "mongodb://<username>@<host>:<port>/<db>?authSource=$external&authMechanism=MONGODB-X509",
  "mongo_use_ssl": true,
  "mongo_ssl_ca_file": "ca.pem",
  "mongo_ssl_pem_keyfile": "client.pem"
}
```

| Config File           | Environment Variable | Type   | Examples
| ---                   | --                   | ----   | ---- |
| "mongo_url"                       | TYK_DB_MongoURL      | string | "mongodb://{username}@{host}:{port}/{db}?authSource=$external&authMechanism=MONGODB-X509" |
| "mongo_use_ssl"                   | TYK_DB_MongoUseSSL      | bool | true, false |
| "mongo_ssl_ca_file"               | TYK_DB_MongoSSLCAFile      | string | "certificates/ca.pem" |
| "mongo_ssl_pem_keyfile"           | TYK_DB_MongoSSLPEMKeyfile      | string | "certificates/key.pem" |
| "mongo_ssl_insecure_skip_verify"  | TYK_DB_MongoSSLInsecureSkipVerify      | bool | true, false |
| "mongo_ssl_allow_invalid_hostnames" | TYK_DB_MongoSSLAllowInvalidHostnames      | bool | true, false |
| "mongo_session_consistency"       | TYK_DB_MongoSessionConsistency      | string | "strong", "eventual", or "monotonic". default is "strong" |
| "mongo_batch_size"                | TYK_DB_MongoBatchSize      | int | Default "2000", min "100" |


## Tyk Pump
You must separately configure each Tyk Pump that you deploy that targets MongoDB; note that Tyk offers three different Mongo pumps, `mongo`, `mongo_aggregate`, and `mongo_selective`.  

The following fields must be set under the `meta` section of each pump (or set as environment variable):

```yaml
{ 
  ...
  "pumps": {
    "mongo": {
      "type": "mongo",
      "meta": {
        "collection_name": "tyk_analytics",
        "mongo_url": "mongodb://CN=tyk-mongo-client,OU=TykTest@<host>:<port>/<db>?authSource=$external&authMechanism=MONGODB-X509",
        "mongo_use_ssl": true,
        "mongo_ssl_ca_file": "ca.pem",
        "mongo_ssl_pem_keyfile": "client.pem"
      }
    }
  }
}
```

In addition to the other configs, these are the ones related to MongoDB:

| Config File           | Type  | Examples
| -- | -- | --
"mongo_url" | string     | "mongodb://{username}@{host}:{port}/{db}?authSource=$external&authMechanism=MONGODB-X509" |   
"mongo_use_ssl" | bool | true, false |
"mongo_ssl_ca_file" | string      | "certificates/ca.pem" |  
“mongo_ssl_pem_keyfile" | string     | "certificates/key.pem" |     
"mongo_ssl_insecure_skip_verify" | bool     | true, false |     
"mongo_ssl_allow_invalid_hostnames" | bool         | true, false | 

## Tyk MDCB

As of Tyk MDCB v1.8.0, you have been able to secure Tyk MDCB with MongoDB using X509 Certificate Authentication flow.

The config settings are exactly the same as the Tyk Dashboard steps, just nested one level deeper:

**Example Config:**
```json
{
  ...
  "analytics": {
    "mongo_url": "mongodb://CN=tyk-mongo-client,OU=TykTest@<host>:<port>/<db>?authSource=$external&authMechanism=MONGODB-X509",
    "mongo_use_ssl": true,
    "mongo_ssl_ca_file": "ca.pem",
      "mongo_ssl_pem_keyfile": "client.pem"
  }
}
```
| Config File           | Environment Variable | Type   | Examples
| ---                   | --                   | ----   | ---- |
"analytics.mongo_url" | TYK_MDCB_ANALYTICS_MongoURL | string   |  "mongodb://{username}@{host}:{port}/{db}?authSource=$external&authMechanism=MONGODB-X509"
"analytics.mongo_use_ssl" | TYK_MDCB_ANALYTICS_MongoUseSSL | bool | true, false |
"analytics.mongo_ssl_ca_file" | TYK_MDCB_ANALYTICS_MongoSSLCAFile | string |  "certificates/ca.pem" |
"analytics.mongo_ssl_pem_keyfile" | TYK_MDCB_ANALYTICS_MongoSSLPEMKeyfile | string | "certificates/key.pem" |
"analytics.mongo_ssl_insecure_skip_verify" | TYK_MDCB_ANALYTICS_MongoSSLInsecureSkipVerify | bool | true, false |
"analytics.mongo_ssl_allow_invalid_hostnames" | TYK_MDCB_ANALYTICS_MongoSSLAllowInvalidHostnames | bool  | true, false |
"analytics.mongo_session_consistency" | TYK_MDCB_ANALYTICS_MongoSessionConsistency | string |  "strong", "eventual", or "monotonic". default is "strong" |
"analytics.mongo_batch_size" |  TYK_MDCB_ANALYTICS_MongoBatchSize | int |  Default "2000", min "100" |
