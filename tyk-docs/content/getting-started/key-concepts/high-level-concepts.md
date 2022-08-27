---
title: "OpenAPI High Level Concepts"
date: 2022-07-06
tags: ["API", "OAS", "OpenAPI Specification"]
description: "The high level concepts around OpenAPI Specification support in Tyk"
menu:
  main:
    parent: "OpenAPI Specification"
weight: 1
---

{{< toc >}}

### Introduction

OAS is a ‘vendor neutral’ specification for APIs. The great thing about this is that it means there are already a large number of tools that will help you design and create APIs in OAS, or even generate them from your source code. Tyk supports defining APIs in OAS, making it even easier to get your API up and running. 

Since one API Definition document now effectively describes all parts of your API flow a lot of the complexity of managing multiple documents and keeping them in sync goes away. This means that highly automated deployment patterns using CI/CD and GitOps just became a lot easier to implement.

### What does a Tyk OAS API Definition look like?

As part of a Tyk OAS Definition, there are a number of vendor specific fields that need to be configured. These fall into these categories:

- Info - information about your New API; its name and whether it should be active for example
- Upstream - where should Tyk forward requests to?
- Server - what URL should users be using to call the API served by the Tyk Gateway.

You can also optionally define:

- Middleware - add additional logic to your API flow, for example allow/block lists or request/response validation.

You can find more details about each of these in the [OAS reference section]({{< ref "/content/getting-started/using-oas-definitions/oas-reference.md#endpoint-designer" >}}).

### Getting Started with OAS APIs in Tyk

There are several ways to work with OAS APIs in Tyk. Which you choose is very much a question of what fits best with your learning and working style:

- Dashboard - with the addition of OAS support, we have added a New API designer. This includes syntax highlighting in the raw editor as well as a more intuitive approach to adding middleware to your APIs.

{{< note success >}}
**Note**  

Even if you plan to use an editor most of the time, the Dashboard is a great way to try out functions. You can also export anything you create in the Dashboard as a file or copy it straight out of the raw editor and load that into your editor to speed up creating subsequent APIs.
{{< /note >}}

- **In your editor** - You can create an API in your favourite editor using the Tyk schema, which can be downloaded from [GitHub](https://github.com/TykTechnologies/tyk-schemas/blob/main/JSON/draft-04/schema_apidefoas.json) or directly from your Tyk system.  An example of this in VSCode can be found here <link to task to Create API in VScode>.
- **Import** - if you already have an OAS API Definition without any of the Tyk fields, you can very easily [import it into Tyk]({{< ref "/content/getting-started/using-oas-definitions/import-an-oas-api.md" >}}) and have it running in seconds. As part of the import Tyk will generate the required Tyk fields based on the spec and parameter you set in the import command. It will also try to establish the right place to send requests to and update the ‘public’ part of the API Definition to tell users how to send requests to the API gateway. It is also possible to specify how Tyk behaves explicitly as part of the import. An import takes an OAS API Definition in and turns it into a Tyk OAS API Definition.

{{< note success >}}
**Note**  

There are two types of import; one that creates a classic Tyk API Definition and one that creates a Tyk OAS API Definition. It is the one that creates a Tyk OAS API Definition type that we are covering here. This is currently only possible via the Tyk Gateway and Dashboard APIs. In the future it will also be possible via the Dashboard UI itself.
{{< /note >}}

- **Export** - this is a nice easy way to get access to the Tyk OAS API Definition for your API. You can then store this in source control for CI/CD or GitOps deployment patterns. By setting the mode to be ‘public’ you can also get an OAS API Definition, with the Tyk fields removed, for upload to your Developer Portal for example. This is great because it strips out all the settings that your developers don’t need to know about automatically.

Ready to give OAS a try? See our [create an API]({{< ref "/content/getting-started/using-oas-definitions/create-an-oas-api.md" >}}) tutorial.

### The right tool for the job

Tyk OAS support was designed to fit in with your existing workflows as seamlessly as possible, whether you have one of our paid offerings, or are using our free open-source Gateway. You should be able to do a huge amount in the editor of your choice. The Dashboard is of course there for you to use all the way through if you would like, or just to dip into if you want a bit of help with configuring a complex validation for example. 

An example of the sort of flow we envisage can be seen below. One of the great things about working in OAS is that you can have a single file that you deploy across your workflow. You then iterate on that one file until you are totally happy. At this point, you can publish the ‘public’ part of the API Definition to your developer portal (i.e. exactly what a Developer needs to use the API and nothing they don’t need to see like Tyk configuration details). You can also put the whole document into source control. Since you are using a single file for the whole flow, you can add in automation to do things trigger deploying an updated API as automatically when a new version is committed into your source control. This model is very popular in GitOps and CI/CD environments.

{{< img src="/img/oas/diagram_oas-flow-1.png" alt="Tyk workflow" >}}

The picture below shows the same flow, making it clear when the API Definition includes the ‘Tyk OAS’ information needed to configure the API on Tyk vs when it is just the OAS API information that an API Developer would need.

{{< img src="/img/oas/diagram_oas-flow-2.png" alt="Tyk OAS API workflow" >}}
