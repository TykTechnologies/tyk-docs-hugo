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

There are currently 2 ways of importing an example into Tyk:
 - Using [tyk-sync]({{< ref "tyk-sync" >}})
 - Manually import via [Dashboard API Import]({{< ref "getting-started/import-apis" >}})

# Import via tyk-sync
Please follow the [tyk-sync documentation]({{< ref "tyk-sync#example-import-tyk-example-into-dashboard" >}}) to learn more about this approach.

# Import via Dashboard API Import
Navigate to an example inside the [examples repository](https://github.com/TykTechnologies/tyk-examples) and grab the relevant API definition from there.
Then you can move in the Dashboard UI to `APIs -> Import API` and select `Tyk API` as source format.

Paste the API definition inside the text box and hit `Import API`.

You can find more detailed instructions in the [Dashboard API Import documentation section]({{< ref "getting-started/import-apis" >}}).