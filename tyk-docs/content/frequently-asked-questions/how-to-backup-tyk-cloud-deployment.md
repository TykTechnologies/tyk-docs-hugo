---
date: 2023-08-15T09:37:14+01:00
title: How are backups managed in Tyk Cloud.
menu:
  main:
    parent: "Frequently Asked Questions"
weight: 0 
---

#### How can I track and audit changes made to Tyk Dashboard configurations"?

To track changes in Dashboard configurations, please submit a [support ticket](https://support.tyk.io/hc/en-gb/articles/8671452599708-Ticket-Submission-Guide). No configuration changes will occur without your explicit request.

#### If there's a configuration error or an unwanted change, can I easily revert to a previous API or Policy configuration? What are the options or best practices for effective rollbacks?

You can configure [Tyk-Sync]({{< ref "/api-management/automations#synchronize-tyk-environment-with-github-repository" >}}) to synchronise APIs and Policies with any version control system, like GitHub or GitLab and use it to perform roll back. Keys are not synchronised with Tyk Sync.
