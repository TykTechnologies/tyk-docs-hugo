---
date: 2017-03-24T16:39:31Z
title: Migration with Tyk Operator
weight: 16
menu:
    main:
        parent: "Tyk Operator"
---

{{< toc >}}

If you have existing APIs and Policies running on your Tyk platform, and you want to start using Tyk Operator to manage them, you probably would not want to re-create the APIs and Policies on the platform using Operator CRDs. It is because you will lose keys, policies, and analytics linked to the APIs. You can instead link existing APIs and Policies to a CRD by specifying the API ID or Policy ID in the CRD spec. This way, Operator will update the existing API or Policy according to the CRD spec. Any keys, policies and analytics linked to the API will continue to operate the same. This is great for idempotency.

### Export existing configurations to CRDs

Instead of creating the API and Policy CRDs from scratch, you can try exporting them from Dashboard using a snapshot tool. You can find the detail usage guide [here](https://github.com/TykTechnologies/tyk-operator/blob/85a9705f18f0c5e4eb744746a9e098b36cc1f2d4/pkg/snapshot/README.md). This is great if you want to have a quick start. However, this is still a PoC feature so we recommend you to double check the output files before applying to your cluster.

### Migration of existing API

If there are existing APIs that you want to link to a CRD, it's very easy to do so. You need to simply add the `api_id` from your API Definition to the YAML of your `ApiDefinition` type. Then, the Operator will take care of the rest.

Example:

1. From the existing API Definition, grab the following field:

```bash
"api_id": "5e0fac4845bb46c77543be28300fd9d7"
```

2. Simply add this value to your YAML, in the `spec.api_id`field:

```bash
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: my-existing-api
spec:
  api_id: 5e0fac4845bb46c77543be28300fd9d7
  name: existing API
  protocol: http
  active: true
  proxy:
    target_url: http://httpbin.org
    listen_path: /httpbin
    strip_listen_path: true
```

3. Then apply your changes:

```bash
$ kubectl apply -f config/samples/httpbin_protected.yaml
apidefinition.tyk.tyk.io/my-existing-api created
```

{{< note success >}}
**Note**  

The source of truth for the API definition is now the CRD, meaning it will override any differences in your existing API definition.
{{< /note >}}

### Migration of existing Policy
If you have existing pre-Operator policies, you can easily link them to a CRD, which will allow you to modify them through the YAML moving forward.
Simply set the id field in the SecurityPolicy YAML to the _id field in the existing Policy's JSON. This will allow the Operator to make the link.
Note that the YAML becomes the source of truth and will overwrite any changes between it and the existing Policy.

**Example**:
1. Find out your existing Policy ID, e.g. `5f8f3933f56e1a5ffe2cd58c`

2. Stick the policy ID `5f8f3933f56e1a5ffe2cd58c` into the YAML's `spec.id` field like below

```bash
my-security-policy.yaml:
apiVersion: tyk.tyk.io/v1alpha1
kind: SecurityPolicy
metadata:
  name: new-httpbin-policy
spec:
  id: 5f8f3933f56e1a5ffe2cd58c
  name: My New HttpBin Policy
  state: active
  active: true
  access_rights_array:
    - name: new-httpbin-api # name of your ApiDefinition object.
      namespace: default    # namespace of your ApiDefinition object.
      versions:
        - Default
```

The `spec.access_rights_array` field of the YAML must refer to the ApiDefinition object that the policy identified by the id will affect.

To find available ApiDefinition objects:

```bash
$ kubectl get tykapis -A
NAMESPACE   NAME               DOMAIN   LISTENPATH   PROXY.TARGETURL      ENABLED
default     new-httpbin-api             /httpbin     http://httpbin.org   true
```

3. And then apply this file:

```bash
$ kubectl apply -f my-security-policy.yaml
securitypolicy.tyk.tyk.io/new-httpbin-policy created
```

Now the changes in the YAML were applied to the existing Policy. You can now manage this policy through the CRD moving forward.
Note, if this resource is unintentionally deleted, the Operator will recreate it with the same `id` field as above, allowing keys to continue to work as before the delete event.

### Idempotency

Because of the ability to declaratively define the `api_id`, this gives us the ability to preserve Keys that are tied to APIs or policies which are tied to APIs.
Imagine any use case where you have keys tied to policies, and policies tied to APIs.
Now imagine that these resources are unintentionally destroyed. Our database goes down, or our cluster, or something else.
Well, using the Tyk Operator, we can easily re-generate all our resources in a non-destructive fashion. That's because the operator intelligently constructs the unique ID using the unique namespaced name of our CRD resources. For that reason.
Alternatively, if you don't explicitly state it, it will be hard-coded for you by Base64 encoding the namespaced name of the CRD.

For example:

1. we have keys tied to policies tied to APIs in production.
2. Our production DB gets destroyed, all our Policies and APIs are wiped
3. The Tyk Operator can resync all the changes from our CRDs into a new environment, by explicitly defining the Policy IDs and API IDs as before.
4. This allows keys to continue to work normally as Tyk resources are generated idempotently through the Operator.
