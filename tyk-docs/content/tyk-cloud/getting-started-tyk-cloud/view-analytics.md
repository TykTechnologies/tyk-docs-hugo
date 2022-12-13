---
date: 2020-03-17T19:13:22Z
Title: Task 7 - View Analytics
tags: ["Tyk Stack", "Tyk Cloud", "SaaS", "Analytics"]
description: "Viewing your Dashboard Analytics in Tyk Cloud"
menu:
  main:
    parent: "Getting Started with Tyk Cloud"
weight: 8
aliases:
    - /tyk-cloud/view-analytics/
---

## Introduction

We have now created and tested our API. How do we know that they are performing well? This page walks you through how to then view your API analytics so that you can ensure your APIs are performing perfectly. 

## Steps to check your API analytics

* **Step 1 - Access the Dashboard:** You'll now look at the analytics for the API you created in [Task 5]({{ ref "tyk-cloud/getting-started-tyk-cloud/first-api" >}}).If you're not still in the Tyk Dashboard for your Control Plane, click the dashboard link in the Control Plane Ingress list. Click the Gateway Dashboard menu item and you can see the successful calls made to your API from the Edge Gateway you created.
  
* **Step 2 - Create an Error:** From the Edge Gateway, make a call that will throw an error. For example, use `me-app` instead of `my-app`. You should see the error displayed in the Analytics.

Next - what we covered.
