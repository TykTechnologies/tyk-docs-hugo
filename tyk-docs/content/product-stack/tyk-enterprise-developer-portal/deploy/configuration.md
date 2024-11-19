---
title: "Environment Variables and Configuration"
date: 2022-02-08
tags: ["Configure Tyk Enterprise Developer Portal", "Tyk Enterprise Developer Portal"]
description: "Configuration reference for the Tyk Enterprise Developer Portal"
aliases:
  - tyk-stack/tyk-developer-portal/enterprise-developer-portal/install-tyk-enterprise-portal/configuration
---

To configure the Tyk Enterprise Developer Portal, you can use either a config file or environment variables.
The below table provides reference to all options available to you when configuring the portal.
## Portal settings
This section explains the general portal settings, including which port it will be listening on, how often it should synchronize API Products and plans with the Tyk Dashboard, and so on.
Most of these settings are optional, except for the PORTAL_LICENSEKEY. If you don't specify these settings, the default values will be used.
However, you can leverage the settings below to customize the deployment of your portal.

### Sample storage setting section via config file
```json
{
  "HostPort": 3001,
  "RefreshInterval": 10,
  "LicenseKey": "your-license-key",
  "Theming": {
    "Theme": "default",
    "Path": "./themes"
  },
  "ProductDocRenderer": "stoplight",
  "LogLevel": "debug",
  "LogFormat": "dev",
  "TLSConfig": {
    "Enable": true,
    "InsecureSkipVerify": true,
    "Certificates": [
      {
        "Name": "localhost",
        "CertFile": "portal.crt",
        "KeyFile": "portal.key"
      }
    ],
    "MinVersion": "772"
  },
  "PortalAPISecret": "your-portal-api-secret"
}
```

### Sample storage setting section via environment variables
```.ini
PORTAL_HOSTPORT=3001
PORTAL_REFRESHINTERVAL=10
PORTAL_LICENSEKEY=your-license-key
PORTAL_THEMING_THEME=default
PORTAL_THEMING_PATH=./themes
PORTAL_DOCRENDERER=stoplight
PORTAL_LOG_LEVEL=debug
PORTAL_LOG_FORMAT=dev
PORTAL_TLS_ENABLE=true
PORTAL_TLS_INSECURE_SKIP_VERIFY=true
PORTAL_TLS_CERTIFICATES = '[{"Name": "localhost","CertFile": "portal.crt","KeyFile": "portal.key"}]'
PORTAL_API_SECRET=your-portal-api-secret
```

### PORTAL_HOSTPORT
**Config file:** HostPort <br/>
**Type:** `int` <br/>
**Description**: The port on which the portal will run inside the container. Not required. If it is not specified, the default value is 3001.

### PORTAL_REFRESHINTERVAL
**Config file:** RefreshInterval <br/>
**Type:** `int` <br/>
**Description**: How the portal will synchronise API Products and plans with the Tyk Dashboard. The value is specified in minutes.
Not required. If it is not specified, the default value is 10.

### PORTAL_LICENSEKEY
**Config file:** LicenseKey <br/>
**Type:** `string` <br/>
**Description**: A license key that Tyk provides. Required to start the portal.

### PORTAL_THEMING_THEME
**Config file:** Theming.Theme <br/>
**Type:** `string` <br/>
**Description**: The name of a theme the portal should use after the start-up. You can change this later via the Themes UI.
It's not required to specify as the portal comes with only one theme named `default`,  therefore, PORTAL_THEMING_THEME defaults `default`.
However, if you already created [a theme]({{< ref "/content/tyk-stack/tyk-developer-portal/enterprise-developer-portal/customise-enterprise-portal/full-customisation/full-customisation.md" >}}) and want the portal to use when it's starts for the first time, then you can use this setting to achieve that.

