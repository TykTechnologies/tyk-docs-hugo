---
title: Client mTLS
tags: ["mTLS", "Static", "Dynamic"]
description: "How to set up client mTLS"
menu:
  main:
    parent: "Mutual TLS"
weight: 1
---

There are two ways to set up client mTLS in Tyk, **static** and **dynamic**.  They vary on your use case.

|         Use Case                                                           | Static |   Dynamic     | 
|----------------------------------------------------------------------------|--------|---------------|
| Let developers upload their own public certificates through the Developer Portal                 | ❌ | ✅ |
| Combine client mTLS with another authentication method                                           | ✅ | ✅ |
| Allow certs at the API level       *(one or more APIs per cert)*                             | ✅ | ❌ |
| Allow certs at an individual level *(one or more APIs per cert)*                             | ❌ | ✅ |


## Dynamic Client mTLS
Tyk can be configured to guess a user authentication key based on the provided client certificate. In other words, a user does not need to provide any key, except the certificate, and Tyk will be able to identify the user, apply policies, and do the monitoring - the same as with regular Keys.

The basic idea here is that you can create a key based on a provided certificate. You can then use this key **or** the cert for one or more users.

#### Quickstart 

1. To setup, first protect the API by setting the Authentication Type in the **API Designer**, select Auth Token from the Target Details > Authentication mode. Then select **Enable Client Certificate** as below:

{{< img src="/img/2.10/client_cert.png" alt="enable_cert" >}}

2. Let's generate a self-signed key pair to use in the following.  Skip this step if you already have your own certs.

```
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes
```

3. Add a key through the Dashboard, and select the API from step #1 in the Access Rights

{{< note success >}} 
**Note**

The certificate you upload for this key **must only be the public certificate**.
{{< /note >}}

{{< img src="/img/2.10/client_mtls_add_cert.png" alt="keys_cert" >}}


4. And now we can make a cURL to this API using the cert + private key.

```
$ curl -k \
       --cert cert.pem \
       --key key.pem \
       https://localhost:8080/mtls-api/my-endpoint

<200 response>

```

#### Developer Portal - Self Serve Cert Trust

Instead of manually creating keys, we can expose the Above API via the Developer Portal, where developers can add their own certs to use to access APIs.

1. Create a policy for the API we set up above
2. Create a catalogue entry for this policy
3. As a developer on the Portal, request a key for this API.  This will take us to this screen:

{{< img src="/img/dashboard/system-management/portal_cert_request.png" alt="portal_cert_request" >}}

Add your public cert (cert.pem from above) into here and hit "Request Key".  

Now we can make an API request just using the pub + private key:

```
$ curl -k \
       --cert cert.pem \
       --key key.pem \
       https://localhost:8080/mtls-api/my-endpoint

<200 response>

```

## Static mTLS

Static mTLS simply means to allow client certs at the API level.

to set it up, in the API authentication settings, choose mTLS and one other authentication type.  If you don't want to use additional authentication type, i.e. only client cert alone, then select "keyless" as the other.

The base Identity can be anything as the client cert is the only thing configured.

Here's what it should look like:
{{< img src="/img/2.10/client_mtls_multiple_auth.png" alt="enable_cert" >}}

## FAQ

#### Why am I getting "Unauthorized! Header Not Found" Error?

From a technical point of view, this is an extension of Auth token authentication mode. To enable this feature, set the API definition `auth.use_certificate.` boolean variable to `true`. While 

#### Can I use both public and private key concatenated when uploading into the Dashboard?

You can do this ONLY through the manual "Create A Key" flow as an Admin Dashboard user.  Through the Portal, you must ONLY paste the contents of the public key, or cert as it is typically called.


