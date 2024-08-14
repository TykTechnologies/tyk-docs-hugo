---
title: "Email Workflow"
date: 2022-02-09
tags: [""]
description: ""
menu:
  main:
    parent: "Full Customization"
weight: 1
---
{{< note success >}}
**Tyk Enterprise Developer Portal**

If you are interested in getting access, contact us at [support@tyk.io](<mailto:support@tyk.io?subject=Tyk Enterprise Portal Beta>)

{{< /note >}}

The Tyk Enterprise Developer Portal enables admin users to customize emails that are sent to the API consumers and admin users upon certain events that happen on the portal.
As an admin user, you can fully customize emails that are sent from the  portal.

This section provides a guide to email customization.

## List of email notifications

The Tyk Enterprise Developer Portal sends notifications for the following events:

| Event                                                  | Recipient                     | Email subject                                        | Text template                  | HTML template                  | Default template          |
|--------------------------------------------------------|-------------------------------|------------------------------------------------------|--------------------------------|--------------------------------|---------------------------|
| Password reset                                         | User who reset their password | Reset password email - subject                       | auth/reset.text.tmpl           | auth/reset.html.tmpl           | auth/reset.tmpl           |
| New API access request is created                      | All portal admins             | Access request sent for approval (not configurable)  | submitted.text.tmpl            | submitted.html.tmpl            | submitted.tmpl            |
| API access request approved                            | Developer                     | Approve access request - subject                     | approve.text.tmpl              | approve.html.tmpl              | approve.tmpl              |
| API access request rejected                            | Developer                     | Reject access request - subject                      | reject.text.tmpl               | reject.html.tmpl               | reject.tmpl               |
| Pending developer registration request                 | All portal admins             | Invite new admin user - subject                      | newuser.text.tmpl              | newuser.html.tmpl              | newuser.tmpl              |
| An admin user is invited to register in the portal     | Admin                         | Developer registration approval request - subject    | invite.text.tmpl               | invite.html.tmpl               | invite.tmpl               |
| A developer is invited to register in the portal       | Developer                     | Invite new user to a consumer organization - subject | auth/targeted_invite.text.tmpl | auth/targeted_invite.html.tmpl | auth/targeted_invite.tmpl |
| Admin or developer account is activated                | Activated user                | Activate user - subject                              | activate.text.tmpl             | activate.html.tmpl             | activate.tmpl             |
| Admin or developer account is deactivated              | Deactivated user              | Dectivate user - subject                             | deactivate.text.tmpl           | deactivate.html.tmpl           | deactivate.tmpl           |
| New consumer organization registration request         | All portal admins             | New organization registration request - subject      | organisation_request.text.tmpl | organisation_request.html.tmpl | organisation_request.tmpl |
| Consumer organization registration request is approved | Consumer organization admin   | Approve organization registration request - subject  | organisation_approve.text.tmpl | organisation_approve.html.tmpl | organisation_approve.tmpl |
| Consumer organization registration request is rejected | Consumer organization admin   | Reject organization registration request - subject   | organisation_reject.text.tmpl  | organisation_reject.html.tmpl  | organisation_reject.tmpl  |
| New admin account is created                           | Admin                         | Welcome email for admins - subject                   | welcome_admin.text.tmpl        | welcome_admin.html.tmpl        | welcome_admin.tmpl        |
| New developer account is created                       | Developer                     | Welcome email for developers - subject               | welcome_dev.text.tmpl          | welcome_dev.html.tmpl          | welcome_dev.tmpl          |


### Behavior of the welcome and activation emails
When creating a user account from the admin UI or via [the admin APIs]({{< ref "/product-stack/tyk-enterprise-developer-portal/api-documentation/tyk-edp-api">}}), an admin user can create the user account as active or inactive.
The behavior of activation emails varies depending on whether the user account is activated upon creation:
- If the user account is created as inactive, the portal will send the welcome email. Then, upon activation of the user account, it will send the activation email.
- If the user account is created as active, the portal will only send the welcome email and will suppress the activation email.

## Modification of email templates
To render an email, the portal uses the email templates that are contained inside `/mailers` directory of your active theme.
To modify the templates, as an admin user, you need to download and unzip the theme that you want to modify:
1. Navigate to the Themes menu.
2. Download the theme that you want to modify:
   {{< img src="/img/dashboard/portal-management/enterprise-portal/download-a-theme.png" alt="Download a theme" >}}
3. Unzip the theme and navigate to the mailers folder:
   {{< img src="/img/dashboard/portal-management/enterprise-portal/mailers-folder.png" alt="Mailers folder" >}}
4. Inside the mailer folder there are two types of assets: **layouts** and **templates**:
- The templates define the content for a specific email notification.
- The layouts are responsible for displaying the content of the templates.

### Layouts
These are three layouts:
* **HTML layout**: emails.html.tmpl.
* **Text layout**: emails.text.tmpl.
* **The default layout**: emails.tmpl.

The HTML and text layout are used to render HTML and plain text content respectively. If the portal fails to find both the HTML and the text templates, it will use the default one.
To display the content of a template, the layout use special keyword `yield`: `{{ yield }}`.

### Templates
Each event has three email templates:
* **HTML template** is used to display the HTML content in email client.
* **Text template** is used to display the plain text content in email client.
* **Default template** is used when neither HTML nor text templates is presented.

As an admin user, you can modify any of these templates.

### Applying changes to themes
You need to upload the theme to the portal and activate it to make the changes to the email templates effectively:
1. Navigate to the theme folder. Select all the files and compress them:
   {{< img src="/img/dashboard/portal-management/enterprise-portal/compress-a-theme.png" alt="Compress theme" >}}
2. As an admin user, navigate to Theme menu. Select the theme you want to update and upload the theme archive:
   {{< img src="/img/dashboard/portal-management/enterprise-portal/select-a-theme-file.png" alt="Upload a theme" >}}
3. Once the theme archive is selected, click on the Save changes button to upload the archive:
   {{< img src="/img/dashboard/portal-management/enterprise-portal/upload-a-theme.png" alt="Upload a theme" >}}
4. Finally, you need to activate the theme if it's not already active:
   {{< img src="/img/dashboard/portal-management/enterprise-portal/activate-theme.png" alt="Activate a theme" >}}