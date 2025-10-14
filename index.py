#!/usr/bin/env python3
import os
import argparse
import re
from collections import Counter

def generate_hugo_anchor(header_text):
    """Generate a Hugo-style anchor ID from header text."""
    # Convert to lowercase
    anchor = header_text.lower()
    
    # Remove punctuation except hyphens and spaces
    anchor = re.sub(r'[^\w\s-]', '', anchor)
    
    # Replace whitespace and underscores with hyphens
    anchor = re.sub(r'[\s_]+', '-', anchor)
    
    # Trim hyphens from ends
    anchor = anchor.strip('-')
    
    return anchor

def get_header_text(line):
    """Extract the header text without the custom anchor tag."""
    # Remove the custom anchor tag if present
    header = re.sub(r'\s*{#[^}]+}', '', line)
    # Remove the markdown header symbols
    header = re.sub(r'^#+\s*', '', header)
    return header.strip()

def update_references(content, old_anchor, new_anchor):
    """Update all references to use the new anchor."""
    patterns = [
        (f'#{old_anchor}(?!}})', f'#{new_anchor}'),  # Direct link
        (f'ref "#{old_anchor}"', f'ref "#{new_anchor}"'),  # Hugo ref with direct anchor
        (f'ref "([^"]*?)#{old_anchor}"', f'ref "\\1#{new_anchor}"'),  # Hugo ref with path
        (f"ref '([^']*?)#{old_anchor}'", f"ref '\\1#{new_anchor}'")  # Hugo ref with path (single quotes)
    ]
    
    modified = content
    for old_pattern, new_pattern in patterns:
        modified = re.sub(old_pattern, new_pattern, modified)
    
    return modified

def find_markdown_files(directory):
    """Recursively find all markdown files in the given directory."""
    markdown_files = []
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith('.md'):
                markdown_files.append(os.path.join(root, file))
    return markdown_files

def find_custom_anchors(file_path):
    """Find all custom anchors in a markdown file."""
    anchors = []
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
        # Find all occurrences of pattern {#something}
        matches = re.finditer(r'{#([^}]+)}', content)
        for match in matches:
            anchor = match.group(1)
            line_number = content[:match.start()].count('\n') + 1
            anchors.append({
                'anchor': anchor,
                'line': line_number,
                'full_match': match.group(0)
            })
    return anchors

def find_anchor_references(files, anchor):
    """Find all files that reference a specific anchor."""
    references = []
    # Patterns to search for:
    # 1. Direct link: #anchor-name
    # 2. Hugo ref shortcode with direct anchor: {{< ref "#anchor-name" >}}
    # 3. Hugo ref shortcode with path: {{< ref "path#anchor-name" >}}
    search_patterns = [
        f'#{anchor}(?!}})',  # Direct link (negative lookahead to exclude the anchor definition)
        f'ref "#*{anchor}"',  # Hugo ref shortcode with direct anchor
        f'ref ".*#{anchor}"',  # Hugo ref shortcode with path
        f"ref '.*#{anchor}'"   # Hugo ref shortcode with path (single quotes)
    ]
    
    for file_path in files:
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
                # Find all occurrences that aren't the anchor definition
                for pattern in search_patterns:
                    matches = re.finditer(pattern, content)
                    for match in matches:
                        # Make sure this match isn't part of the anchor definition
                        if not re.search(f'{{#{anchor}}}', content[max(0, match.start()-2):match.end()+2]):
                            if file_path not in references:
                                references.append(file_path)
                            break
        except Exception as e:
            print(f"Error reading file {file_path}: {e}")
            
    return references

def remove_unused_anchors(file_path, unused_anchors):
    """Remove unused anchor tags from a file."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        modified_content = content
        for anchor in unused_anchors:
            # Replace the anchor tag pattern with empty string
            modified_content = modified_content.replace(f' {anchor["full_match"]}', '')

        if modified_content != content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(modified_content)
            return True
        return False
    except Exception as e:
        print(f"Error modifying file {file_path}: {e}")
        return False

def main():
    parser = argparse.ArgumentParser(description='Process custom anchors in markdown files.')
    parser.add_argument('--input-dir', required=True, help='Input directory containing markdown files')
    
    args = parser.parse_args()
    
    if not os.path.isdir(args.input_dir):
        print(f"Error: {args.input_dir} is not a valid directory")
        return
    
    # Find all markdown files (excluding release-notes directory)
    markdown_files = []
    for root, _, files in os.walk(args.input_dir):
        if 'release-notes' not in root:
            for file in files:
                if file.endswith('.md'):
                    markdown_files.append(os.path.join(root, file))
    
    total_files = len(markdown_files)
    print(f"\nTotal number of markdown files found (excluding release-notes): {total_files}\n")
    
    # Process each file that has custom anchors
    files_modified = 0
    anchor_counters = {}  # Track anchor counts per file
    
    for file_path in markdown_files:
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Find all custom anchors in this file
            anchors = find_custom_anchors(file_path)
            if not anchors:
                continue
            
            # Process each anchor that has references
            modified_content = content
            file_modified = False
            
            for anchor in anchors:
                references = find_anchor_references(markdown_files, anchor['anchor'])
                if references:
                    # Get the line with the header
                    lines = content.split('\n')
                    header_line = lines[anchor['line'] - 1]
                    
                    # Generate Hugo-style anchor
                    header_text = get_header_text(header_line)
                    new_anchor = generate_hugo_anchor(header_text)
                    
                    # Ensure unique anchor within the file
                    base_anchor = new_anchor
                    if base_anchor not in anchor_counters:
                        anchor_counters[base_anchor] = 0
                    anchor_counters[base_anchor] += 1
                    if anchor_counters[base_anchor] > 1:
                        new_anchor = f"{base_anchor}-{anchor_counters[base_anchor]-1}"
                    
                    print(f"\nProcessing anchor in {file_path}:")
                    print(f"  Original: {anchor['full_match']}")
                    print(f"  New: {new_anchor}")
                    print("  Referenced in:")
                    for ref in references:
                        print(f"    - {ref}")
                    
                    # Remove the custom anchor tag
                    modified_content = modified_content.replace(f" {anchor['full_match']}", '')
                    
                    # Update all references to this anchor
                    modified_content = update_references(modified_content, anchor['anchor'], new_anchor)
                    
                    # Update references in other files
                    for ref_file in references:
                        if ref_file != file_path:
                            try:
                                with open(ref_file, 'r', encoding='utf-8') as f:
                                    ref_content = f.read()
                                updated_ref_content = update_references(ref_content, anchor['anchor'], new_anchor)
                                if updated_ref_content != ref_content:
                                    with open(ref_file, 'w', encoding='utf-8') as f:
                                        f.write(updated_ref_content)
                                    print(f"    Updated references in: {ref_file}")
                            except Exception as e:
                                print(f"Error updating references in {ref_file}: {e}")
                    
                    file_modified = True
            
            # Save changes to the current file if modified
            if file_modified:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(modified_content)
                files_modified += 1
        
        except Exception as e:
            print(f"Error processing file {file_path}: {e}")
    
    print(f"\nTotal files modified: {files_modified}")

if __name__ == "__main__":
    main()
