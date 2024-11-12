---
title: Configuring Tyk Dashboard Audit Log
description: Audit log configuration
tags: ["audit", "audit records", "audit log"]
---

The audit log system captures detailed records of all requests made to endpoints under the `/api` route. These audit logs can be stored either in files (in JSON or text format) or in the database, providing flexible options for log management and retrieval.

Subsequently, if hosting Tyk Dashboard within a Kubernetes cluster, please ensure that the configured log file path is valid and writeable.

The Tyk Dashboard config section contains an audit section for configuring audit logging behavior. An example is listed below.

```yaml
  ...
  "audit": {
    "enabled": true,
    "format": "json",
    "path": "/tmp/audit.log",
    "detailed_recording": false
  },
  ...
```

## Configuration Parameters

| Parameter | Description                                                                                                                                                              | Default |
| ---- |--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------|
| enabled | Enable audit logging. Setting `security.audit_log_path` also enables audit logging                                                                                       | true    |
| format | Specifies audit log file format. Valid values are `json` and `text`                                                                                                      | `text`  |
| path | Path to the audit log. Overwrites `security.audit_log_path` if it was set                                                                                                |         |
| detailed_recording | Enable detailed records in the audit log. If set to `true` then audit log records will contain the http-request (without body) and full http-response including the body | `false` |
| store_type | Specifies the storage in which audit logs will be written, valid values are `file` and `db`.                                                          | `file`  |

Please consult [Tyk Dashboard Configuration Options]({{< ref "tyk-dashboard/configuration#audit" >}}) for equivalent configuration with environment variables.

### JSON File Format

Audit records the following fields for `json` format:

| Field | Description |
| ---- | ---- |
| req_id | Unique request ID |
| org_id | Organization ID |
| date   | Date in *RFC1123* format |
| timestamp | UNIX timestamp |
| ip | IP address the request originated from |
| user | Dashboard user who performed the request |
| action | Description of the action performed (e.g. Update User) |
| method | HTTP request method |
| url | URL of the request |
| status | HTTP response status of the request |
| diff | Provides a diff of changed fields (available only for PUT requests) |
| request_dump | HTTP request copy (available if `detailed_recording` is set to `true`) |
| response_dump | HTTP response copy (available if `detailed_recording` is set to `true`) |

### Text File Format

The `text` format outputs all fields as plain text separated with a new line and provided in the same order as `json` format.

### Database Storage Support

In addition to file storage, audit logs can be stored in the main database (MongoDB or Postgres), this feature has been available since Tyk 5.7.0. To enable database storage set `audit.store_type` to `db`:

```yaml
...
    "audit": {
      "enabled": true,
      "store_type": "db",
      "detailed_recording": false
    }
...
```

When `store_type` is set to `db`, audit logs will be stored in the main database storage instead of a file.

### Retrieving Audit Logs via API

Since Tyk 5.7.0 a new API endpoint has been added to allow authorized users to retrieve audit logs from the database storage. To know more about the API specifications, check out the swagger [documentation]({{<ref "tyk-dashboard-api" >}}).
To access the audit logs through the API ensure that your user account or group has been granted the "Audit Logs" RBAC group. If you do not have the necessary permissions, please contact your system administrator.