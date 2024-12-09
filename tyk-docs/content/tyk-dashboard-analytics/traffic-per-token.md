---
date: 2017-03-24T16:00:33Z
title: Traffic per Key
menu:
  main:
    parent: Analytics
weight: 3
aliases:
  - /analytics-and-reporting/traffic-per-token/
---

You will often want to see what individual keys are up to in Tyk, and you can do this with the **Activity per Key** section of your analytics Dashboard. This view will show a tabular layout of all keys that Tyk has seen in the range period and provide analytics for them:

{{< img src="/img/dashboard/usage-data/test_alias_key.png" alt="Activity per Token" >}}

You'll notice in the screenshot above that the keys look completely different to the ones you can generate in the key designer (or via the API), this is because, by default, Tyk will hash all keys once they are created in order for them to not be snooped should your key-store be breached.

This poses a problem though, and that is that the keys also no longer have any meaning as analytics entries. You'll notice in the screenshot above, one of the keys is appended by the text **TEST_ALIAS_KEY**. This is what we call an Alias, and you can add an alias to any key you generate and that information will be transposed into your analytics to make the information more human-readable.

The key `00000000` is an empty token, or an open-request. If you have an API that is open, or a request generates an error before we can identify the API key, then it will be automatically assigned this nil value.

If you select a key, you can get a drill down view of the activity of that key, and the errors and codes that the token has generated:

{{< img src="/img/2.10/traffic_by_key.png" alt="Traffic activity by key graph" >}}

{{< img src="/img/2.10/error_by_key.png" alt="Errors by Key" >}}

(The filters in this view will not be of any use except to filter by API Version).

{{< note success >}}
**Note**

From Tyk v5.1 (and LTS patches v4.0.14 and v5.0.3) the <b>Traffic per Key</b> screen will not be visible to a user if they are assigned the [Owned Analytics]({{< ref "basic-config-and-security/security/dashboard/user-roles" >}}) permission.
{{< /note >}}

