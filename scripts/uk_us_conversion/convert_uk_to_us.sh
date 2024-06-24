#!/bin/bash

#===============================================================================
#
#       FILE: convert_uk_to_us.sh
# 
#       USAGE: ./run-menu-gen.sh <csv_file> <directory>
# 
#       DESCRIPTION: This script reads a CSV file containing pairs of UK and US
#                words, then recursively searches through the specified directory
#                to replace all instances of the UK words with their US counterparts
#                in the files found.
# 
#       OPTIONS: 
#.               <csv_file> - Path to the CSV file containing UK and US word pairs.
#                <directory> - Path to the directory where replacements should be made.
#
#       REQUIREMENTS: The CSV file should be formatted with each line containing 
#                two words separated by a comma, where the first word is the UK 
#                word and the second is the US word. The script also requires 
#                write permissions for the files in the target directory.
#  
#       NOTES: The script uses `find` to search for files and `sed` to perform 
#                the replacements. It handles basic error checking and ensures 
#                that the specified CSV file and directory exist before proceeding.
#===============================================================================
set -e  # Exit immediately if a command exits with a non-zero status.

# Function to check the last command's exit status
check_exit_status() {
    if [ $? -ne 0 ]; then
        echo "Error: $1 command failed. Exiting."
        exit 1
    fi
}

# Check if both CSV file and directory are provided as arguments
if [ $# -ne 2 ]; then
    echo "Usage: $0 <csv_file> <directory>"
    exit 1
fi

csv_file="$1"
directory="$2"

# Check if the CSV file exists
if [ ! -f "$csv_file" ]; then
    echo "Error: CSV file '$csv_file' not found."
    exit 1
fi

# Check if the directory exists
if [ ! -d "$directory" ]; then
    echo "Error: Directory '$directory' not found."
    exit 1
fi

# Read the CSV file and perform replacements
while IFS=',' read -r uk_word us_word; do
    # Remove any trailing whitespace and carriage return
    uk_word=$(echo "$uk_word" | tr -d '[:space:]\r')
    us_word=$(echo "$us_word" | tr -d '[:space:]\r')

    echo "Converting '$uk_word' to '$us_word' in $directory..."

    # Use find to recursively search  for files and sed to perform the replacement
    find "$directory" -type f -print0 | while IFS= read -r -d '' file; do
        if [ -w "$file" ]; then
            sed -i '' "s/$uk_word/$us_word/g" "$file"
            if [ $? -eq 0 ]; then
                echo "Processed: $file"
            else
                echo "Failed to process: $file"
            fi
        else
            echo "Skipping (no write permission): $file"
        fi
    done

    # Check if the find command failed
    check_exit_status "find"

done < "$csv_file"

echo "Conversion complete."