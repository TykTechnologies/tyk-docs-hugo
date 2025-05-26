#!/usr/bin/env python3
"""
Convert Hugo-based Tyk documentation to Mintlify format.

This script walks through the Hugo content directory structure,
converts all Markdown files to Mintlify compatible MDX format,
and maintains the directory structure in the output directory.

Usage:
    python convert_hugo_to_mintlify.py --input-dir tyk-docs/content --output-dir mintlify-docs
"""

import argparse
import os
import re
import yaml
import json
import shutil
from pathlib import Path
import logging

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler("conversion.log"),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

# Regex patterns - REMOVED the problematic MALFORMED_IMG_PATTERN
FRONTMATTER_PATTERN = re.compile(r'^---\s*\n(.*?)\n---\s*\n', re.DOTALL)
IMG_SHORTCODE_PATTERN = re.compile(r'{{<\s*img\s+src="([^"]+)"\s+alt="([^"]*)"\s*(?:width="([^"]*)"\s*)?(?:imageStyle="([^"]*)"\s*)?[^>]*>}}')
ALT_FIRST_IMG_PATTERN = re.compile(r'{{<\s*img\s+alt="([^"]*)"\s+src="([^"]+)"\s*(?:width="([^"]*)"\s*)?(?:imageStyle="([^"]*)"\s*)?[^>]*>}}')
MALFORMED_IMG_PATTERN = re.compile(r'img\s+src="([^"]+)"\s+alt="([^"]*)"\s*(?:width="([^"]*)"\s*)?\s*>}}')
NOTE_SHORTCODE_PATTERN = re.compile(r'{{<\s*note\s+([^>]*?)>}}(.*?){{<\s*/note\s*>}}', re.DOTALL)
WARNING_SHORTCODE_PATTERN = re.compile(r'{{<\s*warning\s+([^>]*?)>}}(.*?){{<\s*/warning\s*>}}', re.DOTALL)
INTERNAL_LINK_PATTERN = re.compile(r'{{<\s*ref\s+"([^"]+)"\s*>}}')
GRID_SHORTCODE_PATTERN = re.compile(r'{{<\s*grid(?:\s+type="([^"]*)")?\s*>}}(.*?){{<\s*/grid\s*>}}', re.DOTALL)
# Additional grid pattern for self-closing grids
GRID_SELF_CLOSING_PATTERN = re.compile(r'{{<\s*grid(?:\s+type="([^"]*)")?\s*/>}}')
BADGE_SHORTCODE_PATTERN = re.compile(r'{{<\s*badge(?:\s+title="([^"]*)")?\s+href="([^"]*)"(?:\s+image="([^"]*)")?(?:\s+imageStyle="([^"]*)")?\s*>}}(.*?){{<\s*/badge\s*>}}', re.DOTALL)
# Additional badge pattern for different parameter orders
BADGE_ALT_PATTERN = re.compile(r'{{<\s*badge\s+href="([^"]*)"\s+title="([^"]*)"(?:\s+image="([^"]*)")?(?:\s+imageStyle="([^"]*)")?\s*>}}(.*?){{<\s*/badge\s*>}}', re.DOTALL)
BUTTON_SHORTCODE_PATTERN = re.compile(r'{{<\s*button\s+href="([^"]*)"\s+color="([^"]*)"\s+content="([^"]*)"\s*>}}')
BUTTON_LEFT_SHORTCODE_PATTERN = re.compile(r'{{<\s*button_left\s+href="([^"]*)"\s+color="([^"]*)"\s+content="([^"]*)"\s*>}}')
TOOLTIP_SHORTCODE_PATTERN = re.compile(r'{{<\s*tooltip\s*>}}(.*?){{<\s*definition\s*>}}(.*?){{<\s*/definition\s*>}}{{<\s*/tooltip\s*>}}', re.DOTALL)
PILL_LABEL_SHORTCODE_PATTERN = re.compile(r'{{<\s*pill-label\s+text="([^"]*)"(?:\s+class="([^"]*)")?(?:\s+style="([^"]*)")?\s*>}}')
INCLUDE_SHORTCODE_PATTERN = re.compile(r'{{<\s*include\s+"([^"]+)"\s*>}}')
YOUTUBE_SHORTCODE_PATTERN = re.compile(r'{{<\s*youtube\s+([^>]*?)>}}')
YOUTUBE_SEO_SHORTCODE_PATTERN = re.compile(r'{{<\s*youtube-seo\s+id="([^"]+)"\s+title="([^"]+)"\s*>}}')
FEATURE_CARDS_SHORTCODE_PATTERN = re.compile(r'{{<\s*feature-cards\s+dataFile="([^"]+)"\s*>}}')
MALFORMED_BR_PATTERN = re.compile(r'</br>')
HUGO_HEADING_ANCHOR_PATTERN = re.compile(r'^(#{1,6})\s+(.+?)\s*\{#([^}]+)\}\s*$', re.MULTILINE)

def create_directory_if_not_exists(directory):
    """Create directory if it doesn't exist."""
    if not os.path.exists(directory):
        os.makedirs(directory)
        logger.info(f"Created directory: {directory}")

