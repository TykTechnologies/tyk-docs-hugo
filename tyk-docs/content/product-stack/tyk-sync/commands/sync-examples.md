---
date: 2017-03-23T13:19:38Z
title: Examples Command
description: "Learn about the usage and flags for tyk-sync examples command"
tags: [ "Tyk Sync", "GitOps" ]
---

## Examples Command

The examples command lists all examples from our official [Tyk examples](https://github.com/TykTechnologies/tyk-examples) repository. [See output in example usage]({{< relref "#import-tyk-example-into-dashboard" >}})
```bash
Usage:
  tyk-sync examples [flags]
  tyk-sync examples [command]

Available Commands:
  publish     Publish a specific example to a dashboard by using its location
  show        Shows details of a specific example by using its location

Flags:
  -h, --help   help for examples
```

## Show Command
Shows more details about a specific example by using its location. [See output in example usage]({{< relref "#import-tyk-example-into-dashboard" >}})
```bash
Usage:
  tyk-sync examples show [flags]

Flags:
  -h, --help              help for show
  -l, --location string   Location to example
```

## Publish Command
Publishs an example by using its location.
```bash
Usage:
  tyk-sync examples publish [flags]

Flags:
  -b, --branch string      Branch to use (defaults to refs/heads/main) (default "refs/heads/main")
  -d, --dashboard string   Fully qualified dashboard target URL
  -h, --help               help for publish
  -k, --key string         Key file location for auth (optional)
  -l, --location string    Location to example
  -s, --secret string      Your API secret
      --test               Use test publisher, output results to stdio
```

API secret refers to secret use to access your Dashboard API. For dashboard users, you can get it from "User" page under “Tyk Dashboard API Access key”.

## Examples
### Import Tyk example into Dashboard

To list all available examples you need to run this command:
```bash
tyk-sync examples
LOCATION           NAME                               DESCRIPTION
udg/vat-checker    VAT number checker UDG             Simple REST API wrapped in GQL using Universal Data Graph that allows user to check validity of a VAT number and display some details about it.
udg/geo-info       Geo information about the World    Countries GQL API extended with information from Restcountries
```

It's also possible to show more details about an example by using its location. For example, based on the output from `tyk-sync examples` above, we can use the location of the example "VAT number checker UDG" to get more information:
```bash
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
```bash
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
