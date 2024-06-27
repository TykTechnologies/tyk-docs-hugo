---
title: AWS Lambda
description: Explains an overview of AWS lambda processor
tags: [ "Tyk Streams", "Stream Processors", "Processors", "AWS", "AWS Lambda" ]
---

Invokes an AWS lambda for each message. The contents of the message is the payload of the request, and the result of the invocation will become the new contents of the message.

## Common

```yml
# Common config fields, showing default values
label: ""
aws_lambda:
  parallel: false
  function: "" # No default (required)
```

## Advanced

```yml
# All config fields, showing default values
label: ""
aws_lambda:
  parallel: false
  function: "" # No default (required)
  rate_limit: ""
  region: ""
  endpoint: ""
  credentials:
    profile: ""
    id: ""
    secret: ""
    token: ""
    from_ec2_role: false
    role: ""
    role_external_id: ""
  timeout: 5s
  retries: 3
```

<!-- TODO add rate_limit link -->
The `rate_limit` field can be used to specify a rate limit resourceto cap the rate of requests across parallel components service wide.

In order to map or encode the payload to a specific request body mand map the response back into the original payload instead of replacing it entirely, you can use the [branch processor]({{< ref "/product-stack/tyk-streaming/configuration/processors/branch" >}}).

### Error Handling

<!-- TODO: Add link to error handling once the error handling content has been added  -->
When Tyk Streams is unable to connect to the AWS endpoint or is otherwise unable to invoke the target lambda function it will retry the request according to the configured number of retries. Once these attempts have been exhausted the failed message will continue through the pipeline with it's contents unchanged, but flagged as having failed, allowing you to use standard processor error handling patterns.

However, if the invocation of the function is successful but the function itself throws an error, then the message will have it's contents updated with a JSON payload describing the reason for the failure, and a metadata field `lambda_function_error` will be added to the message allowing you to detect and handle function errors with a [branch]({{< ref "/product-stack/tyk-streaming/configuration/processors/branch" >}}):

```yaml
pipeline:
  processors:
    - branch:
        processors:
          - aws_lambda:
              function: foo
        result_map: |
          root = if meta().exists("lambda_function_error") {
            throw("Invocation failed due to %v: %v".format(this.errorType, this.errorMessage))
          } else {
            this
          }
output:
  switch:
    retry_until_success: false
    cases:
      - check: errored()
        output:
          reject: ${! error() }
      - output:
          resource: somewhere_else
```

### Credentials

<!-- TODO: add support document for how to setup creds /docs/guides/cloud/aws -->
By default Tyk Streams will use a shared credentials file when connecting to AWS services. It's also possible to set them explicitly at the component level, allowing you to transfer data across accounts.

## Examples

### Branched Invoke

This example uses a [branch]({{< ref "/product-stack/tyk-streaming/configuration/processors/branch" >}}) to map a new payload for triggering a lambda function with an ID and username from the original message, and the result of the lambda is discarded, meaning the original message is unchanged.

```yaml
pipeline:
  processors:
    - branch:
        request_map: '{"id":this.doc.id,"username":this.user.name}'
        processors:
          - aws_lambda:
              function: trigger_user_update
```

## Fields

### parallel

Whether messages of a batch should be dispatched in parallel.


Type: `bool`  
Default: `false`  

### function

The function to invoke.


Type: `string`  

### rate_limit

<!-- TODO: add rate_limit -->
An optional rate_limit to throttle invocations by.


Type: `string`  
Default: `""`  

### region

The AWS region to target.


Type: `string`  
Default: `""`  

### endpoint

Allows you to specify a custom endpoint for the AWS API.


Type: `string`  
Default: `""`  

### credentials

<!-- TODO: add support docs: /docs/guides/cloud/aws -->
Optional manual configuration of AWS credentials to use. 


Type: `object`  

### credentials.profile

A profile from `~/.aws/credentials` to use.


Type: `string`  
Default: `""`  

### credentials.id

The ID of credentials to use.


Type: `string`  
Default: `""`  

### credentials.secret

The secret for the credentials being used.


Type: `string`  
Default: `""`  

### credentials.token

The token for the credentials being used, required when using short term credentials.


Type: `string`  
Default: `""`  

### credentials.from_ec2_role

Use the credentials of a host EC2 machine configured to assume [an IAM role associated with the instance](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-ec2.html).


Type: `bool`  
Default: `false`  

### credentials.role

A role ARN to assume.


Type: `string`  
Default: `""`  

### credentials.role_external_id

An external ID to provide when assuming a role.


Type: `string`  
Default: `""`  

### timeout

The maximum period of time to wait before abandoning an invocation.


Type: `string`  
Default: `"5s"`  

### retries

The maximum number of retry attempts for each message.


Type: `int`  
Default: `3`  
