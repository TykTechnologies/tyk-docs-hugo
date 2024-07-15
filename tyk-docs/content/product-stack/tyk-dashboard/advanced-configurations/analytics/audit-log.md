---
title: Configuring Tyk Dashboard Audit Log
description: Audit log configuration
tags: ["audit", "audit records", "audit log"]
---

The audit log contains audit records for all requests made to all endpoints under the `/api` route. Audit logs are written to file in JSON or text format.

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

| Parameter | Description | Default |
| ---- | ---- | ---- |
| enabled | Enable audit logging. Setting `security.audit_log_path` also enables audit logging | true |
| format | Specifies audit log file format. Valid values are `json` and `text` | `text` |
| path | Path to the audit log. Overwrites `security.audit_log_path` if it was set | |
| detailed_recording | Enable detailed records in the audit log. If set to `true` then audit log records will contain the http-request (without body) and full http-response including the body | `false` |

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
