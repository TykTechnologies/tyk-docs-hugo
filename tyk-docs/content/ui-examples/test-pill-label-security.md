---
title: "UI Examples: Pill Label Security Test"
date: 2024-04-23
draft: true
---

## Security Test Cases for Pill Label Shortcode

### Normal Usage
{{< pill-label text="NORMAL" >}}

### HTML Injection Attempt
{{< pill-label text="<script>alert('XSS')</script>" >}}

### Invalid Class - Generates "Warning: Unsupported class" Message
{{< pill-label text="INVALID CLASS" class="not-allowed-class" >}}

### Malicious Style Attempt - Generates "Warning: Potentially unsafe style attribute" Message
{{< pill-label text="BAD STYLE" style="javascript:alert('XSS');" >}}

### Additional Unsafe Style Test - Generates "Warning: Potentially unsafe style attribute" Message
{{< pill-label text="SCRIPT IN STYLE" style="background-image: url('javascript:alert(1)');" >}}

### Expression Style Test - Generates "Warning: Potentially unsafe style attribute" Message
{{< pill-label text="EXPRESSION" style="background: expression(alert('XSS'));" >}}

### Safe Complex Style Attempt
{{< pill-label text="COMPLEX" style="color: red; background-color: yellow;" >}}

## Warning Messages Generated During Build

The Hugo build log should show these warnings for the malicious test cases:

1. For invalid class: 
   ```
   Warning: Unsupported class 'not-allowed-class' used in pill-label shortcode. Using default class instead.
   ```

2. For unsafe style attributes:
   ```
   Warning: Potentially unsafe style attribute in pill-label shortcode was sanitized
   ```

## IMPORTANT

This page is set to `draft: true` to prevent it from being built in production,
avoiding warning messages in deployment logs. To test the security features:

1. Run Hugo locally with the draft flag: `hugo serve -D`
2. Observe the warning messages in the terminal
3. Verify the rendered output in the browser
