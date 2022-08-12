---
date: 2017-03-27T19:30:10+01:00
title: “There was a problem updating your CNAME“ error in the Dashboard
notoc: true
weight: 5 
---

### Description

A user may find that they are unable to update a CNAME from within the Dashboard. The following error will appear in a pop-up:

```
There was a problem updating your CNAME, please contact support
```

### Cause

The UI for setting the domain name has a very strict validation, so it may just be rejecting this domain.

### Solution

The best way to set the domain is to use the Tyk Dashboard Admin API, to obtain the organisation object via a GET request and then update the object using a PUT request with the relevant CNAME added to the body of the request.<sup>[<a href="/docs/dashboard-admin-api/organisations/">1</a>]</sup> Restarting the process will then set the domain.
