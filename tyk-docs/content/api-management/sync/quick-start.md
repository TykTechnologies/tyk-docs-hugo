---
title: "Tyk Sync Quick Start Guide"
tags: ["Quick Start", "Tyk Sync", "API Management", "Automations"]
description: "Quick start guide for Tyk Sync to synchronize API configurations with Tyk Dashboard"
---


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

1. **Set Up Tyk Demo**

First, let's set up a Tyk Demo environment with some prebuilt APIs:

```bash
# Pull and run Tyk Demo using Docker Compose
git clone https://github.com/TykTechnologies/tyk-demo
cd tyk-demo
docker-compose up -d
```

This will start a Tyk Gateway and Dashboard with some sample APIs already configured. The Dashboard will be available at `http://localhost:3000`.

## 2. Install Tyk Sync

You can run Tyk Sync using Docker:

```bash
# Create a directory to store your API configurations
mkdir -p tyk-sync-data

# Run Tyk Sync using Docker
docker run --rm -v $(pwd)/tyk-sync-data:/opt/tyk-sync/data tykio/tyk-sync:latest
```

Alternatively, you can install it directly:

```bash
# For Linux/macOS
curl -L https://github.com/TykTechnologies/tyk-sync/releases/latest/download/tyk-sync_linux_amd64 -o tyk-sync
chmod +x tyk-sync
sudo mv tyk-sync /usr/local/bin/
```

## 3. Dump API Configurations

Now, let's dump the API configurations from the Tyk Dashboard:

```bash
# Get your Dashboard API key from the Dashboard UI (User menu > Profile)
# Replace YOUR_DASHBOARD_API_KEY with your actual key

# Using Docker
docker run --rm -v $(pwd)/tyk-sync-data:/opt/tyk-sync/data tykio/tyk-sync:latest dump -d="http://localhost:3000" -s="YOUR_DASHBOARD_API_KEY" -t="/opt/tyk-sync/data"

# Or using the binary directly
tyk-sync dump -d="http://localhost:3000" -s="YOUR_DASHBOARD_API_KEY" -t="./tyk-sync-data"
```

This command will:
- Connect to your Tyk Dashboard at `http://localhost:3000`
- Use your Dashboard API key for authentication
- Extract all APIs and policies
- Save them to the `tyk-sync-data` directory

## 4. Observe the Dumped Configurations

Let's examine what was dumped:

```bash
ls -la tyk-sync-data
```

You should see:
- A `.tyk.json` file (index file for synchronization)
- A `policies` directory containing policy definitions
- An `apis` directory containing API definitions

Each API and policy is stored as a separate JSON file, making it easy to track changes in version control.

## 5. Make Changes and Sync Back

Now, let's modify an API definition and sync it back to the Dashboard:

```bash
# Edit one of the API definition files
# For example, change the name of an API
# Then sync the changes back

# Using Docker
docker run --rm -v $(pwd)/tyk-sync-data:/opt/tyk-sync/data tykio/tyk-sync:latest update -d="http://localhost:3000" -s="YOUR_DASHBOARD_API_KEY" -p="/opt/tyk-sync/data"

# Or using the binary directly
tyk-sync update -d="http://localhost:3000" -s="YOUR_DASHBOARD_API_KEY" -p="./tyk-sync-data"
```

This will update the API configurations in your Tyk Dashboard based on the local files.

## 6. Verify Changes in Tyk Demo

Open your Tyk Dashboard at `http://localhost:3000` and navigate to the APIs section. You should see that your changes have been applied.

## Additional Tyk Sync Commands

Tyk Sync offers several other useful commands:

- **Publish**: Create new API definitions from your local files
  ```bash
  tyk-sync publish -d="http://localhost:3000" -s="YOUR_DASHBOARD_API_KEY" -p="./tyk-sync-data"
  ```

- **Sync**: Synchronize a Git repository with your Tyk Dashboard
  ```bash
  tyk-sync sync -d="http://localhost:3000" -s="YOUR_DASHBOARD_API_KEY" -p="./tyk-sync-data"
  ```

- **Examples**: Show available Tyk examples
  ```bash
  tyk-sync examples
  ```

## Version Control Integration

One of the key benefits of Tyk Sync is its ability to integrate with version control systems. Here's how to use it with Git:

1. Initialize a Git repository in your tyk-sync-data directory:
   ```bash
   cd tyk-sync-data
   git init
   git add .
   git commit -m "Initial API configurations"
   ```

2. Push to a remote repository:
   ```bash
   git remote add origin YOUR_REMOTE_REPO_URL
   git push -u origin master
   ```

3. To sync from the Git repository to another Tyk Dashboard:
   ```bash
   tyk-sync sync -d="http://another-dashboard:3000" -s="ANOTHER_DASHBOARD_API_KEY" -b="refs/heads/master" YOUR_REMOTE_REPO_URL
   ```

This enables you to maintain your API configurations as code, with all the benefits of version control, code review, and automated deployments.

## Conclusion

Tyk Sync provides a powerful way to manage your API configurations as code. By following this quick start guide, you've learned how to:
- Extract API configurations from a Tyk Dashboard
- Store them as files that can be version-controlled
- Modify and update configurations
- Synchronize configurations between different environments