### PORTAL_THEMING_PATH
**Config file:** Theming.Path <br/>
**Type:** `string` <br/>
**Description**: Defines a folder where themes are located. Depending on the storage type that you use, you can specify either a relative or an absolute path:
- If you use the `fs` storage type, you can specify both a relative path (e.g., `./themes`) and an absolute path (e.g., `/themes`)
- If you use the `s3` or `db` storage type, however, you can only use an absolute path (e.g., `/themes`).

The default value for this variable is `./themes`, so it's important to redefine it if you plan to use the `s3` or `db` storage types.

### PORTAL_THEMING_DISABLE_UPLOAD
**Config file:** Theming.DisableUpload <br/>
**Type:** `boolean` <br/>
**Description**: Disables uploading theme via the UI. The default value is `false`.

### PORTAL_MAX_UPLOAD_SIZE
**Config file:** MaxUploadSize <br/>
**Type:** `int` <br/>
**Description**: Defines the maximum size in bytes of a theme file that can be uploaded via the UI. The default value is 33554432 bytes (32 mb).

Please note that the size of individual files should not exceed 5 MB. If the size of any individual file in a theme exceeds 5 MB, the theme will not be uploaded, even if the total size of all files is less than `PORTAL_MAX_UPLOAD_SIZE`.

### PORTAL_DOCRENDERER
**Config file:** ProductDocRenderer <br/>
**Type:** `string` <br/>
**Options:**
- `stoplight` to use Stoplight as a documentation renderer;
- `redoc` to use Redoc as a documentation renderer.

**Description**: Use this setting to specify which OAS documentation renderer to use to render Open API Specification. Not required. If it is not specified, the default value is `stoplight`.

### PORTAL_DCR_LOG_ENABLED
**Config file:** DCRLogEnabled <br/>
**Type:** `boolean` <br/>
**Description**: When enabled, the portal will print raw responses from OAuth2.0 Identity Provider for the DCR flow.
Raw responses from the Identity Providers may contain sensitive information, therefore we recommend enabling this option only for debugging purposes. Available options are:
- `true` for enabling the detailed logs;
- `false` for disabling the detailed logs.
The default value is `false`.

## Audit log settings
This section explains how to configure the audit log in the portal. When the audit log is enabled, each admins' action will leave a trace in the *portal.log* file located at in the directory specified by the `PORTAL_AUDIT_LOG_ENABLE` setting.

### PORTAL_AUDIT_LOG_ENABLE
**Config file:** AuditLog.Enable <br/>
**Type:** `boolean` <br/>
**Description**: Enables the audit log capability. The default value is `false`.

### PORTAL_AUDIT_LOG_PATH
**Config file:** AuditLog.Path <br/>
**Type:** `string` <br/>
**Description**: Path to a directory with the audit log file. When audit log is enabled, the portal will create a file called `portal.log` in that directory. All admin actions will be reflected in that file.

## Session management
This section explains how to configure session management for the portal. Using the settings below, you can configure:
- Name of the portal's session cookie.
- Various aspects of cookie security, including: should it be sent using an TLS-encrypted connection and is it accessible by Javascript API on the client-side?
- Cookie encryption key.
- Cookie lifetime.

### PORTAL_SESSION_NAME
**Config file:** Session.Name <br/>
**Type:** `string` <br/>
**Description**: Name of the portal's cookie. Default value is `portal-session`.

### PORTAL_SESSION_SECURE
**Config file:** Session.Secure <br/>
**Type:** `boolean` <br/>
**Description**: Controls whether the portal adds the `Secure` attribute to the `Set-Cookie` header in all responses from the portal's backend, except for the admin APIs. It's important to note that if the connection between the portal and the browser is not secured with TLS, the browser will ignore the `Secure` attribute.
We recommend enabling TLS and setting this attribute to `true` for all production environments. Default value is `false`.

### PORTAL_SESSION_HTTPONLY
**Config file:** Session.HttpOnly <br/>
**Type:** `boolean` <br/>
**Description**: Controls whether the portal adds the `HttpOnly` attribute to the `Set-Cookie` header in all responses from the portal's backend, except for the admin APIs. This cookie attribute controls if the cookie is only accessible at the server and not by Javascript on the client side.
This is a security measure to prevent XSS attacks.

