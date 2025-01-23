---
title: Tyk Streams Glossary
description: Explains Glossary terms of streaming
tags: [ "streaming", "events", "event driven architecture", "event driven architectures", "kafka" ]
---

To effectively use Tyk Streams for managing async APIs, it's important to first understand the terminology and [key concepts]({{< ref "product-stack/tyk-streaming/key-concepts" >}})

## Event

An event represents a significant change or occurrence within a system, such as a user action, a sensor reading, or a data update. Events are typically lightweight and contain minimal data, often just a unique identifier and a timestamp.

## Stream

A stream is a continuous flow of events ordered by time. Streams allow for efficient, real-time processing and distribution of events to multiple consumers.

## Publisher (or Producer)

A publisher is an application or system that generates events and sends them to a broker or event store for distribution to interested parties.

## Subscriber (or Consumer)

A subscriber is an application or system that expresses interest in receiving events from one or more streams. Subscribers can process events in real-time or store them for later consumption.

## Broker

A broker is an intermediary system that receives events from publishers, stores them, and forwards them to subscribers. Brokers decouple publishers from subscribers, allowing for scalable and flexible event-driven architectures.

## Topic (or Channel)

A topic is a named destination within a broker where events are published. Subscribers can subscribe to specific topics to receive relevant events.