def convert_frontmatter(frontmatter_yaml):
    """Convert Hugo frontmatter to Mintlify frontmatter."""
    try:
        frontmatter = yaml.safe_load(frontmatter_yaml)

        # Create Mintlify frontmatter in YAML format
        mintlify_frontmatter = {}

        # Add required fields
        if "title" in frontmatter:
            mintlify_frontmatter["title"] = frontmatter["title"]

        if "description" in frontmatter:
            mintlify_frontmatter["description"] = frontmatter["description"]

        # Add optional fields if they exist
        if "date" in frontmatter:
            mintlify_frontmatter["sidebarTitle"] = frontmatter.get("title", "")

        if "tags" in frontmatter and frontmatter["tags"]:
            mintlify_frontmatter["tags"] = frontmatter["tags"]

        if "weight" in frontmatter:
            mintlify_frontmatter["order"] = frontmatter["weight"]

        return mintlify_frontmatter
    except Exception as e:
        logger.error(f"Error converting frontmatter: {e}")
        return {"title": "", "description": ""}

def convert_img_shortcode(match):
    """Convert Hugo img shortcode to Mintlify img tag."""
    src = match.group(1)
    alt = match.group(2) or ""
    width = match.group(3) or ""
    style = match.group(4) or ""

    # Adjust image path - remove leading slash if needed
    if src.startswith('/'):
        src = src[1:]  # Remove leading slash

    # If it's in /img/ directory, move to /images/
    if '/img/' in src:
        src = src.replace('/img/', '/images/')

    img_tag = f'<img src="{src}" alt="{alt}"'

    if width:
        img_tag += f' width="{width}"'

    if style:
        img_tag += f' style="{style}"'

    img_tag += ' />'

    return img_tag

def convert_alt_first_img(match):
    """Convert Hugo img shortcode with alt first to Mintlify img tag."""
    alt = match.group(1) or ""
    src = match.group(2)
    width = match.group(3) or ""
    style = match.group(4) or ""

    # Adjust image path - remove leading slash if needed
    if src.startswith('/'):
        src = src[1:]  # Remove leading slash

    # If it's in /img/ directory, move to /images/
    if '/img/' in src:
        src = src.replace('/img/', '/images/')

    img_tag = f'<img src="{src}" alt="{alt}"'

    if width:
        img_tag += f' width="{width}"'

    if style:
        img_tag += f' style="{style}"'

    img_tag += ' />'

    return img_tag

def convert_malformed_img(match):
    """Convert malformed img tags to proper HTML img tags."""
    src = match.group(1)
    alt = match.group(2) or ""
    width = match.group(3) or ""

    # Adjust image path - remove leading slash if needed
    if src.startswith('/'):
        src = src[1:]

    # If it's in /img/ directory, move to /images/
    if '/img/' in src:
        src = src.replace('/img/', '/images/')

    img_tag = f'<img src="{src}" alt="{alt}"'

    if width:
        img_tag += f' width="{width}"'

    img_tag += ' />'

    return img_tag

def convert_note_shortcode(match):
    """Convert Hugo note shortcode to Mintlify Note component."""
    # note_type = match.group(1).strip()  # success, warning, etc.
    content = match.group(2).strip()

    # Handle case where there's a bold "Note" at the beginning
    content = re.sub(r'^\*\*Note\*\*\s*', '', content)

    return f'<Note>\n{content}\n</Note>'

def convert_warning_shortcode(match):
    """Convert Hugo warning shortcode to Mintlify Warning component."""
    # warning_type = match.group(1).strip()  # success, etc.
    content = match.group(2).strip()

    # Handle case where there's a bold "Warning" at the beginning
    content = re.sub(r'^\*\*Warning\*\*\s*', '', content)

    return f'<Warning>\n{content}\n</Warning>'

def convert_internal_link(match):
    """Convert Hugo internal link shortcode to Mintlify link."""
    path = match.group(1)

    # Remove leading/trailing slashes for consistency
    path = path.strip('/')

    return f'/{path}'

def convert_grid_shortcode(match):
    """Convert Hugo grid shortcode to Mintlify Card group."""
    grid_type = match.group(1) or ""  # mid, big, or empty
    content = match.group(2)

    # We'll process the content for any nested shortcodes before wrapping in Cards
    # For now, just wrap in the Card group component
    return f'<CardGroup cols={3}>\n{content}\n</CardGroup>'

def convert_badge_shortcode(match):
    """Convert Hugo badge shortcode to Mintlify Card component."""
    title = match.group(1) or ""
    href = match.group(2) or ""
    image = match.group(3) or ""
    image_style = match.group(4) or ""
    content = match.group(5).strip()

    # Clean up the path in href if needed
    if href.startswith('/'):
        href = href[1:]

    # Adjust image path if needed
    if image and image.startswith('/'):
        image = image[1:]
        if '/img/' in image:
            image = image.replace('/img/', '/images/')

    card_content = f'<Card title="{title}" href="/{href}"'

    if image:
        card_content += f' icon="{image}"'

    card_content += '>\n'
    card_content += content
    card_content += '\n</Card>'

    return card_content