We recommend setting it to `true` in production environments. The default value is `true`.

### PORTAL_SESSION_SAMESITE
**Config file:** Session.SameSite <br/>
**Type:** `string` <br/>
**Description**: Controls the value of the `SameSite` attribute for the portal’s cookie. The portal adds the `SameStie` attribute with the value specified in `PORTAL_SESSION_SAMESITE` to the `Set-Cookie` header in all responses from the portal's backend, except for the admin APIs.
Available options are:
- `None`;
- `Lax`;
- `Strict`.

The default value is `Strict`. If the value specified in the `PORTAL_SESSION_SAMESITE` setting does not match any of the above-mentioned options, it defaults to `Strict`.

### PORTAL_SESSION_KEY
**Config file:** Session.Key <br/>
**Type:** `string` <br/>
**Description**: The cookie encryption key. The default value is a random 32-bytes string.

### PORTAL_SESSION_LIFETIME
**Config file:** Session.LifeTime <br/>
**Type:** `int` <br/>
**Description**: The lifetime of the portal's session in seconds. The default value is 604800 seconds (7 days).

## PORTAL_SESSION_IDLE_TIMEOUT
**Config file:** Session.IdleTimeout <br/>
**Type:** `int` <br/>
**Description**: The duration in seconds before a portal session is considered idle. A session is deemed idle when there is no user activity, such as clicks, navigation, or input. Once the idle timeout is reached, the session will expire, requiring the user to log in again. The default value is 3600 seconds (1 hour).

### PORTAL_ENABLE_HTTP_PROFILER
**Config file:** EnableHttpProfiler <br/>
**Type:** `boolean` <br/>
**Description**: Enables debugging of the portal by exposing the Golang profiling information at `/debug/pprof/`. The default value is `false`.

{{< note success >}}
**Profiling**

We recommend using the profiler only in non-production environments. Be sure to disable it in production by setting `PORTAL_ENABLE_HTTP_PROFILER` to `false`.

{{< /note >}}

### PORTAL_LOG_LEVEL
**Config file:** LogLevel <br/>
**Type:** `string` <br/>
**Description**: Defines the log level, available options are:
- debug
- info
- warn
- error
- dpanic
- panic
- fatal

### PORTAL_LOG_FORMAT
**Config file:** LogFormat <br/>
**Type:** `string` <br/>
**Description**: Defines the log format, available options are:
- `dev` for verbose human-readable output
- `prod` for output in json format.

### PORTAL_TLS_ENABLE
**Config file:** TLSConfig.Enable <br/>
**Type:** `boolean` <br/>
**Description**: Enables TLS. The default value is `false`.

### PORTAL_TLS_INSECURE_SKIP_VERIFY
**Config file:** TLSConfig.InsecureSkipVerify <br/>
**Type:** `boolean` <br/>
**Description**: Skip verification of self-signed certificates.

### PORTAL_TLS_MIN_VERSION
**Config file:** TLSConfig.MinVersion <br/>
**Type:** `string` <br/>
**Description**: Minimum TLS version. Defaults to 769 (TLS 1.0).

Values for TLS Versions:

| TLS Version   | Value to Use   |
|---------------|----------------|
|      1.0      |      769       |
|      1.1      |      770       |
|      1.2      |      771       |
|      1.3      |      772       |

### PORTAL_TLS_MAX_VERSION
**Config file:** TLSConfig.MaxVersion <br/>
**Type:** `string` <br/>
**Description**: Maximum TLS version. Defaults to 772 (TLS 1.3).

Values for TLS Versions:

| TLS Version   | Value to Use   |
|---------------|----------------|
|      1.0      |      769       |
|      1.1      |      770       |
|      1.2      |      771       |
|      1.3      |      772       |

### PORTAL_TLS_CIPHER_SUITES
**Config file:** TLSConfig.CipherSuites <br/>
**Type:** `[]string` <br/>
**Description**: Array of allowed cipher suites as defined at https://golang.org/pkg/crypto/tls/#pkg-constants.

