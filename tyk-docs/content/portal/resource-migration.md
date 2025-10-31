---
title: "Migrate Resources Between Environments"
date: 2022-12-28
tags: ["Tyk Developer Portal","Enterprise Portal","Email","Notifications"]
description: "Learn how to migrate resources between environments in the Tyk Enterprise Developer Portal."
---


## Migrate Resources Between Environments

This guide explains how to migrate Developer Portal resources (API Products, Plans, Tutorials etc.)  between different portal environments. 

This capability was made possible with introduction of [Custom IDs]({{< ref "#custom-ids-in-developer-portal" >}}) (more on this later) in v1.13.

## Prerequisites

Before you begin, make sure the following are true:

- Your Tyk Developer Portal version is 1.13 or later.
- All resources in your source environment have **Custom IDs** (CIDs) assigned. Resources created after version 1.13 automatically include a CID, while resources from earlier versions receive CIDs through the portal's startup process.
- You have admin access to both the source and target environments.

## Custom IDs in Developer Portal

Starting with Portal 1.13, we introduced **Custom IDs (CIDs)** - additional persistent identifiers that work alongside database IDs to provide stable references across environments and recreations. While database IDs remain the primary internal identifiers, CIDs provide a reliable way to track and maintain relationships between resources across different environments.

### The Role of Database IDs and CIDs

Resources in the Tyk Developer Portal use both types of identifiers:
- **Database IDs**: Primary internal identifiers that are automatically generated and managed by the database.
- **Custom IDs (CIDs)**: Additional stable identifiers that remain consistent across environments.

### The Problem with Database-Generated IDs

Before Portal 1.13, resources were identified solely by database-generated IDs. While this worked for single-environment setups, it caused challenges when:
- Migrating resources between environments.
- Recreating or restoring resources.
- Maintaining relationships between connected resources.

For example, if you recreated an API product that was linked to a plan, the product would receive a new database ID. This would break the connection between the product and plan, requiring manual intervention to fix the relationship.

### Benefits of Custom IDs (CIDs)

Custom IDs solve these problems by providing:

- Persistent identification across environments.
- Stable reference points for resource relationships.
- Reliable migration and synchronization capabilities.

Resources that now support CIDs include:

- OAuth Providers and Client Types
- Products, Plans, Tutorials, and OAS Documents
- Organisations and Teams
- Pages and Content Blocks

These resources are now easily transferable between environments, with their relationships preserved via CIDs, ensuring smooth migrations and consistent management.

### Automatic CID Assignment

When upgrading to Tyk Portal 1.13 from an earlier version, the portal automatically runs a **background process** to assign CIDs to resources created in previous versions. This process also runs every time the portal starts, ensuring any new resources without CIDs are retroactively assigned one, whether after an upgrade or a fresh installation.

You can fetch a specific organisation using either its database ID or CID. For example, to fetch the "foo" organisation:

**Using database ID:**
```bash
curl -X GET 'http://localhost:3001/portal-api/organisations/27' \
  -H "Authorization: ${TOKEN}" \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'
```

**Using CID (recommended):**
```bash
curl -X GET 'http://localhost:3001/portal-api/organisations/2sG5umt8rGHMiwjcgaHXxwExt8O' \
  -H "Authorization: ${TOKEN}" \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'
```

While both methods work, using CIDs is recommended as they remain consistent across environments.


## Step-by-Step Instructions

In this guide, we'll walk through the process of migrating selected organisations and their teams from one environment (Environment A) to another (Environment B). This involves exporting data from the source environment and importing it into the target environment.

<br>
{{< note success >}}
**Note**

This guide only migrates the `Organization` and `Teams` resources from the developer portal; the same process must be repeated for other resources.
{{< /note >}}

### Example Scenario
- **Source**: Environment A at `https://portal-env-a.example.com`
- **Target**: Environment B at `https://portal-env-b.example.com`
- **Goal**: Migrate organisations and their associated teams

### Setting Up Environment Variables

Before running the migration scripts, you'll need to set up authentication tokens for both environments. You can find these tokens in the Developer Portal UI:

1. Log in to the Developer Portal as an admin
2. Click on your user profile in the top right corner
3. Copy **API credential**

```bash
# For Environment A (source)
export ENV_A_TOKEN="your-source-environment-token"

# For Environment B (target)
export ENV_B_TOKEN="your-target-environment-token"
```

### Export Organisations from Environment A

To start, you'll want to gather the relevant data from Environment A. This ensures you have everything you need for a smooth migration. The data is saved into a JSON file, making it easy to handle during the import process.

Here's an example of how you can export organisations from Environment A:

```bash
# Fetch organisations from Environment A
response=$(curl -s -H "Authorization: ${ENV_A_TOKEN}" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  "https://portal-env-a.example.com/organisations?page=1&per_page=50")

# Process each organisation
echo "$response" | jq -c '.[] | select(.Name != "Default Organisation") | del(.ID, .CreatedAt, .UpdatedAt, .Teams)' > data/organisations.json
```

### Export Teams from Environment A

After exporting organisations, the next step is to export the teams associated with each organisation. We exclude default teams since these are created automatically by the portal, and dealing with them could lead to conflicts. The data is saved into JSON files for structured storage and easy access during the import process.