def convert_button_shortcode(match):
    """Convert Hugo button shortcode to Mintlify button component."""
    href = match.group(1)
    color = match.group(2)  # black, red, green
    content = match.group(3)

    # Clean up the path in href if needed
    if href.startswith('/'):
        href = href[1:]

    # Map Hugo colors to Mintlify variants
    color_map = {
        "black": "primary",
        "red": "danger",
        "green": "success"
    }
    variant = color_map.get(color, "primary")

    return f'<Button href="/{href}" variant="{variant}">{content}</Button>'

def convert_button_left_shortcode(match, button_left_list=None):
    """Convert Hugo button_left shortcode to ButtonLeft component."""
    href = match.group(1)
    color = match.group(2)
    content = match.group(3)

    # Add to the list of button_left uses if provided
    if button_left_list is not None and "button_left" not in button_left_list:
        button_left_list.append("button_left")

    return f'<ButtonLeft href="{href}" color="{color}" content="{content}" />'

def convert_hugo_heading_anchor(match):
    """Convert Hugo heading with anchor to HTML heading with id attribute."""
    heading_level = len(match.group(1))  # Count the #'s
    heading_text = match.group(2).strip()
    anchor_id = match.group(3)

    return f'<h{heading_level} id="{anchor_id}">{heading_text}</h{heading_level}>'

def convert_tooltip_shortcode(match):
    """Convert Hugo tooltip shortcode to Mintlify Tooltip component."""
    link_text = match.group(1).strip()
    tooltip_text = match.group(2).strip()

    return f'<Tooltip tip="{tooltip_text}">{link_text}</Tooltip>'

def convert_pill_label_shortcode(match):
    """Convert Hugo pill-label shortcode to Mintlify Badge component."""
    text = match.group(1)
    css_class = match.group(2) or ""
    style = match.group(3) or ""

    # Map classes to Mintlify variants if possible
    variant = "info"
    if css_class:
        if "pill-red" in css_class:
            variant = "danger"
        elif "pill-green" in css_class:
            variant = "success"
        elif "pill-yellow" in css_class:
            variant = "warning"

    return f'<Badge variant="{variant}">{text}</Badge>'

def convert_youtube_shortcode(match):
    """Convert Hugo youtube shortcode to an iframe embed."""
    video_id = match.group(1).strip()

    # Handle various ways the video ID might be provided
    if 'id=' in video_id:
        # Extract ID from parameters like 'id="ABC123"'
        id_match = re.search(r'id=["\'](.*?)["\']', video_id)
        if id_match:
            video_id = id_match.group(1)

    # If there are no parameters, the entire string is the video ID
    return f'<iframe width="560" height="315" src="https://www.youtube.com/embed/{video_id}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'

def convert_youtube_seo_shortcode(match):
    """Convert Hugo youtube-seo shortcode to an iframe embed with SEO attributes."""
    video_id = match.group(1)
    title = match.group(2)

    return f'<iframe width="560" height="315" src="https://www.youtube.com/embed/{video_id}" title="{title}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'

def convert_include_shortcode(match, shared_dir, includes_list=None):
    """Convert Hugo include shortcode to Mintlify snippet import."""
    include_name = match.group(1)

    # Add to the list of includes if provided
    if includes_list is not None and include_name not in includes_list:
        includes_list.append(include_name)

    # Create path to the shared file
    shared_file = os.path.join(shared_dir, f"{include_name}.md")

    # Check if the file exists
    if os.path.exists(shared_file):
        try:
            # Format the component name in PascalCase
            component_name = ''.join(word.capitalize() for word in include_name.replace('-', ' ').split())

            # Return the component usage
            return f'<{component_name}/>'
        except Exception as e:
            logger.error(f"Error processing include {include_name}: {e}")
            return f'<!-- Failed to include {include_name}: {e} -->'
    else:
        logger.warning(f"Included file not found: {shared_file}")
        return f'<!-- Included file not found: {include_name} -->'


def convert_feature_cards_shortcode(match, feature_cards_list=None):
    """Convert Hugo feature-cards shortcode to new component format."""
    data_file = match.group(1)

    # Add to the list of feature cards that need components created
    if feature_cards_list is not None and data_file not in feature_cards_list:
        feature_cards_list.append(data_file)

    # Format the component name based on data file
    if data_file == "ai-studio-features":
        return '<AIStudioCards/>'
    elif data_file == "ui-example-features":
        return '<UIExampleCards/>'
    else:
        # For other data files, create a generic component name
        component_name = ''.join(word.capitalize() for word in data_file.replace('-', ' ').split()) + 'Cards'
        return f'<{component_name}/>'


def copy_custom_mintlify_files(output_dir):
    """Copy files from custom-minitlfy to output directory."""
    custom_dir = "custom-minitlfy"

    if not os.path.exists(custom_dir):
        logger.warning(f"Custom mintlify directory not found: {custom_dir}")
        return

    # Copy style.css to root of output directory
    style_src = os.path.join(custom_dir, "style.css")
    if os.path.exists(style_src):
        style_dest = os.path.join(output_dir, "style.css")
        shutil.copy2(style_src, style_dest)
        logger.info(f"Copied style.css to {style_dest}")

    # Copy snippet files to snippets directory
    custom_snippets_dir = os.path.join(custom_dir, "snippets")
    output_snippets_dir = os.path.join(output_dir, "snippets")

    if os.path.exists(custom_snippets_dir):
        create_directory_if_not_exists(output_snippets_dir)

        for file in os.listdir(custom_snippets_dir):
            if file.endswith('.mdx'):
                src_path = os.path.join(custom_snippets_dir, file)
                dest_path = os.path.join(output_snippets_dir, file)
                shutil.copy2(src_path, dest_path)
                logger.info(f"Copied custom snippet: {dest_path}")


