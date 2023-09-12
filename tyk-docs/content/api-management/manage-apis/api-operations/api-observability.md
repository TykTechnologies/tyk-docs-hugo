## API observability

API observability is the process of monitoring and analysing APIs to gain insights into developer and end-user experience and to ensure the reliability of your system.

You can achieve API observability by using a combination of telemetry signals such as traces, metrics, and logs. Each of these signals serves a specific purpose in monitoring and troubleshooting API issues:

### 1) Distributed tracing

Distributed traces provide a detailed, end-to-end view of a single API request or transaction as it traverses through various services and components. Traces are crucial for understanding the flow of requests and identifying bottlenecks or latency issues. Here's how you can make use of traces for API observability:

- **End-to-end request tracing:** Implement distributed tracing across your microservices architecture to track requests across different services and gather data about each service's contribution to the overall request latency.
    
- **Transaction Flow:** Visualize the transaction flow by connecting traces to show how requests move through different services, including entry points (e.g., API gateway), middleware, and backend services.
    
- **Latency Analysis:** Analyze trace data to pinpoint which service or component is causing latency issues, allowing for quick identification and remediation of performance bottlenecks.
    
- **Error Correlation:** Use traces to correlate errors across different services to understand the root cause of issues and track how errors propagate through the system.
    

From v5.2+, Tyk supports OpenTelemetry standard for tracing. You can configure Tyk to work with an [OpenTelemetry collector](https://opentelemetry.io/docs/collector/) or integrate it with any [observability vendor supporting OpenTelemetry](https://opentelemetry.io/ecosystem/vendors/) to capture traces of API requests as they flow through Tyk API Gateway and any upstream services. Tyk also supports OpenTracing (now deprecated), but we recommend users to start migrating to OpenTelemetry for a comprehensive, vendor-neutral technology with wide industry support.

### 2) Metrics

Metrics provide aggregated, quantitative data about the performance and behavior of an API over time. They offer insights into the overall health of the system. Here's how you can leverage metrics for API observability:

- **Key Performance Indicators (KPIs):** Define and track essential metrics such as request rate, response time, error rate, and resource utilisation to monitor the overall health and performance of the API.
    
- **Custom Metrics:** Create custom metrics that are specific to your API's functionality or business objectives. For example, track the number of successful payments processed or the number of users signed up.
    
- **Threshold Alerts:** Set up alerts based on predefined thresholds for metrics to receive notifications when API performance deviates from the expected norm.
    
- **Trend Analysis:** Analyse metric trends over time to identify long-term performance patterns, plan for scaling, and detect anomalies.
    

Tyk offers built-in metrics and analytics in [Tyk Dashboard]({{<ref "tyk-dashboard-analytics">}}) through Tyk API Gateway and Tyk Pump. These metrics provide insights into API usage, traffic patterns, and response times. The built-in metrics allow you to track overall API traffic, detailed API analytics including request count, response time distribution, and error rates, and also API usage on a per-key basis.

You can also use Tyk Pump to export those metrics to [different back-ends]({{<ref "tyk-stack/tyk-pump/other-data-stores/">}}). Here is an example of of using Tyk Pump to send [API analytics metrics to Prometheus and Grafana](https://tyk.io/blog/service-level-objectives-for-your-apis-with-tyk-prometheus-and-grafana/). From v5.2+, you can also leverage the OpenTelemetry spans exported from Tyk Gateway to calculate and export [span metrics](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/connector/spanmetricsconnector/README.md) from the OpenTelemetry collector.

### 3) Logs

Logs provide detailed records of events and activities within the API and its associated services. Logs are invaluable for debugging issues and understanding what happened at a specific point in time. Here's how you can utilize logs for API observability:

- **Error Identification:** Use logs to identify errors, exceptions, and warning messages that indicate issues with the API's behavior.
    
- **Debugging:** Logs help developers troubleshoot and debug issues by providing detailed information about the sequence of events leading up to a problem.
    
- **Security Monitoring:** Monitor logs for security-related events, such as authentication failures, access control violations, and suspicious activities.
    
- **Audit Trail:** Maintain an audit trail of important actions and changes to the API, including configuration changes, access control changes, and data updates.
    

Tyk allows you to capture and analyse logs related to API requests and responses in the [Log Browser]({{<ref "tyk-stack/tyk-manager/analytics/log-browser/">}}) . You can optionally enable detailed recording for the requests per API level or per Key level to store inbound request and outbound response data. You can [enable debug modes]({{<ref "tyk-stack/tyk-pump/useful-debug-modes/">}}) for selected APIs and send the detail logs to one or more Pump backend.

To achieve comprehensive API observability, it's essential to integrate traces, metrics and logs into the observability tools that the team in charge of the APIs are already using. Those tools should allow users to query and visualize data, set up alerts, and provide an intuitive interface for monitoring and troubleshooting API issues effectively. See also our 7 observability anti-pattern to avoid when working with APIs: [Bad API observability](https://tyk.io/blog/bad-api-observability/).
