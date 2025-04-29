---
title: "Groups View for Tyk AI Studio"
date: 2025-04-25
tags: ["AI Studio", "AI Management", "Groups"]
description: "Overview of groups in AI Studio?"
keywords: ["AI Studio", "AI Management", "Groups"]
draft: true
---


# Groups View for Tyk AI Studio

The Groups View allows administrators to manage role-based access control by organizing users into groups. Groups define permissions and access levels across the portal, enabling streamlined user management.

---

#### **Table Overview**
The groups are displayed in a tabular format with the following columns:

1. **ID**:
   A unique identifier assigned to each group for easy reference.

2. **Name**:
   The name of the group, describing its role or purpose (e.g., "Solutions Architects," "Customer Support").

3. **Actions**:
   A menu (represented by three dots) allowing administrators to perform additional actions on a group, such as editing its details, managing permissions, or deleting it.

---

#### **Features**
1. **Add Group Button**:
   Located in the top-right corner of the view, this green button allows administrators to create a new group. Clicking the button opens a form to configure the group's name, permissions, and members.

2. **Pagination Dropdown**:
   Found at the bottom-left corner of the table, this dropdown allows administrators to select how many groups are displayed per page (e.g., 10, 20, or more groups).

---

#### **Role-Based Access Control**
Each group represents a set of users with shared permissions. Groups help to:
- Grant or restrict access to specific features or sections of the portal.
- Streamline permission management by assigning roles at the group level instead of individually for each user.
- Enhance security by ensuring users only have access to the resources they need.

---

The Groups View is a critical tool for managing access control efficiently, ensuring that users have the appropriate permissions based on their roles within the organization.

### Groups Quick Actions in Tyk AI Studio

The Groups View includes a set of quick actions accessible via the **Actions** menu (three-dot icon) for each group. These actions allow administrators to make modifications on the fly without navigating to separate pages.

---

#### **Quick Actions Overview**

1. **Add Catalogue to Group**:
   Associates a general catalogue of resources with the group. Catalogues are bundles of LLMs, tools, and data sources that the group can access.

2. **Add Data Catalogue to Group**:
   Specifically links a data catalogue to the group. This grants access to specific datasets and data resources.

3. **Add Tool Catalogue to Group**:
   Assigns a tool catalogue to the group, enabling access to specific tools and utilities defined for the group.

4. **Add User to Group**:
   Opens an interface to add a new user to the selected group. This action facilitates user-role assignment directly from the Groups View.

5. **Edit Group**:
   Redirects to an editing interface where the group’s name, description, and permissions can be modified.

6. **Delete Group**:
   Permanently removes the group from the portal. This action may require confirmation to prevent accidental deletions.

---

#### **Efficiency in Group Management**
These quick actions streamline group management by allowing administrators to update access, assign resources, or modify user roles without navigating away from the Groups View. This improves workflow efficiency, especially in environments with frequent updates or large user bases.

### Group Details View for Tyk AI Studio

The **Group Details View** allows administrators to review and modify the access credentials and object ownership of a specific group. This includes managing users and assigning catalogues for various resources. Below is an explanation of the elements and actions available:

---

#### **Group Information**
- **Name**:
  Displays the name of the selected group (e.g., "Solutions Architects"). This provides context for the resources and users associated with the group.

---

#### **Users in Group**
- **List of Users**:
  Displays the names of all users currently assigned to the group (e.g., Martin, Leonid, Ahmet).
  - Each user entry includes a **delete icon** (trash bin) for removing the user from the group.

- **Add User Button**:
  A green button labeled **+ ADD USER** that allows administrators to add a new user to the group. Clicking this opens a user selection interface.

---

#### **Catalogues in Group**
Catalogues grant access to resources, tools, or data collections that are assigned to the group.

1. **Catalogues in Group**:
   - Displays a list of general catalogues assigned to the group.
   - Includes a **+ ADD CATALOGUE** button to add new catalogues.

2. **Data Catalogues in Group**:
   - Lists all data catalogues assigned to the group.
   - Includes a **+ ADD DATA CATALOGUE** button for adding new data catalogues.

3. **Tool Catalogues in Group**:
   - Lists all tool catalogues associated with the group (e.g., "Solution Architects").
   - Includes a **+ ADD TOOL CATALOGUE** button to add additional tool catalogues.

- **Delete Icons**:
  Each catalogue entry includes a delete icon (trash bin) for removing the catalogue from the group.

---

#### **Navigation**
- **Back to Groups**:
  A link in the top-right corner that returns the administrator to the Groups List View without saving any changes made in the current view.

---

This Group Details View provides a centralized interface for managing group resources and user roles. It ensures that administrators can efficiently update permissions and access rights, maintaining the organization’s security and productivity standards.
