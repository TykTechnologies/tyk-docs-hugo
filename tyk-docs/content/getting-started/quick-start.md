---
title: "Getting Started with Tyk Self-Managed"
date: 2025-02-10
keywords: ["quick start", "tyk self-managed", "tyk gateway", "tyk dashboard", "tyk pump", "tyk analytics"]
description: "Quickly set up Tyk Self-Managed with our comprehensive guide, including installation options and demo environments."
aliases:
---

## Introduction

Tyk Self-Managed is a comprehensive API Management platform that you can deploy and control within your own infrastructure. This page will help you set up and explore your Tyk Self-Managed environment.

### What's included in your trial

Your Tyk Self-Managed trial includes:

- **Tyk Gateway**: The core API Gateway that handles all your API traffic
- **Tyk Dashboard**: A web interface for managing your APIs, policies, and analytics
- **Enterprise Developer Portal**: A customizable portal for API consumers
- **Analytics**: Detailed insights into API usage and performance
- **Sample APIs**: Pre-configured APIs to help you explore Tyk's capabilities

### System Requirements

- **Docker**: Docker Engine 20.10.0 or newer
- **CPU & Memory**: Minimum 2 GB RAM and 2 CPU cores
- **License Key**: A valid Tyk Self-Managed license key. 
    
    You can instantly obtain a self managed trial license by registering on the [website](https://share.hsforms.com/13h7zZ8k6Tt2FCbIbYs39mA3ifmg). After registraion, you will receive an email with your license key.

    If you prefer guided support, we recommend exploring our [Tyk Technical PoC Guide](https://tyk.io/customer-engineering/poc/technical-guide/).

### Trial Duration and Limitations

Your trial license is valid for **14 days from activation**. During this period, you have access to all Enterprise features. After the trial period, you'll need to purchase a license to continue using Tyk Self-Managed.

To continue using Tyk Self-Managed after your trial, please contact our [support team](https://tyk.io/contact/) to obtain a license.

{{< button_left href="https://tyk.io/contact/" color="green" content="Contact us" >}}

<br>
<br>

## Quick Setup

This section provides a step-by-step guide to quickly set up Tyk Self-Managed using Docker. 

### Prerequisites

1. Install [Docker](https://docs.docker.com/get-docker/) on your system
2. Ensure you have your Tyk Self-Managed license key from your trial email

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/munkiat/tyk-poc && cd tyk-poc
   ```

2. Create a `.env` file with your license key:
   ```
   DASH_LICENSE=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
   
   You can use the `.env.example` file as a template.

3. Start the Tyk stack:
   ```
   docker compose up -d
   ```

   This command will download and start all the necessary containers:
   - Tyk Gateway
   - Tyk Dashboard
   - Enterprise Developer Portal
   - Redis (Gateway dependency for caching)
   - PostgreSQL (Dashboard and Portal dependency for data storage)
   - Tyk Pump (for analytics)
   - Sample API service (httpbin)

    **Wait for the containers to initialize. This may take a few minutes depending on your system.**

5. Once all containers are running, you can verify their status with:
   ```
   docker compose ps
   ```

   You should see all services listed as "Up".

### Default Credentials and Access Points

Once the installation is complete, you can access the following components:

```
---------------------------
Your Tyk Dashboard URL is http://localhost:3000

user: developer@tyk.io
pw: specialpassword
---------------------------
Your Tyk Gateway URL is http://localhost:8080
---------------------------
Your Developer Portal URL is http://localhost:3001

admin user: portaladmin@tyk.io
admin pw: specialpassword
---------------------------
```

### Verifying Your Installation

1. **Verify Dashboard Access**:
    1. Open your browser and navigate to `http://localhost:3000`
    2. Log in with the default credentials (developer@tyk.io / specialpassword)
    3. You should see the Tyk Dashboard with pre-configured APIs and analytics
2. **Verify Gateway Access**:
    1. Open a terminal and run:
       ```
       curl http://localhost:8080/hello
       ```
    2. You should receive a JSON response from API, confirming that the Tyk Gateway is functioning correctly. 
3. **Verify Developer Portal Access**:
    1. Open your browser and navigate to `http://localhost:3001`
    2. Log in with the default credentials (portal@tyk.io / specialpassword)
    3. You should see the `Overview` section of the Developer Portal.

## Exploring Your Pre-Configured Environment (TODO)

### Dashboard Tour

#### Navigating the Tyk Dashboard

The Tyk Dashboard is organized into several key sections:

- **APIs**: Manage your API definitions, versions, and configurations
- **Keys**: Create and manage authentication keys for API access
- **Policies**: Define access rules and rate limits for groups of APIs
- **Analytics**: View detailed usage statistics and performance metrics
- **System Management**: Configure system-wide settings and users

#### Understanding the Pre-loaded APIs

The trial environment comes with a pre-configured sample API:

- **httpbingo API**: A test API with various endpoints for exploring API management features
  - Accessible at: `http://localhost:8080/httpbingo`
  - Includes endpoints for testing authentication, transformations, and other features

#### Key Metrics and Analytics Overview

The Analytics section provides insights into:

- API usage and traffic patterns
- Error rates and response times
- Geographic distribution of API requests
- User and key activity

### Enterprise Developer Portal Preview

#### Accessing the Pre-configured Portal

1. Navigate to `http://localhost:3001` in your browser
2. Log in with the admin credentials (portaladmin@tyk.io / specialpassword)

#### Exploring Available API Products and Catalogs

The Developer Portal includes:

- A pre-configured API product (httpbingo API)
- Two sample plans:
  - Sandbox Plan: Limited rate (3 requests per 10 seconds)
  - Production Plan: Higher capacity (100 requests per 60 seconds)
- A public catalog making these APIs discoverable

## Core API Management Capabilities

In this section, we will explore the core API management capabilities of Tyk Self-Managed using the pre-configured APIs.

### API Security in Action

API security is a critical aspect of API management. Tyk provides [multiple authentication methods]({{< ref "api-management/client-authentication/#what-does-tyk-support" >}}) to secure your APIs and control access. In this section, we'll explore the security features available in your trial environment.

#### Exploring Authentication Methods

Tyk supports various authentication methods including API keys, [JWT]({{< ref "basic-config-and-security/security/authentication-authorization/json-web-tokens" >}}), [OAuth 2.0]({{< ref "api-management/authentication/oauth-2" >}}), and [more]({{< ref "api-management/client-authentication/#what-does-tyk-support" >}}). In your trial environment, the httpbingo API is pre-configured with API key authentication.

**Understanding API Key Authentication:**

API keys are the simplest form of authentication. They're easy to implement and understand, making them perfect for your first exploration of Tyk.

1. **Create an API Key:**
   - In the Dashboard, navigate to the "Keys" section in the left menu
   - Click the "ADD KEY" button
   - Under "Access Rights," select the `HTTPBIN API Access` policy
   - Click "CREATE" to generate your API key
   - Copy the displayed API `key ID` for testing

2. **Test API Access with Your Key:**
   - Open a terminal or API client like Postman
   - Make a request to the API including your key in the Authorization header:
     ```
     curl -H "Authorization: <your-api-key>" http://localhost:8080/httpbingo/get
     ```
   - You should receive a successful response with details about your request

3. **Try Without Authentication:**
   - Make the same request without the Authorization header:
     ```
     curl http://localhost:8080/httpbingo/get
     ```
   - You should receive an "Unauthorized" error, confirming that authentication is working

**Exploring Other Authentication Methods (Optional):**

While not pre-configured in the trial, you can explore other authentication methods by creating a new API or modifying the existing one through the Dashboard's API Designer:

- **JWT Authentication**: For token-based authentication with signature validation
- **OAuth 2.0**: For delegated authorization scenarios
- **Mutual TLS**: For certificate-based client authentication

#### Rate Limiting and Quota Management

Rate limiting helps protect your APIs from overuse, whether accidental or malicious. Tyk makes it easy to implement and test rate limiting.

**Understanding Rate Limiting:**

The trial includes two pre-configured policies with different rate limits:
- **Sandbox Plan**: 3 requests per 10 seconds (for testing rate limiting)
- **Production Plan**: 100 requests per 60 seconds (simulating a higher-tier plan)

**Testing Rate Limiting:**

1. **Create a Key with Rate Limiting:**
   - Go to the "Policies" section in the Dashboard
   - Note the "Sandbox Plan" policy that has a rate limit of 3 requests per 10 seconds
   - Go to the "Keys" section and create a new key
   - Assign the "Sandbox Plan" policy to this key
   - Save and copy the generated key

2. **Observe Rate Limiting in Action:**
   - Open a terminal and run multiple requests in quick succession:
     ```
     for i in {1..5}; do curl -H "Authorization: <your-api-key>" http://localhost:8080/httpbingo/get; echo -e "\n--- Request $i completed ---\n"; done
     ```
   - After the third request within 10 seconds, you should see a rate limit exceeded error
   - The error message will indicate that you've exceeded your rate limit and when you can try again

3. **Compare with a Higher Limit:**
   - Create another key with the "Production Plan" policy
   - Run the same test and observe that you can make more requests before hitting limits

**Understanding Quota Management:**

In addition to rate limiting, Tyk allows you to set quotas (total number of requests allowed in a time period). While not explicitly configured in the trial policies, you can explore this feature by modifying a policy and setting a quota limit.

#### Viewing Security Logs and Analytics

Tyk provides comprehensive logging and analytics for security monitoring and troubleshooting.

**Accessing Security Logs:**

1. **View API Request Logs:**
   - In the Dashboard, go to the "Activity" section in the left menu
   - Here you'll see a log of all API requests, including:
     - Success/failure status
     - Authentication details
     - IP addresses
     - Timestamps
     - Response times

2. **Filter Security Events:**
   - Use the filters at the top to focus on security-related events
   - Filter by error type to see authentication failures
   - Filter by API to focus on a specific service

3. **Examine Rate Limiting Events:**
   - After testing rate limiting, filter the logs to show "Rate Limit" errors
   - Examine the details of these events to understand how rate limiting is enforced

**Exploring Analytics for Security Insights:**

1. **Access the Analytics Dashboard:**
   - Go to the "Dashboard" section under Analytics
   - View the overview of API usage, errors, and performance

2. **Security-Focused Analytics:**
   - Look for the "Errors" widget to identify authentication and authorization issues
   - Check the "By IP" view to identify potential abuse patterns
   - Use the time range selector to analyze trends over different periods

3. **Generate a Security Report:**
   - Use the "Generate Report" feature to create a security-focused report
   - Select metrics related to authentication and rate limiting
   - Export the report for sharing with your team

**Key Security Takeaways:**

- Tyk provides multiple layers of security: authentication, rate limiting, and quotas
- Real-time logs and analytics help you monitor and respond to security events
- Policies allow you to create different security tiers for different API consumers
- The Dashboard makes it easy to visualize security patterns and identify issues

By exploring these security features, you'll gain a solid understanding of how Tyk helps protect your APIs while providing the right level of access to authorized consumers.

### Traffic Control & Transformation

#### Testing Request/Response Transformations

The httpbingo API includes a transformation example on the `/xml` endpoint that converts XML to JSON.

#### Exploring Caching Configurations

TODO: Caching features are not yet implemented in the tyk-poc repository.

### API Monitoring & Analytics

#### Generating Test Traffic

Use tools like Apache Bench or Postman to send multiple requests to generate analytics data.

#### Exploring Real-time Analytics

The Dashboard's Analytics section provides real-time insights into API usage patterns.

#### Setting up Alerts and Notifications

TODO: Alerting features are not yet implemented in the tyk-poc repository.

## Next Steps

[Developing APIs with Tyk Self-Managed]({{< ref "deployment-and-operations/tyk-self-managed/value-addons" >}}) - Learn how to create new APIs, publish them to the Developer Portal, and integrate advanced middleware.