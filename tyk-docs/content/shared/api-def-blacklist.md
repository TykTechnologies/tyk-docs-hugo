---
---

### Blocking IPs (Middleware)

* `enable_ip_blacklisting`: If set to `true`, requests coming from the explicit list of IP addresses (`blacklisted_ips`) are not allowed through.

* `blacklisted_ips`: A list of strings that defines the IP addresses (in CIDR notation) that are blocked access via Tyk. This list is explicit and wildcards are currently not supported. e.g.:

```{.json}
...
"enable_ip_blacklisting": true,
"blacklisted_ips": ["12.12.12.12", "12.12.12.13", "12.12.12.14"]
...
```

For more details on CIDR notation, see [this Wikipedia entry](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing#CIDR_notation).