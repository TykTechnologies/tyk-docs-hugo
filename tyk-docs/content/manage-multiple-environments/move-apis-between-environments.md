---
date: 2017-03-24T12:23:18Z
title: Move APIs Between Environments
menu:
  main:
    parent: "Manage Multiple Environments"
weight: 0 
---

It is possible to move APIs between Tyk environments in the following ways:

## <a name="shared-dashboard"></a>In Shared Dashboard Environments

If the environments are both On-Premises installations and are sharing a Tyk Dashboard (and optionally an MDCB instance) then you can use API and Gateway tagging to transparently and effortlessly move an API from one environment to another.

See [API Tagging](https://tyk.io/docs/manage-multiple-environments/with-tyk-on-premises/#api-tagging) for more details.

### API Sharding

You can also use [API Sharding](https://tyk.io/docs/manage-multiple-environments/#api-sharding) to move APIs in a Shared (and or MDCB)On-Premises installation.

## <a name="separate-dashboards"></a>In Separate Dashboard Environments

If the API dashboards are separate and you wish to migrate API Definitions between two completely segregated environments (e.g. migrating to new hardware or a new DC), then you can use the Export functionality of the Dashboard to download the API definition as JSON and import it into your new installation.

### Step 1: Select Your API

From the **API Designer**, select your API:

![API designer][1]

### Step 2: Export the API

Click **EXPORT**:

![Export button location][2]

### Step 3: Save the API

Save and rename the JSON file:

### Step 4: Import into your New Environment

In your new environment, click **IMPORT API**:

![Select import][4]

### Step 5: Generate the new API

Select the **From Tyk Definition** tab and paste the contents of the JSON file into the code editor and click **GENERATE API**:

![Generate API button][5]

This will now import the API Definition into your new environment, if you have kept the API ID in the JSON document as is, the ID will remain the same.

> **Important**: The ID you use in with any Dashboard API integrations will change as the documents physical ID will have changed with the import.

[1]: /docs/img/dashboard/system-management/created_apis_2.5.png
[2]: /docs/img/dashboard/system-management/export_api_2.5.png
[3]: /docs/img/dashboard/system-management/exportSaveAPI.png
[4]: /docs/img/dashboard/system-management/import_api_2.5.png
[5]: /docs/img/dashboard/system-management/generate_api_2.5.png