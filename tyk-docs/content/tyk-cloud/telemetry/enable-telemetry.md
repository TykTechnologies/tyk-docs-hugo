---
title: Setting Up Your Telemetry Connection
description: "Setting Up Your Telemetry Connection"
menu: "main"
tags: [ "Tyk Cloud", "Telemetry", "Configuration" ]
---

### First Step: Choosing Your Provider

When you first navigate to the Telemetry, you'll see a grid displaying all available providers. Each option shows the
provider's logo and name. Click on your preferred provider to begin the configuration process.

{{< img src="/img/cloud/telemetry-exports.png" alt="Tyk Cloud Telemetry providers" >}}

### Basic Configuration Elements

Every telemetry connection shares these fundamental settings:

1. Connection Toggle: This switch activates or deactivates your telemetry export. When enabled, Tyk will start sending monitoring data to your chosen platform.

2. Sampling Rate: This setting determines what percentage of your API traffic data gets sent to your monitoring platform. The default is 10%, which means Tyk will send data for one out of every ten API calls.

### Optional Settings

Beyond the basic settings, you can customize your telemetry with two optional features:

1. Tags to Add to the Traces
   Add custom labels to your telemetry data to make it easier to analyze. For example:
   ```
   environment:production
   region:europe
   team:api-gateway
   ```

2. Fields to Filter
   Specify which data fields should be excluded from your telemetry. This is useful for ensuring sensitive information doesn't get sent to your monitoring platform.

### Provider-Specific Configuration

Each monitoring platform has its own requirements for connection. Let's explore what you'll need for each:

#### Datadog

- Provider Site: Enter your Datadog URL (like us5.datadoghq.com)
- API Key: Your Datadog authentication key
- Example: A Datadog setup might look like:
  ```
  Provider Site: us5.datadoghq.com
  API Key: your-datadog-api-key
  ```

{{< img src="/img/cloud/telemetry-datadog.png" alt="Tyk Cloud Telemetry Datadog" >}}

#### Dynatrace

- Provider Endpoint: Your Dynatrace environment URL
- API Token: Your Dynatrace access token
- Example configuration:
  ```
  Provider Endpoint: https://<YOUR-ENVIRONMENT-STRING>.live.dynatrace.com/api/v2/otlp
  API Token: your-dynatrace-token
  ```

{{< img src="/img/cloud/telemetry-dynatrace.png" alt="Tyk Cloud Telemetry Dynatrace" >}}

#### New Relic

- Provider Endpoint: Your New Relic HTTP endpoint
- API Token: Your New Relic license key
- Example configuration:
  ```
  Provider Endpoint: https://security-api.newrelic.com/security/v1
  API Token: your-newrelic-api-key
  ```

{{< img src="/img/cloud/telemetry-newrelic.png" alt="Tyk Cloud Telemetry NewRelic" >}}

#### Elastic

- Provider Endpoint: Your Elastic APM server address
- Secret Token: Your Elastic APM authentication token
- Example setup:
  ```
  Provider Endpoint: https://your-elastic-cluster:8200
  Secret Token: your-elastic-secret-token
  ```

{{< img src="/img/cloud/telemetry-elastic.png" alt="Tyk Cloud Telemetry Elastic" >}}

#### Custom

For when you need to connect to a different monitoring system:

- Exporter: Choose gRPC/HTTP
- Provider Endpoint: Your monitoring system URL
- Authorization: Configure how Tyk should authenticate with your system
- Example custom configuration:
  ```
  Exporter: gRPC/HTTP
  Provider Endpoint: grpc://your-collector:4317
  Authorization Header Name: Authorization
  Authorization Header Value: Bearer your-token
  ```

{{< img src="/img/cloud/telemetry-custom.png" alt="Tyk Cloud Telemetry Custom" >}}


### Telemetry Export in Cloud Data Plane Deployments

When creating a new Cloud Data Plane deployment or editing an existing one, you can configure telemetry export settings. These settings are specific to Cloud Data Plane deployments only and allow you to monitor API performance through your chosen telemetry provider.

When you modify any general telemetry settings in Tyk Cloud, these changes don't take immediate effect.
Your Cloud Data Planes need to be redeployed to activate the new telemetry configuration.

#### Configuration Options

{{< img src="/img/cloud/telemetry-enable.png" alt="Tyk Cloud Telemetry Enable" >}}

1. Enable Datadog Connection
    - Toggle switch to enable/disable Datadog monitoring for this specific Cloud Data Plane deployment

2. Sampling Rate Override
    - Choose what percentage of API traffic to monitor (default: 10%)
