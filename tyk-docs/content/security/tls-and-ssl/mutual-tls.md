---
title: Mutual TLS
menu:
  main:
    parent: "TLS and SSL"
weight: 2
---

## <a name="what-is"></a> What is Mutual TLS?

> NOTE: Mutual TLS feature supported starting from Tyk Gateway 2.4, Tyk Dashboard 1.4 and MDCB 1.4

Mutual TLS is a common security practice, that uses client TLS certificates to provide an additional layer of protection, allowing to cryptographically verify the client information.

In most of the cases when you try to access secured HTTPS/TLS endpoint, you experience only the client-side check of the server certificate. The purpose of this check is to ensure that no fraud is involved and data transfer between the client and server is encrypted. In fact, the TLS standard allows specifying the client certificate as well, so the server can accept connections only for clients with certificates registered with the server certificate authority, or provide additional security checks based on the information stored in the client certificate. This is what we call "Mutual TLS" - when both sides of the connection verify certificates.

## <a name="mtls-support"></a> How Tyk Supports Mutual TLS 

Tyk has support for Mutual TLS in the following areas:

* Authorisation (white-listing certificates on API level)
* Authentication (creating keys based on certificates)
* Upstream access (including JSVM HTTP calls)
* Admin APIs for Gateway, Dashboard, and MDCB, including internal communication between those products

The main requirement to make it work is that SSL traffic should be terminated by Tyk itself. If you are using a load balancer, you should configure it to work in TCP mode.

Before going into details about each of this areas, let's describe the basic building blocks used to make it work.

## <a name="certificates"></a> Certificates 
If you have had to configure an SSL server or SSH access, the following information below should be familiar to you. 

Let's start with certificate definition. Here is what [Wikipedia](https://en.wikipedia.org/wiki/Public_key_certificate) says:

> In cryptography, a public key certificate, also known as a digital certificate or identity certificate, is an electronic document used to prove the ownership of a public key. The certificate includes information about the key, information about the identity of its owner (called the subject), and the digital signature of an entity that has verified the certificate's contents (called the issuer). If the signature is valid, and the software examining the certificate trusts the issuer, then it can use that key to communicate securely with the certificate's subject.

When it comes to authorisation, it is enough for the server that has public client certificate in its trusted certificate storage, to trust it. However, if you need send a request to the server protected by mutual TLS, or need to configure the TLS server itself, you also need to have a private key, used while certificate generation, to sign the request.

Using Tyk, you have two main certificate use cases:

1. Certificates without public keys used for authorization and authentication
2. Certificates with private keys used for upstream access, and server certificates (in other words when we need to sign and encrypt request or 
response).

Before a certificate can be used by Tyk, it needs to be encoded into PEM format. If you are using an `openssl` command to generate certificates, it should use PEM by default. A nice bonus of the PEM format is that it allows having multiple entries inside the same file. So in cases where a certificate also requires a private key, you can just concatenate the two files together.

## <a name="certificates-management"></a> Certificate Management 
Tyk provides you two options to manage certificates: plain files or certificate storage with a 
separate API.

All configuration options, which require specifying certificates, support both plain file paths or certificate IDs. You are able to mix them up, and Tyk will automatically distinguish file names from certificate IDs.

The Tyk Gateway and Dashboard Admin APIs provide endpoints to create, remove, list, and see information about certificates. For the Gateway, the endpoints are:

* Create: `POST /tyk/certs` with PEM body. Returns `{"id": "<cert-id>", ... }`
* Delete: `DELETE /tyk/certs/<cert-id>`
* Get info: `GET /tyk/certs/<cert-id>`. Return meta info about certificate, smth like this: `{ "id": "<cert-id>", "has_private_key": false, "subject": "common_name": "<cn>", ... }`
* Get info about multiple certificate: `GET /tyk/certs/<cert-id1>,<cert-id2>,<cert-id3>`. 
Returns array of meta info objects, similar to above.
* List all certificate IDs: `GET /tyk/certs. Returns: { "certs": "<cert-id1>", "<cert-id2>", ...  }`

The Dashboard Admin API is very similar, except for a few minor differences:

* Endpoints start with `/api` instead of `/tyk`, e.g. `/api/certs`, `/api/certs/<cert-id>` and etc.
* All certificates managed in the context of the organisation. In other words, certificates are not shared between organisations.

Certificate storage uses a hex encoded certificate SHA256 fingerprint as its ID. When used with the Dashboard API, Tyk additionally appends the organisation id to the certificate fingerprint. It means that certificate IDs are predictable, and you can check certificates by their IDs by manually 
generating certificate SHA256 fingerprint using following command: 
```{.copyWrapper}
openssl x509 -noout -fingerprint -sha256 -inform pem -in <cert>.
```

You may notice that you can't get the raw certificate back, only its meta information. This is to ensure security. Certificates with private keys have special treatment and are encoded before storing: if a private key is found it gets encrypted with AES256 algorithm 3 using `security.private_certificate_encoding_secret` from the Gateway configuration file and if it is empty, it will fallback to the value in the field [secret](https://tyk.io/docs/configure/tyk-gateway-configuration-options/#a-name-secret-a-secret).

## <a name="authorisation"></a> Authorisation 
At the TLS level, authorisation means allowing only clients who provide client certificates that are verified and trusted by the server. 

Tyk allows you to define a list of trusted certificates at the API level or Gateway (global) level. If you are updating API definition programmatically or via files, you need to set following the keys in your API 
definition: 
`use_mutual_tls_auth` to `true`, and `client_certificates` as an array of strings - certificate IDs. 

