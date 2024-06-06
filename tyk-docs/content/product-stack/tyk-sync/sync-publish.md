
## Usage

Publish API definitions from a Git repo to a Tyk Gateway or Dashboard. This will not update any existing APIs, and if it detects a collision, the command will stop.

```
Publish API definitions from a Git repo to a gateway or dashboard, this
	will not update existing APIs, and if it detects a collision, will stop.

Usage:
  tyk-sync publish [flags]

Flags:
      --apis strings        Specific Apis ids to publish
  -b, --branch string       Branch to use (defaults to refs/heads/master) (default "refs/heads/master")
  -d, --dashboard string    Fully qualified dashboard target URL
  -g, --gateway string      Fully qualified gateway target URL
  -h, --help                help for publish
  -k, --key string          Key file location for auth (optional)
  -p, --path string         Source directory for definition files (optional)
      --policies strings    Specific Policies ids to publish
  -s, --secret string       Your API secret
      --templates strings   List of template or Assets IDs to publish (optional
      --test                Use test publisher, output results to stdio
```

API secret refers to secret use to access your Gateway API or Dashboard API. For dashboard users, you can get it from "User" page under “Tyk Dashboard API Access key”.