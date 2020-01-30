---
date: 2017-05-09T14:39:43Z
Title: Installation on Heroku
menu:
  main:
    parent: "With Tyk Multi-Cloud"
weight: 4
---

> **Note:** This is a Tyk Community Contribution.

## Prerequisite

*   Our Docker image - see [Docker Pro Demo](/docs/getting-started/installation/with-tyk-on-premise/docker/docker-pro-demo/docker-pro-demo/) for more details.

### Steps

1.  From the Heroku CLI perform the following (Where APPNAME is your app): 
    *   heroku plugins:install heroku-container-registry
    *   heroku container:login
    *   docker tag tykio/tyk-hybrid-docker registry.heroku.com/APPNAME/web
    *   docker push registry.heroku.com/APPNAME/web
2.  You then need to set the following environment variables: 
    *   APIKEY
    *   BINDSLUG: 1
    *   ORGID
    *   REDISHOST
    *   REDISPW
    *   RPORT
    *   SECRET 

> **NOTE:** This will only work with port 80 deployments and other ports will be ignored.