---
title: "Releasing Tyk Docs"
description: "Guide to releasing Tyk documentation"
tags: ["Authentication", "Authorization", "Tyk Authentication", "Tyk Authorization", "Secure APIs", "client"]
---

## Types of Releases

Tyk has two types of releases:

1.  **Patch Release:** e.g → 5.3.5, 5.3.6, 5.7.1, 5.7.2

    A patch release includes bug fixes, small improvements, and security patches. It does not introduce any breaking changes.

2.  **Major/Minor Release:** e.g → 4.1, 4.2, 5.3, 5.4

    A major or minor release includes new features, improvements, and potentially breaking changes.

### Versioning in Tyk Docs

Tyk Docs uses a versioning system that aligns with the Tyk components. The versioning follows the Semantic Versioning of Tyk [Gateway]({{< ref "developer-support/release-notes/gateway" >}}).

## Understanding the Release Workflow

Tyk Documentation is maintained in a [GitHub](https://github.com/TykTechnologies/tyk-docs) repository, and the release workflow is managed through branches. The following table outlines the special branches used in the Tyk Docs repository:

| **Special Branches** | **Description** | **Docs URL** |
|---------------------------|-----------------|--------------|
| `master`                  | Holds docs for nightly build. | [tyk.io/docs/nighlty](https://tyk.io/docs/nighlty) |
| `release-x.y`             | Holds docs for that specific version. For example, `release-5.7` holds docs for 5.7 and its patch versions (5.7.1, 5.7.2, etc.). | [tyk.io/docs/5.7](https://tyk.io/docs/5.7) |
| `stable`                  | Holds the latest release. | [tyk.io/docs](https://tyk.io/docs) |

Documentation content is always merged into the `master` branch first, and then the changes are made to the `release-x.y` branches as needed.

The `stable` branch automatically replicates changes from the latest release branch (e.g., `release-5.7`) to ensure that the live site always reflects the most recent stable version. So at tyk.io/docs and tyk.io/docs/5.7, you will see the same content.

### Previous Releases

Tyk has some versions that are on LTS. During some releases, we need to update the LTS release alongside the latest version. For example, you might have to maintain 5.7.2 (latest) and 5.3.2 (LTS). Due to structural changes in the documentation across versions, this cannot be done directly, and a separate PR must be created from the latest RNs and config PR. This process has to be done manually and will require the help of DX.

## Patch Release

To release a patch version, we follow a simple process that involves merging the release notes and documentation PRs into the master and the specific release branch (e.g., `release-5.7`).

### Pre-Requisites:

Ensure you have PRs for documentation and release notes that have already been approved.

**Note:** For release notes ensure that we have updated the Tyk component version on the [release summary page](https://tyk.io/docs/developer-support/release-notes/overview/)

### Instructions

1.  **Deploy release: Merge RNs and Docs PRs**\
    **Description:** The PRs mentioned in the prerequisites can now be merged in master and release branch (release-5.7)

2.  **Verify**\
    **Description:** After merging the PRs on the version branch (release-5.7), it usually takes 5 minutes to reflect the same on the live website. Verify these changes after release.

Note: We can also have patch release for previous versions. For example, if the latest version is 5.7.2 and the new patch is 5.7.3, and a patch for LTS version 5.3.3 is also needs to be released, then you will have to merge the PRs for both versions.

## Major/Minor Release

To release a major or minor version, we follow a series of steps to ensure that the documentation is updated, the latest version is deployed, and the previous versions are maintained correctly. The following steps outline the process:

### Pre-Requisites:

1. Mintlify is updated with docs.json (has versions and redirects)

### Instructions

1.  **Add the latest version in Python Script:**\
    **Description:** Over time, the content of pages is moved to new pages and deleted. This script is used to maintain a one-to-one mapping of which page is compatible with which version.\
    **Automation:** This [Github Action](https://github.com/TykTechnologies/tyk-docs/actions/workflows/release.yml) generates this page.\
    **Example**: <https://github.com/TykTechnologies/tyk-docs/pull/5376>\
    **Steps:**

    1.  Invoke this [Github Action](https://github.com/TykTechnologies/tyk-docs/actions/workflows/release.yml) with the following values. Ensure you follow the naming convention of release branches (release-x.y)

    2.  This will create 3 PRs. The one we are interested in will be named Update version.json

    3.  Merge the PR into master

2.  **Update stable branch updater**\
    **Description:** We are updating a GitHub Action here. This action ensures that anything we merge into the version branch (release-5.7) is also merged into the stable branch, which directly reflects our live site.\
    **Automation:** This [Github](https://github.com/TykTechnologies/tyk-docs/actions/workflows/release.yml) Action generates this page.\
    **Example**: <https://github.com/TykTechnologies/tyk-docs/pull/5377>\
    **Steps:**

    1.  Invoke this [Github Action](https://github.com/TykTechnologies/tyk-docs/actions/workflows/release.yml) with the following values. Ensure you follow the naming convention of release branches (release-x.y)

    2.  This will create 3 PRs. The one we are interested in will be named Update stable-updater.yaml to use release-5.8

    3.  Merge the PR into master, current latest till release-5. **We need to merge the PR to all the way to previous branches.**

4.  **Add GitHub Branch Protection to** release-5.8 **branch**\
    **Description:**\
    **Automation:** Not Available\
    **Steps:**

    1.  Go to Github settings.

    2.  Copy branch protection rules of the previous release branch to this release.

5.  **Update the previous version URL to be versioned once 5.8. released**\
    Description: This change ensure that our current latest version is now available at the URL prefix /5.7\
    **Steps:**

    1.  Invoke this [Github Action](https://github.com/TykTechnologies/tyk-docs/actions/workflows/release.yml) with the following values. Ensure you follow the naming convention of release branches (release-x.y)

    2.  This will create 3 PRs. The one we are interested in will be named Update baseURL to //tyk.io/docs/5.7/ this needs to be merged in current version.

6.  **Deploy release: Merge all RNs, Docs & Config PRs**\
    Description: The PRs mentioned in the prerequisites can now be merged in master and latest branch that was created in the previous steps.

7.  **Update release notes landing page for 5.8.0 release**\
    **Description:** This step ensures we have updated the Tyk component version on the [release summary page](https://tyk.io/docs/developer-support/release-notes/overview/). This should already be taken care of in the pre-requisite PRs. If not, then create a PR for the same.

8.  **Deploy versions Drop Down LIsts**\
    **Description:** This step updates the version dropdown on the docs site.\
    **Automation:** This [Github Action](https://github.com/TykTechnologies/tyk-docs/actions/workflows/page_available_since.yml) will generate the required PR.\
    **Example:** <https://github.com/TykTechnologies/tyk-docs/pull/5545>\
    **Steps:**

    1.  Run the Github action from master, this will generate a PR. **Github Action:** <https://github.com/TykTechnologies/tyk-docs/actions/workflows/page_available_since.yml>

    2.  This PR has to be merged to master all previous versions till you get a merge conflict.

9.  **Verify that Everything is working**\
    **Steps:**

    1.  Go to the latest [https://tyk.io/docs](https://tyk.io/docs/) URL and navigate through the docs to ensure it is not redirecting to some other URL.

    2.  Go to the previous URL, <https://tyk.io/docs/5.7>, and navigate through the docs to ensure it is not redirected to some other URL.

10. **Rerun Algolia Search Index**\
    **Description:** To enable instant search on the latest documents without relying on the CRON job, we need to manually index the new pages.\
    **Automation:** We have a CRON job that runs daily to update the index.\
    **Steps:**

    1.  Login to algolia

    2.  Select the latest project

    3.  Click on Datashource → crawler → select tyk- crawler

    4.  Click on Resume Crawling

11. **Update Postman Collections**\
    **Description:** We maintain a postman collection for the following Tyk Componets. After a\
    **Automation:** Not Available\
    **Steps:**\
    These instructions are for a single Tyk component and must be repeated for others.

    1.  Download the swagger from the docs website or the respective Github repository of the component.

    2.  In Postman, select the import option and drop the file you downloaded in the first step.

    3.  After the import, change the name. Refer to our previous collection name.

    4.  In the Postman documentation for a collection, you need to add an image. Copy it from the previous Postman collection.

    5.  Add the latest prefix and remove the previous one. This ensures that the latest version is always displayed at the top.

12. **Update the HubSpot Banner to indicate the release of 5.8 on old docs pages.**\
    **Description:** We use HubSpot to display a banner at the top of our docs page, which indicates that you are viewing old documentation and points to the latest version.\
    Here is a sample banner you can view on this [page](https://tyk.io/docs/4.0/getting-started/key-concepts/graphql-subscriptions/).

    **Automation:** Not Available\
    **Steps:** Inform @Jennifer Craig to release the new banner.

13. **Add a reference to release notes in Github Releases.**\
    **Description:** Developers usually refer to the release tags to view the changelog. These release tags should point to the release notes in the docs.\
    **Automation:** Not Available\
    **Steps:** Modify the release tags of all components modified in a release.\
    **Example:** <https://github.com/TykTechnologies/tyk/releases/tag/v5.3.8>

---