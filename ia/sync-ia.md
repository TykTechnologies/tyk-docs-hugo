# Information Architecture for Tyk Sync Documentation Website

Based on the analysis of the Tyk Sync codebase, here's a proposed information architecture for the documentation website that follows the specified rules:

## Label: Getting Started

- Introduction to Tyk Sync
- Installation
  - From Source
  - Using Docker
  - Using Package Manager
- Quick Start Guide
- Key Concepts
  - API Definitions
  - Policies
  - Synchronization Process
  - Version Control Integration

## Label: Commands

- Overview
- Dump
  - Options and Flags
  - Examples
- Publish
  - Options and Flags
  - Examples
- Sync
  - Options and Flags
  - Examples
- Update
  - Options and Flags
  - Examples
- Examples Command
  - Listing Examples
  - Showing Example Details
  - Publishing Examples
- Version Command

## Label: Use Cases

- Migrating Between Environments
  - Development to Staging
  - Staging to Production
- Backup and Restore
  - Backing up API Definitions
  - Restoring from Backup
- CI/CD Integration
  - GitHub Actions
  - GitLab CI
  - Jenkins
- Working with Swagger/OpenAPI
  - Converting Swagger to Tyk Definitions
  - Best Practices

## Label: Reference

- Configuration
  - Dashboard Connection
  - Gateway Connection
  - VCS Settings
- API Objects
  - Structure
  - Required Fields
  - Optional Fields
- Policy Objects
  - Structure
  - Required Fields
  - Optional Fields
- Troubleshooting
  - Common Errors
  - Debugging Tips
- Release Notes
  - Version History
  - Deprecation Notices

## Label: Developer Resources

- Contributing to Tyk Sync
- Building from Source
- Architecture Overview
  - Component Diagram
  - Data Flow
- API Reference
  - Client Interfaces
  - Publisher Interfaces

This information architecture provides a logical organization of content with a maximum of 3 levels of nesting. It covers all the major aspects of Tyk Sync functionality while making it easy for users to find the information they need.