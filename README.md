# Tyk Documentation

Contains the Tyk Documentation source.

## How to contribute

We recommend to follow the below flow

* Fork this repository
* Clone the forked repository on your machine
* Create a remote branch, e.g `git remote add upstream https://github.com/TykTechnologies/tyk-docs.git`
* Fetch from the remote branch `git fetch upstream`
* Rebase your branch with the latest remote branch content `git rebase upstream/master`

The following guide briefly explains how to work with Hugo, you would then need push to your forked repository and then create a Pull Request to Tyk's `master` branch.

## How to use

This pipeline uses [hugo](http://gohugo.io/).

**To use:**

1. Install Hugo - v0.20.2 or later
2. Clone this repository 
3. Run `hugo server --theme=tykio --buildDrafts`
4. Go to  http://localhost:1313/docs to visit the landing page.


## Adding and editing content

In the directory `tyk-docs/content` there is the content of the documentation.

To create a new page, you need to run:

`hugo new your-full-path/index.md`

we use `index.md` as if it were an `index.html` file.

In each file there is a "front matter": in hugo-speak:

```
---
date: 2017-03-08T18:15:57+13:00
title: Create an Account
menu:
  main:
    parent: 'Tyk Cloud'
weight: 5
---
```

You can create a dynamic, nested navigation heirarchy simply by changing the `parent` field to the name of the parent page (note,  these names *must be unique*)

To create a new top-level page, the front matter just looks like this:

```
--- 
date: 2017-03-08T18:15:30+13:00
title: Get started with Tyk
menu: "main"
weight: 0
url: "/get-started-with-tyk"
---
```

Notice that we just define the `menu` field as a simple string. 

## Content

The content itself is just markdown that follows the front matter block. When you add and edit new content, hugo should auto-reload and you should be able to see the changes live in your browser (if not, refresh). Sometimes hugo gets confused and you need to re-run it.

## License

Tyk is released under the MPL v2.0 please see the [license file](LICENSE.md) for a full version of the license.

## The pipeline

If you push to this repository, Buddy Works will compile and push the static site to our dev server (details in slack).
