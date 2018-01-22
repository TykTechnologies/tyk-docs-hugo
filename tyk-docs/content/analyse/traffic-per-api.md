---
date: 2017-03-24T15:55:00Z
title: Traffic per API
menu:
  main:
    parent: "Analyse"
weight: 2 
---

To get a tabular view of how your API traffic is performing, you can select the “Activity by API” option in the navigation and see a tabular view of your APIs, this table will list out your APIs by their traffic volume and you’ll be able to see when they were last accessed:

![Activity per API][1]

You can use the same range selectors as with the Dashboard view to modify how you see the data. However, granularity and tag views will not work since they do not apply to a tabulated view.

If you select an API name, you will be taken to the drill-down view for that specific API, here you will have a similar Dashboard as you do with the aggregate API Dashboard that you first visit on log in, but the whole view will be constrained to just the single API in question:

![Traffic per API: CLosed graph][2]

You will also see an error breakdown and the endpoint popularity stats for the API:

![API error breakdown pie chart and table][3]

Tyk will try to normalise endpoint metrics by identifying IDs and UUIDs in a URL string and replacing them with normalised tags, this can help make your analytics more useful. It is possible to configure custom tags in the configuration file of your Tyk On-Premises or Hybrid installation.

[1]: /docs/img/dashboard/usage-data/activity_perapi_2.5.png
[2]: /docs/img/dashboard/usage-data/activity_dashboard_2.5.png
[3]: /docs/img/dashboard/usage-data/errors_and_endpoints_2.5.png