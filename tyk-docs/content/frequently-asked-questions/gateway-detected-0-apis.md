---
date: 2017-03-27T16:33:37+01:00
title: Gateway detected 0 APIs
menu:
  main:
    parent: "Frequently Asked Questions"
weight: 0 
---

Tyk Gateway is not able to get API configs from the Tyk Portal.
If you configured your Gateway to be segmented, you would also need to assign tags and you must also tag the APIs in the API Designer to make sure that they load.

* In the Pro edition that is a connectivity or misconfiguration issue
* In the Community edition, since you are not using the Dashboard we
assume that you use file-based APIs , so in this case it's because
API definition files are missing.
