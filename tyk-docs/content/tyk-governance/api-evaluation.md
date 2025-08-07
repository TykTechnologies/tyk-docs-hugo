---
title: API Evaluation
date: 2025-07-16T15:49:11Z
description: "Validate API specifications against governance policies before deployment to catch compliance issues early in the development lifecycle and reduce rework."
tags: ["Tyk Governance", "API Evaluation", "Rulesets", "API Validation", "Shift-Left Governance"]
---

## Availability

- Version: Available since v0.2

## Overview

API Evaluation enables you to validate API specifications against governance policies before deployment, without requiring the API to be published or stored in your API Repository. This feature helps you catch compliance issues early in the development lifecycle, reducing rework and accelerating the delivery of high-quality APIs.

### Key Benefits

- **Shift-Left Governance**: Catch compliance issues during design and development, not after deployment
- **Reduce Development Cycles**: Identify and fix issues before they reach code review or testing phases
- **Seamless Integration**: Easily incorporate governance checks into CI/CD pipelines and development workflows
- **Detailed Feedback**: Receive precise information about violations with line numbers and remediation guidance
- **No Storage Required**: Validate API specifications without storing them in your API Repository

### Dependencies

- Requires Tyk Governance v0.2 or higher
- Requires at least one governance ruleset to be defined

## Quick Start

In this tutorial, we'll validate an API specification against a governance ruleset before deployment.

### Prerequisites

- Access to Tyk Governance Hub
- A governance ruleset ID
- An API specification to validate (in OpenAPI format)

### Step-by-Step

1. **Identify Your Ruleset**

    Navigate to the Rulesets section in your Tyk Governance dashboard and note the ID of the ruleset you want to use for validation.

2. **Prepare Your API Specification**

    Ensure your API specification is in a valid OpenAPI format (JSON or YAML).

3. **Make an API Request**

    Use the API Evaluation endpoint to validate your specification:

    ```sh
    curl -X POST https://your-governance-instance.tyk.io/api/rulesets/evaluate-spec \
    -H "Content-Type: application/json" \
    -H "X-API-Key: YOUR_API_KEY" \
    -d '{
        "rulesetId": "$RULESET_ID",
        "apiSpec": {
          "name": "My Test API",
          "content": {
            "openapi": "3.0.0",
            "info": {
              "title": "Test API",
              "version": "1.0.0"
            },
            "paths": {
              "/example": {
                "get": {
                  "responses": {
                    "200": {
                      "description": "OK"
                    }
                  }
                }
              }
            }
          }
        }
    }'
    ```

4. **Review the Results**

    The response will include any violations found, with details about each issue:

    ```json
    {
        "status": "Success",
        "message": "Rule violation found",
        "errors": [
            {
                "code": "info-contact",
                "path": ["info"],
                "message": "API must have contact information",
                "severity": "error",
                "range": {
                    "start": { "line": 3, "character": 2 },
                    "end": { "line": 6, "character": 3 }
                },
                "howToFix": "Add contact information to the info section"
            }
        ]
    }
    ```

    If there are no violations found:

    ```json
    {
      "status" : "Success",
      "message" : "No rule violation found",
      "errors":[]
    }
    ```

### Validation

- A successful request with no violations will return an empty errors array
- If violations are found, each will include:
    - The rule code that was violated
    - The path in the API specification where the violation occurred
    - A message explaining the issue
    - The severity level (error, warning, info, hint)
    - The exact location in the file (line and character)
    - Guidance on how to fix the issue (if available)

## How It Works

API Evaluation works by sending your API specification to the Tyk Governance Hub, where it's validated against a specified ruleset without being stored in your API Repository. The system applies each rule in the ruleset to your specification and returns detailed results.

### Integration into Development Workflow

#### Integrating with CI/CD Pipelines

API Evaluation can be integrated into your CI/CD pipeline to validate API specifications before they're deployed automatically. This ensures that only compliant APIs make it to production.

```yaml
# Example GitHub Actions workflow
name: API Governance Check

on:
  pull_request:
    paths:
      - 'api-specs/**'

jobs:
  validate-api:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Validate API Specification
        run: |
          SPEC_CONTENT=$(cat api-specs/my-api.yaml | awk '{printf "%s\\n", $0}')
          curl -X POST https://your-governance-instance.tyk.io/api/rulesets/evaluate-spec \
            -H "Content-Type: application/json" \
            -H "X-API-Key: ${{ secrets.GOVERNANCE_API_KEY }}" \
            -d "{
              \"rulesetId\": \"your-ruleset-id\",
              \"apiSpec\": {
                \"name\": \"My API\",
                \"content\": \"$SPEC_CONTENT\"
              }
            }" > validation-results.json
            
          # Fail if any errors are found
          ERROR_COUNT=$(jq '.errors | length' validation-results.json)
          if [ $ERROR_COUNT -gt 0 ]; then
            echo "API validation failed with $ERROR_COUNT issues:"
            jq '.errors' validation-results.json
            exit 1
          fi

```

#### Pre-commit Validation

Developers can validate their API specifications before committing changes, ensuring they meet governance standards from the start.

