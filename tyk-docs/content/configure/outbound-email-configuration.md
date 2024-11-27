---
date: 2017-03-27T15:51:05+01:00
title: Outbound Email Configuration
menu:
  main:
    parent: "Tyk Dashboard Configuration Options"
weight: 6 
aliases:
  - /tyk-configuration-reference/outbound-email-configuration/
---

### Custom Email Templates

The email templates for the Portal and system messages are located in the `portal/email_templates` directory. 
The Tyk Dashboard will need to be restarted for changes to take effect.

### Supported email drivers

* SMTP
* Mandrill
* Sendgrid
* Mailgun
* AmazonSES

To get email set up for your installation, add the following to your `tyk_analytics.conf` file:

```{.copyWrapper}
"email_backend": {
  "enable_email_notifications": true,
  "code": "{PROVIDER-NAME}",
  "settings": {
    // Client provider specific settings go here. You can find the specific field described below 
  },
  "default_from_email": "jeff@wheresmyrug.com",
  "default_from_name": "Jeffrey (The Dude) Lebowski"
}
```

#### SMTP

> Available from Tyk Dashboard version 1.7

```{.json}
"code": "smtp",
"settings": {
  "SMTPUsername": "email@example.com",
  "SMTPPassword": "examplepassword",
  "SMTPAddress": "smtp.example.com:587",
  "TLSInsecureSkipVerify": "false"
},
```

#### SMTP NoAuth

> Available from Tyk Dashboard version 1.8

If `SMTPUsername` or `SMTPPassword` is omitted, Tyk assumes that authentication is not required for your SMTP server. When starting up and initialising the email driver, the Dashboard should output a log message as follows:

```
[May  6 13:46:41]  INFO email: initializing SMTP email driver
[May  6 13:46:41]  INFO email: SMTPUsername and/or SMTPPassword not set - smtp driver configured for no-auth
[May  6 13:46:41]  INFO email: SMTP email driver initialized
```

#### Mandrill

```{.json}
"code": "mandrill",
"settings": {
  "ClientKey": "xxxxxxxxx"
},
```

#### Sendgrid

```{.json}
"code": "sendgrid",
"settings": {
  "ClientKey": "xxxxxxxxx"
},
```

#### Mailgun

```{.json}
"code": "mailgun",
"settings": {
  "Domain": "KEY",
  "PrivateKey": "KEY",
  "PublicKey": "KEY"
},
```

#### Amazon SES

```{.json}
"code": "amazonses",
"settings": {
  "Endpoint": "Endpoint",
  "AccessKeyId": "Access-key",
  "SecretAccessKey": "KEY"
},
```
### Customize your Welcome Emails

You can customize the welcome email that a developer recieves when they signup to your portal. You can use images and other HTML formatted content. The following video walks you through the process.

{{< youtube XNyKRAlTDVs >}}


1. Select **Settings** from your **Dashboard** > **Portal Management**
2. You can change the from email address and the from email name for your welcome emails.
3. To use customized email content, select **Enable custom welcome email**.
4. You can then add the following custom content:
  * Email Subject
  * Email Body content
  * Welcome email body copy
  * Welcome email sign-off

{{< img src="/img/2.10/welcome_email_config.png" alt="Welcome-Email" >}}

5. Enter your plain text or HTML formatted content. If including an image, the `LINK TO IMAGE` in an image `<img src="[LINK TO IMAGE]"/>` link must be a publicly hosted resource.
6. Click **Save** at the top of the Portal Settings screen.


### Customize your Key Approval Emails

#### Editing the Email Body

1. Select **Settings** from your **Dashboard** > **Portal Management**
2. From the "API Key approval email" section, select "Enable custom approval email", and edit the API Key email body.

{{< img src="/img/2.10/key_approval_email_config.png" alt="Email-Customization" >}}

#### Add an image or logo to the Key Approval Email

1. Select "Enable custom approval email" as above.
2. In the "API Key email body copy" field, enter `<img src="[LINK TO IMAGE]"/>`

{{< img src="/img/2.10/key_approval_image_link.png" alt="Email-Image" >}}

{{< note success >}}
**Note**  

The `LINK TO IMAGE` must be a publicly hosted resource.
{{< /note >}}

In an Self-Managed installation you have full access to the HTML template, allowing you further customization.

#### Portal Manager Email Settings

{{< img src="/img/2.10/portal_manager_email_config.png" alt="Portal-Manager-Email" >}}

1. Select **Settings** from your **Dashboard** > **Portal Management**
2. From the **Portal manager email address** section, enter the email address of the person responsible for approving your developer API subscription requests. See [Portal Key Requests]({{< ref "tyk-developer-portal/tyk-portal-classic/portal-concepts#key-requests" >}}) for more details.
