---
date: 2023-08-12T16:37:14+01:00
title: How to backup Tyk Cloud Deployment
menu:
  main:
    parent: "Frequently Asked Questions"
weight: 0 
---

Q1: Backup: What are methods for backing up the configurations of the Tyk Dashboard, including Policies, Keys, and APIs. 

A: The dashboard configurations are managed by Tyk via environment variables and these will only change on your request. There will be tickets like this one, as well as internal ones to track what was changed and what request brought about the change. Policies, API definitions and Keys are stored in MongoDB and Redis, which are managed by us. Per standard procedure, we take regular backups of these, but you can request us to take a backup for you at anytime.
Additionally, you can make use of Tyk-Sync to take a backup of Apis and Policies. Please be aware keys cannot be backed up this way.

Q2: Configuration Audit: It is crucial to track and audit any changes made to the Tyk Dashboard configurations. How to enable configuration change logging and implement an audit trail. Are there specific tools or settings within Tyk Gateway that facilitate this process?

A: Tracking changes to Dashboard configurations will need to be done through tickets. As earlier said, no configuration will change except on your request.
If you have a self-managed Tyk instance you can enable audit_logging. This tracks what actions are performed by a user once they are logged into the dashboard. The logs are saved to a file on the Dashboard file system.

Q3: Rollback: In the event of a configuration error or an undesirable change, is there a built-in mechanism to rollback to a previous configuration for an API or a Policy. Please advise on the available options or recommended approaches for performing rollbacks effectively.

A: For this, Tyk Sync can be used with the appropriate command to initiate a rollback. Mentioning again that this refers to APIs and Policies. Additionally, a restoration from a database dump can be performed on your request.
