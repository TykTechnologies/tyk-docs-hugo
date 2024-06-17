---
title: Bloblang Walkthrough
sidebar_label: Walkthrough
description: A step by step introduction to Bloblang
tags: [ "bloblang", "bloblang walkthrough" ]
---

Bloblang is a mapping language introduced in this walkthrough. It is designed for readability, powerful enough to handle complex input documents, and capable of adapting erratic schemas to meet your needs. While Bloblang is the native mapping language of Tyk Streams, it is also designed as a general-purpose technology suitable for adoption by other tools.

In this guide, you will learn how to effectively map documents using Bloblang. Although there are multiple methods to execute Bloblang, this guide will focus on using a Tyk Streams Docker image and running the command tyk-streams blobl server, which launches an interactive Bloblang editor.

```sh
docker pull ghcr.io/benthosdev/benthos:latest
docker run -p 4195:4195 --rm ghcr.io/benthosdev/benthos blobl server --no-open --host 0.0.0.0
```

Next, open your browser at `http://localhost:4195` and you should see an app with three panels, the top-left is where you paste an input document, the bottom is your Bloblang mapping and on the top-right is the output.

## Your first assignment

The primary goal of a Bloblang mapping is to construct a brand new document by using an input document as a reference, which we achieve through a series of assignments. Bloblang is traditionally used to map JSON documents and that's mostly what we'll be doing in this walkthrough. The first mapping you'll see when you open the editor is a single assignment:

```coffee
root = this
```

On the left-hand side of the assignment is our assignment target, where `root` is a keyword referring to the root of the new document being constructed. On the right-hand side is a query which determines the value to be assigned, where `this` is a keyword that refers to the context of the mapping which begins as the root of the input document.

As you can see the input document in the editor begins as a JSON object `{"message":"hello world"}`, and the output panel should show the result as:

```json
{
  "message": "hello world"
}
```

Which is a (neatly formatted) replica of the input document. This is the result of our mapping because we assigned the entire input document to the root of our new thing. Let's create a brand new document by assigning a fresh object to the root:

```coffee
root = {}
root.foo = this.message
```

Bloblang supports a bunch of [literal types]({{< ref "/developer-support/tyk-streams/bloblang/about#literals" >}}), and the first line of this mapping assigns an empty object literal to the root. The second line then creates a new field `foo` on that object by assigning it the value of `message` from the input document. You should see that our output has changed to:

```json
{
  "foo": "hello world"
}
```

In Bloblang, when the path that we assign to contains fields that are themselves unset then they are created as empty objects. This rule also applies to `root` itself, which means the mapping:

```coffee
root.foo.bar = this.message
root.foo."buz me".baz = "I like mapping"
```

Will automatically create the objects required to produce the output document:

```json
{
  "foo": {
    "bar": "hello world",
    "buz me": {
      "baz": "I like mapping"
    }
  }
}
```

Also note that we can use quotes in order to express path segments that contain symbols or whitespace.

## Basic Methods and Functions

Methods allow us to mutate values during mapping. A range of [methods]({{< ref "/developer-support/tyk-streams/bloblang/about#methods" >}}) are supported with Tyk Streams. To demonstrate we're going to change our mapping to [uppercase]({{< ref "/developer-support/tyk-streams/bloblang/methods#uppercase" >}})] the field `message` from our input document:

```coffee
root.foo.bar = this.message.uppercase()
root.foo."buz me".baz = "I like mapping"
```

As you can see the syntax for a method is similar to many languages, simply add a dot on the target value followed by the method name and arguments within brackets. With this method added our output document should look like this:

```json
{
  "foo": {
    "bar": "HELLO WORLD",
    "buz me": {
      "baz": "I like mapping"
    }
  }
}
```

Since the result of any Bloblang query is a value you can use methods on anything, including other methods. For example, we could expand our mapping of `message` to also replace `WORLD` with `EARTH` using the [replace_all]({{< ref "/developer-support/tyk-streams/bloblang/methods#replace-all" >}}) method:

```coffee
root.foo.bar = this.message.uppercase().replace_all("WORLD", "EARTH")
root.foo."buz me".baz = "I like mapping"
```

