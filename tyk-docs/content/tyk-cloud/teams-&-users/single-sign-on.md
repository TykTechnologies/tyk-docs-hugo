---
title: "Tyk Cloud Single sign-on(SSO)"
date: 2023-08-18
menu:
  main:
    parent: "Teams & Users"
weight: 3
---

## What is SSO?
Single sign-on (SSO) is an authentication process which allows users to login to multiple services and applications with one set of credentials.

These credentials are stored with an Identity Provider(IdP). An Identity Provider (IdP) is a service that stores and manages digital identities. Companies can use these services to allow their employees or users to connect with the resources they need. 

## Pre-requisites
{{< note success >}}
**Note**

This functionality is a preview feature and may change in subsequent releases.

To be able to configure Single Sign-On authentication, an SSO entitlement needs to be enabled in the subscription plan. 
If you are interested in getting access, contact your account manager or reach out to our [support@tyk.io](<mailto:support@tyk.io?subject=Tyk Cloud Single sign on>)
{{< /note >}}

## Add new SSO profile
To add a new SSO profile, login to Tyk Cloud, navigate to the _Profile_ list and click on the _ADD PROFILE_ button.

  {{< img src="/img/cloud/cloud-sso-profile-list.png" alt="Tyk Cloud SSO profile list" >}}

Populate the form with all the mandatory fields and click the _ADD PROFILE_ button.

  {{< img src="/img/cloud/cloud-sso-add-profile-form.png" alt="Tyk Cloud SSO add profile form" >}}

The table below explains the fields that should be completed:
| Field name             | Explanation                                                                                                                     |
|----------------------  |---------------------------------------------------------------------------------------------------------------------------------|
| Provider name          | Used to distinguish between different SSO providers.                                                                      |
| Client ID              | Used for client authentication with the IdP provider. The value can be found in your chosen IdP provider's configuration. |
| Client Secret          | Used for client authentication with the IdP provider. The value can be found in your chosen IdP provider's configuration.     |
| Discovery URL          | Used to initialise the authentication flow. This URL can be found in your chosen IdP provider's configuration.  |
| Default User Group ID  | The ID of the user group that new users are allocated to by default upon registration.                                                                       |
| Only registered users  | A check-box that defines which users are allowed to use SSO. If checked, only users who are already registered in Tyk Cloud are allowed to login with SSO. If un-checked, new users will be added to Tyk Cloud in the _Default_ user group upon successful registration. |


As illustrated below an authentication and callback URL will be generated, once the new profile has been added. You need to add these URLs to the configuration of your chosen IdP provider.
The Auth URL is your custom SSO login URL whereas Callback URL is the URL that the SSO provider will callback to, after the user authenticates.

  {{< img src="/img/cloud/cloud-sso-add-config-details.png" alt="Tyk Cloud SSO example of filled form" >}}

## Edit SSO profile
To update/re-configure SSO profile, login to Tyk Cloud, navigate to _Profile_ list and click on the profile that you would like to update.
  
  {{< img src="/img/cloud/cloud-sso-edit-select.png" alt="Tyk Cloud SSO edit selection" >}}

Edit the fields you would like to change and then click on the _SAVE PROFILE_ button.

  {{< img src="/img/cloud/cloud-sso-save-edit.png" alt="Tyk Cloud SSO save edit selection" >}}

## Delete SSO profile
{{< warning success >}}
**Warning**

Please note the action of deleting an SSO profile cannot be undone.

To delete an SSO profile, login to Tyk Cloud, navigate to _Profile_ list and click on the profile you would like to remove.
{{< /warning >}}

  {{< img src="/img/cloud/cloud-sso-delete-select.png" alt="Tyk Cloud SSO delete selection" >}}

On the profile page, click on the _DELETE PROFILE_ button.

  {{< img src="/img/cloud/cloud-sso-delete-click.png" alt="Tyk Cloud SSO delete accept" >}}

On the confirmation window, confirm by clicking the _DELETE PROFILE_ button.

  {{< img src="/img/cloud/cloud-sso-delete-confirm.png" alt="Tyk Cloud SSO delete confirm" >}}

After profile deletion, the authentication URL will not be available anymore. 
