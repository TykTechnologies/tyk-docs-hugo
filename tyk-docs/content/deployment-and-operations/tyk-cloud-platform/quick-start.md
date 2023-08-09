---
title: "Quick Start"
date: 2023-07-24
tags: ["Tyk Stack", "Tyk Cloud", "SaaS"]
description: "Getting started with Tyk Cloud"
weight: 1
menu:
  main:
    parent: "Tyk Cloud"
---

Start using Tyk on our servers. Nothing to install. 

## Step 1: Sign Up for Tyk Cloud

To begin your Tyk Cloud journey, follow these simple steps to sign up for an account:

* Navigate to the [Tyk Cloud sign up form](https://tyk.io/sign-up/#cloud).
* Fill in the required information and click on "Next step: Create your password."
* Provide your email address and choose a robust password for your account.
* Select your home region, where your data will be securely stored.
* Opt for the "Set up API platform automatically" option (you can still personalize your setup later).
* Wait a couple of minutes and congratulations, your API platform was deployed!

By default, a cloud data plane will be deployed for you. You can also deploy hybrid data planes on your own infrastructure. 

## Step 2: Get started with your first API with Tyk Dashboard




With your Tyk Cloud account set up, it's time to create your first API:

* Click on "Manage my APIs" to access the Tyk Dashboard directly. If you closed your window in the meantime, follow these steps to reach the Tyk Dashboard in Tyk Cloud:
  * Go to "Deployment"
  * Select the control plane that was deployed for you.
  * Click on the button "Manage APIs" to access the Tyk Dashboard.

{{< img src="/img/cloud/tyk-cloud-tyk-onboarding-dashboard.png" alt="Accessing Tyk Dashboard from Tyk Cloud" width="500px" >}}

* Click the "Design new API" button to start the API definition creation process.

{{< img src="/img/cloud/tyk-cloud-create-api.png" alt="Accessing Creating an API" width="500px" >}}

* Give your API a name - We’ll use “httpbin” for the rest of this quick start.
* Keep https://httpbin.org/ as the upstream URL and click on "Configure API"

{{< img src="/img/cloud/create-api-tyk-cloud.png" alt="Accessing Creating an API" width="500px" >}}

* Select to which gateway you want to deploy this API, select the "edge" tags to deploy to the cloud data plane.

{{< img src="/img/cloud/tyk-cloud-select-cloud-gateway.png" alt="Accessing Creating an API" width="500px" >}}

* Customize your API settings, including authentication, rate limits, and caching, as per your requirements.
* Click "Save" to create your API. Congratulations! You've just set up your first API.

Now that your API is created, you can explore and manage it through the Tyk Dashboard.

## Next Steps

This quick start guide has covered the essentials to get you up and running with Tyk Cloud. As you explore further, you might want to learn more about [creating APIs]({{< ref "../../getting-started/create-api" >}}) and [importing APIs definition]({{< ref "../../getting-started/import-apis" >}}) in Tyk Dashboard or [managing the infrastructure and environments]({{< ref "../../tyk-cloud/environments-&-deployments/managing-organisations" >}}) in Tyk Cloud.


