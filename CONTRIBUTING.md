# Table of Contents
1. [Contributing to Tyk](#contributing-to-tyk)
2. [Our SLA for issues and bugs](#our-sla-for-issues-and-bugs)
3. [Filling an issue](#filling-an-issue)
4. [Contributor License Agreements](#contributor-license-agreements)
5. [Guidelines for Pull Requests](#guidelines-for-pull-requests)
6. [Project Structure](#project-structure)
7. [Building and Running test](#building-and-running-test)
8. [Coding Conventions](#coding-conventions)
9. [Resources](#resources)
10. [Technical guidance to update doc pages yourself](#Technical-guidance-to-update-doc-pages-yourself)

## Contributing to Tyk

**First**: if you're unsure or afraid of anything, just ask or submit the issue or pull request anyway. 
You won't be yelled at for giving your best effort. The worst that can happen is that you'll be politely asked to change something. 
We appreciate any sort of contributions, and don't want a wall of rules to get in the way of that.

However, for those individuals who want a bit more guidance on the best way to contribute to the project, read on. 
This document will cover what we're looking for. 
By addressing all the points we're looking for, it raises the chances we can quickly merge or address your contributions.

### Our SLA for issues and bugs
We do value the time each contributor spends contributing to this repo, and we work hard to make sure we respond to your issues and Pull request as soon as we can.

Below we have outlined. 

### Filling an issue 
Before opening an issue, if you have a question about Tyk or have a problem using it, please
start with the GitHub search and our [community forum](https://community.tyk.io). 
If that doesn't answer your questions, and you have an idea for a new capability  or if you think you found a bug, [file an
issue](https://github.com/TykTechnologies/tyk-docs/issues/new/choose).

### Contributor License Agreements

Before we can accept any PR the contributor need to sign the [TYK CLA](https://github.com/TykTechnologies/tyk/blob/master/CLA.md).

Once you are CLA'ed, we'll be able to accept your pull requests.For any issues that you face during this process, please create a GitHub issue explaining the problem, and we will help get it sorted out.

### Guidelines for Pull Requests

We have created a few guidelines to help with creating PR. To make sure these requirements are followed we added them to the PR form as well:

1. When working on an existing issue, simply respond to the issue and express interest in working on it.  This helps other people know that the issue is active, and hopefully prevents duplicated efforts.
2. For new ideas it is always better to open an issue and discuss your idea with our team first, before writing changing pages.
3. Create small Pull request that address a single issue instead of multiple issues at the same time. This will make it possible for the PRs to be reviewed independently.
5. Make sure to run tests locally before submitting a pull request and verify that all of them are passing.
6. CLA - Before we can accept any PR the contributor need to sign the [TYK CLA](https://github.com/TykTechnologies/tyk/blob/master/CLA.md).
       Once you are CLA'ed, we'll be able to accept your pull requests.For any issues that you face during this process, please create a GitHub issue explaining the problem, and we will help get it sorted out.
7. Tips for making sure we review your pull request faster :
    1. Keep your pull request up to date with upstream master to avoid merge conflicts.
    2. Use meaningful commit messages.
    3. Provide a good PR description as a record of what change is being made and why it was made. Link to a GitHub issue if it exists.
    4. Make sure there are no typos
    
### Project Structure

  Folder [tyk-docs/tyk-docs/content/](https://github.com/TykTechnologies/tyk-docs/tree/master/tyk-docs/content) contains the actual docs pages.
  Fill free to ignore anythig else ousite this folder unless you do Hugo changes.
  
### Building and Running test

 If yo want to add tests and restrictions to our docs, you can do that by adding more GH actions under [.github/workflows](https://github.com/TykTechnologies/tyk-docs/tree/master/.github/workflows) folder.

### Coding Conventions

- No typos
- Use *back ticks* for field names like `field_name`
- Use *```json* for multi line code
- TBD. This section is still a WIP

### Resources
- [How to Contribute to Open Source](https://opensource.guide/how-to-contribute/)
- [Using Pull Requests](https://help.github.com/articles/about-pull-requests/)


## Technical guidance to update doc pages yourself 
Check [this] for detailed explanations on create and update doc pages including specific GUI components.
