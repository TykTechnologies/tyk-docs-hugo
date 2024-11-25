---
title: "UDG Examples"
date: 2023-03-27
menu:
    main:
        parent: "Universal Data Graph"
weight: 12
aliases:
- /universal-data-graph/examples/
---

It is possible to import various UDG examples from the [official Tyk examples repository](https://github.com/TykTechnologies/tyk-examples).

We offer 3 ways of importing an example into Tyk:
 - Using [tyk-sync]({{< ref "/api-management/automations#synchronize-api-configurations-with-github-actions" >}})
 - Manually import via [Dashboard API Import]({{< ref "getting-started/import-apis" >}})
- Using Tyk Dashboard to browse and import the examples directly

## Import via tyk-sync

Please follow the [tyk-sync documentation]({{< ref "/api-management/automations#examples-publish-command" >}}) to learn more about this approach.

## Import via Tyk Dashboard API Import

Navigate to an example inside the [examples repository](https://github.com/TykTechnologies/tyk-examples) and grab the relevant API definition from there.
Then you can move in the Dashboard UI to `APIs -> Import API` and select `Tyk API` as source format.

Paste the API definition inside the text box and hit `Import API`.

You can find more detailed instructions in the [Dashboard API Import documentation section]({{< ref "getting-started/import-apis" >}}).

## Import via Tyk Dashboard UI

Navigate to `Data Graphs` section of the Tyk Dashboard menu. If you haven't yet created any Universal Data Graphs you will see three options in the screen - one of them `Try example data graph` - will allow you to browse all examples compatible with your Dashboard version and choose the one you want to import.

{{< img src="/img/dashboard/udg/getting-started/example data graph.png" alt="Examples in Dashboard" >}}

In case you have created data graphs before and your screen looks different, just use the `Add Data Graph` button and in the next step decide if you want to create one yourself, or use one of the available examples.

{{< img src="/img/dashboard/udg/getting-started/data graph example new graph menu.png" alt="Examples in Dashboard New Graph">}}