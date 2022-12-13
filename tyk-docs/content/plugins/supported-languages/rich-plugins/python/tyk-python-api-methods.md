---
date: 2017-03-24T13:16:21Z
title: Tyk Python API methods
menu:
  main:
    parent: "Python"
weight: 1 
aliases:
  - /customise-tyk/plugins/rich-plugins/python/tutorial-add-demo-plugin-api/
  -  "plugins/supported-languages/rich-plugins/python/tyk-python-api-methods"
---

Python plugins may call these Tyk API methods:

### store_data(key, value, ttl)

`store_data` sets a Redis `key` with the specified `value` and `ttl`.

### get_data(key)

`get_data` retrieves a Redis `key`.

### trigger_event(event_name, payload)

`trigger_event` triggers an internal Tyk event, the `payload` must be a JSON object.

### log(msg, level)

`log` will log a message (`msg`) using the specified `level`.

### log_error(*args)

`log_error` is a shortcut for `log`, it uses the error log level.
