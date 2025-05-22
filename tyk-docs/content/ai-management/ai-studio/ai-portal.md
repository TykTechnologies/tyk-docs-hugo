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
3.  **Chat Selection:** Users can select from available Chat Experiences to start or continue conversations.
4.  **Documentation Access:** Users can browse integrated documentation to learn about available capabilities.
5.  **Profile Management:** Users can update their profile settings, preferences, and view usage statistics.

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

This API-first approach ensures that all functionality available through the AI Portal can also be accessed programmatically for custom applications or integrations.

The AI Portal serves as the primary touchpoint for end users interacting with AI capabilities managed by Tyk AI Studio, providing a secure, intuitive, and feature-rich experience.
