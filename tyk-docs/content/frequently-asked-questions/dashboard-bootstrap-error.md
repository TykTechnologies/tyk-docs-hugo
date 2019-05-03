---
date: 2017-03-27T16:11:33+01:00
title: Dashboard bootstrap error
menu:
  main:
    parent: "Frequently Asked Questions"
weight: 0 
---

Make sure you:

Target the correct domain with your `bootstrap.sh` as it is very specific once you set up a Dashboard service with hostname set

```{.copyWrapper}
./bootstrap.sh my-tyk-instance.com

```

Have checked the firewall rules in your instance and VPC to allow
port 3000 access.