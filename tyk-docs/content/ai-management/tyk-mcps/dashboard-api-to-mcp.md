---
title: Dashboard API as MCP
date: 2025-04-28
tags: ["AI MCP", "Dashboard API", "Tyk AI MCP"]
description: "Using the Tyk Dashboard API as a Model Context Protocol (MCP) server to enable AI assistants to manage your Tyk deployment."
---

# Dashboard API as MCP

## What you'll learn in this section

This section explains how to use the Dashboard API to MCP tool to transform your Tyk Dashboard API into an MCP server for AI assistants. By the end, you'll understand how to enable AI systems to manage and monitor your Tyk deployment through natural language interactions.

## Introduction

The Dashboard API to MCP tool transforms the Tyk Dashboard API into an MCP-compatible server, allowing AI assistants to manage and interact with your Tyk deployment. This integration enables AI systems to perform administrative tasks, monitor your API gateway, and help with troubleshooting through a standardised interface.

By connecting your Tyk Dashboard to AI assistants via MCP, you can enhance operational efficiency, automate routine tasks, and provide contextual support for your API management workflows.

![Dashboard API as MCP](/docs/img/ai-management/dashboard-mcp-concept.png)

## Key benefits

- **AI-powered API management**: Enable AI assistants to help manage your Tyk deployment
- **Operational automation**: Automate routine administrative tasks through AI interactions
- **Enhanced troubleshooting**: Let AI assistants diagnose issues by directly accessing dashboard data
- **Simplified operations**: Interact with your Tyk deployment using natural language
- **Governance maintained**: All interactions follow your existing role-based access controls
- **Audit trail**: All AI actions are logged in the Tyk Dashboard audit system

## Features

The Dashboard API to MCP server provides AI assistants with the ability to:

- **Manage APIs**: Create, retrieve, update, and delete API definitions
- **Handle policies**: Work with security policies and access rights
- **Monitor traffic**: Retrieve analytics and monitor API performance
- **User management**: Manage users, organisations, and access
- **Certificate management**: Handle TLS certificates for your APIs
- **System health**: Check the health and status of your Tyk deployment
- **Configuration**: View and update dashboard and gateway configurations

## How it works

The Dashboard API to MCP solution:

1. Connects to your Tyk Dashboard using secure authentication
2. Transforms the Dashboard API endpoints into MCP-compatible tools
3. Provides AI assistants with a structured way to interact with your Tyk deployment
4. Maintains all existing security permissions and audit logging
5. Returns results to the AI in a format it can understand and process

This architecture maintains the security of your Tyk deployment while enabling AI systems to interact with it in a controlled manner.

## Setup and configuration

### Prerequisites

- A running Tyk Dashboard installation
- Dashboard API credentials with appropriate permissions
- Node.js 18 or higher

### Installation

```bash
# NPM installation
npm install -g @tyk-technologies/dashboard-api-to-mcp

# Or using npx (no installation required)
npx @tyk-technologies/dashboard-api-to-mcp --help
```

### Basic configuration

Create a configuration file named `dashboard-mcp-config.json`:

```json
{
  "dashboardUrl": "https://your-tyk-dashboard.com",
  "apiKey": "your-dashboard-api-key",
  "organisationId": "your-org-id",  // Optional
  "tools": {
    "includeApiManagement": true,
    "includePolicyManagement": true,
    "includeAnalytics": true,
    "includeUserManagement": true,
    "includeCertificateManagement": true,
    "includeSystemHealth": true
  },
  "rateLimit": {
    "requestsPerMinute": 60
  },
  "logging": {
    "level": "info",
    "file": "./logs/dashboard-mcp.log"
  }
}
```

### Running the server

```bash
# Using the configuration file
dashboard-api-to-mcp --config=./dashboard-mcp-config.json

# Or using environment variables
export DASHBOARD_URL="https://your-tyk-dashboard.com"
export DASHBOARD_API_KEY="your-dashboard-api-key"
dashboard-api-to-mcp
```

