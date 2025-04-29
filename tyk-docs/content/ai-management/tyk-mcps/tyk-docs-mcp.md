---
title: Tyk Docs MCP
date: 2025-04-28
tags: ["AI MCP", "Tyk Docs", "Documentation Search"]
description: "Use the Tyk Docs MCP to enable AI assistants to search and retrieve information from Tyk documentation."
---

# Tyk Docs MCP

## What you'll learn in this section

This section explains how to use the Tyk Docs MCP to enable AI assistants to search and use Tyk's documentation. By the end, you'll understand how to set up a documentation search capability that helps AI systems provide accurate answers about Tyk products and features.

## Introduction

The Tyk Docs MCP is a specialised Model Context Protocol server that enables AI assistants to search, retrieve, and understand content from Tyk's documentation. This integration allows AI systems to provide accurate, contextual answers about Tyk products, features, and best practices directly from the official documentation.

By connecting AI assistants to Tyk's documentation through MCP, developers and operators can quickly get accurate answers to their questions without manually searching through pages of documentation.

![Tyk Docs MCP Concept](/docs/img/ai-management/docs-mcp-concept.png)

## Key features

- **Semantic search**: Find relevant documentation based on meaning, not just keywords
- **Context-aware retrieval**: Get complete sections with surrounding context for better understanding
- **Versioned documentation**: Access information specific to your Tyk version
- **Product filtering**: Focus searches on specific Tyk products or features
- **Metadata support**: Filter by document types, categories, and tags
- **Snippet generation**: Extract concise answers from longer documentation
- **Code examples**: Find relevant code samples and implementation examples
- **Regular updates**: Automatically synchronised with the latest Tyk documentation

## How it works

The Tyk Docs MCP server:

1. Indexes all Tyk documentation using advanced semantic search technology
2. Exposes search capabilities as MCP tools that AI assistants can use
3. When queried, retrieves the most relevant documentation sections
4. Returns rich context that AI can use to formulate accurate answers
5. Maintains all links and references to the original documentation

This approach ensures that AI responses are both accurate and traceable back to official documentation.

## Use cases

### Technical support

Enable AI assistants to provide first-line support by answering questions based on official documentation.

```
"How do I configure rate limiting on a Tyk Gateway API?"
```

### Implementation guidance

Get step-by-step instructions and best practices for implementing Tyk features.

```
"What's the recommended approach for setting up mutual TLS with Tyk Gateway?"
```

### Troubleshooting

Diagnose and resolve issues by accessing relevant troubleshooting guides.

```
"I'm getting 'Auth field missing' errors from my API. How do I fix this?"
```

### API reference

Quickly retrieve detailed API reference information.

```
"What parameters are available for the /apis endpoint in the Dashboard API?"
```

### Discovery

Explore Tyk capabilities and features you might not be aware of.

```
"What analytics capabilities does Tyk offer for API traffic?"
```

## Setup and configuration

### Prerequisites

- Node.js 18 or higher
- Internet access to reach the Tyk documentation index

### Installation

```bash
# NPM installation
npm install -g @tyk-technologies/docs-mcp

# Or using npx (no installation required)
npx @tyk-technologies/docs-mcp --help
```

### Basic configuration

Create a configuration file named `docs-mcp-config.json`:

```json
{
  "defaultVersion": "latest",
  "maxResults": 5,
  "contextSize": "medium",
  "includeLinks": true,
  "snippetLength": 200,
  "products": ["gateway", "dashboard", "mdcb", "pump", "identity-broker"],
  "logging": {
    "level": "info",
    "file": "./logs/docs-mcp.log"
  },
  "cache": {
    "enabled": true,
    "ttl": 3600,
    "maxSize": 100
  },
  "rateLimit": {
    "requestsPerMinute": 60
  }
}
```

### Running the server

```bash
# Using the configuration file
docs-mcp --config=./docs-mcp-config.json

# Or using environment variables
export DOCS_DEFAULT_VERSION="latest"
export DOCS_MAX_RESULTS=5
docs-mcp
```

### Environment variables

All configuration options can be set using environment variables:

