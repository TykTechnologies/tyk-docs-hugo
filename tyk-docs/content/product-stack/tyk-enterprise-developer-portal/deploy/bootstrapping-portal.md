---
title: "Bootstrap Tyk Enterprise Developer Portal"
date: 2022-02-08
tags: ["Bootstrap Tyk Enterprise Developer Portal", "Tyk Enterprise Developer Portal"]
description: "Bootstrapping guide for the Tyk Enterprise Developer Portal"
menu:
  main:
    parent: "Install Tyk Enterprise Developer Portal"
weight: 4
aliases:
- tyk-stack/tyk-developer-portal/enterprise-developer-portal/install-tyk-enterprise-portal/bootstrapping-portal
---


## Introduction
When launching the Tyk Enterprise Developer portal for the first time, it starts in a special bootstrap mode, which is required to create the first admin user who will act as the super admin.
After launching the portal, you can bootstrap it using either the portal UI or the bootstrap API.

This guide explains how to bootstrap the portal using both the portal UI and the bootstrap API.

## Bootstrapping the portal via the UI
After launching the portal for the first time, you can use its UI to bootstrap it. The portal will display a form that allows you to create a super admin user and set their password. 

Navigate to the portal UI in your browser to start bootstrapping the portal. You should see the following:
{{< img src="img/dashboard/portal-management/enterprise-portal/portal-bootstrap-ui-empty.png" width=800 alt="Portal bootstrap UI" >}}

Enter the admin email, password, first name, and last name. Then click on the `Register to Developer portal` button to complete the bootstrapping process.

The bootstrap process should take no longer than a couple of seconds, so almost instantly the portal will display the following page, which confirms the successful bootstrap.
{{< img src="img/dashboard/portal-management/enterprise-portal/portal-bootstrap-successful.png" width=800 alt="Successful bootstrapping" >}}

Click on the `Login` button to proceed to the login page, where you can use the newly created super admin credentials to log in to the portal.

## Bootstrapping the portal via the API
The second approach to bootstrap the portal is through the bootstrap API, which allows you to programmatically bootstrap the portal.

To bootstrap the portal via an API call, call the bootstrap API:
```shell
curl --location 'http://<your-portal-host>:<your-portal-port>/portal-api/bootstrap' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username":"super-admin@tyk.io",
    "password": "tyk123",
    "first_name":"John",
    "last_name":"Doe"
}'
```

The bootstrap API accepts the following parameters:
- **username** - email of the super admin, it is also used as their login
- **password** - the super admin login password
- **first_name** - first name of the super admin
- **last_name** - first name of the super admin

The bootstrap process should take no longer than a couple of seconds. You will receive the following response as a confirmation of the successful bootstrapping:
```json
{
    "code": "OK",
    "message": "Bootstrapped user successfully",
    "data": {
        "api_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJQcm92aWRlciI6Im5vbmUiLCJVc2VySUQiOiIkMmEkMTAkREF0czZhZTY0ZEZXSkFTbnR2OS8yLmMxcS91VTFhbTRGYk53RVJhTE1Ed2c0NHFsSXJnMkMifQ.ExTNl6UvjQA6WqrPE-7OkSNCBBixc2NGMnh3dnlk5Nw"
    }
}
```

{{< note success >}}
**Take a note of the api_token field**

You will need this to call other Portal APIs.
{{</ note >}}

## Login as the super admin
After you have bootstrapped the portal, either via the UI or the bootstrap API, you can use the super admin's login credentials to log in to the portal.
Open the portal UI in your browser and click on the 'Login' button to open the login page.
{{< img src="img/dashboard/portal-management/enterprise-portal/navigate-to-the-login-page.png" width=800 alt="Open the login page" >}}
<br/>

On the login page, enter the super admin credentials for logging into the portal:
{{< img src="img/dashboard/portal-management/enterprise-portal/login-page-after-bootstrapping.png" width=800 alt="Open the login page" >}}

<br/>

{{< note success >}}
**Congratulations!**


Now you have a fully functional portal.
{{</ note >}}

<br/>

You can continue configuring and customizing it either via the UI or the portal admin API. Please refer to [the Tyk Enterprise Developer Portal Concepts section]({{< ref "product-stack/tyk-enterprise-developer-portal/getting-started/enterprise-portal-concepts" >}}) for further guidance.