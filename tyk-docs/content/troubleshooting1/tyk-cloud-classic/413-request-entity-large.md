---
date: 2017-03-27T17:01:22+01:00
title: 413 Request Entity Too Large
menu:
  main:
    parent: "Tyk Cloud Classic"
weight: 5 
---

### Description

A user may receive the aforementioned error message when trying to import data (such as Swagger/OpenAPI documents) into Tyk.

### Cause

Request entity size for Cloud users is limited to 1MB.

### Solution

If more space is required, the user will have to self-host Tyk.