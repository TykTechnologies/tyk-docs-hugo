---
date: 2017-03-27T19:37:54+01:00
title: “ValueError No JSON object could be decoded" when running Dashboard Bootstrap script
menu:
  main:
    parent: "Tyk Dashboard Troubleshooting"
weight: 5 
---

### Description

Users receive the following error message when attempting to run the bootstrap script in their Tyk instance:

```
Traceback (most recent call last):
File ""<string>"", line 1, in <module>
File ""/usr/lib64/python2.7/json/__init__.py"", line 290, in load
**kw)
File ""/usr/lib64/python2.7/json/__init__.py"", line 338, in loads
return _default_decoder.decode(s)
File ""/usr/lib64/python2.7/json/decoder.py"", line 365, in decode
obj, end = self.raw_decode(s, idx=_w(s, 0).end())
File ""/usr/lib64/python2.7/json/decoder.py"", line 383, in raw_decode
raise ValueError(""No JSON object could be decoded"")
ValueError: No JSON object could be decoded
ORGID:
Adding new user
Traceback (most recent call last):
File ""<string>"", line 1, in <module>
File ""/usr/lib64/python2.7/json/__init__.py"", line 290, in load
**kw)
File ""/usr/lib64/python2.7/json/__init__.py"", line 338, in loads
return _default_decoder.decode(s)
File ""/usr/lib64/python2.7/json/decoder.py"", line 365, in decode
obj, end = self.raw_decode(s, idx=_w(s, 0).end())
File ""/usr/lib64/python2.7/json/decoder.py"", line 383, in raw_decode
raise ValueError(""No JSON object could be decoded"")
ValueError: No JSON object could be decoded
USER AUTH:
Traceback (most recent call last):
File ""<string>"", line 1, in <module>
File ""/usr/lib64/python2.7/json/__init__.py"", line 290, in load
**kw)
File ""/usr/lib64/python2.7/json/__init__.py"", line 338, in loads
return _default_decoder.decode(s)
File ""/usr/lib64/python2.7/json/decoder.py"", line 365, in decode
obj, end = self.raw_decode(s, idx=_w(s, 0).end())
File ""/usr/lib64/python2.7/json/decoder.py"", line 383, in raw_decode
raise ValueError(""No JSON object could be decoded"")
ValueError: No JSON object could be decoded
NEW ID:
Setting password
DONE"
```

### Cause

The bootstrap script requires a valid hostname and port number to generate a new login user.

### Solution

Make sure that the correct hostname and port number used to run the bootstrap.sh script. An example command would be: `./bootstrap.sh new-tyk-instance.com:3000`

