---
title: "Pill Label Shortcode Usage Example"
date: 2024-04-23
draft: false
---

# Pill Label Shortcode Usage Examples

The pill-label shortcode allows you to create small, pill-shaped labels in your documentation headers.

## Basic Usage

Use the pill-label shortcode with text parameter:

### Enterprise Security Features {{< pill-label text="EE" >}}

### Advanced Rate Limiting {{< pill-label text="PRO" >}}

### API Analytics {{< pill-label text="OAS" >}}

## Custom Styling

You can also specify a different class or use inline styles:

### Cloud-Only Feature {{< pill-label text="CLOUD" class="pill-brandpurple-dark" >}}

### Beta Feature {{< pill-label text="BETA" class="pill-yellow" >}}

### Deprecated {{< pill-label text="DEPRECATED" class="pill-red" >}}

### Custom Label {{< pill-label text="CUSTOM" style="background-color: #f0f0f0; color: #333; border: 1px solid #ccc;" >}}

## Use Cases

The pill-label shortcode is perfect for:

- Edition indicators (Enterprise, Pro, Community)
- Feature status (Beta, Deprecated)
- Technology indicators (OAS, GraphQL)
- Version badges
