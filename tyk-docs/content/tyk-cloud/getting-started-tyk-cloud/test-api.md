---
date: 2020-03-17T19:13:22Z
Title: Task 6 - Test your API
menu:
  main:
    parent: "Getting Started with Tyk Cloud"
weight: 6
aliases:
    - /tyk-cloud/test-api/
---

## Introduction

This page shows how you can test an API that you have added to Tyk Cloud, to ensure that it’s functioning correctly. You'll now access the API you setup in [Task 5](/docs/tyk-cloud/getting-started-tyk-cloud/first-api/) from the Edge Gateway within Tyk Cloud.


## Step One - Access the Gateway Ingress

From the Edge Gateway overview, copy the Ingress link and open it in a browser tab. You will get a 404 error.

## Step Two - Append the URL with your API

You created a API named **my app** in [Task 5](/docs/tyk-cloud/getting-started-tyk-cloud/first-api/). Add `/my-app/` to the end of the URL. You should be taken to https://httpbin.org/, which you added as the **Target URL** for the API in [Task 5](/docs/tyk-cloud/getting-started-tyk-cloud/first-api/#step-three---core-settings). 


Next you'll view the analytics for your API in the Dashboard.
