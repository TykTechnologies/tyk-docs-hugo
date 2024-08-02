---
title: "Tyk API Management FIPS support"
date: 2024-07-25
tags: ["FAQ", "FIPS Releases", "Special Release - FIPS"]
description: "Explain what FIPS Release means, what it includes, and what to expect"
---

FIPS (Federal Information Processing Standards) is a series of cryptography and hashing standards defined by the U.S.
Federal Government for ensuring cybersecurity. These standards are crucial for organizations dealing with sensitive
government data and are widely recognized as a benchmark for security in various regulated industries.

The Federal Information Processing Standard (FIPS) 140-2 is a federal standard defined by the National Institute of
Standards and Technology (NIST). It specifies the security requirements that must be satisfied by a cryptographic module.

## FIPS 140-2 Overview

[FIPS 140-2](https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.140-2.pdf) is a specific standard within the FIPS
framework that focuses on the security of cryptographic modules. It defines four levels of security, from Level 1
(lowest) to Level 4 (highest), each building upon the security requirements of the previous level. These levels cover
a wide range of potential applications and environments in which cryptographic modules may be employed. A cryptographic
module, as defined by FIPS 140-2, is a set of hardware, software, firmware, or some combination thereof that implements
cryptographic functions or processes, including cryptographic algorithms and optional key generation, and is contained
within a defined cryptographic boundary.

