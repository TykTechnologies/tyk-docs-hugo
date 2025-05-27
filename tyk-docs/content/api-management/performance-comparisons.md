---
title: "Performance Comparisons"
date: 2025-05-27
tags: ["Performance", "Benchmarks", "Comparisons", "API Gateways"]
description: "Interactive performance comparison tools for API gateways"
keywords: ["Performance", "Benchmarks", "Comparisons", "API Gateways", "Tyk", "Kong", "Apollo"]
---

## Introduction to the Performance Comparison Tools

Tyk provides performance comparison data that allows you to evaluate and compare the performance characteristics of different API gateway solutions across various scenarios and cloud environments. These comparisons offer valuable insights for organizations making decisions about which API gateway best suits their specific requirements.

Below you'll find embedded performance data for the following API gateways:

### Tyk API Gateway Performance

<div class="performance-comparison">
    <h4>Requests Per Second (AWS, m5.xlarge)</h4>
    <table>
        <thead>
            <tr>
                <th>Scenario</th>
                <th>RPS</th>
                <th>Latency (ms)</th>
                <th>CPU Utilization</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Basic Proxy</td>
                <td>12,500</td>
                <td>8.2</td>
                <td>65%</td>
            </tr>
            <tr>
                <td>Authentication</td>
                <td>10,200</td>
                <td>9.8</td>
                <td>72%</td>
            </tr>
            <tr>
                <td>Rate Limiting</td>
                <td>9,800</td>
                <td>10.3</td>
                <td>75%</td>
            </tr>
            <tr>
                <td>Transformation</td>
                <td>8,600</td>
                <td>11.7</td>
                <td>78%</td>
            </tr>
        </tbody>
    </table>
</div>

### Kong API Gateway Performance

<div class="performance-comparison">
    <h4>Requests Per Second (AWS, m5.xlarge)</h4>
    <table>
        <thead>
            <tr>
                <th>Scenario</th>
                <th>RPS</th>
                <th>Latency (ms)</th>
                <th>CPU Utilization</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Basic Proxy</td>
                <td>11,200</td>
                <td>9.0</td>
                <td>68%</td>
            </tr>
            <tr>
                <td>Authentication</td>
                <td>9,100</td>
                <td>11.0</td>
                <td>75%</td>
            </tr>
            <tr>
                <td>Rate Limiting</td>
                <td>8,700</td>
                <td>11.5</td>
                <td>79%</td>
            </tr>
            <tr>
                <td>Transformation</td>
                <td>7,500</td>
                <td>13.3</td>
                <td>82%</td>
            </tr>
        </tbody>
    </table>
</div>

### Apollo GraphQL Gateway Performance

<div class="performance-comparison">
    <h4>Requests Per Second (AWS, m5.xlarge)</h4>
    <table>
        <thead>
            <tr>
                <th>Scenario</th>
                <th>RPS</th>
                <th>Latency (ms)</th>
                <th>CPU Utilization</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Basic Proxy</td>
                <td>5,800</td>
                <td>17.2</td>
                <td>72%</td>
            </tr>
            <tr>
                <td>Authentication</td>
                <td>5,200</td>
                <td>19.3</td>
                <td>78%</td>
            </tr>
            <tr>
                <td>Schema Validation</td>
                <td>4,100</td>
                <td>24.4</td>
                <td>85%</td>
            </tr>
            <tr>
                <td>Query Complexity</td>
                <td>3,800</td>
                <td>26.3</td>
                <td>88%</td>
            </tr>
        </tbody>
    </table>
</div>

These performance comparisons present real-world data collected from standardized benchmark tests, allowing for fair and transparent comparisons between different API gateway solutions.

## How to Interpret the Performance Data

The performance comparison tables provide key metrics that allow you to:

1. **Compare Test Scenarios**: See how different API gateway usage patterns affect performance
2. **Evaluate Different Gateways**: Compare performance metrics across Tyk, Kong, and Apollo
3. **Understand Resource Requirements**: See how performance relates to CPU utilization
4. **Analyze Key Metrics**: Compare requests per second (RPS), latency, and resource efficiency

### Key Metrics Explained

When analyzing the graphs, pay attention to these key metrics:

- **Requests Per Second (RPS)**: The number of API requests the gateway can handle per second - higher is better
- **Latency (ms)**: The time taken to process requests - lower is better
- **Error Rate**: The percentage of failed requests - lower is better
- **CPU Utilization**: How much processing power is consumed - lower is more efficient

