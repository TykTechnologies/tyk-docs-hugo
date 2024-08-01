---
title: Regular Expression Methods
description: Explains Bloblang Regular Expression Methods
tags: [ "Tyk Streams", "Bloblang", "Bloblang Methods", "Regular Expressions", "Methods" ]
---

Regular expression (regex) methods in Bloblang enable advanced string matching and manipulation methods. These methods enable precise pattern matching within strings, facilitating tasks such as extraction, substitution and validation based on defined patterns. This document explores various regex methods, each allowing retrieval of all matches and submatches to validate string patterns and perform global replacements.

## re_find_all

Returns an array containing all successive matches of a regular expression in a string.

#### Parameters

**pattern** &lt;string&gt; The pattern to match against.  

#### Examples


```coffee
root.matches = this.value.re_find_all("a.")

# In:  {"value":"paranormal"}
# Out: {"matches":["ar","an","al"]}
```

## re_find_all_object

Returns an array of objects containing all matches of the regular expression and the matches of its subexpressions. The key of each match value is the name of the group when specified, otherwise it is the index of the matching group, starting with the expression as a whole at 0.

#### Parameters

**`pattern`** &lt;string&gt; The pattern to match against.  

#### Examples


```coffee
root.matches = this.value.re_find_all_object("a(?P<foo>x*)b")

# In:  {"value":"-axxb-ab-"}
# Out: {"matches":[{"0":"axxb","foo":"xx"},{"0":"ab","foo":""}]}
```

```coffee
root.matches = this.value.re_find_all_object("(?m)(?P<key>\\w+):\\s+(?P<value>\\w+)$")

# In:  {"value":"option1: value1\noption2: value2\noption3: value3"}
# Out: {"matches":[{"0":"option1: value1","key":"option1","value":"value1"},{"0":"option2: value2","key":"option2","value":"value2"},{"0":"option3: value3","key":"option3","value":"value3"}]}
```

## re_find_all_submatch

Returns an array of arrays containing all successive matches of the regular expression in a string and the matches, if any, of its subexpressions.

#### Parameters

**pattern** &lt;string&gt; The pattern to match against.  

#### Examples


```coffee
root.matches = this.value.re_find_all_submatch("a(x*)b")

# In:  {"value":"-axxb-ab-"}
# Out: {"matches":[["axxb","xx"],["ab",""]]}
```

## re_find_object

Returns an object containing the first match of the regular expression and the matches of its subexpressions. The key of each match value is the name of the group when specified, otherwise it is the index of the matching group, starting with the expression as a whole at 0.

#### Parameters

**pattern** &lt;string&gt; The pattern to match against.  

#### Examples


```coffee
root.matches = this.value.re_find_object("a(?P<foo>x*)b")

# In:  {"value":"-axxb-ab-"}
# Out: {"matches":{"0":"axxb","foo":"xx"}}
```

```coffee
root.matches = this.value.re_find_object("(?P<key>\\w+):\\s+(?P<value>\\w+)")

# In:  {"value":"option1: value1"}
# Out: {"matches":{"0":"option1: value1","key":"option1","value":"value1"}}
```

## re_match

Checks whether a regular expression matches against any part of a string and returns a boolean.

#### Parameters

**pattern** &lt;string&gt; The pattern to match against.  

#### Examples


```coffee
root.matches = this.value.re_match("[0-9]")

# In:  {"value":"there are 10 puppies"}
# Out: {"matches":true}

# In:  {"value":"there are ten puppies"}
# Out: {"matches":false}
```

## re_replace_all

Replaces all occurrences of the argument regular expression in a string with a value. Inside the value $ signs are interpreted as submatch expansions, e.g. `$1` represents the text of the first submatch.

#### Parameters

**pattern** &lt;string&gt; The pattern to match against.  
**value** &lt;string&gt; The value to replace with.  

#### Examples


```coffee
root.new_value = this.value.re_replace_all("ADD ([0-9]+)","+($1)")

# In:  {"value":"foo ADD 70"}
# Out: {"new_value":"foo +(70)"}
```