## Usage

The examples command lists all examples from our official [Tyk examples](https://github.com/TykTechnologies/tyk-examples) repository. [See output in example usage]({{< relref "#example-import-tyk-example-into-dashboard" >}})
```{.copyWrapper}
Usage:
  tyk-sync examples [flags]
  tyk-sync examples [command]

Available Commands:
  publish     Publish a specific example to a gateway or dashboard by using its location
  show        Shows details of a specific example by using its location

Flags:
  -h, --help   help for examples
```

### Examples Show Command
Shows more details about a specific example by using its location. [See output in example usage]({{< relref "#example-import-tyk-example-into-dashboard" >}})
```{.copyWrapper}
Usage:
  tyk-sync examples show [flags]

Flags:
  -h, --help              help for show
  -l, --location string   Location to example
```

### Examples Publish Command
Publishs an example by using its location.
```{.copyWrapper}
Usage:
  tyk-sync examples publish [flags]

Flags:
  -b, --branch string      Branch to use (defaults to refs/heads/main) (default "refs/heads/main")
  -d, --dashboard string   Fully qualified dashboard target URL
  -g, --gateway string     Fully qualified gateway target URL
  -h, --help               help for publish
  -k, --key string         Key file location for auth (optional)
  -l, --location string    Location to example
  -s, --secret string      Your API secret
      --test               Use test publisher, output results to stdio
```

API secret refers to secret use to access your Gateway API or Dashboard API. For dashboard users, you can get it from "User" page under “Tyk Dashboard API Access key”.