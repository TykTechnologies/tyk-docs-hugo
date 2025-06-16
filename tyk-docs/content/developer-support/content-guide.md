---
title: "Contributing to Tyk Docs"
description: "Guide to releasing Tyk documentation"
tags: ["Authentication", "Authorization", "Tyk Authentication", "Tyk Authorization", "Secure APIs", "client"]
---

## Introduction

### Versioning in Tyk Docs

### Understanding docs.json

Tyk uses Mintlify to host documentation. In Mintlify, docs.json is a configuration file containing the documentation's structure. It defines the hierarchy and content of the documentation pages. For maintenance purposes, Tyk has split this file into several smaller files for easier management. The main file is `docs.json`, which is generated from the other files. Tyk uses the following files to manage documentation:

Locally, a script runs continuously to update the docs.json file with the latest changes from the other files.

| File Name      | Description                                                                 |
|----------------|-----------------------------------------------------------------------------|
| docs.json      | Main file that contains the structure of the documentation                  |
| menu.json      | User can use this to modify the structure of the documentation              |
| version.json   | All versions from nightly to previous supported version                    |
| redirect.json  | Redirects for documentation pages                                          |
| basic.json     | Other basic information about the documentation                            |

## Latest Version

### Create New Documentation

### Update Existing Documentation

### Delete Documentation

## Previous Version


