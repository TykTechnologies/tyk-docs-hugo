---
date: 2017-03-27T16:30:52+01:00
title: Tyk logs scraped with Datadog agent show up as errors under Datadog logs 
menu:
  main:
    parent: "Frequently Asked Questions"
weight: 0 
---

To allow Datadog Agent to scrape the logs of your Tyk deployment correctly.
We need to create a pipeline to process the data and allow Datadog to understand that data.

To do that, we need to access the `/logs/pipelines` path on your datadog web application.
This will take us to the pipeline configuration page.
In here, we will create a new pipeline.
For the filter section, use `Service:tyk-*` this will capture logs for any of the Tyk related services.

{{< img src="/img/faq/datadog-logs-showup-as-errors/create-pipeline.png" alt="Create Datadog Logs Pipeline to process Tyk services' logs" >}}

Next, we will need to add a processor to the pipeline.

{{< img src="/img/faq/datadog-logs-showup-as-errors/add-processor.png" alt="Create Datadog Logs Pipeline to process Tyk services' logs" >}}

Select the Grok Parser processor type, give it a name and click on the `Parse My Logs` button and `Create` .

{{< img src="/img/faq/datadog-logs-showup-as-errors/create-grok-parser-processor.png" alt="Create pipeline processor to parse grok statements" >}}

Lastly, add another processor to the pipeline. Select the Status Remapper processor type, give it a name and set the status attribute to `level` then `Create`.

{{< img src="/img/faq/datadog-logs-showup-as-errors/create-status-remapper-processor.png" alt="Create pipeline processor to remap the status of the log to level attribute value" >}}

The Tyk logs statuses should now be shown under the right status.

Contact us to learn more:

{{< button_left href="https://tyk.io/contact/" color="green" content="Contact us" >}}
