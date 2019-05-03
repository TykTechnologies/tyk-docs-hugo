---
date: 2017-03-23T17:45:01Z
title: Request Method Transform
menu:
  main:
    parent: "Transform Traffic"
weight: 6 
---

It is now possible, as of Tyk Gateway v2.2, to change the method of a request. To enable, add to your extended paths:

```{.copyWrapper}
method_transforms: [
  {
    path: "post",
    method: "GET",
    to_method: "POST"
  }
],
```

> **Note**: This feature is very simple at the moment, and only changes the type of method, it does not handle the message data of the request body. However, a combination of method transform, context variables and body transformations can be used to achieve a similar effect.

### Using the Dashboard

To do this from the Dashboard, from the **API Endpoint Designer** select **method transform** from the plugins drop-down list on the endpoint you want to transform from.

![Method Transform][1]

Then select the path you wish to change to.

![Method Path][2]


 [1]: /docs/img/dashboard/system-management/endpoint_design_method_trans_1.8.png
 [2]: /docs/img/dashboard/system-management/method_to_path_2.5.png
