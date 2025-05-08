---
date: 2025-04-28
title: YouTube Video Embed
tags: ["UI Examples", "Shortcodes", "Video Embed"]
description: "Documentation for the youtube-seo shortcode in Tyk. Learn how to embed YouTube videos in your documentation with proper styling and responsive behavior."
---

The `youtube-seo` shortcode allows you to easily embed YouTube videos in your documentation with proper styling and responsive behavior.

## When to Use

Use the `youtube-seo` shortcode whenever you need to embed a YouTube video in your documentation, such as:

- Product demonstrations
- Tutorial walkthroughs
- Conference presentations
- Webinar recordings
- Feature explanations

The shortcode ensures consistent styling and proper SEO attributes for all embedded videos across your documentation.

## Basic Usage

To embed a YouTube video, simply use the shortcode with the video ID:

```md
{{</* youtube-seo id="VIDEO_ID" title="Video Title" */>}}
```

Replace `VIDEO_ID` with the actual YouTube video ID (the part after `v=` in a YouTube URL) and `Video Title` with a descriptive title for the video.

## Example

```md
{{< youtube-seo id="J2BY7NYRk7U" title="Tyk API Gateway Overview">}}
```

## Parameters

The shortcode supports several parameters:

| Parameter | Required | Default | Description |
|-----------|----------|---------|-------------|
| id | Yes | - | The YouTube video ID |
| title | Yes | - | The title of the video (for SEO and accessibility) |
| width | No | 640 | The width of the video in pixels |
| height | No | 360 | The height of the video in pixels |
| allow | No | accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share | Permissions for the embedded iframe |
| frameborder | No | 0 | Border around the iframe |

## Responsive Behavior

The embedded video will:
- Be centered on the page
- Maintain its aspect ratio on all screen sizes
- Have appropriate margin spacing above and below
- Appear at a comfortable size (640x360 by default)

## Advanced Usage

If you need to customize the video dimensions:

```md
{{< youtube-seo id="VIDEO_ID" title="Video Title" width="800" height="450" >}}
```

If you need to restrict certain iframe permissions:

```md
{{< youtube-seo id="VIDEO_ID" title="Video Title" allow="accelerometer; encrypted-media" >}}
```
