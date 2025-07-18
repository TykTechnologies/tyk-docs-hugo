---
title: Governance Rulesets
date: 2025-07-16T15:49:11Z
description: ""
tags: ["Tyk Governance", "Rulesets"]
---

[Overview](#overview) | [Quick Start](#quick-start) | [How It Works](#how-it-works) | [Configuration Options](#configuration-options) | [Use Cases](#use-cases) | [Best Practices](#best-practices-and-recommendations) | [FAQs](#faqs)| [Troubleshooting](#troubleshooting)

### Availability

- Version: Available since v0.2

## Overview

Governance Rulesets enable you to define, manage, and enforce API standards across your organization through customizable rules. These rulesets act as executable policies that define your organization's API governance requirements, helping you establish consistent standards for security, design, and documentation.

### Key Benefits

- **Standardize API Development**: Define consistent patterns and practices for all APIs
- **Centralize Governance Policies**: Maintain standards in a single location accessible to all teams
- **Customize to Your Needs**: Create organization-specific rules or use pre-built templates
- **Evolve Standards Gradually**: Adjust rule severity and scope as your governance program matures
- **Share Knowledge**: Embed best practices and remediation guidance directly in rules

### Dependencies

- Requires Tyk Governance v0.2 or higher

## Quick Start

In this tutorial, we'll create a simple governance ruleset that can be used to validate APIs.

### Prerequisites

- Access to Tyk Governance Hub

### Step-by-Step

1. **Access the Rulesets Section**

	 Navigate to the Rulesets section in your Tyk Governance dashboard.

2. **Create a New Ruleset**

	 Click the "Add Ruleset" button to create a new ruleset.

     {{< img src="img/governance/ruleset-list.png" >}}
     
3. **Choose a Template**

	 Select "Start from Template" and choose the "OpenAPI Best Practices" template.

4. **Customize Your Ruleset**

	 Provide a name and description for your ruleset, then review the pre-configured rules. You can enable/disable specific rules or adjust their severity levels.

5. **Save Your Ruleset**

	 Click "Save" to create your new ruleset.

6. **View Your Ruleset**

	 Your new ruleset will appear in the rulesets list. Click on it to view details and manage individual rules.

	 ![Ruleset Details](https://tyk.io/docs/img/governance/ruleset-details.png)

### Validation

- Successful ruleset creation will be confirmed with a success message
- The ruleset will appear in your rulesets list
- You can now use this ruleset to [evaluate APIs]({{< ref "tyk-governance/api-evaluation" >}})

## How It Works

Governance Rulesets use a powerful rule engine based on the Spectral format to define standards for API specifications. Each rule consists of a selector that identifies parts of the API specification to evaluate, a function that performs the evaluation, and metadata that provides context and remediation guidance.

### Rule Structure

A typical rule in a ruleset includes:

- **Given**: A JSONPath expression that selects parts of the API specification
- **Then**: Functions to apply to the selected parts
- **Severity**: The importance level (error, warning, info, hint)
- **Message**: A description of what the rule checks
- **HowToFix**: Guidance on resolving any violations

When you create a ruleset, you're defining a collection of these rules that work together to enforce your governance standards.

### Example Rulesets

#### Security Standards Ruleset

Create rulesets that define security requirements for APIs, such as authentication requirements, secure endpoints, and protection against common vulnerabilities.

```yaml
security-auth-required:
  description: APIs must require authentication
  severity: error
  given: $.paths.*.*
  then:
    field: security
    function: truthy
  howToFix: "Add a security requirement to this operation"
```

#### API Design Standards Ruleset

Define rules that enforce naming conventions, URL patterns, and response structures to maintain consistency across your API portfolio.

```yaml
path-case-convention:
  description: Path segments must use kebab-case
  severity: warning
  given: $.paths
  then:
    field: "@key"
    function: pattern
    functionOptions:
      match: "^\/([a-z0-9-]+|{[a-zA-Z0-9_]+})(\/{[a-zA-Z0-9_]+}|\/[a-z0-9-]+)*$"
  howToFix: "Rename path segments to use kebab-case (lowercase with hyphens)"
```

#### Documentation Standards Ruleset

Create rules that check for complete and accurate documentation, including descriptions, examples, and response schemas.

```yaml
operation-description:
  description: All operations must have descriptions
  severity: warning
  given: $.paths.*.*
  then:
    field: description
    function: truthy
  howToFix: "Add a meaningful description to this operation"
```

## Configuration Options

### Creating Rulesets

Rulesets can be created through the Governance UI or via API:

#### Using the UI

1. Navigate to the Rulesets section
2. Click "Add Ruleset"
3. Choose to start from scratch, template, or import
4. Configure ruleset details and rules
5. Save the ruleset

#### Using the API

```sh
curl -X POST https://your-governance-instance.tyk.io/api/rulesets \
  -H "Content-Type: application/json" \
  -H "X-API-Key: YOUR_API_KEY" \
  -d '{
    "metadata": {
      "name": "Security Standards",
      "description": "Security rules for all APIs",
      "active": true
    },
    "ruleset": {
      "rules": {
        "security-auth-required": {
          "description": "APIs must require authentication",
          "severity": "error",
          "given": "$.paths.*.*",
          "then": {
            "field": "security",
            "function": "truthy"
          },
          "howToFix": "Add a security requirement to this operation"
        }
      }
    }
  }'
```

### Managing Rulesets

Once created, rulesets can be managed through the UI or API:

#### Viewing Rulesets

- Navigate to the Rulesets section to see all rulesets
- Click on a ruleset to view its details and rules
- Use filters and search to find specific rulesets

#### Editing Rulesets

- From the ruleset details page, click "Edit"
- Modify ruleset metadata or individual rules
- Save your changes

#### Deleting Rulesets

- From the ruleset details page, click "Delete"
- Confirm the deletion

#### Using Templates

- When creating a new ruleset, select "Start from Template"
- Choose from pre-built templates for common standards
- Customize the template to meet your specific needs

## Use Cases

### Establishing Tiered Governance Standards

Create different rulesets for different API tiers based on criticality, allowing for appropriate governance without over-restricting less critical APIs.

**Implementation:**

1. Create a "Tier 1" ruleset with strict security, design, and documentation rules for mission-critical APIs
2. Create a "Tier 2" ruleset with moderate requirements for important but less critical APIs
3. Create a "Tier 3" ruleset with basic requirements for internal or non-critical APIs
4. Apply these rulesets selectively based on API classification

**Benefits:**

- Appropriate governance based on API importance
- More efficient use of development resources
- Clear expectations for different types of APIs

### Implementing Industry-Specific Standards

Create rulesets that enforce industry-specific regulations and best practices for APIs in regulated sectors.

**Implementation:**

1. Identify relevant industry standards (e.g., FAPI for financial services, HIPAA for healthcare)
2. Create rulesets that codify these standards as executable rules
3. Include detailed remediation guidance specific to the industry context
4. Apply these rulesets to APIs in the relevant domains

**Benefits:**

- Ensure compliance with industry regulations
- Reduce audit preparation time
- Standardize compliance approaches across teams

### Evolving Governance Standards Over Time

Use rulesets to gradually implement and evolve governance standards as your organization's API program matures.

**Implementation:**

1. Start with a basic ruleset focusing on critical security and fundamental design principles
2. Gradually add more rules as teams become familiar with the standards
3. Adjust severity levels over time (e.g., start as warnings, later promote to errors)
4. Incorporate feedback from development teams to refine rules

**Benefits:**

- Avoid overwhelming teams with too many rules at once
- Build governance maturity incrementally
- Gain buy-in through collaborative evolution

## Best Practices and Recommendations

- **Start with templates** for common standards like OWASP or OpenAPI best practices
- **Customize gradually** by adding organization-specific rules over time
- **Use appropriate severity levels** - reserve "error" for critical issues that must be fixed
- **Include clear remediation guidance** in the "howToFix" field for each rule
- **Group related rules** into focused rulesets (security, design, documentation)
- **Review and update rulesets regularly** as standards evolve
- **Collect feedback from developers** on rule clarity and usefulness
- **Document the purpose** of each ruleset for better organizational understanding
- **Maintain version control** for rulesets as they evolve
- **Assign ownership** to specific individuals or teams for each ruleset

## FAQs

<details> <summary><b>What rule formats are supported?</b></summary>

Tyk Governance supports Spectral-compatible rulesets in both YAML and JSON formats. This makes it compatible with existing Spectral rulesets and allows for easy migration from other tools.

</details> <details> <summary><b>Can I create custom functions for rules?</b></summary>

Currently, Tyk Governance supports the standard functions provided by the Spectral/Vacuum engine. Custom functions are planned for future releases.

</details> <details> <summary><b>How many rules can I have in a ruleset?</b></summary>

There's no hard limit on the number of rules in a ruleset, but performance may degrade with very large rulesets (100+ rules). We recommend organizing related rules into separate rulesets for better manageability and performance.

</details> <details> <summary><b>Can I import existing Spectral rulesets?</b></summary>

Yes, you can import existing Spectral rulesets in YAML or JSON format. This allows you to leverage your existing governance rules in Tyk Governance.

</details> <details> <summary><b>How do I use these rulesets to validate APIs?</b></summary>

Once you've created rulesets, you can use them to validate APIs through the [API Evaluation]({{< ref "tyk-governance/api-evaluation" >}}) feature, which allows you to check API specifications against your governance standards.

</details>

## Troubleshooting

<details> <summary><b>Error when creating or importing a ruleset</b></summary>

- Verify the ruleset is in valid YAML or JSON format
- Check that all required fields are present (given, then, severity)
- Ensure JSONPath expressions are valid
- Look for syntax errors in function options
- Try importing a smaller portion of the ruleset to identify problematic rules

</details> <details> <summary><b>Rule not appearing in ruleset</b></summary>

- Check that the rule definition follows the correct format
- Verify that the rule wasn't disabled during import
- Ensure the rule has a unique name within the ruleset
- Try adding the rule manually if it was part of an import

</details> <details> <summary><b>JSONPath expression not working as expected</b></summary>

- Test your JSONPath expression with a sample API specification
- Verify the syntax follows JSONPath standards
- Check for typos or missing elements in the path
- Consider simplifying complex expressions
- Use online JSONPath evaluators to debug expressions

</details> <details> <summary><b>Changes to ruleset not saving</b></summary>

- Ensure you have the necessary permissions
- Check for validation errors in the ruleset definition
- Verify you're clicking the final save button after making changes
- Try refreshing the page and making changes again
- Check browser console for any JavaScript errors

</details>
