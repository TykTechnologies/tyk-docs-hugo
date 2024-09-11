---
aliases:
- /quickstart-configure-first-api
date: 2020-06-24
description: How to decide on which Tyk deployment option is best for you
linkTitle: Getting Started
tags:
- Tyk API Management
- Open Source
- Self-Managed
- Tyk Cloud
- API Gateway
title: Tyk QuickStart Configure Your First API
---


Overview
This guide helps you get started with Tyk Cloud by covering the basics:

- **Set up your API**: Create and configure a new API in the Tyk Cloud Dashboard.
- **Create API keys**: Generate API keys and assign them to your APIs for secure access.
- **Set security policies**: Manage access, rate limits, and quotas with security policies.
- **Monitor API performance**: Track traffic, logs, and performance analytics.

Follow these steps to quickly create and manage your APIs in Tyk Cloud.

## Prerequisites

Before you begin, make sure you have:
- A Tyk Cloud account.
- Admin access to the Tyk Cloud dashboard.
- A backend service that your API will proxy (e.g., a RESTful API).


## Create a Project (Set Up Your API)

Start by creating a new API in Tyk Cloud:

1. **Log in to the Tyk Cloud Dashboard**.
2. **Navigate to APIs** and click **Create New API**.
3. **Configure API Details**:
   - **API Name**: Name your API (e.g., `My First API`).
   - **Target URL**: Provide the URL of your backend service (e.g., `https://my-backend-service.com`).
   - **API Slug**: Define the path through which your API will be accessible (e.g., `/my-first-api/`).
4. **Authentication**: Choose the desired authentication method (e.g., **API Key**).

#### Example API Creation Payload

```json
{
  "name": "My First API",
  "slug": "my-first-api",
  "protocol": "https",
  "target_url": "https://my-backend-service.com",
  "listen_path": "/my-first-api/",
  "strip_listen_path": true
}
```

Save your API configuration once complete.


## Create an API Key

The Tyk Dashboard provides the simplest way to generate a new API key. Follow these steps:

1. **Select "Keys"** from the **System Management** section.
   
   {{< img src="/img/2.10/keys_menu.png" alt="Keys Menu" >}}

2. **Click "CREATE"** to generate a new key.

   {{< img src="/img/2.10/add_key.png" alt="Add Key" >}}

3. **Add a Policy or API to Your Key**:
   - You can either add your key to an existing **Policy** or assign it to an individual **API**.
   - For this guide, we will assign the key to an API. You can:
     - Scroll through your **API Name list**,
     - Use the **Search field**,
     - Or **Group by Authentication Type** or **Category** to filter APIs.
   - Leave all other options at their default settings.

4. **Add Configuration Details**:
   - **Enable Detailed Logging**: This is optional and disabled by default.
   - **Key Alias**: Assign an alias to your key for easier identification.
   - **Key Expiry**: Set an expiry time from the drop-down list. This is required.
   - **Tags**: Add tags for filtering data in Analytics. Tags are case-sensitive.
   - **Metadata**: Add metadata such as user IDs, which can be used by middleware components.

5. **Click "CREATE"**:
   - Once the key is created, a **Key successfully generated** pop-up will be displayed showing your key. **Copy the key** to your clipboard and save it for future reference as it will not be shown again.

   {{< img src="/img/2.10/create_key.png" alt="Create Key" >}}
   

   {{< img src="/img/2.10/key_success.png" alt="Key Success" >}}
   

## Create a Security Policy

A security policy encapsulates several options that can be applied to an API key, acting as a template that defines rate limits, quotas, and access rights for keys. Here’s how to create one:


1. **Select "Policies"** from the **System Management** section of the Tyk Dashboard.
   
   {{< img src="/img/2.10/policies_menu.png" alt="Policies Menu" >}}

2. **Click "Add Policy"** to create a new policy.

   {{< img src="/img/2.10/add_policy.png" alt="Add Policy Button" >}}

3. **Select the API** to which the policy should apply:
   - Scroll through your API list or use the **Search field**.
   - You can also group by **Authentication Type** or **Category**.


   {{< img src="/img/2.10/select_api_policy.png" alt="Select API Key" >}}



4. **Set Global Rate Limits and Quota**:
   - **Rate Limiting**: Define the number of requests per second allowed for a key using this policy.
   - **Usage Quotas**: Set the maximum number of requests allowed over a specific period (e.g., a day, week, or month).
   - **Throttling**: Configure throttling to queue and retry requests if limits are exceeded.

   {{< img src="/img/2.10/global_limits_policies.png" alt="Global Limits Policies" >}}

5. **Path-Based Permissions**: Restrict access to specific paths or methods within an API. You can define which HTTP methods and paths a key is allowed to access.

   {{< img src="/img/2.10/path_and_method.png" alt="Path And Method" >}}


6. **Add Configuration Details**:
   - **Policy Name**: Give the policy a descriptive name.
   - **Policy State**: Choose whether the policy is active, in draft, or denies access.
   - **Key Expiry**: Set the expiration period for keys assigned to this policy.
   - **Tags**: Add tags to categorize and filter policies in Analytics.
   - **Metadata**: Add metadata such as user IDs to the policy for use by middleware components.

7. **Save the Policy** by clicking **CREATE**. Your policy is now ready to be applied to keys, OAuth clients, or JWT tokens.


## Monitor Traffic and Analyze API Performance

With your API live, monitor its traffic and analyze performance:

### View Traffic Analytics

1. **Navigate to the Analytics Section** in the dashboard.
2. **View Traffic Metrics**: Review metrics such as request count, response times, and error rates.
3. **Analyze Data**: Use traffic trends to identify performance issues or optimize API behavior.

#### Example Traffic Analytics Response

```json
{
  "requests": 1500,
  "errors": 5,
  "latency": {
    "average": 120,
    "p95": 180
  }
}
```

- **Requests**: The total number of API requests made within the monitored period.

- **Errors**: The number of failed requests, indicating issues or errors encountered during API calls.

- **Latency**:
  - **Average**: The average time (in milliseconds) it takes for the API to respond to a request.
  - **95th Percentile (p95)**: The time within which 95% of the requests are responded to, providing insight into the upper range of response times.



### View Log Data

1. **Go to the Logs Section** of your API.
2. **Search and Filter Logs**: Use filters to drill down by response status, endpoint, or client IP.
3. **Review Detailed Logs**: View full request and response data to troubleshoot issues.

#### Example Log Entry

```json
{
  "timestamp": "2024-09-05T12:00:00Z",
  "method": "GET",
  "path": "/my-api/users",
  "status": 200,
  "response_time": 95
}
```
- **Timestamp**: The date and time when the API request was made (ISO 8601 format).

- **Method**: The HTTP method used for the request (e.g., GET, POST).

- **Path**: The API endpoint that was accessed.

- **Status**: The HTTP status code returned by the API, indicating the result of the request (e.g., 200 for success).

- **Response Time**: The time (in milliseconds) taken for the API to respond to the request.


## Next Steps

Congratulations! You've successfully created, secured, and deployed your first API in Tyk Cloud. Next, explore more advanced features like [rate-limiting](getting-started/key-concepts/rate-limiting/) or [OAuth2](api-management/authentication-authorization).

Explore more features in your dashboard to optimize and scale your API offerings.
