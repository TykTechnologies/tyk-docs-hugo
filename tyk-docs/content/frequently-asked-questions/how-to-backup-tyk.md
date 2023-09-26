---
date: 2017-03-27T16:37:14+01:00
title: How to backup Tyk
description: Comprehensive guide to backing up Tyk. Important especially before changes and upgrades
tags: ["configuration files backup", "backup tyk", "tyk.conf", "upgrade tyk", "database backup"]
menu:
  main:
    parent: "Frequently Asked Questions"
weight: 0 
---

## Introduction
Our product's components require a backup of the data store and config files they use. You should always have a fresh backup, especially before a change or an upgrade.
On this page, we'll provide high-level instructions per data store or file.

## Configuration Files Backup
Every Tyk component has a config file, that is used during start-up. They store critical settings and parameters that determine how your application behaves as well as settings for databases, passwords, and connections to other components.
To ensure a comprehensive backup strategy, regularly back up configuration files for all relevant components, using a version control system (such as Git).

### Config file per component
These are the config files per component:
 - Tyk Gateway - `tyk.conf` (For any user)
 -  Tyk Pump - `pump.conf` (For any user)
 - Tyk Dashboard - `tyk_analytics.conf` (For Tyk Self-Managed clients)
 - MDCB - `tyk_sink.conf` (for MDCB clients)
 - Hybrid Tyk Gateway - `tyk.hybrid.conf`
   
**Note:** These are the config files with Tyk's default names. You might have different names for your config files.

### Certificates Directory
Path to the private keys and certificate are defined in the config files of any of Tyk components. Make sure to back up the certificate and keys used by these config files.

### Middleware Directory for Custom Plugins
If you use custom middleware plugins to extend your application's capabilities, regularly back up the middleware directory to preserve your customizations.
Details on middleware installation for [Tyk Self-Managed users](https://tyk.io/docs/plugins/supported-languages/javascript-middleware/install-middleware/tyk-pro/) (users of the licensed product).
Details on middleware installation for [Tyk Open Source users](https://tyk.io/docs/plugins/supported-languages/javascript-middleware/install-middleware/tyk-ce/)

**Note:** Tyk's default name is `/middleware`. You might use a different name for it.


### Tyk API Definitions Directory - For Tyk Open source users
When using *Tyk Gateway* as an open-source product, it could use a dedicated directory to load your Tyk API definitions and start serving them. 
If you use such a directory, ensure these definitions are part of your backup plan.

**Note:** Tyk's default name is `/apps`. You might use a different name for it based on this [config field](https://tyk.io/docs/tyk-stack/tyk-gateway/important-prerequisites/#tyk-config)

### Tyk Policies Directory - For Tyk Open source users
When using *Tyk Gateway* as an open-source product, it could use a file to load policies to be used by API keys when consuming the APIs. 
If you use a policies file, ensure it is also part of your backup plan.

**Note:** Tyk's default name is `/policies`. You might use a different name for it based on this [config field](https://tyk.io/docs/tyk-stack/tyk-gateway/important-prerequisites/#path-to-policies-file)

      
## Redis Backup

**Users:** Redis is used in any type of deployment and as such used by any type of user (Open Source and paying users).

Backup Redis is important as all of the keys used by *Tyk Gateway* are stored there.  
Redis, being an in-memory data store, is ephemeral and doesn't have a built-in default backup policy, as such it requires specific considerations for backup. 
To understand the best practices for Redis backup, please visit the official [Redis Backup Documentation](https://redis.io/docs/management/persistence/).


## Databases Used by Tyk Dashboard - a licenced product
**Users:** For Tyk Self-managed and MDCB users who are using our licensed products.

Tyk Dashboard allows you to choose between *MongoDB* and *PostgreSQL* as your database solution, depending on your preferences and requirements. Regardless of your choice, it's crucial to implement a robust backup strategy to ensure the safety and availability of your data. Please check the section that fits your use case:


### MongoDB Backup
MongoDB provides various methods for creating backups, and the choice of strategy often depends on your specific use case and environment. To learn more about MongoDB backup strategies, please refer to the [MongoDB Backup Documentation](https://www.mongodb.com/docs/manual/core/backups/).
- For *Amazon DocumentDB* user, check their [backup and restore documentation](https://docs.aws.amazon.com/documentdb/latest/developerguide/backup_restore.html)
- For *CosmosDB* users check their [online backup and on-demand data restore documentation](https://learn.microsoft.com/en-us/azure/cosmos-db/online-backup-and-restore) 

### Postgres Backup

PostgreSQL offers multiple backup options, including logical and physical backups. The right choice depends on your database size, recovery time objectives, and other factors. For detailed information on PostgreSQL backup strategies, please consult the [PostgreSQL Backup and Restore Documentation](https://www.postgresql.org/docs/current/backup.html).

- For *Amazon RDS* users, check their [backup and restore documentation](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_CommonTasks.BackupRestore.html). To further enhance your PostgreSQL backup process, you can explore services like [AWS RDS Automated Backups](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_WorkingWithAutomatedBackups.html) if you're hosting your database on AWS. 
- For *CosmosDB* users check their [online backup and on-demand data restore documentation](https://learn.microsoft.com/en-us/azure/cosmos-db/postgresql/concepts-backup) 


## Ensuring Seamless Recovery
A well-executed backup strategy ensures the resilience of your system. 
By having a backup plan that includes configuration files and data stores, you can recreate your entire environment, including settings, in case of unexpected incidents.
If all these are covered, you should be able to easily boot a new version in the same state that it was in before and have all tokens still working. This level of preparedness is vital to maintain business continuity and data integrity.
 
## Cautionary Note
It's important to note that our product does not have the legal authority to provide specific backup instructions for MongoDB, PostgreSQL, or Redis. Therefore, we recommend referring to the official documentation and, if needed, consulting with experienced database administrators or your database hosting provider for guidance on implementing a secure and reliable backup strategy tailored to your unique needs.

By following industry best practices and leveraging the expertise of established vendors, you can ensure the safety and integrity of your data while using our product.

