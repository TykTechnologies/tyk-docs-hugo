---
---

### Analytics

You can get aggregate statistics for 1 key or all developer keys (need to specify a list of all keys). Also, you can group by day (hour or month), and by API (policy id).

API Endpoint: `/api/activity/keys/aggregate/#{keys}/#{from}/#{to}?p=-1&res=day`

*  `keys` should be specified separated by ',' delimiter.
*  `from` and `to` values must be in // format.
*  resolution specified `res` attribute: 'day', 'hour' or 'month'
*  `api_id` - policy id associated with developer portal API. If ommited return stats for all APIs.

#### Request

```{.copyWrapper}
curl "https://admin.cloud.tyk.io/api/activity/keys/aggregate/add2b342,5f1d9603,/5/8/2017/13/8/2017?api_id=8e4d983609c044984ecbb286b8d25cd9&api_version=Non+Versioned&p=-1&res=day" \
-X GET \
-H "authorization: $TYK_API_KEY"
```

#### Response

```
{ "data":[
  {
    "id":{"day":9,"month":8,"year":2017,"hour":0,"code":200},
    "hits":13,
    "success":10,
    "error":3,
    "last_hit":"2017-08-09T12:31:02Z"
  },
  ...
],"pages":0}
```

In example above `add2b342,5f1d9603`, is 2 users keys. Note that this example shows [hashed key values as described here]({{< ref "basic-config-and-security/security#key-hashing" >}}). Key hashing is turned on for the Cloud, but for Multi-Cloud and Self-Managed installations you can also turn it off. Hashed keys mean that the API administrator does not have access to real user keys, but they can still use the hashed values for showing analytics.