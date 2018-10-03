---
date: 2017-03-13T15:35:00Z
title: With Tyk Hybrid
menu: 
  main:
    parent: "Get started"
weight: 5
url: "/get-started/with-tyk-hybrid"
---
## <a name="what-is-tyk-hybrid"></a>What is Tyk Hybrid ?

Hybrid deployment is a feature unique to Tyk and Tyk Cloud, it enables you to run a Tyk API Gateway locally, within your own infrastructure, behind your own load balancers and alongside your existing application stack without having to expose your systems to the wider Internet.

It also means that your traffic will flow directly to your applications instead of via Tyk Cloud's infrastructure, improving overall request latency and restoring control to your team.

Tyk Hybrid Gateways are the same technology that powers the Tyk On-Premises versions without the overhead. The Tyk Hybrid Gateway caches token data and API configuration data locally to minimise calls to our cloud and to ensure that as much processing and activity happens near the source of your traffic and responses as possible.

In order to do this, Tyk Hybrid Gateways use a compressed RPC channel back to our cloud to handle data transfer, and it is designed to be as robust as possible against failure of our cloud environment (that means, even if our cloud infrastructure goes down, you local gateways will continue to operate, even if you need to restart your whole cluster).

### Getting Started

To get started with Tyk Hybrid, follow our [tutorial][1] to create an account.

## <a name="what-are-the-benefits-of-hybrid"></a>What are the benefits of Hybrid ?

A Tyk Hybrid deployment is the best trade-off between running a Tyk node (or even a Tyk cluster) with a much lower infrastructure requirement and total cost of ownership:

*   No MongoDB instances to host or scale
*   No dashboard instances to manage
*   A Public, SSL-enabled portal and documentation out of the box
*   Full developer life-cycle management without the overhead of running your own systems
*   Your own domain
*   Your own SSL certificates
*   Runs inside your network
*   Full virtual endpoint support
*   Full dynamic middleware support
*   Full API Sharding (multi-environments such as QA, UAT, Prod) support and multi-data center zoning

## <a name="how-does-a-hybrid-gateway-work"></a>How does a Hybrid Gateway work ?

Tyk Hybrid is installed as a network appliance, it should be run like any other reverse proxy within your application stack. To make this simple, we have developed a custom docker image that can be deployed and configured with a simple script, however you can modify this image, or in fact just re-use the configuration to fit your installation. Please contact your account manager to discuss options around container and gateway customisation for hybrid accounts.

When Tyk Hybrid starts, it will launch, connect to our systems via a high-speed, compressed RPC TCP tunnel (you will need to ensure port `9091` is open for inbound and outbound connections to the server) and register itself with your Dashboard.

When requests come into your node, Tyk Cloud will act as your centralised Key and Policy repository, while all proxying, rate-limiting, quota management and enforcement happen locally, ensuring that traffic flowing through your nodes is as low-latency as if you had your own Tyk stack.

Tyk Hybrid's RPC system has been built in such a way as to minimise latency, it's performance profile is the same as a full local deployment, just without any of the overhead of managing a failover MongoDB cluster or a Tyk Dashboard installation.

 [1]: /docs/get-started/with-tyk-hybrid/create-an-account/