### PORTAL_TLS_CERTIFICATES
**Config file:** TLSConfig.Certificates <br/>
**Type:** `json` <br/>
**Description**: JSON (or JSON-formatted string in case of environment variable) containing list of certificates. Each certificate is defined by three properties:
- Name
- CertFile
- KeyFile

### PORTAL_API_SECRET
**Config file:** PortalAPISecret <br/>
**Type:** `string` <br/>
**Description**: API secret for enabling [Single Sign-on (SSO) flow]({{< ref "/content/tyk-stack/tyk-developer-portal/enterprise-developer-portal/managing-access/enable-sso.md" >}}) with the Tyk Identity Broker.
You can specify any string value in this setting. Omit this setting if you don't require SSO. 

## Storage settings
Using variables from this section, you can configure storage for the portal's CMS assets such as themes, images, and Open API Specification files. The portal supports two types of storage:
- S3 volume;
- And filesystem.

### Sample storage setting section via config file
```json
{
  "Storage": "s3",
  "S3": {
    "AccessKey": "your-access-key",
    "SecretKey": "your-secret-key",
    "Region": "sa-east-1",
    "Endpoint": "https://s3.sa-east-1.amazonaws.com",
    "Bucket": "your-portal-bucket",
    "ACL": "private",
    "PresignURLs": true
    }
}
```

### Sample storage setting section via environment variables
```.ini
PORTAL_STORAGE=s3
PORTAL_S3_AWS_ACCESS_KEY_ID=your-access-key
PORTAL_S3_AWS_SECRET_ACCESS_KEY=your-secret-key
PORTAL_S3_REGION=sa-east-1
PORTAL_S3_ENDPOINT=your-portal-bucket
PORTAL_S3_BUCKET=https://s3.sa-east-1.amazonaws.com
PORTAL_S3_ACL=private
PORTAL_S3_PRESIGN_URLS=true
```

### PORTAL_STORAGE
**Config file:** Storage <br/>
**Type:** `string` <br/>
**Options:**
- `fs` to use file system storage type;
- `db` to use the portal's main database. If the `db` is selected as a storage type, the portal application will create appropriate structure in the database that 
- `s3` to use S3 volume for storing the portal assets.

**Description**: Defines which type of storage to use for the portal's CMS assets. Not required. If it is not specified, the default value is `fs`.

### PORTAL_S3_AWS_ACCESS_KEY_ID
**Config file:** S3.AccessKey <br/>
**Type:** `string` <br/>
**Description**: Access key for your S3 bucket. This option is only required for the `s3` storage type and will be ignored for the `fs` and `db` storage types.

### PORTAL_S3_AWS_SECRET_ACCESS_KEY
**Config file:** S3.SecretKey <br/>
**Type:** `string` <br/>
**Description**: Secret access key for your S3 bucket. This option is only required for the `s3` storage type and will be ignored for the `fs` and `db` storage types.

### PORTAL_S3_REGION
**Config file:** S3.Region <br/>
**Type:** `string` <br/>
**Description**: AWS region where the S3 bucket is hosted. E.g., `sa-east-1`. This option is only required for the `s3` storage type and will be ignored for the `fs` and `db` storage types.

### PORTAL_S3_ENDPOINT
**Config file:** S3.Endpoint <br/>
**Type:** `string` <br/>
**Description**: URL to object storage service. E.g., `https://s3.sa-east-1.amazonaws.com` or `https://play.min.io`. This option is only required for the `s3` storage type and will be ignored for the `fs` and `db` storage types.

### PORTAL_S3_BUCKET
**Config file:** S3.Bucket <br/>
**Type:** `string` <br/>
**Description**: Name of the S3 bucket. Required only for the `s3` storage type. This option is only required for the `s3` storage type and will be ignored for the `fs` and `db` storage types.

