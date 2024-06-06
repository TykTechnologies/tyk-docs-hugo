---
date: 2017-03-23T13:19:38Z
title: Dump Command
description: ""
tags: [ "Tyk Sync", "GitOps" ]
---

## Usage

Dump will extract policies and APIs from a target (your Dashboard) and place them in a directory of your choosing. It will also generate a spec file that can be used for syncing.

```
Dump will extract policies and APIs from a target (dashboard) and
	place them in a directory of your choosing. It will also generate a spec file
	that can be used for sync.

Usage:
  tyk-sync dump [flags]

Flags:
      --apis strings        Specific Apis ids to dump
  -b, --branch string       Branch to use (defaults to refs/heads/master) (default "refs/heads/master")
  -d, --dashboard string    Fully qualified dashboard target URL
  -h, --help                help for dump
  -k, --key string          Key file location for auth (optional)
      --policies strings    Specific Policies ids to dump
  -s, --secret string       Your API secret
  -t, --target string       Target directory for files
      --templates strings   List of template IDs to be dumped
```

API secret refers to secret use to access your Gateway API or Dashboard API. For dashboard users, you can get it from "User" page under “Tyk Dashboard API Access key”.








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
 tykio/tyk-sync:v1.2 \
 dump \
 -d="http://host.docker.internal:3000" \
 -s="b2d420ca5302442b6f20100f76de7d83" \
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
 tykio/tyk-sync:v1.2 \
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

## Example: Check the currently installed version of Tyk Sync

To check the current Tyk Sync version, we need to run the version command:


```
tyk-sync version
v1.2
```

## Example: Import Tyk example into Dashboard

To list all available examples you need to run this command:
```{.copyWrapper}
tyk-sync examples
LOCATION           NAME                               DESCRIPTION
udg/vat-checker    VAT number checker UDG             Simple REST API wrapped in GQL using Universal Data Graph that allows user to check validity of a VAT number and display some details about it.
udg/geo-info       Geo information about the World    Countries GQL API extended with information from Restcountries
```

It's also possible to show more details about an example by using its location. For example, based on the output from `tyk-sync examples` above, we can use the location of the example "VAT number checker UDG" to get more information:
```{.copyWrapper}
tyk-sync examples show --location="udg/vat-checker"
LOCATION
udg/vat-checker

NAME
VAT number checker UDG

DESCRIPTION
Simple REST API wrapped in GQL using Universal Data Graph that allows user to check validity of a VAT number and display some details about it.

FEATURES
- REST Datasource

MIN TYK VERSION
5.0
```

To publish it into the Dashboard you will need to use this command:
```{.copyWrapper}
tyk-sync examples publish -d="http://localhost:3000" -s="b2d420ca5302442b6f20100f76de7d83" -l="udg/vat-checker"
Fetched 1 definitions
Fetched 0 policies
Using publisher: Dashboard Publisher
org override detected, setting.
Creating API 0: vat-validation
--> Status: OK, ID:726e705e6afc432742867e1bd898cb26
Updating API 0: vat-validation
--> Status: OK, ID:726e705e6afc432742867e1bd898cb26
org override detected, setting.
Done
```
