---
title: "Request Throttling"
date: 2025-01-10
tags: [""]
description: ""
keywords: [""]
aliases:
  - /basic-config-and-security/control-limit-traffic/request-throttling
---

## Introduction

Tyk's Request Throttling feature provides a mechanism to manage traffic spikes by queuing and automatically retrying client requests that exceed [rate limits]({{< ref "" >}}) or [quotas]({{< ref "" >}}), rather than immediately rejecting them. This helps protect upstream services from sudden bursts and improves the resilience of API interactions during temporary congestion.

<!-- TODO: Add an -->

## Quick Start

In this tutorial, we will configure Request Throttling on a Tyk Security Policy to protect a backend service from sudden traffic spikes. We'll start by defining a basic rate limit on a policy, then enable throttling with specific retry settings to handle bursts exceeding that limit, associate a key with the policy, and finally test the behaviour using simulated traffic. This guide primarily uses the Tyk Dashboard for configuration.

### Prerequisites

- **Docker**: We will run the entire Tyk Stack on Docker. For installation, refer to this [guide](https://docs.docker.com/desktop/setup/install/mac-install/).
- **Git**: A CLI tool to work with git repositories. For installation, refer to this [guide](https://git-scm.com/downloads)
- **Dashboard License**: We will configure Streams API using Dashboard. [Contact support](https://tyk.io/contact/) to obtain a license.
- **Curl and JQ**: These tools will be used for testing.

### Instructions

1. **Setup Tyk Demo:**

1.  **Create an API:**
    -   Log in to your Tyk Dashboard.
    -   Navigate to **API Management > APIs**.
    -   Click **Add New API**. 
    -   Click **Import**. 
    -   Select **Import Type** as **Tyk API**.
    -   Copy the below content in the text box.
        ```json
        {
            "components": {
                "securitySchemes": {
                    "authToken": {
                        "in": "header",
                        "name": "Authorization",
                        "type": "apiKey"
                    }
                }
            },
            "info": {
                "title": "Request Throttling Test",
                "version": "1.0.0"
            },
            "openapi": "3.0.3",
            "paths": {},
            "security": [
                {
                    "authToken": []
                }
            ],
            "servers": [
                {
                    "url": "http://tyk-gateway.localhost:8080/request-throttling-test/"
                }
            ],
            "x-tyk-api-gateway": {
                "info": {
                    "name": "Request Throttling Test",
                    "state": {
                        "active": true
                    }
                },
                "middleware": {
                    "global": {
                        "contextVariables": {
                            "enabled": true
                        },
                        "trafficLogs": {
                            "enabled": true
                        }
                    }
                },
                "server": {
                    "authentication": {
                        "enabled": true,
                        "securitySchemes": {
                            "authToken": {
                                "enabled": true
                            }
                        }
                    },
                    "listenPath": {
                        "strip": true,
                        "value": "/request-throttling-test/"
                    }
                },
                "upstream": {
                    "rateLimit": {
                        "enabled": false,
                        "per": "10s",
                        "rate": 5
                    },
                    "url": "http://httpbin.org/"
                }
            }
        }
        ```
    -   Click **Import API** to create an API. 

<!-- 5. **Create an API:**

    Create a file `api.json` with the below content:

    ```json

    ```

    Create the API by executing the following command. Be sure to replace `<your-api-key>` with the API key you saved earlier:

    ```bash
    curl --location 'http://localhost:3000/api/apis/oas' \
    --header 'Content-Type: application/json' \
    --header 'Accept: application/json' \
    --header 'Authorization: Bearer <your-api-key>' \
    -d @api.json
    ```

    You should expect a response similar to the one shown below, indicating success. Note that the Meta and ID values will be different each time:
    ```bash
    {"Status":"OK","Message":"API created","Meta":"67f3b6f17bdf060001c1ae18","ID":"955871990da047146a40f1f8ceb62d79"}%                                                                   
    ``` -->

3.  **Create and Configure an API Key with Rate Limiting:**

    1.  Navigate to **API Security > Keys** in the Tyk Dashboard sidebar.
    2.  Click the **Add Key** button.
    3.  Under the **1. Access Rights** tab:
        -   Select **Choose API**
        *   In the **Add API Access Rule** section, select the `Request Throttling Test` API
    4.  Scroll down to the **Global Limits and Quota** section (still under the **1. Access Rights** tab):
        *   Set the following values for `Rate Limiting`
        *   Enter `5` into the **Requests (or connection attempts)** field.
        *   Enter `10` into the **Per (seconds):** field.
    5.  Select the **2. Configuration** tab.
    6.  In the **Alias** field, enter `Request Throttling Key`.
    7.  From the **Expires** dropdown, select `Do not expire key`.
    8.  Click the **Create Key** button.
    9.  A pop-up window **"Key created successfully"** will appear displaying the key details. **Copy the Key ID (hash)** value shown and save it securely. You will need this key to make API requests in the following steps.
    10. Click **OK** to close the pop-up.

4. **Test Rate Limit**

   Open a terminal and execute the following command to start listening for messages from the Consumer API you created:

   ```bash
   curl -N http://tyk-gateway.localhost:8080/gpt-discuss/sse
   ```

   In a second terminal, execute the command below to send a message to the Producer API. You can run this command multiple times and modify the message to send different messages:

   ```bash
   curl -X POST http://tyk-gateway.localhost:8080/gpt-chat/chat -H "Content-Type: text/plain" -d "Tell me a joke."
   ```

4.  **Configure Request Throttling by Updating the Access Key**

    Update the API by executing the following command. Be sure to replace `<your-api-key>` with the API key you saved earlier:

    ```bash
    curl -H "Authorization: <your-api-key>" -H "Content-Type: application/vnd.tyk.streams.oas" http://localhost:3000/api/apis/streams -d @producer.json
    ```

    You should expect a response similar to the one shown below, indicating success. Note that the Meta and ID values will be different each time:
    ```bash
    {"Status":"OK","Message":"API created","Meta":"67e54cadbfa2f900013b501c","ID":"3ddcc8e1b1534d1d4336dc6b64a0d22f"}
    ```

4. **Test & Verify**

## Configuration Options

Request Throttling is configured within Tyk [Security Policies]({{< ref "" >}}) or directly on individual [Access Keys]({{< ref "" >}}).

The configuration involves setting two specific fields:

- `throttle_interval`: Defines the wait time (in seconds) between retry attempts for a queued request.
- `throttle_retry_limit`: Sets the maximum number of retry attempts before the request is rejected.

<!-- TODO: Verify this -1 statement. -->

Both fields must be set to a value of 0 or greater to enable throttling. Setting either to `-1` (the default) disables the feature.

You can configure these settings using either the Tyk Dashboard UI or the Tyk Gateway API.

{{< tabs_start >}}

{{< tab_start "Dashboard UI" >}}

The Tyk Dashboard provides a straightforward interface to set throttling parameters on both Policies and Keys.

**For Policies:**


**For Keys:**


{{< tab_end >}}

{{< tab_start "Tyk Gateway API" >}}

<!-- TODO: Test the below section -->

You can enable and configure Request Throttling by directly manipulating the Policy object or the Key's Session Object using the Tyk Gateway API.

**Example Configuration (Policy Object):**

Retrieve the policy object using `GET /api/portal/policies/{POLICY_ID}`. Add or modify the `throttle_interval` and `throttle_retry_limit` fields within the policy JSON object. Then, update the policy using `PUT /api/portal/policies/{POLICY_ID}` with the modified object, or create a new one using `POST /api/portal/policies/`.

```json
{
  // ... other policy fields ...
  "throttle_interval": 1,       // Wait 1 second between retries
  "throttle_retry_limit": 5,    // Attempt a maximum of 5 retries
  // ... other policy fields ...
}
```

**Example Configuration (Key Session Object):**

Retrieve the key's session object using `GET /tyk/keys/{KEY_ID}` (or `GET /api/apis/{API-ID}/keys/{KEY_ID}` if using API-specific keys - less common). Add or modify the `throttle_interval` and `throttle_retry_limit` fields within the session object JSON. Then, update the key using `PUT /tyk/keys/{KEY_ID}` with the modified session object.

```json
{
  // ... other session object fields ...
  "throttle_interval": 2,       // Wait 2 seconds between retries
  "throttle_retry_limit": 3,    // Attempt a maximum of 3 retries
  // ... other session object fields ...
}
```

**Explanation:**

*   The first example configures a policy. Any key using this policy will inherit the throttling settings: wait 1 second between retries for queued requests, attempting up to 5 times before failing.
*   The second example configures a specific key's session object directly: wait 2 seconds between retries, attempting up to 3 times. Note: Direct key configuration overrides policy settings for that specific key.

**Notes:**

*   **Default/Disabled:** Throttling is disabled by default (`throttle_interval: -1`, `throttle_retry_limit: -1`).
*   **Enabling:** To enable throttling, both `throttle_interval` and `throttle_retry_limit` must be set to `0` or a positive integer.
*   **Zero Values:**
    *   `throttle_interval: 0`: Tyk will retry immediately without waiting.
    *   `throttle_retry_limit: 0`: Tyk will queue the request but attempt zero retries, effectively rejecting it after the first check fails (similar behaviour to standard rate limiting but involves the queuing mechanism briefly).
*   **Interaction with Rate Limiting:** Request Throttling only activates *after* a standard rate limit or quota configured on the same policy or key has been exceeded.

{{< tab_end >}}

{{< tabs_end >}}

## How It Works

<!-- TODO: Add an image -->

Tyk's Request Throttling intercepts API requests *after* they have exceeded a configured rate limit or quota. 

Instead of immediately rejecting these requests with a `429 Too Many Requests` error (which is the default rate-limiting behaviour), the Gateway temporarily holds them in a queue. After waiting for a specified duration (`throttle_interval`), Tyk attempts to process the request again, re-checking the rate limit/quota status. 

This retry cycle repeats until either the request can be successfully processed (if capacity becomes available) or a configured maximum number of retries (`throttle_retry_limit`) is reached. Only after exhausting all retries does Tyk return the `429` error to the client.

Think of it like a waiting list at a busy service counter: instead of being turned away immediately when the counter is full, you're asked to wait briefly, and your turn will likely come up shortly without you needing to rejoin the queue from the start.

## FAQs

### Can I disable Request Throttling?
    
Yes, you can. If you set `throttle_interval` and `throttle_retry_limit` values to smaller than `0`, the feature will not work. The default value is `-1` and means it is disabled by default.