---
date: 2017-03-24T17:45:29Z
title: Monetise
menu:
  main:
    parent: "Tyk Portal Classic"
weight: 11 
url: /tyk-developer-portal/tyk-portal-classic/monetise/
aliases:
  - /tyk-developer-portal/monetise/
---

Out of the box, the Tyk Developer Portal does not have a billing component, however, this does not mean that it is not possible to enable monetisation within a Portal developer access flow.

### The Developer Key Request Flow

When a developer enrolls for API access with a Tyk portal system, they will:

1.  Sign up
2.  Select a catalogue entry to participate in
3.  Submit a key request form
4.  Receive their token

With Tyk, it is possible to prevent step 4, which auto-enables the key, and instead have the developer redirected to a third party app. This app can then handle any transactional process such as taking a credit card number or pre-validating the developer, before returning the developer to the Portal.

When Tyk hands off to the redirected app, it will also add the key request ID to the request, so the application that handles the transaction can then use the Tyk Dashboard REST API to approve the key request (triggering the email that notifies the developer of their token, as well as notifying the calling application of the raw token), closing the loop.

To enable the developer hand-off in a Tyk Portal, from the **Portal Settings**  enable the redirect option:

![Redirect key requests form]({{< ref "img/dashboard/portal-management/portal_redirect_2.5.png" >}})

## Example Using Stripe

In this video, we walk you through setting up Stripe to take payments via your Tyk Developer Portal.

{{< youtube k5b3FURaULk >}}