def create_feature_cards_component(data_file, data_dir, output_dir):
    """Create a feature cards component using the new approach for unknown data files."""
    try:
        # Read the JSON data file
        json_path = os.path.join(data_dir, f"{data_file}.json")
        if not os.path.exists(json_path):
            logger.error(f"Feature cards data file not found: {json_path}")
            return False

        with open(json_path, 'r', encoding='utf-8') as f:
            data = json.load(f)

        if 'components' not in data:
            logger.error(f"Invalid feature cards data structure in {json_path}")
            return False

        components = data['components']

        # Generate the component using the new pattern
        component_name = ''.join(word.capitalize() for word in data_file.replace('-', ' ').split()) + 'Cards'

        component_content = f"""import {{ FeatureCards }} from '/snippets/FeatureCards.mdx';

const components = {json.dumps(components, indent=2)};

<FeatureCards components={{components}} />
"""

        # Write the component file
        snippets_dir = os.path.join(output_dir, 'snippets')
        create_directory_if_not_exists(snippets_dir)

        output_filename = f"{component_name}.mdx"
        output_path = os.path.join(snippets_dir, output_filename)

        with open(output_path, 'w', encoding='utf-8') as outfile:
            outfile.write(component_content)

        logger.info(f"Created feature cards component: {output_path}")
        return True

    except Exception as e:
        logger.error(f"Error creating feature cards component for {data_file}: {e}")
        return False


def process_feature_cards_components(feature_cards_list, data_dir, output_dir):
    """Process feature cards and create components for unknown data files."""
    # Known components are already in custom-minitlfy, only create for unknown ones
    known_components = ['ai-studio-features', 'ui-example-features']

    for data_file in feature_cards_list:
        if data_file not in known_components:
            create_feature_cards_component(data_file, data_dir, output_dir)

def process_note_shortcodes_carefully(content):
    """Process note shortcodes with special care to avoid breaking markdown structure."""
    def convert_note_with_context(match):
        note_type = match.group(1).strip()
        note_content = match.group(2).strip()

        # Handle case where there's a bold "Note" at the beginning
        note_content = re.sub(r'^\*\*Note\*\*\s*', '', note_content)

        # Check if this note is inside a list item by analyzing the context
        start_pos = match.start()
        content_before = content[:start_pos]

        # Split content into lines and analyze the structure
        lines_before = content_before.split('\n')

        # Look for list context - check the last several lines
        in_list_item = False
        list_indent_level = 0

        # Walk backwards through lines to find the list context
        for i in range(len(lines_before) - 1, max(-1, len(lines_before) - 10), -1):
            line = lines_before[i]
            line_stripped = line.strip()

            # Skip empty lines
            if not line_stripped:
                continue

            # Check if this is a list item
            if line_stripped.startswith(('- ', '* ', '+ ')) or re.match(r'^\d+\.\s', line_stripped):
                in_list_item = True
                # Calculate the base indentation of the list item
                list_indent_level = len(line) - len(line.lstrip())
                break
            # If we hit content that's not indented relative to a list, break
            elif not line.startswith('    ') and not line.startswith('\t'):
                break

        if in_list_item:
            # For list items, we need to indent the Note properly
            # Use 4 spaces of indentation to stay within the list item
            base_indent = '    '
            indented_content = '\n'.join([base_indent + content_line if content_line.strip() else content_line
                                          for content_line in note_content.split('\n')])
            return f'\n\n{base_indent}<Note>\n{indented_content}\n{base_indent}</Note>\n\n'
        else:
            # Regular note conversion
            return f'<Note>\n{note_content}\n</Note>'

    # Apply the conversion
    return NOTE_SHORTCODE_PATTERN.sub(convert_note_with_context, content)

