### purge_delay
EV: <b>TYK_PMP_PURGEDELAY</b><br />
Type: `int`<br />

The number of seconds the Pump waits between checking for analytics data and purge it from
Redis.

### purge_chunk
EV: <b>TYK_PMP_PURGECHUNK</b><br />
Type: `int64`<br />

The maximum number of records to pull from Redis at a time. If it's unset or `0`, all the
analytics records in Redis are pulled. If it's set, `storage_expiration_time` is used to
reset the analytics record TTL.

### storage_expiration_time
EV: <b>TYK_PMP_STORAGEEXPIRATIONTIME</b><br />
Type: `int64`<br />

The number of seconds for the analytics records TTL. It only works if `purge_chunk` is
enabled. Defaults to `60` seconds.

### dont_purge_uptime_data
EV: <b>TYK_PMP_DONTPURGEUPTIMEDATA</b><br />
Type: `bool`<br />

Setting this to `false` will create a pump that pushes uptime data to Uptime Pump, so the
Dashboard can read it. Disable by setting to `true`.

### Mongo Uptime Pump
In `uptime_pump_config` you can configure a mongo uptime pump. By default, the uptime pump
is going to be `mongo` type, so it's not necessary to specify it here. The minimum required
configurations for uptime pumps are:

* `collection_name` - That determines the uptime collection name in mongo. By default,
`tyk_uptime_analytics`.
* `mongo_url` - The uptime pump mongo connection url. It is usually something like
"mongodb://username:password@{hostname:port},{hostname:port}/{db_name}".

### uptime_pump_config.mongo_url
EV: <b>TYK_PMP_UPTIMEPUMPCONFIG_MONGOURL</b><br />
Type: `string`<br />


The full URL to your MongoDB instance, this can be a clustered instance if necessary and
should include the database and username / password data.

### uptime_pump_config.mongo_use_ssl
EV: <b>TYK_PMP_UPTIMEPUMPCONFIG_MONGOUSESSL</b><br />
Type: `bool`<br />

Set to true to enable Mongo SSL connection.

### uptime_pump_config.mongo_ssl_insecure_skip_verify
EV: <b>TYK_PMP_UPTIMEPUMPCONFIG_MONGOSSLINSECURESKIPVERIFY</b><br />
Type: `bool`<br />

Allows the use of self-signed certificates when connecting to an encrypted MongoDB database.

### uptime_pump_config.mongo_ssl_allow_invalid_hostnames
EV: <b>TYK_PMP_UPTIMEPUMPCONFIG_MONGOSSLALLOWINVALIDHOSTNAMES</b><br />
Type: `bool`<br />

Ignore hostname check when it differs from the original (for example with SSH tunneling).
The rest of the TLS verification will still be performed.

### uptime_pump_config.mongo_ssl_ca_file
EV: <b>TYK_PMP_UPTIMEPUMPCONFIG_MONGOSSLCAFILE</b><br />
Type: `string`<br />

Path to the PEM file with trusted root certificates

### uptime_pump_config.mongo_ssl_pem_keyfile
EV: <b>TYK_PMP_UPTIMEPUMPCONFIG_MONGOSSLPEMKEYFILE</b><br />
Type: `string`<br />

Path to the PEM file which contains both client certificate and private key. This is
required for Mutual TLS.

### uptime_pump_config.mongo_db_type
EV: <b>TYK_PMP_UPTIMEPUMPCONFIG_MONGODBTYPE</b><br />
Type: `int`<br />

Specifies the mongo DB Type. If it's 0, it means that you are using standard mongo db, if it's 1 it means you are using AWS Document DB, if it's 2, it means you are using CosmosDB.
Defaults to Standard mongo (0).

### uptime_pump_config.omit_index_creation
EV: <b>TYK_PMP_UPTIMEPUMPCONFIG_OMITINDEXCREATION</b><br />
Type: `bool`<br />

Set to true to disable the default tyk index creation.

### uptime_pump_config.mongo_session_consistency
EV: <b>TYK_PMP_UPTIMEPUMPCONFIG_MONGOSESSIONCONSISTENCY</b><br />
Type: `string`<br />

Set the consistency mode for the session, it defaults to `Strong`. The valid values are: strong, monotonic, eventual.

### uptime_pump_config.driver
EV: <b>TYK_PMP_UPTIMEPUMPCONFIG_MONGODRIVERTYPE</b><br />
Type: `string`<br />