FIPS 140-2 validation is performed by accredited [Cryptographic and Security Testing](https://csrc.nist.rip/Projects/cryptographic-module-validation-program/Standards#:~:text=FIPS%20140%2D2%20(effective%2015%2DNov%2D2001)&text=NVLAP%20accredited%20Cryptographic%20and%20Security,for%20Cryptographic%20Modules%20%5B%20PDF%20%5D.)
(CST) laboratories. The validation covers various aspects of the cryptographic module, including Electromagnetic
Interference/Electromagnetic Compatibility (EMI/EMC), Cryptographic Module Specification, and mitigation of Other Attacks.
For more information, please check the detailed section on the
[importance of FIPS compliance]({{< ref "#importance-of-FIPS-Compliance">}}). You can also learn about its significance
in the context of [API management]({{< ref "#importance-of-FIPS-Compliance-in-API-Management" >}}).

## Tyk's FIPS Compliance

We are pleased to announce that Tyk Gateway and Pump now offer FIPS compliance. The FIPS Tyk Gateway and the FIPS Tyk
Pump package (together, the *"FIPS Tyk Product"*) is FIPS 140-2 compliant.

To achieve FIPS compliance, our components are compiled with a FIPS-validated crypto/hashing library. Specifically, Tyk
uses [BoringCrypto](https://csrc.nist.gov/CSRC/media/projects/cryptographic-module-validation-program/documents/security-policies/140sp3678.pdf), a FIPS-validated crypto/hashing library available for Go.

**Note:** The use of the *FIPS Tyk Product* is conditional on user accepting any specific terms and conditions applicable to this
feature and a paid license. **Please contact your account manager** if you would like further information

### The definition of "compliance"
The *FIPS Tyk Product* is designed to be compliant by using only FIPS 140-2 approved algorithms while running in FIPS
mode. It's important to note that while the product adheres to compliance standards, it has not undergone formal
validation by a [NIST](https://www.nist.gov/federal-information-processing-standards-fips) testing lab. This compliance
is specific to specially built packages or docker images of the *FIPS Tyk Product*.

These packages and images are not publicly accessible. You can request them by contacting your assigned account manager.

### Verification and Certification

Tyk's FIPS compliance is based on the use of FIPS 140-2 validated cryptographic modules, specifically the BoringCrypto
module. While the *FIPS Tyk Product* is compliant with FIPS 140-2, it has not undergone formal validation by a NIST
testing lab.

### FIPS-Compliant Cryptographic Operations

The *FIPS Tyk Product* uses the [BoringCrypto](https://boringssl.googlesource.com/boringssl/+/master/crypto/fipsmodule/FIPS.md#fips-140_2) module to provide FIPS 140-2 validated cryptographic operations. This ensures that when running in FIPS mode, only FIPS 140-2 approved algorithms are used.

For more details on the cryptographic operations supported in Tyk's FIPS-compliant mode, please contact your Tyk account manager.

## Configuring Tyk for FIPS Compliance

FIPS is enabled by default, if you install fips supported packages from our official channels. 

The only change to configuration, is to update your key hashing algorithm to SHA256 either by setting `hash_key_function` in tyk.conf or TYK_GW_HASHKEYFUNCTION ENV var to `sha256` value. 

When installed, FIPS compilant products be available on your machine with `-fips` suffix. E.g. `tyk-gateway-fips` or `tyk-pump-fips`.


## Frequently Asked Questions

Q: What level of FIPS 140-2 compliance does Tyk support?

A: Tyk provides FIPS 140-2 compliance, ensuring the use of approved algorithms in FIPS mode.

Q: Can I use Tyk in FIPS mode in cloud environments?
A: Yes but only for hybrid gateways deployed on your premise and connecting to the Cloud control plane.

Q: Does FIPS mode affect Tyk's performance?
A: There may be a slight performance impact due to the use of FIPS-approved algorithms, but this is generally minimal.


## Importance of FIPS Compliance {#importance-of-FIPS-Compliance}

Organizations seek FIPS compliance for several reasons:
1. Security of Data in Transit: Ensures sensitive data moving between clients and backend services is encrypted using
approved algorithms.
2. Authentication and Authorization: Guarantees secure user authentication and authorization processes.
3. Regulatory Compliance: Meets requirements for working with U.S. government agencies and in regulated industries.
4. Key Management: Ensures secure generation, storage, and management of API keys and secrets.
5. SSL/TLS Implementation: Mandates the use of approved protocols and cipher suites for API connections.
6. Logging and Auditing: Extends to the protection of API activity logs.
7. Plugin and Extension Security: Ensures cryptographic operations in API management extensions also adhere to FIPS
standards.

FIPS compliance is particularly important in industries such as:
- Government and military
- Healthcare
- Finance
- Critical infrastructure

## Importance of FIPS Compliance in API Management  {#importance-of-FIPS-Compliance-in-API-Management}

FIPS compliance is particularly important in API management for several reasons:

1. **Security of Data in Transit:** API management often involves handling sensitive data as it moves between clients
and backend services. FIPS compliance ensures that this data is encrypted using approved, robust cryptographic
algorithms.
2. **Authentication and Authorization:** API gateways typically handle user authentication and authorization.
FIPS-compliant cryptographic modules ensure these processes are performed securely, using approved methods for key
generation, storage,
and cryptographic operations.
3. **Regulatory Compliance:** For organizations working with U.S. government agencies or in regulated industries, using
a FIPS-compliant API management solution can be a requirement to meet regulatory standards.
4. **Key Management:** API keys and other secrets used in API management need to be securely generated, stored, and
managed. FIPS provides standards for these cryptographic operations.
5. **SSL/TLS Implementation:** API gateways often terminate SSL/TLS connections. FIPS compliance ensures that these
connections use approved protocols and cipher suites.
6. **Logging and Auditing:** FIPS compliance can extend to how API activity logs are stored and protected, which is a
crucial part of API management.
7. **Plugin and Extension Security:** For API management platforms that support plugins or extensions, FIPS compliance
ensures that any cryptographic operations performed by these components also adhere to the required standards.
8. **Identity Federation:** When API management platforms integrate with identity providers, FIPS compliance ensures
that the cryptographic aspects of these integrations meet federal standards.


## Additional Resources

- [Official NIST FIPS 140-2 documentation](https://csrc.nist.gov/publications/detail/fips/140/2/final)

For more information on FIPS compliance in Tyk, please your account manager or click to {{< button_left href="https://tyk.io/contact/" color="green" content="Contact us" >}}.
