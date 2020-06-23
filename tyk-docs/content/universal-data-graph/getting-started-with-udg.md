---
title: "UDG Getting Started"
date: 2020-06-03
menu:
  main:
    parent: "Universal Data Graph"
weight: 1
aliases:
    - /universal-data-graph/datasources/
---

To start with a Universal Data Graph from scratch head over to the dashboard and click on "APIs" in the left menu.
Then click the "Add New API" and fill the form according to the following screenshot.
You might want to give your Graph an individual name.

![Create New API](/docs/img/dashboard/udg/getting-started/step1.png)

If you've filled the initial form click "Configure API".

To get started easily you should set the API to Keyless.
To do this, scroll down to the Authentication section.
Keep in mind that you should not use Keyless for most production environments.

![Create New API](/docs/img/dashboard/udg/getting-started/step2.png)

Next, you should have a look at the Schema editor.

![Create New API](/docs/img/dashboard/udg/getting-started/step3.png)

You will find a default schema with the base types Query, Mutation.
You could either use the GraphQL Editor to modify the schema or click on "Data Sources" to use the visual editor.

With the following example we've changed the GraphQL schema to return a simple field from httpbin.org.

![Create New API](/docs/img/dashboard/udg/getting-started/step4.png)

If you switch to the "Data Sources" tab you can see and edit the schema using a visual editor.

![Create New API](/docs/img/dashboard/udg/getting-started/step5.png)

You should see an exclamation mark on the left side of the "httpBinGet" field.
This is because we haven't yet attached a DataSource to this root field.
Move on to fix this error.

![Create New API](/docs/img/dashboard/udg/getting-started/step6.png)

With the visual editor you're able to add & remove types as well as fields.
Additionally, you're able to attach data sources to each individual field.

Finally, select the "Data Source" tab for the field "httpBinGet".
Select a data source type, in this case HTTP JSON.
Define the host and URL as well as the Method.

By default, "Disable field mapping" should be checked.
More on this in the DataSources section.

![Create New API](/docs/img/dashboard/udg/getting-started/step7.png)

After all the field configuration is done click the "Update Field" button.

![Create New API](/docs/img/dashboard/udg/getting-started/step8.png)

You should see the exclamation mark disappearing.
Also, there's now a bubble indicating the attached "HTTP JSON" DataSource on the right to the field name "httpBinGet".

Hit the "Save" button to persist the API.

Now let's test our data graph.
Switch tabs to "Playground" and create a GraphQL query like in the following example.

![Create New API](/docs/img/dashboard/udg/getting-started/step9.png)

If you hit the play button you should get the following response:

```json
{
    "data": {
        "httpBinGet": {
            "url": "https://httpbin.org/get"
        }
    }
}
```

The Tyk GraphQL engine resolved the GraphQL query, translated it into a REST API call to httpbin.org and returned the response according to the GraphQL schema.

For in depth information on how DataSources work, how you nest them etc. have a look at the DataSources section.
