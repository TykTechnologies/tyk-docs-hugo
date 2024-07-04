---
date: 2017-03-23T13:19:38Z
title: Backing up API configurations with GitHub Actions
description: "Learn about how API platform teams can automate the backup of API configurations using GitHub Actions. By setting up a scheduled GitHub Action, the tutorial explains how to periodically dump API configurations and store backups in cloud storage, such as AWS S3."
tags: [ "Tyk Sync" ]
---

This tutorial guides API platform teams on automating the backup of API configurations using GitHub Actions. By setting up a scheduled GitHub Action, the tutorial explains how to periodically dump API configurations and store backups in cloud storage, such as AWS S3. The expected outcome is a regularly updated backup of all API configurations, ensuring data safety and easy restoration.

### Step 1: Create a GitHub Action workflow

1. In your repository, create a new file `.github/workflows/tyk-backup.yml`.
2. Add the following content to the `tyk-backup.yml` file:

```yaml
name: Tyk Backup

on:
  schedule:
    - cron: '0 0 * * *'  # Runs every day at midnight

jobs:
  backup:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout repository
      uses: actions/checkout@v2

    - name: Create Backup Directory
      run: |
        BACKUP_DIR="backup/$(date +%Y-%m-%d)"
        mkdir -p $BACKUP_DIR
        echo "BACKUP_DIR=$BACKUP_DIR" >> $GITHUB_ENV

    - name: Set Permissions for Backup Directory
      run: |
        sudo chown -R 1001:1001 ${{ github.workspace }}/backup

    - name: Dump API Configurations
      run: |
        docker run --user 1001:1001 -v ${{ github.workspace }}:/app/data tykio/tyk-sync:${TYK_SYNC_VERSION} dump --target /app/data/${{ env.BACKUP_DIR }} --dashboard ${TYK_DASHBOARD_URL} --secret ${TYK_DASHBOARD_SECRET}
      env:
        TYK_SYNC_VERSION: ${{ vars.TYK_SYNC_VERSION }}
        TYK_DASHBOARD_URL: ${{ secrets.TYK_DASHBOARD_URL }}
        TYK_DASHBOARD_SECRET: ${{ secrets.TYK_DASHBOARD_SECRET }}

    - name: Upload to S3
      uses: jakejarvis/s3-sync-action@v0.5.1
      with:
        args: --acl private --follow-symlinks --delete
      env:
        AWS_S3_BUCKET: ${{ secrets.AWS_S3_BUCKET }}
        AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
        AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        AWS_REGION: 'us-east-1'  # Change to your region
        SOURCE_DIR: ${{ env.BACKUP_DIR }}
```

### Step 2: Set up secrets

1. Go to your GitHub repository.
2. Navigate to Settings > Secrets and variables > Actions.
3. Add the following variable:
    - `TYK_SYNC_VERSION`: The version of Tyk Sync you want to use.
4. Add the following secrets:
   - `TYK_DASHBOARD_URL`: The URL of your Tyk Dashboard.
   - `TYK_DASHBOARD_SECRET`: The secret key for your Tyk Dashboard.
   - `AWS_S3_BUCKET`: The name of your AWS S3 bucket.
   - `AWS_ACCESS_KEY_ID`: Your AWS access key ID.
   - `AWS_SECRET_ACCESS_KEY`: Your AWS secret access key.

### Step 3: Commit and push changes

Commit the `tyk-backup.yml` file and push it to the main branch of your repository.

### Step 4: Verify backups

The GitHub Action will run every day at midnight, dumping API configurations into a backup directory and uploading them to your specified S3 bucket.