---
title: "Contributing to Tyk Docs"
description: "Guide to releasing Tyk documentation"
tags: ["Authentication", "Authorization", "Tyk Authentication", "Tyk Authorization", "Secure APIs", "client"]
---

## Introduction

Tyk documentation is built using [Mintlify](https://mintlify.com/), a tool that allows us to create and manage documentation. This page provides an overview of how to contribute to Tyk documentation, including how to set up your local environment, create new content, and utilize Mintlify's features.

## Getting Started

This secion provides instructions for setting up your local environment to work with Tyk documentation using Mintlify.

1. **Install Mintlify CLI globally**:
   ```bash
   npm install -g mintlify
   ```
2. **Clone the Tyk Docs repository**:
   ```bash
   git clone <TODO>
   ```
3. **Navigate to the Tyk Docs directory**:
   ```bash
   cd tyk-docs
   ```
4. **Start the Mintlify development server**:
   ```bash
   mintlify dev
   ```
5. Open your browser and go to `http://localhost:3000` to view the documentation.

## Guide for UI features

Apart from the basic markdown writing, Tyk documentation also support UI components like accordions, callouts, cards, expandables, tabs etc. These components help in  enhance the documentation's usability and readability.

Here's a table summarizing the UI features available for Tyk documentation:

| Name | Description | Use Cases |
|------|-------------|------|
| Code Blocks | Documentation for Tyk |  |
| Accordions | Documentation for Tyk |  |
| Callouts | Documentation for Tyk |  |
| Cards | Documentation for Tyk |  |
| Expandables | Documentation for Tyk |  |
| Tabs | Documentation for Tyk |  |
| Mermaid | Documentation for Tyk |  |
| Steps | Documentation for Tyk |  |
| Snippter | A custom component written by us. TODO |  |

Note: The above components is a list of mostly used components in Tyk documentation. To see the complete list of components, refer to the [Mintlify documentation](https://docs.mintlify.com/docs/components).

---

## Creating a New Page

To create a new page in Tyk documentation, follow these steps:

### Pre-requisites

- You’ve set up the Tyk Docs local environment as described in the [Getting Started](#getting-started) section.
- You have a basic understanding of [Page Structure](https://mintlify.com/docs/pages) and [Navigation](https://mintlify.com/docs/navigation) in Mintlify.
- You’re familiar with Git and Markdown syntax.

### Instructions

1. Ensure you are on the `main` branch and have the latest changes:
   ```bash
   git checkout main
   git pull origin main
   ```

2. Create a new branch from `main`:
   ```bash
   git checkout -b <branch-name>
   ```

3. Creating a new page:

   The docs repository stores all the content in the `root` directory across multiple folders. The folder structure is organized according to the website's navigation (tabs, groups, etc.), so choose the folder that best fits your new page.

   Add the new page as a markdown file with the `.mdx` extension. For example, if you are creating a new page called “API Versioning", create a file named `api-versioning.mdx`.

   Add the front matter to the top of the markdown file. The front matter is a YAML block that contains metadata about the page, such as title, date, tags, and description. 
   
   Example front matter for a page:

   ```markdown
   ---
   title: "API Versioning"
   description: "Create and manage multiple versions of an API"
   sidebarTitle: "API Versioning"
   tags: ['API versioning', 'version', 'Tyk Classic', 'Tyk OAS', 'API', 'versioning']
   ---
   ```

   Add your content below the front matter using Markdown syntax. To enhance the documentation, you can use Mintlify's UI components, such as accordions, callouts, and code blocks.

4. Update docs.json
   
   To ensure your new page is included in the documentation navigation, you need to update the `docs.json` file located in the root directory. This file defines the structure of the documentation navigation.

   The below example show how to add a new page under the "API Management" tab in the "Overview" group:
   ```json
    {
      ...
      "navigation": {
        "tabs": [
          {
            "tab": "API Management",
            "groups": [
              {
                "group": "Overview",
                "pages": [
                  "tyk-overview",
                  "tyk-components",
                  "apim",
                  "api-versioning"  // New page added here
                ]
              }
            ]
          }
        ]
      }
      ...
    }
   ```
5. Push your changes to the remote repository:
   ```bash
   git add -A
   git commit -m "Add new page: <page-name>"
   git push origin <branch-name>
   ```
6. Create a pull request on GitHub to merge your changes into the `main` branch.
7. Check out the preview link provided by Mintlify to review your changes before merging.

## Updating an Existing Page

To make changes to an existing page in the Tyk documentation, follow these steps:

### Prerequisites

- You’ve set up the Tyk Docs local environment as described in the [Getting Started](#getting-started) section.
- You have a basic understanding of [Page Structure](https://mintlify.com/docs/pages) and [Navigation](https://mintlify.com/docs/navigation) in Mintlify.
- You’re familiar with Git and Markdown syntax.

### Instructions

1. **Switch to the `main` branch and pull the latest changes:**

   ```bash
   git checkout main
   git pull origin main
   ```

2. **Create a new branch:**

   ```bash
   git checkout -b <branch-name>
   ```

3. **Locate and edit the page:**

   * Navigate to the appropriate folder in the repository where the `.mdx` file for the page is located.
   * Open the file and make your changes using Markdown syntax. You can enhance content using Mintlify UI components like callouts, accordions, tabs, and code blocks.
   * If needed, update the front matter (e.g., `title`, `description`, `tags`) at the top of the file.

4. **Preview your changes locally** to ensure formatting and layout appear as expected.

   ```bash
   mintlify dev
   ```

5. **Commit and push your changes:**

   ```bash
   git add .
   git commit -m "Update page: <page-name> – <short-description-of-change>"
   git push origin <branch-name>
   ```

6. **Create a pull request** on GitHub to merge your branch into `main`.

7. **Review the preview link** provided in the pull request to verify your changes before merging.

## Deleting a Page

To delete a page from the Tyk documentation, follow these steps:

### Pre-requisites

- You’ve set up the Tyk Docs local environment as described in the [Getting Started](#getting-started) section.
- You have a basic understanding of [Page Structure](https://mintlify.com/docs/pages) and [Navigation](https://mintlify.com/docs/navigation) in Mintlify.
- You’re familiar with Git and Markdown syntax.

### Instructions

1. **Switch to the `main` branch and pull the latest changes:**

   ```bash
   git checkout main
   git pull origin main
   ```

2. **Create a new branch from `main`:**

   ```bash
   git checkout -b <branch-name>
   ```

3. **Delete the relevant Markdown file** corresponding to the page you want to remove.

4. **Update `docs.json`:**

   * Remove the entry for the deleted page from the `navigation` section.
   * Add a redirect in the `redirect` section to point users to a relevant page. This prevents 404 errors when the deleted page is accessed.

5. **Commit and push your changes:**

   ```bash
   git add .
   git commit -m "Delete page: <page-name>"
   git push origin <branch-name>
   ```

6. **Create a pull request** on GitHub to merge your branch into `main`.

7. **Review the preview link** provided by Mintlify to ensure your changes appear as expected before merging.
