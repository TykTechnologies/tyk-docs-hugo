---
title: "Request access to an API"
date: 2025-07-26
tags: ["Developer Portal", "Tyk", "Getting Started"]
keywords: ["Developer Portal", "Tyk", "Getting Started", "Developer App", "API Consumer"]
description: "Create aa App to consume a Product published on the Tyk Developer Portal."
aliases:
 - /tyk-developer-portal/tyk-enterprise-developer-portal/api-consumer-portal/access-api-product

---

## Introduction

After setting up your Developer Portal with Organisation, Catalogs, API products, and Plans, it's time to experience the portal from an API Consumer's perspective. In this guide, you'll learn how to log in as an API Consumer, create an application, request API access, and test the API with the provided credentials.

This workflow represents the typical experience your API consumers will have when using your Developer Portal to access your APIs.

### Prerequisites

Before you begin, ensure you have:

- [Installed]({{< ref "portal/install" >}}) the Developer Portal
- [Connected]({{< ref "portal/overview/getting-started#configuring-the-provider" >}}) to a Provider (Tyk Dashboard)
- [Configured]({{< ref "portal/overview/getting-started#create-an-organizational-structure" >}}) at least one Organisation and Team
- [Created]({{< ref "portal/overview/getting-started#step-3-create-an-api-consumer-admin-user" >}}) an API Consumer Admin user
- [Published]({{< ref "portal/publish-api-catalog" >}}) an API Catalog with at least one API Product and Plan

## Step 1: Log in as an API Consumer

First, access the Developer Portal as an API consumer:

1. Open your Developer Portal's public URL in a web browser
2. Select **Log In** in the top navigation bar
3. Enter the email address and password for the API consumer admin user you created [previously]({{< ref "portal/overview/getting-started#step-3-create-an-api-consumer-admin-user" >}})
4. Select **Log In**

You should now be logged in to the Live Portal as an API consumer. You'll see the *default theme* provided by Tyk, all of which is [customisable]({{< ref "portal/customization" >}}) for your brand and workflows.

## Step 2: Browse the API Catalog

Next, explore the catalog to find the API product you want to use:

1. Navigate to **Catalogues** in the main navigation
    - In this tutorial there is only one Catalog, containing a single API Product
2. Select the API Product you created [previously]({{< ref "portal/publish-api-catalog#step-2-create-an-api-product" >}})
    - Note that the Authentication requirements are shown in the Catalog view
3. You can now view the details from the perspective of an API Consumer:
    - Product description
    - APIs to which the Product grants access 
    - The subscription plans available to you, including their rate limits and quotas
    - API documentation and Getting Started guides (if you created any)

## Step 3: Create a Developer App

You need to create a [Developer App]({{< ref "portal/developer-app" >}}) to contain your API credentials for any API Products to which you are granted access.

1. Hover over your user name in the main navigation and choose **My Dashboard** from the dropdown menu
2. Navigate to **My Apps** in the left hand navigation
3. Select **Create New App**
4. Enter the following details:
    - App name: A descriptive name (e.g., "Weather Dashboard")
    - Description: What the app will do with the API
    - Visibility: select **Personal** so that the access credentials are not visible to other users in your Org
    - Redirect URL: leave blank, as we're using Auth Token
5. Select **Create App**
6. You will be shown a read-only summary of the App's details; if you want to make changes simply select **Edit details**
7. Select **Back to Apps overview** to return to your *My Apps* list

## Step 4: Request API Access

Now, we will request access to the API product through your app.

1. Return to the API product page in the catalog, which we did in [Step 2]({{< ref "portal/request-access#step-2-browse-the-api-catalog" >}}).
2. Select **Access with this plan**
3. Select **Go to cart**
4. You are now on the access request form where you can see the API Product and Plan that you've selected. If granted access for this combination, you will be issued access credentials to use in your API requests. These must be associated with a Developer App. We just created an App, so select **Existing app** and choose your App from the dropdown
5. Select **Submit request**


## Step 5: View Your API Access Credentials

When we [created]({{< ref "portal/publish-api-catalog#step-3-create-an-api-plan" >}}) the Plan, we configured it to automatically approve access requests, so Tyk will have created access credentials immediately. If we hadn't selected auto-approve, the request would appear in the Admin Portal for an API Owner to approve.

Let's find the access credentials so that we can start to consume the API:

1. Hover over your user name in the main navigation and choose **My Dashboard** from the dropdown menu
2. Navigate to **My Apps** in the left hand navigation
3. Select the app you created [previously]({{< ref "portal/request-access#step-3-create-a-developer-app" >}})
4. In the API Credentials section, you'll see your access credentials
    - Click Show to reveal the API key
    - Copy the credentials for use in step 6

## Step 6: Test the API

Finally, let's use your credentials to make a test API request:

1. Navigate to the API Product details page, either from the App details or Catalog
2. You can see the *listen path* for the API and, if you provided API documentation when creating the Product, may have more detail of the available endpoints
3. Open a terminal or API testing tool (like Postman or cURL)
4. Construct your API request using the access credentials issued in [Step 5]({{< ref "portal/request-access#step-5-view-your-api-access-credentials" >}})
    - For example, with cURL:

    ```
    curl -X GET "https://your-api-gateway.com/your-api-path" \
      -H "Authorization: Bearer YOUR_API_KEY" \
      -H "Content-Type: application/json"
    ```
5. Send the request and verify that you receive a successful response

## Troubleshooting

If you encounter issues when testing the API:

- Authentication Errors: Verify that you're including the correct API key and using the proper authentication method
- Rate Limit Exceeded: Check if you've exceeded the rate limits defined in your plan
- Access Denied: Ensure your access request has been approved
- Endpoint Not Found: Confirm you're using the correct API endpoint URL

## What's Next?

**Congratulations**

You have successfully created a Developer App, requested access to an API Product and accessed an API using the credentials issued by the Developer Portal. This concludes the Getting Started tutorial for Tyk Developer Portal!

Check out the rest of the documentation for more details on each of the elements we've used in the tutorial and full guidance on how to customise Tyk Developer Portal to give your API consumers the best possible experience.
