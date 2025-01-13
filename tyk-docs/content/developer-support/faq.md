---
date: 2017-03-27T16:05:33+01:00
title: Frequently Asked Questions
tags: ["configuration files backup", "backup tyk", "tyk.conf", "upgrade tyk", "database backup"]
tags: ["Analytics", "Distributed Analytics", "Redis", "Redis Shards", "analytics_config.enable_multiple_analytics_keys" ]
tags: ["do_not_track", "Analytics", "RPS", "Requests Per Second", "CPU", "high load", "high traffic"]
aliases:
    - /frequently-asked-questions/check-current-gateway-version/
    - /developer-support/frequently-asked-questions/what_is_the_performance_impact_of_analytics
    - /frequently-asked-questions/how-to-backup-tyk-cloud-deployment
    - /frequently-asked-questions
    - /frequently-asked-questions/how-to-backup-tyk
    - /developer-support/frequently-asked-questions/how-to-reduce-cpu-usage-in-a-redis-cluster
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
    
    You can configure [Tyk-Sync]({{< ref "/api-management/automations#synchronize-tyk-environment-with-github-repository" >}}) to synchronise APIs and Policies with any version control system, like GitHub or GitLab and use it to perform roll back. Keys are not synchronised with Tyk Sync.

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

## Performance

1. **What Is The Performance Impact Of Analytics ?**

    Tyk Gateway allows analytics to be recorded and stored in a persistent data store (MongoDB/SQL) for all APIs by default, via [Tyk Pump]({{< ref "tyk-stack/tyk-pump/tyk-analytics-record-fields" >}}).

    Tyk Gateway generates transaction records for each API request and response, containing [analytics data]({{< ref "tyk-stack/tyk-pump/tyk-analytics-record-fields" >}}) relating to: the originating host (where the request is coming from), which Tyk API version was used, the HTTP method requested and request path etc.

    The transaction records are transmitted to Redis and subsequently transferred to a persistent [data store]({{< ref "tyk-stack/tyk-pump/other-data-stores" >}}) of your choice via Tyk Pump. Furthermore, Tyk Pump can also be configured to [aggregate]({{< ref "tyk-dashboard-analytics#aggregated-analytics" >}}) the transaction records (using different data keys - API ID, access key, endpoint, response status code, location) and write to a persistent data store. Tyk Dashboard uses this data for:
    - [Aggregated analytics]({{< ref "tyk-dashboard-analytics" >}}) - Displaying analytics based on the aggregated data.
    - [Log Browser]({{< ref "tyk-stack/tyk-manager/analytics/log-browser" >}}) to display raw transaction records.

    **How Do Analytics Impact Performance?**

    Analytics may introduce the problem of increased CPU load and a decrease in the number of requests per second (RPS).

    In the *Tyk Dashboard API* screen below, there are two APIs, *track* and *notrack*. The APIs were created to conduct a simple load test, to show the gateway's RPS (requests per second) for each API:

    - **track**: Traffic to this API is tracked, i.e. transaction records are generated for each request/response.
    - **notrack**: Traffic to this API is not tracked, i.e. transaction records are not generated for each request/response.

    {{< img src="img/faq/do-not-track-usage-scenario/dashboard_apis_measured.png" alt="apis measured in Tyk Dashboard" width="864">}}

    100,000 requests were sent to each API and the rate at which Tyk was able to handle those requests (number of requests per second) was measured. The results for the *tracked* API are displayed in the left pane terminal window; with the right pane showing the results for the *untracked* API.

    **Tracked API Performance**

    {{< img src="img/faq/do-not-track-usage-scenario/track.png" alt="measuring tracked API performance impact" >}}

    **Untracked API Performance**

    {{< img src="img/faq/do-not-track-usage-scenario/notrack.png" alt="measuring do_not_track API performance impact" >}}

    **Explaining the results**

    We can see that **19,253.75** RPS was recorded for the *untracked* API; with **16,743.6011** RPS reported for the *tracked* API. The number of requests per second decreased by **~13%** when analytics was enabled.

    **What Can Be Done To Address This Performance Impact?**

    Tyk is configurable, allowing fine grained control over which information should be recorded and which can be skipped, thus reducing CPU cycles, traffic and storage.

    Users can selectively prevent the generation of analytics for
    [do_not_track]({{<ref "product-stack/tyk-gateway/middleware/do-not-track-middleware">}}) middleware:
    - **Per API**: Tyk Gateway will not create records for requests/responses for any endpoints of an API.
    - **Per Endpoint**: Tyk Gateway will not create records for requests/responses for specific endpoints.

    When set, this prevents Tyk Gateway from generating the transaction records. Without transaction records, Tyk Pump will not transfer analytics to the chosen persistent data store. It's worth noting that the [track middleware]({{< ref "product-stack/tyk-dashboard/advanced-configurations/analytics/activity-by-endpoint" >}}) exclusively influences the generation of *endpoint popularity* aggregated data by Tyk Pump.

    **Conclusion**

    [Disabling]({{<ref "product-stack/tyk-gateway/middleware/do-not-track-middleware">}})  the creation of analytics (either per API or for specific endpoints) helps to reduce CPU cycles and network requests for systems that exhibit high load and traffic, e.g. social media platforms, streaming, financial services and trading platforms.

    Application decisions need to be made concerning which endpoints are non critical and can thus have analytics disabled. Furthermore, benchmarking and testing will be required to evaluate the actual benefits for the application specific use case.

    Subsequently, it is worthwhile monitoring traffic and system load and using this feature to improve performance. 

