### IP Whitelisting (Middleware)

* `enable_ip_whitelisting`: If set to `true`, only requests coming from the explicit list of IP addresses (`allowed_ips`) are allowed through.

* `allowed_ips`: A list of strings that defines the IP addresses (in CIDR notation) that are allowed access via Tyk. This list is explicit and wildcards are currently not supported. e.g.:

```{.json}
...
"enable_ip_whitelisting": true,
"allowed_ips": ["12.12.12.12", "12.12.12.13", "12.12.12.14"]
...
```

For more details on CIDR notation, see [this Wikipedia entry](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing#CIDR_notation).