---
title: "Setup email notifications"
date: 2022-12-28
tags: [""]
description: ""
menu:
  main:
    parent: "Getting Started With Enterprise Portal"
weight: 1
---

{{< note success >}}
**Tyk Enterprise Developer Portal**

If you are interested in getting access contact us at [support@tyk.io](<mailto:support@tyk.io?subject=Tyk Enterprise Portal Beta>)

{{< /note >}}

## Introduction

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
* New organization registration request is created;
* Organization registration request is accepted;
* Organization registration request is rejected.


## Prerequisites

Before setting up the emailing configuration, you need your email server up and running.
To complete the email setup, you will need the following information about your SMTP server:
* Address of your SMTP server;
* A port on which it accepts connections;
* Username and password to connect to your SMTP server.

## Portal admin notification address settings
To start with, you need to configure an email address where the portal will notifications for admin users: new API Product access requests, new organization registration requests, and so on.
For that, you need to navigate to the General section in the Setting menu, scroll down to the Portal admin notification address, and specify the admin email address in the Portal admin email field.
{{< img src="/img/dashboard/portal-management/enterprise-portal/admin_email_settings.png" alt="Portal admin notification address settings" >}}

## Outbound mailing settings
### The default from email
To enable the portal to send notifications to admin users and API Consumers, you need to specify the outbound email address in the Default Email From field.
No notifications will be sent until the Default Email From field is specified.
{{< img src="/img/dashboard/portal-management/enterprise-portal/default_from_email_settings.png" alt="Default from email settings" >}}

### Email subjects
Once the default from email is configured, you can specify subjects for notifications.
If you don’t, the default subjects will be used for email notifications.
{{< img src="/img/dashboard/portal-management/enterprise-portal/email_subjects_settings.png" alt="Email subject settings" >}}

### SMTP server settings
Once the default from email, the admin notification email, and the subjects for outbound emails are configured, you need to configure settings for the SMTP server.
To do so, navigate to the SMTP setting section in the Settings/General menu and specify:
* Your SMTP server host and port;
* The SMTP username and password if authentication is configured for your SMTP server. 
{{< img src="/img/dashboard/portal-management/enterprise-portal/smtp_settings.png" alt="SMTP settings" >}}