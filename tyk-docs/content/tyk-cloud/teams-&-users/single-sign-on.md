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

These credentials are stored with an identity provider(IdP). An identity provider (IdP) is a service that stores and manages digital identities. Companies can use these services to allow their employees or users to connect with the resources they need. 

## Pre-requisites
{{< note success >}}
**Note**

This functionality is a preview feature and may change in subsequent releases.

To be able to configure Single sign-on authentication, an SSO entitlement needs to be enabled in the subscription plan. 
If you are interested in getting access, contact us at [support@tyk.io](<mailto:support@tyk.io?subject=Tyk Cloud Single sign on>)
{{< /note >}}

## Add new SSO profile
To add a new SSO profile, login to Tyk Cloud Dashboard, navigate to the _Profile_ list and click on the _ADD PROFILE_ button.

  {{< img src="/img/cloud/cloud-sso-profile-list.png" alt="Tyk Cloud SSO profile list" >}}

Populate the form with all the mandatory fields and click the _ADD PROFILE_ button.

  {{< img src="/img/cloud/cloud-sso-add-profile-form.png" alt="Tyk Cloud SSO add profile form" >}}

The fields to fill and their explanation are:
| Field name             | Explanation                                                                                                                     |
|----------------------  |---------------------------------------------------------------------------------------------------------------------------------|
| Provider name          | It is used to distinguish between different SSO providers.                                                                      |
| Client ID              | It is used for client authentication with the IdP provider. The value can be found in your chosen IdP provider's configuration. |
| Client Secret          | It is used for client authentication with the IdP provider. The value can be found in your chosen IdP provider's configuration.     |
| DIscovery URL          | It is used for initialization of the authentication flow. The value can be found in your chosen IdP provider's configuration.   |
| Default User Group ID  | It defines the group which the new user will be added to.                                                                       |
| Only registered users  | It is a check-box that defines which users are allowed to use SSO. If checked, only users who are already registered in Tyk Cloud are allowed to login with SSO. Else if un-checked, new authenticated user will be added to Tyk Cloud in Default user group. |


Once the new profile has been added, you also need to add the authentication URL & callback URL to the configuration of your chosen IdP provider.
Those two settings can be found on the newly added profile:

  {{< img src="/img/cloud/cloud-sso-add-config-details.png" alt="Tyk Cloud SSO example of filled form" >}}

## Edit SSO profile
To update/re-configure SSO profile, login to Tyk Cloud Dashboard, navigate to _Profile_ list and click on the profile that you would like to update.
  
  {{< img src="/img/cloud/cloud-sso-edit-select.png" alt="Tyk Cloud SSO edit selection" >}}

Edit the fields you would like to change and then click on the _SAVE PROFIE_ button.

  {{< img src="/img/cloud/cloud-sso-save-edit.png" alt="Tyk Cloud SSO save edit selection" >}}

## Delete SSO profile
{{< warning success >}}
**Warning**

Please note the action of deleting an SSO profile cannot be undone.

To delete an SSO profile, login to Tyk Cloud Dashboard, navigate to _Profile_ list and click on the profile you would like to remove.
{{< /warning >}}

  {{< img src="/img/cloud/cloud-sso-delete-select.png" alt="Tyk Cloud SSO delete selection" >}}

On the profile page, click on the _Delete profile_ button.

  {{< img src="/img/cloud/cloud-sso-delete-click.png" alt="Tyk Cloud SSO delete accept" >}}

On the confirmation window, confirm by clicking the _Delete profile_ button.

  {{< img src="/img/cloud/cloud-sso-delete-confirm.png" alt="Tyk Cloud SSO delete confirm" >}}

After profile deletion, the authentication URL will not be available anymore. 
