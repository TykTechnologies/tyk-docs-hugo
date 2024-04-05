---
title: Using the Response Body Transform middleware with Tyk Classic APIs
date: 2024-02-07
description: "Using the Response Body Transform middleware with Tyk Classic APIs"
tags: ["response transform", "body transform", "transform", "middleware", "per-endpoint", "Tyk Classic", "Tyk Classic API"]
---

The [response body transform]({{< ref "advanced-configuration/transform-traffic/response-body" >}}) middleware provides a way to modify the payload of API responses before they are returned to the client.

This middleware is configured in the Tyk Classic API Definition at the endpoint level. You can do this via the Tyk Dashboard API or in the API Designer.

If you're using the newer Tyk OAS APIs, then check out the [Tyk OAS]({{< ref "product-stack/tyk-gateway/middleware/response-body-tyk-oas" >}}) page.

## Configuring the middleware in the Tyk Classic API Definition

To enable the middleware you must add a new `transform_response` object to the `extended_paths` section of your API definition.

The `transform_response` object has the following configuration:
- `path`: the path to match on
- `method`: this method to match on
- `template_data`: details of the Go template to be applied for the transformation of the response body
 
The Go template is described in the `template_data` object by the following fields:
- `input_type`: the format of input data the parser should expect (either `xml` or `json`)
- `enable_session`: set this to `true` to make session metadata available to the transform template
- `template_mode`: instructs the middleware to look for the template either in a `file` or in a base64 encoded `blob`; the actual file location (or base64 encoded template) is provided in `template_source`
- `template_source`: if `template_mode` is set to `file`, this will be the path to the text file containing the template; if `template_mode` is set to `blob`, this will be a `base64` encoded representation of your template

For example:
```json  {linenos=true, linenostart=1}
{
    "extended_paths": {
        "transform_response": [
            {
                "path": "/anything",
                "method": "POST",
                "template_data": {
                    "template_mode": "file",
                    "template_source": "./templates/transform_test.tmpl",
                    "input_type": "json",
                    "enable_session": true 
                }
            }
        ]
    }
}
```

In this example, the Response Body Transform middleware is directed to use the template located in the `file` at location `./templates/transform_test.tmpl`. The input (pre-transformation) response payload will be `json` format and session metadata will be available for use in the transformation.

{{< note success >}}

**Note**  

Tyk will load and evaluate the template file when the Gateway starts up. If you modify the template, you will need to restart Tyk in order for the changes to take effect.

{{< /note >}}

{{< note success >}}

**Note**  
Prior to Tyk 5.3, there was an additional step to enable response body transformation. You would need to add the following to the Tyk Classic API definition:

```json
{
    "response_processors":[
        {"name": "response_body_transform"}
    ]
}
```

If using the Endpoint Designer in the Tyk Dashboard, this would be added automatically.

We removed the need to configure the `response_processors` element in Tyk 5.3.0.
{{< /note >}}

## Configuring the middleware in the API Designer

You can use the API Designer in the Tyk Dashboard to configure the response body transform middleware for your Tyk Classic API by following these steps.

#### Step 1: Add an endpoint for the path and select the plugin

From the **Endpoint Designer** add an endpoint that matches the path for which you want to perform the transformation. Select the **Body Transforms** plugin.

{{< img src="/img/2.10/body_transforms.png" alt="Endpoint designer" >}}

#### Step 2: Configure the middleware

Ensure that you have selected the `RESPONSE` tab, then select your input type, and then add the template you would like to use to the **Template** input box.

{{< img src="/img/dashboard/endpoint-designer/body-transform-response.png" alt="Setting the body response transform" >}}

#### Step 3: Test the Transform

If you have sample input data, you can use the Input box to add it, and then test it using the **Test** button. You will see the effect of the template on the sample input in the Output box.

{{< img src="/img/dashboard/endpoint-designer/body-transform-test.png" alt="Testing the body transform function" >}}

#### Step 4: Save the API

Use the *save* or *create* buttons to save the changes and activate the Response Body Transform middleware.
