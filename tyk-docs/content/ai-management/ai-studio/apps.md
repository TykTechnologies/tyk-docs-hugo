---
title: "Apps View for Tyk AI Studio"
date: 2025-04-25
tags: ["AI Studio", "AI Management", "Apps"]
description: "How to configure apps in AI Studio?"
keywords: ["AI Studio", "AI Management", "Apps"]
draft: true
---


The **Apps View** is used to manage user-created applications that interact with Large Language Models (LLMs) and data sources via the Tyk AI Gateway. These apps provide a mechanism for users to define and encapsulate the functionality and resources they need for API interactions. Below is a detailed overview of the Apps View and its functionality.

---

#### **Apps List Overview**

1. **Name**:
   - The name of the application created by the user (e.g., `My New App`, `Jira Task Refiner`).

2. **Description**:
   - A brief explanation of the app's purpose or functionality (e.g., "Experiment to refine tasks for Jira").

3. **User**:
   - The name of the user who created or owns the application.

4. **Actions**:
   - A menu (three-dot icon) for performing app-related actions, such as:
     - Viewing app details.
     - Editing the app configuration.
     - Deleting the app.

---

#### **Features**

1. **Add App Button**:
   - A green button labeled **+ ADD APP**, located in the top-right corner. Clicking this button opens a form for creating a new app.

2. **Pagination Control**:
   - Located at the bottom-left, this dropdown allows administrators to adjust the number of apps displayed per page.

---

#### **Purpose of Apps**

1. **Encapsulation of Resources**:
   - Apps bundle together the LLMs, tools, and data sources a user needs to access through the AI Gateway.
   - Users can subscribe to tools from the [AI Portal]({{< ref "ai-management/ai-studio/ai-portal" >}}) tool catalogue, similar to how they access LLMs and data sources.

2. **RESTful Access via Credentials**:
   - Each app is linked to a set of credentials that users can use to authenticate API requests.
   - Credentials must be activated by an administrator after an app is submitted.

3. **Integration with Upstream LLMs and Tools**:
   - Apps allow users to access LLMs through the following methods:
     - **Vendor-Native SDKs**: Direct interaction with the upstream provider's SDK.
     - **OpenAI-Compatible API**: Requests translated into a standardized API format.
   - Tools can be accessed through multiple protocols:
     - **REST APIs**: Direct HTTP API access to tool endpoints.
     - **MCP (Model Context Protocol)**: Standardized tool interaction protocol for enhanced compatibility.

4. **Centralized Administration**:
   - Administrators can manage all user-created apps, ensuring proper governance and access control.

---

#### **Example Workflow**

1. **App Creation**:
   - A user creates an app and specifies the LLMs, tools, and data sources required for their use case.
   - Tools can be discovered and subscribed to through the AI Portal's tool catalogue interface.

2. **Credential Activation**:
   - Once the app is submitted, an admin reviews and activates the app's credentials, enabling the app to interact with the AI Gateway.

3. **API Integration**:
   - The user integrates their app with their systems using the provided credentials and API endpoints.
   - Multiple access methods are available: REST APIs, OpenAI-compatible APIs, and MCP protocol.

4. **Real-Time Usage**:
   - The app facilitates communication with the specified resources via the AI Gateway using the chosen protocol.

---

#### **Benefits**

1. **Streamlined Access**:
   - Users can consolidate all the resources they need into a single app, simplifying integration workflows.

2. **Governance and Security**:
   - Admin-controlled credential activation ensures that only approved apps can access the AI Gateway.

3. **Flexibility**:
   - Support for both vendor-native SDKs and OpenAI-compatible APIs allows users to integrate apps into diverse environments.

4. **Centralized Management**:
   - Admins can oversee all user-created apps, ensuring compliance with organizational policies.

---

The **Apps View** is a key feature of the Tyk AI Studio, enabling users to define, configure, and securely interact with LLMs and data sources through the AI Gateway while ensuring robust governance and control.

### App Details and Proxy Logs

The **App Details View** provides a comprehensive overview of a specific app, including its performance metrics, usage data, and traffic logs. This view is designed to help administrators monitor the app's activity and ensure compliance with governance policies.

---

#### **Sections and Features**

### **App Token Usage and Cost**
- **Graph**:
   - Displays token usage and cost over a specified date range.
   - Tracks the app's performance by visualizing the volume of tokens consumed and associated costs.

- **Date Range Selector**:
   - Allows filtering of token usage and cost data for specific start and end dates.

---

### **App Information**
1. **Name**:
   - The name of the app (e.g., `Jira Task Refiner`).

2. **Description**:
   - A summary of the app's purpose (e.g., "Experiment to refine tasks for Jira").

3. **User**:
   - The creator or owner of the app (e.g., `Jeffy Mathew`).

4. **LLMs**:
   - The LLMs used by the app (if specified).

5. **Datasources**:
   - Lists the data sources configured for use with this app (e.g., `Tyk Documentation`).

6. **Tools**:
   - Shows the tools subscribed to and available for this app (e.g., `JIRA API`, `Weather Service`).

---

### **Credential Information**
1. **Key ID**:
   - The unique identifier for the app's credentials.

2. **Secret**:
   - The app's secret key, masked for security purposes.

