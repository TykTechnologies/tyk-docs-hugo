---
title: "GraphQL Shared Types"
date: 2022-09-29
tags: [""]
description: ""
menu:
  main:
    parent: "GraphQL Federation Overview"
weight: 2
---

**Insert Lead paragraph here.**

### Creating a subgraph via the Dasboard UI

1. Log in to the Dashboard and go to APIs > Add New API > Federation > Subgraph.

{{< img src="/img/dashboard/graphql/add-subgraph-api.png" alt="Add federation subgraph" >}}

2. Choose a name for the subgraph and provide an upstream URL.

{{< note success >}}

**Note**  

 In case your upstream URL is protected, select **Upstream Protected** and provide authorisation details (either Header or Certificate information).

{{< /note >}}

{{< img src="/img/dashboard/graphql/subgraph-upstream-url.png" alt="Add upstream URL" >}}

3. Go to Configure API and configure your subgraph just as you would any other API in Tyk.

{{< note success >}}

**Note**  

 In v4.0 subgraphs will be set to **Internal** by default.

{{< /note >}}

4. Once you have configured all the options click **Save**. The subgraph is now visible in the list of APIs.


{{< img src="/img/dashboard/graphql/subgraph-api-listing.png" alt="Subgraph API listing" >}}

### Creating a supergraph via the Dasboard UI

1. Log in to the Dashboard and go to APIs > Add New API > Federation > Supergraph.

{{< img src="/img/dashboard/graphql/add-supergraph-api.png" alt="Add supergraph API" >}}

2. In the Details section select all the subgraphs that will be included in your supergraph.

{{< img src="/img/dashboard/graphql/select-subgraphs.png" alt="Select subgraphs" >}}

3. Go to Configure API and configure your supergraph just as you would any other API in Tyk.
4. Once you configure all the options click **Save**. The supergraph is now available in your list of APIs.

{{< img src="/img/dashboard/graphql/supergraph-api-listing.png" alt="Supergraph API listing" >}}

### Defining Global Headers

In v4.0 you can define global (Supergraph) headers. Global headers are forwarded to all subgraphs that apply to the specific upstream request.

#### Setting a Global Header

1. After creating your supergraph, open the API in your Dashboard.
2. From the **Subgraphs** tab click **Global Headers**.

{{< img src="/img/dashboard/graphql/global-header1.png" alt="Global Header setup for a supergraph" >}}

3. Enter your header name and value. You can add more headers by clicking **Add Headers**. 

{{< img src="/img/dashboard/graphql/global-header2.png" alt="Add further Global headers in a supergraph" >}}

4. Click **Update** to save the header.
5. On the pop-up that is displayed, click **Update API**.
6. If you want to delete a global header, click the appropriate bin icon for it.
7. You can update your headers by repeating steps 2-5.
