---
title: "Manage TLS certificates"
date: 2024-06-25
tags: ["Tyk Operator", "Kubernetes", "certificates", "TLS"]
description: "Using Tyk Operator to manage TLS certificates in Kubernetes environment"
---

Tyk Operator is designed to offer a seamless Kubernetes-native experience by managing TLS certificates stored within Kubernetes for your API needs. Traditionally, to use a certificate (e.g., as a client certificate, domain certificate, or certificate for accessing an upstream service), you would need to manually upload the certificate to Tyk and then reference it using a 'Certificate ID' in your API definitions. This process can become cumbersome, especially in a Kubernetes environment where certificates are often managed as secrets and may rotate frequently.

To address this challenge, Tyk Operator allows you to directly reference certificates stored as Kubernetes secrets within your custom resource definitions (CRDs). This reduces operational overhead, minimizes the risk of API downtime due to certificate mismatches, and provides a more intuitive experience for API developers.

### Benefits of Managing Certificates with Tyk Operator
- **Reduced operational overhead**: Automates the process of updating certificates when they rotate.
- **Minimized risk of API downtime**: Ensures that APIs continue to function smoothly, even when certificates are updated.
- **Improved developer experience**: Removes the need for API developers to manage certificate IDs manually.

### Examples

| Certificate Type | Supported in ApiDefinition | Supported in TykOasApiDefinition |
|------------------|-------------|---------|
| Client certifates | ✅ [Client mTLS]({{<ref "basic-config-and-security/security/mutual-tls/client-mtls#tyk-operator-classic">}}) | ✅ [Client mTLS]({{<ref "basic-config-and-security/security/mutual-tls/client-mtls#tyk-operator-oas">}}) |
| Custom domain certificates | ✅ [TLS and SSL]({{<ref "basic-config-and-security/security/tls-and-ssl#tyk-operator-classic">}}) | ✅ [TLS and SSL]({{<ref "basic-config-and-security/security/tls-and-ssl#tyk-operator-oas">}}) |
| Public keys pinning | ✅ [Certificate pinning]({{<ref "security/certificate-pinning#tyk-operator-classic">}}) | ✅ [Certificate pinning]({{<ref "security/certificate-pinning#tyk-operator-oas">}}) |
| Upstream mTLS | ✅ [Upstream mTLS via Operator]({{<ref "basic-config-and-security/security/mutual-tls/upstream-mtls#tyk-operator-classic">}}) | ✅ [Upstream mTLS via Operator]({{<ref "basic-config-and-security/security/mutual-tls/upstream-mtls#tyk-operator-oas">}}) |

## Conclusion
By integrating Kubernetes secrets management with Tyk Operator, you can simplify the process of managing TLS certificates for your APIs, enhance security, and provide a more native Kubernetes experience. Use the examples provided to set up your API configurations with client certificates, custom domain certificates, or certificate pinning, all managed efficiently within your Kubernetes environment.