---
---

* `uptime_tests`: This section defines the uptime tests to run for this API.

* `uptime_tests.check_list` A list of tests to run, takes the form:

```{.copyWrapper}
uptime_tests: {
  check_list: [
    {
      "url": "http://google.com/"
    },
    {
      "url": "http://posttestserver.com/post.php?dir=uptime-checker",
      "method": "POST",
      "headers": {
          "this": "that",
          "more": "beans"
      },
      "body": "VEhJUyBJUyBBIEJPRFkgT0JKRUNUIFRFWFQNCg0KTW9yZSBzdHVmZiBoZXJl"
    }
  ]
},
```
        
    
See [Uptime Tests](/planning-for-production/ensure-high-availability/uptime-tests/) for details on how uptime tests work and how to configure them.