def process_shortcodes(content, shared_dir=None, includes_list=None, feature_cards_list=None, button_left_list=None):
    """Process all Hugo shortcodes in the content."""
    # Process in specific order to handle nested shortcodes correctly

    # Fix malformed HTML tags
    content = MALFORMED_BR_PATTERN.sub('<br />', content)

    # Convert Hugo heading anchors to HTML headings with id
    content = HUGO_HEADING_ANCHOR_PATTERN.sub(convert_hugo_heading_anchor, content)

    # Convert images - including malformed ones and alt-first format
    content = IMG_SHORTCODE_PATTERN.sub(convert_img_shortcode, content)
    content = ALT_FIRST_IMG_PATTERN.sub(convert_alt_first_img, content)
    content = MALFORMED_IMG_PATTERN.sub(convert_malformed_img, content)

    # Convert notes and warnings - special handling to avoid breaking list structure
    content = process_note_shortcodes_carefully(content)
    content = WARNING_SHORTCODE_PATTERN.sub(convert_warning_shortcode, content)

    # Convert internal links
    content = INTERNAL_LINK_PATTERN.sub(convert_internal_link, content)

    # Convert tooltips
    content = TOOLTIP_SHORTCODE_PATTERN.sub(convert_tooltip_shortcode, content)

    # Convert pill labels
    content = PILL_LABEL_SHORTCODE_PATTERN.sub(convert_pill_label_shortcode, content)

    # Convert buttons
    content = BUTTON_SHORTCODE_PATTERN.sub(convert_button_shortcode, content)

    # Convert button_left
    content = BUTTON_LEFT_SHORTCODE_PATTERN.sub(
        lambda m: convert_button_left_shortcode(m, button_left_list), content)

    # Convert badges (should be done before grids)
    content = BADGE_SHORTCODE_PATTERN.sub(convert_badge_shortcode, content)

    # Convert grids (which may contain badges)
    content = GRID_SHORTCODE_PATTERN.sub(convert_grid_shortcode, content)

    # Convert YouTube videos (both standard and SEO versions)
    content = YOUTUBE_SHORTCODE_PATTERN.sub(convert_youtube_shortcode, content)
    content = YOUTUBE_SEO_SHORTCODE_PATTERN.sub(convert_youtube_seo_shortcode, content)

    # Convert feature cards
    content = FEATURE_CARDS_SHORTCODE_PATTERN.sub(
        lambda m: convert_feature_cards_shortcode(m, feature_cards_list), content)

    # Convert includes if shared_dir is provided
    if shared_dir:
        content = INCLUDE_SHORTCODE_PATTERN.sub(
            lambda m: convert_include_shortcode(m, shared_dir, includes_list), content)

    return content

def convert_file(input_path, output_path, shared_dir=None, global_feature_cards_list=None):
    """Convert a single Hugo markdown file to Mintlify format."""
    try:
        with open(input_path, 'r', encoding='utf-8') as file:
            content = file.read()

        # Extract and convert frontmatter
        frontmatter_match = FRONTMATTER_PATTERN.match(content)
        if frontmatter_match:
            frontmatter_yaml = frontmatter_match.group(1)
            main_content = content[frontmatter_match.end():]

            mintlify_frontmatter = convert_frontmatter(frontmatter_yaml)

            # Track includes that need to be imported
            includes_list = []

            # Track feature cards used in THIS FILE ONLY
            file_feature_cards_list = []

            # Track button_left used in THIS FILE ONLY
            file_button_left_list = []

            # Process Hugo shortcodes in the main content
            main_content = process_shortcodes(main_content, shared_dir, includes_list, file_feature_cards_list, file_button_left_list)

            # Add to global list for component creation (but don't duplicate)
            if global_feature_cards_list is not None:
                for data_file in file_feature_cards_list:
                    if data_file not in global_feature_cards_list:
                        global_feature_cards_list.append(data_file)

            # Generate import statements for snippets
            import_statements = []
            for include_name in includes_list:
                # Format the component name in PascalCase
                component_name = ''.join(word.capitalize() for word in include_name.replace('-', ' ').split())
                import_statements.append(f"import {component_name} from '/snippets/{include_name}.mdx';")

            # Add import statements ONLY for feature cards used in THIS file
            for data_file in file_feature_cards_list:
                if data_file == "ai-studio-features":
                    import_statements.append("import AIStudioCards from '/snippets/AIStudioCards.mdx';")
                elif data_file == "ui-example-features":
                    import_statements.append("import UIExampleCards from '/snippets/UIExampleCards.mdx';")
                else:
                    # For other data files, create generic import
                    component_name = ''.join(word.capitalize() for word in data_file.replace('-', ' ').split()) + 'Cards'
                    import_statements.append(f"import {component_name} from '/snippets/{component_name}.mdx';")

            # Add import for ButtonLeft if used in this file
            if file_button_left_list:
                import_statements.append("import { ButtonLeft } from '/snippets/ButtonLeft.mdx';")

            # Write to output file
            with open(output_path, 'w', encoding='utf-8') as outfile:
                outfile.write("---\n")
                # Write frontmatter as YAML format
                for key, value in mintlify_frontmatter.items():
                    if isinstance(value, str):
                        # Use proper YAML string formatting with double quotes and escaping
                        escaped_value = value.replace('\\', '\\\\').replace('"', '\\"')
                        outfile.write(f'{key}: "{escaped_value}"\n')
                    else:
                        # Use YAML format for non-string values
                        outfile.write(f"{key}: {value}\n")
                outfile.write("---\n\n")

                # Add snippet imports if any
                if import_statements:
                    outfile.write("\n".join(import_statements))
                    outfile.write("\n\n")

                outfile.write(main_content)

            logger.info(f"Converted: {input_path} -> {output_path}")
            return True
        else:
            logger.warning(f"No frontmatter found in {input_path}, skipping conversion")
            return False

    except Exception as e:
        logger.error(f"Error converting {input_path}: {e}")
        return False

