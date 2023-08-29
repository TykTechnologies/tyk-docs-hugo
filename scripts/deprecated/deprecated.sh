#!/bin/bash
if [ $# -ne 1 ]; then
    echo "Usage: $0 <path>"
    exit 1
fi
pattern='\{\{< ref "(/|content/|/content/)?'"$1"'(\.md|/)?" >}}\)'
# Running grep and storing the output in a variable
grep_output=$(grep -nrE "$pattern" "../../tyk-docs/content")
if [ -n "$grep_output" ]; then
    echo "$grep_output"
    exit 0  # Success exit code
else
    echo "Pattern not found."
    exit 0  # Non-success exit code
fi