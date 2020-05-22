---
date: 2017-03-24T16:00:33Z
title: Traffic per Key
menu:
  main:
    parent: "Analytics and Reporting"
weight: 3 
---

You will often want to see what individual keys are up to in Tyk, and you can do this with the **Activity per Key** section of your analytics Dashboard. This view will show a tabular layout of all keys that Tyk has seen in the range period and provide analytics for them:

![Activity per Token](/docs/img/dashboard/usage-data/test_alias_key.png)

You'll notice in the screenshot above that the keys look completely different to the ones you can generate in the key designer (or via the API), this is because, by default, Tyk will hash all keys once they are created in order for them to not be snooped should your key-store be breached.

This poses a problem though, and that is that the keys also no longer have any meaning as analytics entries. You'll notice in the screenshot above, one of the keys is appended by the text **TEST_ALIAS_KEY**. This is what we call an Alias, and you can add an alias to any key you generate and that information will be transposed into your analytics to make the information more human-readable.

The key `00000000` is an empty token, or an open-request. If you have an API that is open, or a request generates an error before we can identify the API key, then it will be automatically assigned this nil value.

If you select a key, you can get a drill down view of the activity of that key, and the errors and codes that the token has generated:

![Traffic activity by key graph](/docs/img/dashboard/usage-data/key_detail_2.5.png)

(The filters in this view will not be of any use except to filter by API Version).