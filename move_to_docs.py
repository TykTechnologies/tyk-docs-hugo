#!/usr/bin/env python3
import os
import shutil

def main():
    base_dir = os.getcwd()
    docs_dir = os.path.join(base_dir, "docs")

    if not os.path.exists(docs_dir):
        print(f"'docs' directory not found in {base_dir}")
        return

    for item in os.listdir(base_dir):
        # Skip hidden files and the docs directory itself
        if item.startswith('.') or item == "docs":
            continue

        src = os.path.join(base_dir, item)
        dest = os.path.join(docs_dir, item)

        # Move top-level directories
        if os.path.isdir(src):
            print(f"Moving directory: {item} → docs/")
            shutil.move(src, dest)

        # Move top-level .mdx files
        elif os.path.isfile(src) and item.endswith(".mdx"):
            print(f"Moving file: {item} → docs/")
            shutil.move(src, dest)

    print("✅ Move complete.")

if __name__ == "__main__":
    main()
