---
date: 2017-03-13T15:08:55Z
Title: Blocking IPs
menu:
  main:
    parent: "API Definition Objects"
weight: 5
---

### IP Blocklist (Middleware)

* `enable_ip_blacklisting`: Enables IPs {{<fn>}}blocklist{{</fn>}}. If set to `true`, requests coming from the explicit list of IP addresses (`blacklisted_ips`) are not allowed through.

* `blacklisted_ips`: A list of strings that defines the IP addresses (in CIDR notation) that are blocked access via Tyk. This list is explicit and wildcards are currently not supported. e.g.:

```{.json}
...
"enable_ip_blacklisting": true,
"blacklisted_ips": ["12.12.12.12", "12.12.12.13", "12.12.12.14"]
...
```

For more details on CIDR notation, see [this Wikipedia entry](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing#CIDR_notation).

<p style="display: none;">{{<fn blocklist>}}{{</fn>}}</p>

#### Tyk Operator

Please consult the Tyk Operator supporting documentation for an example of how to [configure an IP block list]({{< ref "/api-management/automations#ip-blocklist" >}}) with Tyk Operator.