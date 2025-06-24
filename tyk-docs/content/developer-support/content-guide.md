---
title: "Contributing to Tyk Docs"
description: "Guide to releasing Tyk documentation"
tags: ["Authentication", "Authorization", "Tyk Authentication", "Tyk Authorization", "Secure APIs", "client"]
---

## Introduction

Tyk documentation is built using [Mintlify](https://mintlify.com/), a platform that allows us to create, manage and publish our documentation. 
This page provides an overview and guidelines to contributing to Tyk documentation, including setting up dev environment locally, creating new content, and utilize Mintlify's UI objects.

Mintlify is using MDX file format. Check the [components section in Mintlify docs](https://mintlify.com/docs/text) for specific details.

## Prerequisites - applys to all flows and tasks

- You’ve set up the Tyk Docs local environment as described in the [Getting Started](#getting-started) section.
- You have a basic understanding of [Page Structure](https://mintlify.com/docs/pages) and [Navigation](https://mintlify.com/docs/navigation) in Mintlify.
- You’re familiar with Git and Markdown syntax.

## Common steps for every task
- Any update requires a PR
- Please label your PR with the versions you want it to be added to
- Please assign a reviewer that is also a stakeholder who can sign off the change

### Getting Started - Running Mintlify locally

This secion provides instructions for setting up your local environment to work with Tyk documentation using Mintlify.

1. **Install Mintlify CLI globally**:
   ```bash
   npm install -g mintlify
   ```
2. **Clone the Tyk Docs repository**:
   ```bash
   git clone main
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

### Creating a New Page

To add a new page to the Tyk documentation, follow the steps below.

1. **Switch to the `main` branch and pull the latest changes:**

   ```bash
   git checkout main
   git pull origin main
   ```

2. **Create a new branch:**

   ```bash
   git checkout -b <branch-name>
   ```

3. **Create the new page:**

   The content is organized into folders under the root directory, reflecting the website's navigation structure (tabs, groups, etc.). Choose the appropriate folder for your new page.

   * Create a new `.mdx` file for the page. For example, for a page titled “API Versioning,” you might create a file named `api-versioning.mdx`.
   * Add [front matter](https://mintlify.com/docs/pages#frontmatter) to the top of the file. This is a YAML block containing metadata like the title, description, and tags.

   **Example front matter:**

   ```mdx
   ---
   title: "API Versioning"
   description: "Create and manage multiple versions of an API"
   sidebarTitle: "API Versioning"
   tags: ['API versioning', 'version', 'Tyk Classic', 'Tyk OAS', 'API', 'versioning']
   ---
   ```

   * Write your content using Markdown. You can also use Mintlify UI components (e.g., accordions, callouts, code blocks) to improve readability and user experience.

4. **Update `docs.json`:**

   To make your new page appear in the navigation, update the `docs.json` file in the root directory.

   **Example**: Adding a new page under the *"API Management"* tab in the *"Overview"* group.

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

5. **Commit and push your changes:**

   ```bash
   git add -A
   git commit -m "Add new page: <page-name>"
   git push origin <branch-name>
   ```

6. **Create a pull request** on GitHub to merge your changes into `main`.

7. **Preview your changes** using the link provided by Mintlify before merging.

### Updating an Existing Page

To make changes to an existing page in the Tyk documentation, follow these steps:

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
   git commit -m "<short-description-of-change>"
   git push origin <branch-name>
   ```

6. **Create a pull request** on GitHub to merge your branch into `main`.

7. **Review the preview link** provided in the pull request to verify your changes before merging.

### Deleting a Page

To delete a page from the Tyk documentation, follow these steps:

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
   git commit -m "Delete page: <page-name> - <Explain briefly the reason>"
   git push origin <branch-name>
   ```

6. **Create a pull request** on GitHub to merge your branch into `main`.

7. **Review the preview link** provided by Mintlify to ensure your changes appear as expected before merging.

### Guide for UI features

Apart from the basic markdown writing, Tyk documentation also support UI components like accordions, callouts, cards, expandables, tabs etc. These components help in  enhance the documentation's usability and readability.

Here's a table summarizing the UI features available for Tyk documentation:

| Name | Description | Use Cases |
|------|-------------|------|
| [Code Blocks](https://mintlify.com/docs/code) | Display inline code and code blocks |  |
| [Accordions](https://mintlify.com/docs/components/accordions) | A dropdown component to toggle content visibility |  |
| [Callouts](https://mintlify.com/docs/components/callouts) | Use callouts to add eye-catching context to your content |  |
| [Cards](https://mintlify.com/docs/components/cards) | Highlight main points or links with customizable icons |  |
| [Expandables](https://mintlify.com/docs/components/expandables) | Toggle to display nested properties. |  |
| [Tabs](https://mintlify.com/docs/components/tabs) | Toggle content using the Tabs component |  |
| [Mermaid](https://mintlify.com/docs/components/mermaid-diagrams) | Display diagrams using Mermaid |  |
| [Steps](https://mintlify.com/docs/components/steps) | Sequence content using the Steps component |  |
| Snipptet | A custom component written by us. TODO |  |

Note: The above components is a list of mostly used components in Tyk documentation. To see the complete list of components, refer to the [Mintlify documentation](https://docs.mintlify.com/docs/components).

