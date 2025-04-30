---
title: Tyk MCPs
date: 2025-04-28
tags: ["AI MCP", "MCPs in Tyk", "Model Context Protocol"]
description: "A comprehensive guide to Model Context Protocol (MCP) servers in Tyk and how they extend AI capabilities."
---

## MCP capabilities

[Model Context Protocol (MCP)](https://modelcontextprotocol.io/introduction) servers help AI systems securely interact with external services and tools. They establish structured, governed connections that integrate seamlessly with your Tyk environment.

## What are MCPs?

Model Context Protocol (MCP) servers extend AI systems by exposing external services, tools, and resources in a standardised way.

With Tyk MCPs, your AI agents can:

- Access external data sources and APIs
- Execute specialised tools and functions
- Interact with system resources
- Retrieve contextual information

MCPs use a defined protocol to connect AI agents with external systems, expanding AI capabilities while maintaining governance and control.

Tyk MCPs adhere to the open MCP specification and extend it with enterprise-grade features, including enhanced security, governance, and monitoring capabilities.

## Why standardisation matters

The MCP specification standardises how AI agents discover and interact with external capabilities. This helps:

- **Simplify integration** across diverse systems
- **Enhance security** through consistent architecture
- **Promote interoperability** with different vendor solutions
- **Improve governance** when managing AI systems at scale

## How MCPs work

MCPs operate as independent servers using the Model Context Protocol. When an AI agent needs external resources, the workflow typically follows:

1. The agent queries the MCP server for available tools and resources.
2. The agent selects a tool based on metadata and schema descriptions.
3. The agent invokes a tool with structured input.
4. The MCP server processes the request and returns structured output.

MCP servers act as bridges between AI applications and external systems, securely managing authentication, access, and execution.

## MCP for Enterprise use {#mcp-for-enterprise-use}

Tyk extends the MCP model for enterprise deployments with the following capabilities:

- **Remote MCP catalogues and server support** – Expose internal APIs and tools to AI assistants securely without requiring local installations.
- **Secure local MCP server deployment** – Deploy MCP servers within controlled environments, integrated with Tyk AI Gateway for monitoring and governance.
- **Standardised protocols** – Maintain interoperability standards for seamless integration into existing workflows.

These features enable enterprises to scale AI integrations securely while ensuring compliance and operational control.

## Getting started with Tyk MCPs

### Ready-to-use MCP options {#ready-to-use-mcp-options}

Tyk offers several ready-to-use MCP integrations:

- **[API to MCP]({{< ref "ai-management/tyk-mcps/api-to-mcp" >}})** – Convert existing APIs (via OpenAPI/Swagger specs) into MCP-accessible tools.
- **[Dashboard API to MCP]({{< ref "ai-management/tyk-mcps/dashboard-api-to-mcp" >}})** – Expose the Tyk Dashboard API for management and monitoring.
- **[Tyk Docs MCP]({{< ref "ai-management/tyk-mcps/tyk-docs-mcp" >}})** – Provide AI access to searchable Tyk documentation.

### Setting up an MCP server

To set up your own MCP server:

1. Choose an MCP implementation or build a custom one.
2. Define available tools and resources.
3. Deploy the server in a location accessible by your AI agents.

### Configuring an MCP server

MCP servers are configured using JSON files that define the tools and resources they expose. A basic example:

```json
{
  "server_name": "example-mcp",
  "description": "Example MCP server with basic tools",
  "tools": [
    {
      "name": "search_docs",
      "description": "Search documentation for relevant information",
      "input_schema": {
        "type": "object",
        "properties": {
          "query": {
            "type": "string",
            "description": "The search query"
          },
          "max_results": {
            "type": "number",
            "description": "Maximum number of results to return"
          }
        },
        "required": ["query"]
      }
    }
  ],
  "resources": {
    "documentation": {
      "description": "Access to documentation files",
      "uri_pattern": "docs://*"
    }
  }
}
```

For more information on implementing MCPs, refer to our [GitHub docs-mcp repository](https://github.com/TykTechnologies/docs-mcp) or [contact the Tyk team](https://tyk.io/contact/) do thiscuss your specific use cases.
