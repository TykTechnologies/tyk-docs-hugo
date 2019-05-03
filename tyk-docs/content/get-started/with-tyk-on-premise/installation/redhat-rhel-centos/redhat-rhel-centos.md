---
date: 2017-03-22T16:19:08Z
Title: On Red Hat (RHEL) / CentOS
menu:
  main:
    parent: "Installation"
weight: 3
url: "/get-started/with-tyk-on-premise/installation/redhat-rhel-centos"
---

## Install Tyk API Gateway on Red Hat (RHEL) / CentOS

Installing Tyk on RHEL is very straightforward using our YUM repositories, follow the guides and tutorials in this section to have Tyk up and running in no time.

The suggested order would be to install Tyk Dashboard, then Tyk Pump and then Tyk Gateway for a full stack.

* [Dashboard][2]
* [Pump][1]
* [Gateway][3]

> **NOTE**: For a production environment, we recommend that the Gateway, Dashboard and Pump are installed on separate machines. If installing multiple Gateways, you should install each on a separate machine. For more information on deploying to a production environment, see [here](https://tyk.io/docs/deploy-tyk-premise-production/).

[1]: /docs/get-started/with-tyk-on-premise/installation/redhat-rhel-centos/analytics-pump
[2]: /docs/get-started/with-tyk-on-premise/installation/redhat-rhel-centos/dashboard
[3]: /docs/get-started/with-tyk-on-premise/installation/redhat-rhel-centos/gateway