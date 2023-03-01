---
date: 2017-03-27T19:26:54+01:00
title: Receive a CSRF error in the Developer Portal
menu:
  main:
    parent: "Tyk Dashboard Troubleshooting"
weight: 5 
---

### Description

When the user attempts to log into the Developer Portal a CSRF error (or some variant of this error such as `Forbidden - CSRF token invalid`) is displayed on the page.

### Cause

Most probably the portal has yet to be activated. Common reasons for this are:

1.  The `CNAME` was not set in the dashboard. Without a `CNAME`, the system won't react to a new domain name.
2.  There were no active APIs set up under the account which means that the account was not active for a portal either and essentially incapable of proxying traffic.

The use of an incorrect signup form can also cause this issue.

### Solution

Users must make sure that they add a `CNAME` and an active API to the Dashboard. If the form will require TLS, the user will need to set this up for their custom load balancer. To add this to a cloud instance, a copy of the TLS certificate and the private key file will need to be sent to Tyk Support.