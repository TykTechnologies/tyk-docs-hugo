---
date: 2025-04-28
title: Feature Cards
tags: ["UI Examples", "Shortcodes", "Feature Cards"]
description: "Documentation for the feature-cards shortcode in Tyk. Learn how to display responsive feature cards with icons, titles, and descriptions."
---

The `feature-cards` shortcode creates a responsive grid of cards with icons, titles, and descriptions. This is ideal for presenting features or capabilities in a visually appealing way.

## When to Use

Use the feature-cards shortcode when you need to display a set of features or capabilities in a visually appealing grid format. It's particularly useful for:

- Product feature highlights
- Service capabilities
- Key benefits lists
- Team member profiles
- Pricing plan comparisons

The responsive design ensures your content looks great on all devices, from mobile phones to desktop screens.

## Usage

To use the feature cards shortcode in your markdown file, you need to specify a data file:

```md
{{</* feature-cards dataFile="my-features" */>}}
```

## Configuration

The feature cards are configured through JSON files located in the `data` directory. You must specify which data file to use with the `dataFile` parameter. Here's an example of how to structure a data file:

```json
{
    "components": [
        {
            "title": "Feature Title 1",
            "icon": "🚀",
            "description": "Description of the first feature."
        },
        {
            "title": "Feature Title 2",
            "icon": "⚙️",
            "description": "Description of the second feature."
        },
        {
            "title": "Feature Title 3",
            "icon": "📊",
            "description": "Description of the third feature."
        },
        {
            "title": "Feature Title 4",
            "icon": "🔒",
            "description": "Description of the fourth feature."
        }
    ]
}
```

### Data Structure

Each feature card requires the following fields:

- `title`: The title of the feature (displayed as a heading)
- `icon`: An emoji or character to use as the feature icon
- `description`: A short description of the feature

Optionally, you can include:

- `path`: A URL path for the "Learn More" button
- `button_text`: The text to display on the button (defaults to "Learn More")

## Responsive Behavior

The feature cards are fully responsive and will adjust based on screen size:

- On mobile devices (width < 576px): 1 card per row
- On tablet devices (width 576px - 992px): 2 cards per row
- On desktop devices (width ≥ 992px): 4 cards per row

## Styling

The cards feature large, centered emoji icons with consistent styling:

- White background
- Subtle shadow effect
- Rounded corners
- Centered content
- Consistent spacing
- Blue action buttons (optional)

## Complete Example

Here's a complete example of how to implement feature cards:

1. Create or modify a JSON file in the data directory (e.g., `data/my-features.json`):

```json
{
    "components": [
        {
            "title": "Security",
            "icon": "🔒",
            "description": "Enterprise-grade security with robust authentication options."
        },
        {
            "title": "Analytics",
            "icon": "📊",
            "description": "Real-time insights into API usage and performance."
        },
        {
            "title": "Automation",
            "icon": "⚙️",
            "description": "Automate workflows and reduce manual intervention."
        },
        {
            "title": "Scalability",
            "icon": "🚀",
            "description": "Scale seamlessly to handle growth and demand spikes."
        }
    ]
}
```

2. Reference this data in the shortcode template (you'll need to modify the shortcode to use your custom data file).

3. Use the shortcode in your markdown file with the custom data file:

```md
{{</* feature-cards dataFile="my-features" */>}}
```

## Using Multiple Feature Card Sets

You can use multiple different sets of feature cards in your documentation by:

1. Creating additional JSON files in the data directory with different names
2. Specifying the appropriate data file when using the shortcode

This approach allows you to have multiple independent sets of feature cards throughout your documentation.

## Live Example

The following example uses a custom data file called `ui-example-features.json`:

```md
{{</* feature-cards dataFile="ui-example-features" */>}}
```

Which renders as:

{{< feature-cards dataFile="ui-example-features" >}}
