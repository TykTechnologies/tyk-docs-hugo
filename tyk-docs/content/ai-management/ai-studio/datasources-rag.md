---
title: "Data Sources & RAG"
date: 2025-04-25
tags: ["AI Studio", "AI Management", "Datasources", "RAG"]
description: "How to integrate Data Sources & RAG in Tyk AI Studio?"
keywords: ["AI Studio", "AI Management", "Datasources", "RAG"]
---

Tyk AI Studio's Data Source system connects the platform to external knowledge bases, primarily vector stores, enabling **Retrieval-Augmented Generation (RAG)**. This allows Large Language Models (LLMs) to access and utilize specific information from your documents, grounding their responses in factual data.

## Purpose

The primary goal is to enhance LLM interactions by:

*   **Providing Context:** Injecting relevant information retrieved from configured data sources directly into the LLM prompt.
*   **Improving Accuracy:** Reducing hallucinations and grounding LLM responses in specific, verifiable data.
*   **Accessing Private Knowledge:** Allowing LLMs to leverage internal documentation, knowledge bases, or other proprietary information.

## Core Concepts

*   **Data Source:** A configuration in Tyk AI Studio that defines a connection to a specific knowledge base (typically a vector store) and the associated embedding service used to populate it.
*   **Vector Store Abstraction:** Tyk AI Studio provides a unified interface to interact with various vector database types (e.g., Pinecone, Milvus, ChromaDB). Administrators configure the connection details for their chosen store.
*   **Embedding Service:** Text needs to be converted into numerical vector embeddings before being stored and searched. Administrators configure the embedding service (e.g., OpenAI `text-embedding-ada-002`, a local Sentence Transformer model via an API endpoint) and its credentials (using [Secrets Management]({{< ref "ai-management/ai-studio/secrets" >}})).
*   **File Processing:** Administrators upload documents (e.g., PDF, TXT, DOCX) to a Data Source configuration. Tyk AI Studio automatically:
    *   Chunks the documents into smaller, manageable pieces.
    *   Uses the configured Embedding Service to convert each chunk into a vector embedding.
    *   Stores the text chunk and its corresponding embedding in the configured Vector Store.
*   **RAG (Retrieval-Augmented Generation):** The core process where:
    1.  A user's query in the [Chat Interface]({{< ref "ai-management/ai-studio/chat-interface" >}}) is embedded using the same embedding service.
    2.  This query embedding is used to search the relevant vector store(s) for the most similar text chunks (based on vector similarity).
    3.  The retrieved text chunks are added as context to the prompt sent to the LLM.
    4.  The LLM uses this context to generate a more informed and relevant response.
*   **Data Source Catalogues:** Similar to Tools, Data Sources are grouped into Catalogues for easier management and assignment to teams.
*   **Privacy Levels:** Each Data Source has a privacy level. It can only be used in RAG if its level is less than or equal to the privacy level of the [LLM Configuration]({{< ref "ai-management/ai-studio/llm-management" >}}) being used, ensuring data governance.

    Privacy levels define how data is protected by controlling LLM access based on its sensitivity:
    - Public – Safe to share (e.g., blogs, press releases).
    - Internal – Company-only info (e.g., reports, policies).
    - Confidential – Sensitive business data (e.g., financials, strategies).
    - Restricted (PII) – Personal data (e.g., names, emails, customer info).

## How RAG Works in the Chat Interface

When RAG is enabled for a Chat Experience:

1.  User sends a prompt.
2.  Tyk AI Studio embeds the user's prompt using the configured embedding service for the relevant Data Source(s).
3.  Tyk AI Studio searches the configured Vector Store(s) using the prompt embedding to find relevant text chunks.
4.  The retrieved chunks are formatted and added to the context window of the LLM prompt.
5.  The combined prompt (original query + retrieved context) is sent to the LLM.
6.  The LLM generates a response based on both the query and the provided context.
7.  The response is streamed back to the user.

## Creating & Managing Data Sources (Admin)

Administrators configure Data Sources via the UI or API:

