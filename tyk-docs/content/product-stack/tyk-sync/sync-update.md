## Usage

Update will attempt to identify matching APIs or Policies in the target, and update those APIs. It does not create new ones. Use `tyk-sync publish` or `tyk-git sync` for new content.

```
Update will attempt to identify matching APIs or Policies in the target, and update those APIs
	It will not create new ones, to do this use publish or sync.

Usage:
  tyk-sync update [flags]

Flags:
      --apis strings        Specific Apis ids to update
  -b, --branch string       Branch to use (defaults to refs/heads/master) (default "refs/heads/master")
  -d, --dashboard string    Fully qualified dashboard target URL
  -g, --gateway string      Fully qualified gateway target URL
  -h, --help                help for update
  -k, --key string          Key file location for auth (optional)
  -p, --path string         Source directory for definition files (optional)
      --policies strings    Specific Policies ids to update
  -s, --secret string       Your API secret
      --templates strings   Specific template or Assets IDs to update (optional
      --test                Use test publisher, output results to stdio
```

API secret refers to secret use to access your Gateway API or Dashboard API. For dashboard users, you can get it from "User" page under “Tyk Dashboard API Access key”.