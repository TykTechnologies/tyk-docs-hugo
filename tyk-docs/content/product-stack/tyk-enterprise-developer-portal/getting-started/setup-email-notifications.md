---
title: "Set up email notification service"
date: 2025-07-26
tags: ["Tyk Developer Portal","Enterprise Portal","Email","Notifications"]
aliases:
  - /tyk-stack/tyk-developer-portal/enterprise-developer-portal/getting-started-with-enterprise-portal/setup-email-notifications
  - /product-stack/tyk-enterprise-developer-portal/getting-started/setup-email-notifications
  - /portal/settings
description: "Learn how to set up email notifications in the Tyk Enterprise Developer Portal."
---


## Email Configuration

Configuring the emailing settings is necessary for the portal to send notifications to admin users and API consumers.
Once the configuration is finished, the portal will send emails upon the following events:
* Password reset;
* New access request;
* Access request approved;
* Access request rejected;
* Pending user registration request;
* Invitation to a user to register in the portal;
* User account is activated;
* User account is deactivated;
* New Organisation registration request is created;
* Organisation registration request is accepted;
* Organisation registration request is rejected.


**Prerequisites**

Before setting up the emailing configuration, you need your email server up and running.
To complete the email setup, you will need the following information about your SMTP server:
* Address of your SMTP server;
* A port on which it accepts connections;
* Username and password to connect to your SMTP server.

## Portal Admin User Notifications

To start with, you need to configure an email address where the portal will send notifications for admin users: new API Product access requests, new Organisation registration requests, and so on.
For that, you need to navigate to the General section in the Setting menu, scroll down to the Portal admin notification address, and specify the admin email address in the Portal admin email field.
{{< img src="img/dashboard/portal-management/enterprise-portal/admin_email_settings.png" alt="Portal admin notification address settings" >}}

## Outbound Mailing 

### The default from email

To enable the portal to send notifications to admin users and API Consumers, you need to specify the outbound email address in the Default Email From field.
No notifications will be sent until the Default Email From field is specified.
{{< img src="img/dashboard/portal-management/enterprise-portal/default_from_email_settings.png" alt="Default from email settings" >}}

### Email Subjects

Once the default from email is configured, you can specify subjects for notifications.
If you don’t, the default subjects will be used for email notifications.
{{< img src="img/dashboard/portal-management/enterprise-portal/email_subjects_settings.png" alt="Email subject settings" >}}

### SMTP Server Settings

Once the default from email, the admin notification email, and the subjects for outbound emails are configured, you need to configure settings for the SMTP server.
To do so, navigate to the SMTP setting section in the Settings/General menu and specify:
* Your SMTP server host and port;
* The SMTP username and password if authentication is configured for your SMTP server. 
{{< img src="img/dashboard/portal-management/enterprise-portal/smtp_settings.png" alt="SMTP settings" >}}