### PORTAL_S3_ACL
**Config file:** S3.ACL <br/>
**Type:** `string` <br/>
**Description**: ACL permissions are set on the bucket, with options including `private`, `public-read`, `public-read-write`, and `authenticated-read`.
If the bucket uses a policy to set permissions, you should leave the ACL value empty. This option is only required for the `s3` storage type and will be ignored for the `fs` and `db` storage types.

### PORTAL_S3_PRESIGN_URLS
**Config file:** S3.PresignURLs <br/>
**Type:** `string` <br/>
**Description**: The PresignURLs option instructs the client to retrieve presigned URLs for the objects.
This is particularly useful if the bucket is private and you need to access the object directly, such as when displaying an image on a web page.
This option is only required for the `s3` storage type and will be ignored for the `fs` and `db` storage types.

### PORTAL_ASSETS_CACHE_DISABLE
**Config file:** AssetsCache.Disable <br/>
**Type:** `boolean` <br/>
**Description**: If the storage type is set to `db`, an in memory cache will be used for the themes storage. This configuration disables the assets cache. The default value is `false`.

## TLS configuration
This section explains the TLS configuration settings to enable connection to the portal's UI over HTTPS.

### PORTAL_TLS_ENABLE
**Config file:** TLSConfig.Enable <br/>
**Type:** `boolean` <br/>
**Description**: Enables or disables connection over https. When TLS is enabled, the portal will expect a TLS certificate to be provided via *PORTAL_TLS_CERTIFICATES*.
When TLS is enabled and no certificates are provided, the portal won't start. The default value is `false`.

### PORTAL_TLS_CERTIFICATES
**Config file:** TLSConfig.Certificates <br/>
**Type:** `string` <br/>
**Description**: A JSON formatted string that provides the hostname , in addition to the paths to a TLS certificate and key file:
- `Name`: The hostname of the portal. This should match with the hostname of the certificate file.
- `CertFile`: The path to a TLS certificate file in the CRT format for the specified hostname.
- `KeyFile`: The path to a TLS key file for the specified hostname.
Example:
```json
[{"Name": "tyk.io","CertFile": "portal.crt","KeyFile": "portal.key"}]
```


## Database connection settings
This section provides a reference for the database connection settings used in the portal.
### Sample database connection setting section via config file
```json
{
  "Database": {
    "Dialect": "mysql",
    "ConnectionString": "admin:secr3t@(localhost:3308)/portal?charset=utf8&parseTime=True&loc=Local",
    "EnableLogs": true,
    "MaxRetries": 3,
    "RetryDelay": 2000,
    "MaxOpenConnections": 20,
    "MaxIdleConnections": 2,
    "ConnectionMaxLifetime": 180000

  }
}
```

### Sample database connection setting section via environment variables
```.ini
PORTAL_DATABASE_DIALECT="mysql"
PORTAL_DATABASE_CONNECTIONSTRING="admin:secr3t@(localhost:3308)/portal?charset=utf8&parseTime=True&loc=Local"
PORTAL_DATABASE_ENABLELOGS=true
PORTAL_DATABASE_MAXRETRIES=3
PORTAL_DATABASE_RETRYDELAY=5000
PORTAL_DATABASE_MAX_OPEN_CONNECTIONS=20
PORTAL_DATABASE_MAX_IDLE_CONNECTIONS=2
PORTAL_DATABASE_CONNECTION_MAX_LIFETIME=180000
```

### PORTAL_DATABASE_DIALECT
**Config file:** Database.Dialect  <br/>
**Type:** `string` <br/>
**Description**: A database will be used to store the portal data. Available dialects are:
- `mysql`
- `postgres`
- `sqlite3`

### PORTAL_DATABASE_CONNECTIONSTRING
**Config file:** Database.ConnectionString <br/>
**Type:** `string` <br/>
**Description**: Connection string to the selected database. This setting must be present if the `PORTAL_DATABASE_DIALECT` is specified.

### PORTAL_DATABASE_ENABLELOGS
**Config file:** Database.EnableLogs <br/>
**Type:** `boolean` <br/>
**Description**: Enables logging connection to the database. We recommend disabling this in production environments.

