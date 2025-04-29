---
title: API to MCP
date: 2025-04-28
tags: ["AI MCP", "API-to-MCP", "Tyk AI MCP"]
description: ""
---

## Introduction

API to MCP is a powerful tool that creates Model Context Protocol (MCP) servers from OpenAPI/Swagger specifications. It enables AI assistants to interact with your APIs by transforming standard OpenAPI specifications into MCP-compatible tools that AI models can use directly.

## Overview

The API to MCP tool acts as a bridge between your existing REST APIs and AI assistants. It dynamically loads OpenAPI specifications and exposes the API operations as MCP tools at runtime, allowing AI models to:

- Understand your API's capabilities
- Execute API operations with proper parameters
- Process API responses in a structured way

This enables seamless integration of your existing APIs with AI assistants without requiring any changes to your API implementation.

## Key Features

- **Dynamic OpenAPI Loading**: Load specifications from local files or HTTP/HTTPS URLs
- **OpenAPI Overlay Support**: Apply overlays to customize specifications
- **Flexible Operation Filtering**: Include/exclude specific operations using glob patterns
- **Comprehensive Parameter Handling**: Preserves formats and includes metadata
- **Authentication Support**: Handles API keys, OAuth tokens, and other security schemes
- **Custom Headers**: Add custom headers to all API requests
- **MCP Extensions**: Support for custom `x-mcp` extensions to override tool names and descriptions
- **Multiple Integration Options**: Works with Claude Desktop, Cursor, Vercel AI SDK, and other MCP-compatible environments

## Installation

### Global Installation

```bash
npm install -g @tyktechnologies/api-to-mcp
```

### Project Installation

```bash
npm install @tyktechnologies/api-to-mcp
```

## Usage

### Basic Usage

```bash
# Using npx (no installation required)
npx @tyktechnologies/api-to-mcp --spec=https://petstore3.swagger.io/api/v3/openapi.json

# If installed globally
api-to-mcp --spec=./path/to/openapi.json
```

### Configuration Options

Configuration can be provided via command-line arguments, environment variables, or a JSON configuration file.

#### Command Line Options

```bash
# Basic usage with OpenAPI spec
api-to-mcp --spec=./path/to/openapi.json

# Apply overlays
api-to-mcp --spec=./path/to/openapi.json --overlays=./path/to/overlay.json,https://example.com/api/overlay.json

# Filter operations
api-to-mcp --spec=./path/to/openapi.json --whitelist="getPet*,POST:/users/*"

# Specify target API URL
api-to-mcp --spec=./path/to/openapi.json --targetUrl=https://api.example.com

# Add custom headers
api-to-mcp --spec=./path/to/openapi.json --headers='{"X-Api-Version":"1.0.0"}'

# Disable X-MCP header
api-to-mcp --spec=./path/to/openapi.json --disableXMcp
```

#### Environment Variables

```bash
# Set OpenAPI spec path
export OPENAPI_SPEC_PATH=./path/to/openapi.json

# Set overlay paths
export OPENAPI_OVERLAY_PATHS=./path/to/overlay1.json,./path/to/overlay2.json

# Set target API URL
export TARGET_API_BASE_URL=https://api.example.com

# Filter operations
export MCP_WHITELIST_OPERATIONS=getPet*,POST:/users/*

# Set API key
export API_KEY=your-api-key

# Set security scheme name
export SECURITY_SCHEME_NAME=ApiKeyAuth

# Add custom headers
export CUSTOM_HEADERS='{"X-Custom-Header":"custom-value"}'
export HEADER_X_API_Version=1.0.0

# Disable X-MCP header
export DISABLE_X_MCP=true
```

#### JSON Configuration File

Create a `config.json` file:

```json
{
  "spec": "./path/to/openapi-spec.json",
  "overlays": "./path/to/overlay1.json,https://example.com/api/overlay.json",
  "targetUrl": "https://api.example.com",
  "whitelist": "getPets,createPet,/pets/*",
  "blacklist": "deletePet,/admin/*",
  "apiKey": "your-api-key",
  "securitySchemeName": "ApiKeyAuth",
  "securityCredentials": {
    "ApiKeyAuth": "your-api-key",
    "OAuth2": "your-oauth-token"
  },
  "headers": {
    "X-Custom-Header": "custom-value",
    "User-Agent": "OpenAPI-MCP-Client/1.0"
  },
  "disableXMcp": false
}
```

### Integration with AI Assistants

#### Claude Desktop

1. Open Claude Desktop and navigate to Settings > Developer
2. Edit the configuration file:
   - macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - Windows: `%APPDATA%\Claude\claude_desktop_config.json`

3. Add this configuration:

```json
{
  "mcpServers": {
    "api-tools": {
      "command": "npx",
      "args": [
        "-y",
        "@tyktechnologies/api-to-mcp",
        "--spec",
        "https://petstore3.swagger.io/api/v3/openapi.json"
      ],
      "enabled": true
    }
  }
}
```

4. Restart Claude Desktop

#### Cursor

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
        "@tyktechnologies/api-to-mcp",
        "--spec",
        "./path/to/your/openapi.json"
      ],
      "name": "My API Tools"
    }
  ]
}
```

3. Restart Cursor or reload the window

#### Vercel AI SDK

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
    args: ['-y', '@tyktechnologies/api-to-mcp', '--spec', 'https://petstore3.swagger.io/api/v3/openapi.json'],
    env: {
      // You can set environment variables here
      // API_KEY: process.env.YOUR_API_KEY,
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
      prompt: 'List all available pets in the pet store using the API.',
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

## Development

### Setup

```bash
# Clone the repository
git clone https://github.com/TykTechnologies/api-to-mcp.git
cd api-to-mcp

# Install dependencies
npm install

# Build the project
npm run build

# Run in development mode with auto-reload
npm run dev
```

### Testing

```bash
# Run all tests
npm test

# Run integration tests only
npm run test:integration
```

## Customizing and Publishing Your Own Version

You can fork this repository to create your own customized version of the API to MCP tool:

1. Fork the repository
2. Add your OpenAPI specs to the `specs` directory
3. Configure default settings in `config.json`
4. Update `package.json` with your package name and details
5. Publish to npm:
   ```bash
   npm version 1.0.0
   npm publish
   ```

## License

MIT

## Support

For issues, feature requests, or questions, please open an issue on the [GitHub repository](https://github.com/TykTechnologies/api-to-mcp).