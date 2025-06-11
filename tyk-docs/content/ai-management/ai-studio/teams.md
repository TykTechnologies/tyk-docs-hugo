---
title: "Teams View for Tyk AI Studio"
date: 2025-04-25
tags: ["AI Studio", "AI Management", "Teams"]
description: "Overview of teams in AI Studio?"
keywords: ["AI Studio", "AI Management", "Teams"]
draft: true
---


# Teams View for Tyk AI Studio

The Teams View allows administrators to manage role-based access control by organizing users into teams. Teams define permissions and access levels across the portal, enabling streamlined user management.

---

#### **Table Overview**
The teams are displayed in a tabular format with the following columns:

1. **ID**:
   A unique identifier assigned to each team for easy reference.

2. **Name**:
   The name of the team, describing its role or purpose (e.g., "Solutions Architects," "Customer Support").

3. **Actions**:
   A menu (represented by three dots) allowing administrators to perform additional actions on a team, such as editing its details, managing permissions, or deleting it.

---

#### **Features**
1. **Add Team Button**:
   Located in the top-right corner of the view, this green button allows administrators to create a new team. Clicking the button opens a form to configure the team's name, permissions, and members.

2. **Pagination Dropdown**:
   Found at the bottom-left corner of the table, this dropdown allows administrators to select how many teams are displayed per page (e.g., 10, 20, or more teams).

---

#### **Role-Based Access Control**
Each team represents a set of users with shared permissions. Teams help to:
- Grant or restrict access to specific features or sections of the portal.
- Streamline permission management by assigning roles at the team level instead of individually for each user.
- Enhance security by ensuring users only have access to the resources they need.

---

The Teams View is a critical tool for managing access control efficiently, ensuring that users have the appropriate permissions based on their roles within the organization.

### Teams Quick Actions in Tyk AI Studio

The Teams View includes a set of quick actions accessible via the **Actions** menu (three-dot icon) for each team. These actions allow administrators to make modifications on the fly without navigating to separate pages.

---

#### **Quick Actions Overview**

1. **Add Catalogue to Team**:
   Associates a general catalogue of resources with the team. Catalogues are bundles of LLMs, tools, and data sources that the team can access.

2. **Add Data Catalogue to Team**:
   Specifically links a data catalogue to the team. This grants access to specific datasets and data resources.

3. **Add Tool Catalogue to Team**:
   Assigns a tool catalogue to the team, enabling access to specific tools and utilities defined for the team.

4. **Add User to Team**:
   Opens an interface to add a new user to the selected team. This action facilitates user-role assignment directly from the Teams View.

5. **Edit Team**:
   Redirects to an editing interface where the team's name, description, and permissions can be modified.

6. **Delete Team**:
   Permanently removes the team from the portal. This action may require confirmation to prevent accidental deletions.

---

#### **Efficiency in Team Management**
These quick actions streamline team management by allowing administrators to update access, assign resources, or modify user roles without navigating away from the Teams View. This improves workflow efficiency, especially in environments with frequent updates or large user bases.

### Team Details View for Tyk AI Studio

The **Team Details View** allows administrators to review and modify the access credentials and object ownership of a specific team. This includes managing users and assigning catalogues for various resources. Below is an explanation of the elements and actions available:

---

#### **Team Information**
- **Name**:
  Displays the name of the selected team (e.g., "Solutions Architects"). This provides context for the resources and users associated with the team.

---

#### **Users in Team**
- **List of Users**:
  Displays the names of all users currently assigned to the team (e.g., Martin, Leonid, Ahmet).
  - Each user entry includes a **delete icon** (trash bin) for removing the user from the team.

- **Add User Button**:
  A green button labeled **+ ADD USER** that allows administrators to add a new user to the team. Clicking this opens a user selection interface.

---

#### **Catalogues in Team**
Catalogues grant access to resources, tools, or data collections that are assigned to the team.

1. **Catalogues in Team**:
   - Displays a list of general catalogues assigned to the team.
   - Includes a **+ ADD CATALOGUE** button to add new catalogues.

2. **Data Catalogues in Team**:
   - Lists all data catalogues assigned to the team.
   - Includes a **+ ADD DATA CATALOGUE** button for adding new data catalogues.

3. **Tool Catalogues in Team**:
   - Lists all tool catalogues associated with the team (e.g., "Solution Architects").
   - Includes a **+ ADD TOOL CATALOGUE** button to add additional tool catalogues.

- **Delete Icons**:
  Each catalogue entry includes a delete icon (trash bin) for removing the catalogue from the team.

---

#### **Navigation**
- **Back to Teams**:
  A link in the top-right corner that returns the administrator to the Teams List View without saving any changes made in the current view.

---

This Team Details View provides a centralized interface for managing team resources and user roles. It ensures that administrators can efficiently update permissions and access rights, maintaining the organization's security and productivity standards.
