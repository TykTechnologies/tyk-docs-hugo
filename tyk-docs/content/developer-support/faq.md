---
date: 2017-03-27T16:05:33+01:00
title: Frequently Asked Questions
tags: ["configuration files backup", "backup tyk", "tyk.conf", "upgrade tyk", "database backup"]
tags: ["Analytics", "Distributed Analytics", "Redis", "Redis Shards", "analytics_config.enable_multiple_analytics_keys" ]
tags: ["do_not_track", "Analytics", "RPS", "Requests Per Second", "CPU", "high load", "high traffic"]
aliases:
    - /frequently-asked-questions/check-current-gateway-version/
    - /frequently-asked-questions/how-to-backup-tyk-cloud-deployment
    - /frequently-asked-questions
    - /frequently-asked-questions/how-to-backup-tyk
    - /troubleshooting/tyk-installation/couldnt-unmarshal-config-error
    - /frequently-asked-questions/datadog-logs-showup-as-errors

weight: 230
menu:
    main:
        parent: "FAQ"
---

This section lists commonly asked questions or frequently encountered issues and explains how to resolve them.

## Tyk Configuration

1. **If there's a configuration error or an unwanted change, can I easily revert to a previous API or Policy configuration? What are the options or best practices for effective rollbacks?**
    
    You can configure [Tyk-Sync]({{< ref "api-management/automations/sync" >}}) to synchronise APIs and Policies with any version control system, like GitHub or GitLab and use it to perform roll back. Keys are not synchronised with Tyk Sync.

2. **How to Backup Configuration Files of Tyk Component's ?**

    Every Tyk component has a config file, that is used during start-up. They store critical settings and parameters that determine how your application behaves as well as settings for databases, passwords, and connections to other components.
    To ensure a comprehensive backup strategy, regularly back up configuration files for all relevant components, using a version control system (such as Git).

3. **What are the different Config file per Tyk component ?**

    These are the config files per component:
    - Tyk Gateway - `tyk.conf` (For any user)
    -  Tyk Pump - `pump.conf` (For any user)
    - Tyk Dashboard - `tyk_analytics.conf` (For Tyk Self-Managed clients)
    - MDCB - `tyk_sink.conf` (for MDCB clients)
    - Hybrid Tyk Gateway - `tyk.hybrid.conf`

    **Note:** These are the config files with Tyk's default names. You might have different names for your config files.

4. **How to Backup Tyk's Certificates Directory ?**
    
    Path to the private keys and certificate are defined in the config files of any of Tyk components. Make sure to back up the certificate and keys used by these config files.

