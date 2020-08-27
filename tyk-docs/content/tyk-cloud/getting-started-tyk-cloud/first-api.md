---
date: 2020-03-17T19:13:22Z
Title: Task 5 - Deploy your Edge Gateway and add your first API
menu:
  main:
    parent: "Getting Started with Tyk Cloud"
weight: 5
aliases:
    - /tyk-cloud/first-api/
---

## Introduction

Now that you have completed onboarding you will deploy your Edge Gateway and setup a very basic API to demonstrate how APIs are managed within Tyk Cloud.

## Step One - Deploy your Edge Gateway
1. From your Control Plane overview you will see the Edge Gateway is in a Not Deployed state. Click on your Edge Gateway to open its overview.
2. In the top right of your Edge Gateway overview, click **Not Deployed** and choose **Deploy** from the drop-down.
3. With your Edge Gateway successfully deployed, make a note of the tags assigned to your Edge Gateway. One tag is "edge" and the other is the location of your Edge Gateway. You'll add a tag when creating your API.

{{< note success >}}
**Note**
  
You need to have at least one Edge Gateway with a **Deployed** status connected to your Control Plane. 
{{< /note >}}

## Step Two - Access the Dashboard

Go to the Control Plane overview and click the dashboard link in the Ingress list. You'll be redirected to the Tyk Dashboard for your [Control Plane](/docs/tyk-cloud/troubleshooting-support/glossary/#control-plane).

## Step Three - Add a New API

Click the APIs menu item and then click **Add New API**.

## Step Four - Core Settings

1. Give Your API a name - We'll use "my app" for the rest of this Getting Started journey.
2. Scroll down to the **Target URL** setting and use the URL https://httpbin.org/
3. Then scroll down to the Authentication section and select **Open(Keyless)** to keep things simple for this demo.

## Step Five - Advanced Options

1. Click the **Advanced Options** tab of the API Designer.
2. Scroll to the **Segment Tags (Node Segmentation)** setting and add the edge tag (edge) you saw when creating the Edge Gateway.

### How Segment tags work in Tyk Cloud

When an Edge Gateway is deployed, the edge and Gateway URL segment tags are automatically added. You use these tags to determine where an API can be accessed from. It works as follows:

* Use the **edge** tag in your API to allow the API to be accessed from any Edge Gateway location within Tyk Cloud.
* Use the **Gateway URL** tag to restrict access to the API from that Edge Gateway location only.

{{< warning success >}}
**Warning**
  
You must add one of the above tags to any API you add to your Control Plane Dashboard.
{{< /warning >}}

## Step Six - Save Your API

Click **Save** from the API Designer. Your API will now be added to the APIs list.

Next you'll access your API from the Gateway Ingress.
