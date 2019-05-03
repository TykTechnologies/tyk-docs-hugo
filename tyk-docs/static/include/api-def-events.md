

* `event_handlers`: This adds the ability to configure an API with event handlers to perform specific actions when an event occurs. 

* `events`: Each event handler that is added to the event_handlers.events section, is mapped by the event type, and then a list of each handler configuration, defined by the handler name and the handler metadata (usually some kind of configurable options for the specific handler)

```{.json}
"event_handlers": {
  "events": {
    "EVENT_NAME": [
      {
        "handler_name": "HANDLER TO USE",
        "handler_meta": {
            ...
        }
      }
  ],
  "EVENT_NAME": [
      {
        "handler_name": "HANDLER TO USE",
        "handler_meta": {
            ...
        }
      }
    ],
  }
}
```

See [Report, Monitor and Trigger Events](https://tyk.io/docs/report-monitor-trigger-events/) for more details.
