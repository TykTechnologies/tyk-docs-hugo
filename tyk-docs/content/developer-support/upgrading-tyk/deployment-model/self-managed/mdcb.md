---
title: Upgrade Multi Data Centre Bridge (MDCB)
description: Explains how to upgrade MDCB
tags: [ "MDCB", "Multi Data Centre Bridge", "Upgrade MDCB" ]
---

Our recommended sequence for upgrading an MDCB installation is as follows:

First, install the components of the Tyk Control Plane in the following order:

1. MDCB
2. Tyk Pump (if in use)
3. Tyk Dashboard
4. Tyk Gateway

Then the components in Tyk Data Planes, in the following order:

1. Tyk Pump (if in use)
2. Tyk Gateway

We do this to be backwards compatible and upgrade the MDCB component first, followed by the other component in the control plane and then the data plane to ensure that:

1. It's extremely fast to see if there are connectivity issues, but the way Gateways in Hybrid mode work means they keep working even if disconnected
2. It ensures that we don't have forward compatibility issues (new Gateway -> old MDCB)
Tyk is compatible with a blue-green or rolling update strategy.