The method in the example above required some arguments. Methods support both nameless (like above) and named arguments, which are often literal values but can also be queries themselves. For example try out the following mapping using both named style and a dynamic argument:

```coffee
root.foo.bar = this.message.uppercase().replace_all(old: "WORLD", new: this.message.capitalize())
root.foo."buz me".baz = "I like mapping"
```

Functions are methods that don't have a target. A variety of [functions]({{< ref "/developer-support/tyk-streams/bloblang/functions" >}}) are supported with Tyk Streams. Functions are often used to extract information unrelated to the input document or to generate data such as [timestamps]({{< ref "/developer-support/tyk-streams/bloblang/functions#now" >}}) or [UUIDs]({{< ref "/developer-support/tyk-streams/bloblang/functions#uuid_v4" >}})].

The example below shows an example of the `uuid` function which will generate a UUID v4 string:

```coffee
root.foo.bar = this.message.uppercase().replace_all("WORLD", "EARTH")
root.foo."buz me".baz = "I like mapping"
root.foo.id = uuid_v4()
```

### Deletions

Everything in Bloblang is an expression to be assigned, including deletions. Please consult the [deleted function]({{< ref "/developer-support/tyk-streams/bloblang/functions#deleted" >}}) for further details. 

In the example below we will show how to delete the `name` field from the following input:

```json
{
  "name": "fooman barson",
  "age": 7,
  "opinions": ["trucks are cool","trains are cool","chores are bad"]
}
```

If we wanted a full copy of this document without the field `name` then we can assign `deleted()` to it:

```coffee
root = this
root.name = deleted()
```

This would result in the following output:

```json
{
  "age": 7,
  "opinions": [
    "trucks are cool",
    "trains are cool",
    "chores are bad"
  ]
}
```