3. **Active Status**:
   - Indicates whether the app's credentials are active.
   - Admins must activate credentials after the app is submitted.

---

### **Proxy Logs**
- **Purpose**:
   - Provides a detailed log of inbound and outbound requests processed by the app for governance and troubleshooting purposes.

- **Columns**:
   - **Timestamp**: The date and time of the request.
   - **Vendor**: The upstream LLM vendor handling the request.
   - **Response Code**: The HTTP status code of the response.
   - **Request**: Details of the inbound request.
   - **Response**: The response returned by the upstream LLM or tool.

- **Pagination**:
   - Allows administrators to navigate through logs in batches.

---

### **Action Buttons**
1. **Edit App**:
   - Opens the app configuration form for editing details such as name, description, LLMs, and data sources.

2. **Back to Apps**:
   - Navigates back to the **Apps List View**.

---

#### **Purpose of the App Details View**

1. **Monitoring Performance**:
   - The token usage and cost graph provides insight into how efficiently the app is utilizing resources.

2. **Governance and Compliance**:
   - Proxy logs and credential management ensure transparency and compliance with organizational policies.

3. **Troubleshooting**:
   - Administrators can use detailed request and response logs to identify and resolve issues.

4. **Security**:
   - Credential status and masking ensure that sensitive information is handled securely.

---

This **App Details View** is an essential feature for administrators to monitor, manage, and ensure the secure operation of user-created apps within the Tyk AI Studio.

### App Editing and Credential Approval

The **App Edit View** allows administrators to modify app details and manage credentials for user-created applications. Most importantly, this view provides controls to **approve or reject** an app by activating or deactivating its credentials.

---

#### **Sections and Features**

### **App Details**
1. **Name** *(Required)*:
   - Editable field for the app's name (e.g., `Jira Task Refiner`).

2. **Description** *(Optional)*:
   - A short summary of the app's functionality or purpose (e.g., "Experiment to refine tasks for Jira").

3. **User** *(Read-Only)*:
   - Displays the user who created the app (e.g., `Jeffy Mathew`).

4. **LLMs** *(Dropdown)*:
   - Select or modify the Large Language Models associated with this app.
   - Example: OpenAI's GPT-4, Anthropic's Claude.

5. **Datasources** *(Dropdown)*:
   - Add or remove data sources the app can access.
   - Example: `Tyk Documentation`.

6. **Tools** *(Dropdown)*:
   - Subscribe to or remove tools the app can use.
   - Tools are available from the AI Portal tool catalogue.
   - Example: `JIRA API`, `Weather Service`.

---

### **Credential Information**
1. **Key ID** *(Read-Only)*:
   - The unique identifier for the app's credentials.

2. **Secret** *(Masked)*:
   - A secure key that is masked by default but used for API integration.

3. **Active Toggle**:
   - **Purpose**: Approve or reject the app by activating or deactivating its credentials.
   - **States**:
     - **Inactive**: The app is not approved, and credentials cannot be used.
     - **Active**: The app is approved, enabling API access via the AI Gateway.

---

### **Action Buttons**
1. **Update App**:
   - Saves changes made to the app's details and credentials.

2. **Back to Apps**:
   - Navigates back to the **Apps List View** without saving changes.

---

#### **Use Cases**

1. **Approval Workflow**:
   - After a user submits an app, administrators can review its configuration and activate the credentials if it complies with governance policies.

2. **Editing App Details**:
   - Admins can modify the app's name, description, associated LLMs, and data sources to refine its configuration.

3. **Credential Management**:
   - Credentials can be deactivated if the app no longer complies with organizational requirements.

4. **Governance and Security**:
   - Ensures apps have controlled access to LLMs and data sources, adhering to organizational policies.

---

#### **Purpose and Benefits**

1. **Enhanced Control**:
   - Enables administrators to manage the lifecycle of user-created apps, ensuring proper governance.

2. **Simplified Approval Process**:
   - The credential activation toggle streamlines the process of approving or rejecting apps.

3. **Secure Integration**:
   - Ensures only approved apps can interact with the AI Gateway, protecting sensitive data and resources.

---

The **App Edit View** is a critical feature for managing user-created apps in the Tyk AI Studio, providing administrators with full control over app configuration, approval, and access management.

### Privacy Level Validation

When creating or updating an app, the system validates that the privacy levels of selected datasources are not higher than the privacy levels of selected LLMs. This ensures data governance and prevents sensitive data from being exposed to less secure LLMs.

Privacy levels define how data is protected by controlling LLM access based on its sensitivity. LLM providers with lower privacy levels can't access higher-level data sources and tools, ensuring secure and appropriate data handling.

The system works with 4 privacy levels from low to high:
- Public – Safe to share (e.g., blogs, press releases).
- Internal – Company-only info (e.g., reports, policies).
- Confidential – Sensitive business data (e.g., financials, strategies).
- Restricted (PII) – Personal data (e.g., names, emails, customer info).

If you attempt to create or update an app with datasources that have higher privacy requirements (levels) than the selected LLMs, you'll receive an error message: "Datasources have higher privacy requirements than the selected LLMs. Please select LLMs with equal or higher privacy levels."

To resolve this issue, either:
1. Select LLMs with higher privacy levels that match or exceed your datasource requirements
2. Use datasources with lower privacy requirements that are compatible with your selected LLMs
