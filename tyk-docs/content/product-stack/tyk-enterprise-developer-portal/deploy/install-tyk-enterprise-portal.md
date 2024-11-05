---
title: "Install Tyk Enterprise Developer Portal"
date: 2022-02-08
tags: ["Tyk Enterprise Developer Portal", "Install Tyk Enterprise Developer Portal", "Bootstrap Tyk Enterprise Developer Portal"]
description: "Installation guide for the Tyk Enterprise Developer Portal"
menu:
  main:
    parent: "Tyk Enterprise Developer Portal"
weight: 1
aliases:
- tyk-stack/tyk-developer-portal/enterprise-developer-portal/install-tyk-enterprise-portal
- tyk-stack/tyk-developer-portal/enterprise-developer-portal/install-tyk-enterprise-portal/launching-portal/launching-portal
---

We deliver the Tyk Enterprise Developer Portal as a Docker container. To  install Tyk Enterprise Developer Portal, you need to launch the Docker image for the portal with a database to store the portal metadata.
Optionally, you may decide to use S3 to store the portal CMS assets (image and theme files)

This guide explains how to install and bootstrap the Tyk Enterprise Developer Portal. On average, it should take around 5-10 minutes to install it depending on your setup.

##  Installation steps
The portal installation process comprises two steps:
1. **Install the portal application.** To install the portal and launch it in the bootstrap mode, you need to configure your portal instance by specifying settings such as TLS, log level, and database connection.
For further guidance on launching the portal, please refer to one of the installation options: [Docker container]({{< ref "product-stack/tyk-enterprise-developer-portal/deploy/install-tyk-enterprise-portal/install-portal-using-docker" >}}), [Docker Compose]({{< ref "product-stack/tyk-enterprise-developer-portal/deploy/install-tyk-enterprise-portal/install-portal-using-docker-compose" >}}), [Helm chart]({{< ref "product-stack/tyk-enterprise-developer-portal/deploy/install-tyk-enterprise-portal/install-portal-using-helm" >}}), or [RPM package]({{< ref "product-stack/tyk-enterprise-developer-portal/deploy/install-tyk-enterprise-portal/install-portal-using-rpm" >}}).
2. **[Bootstrap the portal]({{< ref "product-stack/tyk-enterprise-developer-portal/deploy/bootstrapping-portal" >}})** After you've launched the portal, it will wait for you to provide credentials for the super admin user before it starts accepting traffic.
Once you've created the super admin user, the portal will complete its installation process by creating the necessary database structure and initialising the required assets for its operations. You can [bootstrap]({{< ref "product-stack/tyk-enterprise-developer-portal/deploy/bootstrapping-portal" >}}) the portal either through the UI or using the bootstrap API.
Please refer to [the Bootstrapping section]({{< ref "/product-stack/tyk-enterprise-developer-portal/deploy/bootstrapping-portal" >}}) for implementing this step.

## Tyk Enterprise Developer Portal deployment diagram
{{< img src="img/dashboard/portal-management/enterprise-portal/portal-deployment-diagram.png" width=800 alt="Portal deployment diagram" >}}
<br/>

The portal deployment comprises three main components:
- The portal application itself
- The portal's main database that stores metadata related to the portal, such as API products, plans, developers, applications, and more
- The asset storage, which stores CMS assets such as images, themes, and OpenAPI specification files. The assets could reside in the portal's main database or separately in an S3 bucket or filesystem volume.

Optionally, there could be three additional components:
- **3rd party identity provider.** To [enable oAuth2.0 for your API Products]({{< ref "/content/tyk-stack/tyk-developer-portal/enterprise-developer-portal/api-access/dynamic-client-registration.md" >}}), you'll need to utilize an OpenID-compliant third-party identity provider.
It's essential to note that the [Tyk Stack]({{< ref "/content/tyk-stack.md" >}}) doesn't include third-party identity providers, so you should refer to your Identity Provider's documentation for instructions on configuring and deploying it.
This component is optional and required only for enabling oAuth2.0
- **[Tyk Identity Broker]({{< ref "/content/tyk-identity-broker/getting-started.md" >}})**. You only need this component if you want to configure Single Sign-On for the Tyk Enterprise Developer Portal.
For more guidance on this topic, please consult [the Single Sign-On section]({{< ref "/content/tyk-stack/tyk-developer-portal/enterprise-developer-portal/managing-access/enable-sso.md" >}}) of the documentation
- **Email server**. The portal is capable of sending notifications to both admin users and developers when specific events happen within the portal.
To enable this feature, you need to specify a connection configuration to an email server or service, and configure other email settings.
You can choose to use a server that is installed on your premises or an SMTP-compatible SaaS product.
For step-by-step instructions, please refer to [the Email Settings section]({{< ref "/content/tyk-stack/tyk-developer-portal/enterprise-developer-portal/customise-enterprise-portal/full-customisation/email-customization.md" >}})

## Frequently Asked Questions
### What happens if the Portal goes down?
In the event of the portal application being down, the other components of the Tyk Stack will remain unaffected.
This means your APIs will still be operational, and analytics will continue to be recorded.
Developers will also be able to use their credentials for both oAuth2.0 and API Keys APIs.

However, since the portal application is down, developers won't be able to access their credentials or the analytical dashboard, request access to new API Products, or revoke or rotate their access credentials.
Additionally, admin users won't be able to use the portal, whether through its UI or APIs.
This means you won't be able to create, change, or remove any item managed by the portal, such as developers, organizations, content pages, API Products, plans, and more.

Despite this, you still have some control over access credentials.
If you need to rotate or remove access credentials, you can do so directly in the Tyk Dashboard or in your identity provider.

### What happens if the Dashboard goes down?
If the Tyk Dashboard goes down, developers will still be able to access their access credentials, but they won't be able to rotate or remove their existing credentials, or request access to API Products.
Additionally, the API Analytics dashboard will be compromised.

However, API traffic will remain unaffected, meaning that your APIs will continue to be operational, and analytics will continue to be recorded.

In terms of admin functionality, the only limitation will be the inability to approve or reject access requests or revoke or rotate access credentials.


### Does the portal support SQL databases for storing the portal's CMS assets?

{{< note success >}}
**Note** 

SQLite support will be deprecated from Tyk 5.7.0. To avoid disrupution, please transition to PostgreSQL, MongoDB or one of the listed compatible alternatives.
{{< /note >}}

Yes, since 1.4.0 version of the Enterprise Developer Portal, it supports SQL databases (MariaDB, SQLite, MySQL, and PostgreSQL) for storing the portal's CMS assets.
During the bootstrap process, the portal will create the appropriate tables in the main database. The only thing required to enable SQL storage for the portal's assets is to specify the `db` [storage type]({{< ref "/product-stack/tyk-enterprise-developer-portal/deploy/configuration#portal_storage" >}}) either via a config file or an environment variable.