An alternative way to delete fields is via the [without method]({{< ref "/developer-support/tyk-streams/bloblang/functions#without >}}), our above example could be rewritten as a single assignment `root = this.without("name")`. However, `deleted()` is generally more powerful.

## Variables

Sometimes it is necessary to capture a value for later, but we might not want it to be added to the resulting document. In Bloblang we can achieve this with variables which are created using the `let` keyword, and can be referenced within subsequent queries with a dollar sign prefix:

```coffee
let id = uuid_v4()
root.id_sha1 = $id.hash("sha1").encode("hex")
root.id_md5 = $id.hash("md5").encode("hex")
```

Variables can be assigned any value type, including objects and arrays.

## Unstructured and Binary Data

So far in all of our examples both the input document and our newly mapped document are structured. However, this does not need to be the case. Try assigning some literal value types directly to `root`, such as a string `root = "hello world"`, or a number `root = 5`.

You should notice that when a value type is assigned to the root the output is the raw value, and therefore strings are not quoted. This is what makes it possible to output data of any format, including encrypted, encoded or binary data.

Unstructured mapping is not limited to the output. Rather than referencing the input document with `this`, where it must be structured, it is possible to reference it as a binary string with the [content function]({{< ref "/developer-support/tyk-streams/bloblang/functions#content" >}})]. Try changing your mapping to:

```coffee
root = content().uppercase()
```

Enter a random value in the input panel. The output panel should be an uppercase representation of the value that you entered in the input panel.

## Conditionals

In Bloblang all conditionals are expressions, this is a core principal of Bloblang and will be important later on when we're mapping deeply nested structures.

We will use the following structured input to explore conditionals:

```json
{
  "pet": {
    "type": "cat",
    "is_cute": true,
    "treats": 5,
    "toys": 3
  }
}
```

### If Expression

The simplest conditional is the `if` expression, where the boolean condition does not need to be in parentheses. Let's create a map that modifies the number of treats our pet receives based on a field:

```coffee
root = this
root.pet.treats = if this.pet.is_cute {
  this.pet.treats + 10
}
```

Enter the above example in the input panel and you should see the number of treats in the output increased to 15. Now try changing the input field `pet.is_cute` to `false` and the output treats count should go back to the original 5.

When a conditional expression doesn't have a branch to execute then the assignment is skipped entirely, which means when the pet is not cute the value of `pet.treats` is unchanged (and remains the value set in the `root = this` assignment).

We can add an `else` block to our `if` expression to remove treats entirely when the pet is not cute:

```coffee
root = this
root.pet.treats = if this.pet.is_cute {
  this.pet.treats + 10
} else {
  deleted()
}
```

This is possible because field deletions are expressed as assigned values created with the `deleted()` function. 

### If Statement

The `if` keyword can also be used as a statement in order to conditionally apply a series of mapping assignments, the previous example can be rewritten as:

```coffee
root = this
if this.pet.is_cute {
  root.pet.treats = this.pet.treats + 10
} else {
  root.pet.treats = deleted()
}
```

Converting this mapping to use a statement has resulted in a more verbose mapping as we had to specify `root.pet.treats` multiple times as an assignment target. However, using `if` as a statement can be beneficial when multiple assignments rely on the same logic:

```coffee
root = this
if this.pet.is_cute {
  root.pet.treats = this.pet.treats + 10
  root.pet.toys = this.pet.toys + 10
}
```

### Match Expression

Another conditional expression is `match` which allows you to list many branches consisting of a condition and a query to execute separated with `=>`, where the first condition to pass is the one that is executed:

```coffee
root = this
root.pet.toys = match {
  this.pet.treats > 5 => this.pet.treats - 5,
  this.pet.type == "cat" => 3,
  this.pet.type == "dog" => this.pet.toys - 3,
  this.pet.type == "horse" => this.pet.toys + 10,
  _ => 0,
}
```

Try executing that mapping with different values for `pet.type` and `pet.treats`. Match expressions can also specify a new context for the keyword `this` which can help reduce some of the boilerplate in your boolean conditions. The following mapping is equivalent to the previous:

```coffee
root = this
root.pet.toys = match this.pet {
  this.treats > 5 => this.treats - 5,
  this.type == "cat" => 3,
  this.type == "dog" => this.toys - 3,
  this.type == "horse" => this.toys + 10,
  _ => 0,
}
```

Your boolean conditions can also be expressed as value types, in which case the context being matched will be compared to the value:

```coffee
root = this
root.pet.toys = match this.pet.type {
  "cat" => 3,
  "dog" => 5,
  "rabbit" => 8,
  "horse" => 20,
  _ => 0,
}
```

## Error Handling

There are many ways that a mapping can fail due to variations in the input data. Bloblang makes handling errors easy.

First, let's take a look at what happens when errors *are not* handled. Change your input to the following:

```json
{
  "palace_guards": 10,
  "angry_peasants": "I couldn't be bothered to ask them"
}
```

And change your mapping to something simple like a number comparison:

```coffee
root.in_trouble = this.angry_peasants > this.palace_guards
```

You should see an error in the output window that mentions something like `cannot compare types string (from field this.angry_peasants) and number (from field this.palace_guards)`, which means the mapping was abandoned.

Bloblang provides the [catch]({{< ref "/developer-support/tyk-streams/bloblang/methods#catch" >}}) method, which if we add to any query allows us to specify an argument to be returned when an error occurs. Since methods can be added to any query we can surround our arithmetic with brackets and catch the whole thing:

```coffee
root.in_trouble = (this.angry_peasants > this.palace_guards).catch(true)
```

Now instead of an error we should see an output with `in_trouble` set to `true`. Try changing to value of `angry_peasants` to a few different values, including some numbers.

One of the powerful features of `catch` is that when it is added at the end of a series of expressions and methods it will capture errors at any part of the series, allowing you to capture errors at any granularity. For example, the mapping:

```coffee
root.abort_mission = if this.mission.type == "impossible" {
  !this.user.motives.contains("must clear name")
} else {
  this.mission.difficulty > 10
}.catch(false)
```

Will catch errors caused by:

- `this.mission.type` not being a string
- `this.user.motives` not being an array
- `this.mission.difficulty` not being a number

If any of the above errors occur then `false` will always be returned.

Use the input below to experiment and try breaking some of the fields:

```json
{
  "mission": {
    "type": "impossible",
    "difficulty": 5
  },
  "user": {
    "motives": ["must clear name"]
  }
}
```

Now try out this mapping:

```coffee
root.abort_mission = if (this.mission.type == "impossible").catch(true) {
  !this.user.motives.contains("must clear name").catch(false)
} else {
  (this.mission.difficulty > 10).catch(true)
}
```

This version is more granular and will capture each of the errors individually, with each error given a unique `true` or `false` fallback.

## Validation

<!-- TODO: Link to error handling -->
Failing a mapping with an error allows us to handle the bad document in other ways, such as routing it to a dead-letter queue or filtering it entirely.

Luckily, Bloblang has a range of ways of creating errors under certain circumstances, which can be used in order to validate the data being mapped.

There are some methods, such as [coercion]({{< ref "tyk-docs/content/developer-support/tyk-streams/bloblang/methods#coercion" >}}), that can facilitate validating and coercing fields. For example, consider the following mapping and inputs:

**Mapping**

```coffee
root.foo = this.foo.number()
root.bar = this.bar.not_null()
root.baz = this.baz.not_empty()
```

**Inputs**

```json
{"foo":"nope","bar":"hello world","baz":[1,2,3]}
{"foo":5,"baz":[1,2,3]}
{"foo":10,"bar":"hello world","baz":[]}
```

However, these methods don't cover all use cases. The general purpose error throwing technique is the [throw]({{< ref "/developer-support/tyk-streams/bloblang/functions#throw" >}}) function, which takes an argument string that describes the error. When called it will throw a mapping error that abandons the mapping, unless caught.

For example, we can check the type of a field with the [type]({{< ref "/developer-support/tyk-streams/bloblang/methods#type" >}}), and then throw an error if it is not the type we expected:

```coffee
root.foos = if this.user.foos.type() == "array" {
  this.user.foos
} else {
  throw("foos must be an array")
}
```

Try this mapping out with a few sample inputs, such as those given below:

```json
{"user":{"foos":[1,2,3]}}
{"user":{"foos":"1,2,3"}}
```

## Context

In Bloblang, when we refer to the context we're talking about the value returned with the keyword `this`. At the beginning of a mapping the context starts off as a reference to the root of a structured input document, which is why the mapping `root = this` will result in the document output being the same as the input.

However, in Bloblang there are mechanisms whereby the context might change. We've already seen how this can happen within a `match` expression. Another useful way to change the context is by adding a bracketed query expression as a method to a query, which looks like this:

```coffee
root = this.foo.bar.(this.baz + this.buz)
```

Within the bracketed query expression the context becomes the result of the query that it's a method of. Consequently, within the brackets in the above mapping, the value of `this` points to the result of `this.foo.bar`, and the mapping is therefore equivalent to:

```coffee
root = this.foo.bar.baz + this.foo.bar.buz
```

Subsequently, the `throw` mapping from the validation section above could be rewritten as:

```coffee
root.foos = this.user.foos.(if this.type() == "array" { this } else {
  throw("foos must be an array, but it ain't, what gives?")
})
```

### Naming the Context

Shadowing the keyword `this` with new contexts can look confusing in your mappings, and it also limits you to only being able to reference one context at any given time. As an alternative, Bloblang supports context capture expressions that look similar to lambda functions from other languages, where you can name the new context with the syntax `<context name> -> <query>`, which looks like this:

```coffee
root = this.foo.bar.(thing -> thing.baz + thing.buz)
```

Within the brackets we now have a new field `thing`, which returns the context that would have otherwise been captured as `this`. This also means the value returned from `this` hasn't changed and will continue to return the root of the input document.

## Coalescing

Being able to open up bracketed query expressions on fields leads us onto another cool trick in Bloblang referred to as coalescing. A common scenario is that a value that we wish to obtain could come from one of multiple possible paths due to structural deviations.

To illustrate this problem change the input document to the following:

```json
{
  "thing": {
    "article": {
      "id": "foo",
      "contents": "Some people did some stuff"
    }
  }
}
```

Assume that we wish to flatten this structure with the following mapping:

```coffee
root.contents = this.thing.article.contents
```

Furthermore, assume that articles are only one of many document types we expect to receive, where the field `contents` remains the same but the field `article` could instead be `comment` or `share`. In this case we could expand our map of `contents` to use a `match` expression where we check for the existence of `article`, `comment`, etc in the input document.

A cleaner way of approaching this is through the use of the pipe operator (`|`), which in Bloblang can be used to join multiple queries, where the first to yield a non-null result is selected. Change your mapping to the following:

```coffee
root.contents = this.thing.article.contents | this.thing.comment.contents
```

Now try changing the field `article` in your input document to `comment`. You should see that the value of `contents` remains as `Some people did some stuff` in the output document.

Instead of writing out the full path prefix `this.thing` we can use a bracketed query expression to change the context, giving us more space for adding other fields:

```coffee
root.contents = this.thing.(this.article | this.comment | this.share).contents
```

Furthermore, this can be refined further since the keyword `this` within queries can be omitted and made implicit:

```coffee
root.contents = this.thing.(article | comment | share).contents
```

Finally, we can also add a pipe operator at the end to fallback to a literal value when none of our candidates exists:

```coffee
root.contents = this.thing.(article | comment | share).contents | "nothing"
```

## Advanced Methods

So far we have covered some of the basic principles of mappings. However, what happens when you need to map all of the elements of an array or filter the keys of an object by their values?

Bloblang offers a bunch of advanced methods for [manipulating structured data types]({{< ref "/developer-support/tyk-streams/bloblang/methods#object-array-manipulation" >}}). The remainder of this section examines some advanced methods.

Set your input document to this list of things:

```json
{
  "num_friends": 5,
  "things": [
    {
      "name": "yo-yo",
      "quantity": 10,
      "is_cool": true
    },
    {
      "name": "dish soap",
      "quantity": 50,
      "is_cool": false
    },
    {
      "name": "scooter",
      "quantity": 1,
      "is_cool": true
    },
    {
      "name": "pirate hat",
      "quantity": 7,
      "is_cool": true
    }
  ]
}
```

In the example above, assume that we want to reduce the `things` in our input document to only those that are cool and where we have enough of them to share with our friends. We can do this using a [filter]({{< ref "/developer-support/tyk-streams/bloblang/methods#filter" >}}) method:

```coffee
root = this.things.filter(thing -> thing.is_cool && thing.quantity > this.num_friends)
```

Try running the mapping above and you'll see that the output is reduced. What is happening here is that the `filter` method takes an argument that is a query, and that query will be mapped for each individual element of the array (where the context is changed to the element itself). We have captured the context into a field `thing` which allows us to continue referencing the root of the input with `this`.

The `filter` method requires the query parameter to resolve to a boolean `true` or `false`, and if it resolves to `true` the element will be present in the resulting array, otherwise it is removed.

Being able to express a query argument to be applied to a range in this way is one of the more powerful features of Bloblang, and when mapping complex structured data these advanced methods will likely be a common tool that you'll use.

Another such method is [map_each]({{< ref "/developer-support/tyk-streams/bloblang/methods#map_each" >}}), which allows you to mutate each element of an array, or each value of an object.

Update your input document with the following:

```json
{
  "talking_heads": [
    "1:E.T. is a bad film,Pokemon corrupted an entire generation",
    "2:Digimon ripped off Pokemon,Cats are boring",
    "3:I'm important",
    "4:Science is just made up,The Pokemon films are good,The weather is good"
  ]
}
```

Here we have an array of talking heads, where each element is a string containing an identifer, a colon, and a comma separated list of their opinions. We wish to map each string into a structured object, which we can do with the following mapping:

```coffee
root = this.talking_heads.map_each(raw -> {
  "id": raw.split(":").index(0),
  "opinions": raw.split(":").index(1).split(",")
})
```

The argument to `map_each` is a query where the context is the element, which we capture into the field `raw`. The result of the query argument will become the value of the element in the resulting array, and in this case we return an object literal.

In order to separate the identifier from opinions we perform a `split` by colon on the raw string element and get the first substring with the `index` method. We then do the split again and extract the remainder, and split that by comma in order to extract all of the opinions to an array field.

However, one problem with this mapping is that the split by colon is written out twice and executed twice. A more efficient way of performing the same thing is with the bracketed query expressions we've played with before:

```coffee
root = this.talking_heads.map_each(raw -> raw.split(":").(split_string -> {
  "id": split_string.index(0),
  "opinions": split_string.index(1).split(",")
}))
```

Try updating that map so that only opinions that mention Pokemon are kept 

Discover more methods for manipulating structured data types by consulting the [methods page]({{< ref "/developer-support/tyk-streams/bloblang/methods#object-array-manipulation" >}}).

## Reusable Mappings

Bloblang allows you to create your own custom methods, using the `map` keyword:

```coffee
map parse_talking_head {
  let split_string = this.split(":")

  root.id = $split_string.index(0)
  root.opinions = $split_string.index(1).split(",")
}

root = this.talking_heads.map_each(raw -> raw.apply("parse_talking_head"))
```

The body of a named map is encapsulated within braced brackets. This is a totally isolated mapping where `root` now refers to a new value being created for each invocation of the map and `this` refers to the root of the context provided to the map.

Named maps are executed with the [apply]({{< ref "/developer-support/tyk-streams/bloblang/methods#apply" >}}), which has a string parameter identifying the map to execute. This means it's possible to dynamically select the target map.

As you can see in the above example we were able to use a custom map in order to create our talking head objects without the object literal. Within a named map we can also create variables that exist only within the scope of the map.

Named mappings can invoke themselves recursively, allowing you to define mappings that walk deeply nested structures. For example, the following mapping will remove all values from a document that contain the word "Voldemort" (case insensitive):

```coffee
map remove_voldemort {
  root = match {
    this.type() == "object" => this.map_each(item -> item.value.apply("remove_voldemort")),
    this.type() == "array" => this.map_each(ele -> ele.apply("remove_voldemort")),
    this.type() == "string" => if this.lowercase().contains("voldemort") { deleted() },
    this.type() == "bytes" => if this.lowercase().contains("voldemort") { deleted() },
    _ => this,
  }
}

root = this.apply("remove_voldemort")
```

Try running the mapping above on the following input document:

```json
{
  "summer_party": {
    "theme": "the woman in black",
    "guests": [
      "Emma Bunton",
      "the seal I spotted in Trebarwith",
      "Voldemort",
      "The cast of Swiss Army Man",
      "Richard"
    ],
    "notes": {
      "lisa": "I don't think voldemort eats fish",
      "monty": "Seals hate dance music"
    }
  },
  "crushes": [
    "Richard is nice but he hates pokemon",
    "Victoria Beckham but I think she's taken",
    "Charlie but they're totally into Voldemort"
  ]
}
```

## Final Words

That's it for this walkthrough, if you're hungry for more then I suggest you re-evaluate your priorities in life. If you have feedback then please [get in touch][community], despite being terrible people the Benthos community are very welcoming.

[guides.getting_started]: /docs/guides/getting_started
[blobl.methods]: /docs/guides/bloblang/methods
[blobl.methods.uppercase]: /docs/guides/bloblang/methods#uppercase
[blobl.methods.replace_all]: /docs/guides/bloblang/methods#replace_all
[blobl.methods.catch]: /docs/guides/bloblang/methods#catch
[blobl.methods.without]: /docs/guides/bloblang/methods#without
[blobl.methods.type]: /docs/guides/bloblang/methods#type
[blobl.methods.coercion]: /docs/guides/bloblang/methods#type-coercion
[blobl.methods.object-array-manipulation]: /docs/guides/bloblang/methods#object--array-manipulation
[blobl.methods.filter]: /docs/guides/bloblang/methods#filter
[blobl.methods.map_each]: /docs/guides/bloblang/methods#map_each
[blobl.methods.apply]: /docs/guides/bloblang/methods#apply
[blobl.functions]: /docs/guides/bloblang/functions
[blobl.functions.deleted]: /docs/guides/bloblang/functions#deleted
[blobl.functions.content]: /docs/guides/bloblang/functions#content
[blobl.functions.env]: /docs/guides/bloblang/functions#env
[blobl.functions.now]: /docs/guides/bloblang/functions#now
[blobl.functions.uuid_v4]: /docs/guides/bloblang/functions#uuid_v4
[blobl.functions.throw]: /docs/guides/bloblang/functions#throw
[blobl.literals]: /docs/guides/bloblang/about#literals
[configuration.error_handling]: /docs/configuration/error_handling
[configuration.unit_testing]: /docs/configuration/unit_testing
[community]: /community
