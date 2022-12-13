---
date: 2017-03-15T16:33:46Z
title: Publish an API
tags: ["Tyk Tutorials", "Getting Started", "Publish API", "Tyk Cloud", "Tyk Self-Managed", "Developer Portal"]
description: "Publishing your API in the Tyk Developer Portal"
menu:
  main:
    parent: "Getting Started"
weight: 4
url: /getting-started/tutorials/publish-api/
aliases:
  - /try-out-tyk/tutorials/create-portal-entry/
  - /tyk-api-gateway-v1-9/tutorials/set-up-your-portal/
  - /tyk-dashboard-v1-0/tutorials/set-up-your-portal/
  - /tyk-developer-portal/tutorials/
  - /getting-started/tutorials/create-portal-entry/
---

This is for the closed source [Tyk Developer Portal]({{< ref "tyk-developer-portal" >}}) only

{{< tabs_start >}}
{{< tab_start "Cloud" >}}

{{< include "create-portal-entry-include" >}}

{{< tab_end >}}
{{< tab_start "Self-Managed" >}}

## Add an API and Swagger based Docs to your Portal Catalogue

Managing your portal is a key part of Tyk Dashboard, this tutorial helps you get started working with your portal and publishing your APIs to your developers.

### Step 1: Create your first API

If you haven't already, create an API in your Dashboard, your Portal will not be visible or live until you have at least one live API being managed by Tyk. This tutorial assumes you've created your first API using the Dashboard and called it "Test API".

### Step 2: Initialise all your portal settings

By default there is no Portal configured, you need to configure from the Portal settings screen, **even if you don't want to change the options**. Select **Portal Management > Settings**. The notification view on the right will say that no configuration was detected so it was created. Your Portal won't work without this step, so it's important.

That's it, now you need to create the home page.

### Step 3: Create the home page

![Create Page One](img/2.10/home_page_template.png)

From **Pages**" click **Add Page** and give it any title you like (e.g. "Welcome") and select **Default Home Page Template** from the **Page Type** drop-down list. Ensure **Check to make this page the home page** is selected.

Save the page.

### Step 4: Create a Policy

When you publish an API to the Portal, Tyk actually publishes a way for developers to enrol in a policy, not the API directly.

> **Why?**: A Tyk policy can grant access to multiple APIs (so long as they all use the same access control mechanism) and set a template for any keys that are generated for the portal for things such as Tags, Rate Limits and Quotas. Another useful feature with a policy and the Portal is that when the key is generated for a developer, it can be made to expire after a certain time - e.g. a trial key.

To create a policy for your test API, select **New Policy** from the **Policies** menu. You can leave all the defaults as is, except:

1.  Name the policy **Default**
2.  Select **Test API** API in the **Access Rights > Add access rule** drop-down list and click **Add** so it appears in the list
3.  Select **Activate Policy**

Save the policy by clicking **Create**.

### Step 5: Publish the API to the Portal

The API that you defined earlier is active and will work as you've seen in the previous tutorial, this time we want to use the Portal to generate a token for a named developer.

Not all APIs are visible to the Portal, only the ones you tell it about, so from the **Catalogue** menu, select **Add API** then:

1.  Select your **Default** policy
2.  Fill in the description fields
3.  Ensure the **Enable this API** is selected

Save the API Catalogue entry by clicking **Update**.

![Catalogue Entry](img/2.10/portal_confirmation_on_prem.png)

### Step 6: Set your Portal hostname

When you set up your Tyk installation, you will have had to, at some point, define a hostname for your portal, either as a `/etc/hosts` file entry, or as a qualified hostname such as `portal.domain.com`. To make the Dashboard aware of this, from the **Your Developer portal > Set Your Portal Domain** enter the hostname and wait for Tyk to refresh.

This process will bind your organisations' Portal to the domain name you've specified.

{{< note success >}}
**Note**  

You need to restart your Dashboard service for the changes to take effect.
{{< /note >}}


### Step 7: Log into your Portal

Select **Open Your Portal** from the **Your Developer Portal** menu drop-down, a new page will open with your new (most likely empty) Portal home page.

{{< note success >}}
**Note**  

If you are using Docker, do not use the drop-down, instead, use the domain name you defined when you set up the forward proxy for your domains - if you followed the Docker setup guide, your Dashboard will be on: `www.tyk-portal-test.com`.
{{< /note >}}

{{< tab_end >}}
{{< tabs_end >}}
