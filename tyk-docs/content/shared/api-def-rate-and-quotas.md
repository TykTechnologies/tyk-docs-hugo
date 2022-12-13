---
---

* `global_rate_limit`: This specifies a global API rate limit in the following format: `{"rate": 10, "per": 1}`, similar to policies or keys.


The API rate limit is an aggregate value across all users, which works in parallel with user rate limits, but has higher priority.

* `disable_rate_limit`: Is set to `true`, rate limits are disabled for the specified API.

See [Rate Limiting]({{ ref "basic-config-and-security/control-limit-traffic/rate-limiting" >}}) for more details including setting via the Dashboard.