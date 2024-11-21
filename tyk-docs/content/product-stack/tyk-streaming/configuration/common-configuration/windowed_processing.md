---
title: Windowed Processing
description: Explains windowed processing
tags: [ "Tyk Streams", "Window", "Windowed Processing" ]
---

A window is a batch of messages made with respect to time, with which we are able to perform processing that can analyse or aggregate the messages of the window. This is useful in stream processing as the dataset is never "complete", and therefore in order to perform analysis against a collection of messages we must do so by creating a continuous feed of windows (collections), where our analysis is made against each window. 

For example, given a stream of messages relating to cars passing through various traffic lights:

```json
{
  "traffic_light": "cbf2eafc-806e-4067-9211-97be7e42cee3",
  "created_at": "2021-08-07T09:49:35Z",
  "registration_plate": "AB1C DEF",
  "passengers": 3
}
```

Windowing allows us to produce a stream of messages representing the total traffic for each light every hour:

```json
{
  "traffic_light": "cbf2eafc-806e-4067-9211-97be7e42cee3",
  "created_at": "2021-08-07T10:00:00Z",
  "unique_cars": 15,
  "passengers": 43
}
```

## Creating Windows

The first step in processing windows is producing the windows themselves, this can be done by configuring a window producing buffer after your input:

### System

A *system_window* buffer creates windows by following the system clock of the running machine. Windows will be created and emitted at predictable times, but this also means windows for historic data will not be emitted and therefore prevents backfills of traffic data:

```yaml
input:
  kafka:
    addresses: [ TODO ]
    topics: [ traffic_data ]
    consumer_group: traffic_consumer
    checkpoint_limit: 1000

buffer:
  system_window:
    timestamp_mapping: root = this.created_at
    size: 1h
    allowed_lateness: 3m
```

## Grouping

With a window buffer chosen our stream of messages will be emitted periodically as batches of all messages that fit within each window. Since we want to analyse the window separately for each traffic light we need to expand this single batch out into one for each traffic light identifier within the window. For that purpose we have two processor options: [group_by]({{< ref "/product-stack/tyk-streaming/configuration/processors/group-by" >}}) and [group_by_value]({{< ref "/product-stack/tyk-streaming/configuration/processors/group-by-value" >}}).

In our case we want to group by the value of the field `traffic_light` of each message, which we can do with the following:

```yaml
pipeline:
  processors:
    - group_by_value:
        value: ${! json("traffic_light") }
```

## Aggregating

Once our window has been grouped the next step is to calculate the aggregated passenger and unique cars counts. For this purpose the [Bloblang query language]({{< ref "/product-stack/tyk-streaming/guides/bloblang/overview" >}}) comes in handy as the method [from_all]({{< ref "/product-stack/tyk-streaming/guides/bloblang/methods/general#from_all" >}}) executes the target function against the entire batch and returns an array of the values, allowing us to mutate the result with chained methods such as sum:

```yaml
pipeline:
  processors:
    - group_by_value:
        value: ${! json("traffic_light") }

    - mapping: |
        let is_first_message = batch_index() == 0

        root.traffic_light = this.traffic_light
        root.created_at = @window_end_timestamp
        root.total_cars = if $is_first_message {
          json("registration_plate").from_all().unique().length()
        }
        root.passengers = if $is_first_message {
          json("passengers").from_all().sum()
        }

        # Only keep the first batch message containing the aggregated results.
        root = if ! $is_first_message {
          deleted()
        }
```

[Bloblang]({{< ref "/product-stack/tyk-streaming/guides/bloblang/overview" >}}) is very powerful, and by using [from]({{< ref "/product-stack/tyk-streaming/guides/bloblang/methods/general#from" >}}) and [from_all]({{< ref "/product-stack/tyk-streaming/guides/bloblang/methods/general#from_all" >}}) it's possible to perform a wide range of batch-wide processing.
