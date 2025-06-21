---
title: "AI Portal"
date: 2025-04-25
tags: ["AI Studio", "AI Management", "AI Portal"]
description: "How AI Portal works?"
keywords: ["AI Studio", "AI Management", "AI Portal"]
---

The Tyk AI Studio's AI Portal provides a user-friendly web interface where end users can interact with configured AI capabilities. It serves as the primary access point for users to engage with Chat Experiences, view documentation, and manage their account settings.

## Purpose

The main goals of the AI Portal are:

*   **Unified User Experience:** Offer a cohesive interface for accessing all AI capabilities configured within Tyk AI Studio.
*   **Self-Service Access:** Enable users to independently access and utilize AI features without administrator intervention.
*   **Contextual Documentation:** Provide integrated documentation and guidance for available AI services.
*   **Account Management:** Allow users to manage their own profile settings and view usage information.
*   **Secure Access Control:** Enforce permissions based on teams and organizational policies.

## Key Features

*   **Chat Interface:** Access to all [Chat Experiences]({{< ref "ai-management/ai-studio/chat-interface" >}}) the user has permission to use, with a clean, intuitive UI for conversational interactions.
*   **Resource Catalogues:** Browse and subscribe to available LLMs, Data Sources, and [Tools]({{< ref "ai-management/ai-studio/tools" >}}) through dedicated catalogue interfaces.
*   **Application Management:** Create and manage [Apps]({{< ref "ai-management/ai-studio/apps" >}}) that integrate LLMs, tools, and data sources for API access.
*   **Documentation Hub:** Integrated documentation for available AI services, tools, and data sources.
*   **User Profile Management:** Self-service capabilities for updating profile information and preferences.
*   **History & Favorites:** Access to past chat sessions and ability to bookmark favorite conversations.
*   **Responsive Design:** Optimized for both desktop and mobile devices for consistent access across platforms.
*   **Customizable Themes:** Support for light/dark mode and potentially organization-specific branding.
*   **Notifications:** System alerts and updates relevant to the user's AI interactions.

## Using the AI Portal

Users access the AI Portal through a web browser at the configured URL for their Tyk AI Studio installation.

1.  **Authentication:** Users log in using their credentials (username/password, SSO, or other configured authentication methods).
2.  **Home Dashboard:** Upon login, users see a dashboard with available Chat Experiences and recent activity.
3.  **Resource Discovery:** Users can browse catalogues of available LLMs, Data Sources, and Tools to which they have access.
4.  **Application Creation:** Users can create Apps by selecting and subscribing to the LLMs, tools, and data sources they need.
5.  **Chat Selection:** Users can select from available Chat Experiences to start or continue conversations.
6.  **Documentation Access:** Users can browse integrated documentation to learn about available capabilities.
7.  **Profile Management:** Users can update their profile settings, preferences, and view usage statistics.

    {{< img src="/img/ai-management/ai-portal-dashboard.png" alt="AI Portal Dashboard" >}}

## Configuration (Admin)

Administrators configure the AI Portal through the Tyk AI Studio admin interface:

*   **Portal Branding:** Customize logos, colors, and themes to match organizational branding.
*   **Available Features:** Enable or disable specific portal features (chat, documentation, etc.).
*   **Authentication Methods:** Configure login options (local accounts, SSO integration, etc.).
*   **Default Settings:** Set system-wide defaults for user experiences.
*   **Access Control:** Manage which teams can access the portal and specific features within it.
*   **Custom Content:** Add organization-specific documentation, welcome messages, or announcements.

    {{< img src="/img/ai-management/ai-portal-configuration.png" alt="Portal Configuration" >}}

## API Access

While the AI Portal primarily provides a web-based user interface, it is built on top of the same APIs that power the rest of Tyk AI Studio. Developers can access these APIs directly for custom integrations:

*   **Authentication API:** `/api/v1/auth/...` endpoints for managing user sessions.
*   **Chat API:** `/api/v1/chat/...` endpoints for programmatic access to chat functionality.
*   **User Profile API:** `/api/v1/users/...` endpoints for managing user information.
*   **Datasource API:** `/datasource/{dsSlug}` endpoint for directly querying configured data sources.
*   **Tools API:** `/api/v1/tools/...` endpoints for discovering and invoking available tools.
*   **Applications API:** `/api/v1/apps/...` endpoints for managing user applications and their resource subscriptions.

### Datasource API

The Datasource API allows direct semantic search against configured vector stores:

*   **Endpoint:** `/datasource/{dsSlug}` (where `{dsSlug}` is the datasource identifier)
*   **Method:** POST
*   **Authentication:** Bearer token required
*   **Request Format:**
    ```json
    {
      "query": "your search query here",
      "n": 5  // optional, number of results to return (default: 3)
    }
    ```
*   **Response Format:**
    ```json
    {
      "documents": [
        {
          "content": "text content of the document chunk",
          "metadata": {
            "source": "filename.pdf",
            "page": 42
          }
        },
        // additional results...
      ]
    }
    ```

**Important Note:** The endpoint does not accept a trailing slash. Use `/datasource/{dsSlug}` and not `/datasource/{dsSlug}/`.

### Tools API

The Tools API provides programmatic access to available tools and their capabilities:

*   **Tool Discovery:** `/api/v1/tools/` - List available tools and their specifications
*   **Tool Invocation:** `/api/v1/tools/{toolId}/invoke` - Execute specific tool operations
*   **Tool Documentation:** `/api/v1/tools/{toolId}/docs` - Retrieve tool usage documentation

### MCP (Model Context Protocol) Access

Tools can also be accessed through the **Model Context Protocol (MCP)**, providing standardized tool integration:

*   **MCP Server Endpoint:** `/mcp` - Connect MCP-compatible clients to access tools
*   **Protocol Compliance:** Supports the full MCP specification for tool discovery and execution
*   **Client Libraries:** Compatible with popular MCP client implementations across different programming languages

This multi-protocol approach enables developers to:
*   Use familiar MCP tooling and libraries
*   Integrate with existing MCP-enabled workflows
*   Maintain consistency across different AI platforms and tools

This API-first approach ensures that all functionality available through the AI Portal can also be accessed programmatically for custom applications or integrations.

The AI Portal serves as the primary touchpoint for end users interacting with AI capabilities managed by Tyk AI Studio, providing a secure, intuitive, and feature-rich experience.
