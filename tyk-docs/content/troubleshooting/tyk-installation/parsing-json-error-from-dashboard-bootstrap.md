---
date: 2017-03-27T16:56:33+01:00
title: Unable to parse JSON Error from Dashboard bootstrap.sh Script
menu:
  main:
    parent: "Tyk Installation"
weight: 5 
---

### Description

When running the `bootstrap.sh` script to set up the default Organisation and User when installing the Self-Managed version on Red Hat/Centos, the script fails when setting up the default user, returning a "Unable to parse JSON" Error.

```
Adding new user
USER AUTHENTICATION CODE: xxxxxxxxxxxxxxxxxxxxxxx
Traceback (most recent call last):
  File "string", line 1, in module
  File "/usr/lib64/python2.7/json/__init__.py", line 290, in load
    **kw)
  File "/usr/lib64/python2.7/json/__init__.py", line 338, in loads
    return _default_decoder.decode(s)
  File "/usr/lib64/python2.7/json/decoder.py", line 366, in decode
    obj, end = self.raw_decode(s, idx=_w(s, 0).end())
  File "/usr/lib64/python2.7/json/decoder.py", line 382, in raw_decode
    obj, end = self.scan_once(s, idx)
ValueError: Invalid control character at: line 1 column 33 (char 32)
Traceback (most recent call last):
  File "stdin", line 3, in module
  File "/usr/lib64/python2.7/ast.py", line 49, in literal_eval
    node_or_string = parse(node_or_string, mode='eval')
  File "/usr/lib64/python2.7/ast.py", line 37, in parse
    return compile(source, filename, mode, PyCF_ONLY_AST)
  File "unknown", line 0
    
    ^
SyntaxError: unexpected EOF while parsing
ERROR: Unable to parse JSON
```


### Cause

The Redis service is not running when the `bootstrap.sh` script is run

### Solution

Run `sudo service redis start` before running the `bootstrap.sh` script.