1.  **Define Data Source:** Provide a name, description, and privacy level.
2.  **Configure Vector Store:**
    *   Select the database type (e.g., `pinecone`).
    *   Provide connection details (e.g., endpoint/connection string, namespace/index name).
    *   Reference a [Secret]({{< ref "ai-management/ai-studio/secrets" >}}) containing the API key/credentials.
3.  **Configure Embedding Service:**
    *   Select the vendor/type (e.g., `openai`, `local`).
    *   Specify the model name (if applicable).
    *   Provide the service URL (if applicable, for local models).
    *   Reference a [Secret]({{< ref "ai-management/ai-studio/secrets" >}}) containing the API key (if applicable).
4.  **Upload Files:** Upload documents to be chunked, embedded, and indexed into the vector store.

    {{< img src="/img/ai-management/data-sources-config.png" alt="Datasource Config" >}}

## Organizing & Assigning Data Sources (Admin)

*   **Create Catalogues:** Group related Data Sources into Catalogues (e.g., "Product Docs", "Support KB").
*   **Assign to Groups:** Assign Data Source Catalogues to specific Teams.

    {{< img src="/img/ai-management/data-sources-catalog-config.png" alt="Catalogue Config" >}}

## Using Data Sources (User)

Data Sources are primarily used implicitly via RAG within the [Chat Interface]({{< ref "ai-management/ai-studio/chat-interface" >}}).

A Data Source will be used for RAG if:

1.  The specific Chat Experience configuration includes the relevant Data Source Catalogue.
2.  The user belongs to a Team that has been assigned that Data Source Catalogue.
3.  The Data Source's privacy level is compatible with the LLM being used.

## Programmatic Access via API

Tyk AI Studio provides a direct API endpoint for querying configured Data Sources programmatically:

### Datasource API Endpoint

*   **Endpoint:** `/datasource/{dsSlug}` (where `{dsSlug}` is the datasource identifier)
*   **Method:** POST
*   **Authentication:** Bearer token required in the Authorization header

### Request Format

```json
{
  "query": "your semantic search query here",
  "n": 5  // optional, number of results to return (default: 3)
}
```

### Response Format

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

### Example Usage

#### cURL

```bash
curl -X POST "https://your-tyk-instance/datasource/product-docs" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"query": "How do I configure authentication?", "n": 3}'
```

#### Python

```python
import requests

url = "https://your-tyk-instance/datasource/product-docs"
headers = {
    "Authorization": "Bearer YOUR_TOKEN",
    "Content-Type": "application/json"
}
payload = {
    "query": "How do I configure authentication?",
    "n": 3
}

response = requests.post(url, json=payload, headers=headers)
results = response.json()

for doc in results["documents"]:
    print(f"Content: {doc['content']}")
    print(f"Source: {doc['metadata']['source']}")
    print("---")
```

#### JavaScript

```javascript
async function queryDatasource() {
  const response = await fetch('https://your-tyk-instance/datasource/product-docs', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_TOKEN',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: 'How do I configure authentication?',
      n: 3
    })
  });
  
  const data = await response.json();
  
  data.documents.forEach(doc => {
    console.log(`Content: ${doc.content}`);
    console.log(`Source: ${doc.metadata.source}`);
    console.log('---');
  });
}
```

### Common Issues and Troubleshooting

1. **Trailing Slash Error:** The endpoint does not accept a trailing slash. Use `/datasource/{dsSlug}` and not `/datasource/{dsSlug}/`.

2. **Authentication Errors:** Ensure your Bearer token is valid and has not expired. The token must have permissions to access the specified datasource.

3. **404 Not Found:** Verify that the datasource slug is correct and that the datasource exists and is properly configured.

4. **403 Forbidden:** Check that your user account has been granted access to the datasource catalogue containing this datasource.

5. **Empty Results:** If you receive an empty documents array, try:
   - Reformulating your query to better match the content
   - Increasing the value of `n` to get more results
   - Verifying that the datasource has been properly populated with documents

This API endpoint allows developers to build custom applications that leverage the semantic search capabilities of configured vector stores without needing to implement the full RAG pipeline.
