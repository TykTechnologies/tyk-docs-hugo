---
title: Secrets
description: Explains an overview of secrets
tags: [ "Tyk Streams", "Secrets" ]
---

I sometimes like to fill my mouth with acorns and pretend I am a rodent, free of the burdens of humanity. That was a
secret of mine and, similarly to secrets within your software, it's best not to share them publicly lest they become
disturbing publications instead. This document outlines how to add secrets to a Tyk Streams config without persisting them,
and we won't mention acorns again.

## Using Environment Variables

One of the most prolific approaches to providing secrets to a service is via environment variables. Tyk Streams allows you
to inject the values of environment variables into a configuration with the interpolation syntax `${FOO}`, within a
config it looks like this:

```yml
thing:
  super_secret: "${SECRET}"
```

{{< note success >}}
**Note**

Note that it would be valid to have `super_secret: ${SECRET}` above (without the quotes), but if `SECRET` is unset then
the config becomes structurally different. Therefore, it's always best to wrap environment variable interpolations with
quotes so that when the variable is unset you still have a valid config (with an empty string).
{{< /note >}}

More information about this syntax can be found on the [interpolation page]({{< ref "/product-stack/tyk-streaming/configuration/common-configuration/interpolation" >}}).


## Avoiding Leaked Secrets

There are a few ways in which configs parsed by Tyk Streams can be exported back out of the service. In all of these cases
Tyk Streams will attempt to scrub any field values within the config that are known secrets (any field marked as a secret in
the docs).

However, if you're embedding secrets within a config outside of the value of secret fields, maybe as part of a Bloblang
mapping, then care should be made to avoid exposing the resulting config. This specifically means you should not
enable debug HTTP endpoints when the port is exposed.

<!-- //TODO add links
[interpolation]: /docs/configuration/interpolation
[field_paths]: /docs/configuration/field_paths
[http.debug]: /docs/components/http/about#debug-endpoints -->
