---
title: "Spacing System"
date: 2025-04-08
draft: false
---

# Spacing System

Consistent spacing creates visual balance that makes the user interface easier for our users to scan. We apply a consistent spacing system based on a 4-pixel grid to ensure visual harmony and simplicity.

## Core Principles

External spacing is always greater than internal spacing. This means that as you move out from the center of an item or group, the spacing increases and relationships become more defined.

## Base Spacing Unit: 4px

The smallest spacing increment. Used for tight spaces like padding inside buttons, small icons, or minor gaps between tightly related elements.

## Spacing Scale

Our spacing system uses a consistent scale based on multiples of 4px. Here's the complete scale with usage guidelines:

### Small Spacing

| Token | Size | Usage |
|-------|------|-------|
| `space-00` | 0 | No spacing |
| `space-05` | 2px | Tiny spacing for fine adjustments |
| `space-10` | 4px | Minimum spacing between related elements |
| `space-15` | 8px | Default spacing for small related elements |
| `space-20` | 12px | Standard spacing for buttons and UI elements |

### Medium Spacing

| Token | Size | Usage |
|-------|------|-------|
| `space-25` | 16px | Spacing to separate related elements with normal padding |
| `space-30` | 20px | Spacing to separate unrelated elements or groups |
| `space-35` | 24px | Spacing to separate sub-sections of content |
| `space-40` | 32px | For separating larger content sections |

### Large Spacing

| Token | Size | Usage |
|-------|------|-------|
| `space-45` | 36px | Padding between distinct groups of content |
| `space-50` | 40px | Spacing between UI components or content blocks |
| `space-60` | 48px | Major separation between content areas |
| `space-70` | 64px | Section spacing for major layout elements |
| `space-80` | 80px | Larger breaks between significant page sections |

### Extra Large Spacing

| Token | Size | Usage |
|-------|------|-------|
| `space-90` | 96px | Very large spacing for major sections |
| `space-100` | 112px | Maximum spacing for page sections |
| `space-110` | 128px | Reserved for special cases and very large breakpoints |

## How to Use Spacing Utilities

Our spacing system includes utility classes for margins and padding in all directions:

### Margin Utilities

```html
<!-- All sides -->
<div class="m-25">Margin of 16px on all sides</div>

<!-- Top margin -->
<div class="mt-25">Margin top of 16px</div>

<!-- Bottom margin -->
<div class="mb-25">Margin bottom of 16px</div>

<!-- Left margin -->
<div class="ml-25">Margin left of 16px</div>

<!-- Right margin -->
<div class="mr-25">Margin right of 16px</div>

<!-- Horizontal margins (left and right) -->
<div class="mx-25">Margin of 16px on left and right</div>

<!-- Vertical margins (top and bottom) -->
<div class="my-25">Margin of 16px on top and bottom</div>
```

### Padding Utilities

```html
<!-- All sides -->
<div class="p-25">Padding of 16px on all sides</div>

<!-- Top padding -->
<div class="pt-25">Padding top of 16px</div>

<!-- Bottom padding -->
<div class="pb-25">Padding bottom of 16px</div>

<!-- Left padding -->
<div class="pl-25">Padding left of 16px</div>

<!-- Right padding -->
<div class="pr-25">Padding right of 16px</div>

<!-- Horizontal padding (left and right) -->
<div class="px-25">Padding of 16px on left and right</div>

<!-- Vertical padding (top and bottom) -->
<div class="py-25">Padding of 16px on top and bottom</div>
```

### Gap Utilities for Flex and Grid Layouts

```html
<!-- Gap in all directions -->
<div class="gap-25">Gap of 16px between all child elements</div>

<!-- Row gap -->
<div class="gap-row-25">Gap of 16px between rows</div>

<!-- Column gap -->
<div class="gap-col-25">Gap of 16px between columns</div>
```

## Responsive Spacing

Adjust spacing for different screen sizes:

```html
<!-- Different margins based on screen size -->
<div class="mt-40 mt-md-25">
  32px top margin on large screens, 16px on medium screens
</div>
```

## Semantic Spacing Classes

For consistent content structure:

```html
<!-- Section spacing -->
<div class="section-spacing-md">
  48px bottom margin, ideal for section separation
</div>

<!-- Content block spacing -->
<div class="content-block-spacing">
  20px bottom margin, good for content blocks
</div>

<!-- Paragraph spacing -->
<div class="paragraph-spacing">
  12px bottom margin between paragraphs
</div>
```

## Visual Examples

<div style="display: flex; background-color: #f5f5f5; margin-bottom: 16px;">
  <div style="background-color: #03031C; color: white; padding: 8px;">Element 1</div>
  <div style="width: 4px; background-color: #FF5E5E;"></div>
  <div style="background-color: #8438FA; color: white; padding: 8px;">Element 2</div>
</div>
<p><code>space-10</code> (4px) - Minimum spacing between closely related elements</p>

<div style="display: flex; background-color: #f5f5f5; margin-bottom: 16px;">
  <div style="background-color: #03031C; color: white; padding: 8px;">Element 1</div>
  <div style="width: 8px; background-color: #FF5E5E;"></div>
  <div style="background-color: #8438FA; color: white; padding: 8px;">Element 2</div>
</div>
<p><code>space-15</code> (8px) - Default spacing for related UI elements</p>

<div style="display: flex; background-color: #f5f5f5; margin-bottom: 16px;">
  <div style="background-color: #03031C; color: white; padding: 8px;">Element 1</div>
  <div style="width: 16px; background-color: #FF5E5E;"></div>
  <div style="background-color: #8438FA; color: white; padding: 8px;">Element 2</div>
</div>
<p><code>space-25</code> (16px) - Standard spacing between components</p>

<div style="display: flex; background-color: #f5f5f5; margin-bottom: 16px;">
  <div style="background-color: #03031C; color: white; padding: 8px;">Element 1</div>
  <div style="width: 32px; background-color: #FF5E5E;"></div>
  <div style="background-color: #8438FA; color: white; padding: 8px;">Element 2</div>
</div>
<p><code>space-40</code> (32px) - Spacing for separating content sections</p>

## Grid Layout Example

<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; background-color: #f5f5f5; padding: 16px; margin-bottom: 24px;">
  <div style="background-color: #03031C; color: white; padding: 16px;">Grid Item 1</div>
  <div style="background-color: #03031C; color: white; padding: 16px;">Grid Item 2</div>
  <div style="background-color: #03031C; color: white; padding: 16px;">Grid Item 3</div>
  <div style="background-color: #03031C; color: white; padding: 16px;">Grid Item 4</div>
  <div style="background-color: #03031C; color: white; padding: 16px;">Grid Item 5</div>
  <div style="background-color: #03031C; color: white; padding: 16px;">Grid Item 6</div>
</div>
<p>Grid with <code>gap-25</code> (16px gap) between items</p>

## Best Practices

1. **Consistency is key**: Use the spacing scale consistently throughout the interface.
2. **Consider hierarchy**: Use larger spacing to separate unrelated elements and smaller spacing for related ones.
3. **Respect content density**: Balance the need for whitespace with information density.
4. **Use semantic spacing**: When available, use semantic spacing classes (like section-spacing-md) to maintain consistency.
5. **Be responsive**: Adjust spacing for different screen sizes using responsive variants.
