---
title: "LLM Management"
date: 2025-04-25
tags: ["AI Studio", "AI Management", "LLM Management"]
description: "How to manage LLMs in Tyk AI Studio?"
keywords: ["AI Studio", "AI Management", "LLM Management"]
---

Tyk AI Studio provides a centralized system for managing Large Language Model (LLM) providers, models, associated costs, and usage budgets. This allows administrators to control which models are available, how they are used, and track associated expenses.

## Overview

The LLM Management system allows you to:

*   **Configure LLM Providers:** Connect to various LLM vendors (OpenAI, Anthropic, Azure OpenAI, Google Vertex AI, etc.).
*   **Manage Models:** Specify which models from a provider are available for use within Tyk AI Studio.
*   **Define Pricing:** Set input and output token costs for each model to enable accurate cost tracking.
*   **Set Budgets:** Establish monthly spending limits for LLM usage, either globally for a model or per Application.
*   **Control Access:** Determine which teams can access specific LLM configurations (via associated Apps).

## Configuring LLM Providers

Administrators can configure connections to different LLM providers through the UI or API.

1.  **Navigate:** Go to the LLM Configuration section in the Admin UI.
2.  **Add New LLM:** Click "Add LLM Configuration".
3.  **Provider Details:**
    *   **Name:** A user-friendly name for this configuration (e.g., "OpenAI GPT-4 Turbo").
    *   **Vendor:** Select the LLM vendor (e.g., `openai`, `anthropic`, `azure`, `vertex`).
    *   **API Key/Credentials:** Securely provide the necessary authentication credentials. Use the **Secrets Management** system (`$SECRET/YourSecretName`) for best practice.
    *   **Base URL (Optional):** Override the default API endpoint if needed (e.g., for Azure OpenAI).
    *   **API Version (Optional):** Specify the API version for certain providers like Azure.
    
    {{< img src="/img/ai-management/llm-provider-config.png" alt="LLM Provider Config" >}}

4.  **Model Selection:**
    *   **Allowed Models:** Specify the exact model names from the vendor that can be used via this configuration (e.g., `gpt-4-turbo`, `claude-3-opus-20240229`).
    *   **Default Model:** The model used if a request doesn't specify one.

5.  **Route ID:** A unique identifier used in API paths (e.g., `/proxy/{routeId}/...` or `/openai/{routeId}/...`) to target this specific LLM configuration.

6.  **Privacy Level:** Assign a privacy level to the LLM. This interacts with the Tool system, preventing tools with higher privacy levels from being used with LLMs having lower levels.

    Privacy levels define how data is protected by controlling LLM access based on its sensitivity:
    - Public – Safe to share (e.g., blogs, press releases).
    - Internal – Company-only info (e.g., reports, policies).
    - Confidential – Sensitive business data (e.g., financials, strategies).
    - Restricted (PII) – Personal data (e.g., names, emails, customer info).

7.  **Save:** Save the configuration.

## Model Pricing

To enable cost tracking in the Analytics system, you need to define the price per token for each model.

1.  **Navigate:** Go to the Model Prices section in the Admin UI.
2.  **Add Price:** Define prices for specific models.
    *   **Vendor:** Select the vendor.
    *   **Model Name:** Enter the exact model name.
    *   **Input Token Price:** Cost per input token (usually stored as integer * 10000 for precision).
    *   **Output Token Price:** Cost per output token (usually stored as integer * 10000 for precision).

    {{< img src="/img/ai-management/llm-model-price-config.png" alt="Model Price Config" >}}

3.  **Save:** Save the pricing information.

The Analytics system uses these prices along with token counts from LLM interactions (recorded by the Proxy and Chat systems) to calculate usage costs.

## Budget Control

Tyk AI Studio allows setting monthly spending limits to control AI costs.

*   **LLM Budget:** A global monthly budget can be set directly on an LLM configuration. This limits the total spending across *all* applications using that specific LLM configuration.
*   **Application Budget:** A monthly budget can be set on an Application (`Apps` section). This limits the spending *for that specific application*, potentially across multiple LLM configurations it might use.

**How it Works:**

1.  Budgets are checked *before* an LLM request is forwarded by the Proxy.
2.  The system calculates the current monthly spending for the relevant entity (LLM or App) based on data from the Analytics system.
3.  If the current spending plus the estimated cost of the *incoming* request (if calculable, otherwise based on past usage) exceeds the budget, the request is blocked (e.g., 429 Too Many Requests).
4.  The **Notification System** can be configured to send alerts when budget thresholds (e.g., 80%, 100%) are reached.

**Configuration:**

*   **LLM Budget:** Set the `MonthlyBudget` field when creating/editing an LLM configuration.
*   **App Budget:** Set the `MonthlyBudget` field when creating/editing an App configuration.

    {{< img src="/img/ai-management/llm-budget-config.png" alt="Budget Config" >}}

By combining LLM configuration, pricing, and budgeting, administrators gain granular control over AI model access and expenditure within Tyk AI Studio.
