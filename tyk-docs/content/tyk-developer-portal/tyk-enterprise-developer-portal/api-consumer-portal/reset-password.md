---
title: "Reset Password"
date: 2022-02-14
tags: [""]
description: ""
menu:
  main:
    parent: "Developer - API Consumer Portal"
url: "tyk-developer-portal/tyk-enterprise-developer-portal/api-consumer-portal/reset-password"
weight: 2
---

{{< note success >}}
**Tyk Enterprise Developer Portal**

If you are interested in getting access contact us at [support@tyk.io](<mailto:support@tyk.io?subject=Tyk Enterprise Portal Beta>)

{{< /note >}}

## Introduction

This page goes through the reset password routine. If you have forgotten your password you can easily reset it via the portal.

1. Navigate to the live portal and click **Login** and you’ll get to the login screen.

{{< img src="/img/dashboard/portal-management/enterprise-portal/login-portal-forgot.png" alt="Portal login screen" >}}

2. At the login screen click **Forgot Password?** link and you’ll be redirected to the reset password form.

{{< img src="/img/dashboard/portal-management/enterprise-portal/forgot-password.png" alt="Forgot Password email address" >}}

3. Enter your email address, and click **Reset** and you’ll see this message.

{{< img src="/img/dashboard/portal-management/enterprise-portal/forgot-password-email.png" alt="Forgot Password email sent" >}}

4. Check your email and you should have received an email that contains a link the following format:
`https://the-portal-domain.com/auth/reset/code?token=<token-id>`

5. Click on the link and you will be taken to the reset password screen.
6. Enter your new password and click **Reset**.

{{< img src="/img/dashboard/portal-management/enterprise-portal/reset-password-request.png" alt="Enter and confirm new password" >}}

7. Click **Login again** to go to the Login screen.

{{< img src="/img/dashboard/portal-management/enterprise-portal/reset-done.png" alt="Enter and confirm new password" >}}