MongoDriverType is the type of the driver (library) to use. The valid values are: “mongo-go” and “mgo”.
Default to “mgo”. Check out this guide to [learn about different MongoDB drivers Tyk Pump support](https://github.com/TykTechnologies/tyk-pump#driver-type).

### uptime_pump_config.mongo_direct_connection
EV: <b>TYK_PMP_UPTIMEPUMPCONFIG_MONGODIRECTCONNECTION</b><br />
Type: `bool`<br />

MongoDirectConnection informs whether to establish connections only with the specified seed servers,
or to obtain information for the whole cluster and establish connections with further servers too.
If true, the client will only connect to the host provided in the ConnectionString
and won't attempt to discover other hosts in the cluster. Useful when network restrictions
prevent discovery, such as with SSH tunneling. Default is false.

### uptime_pump_config.collection_name
EV: <b>TYK_PMP_UPTIMEPUMPCONFIG_COLLECTIONNAME</b><br />
Type: `string`<br />

Specifies the mongo collection name.

### uptime_pump_config.max_insert_batch_size_bytes
EV: <b>TYK_PMP_UPTIMEPUMPCONFIG_MAXINSERTBATCHSIZEBYTES</b><br />
Type: `int`<br />

Maximum insert batch size for mongo selective pump. If the batch we are writing surpass this value, it will be send in multiple batchs.
Defaults to 10Mb.

### uptime_pump_config.max_document_size_bytes
EV: <b>TYK_PMP_UPTIMEPUMPCONFIG_MAXDOCUMENTSIZEBYTES</b><br />
Type: `int`<br />

Maximum document size. If the document exceed this value, it will be skipped.
Defaults to 10Mb.

### uptime_pump_config.collection_cap_max_size_bytes
EV: <b>TYK_PMP_UPTIMEPUMPCONFIG_COLLECTIONCAPMAXSIZEBYTES</b><br />
Type: `int`<br />

Amount of bytes of the capped collection in 64bits architectures.
Defaults to 5GB.

### uptime_pump_config.collection_cap_enable
EV: <b>TYK_PMP_UPTIMEPUMPCONFIG_COLLECTIONCAPENABLE</b><br />
Type: `bool`<br />

Enable collection capping. It's used to set a maximum size of the collection.

### SQL Uptime Pump
*Supported in Tyk Pump v1.5.0+*

In `uptime_pump_config` you can configure a SQL uptime pump. To do that, you need to add the
field `uptime_type` with `sql` value. You can also use different types of SQL Uptime pumps,
like `postgres` or `sqlite` using the `type` field.

An example of a SQL Postgres uptime pump would be:
```{.json}
"uptime_pump_config": {
    "uptime_type": "sql",
    "type": "postgres",
    "connection_string": "host=sql_host port=sql_port user=sql_usr dbname=dbname password=sql_pw",
    "table_sharding": false
},
```

Take into account that you can also set `log_level` field into the `uptime_pump_config` to `debug`,
`info` or `warning`. By default, the SQL logger verbosity is `silent`.

### uptime_pump_config.type
EV: <b>TYK_PMP_UPTIMEPUMPCONFIG_TYPE</b><br />
Type: `string`<br />


The supported and tested types are `sqlite` and `postgres`.

### uptime_pump_config.connection_string
EV: <b>TYK_PMP_UPTIMEPUMPCONFIG_CONNECTIONSTRING</b><br />
Type: `string`<br />

Specifies the connection string to the database.

### uptime_pump_config.postgres
EV: <b>TYK_PMP_UPTIMEPUMPCONFIG_POSTGRES</b><br />
Type: `PostgresConfig`<br />

Postgres configurations.

### uptime_pump_config.postgres.prefer_simple_protocol
EV: <b>TYK_PMP_UPTIMEPUMPCONFIG_POSTGRES_PREFERSIMPLEPROTOCOL</b><br />
Type: `bool`<br />

Disables implicit prepared statement usage.

### uptime_pump_config.mysql
EV: <b>TYK_PMP_UPTIMEPUMPCONFIG_MYSQL</b><br />
Type: `MysqlConfig`<br />

Mysql configurations.

### uptime_pump_config.mysql.default_string_size
EV: <b>TYK_PMP_UPTIMEPUMPCONFIG_MYSQL_DEFAULTSTRINGSIZE</b><br />
Type: `uint`<br />

Default size for string fields. Defaults to `256`.

### uptime_pump_config.mysql.disable_datetime_precision
EV: <b>TYK_PMP_UPTIMEPUMPCONFIG_MYSQL_DISABLEDATETIMEPRECISION</b><br />
Type: `bool`<br />

Disable datetime precision, which not supported before MySQL 5.6.

### uptime_pump_config.mysql.dont_support_rename_index
EV: <b>TYK_PMP_UPTIMEPUMPCONFIG_MYSQL_DONTSUPPORTRENAMEINDEX</b><br />
Type: `bool`<br />

Drop & create when rename index, rename index not supported before MySQL 5.7, MariaDB.

### uptime_pump_config.mysql.dont_support_rename_column
EV: <b>TYK_PMP_UPTIMEPUMPCONFIG_MYSQL_DONTSUPPORTRENAMECOLUMN</b><br />
Type: `bool`<br />

`change` when rename column, rename column not supported before MySQL 8, MariaDB.

### uptime_pump_config.mysql.skip_initialize_with_version
EV: <b>TYK_PMP_UPTIMEPUMPCONFIG_MYSQL_SKIPINITIALIZEWITHVERSION</b><br />
Type: `bool`<br />

Auto configure based on currently MySQL version.

### uptime_pump_config.table_sharding
EV: <b>TYK_PMP_UPTIMEPUMPCONFIG_TABLESHARDING</b><br />
Type: `bool`<br />

Specifies if all the analytics records are going to be stored in one table or in multiple
tables (one per day). By default, `false`. If `false`, all the records are going to be
stored in `tyk_aggregated` table. Instead, if it's `true`, all the records of the day are
going to be stored in `tyk_aggregated_YYYYMMDD` table, where `YYYYMMDD` is going to change
depending on the date.

### uptime_pump_config.log_level
EV: <b>TYK_PMP_UPTIMEPUMPCONFIG_LOGLEVEL</b><br />
Type: `string`<br />

Specifies the SQL log verbosity. The possible values are: `info`,`error` and `warning`. By
default, the value is `silent`, which means that it won't log any SQL query.

### uptime_pump_config.batch_size
EV: <b>TYK_PMP_UPTIMEPUMPCONFIG_BATCHSIZE</b><br />
Type: `int`<br />

Specifies the amount of records that are going to be written each batch. Type int. By
default, it writes 1000 records max per batch.

### uptime_pump_config.uptime_type
EV: <b>TYK_PMP_UPTIMEPUMPCONFIG_UPTIMETYPE</b><br />
Type: `string`<br />

Determines the uptime type. Options are `mongo` and `sql`. Defaults to `mongo`.

### pumps
The default environment variable prefix for each pump follows this format:
`TYK_PMP_PUMPS_{PUMP-NAME}_`, for example `TYK_PMP_PUMPS_KAFKA_`.

You can also set custom names for each pump specifying the pump type. For example, if you
want a Kafka pump which is called `PROD` you need to create `TYK_PMP_PUMPS_PROD_TYPE=kafka`
and configure it using the `TYK_PMP_PUMPS_PROD_` prefix.

### pumps.csv.name
EV: <b>TYK_PMP_PUMPS_CSV_NAME</b><br />
Type: `string`<br />

Deprecated.

### pumps.csv.type
EV: <b>TYK_PMP_PUMPS_CSV_TYPE</b><br />
Type: `string`<br />

Sets the pump type. This is needed when the pump key does not equal to the pump name type.

### pumps.csv.filters
This feature adds a new configuration field in each pump called filters and its structure is
the following:
```{.json}
"filters":{
  "api_ids":[],
  "org_ids":[],
  "response_codes":[],
  "skip_api_ids":[],
  "skip_org_ids":[],
  "skip_response_codes":[]
}
```
The fields api_ids, org_ids and response_codes works as allow list (APIs and orgs where we
want to send the analytics records) and the fields skip_api_ids, skip_org_ids and
skip_response_codes works as block list.

The priority is always block list configurations over allow list.

An example of configuration would be:
```{.json}
"csv": {
 "type": "csv",
 "filters": {
   "org_ids": ["org1","org2"]
 },
 "meta": {
   "csv_dir": "./bar"
 }
}
```

### pumps.csv.filters.org_ids
EV: <b>TYK_PMP_PUMPS_CSV_FILTERS_ORGSIDS</b><br />
Type: `[]string`<br />

Filters pump data by the whitelisted org_ids.

### pumps.csv.filters.api_ids
EV: <b>TYK_PMP_PUMPS_CSV_FILTERS_APIIDS</b><br />
Type: `[]string`<br />

Filters pump data by the whitelisted api_ids.

### pumps.csv.filters.response_codes
EV: <b>TYK_PMP_PUMPS_CSV_FILTERS_RESPONSECODES</b><br />
Type: `[]int`<br />

Filters pump data by the whitelisted response_codes.

### pumps.csv.filters.skip_org_ids
EV: <b>TYK_PMP_PUMPS_CSV_FILTERS_SKIPPEDORGSIDS</b><br />
Type: `[]string`<br />

Filters pump data by the blacklisted org_ids.

### pumps.csv.filters.skip_api_ids
EV: <b>TYK_PMP_PUMPS_CSV_FILTERS_SKIPPEDAPIIDS</b><br />
Type: `[]string`<br />

Filters pump data by the blacklisted api_ids.

### pumps.csv.filters.skip_response_codes
EV: <b>TYK_PMP_PUMPS_CSV_FILTERS_SKIPPEDRESPONSECODES</b><br />
Type: `[]int`<br />

Filters pump data by the blacklisted response_codes.

### pumps.csv.timeout
EV: <b>TYK_PMP_PUMPS_CSV_TIMEOUT</b><br />
Type: `int`<br />

By default, a pump will wait forever for each write operation to complete; you can configure an optional timeout by setting the configuration option `timeout`.
If you have deployed multiple pumps, then you can configure each timeout independently. The timeout is in seconds and defaults to 0.

The timeout is configured within the main pump config as shown here; note that this example would configure a 5 second timeout:
```{.json}
"pump_name": {
  ...
  "timeout":5,
  "meta": {...}
}
```

Tyk will inform you if the pump's write operation is taking longer than the purging loop (configured via `purge_delay`) as this will mean that data is purged before being written to the target data sink.

If there is no timeout configured and pump's write operation is taking longer than the purging loop, the following warning log will be generated:
`Pump {pump_name} is taking more time than the value configured of purge_delay. You should try to set a timeout for this pump.`

If there is a timeout configured, but pump's write operation is still taking longer than the purging loop, the following warning log will be generated:
`Pump {pump_name} is taking more time than the value configured of purge_delay. You should try lowering the timeout configured for this pump.`.

### pumps.csv.omit_detailed_recording
EV: <b>TYK_PMP_PUMPS_CSV_OMITDETAILEDRECORDING</b><br />
Type: `bool`<br />

Setting this to true will avoid writing raw_request and raw_response fields for each request
in pumps. Defaults to `false`.

### pumps.csv.max_record_size
EV: <b>TYK_PMP_PUMPS_CSV_MAXRECORDSIZE</b><br />
Type: `int`<br />

Defines maximum size (in bytes) for Raw Request and Raw Response logs, this value defaults
to 0. If it is not set then tyk-pump will not trim any data and will store the full
information. This can also be set at a pump level. For example:
```{.json}
"csv": {
  "type": "csv",
  "max_record_size":1000,
  "meta": {
    "csv_dir": "./"
  }
}
```

### pumps.csv.meta.csv_dir
EV: <b>TYK_PMP_PUMPS_CSV_META_CSVDIR</b><br />
Type: `string`<br />

The directory and the filename where the CSV data will be stored.

### pumps.dogstatsd.name
EV: <b>TYK_PMP_PUMPS_DOGSTATSD_NAME</b><br />
Type: `string`<br />

Deprecated.

### pumps.dogstatsd.type
EV: <b>TYK_PMP_PUMPS_DOGSTATSD_TYPE</b><br />
Type: `string`<br />

Sets the pump type. This is needed when the pump key does not equal to the pump name type.

### pumps.dogstatsd.filters
This feature adds a new configuration field in each pump called filters and its structure is
the following:
```{.json}
"filters":{
  "api_ids":[],
  "org_ids":[],
  "response_codes":[],
  "skip_api_ids":[],
  "skip_org_ids":[],
  "skip_response_codes":[]
}
```
The fields api_ids, org_ids and response_codes works as allow list (APIs and orgs where we
want to send the analytics records) and the fields skip_api_ids, skip_org_ids and
skip_response_codes works as block list.

The priority is always block list configurations over allow list.

An example of configuration would be:
```{.json}
"csv": {
 "type": "csv",
 "filters": {
   "org_ids": ["org1","org2"]
 },
 "meta": {
   "csv_dir": "./bar"
 }
}
```

### pumps.dogstatsd.filters.org_ids
EV: <b>TYK_PMP_PUMPS_DOGSTATSD_FILTERS_ORGSIDS</b><br />
Type: `[]string`<br />

Filters pump data by the whitelisted org_ids.

### pumps.dogstatsd.filters.api_ids
EV: <b>TYK_PMP_PUMPS_DOGSTATSD_FILTERS_APIIDS</b><br />
Type: `[]string`<br />

Filters pump data by the whitelisted api_ids.

### pumps.dogstatsd.filters.response_codes
EV: <b>TYK_PMP_PUMPS_DOGSTATSD_FILTERS_RESPONSECODES</b><br />
Type: `[]int`<br />

Filters pump data by the whitelisted response_codes.

### pumps.dogstatsd.filters.skip_org_ids
EV: <b>TYK_PMP_PUMPS_DOGSTATSD_FILTERS_SKIPPEDORGSIDS</b><br />
Type: `[]string`<br />

Filters pump data by the blacklisted org_ids.

### pumps.dogstatsd.filters.skip_api_ids
EV: <b>TYK_PMP_PUMPS_DOGSTATSD_FILTERS_SKIPPEDAPIIDS</b><br />
Type: `[]string`<br />

Filters pump data by the blacklisted api_ids.

### pumps.dogstatsd.filters.skip_response_codes
EV: <b>TYK_PMP_PUMPS_DOGSTATSD_FILTERS_SKIPPEDRESPONSECODES</b><br />
Type: `[]int`<br />

Filters pump data by the blacklisted response_codes.

### pumps.dogstatsd.timeout
EV: <b>TYK_PMP_PUMPS_DOGSTATSD_TIMEOUT</b><br />
Type: `int`<br />

By default, a pump will wait forever for each write operation to complete; you can configure an optional timeout by setting the configuration option `timeout`.
If you have deployed multiple pumps, then you can configure each timeout independently. The timeout is in seconds and defaults to 0.

The timeout is configured within the main pump config as shown here; note that this example would configure a 5 second timeout:
```{.json}
"pump_name": {
  ...
  "timeout":5,
  "meta": {...}
}
```

Tyk will inform you if the pump's write operation is taking longer than the purging loop (configured via `purge_delay`) as this will mean that data is purged before being written to the target data sink.

If there is no timeout configured and pump's write operation is taking longer than the purging loop, the following warning log will be generated:
`Pump {pump_name} is taking more time than the value configured of purge_delay. You should try to set a timeout for this pump.`

If there is a timeout configured, but pump's write operation is still taking longer than the purging loop, the following warning log will be generated:
`Pump {pump_name} is taking more time than the value configured of purge_delay. You should try lowering the timeout configured for this pump.`.

### pumps.dogstatsd.omit_detailed_recording
EV: <b>TYK_PMP_PUMPS_DOGSTATSD_OMITDETAILEDRECORDING</b><br />
Type: `bool`<br />

Setting this to true will avoid writing raw_request and raw_response fields for each request
in pumps. Defaults to `false`.

### pumps.dogstatsd.max_record_size
EV: <b>TYK_PMP_PUMPS_DOGSTATSD_MAXRECORDSIZE</b><br />
Type: `int`<br />

Defines maximum size (in bytes) for Raw Request and Raw Response logs, this value defaults
to 0. If it is not set then tyk-pump will not trim any data and will store the full
information. This can also be set at a pump level. For example:
```{.json}
"csv": {
  "type": "csv",
  "max_record_size":1000,
  "meta": {
    "csv_dir": "./"
  }
}
```

### pumps.dogstatsd.meta.namespace
EV: <b>TYK_PMP_PUMPS_DOGSTATSD_META_NAMESPACE</b><br />
Type: `string`<br />

Prefix for your metrics to datadog.

### pumps.dogstatsd.meta.address
EV: <b>TYK_PMP_PUMPS_DOGSTATSD_META_ADDRESS</b><br />
Type: `string`<br />

Address of the datadog agent including host & port.

### pumps.dogstatsd.meta.sample_rate
EV: <b>TYK_PMP_PUMPS_DOGSTATSD_META_SAMPLERATE</b><br />
Type: `float64`<br />

Defaults to `1` which equates to `100%` of requests. To sample at `50%`, set to `0.5`.

### pumps.dogstatsd.meta.async_uds
EV: <b>TYK_PMP_PUMPS_DOGSTATSD_META_ASYNCUDS</b><br />
Type: `bool`<br />

Enable async UDS over UDP https://github.com/Datadog/datadog-go#unix-domain-sockets-client.

### pumps.dogstatsd.meta.async_uds_write_timeout_seconds
EV: <b>TYK_PMP_PUMPS_DOGSTATSD_META_ASYNCUDSWRITETIMEOUT</b><br />
Type: `int`<br />

Integer write timeout in seconds if `async_uds: true`.

### pumps.dogstatsd.meta.buffered
EV: <b>TYK_PMP_PUMPS_DOGSTATSD_META_BUFFERED</b><br />
Type: `bool`<br />

Enable buffering of messages.

### pumps.dogstatsd.meta.buffered_max_messages
EV: <b>TYK_PMP_PUMPS_DOGSTATSD_META_BUFFEREDMAXMESSAGES</b><br />
Type: `int`<br />

Max messages in single datagram if `buffered: true`. Default 16.

### pumps.dogstatsd.meta.tags
EV: <b>TYK_PMP_PUMPS_DOGSTATSD_META_TAGS</b><br />
Type: `[]string`<br />

List of tags to be added to the metric. The possible options are listed in the below example.

If no tag is specified the fallback behavior is to use the below tags:
- `path`
- `method`
- `response_code`
- `api_version`
- `api_name`
- `api_id`
- `org_id`
- `tracked`
- `oauth_id`

Note that this configuration can generate significant charges due to the unbound nature of
the `path` tag.

```{.json}
"dogstatsd": {
  "type": "dogstatsd",
  "meta": {
    "address": "localhost:8125",
    "namespace": "pump",
    "async_uds": true,
    "async_uds_write_timeout_seconds": 2,
    "buffered": true,
    "buffered_max_messages": 32,
    "sample_rate": 0.5,
    "tags": [
      "method",
      "response_code",
      "api_version",
      "api_name",
      "api_id",
      "org_id",
      "tracked",
      "path",
      "oauth_id"
    ]
  }
},
```

On startup, you should see the loaded configs when initializing the dogstatsd pump
```
[May 10 15:23:44]  INFO dogstatsd: initializing pump
[May 10 15:23:44]  INFO dogstatsd: namespace: pump.
[May 10 15:23:44]  INFO dogstatsd: sample_rate: 50%
[May 10 15:23:44]  INFO dogstatsd: buffered: true, max_messages: 32
[May 10 15:23:44]  INFO dogstatsd: async_uds: true, write_timeout: 2s
```

### pumps.elasticsearch.name
EV: <b>TYK_PMP_PUMPS_ELASTICSEARCH_NAME</b><br />
Type: `string`<br />

Deprecated.

### pumps.elasticsearch.type
EV: <b>TYK_PMP_PUMPS_ELASTICSEARCH_TYPE</b><br />
Type: `string`<br />

Sets the pump type. This is needed when the pump key does not equal to the pump name type.

### pumps.elasticsearch.filters
This feature adds a new configuration field in each pump called filters and its structure is
the following:
```{.json}
"filters":{
  "api_ids":[],
  "org_ids":[],
  "response_codes":[],
  "skip_api_ids":[],
  "skip_org_ids":[],
  "skip_response_codes":[]
}
```
The fields api_ids, org_ids and response_codes works as allow list (APIs and orgs where we
want to send the analytics records) and the fields skip_api_ids, skip_org_ids and
skip_response_codes works as block list.

The priority is always block list configurations over allow list.

An example of configuration would be:
```{.json}
"csv": {
 "type": "csv",
 "filters": {
   "org_ids": ["org1","org2"]
 },
 "meta": {
   "csv_dir": "./bar"
 }
}
```

### pumps.elasticsearch.filters.org_ids
EV: <b>TYK_PMP_PUMPS_ELASTICSEARCH_FILTERS_ORGSIDS</b><br />
Type: `[]string`<br />

Filters pump data by the whitelisted org_ids.

### pumps.elasticsearch.filters.api_ids
EV: <b>TYK_PMP_PUMPS_ELASTICSEARCH_FILTERS_APIIDS</b><br />
Type: `[]string`<br />

Filters pump data by the whitelisted api_ids.

### pumps.elasticsearch.filters.response_codes
EV: <b>TYK_PMP_PUMPS_ELASTICSEARCH_FILTERS_RESPONSECODES</b><br />
Type: `[]int`<br />

Filters pump data by the whitelisted response_codes.

### pumps.elasticsearch.filters.skip_org_ids
EV: <b>TYK_PMP_PUMPS_ELASTICSEARCH_FILTERS_SKIPPEDORGSIDS</b><br />
Type: `[]string`<br />

Filters pump data by the blacklisted org_ids.

### pumps.elasticsearch.filters.skip_api_ids
EV: <b>TYK_PMP_PUMPS_ELASTICSEARCH_FILTERS_SKIPPEDAPIIDS</b><br />
Type: `[]string`<br />

Filters pump data by the blacklisted api_ids.

### pumps.elasticsearch.filters.skip_response_codes
EV: <b>TYK_PMP_PUMPS_ELASTICSEARCH_FILTERS_SKIPPEDRESPONSECODES</b><br />
Type: `[]int`<br />

Filters pump data by the blacklisted response_codes.

### pumps.elasticsearch.timeout
EV: <b>TYK_PMP_PUMPS_ELASTICSEARCH_TIMEOUT</b><br />
Type: `int`<br />

By default, a pump will wait forever for each write operation to complete; you can configure an optional timeout by setting the configuration option `timeout`.
If you have deployed multiple pumps, then you can configure each timeout independently. The timeout is in seconds and defaults to 0.

The timeout is configured within the main pump config as shown here; note that this example would configure a 5 second timeout:
```{.json}
"pump_name": {
  ...
  "timeout":5,
  "meta": {...}
}
```

Tyk will inform you if the pump's write operation is taking longer than the purging loop (configured via `purge_delay`) as this will mean that data is purged before being written to the target data sink.

If there is no timeout configured and pump's write operation is taking longer than the purging loop, the following warning log will be generated:
`Pump {pump_name} is taking more time than the value configured of purge_delay. You should try to set a timeout for this pump.`

If there is a timeout configured, but pump's write operation is still taking longer than the purging loop, the following warning log will be generated:
`Pump {pump_name} is taking more time than the value configured of purge_delay. You should try lowering the timeout configured for this pump.`.

### pumps.elasticsearch.omit_detailed_recording
EV: <b>TYK_PMP_PUMPS_ELASTICSEARCH_OMITDETAILEDRECORDING</b><br />
Type: `bool`<br />

Setting this to true will avoid writing raw_request and raw_response fields for each request
in pumps. Defaults to `false`.

### pumps.elasticsearch.max_record_size
EV: <b>TYK_PMP_PUMPS_ELASTICSEARCH_MAXRECORDSIZE</b><br />
Type: `int`<br />

Defines maximum size (in bytes) for Raw Request and Raw Response logs, this value defaults
to 0. If it is not set then tyk-pump will not trim any data and will store the full
information. This can also be set at a pump level. For example:
```{.json}
"csv": {
  "type": "csv",
  "max_record_size":1000,
  "meta": {
    "csv_dir": "./"
  }
}
```

### pumps.elasticsearch.meta.index_name
EV: <b>TYK_PMP_PUMPS_ELASTICSEARCH_META_INDEXNAME</b><br />
Type: `string`<br />

The name of the index that all the analytics data will be placed in. Defaults to
"tyk_analytics".

### pumps.elasticsearch.meta.elasticsearch_url
EV: <b>TYK_PMP_PUMPS_ELASTICSEARCH_META_ELASTICSEARCHURL</b><br />
Type: `string`<br />

If sniffing is disabled, the URL that all data will be sent to. Defaults to
"http://localhost:9200".

### pumps.elasticsearch.meta.use_sniffing
EV: <b>TYK_PMP_PUMPS_ELASTICSEARCH_META_ENABLESNIFFING</b><br />
Type: `bool`<br />

If sniffing is enabled, the "elasticsearch_url" will be used to make a request to get a
list of all the nodes in the cluster, the returned addresses will then be used. Defaults to
`false`.

### pumps.elasticsearch.meta.document_type
EV: <b>TYK_PMP_PUMPS_ELASTICSEARCH_META_DOCUMENTTYPE</b><br />
Type: `string`<br />

The type of the document that is created in ES. Defaults to "tyk_analytics".

### pumps.elasticsearch.meta.rolling_index
EV: <b>TYK_PMP_PUMPS_ELASTICSEARCH_META_ROLLINGINDEX</b><br />
Type: `bool`<br />

Appends the date to the end of the index name, so each days data is split into a different
index name. E.g. tyk_analytics-2016.02.28. Defaults to `false`.

### pumps.elasticsearch.meta.extended_stats
EV: <b>TYK_PMP_PUMPS_ELASTICSEARCH_META_EXTENDEDSTATISTICS</b><br />
Type: `bool`<br />

If set to `true` will include the following additional fields: Raw Request, Raw Response and
User Agent.

### pumps.elasticsearch.meta.generate_id
EV: <b>TYK_PMP_PUMPS_ELASTICSEARCH_META_GENERATEID</b><br />
Type: `bool`<br />

When enabled, generate _id for outgoing records. This prevents duplicate records when
retrying ES.

### pumps.elasticsearch.meta.decode_base64
EV: <b>TYK_PMP_PUMPS_ELASTICSEARCH_META_DECODEBASE64</b><br />
Type: `bool`<br />

Allows for the base64 bits to be decode before being passed to ES.

### pumps.elasticsearch.meta.version
EV: <b>TYK_PMP_PUMPS_ELASTICSEARCH_META_VERSION</b><br />
Type: `string`<br />

Specifies the ES version. Use "3" for ES 3.X, "5" for ES 5.X, "6" for ES 6.X, "7" for ES
7.X . Defaults to "3".

### pumps.elasticsearch.meta.disable_bulk
EV: <b>TYK_PMP_PUMPS_ELASTICSEARCH_META_DISABLEBULK</b><br />
Type: `bool`<br />

Disable batch writing. Defaults to false.

### pumps.elasticsearch.meta.bulk_config
Batch writing trigger configuration. Each option is an OR with eachother:

### pumps.elasticsearch.meta.bulk_config.workers
EV: <b>TYK_PMP_PUMPS_ELASTICSEARCH_META_BULKCONFIG_WORKERS</b><br />
Type: `int`<br />

Number of workers. Defaults to 1.

### pumps.elasticsearch.meta.bulk_config.flush_interval
EV: <b>TYK_PMP_PUMPS_ELASTICSEARCH_META_BULKCONFIG_FLUSHINTERVAL</b><br />
Type: `int`<br />

Specifies the time in seconds to flush the data and send it to ES. Default disabled.

### pumps.elasticsearch.meta.bulk_config.bulk_actions
EV: <b>TYK_PMP_PUMPS_ELASTICSEARCH_META_BULKCONFIG_BULKACTIONS</b><br />
Type: `int`<br />

Specifies the number of requests needed to flush the data and send it to ES. Defaults to
1000 requests. If it is needed, can be disabled with -1.

### pumps.elasticsearch.meta.bulk_config.bulk_size
EV: <b>TYK_PMP_PUMPS_ELASTICSEARCH_META_BULKCONFIG_BULKSIZE</b><br />
Type: `int`<br />

Specifies the size (in bytes) needed to flush the data and send it to ES. Defaults to 5MB.
If it is needed, can be disabled with -1.

### pumps.elasticsearch.meta.auth_api_key_id
EV: <b>TYK_PMP_PUMPS_ELASTICSEARCH_META_AUTHAPIKEYID</b><br />
Type: `string`<br />

API Key ID used for APIKey auth in ES. It's send to ES in the Authorization header as ApiKey base64(auth_api_key_id:auth_api_key)

### pumps.elasticsearch.meta.auth_api_key
EV: <b>TYK_PMP_PUMPS_ELASTICSEARCH_META_AUTHAPIKEY</b><br />
Type: `string`<br />

API Key used for APIKey auth in ES. It's send to ES in the Authorization header as ApiKey base64(auth_api_key_id:auth_api_key)

### pumps.elasticsearch.meta.auth_basic_username
EV: <b>TYK_PMP_PUMPS_ELASTICSEARCH_META_USERNAME</b><br />
Type: `string`<br />

Basic auth username. It's send to ES in the Authorization header as username:password encoded in base64.

### pumps.elasticsearch.meta.auth_basic_password
EV: <b>TYK_PMP_PUMPS_ELASTICSEARCH_META_PASSWORD</b><br />
Type: `string`<br />

Basic auth password. It's send to ES in the Authorization header as username:password encoded in base64.

### pumps.elasticsearch.meta.use_ssl
EV: <b>TYK_PMP_PUMPS_ELASTICSEARCH_META_USESSL</b><br />
Type: `bool`<br />

Enables SSL connection.

### pumps.elasticsearch.meta.ssl_insecure_skip_verify
EV: <b>TYK_PMP_PUMPS_ELASTICSEARCH_META_SSLINSECURESKIPVERIFY</b><br />
Type: `bool`<br />

Controls whether the pump client verifies the Elastic Search server's certificate chain and hostname.

### pumps.elasticsearch.meta.ssl_cert_file
EV: <b>TYK_PMP_PUMPS_ELASTICSEARCH_META_SSLCERTFILE</b><br />
Type: `string`<br />

Can be used to set custom certificate file for authentication with Elastic Search.

### pumps.elasticsearch.meta.ssl_key_file
EV: <b>TYK_PMP_PUMPS_ELASTICSEARCH_META_SSLKEYFILE</b><br />
Type: `string`<br />

Can be used to set custom key file for authentication with Elastic Search.

### pumps.graylog.name
EV: <b>TYK_PMP_PUMPS_GRAYLOG_NAME</b><br />
Type: `string`<br />

Deprecated.

### pumps.graylog.type
EV: <b>TYK_PMP_PUMPS_GRAYLOG_TYPE</b><br />
Type: `string`<br />

Sets the pump type. This is needed when the pump key does not equal to the pump name type.

### pumps.graylog.filters
This feature adds a new configuration field in each pump called filters and its structure is
the following:
```{.json}
"filters":{
  "api_ids":[],
  "org_ids":[],
  "response_codes":[],
  "skip_api_ids":[],
  "skip_org_ids":[],
  "skip_response_codes":[]
}
```
The fields api_ids, org_ids and response_codes works as allow list (APIs and orgs where we
want to send the analytics records) and the fields skip_api_ids, skip_org_ids and
skip_response_codes works as block list.

The priority is always block list configurations over allow list.

An example of configuration would be:
```{.json}
"csv": {
 "type": "csv",
 "filters": {
   "org_ids": ["org1","org2"]
 },
 "meta": {
   "csv_dir": "./bar"
 }
}
```

### pumps.graylog.filters.org_ids
EV: <b>TYK_PMP_PUMPS_GRAYLOG_FILTERS_ORGSIDS</b><br />
Type: `[]string`<br />

Filters pump data by the whitelisted org_ids.

### pumps.graylog.filters.api_ids
EV: <b>TYK_PMP_PUMPS_GRAYLOG_FILTERS_APIIDS</b><br />
Type: `[]string`<br />

Filters pump data by the whitelisted api_ids.

### pumps.graylog.filters.response_codes
EV: <b>TYK_PMP_PUMPS_GRAYLOG_FILTERS_RESPONSECODES</b><br />
Type: `[]int`<br />

Filters pump data by the whitelisted response_codes.

### pumps.graylog.filters.skip_org_ids
EV: <b>TYK_PMP_PUMPS_GRAYLOG_FILTERS_SKIPPEDORGSIDS</b><br />
Type: `[]string`<br />

Filters pump data by the blacklisted org_ids.

### pumps.graylog.filters.skip_api_ids
EV: <b>TYK_PMP_PUMPS_GRAYLOG_FILTERS_SKIPPEDAPIIDS</b><br />
Type: `[]string`<br />

Filters pump data by the blacklisted api_ids.

### pumps.graylog.filters.skip_response_codes
EV: <b>TYK_PMP_PUMPS_GRAYLOG_FILTERS_SKIPPEDRESPONSECODES</b><br />
Type: `[]int`<br />

Filters pump data by the blacklisted response_codes.

### pumps.graylog.timeout
EV: <b>TYK_PMP_PUMPS_GRAYLOG_TIMEOUT</b><br />
Type: `int`<br />

By default, a pump will wait forever for each write operation to complete; you can configure an optional timeout by setting the configuration option `timeout`.
If you have deployed multiple pumps, then you can configure each timeout independently. The timeout is in seconds and defaults to 0.

The timeout is configured within the main pump config as shown here; note that this example would configure a 5 second timeout:
```{.json}
"pump_name": {
  ...
  "timeout":5,
  "meta": {...}
}
```

Tyk will inform you if the pump's write operation is taking longer than the purging loop (configured via `purge_delay`) as this will mean that data is purged before being written to the target data sink.

If there is no timeout configured and pump's write operation is taking longer than the purging loop, the following warning log will be generated:
`Pump {pump_name} is taking more time than the value configured of purge_delay. You should try to set a timeout for this pump.`

If there is a timeout configured, but pump's write operation is still taking longer than the purging loop, the following warning log will be generated:
`Pump {pump_name} is taking more time than the value configured of purge_delay. You should try lowering the timeout configured for this pump.`.

### pumps.graylog.omit_detailed_recording
EV: <b>TYK_PMP_PUMPS_GRAYLOG_OMITDETAILEDRECORDING</b><br />
Type: `bool`<br />

Setting this to true will avoid writing raw_request and raw_response fields for each request
in pumps. Defaults to `false`.

### pumps.graylog.max_record_size
EV: <b>TYK_PMP_PUMPS_GRAYLOG_MAXRECORDSIZE</b><br />
Type: `int`<br />

Defines maximum size (in bytes) for Raw Request and Raw Response logs, this value defaults
to 0. If it is not set then tyk-pump will not trim any data and will store the full
information. This can also be set at a pump level. For example:
```{.json}
"csv": {
  "type": "csv",
  "max_record_size":1000,
  "meta": {
    "csv_dir": "./"
  }
}
```

### pumps.graylog.meta.host
EV: <b>TYK_PMP_PUMPS_GRAYLOG_META_GRAYLOGHOST</b><br />
Type: `string`<br />

Graylog host.

### pumps.graylog.meta.port
EV: <b>TYK_PMP_PUMPS_GRAYLOG_META_GRAYLOGPORT</b><br />
Type: `int`<br />

Graylog port.

### pumps.graylog.meta.tags
EV: <b>TYK_PMP_PUMPS_GRAYLOG_META_TAGS</b><br />
Type: `[]string`<br />

List of tags to be added to the metric. The possible options are listed in the below example.

If no tag is specified the fallback behaviour is to don't send anything.
The possible values are:
- `path`
- `method`
- `response_code`
- `api_version`
- `api_name`
- `api_id`
- `org_id`
- `tracked`
- `oauth_id`
- `raw_request`
- `raw_response`
- `request_time`
- `ip_address`

### pumps.hybrid.name
EV: <b>TYK_PMP_PUMPS_HYBRID_NAME</b><br />
Type: `string`<br />

Deprecated.

### pumps.hybrid.type
EV: <b>TYK_PMP_PUMPS_HYBRID_TYPE</b><br />
Type: `string`<br />

Sets the pump type. This is needed when the pump key does not equal to the pump name type.

### pumps.hybrid.filters
This feature adds a new configuration field in each pump called filters and its structure is
the following:
```{.json}
"filters":{
  "api_ids":[],
  "org_ids":[],
  "response_codes":[],
  "skip_api_ids":[],
  "skip_org_ids":[],
  "skip_response_codes":[]
}
```
The fields api_ids, org_ids and response_codes works as allow list (APIs and orgs where we
want to send the analytics records) and the fields skip_api_ids, skip_org_ids and
skip_response_codes works as block list.

The priority is always block list configurations over allow list.

An example of configuration would be:
```{.json}
"csv": {
 "type": "csv",
 "filters": {
   "org_ids": ["org1","org2"]
 },
 "meta": {
   "csv_dir": "./bar"
 }
}
```

### pumps.hybrid.filters.org_ids
EV: <b>TYK_PMP_PUMPS_HYBRID_FILTERS_ORGSIDS</b><br />
Type: `[]string`<br />

Filters pump data by the whitelisted org_ids.

### pumps.hybrid.filters.api_ids
EV: <b>TYK_PMP_PUMPS_HYBRID_FILTERS_APIIDS</b><br />
Type: `[]string`<br />

Filters pump data by the whitelisted api_ids.

### pumps.hybrid.filters.response_codes
EV: <b>TYK_PMP_PUMPS_HYBRID_FILTERS_RESPONSECODES</b><br />
Type: `[]int`<br />

Filters pump data by the whitelisted response_codes.

### pumps.hybrid.filters.skip_org_ids
EV: <b>TYK_PMP_PUMPS_HYBRID_FILTERS_SKIPPEDORGSIDS</b><br />
Type: `[]string`<br />

Filters pump data by the blacklisted org_ids.

### pumps.hybrid.filters.skip_api_ids
EV: <b>TYK_PMP_PUMPS_HYBRID_FILTERS_SKIPPEDAPIIDS</b><br />
Type: `[]string`<br />

Filters pump data by the blacklisted api_ids.

### pumps.hybrid.filters.skip_response_codes
EV: <b>TYK_PMP_PUMPS_HYBRID_FILTERS_SKIPPEDRESPONSECODES</b><br />
Type: `[]int`<br />

Filters pump data by the blacklisted response_codes.

### pumps.hybrid.timeout
EV: <b>TYK_PMP_PUMPS_HYBRID_TIMEOUT</b><br />
Type: `int`<br />

By default, a pump will wait forever for each write operation to complete; you can configure an optional timeout by setting the configuration option `timeout`.
If you have deployed multiple pumps, then you can configure each timeout independently. The timeout is in seconds and defaults to 0.

The timeout is configured within the main pump config as shown here; note that this example would configure a 5 second timeout:
```{.json}
"pump_name": {
  ...
  "timeout":5,
  "meta": {...}
}
```

Tyk will inform you if the pump's write operation is taking longer than the purging loop (configured via `purge_delay`) as this will mean that data is purged before being written to the target data sink.

If there is no timeout configured and pump's write operation is taking longer than the purging loop, the following warning log will be generated:
`Pump {pump_name} is taking more time than the value configured of purge_delay. You should try to set a timeout for this pump.`

If there is a timeout configured, but pump's write operation is still taking longer than the purging loop, the following warning log will be generated:
`Pump {pump_name} is taking more time than the value configured of purge_delay. You should try lowering the timeout configured for this pump.`.

### pumps.hybrid.omit_detailed_recording
EV: <b>TYK_PMP_PUMPS_HYBRID_OMITDETAILEDRECORDING</b><br />
Type: `bool`<br />

Setting this to true will avoid writing raw_request and raw_response fields for each request
in pumps. Defaults to `false`.

### pumps.hybrid.max_record_size
EV: <b>TYK_PMP_PUMPS_HYBRID_MAXRECORDSIZE</b><br />
Type: `int`<br />

Defines maximum size (in bytes) for Raw Request and Raw Response logs, this value defaults
to 0. If it is not set then tyk-pump will not trim any data and will store the full
information. This can also be set at a pump level. For example:
```{.json}
"csv": {
  "type": "csv",
  "max_record_size":1000,
  "meta": {
    "csv_dir": "./"
  }
}
```

### pumps.hybrid.meta.ignore_tag_prefix_list
EV: <b>TYK_PMP_PUMPS_HYBRID_META_IGNORETAGPREFIXLIST</b><br />
Type: `[]string`<br />

Specifies prefixes of tags that should be ignored if `aggregated` is set to `true`.

### pumps.hybrid.meta.store_analytics_per_minute
EV: <b>TYK_PMP_PUMPS_HYBRID_META_STOREANALYTICSPERMINUTE</b><br />
Type: `bool`<br />

Determines if the aggregations should be made per minute (true) or per hour (false) if `aggregated` is set to `true`.

### pumps.hybrid.meta.ConnectionString
EV: <b>TYK_PMP_PUMPS_HYBRID_META_CONNECTIONSTRING</b><br />
Type: `string`<br />

MDCB URL connection string

### pumps.hybrid.meta.RPCKey
EV: <b>TYK_PMP_PUMPS_HYBRID_META_RPCKEY</b><br />
Type: `string`<br />

Your organisation ID to connect to the MDCB installation.

### pumps.hybrid.meta.APIKey
EV: <b>TYK_PMP_PUMPS_HYBRID_META_APIKEY</b><br />
Type: `string`<br />

This the API key of a user used to authenticate and authorise the Hybrid Pump access through MDCB.
The user should be a standard Dashboard user with minimal privileges so as to reduce any risk if the user is compromised.

### pumps.hybrid.meta.CallTimeout
EV: <b>TYK_PMP_PUMPS_HYBRID_META_CALLTIMEOUT</b><br />
Type: `int`<br />

Hybrid pump RPC calls timeout in seconds. Defaults to `10` seconds.

### pumps.hybrid.meta.RPCPoolSize
EV: <b>TYK_PMP_PUMPS_HYBRID_META_RPCPOOLSIZE</b><br />
Type: `int`<br />

Hybrid pump connection pool size. Defaults to `5`.

### pumps.hybrid.meta.aggregationTime
EV: <b>TYK_PMP_PUMPS_HYBRID_META_AGGREGATIONTIME</b><br />
Type: `int`<br />

aggregationTime is to specify the frequency of the aggregation in minutes if `aggregated` is set to `true`.

### pumps.hybrid.meta.Aggregated
EV: <b>TYK_PMP_PUMPS_HYBRID_META_AGGREGATED</b><br />
Type: `bool`<br />

Send aggregated analytics data to Tyk MDCB

### pumps.hybrid.meta.TrackAllPaths
EV: <b>TYK_PMP_PUMPS_HYBRID_META_TRACKALLPATHS</b><br />
Type: `bool`<br />

Specifies if it should store aggregated data for all the endpoints if `aggregated` is set to `true`. By default, `false`
which means that only store aggregated data for `tracked endpoints`.

### pumps.hybrid.meta.UseSSL
EV: <b>TYK_PMP_PUMPS_HYBRID_META_USESSL</b><br />
Type: `bool`<br />

Use SSL to connect to Tyk MDCB

### pumps.hybrid.meta.SSLInsecureSkipVerify
EV: <b>TYK_PMP_PUMPS_HYBRID_META_SSLINSECURESKIPVERIFY</b><br />
Type: `bool`<br />

Skip SSL verification

### pumps.influx.name
EV: <b>TYK_PMP_PUMPS_INFLUX_NAME</b><br />
Type: `string`<br />

Deprecated.

### pumps.influx.type
EV: <b>TYK_PMP_PUMPS_INFLUX_TYPE</b><br />
Type: `string`<br />

Sets the pump type. This is needed when the pump key does not equal to the pump name type.

### pumps.influx.filters
This feature adds a new configuration field in each pump called filters and its structure is
the following:
```{.json}
"filters":{
  "api_ids":[],
  "org_ids":[],
  "response_codes":[],
  "skip_api_ids":[],
  "skip_org_ids":[],
  "skip_response_codes":[]
}
```
The fields api_ids, org_ids and response_codes works as allow list (APIs and orgs where we
want to send the analytics records) and the fields skip_api_ids, skip_org_ids and
skip_response_codes works as block list.

The priority is always block list configurations over allow list.

An example of configuration would be:
```{.json}
"csv": {
 "type": "csv",
 "filters": {
   "org_ids": ["org1","org2"]
 },
 "meta": {
   "csv_dir": "./bar"
 }
}
```

### pumps.influx.filters.org_ids
EV: <b>TYK_PMP_PUMPS_INFLUX_FILTERS_ORGSIDS</b><br />
Type: `[]string`<br />

Filters pump data by the whitelisted org_ids.

### pumps.influx.filters.api_ids
EV: <b>TYK_PMP_PUMPS_INFLUX_FILTERS_APIIDS</b><br />
Type: `[]string`<br />

Filters pump data by the whitelisted api_ids.

### pumps.influx.filters.response_codes
EV: <b>TYK_PMP_PUMPS_INFLUX_FILTERS_RESPONSECODES</b><br />
Type: `[]int`<br />

Filters pump data by the whitelisted response_codes.

### pumps.influx.filters.skip_org_ids
EV: <b>TYK_PMP_PUMPS_INFLUX_FILTERS_SKIPPEDORGSIDS</b><br />
Type: `[]string`<br />

Filters pump data by the blacklisted org_ids.

### pumps.influx.filters.skip_api_ids
EV: <b>TYK_PMP_PUMPS_INFLUX_FILTERS_SKIPPEDAPIIDS</b><br />
Type: `[]string`<br />

Filters pump data by the blacklisted api_ids.

### pumps.influx.filters.skip_response_codes
EV: <b>TYK_PMP_PUMPS_INFLUX_FILTERS_SKIPPEDRESPONSECODES</b><br />
Type: `[]int`<br />

Filters pump data by the blacklisted response_codes.

### pumps.influx.timeout
EV: <b>TYK_PMP_PUMPS_INFLUX_TIMEOUT</b><br />
Type: `int`<br />

By default, a pump will wait forever for each write operation to complete; you can configure an optional timeout by setting the configuration option `timeout`.
If you have deployed multiple pumps, then you can configure each timeout independently. The timeout is in seconds and defaults to 0.

The timeout is configured within the main pump config as shown here; note that this example would configure a 5 second timeout:
```{.json}
"pump_name": {
  ...
  "timeout":5,
  "meta": {...}
}
```

Tyk will inform you if the pump's write operation is taking longer than the purging loop (configured via `purge_delay`) as this will mean that data is purged before being written to the target data sink.

If there is no timeout configured and pump's write operation is taking longer than the purging loop, the following warning log will be generated:
`Pump {pump_name} is taking more time than the value configured of purge_delay. You should try to set a timeout for this pump.`

If there is a timeout configured, but pump's write operation is still taking longer than the purging loop, the following warning log will be generated:
`Pump {pump_name} is taking more time than the value configured of purge_delay. You should try lowering the timeout configured for this pump.`.

### pumps.influx.omit_detailed_recording
EV: <b>TYK_PMP_PUMPS_INFLUX_OMITDETAILEDRECORDING</b><br />
Type: `bool`<br />

Setting this to true will avoid writing raw_request and raw_response fields for each request
in pumps. Defaults to `false`.

### pumps.influx.max_record_size
EV: <b>TYK_PMP_PUMPS_INFLUX_MAXRECORDSIZE</b><br />
Type: `int`<br />

Defines maximum size (in bytes) for Raw Request and Raw Response logs, this value defaults
to 0. If it is not set then tyk-pump will not trim any data and will store the full
information. This can also be set at a pump level. For example:
```{.json}
"csv": {
  "type": "csv",
  "max_record_size":1000,
  "meta": {
    "csv_dir": "./"
  }
}
```

### pumps.influx.meta.database_name
EV: <b>TYK_PMP_PUMPS_INFLUX_META_DATABASENAME</b><br />
Type: `string`<br />

InfluxDB pump database name.

### pumps.influx.meta.address
EV: <b>TYK_PMP_PUMPS_INFLUX_META_ADDR</b><br />
Type: `string`<br />

InfluxDB pump host.

### pumps.influx.meta.username
EV: <b>TYK_PMP_PUMPS_INFLUX_META_USERNAME</b><br />
Type: `string`<br />

InfluxDB pump database username.

### pumps.influx.meta.password
EV: <b>TYK_PMP_PUMPS_INFLUX_META_PASSWORD</b><br />
Type: `string`<br />

InfluxDB pump database password.

### pumps.influx.meta.fields
EV: <b>TYK_PMP_PUMPS_INFLUX_META_FIELDS</b><br />
Type: `[]string`<br />

Define which Analytics fields should be sent to InfluxDB. Check the available
fields in the example below. Default value is `["method",
"path", "response_code", "api_key", "time_stamp", "api_version", "api_name", "api_id",
"org_id", "oauth_id", "raw_request", "request_time", "raw_response", "ip_address"]`.

### pumps.influx.meta.tags
EV: <b>TYK_PMP_PUMPS_INFLUX_META_TAGS</b><br />
Type: `[]string`<br />

List of tags to be added to the metric.

### pumps.kafka.name
EV: <b>TYK_PMP_PUMPS_KAFKA_NAME</b><br />
Type: `string`<br />

Deprecated.

### pumps.kafka.type
EV: <b>TYK_PMP_PUMPS_KAFKA_TYPE</b><br />
Type: `string`<br />

Sets the pump type. This is needed when the pump key does not equal to the pump name type.

### pumps.kafka.filters
This feature adds a new configuration field in each pump called filters and its structure is
the following:
```{.json}
"filters":{
  "api_ids":[],
  "org_ids":[],
  "response_codes":[],
  "skip_api_ids":[],
  "skip_org_ids":[],
  "skip_response_codes":[]
}
```
The fields api_ids, org_ids and response_codes works as allow list (APIs and orgs where we
want to send the analytics records) and the fields skip_api_ids, skip_org_ids and
skip_response_codes works as block list.

The priority is always block list configurations over allow list.

An example of configuration would be:
```{.json}
"csv": {
 "type": "csv",
 "filters": {
   "org_ids": ["org1","org2"]
 },
 "meta": {
   "csv_dir": "./bar"
 }
}
```

### pumps.kafka.filters.org_ids
EV: <b>TYK_PMP_PUMPS_KAFKA_FILTERS_ORGSIDS</b><br />
Type: `[]string`<br />

Filters pump data by the whitelisted org_ids.

### pumps.kafka.filters.api_ids
EV: <b>TYK_PMP_PUMPS_KAFKA_FILTERS_APIIDS</b><br />
Type: `[]string`<br />

Filters pump data by the whitelisted api_ids.

### pumps.kafka.filters.response_codes
EV: <b>TYK_PMP_PUMPS_KAFKA_FILTERS_RESPONSECODES</b><br />
Type: `[]int`<br />

Filters pump data by the whitelisted response_codes.

### pumps.kafka.filters.skip_org_ids
EV: <b>TYK_PMP_PUMPS_KAFKA_FILTERS_SKIPPEDORGSIDS</b><br />
Type: `[]string`<br />

Filters pump data by the blacklisted org_ids.

### pumps.kafka.filters.skip_api_ids
EV: <b>TYK_PMP_PUMPS_KAFKA_FILTERS_SKIPPEDAPIIDS</b><br />
Type: `[]string`<br />

Filters pump data by the blacklisted api_ids.

### pumps.kafka.filters.skip_response_codes
EV: <b>TYK_PMP_PUMPS_KAFKA_FILTERS_SKIPPEDRESPONSECODES</b><br />
Type: `[]int`<br />

Filters pump data by the blacklisted response_codes.

### pumps.kafka.timeout
EV: <b>TYK_PMP_PUMPS_KAFKA_TIMEOUT</b><br />
Type: `int`<br />

By default, a pump will wait forever for each write operation to complete; you can configure an optional timeout by setting the configuration option `timeout`.
If you have deployed multiple pumps, then you can configure each timeout independently. The timeout is in seconds and defaults to 0.

The timeout is configured within the main pump config as shown here; note that this example would configure a 5 second timeout:
```{.json}
"pump_name": {
  ...
  "timeout":5,
  "meta": {...}
}
```

Tyk will inform you if the pump's write operation is taking longer than the purging loop (configured via `purge_delay`) as this will mean that data is purged before being written to the target data sink.

If there is no timeout configured and pump's write operation is taking longer than the purging loop, the following warning log will be generated:
`Pump {pump_name} is taking more time than the value configured of purge_delay. You should try to set a timeout for this pump.`

If there is a timeout configured, but pump's write operation is still taking longer than the purging loop, the following warning log will be generated:
`Pump {pump_name} is taking more time than the value configured of purge_delay. You should try lowering the timeout configured for this pump.`.

### pumps.kafka.omit_detailed_recording
EV: <b>TYK_PMP_PUMPS_KAFKA_OMITDETAILEDRECORDING</b><br />
Type: `bool`<br />

Setting this to true will avoid writing raw_request and raw_response fields for each request
in pumps. Defaults to `false`.

### pumps.kafka.max_record_size
EV: <b>TYK_PMP_PUMPS_KAFKA_MAXRECORDSIZE</b><br />
Type: `int`<br />

Defines maximum size (in bytes) for Raw Request and Raw Response logs, this value defaults
to 0. If it is not set then tyk-pump will not trim any data and will store the full
information. This can also be set at a pump level. For example:
```{.json}
"csv": {
  "type": "csv",
  "max_record_size":1000,
  "meta": {
    "csv_dir": "./"
  }
}
```

### pumps.kafka.meta.broker
EV: <b>TYK_PMP_PUMPS_KAFKA_META_BROKER</b><br />
Type: `[]string`<br />

The list of brokers used to discover the partitions available on the kafka cluster. E.g.
"localhost:9092".

### pumps.kafka.meta.client_id
EV: <b>TYK_PMP_PUMPS_KAFKA_META_CLIENTID</b><br />
Type: `string`<br />

Unique identifier for client connections established with Kafka.

### pumps.kafka.meta.topic
EV: <b>TYK_PMP_PUMPS_KAFKA_META_TOPIC</b><br />
Type: `string`<br />

The topic that the writer will produce messages to.

### pumps.kafka.meta.timeout
EV: <b>TYK_PMP_PUMPS_KAFKA_META_TIMEOUT</b><br />
Type: `time.Duration`<br />

Timeout is the maximum amount of time will wait for a connect or write to complete.

### pumps.kafka.meta.compressed
EV: <b>TYK_PMP_PUMPS_KAFKA_META_COMPRESSED</b><br />
Type: `bool`<br />

Enable "github.com/golang/snappy" codec to be used to compress Kafka messages. By default
is `false`.

### pumps.kafka.meta.meta_data
EV: <b>TYK_PMP_PUMPS_KAFKA_META_METADATA</b><br />
Type: `map[string]string`<br />

Can be used to set custom metadata inside the kafka message.

### pumps.kafka.meta.use_ssl
EV: <b>TYK_PMP_PUMPS_KAFKA_META_USESSL</b><br />
Type: `bool`<br />

Enables SSL connection.

### pumps.kafka.meta.ssl_insecure_skip_verify
EV: <b>TYK_PMP_PUMPS_KAFKA_META_SSLINSECURESKIPVERIFY</b><br />
Type: `bool`<br />

Controls whether the pump client verifies the kafka server's certificate chain and host
name.

### pumps.kafka.meta.ssl_cert_file
EV: <b>TYK_PMP_PUMPS_KAFKA_META_SSLCERTFILE</b><br />
Type: `string`<br />

Can be used to set custom certificate file for authentication with kafka.

### pumps.kafka.meta.ssl_key_file
EV: <b>TYK_PMP_PUMPS_KAFKA_META_SSLKEYFILE</b><br />
Type: `string`<br />

Can be used to set custom key file for authentication with kafka.

### pumps.kafka.meta.sasl_mechanism
EV: <b>TYK_PMP_PUMPS_KAFKA_META_SASLMECHANISM</b><br />
Type: `string`<br />

SASL mechanism configuration. Only "plain" and "scram" are supported.

### pumps.kafka.meta.sasl_username
EV: <b>TYK_PMP_PUMPS_KAFKA_META_USERNAME</b><br />
Type: `string`<br />

SASL username.

### pumps.kafka.meta.sasl_password
EV: <b>TYK_PMP_PUMPS_KAFKA_META_PASSWORD</b><br />
Type: `string`<br />

SASL password.

### pumps.kafka.meta.sasl_algorithm
EV: <b>TYK_PMP_PUMPS_KAFKA_META_ALGORITHM</b><br />
Type: `string`<br />

SASL algorithm. It's the algorithm specified for scram mechanism. It could be sha-512 or sha-256.
Defaults to "sha-256".

### pumps.logzio.name
EV: <b>TYK_PMP_PUMPS_LOGZIO_NAME</b><br />
Type: `string`<br />

Deprecated.

### pumps.logzio.type
EV: <b>TYK_PMP_PUMPS_LOGZIO_TYPE</b><br />
Type: `string`<br />

Sets the pump type. This is needed when the pump key does not equal to the pump name type.

### pumps.logzio.filters
This feature adds a new configuration field in each pump called filters and its structure is
the following:
```{.json}
"filters":{
  "api_ids":[],
  "org_ids":[],
  "response_codes":[],
  "skip_api_ids":[],
  "skip_org_ids":[],
  "skip_response_codes":[]
}
```
The fields api_ids, org_ids and response_codes works as allow list (APIs and orgs where we
want to send the analytics records) and the fields skip_api_ids, skip_org_ids and
skip_response_codes works as block list.

The priority is always block list configurations over allow list.

An example of configuration would be:
```{.json}
"csv": {
 "type": "csv",
 "filters": {
   "org_ids": ["org1","org2"]
 },
 "meta": {
   "csv_dir": "./bar"
 }
}
```

### pumps.logzio.filters.org_ids
EV: <b>TYK_PMP_PUMPS_LOGZIO_FILTERS_ORGSIDS</b><br />
Type: `[]string`<br />

Filters pump data by the whitelisted org_ids.

### pumps.logzio.filters.api_ids
EV: <b>TYK_PMP_PUMPS_LOGZIO_FILTERS_APIIDS</b><br />
Type: `[]string`<br />

Filters pump data by the whitelisted api_ids.

### pumps.logzio.filters.response_codes
EV: <b>TYK_PMP_PUMPS_LOGZIO_FILTERS_RESPONSECODES</b><br />
Type: `[]int`<br />

Filters pump data by the whitelisted response_codes.

### pumps.logzio.filters.skip_org_ids
EV: <b>TYK_PMP_PUMPS_LOGZIO_FILTERS_SKIPPEDORGSIDS</b><br />
Type: `[]string`<br />

Filters pump data by the blacklisted org_ids.

### pumps.logzio.filters.skip_api_ids
EV: <b>TYK_PMP_PUMPS_LOGZIO_FILTERS_SKIPPEDAPIIDS</b><br />
Type: `[]string`<br />

Filters pump data by the blacklisted api_ids.

### pumps.logzio.filters.skip_response_codes
EV: <b>TYK_PMP_PUMPS_LOGZIO_FILTERS_SKIPPEDRESPONSECODES</b><br />
Type: `[]int`<br />

Filters pump data by the blacklisted response_codes.

### pumps.logzio.timeout
EV: <b>TYK_PMP_PUMPS_LOGZIO_TIMEOUT</b><br />
Type: `int`<br />

By default, a pump will wait forever for each write operation to complete; you can configure an optional timeout by setting the configuration option `timeout`.
If you have deployed multiple pumps, then you can configure each timeout independently. The timeout is in seconds and defaults to 0.

The timeout is configured within the main pump config as shown here; note that this example would configure a 5 second timeout:
```{.json}
"pump_name": {
  ...
  "timeout":5,
  "meta": {...}
}
```

Tyk will inform you if the pump's write operation is taking longer than the purging loop (configured via `purge_delay`) as this will mean that data is purged before being written to the target data sink.

If there is no timeout configured and pump's write operation is taking longer than the purging loop, the following warning log will be generated:
`Pump {pump_name} is taking more time than the value configured of purge_delay. You should try to set a timeout for this pump.`

If there is a timeout configured, but pump's write operation is still taking longer than the purging loop, the following warning log will be generated:
`Pump {pump_name} is taking more time than the value configured of purge_delay. You should try lowering the timeout configured for this pump.`.

### pumps.logzio.omit_detailed_recording
EV: <b>TYK_PMP_PUMPS_LOGZIO_OMITDETAILEDRECORDING</b><br />
Type: `bool`<br />

Setting this to true will avoid writing raw_request and raw_response fields for each request
in pumps. Defaults to `false`.

### pumps.logzio.max_record_size
EV: <b>TYK_PMP_PUMPS_LOGZIO_MAXRECORDSIZE</b><br />
Type: `int`<br />

Defines maximum size (in bytes) for Raw Request and Raw Response logs, this value defaults
to 0. If it is not set then tyk-pump will not trim any data and will store the full
information. This can also be set at a pump level. For example:
```{.json}
"csv": {
  "type": "csv",
  "max_record_size":1000,
  "meta": {
    "csv_dir": "./"
  }
}
```

### pumps.logzio.meta.check_disk_space
EV: <b>TYK_PMP_PUMPS_LOGZIO_META_CHECKDISKSPACE</b><br />
Type: `bool`<br />

Set the sender to check if it crosses the maximum allowed disk usage. Default value is
`true`.

### pumps.logzio.meta.disk_threshold
EV: <b>TYK_PMP_PUMPS_LOGZIO_META_DISKTHRESHOLD</b><br />
Type: `int`<br />

Set disk queue threshold, once the threshold is crossed the sender will not enqueue the
received logs. Default value is `98` (percentage of disk).

### pumps.logzio.meta.drain_duration
EV: <b>TYK_PMP_PUMPS_LOGZIO_META_DRAINDURATION</b><br />
Type: `string`<br />

Set drain duration (flush logs on disk). Default value is `3s`.

### pumps.logzio.meta.queue_dir
EV: <b>TYK_PMP_PUMPS_LOGZIO_META_QUEUEDIR</b><br />
Type: `string`<br />

The directory for the queue.

### pumps.logzio.meta.token
EV: <b>TYK_PMP_PUMPS_LOGZIO_META_TOKEN</b><br />
Type: `string`<br />

Token for sending data to your logzio account.

### pumps.logzio.meta.url
EV: <b>TYK_PMP_PUMPS_LOGZIO_META_URL</b><br />
Type: `string`<br />

If you do not want to use the default Logzio url i.e. when using a proxy. Default is
`https://listener.logz.io:8071`.

### pumps.moesif.name
EV: <b>TYK_PMP_PUMPS_MOESIF_NAME</b><br />
Type: `string`<br />

Deprecated.

### pumps.moesif.type
EV: <b>TYK_PMP_PUMPS_MOESIF_TYPE</b><br />
Type: `string`<br />

Sets the pump type. This is needed when the pump key does not equal to the pump name type.

### pumps.moesif.filters
This feature adds a new configuration field in each pump called filters and its structure is
the following:
```{.json}
"filters":{
  "api_ids":[],
  "org_ids":[],
  "response_codes":[],
  "skip_api_ids":[],
  "skip_org_ids":[],
  "skip_response_codes":[]
}
```
The fields api_ids, org_ids and response_codes works as allow list (APIs and orgs where we
want to send the analytics records) and the fields skip_api_ids, skip_org_ids and
skip_response_codes works as block list.

The priority is always block list configurations over allow list.

An example of configuration would be:
```{.json}
"csv": {
 "type": "csv",
 "filters": {
   "org_ids": ["org1","org2"]
 },
 "meta": {
   "csv_dir": "./bar"
 }
}
```

### pumps.moesif.filters.org_ids
EV: <b>TYK_PMP_PUMPS_MOESIF_FILTERS_ORGSIDS</b><br />
Type: `[]string`<br />

Filters pump data by the whitelisted org_ids.

### pumps.moesif.filters.api_ids
EV: <b>TYK_PMP_PUMPS_MOESIF_FILTERS_APIIDS</b><br />
Type: `[]string`<br />

Filters pump data by the whitelisted api_ids.

### pumps.moesif.filters.response_codes
EV: <b>TYK_PMP_PUMPS_MOESIF_FILTERS_RESPONSECODES</b><br />
Type: `[]int`<br />

Filters pump data by the whitelisted response_codes.

### pumps.moesif.filters.skip_org_ids
EV: <b>TYK_PMP_PUMPS_MOESIF_FILTERS_SKIPPEDORGSIDS</b><br />
Type: `[]string`<br />

Filters pump data by the blacklisted org_ids.

### pumps.moesif.filters.skip_api_ids
EV: <b>TYK_PMP_PUMPS_MOESIF_FILTERS_SKIPPEDAPIIDS</b><br />
Type: `[]string`<br />

Filters pump data by the blacklisted api_ids.

### pumps.moesif.filters.skip_response_codes
EV: <b>TYK_PMP_PUMPS_MOESIF_FILTERS_SKIPPEDRESPONSECODES</b><br />
Type: `[]int`<br />

Filters pump data by the blacklisted response_codes.

### pumps.moesif.timeout
EV: <b>TYK_PMP_PUMPS_MOESIF_TIMEOUT</b><br />
Type: `int`<br />

By default, a pump will wait forever for each write operation to complete; you can configure an optional timeout by setting the configuration option `timeout`.
If you have deployed multiple pumps, then you can configure each timeout independently. The timeout is in seconds and defaults to 0.

The timeout is configured within the main pump config as shown here; note that this example would configure a 5 second timeout:
```{.json}
"pump_name": {
  ...
  "timeout":5,
  "meta": {...}
}
```

Tyk will inform you if the pump's write operation is taking longer than the purging loop (configured via `purge_delay`) as this will mean that data is purged before being written to the target data sink.

If there is no timeout configured and pump's write operation is taking longer than the purging loop, the following warning log will be generated:
`Pump {pump_name} is taking more time than the value configured of purge_delay. You should try to set a timeout for this pump.`

If there is a timeout configured, but pump's write operation is still taking longer than the purging loop, the following warning log will be generated:
`Pump {pump_name} is taking more time than the value configured of purge_delay. You should try lowering the timeout configured for this pump.`.

### pumps.moesif.omit_detailed_recording
EV: <b>TYK_PMP_PUMPS_MOESIF_OMITDETAILEDRECORDING</b><br />
Type: `bool`<br />

Setting this to true will avoid writing raw_request and raw_response fields for each request
in pumps. Defaults to `false`.

### pumps.moesif.max_record_size
EV: <b>TYK_PMP_PUMPS_MOESIF_MAXRECORDSIZE</b><br />
Type: `int`<br />

Defines maximum size (in bytes) for Raw Request and Raw Response logs, this value defaults
to 0. If it is not set then tyk-pump will not trim any data and will store the full
information. This can also be set at a pump level. For example:
```{.json}
"csv": {
  "type": "csv",
  "max_record_size":1000,
  "meta": {
    "csv_dir": "./"
  }
}
```

### pumps.moesif.meta.application_id
EV: <b>TYK_PMP_PUMPS_MOESIF_META_APPLICATIONID</b><br />
Type: `string`<br />

Moesif Application Id. You can find your Moesif Application Id from
[_Moesif Dashboard_](https://www.moesif.com/) -> _Top Right Menu_ -> _API Keys_ . Moesif
recommends creating separate Application Ids for each environment such as Production,
Staging, and Development to keep data isolated.

### pumps.moesif.meta.request_header_masks
EV: <b>TYK_PMP_PUMPS_MOESIF_META_REQUESTHEADERMASKS</b><br />
Type: `[]string`<br />

An option to mask a specific request header field.

### pumps.moesif.meta.response_header_masks
EV: <b>TYK_PMP_PUMPS_MOESIF_META_RESPONSEHEADERMASKS</b><br />
Type: `[]string`<br />

An option to mask a specific response header field.

### pumps.moesif.meta.request_body_masks
EV: <b>TYK_PMP_PUMPS_MOESIF_META_REQUESTBODYMASKS</b><br />
Type: `[]string`<br />

An option to mask a specific - request body field.

### pumps.moesif.meta.response_body_masks
EV: <b>TYK_PMP_PUMPS_MOESIF_META_RESPONSEBODYMASKS</b><br />
Type: `[]string`<br />

An option to mask a specific response body field.

### pumps.moesif.meta.disable_capture_request_body
EV: <b>TYK_PMP_PUMPS_MOESIF_META_DISABLECAPTUREREQUESTBODY</b><br />
Type: `bool`<br />

An option to disable logging of request body. Default value is `false`.

### pumps.moesif.meta.disable_capture_response_body
EV: <b>TYK_PMP_PUMPS_MOESIF_META_DISABLECAPTURERESPONSEBODY</b><br />
Type: `bool`<br />

An option to disable logging of response body. Default value is `false`.

### pumps.moesif.meta.user_id_header
EV: <b>TYK_PMP_PUMPS_MOESIF_META_USERIDHEADER</b><br />
Type: `string`<br />

An optional field name to identify User from a request or response header.

### pumps.moesif.meta.company_id_header
EV: <b>TYK_PMP_PUMPS_MOESIF_META_COMPANYIDHEADER</b><br />
Type: `string`<br />

An optional field name to identify Company (Account) from a request or response header.

### pumps.moesif.meta.enable_bulk
EV: <b>TYK_PMP_PUMPS_MOESIF_META_ENABLEBULK</b><br />
Type: `bool`<br />

Set this to `true` to enable `bulk_config`.

### pumps.moesif.meta.bulk_config
EV: <b>TYK_PMP_PUMPS_MOESIF_META_BULKCONFIG</b><br />
Type: `map[string]interface{}`<br />

Batch writing trigger configuration.
  * `"event_queue_size"` - (optional) An optional field name which specify the maximum
number of events to hold in queue before sending to Moesif. In case of network issues when
not able to connect/send event to Moesif, skips adding new events to the queue to prevent
memory overflow. Type: int. Default value is `10000`.
  * `"batch_size"` - (optional) An optional field name which specify the maximum batch size
when sending to Moesif. Type: int. Default value is `200`.
  * `"timer_wake_up_seconds"` - (optional) An optional field which specifies a time (every n
seconds) how often background thread runs to send events to moesif. Type: int. Default value
is `2` seconds.

### pumps.moesif.meta.authorization_header_name
EV: <b>TYK_PMP_PUMPS_MOESIF_META_AUTHORIZATIONHEADERNAME</b><br />
Type: `string`<br />

An optional request header field name to used to identify the User in Moesif. Default value
is `authorization`.

### pumps.moesif.meta.authorization_user_id_field
EV: <b>TYK_PMP_PUMPS_MOESIF_META_AUTHORIZATIONUSERIDFIELD</b><br />
Type: `string`<br />

An optional field name use to parse the User from authorization header in Moesif. Default
value is `sub`.

### pumps.mongo.name
EV: <b>TYK_PMP_PUMPS_MONGO_NAME</b><br />
Type: `string`<br />

Deprecated.

### pumps.mongo.type
EV: <b>TYK_PMP_PUMPS_MONGO_TYPE</b><br />
Type: `string`<br />

Sets the pump type. This is needed when the pump key does not equal to the pump name type.

### pumps.mongo.filters
This feature adds a new configuration field in each pump called filters and its structure is
the following:
```{.json}
"filters":{
  "api_ids":[],
  "org_ids":[],
  "response_codes":[],
  "skip_api_ids":[],
  "skip_org_ids":[],
  "skip_response_codes":[]
}
```
The fields api_ids, org_ids and response_codes works as allow list (APIs and orgs where we
want to send the analytics records) and the fields skip_api_ids, skip_org_ids and
skip_response_codes works as block list.

The priority is always block list configurations over allow list.

An example of configuration would be:
```{.json}
"csv": {
 "type": "csv",
 "filters": {
   "org_ids": ["org1","org2"]
 },
 "meta": {
   "csv_dir": "./bar"
 }
}
```

### pumps.mongo.filters.org_ids
EV: <b>TYK_PMP_PUMPS_MONGO_FILTERS_ORGSIDS</b><br />
Type: `[]string`<br />

Filters pump data by the whitelisted org_ids.

### pumps.mongo.filters.api_ids
EV: <b>TYK_PMP_PUMPS_MONGO_FILTERS_APIIDS</b><br />
Type: `[]string`<br />

Filters pump data by the whitelisted api_ids.

### pumps.mongo.filters.response_codes
EV: <b>TYK_PMP_PUMPS_MONGO_FILTERS_RESPONSECODES</b><br />
Type: `[]int`<br />

Filters pump data by the whitelisted response_codes.

### pumps.mongo.filters.skip_org_ids
EV: <b>TYK_PMP_PUMPS_MONGO_FILTERS_SKIPPEDORGSIDS</b><br />
Type: `[]string`<br />

Filters pump data by the blacklisted org_ids.

### pumps.mongo.filters.skip_api_ids
EV: <b>TYK_PMP_PUMPS_MONGO_FILTERS_SKIPPEDAPIIDS</b><br />
Type: `[]string`<br />

Filters pump data by the blacklisted api_ids.

### pumps.mongo.filters.skip_response_codes
EV: <b>TYK_PMP_PUMPS_MONGO_FILTERS_SKIPPEDRESPONSECODES</b><br />
Type: `[]int`<br />

Filters pump data by the blacklisted response_codes.

### pumps.mongo.timeout
EV: <b>TYK_PMP_PUMPS_MONGO_TIMEOUT</b><br />
Type: `int`<br />

By default, a pump will wait forever for each write operation to complete; you can configure an optional timeout by setting the configuration option `timeout`.
If you have deployed multiple pumps, then you can configure each timeout independently. The timeout is in seconds and defaults to 0.

The timeout is configured within the main pump config as shown here; note that this example would configure a 5 second timeout:
```{.json}
"pump_name": {
  ...
  "timeout":5,
  "meta": {...}
}
```

Tyk will inform you if the pump's write operation is taking longer than the purging loop (configured via `purge_delay`) as this will mean that data is purged before being written to the target data sink.

If there is no timeout configured and pump's write operation is taking longer than the purging loop, the following warning log will be generated:
`Pump {pump_name} is taking more time than the value configured of purge_delay. You should try to set a timeout for this pump.`

If there is a timeout configured, but pump's write operation is still taking longer than the purging loop, the following warning log will be generated:
`Pump {pump_name} is taking more time than the value configured of purge_delay. You should try lowering the timeout configured for this pump.`.

### pumps.mongo.omit_detailed_recording
EV: <b>TYK_PMP_PUMPS_MONGO_OMITDETAILEDRECORDING</b><br />
Type: `bool`<br />

Setting this to true will avoid writing raw_request and raw_response fields for each request
in pumps. Defaults to `false`.

### pumps.mongo.max_record_size
EV: <b>TYK_PMP_PUMPS_MONGO_MAXRECORDSIZE</b><br />
Type: `int`<br />

Defines maximum size (in bytes) for Raw Request and Raw Response logs, this value defaults
to 0. If it is not set then tyk-pump will not trim any data and will store the full
information. This can also be set at a pump level. For example:
```{.json}
"csv": {
  "type": "csv",
  "max_record_size":1000,
  "meta": {
    "csv_dir": "./"
  }
}
```

### pumps.mongo.meta.mongo_url
EV: <b>TYK_PMP_PUMPS_MONGO_META_MONGOURL</b><br />
Type: `string`<br />

The full URL to your MongoDB instance, this can be a clustered instance if necessary and
should include the database and username / password data.

### pumps.mongo.meta.mongo_use_ssl
EV: <b>TYK_PMP_PUMPS_MONGO_META_MONGOUSESSL</b><br />
Type: `bool`<br />

Set to true to enable Mongo SSL connection.

### pumps.mongo.meta.mongo_ssl_insecure_skip_verify
EV: <b>TYK_PMP_PUMPS_MONGO_META_MONGOSSLINSECURESKIPVERIFY</b><br />
Type: `bool`<br />

Allows the use of self-signed certificates when connecting to an encrypted MongoDB database.

### pumps.mongo.meta.mongo_ssl_allow_invalid_hostnames
EV: <b>TYK_PMP_PUMPS_MONGO_META_MONGOSSLALLOWINVALIDHOSTNAMES</b><br />
Type: `bool`<br />

Ignore hostname check when it differs from the original (for example with SSH tunneling).
The rest of the TLS verification will still be performed.

### pumps.mongo.meta.mongo_ssl_ca_file
EV: <b>TYK_PMP_PUMPS_MONGO_META_MONGOSSLCAFILE</b><br />
Type: `string`<br />

Path to the PEM file with trusted root certificates

### pumps.mongo.meta.mongo_ssl_pem_keyfile
EV: <b>TYK_PMP_PUMPS_MONGO_META_MONGOSSLPEMKEYFILE</b><br />
Type: `string`<br />

Path to the PEM file which contains both client certificate and private key. This is
required for Mutual TLS.

### pumps.mongo.meta.mongo_db_type
EV: <b>TYK_PMP_PUMPS_MONGO_META_MONGODBTYPE</b><br />
Type: `int`<br />

Specifies the mongo DB Type. If it's 0, it means that you are using standard mongo db, if it's 1 it means you are using AWS Document DB, if it's 2, it means you are using CosmosDB.
Defaults to Standard mongo (0).

### pumps.mongo.meta.omit_index_creation
EV: <b>TYK_PMP_PUMPS_MONGO_META_OMITINDEXCREATION</b><br />
Type: `bool`<br />

Set to true to disable the default tyk index creation.

### pumps.mongo.meta.mongo_session_consistency
EV: <b>TYK_PMP_PUMPS_MONGO_META_MONGOSESSIONCONSISTENCY</b><br />
Type: `string`<br />

Set the consistency mode for the session, it defaults to `Strong`. The valid values are: strong, monotonic, eventual.

### pumps.mongo.meta.driver
EV: <b>TYK_PMP_PUMPS_MONGO_META_MONGODRIVERTYPE</b><br />
Type: `string`<br />

MongoDriverType is the type of the driver (library) to use. The valid values are: “mongo-go” and “mgo”.
Default to “mgo”. Check out this guide to [learn about different MongoDB drivers Tyk Pump support](https://github.com/TykTechnologies/tyk-pump#driver-type).

### pumps.mongo.meta.mongo_direct_connection
EV: <b>TYK_PMP_PUMPS_MONGO_META_MONGODIRECTCONNECTION</b><br />
Type: `bool`<br />

MongoDirectConnection informs whether to establish connections only with the specified seed servers,
or to obtain information for the whole cluster and establish connections with further servers too.
If true, the client will only connect to the host provided in the ConnectionString
and won't attempt to discover other hosts in the cluster. Useful when network restrictions
prevent discovery, such as with SSH tunneling. Default is false.

### pumps.mongo.meta.collection_name
EV: <b>TYK_PMP_PUMPS_MONGO_META_COLLECTIONNAME</b><br />
Type: `string`<br />

Specifies the mongo collection name.

### pumps.mongo.meta.max_insert_batch_size_bytes
EV: <b>TYK_PMP_PUMPS_MONGO_META_MAXINSERTBATCHSIZEBYTES</b><br />
Type: `int`<br />

Maximum insert batch size for mongo selective pump. If the batch we are writing surpass this value, it will be send in multiple batchs.
Defaults to 10Mb.

### pumps.mongo.meta.max_document_size_bytes
EV: <b>TYK_PMP_PUMPS_MONGO_META_MAXDOCUMENTSIZEBYTES</b><br />
Type: `int`<br />

Maximum document size. If the document exceed this value, it will be skipped.
Defaults to 10Mb.

### pumps.mongo.meta.collection_cap_max_size_bytes
EV: <b>TYK_PMP_PUMPS_MONGO_META_COLLECTIONCAPMAXSIZEBYTES</b><br />
Type: `int`<br />

Amount of bytes of the capped collection in 64bits architectures.
Defaults to 5GB.

### pumps.mongo.meta.collection_cap_enable
EV: <b>TYK_PMP_PUMPS_MONGO_META_COLLECTIONCAPENABLE</b><br />
Type: `bool`<br />

Enable collection capping. It's used to set a maximum size of the collection.

### pumps.mongoaggregate.name
EV: <b>TYK_PMP_PUMPS_MONGOAGGREGATE_NAME</b><br />
Type: `string`<br />

Deprecated.

### pumps.mongoaggregate.type
EV: <b>TYK_PMP_PUMPS_MONGOAGGREGATE_TYPE</b><br />
Type: `string`<br />

Sets the pump type. This is needed when the pump key does not equal to the pump name type.

### pumps.mongoaggregate.filters
This feature adds a new configuration field in each pump called filters and its structure is
the following:
```{.json}
"filters":{
  "api_ids":[],
  "org_ids":[],
  "response_codes":[],
  "skip_api_ids":[],
  "skip_org_ids":[],
  "skip_response_codes":[]
}
```
The fields api_ids, org_ids and response_codes works as allow list (APIs and orgs where we
want to send the analytics records) and the fields skip_api_ids, skip_org_ids and
skip_response_codes works as block list.

The priority is always block list configurations over allow list.

An example of configuration would be:
```{.json}
"csv": {
 "type": "csv",
 "filters": {
   "org_ids": ["org1","org2"]
 },
 "meta": {
   "csv_dir": "./bar"
 }
}
```

### pumps.mongoaggregate.filters.org_ids
EV: <b>TYK_PMP_PUMPS_MONGOAGGREGATE_FILTERS_ORGSIDS</b><br />
Type: `[]string`<br />

Filters pump data by the whitelisted org_ids.

### pumps.mongoaggregate.filters.api_ids
EV: <b>TYK_PMP_PUMPS_MONGOAGGREGATE_FILTERS_APIIDS</b><br />
Type: `[]string`<br />

Filters pump data by the whitelisted api_ids.

### pumps.mongoaggregate.filters.response_codes
EV: <b>TYK_PMP_PUMPS_MONGOAGGREGATE_FILTERS_RESPONSECODES</b><br />
Type: `[]int`<br />

Filters pump data by the whitelisted response_codes.

### pumps.mongoaggregate.filters.skip_org_ids
EV: <b>TYK_PMP_PUMPS_MONGOAGGREGATE_FILTERS_SKIPPEDORGSIDS</b><br />
Type: `[]string`<br />

Filters pump data by the blacklisted org_ids.

### pumps.mongoaggregate.filters.skip_api_ids
EV: <b>TYK_PMP_PUMPS_MONGOAGGREGATE_FILTERS_SKIPPEDAPIIDS</b><br />
Type: `[]string`<br />

Filters pump data by the blacklisted api_ids.

### pumps.mongoaggregate.filters.skip_response_codes
EV: <b>TYK_PMP_PUMPS_MONGOAGGREGATE_FILTERS_SKIPPEDRESPONSECODES</b><br />
Type: `[]int`<br />

Filters pump data by the blacklisted response_codes.

### pumps.mongoaggregate.timeout
EV: <b>TYK_PMP_PUMPS_MONGOAGGREGATE_TIMEOUT</b><br />
Type: `int`<br />

By default, a pump will wait forever for each write operation to complete; you can configure an optional timeout by setting the configuration option `timeout`.
If you have deployed multiple pumps, then you can configure each timeout independently. The timeout is in seconds and defaults to 0.

The timeout is configured within the main pump config as shown here; note that this example would configure a 5 second timeout:
```{.json}
"pump_name": {
  ...
  "timeout":5,
  "meta": {...}
}
```

Tyk will inform you if the pump's write operation is taking longer than the purging loop (configured via `purge_delay`) as this will mean that data is purged before being written to the target data sink.

If there is no timeout configured and pump's write operation is taking longer than the purging loop, the following warning log will be generated:
`Pump {pump_name} is taking more time than the value configured of purge_delay. You should try to set a timeout for this pump.`

If there is a timeout configured, but pump's write operation is still taking longer than the purging loop, the following warning log will be generated:
`Pump {pump_name} is taking more time than the value configured of purge_delay. You should try lowering the timeout configured for this pump.`.

### pumps.mongoaggregate.omit_detailed_recording
EV: <b>TYK_PMP_PUMPS_MONGOAGGREGATE_OMITDETAILEDRECORDING</b><br />
Type: `bool`<br />

Setting this to true will avoid writing raw_request and raw_response fields for each request
in pumps. Defaults to `false`.

### pumps.mongoaggregate.max_record_size
EV: <b>TYK_PMP_PUMPS_MONGOAGGREGATE_MAXRECORDSIZE</b><br />
Type: `int`<br />

Defines maximum size (in bytes) for Raw Request and Raw Response logs, this value defaults
to 0. If it is not set then tyk-pump will not trim any data and will store the full
information. This can also be set at a pump level. For example:
```{.json}
"csv": {
  "type": "csv",
  "max_record_size":1000,
  "meta": {
    "csv_dir": "./"
  }
}
```

### pumps.mongoaggregate.meta.mongo_url
EV: <b>TYK_PMP_PUMPS_MONGOAGGREGATE_META_MONGOURL</b><br />
Type: `string`<br />

The full URL to your MongoDB instance, this can be a clustered instance if necessary and
should include the database and username / password data.

### pumps.mongoaggregate.meta.mongo_use_ssl
EV: <b>TYK_PMP_PUMPS_MONGOAGGREGATE_META_MONGOUSESSL</b><br />
Type: `bool`<br />

Set to true to enable Mongo SSL connection.

### pumps.mongoaggregate.meta.mongo_ssl_insecure_skip_verify
EV: <b>TYK_PMP_PUMPS_MONGOAGGREGATE_META_MONGOSSLINSECURESKIPVERIFY</b><br />
Type: `bool`<br />

Allows the use of self-signed certificates when connecting to an encrypted MongoDB database.

### pumps.mongoaggregate.meta.mongo_ssl_allow_invalid_hostnames
EV: <b>TYK_PMP_PUMPS_MONGOAGGREGATE_META_MONGOSSLALLOWINVALIDHOSTNAMES</b><br />
Type: `bool`<br />

Ignore hostname check when it differs from the original (for example with SSH tunneling).
The rest of the TLS verification will still be performed.

### pumps.mongoaggregate.meta.mongo_ssl_ca_file
EV: <b>TYK_PMP_PUMPS_MONGOAGGREGATE_META_MONGOSSLCAFILE</b><br />
Type: `string`<br />

Path to the PEM file with trusted root certificates

### pumps.mongoaggregate.meta.mongo_ssl_pem_keyfile
EV: <b>TYK_PMP_PUMPS_MONGOAGGREGATE_META_MONGOSSLPEMKEYFILE</b><br />
Type: `string`<br />

Path to the PEM file which contains both client certificate and private key. This is
required for Mutual TLS.

### pumps.mongoaggregate.meta.mongo_db_type
EV: <b>TYK_PMP_PUMPS_MONGOAGGREGATE_META_MONGODBTYPE</b><br />
Type: `int`<br />

Specifies the mongo DB Type. If it's 0, it means that you are using standard mongo db, if it's 1 it means you are using AWS Document DB, if it's 2, it means you are using CosmosDB.
Defaults to Standard mongo (0).

### pumps.mongoaggregate.meta.omit_index_creation
EV: <b>TYK_PMP_PUMPS_MONGOAGGREGATE_META_OMITINDEXCREATION</b><br />
Type: `bool`<br />

Set to true to disable the default tyk index creation.

### pumps.mongoaggregate.meta.mongo_session_consistency
EV: <b>TYK_PMP_PUMPS_MONGOAGGREGATE_META_MONGOSESSIONCONSISTENCY</b><br />
Type: `string`<br />

Set the consistency mode for the session, it defaults to `Strong`. The valid values are: strong, monotonic, eventual.

### pumps.mongoaggregate.meta.driver
EV: <b>TYK_PMP_PUMPS_MONGOAGGREGATE_META_MONGODRIVERTYPE</b><br />
Type: `string`<br />

MongoDriverType is the type of the driver (library) to use. The valid values are: “mongo-go” and “mgo”.
Default to “mgo”. Check out this guide to [learn about different MongoDB drivers Tyk Pump support](https://github.com/TykTechnologies/tyk-pump#driver-type).

### pumps.mongoaggregate.meta.mongo_direct_connection
EV: <b>TYK_PMP_PUMPS_MONGOAGGREGATE_META_MONGODIRECTCONNECTION</b><br />
Type: `bool`<br />

MongoDirectConnection informs whether to establish connections only with the specified seed servers,
or to obtain information for the whole cluster and establish connections with further servers too.
If true, the client will only connect to the host provided in the ConnectionString
and won't attempt to discover other hosts in the cluster. Useful when network restrictions
prevent discovery, such as with SSH tunneling. Default is false.

### pumps.mongoaggregate.meta.use_mixed_collection
EV: <b>TYK_PMP_PUMPS_MONGOAGGREGATE_META_USEMIXEDCOLLECTION</b><br />
Type: `bool`<br />

If set to `true` your pump will store analytics to both your organisation defined
collections z_tyk_analyticz_aggregate_{ORG ID} and your org-less tyk_analytics_aggregates
collection. When set to 'false' your pump will only store analytics to your org defined
collection.

### pumps.mongoaggregate.meta.track_all_paths
EV: <b>TYK_PMP_PUMPS_MONGOAGGREGATE_META_TRACKALLPATHS</b><br />
Type: `bool`<br />

Specifies if it should store aggregated data for all the endpoints. By default, `false`
which means that only store aggregated data for `tracked endpoints`.

### pumps.mongoaggregate.meta.ignore_tag_prefix_list
EV: <b>TYK_PMP_PUMPS_MONGOAGGREGATE_META_IGNORETAGPREFIXLIST</b><br />
Type: `[]string`<br />

Specifies prefixes of tags that should be ignored.

### pumps.mongoaggregate.meta.threshold_len_tag_list
EV: <b>TYK_PMP_PUMPS_MONGOAGGREGATE_META_THRESHOLDLENTAGLIST</b><br />
Type: `int`<br />

Determines the threshold of amount of tags of an aggregation. If the amount of tags is superior to the threshold,
it will print an alert.
Defaults to 1000.

### pumps.mongoaggregate.meta.store_analytics_per_minute
EV: <b>TYK_PMP_PUMPS_MONGOAGGREGATE_META_STOREANALYTICSPERMINUTE</b><br />
Type: `bool`<br />

Determines if the aggregations should be made per minute (true) or per hour (false).

### pumps.mongoaggregate.meta.aggregation_time
EV: <b>TYK_PMP_PUMPS_MONGOAGGREGATE_META_AGGREGATIONTIME</b><br />
Type: `int`<br />

Determines the amount of time the aggregations should be made (in minutes). It defaults to the max value is 60 and the minimum is 1.
If StoreAnalyticsPerMinute is set to true, this field will be skipped.

### pumps.mongoaggregate.meta.enable_aggregate_self_healing
EV: <b>TYK_PMP_PUMPS_MONGOAGGREGATE_META_ENABLEAGGREGATESELFHEALING</b><br />
Type: `bool`<br />

Determines if the self healing will be activated or not.
Self Healing allows pump to handle Mongo document's max-size errors by creating a new document when the max-size is reached.
It also divide by 2 the AggregationTime field to avoid the same error in the future.

### pumps.mongoaggregate.meta.ignore_aggregations
EV: <b>TYK_PMP_PUMPS_MONGOAGGREGATE_META_IGNOREAGGREGATIONSLIST</b><br />
Type: `[]string`<br />

This list determines which aggregations are going to be dropped and not stored in the collection.
Posible values are: "APIID","errors","versions","apikeys","oauthids","geo","tags","endpoints","keyendpoints",
"oauthendpoints", and "apiendpoints".

### pumps.mongoselective.name
EV: <b>TYK_PMP_PUMPS_MONGOSELECTIVE_NAME</b><br />
Type: `string`<br />

Deprecated.

### pumps.mongoselective.type
EV: <b>TYK_PMP_PUMPS_MONGOSELECTIVE_TYPE</b><br />
Type: `string`<br />

Sets the pump type. This is needed when the pump key does not equal to the pump name type.

### pumps.mongoselective.filters
This feature adds a new configuration field in each pump called filters and its structure is
the following:
```{.json}
"filters":{
  "api_ids":[],
  "org_ids":[],
  "response_codes":[],
  "skip_api_ids":[],
  "skip_org_ids":[],
  "skip_response_codes":[]
}
```
The fields api_ids, org_ids and response_codes works as allow list (APIs and orgs where we
want to send the analytics records) and the fields skip_api_ids, skip_org_ids and
skip_response_codes works as block list.

The priority is always block list configurations over allow list.

An example of configuration would be:
```{.json}
"csv": {
 "type": "csv",
 "filters": {
   "org_ids": ["org1","org2"]
 },
 "meta": {
   "csv_dir": "./bar"
 }
}
```

### pumps.mongoselective.filters.org_ids
EV: <b>TYK_PMP_PUMPS_MONGOSELECTIVE_FILTERS_ORGSIDS</b><br />
Type: `[]string`<br />

Filters pump data by the whitelisted org_ids.

### pumps.mongoselective.filters.api_ids
EV: <b>TYK_PMP_PUMPS_MONGOSELECTIVE_FILTERS_APIIDS</b><br />
Type: `[]string`<br />

Filters pump data by the whitelisted api_ids.

### pumps.mongoselective.filters.response_codes
EV: <b>TYK_PMP_PUMPS_MONGOSELECTIVE_FILTERS_RESPONSECODES</b><br />
Type: `[]int`<br />

Filters pump data by the whitelisted response_codes.

### pumps.mongoselective.filters.skip_org_ids
EV: <b>TYK_PMP_PUMPS_MONGOSELECTIVE_FILTERS_SKIPPEDORGSIDS</b><br />
Type: `[]string`<br />

Filters pump data by the blacklisted org_ids.

### pumps.mongoselective.filters.skip_api_ids
EV: <b>TYK_PMP_PUMPS_MONGOSELECTIVE_FILTERS_SKIPPEDAPIIDS</b><br />
Type: `[]string`<br />

Filters pump data by the blacklisted api_ids.

### pumps.mongoselective.filters.skip_response_codes
EV: <b>TYK_PMP_PUMPS_MONGOSELECTIVE_FILTERS_SKIPPEDRESPONSECODES</b><br />
Type: `[]int`<br />

Filters pump data by the blacklisted response_codes.

### pumps.mongoselective.timeout
EV: <b>TYK_PMP_PUMPS_MONGOSELECTIVE_TIMEOUT</b><br />
Type: `int`<br />

By default, a pump will wait forever for each write operation to complete; you can configure an optional timeout by setting the configuration option `timeout`.
If you have deployed multiple pumps, then you can configure each timeout independently. The timeout is in seconds and defaults to 0.

The timeout is configured within the main pump config as shown here; note that this example would configure a 5 second timeout:
```{.json}
"pump_name": {
  ...
  "timeout":5,
  "meta": {...}
}
```

Tyk will inform you if the pump's write operation is taking longer than the purging loop (configured via `purge_delay`) as this will mean that data is purged before being written to the target data sink.

If there is no timeout configured and pump's write operation is taking longer than the purging loop, the following warning log will be generated:
`Pump {pump_name} is taking more time than the value configured of purge_delay. You should try to set a timeout for this pump.`

If there is a timeout configured, but pump's write operation is still taking longer than the purging loop, the following warning log will be generated:
`Pump {pump_name} is taking more time than the value configured of purge_delay. You should try lowering the timeout configured for this pump.`.

### pumps.mongoselective.omit_detailed_recording
EV: <b>TYK_PMP_PUMPS_MONGOSELECTIVE_OMITDETAILEDRECORDING</b><br />
Type: `bool`<br />

Setting this to true will avoid writing raw_request and raw_response fields for each request
in pumps. Defaults to `false`.

### pumps.mongoselective.max_record_size
EV: <b>TYK_PMP_PUMPS_MONGOSELECTIVE_MAXRECORDSIZE</b><br />
Type: `int`<br />

Defines maximum size (in bytes) for Raw Request and Raw Response logs, this value defaults
to 0. If it is not set then tyk-pump will not trim any data and will store the full
information. This can also be set at a pump level. For example:
```{.json}
"csv": {
  "type": "csv",
  "max_record_size":1000,
  "meta": {
    "csv_dir": "./"
  }
}
```

### pumps.mongoselective.meta.mongo_url
EV: <b>TYK_PMP_PUMPS_MONGOSELECTIVE_META_MONGOURL</b><br />
Type: `string`<br />

The full URL to your MongoDB instance, this can be a clustered instance if necessary and
should include the database and username / password data.

### pumps.mongoselective.meta.mongo_use_ssl
EV: <b>TYK_PMP_PUMPS_MONGOSELECTIVE_META_MONGOUSESSL</b><br />
Type: `bool`<br />

Set to true to enable Mongo SSL connection.

### pumps.mongoselective.meta.mongo_ssl_insecure_skip_verify
EV: <b>TYK_PMP_PUMPS_MONGOSELECTIVE_META_MONGOSSLINSECURESKIPVERIFY</b><br />
Type: `bool`<br />

Allows the use of self-signed certificates when connecting to an encrypted MongoDB database.

### pumps.mongoselective.meta.mongo_ssl_allow_invalid_hostnames
EV: <b>TYK_PMP_PUMPS_MONGOSELECTIVE_META_MONGOSSLALLOWINVALIDHOSTNAMES</b><br />
Type: `bool`<br />

Ignore hostname check when it differs from the original (for example with SSH tunneling).
The rest of the TLS verification will still be performed.

### pumps.mongoselective.meta.mongo_ssl_ca_file
EV: <b>TYK_PMP_PUMPS_MONGOSELECTIVE_META_MONGOSSLCAFILE</b><br />
Type: `string`<br />

Path to the PEM file with trusted root certificates

### pumps.mongoselective.meta.mongo_ssl_pem_keyfile
EV: <b>TYK_PMP_PUMPS_MONGOSELECTIVE_META_MONGOSSLPEMKEYFILE</b><br />
Type: `string`<br />

Path to the PEM file which contains both client certificate and private key. This is
required for Mutual TLS.

### pumps.mongoselective.meta.mongo_db_type
EV: <b>TYK_PMP_PUMPS_MONGOSELECTIVE_META_MONGODBTYPE</b><br />
Type: `int`<br />

Specifies the mongo DB Type. If it's 0, it means that you are using standard mongo db, if it's 1 it means you are using AWS Document DB, if it's 2, it means you are using CosmosDB.
Defaults to Standard mongo (0).

### pumps.mongoselective.meta.omit_index_creation
EV: <b>TYK_PMP_PUMPS_MONGOSELECTIVE_META_OMITINDEXCREATION</b><br />
Type: `bool`<br />

Set to true to disable the default tyk index creation.

### pumps.mongoselective.meta.mongo_session_consistency
EV: <b>TYK_PMP_PUMPS_MONGOSELECTIVE_META_MONGOSESSIONCONSISTENCY</b><br />
Type: `string`<br />

Set the consistency mode for the session, it defaults to `Strong`. The valid values are: strong, monotonic, eventual.

### pumps.mongoselective.meta.driver
EV: <b>TYK_PMP_PUMPS_MONGOSELECTIVE_META_MONGODRIVERTYPE</b><br />
Type: `string`<br />

MongoDriverType is the type of the driver (library) to use. The valid values are: “mongo-go” and “mgo”.
Default to “mgo”. Check out this guide to [learn about different MongoDB drivers Tyk Pump support](https://github.com/TykTechnologies/tyk-pump#driver-type).

### pumps.mongoselective.meta.mongo_direct_connection
EV: <b>TYK_PMP_PUMPS_MONGOSELECTIVE_META_MONGODIRECTCONNECTION</b><br />
Type: `bool`<br />

MongoDirectConnection informs whether to establish connections only with the specified seed servers,
or to obtain information for the whole cluster and establish connections with further servers too.
If true, the client will only connect to the host provided in the ConnectionString
and won't attempt to discover other hosts in the cluster. Useful when network restrictions
prevent discovery, such as with SSH tunneling. Default is false.

### pumps.mongoselective.meta.max_insert_batch_size_bytes
EV: <b>TYK_PMP_PUMPS_MONGOSELECTIVE_META_MAXINSERTBATCHSIZEBYTES</b><br />
Type: `int`<br />

Maximum insert batch size for mongo selective pump. If the batch we are writing surpass this value, it will be send in multiple batchs.
Defaults to 10Mb.

### pumps.mongoselective.meta.max_document_size_bytes
EV: <b>TYK_PMP_PUMPS_MONGOSELECTIVE_META_MAXDOCUMENTSIZEBYTES</b><br />
Type: `int`<br />

Maximum document size. If the document exceed this value, it will be skipped.
Defaults to 10Mb.

### pumps.prometheus.name
EV: <b>TYK_PMP_PUMPS_PROMETHEUS_NAME</b><br />
Type: `string`<br />

Deprecated.

### pumps.prometheus.type
EV: <b>TYK_PMP_PUMPS_PROMETHEUS_TYPE</b><br />
Type: `string`<br />

Sets the pump type. This is needed when the pump key does not equal to the pump name type.

### pumps.prometheus.filters
This feature adds a new configuration field in each pump called filters and its structure is
the following:
```{.json}
"filters":{
  "api_ids":[],
  "org_ids":[],
  "response_codes":[],
  "skip_api_ids":[],
  "skip_org_ids":[],
  "skip_response_codes":[]
}
```
The fields api_ids, org_ids and response_codes works as allow list (APIs and orgs where we
want to send the analytics records) and the fields skip_api_ids, skip_org_ids and
skip_response_codes works as block list.

The priority is always block list configurations over allow list.

An example of configuration would be:
```{.json}
"csv": {
 "type": "csv",
 "filters": {
   "org_ids": ["org1","org2"]
 },
 "meta": {
   "csv_dir": "./bar"
 }
}
```

### pumps.prometheus.filters.org_ids
EV: <b>TYK_PMP_PUMPS_PROMETHEUS_FILTERS_ORGSIDS</b><br />
Type: `[]string`<br />

Filters pump data by the whitelisted org_ids.

### pumps.prometheus.filters.api_ids
EV: <b>TYK_PMP_PUMPS_PROMETHEUS_FILTERS_APIIDS</b><br />
Type: `[]string`<br />

Filters pump data by the whitelisted api_ids.

### pumps.prometheus.filters.response_codes
EV: <b>TYK_PMP_PUMPS_PROMETHEUS_FILTERS_RESPONSECODES</b><br />
Type: `[]int`<br />

Filters pump data by the whitelisted response_codes.

### pumps.prometheus.filters.skip_org_ids
EV: <b>TYK_PMP_PUMPS_PROMETHEUS_FILTERS_SKIPPEDORGSIDS</b><br />
Type: `[]string`<br />

Filters pump data by the blacklisted org_ids.

### pumps.prometheus.filters.skip_api_ids
EV: <b>TYK_PMP_PUMPS_PROMETHEUS_FILTERS_SKIPPEDAPIIDS</b><br />
Type: `[]string`<br />

Filters pump data by the blacklisted api_ids.

### pumps.prometheus.filters.skip_response_codes
EV: <b>TYK_PMP_PUMPS_PROMETHEUS_FILTERS_SKIPPEDRESPONSECODES</b><br />
Type: `[]int`<br />

Filters pump data by the blacklisted response_codes.

### pumps.prometheus.timeout
EV: <b>TYK_PMP_PUMPS_PROMETHEUS_TIMEOUT</b><br />
Type: `int`<br />

By default, a pump will wait forever for each write operation to complete; you can configure an optional timeout by setting the configuration option `timeout`.
If you have deployed multiple pumps, then you can configure each timeout independently. The timeout is in seconds and defaults to 0.

The timeout is configured within the main pump config as shown here; note that this example would configure a 5 second timeout:
```{.json}
"pump_name": {
  ...
  "timeout":5,
  "meta": {...}
}
```

Tyk will inform you if the pump's write operation is taking longer than the purging loop (configured via `purge_delay`) as this will mean that data is purged before being written to the target data sink.

If there is no timeout configured and pump's write operation is taking longer than the purging loop, the following warning log will be generated:
`Pump {pump_name} is taking more time than the value configured of purge_delay. You should try to set a timeout for this pump.`

If there is a timeout configured, but pump's write operation is still taking longer than the purging loop, the following warning log will be generated:
`Pump {pump_name} is taking more time than the value configured of purge_delay. You should try lowering the timeout configured for this pump.`.

### pumps.prometheus.omit_detailed_recording
EV: <b>TYK_PMP_PUMPS_PROMETHEUS_OMITDETAILEDRECORDING</b><br />
Type: `bool`<br />

Setting this to true will avoid writing raw_request and raw_response fields for each request
in pumps. Defaults to `false`.

### pumps.prometheus.max_record_size
EV: <b>TYK_PMP_PUMPS_PROMETHEUS_MAXRECORDSIZE</b><br />
Type: `int`<br />

Defines maximum size (in bytes) for Raw Request and Raw Response logs, this value defaults
to 0. If it is not set then tyk-pump will not trim any data and will store the full
information. This can also be set at a pump level. For example:
```{.json}
"csv": {
  "type": "csv",
  "max_record_size":1000,
  "meta": {
    "csv_dir": "./"
  }
}
```

### pumps.prometheus.meta.listen_address
EV: <b>TYK_PMP_PUMPS_PROMETHEUS_META_ADDR</b><br />
Type: `string`<br />

The full URL to your Prometheus instance, {HOST}:{PORT}. For example `localhost:9090`.

### pumps.prometheus.meta.path
EV: <b>TYK_PMP_PUMPS_PROMETHEUS_META_PATH</b><br />
Type: `string`<br />

The path to the Prometheus collection. For example `/metrics`.

### pumps.prometheus.meta.aggregate_observations
EV: <b>TYK_PMP_PUMPS_PROMETHEUS_META_AGGREGATEOBSERVATIONS</b><br />
Type: `bool`<br />

This will enable an experimental feature that will aggregate the histogram metrics request time values before exposing them to prometheus.
Enabling this will reduce the CPU usage of your prometheus pump but you will loose histogram precision. Experimental.

### pumps.prometheus.meta.disabled_metrics
EV: <b>TYK_PMP_PUMPS_PROMETHEUS_META_DISABLEDMETRICS</b><br />
Type: `[]string`<br />

Metrics to exclude from exposition. Currently, excludes only the base metrics.

### pumps.prometheus.meta.custom_metrics
EV: <b>TYK_PMP_PUMPS_PROMETHEUS_META_CUSTOMMETRICS</b><br />
Type: `CustomMetrics`<br />

Custom Prometheus metrics.

### pumps.splunk.name
EV: <b>TYK_PMP_PUMPS_SPLUNK_NAME</b><br />
Type: `string`<br />

Deprecated.

### pumps.splunk.type
EV: <b>TYK_PMP_PUMPS_SPLUNK_TYPE</b><br />
Type: `string`<br />

Sets the pump type. This is needed when the pump key does not equal to the pump name type.

### pumps.splunk.filters
This feature adds a new configuration field in each pump called filters and its structure is
the following:
```{.json}
"filters":{
  "api_ids":[],
  "org_ids":[],
  "response_codes":[],
  "skip_api_ids":[],
  "skip_org_ids":[],
  "skip_response_codes":[]
}
```
The fields api_ids, org_ids and response_codes works as allow list (APIs and orgs where we
want to send the analytics records) and the fields skip_api_ids, skip_org_ids and
skip_response_codes works as block list.

The priority is always block list configurations over allow list.

An example of configuration would be:
```{.json}
"csv": {
 "type": "csv",
 "filters": {
   "org_ids": ["org1","org2"]
 },
 "meta": {
   "csv_dir": "./bar"
 }
}
```

### pumps.splunk.filters.org_ids
EV: <b>TYK_PMP_PUMPS_SPLUNK_FILTERS_ORGSIDS</b><br />
Type: `[]string`<br />

Filters pump data by the whitelisted org_ids.

### pumps.splunk.filters.api_ids
EV: <b>TYK_PMP_PUMPS_SPLUNK_FILTERS_APIIDS</b><br />
Type: `[]string`<br />

Filters pump data by the whitelisted api_ids.

### pumps.splunk.filters.response_codes
EV: <b>TYK_PMP_PUMPS_SPLUNK_FILTERS_RESPONSECODES</b><br />
Type: `[]int`<br />

Filters pump data by the whitelisted response_codes.

### pumps.splunk.filters.skip_org_ids
EV: <b>TYK_PMP_PUMPS_SPLUNK_FILTERS_SKIPPEDORGSIDS</b><br />
Type: `[]string`<br />

Filters pump data by the blacklisted org_ids.

### pumps.splunk.filters.skip_api_ids
EV: <b>TYK_PMP_PUMPS_SPLUNK_FILTERS_SKIPPEDAPIIDS</b><br />
Type: `[]string`<br />

Filters pump data by the blacklisted api_ids.

### pumps.splunk.filters.skip_response_codes
EV: <b>TYK_PMP_PUMPS_SPLUNK_FILTERS_SKIPPEDRESPONSECODES</b><br />
Type: `[]int`<br />

Filters pump data by the blacklisted response_codes.

### pumps.splunk.timeout
EV: <b>TYK_PMP_PUMPS_SPLUNK_TIMEOUT</b><br />
Type: `int`<br />

By default, a pump will wait forever for each write operation to complete; you can configure an optional timeout by setting the configuration option `timeout`.
If you have deployed multiple pumps, then you can configure each timeout independently. The timeout is in seconds and defaults to 0.

The timeout is configured within the main pump config as shown here; note that this example would configure a 5 second timeout:
```{.json}
"pump_name": {
  ...
  "timeout":5,
  "meta": {...}
}
```

Tyk will inform you if the pump's write operation is taking longer than the purging loop (configured via `purge_delay`) as this will mean that data is purged before being written to the target data sink.

If there is no timeout configured and pump's write operation is taking longer than the purging loop, the following warning log will be generated:
`Pump {pump_name} is taking more time than the value configured of purge_delay. You should try to set a timeout for this pump.`

If there is a timeout configured, but pump's write operation is still taking longer than the purging loop, the following warning log will be generated:
`Pump {pump_name} is taking more time than the value configured of purge_delay. You should try lowering the timeout configured for this pump.`.

### pumps.splunk.omit_detailed_recording
EV: <b>TYK_PMP_PUMPS_SPLUNK_OMITDETAILEDRECORDING</b><br />
Type: `bool`<br />

Setting this to true will avoid writing raw_request and raw_response fields for each request
in pumps. Defaults to `false`.

### pumps.splunk.max_record_size
EV: <b>TYK_PMP_PUMPS_SPLUNK_MAXRECORDSIZE</b><br />
Type: `int`<br />

Defines maximum size (in bytes) for Raw Request and Raw Response logs, this value defaults
to 0. If it is not set then tyk-pump will not trim any data and will store the full
information. This can also be set at a pump level. For example:
```{.json}
"csv": {
  "type": "csv",
  "max_record_size":1000,
  "meta": {
    "csv_dir": "./"
  }
}
```

### pumps.splunk.meta.collector_token
EV: <b>TYK_PMP_PUMPS_SPLUNK_META_COLLECTORTOKEN</b><br />
Type: `string`<br />

Address of the datadog agent including host & port.

### pumps.splunk.meta.collector_url
EV: <b>TYK_PMP_PUMPS_SPLUNK_META_COLLECTORURL</b><br />
Type: `string`<br />

Endpoint the Pump will send analytics too.  Should look something like:
`https://splunk:8088/services/collector/event`.

### pumps.splunk.meta.ssl_insecure_skip_verify
EV: <b>TYK_PMP_PUMPS_SPLUNK_META_SSLINSECURESKIPVERIFY</b><br />
Type: `bool`<br />

Controls whether the pump client verifies the Splunk server's certificate chain and host name.

### pumps.splunk.meta.ssl_cert_file
EV: <b>TYK_PMP_PUMPS_SPLUNK_META_SSLCERTFILE</b><br />
Type: `string`<br />

SSL cert file location.

### pumps.splunk.meta.ssl_key_file
EV: <b>TYK_PMP_PUMPS_SPLUNK_META_SSLKEYFILE</b><br />
Type: `string`<br />

SSL cert key location.

### pumps.splunk.meta.ssl_server_name
EV: <b>TYK_PMP_PUMPS_SPLUNK_META_SSLSERVERNAME</b><br />
Type: `string`<br />

SSL Server name used in the TLS connection.

### pumps.splunk.meta.obfuscate_api_keys
EV: <b>TYK_PMP_PUMPS_SPLUNK_META_OBFUSCATEAPIKEYS</b><br />
Type: `bool`<br />

Controls whether the pump client should hide the API key. In case you still need substring
of the value, check the next option. Default value is `false`.

### pumps.splunk.meta.obfuscate_api_keys_length
EV: <b>TYK_PMP_PUMPS_SPLUNK_META_OBFUSCATEAPIKEYSLENGTH</b><br />
Type: `int`<br />

Define the number of the characters from the end of the API key. The `obfuscate_api_keys`
should be set to `true`. Default value is `0`.

### pumps.splunk.meta.fields
EV: <b>TYK_PMP_PUMPS_SPLUNK_META_FIELDS</b><br />
Type: `[]string`<br />

Define which Analytics fields should participate in the Splunk event. Check the available
fields in the example below. Default value is `["method",
"path", "response_code", "api_key", "time_stamp", "api_version", "api_name", "api_id",
"org_id", "oauth_id", "raw_request", "request_time", "raw_response", "ip_address"]`.

### pumps.splunk.meta.ignore_tag_prefix_list
EV: <b>TYK_PMP_PUMPS_SPLUNK_META_IGNORETAGPREFIXLIST</b><br />
Type: `[]string`<br />

Choose which tags to be ignored by the Splunk Pump. Keep in mind that the tag name and value
are hyphenated. Default value is `[]`.

### pumps.splunk.meta.enable_batch
EV: <b>TYK_PMP_PUMPS_SPLUNK_META_ENABLEBATCH</b><br />
Type: `bool`<br />

If this is set to `true`, pump is going to send the analytics records in batch to Splunk.
Default value is `false`.

### pumps.sql.name
EV: <b>TYK_PMP_PUMPS_SQL_NAME</b><br />
Type: `string`<br />

Deprecated.

### pumps.sql.type
EV: <b>TYK_PMP_PUMPS_SQL_TYPE</b><br />
Type: `string`<br />

Sets the pump type. This is needed when the pump key does not equal to the pump name type.

### pumps.sql.filters
This feature adds a new configuration field in each pump called filters and its structure is
the following:
```{.json}
"filters":{
  "api_ids":[],
  "org_ids":[],
  "response_codes":[],
  "skip_api_ids":[],
  "skip_org_ids":[],
  "skip_response_codes":[]
}
```
The fields api_ids, org_ids and response_codes works as allow list (APIs and orgs where we
want to send the analytics records) and the fields skip_api_ids, skip_org_ids and
skip_response_codes works as block list.

The priority is always block list configurations over allow list.

An example of configuration would be:
```{.json}
"csv": {
 "type": "csv",
 "filters": {
   "org_ids": ["org1","org2"]
 },
 "meta": {
   "csv_dir": "./bar"
 }
}
```

### pumps.sql.filters.org_ids
EV: <b>TYK_PMP_PUMPS_SQL_FILTERS_ORGSIDS</b><br />
Type: `[]string`<br />

Filters pump data by the whitelisted org_ids.

### pumps.sql.filters.api_ids
EV: <b>TYK_PMP_PUMPS_SQL_FILTERS_APIIDS</b><br />
Type: `[]string`<br />

Filters pump data by the whitelisted api_ids.

### pumps.sql.filters.response_codes
EV: <b>TYK_PMP_PUMPS_SQL_FILTERS_RESPONSECODES</b><br />
Type: `[]int`<br />

Filters pump data by the whitelisted response_codes.

### pumps.sql.filters.skip_org_ids
EV: <b>TYK_PMP_PUMPS_SQL_FILTERS_SKIPPEDORGSIDS</b><br />
Type: `[]string`<br />

Filters pump data by the blacklisted org_ids.

### pumps.sql.filters.skip_api_ids
EV: <b>TYK_PMP_PUMPS_SQL_FILTERS_SKIPPEDAPIIDS</b><br />
Type: `[]string`<br />

Filters pump data by the blacklisted api_ids.

### pumps.sql.filters.skip_response_codes
EV: <b>TYK_PMP_PUMPS_SQL_FILTERS_SKIPPEDRESPONSECODES</b><br />
Type: `[]int`<br />

Filters pump data by the blacklisted response_codes.

### pumps.sql.timeout
EV: <b>TYK_PMP_PUMPS_SQL_TIMEOUT</b><br />
Type: `int`<br />

By default, a pump will wait forever for each write operation to complete; you can configure an optional timeout by setting the configuration option `timeout`.
If you have deployed multiple pumps, then you can configure each timeout independently. The timeout is in seconds and defaults to 0.

The timeout is configured within the main pump config as shown here; note that this example would configure a 5 second timeout:
```{.json}
"pump_name": {
  ...
  "timeout":5,
  "meta": {...}
}
```

Tyk will inform you if the pump's write operation is taking longer than the purging loop (configured via `purge_delay`) as this will mean that data is purged before being written to the target data sink.

If there is no timeout configured and pump's write operation is taking longer than the purging loop, the following warning log will be generated:
`Pump {pump_name} is taking more time than the value configured of purge_delay. You should try to set a timeout for this pump.`

If there is a timeout configured, but pump's write operation is still taking longer than the purging loop, the following warning log will be generated:
`Pump {pump_name} is taking more time than the value configured of purge_delay. You should try lowering the timeout configured for this pump.`.

### pumps.sql.omit_detailed_recording
EV: <b>TYK_PMP_PUMPS_SQL_OMITDETAILEDRECORDING</b><br />
Type: `bool`<br />

Setting this to true will avoid writing raw_request and raw_response fields for each request
in pumps. Defaults to `false`.

### pumps.sql.max_record_size
EV: <b>TYK_PMP_PUMPS_SQL_MAXRECORDSIZE</b><br />
Type: `int`<br />

Defines maximum size (in bytes) for Raw Request and Raw Response logs, this value defaults
to 0. If it is not set then tyk-pump will not trim any data and will store the full
information. This can also be set at a pump level. For example:
```{.json}
"csv": {
  "type": "csv",
  "max_record_size":1000,
  "meta": {
    "csv_dir": "./"
  }
}
```

### pumps.sql.meta.type
EV: <b>TYK_PMP_PUMPS_SQL_META_TYPE</b><br />
Type: `string`<br />

The supported and tested types are `sqlite` and `postgres`.

### pumps.sql.meta.connection_string
EV: <b>TYK_PMP_PUMPS_SQL_META_CONNECTIONSTRING</b><br />
Type: `string`<br />

Specifies the connection string to the database.

### pumps.sql.meta.postgres
Postgres configurations.

### pumps.sql.meta.postgres.prefer_simple_protocol
EV: <b>TYK_PMP_PUMPS_SQL_META_POSTGRES_PREFERSIMPLEPROTOCOL</b><br />
Type: `bool`<br />

Disables implicit prepared statement usage.

### pumps.sql.meta.mysql
Mysql configurations.

### pumps.sql.meta.mysql.default_string_size
EV: <b>TYK_PMP_PUMPS_SQL_META_MYSQL_DEFAULTSTRINGSIZE</b><br />
Type: `uint`<br />

Default size for string fields. Defaults to `256`.

### pumps.sql.meta.mysql.disable_datetime_precision
EV: <b>TYK_PMP_PUMPS_SQL_META_MYSQL_DISABLEDATETIMEPRECISION</b><br />
Type: `bool`<br />

Disable datetime precision, which not supported before MySQL 5.6.

### pumps.sql.meta.mysql.dont_support_rename_index
EV: <b>TYK_PMP_PUMPS_SQL_META_MYSQL_DONTSUPPORTRENAMEINDEX</b><br />
Type: `bool`<br />

Drop & create when rename index, rename index not supported before MySQL 5.7, MariaDB.

### pumps.sql.meta.mysql.dont_support_rename_column
EV: <b>TYK_PMP_PUMPS_SQL_META_MYSQL_DONTSUPPORTRENAMECOLUMN</b><br />
Type: `bool`<br />

`change` when rename column, rename column not supported before MySQL 8, MariaDB.

### pumps.sql.meta.mysql.skip_initialize_with_version
EV: <b>TYK_PMP_PUMPS_SQL_META_MYSQL_SKIPINITIALIZEWITHVERSION</b><br />
Type: `bool`<br />

Auto configure based on currently MySQL version.

### pumps.sql.meta.table_sharding
EV: <b>TYK_PMP_PUMPS_SQL_META_TABLESHARDING</b><br />
Type: `bool`<br />

Specifies if all the analytics records are going to be stored in one table or in multiple
tables (one per day). By default, `false`. If `false`, all the records are going to be
stored in `tyk_aggregated` table. Instead, if it's `true`, all the records of the day are
going to be stored in `tyk_aggregated_YYYYMMDD` table, where `YYYYMMDD` is going to change
depending on the date.

### pumps.sql.meta.log_level
EV: <b>TYK_PMP_PUMPS_SQL_META_LOGLEVEL</b><br />
Type: `string`<br />

Specifies the SQL log verbosity. The possible values are: `info`,`error` and `warning`. By
default, the value is `silent`, which means that it won't log any SQL query.

### pumps.sql.meta.batch_size
EV: <b>TYK_PMP_PUMPS_SQL_META_BATCHSIZE</b><br />
Type: `int`<br />

Specifies the amount of records that are going to be written each batch. Type int. By
default, it writes 1000 records max per batch.

### pumps.sqlaggregate.name
EV: <b>TYK_PMP_PUMPS_SQLAGGREGATE_NAME</b><br />
Type: `string`<br />

Deprecated.

### pumps.sqlaggregate.type
EV: <b>TYK_PMP_PUMPS_SQLAGGREGATE_TYPE</b><br />
Type: `string`<br />

Sets the pump type. This is needed when the pump key does not equal to the pump name type.

### pumps.sqlaggregate.filters
This feature adds a new configuration field in each pump called filters and its structure is
the following:
```{.json}
"filters":{
  "api_ids":[],
  "org_ids":[],
  "response_codes":[],
  "skip_api_ids":[],
  "skip_org_ids":[],
  "skip_response_codes":[]
}
```
The fields api_ids, org_ids and response_codes works as allow list (APIs and orgs where we
want to send the analytics records) and the fields skip_api_ids, skip_org_ids and
skip_response_codes works as block list.

The priority is always block list configurations over allow list.

An example of configuration would be:
```{.json}
"csv": {
 "type": "csv",
 "filters": {
   "org_ids": ["org1","org2"]
 },
 "meta": {
   "csv_dir": "./bar"
 }
}
```

### pumps.sqlaggregate.filters.org_ids
EV: <b>TYK_PMP_PUMPS_SQLAGGREGATE_FILTERS_ORGSIDS</b><br />
Type: `[]string`<br />

Filters pump data by the whitelisted org_ids.

### pumps.sqlaggregate.filters.api_ids
EV: <b>TYK_PMP_PUMPS_SQLAGGREGATE_FILTERS_APIIDS</b><br />
Type: `[]string`<br />

Filters pump data by the whitelisted api_ids.

### pumps.sqlaggregate.filters.response_codes
EV: <b>TYK_PMP_PUMPS_SQLAGGREGATE_FILTERS_RESPONSECODES</b><br />
Type: `[]int`<br />

Filters pump data by the whitelisted response_codes.

### pumps.sqlaggregate.filters.skip_org_ids
EV: <b>TYK_PMP_PUMPS_SQLAGGREGATE_FILTERS_SKIPPEDORGSIDS</b><br />
Type: `[]string`<br />

Filters pump data by the blacklisted org_ids.

### pumps.sqlaggregate.filters.skip_api_ids
EV: <b>TYK_PMP_PUMPS_SQLAGGREGATE_FILTERS_SKIPPEDAPIIDS</b><br />
Type: `[]string`<br />

Filters pump data by the blacklisted api_ids.

### pumps.sqlaggregate.filters.skip_response_codes
EV: <b>TYK_PMP_PUMPS_SQLAGGREGATE_FILTERS_SKIPPEDRESPONSECODES</b><br />
Type: `[]int`<br />

Filters pump data by the blacklisted response_codes.

### pumps.sqlaggregate.timeout
EV: <b>TYK_PMP_PUMPS_SQLAGGREGATE_TIMEOUT</b><br />
Type: `int`<br />

By default, a pump will wait forever for each write operation to complete; you can configure an optional timeout by setting the configuration option `timeout`.
If you have deployed multiple pumps, then you can configure each timeout independently. The timeout is in seconds and defaults to 0.

The timeout is configured within the main pump config as shown here; note that this example would configure a 5 second timeout:
```{.json}
"pump_name": {
  ...
  "timeout":5,
  "meta": {...}
}
```

Tyk will inform you if the pump's write operation is taking longer than the purging loop (configured via `purge_delay`) as this will mean that data is purged before being written to the target data sink.

If there is no timeout configured and pump's write operation is taking longer than the purging loop, the following warning log will be generated:
`Pump {pump_name} is taking more time than the value configured of purge_delay. You should try to set a timeout for this pump.`

If there is a timeout configured, but pump's write operation is still taking longer than the purging loop, the following warning log will be generated:
`Pump {pump_name} is taking more time than the value configured of purge_delay. You should try lowering the timeout configured for this pump.`.

### pumps.sqlaggregate.omit_detailed_recording
EV: <b>TYK_PMP_PUMPS_SQLAGGREGATE_OMITDETAILEDRECORDING</b><br />
Type: `bool`<br />

Setting this to true will avoid writing raw_request and raw_response fields for each request
in pumps. Defaults to `false`.

### pumps.sqlaggregate.max_record_size
EV: <b>TYK_PMP_PUMPS_SQLAGGREGATE_MAXRECORDSIZE</b><br />
Type: `int`<br />

Defines maximum size (in bytes) for Raw Request and Raw Response logs, this value defaults
to 0. If it is not set then tyk-pump will not trim any data and will store the full
information. This can also be set at a pump level. For example:
```{.json}
"csv": {
  "type": "csv",
  "max_record_size":1000,
  "meta": {
    "csv_dir": "./"
  }
}
```

### pumps.sqlaggregate.meta.type
EV: <b>TYK_PMP_PUMPS_SQLAGGREGATE_META_TYPE</b><br />
Type: `string`<br />

The supported and tested types are `sqlite` and `postgres`.

### pumps.sqlaggregate.meta.connection_string
EV: <b>TYK_PMP_PUMPS_SQLAGGREGATE_META_CONNECTIONSTRING</b><br />
Type: `string`<br />

Specifies the connection string to the database.

### pumps.sqlaggregate.meta.postgres
EV: <b>TYK_PMP_PUMPS_SQLAGGREGATE_META_POSTGRES</b><br />
Type: `PostgresConfig`<br />

Postgres configurations.

### pumps.sqlaggregate.meta.postgres.prefer_simple_protocol
EV: <b>TYK_PMP_PUMPS_SQLAGGREGATE_META_POSTGRES_PREFERSIMPLEPROTOCOL</b><br />
Type: `bool`<br />

Disables implicit prepared statement usage.

### pumps.sqlaggregate.meta.mysql
EV: <b>TYK_PMP_PUMPS_SQLAGGREGATE_META_MYSQL</b><br />
Type: `MysqlConfig`<br />

Mysql configurations.

### pumps.sqlaggregate.meta.mysql.default_string_size
EV: <b>TYK_PMP_PUMPS_SQLAGGREGATE_META_MYSQL_DEFAULTSTRINGSIZE</b><br />
Type: `uint`<br />

Default size for string fields. Defaults to `256`.

### pumps.sqlaggregate.meta.mysql.disable_datetime_precision
EV: <b>TYK_PMP_PUMPS_SQLAGGREGATE_META_MYSQL_DISABLEDATETIMEPRECISION</b><br />
Type: `bool`<br />

Disable datetime precision, which not supported before MySQL 5.6.

### pumps.sqlaggregate.meta.mysql.dont_support_rename_index
EV: <b>TYK_PMP_PUMPS_SQLAGGREGATE_META_MYSQL_DONTSUPPORTRENAMEINDEX</b><br />
Type: `bool`<br />

Drop & create when rename index, rename index not supported before MySQL 5.7, MariaDB.

### pumps.sqlaggregate.meta.mysql.dont_support_rename_column
EV: <b>TYK_PMP_PUMPS_SQLAGGREGATE_META_MYSQL_DONTSUPPORTRENAMECOLUMN</b><br />
Type: `bool`<br />

`change` when rename column, rename column not supported before MySQL 8, MariaDB.

### pumps.sqlaggregate.meta.mysql.skip_initialize_with_version
EV: <b>TYK_PMP_PUMPS_SQLAGGREGATE_META_MYSQL_SKIPINITIALIZEWITHVERSION</b><br />
Type: `bool`<br />

Auto configure based on currently MySQL version.

### pumps.sqlaggregate.meta.table_sharding
EV: <b>TYK_PMP_PUMPS_SQLAGGREGATE_META_TABLESHARDING</b><br />
Type: `bool`<br />

Specifies if all the analytics records are going to be stored in one table or in multiple
tables (one per day). By default, `false`. If `false`, all the records are going to be
stored in `tyk_aggregated` table. Instead, if it's `true`, all the records of the day are
going to be stored in `tyk_aggregated_YYYYMMDD` table, where `YYYYMMDD` is going to change
depending on the date.

### pumps.sqlaggregate.meta.log_level
EV: <b>TYK_PMP_PUMPS_SQLAGGREGATE_META_LOGLEVEL</b><br />
Type: `string`<br />

Specifies the SQL log verbosity. The possible values are: `info`,`error` and `warning`. By
default, the value is `silent`, which means that it won't log any SQL query.

### pumps.sqlaggregate.meta.batch_size
EV: <b>TYK_PMP_PUMPS_SQLAGGREGATE_META_BATCHSIZE</b><br />
Type: `int`<br />

Specifies the amount of records that are going to be written each batch. Type int. By
default, it writes 1000 records max per batch.

### pumps.sqlaggregate.meta.track_all_paths
EV: <b>TYK_PMP_PUMPS_SQLAGGREGATE_META_TRACKALLPATHS</b><br />
Type: `bool`<br />

Specifies if it should store aggregated data for all the endpoints. By default, `false`
which means that only store aggregated data for `tracked endpoints`.

### pumps.sqlaggregate.meta.ignore_tag_prefix_list
EV: <b>TYK_PMP_PUMPS_SQLAGGREGATE_META_IGNORETAGPREFIXLIST</b><br />
Type: `[]string`<br />

Specifies prefixes of tags that should be ignored.

### pumps.sqlaggregate.meta.store_analytics_per_minute
EV: <b>TYK_PMP_PUMPS_SQLAGGREGATE_META_STOREANALYTICSPERMINUTE</b><br />
Type: `bool`<br />

Determines if the aggregations should be made per minute instead of per hour.

### pumps.statsd.name
EV: <b>TYK_PMP_PUMPS_STATSD_NAME</b><br />
Type: `string`<br />

Deprecated.

### pumps.statsd.type
EV: <b>TYK_PMP_PUMPS_STATSD_TYPE</b><br />
Type: `string`<br />

Sets the pump type. This is needed when the pump key does not equal to the pump name type.

### pumps.statsd.filters
This feature adds a new configuration field in each pump called filters and its structure is
the following:
```{.json}
"filters":{
  "api_ids":[],
  "org_ids":[],
  "response_codes":[],
  "skip_api_ids":[],
  "skip_org_ids":[],
  "skip_response_codes":[]
}
```
The fields api_ids, org_ids and response_codes works as allow list (APIs and orgs where we
want to send the analytics records) and the fields skip_api_ids, skip_org_ids and
skip_response_codes works as block list.

The priority is always block list configurations over allow list.

An example of configuration would be:
```{.json}
"csv": {
 "type": "csv",
 "filters": {
   "org_ids": ["org1","org2"]
 },
 "meta": {
   "csv_dir": "./bar"
 }
}
```

### pumps.statsd.filters.org_ids
EV: <b>TYK_PMP_PUMPS_STATSD_FILTERS_ORGSIDS</b><br />
Type: `[]string`<br />

Filters pump data by the whitelisted org_ids.

### pumps.statsd.filters.api_ids
EV: <b>TYK_PMP_PUMPS_STATSD_FILTERS_APIIDS</b><br />
Type: `[]string`<br />

Filters pump data by the whitelisted api_ids.

### pumps.statsd.filters.response_codes
EV: <b>TYK_PMP_PUMPS_STATSD_FILTERS_RESPONSECODES</b><br />
Type: `[]int`<br />

Filters pump data by the whitelisted response_codes.

### pumps.statsd.filters.skip_org_ids
EV: <b>TYK_PMP_PUMPS_STATSD_FILTERS_SKIPPEDORGSIDS</b><br />
Type: `[]string`<br />

Filters pump data by the blacklisted org_ids.

### pumps.statsd.filters.skip_api_ids
EV: <b>TYK_PMP_PUMPS_STATSD_FILTERS_SKIPPEDAPIIDS</b><br />
Type: `[]string`<br />

Filters pump data by the blacklisted api_ids.

### pumps.statsd.filters.skip_response_codes
EV: <b>TYK_PMP_PUMPS_STATSD_FILTERS_SKIPPEDRESPONSECODES</b><br />
Type: `[]int`<br />

Filters pump data by the blacklisted response_codes.

### pumps.statsd.timeout
EV: <b>TYK_PMP_PUMPS_STATSD_TIMEOUT</b><br />
Type: `int`<br />

By default, a pump will wait forever for each write operation to complete; you can configure an optional timeout by setting the configuration option `timeout`.
If you have deployed multiple pumps, then you can configure each timeout independently. The timeout is in seconds and defaults to 0.

The timeout is configured within the main pump config as shown here; note that this example would configure a 5 second timeout:
```{.json}
"pump_name": {
  ...
  "timeout":5,
  "meta": {...}
}
```

Tyk will inform you if the pump's write operation is taking longer than the purging loop (configured via `purge_delay`) as this will mean that data is purged before being written to the target data sink.

If there is no timeout configured and pump's write operation is taking longer than the purging loop, the following warning log will be generated:
`Pump {pump_name} is taking more time than the value configured of purge_delay. You should try to set a timeout for this pump.`

If there is a timeout configured, but pump's write operation is still taking longer than the purging loop, the following warning log will be generated:
`Pump {pump_name} is taking more time than the value configured of purge_delay. You should try lowering the timeout configured for this pump.`.

### pumps.statsd.omit_detailed_recording
EV: <b>TYK_PMP_PUMPS_STATSD_OMITDETAILEDRECORDING</b><br />
Type: `bool`<br />

Setting this to true will avoid writing raw_request and raw_response fields for each request
in pumps. Defaults to `false`.

### pumps.statsd.max_record_size
EV: <b>TYK_PMP_PUMPS_STATSD_MAXRECORDSIZE</b><br />
Type: `int`<br />

Defines maximum size (in bytes) for Raw Request and Raw Response logs, this value defaults
to 0. If it is not set then tyk-pump will not trim any data and will store the full
information. This can also be set at a pump level. For example:
```{.json}
"csv": {
  "type": "csv",
  "max_record_size":1000,
  "meta": {
    "csv_dir": "./"
  }
}
```

### pumps.statsd.meta.address
EV: <b>TYK_PMP_PUMPS_STATSD_META_ADDRESS</b><br />
Type: `string`<br />

Address of statsd including host & port.

### pumps.statsd.meta.fields
EV: <b>TYK_PMP_PUMPS_STATSD_META_FIELDS</b><br />
Type: `[]string`<br />

Define which Analytics fields should have its own metric calculation.

### pumps.statsd.meta.tags
EV: <b>TYK_PMP_PUMPS_STATSD_META_TAGS</b><br />
Type: `[]string`<br />

List of tags to be added to the metric.

### pumps.statsd.meta.separated_method
EV: <b>TYK_PMP_PUMPS_STATSD_META_SEPARATEDMETHOD</b><br />
Type: `bool`<br />

Allows to have a separated method field instead of having it embedded in the path field.

### pumps.stdout.name
EV: <b>TYK_PMP_PUMPS_STDOUT_NAME</b><br />
Type: `string`<br />

Deprecated.

### pumps.stdout.type
EV: <b>TYK_PMP_PUMPS_STDOUT_TYPE</b><br />
Type: `string`<br />

Sets the pump type. This is needed when the pump key does not equal to the pump name type.

### pumps.stdout.filters
This feature adds a new configuration field in each pump called filters and its structure is
the following:
```{.json}
"filters":{
  "api_ids":[],
  "org_ids":[],
  "response_codes":[],
  "skip_api_ids":[],
  "skip_org_ids":[],
  "skip_response_codes":[]
}
```
The fields api_ids, org_ids and response_codes works as allow list (APIs and orgs where we
want to send the analytics records) and the fields skip_api_ids, skip_org_ids and
skip_response_codes works as block list.

The priority is always block list configurations over allow list.

An example of configuration would be:
```{.json}
"csv": {
 "type": "csv",
 "filters": {
   "org_ids": ["org1","org2"]
 },
 "meta": {
   "csv_dir": "./bar"
 }
}
```

### pumps.stdout.filters.org_ids
EV: <b>TYK_PMP_PUMPS_STDOUT_FILTERS_ORGSIDS</b><br />
Type: `[]string`<br />

Filters pump data by the whitelisted org_ids.

### pumps.stdout.filters.api_ids
EV: <b>TYK_PMP_PUMPS_STDOUT_FILTERS_APIIDS</b><br />
Type: `[]string`<br />

Filters pump data by the whitelisted api_ids.

### pumps.stdout.filters.response_codes
EV: <b>TYK_PMP_PUMPS_STDOUT_FILTERS_RESPONSECODES</b><br />
Type: `[]int`<br />

Filters pump data by the whitelisted response_codes.

### pumps.stdout.filters.skip_org_ids
EV: <b>TYK_PMP_PUMPS_STDOUT_FILTERS_SKIPPEDORGSIDS</b><br />
Type: `[]string`<br />

Filters pump data by the blacklisted org_ids.

### pumps.stdout.filters.skip_api_ids
EV: <b>TYK_PMP_PUMPS_STDOUT_FILTERS_SKIPPEDAPIIDS</b><br />
Type: `[]string`<br />

Filters pump data by the blacklisted api_ids.

### pumps.stdout.filters.skip_response_codes
EV: <b>TYK_PMP_PUMPS_STDOUT_FILTERS_SKIPPEDRESPONSECODES</b><br />
Type: `[]int`<br />

Filters pump data by the blacklisted response_codes.

### pumps.stdout.timeout
EV: <b>TYK_PMP_PUMPS_STDOUT_TIMEOUT</b><br />
Type: `int`<br />

By default, a pump will wait forever for each write operation to complete; you can configure an optional timeout by setting the configuration option `timeout`.
If you have deployed multiple pumps, then you can configure each timeout independently. The timeout is in seconds and defaults to 0.

The timeout is configured within the main pump config as shown here; note that this example would configure a 5 second timeout:
```{.json}
"pump_name": {
  ...
  "timeout":5,
  "meta": {...}
}
```

Tyk will inform you if the pump's write operation is taking longer than the purging loop (configured via `purge_delay`) as this will mean that data is purged before being written to the target data sink.

If there is no timeout configured and pump's write operation is taking longer than the purging loop, the following warning log will be generated:
`Pump {pump_name} is taking more time than the value configured of purge_delay. You should try to set a timeout for this pump.`

If there is a timeout configured, but pump's write operation is still taking longer than the purging loop, the following warning log will be generated:
`Pump {pump_name} is taking more time than the value configured of purge_delay. You should try lowering the timeout configured for this pump.`.

### pumps.stdout.omit_detailed_recording
EV: <b>TYK_PMP_PUMPS_STDOUT_OMITDETAILEDRECORDING</b><br />
Type: `bool`<br />

Setting this to true will avoid writing raw_request and raw_response fields for each request
in pumps. Defaults to `false`.

### pumps.stdout.max_record_size
EV: <b>TYK_PMP_PUMPS_STDOUT_MAXRECORDSIZE</b><br />
Type: `int`<br />

Defines maximum size (in bytes) for Raw Request and Raw Response logs, this value defaults
to 0. If it is not set then tyk-pump will not trim any data and will store the full
information. This can also be set at a pump level. For example:
```{.json}
"csv": {
  "type": "csv",
  "max_record_size":1000,
  "meta": {
    "csv_dir": "./"
  }
}
```

### pumps.stdout.meta.format
EV: <b>TYK_PMP_PUMPS_STDOUT_META_FORMAT</b><br />
Type: `string`<br />

Format of the analytics logs. Default is `text` if `json` is not explicitly specified. When
JSON logging is used all pump logs to stdout will be JSON.

### pumps.stdout.meta.log_field_name
EV: <b>TYK_PMP_PUMPS_STDOUT_META_LOGFIELDNAME</b><br />
Type: `string`<br />

Root name of the JSON object the analytics record is nested in.

### pumps.syslog.name
EV: <b>TYK_PMP_PUMPS_SYSLOG_NAME</b><br />
Type: `string`<br />

Deprecated.

### pumps.syslog.type
EV: <b>TYK_PMP_PUMPS_SYSLOG_TYPE</b><br />
Type: `string`<br />

Sets the pump type. This is needed when the pump key does not equal to the pump name type.

### pumps.syslog.filters
This feature adds a new configuration field in each pump called filters and its structure is
the following:
```{.json}
"filters":{
  "api_ids":[],
  "org_ids":[],
  "response_codes":[],
  "skip_api_ids":[],
  "skip_org_ids":[],
  "skip_response_codes":[]
}
```
The fields api_ids, org_ids and response_codes works as allow list (APIs and orgs where we
want to send the analytics records) and the fields skip_api_ids, skip_org_ids and
skip_response_codes works as block list.

The priority is always block list configurations over allow list.

An example of configuration would be:
```{.json}
"csv": {
 "type": "csv",
 "filters": {
   "org_ids": ["org1","org2"]
 },
 "meta": {
   "csv_dir": "./bar"
 }
}
```

### pumps.syslog.filters.org_ids
EV: <b>TYK_PMP_PUMPS_SYSLOG_FILTERS_ORGSIDS</b><br />
Type: `[]string`<br />

Filters pump data by the whitelisted org_ids.

### pumps.syslog.filters.api_ids
EV: <b>TYK_PMP_PUMPS_SYSLOG_FILTERS_APIIDS</b><br />
Type: `[]string`<br />

Filters pump data by the whitelisted api_ids.

### pumps.syslog.filters.response_codes
EV: <b>TYK_PMP_PUMPS_SYSLOG_FILTERS_RESPONSECODES</b><br />
Type: `[]int`<br />

Filters pump data by the whitelisted response_codes.

### pumps.syslog.filters.skip_org_ids
EV: <b>TYK_PMP_PUMPS_SYSLOG_FILTERS_SKIPPEDORGSIDS</b><br />
Type: `[]string`<br />

Filters pump data by the blacklisted org_ids.

### pumps.syslog.filters.skip_api_ids
EV: <b>TYK_PMP_PUMPS_SYSLOG_FILTERS_SKIPPEDAPIIDS</b><br />
Type: `[]string`<br />

Filters pump data by the blacklisted api_ids.

### pumps.syslog.filters.skip_response_codes
EV: <b>TYK_PMP_PUMPS_SYSLOG_FILTERS_SKIPPEDRESPONSECODES</b><br />
Type: `[]int`<br />

Filters pump data by the blacklisted response_codes.

### pumps.syslog.timeout
EV: <b>TYK_PMP_PUMPS_SYSLOG_TIMEOUT</b><br />
Type: `int`<br />

By default, a pump will wait forever for each write operation to complete; you can configure an optional timeout by setting the configuration option `timeout`.
If you have deployed multiple pumps, then you can configure each timeout independently. The timeout is in seconds and defaults to 0.

The timeout is configured within the main pump config as shown here; note that this example would configure a 5 second timeout:
```{.json}
"pump_name": {
  ...
  "timeout":5,
  "meta": {...}
}
```

Tyk will inform you if the pump's write operation is taking longer than the purging loop (configured via `purge_delay`) as this will mean that data is purged before being written to the target data sink.

If there is no timeout configured and pump's write operation is taking longer than the purging loop, the following warning log will be generated:
`Pump {pump_name} is taking more time than the value configured of purge_delay. You should try to set a timeout for this pump.`

If there is a timeout configured, but pump's write operation is still taking longer than the purging loop, the following warning log will be generated:
`Pump {pump_name} is taking more time than the value configured of purge_delay. You should try lowering the timeout configured for this pump.`.

### pumps.syslog.omit_detailed_recording
EV: <b>TYK_PMP_PUMPS_SYSLOG_OMITDETAILEDRECORDING</b><br />
Type: `bool`<br />

Setting this to true will avoid writing raw_request and raw_response fields for each request
in pumps. Defaults to `false`.

### pumps.syslog.max_record_size
EV: <b>TYK_PMP_PUMPS_SYSLOG_MAXRECORDSIZE</b><br />
Type: `int`<br />

Defines maximum size (in bytes) for Raw Request and Raw Response logs, this value defaults
to 0. If it is not set then tyk-pump will not trim any data and will store the full
information. This can also be set at a pump level. For example:
```{.json}
"csv": {
  "type": "csv",
  "max_record_size":1000,
  "meta": {
    "csv_dir": "./"
  }
}
```

### pumps.syslog.meta.transport
EV: <b>TYK_PMP_PUMPS_SYSLOG_META_TRANSPORT</b><br />
Type: `string`<br />

Possible values are `udp, tcp, tls` in string form.

### pumps.syslog.meta.network_addr
EV: <b>TYK_PMP_PUMPS_SYSLOG_META_NETWORKADDR</b><br />
Type: `string`<br />

Host & Port combination of your syslog daemon ie: `"localhost:5140"`.

### pumps.syslog.meta.log_level
EV: <b>TYK_PMP_PUMPS_SYSLOG_META_LOGLEVEL</b><br />
Type: `int`<br />

The severity level, an integer from 0-7, based off the Standard:
[Syslog Severity Levels](https://en.wikipedia.org/wiki/Syslog#Severity_level).

### pumps.syslog.meta.tag
EV: <b>TYK_PMP_PUMPS_SYSLOG_META_TAG</b><br />
Type: `string`<br />

Prefix tag

When working with FluentD, you should provide a
[FluentD Parser](https://docs.fluentd.org/input/syslog) based on the OS you are using so
that FluentD can correctly read the logs.

```{.json}
"syslog": {
  "name": "syslog",
  "meta": {
    "transport": "udp",
    "network_addr": "localhost:5140",
    "log_level": 6,
    "tag": "syslog-pump"
  }
```

### pumps.timestream.name
EV: <b>TYK_PMP_PUMPS_TIMESTREAM_NAME</b><br />
Type: `string`<br />

Deprecated.

### pumps.timestream.type
EV: <b>TYK_PMP_PUMPS_TIMESTREAM_TYPE</b><br />
Type: `string`<br />

Sets the pump type. This is needed when the pump key does not equal to the pump name type.

### pumps.timestream.filters
This feature adds a new configuration field in each pump called filters and its structure is
the following:
```{.json}
"filters":{
  "api_ids":[],
  "org_ids":[],
  "response_codes":[],
  "skip_api_ids":[],
  "skip_org_ids":[],
  "skip_response_codes":[]
}
```
The fields api_ids, org_ids and response_codes works as allow list (APIs and orgs where we
want to send the analytics records) and the fields skip_api_ids, skip_org_ids and
skip_response_codes works as block list.

The priority is always block list configurations over allow list.

An example of configuration would be:
```{.json}
"csv": {
 "type": "csv",
 "filters": {
   "org_ids": ["org1","org2"]
 },
 "meta": {
   "csv_dir": "./bar"
 }
}
```

### pumps.timestream.filters.org_ids
EV: <b>TYK_PMP_PUMPS_TIMESTREAM_FILTERS_ORGSIDS</b><br />
Type: `[]string`<br />

Filters pump data by the whitelisted org_ids.

### pumps.timestream.filters.api_ids
EV: <b>TYK_PMP_PUMPS_TIMESTREAM_FILTERS_APIIDS</b><br />
Type: `[]string`<br />

Filters pump data by the whitelisted api_ids.

### pumps.timestream.filters.response_codes
EV: <b>TYK_PMP_PUMPS_TIMESTREAM_FILTERS_RESPONSECODES</b><br />
Type: `[]int`<br />

Filters pump data by the whitelisted response_codes.

### pumps.timestream.filters.skip_org_ids
EV: <b>TYK_PMP_PUMPS_TIMESTREAM_FILTERS_SKIPPEDORGSIDS</b><br />
Type: `[]string`<br />

Filters pump data by the blacklisted org_ids.

### pumps.timestream.filters.skip_api_ids
EV: <b>TYK_PMP_PUMPS_TIMESTREAM_FILTERS_SKIPPEDAPIIDS</b><br />
Type: `[]string`<br />

Filters pump data by the blacklisted api_ids.

### pumps.timestream.filters.skip_response_codes
EV: <b>TYK_PMP_PUMPS_TIMESTREAM_FILTERS_SKIPPEDRESPONSECODES</b><br />
Type: `[]int`<br />

Filters pump data by the blacklisted response_codes.

### pumps.timestream.timeout
EV: <b>TYK_PMP_PUMPS_TIMESTREAM_TIMEOUT</b><br />
Type: `int`<br />

By default, a pump will wait forever for each write operation to complete; you can configure an optional timeout by setting the configuration option `timeout`.
If you have deployed multiple pumps, then you can configure each timeout independently. The timeout is in seconds and defaults to 0.

The timeout is configured within the main pump config as shown here; note that this example would configure a 5 second timeout:
```{.json}
"pump_name": {
  ...
  "timeout":5,
  "meta": {...}
}
```

Tyk will inform you if the pump's write operation is taking longer than the purging loop (configured via `purge_delay`) as this will mean that data is purged before being written to the target data sink.

If there is no timeout configured and pump's write operation is taking longer than the purging loop, the following warning log will be generated:
`Pump {pump_name} is taking more time than the value configured of purge_delay. You should try to set a timeout for this pump.`

If there is a timeout configured, but pump's write operation is still taking longer than the purging loop, the following warning log will be generated:
`Pump {pump_name} is taking more time than the value configured of purge_delay. You should try lowering the timeout configured for this pump.`.

### pumps.timestream.omit_detailed_recording
EV: <b>TYK_PMP_PUMPS_TIMESTREAM_OMITDETAILEDRECORDING</b><br />
Type: `bool`<br />

Setting this to true will avoid writing raw_request and raw_response fields for each request
in pumps. Defaults to `false`.

### pumps.timestream.max_record_size
EV: <b>TYK_PMP_PUMPS_TIMESTREAM_MAXRECORDSIZE</b><br />
Type: `int`<br />

Defines maximum size (in bytes) for Raw Request and Raw Response logs, this value defaults
to 0. If it is not set then tyk-pump will not trim any data and will store the full
information. This can also be set at a pump level. For example:
```{.json}
"csv": {
  "type": "csv",
  "max_record_size":1000,
  "meta": {
    "csv_dir": "./"
  }
}
```

### pumps.timestream.meta.AWSRegion
EV: <b>TYK_PMP_PUMPS_TIMESTREAM_META_AWSREGION</b><br />
Type: `string`<br />

The aws region that contains the timestream database

### pumps.timestream.meta.TableName
EV: <b>TYK_PMP_PUMPS_TIMESTREAM_META_TABLENAME</b><br />
Type: `string`<br />

The table name where the data is going to be written

### pumps.timestream.meta.DatabaseName
EV: <b>TYK_PMP_PUMPS_TIMESTREAM_META_DATABASENAME</b><br />
Type: `string`<br />

The timestream database name that contains the table being written to

### pumps.timestream.meta.Dimensions
EV: <b>TYK_PMP_PUMPS_TIMESTREAM_META_DIMENSIONS</b><br />
Type: `[]string`<br />

A filter of all the dimensions that will be written to the table. The possible options are
["Method","Host","Path","RawPath","APIKey","APIVersion","APIName","APIID","OrgID","OauthID"]

### pumps.timestream.meta.Measures
EV: <b>TYK_PMP_PUMPS_TIMESTREAM_META_MEASURES</b><br />
Type: `[]string`<br />

A filter of all the measures that will be written to the table. The possible options are
["ContentLength","ResponseCode","RequestTime","NetworkStats.OpenConnections",
"NetworkStats.ClosedConnection","NetworkStats.BytesIn","NetworkStats.BytesOut",
"Latency.Total","Latency.Upstream","GeoData.City.GeoNameID","IPAddress",
"GeoData.Location.Latitude","GeoData.Location.Longitude","UserAgent","RawRequest","RawResponse",
"RateLimit.Limit","Ratelimit.Remaining","Ratelimit.Reset",
"GeoData.Country.ISOCode","GeoData.City.Names","GeoData.Location.TimeZone"]

### pumps.timestream.meta.WriteRateLimit
EV: <b>TYK_PMP_PUMPS_TIMESTREAM_META_WRITERATELIMIT</b><br />
Type: `bool`<br />

Set to true in order to save any of the `RateLimit` measures. Default value is `false`.

### pumps.timestream.meta.ReadGeoFromRequest
EV: <b>TYK_PMP_PUMPS_TIMESTREAM_META_READGEOFROMREQUEST</b><br />
Type: `bool`<br />

If set true, we will try to read geo information from the headers if
values aren't found on the analytic record . Default value is `false`.

### pumps.timestream.meta.WriteZeroValues
EV: <b>TYK_PMP_PUMPS_TIMESTREAM_META_WRITEZEROVALUES</b><br />
Type: `bool`<br />

Set to true, in order to save numerical values with value zero. Default value is `false`.

### pumps.timestream.meta.NameMappings
EV: <b>TYK_PMP_PUMPS_TIMESTREAM_META_NAMEMAPPINGS</b><br />
Type: `map[string]string`<br />

A name mapping for both Dimensions and Measures names. It's not required

### analytics_storage_type
EV: <b>TYK_PMP_ANALYTICSSTORAGETYPE</b><br />
Type: `string`<br />

Sets the analytics storage type. Where the pump will be fetching data from. Currently, only
the `redis` option is supported.

### analytics_storage_config
Example Redis storage configuration:
```{.json}
  "analytics_storage_config": {
    "type": "redis",
    "host": "localhost",
    "port": 6379,
    "hosts": null,
    "username": "",
    "password": "",
    "database": 0,
    "optimisation_max_idle": 100,
    "optimisation_max_active": 0,
    "enable_cluster": false,
    "redis_use_ssl": false,
    "redis_ssl_insecure_skip_verify": false
  },
```

### analytics_storage_config.type
EV: <b>TYK_PMP_ANALYTICSSTORAGECONFIG_TYPE</b><br />
Type: `string`<br />

Deprecated.

### analytics_storage_config.host
EV: <b>TYK_PMP_ANALYTICSSTORAGECONFIG_HOST</b><br />
Type: `string`<br />

Redis host value.

### analytics_storage_config.port
EV: <b>TYK_PMP_ANALYTICSSTORAGECONFIG_PORT</b><br />
Type: `int`<br />

Redis port value.

### analytics_storage_config.hosts
EV: <b>TYK_PMP_ANALYTICSSTORAGECONFIG_HOSTS</b><br />
Type: `map[string]string`<br />

Deprecated. Use Addrs instead.

### analytics_storage_config.addrs
EV: <b>TYK_PMP_ANALYTICSSTORAGECONFIG_ADDRS</b><br />
Type: `[]string`<br />

Use instead of the host value if you're running a redis cluster with mutliple instances.

### analytics_storage_config.master_name
EV: <b>TYK_PMP_ANALYTICSSTORAGECONFIG_MASTERNAME</b><br />
Type: `string`<br />

Sentinel redis master name.

### analytics_storage_config.sentinel_password
EV: <b>TYK_PMP_ANALYTICSSTORAGECONFIG_SENTINELPASSWORD</b><br />
Type: `string`<br />

Sentinel redis password.

### analytics_storage_config.username
EV: <b>TYK_PMP_ANALYTICSSTORAGECONFIG_USERNAME</b><br />
Type: `string`<br />

Redis username.

### analytics_storage_config.password
EV: <b>TYK_PMP_ANALYTICSSTORAGECONFIG_PASSWORD</b><br />
Type: `string`<br />

Redis password.

### analytics_storage_config.database
EV: <b>TYK_PMP_ANALYTICSSTORAGECONFIG_DATABASE</b><br />
Type: `int`<br />

Redis database.

### analytics_storage_config.timeout
EV: <b>TYK_PMP_ANALYTICSSTORAGECONFIG_TIMEOUT</b><br />
Type: `int`<br />

How long to allow for new connections to be established (in milliseconds). Defaults to 5sec.

### analytics_storage_config.optimisation_max_idle
EV: <b>TYK_PMP_ANALYTICSSTORAGECONFIG_MAXIDLE</b><br />
Type: `int`<br />

Maximum number of idle connections in the pool.

### analytics_storage_config.optimisation_max_active
EV: <b>TYK_PMP_ANALYTICSSTORAGECONFIG_MAXACTIVE</b><br />
Type: `int`<br />

Maximum number of connections allocated by the pool at a given time. When zero, there is no
limit on the number of connections in the pool. Defaults to 500.

### analytics_storage_config.enable_cluster
EV: <b>TYK_PMP_ANALYTICSSTORAGECONFIG_ENABLECLUSTER</b><br />
Type: `bool`<br />

Enable this option if you are using a redis cluster. Default is `false`.

### analytics_storage_config.redis_key_prefix
EV: <b>TYK_PMP_ANALYTICSSTORAGECONFIG_REDISKEYPREFIX</b><br />
Type: `string`<br />

Prefix the redis key names. Defaults to "analytics-".

### analytics_storage_config.redis_use_ssl
EV: <b>TYK_PMP_ANALYTICSSTORAGECONFIG_REDISUSESSL</b><br />
Type: `bool`<br />

Setting this to true to use SSL when connecting to Redis.

### analytics_storage_config.redis_ssl_insecure_skip_verify
EV: <b>TYK_PMP_ANALYTICSSTORAGECONFIG_REDISSSLINSECURESKIPVERIFY</b><br />
Type: `bool`<br />

Set this to `true` to tell Pump to ignore Redis' cert validation.

### statsd_connection_string
EV: <b>TYK_PMP_STATSDCONNECTIONSTRING</b><br />
Type: `string`<br />

Connection string for StatsD monitoring for information please see the
[Instrumentation docs](https://tyk.io/docs/basic-config-and-security/report-monitor-trigger-events/instrumentation/).

### statsd_prefix
EV: <b>TYK_PMP_STATSDPREFIX</b><br />
Type: `string`<br />

Custom prefix value. For example separate settings for production and staging.

### log_level
EV: <b>TYK_PMP_LOGLEVEL</b><br />
Type: `string`<br />

Set the logger details for tyk-pump. The posible values are: `info`,`debug`,`error` and
`warn`. By default, the log level is `info`.

### log_format
EV: <b>TYK_PMP_LOGFORMAT</b><br />
Type: `string`<br />

Set the logger format. The possible values are: `text` and `json`. By default, the log
format is `text`.

### Health Check
From v2.9.4, we have introduced a `/health` endpoint to confirm the Pump is running. You
need to configure the following settings. This returns a HTTP 200 OK response if the Pump is
running.

### health_check_endpoint_name
EV: <b>TYK_PMP_HEALTHCHECKENDPOINTNAME</b><br />
Type: `string`<br />


The default is "hello".

### health_check_endpoint_port
EV: <b>TYK_PMP_HEALTHCHECKENDPOINTPORT</b><br />
Type: `int`<br />

The default port is 8083.

### omit_detailed_recording
EV: <b>TYK_PMP_OMITDETAILEDRECORDING</b><br />
Type: `bool`<br />

Setting this to true will avoid writing raw_request and raw_response fields for each request
in pumps. Defaults to false.

### max_record_size
EV: <b>TYK_PMP_MAXRECORDSIZE</b><br />
Type: `int`<br />

Defines maximum size (in bytes) for Raw Request and Raw Response logs, this value defaults
to 0. If it is not set then tyk-pump will not trim any data and will store the full
information. This can also be set at a pump level. For example:
```{.json}
"csv": {
  "type": "csv",
  "max_record_size":1000,
  "meta": {
    "csv_dir": "./"
  }
}
```

### omit_config_file
EV: <b>TYK_PMP_OMITCONFIGFILE</b><br />
Type: `bool`<br />

Defines if tyk-pump should ignore all the values in configuration file. Specially useful when setting all configurations in environment variables.

### enable_http_profiler
EV: <b>TYK_PMP_HTTPPROFILE</b><br />
Type: `bool`<br />

Enable debugging of Tyk Pump by exposing profiling information, the same as the gateway https://tyk.io/docs/troubleshooting/tyk-gateway/profiling/

### raw_request_decoded
EV: <b>TYK_PMP_DECODERAWREQUEST</b><br />
Type: `bool`<br />

Setting this to True allows the Raw Request to be decoded from base 64
for all pumps. This is set to false by default.

### raw_response_decoded
EV: <b>TYK_PMP_DECODERAWRESPONSE</b><br />
Type: `bool`<br />

Setting this to True allows the Raw Response to be decoded from base 64 for all pumps. This is set to False by default.

