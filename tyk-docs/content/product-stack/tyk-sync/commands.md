---
title: "Tyk Sync Commands"
tags: ["Commands", "Tyk Sync", "API Management", "Automations"]
description: "Learn about the Tyk Sync commands for managing API configurations, examples, and deployments."
aliases:
  - /product-stack/tyk-sync/commands/sync-dump
  - /product-stack/tyk-sync/commands/sync-examples
  - /product-stack/tyk-sync/commands/sync-publish
  - /product-stack/tyk-sync/commands/sync-sync
  - /product-stack/tyk-sync/commands/sync-update
---

In this document, we will cover the various commands available in Tyk Sync.

## Dump Command

| Aspect        | Details                                                                                              |
|---------------|------------------------------------------------------------------------------------------------------|
| **Command**   | `tyk-sync dump`                                                                                       |
| **Usage**     | ```tyk-sync dump -d DASHBOARD_URL [-s SECRET] [-t PATH]```                                                 |
| **Flags**     | `-d, --dashboard DASHBOARD_URL`: Tyk Dashboard URL (required)<br>                                    `-h, --help`: Help for the dump command<br>                                   `-t, --target PATH`: Target directory for output files (optional)<br>                                    `-s, --secret SECRET`: API secret for Dashboard access (optional)<br>                                    `--apis IDS`: Specific API IDs to dump<br>                                    `--oas-apis IDS`: Specific OAS API IDs to dump<br>                                    `--policies IDS`: Specific policy IDs to dump<br>                                    `--templates IDS`: Specific template IDs to dump |
| **Example**   | ```tyk-sync dump --dashboard http://tyk-dashboard:3000 --secret your-secret ```|
| **Example** | ```tyk-sync dump --dashboard http://tyk-dashboard:3000 --secret your-secret --target /path/to/backup --apis c2ltcGxlLWdyYXBoLWRldi90eWthcGktc2NoZW1h,baa5d2b65f1b45385dac3aeb658fa04c ``` |

## Examples Command

| Aspect        | Details                                                                                              |
|---------------|------------------------------------------------------------------------------------------------------|
| **Command**   | `tyk-sync examples`                                                                                   |
| **Usage**     | ```tyk-sync examples [flags]```<br>```tyk-sync examples [command]```                                           |
| **Subcommands**| `publish`: Publish a specific example<br> `show`: Show details of a specific example              |
| **Flags**     | `-h, --help`: Help for examples command                                                             |
| **Example**   | ```tyk-sync examples ```                                                                         |

### Examples Show Command

| Aspect        | Details                                                                                              |
|---------------|------------------------------------------------------------------------------------------------------|
| **Command**   | ```tyk-sync examples show```                                                                              |
| **Usage**     | ```tyk-sync examples show [flags]```                                                                      |
| **Flags**     | `-h, --help`: Help for show command<br> `-l, --location string`: Location of the example           |
| **Example**   | ```tyk-sync examples show --location="udg/vat-checker" ```                                       |

### Examples Publish Command

| Aspect        | Details                                                                                              |
|---------------|------------------------------------------------------------------------------------------------------|
| **Command**   | ```tyk-sync examples publish```                                                                           |
| **Usage**     | ```tyk-sync examples publish [flags]```                                                                   |
| **Flags**     | `-b, --branch string`: Branch to use (default "refs/heads/main")<br> `-d, --dashboard string`: Dashboard target URL<br> `-g, --gateway string`: Gateway target URL<br> `-h, --help`: Help for publish command<br> `-k, --key string`: Key file location for auth<br> `-l, --location string`: Location of the example<br> `-s, --secret string`: API secret<br> `--test`: Use test publisher, output to stdio |
| **Example**   | ```tyk-sync examples publish -d="http://localhost:3000" -s="b2d420ca5302442b6f20100f76de7d83" -l="udg/vat-checker" ``` |

## Publish Command

