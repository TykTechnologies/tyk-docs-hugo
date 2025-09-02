---
title: "Tyk Sync Quick Start Guide"
tags: ["Quick Start", "Tyk Sync", "API Management", "Automations"]
description: "Quick start guide for Tyk Sync to synchronize API configurations with Tyk Dashboard"
---

**Tyk Sync** is a command line tool and library to manage and synchronise a Tyk installation with your version control system (VCS). This guide will help you get started with Tyk Sync to manage your API configurations.

## What We'll Cover in This Guide

1. Set up Tyk Demo (gateway with prebuilt APIs)
2. Install Tyk Sync using Docker
3. Use Tyk Sync to dump API configurations from the Tyk Demo
4. Observe the dumped configurations
5. Make changes and sync back to Tyk Demo
6. Verify changes in Tyk Demo

## Instructions

### 1. Set Up Tyk Demo

First, let's set up a Tyk Demo environment with some prebuilt APIs:

```bash
# Pull and run Tyk Demo using Docker Compose
git clone https://github.com/TykTechnologies/tyk-pro-docker-demo
cd tyk-pro-docker-demo
./up.sh
```

This will start a Tyk Gateway and Dashboard with some sample APIs already configured. The Dashboard will be available at `http://localhost:3000`.

### 2. Install Tyk Sync

Follow this [guide]({{< ref "product-stack/tyk-sync/installing-tyk-sync" >}}) to install Tyk Sync. You can either use the Docker image or download the binary directly. We will be using the Docker image for this quick start.

### 3. Dump API Configurations

Now, let's dump the API configurations from the Tyk Dashboard:

```bash
# Create a directory to store your API configurations
mkdir -p tyk-sync-data

# Get your Dashboard API key from the Dashboard UI (User menu > Profile)
# Replace YOUR_DASHBOARD_API_KEY with your actual key

# Using Docker
docker run --rm -v $(pwd)/tyk-sync-data:/opt/tyk-sync/data --network=host tykio/tyk-sync:v2.1 dump -d="http://localhost:3000" -s="YOUR_DASHBOARD_API_KEY" -t="/opt/tyk-sync/data"

# Or using the binary directly
tyk-sync dump -d="http://localhost:3000" -s="YOUR_DASHBOARD_API_KEY" -t="./tyk-sync-data"
```

This command will:
- Connect to your Tyk Dashboard at `http://localhost:3000`
- Use your Dashboard API key for authentication
- Extract all APIs and policies
- Save them to the `tyk-sync-data` directory

### 4. Observe the Dumped Configurations

Let's examine what was dumped:

```bash
ls -la tyk-sync-data
```

You should see:
- A `.tyk.json` file (index file for synchronization)
- A `policies` directory containing policy definitions
- An `apis` directory containing API definitions

Each API and policy is stored as a separate JSON file, making it easy to track changes in version control.

### 5. Make Changes and Sync Back

Now, let's modify an API definition and sync it back to the Dashboard:

```bash
# Edit one of the API definition files
# For example, change the name of an API
# Then sync the changes back

# Using Docker
docker run --rm -v $(pwd)/tyk-sync-data:/opt/tyk-sync/data --network=host tykio/tyk-sync:v2.1 update -d="http://localhost:3000" -s="YOUR_DASHBOARD_API_KEY" -p="/opt/tyk-sync/data"

# Or using the binary directly
tyk-sync update -d="http://localhost:3000" -s="YOUR_DASHBOARD_API_KEY" -p="./tyk-sync-data"
```

This will update the API configurations in your Tyk Dashboard based on the local files.

### 6. Verify Changes in Tyk Demo

Open your Tyk Dashboard at `http://localhost:3000` and navigate to the APIs section. You should see that your changes have been applied.

## Conclusion

Tyk Sync provides a powerful way to manage your API configurations as code. By following this quick start guide, you've learned how to:
- Extract API configurations from a Tyk Dashboard
- Store them as files that can be version-controlled
- Modify and update configurations
- Synchronize configurations between different environments

This approach helps ensure consistency across environments and enables you to implement Gitops for your API management.