### PORTAL_DATABASE_MAXRETRIES
**Config file:** Database.MaxRetries <br/>
**Type:** `boolean` <br/>
**Description**: Defines how many times the portal will retry to connect to the database. Optional, the default value is 3.

### PORTAL_DATABASE_RETRYDELAY
**Config file:** Database.MaxRetries <br/>
**Type:** `boolean` <br/>
**Description**: Defines delay between connect attempts (in milliseconds). Optional, the default value is 5000.

### PORTAL_DATABASE_MAX_OPEN_CONNECTIONS
**Config file:** Database.MaxOpenConnections <br/>
**Type:** `int` <br/>
**Description**: Defines the maximum number of concurrent connections that the database can handle from the application. When the number of open connections reaches this limit, new requests will wait until a connection becomes available. Optional, the default value is unlimited.

### PORTAL_DATABASE_MAX_IDLE_CONNECTIONS
**Config file:** Database.MaxIdleConnections <br/>
**Type:** `int` <br/>
**Description**: Defines the maximum number of idle connections in the database connection pool. Idle connections are open but not currently being used. Keeping some idle connections can improve performance by reducing the time it takes to establish a new connection when demand increases. Optional, the default value is 2.

### PORTAL_DATABASE_CONNECTION_MAX_LIFETIME
**Config file:** Database.ConnectionMaxLifetime <br/>
**Type:** `int` <br/>
**Description**: Defines the maximum lifetime of a connection in milliseconds. This setting is optional. If not specified, the default value is 1800000 milliseconds (30 minutes). If set to `0`, the connection lifetime is unlimited, meaning connections are reused indefinitely unless closed due to errors or manually by the application.


## CORS settings
This section explains how to configure [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) for the portal.

### PORTAL_CORS_ENABLE
**Config file:** CORS.Enable <br/>
**Type:** `boolean` <br/>
**Description**: Enables or disables the CORS settings for the portal. When disabled no CORS settings are applied.
In other words, any cross-origin request will be denied. When enabled, the below defined CORS settings are applied. The default value is `false`.

### PORTAL_CORS_ALLOWED_ORIGINS
**Config file:** CORS.AllowedOrigins <br/>
**Type:** `[string]` <br/>
**Description**: A list of origin domains to allow access from. Wildcards are also supported, e.g. [`*.foo.com`] will allow access from any domain that ends with *.foo.com*.
By default, no origins are allowed. To apply this setting an array of the allowed origins.

To configure using a configuration file:
```json
{
  "CORS": {
    "AllowedOrigins": ["*.foo.com","*.bar.com"]
  }
}
```
To configure using an environment variable:
```console
PORTAL_CORS_ALLOWED_ORIGINS=*.foo.com,*.bar.com
```

### PORTAL_CORS_ALLOWED_HEADERS
**Config file:** CORS.AllowedHeaders <br/>
**Type:** `[string]` <br/>
**Description**: Headers that are allowed within a request. To apply this setting, specify an array of the allowed headers. By default, no headers are allowed.

To configure using a configuration file:
```json
{
  "CORS": {
    "AllowedHeaders": ["X-Method-Override","X-API-Key"]
  }
}
```
To configure using an environment variable:
```console
PORTAL_CORS_ALLOWED_HEADERS=X-Method-Override,X-API-Key
```

### PORTAL_CORS_ALLOWED_METHODS
**Config file:** CORS.AllowedMethods <br/>
**Type:** `[string]` <br/>
**Description**: A list of methods that are allowed access access. To apply this setting specify an array of the allowed methods. By default, `GET` and `POST` methods are allowed.

To configure using a configuration file:
```json
{
  "CORS": {
    "AllowedMethods": ["GET", "POST", "HEAD"]
  }
}
```
To configure using an environment variable:
```console
PORTAL_CORS_ALLOWED_METHODS=GET,POST,HEAD
```