From the Tyk Dashboard, to do the same, from the **API Designer Core settings** section you need to select **Mutual TLS** authentication mode from the **Authentication** section, and whitelist the certificates using the built-in widget, as below:

![mutual_tls_auth][1]

If all your APIs have a common set of certificates, you can define them on Gateway configuration file via the `security.certificates.apis` key - string array of certificate IDs or paths.

Select **Strip Authorization Data** to strip any authorization data from your API requests.  

Be aware that Mutual TLS authorisation has special treatment, because it is not "authentication" and do not provide any identifying functionality, like keys, so you need to mix it with another authentication modes options like **Auth Key** or **Keyless**. On the dashboard, you need to choose **Use multiple auth mechanism** in **Authentication mode** dropdown, where you should select **Mutual TLS** and another option which suite your use-case. 

### <a name="fallback-http-authorisation"></a> Fallback to HTTP Authorisation 
The TLS protocol has no access to the HTTP payload and works on the lower level; thus the only information we have at the TLS handshake level is the domain. In fact, even a domain is not included into a TLS handshake by default, but there is TLS extension called SNI (Server Name Indication) 
which allows the client to send the domain name to the TLS handshake level. 

With this in mind, the only way to make API authorisation work fully at the  TLS level, each API protected by Mutual TLS should be deployed on its own domain.

However, Tyk will gracefully fallback to a client certificate authorisation at the HTTP level in cases when you want to have multiple Mutual TLS protected APIs on the same domain, or you have clients that do not support the SNI extension. No additional configuration is needed. In case of such fallback, 
instead of getting TLS error, a client will receive 403 HTTP error.

## <a name="authentication"></a> Authentication 
Tyk can be configured to guess a user authentication Key based on the provided client certificate. In other words, a user does not need to provide any Key, except the certificate, and Tyk will be able to identify the user, apply policies, and do the monitoring - the same as with regular Keys.

The basic idea here is that you can create a Key based on a provided certificate, and this Key will be used for the users with same client certificates.

From a technical point of view, this is an extension of Auth token authentication mode. To enable this feature, set the API definition `auth.use_certificate.` boolean variable to `true`. While 
creating the Keys, you need to set the `certificate` field to the existing certificate ID or path. It may be useful to know that such Keys have special treatment - key ID generated as `OrgID + SHA256(certificate)`, instead of using a random value.

To do the same in the Tyk Dashboard, From the **API Designer** select Auth Token from the Target Details > Authentication mode. Then select **Enable Client Certificate** as below:

![enable_cert][2]

While creating a Key, select **Authenticate using your client certificate**  and select the certificate which will be used when creating a key.

![keys_cert][3]

### <a name="using-with-authorization"></a> Using with Authorization 
Mutual TLS authentication does not require Mutual TLS authorization to be turned on, and can be used separately. For example you may allow some of the users be authenticated by using a token in the header or similar, and some of the users via client certificates. 

If you want use them both, just configure them separately, no additional knowledge is required.

## <a name="upstream-access"></a> Upstream Access 
If your upstream API is protected with mutual TLS you can configure Tyk to send requests with the specified client certificate. You can specify one certificate per host and define a default certificate. 
Upstream certificates can be defined on API definition level or global level in your Gateway configuration file. Specified client certificates will be used not only for internal Tyk calls but also for HTTP calls inside your JSVM middleware. 

Inside your API definition you should set upsteam_certificates field to the following format:
`{"example.com": "<cert-id>"}.` Defining on global level looks same, but should be specified via the `security.certificates.upstream` field in your Gateway configuration file. To set a default client certificate, use * instead of domain name: `{"*": "<cert-id>"}` It is worth noting that the hostname should include the port if the request is made via a non-standard HTTP port.

To do the same via the Tyk Dashboard, go to the **API Designer** > **Advanced Options** panel > **Upstream certificates** section.

![upstream_cert][4] 

![add_upstream_cert][5]

## <a name="mdcb"></a> MDCB 
Mutual TLS configuration on an MDCB environment has its specific requirements. An MDCB environment usually consists of a management environment and slaves who, using MDCB, sync configuration. 
The Management and slave environments usually do not share any secrets; thus a certificate with private keys encoded with secret in management gateway, will not be accessible to slaves. 

To solve this issue, you need set `security. private_certificate_encoding_secret`  in the MDCB configuration file, to the same value as specified in your management gateway configuration file. By knowing the original secret, MDCB will be able to decode private keys, and 
send them to client without password. Using secure connection between slave Gateways and MDCB is required in this case. See MDCB setup page for use_ssl usage.

## <a name="tips-tricks"></a> Tips and Tricks 
You can create self-signed client and server certificates with this command:
```{.copyWrapper}
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes
```

For the server in `common name` specify a domain, or just pass `-subj "/CN=localhost"` to OpenSSL command. Then follow our [TLS and SSL Guide](https://www.tyk.io/docs/security/tls-and-ssl/).

To get certificate SHA256 fingerprint use the following command: 
```{.copyWrapper}
openssl x509 -noout -fingerprint -sha256 -inform pem -in <cert>
```
If you are testing using curl, your command will look like: 

```{.copyWrapper}
curl --cert client_cert.pem --key client_key.pem https://localhost:8181
```


[1]: /docs/img/dashboard/system-management/mutual_tls_auth_2.5.png
[2]: /docs/img/dashboard/system-management/enable_cert_2.5.png
[3]: /docs/img/dashboard/system-management/add_cert_keys_2.5.png
[4]: /docs/img/dashboard/system-management/upstream_cert_2.5.png
[5]: /docs/img/dashboard/system-management/add_upstream_cert_2.5.png