```bash
#!/bin/bash
# pre-commit hook for API validation

# Get the API specification file
SPEC_FILE=$(git diff --cached --name-only | grep -E '\.json$|\.yaml$|\.yml$' | head -1)

if [ -n "$SPEC_FILE" ]; then
  echo "Validating API specification: $SPEC_FILE"
  
  # Convert the file content to JSON
  if [[ $SPEC_FILE == *.yaml || $SPEC_FILE == *.yml ]]; then
    SPEC_CONTENT=$(yq eval -o=json $SPEC_FILE)
  else
    SPEC_CONTENT=$(cat $SPEC_FILE)
  fi
  
  # Validate the specification
  RESPONSE=$(curl -s -X POST https://your-governance-instance.tyk.io/api/rulesets/evaluate-spec \
    -H "Content-Type: application/json" \
    -H "X-API-Key: YOUR_API_KEY" \
    -d "{
      \"rulesetId\": \"your-ruleset-id\",
      \"apiSpec\": {
        \"name\": \"$(basename $SPEC_FILE)\",
        \"content\": $SPEC_CONTENT
      }
    }")
  
  # Check for errors
  ERROR_COUNT=$(echo $RESPONSE | jq '.errors | length')
  if [ $ERROR_COUNT -gt 0 ]; then
    echo "API validation failed with $ERROR_COUNT issues:"
    echo $RESPONSE | jq '.errors'
    exit 1
  fi
  
  echo "API specification is valid!"
fi

exit 0
```

## Use Cases

### Validating APIs During Design Phase

Integrate API Evaluation with design tools to validate specifications during the design phase, before any code is written.

**Benefits**:

- Catch issues at the earliest possible stage
- Reduce rework and development cycles
- Ensure designs align with governance standards from the start

**Implementation**:

1. Design an API in your preferred tool
2. Export the OpenAPI specification
3. Validate using the API Evaluation endpoint
4. Review and address any issues
5. Repeat until the specification passes validation

### Automated Testing in Development Workflows

Incorporate API Evaluation into automated testing workflows to ensure continuous compliance during development.

**Benefits**:

- Maintain compliance throughout the development process
- Prevent regression of governance standards
- Provide immediate feedback to developers

**Implementation**:

1. Add API validation as a step in your testing pipeline
2. Run validation after any changes to the API specification
3. Fail the build if critical violations are found
4. Generate reports of issues for developers to address

### Pre-release Validation Gate

Use API Evaluation as a final check before releasing APIs to production or external consumers.

**Benefits**:

- Ensure only compliant APIs are released
- Maintain consistent quality standards
- Reduce security and compliance risks

**Implementation**:

1. Add a validation step in your release pipeline
2. Block releases with critical violations
3. Generate compliance reports for audit purposes
4. Track compliance metrics over time

## Best Practices and Recommendations

- **Integrate early in development**: Validate specifications before coding begins to avoid costly rework
- **Use appropriate rulesets**: Select rulesets that match the API's purpose and criticality
- **Automate validation**: Incorporate validation into CI/CD pipelines and development workflows
- **Review results carefully**: Understand the context of each violation before fixing
- **Prioritize by severity**: Address errors first, then warnings, then informational issues
- **Track compliance trends**: Monitor how compliance improves over time
- **Update specifications incrementally**: Fix critical issues first, then address less severe ones
- **Document exceptions**: When a rule violation is intentional, document the reason
- **Provide feedback on rules**: Help improve governance rules that generate false positives
- **Use with other governance tools**: Combine with API Repository and Ruleset Management for comprehensive governance

## FAQs

<details> <summary><b>Can I validate multiple API specifications at once?</b></summary>

The `/rulesets/evaluate-spec` endpoint is designed for validating a single API specification. For batch validation of multiple specifications, you can make multiple requests or use the `/rulesets/evaluate` endpoint if the APIs are already in your API Repository.

</details> <details> <summary><b>What API specification formats are supported?</b></summary>

Currently, the API Evaluation feature supports OpenAPI 3.x specifications in both JSON and YAML formats. Support for additional formats is planned for future releases.

</details> <details> <summary><b>Is there a size limit for API specifications?</b></summary>

Yes, there's a 10MB limit on the size of API specifications that can be evaluated. For very large specifications, we recommend breaking them into smaller, more manageable components.

</details> <details> <summary><b>Are evaluated specifications stored in Tyk Governance?</b></summary>

No, specifications submitted through the API Evaluation endpoint are not stored in your API Repository. They are processed in memory and then discarded, making this feature suitable for validating sensitive or in-development APIs.

</details>

## Troubleshooting

<details> <summary><b>Receiving "Invalid request format" error</b></summary>

- Ensure your request body follows the correct JSON format
- Verify that the `content` field contains a valid OpenAPI specification

- Check for JSON syntax errors in your request
- Make sure the  `rulesetId` is valid and exists in your Governance Hub

</details> <details> <summary><b>Evaluation taking too long or timing out</b></summary>

- Reduce the size and complexity of your API specification
- Ensure your ruleset doesn't contain overly complex rules
- Break large specifications into smaller components
- Check network connectivity between your client and the Governance Hub

</details> <details> <summary><b>Results show unexpected violations</b></summary>

- Review the ruleset being used for evaluation
- Check the specific rule that's generating the violation
- Verify your API specification against the OpenAPI specification
- Consider if the rule needs adjustment for your specific use case

</details> <details> <summary><b>Authentication failures</b></summary>

- Verify your API key is valid and has not expired
- Ensure you're including the API key in the correct header ( `X-API-Key` )
- Check that your user account has permission to access the API Evaluation feature
- Verify you're using the correct Governance Hub URL

</details>

