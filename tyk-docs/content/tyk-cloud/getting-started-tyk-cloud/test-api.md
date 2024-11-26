---
date: 2020-03-17T19:13:22Z
Title: Task 6 - Test your API
tags: ["Tyk Stack", "Tyk Cloud", "SaaS", "API"]
description: "How to test your APIs in Tyk Cloud"
menu:
  main:
    parent: "Getting Started with Tyk Cloud"
weight: 6
aliases:
    - /tyk-cloud/test-api/
---

## Introduction

Your first API has been added. What's next? Testing it! This page shows how you can test an API that you have added to Tyk Cloud, to ensure that it’s functioning correctly. You'll now access the API you setup in [Task 5]({{< ref "tyk-cloud/getting-started-tyk-cloud/first-api" >}}) from the Cloud Data Plane within Tyk Cloud.

## Steps to test your API

* **Step 1 - Access the Gateway Ingress:** From the Cloud Data Plane overview, copy the Ingress link and open it in a browser tab. You will get a 404 error.
  
* **Step 2 - Append the URL with your API:** You created a API named **my app** in [Task 5]({{< ref "tyk-cloud/getting-started-tyk-cloud/first-api" >}}). Add `/my-app/` to the end of the URL. You should be taken to [https://httpbin.org/](https://httpbin.org/), which you added as the **Target URL** for the API in [Task 5]({{< ref "tyk-cloud/getting-started-tyk-cloud/first-api" >}}). 


Next you'll [view the analytics]({{< ref "tyk-cloud/getting-started-tyk-cloud/view-analytics" >}}) for your API in the Dashboard.
