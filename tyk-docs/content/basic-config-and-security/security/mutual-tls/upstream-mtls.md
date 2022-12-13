---
title: Upstream mTLS
tags: ["mTLS"]
description: "How to send upstream requests with a mTLS protected API"
menu:
  main:
    parent: "Mutual TLS"
weight: 2
---

If your upstream API is protected with mutual TLS you can configure Tyk to send requests with the specified client certificate. 

- You can specify one certificate per host and define a default certificate. 
- Upstream certificates can be defined on API definition level or globally (via Gateway configuration file). 
- Specified client certificates will be used not only for internal Tyk calls but also for HTTP calls inside your JSVM middleware. 


### How To Set Up

**Via API Definition**

Inside your API definition you should set the `upstream_certificates` field to the following format:
`{"example.com": "<cert-id>"}`. Defining on a global level looks the same, but should be specified via the `security.certificates.upstream` field in your Gateway configuration file.

**Via Dashboard**

To do the same via the Tyk Dashboard, go to the **API Designer** > **Advanced Options** panel > **Upstream certificates** section.

![upstream_cert]({{< ref "img/2.10/attach_upstream_cert.png" >}})


### Domain

Do **NOT** include the protocol or Tyk will not match your certificates to the correct domain.   

 For example: 
 
 ❌ `https://api.production.myupstream.com` 

 ✅ `api.production.myupstream.com`

 You need to include the port if the request is made via a non-standard HTTP port.

 ✅ `api.production.myupstream.com:8443`


### Wild Cards

You may use wild cards in combination with text to match the domain, but it only works one level deep.

Example, if your domain is `api.production.myupstream.com`

 ✅ `*.production.myupstream.com`  
 
 ❌ `*.myupstream.com`

#### Default Upstream Cert

To set a default client certificate, use `*` instead of domain name: `{"*": "<cert-id>"}`


