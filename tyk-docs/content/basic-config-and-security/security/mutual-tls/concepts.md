---
title: Concepts
tags: ["mTLS",]
description: "What is mTLS and how to use it in Tyk"
menu:
  main:
    parent: "Mutual TLS"
weight: 3
---

## What is Mutual TLS?

{{< note success >}}
**Note**  

Mutual TLS is supported from Tyk Gateway 2.4, Tyk Dashboard 1.4 and MDCB 1.4
{{< /note >}}


Mutual TLS is a common security practice that uses client TLS certificates to provide an additional layer of protection, allowing to cryptographically verify the client information. 

In most cases when you try to access a secured HTTPS/TLS endpoint, you experience only the client-side check of the server certificate. The purpose of this check is to ensure that no fraud is involved and the data transfer between the client and server is encrypted. In fact, the TLS standard allows specifying the client certificate as well, so the server can accept connections only for clients with certificates registered with the server certificate authority, or provide additional security checks based on the information stored in the client certificate. This is what we call "Mutual TLS" - when both sides of the connection verify certificates. See the video below that gives you an introduction to mutual TLS and how it can be used to secure your APIs.

{{< youtube UzEzjon3IAo >}}

## Certificates 
If you have had to configure an SSL server or SSH access, the following information below should be familiar to you. 

Let's start with certificate definition. Here is what [Wikipedia](https://en.wikipedia.org/wiki/Public_key_certificate) says:

> In cryptography, a public key certificate, also known as a digital certificate or identity certificate, is an electronic document used to prove the ownership of a public key. The certificate includes information about the key, information about the identity of its owner (called the subject), and the digital signature of an entity that has verified the certificate's contents (called the issuer). If the signature is valid, and the software examining the certificate trusts the issuer, then it can use that key to communicate securely with the certificate's subject.

When it comes to authorisation, it is enough for the server that has a public client certificate in its trusted certificate storage to trust it. However, if you need to send a request to the server protected by mutual TLS, or need to configure the TLS server itself, you also need to have a private key, used while generating the certificate, to sign the request.

Using Tyk, you have two main certificate use cases:

1. Certificates without public keys used for authorisation and authentication
2. Certificates with private keys used for upstream access, and server certificates (in other words when we need to sign and encrypt the request or 
response).

Before a certificate can be used by Tyk, it needs to be encoded into PEM format. If you are using an `openssl` command to generate certificates, it should use PEM by default. A nice bonus of the PEM format is that it allows having multiple entries inside the same file. So in cases where a certificate also requires a private key, you can just concatenate the two files together.

## Certificate Management 
Tyk provides two options to manage certificates: plain files or certificate storage with a separate API.

All configuration options, which require specifying certificates, support both plain file paths or certificate IDs. You are able to mix them up, and Tyk will automatically distinguish file names from certificate IDs.

The Tyk Gateway and Dashboard Admin APIs provide endpoints to create, remove, list, and see information about certificates. For the Gateway, the endpoints are:

* Create: `POST /tyk/certs` with PEM body. Returns `{"id": "<cert-id>", ... }`
* Delete: `DELETE /tyk/certs/<cert-id>`
* Get info: `GET /tyk/certs/<cert-id>`. Returns meta info about the certificate, something similar to: 
```json
{ 
  "id": "<cert-id>",
  "fingerprint": <fingerprint>,
  "has_private_key": false, 
  "issuer": <issuer>,
  "subject": "<cn>", ... 
}
```
* Get info about multiple certificates: `GET /tyk/certs/<cert-id1>,<cert-id2>,<cert-id3>`. 
Returns array of meta info objects, similar to above.
* List all certificate IDs: `GET /tyk/certs`. Returns something similar to:

```json
{ "certs": "<cert-id1>", "<cert-id2>", ...  }
```

The Dashboard Admin API is very similar, except for a few minor differences:

* Endpoints start with `/api` instead of `/tyk`, e.g. `/api/certs`, `/api/certs/<cert-id>`, etc.
* All certificates are managed in the context of the organisation. In other words, certificates are not shared between organisations.

Certificate storage uses a hex encoded certificate SHA256 fingerprint as its ID. When used with the Dashboard API, Tyk additionally appends the organisation id to the certificate fingerprint. It means that certificate IDs are predictable, and you can check certificates by their IDs by manually 
generating certificate SHA256 fingerprint using the following command:
 
```{.copyWrapper}
openssl x509 -noout -fingerprint -sha256 -inform pem -in <cert>.
```

You may notice that you can't get the raw certificate back, only its meta information. This is to ensure security. Certificates with private keys have special treatment and are encoded before storing. If a private key is found it will be encrypted with AES256 algorithm 3 using the `security.private_certificate_encoding_secret` secret, defined in `tyk.conf` file. Otherwise, the certificate will use the [secret](https://tyk.io/docs/configure/tyk-gateway-configuration-options/#a-name-secret-a-secret) value in `tyk.conf`.

### MDCB 
Mutual TLS configuration in an MDCB environment has specific requirements. An MDCB environment usually consists of a management environment and slaves who, using MDCB, sync configuration. 
The Management and slave environments usually do not share any secrets; thus a certificate with private keys encoded with secret in management Gateway will not be accessible to slaves. 

