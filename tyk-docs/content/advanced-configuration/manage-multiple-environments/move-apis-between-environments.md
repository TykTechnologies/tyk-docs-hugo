---
date: 2017-03-24T12:23:18Z
title: Move APIs Between Environments
menu:
  main:
    parent: "Manage Multiple Environments"
weight: 4 
---

It is possible to move APIs between Tyk environments in the following ways:

## In Shared Dashboard Environments

If the environments are both Self-Managed installations and are sharing a Tyk Dashboard (and optionally an MDCB instance) then you can use API and Gateway tagging to transparently and effortlessly move an API from one environment to another.

See [API Tagging]({{< ref "advanced-configuration/manage-multiple-environments/with-tyk-on-premises#api-tagging-with-on-premises" >}}) for more details.

### API Sharding

You can also use [API Sharding]({{< ref "advanced-configuration/manage-multiple-environments#api-sharding" >}}) to move APIs in a Shards (and or MDCB) Tyk Self-Managed installation.

## In Separate Dashboard Environments

If the API dashboards are separate and you wish to migrate API Definitions between two completely segregated environments (e.g. migrating to new hardware or a new DC), then you can use the Export functionality of the Dashboard to download the API definition as JSON and import it into your new installation.

### Step 1: Select Your API

From the **API Designer**, select your API:

{{< img src="/img/2.10/apis_list.png" alt="API designer" >}}

### Step 2: Export the API

Click **EXPORT**:

{{< img src="/img/2.10/export_api_button.png" alt="Export button location" >}}

### Step 3: Save the API

Save and rename the JSON file:

### Step 4: Import into your New Environment

In your new environment, click **IMPORT API**:

{{< img src="/img/2.10/import_api_button.png" alt="Select import" >}}

### Step 5: Generate the new API

Select the **From Tyk Definition** tab and paste the contents of the JSON file into the code editor and click **GENERATE API**:

{{< img src="/img/2.10/import_tyk_definition.png" alt="Generate API" >}}

This will now import the API Definition into your new environment, if you have kept the API ID in the JSON document as is, the ID will remain the same.

{{< note success >}}
**Note**  

The ID you use in with any Dashboard API integrations will change as the documents physical ID will have changed with the import.
{{< /note >}}

## Use Tyk-Sync

You can also use our new Tyk-Sync tool which allows you to sync your APIs (and Policies) with a Version Control System (VCS). You can then move your APIs between environments. See [Tyk-Sync]({{< ref "/api-management/automations#synchronize-tyk-environment-with-github-repository" >}}) for more details.