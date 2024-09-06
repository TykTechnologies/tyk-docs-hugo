---
aliases:
- /using-tyk-dashboard
date: 2020-06-24
description: How to decide on which Tyk deployment option is best for you
linkTitle: Getting Started
tags:
- Tyk API Management
- Open Source
- Self-Managed
- Tyk Cloud
- API Gateway
title: Using Tyk Dashboard
---

The Tyk Dashboard is your central hub for managing APIs, monitoring performance, and configuring security settings. This guide will walk you through the key features available on the Tyk Dashboard.

## Access the Dashboard

Log in to your Tyk Dashboard using your credentials. Familiarize yourself with the interface, where the main navigation menu is located on the left side, and the top bar provides quick access to user settings and notifications.

## Manage APIs

### Create a New API

Begin by navigating to the "APIs" section under "System Management." Click "ADD NEW API" to start configuring a new API. Enter the API name, select the API type (e.g., HTTP, GraphQL), specify the upstream URL, and define the listen path. Save your settings to proceed to advanced configurations.

### Edit Existing APIs

View and manage all your APIs in the "APIs" section. Use the search function to quickly find specific APIs. You can edit, clone, or delete APIs as needed to keep your environment organized and up-to-date.

## Configure Security

### Set Up API Authentication

In the API settings, navigate to the "Authentication" tab. Choose from various authentication methods such as API Key, OAuth 2.0, JWT, or Mutual TLS to secure your APIs.


### Define Security Policies

Access the "Policies" section under "System Management" to create or edit security policies. Set rate limits, quotas, and access rights to control how APIs are consumed.

## Monitor and Analyze

### View API Analytics

Click on "Analytics" in the main menu to access detailed insights into API usage. Use filters to analyze traffic patterns, errors, and other usage statistics. Export data for further analysis if needed.

### Set Up Monitoring

Navigate to the "Monitors" section to create alerts for API health and performance metrics. This helps in maintaining optimal API performance and quickly addressing any issues.

## Customize the Developer Portal

### Personalize the Portal

Go to "Portal Management" to customize the appearance and functionality of your developer portal. Manage API documentation and catalogues to enhance developer experience.

### Manage Developer Accounts

Access the "Developers" section to view, add, or manage developer accounts. Control their access to APIs and monitor their activity.

## Key Management

### Generate API Keys

Navigate to "Keys" under "System Management" to create new API keys. Assign policies and set expiration dates to manage access effectively.

## Utilize Universal Data Graph

Access "Data Graphs" in the main menu to create and manage GraphQL schemas. Configure data sources and resolvers to optimize API data handling.

## Manage Multiple Environments

Use the environment selector in the top bar to switch between different configurations for development, staging, and production environments.

## Handle User and Role Management

### Manage Users

Go to "Users" in "System Management" to add new users or modify existing user permissions.

### Configure Roles

Navigate to "Roles" to create custom roles with specific permissions. Assign these roles to users for granular access control.

## Explore Advanced Features

### Implement Single Sign-On (SSO)

Configure SSO in the Dashboard settings for seamless enterprise-level access control.

### Sync Multi-Data Centers

Set up and manage multiple data centers for global API deployment, ensuring high availability and performance.

### Integrate Version Control

Use the Dashboard API to integrate with version control systems, allowing for better management of API definitions and configurations.

## Best Practices

Regularly review and update security policies, use tags for better organization, leverage analytics for performance optimization, keep the Developer Portal updated, and implement role-based access control for efficient team management.

By mastering these features, you can effectively manage, secure, and optimize your APIs using the Tyk Dashboard. For more detailed information on each feature, refer to the official Tyk documentation.