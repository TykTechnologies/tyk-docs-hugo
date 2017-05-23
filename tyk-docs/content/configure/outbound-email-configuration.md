---
date: 2017-03-27T15:51:05+01:00
title: Outbound Email Configuration
menu:
  main:
    parent: "Configure"
weight: 6 
---

Tyk Dashboard v1.0 supports sending emails using [Mandrill][1], Sendgrid, Mailgun and AmazonSES. To get email set up for your installation, add the following to your `tyk_analytics.conf` file:

```
    "email_backend": {
        "enable_email_notifications": true,
        "code": "provider-name",
        "settings": {
            // Client specific settings go here.
        },
        "default_from_email": "jeff@wheresmyrug.com",
        "default_from_name": "Jeffrey (The Dude) Lebowski"
    }
```
    

### Mandrill

To configure for the Mandrill back end, use the following settings layout:

```
    "code:": "mandrill",
    "settings": {
        "ClientKey": "xxxxxxxxx"
    },
```

### Sendgrid

To configure for the Sendgrid back end, use the following settings layout:

```
    "code": "sendgrid",
    "settings": {
        "ClientKey": "xxxxxxxxx"
    },
```

### Mailgun

To configure for the Mailgun back end, use the following settings layout:

```
    "code": "mailgun",
    "settings": {
        "Domain": "KEY",
        "PrivateKey": "KEY",
        "PublicKey": "KEY"
    },
```

### Amazon SES

To configure for the Amazon SES back end, use the following settings layout:

```
        "code": "amazonses",
        "settings": {
            "Endpoint": "Endpoint",
            "AccessKeyId": "Access-key",
            "SecretAccessKey": "KEY"
        },
```

### Customising email templates

The email templates for the Portal and system messages are located in the `portal/email_templates` folder. Tyk Dashboard will need to be restarted for changes to take effect.

 [1]: https://mandrillapp.com