5. **How to Backup Middleware Directory for Custom Plugins ?**

    If you use custom middleware plugins to extend your application's capabilities, regularly back up the middleware directory to preserve your customizations.
    Details on middleware installation for [Tyk Self-Managed users](https://tyk.io/docs/plugins/supported-languages/javascript-middleware/install-middleware/tyk-pro/) (users of the licensed product).
    Details on middleware installation for [Tyk Open Source users](https://tyk.io/docs/plugins/supported-languages/javascript-middleware/install-middleware/tyk-ce/)

    **Note:** Tyk's default name is `/middleware`. You might use a different name for it.


6. **How to Backup Tyk API Definitions Directory - For Tyk Open source users ?**

    When using *Tyk Gateway* as an open-source product, it could use a dedicated directory to load your Tyk API definitions and start serving them. 
    If you use such a directory, ensure these definitions are part of your backup plan.

    **Note:** Tyk's default name is `/apps`. You might use a different name for it based on this [config field](https://tyk.io/docs/tyk-stack/tyk-gateway/important-prerequisites/#tyk-config)

7. **How to Backup Tyk Policies Directory - For Tyk Open source users ?**

    When using *Tyk Gateway* as an open-source product, it could use a file to load policies to be used by API keys when consuming the APIs. 
    If you use a policies file, ensure it is also part of your backup plan.

    **Note:** Tyk's default name is `/policies`. You might use a different name for it based on this [config field](https://tyk.io/docs/tyk-stack/tyk-gateway/important-prerequisites/#path-to-policies-file)

8. **How to Backup Redis ?**

    **Users:** Redis is used in any type of deployment and as such used by any type of user (Open Source and paying users).

    Backup Redis is important as all of the keys used by *Tyk Gateway* are stored there.  
    Redis, being an in-memory data store, is ephemeral and doesn't have a built-in default backup policy, as such it requires specific considerations for backup. 
    To understand the best practices for Redis backup, please visit the official [Redis Backup Documentation](https://redis.io/docs/management/persistence/).


9. **How to Backup Databases Used by Tyk Dashboard - a licensed product ?**

    **Users:** For Tyk Self-managed and MDCB users who are using our licensed products.

    Tyk Dashboard allows you to choose between *MongoDB* and *PostgreSQL* as your database solution, depending on your preferences and requirements. Regardless of your choice, it's crucial to implement a robust backup strategy to ensure the safety and availability of your data. Please check the section that fits your use case:


    **MongoDB Backup**

    MongoDB provides various methods for creating backups, and the choice of strategy often depends on your specific use case and environment. To learn more about MongoDB backup strategies, please refer to the [MongoDB Backup Documentation](https://www.mongodb.com/docs/manual/core/backups/).
    - For *Amazon DocumentDB* user, check their [backup and restore documentation](https://docs.aws.amazon.com/documentdb/latest/developerguide/backup_restore.html)
    - For *CosmosDB* users check their [online backup and on-demand data restore documentation](https://learn.microsoft.com/en-us/azure/cosmos-db/online-backup-and-restore) 

    **Postgres Backup**

    PostgreSQL offers multiple backup options, including logical and physical backups. The right choice depends on your database size, recovery time objectives, and other factors. For detailed information on PostgreSQL backup strategies, please consult the [PostgreSQL Backup and Restore Documentation](https://www.postgresql.org/docs/current/backup.html).

    - For *Amazon RDS* users, check their [backup and restore documentation](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_CommonTasks.BackupRestore.html). To further enhance your PostgreSQL backup process, you can explore services like [AWS RDS Automated Backups](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_WorkingWithAutomatedBackups.html) if you're hosting your database on AWS. 
    - For *CosmosDB* users check their [online backup and on-demand data restore documentation](https://learn.microsoft.com/en-us/azure/cosmos-db/postgresql/concepts-backup) 

## Enterprise Developer Portal

1. **What happens if the Portal goes down ?**

    In the event of the portal application being down, the other components of the Tyk Stack will remain unaffected.
    This means your APIs will still be operational, and analytics will continue to be recorded.
    Developers will also be able to use their credentials for both oAuth2.0 and API Keys APIs.

    However, since the portal application is down, developers won't be able to access their credentials or the analytical dashboard, request access to new API Products, or revoke or rotate their access credentials.
    Additionally, admin users won't be able to use the portal, whether through its UI or APIs.
    This means you won't be able to create, change, or remove any item managed by the portal, such as developers, organizations, content pages, API Products, plans, and more.

    Despite this, you still have some control over access credentials.
    If you need to rotate or remove access credentials, you can do so directly in the Tyk Dashboard or in your identity provider.

2. **What happens if the Dashboard goes down ?**

    If the Tyk Dashboard goes down, developers will still be able to access their access credentials, but they won't be able to rotate or remove their existing credentials, or request access to API Products.
    Additionally, the API Analytics dashboard will be compromised.

    However, API traffic will remain unaffected, meaning that your APIs will continue to be operational, and analytics will continue to be recorded.

    In terms of admin functionality, the only limitation will be the inability to approve or reject access requests or revoke or rotate access credentials.


3. **Does the portal support SQL databases for storing the portal's CMS assets ?**

    {{< note success >}}
    **Note** 

    Tyk no longer supports SQLite as of Tyk 5.7.0. To avoid disruption, please transition to [PostgreSQL]({{< ref"tyk-self-managed#postgresql" >}}), [MongoDB]({{< ref "tyk-self-managed#mongodb" >}}), or one of the listed compatible alternatives.
    {{< /note >}}

    The Enterprise Developer Portal supports SQL databases (MariaDB, MySQL, and PostgreSQL) for storing the portal's CMS assets.
    During the bootstrap process, the portal will create the appropriate tables in the main database. The only thing required to enable SQL storage for the portal's assets is to specify the `db` [storage type]({{< ref "product-stack/tyk-enterprise-developer-portal/deploy/configuration#portal_storage" >}}) either via a config file or an environment variable.

## Tyk Gateway

1. **How to Check Your Gateway Version ?**

    Since Gateway version `5.0.8` or `5.2.3` you can inspect detailed build information including the release version by running `tyk version`.

    ```console
    Release version: v5.3.0-dev
    Built by:        goreleaser
    Build date:      <date>
    Commit:          <commit-hash>
    Go version:      go1.20
    OS/Arch:         linux/amd64
    ```

    If you need this in a machine readable format, a `--json` flag is available.

    ```json
    {
        "Version": "v5.3.0-dev",
        "BuiltBy": "goreleaser",
        "BuildDate": "<date>",
        "Commit": "<commit-hash>",
        "Go": {
            "Os": "linux",
            "Arch": "amd64",
            "Version": "go1.20"
        }
    }
    ```

    For older versions of Gateway, you can run `tyk --version` to print the release version for your tyk binary.

    The binary is installed in `/opt/tyk-gateway/tyk` by default. If your binary is not available in your `PATH` environment, invoke it from there.

    ```
    time="Oct 31 17:06:06" level=info msg="Tyk API Gateway v5.3.0-dev" prefix=main
    ``` 

## Tyk Cloud

1. **How can I track and audit changes made to Tyk Dashboard configurations ?**

    To track changes in Dashboard configurations, please submit a [support ticket](https://support.tyk.io/hc/en-gb/articles/8671452599708-Ticket-Submission-Guide). No configuration changes will occur without your explicit request.

## Miscellaneous

1. **Error initialising system couldn't unmarshal config**

    The error "Error initializing system: couldn't unmarshal config: invalid character" occurs in the Tyk Gateway logs due to improper syntax in the configuration files. To resolve this, carefully review and correct the syntax in all Tyk configuration files, restart the Gateway, and, if the issue persists, validate the JSON files using [JSONLint](https://jsonlint.com/).

2. **All tyk container logs show up under the error status in Datadog logs**

    With Datadog you can view logs of all your Tyk components.
    To allow Datadog Agent to scrape the logs of your Tyk deployment correctly you need to create a pipeline in Datadog, to process and underst and this data.

    To do that, we need to access the `/logs/pipelines` path on your datadog web application.
    This will take us to the pipeline configuration page.
    In here, we will create a new pipeline.
    For the filter section, use `Service:tyk-*` this will capture logs for any of the Tyk related services.

    {{< img src="/img/faq/datadog-logs-showup-as-errors/create-pipeline.png" alt="Create Datadog Logs Pipeline to process Tyk services' logs" >}}

    Next, we will need to add a processor to the pipeline.

    {{< img src="/img/faq/datadog-logs-showup-as-errors/add-processor.png" alt="Create Datadog Logs Pipeline to process Tyk services' logs" >}}

    Select the Grok Parser processor type, give it a name and click on the `Parse My Logs` button and `Create` .

    {{< img src="/img/faq/datadog-logs-showup-as-errors/create-grok-parser-processor.png" alt="Create pipeline processor to parse grok statements" >}}

    Lastly, add another processor to the pipeline. Select the Status Remapper processor type, give it a name and set the status attribute to `level` then `Create`.

    {{< img src="/img/faq/datadog-logs-showup-as-errors/create-status-remapper-processor.png" alt="Create pipeline processor to remap the status of the log to level attribute value" >}}

    The Tyk logs statuses should now be shown under the right status.

    Contact us to learn more:

    {{< button_left href="https://tyk.io/contact/" color="green" content="Contact us" >}}
