---
title: "Users List View for Tyk AI Studio"
date: 2025-04-25
tags: ["AI Studio", "AI Management", "Users"]
description: "How to configure Users in AI Studio?"
keywords: ["AI Studio", "AI Management", "Users"]
draft: true
---

The Users List View provides administrators with an overview of all registered users on the platform. This interface allows for managing users' access and permissions. Below is a detailed explanation of its components:

---

#### **Table Overview**
The table contains user-specific data displayed in rows and organized into the following columns:

- **ID**:
  A unique identifier assigned to each user for easy referencing.

- **Name**:
  The full name of the user as registered in the system.

- **Email**:
  The user's email address, which serves as their primary contact and login credential.

- **Is Admin**:
  Indicates whether the user has administrative privileges.
  - **Yes**: The user has admin access and can perform higher-level management tasks.
  - **No**: The user does not have admin privileges and is limited to standard user capabilities.

- **Actions**:
  A menu (represented by three dots) that allows administrators to perform additional actions for each user, such as editing user details, managing permissions, or removing a user from the system.

---

#### **Features**
- **Add User Button**:
  Located in the top-right corner of the view, this green button allows administrators to add a new user to the system. Upon clicking, a form or modal is expected to open for entering the new user's details.

- **Pagination Dropdown**:
  Found at the bottom-left corner of the table, this dropdown allows administrators to select how many users are displayed per page (e.g., 10, 20, or more users).

---

### Add or Edit Users

The User Form allows administrators to create new user accounts on the platform. Below is a detailed explanation of the fields and options available in this form:

---

#### **Form Fields**
1. **Name** *(Required)*:
   A text field where the administrator enters the full name of the new user.

2. **Email** *(Required)*:
   A text field for the user's email address, which serves as their primary login identifier.

3. **Password** *(Required)*:
   A password field where the administrator sets an initial password for the user.

---

#### **User Role and Permissions**
The form provides toggles to configure the user's role and access permissions:

1. **Admin User**:
   A toggle switch to grant the user administrative privileges.
   - **Enabled**: The user becomes an admin with elevated permissions.
   - **Disabled**: The user remains a standard user.

2. **Show Portal**:
   A toggle switch to grant or restrict access to the portal interface.
   - **Enabled**: The user can access portal features.
   - **Disabled**: Portal access is restricted.

3. **Show Chat**:
   A toggle switch to enable or disable the user's access to chat functionality.
   - **Enabled**: The user can utilize chat features.
   - **Disabled**: Chat features are hidden from the user.

---

#### **Action Button**
- **Add User**:
  A button located at the bottom of the form that finalizes the creation of the user account. This button becomes active only after all required fields are completed.

---

#### **Navigation**
- **Back to Users**:
  A link in the top-right corner that navigates the administrator back to the Users List View without saving changes.

---

This form provides a streamlined way for administrators to add and configure new user accounts, ensuring flexibility in assigning roles and managing access permissions.