| Environment Variable | Description |
| --- | --- |
| `DOCS_DEFAULT_VERSION` | Default documentation version (e.g., "latest", "4.0", "3.0") |
| `DOCS_MAX_RESULTS` | Maximum number of results to return per query |
| `DOCS_CONTEXT_SIZE` | Amount of context to include ("small", "medium", "large") |
| `DOCS_INCLUDE_LINKS` | Include links to original documentation (true/false) |
| `DOCS_SNIPPET_LENGTH` | Maximum length of generated answer snippets |
| `DOCS_PRODUCTS` | Comma-separated list of products to include |
| `DOCS_LOG_LEVEL` | Logging level (debug, info, warn, error) |
| `DOCS_LOG_FILE` | Path to log file |
| `DOCS_CACHE_ENABLED` | Enable result caching (true/false) |
| `DOCS_CACHE_TTL` | Cache time-to-live in seconds |
| `DOCS_RATE_LIMIT_RPM` | Rate limit in requests per minute |

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
    "tyk-docs": {
      "command": "npx",
      "args": [
        "-y",
        "@tyk-technologies/docs-mcp",
        "--config=./docs-mcp-config.json"
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
        "@tyk-technologies/docs-mcp",
        "--config=./docs-mcp-config.json"
      ],
      "name": "Tyk Documentation"
    }
  ]
}
```

3. Restart Cursor or reload the window

### [Cline VSCode Extension](https://marketplace.visualstudio.com/items?itemName=anthropic.anthropic-vscode)

1. Open VSCode and navigate to Settings (File > Preferences > Settings)
2. Search for "Cline" settings
3. Find the "MCP Servers" setting and click on "Edit in settings.json"
4. Add the Tyk Docs MCP server configuration:

```json
"tyk-docs-mcp": {
  "command": "npx",
  "args": [
    "-y",
    "@tyk-technologies/docs-mcp@latest"
  ],
  "enabled": true
}
```

5. Save the settings file and restart VSCode

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
    args: ['-y', '@tyk-technologies/docs-mcp'],
    env: {
      DOCS_DEFAULT_VERSION: 'latest',
      DOCS_MAX_RESULTS: '5'
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
      prompt: 'Explain how to set up JWT authentication in Tyk Gateway.',
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

## Available tools

The Tyk Docs MCP provides several tools for AI assistants to use:

### search_docs

Search the Tyk documentation using natural language queries.

Parameters:
- `query` (required): The search query
- `version` (optional): Documentation version (defaults to configuration setting)
- `products` (optional): Array of products to search in
- `max_results` (optional): Maximum number of results to return
- `include_context` (optional): Whether to include surrounding context

### get_topic

Retrieve a specific documentation topic by path or ID.

Parameters:
- `topic_id` (required): The ID or path of the documentation topic
- `version` (optional): Documentation version (defaults to configuration setting)
- `include_subtopics` (optional): Whether to include child topics

### suggest_topics

Get topic suggestions based on user behaviour and query patterns.

Parameters:
- `query` (required): The initial query
- `user_context` (optional): Additional context about the user's needs
- `max_suggestions` (optional): Maximum number of suggestions to return

### find_code_examples

Search specifically for code examples in the documentation.

Parameters:
- `query` (required): What the code example should demonstrate
- `language` (optional): Programming language (e.g., "javascript", "python", "curl")
- `max_examples` (optional): Maximum number of examples to return

## Advanced features

### Custom search indices

Organisations can create custom documentation indices that include both Tyk official documentation and their own internal documentation:

```json
{
  "customIndices": [
    {
      "name": "internal",
      "path": "./internal-docs/",
      "weight": 1.2
    },
    {
      "name": "examples",
      "path": "./implementation-examples/",
      "weight": 1.0
    }
  ]
}
```

### Answer generation

Enable the Docs MCP to generate concise answers from documentation context:

```json
{
  "answerGeneration": {
    "enabled": true,
    "model": "local",
    "maxTokens": 200,
    "temperature": 0.3
  }
}
```

### Integrating with Tyk AI Studio

The Docs MCP server can be integrated with Tyk AI Studio to provide a comprehensive AI management solution:

1. Deploy the Docs MCP server
2. Register it with Tyk AI Studio
3. Configure access controls and permissions
4. Create AI assistants that can access documentation

This integration allows you to leverage both the knowledge from documentation and the governance features of Tyk AI Studio.

## Best practices

### Effective documentation queries

- **Be specific**: Include product names, feature names, and versions
- **Use technical terms**: Use Tyk-specific terminology for better results
- **Ask complete questions**: Provide context in your questions
- **Specify format**: Indicate if you want code examples, configuration samples, etc.

### Deployment recommendations

- Set appropriate rate limits to prevent abuse
- Enable caching for frequently accessed documentation
- Configure logging for monitoring and troubleshooting
- Regularly update to the latest version for the most current documentation

## Security considerations

When deploying the Docs MCP server, consider these security best practices:

1. **Network security**: Deploy the MCP server in a secure network environment
2. **Access control**: Restrict access to the MCP server to authorised users and systems
3. **Rate limiting**: Configure appropriate rate limits to prevent abuse
4. **Logging**: Enable comprehensive logging of queries and actions
5. **Information filtering**: Configure the tool to avoid exposing sensitive information
6. **Regular updates**: Keep the Docs MCP tool updated to the latest version

## Conclusion

The Tyk Docs MCP server transforms how users interact with Tyk documentation by enabling AI assistants to search, retrieve, and understand official documentation content. This integration helps users quickly find accurate information about Tyk products, features, and best practices without manually searching through documentation.

As part of Tyk's broader AI management strategy, the Docs MCP demonstrates how standardised protocols like MCP can enhance knowledge access and support within organisations, making technical information more accessible and actionable through AI assistance.

## Support and resources

- [GitHub Repository](https://github.com/TykTechnologies/docs-mcp)
- [Tyk Documentation](https://tyk.io/docs/)
- [Tyk AI Management](https://tyk.io/docs/ai-management/)
- [Request Support](https://tyk.io/contact/)
