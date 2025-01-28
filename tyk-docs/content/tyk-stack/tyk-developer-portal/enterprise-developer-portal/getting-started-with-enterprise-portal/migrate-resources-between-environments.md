---
title: "Migrate Resources Between Environments"
date: 2025-01-28
tags: ["Tyk Developer Portal", "Enterprise Portal", "Migration", "Custom IDs"]
aliases:
  - /tyk-stack/tyk-developer-portal/enterprise-developer-portal/getting-started-with-enterprise-portal/migrate-resources-between-environments
description: "Learn how to migrate resources between Tyk Developer Portal environments"
menu:
  main:
    parent: "Getting Started With Enterprise Portal"
weight: 2
---

{{< note success >}}
**Tyk Enterprise Developer Portal**

To get access to these features, contact us at [support@tyk.io](mailto:support@tyk.io?subject=Tyk%20Enterprise%20Portal%20Access)
{{< /note >}}


## Introduction

This guide explains how to migrate resources between Tyk Developer Portal environments, including API products, plans, tutorials, and content blocks. Starting with Portal 1.13, we introduced **Custom IDs (CIDs)** - persistent identifiers that remain unchanged across environments and recreations. This is a significant improvement over traditional database IDs, which change when resources are migrated or recreated.

### The Problem with Database-Generated IDs

Before Portal 1.13, resources were identified solely by database-generated IDs. While this worked for single-environment setups, it caused issues when:
- Migrating resources between environments
- Recreating or restoring resources
- Maintaining relationships between connected resources

For example, if you recreated an API product that was linked to a plan, the product would receive a new database ID. This would break the connection between the product and plan, requiring manual intervention to fix the relationship.

### Benefits of Custom IDs (CIDs)

Custom IDs solve these problems by providing:
- Persistent identification across environments
- Stable reference points for resource relationships
- Reliable migration and synchronization capabilities

Resources that now support CIDs include:

- OAuth Providers and Client Types
- Products, Plans, Tutorials, and OAS Documents
- Organisations and Teams
- Pages and Content Blocks

These resources are now easily transferable between environments, with their relationships preserved via CIDs, ensuring smooth migrations and consistent management.

### Automatic CID Assignment

When upgrading to Tyk Portal 1.13 from an earlier version, the portal automatically runs a **background process** to assign CIDs to resources created in previous versions. This process also runs every time the portal starts, ensuring any new resources without CIDs are retroactively assigned one, whether after an upgrade or a fresh installation.

{{< note >}}
It may take a while for all resources to receive their CIDs after an upgrade. We appreciate your patience during this process.
{{< /note >}}

Each resource should have a unique CID assigned. If any resources are missing CIDs, wait for the background process to complete or contact support.

You can fetch a specific organisation using either its database ID or CID. For example, to fetch the "foo" organisation:

Using database ID:
```bash
curl -X GET 'http://localhost:3001/portal-api/organisations/27' \
  -H "Authorization: ${TOKEN}" \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'
```

Using CID (recommended):
```bash
curl -X GET 'http://localhost:3001/portal-api/organisations/2sG5umt8rGHMiwjcgaHXxwExt8O' \
  -H "Authorization: ${TOKEN}" \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'
```

While both methods work, using CIDs is recommended as they remain consistent across environments.


## Prerequisites

Before you begin, make sure the following are true:

- Your Tyk Developer Portal version is 1.13 or later.
- All resources in your source environment have **Custom IDs** (CIDs) assigned. Resources created after version 1.13 automatically include a CID, while resources from earlier versions receive CIDs through the portal's startup process.
- You have admin access to both the source and target environments.


## Step-by-Step Instructions

### Prepare the Source Environment

1. Log in to the source Tyk Developer Portal.
2. Identify the resources you want to migrate (e.g., API products, plans, OAuth providers).
3. Make sure each resource has a **Custom ID (CID)**:
   - Resources created in Portal 1.13 or later automatically include a CID.
   - Resources created before 1.13 will have been assigned CIDs during the portal's startup process.
