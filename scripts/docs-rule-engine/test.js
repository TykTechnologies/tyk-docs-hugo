import fs from 'fs';
import yaml from 'js-yaml';
import { evaluate } from './evaluate.js';

const md = `---
title: "My Awesome Blog Post"
description: "A quick overview of the best practices for Hugo frontmatter."
tags:
  - Hugo
  - Markdown
categories:
  - Development
  - Static Site Generators
slug: "hugo-frontmatter-tips"
draft: false
type: "post"
layout: "blog-post"
author: "Sharad Regoti"
featuredImage: "/images/blog/hugo-frontmatter.png"
aliases:
  - "/old-url/"
summary: "Learn the essential fields to include in Hugo frontmatter for effective metadata management."
---

### API Documentation
<!-- Required. Update the link to the Gateway "tyk-gateway-api" or dashboard "tyk-dashboard-api" and the Postman collection

If there were changes in any of Tyk’s API docs:

- Have API endpoints been documented in the release note summary and changelog?             
- Has a link to the endpoint documentation being included?
- Has the benefit of the new/updated endpoint been explained in the release highlights and changelog?
-->
- [Tyk Gateway API]({{<ref "tyk-gateway-api/" >}})
- [Postman Collection](https://www.postman.com/tyk-technologies/workspace/tyk-public-workspace/overview)

<!-- Sample ID: 1 -->
[Open Source]("apim/open-source")

<!-- Sample ID: 2 -->
[TYK's installation]({{< ref "tyk-gateway-api/" >}})
[TYK's installation](https://google.com)
[TYK's installation]("apim/open-source")

<!-- Sample ID: 3 -->
# Heading 1
##### Heading 5
###### Heading 6

<!-- Sample ID: 4 -->
## steps for configuration
## Installation Steps


<!-- Sample ID: 5 -->
{{< img src="/img/docker.png" alt="Docker" width="500px" >}}

{{< youtube rIGnIQ235As >}}

{{< youtube rIGnIQ235As alt="" >}}

<!-- Sample ID: 6 comment -->

<!-- Sample ID: 9 -->
#### Running in k8s

#### Running in MDCB

## Install and Configure

`;

(async () => {
    // Read the YAML file
    const fileContents = fs.readFileSync('./config.yaml', 'utf8');
    
    // Parse the YAML file
    const config = yaml.load(fileContents);

    // printMarkdown(md)

    evaluate(config, md)
})()