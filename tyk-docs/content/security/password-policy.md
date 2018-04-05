---
date: 2017-03-23T17:01:35Z
title: Password Policy
menu:
  main:
    parent: "Security"
weight: 9 
---

Tyk allows you to control password requirements for users and developers. You can find the configuration files in the `schemas` directory of your Tyk installation folder. For the Dashboard users configuration is stored in `schemas/password.json`, for developers it is registered via your portal: `schemas/developer_password.json`.

The following validators are available:

*   `minLength` - sets minimum password length
*   `multiCase` - boolean, upper and lower case characters are required
*   `minNumeric` - minimum number of numeric characters
*   `minSpecial` - minimum number of special characters, like `@`, `$`, `%` etc.
*   `disableSequential` - boolean, disable passwords which include at least 3 sequential characters. For example: `abc`, `123`, `111`, `xxx` etc.

Below is an example of `password.json` file, with all options turned on:

```{.copyWrapper}
    {
        "title": "User password schema",
        "type": "string",
    
        "minLength": 6,
        "multiCase": true,
        "minNumeric": 2,
        "minSpecial": 2,
        "disableSequential": true
    }
```

This option is only available from Dashboard v1.3.2 and onwards.
