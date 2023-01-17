---
title: "Manage Get started guides"
date: 2022-02-08
tags: ["Tyk Developer Portal","Enterprise Portal"]
description: "How to manage the Get started guides with the Enterprise Developer portal"
menu:
  main:
    parent: "Getting Started With Enterprise Portal"
weight: 4
---

{{< note success >}}
**Tyk Enterprise Developer Portal**

If you are interested in getting access contact us at [support@tyk.io](<mailto:support@tyk.io?subject=Tyk Enterprise Portal Beta>)

{{< /note >}}

## Introduction and motivation

As an API Provider, you can package APIs into API Products and supply them with documentation to deliver value to your internal and external API Consumers.<br/>
API documentation is essential for API Products. Good API documentation goes beyond just Open API Specification. To make your API Products easy to use and engaging, you can add technical and business guides to the documentation of your API Products, for instance:
* Get started guides explaining how to start with your API Product;
* Use-cases;
* Business documentation that explains the business value and helps to convince decision-makers.

<br/>

Tyk Enterprise Developer portal provides two ways of documenting APIs:
* Open API Specifications for APIs;
* The Get started documentation feature enables API Providers to add technical and business guides to API Products.

<br/>
This guide explains how to add the Get started documentation to API Products.


## Step 1: Create and publish an API Product

To start with, create and publish an API Product. Please refer to the 'Publish API Products and Plans'({{< ref "/content/tyk-stack/tyk-developer-portal/enterprise-developer-portal/getting-started-with-enterprise-portal/publish-api-products-and-plans.md" >}}) page for further guidance.

## Step 2: Add API Documentation to API Products

To add API Documentation, select an API Product and navigate to the API Documentation section.
Click the ‘Add API Documentation’ button to add a new API Documentation page.
{{< img src="img/dashboard/portal-management/enterprise-portal/api-docs-navigate-to-the-api-docs-section.png" alt="Navigate to the API Documentation section" >}}

<br/>
Tyk developer portal stores two versions of each API Documentation page: in Markdown and HTML formats.
You can edit both versions, but only one version of the page will be displayed.
To edit the Markdown version, click on the ‘Change to Markdown’ button.
{{< img src="img/dashboard/portal-management/enterprise-portal/api-documentation-page-change-to-md.png" alt="Toggle the Markdown editor" >}}

<br/>
To edit the HTML version, click the 'Change to HTML' button.
{{< img src="img/dashboard/portal-management/enterprise-portal/api-documentation-page-change-to-html.png" alt="Toggle the HTML editor" >}}

<br/>
To select which version of the documentation to display, check the ‘Display Markdown’ checkbox.
When it’s checked, the portal will display the Markdown version of the page.
Otherwise, portal will display the HTML version.
{{< img src="img/dashboard/portal-management/enterprise-portal/api-documentation-page-display-md-version.png" alt="Display the MD version of the page" >}}


## Step 3: Add more documentation pages and set the display order

With the Tyk developer portal, you can add multiple Markdown and HTML pages to your API Products and select their display order to form a table of contents suitable for your use case.
Please refer to the previous step to add one more documentation page to the API Product.
<br/>
To reorder API Documentation items, scroll down to the API Documentation section and click on the ‘Reorder items’ button.
{{< img src="img/dashboard/portal-management/enterprise-portal/api-documentation-page-start-reordering-docs.png" alt="Reorder API Docs" >}}

<br/>
Then click on the ‘Move up’ button to move an API Documentation item one position up, and the ‘Move down’ button to bring it one position down. Click on the 'Done' button and then on the 'Save' button to save your changes.
{{< img src="img/dashboard/portal-management/enterprise-portal/api-documentation-page-move-doc-up.png" alt="Reorder API Docs" >}}

<br/>
Once you save the changes, the new order of items will be reflected in the ‘Get started’ tab.
{{< img src="img/dashboard/portal-management/enterprise-portal/api-documentation-page-get-started-live.png" alt="Reorder API Docs" >}}

<br/>
All documentation pages are listed in the ‘Product docs’ section. You can access and edit the API docs from that section.
{{< img src="img/dashboard/portal-management/enterprise-portal/product-docs-section.png" alt="Product docs section" >}}

## Step 4: Add tags to blogs and API Products

Finally, you can add blog posts to your API Products using the Tags feature.
You can specify tags for API Product and blog posts, then the blog posts that match tags with an API Product will be displayed in the ‘Related blog content’ section.
{{< img src="img/dashboard/portal-management/enterprise-portal/tags-diagram.png" alt="Tags diagram" >}}

<br/>
To specify tags for an API Product, select an API Product, scroll down to the ‘Tags’ section, type in a tag, and press the Enter key.
{{< img src="img/dashboard/portal-management/enterprise-portal/tags-section-in-api-product.png" alt="Specify tags for an API Product" >}}

<br/>
To specify tags for a blog post, select a blog post, scroll down to the ‘Tags’ section, type in a tag, and press the Enter key.
{{< img src="img/dashboard/portal-management/enterprise-portal/tags-section-in-blog-post.png" alt="Specify tags for a blog post" >}}

<br/>
The blog posts that match tags with an API Product will be displayed in the ‘Related blog content’ section of the respective API Product page.
{{< img src="img/dashboard/portal-management/enterprise-portal/related-blog-content.png" alt="Related blog content" >}}