1. **What does high CPU usage in a Redis node within a Redis Cluster mean ?**

    When a single Redis node within a Redis Cluster exhibits high CPU usage, it indicates that the CPU resources of that particular node are being heavily utilized compared to others in the cluster.

    The illustration below highlights the scenario where a single Redis node is exhibiting high CPU usage of 1.20% within a Redis Cluster. 

    {{< img src="/img/faq/enable-multiple-analytics-keys/redis_single.png" width="768" alt="analytics keys stored in one Redis server" >}}

2. **What could be causing this high CPU usage ?**

    One possible reason for high CPU usage in a single Redis node within a Redis Cluster is that analytics features are enabled and keys are being stored within that specific Redis node.

3. **How does storing keys within a single Redis server contribute to high CPU usage ?**

    A high volume of analytics traffic can decrease performance, since all analytics keys are stored within one Redis server. Storing keys within a single Redis server can lead to increased CPU usage because all operations related to those keys, such as retrieval, updates and analytics processing, are concentrated on that server. This can result in heavier computational loads on that particular node. This leads to high CPU usage.

4. **What can be done to address high CPU usage in this scenario ?**

    Consider distributing the analytics keys across multiple Redis nodes within the cluster. This can help distribute the computational load more evenly, reducing the strain on any single node and potentially alleviating the high CPU usage.

    In Redis, *key sharding* is a term used to describe the practice of distributing data across multiple Redis instances or *shards* based on the keys. This feature is provided by [Redis Cluster](https://redis.io/docs/management/scaling/) and provides horizontal scalability and improved performance. 

    Tyk supports configuring this behavior so that analytics keys are distributed across multiple servers within a Redis cluster. The image below illustrates that CPU usage is reduced across two Redis servers after making this configuration change.

    {{< img src="/img/faq/enable-multiple-analytics-keys/redis_distributed.png" width="600" alt="analytics keys distributed across Redis servers" >}}

5. **How do I configure Tyk to distribute analytics keys to multiple Redis shards ?**

    Follow these steps:

    **1. Check that your Redis Cluster is correctly configured**

    Confirm that the `enable_cluster` configuration option is set to true in the [Tyk Gateway]({{< ref "tyk-oss-gateway/configuration#storageenable_cluster" >}}), [Tyk Dashboard]({{< ref "tyk-dashboard/configuration#enable_cluster" >}}) and [Tyk Pump]({{< ref "tyk-pump/tyk-pump-configuration/tyk-pump-environment-variables#analytics_storage_configenable_cluster" >}}) configuration files. This setting 
    informs Tyk that a Redis Cluster is in use for key storage.

    Ensure that the `addrs` array is populated in the [Tyk Gateway]({{< ref "tyk-oss-gateway/configuration#storageaddrs" >}}) and [Tyk Pump]({{< ref "tyk-pump/tyk-pump-configuration/tyk-pump-environment-variables#analytics_storage_configaddrs" >}}) configuration files (*tyk.conf* and *pump.conf*) with the addresses of all Redis Cluster nodes. If you are using Tyk Self Managed (the licensed product), also update [Tyk Dashboard]({{< ref "tyk-dashboard/configuration#redis_addrs" >}}) configuration file (*tyk_analytics.conf*). This ensures that the Tyk components can interact with the entire Redis Cluster. Please refer to the [configure Redis Cluster]({{< ref "tyk-open-source#redis-cluster-and-tyk-gateway" >}}) guide for further details.

    **2. Configure Tyk to distribute analytics keys to multiple Redis shards**

    To distribute analytics keys across multiple Redis shards effectively you need to configure the Tyk components to leverage the Redis cluster's sharding capabilities:

    1. **Optimize Analytics Configuration**: In the Tyk Gateway configuration (tyk.conf), set [analytics_config.enable_multiple_analytics_keys]({{< ref "tyk-oss-gateway/configuration#analytics_configenable_multiple_analytics_keys" >}}) to true. This option allows Tyk to distribute analytics data across Redis nodes, using multiple keys for the analytics. There's a corresponding option for Self Managed MDCB, also named [enable_multiple_analytics_keys]({{< ref "tyk-multi-data-centre/mdcb-configuration-options#enable_multiple_analytics_keys" >}}). Useful only if the gateways in the data plane are configured to send analytics to MDCB.
    2. **Optimize Connection Pool Settings**: Adjust the [optimization_max_idle]({{< ref "tyk-oss-gateway/configuration#storageoptimisation_max_idle" >}}) and [optimization_max_active]({{< ref "tyk-oss-gateway/configuration#storageoptimisation_max_active" >}}) settings in the configuration files to ensure that the connection pool can handle the analytics workload without overloading any Redis shard.
    3. **Use a Separate Analytics Store**: For high analytics traffic, you can opt to use a dedicated *Redis Cluster* for analytics by setting [enable_separate_analytics_store]({{< ref "tyk-oss-gateway/configuration#enable_separate_analytics_store" >}}) to true in the Tyk Gateway configuration file (*tyk.conf*) and specifying the separate Redis cluster configuration in the `analytics_storage` section. Please consult the [separated analytics storage]({{< ref "tyk-stack/tyk-pump/separated-analytics-storage" >}}) guide for an example with *Tyk Pump* that can equally be applied to *Tyk Gateway*.
    4. **Review and Test**: After implementing these changes, thoroughly review your configurations and conduct load testing to verify that the analytics traffic is now evenly distributed across all Redis shards.

    By following these steps you can enhance the distribution of analytics traffic across the Redis shards. This should lead to improved scalability and performance of your Tyk deployment.

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
