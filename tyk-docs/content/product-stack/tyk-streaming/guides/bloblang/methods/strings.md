---
title: String Manipulation Methods
description: Explains Bloblang string manipulation methods
tags: [ "Tyk Streams", "Bloblang", "Bloblang Methods", "Strings", "Methods" ]
---

Bloblang offers powerful string manipulation methods designed to handle a wide range of tasks from basic transformations to complex operations like hashing and formatting. These methods facilitate string manipulation, making Bloblang an ideal tool for data transformation pipelines and integration workflows.

## capitalize

Takes a string value and returns a copy with all Unicode letters that begin words mapped to their Unicode title case.

#### Examples


```coffee
root.title = this.title.capitalize()

# In:  {"title":"the foo bar"}
# Out: {"title":"The Foo Bar"}
```

## compare_argon2

Checks whether a string matches a hashed secret using Argon2.

#### Parameters

**hashed_secret** &lt;string&gt; The hashed secret to compare with the input. This must be a fully-qualified string which encodes the Argon2 options used to generate the hash.  

#### Examples


```coffee
root.match = this.secret.compare_argon2("$argon2id$v=19$m=4096,t=3,p=1$c2FsdHktbWNzYWx0ZmFjZQ$RMUMwgtS32/mbszd+ke4o4Ej1jFpYiUqY6MHWa69X7Y")

# In:  {"secret":"there-are-many-blobs-in-the-sea"}
# Out: {"match":true}
```

```coffee
root.match = this.secret.compare_argon2("$argon2id$v=19$m=4096,t=3,p=1$c2FsdHktbWNzYWx0ZmFjZQ$RMUMwgtS32/mbszd+ke4o4Ej1jFpYiUqY6MHWa69X7Y")

# In:  {"secret":"will-i-ever-find-love"}
# Out: {"match":false}
```

## compare_bcrypt

Checks whether a string matches a hashed secret using bcrypt.

#### Parameters

**hashed_secret** &lt;string&gt; The hashed secret value to compare with the input.  

#### Examples

```coffee
root.match = this.secret.compare_bcrypt("$2y$10$Dtnt5NNzVtMCOZONT705tOcS8It6krJX8bEjnDJnwxiFKsz1C.3Ay")

# In:  {"secret":"there-are-many-blobs-in-the-sea"}
# Out: {"match":true}
```

```coffee
root.match = this.secret.compare_bcrypt("$2y$10$Dtnt5NNzVtMCOZONT705tOcS8It6krJX8bEjnDJnwxiFKsz1C.3Ay")

# In:  {"secret":"will-i-ever-find-love"}
# Out: {"match":false}
```

## contains

Checks whether a string contains a substring and returns a boolean result.

#### Parameters

**value** &lt;unknown&gt; A value to test against elements of the target.  

#### Examples

```coffee
root.has_foo = this.thing.contains("foo")

# In:  {"thing":"this foo that"}
# Out: {"has_foo":true}

# In:  {"thing":"this bar that"}
# Out: {"has_foo":false}
```

## escape_html

Escapes a string so that special characters like `<` to become `&lt;`. It escapes only five such characters: `<`, `>`, `&`, `'` and `"` so that it can be safely placed within an HTML entity.

#### Examples

```coffee
root.escaped = this.value.escape_html()

# In:  {"value":"foo & bar"}
# Out: {"escaped":"foo &amp; bar"}
```

## escape_url_query

Escapes a string so that it can be safely placed within a URL query.

#### Examples


```coffee
root.escaped = this.value.escape_url_query()

# In:  {"value":"foo & bar"}
# Out: {"escaped":"foo+%26+bar"}
```

## filepath_join

Joins an array of path elements into a single file path. The separator depends on the operating system of the machine.

#### Examples


```coffee
root.path = this.path_elements.filepath_join()

# In:  {"path_elements":["/foo/","bar.txt"]}
# Out: {"path":"/foo/bar.txt"}
```

## filepath_split

Splits a file path immediately following the final Separator, separating it into a directory and file name component returned as a two element array of strings. If there is no Separator in the path, the first element will be empty and the second will contain the path. The separator depends on the operating system of the machine.

#### Examples


```coffee
root.path_sep = this.path.filepath_split()

# In:  {"path":"/foo/bar.txt"}
# Out: {"path_sep":["/foo/","bar.txt"]}

# In:  {"path":"baz.txt"}
# Out: {"path_sep":["","baz.txt"]}
```

## format

