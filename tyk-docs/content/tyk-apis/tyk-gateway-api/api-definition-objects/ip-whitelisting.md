---
date: 2017-03-13T15:08:55Z
Title: Allowing IPs
menu:
  main:
    parent: "API Definition Objects"
weight: 5
---

## IP Allowlist (Middleware)

* `enable_ip_whitelisting`: Enables IPs {{<fn>}}allowlist{{</fn>}}. When set to `true`, only requests coming from the explicit list of IP addresses defined in (`allowed_ips`) are allowed through.

* `allowed_ips`: A list of strings that defines the IP addresses (in CIDR notation) that are allowed access via Tyk. This list is explicit and wildcards are currently not supported. e.g.:

```json
{
...
"enable_ip_whitelisting": true,
"allowed_ips": ["12.12.12.12", "12.12.12.13", "12.12.12.14"]
...
}
```

For more details on CIDR notation, see [this Wikipedia entry](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing#CIDR_notation).

#### Tyk Operator

Please consult the Tyk Operator supporting documentation for an example of how to [configure an IP allow list]({{< ref "/api-management/automations#ip-allowlist" >}}) with Tyk Operator.