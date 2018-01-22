---
date: 2017-03-28T13:57:55+01:00
title: Publish an API to your Developer Portal
menu:
  main:
    parent: "Portal Management Tutorials"
weight: 0 
---


Managing your portal is a key part of Tyk Dashboard, this section aims to provide some tutorials to help you get started working with your portal and publishing your APIs to the public.

## Publish to your Developer Portal

### Step 1: Create your first API

If you haven't already, create an API in your Dashboard, your Portal will not be visible or live until you have at least one live API being managed by Tyk, this tutorial assumes you've created your first API using the Dashboard and called it "Test API".

> **Note for Tyk Cloud and Hybrid users**: If you are a Cloud or Hybrid user, then skip straight to step 4.

### Step 2: Initialise all your portal settings

By default there is no Portal configured, you need to configure from the Portal settings screen, **even if you don't want to change the options**. Select **Portal Management > Settings**. The notification view on the right will say that no configuration was detected so it was created. Your Portal won't work without this step, so it's important.

That's it, now you need to create the home page.

### Step 3: Create the home page

![Create Page One][1]

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

Save the API Catalogue entry by clicking **SAVE**.

![Catalogue Entry][3]

### Step 6: Set your Portal Hostname

> **A note for Cloud and Hybrid users**: This step is not required unless you have the capability to add a custom CNAME.

When you set up your Tyk installation, you will have had to, at some point, define a hostname for your portal, either as a `/etc/hosts` file entry, or as a qualified hostname such as `portal.domain.com`. To make the Dashboard aware of this, from the **Your Developer portal > Set Your Portal Domain** menu enter the hostname and wait for Tyk to refresh.

This process will bind your organisations' Portal to the domain name you've specified.

### Step 7: Log into your Portal

If you select "Your developer portal" -> "Open your portal", a new page will open with your new (most likely empty) Portal home page.

> **A note for Docker users**: If you are using Docker, do not use the drop-down, instead, use the domain name you defined when you set up the forward proxy for your domains - if you followed the Docker setup guide, your Dashboard will be on: `www.tyk-portal-test.com`.

[1]: /docs/img/dashboard/portal-management/edit_page_2.5.png
[2]: /docs/get-started/with-tyk-on-premise/installation/install-tyk-pro-premise-vagrant/
[3]: /docs/img/dashboard/portal-management/catalogue_entry_2.5.png
