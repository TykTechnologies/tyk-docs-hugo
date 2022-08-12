---
date: 2019-07-11
title: “Error initialising system couldn't unmarshal config“ error
menu:
  main:
    parent: "Tyk Installation"
weight: 5 
---

### Description

Users receive the error "Error initialising system: couldn't unmarshal config: invalid character" in their logs when starting up the Gateway. 

### Cause

Users may not have proper syntax in the Tyk configuration files. 

### Solution

Recheck all syntax in all of the Tyk's configuration files. Ensure all syntax is correct and restart the Gateway. If problem persists, copy the content from  Tyk configuration files and paste them on [JSONlint][1] to validate the JSON.

 [1]: https://jsonlint.com/