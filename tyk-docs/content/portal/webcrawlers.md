---
title: "Managing Webcrawlers"
date: 2025-07-25
tags: ["Developer Portal", "Tyk", "Reference", "Live Portal", "Webcrawler", "Robot", "Admin"]
keywords: ["Developer Portal", "Tyk", "Reference", "Live Portal", "Webcrawler", "Robot", "Admin"]
description: "Configuring your Live Portal to restrit webcrawlers and bots"
---

## Configure robots.txt (Built-in Solution)

From version 1.14.0, the Tyk Developer Portal includes built-in support for customizing the `robots.txt` file, which is the standard way to instruct search engines and other well-behaved crawlers about which parts of your site they should not access.

To configure this:

1. Log in to the Admin Portal
2. Navigate to **Settings > General**
3. Scroll down to the **robots.txt Settings** section
4. Edit the content to control crawler access

A restrictive `robots.txt` configuration would look like:

```
User-agent: *
Disallow: /
```

This instructs all crawlers to avoid indexing any part of your site. By default, the Portal already uses a restrictive `robots.txt` configuration.

## Implement Additional HTTP Headers

You can add custom response headers to further discourage crawling:

- `X-Robots-Tag: noindex, nofollow` - Similar to robots.txt but as an HTTP header
- `Cache-Control: no-store, no-cache, must-revalidate` - Prevents caching

These can be added in your proxy configuration or by customizing your portal theme.

## Best Practices

- Regularly check your server logs for unusual crawling patterns
- Consider using a CAPTCHA for registration forms to prevent automated sign-ups (not supported natively by Tyk Developer Portal at this time)
- Use JavaScript-based content rendering for sensitive information, as basic crawlers may not execute JavaScript

Remember that while these methods can deter most crawlers, they cannot provide absolute protection against determined scrapers that deliberately ignore `robots.txt` rules or use sophisticated techniques to mimic human behavior.