---
date: 2017-03-15T15:01:42Z
title: With Tyk On-Premises
menu: 
  main:
    parent: "Get started"
weight: 5
url: "/get-started/with-tyk-on-premise"
---

## <a name="what-is-tyk-on-premises"></a>What is Tyk On-Premises?

Tyk On-Premises is the way to install an entire Tyk solution in your own infrastructure, it enables you to have full control over every element of the Tyk stack as well as no external dependency on our cloud solution or infrastructure.

The full Tyk On-Premises system consists of:

*   Tyk API Gateway: The API Gateway that proxies and manages your traffic.
*   Tyk Dashboard: The management Dashboard and integration API for managing a cluster of Tyk Gateways, also shows analytics and features the Developer portal.
*   Tyk Pump: Handles moving analytics data between your gateways and your Dashboard (amongst other data sinks).
*   Tyk Identity Broker (Optional): Handles integrations with third-party IDP's.
*   Tyk Multi-Data-Center Bridge (Optional, Enterprise-only): Allows for the configuration of a Tyk ecosystem that spans many data centers and clouds.

> **NOTE**: For a production environment, we recommend that the Gateway, Dashboard and Pump are installed on separate machines. If installing multiple Gateways, you should install each on a separate machine. For more information on deploying to a production environment, see [here](https://tyk.io/docs/deploy-tyk-premise-production/).

### Getting Started

To get started with Tyk On-Premises, visit our [licensing page][1].

## <a name="dependencies"></a>Dependencies

A full Tyk On-Premises installation has the following requirements:

*   Redis: The primary key store for the Tyk Gateway, also synchronises data across gateways in a horizontally scaling installation.
*   MongoDB: The primary configuration store and analytics data store, required by the dashboard and portal, not required by the gateway.

## <a name="init-systems"></a>Init Systems

Tyk packages support [systemd][2], [Upstart][3] (both 0.6.x and 1.x) and SysVinit Linux init systems. During package installation only one is chosen depending on the operating system support, e.g.:

*   CentOS 6, RHEL 6, Amazon Linux ship with Upstart 0.6.x
*   Ubuntu 14.04, Debian Jessie with Upstart 1.x
*   CentOS 7, RHEL 7, Ubuntu 16.04, Debian Stretch are running with systemd
*   Certain older distros may only provide SysVinit but all of them typically provide compatibility with its scripts

Note that any init scripts of your choosing can be used instead of automatically detected ones by copying them from the `install/inits` directory inside the package directory.

This init system variance implies there are different ways to manage the services and collect service logs.

#### Upstart
For Upstart, service management can be performed through the `initctl` or a set of `start`, `stop`, `restart` and `status` commands. Upstart 1.x also works with the `service` command.

#### systemd 
For systemd, either `systemctl` or `service` commands may be utilised.

The `service` command can usually be used with SysVinit scripts, as well as invoking them directly.

## Service logs availability ##

*   Upstart 0.6.x and SysVinit: log files are located in `/var/logs` for every respective service, e.g. `/var/logs/tyk-gateway.stderr` and `/var/logs/tyk-gateway.stdout`
*   Upstart 1.x: by default everything is stored in `/var/logs/upstart` directory, e.g. `/var/logs/upstart/tyk-gateway.log`
*   systemd utilises its own logging mechanism called journald, which is usable via the `journalctl` command, e.g. `journalctl -u tyk-gateway`


Please consult with respective init system documentation for more details on how to use and configure it.

 [1]: /api-manager-licenses/
 [2]: https://www.freedesktop.org/wiki/Software/systemd/
 [3]: http://upstart.ubuntu.com/cookbook/
