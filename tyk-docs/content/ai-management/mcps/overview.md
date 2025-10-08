---
title: Tyk MCPs
date: 2025-04-28
tags: ["AI MCP", "MCPs in Tyk", "Model Context Protocol"]
description: "A comprehensive guide to Model Context Protocol (MCP) servers in Tyk and how they extend AI capabilities."
---

## MCP capabilities

[Model Context Protocol (MCP)](https://modelcontextprotocol.io/introduction) servers help AI systems securely interact with external services and tools. They establish structured, governed connections that integrate seamlessly with your Tyk environment.

## What are MCPs?

Model Context Protocol (MCP) servers extend AI systems by exposing external services, tools, and resources in a standardised way. They act as bridges between AI applications and external systems, securely managing authentication, access, and execution.

With Tyk MCPs, your AI agents can:

- Access external data sources and APIs
- Execute specialised tools and functions
- Interact with system resources
- Retrieve contextual information

MCPs use a defined protocol to connect AI agents with external systems, expanding AI capabilities while maintaining governance and control.

## Why standardisation matters

The MCP specification standardises how AI agents discover and interact with external capabilities. This helps:

- **Simplify integration** across diverse systems
- **Enhance security** through consistent architecture
- **Promote interoperability** with different vendor solutions
- **Improve governance** when managing AI systems at scale

## MCP for Enterprise use {#mcp-for-enterprise-use}

Tyk extends the MCP model for enterprise deployments with the following capabilities:

- **Remote MCP catalogues and server support** – Expose internal APIs and tools to AI assistants securely without requiring local installations.
- **Secure local MCP server deployment** – Deploy MCP servers within controlled environments, integrated with Tyk AI Gateway for monitoring and governance.
- **Standardised protocols** – Maintain interoperability standards for seamless integration into existing workflows.

These features enable enterprises to scale AI integrations securely while ensuring compliance and operational control.

## Ready-to-use MCP options

Tyk offers several ready-to-use MCP integrations:

- **[API to MCP]({{< ref "ai-management/mcps/api-to-mcp" >}})** – Convert existing APIs (via OpenAPI/Swagger specs) into MCP-accessible tools.
- **[Dashboard API to MCP]({{< ref "ai-management/mcps/dashboard-api-to-mcp" >}})** – Expose the Tyk Dashboard API for management and monitoring.
- **[Tyk Docs MCP]({{< ref "ai-management/mcps/tyk-docs-mcp" >}})** – Provide AI access to searchable Tyk documentation.

For more information on implementing MCPs, [contact the Tyk team](https://tyk.io/contact/) do discuss your specific use cases.
