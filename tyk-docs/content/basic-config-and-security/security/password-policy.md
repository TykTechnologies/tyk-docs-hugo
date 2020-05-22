---
date: 2017-03-23T17:01:35Z
title: Password Policy
menu:
  main:
    parent: "Security"
weight: 9 
---

Tyk allows you to control password requirements for Dashboard users, developers (i.e. users registered to the developer portal) and basic auth keys. 
Please note: This configuration is enforced by the Tyk-Dashboard and as such is not available in the Tyk Community Edition. Also since it require access to the Tyk Dashboard installation folder, it is *currently* not available for cloud/multi-cloud clients.

You can find the configuration files in the `schemas` directory of your Tyk Dashboard installation folder, as follows: 
- For Dashboard users you define policy in `schemas/password.json` 
- For developers you define policy in `schemas/developer_password.json`
- For basic auth keys you define policy in `./schemas/basic_auth.json`


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

> **NOTE**: This option is only available from Dashboard v1.3.2 and onwards.
