---
title: "Introduction to Tyk OAS"
date: 2022-07-06
tags: ["API", "OAS", "OpenAPI Specification", "Tyk OAS"]
description: "An introduction to Tyk OAS concepts"
aliases:
  - /getting-started/using-oas-definitions
  - /getting-started/using-oas-definitions/moving-to-oas
  - /getting-started/using-oas-definitions/get-started-oas
---

The [OpenAPI Specification (OAS)](https://www.openapis.org) is a ‘vendor neutral’ open standard specification for APIs supported by a large number of tools that will help you design and create APIs for your services. You can even generate OpenAPI descriptions from your source code. Tyk supports you to work with APIs that you've designed to the [OpenAPI Specification version 3.0.x](https://spec.openapis.org/oas/v3.0.3), making it even easier to get your API up and running.

Since one API Definition document now effectively describes all parts of your API flow a lot of the complexity of managing multiple documents and keeping them in sync goes away. This means that highly automated deployment patterns using CI/CD and GitOps just became a lot easier to implement.

## The right tool for the job

Tyk OAS support was designed to fit in with your existing workflows as seamlessly as possible, whether you have one of our paid offerings, or are using our free open-source Gateway. You should be able to do a huge amount in the editor of your choice. The Dashboard is of course there for you to use all the way through if you would like, or just to dip into if you want a bit of help with configuring a complex validation for example. 

An example of the sort of flow we envisage can be seen below. One of the great things about working with Tyk OAS is that you can have a single file that you deploy across your workflow. You then iterate on that one file until you are totally happy. At this point, you can publish the ‘public’ part of the API Definition to your developer portal (i.e. exactly what a Developer needs to use the API and nothing they don’t need to see like Tyk configuration details). You can also put the whole document into source control. Since you are using a single file for the whole flow, you can add in automation such as automatically trigger deploying an updated API when a new version is committed into your source control. This model is very popular in GitOps and CI/CD environments.

{{< img src="/img/oas/diagram_oas-flow-1.png" alt="Tyk workflow" >}}

The illustration below shows the same flow, highlighting that the API Definition includes the Tyk-specific information needed to configure Tyk Gateway, compared to when it is just the OpenAPI information describing your upstream service (required by an API Developer to create a service client).

{{< img src="/img/oas/diagram_oas-flow-2.png" alt="Tyk OAS API workflow" >}}

Moving to Tyk OAS can help you save time, reduce risks of error and streamline your workflows. Sounds great right? So should all of your HTTP APIs be OAS based now? 

**The answer is probably: yes!**

The key question is whether there is anything you currently use in your Tyk Classic APIs that isn’t yet supported by our Tyk OAS APIs. Whilst we have reached *feature maturity* for Tyk OAS, some Tyk Gateway features are not yet supported. You can see the status of what is and isn't yet supported [here]({{< ref "getting-started/using-oas-definitions/oas-reference" >}}).

{{< warning success >}}

Warning

In Tyk Gateway release 5.3.0, Tyk OAS APIs gained feature maturity. Tyk Dashboard will automatically migrate any pre-5.3.0 Tyk OAS APIs to the feature mature standard when you upgrade to 5.3.0 or later. Tyk OAS APIs prior to v5.3.0 must be manually migrated if you are using Tyk OSS Gateway. Feature mature Tyk OAS APIs may not work with pre-5.3.0 versions of Tyk Gateway.

It is not possible to rollback to previous versions of Tyk components with Tyk OAS APIs created in 5.3.0.

For further details, please refer to the [release notes]({{< ref "product-stack/tyk-gateway/release-notes/version-5.3.md" >}}) for Tyk Gateway v5.3.0.
{{< /warning >}}

## Getting started with Tyk OAS

There are several ways to work with Tyk and OpenAPI described services. Which you choose is very much a question of what fits best with your learning and working style.
<!-- video removed, as it refers to Tyk Cloud "free forever"
We have a video that introduces how to use OpenAPI described APIs with Tyk.

{{< youtube lFxvpCSK9iA >}}
-->

### Creating Tyk OAS APIs

You can [create Tyk OAS APIs]({{< ref "getting-started/using-oas-definitions/create-an-oas-api" >}}) using Tyk Gateway or Tyk Dashboard.

With the addition of OpenAPI support, we have added a new [API Designer]({{< ref "getting-started/using-oas-definitions/create-an-oas-api#tutorial-3-create-a-tyk-oas-api-using-the-tyk-dashboard-gui" >}}) in the Tyk Dashboard. This includes syntax highlighting in the raw editor as well as a more intuitive approach to adding middleware to your APIs.

{{< note success >}}
**Note**  

Even if you plan to use an editor most of the time, the Tyk Dashboard is a great way to try out functions. You can also export anything you create in the Dashboard as a file or copy it straight out of the raw editor and load that into your editor to speed up creating subsequent APIs.
{{< /note >}}

#### Using your own code editor to create Tyk OAS APIs

To enjoy writing a *Tyk OAS API definition* as if it is [a native programming language](https://tyk.io/blog/get-productive-with-the-tyk-intellisense-extension/), you can add the [Tyk OAS API definition schema](https://raw.githubusercontent.com/TykTechnologies/tyk-schemas/main/JSON/draft-04/schema_TykOasApiDef_3.0.x.json) to your favorite IDE or editor. We have published a Tyk VS Code extension that provides Tyk API schema validation and auto-completion (both OAS and other schemas) in the [VS Code marketplace](https://marketplace.visualstudio.com/items?itemName=TykTechnologiesLimited.tyk-schemas). You can use it to create Tyk objects in your IDE (Tyk API definitions, Key and Tyk config file).

#### Importing your OpenAPI description to Tyk

If you already have a standard [OpenAPI document]({{< ref "getting-started/using-oas-definitions/oas-glossary#openapi-document" >}}) for your API, you can very easily [import it into Tyk]({{< ref "getting-started/using-oas-definitions/import-an-oas-api" >}}) and have it running in seconds. During the import Tyk will generate the required Tyk extension based on the OpenAPI description in the OpenAPI document and optional parameters you set in the import command. It will also try to establish the right place to send requests to and update the ‘public’ part of the API Definition to tell users how to send requests to the API gateway. It is also possible to [automatically configure some Tyk middleware]({{< ref "api-management/manage-apis/tyk-oas-api-definition/tyk-oas-middleware" >}}) from the OpenAPI description, configuring how Tyk will handle requests to the API. An import takes in an *OpenAPI document* file and turns it into a *Tyk OAS API Definition*.

{{< note success >}}
**Note**  

There are two types of import: one that creates a Tyk Classic API Definition and one that creates a Tyk OAS API Definition. It is the latter that we are covering here.
{{< /note >}}

### Maintaining your APIs

Once a Tyk OAS API has been created in, or imported into, Tyk the Gateway will be able to manage and proxy traffic to the exposed endpoints as usual.

We provide a flexible way for you to [export a Tyk OAS API definition]({{< ref "getting-started/using-oas-definitions/export-an-oas-api" >}}) so that you can store it in source control for CI/CD or GitOps deployment patterns. You can also [export the OpenAPI description]({{< ref "getting-started/using-oas-definitions/export-an-oas-api#tutorial-2-export-just-the-openapi-document" >}}), with the Tyk extension removed, for example to upload to your Developer Portal. This is great because it strips out all the settings that your developers don’t need to know about.

Your OpenAPI description is a living document that describes your upstream service. When this is updated (for example, due to the addition of a new endpoint) instead of having to create a new Tyk OAS API to expose this, you can easily [update the OpenAPI]({{< ref "getting-started/using-oas-definitions/update-an-oas-api" >}}) part of your Tyk OAS API with the new OpenAPI document.

When you need to make breaking changes as your services and APIs evolve, it's easy to [use versioning with Tyk OAS APIs]({{< ref "/getting-started/using-oas-definitions/versioning-an-oas-api" >}}).

## Community Feedback
 
We have a dedicated [Tyk OAS Category](https://community.tyk.io/c/oas/21) in our [Community Forum](https://community.tyk.io/). Please feel free to start conversations in there and we will help you out.