### Environment variables

All configuration options can be set using environment variables:

| Environment Variable | Description |
| --- | --- |
| `DASHBOARD_URL` | URL of your Tyk Dashboard |
| `DASHBOARD_API_KEY` | Your Dashboard API key |
| `ORGANISATION_ID` | (Optional) Your organisation ID |
| `INCLUDE_API_MANAGEMENT` | Include API management tools (true/false) |
| `INCLUDE_POLICY_MANAGEMENT` | Include policy management tools (true/false) |
| `INCLUDE_ANALYTICS` | Include analytics tools (true/false) |
| `INCLUDE_USER_MANAGEMENT` | Include user management tools (true/false) |
| `INCLUDE_CERT_MANAGEMENT` | Include certificate management tools (true/false) |
| `INCLUDE_SYSTEM_HEALTH` | Include system health tools (true/false) |
| `RATE_LIMIT_RPM` | Rate limit in requests per minute |
| `LOG_LEVEL` | Logging level (debug, info, warn, error) |
| `LOG_FILE` | Path to log file |

## Integration with AI assistants

### Claude Desktop

1. Open Claude Desktop and navigate to Settings > Developer
2. Edit the configuration file:
   - macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - Windows: `%APPDATA%\Claude\claude_desktop_config.json`

3. Add this configuration:

```json
{
  "mcpServers": {
    "tyk-dashboard": {
      "command": "npx",
      "args": [
        "-y",
        "@tyk-technologies/dashboard-api-to-mcp",
        "--config=./dashboard-mcp-config.json"
      ],
      "enabled": true
    }
  }
}
```

4. Restart Claude Desktop

### Cursor

1. Create a configuration file in one of these locations:
   - Project-specific: `.cursor/mcp.json` in your project directory
   - Global: `~/.cursor/mcp.json` in your home directory

2. Add this configuration:

```json
{
  "servers": [
    {
      "command": "npx",
      "args": [
        "-y",
        "@tyk-technologies/dashboard-api-to-mcp",
        "--config=./dashboard-mcp-config.json"
      ],
      "name": "Tyk Dashboard"
    }
  ]
}
```

3. Restart Cursor or reload the window

### [Cline VSCode Extension](https://marketplace.visualstudio.com/items?itemName=anthropic.anthropic-vscode)

1. Open VSCode and navigate to Settings (File > Preferences > Settings)
2. Search for "Cline" settings
3. Find the "MCP Servers" setting, go to the "Installed" tab and click on "Configure MCP Servers"
4. Add the API to MCP server configuration:

```json
"tyk-dashboard-api-to-mcp": {
  "command": "npx",
  "args": [
    "-y",
    "@tyk-technologies/tyk-dashboard-mcp@latest",
    "--auth",
    "cc02d73688f7407d7b81648f1cc21055",
    "--baseUrl",
    "http://locahost:3000"
  ],
  "enabled": true,
  "autoApprove": []
}
```

### Vercel AI SDK

```javascript
import { experimental_createMCPClient } from 'ai';
import { Experimental_StdioMCPTransport } from 'ai/mcp-stdio';
import { generateText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';

// Initialize the Google Generative AI provider
const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
});
const model = google('gemini-2.0-flash');

// Create an MCP client with stdio transport
const mcpClient = await experimental_createMCPClient({
  transport: {
    type: 'stdio',
    command: 'npx',
    args: ['-y', '@tyk-technologies/dashboard-api-to-mcp'],
    env: {
      DASHBOARD_URL: process.env.DASHBOARD_URL,
      DASHBOARD_API_KEY: process.env.DASHBOARD_API_KEY
    },
  },
});

async function main() {
  try {
    // Retrieve tools from the MCP server
    const tools = await mcpClient.tools();

    // Generate text using the AI SDK with MCP tools
    const { text } = await generateText({
      model,
      prompt: 'Show me the last 5 APIs created in our Tyk Dashboard and summarise their key properties.',
      tools,
    });

    console.log('Generated text:', text);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Always close the MCP client to release resources
    await mcpClient.close();
  }
}

main();
```

