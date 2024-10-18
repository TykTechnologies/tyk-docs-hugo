---
date: 2017-03-23T13:19:38Z
title: Keeping and updating API Definitions locally
description: "Learn about how API developers who prefer to manage their API definitions on their local file system during development can use the `publish` or `update` commands of Tyk Sync to upload local API configurations to the Tyk Dashboard."
tags: [ "Tyk Sync" ]
---

This tutorial is aimed at API developers who prefer to manage their API definitions on their local file system during development. It explains how to use the `publish` or `update` commands of Tyk Sync to upload local API Definitions to the Tyk Dashboard. The expected outcome is a streamlined process for maintaining and updating API definitions locally and ensuring they are reflected in the Tyk Dashboard.

### Step 1. Prepare your API Definition

Create your API definition file and save it locally. For example, save it as *api1.json* in a directory structure of your choice.

### Step 2: Create a .tyk.json index file

In the root directory of your API definitions, create a `.tyk.json` file to list all API definition files that Tyk Sync should process.

Example `.tyk.json`:
```json
{
  "type": "apidef",
  "files": [
    { 
        "file": "api1.json" 
    }
  ]
}
```

### Step 3: Install Tyk Sync via Docker

If you haven't installed Tyk Sync, you can do so via Docker:

```bash
docker pull tykio/tyk-sync:v2.0.0
```

### Step 4: Publish API Definitions to Tyk

Use the `publish` command to upload your local API definitions to Tyk. Use Docker bind mounts to access your local files.

```bash
docker run -v /path/to/your/directory:/app/data tykio/tyk-sync:v2.0.0 publish \
  --path /app/data \
  --dashboard [DASHBOARD_URL] \
  --secret [SECRET]
```

### Step 5: Update API Definitions to Tyk

Similarly, to update existing API definitions, use the update command.

```bash
docker run -v /path/to/your/directory:/app/data tykio/tyk-sync:v2.0.0 update \
  --path /app/data \
  --dashboard [DASHBOARD_URL] \
  --secret [SECRET]
```

### Step 6: Verify the update

Log in to your Tyk Dashboard to verify that the API definitions have been published or updated successfully.