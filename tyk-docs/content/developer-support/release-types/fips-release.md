---
title: "Tyk FIPS Policy"
date: 2024-07-25
tags: ["FAQ", "FIPS Releases", "Special Release - FIPS"]
description: "Explain what FIPS Release means, what it includes, and what to expect"
aliases:
  - /developer-support/special-releases-and-features/fips-release
---

## What is FIPS

The [Federal Information Processing Standards](https://csrc.nist.gov/glossary/term/federal_information_processing_standard) (FIPS) are U.S. government standards for cryptographic modules, defined by the [National Institute of Standards and Technology](https://www.nist.gov) (NIST).

The most relevant standard for API management is **[FIPS 140-2](https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.140-2.pdf)**, which specifies how cryptographic modules must be designed and validated.

FIPS compliance is often required for organizations in:

* Government and defense
* Healthcare and life sciences
* Financial services
* Critical infrastructure

For API management, FIPS matters because it ensures:

* **Secure data in transit**: only strong, approved algorithms are used.

* **Robust authentication & key management**: cryptographic operations like token signing and API key hashing are performed using validated methods.

* **Regulatory alignment**: supports compliance where FIPS 140-2 is mandated.

## Tyk’s FIPS Offering

Tyk provides a **FIPS-compliant package** of the Tyk Gateway (Enterprise Edition) and Tyk Pump (together, the *FIPS Tyk Product*). Please note that the FIPS Tyk Product has not been submitted to a [NIST](https://www.nist.gov/federal-information-processing-standards-fips) testing lab for validation and Tyk is not FIPS certified.. 

**FIPS-compliant means** that the FIPS Tyk Product only uses FIPS 140-2 approved cryptographic algorithms (see below) while running in FIPS mode. This is only available to specific Tyk-built packages or Docker images of the FIPS Tyk Product. These packages and images are not publicly accessible.

* The FIPS Tyk Product uses the **[BoringCrypto module](https://boringssl.googlesource.com/boringssl/+/master/crypto/fipsmodule/FIPS.md#fips-140_2)**, enabling only FIPS 140-2 approved algorithms when run in FIPS mode.

* These packages are distributed separately, identifiable by the `-fips` suffix (e.g. `tyk-gateway-fips`, `tyk-pump-fips`).

* The FIPS Tyk Product is available for selected enterprise-supported Linux distributions. Please [contact](https://tyk.io/contact/) your account manager for details.

* The FIPS Tyk Product **has not been submitted to a NIST testing lab**. It is therefore *FIPS-compliant* per the above definition,and is not *FIPS-certified*.

* Compliance applies only to the binaries we ship as part of the FIPS Tyk Product only, not to the entire system or deployment environment or otherwise. Customers remain responsible for ensuring compliance of their overall deployment.

## Configuring Tyk for FIPS Mode

When running the FIPS Tyk Product in the Tyk Gateway, you must set the key hashing algorithm to SHA-256:

In `tyk.conf`:

 `"hash_key_function": "sha256"`  
Or via environment variable:

 `TYK_GW_HASHKEYFUNCTION=sha256` 

When using FIPS mode for Tyk Pump, you do not need to set this algorithm. 

## Important Note

Use of the FIPS Tyk Product is conditional upon:

* A paid enterprise license agreement.
* Acceptance of any additional terms specific to FIPS releases.

Please speak with your [Tyk account manager](https://tyk.io/contact/) for more information.

## FAQ

<details> <summary><b>What level of FIPS 140-2 compliance does Tyk support?</b></summary>

Tyk provides compliance by ensuring that in FIPS mode, only FIPS 140-2 approved algorithms are used. The Tyk FIPS Product is not FIPS-certified.

</details> 

<details> <summary><b>Can I use Tyk in FIPS mode in the Tyk Cloud environment?</b></summary>

Yes, on the data plane  with hybrid gateways using the Tyk FIPS product deployed on your premises that connect to the Tyk Cloud control plane.

</details> 

<details> <summary><b>Does FIPS mode affect performance?</b></summary>

There is no expected impact on performance.

</details> 

<details> <summary><b>Are all Tyk components FIPS-compliant?</b></summary>

Compliance applies only to the specific FIPS Tyk Product binaries. Other components, plugins, and integrations must be reviewed separately by customers for compliance.The Tyk FIPS Product is provided in certain linux distributions . Docker images are also available containing these binaries, however Tyk does not claim FIPS compliance at the image level, only the binaries.

</details> 