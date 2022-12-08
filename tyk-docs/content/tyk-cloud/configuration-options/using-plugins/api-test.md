---
title: "API Middleware Test"
date: 2020-05-20
tags: ["Tyk Cloud", "Configuration", "Plugins", "Python"]
description: "Testing your Python middleware with Tyk Cloud"
menu:
  main:
    parent: "Python Custom Authentication"
weight: 4
aliases:
    - /python-custom-auth-plugin/api-middleware-test/
---

## Introduction

This page explains how to test out your Python custom authentication on Tyk Cloud, to ensure that it’s working properly. 

## Testing our middleware with an API

You now have your middleware uploaded to your S3 bucket. We are now going to create an API from our Control Plane Dashboard and test it via Postman

### Prerequisites

* A Postman API Client from https://www.postman.com/product/api-client/
* Your mserv middleware ID
* The `auth` value token from your `middleware.py` code

### Create your API

1. From your Control Plane in Tyk Cloud, click the *Ingress > Dashboard link*

![Dashboard Link](/docs/img/plugins/control_plane_dashboard_link.png)

2. From the Dashboard screen, click **APIs** from the System Management menu

![APIs Menu](/docs/img/plugins/apis_menu.png)

3. Click **Add New API**
4. From the API Designer, enter the following in the **Core Settings** tab:
   * From the API Settings section, give your API a name. We'll name this example "test"
   * Scroll down to the Authentication section and select **Custom authentication (Python, CoProcess and JSVM plugins)** from the drop-down menu
   * Select the **Allow query parameter as well as header** option
5. From the Advanced Settings tab enter the following:
   * In the Plugin Options, enter the **Plugin Bundle ID** as returned by mservctl. In our example `9c9ecec1-8f98-4c3f-88cd-ca3c27599e6b`
   * To propagate your API to all your edge Tyk Gateways connected to your Control Plane, you need to add the tag **edge** in the **API Segment Tags section**
6. Click **Save**.

You now have an API called "test" which has as its target the httpbin test site.

## Testing Your API

You now need to test your API to show how the Python Authorization middleware works. We are going to use the Postman client for our testing.

1. First, a quick test. Copy the URL of your Edge Gateway (Note the "edge" tag in the tags column) and paste it in a browser tab. You should get a **404 page not found error**.
2. Then add the "test" endpoint to the URL in your browser tab, so in our example `uptight-paddle-gw.usw2.ara.app/test/`. You should now see a **403 "error: "forbidden"**. This is because your API has Authentication enabled and you haven't provided the credentials yet.
3. Open up your Postman client:
   * Paste your Gateway URL with the API appended to the request - (`uptight-paddle-gw.usw2.ara.app/test/`)
   * Click **Send**. You'll see the **403 "error: "forbidden response"** again
   * In the Headers section in Postman, select **Authorization** from the Key column. Add some random text in the Value field and click **Send**. You should again see the **403 error**.
   * Now replace the random text with the `auth` value from your Python code. In our example `47a0c79c427728b3df4af62b9228c8ae` and click **Send** again.
   * You should now see the **HTTPB** in test page

![Postman Success](/docs/img/plugins/postman_success.png)

4. As a further test of your plugin, you can add `get` to your API request in Postman. So in our example `uptight-paddle-gw.usw2.ara.app/test/get`. Click **Send**. This will return all the get requests, including headers. You should see the `x-tyk-request: "something"` which is the post middleware hook you set up in the Python code.

![Postman All Get Requests](/docs/img/plugins/postman_all_get_requests.png)

### What we have covered

* You've created a middleware Authorisation plugin with Python
* You've uploaded this to your Control Plane Amazon S3 bucket using our mservctl tool
* You've created an API in your Control Plane Dashboard with your middleware bundle ID using our custom autherntication method and tagged it so it is accessable from the edge Tyk Gateways connected to your Control Plane
* You've tested that the authentication works by using the Postman REST API client.