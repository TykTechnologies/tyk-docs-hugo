# Tyk Documentation

Contains the [Tyk Documentation](https://tyk.io/docs/) source.

## How to Contribute

We recommend contributing in the following way:

* Fork this repository
* Clone the forked repository on your machine
* Create a remote branch, e.g `git remote add upstream https://github.com/TykTechnologies/tyk-docs.git`
* Fetch from the remote branch `git fetch upstream`
* Rebase your branch with the latest remote branch content `git rebase upstream/master`

The following guide briefly explains how to work with Hugo, you would then need push to your forked repository and then create a Pull Request to Tyk's `master` branch.

## How to Use

Our Documentation is constructed using [Hugo](http://gohugo.io/).

### To Install Hugo 

1. [Install Hugo](http://gohugo.io/getting-started/installing/) - v0.60 or above
2. Clone this repository 
3. Run `hugo server --theme=tykio --buildDrafts` from the `tyk-docs/tyk-docs` directory
4. Go to  http://localhost:1313/docs to view the docs locally.


## Adding and Editing Content

The docs content lives in `tyk-docs/content`.

### Add a new Section

1. Add a new folder in within the `tyk-docs/tyk-docs/content/` Directory. For example `new-section`
2. Within your new folder create a markdown file with the same name as the folder (including any hyphens). So for the above folder, create `new-section.md`. This file will be converted to the equivalent of an `index.html` file.
3. You can then create other markdown files within that directory, that you can name as you want.

![readme-example](https://user-images.githubusercontent.com/1983518/36219727-457c16f4-11b0-11e8-9839-946ef00c4655.png)

### Front Matter

For each new file, you need to add YAML formated [Front Matter](http://gohugo.io/content-management/front-matter/):

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

You can create a dynamic, nested navigation hierarchy simply by changing the `parent` field to the name of the parent page. Note, **these names must be unique**.

For a new top-level page (like `new-section.md` in the example above), the front matter looks like this:

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

The content itself is just markdown that follows the front matter block. When you add and edit new content, Hugo should auto-reload and you should be able to see the changes live in your browser (if not, refresh). Sometimes Hugo gets confused and you may need to re-run it.

## License

Tyk is released under the MPL v2.0 please see the [license file](LICENSE.md) for a full version of the license.

## The Pipeline

If you push to this repository, Buddy Works will compile and push the static site to our dev server (details in slack).
