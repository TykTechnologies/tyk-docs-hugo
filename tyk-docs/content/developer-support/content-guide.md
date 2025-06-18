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

## Creating New Page

Pre-requisites:
- TODO: Basic markdown Pages and Navigation is important for the Tyk documentation. This guide provides instructions on how to create and manage content effectively.

To create a new page in Tyk documentation, follow these steps:

1. Ensure you are on the main branch of the repository and have the latest changes:
   ```bash
   git checkout main
   git pull origin main
   ```
1. Create a branch from the `main` branch:
   ```bash
   git checkout -b <branch-name>
   ```
1. **Navigate to the appropriate section** in the `content` directory where you want to create the new page.


### Front Matter

For each new file created via `hugo new`, the following YAML formatted [Front Matter](http://gohugo.io/content-management/front-matter/) is added:

```markdown
---
title: "New Section"
date: 2024-07-31
tags: ["example-tag1", "example-tag2"]
description: "Enter a brief description of the section here."
---

**Insert Lead paragraph here.**
```

- `title` is taken from the name of the markdown file created
- `date` is auto populated in a year-month-day format
- `tags` are used to create meta keywords in the HTML output, and are added in the following format - `tags: ["tag 1", "tag 2", "tag 3"]`
- `description` is used for the meta description in the HTML output

Example front matter for a page:

```markdown
---
title: "Test"
date: 2021-02-10
tags: ["Tyk", "advanced-configuration", "Dashboard"]
description: "Testing the description and tagging functionality in Tyk"
---
```


## Updating Existing Page

## Deleting a Page