## Example use cases

### API status dashboard

Ask the AI assistant to create a status summary of all your APIs, including traffic volumes, error rates, and latency statistics.

```
"Give me a status overview of our APIs from the last 24 hours, highlighting any with error rates above 1%."
```

### Automated troubleshooting

Let the AI assistant diagnose issues by examining logs, configuration, and analytics data.

```
"We're seeing timeouts on the payments API. Can you investigate what might be causing this?"
```

### Policy management

Use natural language to create or modify security policies.

```
"Create a new rate-limited policy for our mobile app clients that allows 100 requests per minute to the /accounts endpoints."
```

### Configuration audits

Have the AI assistant review your configuration for potential issues or security concerns.

```
"Review our API configurations and identify any that are missing rate limiting or authentication."
```

### Operational reports

Generate reports on API usage, performance, and system health.

```
"Generate a weekly report of our top 10 APIs by traffic, including average latency and error rates."
```

## Security considerations

When deploying the Dashboard API to MCP server, consider these security best practices:

1. **Least privilege access**: Use a Dashboard API key with only the necessary permissions
2. **Network security**: Deploy the MCP server in a secure network environment
3. **Audit logging**: Enable comprehensive logging of all commands and actions
4. **Rate limiting**: Configure appropriate rate limits to prevent abuse
5. **Regular credential rotation**: Rotate the Dashboard API key periodically
6. **Access control**: Restrict access to the MCP server to authorised users and systems
7. **Sensitive data handling**: Configure the tool to redact sensitive information in responses

## Advanced configuration

### Custom tool definitions

You can extend or customise the available tools by creating a custom tool definition file:

```json
{
  "customTools": [
    {
      "name": "deployEmergencyChange",
      "description": "Deploy an emergency change to fix critical issues",
      "endpoint": "/apis/{api_id}/",
      "method": "PUT",
      "inputSchema": {
        "type": "object",
        "properties": {
          "api_id": {
            "type": "string",
            "description": "ID of the API to update"
          },
          "changeset": {
            "type": "object",
            "description": "Changes to apply to the API definition"
          }
        },
        "required": ["api_id", "changeset"]
      }
    }
  ]
}
```

Then specify the custom tool definition file in your configuration:

```json
{
  "dashboardUrl": "https://your-tyk-dashboard.com",
  "apiKey": "your-dashboard-api-key",
  "customToolsPath": "./custom-tools.json"
}
```

### Integrating with Tyk AI Studio

The Dashboard API to MCP server can be integrated with Tyk AI Studio to provide a comprehensive AI management solution:

1. Deploy the Dashboard API to MCP server
2. Register it with Tyk AI Studio
3. Configure access controls and permissions
4. Create AI assistants that can interact with your Tyk deployment

This integration allows you to leverage both the power of AI assistants and the governance features of Tyk AI Studio.

## Conclusion

The Dashboard API to MCP tool transforms your Tyk Dashboard into an AI-compatible interface, enabling AI assistants to help manage and monitor your API gateway infrastructure. By following the MCP standard, it ensures compatibility with a wide range of AI systems while maintaining the security and governance features of your Tyk deployment.

This integration represents a significant step toward an AI-enabled API management workflow, where routine tasks are automated, and operators get intelligent assistance for complex problems. As part of Tyk's AI supply chain, it demonstrates how standardised protocols like MCP can bring AI capabilities to existing enterprise systems in a controlled, secure manner.

## Support and resources

- [GitHub Repository](https://github.com/TykTechnologies/dashboard-api-to-mcp)
- [Dashboard API Documentation](https://tyk.io/docs/tyk-dashboard-api/)
- [Tyk AI Management](https://tyk.io/docs/ai-management/)
- [Request Support](https://tyk.io/contact/)