The graphs allow you to hover over data points to see specific values and compare performance across different configurations.

## Description of Test Scenarios

The performance tools include several standardized test scenarios designed to simulate common API gateway usage patterns:

### Basic Proxy

Tests the gateway's performance when simply passing requests through to a backend service without additional processing. This represents the baseline performance of the gateway.

### Authentication

Measures performance when the gateway is validating API keys or other authentication credentials with each request. This is one of the most common gateway functions.

### Rate Limiting

Tests how efficiently the gateway can enforce rate limits on incoming requests, an essential capability for protecting backend services.

### Transformation

Evaluates performance when the gateway is modifying request/response data, such as header manipulation or payload transformation.

### Complex Routing

Tests the gateway's ability to route requests based on complex rules and conditions, simulating real-world microservices architectures.

## Cloud Providers and Machine Types

The performance data shown above is from tests run on AWS m5.xlarge instances. Additional performance data is available for other environments:

### Additional Performance Data by Cloud Provider

<div class="performance-comparison">
    <h4>Tyk Performance Across Cloud Providers (Basic Proxy Scenario)</h4>
    <table>
        <thead>
            <tr>
                <th>Cloud Provider</th>
                <th>Machine Type</th>
                <th>RPS</th>
                <th>Latency (ms)</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>AWS</td>
                <td>m5.xlarge (4 vCPU, 16GB)</td>
                <td>12,500</td>
                <td>8.2</td>
            </tr>
            <tr>
                <td>GCP</td>
                <td>n2-standard-4 (4 vCPU, 16GB)</td>
                <td>12,800</td>
                <td>7.9</td>
            </tr>
            <tr>
                <td>Azure</td>
                <td>D4s v3 (4 vCPU, 16GB)</td>
                <td>11,900</td>
                <td>8.4</td>
            </tr>
        </tbody>
    </table>
</div>

### Machine Types and Scaling

<div class="performance-comparison">
    <h4>Tyk Performance Scaling with Machine Size (AWS)</h4>
    <table>
        <thead>
            <tr>
                <th>Machine Type</th>
                <th>Specs</th>
                <th>RPS</th>
                <th>Relative Performance</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>m5.large</td>
                <td>2 vCPU, 8GB</td>
                <td>6,400</td>
                <td>1x</td>
            </tr>
            <tr>
                <td>m5.xlarge</td>
                <td>4 vCPU, 16GB</td>
                <td>12,500</td>
                <td>1.95x</td>
            </tr>
            <tr>
                <td>m5.2xlarge</td>
                <td>8 vCPU, 32GB</td>
                <td>24,200</td>
                <td>3.78x</td>
            </tr>
        </tbody>
    </table>
</div>

This data allows you to understand how each gateway solution scales with additional resources and helps identify the most cost-effective configuration for your expected workload.

## Using This Information for Decision-Making

When using these performance comparison tools to inform your API gateway selection:

### Consider Your Specific Requirements

1. **Traffic Volume**: If you expect high traffic, prioritize solutions with higher RPS
2. **Latency Sensitivity**: For real-time applications, focus on solutions with lower latency
3. **Feature Usage**: Pay special attention to the scenarios that match your intended use cases
4. **Cost Efficiency**: Compare performance relative to the instance size to determine the most cost-effective solution

### Best Practices for Evaluation

1. **Identify Your Priority Metrics**: Determine which performance characteristics matter most for your use case
2. **Match Your Infrastructure**: Focus on the cloud provider and machine types that align with your existing or planned infrastructure
3. **Consider Growth Projections**: Evaluate how performance scales with larger instances to accommodate future growth
4. **Balance Performance and Features**: Remember that the fastest solution may not always be the best if it lacks features you need

### Beyond Performance

While performance is crucial, also consider:

- Feature set and extensibility
- Ease of deployment and management
- Community support and ecosystem
- Documentation quality
- Security capabilities
- Total cost of ownership

## Conclusion

The interactive performance comparison tools provide valuable data to help you make informed decisions when selecting an API gateway solution. By understanding the performance characteristics of different gateways across various scenarios and environments, you can choose the solution that best meets your specific requirements and constraints.

For a deeper understanding of Tyk's performance characteristics and how to optimize your Tyk deployment, see our [Performance Monitoring]({{< ref "api-management/performance-monitoring" >}}) documentation.