Use a value string as a format specifier in order to produce a new string, using any number of provided arguments. Please refer to the Go [fmt package documentation](https://pkg.go.dev/fmt) for the list of valid format verbs.

#### Examples

```coffee
root.foo = "%s(%v): %v".format(this.name, this.age, this.fingers)

# In:  {"name":"lance","age":37,"fingers":13}
# Out: {"foo":"lance(37): 13"}
```

## has_prefix

Checks whether a string has a prefix argument and returns a bool.

#### Parameters

**value** &lt;string&gt; The string to test.  

#### Examples


```coffee
root.t1 = this.v1.has_prefix("foo")
root.t2 = this.v2.has_prefix("foo")

# In:  {"v1":"foobar","v2":"barfoo"}
# Out: {"t1":true,"t2":false}
```

## has_suffix

Checks whether a string has a suffix argument and returns a bool.

#### Parameters

**`value`** &lt;string&gt; The string to test.  

#### Examples


```coffee
root.t1 = this.v1.has_suffix("foo")
root.t2 = this.v2.has_suffix("foo")

# In:  {"v1":"foobar","v2":"barfoo"}
# Out: {"t1":false,"t2":true}
```

## index_of

Returns the starting index of the argument substring in a string target, or `-1` if the target doesn't contain the argument.

#### Parameters

**value** &lt;string&gt; A string to search for.  

#### Examples


```coffee
root.index = this.thing.index_of("bar")

# In:  {"thing":"foobar"}
# Out: {"index":3}
```

```coffee
root.index = content().index_of("meow")

# In:  the cat meowed, the dog woofed
# Out: {"index":8}
```

## length

Returns the length of a string.

#### Examples


```coffee
root.foo_len = this.foo.length()

# In:  {"foo":"hello world"}
# Out: {"foo_len":11}
```

## lowercase

Convert a string value into lowercase.

#### Examples


```coffee
root.foo = this.foo.lowercase()

# In:  {"foo":"HELLO WORLD"}
# Out: {"foo":"hello world"}
```

## quote

Quotes a target string using escape sequences (`\t`, `\n`, `\xFF`, `\u0100`) for control characters and non-printable characters.

#### Examples


```coffee
root.quoted = this.thing.quote()

# In:  {"thing":"foo\nbar"}
# Out: {"quoted":"\"foo\\nbar\""}
```

## replace_all

Replaces all occurrences of the first argument in a target string with the second argument.

#### Parameters

**`old`** &lt;string&gt; A string to match against.  
**`new`** &lt;string&gt; A string to replace with.  

#### Examples


```coffee
root.new_value = this.value.replace_all("foo","dog")

# In:  {"value":"The foo ate my homework"}
# Out: {"new_value":"The dog ate my homework"}
```

## replace_all_many

For each pair of strings in an argument array, replaces all occurrences of the first item of the pair with the second. This is a more compact way of chaining a series of `replace_all` methods.

#### Parameters

**values** &lt;array&gt; An array of values, each even value will be replaced with the following odd value.  

#### Examples


```coffee
root.new_value = this.value.replace_all_many([
  "<b>", "&lt;b&gt;",
  "</b>", "&lt;/b&gt;",
  "<i>", "&lt;i&gt;",
  "</i>", "&lt;/i&gt;",
])

# In:  {"value":"<i>Hello</i> <b>World</b>"}
# Out: {"new_value":"&lt;i&gt;Hello&lt;/i&gt; &lt;b&gt;World&lt;/b&gt;"}
```

## reverse

Returns the target string in reverse order.

#### Examples


```coffee
root.reversed = this.thing.reverse()

# In:  {"thing":"backwards"}
# Out: {"reversed":"sdrawkcab"}
```

```coffee
root = content().reverse()

# In:  {"thing":"backwards"}
# Out: }"sdrawkcab":"gniht"{
```

## slice

Extract a slice from a string by specifying two indices, a low and high bound, which selects a half-open range that includes the first character, but excludes the last one. If the second index is omitted then it defaults to the length of the input sequence.

#### Parameters

**low** &lt;integer&gt; The low bound, which is the first element of the selection, or if negative selects from the end.  
**high** &lt;(optional) integer&gt; An optional high bound.  

#### Examples


```coffee
root.beginning = this.value.slice(0, 2)
root.end = this.value.slice(4)

# In:  {"value":"foo bar"}
# Out: {"beginning":"fo","end":"bar"}
```

A negative low index can be used, indicating an offset from the end of the sequence. If the low index is greater than the length of the sequence then an empty result is returned.

```coffee
root.last_chunk = this.value.slice(-4)
root.the_rest = this.value.slice(0, -4)

# In:  {"value":"foo bar"}
# Out: {"last_chunk":" bar","the_rest":"foo"}
```

## slug

Creates a "slug" from a given string. Wraps the *github.com/gosimple/slug* package. See accompanying [docs](https://pkg.go.dev/github.com/gosimple/slug) for more information.

#### Parameters

**lang** &lt;(optional) string, default `"en"`&gt;   

#### Examples

Creates a slug from an English string

```coffee
root.slug = this.value.slug()

# In:  {"value":"Tyk & Streams"}
# Out: {"slug":"tyk-and-streams"}
```

Creates a slug from a French string

```coffee
root.slug = this.value.slug("fr")

# In:  {"value":"Gaufre & Poisson d'Eau Profonde"}
# Out: {"slug":"gaufre-et-poisson-deau-profonde"}
```

## split

Split a string value into an array of strings by splitting it on a string separator.

#### Parameters

**delimiter** &lt;string&gt; The delimiter to split with.  

#### Examples


```coffee
root.new_value = this.value.split(",")

# In:  {"value":"foo,bar,baz"}
# Out: {"new_value":["foo","bar","baz"]}
```

## strip_html

Attempts to remove all HTML tags from a target string.

#### Parameters

**preserve** &lt;(optional) array&gt; An optional array of element types to preserve in the output.  

#### Examples


```coffee
root.stripped = this.value.strip_html()

# In:  {"value":"<p>the plain <strong>old text</strong></p>"}
# Out: {"stripped":"the plain old text"}
```

It's also possible to provide an explicit list of element types to preserve in the output.

```coffee
root.stripped = this.value.strip_html(["article"])

# In:  {"value":"<article><p>the plain <strong>old text</strong></p></article>"}
# Out: {"stripped":"<article>the plain old text</article>"}
```

## trim

Remove all leading and trailing characters from a string that are contained within an argument cutset. If no arguments are provided then whitespace is removed.

#### Parameters

**cutset** &lt;(optional) string&gt; An optional string of characters to trim from the target value.  

#### Examples


```coffee
root.title = this.title.trim("!?")
root.description = this.description.trim()

# In:  {"description":"  something happened and its amazing! ","title":"!!!watch out!?"}
# Out: {"description":"something happened and its amazing!","title":"watch out"}
```

## trim_prefix

Remove the provided leading prefix substring from a string. If the string does not have the prefix substring, it is returned unchanged.


#### Parameters

**prefix** &lt;string&gt; The leading prefix substring to trim from the string.  

#### Examples


```coffee
root.name = this.name.trim_prefix("foobar_")
root.description = this.description.trim_prefix("foobar_")

# In:  {"description":"unchanged","name":"foobar_blobton"}
# Out: {"description":"unchanged","name":"blobton"}
```

## trim_suffix

Remove the provided trailing suffix substring from a string. If the string does not have the suffix substring, it is returned unchanged.


#### Parameters

**suffix** &lt;string&gt; The trailing suffix substring to trim from the string.  

#### Examples


```coffee
root.name = this.name.trim_suffix("_foobar")
root.description = this.description.trim_suffix("_foobar")

# In:  {"description":"unchanged","name":"blobton_foobar"}
# Out: {"description":"unchanged","name":"blobton"}
```

## unescape_html

Unescapes a string so that entities like `&lt;` become `<`. It unescapes a larger range of entities than `escape_html` escapes. For example, `&aacute;` unescapes to `á`, as does `&#225;` and `&xE1;`.

#### Examples


```coffee
root.unescaped = this.value.unescape_html()

# In:  {"value":"foo &amp; bar"}
# Out: {"unescaped":"foo & bar"}
```

## unescape_url_query

Expands escape sequences from a URL query string.

#### Examples


```coffee
root.unescaped = this.value.unescape_url_query()

# In:  {"value":"foo+%26+bar"}
# Out: {"unescaped":"foo & bar"}
```

## unquote

Unquotes a target string, expanding any escape sequences (`\t`, `\n`, `\xFF`, `\u0100`) for control characters and non-printable characters.

#### Examples


```coffee
root.unquoted = this.thing.unquote()

# In:  {"thing":"\"foo\\nbar\""}
# Out: {"unquoted":"foo\nbar"}
```

## uppercase

Convert a string value into uppercase.

#### Examples


```coffee
root.foo = this.foo.uppercase()

# In:  {"foo":"hello world"}
# Out: {"foo":"HELLO WORLD"}
```