def parse_menu_yaml(menu_yaml_path):
    """Parse the menu.yaml file to extract navigation structure."""
    try:
        with open(menu_yaml_path, 'r', encoding='utf-8') as f:
            menu_data = yaml.safe_load(f)

        if not menu_data or 'menu' not in menu_data:
            logger.error(f"Invalid menu.yaml format at {menu_yaml_path}")
            return []

        return menu_data.get('menu', [])
    except Exception as e:
        logger.error(f"Error parsing menu.yaml: {e}")
        return []

def build_navigation_from_menu(menu_items):
    """Build Mintlify navigation structure from the menu.yaml items."""
    tabs_navigation = []

    # Process top-level items
    for item in menu_items:
        # Skip items that are not shown
        if not item.get('show', False):
            continue

        category = item.get('category', '')

        # Handle tabs
        if category == 'Tab':
            # Create a tab object
            tab_title = item.get('title', '')
            tab_path = clean_path(item.get('path', ''))

            # Check if it's an external link
            if tab_path.startswith('http'):
                tab = {
                    "tab": tab_title,
                    "href": tab_path
                }
            else:
                # Process the tab's content to get groups
                tab_groups = process_tab(item)

                # Create tab with groups
                tab = {
                    "tab": tab_title
                }

                # Add groups if there are any
                if tab_groups:
                    tab["groups"] = tab_groups

            tabs_navigation.append(tab)

    return tabs_navigation

def process_navigation_item(item):
    """Process a non-tab navigation item."""
    category = item.get('category', '')

    if category in ['Directory', 'Label']:
        group = {
            "group": item.get('title', ''),
            "pages": []
        }

        # Add the item itself as a page if it has a path
        if 'path' in item and item.get('path'):
            path = clean_path(item.get('path'))
            if path:
                group["pages"].append(path)

        # Process pages within the item
        group_pages = process_group_pages(item.get('menu', []))
        group["pages"].extend(group_pages)

        if group["pages"]:
            return group

    return None

def process_tab(tab_item):
    """Process a tab item to extract its navigation structure as groups."""
    tab_groups = []
    tab_menu = tab_item.get('menu', [])

    # Process groups and directories within the tab
    for group_item in tab_menu:
        if not group_item.get('show', False):
            continue

        category = group_item.get('category', '')

        # Directories and Labels are turned into groups
        if category in ['Directory', 'Label']:
            group = {
                "group": group_item.get('title', ''),
                "pages": []
            }

            # Add the directory itself as a page if it has a path
            if 'path' in group_item and group_item.get('path'):
                path = clean_path(group_item.get('path'))
                if path:
                    group["pages"].append(path)

            # Process pages within the group
            group_pages = process_group_pages(group_item.get('menu', []))
            group["pages"].extend(group_pages)

            if group["pages"]:
                tab_groups.append(group)
        # Pages directly under tabs are placed in an "Overview" group
        elif category == 'Page':
            # Find or create an "Overview" group
            overview_group = next((g for g in tab_groups if g.get('group') == 'Overview'), None)
            if not overview_group:
                overview_group = {"group": "Overview", "pages": []}
                tab_groups.append(overview_group)

            path = clean_path(group_item.get('path'))
            if path:
                overview_group["pages"].append(path)

    return tab_groups

def process_group_pages(menu_items):
    """Process pages within a group or directory."""
    pages = []

    for item in menu_items:
        if not item.get('show', False):
            continue

        category = item.get('category', '')

        if category == 'Page':
            path = clean_path(item.get('path'))
            if path:
                pages.append(path)
        # Handle nested directories recursively
        elif category == 'Directory':
            # Add the directory itself as a page if it has a path
            if 'path' in item and item.get('path'):
                path = clean_path(item.get('path'))
                if path:
                    pages.append(path)

            # Process nested pages
            nested_pages = process_group_pages(item.get('menu', []))
            pages.extend(nested_pages)

    return pages

def clean_path(path):
    """Clean and normalize a path for Mintlify."""
    if not path:
        return ""

    # Remove leading slash if present
    if path.startswith('/'):
        path = path[1:]

    # Remove .md extension if present
    if path.endswith('.md'):
        path = path[:-3]

    return path

def create_docs_json(output_dir, menu_yaml_path):
    """Create the docs.json configuration file using menu.yaml structure."""
    # Parse menu.yaml
    menu_items = parse_menu_yaml(menu_yaml_path)

    # Build navigation structure with tabs
    tabs_navigation = build_navigation_from_menu(menu_items)

    # Create the navigation structure with tabs
    navigation = {
        "tabs": tabs_navigation
    }

    # Create the docs.json config
    docs_config = {
        "name": "Tyk Documentation",
        "theme": "mint",
        "logo": {
            "light": "/logo/tyk-light.svg",
            "dark": "/logo/tyk-dark.svg"
        },
        "favicon": "/favicon.png",
        "colors": {
            "primary": "#8438FA",
            "light": "#20EDBA",
            "dark": "#8438FA"
        },
        "topbarLinks": [
            {
                "name": "Tyk Website",
                "url": "https://tyk.io"
            }
        ],
        "topbarCtaButton": {
            "name": "Get Started",
            "url": "/getting-started"
        },
        "navigation": navigation,
        "footerSocials": {
            "github": "https://github.com/TykTechnologies/tyk-docs",
            "twitter": "https://twitter.com/tyk_io"
        }
    }

    # Write the docs.json file
    docs_json_path = os.path.join(output_dir, "docs.json")
    with open(docs_json_path, 'w', encoding='utf-8') as f:
        json.dump(docs_config, f, indent=2)

    logger.info(f"Created docs.json configuration at {docs_json_path}")

