---
title: "Notification"
date: 2025-04-25
tags: ["AI Studio", "AI Management", "Notifications"]
description: "How to configure notifications in Tyk AI Studio?"
keywords: ["AI Studio", "AI Management", "Notifications"]
---

Tyk AI Studio includes a centralized Notification System responsible for generating and delivering alerts and messages to users and administrators based on specific system events.

## Purpose

The Notification System aims to:

*   **Inform Stakeholders:** Keep users and administrators aware of important events or required actions.
*   **Enable Proactive Management:** Alert administrators to potential issues or thresholds being reached (e.g., budget limits).
*   **Improve User Experience:** Provide timely feedback on asynchronous processes or user-related events.

## Key Features

*   **Event-Driven:** Notifications are triggered by specific occurrences within the Tyk AI Studio platform.
*   **Configurable Channels:** Supports multiple delivery methods, primarily:
    *   **Email:** Sending notifications to registered user email addresses.
    *   **In-App Notifications:** Displaying messages directly within the Tyk AI Studio UI.
*   **User Preferences:** Allows users (and potentially administrators) to configure which notifications they wish to receive and via which channels (where applicable).
*   **Centralized Logic:** Provides a single system for managing notification templates and delivery rules.

## Common Notification Triggers

Examples of events that might trigger notifications include:

*   **[Budget Control]({{< ref "ai-management/ai-studio/llm-management" >}}):**
    *   Approaching spending limit threshold (e.g., 80% of budget).
    *   Reaching or exceeding spending limit.
*   **[User Management]({{< ref "ai-management/ai-studio/user-management" >}}):**
    *   New user registration/invitation.
    *   Password reset request.
    *   Changes in user roles or group memberships.
*   **System Health & Errors:**
    *   Significant system errors or failures.
    *   Service degradation alerts.
*   **Security Events:**
    *   Suspicious login activity (if monitored).
    *   Changes to critical security settings.

## Configuration

*   **System-Level (Admin):** Administrators typically configure the core settings for the notification system, such as:
    *   Email server (SMTP) details for sending emails.
    *   Default notification templates.
    *   Enabling/disabling specific system-wide notification types.
*   **User-Level:** Users can often manage their notification preferences in their profile settings:
    *   Opt-in/opt-out of specific notification categories.
    *   Choose preferred delivery channels (e.g., receive budget alerts via email).

    {{< img src="/img/ai-management/notification-preferences.png" alt="Notification Prefs UI" >}}

## Integration

The Notification System integrates with various other Tyk AI Studio components that generate relevant events, including:

*   Budget Control System
*   User Management System
*   Analytics System (potentially for performance alerts)
*   Proxy/Gateway (for error or security event alerts)

This system ensures timely communication, helping users and administrators stay informed about the status and activity within the Tyk AI Studio platform.
