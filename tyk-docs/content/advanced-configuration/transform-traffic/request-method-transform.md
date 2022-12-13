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
{{< note success >}}
**Note**  

This feature is very simple at the moment, and only changes the type of method, it does not handle the message data of the request body. However, a combination of method transform, context variables and body transformations can be used to achieve a similar effect.
{{< /note >}}


### Using the Dashboard

To do this from the Dashboard, from the **API Endpoint Designer** select **method transform** from the plugins drop-down list on the endpoint you want to transform from.

![Method Transform](img/2.10/method_transform.png)

Then select the path you wish to change to.

![Method Path](img/2.10/method_transform2.png)