def create_index_redirect(output_dir):
    """Create an index.mdx file that redirects to a main page."""
    index_content = """---
title: 'Tyk Documentation'
description: 'API Management simplified. Get the performance and API management features you need, no matter where you want to deploy.'
---

<meta http-equiv="refresh" content="0;url=/tyk-overview" />
"""

    index_path = os.path.join(output_dir, "index.mdx")
    with open(index_path, 'w', encoding='utf-8') as f:
        f.write(index_content)

    logger.info(f"Created index redirect at {index_path}")

def copy_images(input_dir, output_dir):
    """Copy images from input directory to output directory."""
    # Create images directory
    images_dir = os.path.join(output_dir, "images")
    create_directory_if_not_exists(images_dir)

    # Find image directories in tyk-docs
    assets_img_dir = os.path.join(input_dir, "..", "assets", "img")
    static_img_dir = os.path.join(input_dir, "..", "static", "img")

    if os.path.exists(assets_img_dir):
        for root, _, files in os.walk(assets_img_dir):
            for file in files:
                if file.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.svg')):
                    src_path = os.path.join(root, file)
                    # Get relative path from assets/img
                    rel_path = os.path.relpath(src_path, assets_img_dir)
                    dest_path = os.path.join(images_dir, rel_path)

                    # Create directory if it doesn't exist
                    os.makedirs(os.path.dirname(dest_path), exist_ok=True)

                    # Copy the file
                    shutil.copy2(src_path, dest_path)
                    logger.debug(f"Copied image: {src_path} -> {dest_path}")

    if os.path.exists(static_img_dir):
        for root, _, files in os.walk(static_img_dir):
            for file in files:
                if file.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.svg')):
                    src_path = os.path.join(root, file)
                    # Get relative path from static/img
                    rel_path = os.path.relpath(src_path, static_img_dir)
                    dest_path = os.path.join(images_dir, rel_path)

                    # Create directory if it doesn't exist
                    os.makedirs(os.path.dirname(dest_path), exist_ok=True)

                    # Copy the file
                    shutil.copy2(src_path, dest_path)
                    logger.debug(f"Copied image: {src_path} -> {dest_path}")

    logger.info("Copied images to output directory")

def create_logo_directory(output_dir):
    """Create logo directory and add placeholder files."""
    logo_dir = os.path.join(output_dir, "logo")
    create_directory_if_not_exists(logo_dir)

    # Create placeholder SVG files - you'll need to replace these with actual logo files
    light_logo = os.path.join(logo_dir, "tyk-light.svg")
    dark_logo = os.path.join(logo_dir, "tyk-dark.svg")

    placeholder_svg = """<svg width="200" height="50" xmlns="http://www.w3.org/2000/svg">
    <text x="10" y="30" font-family="Arial" font-size="24" fill="#8438FA">Tyk API Management</text>
</svg>"""

    with open(light_logo, 'w') as f:
        f.write(placeholder_svg)

    with open(dark_logo, 'w') as f:
        f.write(placeholder_svg)

    logger.info("Created logo placeholders - remember to replace with actual logos")

def process_shared_includes(input_dir, output_dir):
    """Process shared includes and convert them to Mintlify snippets."""
    shared_dir = os.path.join(input_dir, 'shared')
    snippets_dir = os.path.join(output_dir, 'snippets')

    # Create snippets directory if it doesn't exist
    create_directory_if_not_exists(snippets_dir)

    # Check if shared directory exists
    if not os.path.exists(shared_dir):
        logger.warning(f"Shared directory not found: {shared_dir}")
        return

    # Process all MD files in the shared directory
    for file in os.listdir(shared_dir):
        if file.endswith('.md'):
            input_path = os.path.join(shared_dir, file)
            output_filename = os.path.splitext(file)[0] + ".mdx"
            output_path = os.path.join(snippets_dir, output_filename)

            try:
                with open(input_path, 'r', encoding='utf-8') as f:
                    content = f.read()

                # Process any shortcodes in the content
                processed_content = process_shortcodes(content, shared_dir)

                # Write to output file as a snippet
                with open(output_path, 'w', encoding='utf-8') as outfile:
                    outfile.write(processed_content)

                logger.info(f"Created snippet: {output_path}")
            except Exception as e:
                logger.error(f"Error creating snippet from {input_path}: {e}")