4. Verify that there are no duplicate CIDs for the resources.


### Dumping Resources

To migrate resources, you first need to **dump** (or export) them from your source environment. Here's how you can do it:

1. **Fetch the Resources**: The script will automatically pull resources (like organisations and teams) from the source portal. It does this in pages to handle large numbers of resources without overwhelming the system.
2. **Export and Save**: The resources will be saved in separate files with the Custom ID (CID) included. This ensures that each resource is uniquely identified and can be easily restored in the target environment.
3. **Pagination**: Since the portal may have many resources, the script handles the pagination automatically. It will continue to fetch resources from additional pages until everything is exported.

The script to export resources is shown below. You just need to run it, and it will handle the fetching, exporting, and saving automatically.

### Restoring Resources

After exporting the resources, the next step is to restore them into the target environment. The process for restoring resources involves:

1. **Cleaning up the data**: Before restoring resources, certain metadata and relationship fields should be removed to prevent conflicts during the restore process. This includes:
   - System-generated timestamps
   - Internal identifiers
   - Nested relationship data
   - Any other environment-specific properties

2. **Use Custom IDs for Restore**: During the restore process, you must use the Custom ID (CID) to ensure the relationships are maintained. The target environment will either update existing resources with matching CIDs or create new ones.

3. **Restore the resources**: Finally, post the data to the target environment using the POST method (instead of PUT, which would update existing resources).

### Sample Script for Organisations and Teams

Here's a sample script that shows how to export and restore **organisations** and **teams**. You can modify it to work for other resources as needed.

