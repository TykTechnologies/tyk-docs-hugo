## Usage

Sync will synchronise an API Gateway with the contents of a Github repository. The sync is one way - from the repo to the Gateway, the command will not write back to the repo. Sync will delete any objects in the Dashboard or Gateway that it cannot find in the github repo, and update those that it can find and create those that are missing.

```
This command will synchronise an API Gateway with the contents of a Github repository, the
	sync is one way: from the repo to the gateway, the command will not write back to the repo.
	Sync will delete any objects in the dashboard or gateway that it cannot find in the github repo,
	update those that it can find and create those that are missing.

Usage:
  tyk-sync sync [flags]

Flags:
      --apis strings        Specific Apis ids to sync
  -b, --branch string       Branch to use (defaults to refs/heads/master) (default "refs/heads/master")
  -d, --dashboard string    Fully qualified dashboard target URL
  -g, --gateway string      Fully qualified gateway target URL
  -h, --help                help for sync
  -k, --key string          Key file location for auth (optional)
  -o, --org string          org ID override
  -p, --path string         Source directory for definition files (optional)
      --policies strings    Specific Policies ids to sync
  -s, --secret string       Your API secret
      --templates strings   List of template or Assets IDs to sync (optional
      --test                Use test publisher, output results to stdio
```

API secret refers to secret use to access your Gateway API or Dashboard API. For dashboard users, you can get it from "User" page under “Tyk Dashboard API Access key”.