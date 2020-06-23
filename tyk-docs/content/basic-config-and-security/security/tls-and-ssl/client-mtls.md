---
title: Client mTLS
menu:
  main:
    parent: "TLS and SSL"
weight: 2
---

## Authentication 
Tyk can be configured to guess a user authentication key based on the provided client certificate. In other words, a user does not need to provide any key, except the certificate, and Tyk will be able to identify the user, apply policies, and do the monitoring - the same as with regular Keys.

The basic idea here is that you can create a key based on a provided certificate, and this key will be used for the users with same client certificates.


### Quickstart 

1. To setup, first protect the API by setting the Authentication Type in the **API Designer**, select Auth Token from the Target Details > Authentication mode. Then select **Enable Client Certificate** as below:

![enable_cert](/docs/img/2.10/client_cert.png)

2. Let's generate a self-signed key pair to use in the following.  Skip this step if you already have your own certs.

```
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes
```

3. Add a key through the Dashboard, and select "Mutual TLS"

The cert you upload for this key can be either the public + private key in a single .PEM file or just the public key.

![keys_cert](/docs/img/2.10/client_mtls_add_cert.png)

Finally, make sure you add the API from step #1 to the "Access Rights" for this key.

1. And now we can make a cURL to this API using only the cert + private key.

```
$ curl -k \
       --cert cert.pem \
       --key key.pem \
       https://localhost:8080/mtls-api/my-endpoint

<200 response>

```

## Developer Portal - Self Serve Cert Trust

The above API is now ready to be exposed to the Developer Portal, where developers can add their own certs to use to access APIs.

1. Create a policy for the API we set up above
2. Create a catalogue entry for this policy
3. As a developer on the Portal, request a key for this API.  This will take us to this screen:

![portal_cert_request](/docs/img/dashboard/system-management/portal_cert_request.png)

Add your public cert (cert.pem from above) into here and hit "Request Key".  

Now we can make an API request just using the pub + private key:

```
$ curl -k \
       --cert cert.pem \
       --key key.pem \
       https://localhost:8080/mtls-api/my-endpoint

<200 response>

```

## FAQ

#### Why am I getting "Unauthorized! Header Not Found" Error?

From a technical point of view, this is an extension of Auth token authentication mode. To enable this feature, set the API definition `auth.use_certificate.` boolean variable to `true`. While 

#### Can I use both public and private key concatenated when uploading into the Dashboard?

You can do this ONLY through the manual "Create A Key" flow as an Admin Dashboard user.  Through the Portal, you must ONLY paste the contents of the public key, or cert as it is typically called.