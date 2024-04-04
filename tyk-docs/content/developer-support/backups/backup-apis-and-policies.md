---
title: "Backing Up APIs and Policies With Tyk Dashboard"
date: 2024-03-4
tags: ["Export", "Backups", "Policies", "APIs", "Backup Export", "Backup APIs"]
description: "How to backup APIs with Tyk Dashboard"
---

Backing up Tyk APIs and Policies is crucial for ensuring business continuity and data integrity. It safeguards against accidental data loss, system failures or corruption. This provides the opportunity to rollback to a stable state during upgrades or migrations, allowing you to restore previous configurations, rolling back to the previous state and prevent disruptions to your API infrastructure.

Tyk provides a variety of ways in which you can backup your APIs and Policies.

## Export And Restore APIs and Policies

To facilitate backing up APIs and Policies we have provided a [Bash script](https://github.com/TykTechnologies/backup_apis) that can be used to export and restore all Tyk API definitions and Policies from Tyk Dashboard. This will be done by the *export* and *upload* commands respectively.

### Export APIs and Policies

To export all APIs and Policies use the *export* command:

```bash
./backup.sh export --url https://my-tyk-dashboard.com --secret mysecretkey --output policies-and-apis.json
```

This will export all your API definitions and policies to a JSON file.

### Import APIs and Policies

To import all your APIs and Policies, use the *upload* command:

```bash
./backup.sh upload --url https://my-tyk-dashboard.com --secret mysecretkey --file policies-and-apis.json
```

This will restore the API definitions and policies from a JSON file.

## Backing Up On Tyk Cloud

For further guidance on backing up on Tyk Cloud please refer to our [FAQ]({{< ref "frequently-asked-questions/how-to-backup-tyk-cloud-deployment" >}})

