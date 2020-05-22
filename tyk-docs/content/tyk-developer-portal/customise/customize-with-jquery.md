---
date: 2020-05-07T17:18:28Z
title: Customizing using jQuery
linktitle: Customizing using jQuery
menu:
  main:
    parent: "Customise"
---

Tyk Portal comes prepackaged with jQuery.  This opens up a whole world of customisation, by extending our Portal using JavaScript and HTML to create dynamic content.


## Dynamic Content Rendering & Filtering

let's walk through an example where we use jQuery to fetch data from a REST endpoint, then display it in a table where we can filter our results.

{{< youtube njRgYUpL5vs >}}


**First of all, create a custom page in the portal.**


![custom_page_setup](/docs/img/dashboard/portal-management/new_custom_page.png)

In the MainBody, we can paste this code from the gist here:

https://gist.github.com/sedkis/371e77e3484263a159a9d2d93407bf2e#file-filtered-dev-portal

And save.

now visit the portal at "http://dashboard-host:3000/portal/custom"

![custom_page_display](/docs/img/dashboard/portal-management/custom_page_dynamic.png)

We now have a searchable Input box that will dynamically filter the results of the table.
