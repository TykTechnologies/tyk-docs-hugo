---
title: "Tyk Cloud FAQs"
date: 2020-07-30
weight: 7
menu:
  main:
    parent: "Troubleshooting & Support"
aliases:
  - tyk-cloud/troubleshooting-&-support/faqs
  - /tyk-cloud/troubleshooting-support/faqs/
---

## Introduction

We have put together some FAQs to help you get to grips with Tyk Cloud.

## Q1: Is a Cloud Data Plane Deployment considered highly available? Do I need to deploy multiple Cloud Data Planes to a single Data Center?

A: On a Production plan and higher there are at least two Gateway instances at all times, usually in different
availability zones within a single region (in cloud provider terms).

## Q2: What are the performance benchmarks of a single Cloud Data Plane?

A: In Phase 2 we plan to allow users to choose from a pool of "runtimes" that provide different performance targets, so
they'll be able to have a Tyk Cloud environment with Cloud Data Planes that can sustain more load and then another environment
(e.g. for testing) that sustains less.

## Q3: How can I geo-load balance across multiple Cloud Data Planes? Why should I want to?

A: The use case to deploy multiple Cloud Data Planes is either segregating regional traffic and/or segregating APIs.
This doesn't necessarily concern High Availability.

The number of actual Gateway instances within a single Cloud Data Plane deployment varies, auto-scales and load balances depending
on the plan.

If you deploy several Cloud Data Planes and want to use it to e.g. geo-load balance it's currently your responsibility to put such
a system into place, but we have plans to help with this in later phases.

## Q4: What instance sizes/VMs does a Gateway run on?

A: You won't need to worry. We abstract all the resources and only provide performance "targets". See Q2.

## Q5: Can I connect my own Hybrid Gateways?

A: Yes. The MDCB Ingress URL is given in the Control Plane details page, which allows for connecting a Hybrid Gateway.

## Q6: Can we use SSO in the Dashboard and/or Portal?

A: Yes, as of v3.0.0, TIB is integrated into Tyk Dashboard, meaning that once a Control Plane is deployed, a user can
go into the Identity Management section of Tyk Dashboard and setup SSO with their IdP for both the Dashboard and
Developer Portal.

## Q7: How do I view Gateway/Dashboard logs for troubleshooting?

A: This will be exposed in later phases per deployment.

## Q8: How do Segment tags work with Tyk Cloud?

A: When a Cloud Data Plane is deployed, the tag 'edge' and a location tag are automatically generated for the Cloud Data Plane. You use these tags to connect your API to the appropriate Cloud Data Plane. It works as follows:

* Add the **edge** tag to your API to connect it to all Cloud Data Planes within the Control Plane.
* Add the location tag to your API to connect it to only Cloud Data Planes with that location within the Control Plane.

To add either of the tags, see [Adding an API]({{< ref "tyk-cloud/getting-started-tyk-cloud/first-api#steps-to-add-an-api-in-tyk-cloud" >}}) in the Getting Started section.

{{< warning success >}}
**Warning**
  
You must add one of the above tags to any API you add to your Control Plane Dashboard.
{{< /warning >}}
