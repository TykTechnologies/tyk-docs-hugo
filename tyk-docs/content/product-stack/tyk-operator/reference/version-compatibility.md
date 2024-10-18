---
title: "Version Compatibility"
date: 2024-06-25
tags: ["Tyk Operator", "Kubernetes", "version compatibility"]
description: "Version compatibility matrix with Tyk and Kubernetes version"
---

Ensuring compatibility between different versions is crucial for maintaining stable and efficient operations. This document provides a comprehensive compatibility matrix for Tyk Operator with various versions of Tyk and Kubernetes. By understanding these compatibility details, you can make informed decisions about which versions to deploy in your environment, ensuring that you leverage the latest features and maintain backward compatibility where necessary.

## Compatibility with Tyk
Tyk Operator can work with all version of Tyk beyond Tyk 3.x+. Since Tyk is backward compatible, you can safely use the
latest version of Tyk Operator to work with any version of Tyk.
However, if you're using a feature that was not yet available on an earlier version of Tyk, e.g. Defining a Subgraph with Tyk 3.x, you'll see error in Tyk Operator controller manager logs.

See [Release notes]({{<ref "product-stack/tyk-operator/release-notes/overview.md">}}) to check for each Tyk Operator release,
which version of Tyk it is tested against.

| Tyk Version          | 3.2 | 4.0 | 4.1 | 4.2 | 4.3 | 5.0 | 5.2 | 5.3 | 5.4 | 5.5 | 5.6 |
| -------------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Tyk Operator v0.13   | Y   |     |     |     | Y   |     |     |     |     |     |     |
| Tyk Operator v0.14   | Y   | Y   |     |     | Y   | Y   |     |     |     |     |     |
| Tyk Operator v0.14.1 | Y   | Y   |     |     | Y   | Y   |     |     |     |     |     |
| Tyk Operator v0.15.0 | Y   | Y   |     |     | Y   | Y   |     |     |     |     |     |
| Tyk Operator v0.15.1 | Y   | Y   |     |     | Y   | Y   |     |     |     |     |     |
| Tyk Operator v0.16.0 | Y   | Y   |     |     | Y   | Y   | Y   |     |     |     |     |
| Tyk Operator v0.17.0 | Y   | Y   |     |     | Y   | Y   | Y   | Y   |     |     |     |
| Tyk Operator v0.17.1 | Y   | Y   |     |     |     | Y   | Y   | Y   |     |     |     |
| Tyk Operator v0.18.0 | Y   | Y   |     |     |     | Y   | Y   | Y   |  Y  |     |     |
| Tyk Operator v1.0.0  | Y   | Y   |     |     |     | Y   |     | Y   |     | Y   | Y   |

## Compatibility with Kubernetes Version

See [Release notes](https://github.com/TykTechnologies/tyk-operator/releases) to check for each Tyk Operator release,
which version of Kubernetes it is tested against.

| Kubernetes Version   | 1.19 | 1.20 | 1.21 | 1.22 | 1.23 | 1.24 | 1.25 | 1.26 | 1.27 | 1.28 | 1.29 | 1.30 |
| -------------------- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| Tyk Operator v0.13   | Y    | Y    | Y    | Y    | Y    | Y    | Y    |      |      |      |      |      |
| Tyk Operator v0.14   | Y    | Y    | Y    | Y    | Y    | Y    | Y    |      |      |      |      |      |
| Tyk Operator v0.14.1 |      | Y    | Y    | Y    | Y    | Y    | Y    | Y    |      |      |      |      |
| Tyk Operator v0.15.0 |      | Y    | Y    | Y    | Y    | Y    | Y    | Y    |      |      |      |      |
| Tyk Operator v0.15.1 |      | Y    | Y    | Y    | Y    | Y    | Y    | Y    |      |      |      |      |
| Tyk Operator v0.16.0 |      | Y    | Y    | Y    | Y    | Y    | Y    | Y    |      |      |      |      |
| Tyk Operator v0.17.0 |      |      |      |      |      |      | Y    | Y    | Y    | Y    | Y    |      |
| Tyk Operator v0.17.1 |      |      |      |      |      |      | Y    | Y    | Y    | Y    | Y    |      |
| Tyk Operator v0.18.0 |      |      |      |      |      |      | Y    | Y    | Y    | Y    | Y    |      |
| Tyk Operator v1.0.0  |      |      |      |      |      |      | Y    | Y    | Y    | Y    | Y    | Y    |