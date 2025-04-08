---
title: "Typography Style Guide"
date: 2025-04-08
draft: false
---

# Typography Style Guide

This page demonstrates the typography styles available in the Tyk documentation. Use this as a reference for consistent formatting across docs.

## Headings

### H1: Heading.XLarge (32/36/bold)

```html
<h1>H1: Heading.XLarge</h1>
```

### H2: Heading.Large (24/28/bold) with Separator Line

H2 headings will automatically include a separator line when they're not the first element on the page.

```html
<h2>H2: Heading.Large</h2>
```

<div style="background-color: #f5f5f5; padding: 20px; margin: 16px 0;">
  <div style="position: relative; padding-top: 30px;">
    <div style="position: absolute; top: 0; left: 0; width: 100%; height: 1px; background-color: #e0e0e0;"></div>
    <h2 style="margin-top: 0;">Example H2 with separator</h2>
    <p>This shows how the separator line appears before an H2 heading when it's in the middle of content. The line extends the full width of the content area to create a clear visual break.</p>
  </div>
</div>

### H3: Heading.Large (20/24/bold)

```html
<h3>H3: Heading.Large</h3>
```

### H4: Heading.Medium (18/24/bold)

```html
<h4>H4: Heading.Medium</h4>
```

## Body Text

### Body Text Default (16/24/regular)

This is the default body text style used for most content in the documentation.

```html
<p>This is body text default</p>
```

### Body Text Large (18/28/regular)

This is a larger body text that can be used for introductions or emphasized paragraphs.

```html
<p class="body-text-large">This is body text large</p>
```

### Body Text Small (14/20/regular)

This smaller text can be used for secondary information, captions, or notes.

```html
<p class="body-text-small">This is body text small</p>
```

## Text Styling

### Text Weight

<p class="font-bold">Bold text (font-weight: 700)</p>
<p class="font-semibold">Semibold text (font-weight: 600)</p>
<p class="font-medium">Medium text (font-weight: 500)</p>
<p class="font-regular">Regular text (font-weight: 400)</p>
<p class="font-light">Light text (font-weight: 300)</p>

### Text Colors

<p class="text-dark">Dark text color</p>
<p class="text-medium">Medium text color</p>
<p class="text-light">Light text color</p>
<p class="text-primary">Primary text color (purple)</p>
<p class="text-secondary">Secondary text color (green)</p>

### Text Decoration

<p class="text-underline">Underlined text</p>
<p class="text-line-through">Strikethrough text</p>
<p class="text-italic">Italic text</p>

## Code and Technical Text

For inline code use the `<code>` tag or backticks in markdown:

`var example = "This is inline code";`

For code blocks, use triple backticks or the `<pre>` tag:

```javascript
function example() {
  return "This is a code block";
}
```

## Lists

### Unordered Lists

* List item one
* List item two
* List item three
  * Nested list item A
  * Nested list item B

### Ordered Lists

1. First item
2. Second item
3. Third item
   1. Nested ordered item 1
   2. Nested ordered item 2

## Links

[Standard link](#) that uses the primary color and underlines on hover.

## Blockquotes

> This is a blockquote. It can be used for emphasizing quotes or important notes within the documentation.

## Tables

| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |

## Utility Classes

Tyk documentation includes various utility classes to help with typography needs:

### Text Alignment

<p class="text-left">Left aligned text</p>
<p class="text-center">Center aligned text</p>
<p class="text-right">Right aligned text</p>

### Text Transformation

<p class="text-uppercase">uppercase text</p>
<p class="text-lowercase">LOWERCASE TEXT</p>
<p class="text-capitalize">capitalize text</p>

### Text Truncation

<p class="text-truncate" style="width: 150px;">This text will be truncated with an ellipsis if it exceeds the container width.</p>

## Document-Specific Classes

These classes match the specific design system shown in the design spec:

<p class="heading-1">Heading 1 (32/36/bold)</p>
<p class="heading-2">Heading 2 (24/28/bold)</p>
<p class="heading-3">Heading 3 (20/24/bold)</p>
<p class="heading-4">Heading 4 (18/24/bold)</p>

## Responsive Typography

Our typography system includes responsive styles that adjust for different viewport sizes. On mobile devices, headings and other text elements may be reduced in size for better readability.
