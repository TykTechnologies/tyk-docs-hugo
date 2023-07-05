# Tyk Documentation

Contains the [Tyk Documentation](https://tyk.io/docs/) source.

## How To Contribute?

Using Github GUI in the browser or local dev env, this is the question!

### 1. GitHub GUI browser
Contributing to the docs via the browser is fast and easy. 
GH provides great DX for making updates, committing and creating PRs via the browser. The DX for reviewing PRs is also pretty powerful.

#### When to use it?
Use Github GUI browser when you:
- have simple and only a few edits of the markdown files. 
- already know the syntax for adding internal links and adding images. 
- already know what you are going to write and you **don't** need many iterative commits to see if the result looks okay. In this case, using a local environment will be much faster (explain in the next section)

#### How to use it?
Will briefly explain it as it is quite trivial:
1. Via the GUI you can simply click the pencil icon to start editing, then check the differences, click commit to commit the changes to a new branch and eventually create a PR. 
2. Check that the CI jobs started running. These jobs run tests on the website including your changes. Running CI jobs are displayed in yellow. 
3. Once the CI job finishes it will turn green. Upon completion, you will see a preview link that you should use to check your changes on a real deployment of the Tyk docs website.


### 2. Local development environment
Local environment means, checking out the tyk-docs repo and updating the files using an editor or an IDE. This allows you to test the changes by running Hugo locally and check for errors in Hugo or in the website Hugo generated.

#### When to use it?
Using the browser is not always enough and you sometimes need to checkout the repo and work locally.
You normally favour using a local environment when you need to:
- test things yourself before you push them
- repeatedly push changes and test the website

Doing so by **running Hugo locally will save you a lot of time** since it takes the CI a few minutes to update the deployment with the latest changes and finish its test before it becomes green. 

#### Use cases for local development environment
When you need to:
- test things yourself before you push them
- check that the image you added work
- see how images are rendered in the page
- check that the internal links you added work
- are not sure about the syntax of links or images
when you work on many pages
- When adding new files, it's easier to run it locally sinceyou ca, not sure internal links format, making changes in many files that touch exisitng links and headlines, and mainly nee then you might feel  

#### How to use it?

For internal Tyklings the recommended way to contribute is from a pull request branch in the [tyk-docs](https://github.com/TykTechnologies/tyk-docs) repository.

For external contributions, we recommend contributing to Tyk in the following way:

- Fork this repository
- Clone the forked repository on your machine
- Create a remote branch, e.g `git remote add upstream https://github.com/TykTechnologies/tyk-docs.git`
- Fetch from the remote branch `git fetch upstream`
- Rebase your branch with the latest remote branch content `git rebase upstream/master`

## Installing Hugo

### Run Hugo with Docker
1. Install [Docker](https://docs.docker.com/get-docker/)
2. Run `docker-compose up` from the project directory

### Run Hugo Locally
1. Install [Hugo v0.110.0+extended or greater](https://gohugo.io/installation/)
2. Run `hugo server --theme=tykio --buildDrafts --enableGitInfo` from the `tyk-docs/tyk-docs` directory
3. Go to  [http://localhost:1313/docs/nightly/](http://localhost:1313/docs/nightly/) to view the docs locally
4. The content itself is just markdown that follows the front matter block. After making a change, Hugo should auto-reload and you will be able to see the changes live in your browser. If not, refresh. Sometimes Hugo gets confused and you may need to re-run it

## Getting Started

This section briefly explains how to work with [Hugo](http://gohugo.io/) for creating content in the Tyk Docs repository.

To get started:
1. Clone this repository 
2. Navigate to the project directory

The docs content lives in `tyk-docs/content`.

### Adding a New Section and/or a New Page

1. Add a new folder within the `tyk-docs/tyk-docs/content` directory. For example `new-section`.
2. Within the root folder of the repository, create a markdown file using the `hugo new` command from your terminal. For the above example you would run `hugo new --configDir tyk-docs new-section/new-section.md`. This file will be converted to the equivalent of an `index.html` file.
3. You can then create other markdown files within that directory, that you can name as you want.

![readme-example](https://user-images.githubusercontent.com/1983518/36219727-457c16f4-11b0-11e8-9839-946ef00c4655.png)

### Front Matter

For each new file created via `hugo new`, the following YAML formatted [Front Matter](http://gohugo.io/content-management/front-matter/) is added:

```markdown
---
title: "New Section"
date: 2021-02-10
tags: [""]
description: ""
menu: "main"
weight: 0
---

**Insert Lead paragraph here.**
```

- `title` is taken from the name of the markdown file created
- `date` is auto populated in a year-month-day format
- `tags` are used to create meta keywords in the HTML output, and are added in the following format - `tags: ["tag 1", "tag 2", "tag 3"]`
- `description` is used for the meta description in the HTML output
- `menu` is used to place the page in the correct place within the navigation hierarchy. By default a new page is assigned to the root level (`main`)
- `weight` is used to order pages within a section of the menu with `0` being the top level page within a section.

You can create a dynamic, nested navigation hierarchy simply by changing the `parent` field to the name of the parent page. Note, **these names must be unique**.

Example front matter for a page:

```markdown
---
title: "Test"
date: 2021-02-10
tags: ["Tyk", "advanced-configuration", "Dashboard"]
description: "Testing the description and tagging functionality in Tyk"
menu:
  main:
    parent: "Advanced Configuration"
weight: 10
---
```

### Links

All links should be defined using the `ref` function. This ensures that links will be correct and will never break docs.

As added value you can specify the file path relative to the "content" folder. However, because our URL structure is synced with file structure, it will be same as URL path.

Example:

```
[Link title]({{< ref "apim/open-source" >}})
```

### Images

All images should be uploaded to `assets/img` folder (do not confuse it with `static/img`).

All images should be defined using `img` tag.
Example:

```
{{< img src="/img/docker.png" alt="Docker" width="500px" >}}
```

`src` and `alt` parameters are required for images.

## Using Shortcodes

Various shortcodes are used within the Tyk documentation to facilitate writing content.

### Grid shortcode

You can find 3 sizes of grid layouts. This is used in conjunction with the badges shortcode

1. grid
2. mid
3. big

#### Grid

```
{{< grid >}}

Content goes here

{{< /grid >}}
```

#### Mid

```
{{< grid type="mid" >}}

Content goes here

{{< /grid >}}
```

#### Big

```
{{< grid type="big">}}

Content goes here

{{< /grid >}}
```

### Badge

The badge shortcode can be used in differing ways to populate the 3 grid types. We have used these on the default docs [landing page](https://tyk.io/docs/) and the [Tyk Cloud landing page](https://tyk.io/docs/tyk-cloud). The examples are from the default landing page.

#### Quickstart Installation Badge

```
## Quickstart Installation

{{< grid >}}

{{< badge read="15 mins" href="/docs/tyk-cloud/" image="/docs/img/tyk-cloud.svg" >}}
Sign up for our new, next level **SaaS** product.
{{< /badge >}}

{{< badge read="15 mins" href="/docs/getting-started/with-tyk-on-premises/installation/on-aws/" image="/docs/img/aws.png">}}
Install our **On-Premises** product on AWS.
{{< /badge >}}

{{< badge read="10 mins" href="/docs/getting-started/installation/with-tyk-on-premises/docker/" image="/docs/img/docker.png">}}
Install our **On-Premises** product with Docker.
{{< /badge >}}

{{< badge read="10 mins" href="/docs/getting-started/installation/with-tyk-on-premises/kubernetes/" image="/docs/img/k8s.png">}}
Install our **On-Premises** product with Kubernetes.
{{< /badge >}}

{{< /grid >}}
```

![image](https://user-images.githubusercontent.com/1983518/92095700-e4261100-edcd-11ea-904d-e7ba6efa62c8.png)

#### Tyk Stack Badge

This badge uses the `mid` grid shortcode type.

```
## The Tyk Stack

{{< grid type="mid" >}}

{{< badge href="/docs/getting-started/tyk-components/gateway/" image="/docs/img/diagram.png" imageStyle="height:150px" >}}
**Tyk Gateway**

The primary application for Community Edition users and Pro users alike, the Tyk Open Source API Gateway does all the heavy lifting of actually managing your requests.
{{< /badge >}}

{{< badge href="/docs/getting-started/tyk-components/dashboard/" image="/docs/img/diagram.png" imageStyle="height:150px" >}}
**Tyk Dashboard**

The Tyk Dashboard is the visual GUI and analytics platform for Tyk. It provides an easy-to-use management interface for managing a Tyk installation as well as clear and granular analytics.
{{< /badge >}}

{{< badge href="/docs/getting-started/tyk-components/pump/" image="/docs/img/diagram.png" imageStyle="height:150px" >}}
**Tyk Pump**

The Tyk Pump is our open source analytics purger that moves the data generated by your Tyk nodes to any back-end. It is primarily used to display your analytics data in the Tyk Dashboard.
{{< /badge >}}

{{< badge href="/docs/getting-started/tyk-components/developer-portal/" image="/docs/img/diagram.png" imageStyle="height:150px" >}}
**Tyk Developer Portal**

The Tyk Developer Portal is a small CMS-like system that enables you to expose a facade of your APIs and then allow third-party developers to register and use your APIs.
{{< /badge >}}

{{< badge href="/docs/getting-started/tyk-components/mdcb/" image="/docs/img/diagram.png" imageStyle="height:150px" >}}
**MDCB**

The Multi Data Centre Bridge allows for centralised management of multiple independent Tyk clusters and the seamless transition of APIs between environments, availability zones and segmented nodes.
{{< /badge >}}

{{< badge href="/docs/getting-started/tyk-components/identity-broker/" image="/docs/img/diagram.png" imageStyle="height:150px" >}}
**Identity Broker**

The Tyk Identity Broker (TIB) is a microservice portal that provides a bridge between various Identity Management Systems and your Tyk installation.
{{< /badge >}}

{{< /grid >}}
```

![image](https://user-images.githubusercontent.com/1983518/92095894-28b1ac80-edce-11ea-9f48-27ce0ba7d75c.png)

#### Features Badge

```
## Feature Setups

{{< grid >}}

{{< badge title="Security" href="/docs/basic-config-and-security/security/tls-and-ssl/" >}}
#### TLS & SSL

TLS connections are supported for all Tyk components
{{< /badge >}}

{{< badge title="Dashboard" href="/docs/tyk-dashboard-analytics/" >}}
#### Analytics

Learn how to segment and view your API traffic and activity
{{< /badge >}}

{{< badge title="New in v3.0" href="/docs/graphql/" >}}
#### GraphQL

Tyk supports GraphQL natively. Proxy to existing service or build it from scratch.
{{< /badge >}}

{{< badge title="Integration" href="/docs/advanced-configuration/integrate/sso/" >}}
#### Single Sign On

Log into dashboard and portal with your existing IDP.
{{< /badge >}}

{{< /grid >}}
```

![image](https://user-images.githubusercontent.com/1983518/92095959-3f580380-edce-11ea-885d-0861e2274641.png)

#### Resources Badge

This uses the `big` grid shortcode type.

```
## Resources

{{< grid type="big" next="/adasd">}}

{{< badge title="Tyk Cloud" href="/asd" image="/docs/img/blog_placeholder.png" read="10 mins" >}}
#### Feature

Lorem ipsum Dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
{{< /badge >}}

{{< badge title="API Manager" href="/asd" read="10 mins" >}}
## Lorem ipsum Dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
{{< /badge >}}

{{< badge title="Tyk Gateway" href="/asd" read="10 mins" image="/docs/img/blog_placeholder.png" >}}
#### Feature

Lorem ipsum Dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
{{< /badge >}}

{{< badge title="API Manager" href="/asd" read="10 mins" image="/docs/img/blog_placeholder.png" >}}
#### Feature

Lorem ipsum Dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
{{< /badge >}}

{{< badge title="API Manager" href="/asd" read="10 mins" image="/docs/img/blog_placeholder.png" >}}
#### Feature

Lorem ipsum Dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
{{< /badge >}}

{{< /grid >}}
```

![image](https://user-images.githubusercontent.com/1983518/92096033-57c81e00-edce-11ea-8d15-193f89a7f6da.png)

### Buttons

We have 3 button types that can be used in conjuction with the Grid layout shortcode. These all aligh centrally and use the Tyk colour palette.

```
{{< button href="/docs/basic-config-and-security/" color="black" content="More Tyk Configuration" >}}

{{< button href="/docs/getting-started/key-concepts/" color="red" content="Tyk Concepts" >}}

{{< button href="/docs/getting-started/installation/" color="green" content="All installation options" >}}
```

![image](https://user-images.githubusercontent.com/1983518/92096160-775f4680-edce-11ea-8d67-3106e482ad4a.png)
![image](https://user-images.githubusercontent.com/1983518/92096210-8645f900-edce-11ea-9ccd-b0a013e6f582.png)
![image](https://user-images.githubusercontent.com/1983518/92096267-98279c00-edce-11ea-9a50-b20aa016e189.png)

### Note and Warning shortcodes

Use these instead of the usual markdown blockquote style.

#### Note

```
{{< note success >}}
**Note**

You need to have at least one Edge Gateway with a *Deployed* status connected to your Control Plane.
{{< /note >}}
```

![image](https://user-images.githubusercontent.com/1983518/104920964-8d8e2d80-5990-11eb-8bc6-7cae78bf54dd.png)

#### Warning

```
{{< warning success >}}
**Warning**

We recommend you restrict your IAM user as much as possible before sharing the credentials with any 3rd party, including Tyk Cloud. See [IAM User Permissions](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_change-permissions.html) for more details.
{{< /warning >}}
```

![image](https://user-images.githubusercontent.com/1983518/104921245-f70e3c00-5990-11eb-927c-916204d90325.png)

See the [Hugo Docs](https://gohugo.io/content-management/shortcodes/#use-hugos-built-in-shortcodes) for other built in shortcodes.

### Tooltips shortcode

You can add tooltips by using the following shortcode:

{{< tooltip >}}some link text definition{{< definition >}}
the tooltip text to display{{< /definition >}}{{< /tooltip >}}

![tooltip-demo](https://user-images.githubusercontent.com/1983518/109049790-916c4880-76d0-11eb-8b3a-ad107d317468.gif)

## License

Tyk is released under the MPL v2.0 please see the [license file](LICENSE.md) for a full version of the license.

## The Pipeline

When you create a PR in this repository:

1. CI pipeline will run tests (Hugo and Netlify).
   <img width="864" alt="image" src="https://user-images.githubusercontent.com/3155222/221001455-a196c09f-55d9-4c50-acc2-4ae7c5fd6343.png">

2. Netlify will create a version of the website from your PR and provide you with a link:

- Don't forget to add `/docs/nightly` to the URL.
  <img width="948" alt="image" src="https://user-images.githubusercontent.com/3155222/221002201-5b0c8d49-8cc3-497c-b188-ffafa63b57f9.png">

3. Verifing your changes in the Netlify build:

- There's no search in this Netlify build. To find your changes copy the from the file path, the text after `/content` till the end, add it to the netlify URL after `/docs/nightly` and delete `.md`.
- For example to see doc page https://github.com/TykTechnologies/tyk-docs/blob/master/tyk-docs/content/tyk-self-managed/install.md in the Netlify build, copy from this path this bit `/tyk-self-managed/install` and paste after `/docs/nightly` so you get the url https://deploy-preview-2330--tyk-docs.netlify.app/docs/nightly/tyk-self-managed/install/
