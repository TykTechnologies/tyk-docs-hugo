---
date: 2020-03-17T19:13:22Z
Title: Task 5 - Deploy your Edge Gateway and add your first API
tags: ["Tyk Stack", "Tyk Cloud", "SaaS", "Add API"]
description: "Adding your first API in Tyk Cloud"
menu:
  main:
    parent: "Getting Started with Tyk Cloud"
weight: 5
aliases:
    - /tyk-cloud/first-api/
---

## Introduction

Your onboarding is now complete! The next step will be to setup a very basic API to demonstrate how APIs are managed within Tyk Cloud.

## Steps to add an API in Tyk Cloud

* **Step 1 - Access the Dashboard:** Go to the Control Plane overview and click the dashboard link in the Ingress list. You'll be redirected to the Tyk Dashboard for your [Control Plane]({{< ref "/content/tyk-cloud/troubleshooting-&-support/glossary.md#control-plane" >}}).
* **Step 2 - Add a New API:** Click the APIs menu item and then click **Add New API**.
* **Step 3 - Core Settings:**

  1. Give Your API a name - We'll use "my app" for the rest of this Getting Started journey.
  2. Scroll down to the **Target URL** setting and use the URL https://httpbin.org/
  3. Then scroll down to the Authentication section and select **Open(Keyless)** to keep things simple for this demo.

{{< warning success >}}
**Warning**
  
Ensure you configure a valid API Listen path.  Root ("/") listen paths are **not** supported on Tyk Cloud deployments prior to version v3.2.0.
{{< /warning >}}

* **Step 4 - Advanced Options:**

  1. Click the **Advanced Options** tab of the API Designer.
  2. Scroll to the **Segment Tags (Node Segmentation)** setting and add the edge tag (edge) you saw when creating the Edge Gateway.

{{< note success >}}
**Note:**

**How Segment Tags work in Tyk Cloud?**

When an Edge Gateway is deployed, the tag 'edge' and a location tag are automatically generated for the Edge Gateway. You use these tags to connect your API to the appropriate Edge Gateway. It works as follows:

1. Add the **edge** tag to your API to connect it to all Edge Gateways within the Control Plane.
2. Add the location tag to your API to connect it to only Edge Gateways with that location within the Control Plane.
{{< /note >}}

{{< warning success >}}
**Warning**
  
All APIs must be connected to an Edge Gateway by adding the appropriate tag in the *Segment Tags (Node Segmentation)* in the API Designer.
{{< /warning >}}

* **Step 5 - Save Your API:** Click **Save** from the API Designer. Your API will now be added to the APIs list and as the next step you'll access your API from the Gateway Ingress.

Watch our video on Adding an API to your Tyk Cloud Dashboard.

{{< youtube OtQMNKwfXwo >}}

{{< note success >}}
**Note**

We have also introduced Open API Specification (OAS) support with Tyk v4.1. See [Using OAS Definitions]({{< ref "/content/getting-started/using-oas-definitions.md" >}}) for more details.
{{< /note >}}

Want to learn more from one of our team?

{{< button_left href="https://tyk.io/book-a-demo/" color="green" content="Book a demo" >}}