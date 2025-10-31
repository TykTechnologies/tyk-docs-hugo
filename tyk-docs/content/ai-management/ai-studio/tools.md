---
title: "Interact with Tools"
date: 2025-04-25
tags: ["AI Studio", "AI Management", "Tools"]
description: "How to integrate tools in Tyk AI Studio?"
keywords: ["AI Studio", "AI Management", "Tools"]
---

Tyk AI Studio's Tool System allows Large Language Models (LLMs) to interact with external APIs and services, dramatically extending their capabilities beyond simple text generation. This enables LLMs to perform actions, retrieve real-time data, and integrate with other systems.

## Purpose

Tools bridge the gap between conversational AI and external functionalities. By defining tools, you allow LLMs interacting via the [Chat Interface]({{< ref "ai-management/ai-studio/chat-interface" >}}) or API to:

*   Access real-time information (e.g., weather, stock prices, database records).
*   Interact with other software (e.g., search JIRA tickets, update CRM records, trigger webhooks).
*   Perform complex calculations or data manipulations using specialized services.

## Core Concepts

*   **Tool Definition:** A Tool in Tyk AI Studio is essentially a wrapper around an external API. Its structure and available operations are defined using an **OpenAPI Specification (OAS)** (v3.x, JSON or YAML).
*   **Allowed Operations:** From the provided OAS, administrators select the specific `operationIds` that the LLM is permitted to invoke. This provides granular control over which parts of an API are exposed.
*   **Authentication:** Tools often require authentication to access the target API. Tyk AI Studio handles this securely by integrating with [Secrets Management]({{< ref "ai-management/ai-studio/secrets" >}}). You configure the authentication method (e.g., Bearer Token, Basic Auth) defined in the OAS and reference a stored Secret containing the actual credentials.
*   **Privacy Levels:** Each Tool is assigned a privacy level. This level is compared against the privacy level of the [LLM Configuration]({{< ref "ai-management/ai-studio/llm-management" >}}) being used. A Tool can only be used if its privacy level is less than or equal to the LLM's level, preventing sensitive tools from being used with potentially less secure or external LLMs.

    Privacy levels define how data is protected by controlling LLM access based on its sensitivity:
    - Public – Safe to share (e.g., blogs, press releases).
    - Internal – Company-only info (e.g., reports, policies).
    - Confidential – Sensitive business data (e.g., financials, strategies).
    - Restricted (PII) – Personal data (e.g., names, emails, customer info).
*   **Tool Catalogues:** Tools are grouped into logical collections called Catalogues. This simplifies management and access control.
*   **Filters:** Optional [Filters]({{< ref "ai-management/ai-studio/filters" >}}) can be applied to tool interactions to pre-process requests sent to the tool or post-process responses received from it (e.g., for data sanitization).
*   **Documentation:** Administrators can provide additional natural language documentation or instructions specifically for the LLM, guiding it on how and when to use the tool effectively.
*   **Dependencies:** Tools can declare dependencies on other tools, although the exact usage pattern might vary.

## How it Works

When a user interacts with an LLM via the [Chat Interface]({{< ref "ai-management/ai-studio/chat-interface" >}}):

1.  The LLM receives the user prompt and the definitions of available tools (based on user group permissions and Chat Experience configuration).
2.  If the LLM determines that using one or more tools is necessary to answer the prompt, it generates a request to invoke the specific tool operation(s) with the required parameters.
3.  Tyk AI Studio intercepts this request.
4.  It validates the request, checks permissions, and retrieves necessary secrets for authentication.
5.  Tyk AI Studio applies any configured request Filters.
6.  It calls the external API defined by the Tool.
7.  It receives the response from the external API.
8.  Tyk AI Studio applies any configured response Filters.
9.  It sends the tool's response back to the LLM.
10. The LLM uses the tool's response to formulate its final answer to the user.

## Creating & Managing Tools (Admin)

Administrators define and manage Tools via the UI or API:

1.  **Define Tool:** Provide a name, description, and privacy level.
2.  **Upload OpenAPI Spec:** Provide the OAS document (JSON/YAML).
3.  **Select Operations:** Choose the specific `operationIds` the LLM can use.
4.  **Configure Authentication:** Select the OAS security scheme and link to a stored [Secret]({{< ref "ai-management/ai-studio/secrets" >}}) for credentials.
5.  **Add Documentation:** Provide natural language instructions for the LLM.
6.  **Assign Filters (Optional):** Add request/response filters.

    {{< img src="/img/ai-management/tool-configuration.png" alt="Tool Config" >}}

## Organizing & Assigning Tools (Admin)

*   **Create Catalogues:** Group related tools into Tool Catalogues (e.g., "CRM Tools", "Search Tools").
*   **Assign to Groups:** Assign Tool Catalogues to specific Teams. This grants users in those groups *potential* access to the tools within the catalogue.

    {{< img src="/img/ai-management/tool-catalog-config.png" alt="Catalogue Config" >}}

## Using Tools (User)

Tools become available to end-users through multiple access methods:

### Chat Interface Access

Tools become available within the [Chat Interface]({{< ref "ai-management/ai-studio/chat-interface" >}}) if:

1.  The specific Chat Experience configuration includes the relevant Tool Catalogue.
2.  The user belongs to a Team that has been assigned that Tool Catalogue.
3.  The Tool's privacy level is compatible with the LLM being used in the Chat Experience.

The LLM will then automatically decide when to use these available tools based on the conversation.

### AI Portal Tool Catalogue

The [AI Portal]({{< ref "ai-management/ai-studio/ai-portal" >}}) provides a dedicated **Tool Catalogue** where users can:

*   **Browse Available Tools:** View all tools they have access to, similar to how they can browse LLMs and Data Sources.
*   **Subscribe to Tools:** Add tools to their applications as part of the app creation process.
*   **Access Documentation:** View tool-specific documentation and usage guidelines.
*   **Manage Subscriptions:** Control which tools are included in their various applications.

### API Access

Developers can access tools programmatically through the Tyk AI Studio APIs:

*   **Tool Discovery API:** Retrieve lists of available tools and their specifications.
*   **Tool Invocation API:** Execute tool operations directly via REST endpoints.
*   **Application Integration:** Include tools in [Apps]({{< ref "ai-management/ai-studio/apps" >}}) for streamlined API access.

### MCP (Model Context Protocol) Access

Tools can also be accessed through the **Model Context Protocol (MCP)**, providing:

*   **Standardized Interface:** Use MCP-compatible clients to interact with tools in a vendor-neutral way.
*   **Enhanced Integration:** Connect tools to MCP-enabled applications and AI frameworks.
*   **Protocol Compliance:** Leverage the growing ecosystem of MCP-compatible tools and clients.

This multi-access approach ensures that tools can be utilized across different interfaces and integration patterns, from simple chat interactions to complex programmatic integrations.