| Aspect        | Details                                                                                              |
|---------------|------------------------------------------------------------------------------------------------------|
| **Command**   | ```tyk-sync publish```                                                                                    |
| **Usage**     | ```tyk-sync publish {-d DASHBOARD_URL \| -g GATEWAY_URL} [-s SECRET] [-b BRANCH] [-k SSHKEY] [-o ORG_ID] REPOSITORY_URL```<br><br>```tyk-sync publish {-d DASHBOARD_URL \| -g GATEWAY_URL} [-s SECRET] [-o ORG_ID] -p PATH``` |
| **Flags**     |  `-b, --branch BRANCH`: Git branch (default "refs/heads/master")<br> `-d, --dashboard DASHBOARD_URL`: Dashboard URL<br> `-g, --gateway GATEWAY_URL`: Gateway URL<br> `-h, --help`: Help for publish command<br> `-k, --key SSHKEY`: SSH key file location<br> `-p, --path PATH`: Source file directory<br> `-s, --secret SECRET`: API secret<br> `--no-delete`: Skip deletion of resources during synchronisation <br> `--test`: Use test publisher<br> `--allow-duplicate-listenpaths`: Allow duplicate listen paths<br> `--apis IDS`: Specific API IDs to publish<br> `--oas-apis IDS`: Specific OAS API IDs to publish<br> `--policies IDS`: Specific policy IDs to publish<br> `--templates IDS`: Specific template IDs to publish |
| **Example**   | ```tyk-sync publish -d http://tyk-dashboard:3000 -s your-secret -p /app/data --apis 726e705e6afc432742867e1bd898cb23 ```|
| **Example** | ```tyk-sync publish -d http://tyk-dashboard:3000 -s your-secret -b develop https://github.com/your-repo/your-apis ``` |

## Sync Command

| Aspect        | Details                                                                                              |
|---------------|------------------------------------------------------------------------------------------------------|
| **Command**   | `tyk-sync sync`                                                                                       |
| **Usage**     | ```tyk-sync sync {-d DASHBOARD_URL \| -g GATEWAY_URL} [-s SECRET] [-b BRANCH] [-k SSHKEY] [-o ORG_ID] REPOSITORY_URL```<br><br>```tyk-sync sync {-d DASHBOARD_URL \| -g GATEWAY_URL} [-s SECRET] [-o ORG_ID] -p PATH``` |
| **Flags**     | `-b, --branch BRANCH`: Git branch (default "refs/heads/master")<br> `-d, --dashboard DASHBOARD_URL`: Dashboard URL<br> `-g, --gateway GATEWAY_URL`: Gateway URL<br> `-h, --help`: Help for sync command<br> `-k, --key SSHKEY`: SSH key file location<br> `-o, --org ORG_ID`: Override organization ID<br> `-p, --path PATH`: Source file directory<br> `-s, --secret SECRET`: API secret<br> `--test`: Use test publisher<br> `--apis IDS`: Specific API IDs to sync (to be deprecated)<br> `--policies IDS`: Specific policy IDs to sync (to be deprecated) |
| **Example**   | ```tyk-sync sync -d http://tyk-dashboard:3000 -s your-secret https://github.com/your-repo/your-apis ```|
| **Example** | ```tyk-sync sync -d http://tyk-dashboard:3000 -s your-secret -p /path/to/your/apis ``` |

## Update Command

| Aspect        | Details                                                                                              |
|---------------|------------------------------------------------------------------------------------------------------|
| **Command**   | `tyk-sync update`                                                                                     |
| **Usage**     | ```tyk-sync update {-d DASHBOARD_URL \| -g GATEWAY_URL} [-s SECRET] [-b BRANCH] [-k SSHKEY] [-o ORG_ID] REPOSITORY_URL```<br><br>```tyk-sync update {-d DASHBOARD_URL \| -g GATEWAY_URL} [-s SECRET] [-o ORG_ID] -p PATH``` |
| **Flags**     | `-b, --branch BRANCH`: Git branch (default "refs/heads/master")<br> `-d, --dashboard DASHBOARD_URL`: Dashboard URL<br> `-g, --gateway GATEWAY_URL`: Gateway URL<br> `-h, --help`: Help for update command<br> `-k, --key SSHKEY`: SSH key file location<br> `-p, --path PATH`: Source file directory<br> `-s, --secret SECRET`: API secret<br> `--test`: Use test publisher<br> `--apis IDS`: Specific API IDs to update<br> `--oas-apis IDS`: Specific OAS API IDs to update<br> `--policies IDS`: Specific policy IDs to update<br> `--templates IDS`: Specific template IDs to update |
| **Example**   | ```tyk-sync update -d http://tyk-dashboard:3000 -s your-secret -p /app/data --apis 726e705e6afc432742867e1bd898cb23```|
| **Example** | ```tyk-sync update -d http://tyk-dashboard:3000 -s your-secret -b develop https://github.com/your-repo/your-apis ``` |
