---
title: Configuring Telemetry in Tyk Cloud
description: "Configuring Telemetry in Tyk Cloud"
menu: "main"
tags: [ "Tyk Cloud", "Telemetry", "Configuration" ]
---

Configuring telemetry in Tyk cloud is a two step process. 
1. Configure a provider/backend at organization level.
2. Enable/Disable telemetry option while creating/updating a `Cloud Data Plane`.

{{< note success >}}
**Note**

Before diving into the configuration details, please note that Telemetry is an add-on feature in Tyk Cloud.
To enable this capability for your account, please contact our [support team](https://support.tyk.io/).
Our team will help you activate this feature and ensure you have access to all the Telemetry options.
{{< /note >}}

## Steps for Configuring Telemetry Provider in Tyk Cloud

**Step 1. Choosing Your Provider**

In the `Tyk Cloud Console`, select `Telemetry` option. You'll see a grid displaying all supported backends/providers. Click on your preferred backend/provider to begin the configuration process.

{{< note success >}}
**Note**

Only a single provider/backend can be configured at any given time.
{{< /note >}}

{{< img src="/img/cloud/telemetry-exports.png" alt="Tyk Cloud Telemetry providers" >}}

**Step 2. Configuring Basic Elements**

Every telemetry backend shares these fundamental settings:

1. **Connection Toggle:** This switch activates or deactivates your telemetry export. When enabled, Tyk will start sending monitoring data to your chosen platform.

2. **Sampling Rate:** This setting determines what percentage of your API traffic data gets sent to your monitoring platform. The default is 10%, which means Tyk will send data for one out of every ten API calls.

**Step 3. Configuring Optional Settings**

Beyond the basic settings, you can customize your telemetry with two optional features:

1. **Tags to Add to the Traces :**
   Add custom labels to your telemetry data to make it easier to analyze. For example:
   ```
   environment:production
   region:europe
   team:api-gateway
   ```

2. **Fields to Filter :**
   Specify which data fields should be excluded from your telemetry. This is useful for ensuring sensitive information doesn't get sent to your monitoring platform.

**Step 4. Configuring Provider-Specific Configuration**

Each monitoring platform has its own requirements for connection. Let's explore what you'll need for each:

### Configuring Datadog Provider

- **Provider Site:** Enter your Datadog URL (like us5.datadoghq.com)
- **API Key:** Your Datadog authentication key

  Example: A Datadog setup might look like:
  ```
  Provider Site: us5.datadoghq.com
  API Key: your-datadog-api-key
  ```

{{< img src="/img/cloud/telemetry-datadog.png" alt="Tyk Cloud Telemetry Datadog" >}}

### Configuring Dynatrace Provider

- **Provider Endpoint:** Your Dynatrace environment URL
- **API Token:** Your Dynatrace access token

  Example configuration:
  ```
  Provider Endpoint: https://<YOUR-ENVIRONMENT-STRING>.live.dynatrace.com/api/v2/otlp
  API Token: your-dynatrace-token
  ```

{{< img src="/img/cloud/telemetry-dynatrace.png" alt="Tyk Cloud Telemetry Dynatrace" >}}

### Configuring New Relic Provider

- **Provider Endpoint:** Your New Relic HTTP endpoint
- **API Token:** Your New Relic license key

  Example configuration:
  ```
  Provider Endpoint: https://security-api.newrelic.com/security/v1
  API Token: your-newrelic-api-key
  ```

{{< img src="/img/cloud/telemetry-newrelic.png" alt="Tyk Cloud Telemetry NewRelic" >}}

### Configuring Elastic Provider

- **Provider Endpoint:** Your Elastic APM server address
- **Secret Token:** Your Elastic APM authentication token
  
  Example setup:
  ```
  Provider Endpoint: https://your-elastic-cluster:8200
  Secret Token: your-elastic-secret-token
  ```

{{< img src="/img/cloud/telemetry-elastic.png" alt="Tyk Cloud Telemetry Elastic" >}}

### Configuring Custom Provider

For when you need to connect to a different monitoring system:

- **Exporter:** Choose gRPC/HTTP
- **Provider Endpoint:** Your monitoring system URL
- **Authorization:** Configure how Tyk should authenticate with your system

  Example custom configuration:
  ```
  Exporter: gRPC/HTTP
  Provider Endpoint: grpc://your-collector:4317
  Authorization Header Name: Authorization
  Authorization Header Value: Bearer your-token
  ```

{{< img src="/img/cloud/telemetry-custom.png" alt="Tyk Cloud Telemetry Custom" >}}


## Configure Telemetry Export in Cloud Data Plane Deployments

When creating a new Cloud Data Plane deployment or editing an existing one, you can configure telemetry export settings. These settings are specific to Cloud Data Plane deployments only and allow you to monitor API performance through your chosen telemetry provider.

When you modify any general telemetry settings in Tyk Cloud, these changes don't take immediate effect.
Your Cloud Data Planes need to be redeployed to activate the new telemetry configuration.

#### Configuration Options

{{< img src="/img/cloud/telemetry-enable.png" alt="Tyk Cloud Telemetry Enable" >}}

1. **Enable Datadog Connection**
    - Toggle switch to enable/disable Datadog monitoring for this specific Cloud Data Plane deployment

2. **Sampling Rate Override**
    - Choose what percentage of API traffic to monitor (default: 10%)

  {{< note success >}}
  **Note**

  The sampling level can be configured at both the organization level (while setting up the provider) and the `Cloud Data Plane`. The configuration at the Cloud Data Plane will override the organization-level settings.
  {{< /note >}}