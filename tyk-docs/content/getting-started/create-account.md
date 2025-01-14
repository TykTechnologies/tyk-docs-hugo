---
aliases:
- /create-account
date: 2020-06-24
description: Create your account on Tyk Cloud
linkTitle: Getting Started
tags:
- Tyk API Management
- Open Source
- Self-Managed
- Tyk Cloud
- API Gateway
title: Create Tyk Account
aliases:
    - /tyk-cloud/initial-portal-config
---


Welcome to Tyk! This guide will walk you through the process of creating your account and getting started with our powerful API management platform.

## Choosing Your Tyk Solution

Tyk offers multiple deployment options to suit your needs:

- **Tyk Cloud**: A fully managed service for easy API management at any scale.
- **Tyk Self-Managed**: Install the full lifecycle API management solution in your own infrastructure.
- **Tyk Open Source**: The core API Gateway, freely available and open source.

For this guide, we'll focus on creating an account for Tyk Cloud, which offers a free 48 hour trial.

## Creating Your Tyk Cloud Account

### Step 1: Visit the Sign-Up Page

Navigate to the Tyk sign-up page at [https://tyk.io/sign-up/](https://tyk.io/sign-up/).

### Step 2: Choose "Start Your 48-hour Free Trial"

On the sign-up page, select the "Start your 48-hour free trial" option to begin your Tyk Cloud experience.

{{< img src="/img/getting-started/create-account-start-trial.png" alt="Start Trial" >}}


### Step 3: Complete the Account Creation Form

Fill out the account creation form with your details:

- First Name
- Last Name
- Email Address
- Password
- Company Name (if applicable)
- Work Role and How We Can Help


{{< img src="/img/getting-started/create-account-free-trial-info.png" alt="Create Account Free Trial" >}}


### Step 4: Check Your Email
Check your email inbox for a verification message from Tyk. Click the verification link to confirm your email address.

{{< img src="/img/getting-started/create-account-resend-email.png" alt="Create Account Resend Email" >}}


In your inbox, you should find this email (press "Log in"):

{{< img src="/img/getting-started/create-account-view-email.png" alt="Create Account View Email" >}}



### Step 5: Create Password
After finding the email and logging in, set your password, organization name (any name which you want to represent your environment), and control plane region (select the control plane which is closest to your location).

{{< img src="/img/getting-started/create-account-set-password.png" alt="Create Account Set Password" >}}



### Step 6: Deploy and Take Tutorial
Once your password, organization, and control plane are setup, continue to the next page where your environment will be deployed. This may take 2-5 minutes, you can peruse the tutorial to learn how to use the dashboard while you wait.

{{< img src="/img/getting-started/create-account-deploy-tutorial.png" alt="Create Account Deploy Tutorial" >}}


After a few minutes, the "Add API" button should appear. Select it and you will be taken to the dashboard.

{{< img src="/img/getting-started/create-account-add-api.png" alt="Create Account Add API" >}}


### Step 7: Start Creating APIs
Finally, you will be taken to the Tyk Dashboard. Select "Design From Scratch" and continue on to [our tutorial](/getting-started/configure-first-api) to learn how to setup and secure your APIs.

{{< img src="/img/getting-started/create-account-design-from-scratch.png" alt="Create Account Design From Scratch" >}}

## What Happens Next?

Once you've created your account, Tyk will automatically:

- **Assigns Billing Admin Role**: You are designated as the Billing Admin for your organization, granting you full access to manage billing details and subscription plans.

- **Activates 48-Hour Free Trial**: Your account is enrolled in a 48-hour free trial of Tyk Cloud, allowing you to explore its features and capabilities without immediate commitment.

- **Creates Initial Organization**: An organization is automatically established, serving as the primary entity for managing your environments, APIs, and users.

- **Establishes Default Team**: A default team is set up within your organization, providing a collaborative space for managing APIs and related resources.

- **Deploys Control Plane**: A control plane is deployed in your selected home region, centralizing the management of your APIs, policies, and configurations.

- **Deploys Gateway**: A Tyk Gateway is deployed to manage and route incoming API traffic, handling authentication, rate limiting, and analytics to ensure secure, reliable access.

For certain Tyk Cloud configurations, you may also get an Edge Gateway deployment option, allowing gateways to be positioned closer to users for lower latency and optimized routing. This is ideal for multi-region or global API setups but may require additional configuration or regional deployment options through Tyk’s Multi Data Centre Bridge (MDCB) if set up manually.



{{< note success >}}
**Note**  

After the 48-hour free trial of Tyk Cloud ends, your infrastructure (control plane, gateway, and organization settings) will be deactivated unless you upgrade to a paid plan. Here’s what happens:

- Limited Access: Control plane access and API traffic routing through the gateway will be suspended.
- Data Retention: Your configurations (APIs, policies, user settings) are temporarily retained, allowing you to pick up where you left off if you upgrade within a grace period.
- Billing Admin Role: You’ll still be able to manage billing and subscription options.

Upgrading restores full functionality, letting you continue from where you paused. To avoid disruption, consider exploring paid plans before your trial ends.

{{< /note >}}

## Next Steps

Now that you have your Tyk account set up, here are some recommended next steps:

- **Create Your First API**: Follow our guide on [setting up and securing your first API]({{< ref "getting-started/configure-first-api" >}}).
- **Explore the Dashboard**: Familiarize yourself with the [Tyk Cloud interface]({{< ref "tyk-dashboard" >}}).

## Need Help?

If you encounter any issues or have questions during the setup process, don't hesitate to reach out to our support team at support@tyk.io.

Remember, Tyk offers powerful features for API management, security, and performance. Take advantage of your trial period to explore all that Tyk has to offer!