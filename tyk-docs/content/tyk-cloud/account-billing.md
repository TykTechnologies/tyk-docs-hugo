---
title: "Manage Accounts and Billing in Tyk Cloud"
tags: ["Accounts", "Billing", "Tyk Cloud", "Control Plane"]
description: "Learn how to manage your Tyk Cloud account, including payment plans, billing methods, and account retirement."
aliases:
  - /tyk-cloud/account-billing/add-payment-method
  - /tyk-cloud/account-billing/managing-billing-admins
  - /tyk-cloud/account-billing/plans
  - /tyk-cloud/account-billing/retirement
  - /tyk-cloud/account-billing/upgrade-free-trial
  - /tyk-cloud/account-&-billing/plans
  - /tyk-cloud/create-account
  - /tyk-cloud/account--billing/plans
  - /tyk-cloud/account--billing/retirement
  - /tyk-cloud/account-and-billing/add-payment-method
  - /tyk-cloud/account-and-billing/our-plans
  - /tyk-cloud/account-and-billing/retirement
  - /tyk-cloud/account-and-billing/upgrade-free-trial
---

## Introduction

This section covers the following:

* The available [Tyk Cloud Plans]({{< ref "tyk-cloud/account-billing#select-a-payment-plan" >}})
* Adding [Payment Methods]({{< ref "#add-payment-methods" >}})
* How to [upgrade from the free trial plan]({{< ref "#upgrade-your-free-trial" >}})
* [Managing Billing Admins]({{< ref "#managing-billing-admin" >}}) on your account
* What to do if your account goes into [retirement]({{< ref "#retire-your-account" >}})

## Select a Payment Plan

Our plans cover every use case scenario, from a free trial, to a global enterprise ready plan. You can also purchase addons to increase your functionality. For details on our available plans and pricing go to [Tyk Cloud Pricing](https://tyk.io/price-comparison/).

### Changing plans

You can upgrade or downgrade your current plan at any point in your billing cycle and your payment will be pro-rata'd to reflect the new payment.

### Downgrading plan requirements

If you downgrade your plan, the new plan may have less entitlements than your current plan. You will need to restructure your organization to comply with the new plan entitlements before the downgraded billing starts.

## Add Payment Methods

This section provides a step-by-step guide on how to add a payment method to your Tyk Cloud account, ensuring uninterrupted access to your API management services.

**Adding a payment method to your account**

**Note:** You must have *Billing Admin* user rights to add a payment method. 

Follow these steps:

1. Ensure you are logged in to *Tyk Cloud UI* as a Billing Admin user.
2. Navigate to <a href="https://account.cloud-ara.tyk.io/payment-method" class="external-links" target="_blank" rel="noopener">ACCOUNT & BILLING --> Payment Method</a>. If you lack the necessary user rights, you will be directed to the main [OPERATIONS](https://dashboard.cloud-ara.tyk.io/) screen (the main login page).
3. Enter your card details and click *Save*.
4. You'll see a confirmation that the payment method was successfully added.

{{< note success >}}
**Note about card payments**
  
Currently, *Tyk Cloud* exclusively supports card payments. For alternative payment methods, please [contact us](https://tyk.io/contact/).
{{< /note >}}

**Payment Method Maintenance**

As a *Billing Admin* user, you have the ability to edit or delete an existing payment method. Deleting a payment method without adding a new one will result in your plan going into [retirement]({{< ref "#retire-your-account" >}}) at the end of your current billing cycle.

## Upgrade Your Free Trial

This section explains how you can upgrade your free trial of Tyk Cloud to a full account, to continue enjoying the benefits of Tyk Cloud.

**My free trial is coming to an end. What are my options?**

Every new Tyk Cloud account is assigned to a 48 hour free trial. You have the following options:

* Upgrade to a paid plan at any stage of the free trial period.
* Use the free trial period and upgrade after it expires

**What happens if my free trial expires?**

If your free trial ends without you upgrading, your account enters what we call [retirement]({{< ref "tyk-cloud#glossary" >}}).

**What does upgrading a free trial account involve?**

To upgrade your free trial, you (as a Billing Admin) need to:
* Add a [payment method]({{< ref "#add-payment-methods" >}}) to your organization
* Select a new [plan]({{< ref "tyk-cloud/account-billing#select-a-payment-plan" >}}) from our list

**I've trialled more than what my desired paid plan allows.**

During the free trial we give you the same access as our Enterprise Global plan. When you come to the end of your free trial, you may want to subscribe to a plan such as 'Proof of Concept' which only allows 1 Environment, Cloud Control Plane and Cloud Data Plane. If you had an excess of these set up during your free trial, you would need to remove the appropriate amount of Environments etc from your Organization in order to start the paid plan. But don't worry, we'll let you know what you need to remove when you go to purchase a plan. 


## Managing Billing Admin

This page explains what a Tyk Cloud billing admin can do as part of your API management process, giving you complete control over your API management.

As a Billing Admin you can perform the following:

* Add, edit and delete [payment methods]({{< ref "#add-payment-methods" >}})
* Add further users as Billing Admins
* Upgrade or downgrade plans

### Adding a new Billing Admin

{{< note success >}}
**Note**
  
To be added as a Billing Admin, a user cannot have an existing Tyk Cloud account.
{{< /note >}}

**Prerequisites**

To add a new Billing Admin team member requires you to have one of the following roles:

* Be an existing Billing Admin
* Be the account creator Organization Admin (this user also has the Billing Admin role assigned to them)

1. Select **Account & Billing** from the Admin menu (if you only have Billing Admin permissions you will automatically be logged into the Account and Billing area).

{{< img src="/img/admin/tyk-cloud-account-billing-menu.png" alt="Account & Billing menu" >}}

2. Select **Billing Admins** from the Accounts & Billing menu

{{< img src="/img/admin/billing-admins.png" alt="Billing Admins menu" >}}

3. Click **Invite Billing Admin**

{{< img src="/img/admin/invite-billing-admin.png" alt="Invite Billing Admin" >}}

4. Complete the Billing Admin form and click **Send Invite**

### Removing Billing Admin Access

For this release, removing a billing Admin is not allowed. We can remove a Billing Admin manually, so contact your Account Manager if you need to remove a Billing Admin user.

## Retire Your Account

This section explains what it means when your Tyk Cloud account goes into retirement and what your options are when it does, from account reinstatement to closure.

Your plan will go into [retirement]({{< ref "tyk-cloud#glossary" >}}) in the following scenarios:

* Your subscription is manually canceled by a Billing Admin.
* Your periodic subscription payment fails.
* You are on a Free Trial (5 weeks) and have not signed up to a plan before the expiration of the Free Trial.

**What does retirement mean?**

When a plan goes into retirement, it means your Organization, Teams and any Environmenmts and APIs you manage are suspended for a grace period of up to 30 days and you won't be able to add or edit, only remove.

**How can I end retirement?**

Your Billing Admin needs to do one of the following:

* Renew a subscription that was manually canceled.
* Update your payment details and any outstanding payments are cleared.
* Update a Free Trial to a paid plan, and payment is successful.

**What happens at the end of the 30 day retirement period?**

At the end of the 30 day retirement period if you have not restored or created a relevant subscription, all your data will be deleted.


