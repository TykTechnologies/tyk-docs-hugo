---
date: 2017-03-23T13:19:38Z
title: Tyk Sync
menu: 
  main:
    parent: Tyk Stack
weight: 4
url: tyk-sync
aliases:
  - /advanced-configuration/manage-multiple-environments/tyk-sync/
---

Tyk-Sync is a command line tool and library to manage and synchronise a Tyk installation with your version control system (VCS).

{{< note success >}}
**Note**  

Tyk-Sync works with APIs and Policies. It does not work with Keys. See [Move Keys between environments](/docs/advanced-configuration/manage-multiple-environments/move-keys-between-environments/) for details.
{{< /note >}}


## Features

- Update APIs and Policies on remote Tyk Dashboards
- Update APIs on remote Tyk Community Edition Gateways
- Publish APIS/Policies to remote Tyk Dashboards
- Publish APIs to remote Tyk Community Edition Gateways
- Synchronise a Tyk Dashboard's APIs and Policies with your VCS (one-way, definitions are written to the Dashboard)
- Synchronise a Tyk Community Edition Gateway APIs with those stored in a VCS (one-way, definitions are written to the Gateway)
- Dump Policies and APIs in a transportable format from a Dashboard to a directory
- Support for importing, converting and publishing Swagger/OpenAPI JSON files (OpenAPI 2.0 and 3.0 are supported) to Tyk.
- Specialized support for Git. But since API and policy definitions can be read directly from
  the file system, it will integrate with any VCS.

### Sync

Tyk-Sync tries to be clever about what APIs and Policies to update and which to create, it will actually base all
ID matching on the API ID and the masked Policy ID, so it can identify the same object across installations. Tyk has
a tendency to generate fresh IDs for all new Objects, so Tyk-Sync gets around this by using portable IDs and ensuring
the necessary portable IDs are set when using the `dump` command.

This means that Tyk-Sync can be used to back-up your most important API Gateway configurations as code, and to deploy
those configurations to any target and ensure that API IDs and Policy IDs will remain consistent, ensuring that any
dependent tokens continue to have access to your services.

### Prerequisites:

- Tyk-Sync was built using Go 1.10. The minimum Go version required to install is 1.7.
- In order for policy ID matching to work correctly, your Dashboard must have `allow_explicit_policy_id: true` and `enable_duplicate_slugs: true` and your Gateway must have `policies.allow_explicit_policy_id: true`.
- It is assumed you have a Tyk CE or Tyk Pro installation.

## Installation

