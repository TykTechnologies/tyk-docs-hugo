---
title: "Backing Up APIs and Policies"
date: 2024-03-4
tags: ["Export", "Backups", "Policies", "APIs", "Backup Export", "Backup APIs"]
description: "How to backup APIs and Policies with Tyk Dashboard"
---

Backing up Tyk APIs and Policies is crucial for ensuring business continuity and data integrity. It safeguards against accidental data loss, system failures or corruption. This provides the opportunity to rollback to a stable state during upgrades or migrations, allowing you to restore configurations to a previous state to prevent disruptions with your API infrastructure.
If you are using Self Managed deployment then we recommend that you use [Tyk Sync]({{< ref "/api-management/automations#synchronize-tyk-environment-with-github-repository" >}}) to backup your Tyk APIs and policies. 

## Export And Restore APIs and Policies

To facilitate backing up APIs and policies we have provided a Bash script [backup](https://github.com/TykTechnologies/backup) that can be used to export and restore all Tyk API definitions and Policies from Tyk Dashboard. This will be done by the *export* and *import* commands respectively. The script can be used on both Tyk Cloud and Self Managed deployments. The script is helpful for Tyk Cloud users who want to export their Tyk OAS APIs since *tyk-sync* does not currently support it on Tyk Cloud.

### Export APIs and Policies

To export all APIs and Policies use the *export* command:

```bash
./backup.sh export --url https://my-tyk-dashboard.com --secret mysecretkey --api-output apis.json --policy-output policies.json
```

This will export all your API definitions and policies to *apis.json* and *policies.json* files.

### Import APIs and Policies

To import all your APIs and Policies, use the *import* command:

```bash
./backup.sh import --url https://my-tyk-dashboard.com --secret mysecretkey --api-file apis.json --policy-file policies.json
```

This will restore the API definitions and policies from the apis.json and policies.json files.
