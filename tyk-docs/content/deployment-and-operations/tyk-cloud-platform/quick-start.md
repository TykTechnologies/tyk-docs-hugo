---
title: "Free Trial"
date: 2023-07-24
tags: ["Tyk Stack", "Tyk Cloud", "SaaS"]
description: "Getting started with Tyk Cloud"
weight: 1
menu:
  main:
    parent: "Tyk Cloud"
---

{{< note trial >}}
**Note**

The Tyk Cloud trial is limited to 48 hours. After this period, your data will be deleted.
The Tyk Cloud trial does not include access to [Hybrid deployments]({{< ref "tyk-cloud/environments-deployments/hybrid-gateways" >}}) or the [Developer Portal]({{< ref "tyk-developer-portal/tyk-enterprise-developer-portal" >}}).
To try out these capabilities, please get in touch for a [guided evaluation](https://tyk.io/guided-evaluation/) with our team.
{{< /note >}}

Welcome to the [Tyk Cloud Platform]({{< ref "tyk-cloud" >}})!
This guide will lead you through the following steps:
1. Signing up with [Tyk Cloud ]({{< ref "tyk-cloud" >}}).
2. Creating your first [API]({{< ref "getting-started/key-concepts/what-is-an-api-definition" >}}) using the [Tyk Dashboard]({{< ref "tyk-dashboard" >}}).
3. Setting up a [Policy]({{< ref "getting-started/key-concepts/what-is-a-security-policy" >}}) and Key to secure your APIs.

No installation required!

## Step 1: Sign Up for Tyk Cloud

To begin your Tyk Cloud journey, follow these simple steps to sign up for an account:

* Navigate to the [Tyk Cloud sign up form](https://tyk.io/sign-up/).
* Fill in the required information and click on "Next step: Create your password".
* Choose a robust password for your account.
* Select your home region, where your data will be securely stored and click on "Create Account".
* Wait a couple of minutes and congratulations, your API platform was deployed!

All the necessary infrastructure has been reserved for you for the next 48 hours, and you can now access the Tyk Dashboard to start creating your first API.

## Step 2: Get started with your first API with Tyk Dashboard

* Click on "Add API" to access the Tyk Dashboard directly. If you closed your window in the meantime, simply log in to your Tyk Cloud account and you will be redirected to the Tyk Dashboard.

{{< img src="/img/cloud/tyk-cloud-tyk-trial-dashboard.png" alt="Accessing Tyk Dashboard from Tyk Cloud" >}}

* Click the "Design from scratch" button to start the API definition creation process.

{{< img src="/img/cloud/tyk-cloud-create-api.png" alt="Accessing Creating an API" >}}

* Give your API a name - We’ll use “httpbin” for the rest of this quick start.
* In the "Type" section, please select "HTTP".
* In the "API Type" section, please select "OpenAPI".
* Keep https://httpbin.org/ as the upstream URL.

* Finally, click on the button "CONFIGURE API".
{{< img src="/img/cloud/create-api-tyk-cloud.png" alt="Designing an API" >}}

* Select to which gateway you want to deploy this API, select the "edge" tags to deploy to the cloud data plane.

{{< img src="/img/cloud/tyk-cloud-select-cloud-gateway.png" alt="Selecting Cloud Data Planes for an API" width="500px" >}}

* Select "Active" in the "Gateway Status" section.
* Select "External" in the "Access" section.

{{< img src="/img/cloud/tyk-cloud-save-api.png" alt="Saving an API" >}}

* Enable "Authentication" and select "Auth Token" in the dropdown.
* Tick the "Use header value" checkbox and add "Authorization" as the header name.
* Customize your API settings, including authentication, rate limits, and caching, as per your requirements.

{{< img src="/img/cloud/tyk-cloud-api-auth.png" alt="Authenticating an API" >}}

* Click "Save" to create your API. Congratulations! You've just set up your first API.



## Step 3: Set up a Policy and Key

In this step, we will guide you through the process of creating a policy and key system to secure your APIs.

#### Create a Policy:

* Click on "Policies" under the "API Security" section on the left-hand side.
* Click on the button "ADD POLICY".

{{< img src="/img/cloud/tyk-cloud-add-policy.png" alt="Policy section" >}}

* In the "Access Rights" section, please select "httpbin".

{{< img src="/img/cloud/tyk-cloud-policy-access-rights.png" alt="Add policy access rights" >}}

* Go to the "Configurations" section and add a Policy Name (e.g., 'Default Policy httpbin').
* Under the "Settings" section, add an expiry date (e.g., '2 weeks').
* Click on the button "Create Policy".
{{< img src="/img/cloud/tyk-cloud-policy-configurations.png" alt="Policy configuration" >}}

#### Create a Key:

* Click on "Keys" under the "API Security" section on the left-hand side.
* Click on the button "ADD KEY".

{{< img src="/img/cloud/tyk-cloud-add-key.png" alt="Key section" >}}

* In the "Access Rights" section, please select the previously created Policy (e.g., 'Default Policy httpbin').

{{< img src="/img/cloud/tyk-cloud-key-access-rights.png" alt="Add key access rights" >}}

* Go to the "Configurations" section and give your key an alias (e.g., 'platform_team').
* Click on the button "Create Key".

{{< img src="/img/cloud/tyk-cloud-key-configurations.png" alt="Key configuration" >}}

Congratulations! Your key has now been created!

{{< img src="/img/cloud/tyk-cloud-copy-key-url.png" alt="Copy Key ID" width="500px" >}}

<b>Note:</b> Please copy the "Key ID" as it will be necessary when testing the API.

Now that your API is created, you can explore and manage it through the Tyk Dashboard.

## Step 4: Send a test API request to the secured endpoint

#### Postman

After creating a Policy and a Key, proceed to "Postman" to test and interact with the API you've just created.

* Click on "APIs" under the "API Management" section on the left-hand side.
* Select the previously created API (e.g., 'httpbin').
* Copy the API URL.

{{< img src="/img/cloud/tyk-cloud-save-api.png" alt="API section" >}}

* In Postman, choose "Send an API request".

{{< img src="/img/cloud/tyk-cloud-postman-send-api-request.png" alt="Postman section" >}}

* Enter the copied URL and add "https://" at the beginning.

{{< img src="/img/cloud/tyk-cloud-postman-enter-url.png" alt="Postman section" >}}

* In the Tyk Gateway Dashboard, navigate to "Keys" under the "System Management" section on the left-hand side.
* Copy the previously created "Key ID".

{{< img src="/img/cloud/tyk-cloud-copy-key-url.png" alt="Copy key ID" width="500px" >}}

* On Postman, navigate to the "Authorization" tab.
* Change the authentication type from "Inherit auth from parent" to "API Key".
* Paste the "Key ID" into the "Value" field.
* Click the "Send" button to submit the request.

{{< img src="/img/cloud/tyk-cloud-postman-authorization.png" alt="Key section" >}}

#### Curl

To test and interact with the API, you can also use the curl command:

```
curl -X GET "${API URL}" -H "Authorization: ${KEY ID}"
```

**Example:**

```
'curl -X GET "https://corporate-bakery-gw.aws-euw2.cloud-ara.tyk.io/httpbin/" -H "Authorization: eyJvcmciOiI2NWIxMmYxMWJkZjg0YTAwMDEzY2UzZDkiLCJpZCI6IjRmYzM2OTc4NDg1MzQ3NzRiMDhhZ
mEyNTVkNzIxM2NkIiwiaCI6Im11cm11cjEyOCJ9"'
```

{{< img src="/img/cloud/tyk-cloud-cmd-example.png" alt="Key section" >}}

## Next Steps

This quick start guide has covered the essentials to get you up and running with Tyk Cloud. As you explore further, you might want to learn more about [creating APIs]({{< ref "../../getting-started/create-api" >}}) and [importing APIs definition]({{< ref "../../getting-started/import-apis" >}}) in Tyk Dashboard or [managing the infrastructure and environments]({{< ref "../../tyk-cloud/environments-&-deployments/managing-organisations" >}}) in Tyk Cloud.

Contact us for a [guided tour of Tyk Cloud](https://tyk.io/guided-evaluation/) or to discuss your specific requirements. We're here to help you get the most out of Tyk Cloud.
