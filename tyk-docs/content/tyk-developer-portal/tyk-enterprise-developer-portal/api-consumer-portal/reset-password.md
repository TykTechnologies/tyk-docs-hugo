---
title: "Forgotten Password"
date: 2025-07-26
linkTitle: API Management
tags: ["Developer Portal", "Tyk", "Password", "Reset Password", "Forgotten Password"]
keywords: ["Developer Portal", "Tyk", "Password", "Reset Password", "Forgotten Password"]
description: "How to reset your password when using Tyk Developer Portal"
aliases:
---

If you've forgotten your password, you can easily reset it through the Developer Portal. This process works for both API Owners and API Consumers.

1. Navigate to the Developer Portal and select the **Login** button.

    {{< img src="/img/dashboard/portal-management/enterprise-portal/login-portal-forgot.png" alt="Portal login screen showing the login form with username and password fields" >}}

2. On the login screen, select the **Forgot Password?** link located below the login form.

    {{< img src="/img/dashboard/portal-management/enterprise-portal/forgot-password.png" alt="Password reset form requesting email address" >}}

3. Enter the email address associated with your account and select **Reset**.

    {{< img src="/img/dashboard/portal-management/enterprise-portal/forgot-password-email.png" alt="Confirmation screen showing that a password reset email has been sent" >}}

4. Check your email inbox for a message from the Tyk Developer Portal. The email will contain a password reset link in this format: `https://<your-portal-domain>/auth/reset/code?token=<token-id>`

5. Click the reset link in the email. This will take you to a password reset page in the Developer Portal.
6. Enter your new password in both fields and click **Reset**.

    {{< img src="/img/dashboard/portal-management/enterprise-portal/reset-password-request.png" alt="Password reset form with fields to enter and confirm a new password" >}}

7. After successfully resetting your password, click **Login again** to return to the login screen with your new credentials.

    {{< img src="/img/dashboard/portal-management/enterprise-portal/reset-done.png" alt="Success screen confirming the password has been reset" >}}

## Important Notes

- Password reset links are valid for a limited time only
- If your reset link expires, simply restart the process
- Ensure your new password meets the system's security requirements
- For security reasons, you'll be required to log in immediately after resetting your password