### PORTAL_CORS_MAX_AGE
**Config file:** CORS.MaxAge <br/>
**Type:** `int` <br/>
**Description**: Indicates how long the results of a preflight request can be cached. The default value is `0` which stands for no max age.


### PORTAL_CORS_ALLOW_CREDENTIALS
**Config file:** CORS.AllowCredentials <br/>
**Type:** `boolean` <br/>
**Description**: Indicates whether the request can include user credentials like cookies, HTTP authentication or client side SSL certificates. The default is `false`.

### PORTAL_TIB_ENABLED
**Config file:** TIB.Enabled <br/>
**Type:** `boolean` <br/>
**Description**: Enables or disables the Tyk Identity Broker (TIB) integration. When disabled, it will not appear in the UI. The default value is `false`.

### PORTAL_NOTIFICATIONS_JOB_FREQUENCY
**Config file:** NotificationsJobFrequency <br/>
**Type:** `int` <br/>
**Description**: Defines the frequency of the notifications job that fetch notifications from the portal's database in minutes. The default value is `30` minutes.

## Sample config file
```json
{
  "HostPort": 3001,
  "RefreshInterval": 10,
  "LicenseKey": "your-license-key",
  "Theming": {
    "Theme": "default",
    "Path": "./themes"
  },
  "ProductDocRenderer": "stoplight",
  "LogLevel": "debug",
  "LogFormat": "dev",
  "TLSConfig": {
    "Enable": true,
    "InsecureSkipVerify": true,
    "Certificates": [
      {
        "Name": "localhost",
        "CertFile": "portal.crt",
        "KeyFile": "portal.key"
      }
    ]
  },
  "PortalAPISecret": "your-portal-api-secret",
  "Storage": "s3",
  "S3": {
    "AccessKey": "your-access-key",
    "SecretKey": "your-secret-key",
    "Region": "sa-east-1",
    "Endpoint": "https://s3.sa-east-1.amazonaws.com",
    "Bucket": "your-portal-bucket",
    "ACL": "private",
    "PresignURLs": true
  },
  "Database": {
    "Dialect": "mysql",
    "ConnectionString": "admin:secr3t@(localhost:3308)/portal?charset=utf8&parseTime=True&loc=Local",
    "EnableLogs": true,
    "MaxRetries": 3,
    "RetryDelay": 2000
  },
  "TIB": {
    "Enabled": true
  }
}
```
## Sample .env file
```ini
PORTAL_HOSTPORT=3001
PORTAL_REFRESHINTERVAL=10
PORTAL_LICENSEKEY=your-license-key
PORTAL_THEMING_THEME=default
PORTAL_THEMING_PATH=./themes
PORTAL_DOCRENDERER=stoplight
PORTAL_LOG_LEVEL=debug
PORTAL_LOG_FORMAT=dev
PORTAL_TLS_ENABLE=true
PORTAL_TLS_INSECURE_SKIP_VERIFY=true
PORTAL_TLS_CERTIFICATES = '[{"Name": "localhost","CertFile": "portal.crt","KeyFile": "portal.key"}]'
PORTAL_API_SECRET=your-portal-api-secret
PORTAL_STORAGE=s3
PORTAL_S3_AWS_ACCESS_KEY_ID=your-access-key
PORTAL_S3_AWS_SECRET_ACCESS_KEY=your-secret-key
PORTAL_S3_REGION=sa-east-1
PORTAL_S3_ENDPOINT=your-portal-bucket
PORTAL_S3_BUCKET=https://s3.sa-east-1.amazonaws.com
PORTAL_S3_ACL=private
PORTAL_S3_PRESIGN_URLS=true
PORTAL_DATABASE_DIALECT="mysql"
PORTAL_DATABASE_CONNECTIONSTRING="admin:secr3t@(localhost:3308)/portal?charset=utf8&parseTime=True&loc=Local"
PORTAL_DATABASE_ENABLELOGS=true
PORTAL_DATABASE_MAXRETRIES=3
PORTAL_DATABASE_RETRYDELAY=5000
PORTAL_TIB_ENABLED=true
```
