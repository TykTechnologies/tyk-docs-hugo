
* `uptime_tests`: This section defines the uptime tests to run for this API.

* `uptime_tests.check_list` A list of tests to run, takes the form:

```{.json}
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
        
    
See [Uptime Tests](https://tyk.io/docs/ensure-high-availability/uptime-tests/) for details on how uptime tests work and how to configure them.