Currently the application is available via Go, [Docker](https://hub.docker.com/r/tykio/tyk-sync) and [Packagecloud](https://packagecloud.io/tyk/tyk-sync).  To install via Go you must have Go installed and run:

```
go get -u github.com/TykTechnologies/tyk-sync
```

This should make the `tyk-sync` command available to your console.

See our [Tyk-Sync Repo](https://github.com/TykTechnologies/tyk-sync) for more info.

### Docker:

To install a particular version of `tyk-sync` via docker image please run the command bellow with the appropriate version you want to use. All available versions could be found on the Tyk Sync Docker Hub page here: https://hub.docker.com/r/tykio/tyk-sync/tags
```{.copyWrapper}
docker pull tykio/tyk-sync:{version_id}
```
To run `tyk-sync` as a one-off command and display usage options please do:
```{.copyWrapper}
docker run -it --rm tykio/tyk-sync:{version_id} help
```
Then the docker image `tyk-sync` can be used in the following way:
```{.copyWrapper}
docker run -it --rm tykio/tyk-sync:{version_id} [flags]
docker run -it --rm tykio/tyk-sync:{version_id} [command]
```
As per the examples below `tyk-sync` will need access to the host file sytem to read and write files.  You can use docker bind mounts to map files in the container to files on your host machine.

## Usage

```
Usage:
  tyk-sync [flags]
  tyk-sync [command]

Available Commands:
  dump        Dump will extract policies and APIs from a target (Tyk Dashboard)
  help        Help about any command
  publish     publish API definitions from a Git repo or file system to a Tyk Gateway or Dashboard
  sync        Synchronise a github repo or file system with a Tyk Gateway
  update      Update a Tyk Dashboard or Gateway with APIs and policies

Flags:
  -h, --help   help for tyk-sync

Use "tyk-sync [command] --help" for more information about a command.
```

### Dump Command

Dump will extract policies and APIs from a target (your Dashboard) and place them in a directory of your choosing. It will also generate a spec file that can be used for syncing.

```

Usage:
  tyk-sync dump [flags]
Flags:
  -b, --branch string      Branch to use (defaults to refs/heads/master) (default "refs/heads/master")
  -d, --dashboard string   Fully qualified Tyk Dashboard target URL
  -h, --help               help for dump
  -k, --key string         Key file location for auth (optional)
  -s, --secret string      Your API secret
  -t, --target string      Target directory for files
      --policies           Specific policies ID selection (optional)
      --apis               Specific api_id's selection (optional)
```

### Publish Command

Publish API definitions from a Git repo to a Tyk Gateway or Dashboard. This will not update any existing APIs, and if it detects a collision, the command will stop.

```
Usage:
  tyk-sync publish [flags]
Flags:
  -b, --branch string      Branch to use (defaults to refs/heads/master) (default "refs/heads/master")
  -d, --dashboard string   Fully qualified Tyk Dashboard target URL
  -g, --gateway string     Fully qualified Tyk Gateway target URL
  -h, --help               help for publish
  -k, --key string         Key file location for auth (optional)
  -p, --path string        Source directory for definition files (optional)
  -s, --secret string      Your API secret
      --test               Use test publisher, output results to stdio
      --policies           Specific policies ID selection (optional)
      --apis               Specific api_id's selection (optional)
```

### Sync Command

Sync will synchronise an API Gateway with the contents of a Github repository. The sync is one way - from the repo to the Gateway, the command will not write back to the repo. Sync will delete any objects in the Dashboard or Gateway that it cannot find in the github repo, and update those that it can find and create those that are missing.

```
Usage:
tyk-sync sync [flags]
Flags:
-b, --branch string      Branch to use (defaults to refs/heads/master) (default "refs/heads/master")
-d, --dashboard string   Fully qualified Tyk Dashboard target URL
-g, --gateway string     Fully qualified Tyk Gateway target URL
-h, --help               help for sync
-k, --key string         Key file location for auth (optional)
-o, --org string         org ID override
-p, --path string        Source directory for definition files (optional)
-s, --secret string      Your API secret
    --test               Use test publisher, output results to stdio
    --policies           Specific policies ID selection (optional)
    --apis               Specific api_id's selection (optional)
```

### Update Command

Update will attempt to identify matching APIs or Policies in the target, and update those APIs. It does not create new ones. Use `tyk-sync publish` or `tyk-git sync` for new content.

```
Usage:
tyk-sync update [flags]
Flags:
-b, --branch string      Branch to use (defaults to refs/heads/master) (default "refs/heads/master")
-d, --dashboard string   Fully qualified Tyk Dashboard target URL
-g, --gateway string     Fully qualified Tyk Gateway target URL
-h, --help               help for update
-k, --key string         Key file location for auth (optional)
-p, --path string        Source directory for definition files (optional)
-s, --secret string      Your API secret
    --test               Use test publisher, output results to stdio
    --policies           Specific policies ID selection (optional)
    --apis               Specific api_id's selection (optional)
```

## Example: Transfer from one Tyk Dashboard to another

First, you need to extract the data from our Tyk Dashboard. Here you `dump` into ./tmp. Let's assume this is a git-enabled
directory

```{.copyWrapper}
tyk-sync dump -d="http://localhost:3000" -s="b2d420ca5302442b6f20100f76de7d83" -t="./tmp"
Extracting APIs and Policies from http://localhost:3000
> Fetching policies
--> Identified 1 policies
--> Fetching and cleaning policy objects
> Fetching APIs
--> Fetched 3 APIs
> Creating spec file in: tmp/.tyk.json
Done.
```

If running `tyk-sync` in docker the command above would read

```{.copyWrapper}
docker run --rm --mount type=bind,source="$(pwd)",target=/opt/tyk-sync/tmp \
 tykio/tyk-sync:v1.1.0-27-gbf4dd2f-3-g04f7740-1-gff89e43 \
 dump \
 -d="http://host.docker.internal:3000" \
 -s="$b2d420ca5302442b6f20100f76de7d83" \
 -t="./tmp"
```

Next, let's push those changes back to the Git repo on the branch `my-test-branch`:

```{.copyWrapper}
cd tmp
git add .
git commit -m "My dashboard dump"
git push -u origin my-test-branch
```

Now to restore this data directly from GitHub:

```{.copyWrapper}
tyk-sync sync -d="http://localhost:3010" -s="b2d420ca5302442b6f20100f76de7d83" -b="refs/heads/my-test-branch" https://github.com/myname/my-test.git
Using publisher: Dashboard Publisher
Fetched 3 definitions
Fetched 1 policies
Processing APIs...
Deleting: 0
Updating: 3
Creating: 0
SYNC Updating: 598ec94f9695f201730d835b
SYNC Updating: 598ec9589695f201730d835c
SYNC Updating: 5990cfee9695f201730d836e
Processing Policies...
Deleting policies: 0
Updating policies: 1
Creating policies: 0
SYNC Updating Policy: Test policy 1
--> Found policy using explicit ID, substituting remote ID for update
```

If running `tyk-sync` in docker the command above would read

```{.copyWrapper}
docker run --rm \
  --mount type=bind,source="$(pwd)",target=/opt/tyk-sync/tmp \
 tykio/tyk-sync:v1.1.0-27-gbf4dd2f-3-g04f7740-1-gff89e43 \
  sync \
  -d="http://localhost:3010" \
  -s="b2d420ca5302442b6f20100f76de7d83" \
  -b="refs/heads/my-test-branch" https://github.com/myname/my-test.git
```

The command provides output to identify which actions have been taken. If using a Tyk Gateway, the Gateway will be
automatically hot-reloaded.

## Example: Dump a specific API from one Tyk Dashboard  

First, we need to identify the `api_id` that we want to dump, in this case `ac35df594b574c9c7a3806286611d211`.
When we have that, we are going to execute the dump command specifying the `api_id` in the tags.
```
tyk-sync dump -d="http://localhost:3000" -s="b2d420ca5302442b6f20100f76de7d83" -t="./tmp" --apis="ac35df594b574c9c7a3806286611d211"
Extracting APIs and Policies from http://localhost:3000
> Fetching policies
--> Identified 0 policies
--> Fetching and cleaning policy objects
> Fetching APIs
--> Fetched 1 APIs
> Creating spec file in: tmp/.tyk.json
Done.
```

If you want to specify more than one API, the values need to be comma-separated.
For example `--apis="ac35df594b574c9c7a3806286611d211,30e7b4001ea94fb970c324bad1a171c3"`.

The same behaviour applies to policies.