Here's an example of how you can export teams from Environment A:

```bash
# Read each organisation and fetch its teams
while IFS= read -r org; do
  org_cid=$(echo "$org" | jq -r '.CID')
  echo "Fetching teams for organisation CID: $org_cid..."

  # Fetch teams for the organisation
  teams_response=$(curl -s -H "Authorization: ${ENV_A_TOKEN}" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    "https://portal-env-a.example.com/organisations/$org_cid/teams?page=1&per_page=50")

  # Process each team
  echo "$teams_response" | jq -c '.[] | select(.Name | endswith("All users") | not) | del(.Users)' > "data/teams_${org_cid}.json"
done < data/organisations.json
```

### Import Organisations to Environment B

Now, let's move those organisations into Environment B, one by one. The goal here is to recreate the organisational structure in Environment B accurately. By using the JSON files, you ensure that each organisation is imported correctly, keeping the relationships intact from Environment A.

Here's an example of how you can import organisations into Environment B:

```bash
# Read each organisation and import it
while IFS= read -r org; do
  org_cid=$(echo "$org" | jq -r '.CID')
  echo "Importing organisation CID: $org_cid..."

  # Import the organisation
  curl -s -o /dev/null -w "%{http_code}" -X POST \
    -H "Authorization: ${ENV_B_TOKEN}" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d "$org" "https://portal-env-b.example.com/organisations"
done < data/organisations.json
```

### Import Teams to Environment B

After importing organisations, the next step is to import the teams associated with each organisation. This ensures that the organisational structure is accurately recreated in Environment B.

Here's an example of how you can import teams into Environment B:

```bash
# Read each team file and import the teams
for file in data/teams_*.json; do
  [[ -e "$file" ]] || continue
  while IFS= read -r team; do
    org_cid=$(basename "$file" | sed 's/teams_\(.*\)\.json/\1/')
    team_cid=$(echo "$team" | jq -r '.CID')
    echo "Importing team CID: $team_cid for organisation CID: $org_cid..."

    # Import the team
    curl -s -o /dev/null -w "%{http_code}" -X POST \
      -H "Authorization: ${ENV_B_TOKEN}" \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d "$team" "https://portal-env-b.example.com/organisations/$org_cid/teams"
  done < "$file"
done
```

### Verify the Migration

After completing the migration, follow these steps to verify that everything was imported correctly:

1. **Compare Organisation Counts**
   - Check that the number of organisations in Environment B matches what you exported from Environment A
   - Verify that each organisation's details (name, status, etc.) are correct

2. **Verify Team Structure**
   - Ensure all teams were created under their correct organisations
   - Check that team configurations (permissions, settings) were preserved

Example of verification script:

```bash
#!/bin/bash

# Track total number of mismatches found
errors=0
echo "Starting verification..."

# === Organisation Verification ===
echo "Checking organisations..."

# Get organisations from source data file
# Format: "CID Name" for each organisation, sorted for comparison
source_orgs=$(jq -r '.[] | .CID + " " + .Name' data/organisations.json | sort)

# Get organisations from target environment via API
# Exclude default organisation and format same as source
target_orgs=$(curl -s -H "Authorization: ${ENV_B_TOKEN}" \
  -H "Accept: application/json" \
  "https://portal-env-b.example.com/organisations" | \
  jq -r '.[] | select(.Name != "Default Organisation") | .CID + " " + .Name' | sort)

# Compare organisation lists
# diff will show: < for missing in target, > for extra in target
if [ "$source_orgs" != "$target_orgs" ]; then
    echo "❌ Organisation mismatch!"
    diff <(echo "$source_orgs") <(echo "$target_orgs") || true
    ((errors++))
else
    echo "✅ Organisations match"
fi

# === Team Verification ===
echo -e "\nChecking teams..."

# Iterate through each organisation to check its teams
while IFS= read -r org; do
    # Split organisation line into CID and Name
    org_cid=$(echo "$org" | cut -d' ' -f1)
    org_name=$(echo "$org" | cut -d' ' -f2-)
    
    # Get teams from source data file for this organisation
    source_teams=$(jq -r '.[] | .Name' "data/teams_${org_cid}.json" | sort)

    # Get teams from target environment for this organisation
    # Exclude auto-generated "All users" teams
    target_teams=$(curl -s -H "Authorization: ${ENV_B_TOKEN}" \
      -H "Accept: application/json" \
      "https://portal-env-b.example.com/organisations/$org_cid/teams" | \
      jq -r '.[] | select(.Name | endswith("All users") | not) | .Name' | sort)

    # Compare team lists for this organisation
    if [ "$source_teams" != "$target_teams" ]; then
        echo "❌ Team mismatch in '$org_name'"
        diff <(echo "$source_teams") <(echo "$target_teams") || true
        ((errors++))
    else
        echo "✅ Teams match in '$org_name'"
    fi
done <<< "$source_orgs"

# === Final Status ===
# Exit with appropriate code: 0 for success, 1 for any errors
if [ $errors -eq 0 ]; then
    echo -e "\n✅ SUCCESS: Migration verified"
    exit 0
else
    echo -e "\n❌ FAILURE: Found $errors error(s)"
    exit 1
fi
```

If you find any discrepancies, you may need to:
- Review the migration logs
- Re-run the import for specific resources
a