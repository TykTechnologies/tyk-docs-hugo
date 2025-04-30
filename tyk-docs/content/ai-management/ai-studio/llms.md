---
title: "Large Language Models (LLMs)"
date: 2025-04-25
tags: ["AI Studio", "AI Management", "LLMs", "Large Language Models"]
description: "How to configure LLMs in AI Studio?"
keywords: ["AI Studio", "AI Management", "LLMs", "Large Language Models"]
draft: true
---

The **LLMs View** provides administrators with an overview of the Large Language Model (LLM) vendors integrated into the portal. This section allows for managing the LLMs available for use in Chat Room features and the AI Gateway. Below is a breakdown of the features and data displayed:

---

#### **Table Overview**
The table displays the following columns:

1. **Name**:
   The name of the LLM vendor or model (e.g., Anthropic, OpenAI GPT-4o, VLLM).

2. **Short Description**:
   A brief overview of the LLM, highlighting its features, strengths, and recommended use cases.
   - Example: "Anthropic's flagship LLM: Claude is known for its excellent support for code-related tasks and code generation."

3. **Vendor**:
   The name of the LLM vendor providing the model (e.g., Anthropic, OpenAI).

4. **Privacy Level**:
   Indicates the model's privacy capability. Privacy levels define how data is protected by controlling LLM access based on its sensitivity. LLM providers with lower privacy levels can't access higher-level data sources and tools, ensuring secure and appropriate data handling.
   
   The system works with 4 privacy levels from low to high:
   - Public – Safe to share (e.g., blogs, press releases).
   - Internal – Company-only info (e.g., reports, policies).
   - Confidential – Sensitive business data (e.g., financials, strategies).
   - Restricted (PII) – Personal data (e.g., names, emails, customer info).

5. **Proxied**:
   A status indicator showing whether the LLM is proxied through the AI Gateway for added security and control.
   - **Green dot**: Proxied.
   - **Red dot**: Not proxied.

6. **Actions**:
   A menu (three-dot icon) that allows administrators to perform specific actions on the LLM, such as editing its details, managing configurations, or removing it from the portal.

---

#### **Features**
1. **Add LLM Button**:
   A green button in the top-right corner labeled **+ ADD LLM**. Clicking this button opens a form to integrate a new LLM vendor or model into the portal.

2. **Pagination Dropdown**:
   Found at the bottom-left corner, this dropdown allows users to control how many LLMs are displayed per page.

---

#### **Use Cases**
- **Chat Room Features**:
   LLMs integrated into the Chat Room provide users with easy access to conversational AI for various purposes, such as general inquiries or task automation.

- **AI Gateway**:
   LLMs configured for the AI Gateway are used to route requests securely, offering fine-grained access control and privacy protections for API calls.

---

### Edit/Create LLM Vendor View

The **Edit/Create LLM Vendor View** allows administrators to configure or update the details of a Large Language Model (LLM) vendor. This form supports adding new LLMs or modifying existing ones for use in the Chat Room features and AI Gateway. Below is a detailed breakdown of the form fields and their functionality:

---

#### **Form Sections and Fields**

##### **LLM Description**
1. **Name** *(Required)*:
   The name of the LLM vendor (e.g., "Anthropic"). This field identifies the LLM within the portal.

2. **Short Description** *(Optional)*:
   A brief summary of the LLM's capabilities, highlighting its key features (e.g., "Claude is known for its excellent support for code-related tasks and code generation.").

3. **Long Description** *(Optional)*:
   A detailed explanation of the LLM, including its history, technical details, and specific use cases. This provides deeper insight into the model for administrators and users.

4. **Vendor** *(Dropdown)*:
   The name of the vendor offering the LLM. This dropdown lists pre-configured vendors (e.g., Anthropic, OpenAI).

5. **Default Model** *(Required)*:
   The specific model to use by default for this LLM (e.g., "claude-3.5-sonnet-20240620"). Administrators can specify the exact model version.

6. **Privacy Level** *(Optional)*:
   The privacy capability of the LLM. Select from four levels (Public, Internal, Confidential, Restricted) to indicate what sensitivity of data the LLM can handle.

---

##### **Access Details**
This section defines the API-related details required for integrating the LLM.

1. **API Endpoint** *(Required for Gateway Integration)*:
   The URL used to send requests to the LLM. This is necessary for enabling the LLM in the AI Gateway.

2. **API Key** *(Optional)*:
   A secure key for authenticating with the LLM's API.
   - **View/Hide Toggle**: Allows administrators to toggle between showing and hiding the key for security purposes.

---

##### **Portal Display Information**
Settings that determine how the LLM appears in the portal for end-users and developers.

1. **Logo URL** *(Optional)*:
   A link to an image that represents the LLM vendor. This logo is displayed in the portal's user interface.

2. **Enabled in Proxy** *(Toggle)*:
   Determines whether the LLM is proxied through the AI Gateway.
   - **Enabled**: Routes traffic securely through the gateway.
   - **Disabled**: Direct access to the LLM's API.

---

##### **Filters**
- **Filters** *(Optional)*:
  A field to add or manage filters that are executed in the AI Gateway when a request flows through the REST endpoint.
  - Example: Adding preprocessing steps to modify user queries before they reach the LLM.

---

#### **Action Buttons**
1. **Update LLM / Create LLM**:
   A button at the bottom of the form that saves the changes or creates the new LLM vendor. This button is active only when all required fields are completed.

2. **Back to LLMs**:
   A link at the top-right corner that navigates back to the LLMs List View without saving changes.

---

#### **Purpose**
This view serves as a centralized interface for managing LLM integrations. It ensures administrators have the flexibility to configure details, enable secure access, and define how LLMs are presented and used within the portal.
