---
title: "UDG Getting Started"
date: 2020-06-03
menu:
  main:
    parent: "Universal Data Graph"
weight: 1
url: /universal-data-graph/getting-started-with-udg/
aliases:
    - /universal-data-graph/datasources/
---

{{< youtube TGITEGnJH6c >}} 

In this getting started tutorial we will combine 2 different HTTP services (Users and Reviews) into one single unified UDG API. Instead of querying these two services separately (and probably merging their responses later) we'll use UDG to get result from both the API's in one single response.

### Prerequisites 

- Access to Tyk Dashboard
- Node.JS v.13^ (only to follow this example)

### Running example services locally

{{< youtube 9UEgR0VTVmE >}} 

Clone repo

```bash
git clone https://github.com/jay-deshmukh/example-rest-api-for-udg.git
```

Run it locally
```bash
cd example-rest-api-for-udg
```

```bash
npm i
```

```bash
npm run build
```

```bash
npm start
```

You should see following in your terminal

```
Users Service Running on http://localhost:4000
Review service running on http://localhost:4001
```

<hr/>

Now that we have Users service running on port `4000` and Reviews service running on port `4001` let's see how we can combine these two into one single UDG API in following tutorial.