This approach helps ensure consistency across environments and enables you to implement proper CI/CD practices for your API management.

---

<TODO: What we will be doing in this quick start guide>

1. Set up Tyk Demo (gateway with prebuilt APIs)
2. Install Tyk Sync using Docker
3. Use Tyk Sync to dump API configurations from the Tyk Demo
4. Observe the dumped configurations
5. Make Changes and Sync Back to Tyk Demo
6. Verify Changes in Tyk Demo

## Set up Tyk Sync
### Installation
Currently the application is available via [Docker](https://hub.docker.com/r/tykio/tyk-sync) and [Packagecloud](https://packagecloud.io/tyk/tyk-sync).

### Docker

To install Tyk Sync using Docker, follow these steps:

#### Pull the Docker image from the Tyk repository

Make sure to specify the version tag you need. For example, to pull version v1.5.0, use the following command:

```bash
SYNC_VERSION=v1.5.0
docker pull tykio/tyk-sync:$SYNC_VERSION
```

All docker images are available on the [Tyk Sync Docker Hub](https://hub.docker.com/r/tykio/tyk-sync/tags) page.

#### Run Tyk Sync

```bash
SYNC_VERSION=v1.5.0
docker run tykio/tyk-sync:$SYNC_VERSION [command] [flag]
```

If you want to dump your API configurations to the local file system or sync configurations saved locally to Tyk, use Docker [bind mounts](https://docs.docker.com/storage/bind-mounts):

```bash
docker run -v /path/to/local/directory:/app/data tykio/tyk-sync:$SYNC_VERSION [command] [flag]
```
Replace [command] with the specific Tyk Sync command you want to execute.


### Specify target Tyk installation

#### Tyk Dashboard
For Dashboard users, you can provide the necessary connection details using the `--dashboard` and `--secret` options.

```bash
tyk-sync --dashboard <DASHBOARD_URL> --secret <SECRET> [command] [flags]
```

DASHBOARD_URL is the fully qualified dashboard target URL (e.g. `http://localhost:3000`) and SECRET refers to the API access key use to access your Dashboard API. For dashboard users, you can get it from the “Users” page under “Tyk Dashboard API Access Credentials”.

If you prefer not to provide the secret via the command line, you can set the environment variable `TYKGIT_DB_SECRET` instead. This method keeps your secret secure and avoids exposure in command history.

```bash
export TYKGIT_DB_SECRET=<SECRET>
tyk-sync --dashboard <DASHBOARD_URL> [command] [flags]
```

#### Open Source Gateway
For open source Gateway users, you can provide the necessary connection details using the `--gateway` and `--secret` options.

```bash
tyk-sync --gateway <GATEWAY_URL> --secret <SECRET> [command] [flags]
```

GATEWAY_URL is the fully qualified gateway target URL (e.g. `http://localhost:8080`) and SECRET refers to the API secret (`secret` parameter in your tyk.conf file) used to access your Gateway API.

If you prefer not to provide the secret via the command line, you can set the environment variable `TYKGIT_GW_SECRET` instead. This method keeps your secret secure and avoids exposure in command history.

```bash
export TYKGIT_GW_SECRET=<SECRET>
tyk-sync --gateway <GATEWAY_URL> [command] [flags]
```

2. Export configurations from your development environment:

```bash
tyk-sync dump -d http://localhost:3000 -s <dashboard-secret> -t dev-backup
```

This command exports all configurations from your development Tyk Dashboard to a local directory named `dev-backup`.

3. Import configurations to your staging environment:

```bash
tyk-sync publish -d http://staging-dashboard:3000 -s <staging-secret> -p dev-backup
```

This command imports the configurations from the `dev-backup` directory to your staging Tyk Dashboard.

### Specify Source API Configurations
For the `sync`, `update`, and `publish` commands, you need to specify where Tyk Sync can get the source API configurations to update the target Tyk installation. You can store the source files either in a Git repository or the local file system.

#### Working with Git
For any Tyk Sync command that requires Git repository access, specify the Git repository as the first argument after the command. By default, Tyk Sync reads from the `master` branch. To specify a different branch, use the `--branch` or `-b` flag. If the Git repository requires connection using Secure Shell Protocol (SSH), you can specify SSH keys with `--key` or `-k` flag.

```bash
tyk-sync [command] https://github.com/your-repo --branch develop
```

#### Working with the local file system
To update API configurations from the local file system, use the `--path` or `-p` flag to specify the source directory for your API configuration files.

```bash
tyk-sync [command] --path /path/to/local/directory
```

#### Index File Requirement
A `.tyk.json` index file is required at the root of the source Git repository or the specified path. This `.tyk.json` file lists all the files that should be processed by Tyk Sync.

Example `.tyk.json`:
```json
{
  "type": "apidef",
  "files": [
    {
      "file": "api1/api1.json"
    },
    {
      "file": "api2/api2.json"
    },
    {
      "file": "api3.json"
    }
  ],
  "policies": [
    {
      "file": "policy1.json"
    }
  ],
  "assets": [
    {
      "file": "template1.json"
    }
  ]
}
```


