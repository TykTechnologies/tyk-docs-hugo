---
title: "Customize the User model"
date: 2024-02-29
tags: ["Tyk Developer Portal","Enterprise Portal","Sign-up","User attributes","Metadata"]
description: "Customize the User model and extend the data stored in the User profile"
---

{{< note success >}}
**Tyk Enterprise Developer Portal**

If you are interested in getting access, contact us at [support@tyk.io](<mailto:support@tyk.io?subject=Tyk Enterprise Portal Beta>)

{{< /note >}}

## Introduction

In this section, you will learn how to customize the User model and the sign-up form for your API consumers.
Customizing the User model enables the storage of custom data attributes in the User profile.
Additionally, it allows these attributes to be optionally included in the credentials metadata (therefore accessible by the gateway runtime) and exposed in the user sign-up form.

This feature enables the implementation of complex business logic when processing API requests.
For example, it is particularly useful when the quota for API calls needs to be distributed among all developers of consumer organizations.
In such cases, both the quota and the rate limit should be applied at the organization level, rather than according to individual credentials.
In this event, the organization ID should be known to the gateway in runtime. This feature helps to achieve that.

## Add new Custom Attributes to the User model

To customize the User model by adding new data attributes to it, navigate to the **Custom attributes** menu and then select the **User** model. Currently, it is possible to extend only the User model. In future releases we will add the same capabilities to other models.
{{< img src="img/dashboard/portal-management/enterprise-portal/navigate-to-user-attributes.png" alt="Navigate to the User's attributes" >}}

## Add attributes to the user model
To add a new attribute to the user model, click on the **Add Custom attribute** button and then fill in properties of the new attribute:
- **Attribute ID**: A string that consists of letters (a-zA-Z), numbers (0-9), dashes, and underscores. This is used to reference the attribute in the [Admin APIs]({{< ref "/product-stack/tyk-enterprise-developer-portal/api-documentation/tyk-edp-api" >}}) screen.
- **Attribute Label**: The attribute's name that is displayed in the UI.
- **Description**: Explains the intended usage of this attribute. It is also displayed in the UI.
- **Type of attribute**: The type of data that can be stored in this attribute. You cannot change the value of this field once the attribute is created. The following data types are acceptable:
  - Boolean (true or false).
  - Dropdown (a list of values).
  - String.
  - Number.
- **Validation Reg Exp**: A regular expression that is used to validate the value of this field. It is available for the **String** data type only.
- **Enable validation**: Determines if the portal should apply the regular expression defined in the **Validation Reg Exp** to validate the value of this attribute when creating or updating a user profile. It is available for the **String** data type only.
- **Dropdown Values**: A list of values for the attribute. It is available for the **Dropdown** data type only.
- Fields that define the attribute's behavior:
  - **Write once read many**: Determines whether the value of the attribute can be changed after a user profile is created. This means that when **Write once read many** is enabled, the value of this attribute can be set only during the creation of a user profile. After the user profile is created, the value of this attribute cannot be edited, either through the admin APIs or via the Users UI.
  - **Add to the key metadata**: Determines if the value of the attribute should be added to the metadata of Auth keys or OAuth2.0 clients when a user creates them. Keep in mind that credential-level metadata will be accessible in both the gateway runtime and gateway database. Please be cautious when handling personally identifiable information (PII) data.
  - **Required**: Determines if this attribute is required to create a user profile.
  - **Show on sign-up form**: Determines if this attribute should be visible in the sing-up form.
- **Behavior**: Determines if developers can view or edit this attribute. Possible values are:
  - Developers can view and edit the attribute.
  - Developers can only view the attribute.
  - Developers cannot see the attribute.

For the purpose of this guide, make sure to tick the **Required** and **Show on sign-up form** checkboxes and select the **Developers can only view the attribute** option.
{{< img src="img/dashboard/portal-management/enterprise-portal/add-new-attribute-to-user-model.png" alt="Add a new attribute to the user model" >}}

The new attribute will be added to the user sign-up form, once you have created a new custom attribute and saved changes to the user model by clicking on the **Save** button.
{{< img src="img/dashboard/portal-management/enterprise-portal/custom-attribute-in-the-sign-up-form.png" alt="Customized user sign-up form" >}}


## Default attributes
By default, the portal assigns the following attributes to credentials metadata in the gateway when provisioning API credentials:
| Attribute       | Name of the credential metadata field | Description                                                                       |
|-----------------|---------------------------------------|-----------------------------------------------------------------------------------|
| Developer ID    | DeveloperID                           | ID of the developer who created the credential                                    |
| Application ID  | ApplicationID                         | ID of the application to which it belongs                                         |
| Organisation ID | OrganisationID                        | ID of the organization to which the developer who created the application belongs |
| Team IDs        | TeamIDs                               | Array of team IDs to which the developer, who created the application, belongs    |

Additionally, it is possible to include other default attributes of the User model in the credential metadata fields.
However, it is important to remember that metadata at the credential level will be accessible both in the gateway runtime and in the gateway database.
Exercise caution when dealing with personally identifiable information (PII). Additional default attributes include:
| Attribute         | Name of the credential metadata field | Description                                                                         |
|-------------------|---------------------------------------|-------------------------------------------------------------------------------------|
| First name        | First                                 | First name of the developer who created the credential                              |
| Last name         | Last                                  | Last name of the developer who created the credential                               |
| Email             | Email                                 | Email name of the developer who created the credential                              |
| Role              | Role                                  | Array of team IDs to which the developer, who created the application, belongs      |
| Organisation name | Organisation                          | Name of the organization to which the developer who created the application belongs |
| Teams name        | TeamNames                             | Array of team names to which the developer, who created the application, belongs     |