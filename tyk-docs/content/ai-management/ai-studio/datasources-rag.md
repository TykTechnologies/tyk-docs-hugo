---
title: "Data Sources & RAG"
weight: 25
# bookFlatSection: false
# bookToc: true
# bookHidden: false
# bookCollapseSection: false
# bookComments: false
# bookSearchExclude: false
---

# Data Sources & RAG

Tyk AI Studio's Data Source system connects the platform to external knowledge bases, primarily vector stores, enabling **Retrieval-Augmented Generation (RAG)**. This allows Large Language Models (LLMs) to access and utilize specific information from your documents, grounding their responses in factual data.

## Purpose

The primary goal is to enhance LLM interactions by:

*   **Providing Context:** Injecting relevant information retrieved from configured data sources directly into the LLM prompt.
*   **Improving Accuracy:** Reducing hallucinations and grounding LLM responses in specific, verifiable data.
*   **Accessing Private Knowledge:** Allowing LLMs to leverage internal documentation, knowledge bases, or other proprietary information.

## Core Concepts

*   **Data Source:** A configuration in Tyk AI Studio that defines a connection to a specific knowledge base (typically a vector store) and the associated embedding service used to populate it.
*   **Vector Store Abstraction:** Tyk AI Studio provides a unified interface to interact with various vector database types (e.g., Pinecone, Milvus, ChromaDB). Administrators configure the connection details for their chosen store.
*   **Embedding Service:** Text needs to be converted into numerical vector embeddings before being stored and searched. Administrators configure the embedding service (e.g., OpenAI `text-embedding-ada-002`, a local Sentence Transformer model via an API endpoint) and its credentials (using [Secrets Management](./secrets.md)).
*   **File Processing:** Administrators upload documents (e.g., PDF, TXT, DOCX) to a Data Source configuration. Tyk AI Studio automatically:
    *   Chunks the documents into smaller, manageable pieces.
    *   Uses the configured Embedding Service to convert each chunk into a vector embedding.
    *   Stores the text chunk and its corresponding embedding in the configured Vector Store.
*   **RAG (Retrieval-Augmented Generation):** The core process where:
    1.  A user's query in the [Chat Interface](./chat-interface.md) is embedded using the same embedding service.
    2.  This query embedding is used to search the relevant vector store(s) for the most similar text chunks (based on vector similarity).
    3.  The retrieved text chunks are added as context to the prompt sent to the LLM.
    4.  The LLM uses this context to generate a more informed and relevant response.
*   **Data Source Catalogues:** Similar to Tools, Data Sources are grouped into Catalogues for easier management and assignment to user groups.
*   **Privacy Levels:** Each Data Source has a privacy level. It can only be used in RAG if its level is less than or equal to the privacy level of the [LLM Configuration](./llm-management.md) being used, ensuring data governance.

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
    *   Reference a [Secret](./secrets.md) containing the API key/credentials.
3.  **Configure Embedding Service:**
    *   Select the vendor/type (e.g., `openai`, `local`).
    *   Specify the model name (if applicable).
    *   Provide the service URL (if applicable, for local models).
    *   Reference a [Secret](./secrets.md) containing the API key (if applicable).
4.  **Upload Files:** Upload documents to be chunked, embedded, and indexed into the vector store.

    ![Placeholder: Datasource Config](https://placehold.co/600x400?text=DataSource+Config)

## Organizing & Assigning Data Sources (Admin)

*   **Create Catalogues:** Group related Data Sources into Catalogues (e.g., "Product Docs", "Support KB").
*   **Assign to Groups:** Assign Data Source Catalogues to specific [User Groups](./user-management.md).

    ![Placeholder: Catalogue Config](https://placehold.co/600x400?text=DataSource+Catalogue+Config)

## Using Data Sources (User)

Data Sources are primarily used implicitly via RAG within the [Chat Interface](./chat-interface.md).

A Data Source will be used for RAG if:

1.  The specific Chat Experience configuration includes the relevant Data Source Catalogue.
2.  The user belongs to a Group that has been assigned that Data Source Catalogue.
3.  The Data Source's privacy level is compatible with the LLM being used.

APIs may also exist for directly querying configured Data Sources programmatically.
