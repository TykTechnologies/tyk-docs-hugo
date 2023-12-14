---
title: "Customise the sign-up form"
date: 2023-11-30
tags: ["Tyk Developer Portal","Enterprise Portal","Sign-up","User attributes","Metadata"]
description: "Customise the sign-up form and extend the data stored in the User profile"
menu:
    main:
        parent: "Get Started"
weight: 3
---

{{< note success >}}
**Tyk Enterprise Developer Portal**

If you are interested in getting access, contact us at [support@tyk.io](<mailto:support@tyk.io?subject=Tyk Enterprise Portal Beta>)

{{< /note >}}

## Introduction

In this section, you will learn how to customise the sign-up form for your API Consumers and extend the data stored in the user profile.
To achieve that, you will need to:
- Add a new attribute to the user profile and make it available in the sign-up form.
- Optionally, add a description and set other parameters that suit your requirements.

## Navigate to the Custom Attributes menu

To customise the sign-up form, you need to add new data attributes to the user model so that when a user profile is being created, those attributes will be recorded against the user profile.
To start customising the user sign-up form, navigate to the **Custom attributes** menu and the select the **User** model. Currently, it is possible to extend only the user model. In future releases we will add the same capabilities to other models.
{{< img src="img/dashboard/portal-management/enterprise-portal/navigate-to-user-attributes.png" alt="Navigate to the User's attributes" >}}

## Add a new attribute to the user model
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
  - **Write once read many**: Determines if the value of the attribute can be changed after a user profile is created.
  - **Add to the key metadata**: Determines if the value of the attribute should be added to the metadata of Auth keys or OAuth2.0 clients when a user creates them.
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

{{< note success >}}
**Congratulations**

You have now added a custom attribute to the user model and made it appear in the user sign-up form. By following the above steps you can add more attributes of different types.
{{< /note >}}

## Next step

Visit [Setup email notifications]({{< ref "/product-stack/tyk-enterprise-developer-portal/getting-started/setup-email-notifications" >}}) to learn how to setup email notifications guide, which completes this tutorial.