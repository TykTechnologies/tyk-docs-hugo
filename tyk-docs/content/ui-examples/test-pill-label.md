---
title: "UI Examples: Pill label shortcode"
date: 2024-04-23
draft: false
---

This page demonstrates all available styles and usage examples of the pill-label shortcode.

**Feel free to contribute by adding more classes or adjusting the colors via PR.**

Click on any example to see details about its usage and styling.


---

## Default style - Enterprise edition {#enterprise-edition}

### Enterprise security features {{< pill-label text="EE" >}}

<details>
<summary>Click to view usage and styling</summary>

Type: Default Style

Usage: Used for Enterprise Edition features

Class name: `pill-outline-brandpurple-light` (default)

This creates a pill with:
- Transparent background
- Dark purple (#8438fa) border
- Dark purple (#8438fa) text

Example appearance: `[  EE  ]` (outline style with purple text)

Code example:
```
### Enterprise security features {{</* pill-label text="EE" */>}}
```
</details>

---

## Dark purple style - Cloud features {#cloud-features}

### Governance {{< pill-label text="CLOUD" class="pill-brandpurple-dark" >}}

<details>
<summary>Click to view usage and styling</summary>

Type: Dark Purple Style

Usage: Used for Cloud Features

Class name: `pill-brandpurple-dark`

This creates a pill with:
- Dark purple (#8438fa) background
- White text

Example appearance: `[CLOUD]` (solid purple background with white text)

Code example:
```
### Cloud-only feature {{</* pill-label text="CLOUD" class="pill-brandpurple-dark" */>}}
```
</details>

---

## Yellow style - Lab releases {#lab-releases}

### AI future feature {{< pill-label text="LAB RELEASE" class="pill-yellow" >}}

<details>
<summary>Click to view usage and styling</summary>

Type: Yellow Style

Usage: Used for Lab Releases

Class name: `pill-yellow`

This creates a pill with:
- Yellow (#d6b218) background
- Black text

Example appearance: `[LAB RELEASE]` (solid yellow background with black text)

Code example:
```
### Lab feature {{</* pill-label text="LAB RELEASE" class="pill-yellow" */>}}
```
</details>

---

## Red style - Deprecated features {#deprecated-features}

### Tyk classic API definition {{< pill-label text="DEPRECATED" class="pill-red" >}}

<details>
<summary>Click to view usage and styling</summary>

Type: Red Style

Usage: Used for Deprecated Features

Class name: `pill-red`

This creates a pill with:
- Red (#ff6c7d) background
- White text

Example appearance: `[DEPRECATED]` (solid red background with white text)

Code example:
```
### Tyk classic API definition {{</* pill-label text="DEPRECATED" class="pill-red" */>}}
```
</details>

---

## Light purple style - Tutorials {#tutorials}

### Tyk streams getting started {{< pill-label text="TUTORIAL" class="pill-default" >}}

<details>
<summary>Click to view usage and styling</summary>

Type: Light Purple Style

Usage: Used for Tutorials

Class name: `pill-default`

This creates a pill with:
- Light purple (#ededf9) background
- Medium purple (#505071) text

Example appearance: `[TUTORIAL]` (light purple background with dark purple text)

Code example:
```
### Tyk streams getting started {{</* pill-label text="TUTORIAL" class="pill-default" */>}}
```
</details>

---

## Green style - New features {#new-features}

### New feature {{< pill-label text="NEW" class="pill-brandgreen" >}}

<details>
<summary>Click to view usage and styling</summary>

Type: Green Style

Usage: Used for New Features

Class name: `pill-brandgreen`

This creates a pill with:
- Green (#00cdb0) background
- Black text

Example appearance: `[NEW]` (solid green background with black text)

Code example:
```
### New feature {{</* pill-label text="NEW" class="pill-brandgreen" */>}}
```
</details>

---

## Custom styling {#custom-styling}

### Custom label {{< pill-label text="CUSTOM" style="background-color: #f0f0f0; color: #333; border: 1px solid #ccc;" >}}

<details>
<summary>Click to view usage and styling</summary>

Type: Custom Styling

Usage: Used for special cases requiring custom styling

Uses inline `style` attribute instead of class

This creates a pill with custom inline styling - in this case:
- Light gray background
- Dark gray text
- Light gray border

Example appearance: `[CUSTOM]` (custom styling as specified)

Code example:
```
### Custom label {{</* pill-label text="CUSTOM" style="background-color: #f0f0f0; color: #333; border: 1px solid #ccc;" */>}}
```
</details>

---

## Reference table {#reference-table}

| Class Name | Best For | Background | Text Color | Border |
|------------|----------|------------|------------|--------|
| pill-outline-brandpurple-light (default) | Enterprise Edition | Transparent | Dark Purple | Dark Purple |
| pill-brandpurple-dark | Cloud Features | Dark Purple | White | None |
| pill-yellow | Lab Releases | Yellow | Black | None |
| pill-red | Deprecated Features | Red | White | None |
| pill-brandgreen | New Features | Green | Black | None |
| pill-default | Tutorials | Light Purple | Medium Purple | None |