To solve this issue, you need to set `security.private_certificate_encoding_secret`  in the MDCB configuration file to the same value as specified in your management Gateway configuration file. By knowing the original secret, MDCB will be able to decode private keys, and 
send them to client without password. Using a secure connection between slave Gateways and MDCB is required in this case. See MDCB setup page for use_ssl usage.

## Authorisation 
At the TLS level, authorisation means allowing only clients who provide client certificates that are verified and trusted by the server. 

Tyk allows you to define a list of trusted certificates at the API level or Gateway (global) level. If you are updating API definition programmatically or via files, you need to set following the keys in your API 
definition: 
`use_mutual_tls_auth` to `true`, and `client_certificates` as an array of strings - certificate IDs. 

From the Tyk Dashboard, to do the same from the **API Designer Core settings** section you need to select **Mutual TLS** authentication mode from the **Authentication** section, and allow the certificates using the built-in widget, as below:

{{< img src="/img/2.10/mtls_auth_cert.png" alt="mutual_tls_auth" >}}

If all your APIs have a common set of certificates, you can define them in your Gateway configuration file via the `security.certificates.apis` key - string array of certificate IDs or paths.

Select **Strip Authorization Data** to strip any authorization data from your API requests.  

Be aware that mutual TLS authorisation has special treatment because it is not "authentication" and does not provide any identifying functionality, like keys, so you need to mix it with another authentication modes options like **Auth Key** or **Keyless**. On the dashboard, you need to choose **Use multiple auth mechanism** in the **Authentication mode** drop-down, where you should select **Mutual TLS** and another option which suits your use-case. 

### Fallback to HTTP Authorisation 
The TLS protocol has no access to the HTTP payload and works on the lower level; thus the only information we have at the TLS handshake level is the domain. In fact, even a domain is not included into a TLS handshake by default, but there is TLS extension called SNI (Server Name Indication) 
which allows the client to send the domain name to the TLS handshake level. 

With this in mind, the only way to make API authorisation work fully at the  TLS level, each API protected by Mutual TLS should be deployed on its own domain.

However, Tyk will gracefully fallback to a client certificate authorisation at the HTTP level in cases when you want to have multiple mutual TLS protected APIs on the same domain, or you have clients that do not support the SNI extension. No additional configuration is needed. In case of such fallback, 
instead of getting TLS error, a client will receive 403 HTTP error.

## Authentication 
Tyk can be configured to guess a user authentication key based on the provided client certificate. In other words, a user does not need to provide any key, except the certificate, and Tyk will be able to identify the user, apply policies, and do the monitoring - the same as with regular Keys.

[Go here for more details](../client-mtls)


### Using with Authorization 
Mutual TLS authentication does not require mutual TLS authorisation to be turned on, and can be used separately. For example, you may allow some of the users to be authenticated by using a token in the header or similar, and some of the users via client certificates. 

If you want to use them both, just configure them separately. No additional knowledge is required.

## Upstream Access 
If your upstream API is protected with mutual TLS you can configure Tyk to send requests with the specified client certificate. You can specify one certificate per host and define a default certificate. 
Upstream certificates can be defined on API definition level or global level in your Gateway configuration file. Specified client certificates will be used not only for internal Tyk calls but also for HTTP calls inside your JSVM middleware. 

Inside your API definition you should set the `upstream_certificates` field to the following format:
`{"example.com": "<cert-id>"}`. Defining on a global level looks the same, but should be specified via the `security.certificates.upstream` field in your Gateway configuration file.

#### HTTP/HTTPS Protocol

{{< warning success >}}
**Note**  

Do NOT include the protocol or Tyk will not match your certificates to the correct domain.
{{< /warning >}}

 For example: 
 
 - **BAD** `https://api.production.myupstream.com` 
 - **GOOD** `api.production.myupstream.com`. 
 
 However, you need to include the port if the request is made via a non-standard HTTP port.

##### Wild Cards
To set a default client certificate, use `*` instead of domain name: `{"*": "<cert-id>"}`

You may use wild cards in combination with text to match the domain, but it only works one level deep.

Meaning, if your domain is `api.production.myupstream.com`

the only wildcard value accepted would be `*.production.myupstream.com`.  The value `*.myupstream.com` will NOT work.

#### Setting through the Dashboard


To do the same via the Tyk Dashboard, go to the **API Designer** > **Advanced Options** panel > **Upstream certificates** section.

{{< img src="/img/2.10/attach_upstream_cert.png" alt="upstream_cert" >}}

{{< img src="/img/2.10/add_upstream_cert.png" alt="add_upstream_cert" >}}


## Tips and Tricks 
You can create self-signed client and server certificates with this command:
```{.copyWrapper}
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes
```

For the server in `common name` specify a domain, or just pass `-subj "/CN=localhost"` to OpenSSL command. Then follow our [TLS and SSL Guide]({{< ref "basic-config-and-security/security/tls-and-ssl" >}}).

To get certificate SHA256 fingerprint use the following command:
```{.copyWrapper}
openssl x509 -noout -fingerprint -sha256 -inform pem -in <cert>
```
If you are testing using cURL, your command will look like: 

```{.copyWrapper}
curl --cert client_cert.pem --key client_key.pem https://localhost:8181
```