def convert_directory(input_dir, output_dir):
    """Convert all markdown files in input directory to Mintlify format in output directory."""
    count_total = 0
    count_success = 0

    # Get absolute paths
    input_dir = os.path.abspath(input_dir)
    output_dir = os.path.abspath(output_dir)

    # Log the current directory structure for debugging
    logger.info(f"Current working directory: {os.getcwd()}")
    logger.info(f"Input directory: {input_dir}")
    logger.info(f"Output directory: {output_dir}")

    # Create output directory if it doesn't exist
    create_directory_if_not_exists(output_dir)

    # Copy custom mintlify files from custom-minitlfy directory
    copy_custom_mintlify_files(output_dir)

    # Create logo directory and placeholder files
    create_logo_directory(output_dir)

    # Copy images from input to output
    copy_images(input_dir, output_dir)

    # Set up data directory for feature cards
    data_dir = os.path.join(os.path.dirname(input_dir), 'data')

    # Track feature cards across all files
    feature_cards_list = []

    # Process shared includes first
    shared_dir = os.path.join(input_dir, 'shared')
    process_shared_includes(input_dir, output_dir)

    # Walk through all files in the input directory
    for root, _, files in os.walk(input_dir):
        for file in files:
            if file.endswith('.md'):
                # Skip files in the shared directory as they're processed separately
                if 'shared' in root:
                    continue

                count_total += 1

                # Get input file path
                input_path = os.path.join(root, file)

                # Get output file path
                rel_path = os.path.relpath(input_path, input_dir)

                # Handle _index.md files
                if file == "_index.md":
                    output_filename = os.path.basename(os.path.dirname(input_path)) + ".mdx"
                    output_dir_path = os.path.dirname(os.path.dirname(input_path))
                    rel_output_dir = os.path.relpath(output_dir_path, input_dir)
                    output_path = os.path.join(output_dir, rel_output_dir, output_filename)
                else:
                    # Change extension from .md to .mdx
                    output_filename = os.path.splitext(file)[0] + ".mdx"
                    output_dir_path = os.path.dirname(input_path)
                    rel_output_dir = os.path.relpath(output_dir_path, input_dir)
                    output_path = os.path.join(output_dir, rel_output_dir, output_filename)

                # Create output directory if it doesn't exist
                os.makedirs(os.path.dirname(output_path), exist_ok=True)

                # Convert the file with access to shared directory and feature cards tracking
                if convert_file(input_path, output_path, shared_dir, feature_cards_list):
                    count_success += 1

    # Process feature cards components after all files are converted
    if feature_cards_list:
        logger.info(f"Processing {len(feature_cards_list)} feature card components: {feature_cards_list}")
        process_feature_cards_components(feature_cards_list, data_dir, output_dir)

    # Generate docs.json from menu.yaml - try different possible locations
    possible_menu_paths = [
        os.path.join(os.getcwd(), 'tyk-docs', 'data', 'menu.yaml'),         # Current directory
        os.path.join(input_dir, '..', 'data', 'menu.yaml'),                  # Relative to input dir
        os.path.join(os.path.dirname(input_dir), 'data', 'menu.yaml'),       # Parent of input dir
        os.path.join(os.getcwd(), 'data', 'menu.yaml')                       # In data folder directly
    ]

    menu_yaml_path = None
    for path in possible_menu_paths:
        logger.info(f"Checking for menu.yaml at: {path}")
        if os.path.exists(path):
            menu_yaml_path = path
            logger.info(f"Found menu.yaml at: {path}")
            break

    if menu_yaml_path:
        try:
            create_docs_json(output_dir, menu_yaml_path)
            logger.info(f"Generated docs.json using menu structure from {menu_yaml_path}")
        except Exception as e:
            logger.error(f"Error generating docs.json: {e}")
    else:
        logger.warning("menu.yaml not found in any of the expected locations, skipping docs.json creation")

        # Create a simple navigation for testing if menu.yaml isn't found
        logger.info("Creating a basic docs.json with simple navigation")
        docs_config = {
            "name": "Tyk Documentation",
            "logo": {
                "light": "/logo/tyk-light.svg",
                "dark": "/logo/tyk-dark.svg"
            },
            "favicon": "/favicon.png",
            "colors": {
                "primary": "#8438FA",
                "light": "#20EDBA",
                "dark": "#8438FA"
            },
            "navigation": {
                "tabs": [
                    {
                        "tab": "API Management",
                        "groups": [
                            {
                                "group": "Documentation",
                                "pages": ["tyk-overview", "tyk-components"]
                            }
                        ]
                    },
                    {
                        "tab": "Developer Portal",
                        "groups": [
                            {
                                "group": "Overview",
                                "pages": ["portal/overview"]
                            }
                        ]
                    }
                ]
            }
        }

        docs_json_path = os.path.join(output_dir, "docs.json")
        with open(docs_json_path, 'w', encoding='utf-8') as f:
            json.dump(docs_config, f, indent=2)
        logger.info(f"Created basic docs.json at {docs_json_path}")

    # Create index redirect
    create_index_redirect(output_dir)

    logger.info(f"Conversion complete. Processed {count_total} files, successfully converted {count_success} files.")
    logger.info(f"Output directory: {output_dir}")

def main():
    """Main function to handle command line arguments and start conversion."""
    parser = argparse.ArgumentParser(description='Convert Hugo-based Tyk documentation to Mintlify format.')
    parser.add_argument('--input-dir', required=True, help='Input directory containing Hugo markdown files')
    parser.add_argument('--output-dir', required=True, help='Output directory for Mintlify markdown files')

    args = parser.parse_args()

    logger.info(f"Starting conversion from {args.input_dir} to {args.output_dir}")
    convert_directory(args.input_dir, args.output_dir)

if __name__ == "__main__":
    main()