```bash
#!/bin/bash

# A script to export and restore organisations and teams between environments in Tyk Developer Portal.

set -euo pipefail

# Variables from environment or command-line flags
PORTAL_URL=${PORTAL_URL:-}
PORTAL_TOKEN=${PORTAL_TOKEN:-}
PAGE=${PAGE:-1}
PER_PAGE=${PER_PAGE:-50}
RESOURCE_FILTER=${RESOURCE_FILTER:-all}

# Validate required variables
if [[ -z "$PORTAL_URL" || -z "$PORTAL_TOKEN" ]]; then
  echo "ERROR: Please set PORTAL_URL and PORTAL_TOKEN environment variables or pass them as flags."
  exit 1
fi

DATA_DIR="data"
mkdir -p "$DATA_DIR"

# Fetch organisations
fetch_organisations() {
  local page=$1
  local per_page=$2

  echo "Fetching organisations (page: $page, per page: $per_page)..."
  local response=$(curl -s -H "Authorization: $PORTAL_TOKEN" \
    -H "Content-Type: application/json" \
    "$PORTAL_URL/organisations?page=$page&per_page=$per_page")

  if ! echo "$response" | jq -e '.' >/dev/null 2>&1; then
    echo "ERROR: Failed to fetch organisations. Invalid JSON response."
    exit 1
  fi

  echo "$response" | jq -c '.[]' | while read -r organisation; do
    local name=$(echo "$organisation" | jq -r '.Name')
    if [[ "$name" == "Default Organisation" ]]; then
      echo "Skipping Default Organisation"
      continue
    fi

    local org_cid=$(echo "$organisation" | jq -r '.CID')
    echo "$organisation" | jq 'del(.ID, .CreatedAt, .UpdatedAt, .Teams)' >"$DATA_DIR/organisation_$org_cid.json"
    echo "Exported organisation: $name (CID: $org_cid)"
  done

  # Handle pagination
  local next_page=$((page + 1))
  if [[ $(echo "$response" | jq -r 'length') -eq $per_page ]]; then
    fetch_organisations "$next_page" "$per_page"
  fi
}

# Fetch teams
fetch_teams() {
  local page=$1
  local per_page=$2

  echo "Fetching teams (page: $page, per page: $per_page)..."
  local response=$(curl -s -H "Authorization: $PORTAL_TOKEN" \
    -H "Content-Type: application/json" \
    "$PORTAL_URL/teams?page=$page&per_page=$per_page")

  if ! echo "$response" | jq -e '.' >/dev/null 2>&1; then
    echo "ERROR: Failed to fetch teams. Invalid JSON response."
    exit 1
  fi

  echo "$response" | jq -c '.[]' | while read -r team; do
    local name=$(echo "$team" | jq -r '.Name')
    if [[ "$name" =~ .*"All users"$ ]]; then
      echo "Skipping team: $name"
      continue
    fi

    local team_cid=$(echo "$team" | jq -r '.CID')
    echo "$team" | jq 'del(.Users)' >"$DATA_DIR/team_$team_cid.json"
    echo "Exported team: $name (CID: $team_cid)"
  done

  # Handle pagination
  local next_page=$((page + 1))
  if [[ $(echo "$response" | jq -r 'length') -eq $per_page ]]; then
    fetch_teams "$next_page" "$per_page"
  fi
}

# Restore organisations
restore_organisations() {
  echo "Restoring organisations..."
  for file in "$DATA_DIR"/organisation_*.json; do
    [[ -e "$file" ]] || continue
    echo "Restoring $(basename "$file")..."
    local response=$(curl -s -o /dev/null -w "%{http_code}" -X POST \
      -H "Authorization: $PORTAL_TOKEN" \
      -H "Content-Type: application/json" \
      -d @"$file" "$PORTAL_URL/organisations")
    if [[ "$response" -ne 201 ]]; then
      echo "Failed to restore $(basename "$file") (HTTP $response)"
    else
      echo "Restored $(basename "$file")"
    fi
  done
}

# Restore teams
restore_teams() {
  echo "Restoring teams..."
  for file in "$DATA_DIR"/team_*.json; do
    [[ -e "$file" ]] || continue
    echo "Restoring $(basename "$file")..."
    local response=$(curl -s -o /dev/null -w "%{http_code}" -X POST \
      -H "Authorization: $PORTAL_TOKEN" \
      -H "Content-Type: application/json" \
      -d @"$file" "$PORTAL_URL/teams")
    if [[ "$response" -ne 201 ]]; then
      echo "Failed to restore $(basename "$file") (HTTP $response)"
    else
      echo "Restored $(basename "$file")"
    fi
  done
}

# Main script logic
case $1 in
export)
  [[ "$RESOURCE_FILTER" == "all" || "$RESOURCE_FILTER" == "organisations" ]] && fetch_organisations "$PAGE" "$PER_PAGE"
  [[ "$RESOURCE_FILTER" == "all" || "$RESOURCE_FILTER" == "teams" ]] && fetch_teams "$PAGE" "$PER_PAGE"
  ;;
restore)
  [[ "$RESOURCE_FILTER" == "all" || "$RESOURCE_FILTER" == "organisations" ]] && restore_organisations
  [[ "$RESOURCE_FILTER" == "all" || "$RESOURCE_FILTER" == "teams" ]] && restore_teams
  ;;
*)
  echo "Usage: $0 {export|restore} --url <portal_url> --token <portal_token> [--resource <organisations|teams|all>]"
  exit 1
  ;;
esac
```


### Executing the Script

#### Prerequisites

1. Save the script as `portal-migrate.sh`.
2. Make it executable:
   ```bash
   chmod +x portal-migrate.sh
   ```

#### Exporting Resources

To export resources from the source portal:

```bash
export PORTAL_URL="https://your-source-portal.com"
export PORTAL_TOKEN="your-token"
./portal-migrate.sh export
```

Optional parameters:
```bash
export RESOURCE_FILTER="organisations"  # Filter specific resources (organisations|teams|all)
export PAGE=1                          # Start from specific page
export PER_PAGE=50                     # Number of items per page
```

#### Restoring Resources

To restore resources to the target portal:

```bash
export PORTAL_URL="https://your-target-portal.com"
export PORTAL_TOKEN="your-token"
./portal-migrate.sh restore
```

Optional parameters:
```bash
export RESOURCE_FILTER="teams"  # Restore specific resources (organisations|teams|all)
```
