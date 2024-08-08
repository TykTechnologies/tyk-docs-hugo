---
title: "Tyk API Management FIPS support"
date: 2024-07-25
tags: ["FAQ", "FIPS Releases", "Special Release - FIPS"]
description: "Explain what FIPS Release means, what it includes, and what to expect"
---

The Federal Information Processing Standards (FIPS) are a series of cryptography and hashing standards defined by the U.S.
Federal Government's National Institute of Standards and Technology (NIST). These standards are crucial for organizations dealing with sensitive
government data and are widely recognized as a benchmark for security in various regulated industries.

FIPS compliance is particularly important for industries such as:
- Government and military
- Healthcare
- Finance
- Critical infrastructure

## Importance of FIPS Compliance in API Management

FIPS compliance is particularly important in API management for several reasons:

1. **Security of Data in Transit:** API management often involves handling sensitive data as it moves between clients
and backend services. FIPS compliance ensures that this data is encrypted using approved, robust cryptographic
algorithms.
2. **Authentication and Authorization:** API gateways typically handle user authentication and authorization.
FIPS-compliant cryptographic modules ensure these processes are performed securely, using approved methods for key
generation, storage, and cryptographic operations.
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

## Tyk's FIPS Compliance

We are pleased to announce that Tyk Gateway and Pump offer a FIPS compliant package (together, the *"FIPS Tyk
Product”*).

The *FIPS Tyk Product* has not been submitted to a [NIST](https://www.nist.gov/federal-information-processing-standards-fips) testing lab for validation.

*FIPS compliance* means that the *FIPS Tyk Product* only uses FIPS 140-2 approved cryptographic [algorithms]({{< ref "#fips-compliant-cryptographic-operations" >}})
while running in FIPS mode. This compliance applies only to specific Tyk-built packages or Docker images of the *FIPS Tyk Product*.
These packages and images are not publicly accessible. Please speak to your assigned account manager for more information.

{{< note success >}}
**Note**  

Use of the <i>FIPS Tyk Product</i> is conditional on the user accepting any specific terms and conditions
applicable to this feature and a paid license. Please contact your account manager if you would like further information.
{{< /note >}}

### FIPS Compliant Cryptographic Operations

The *FIPS Tyk Product* uses the [BoringCrypto](https://boringssl.googlesource.com/boringssl/+/master/crypto/fipsmodule/FIPS.md#fips-140_2) module to provide FIPS 140-2 validated cryptographic operations. This ensures that when running in FIPS mode, only FIPS 140-2 approved algorithms are used.

For more details on the cryptographic operations supported in Tyk's FIPS-compliant mode, please contact your Tyk account manager.

## Configuring Tyk for FIPS Compliance

The *FIPS Tyk Product* packages are identifiable by the `-fips` suffix. E.g. `tyk-gateway-fips` or `tyk-pump-fips`.

The only change to configuration, when using the *FIPS Tyk Product*, is to set your key hashing algorithm to SHA256 either by setting `hash_key_function` in your Gateway configuration file (`tyk.conf`) or the `TYK_GW_HASHKEYFUNCTION` environment variable to the value: `sha256`.

## Frequently Asked Questions

Q: What level of FIPS 140-2 compliance does Tyk support?

A: Tyk provides FIPS 140-2 compliance, ensuring the use of approved algorithms in FIPS mode.

Q: Can I use Tyk in FIPS mode in the Tyk Cloud environment?

A: Yes but only for hybrid gateways deployed on your premises and connecting to the Tyk Cloud control plane.

Q: Does FIPS mode affect Tyk's performance?

A: There should be no material impact on performance from the use of FIPS mode.

## Additional Resources

- [Official NIST FIPS 140-2 documentation](https://csrc.nist.gov/publications/detail/fips/140/2/final)

For more information on FIPS compliance in Tyk, please contact your account manager or {{< button_left href="https://tyk.io/contact/" color="green" content="Contact us" >}}.
