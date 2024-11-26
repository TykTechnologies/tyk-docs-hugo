---
title: "Upgrading themes for Tyk Enterprise Portal"
date: 2022-02-07
tags: ["Tyk Developer Portal","Enterprise Portal",]
description: ""
menu:
  main:
    parent: "Tyk Enterprise Developer Portal"
weight: 1

---

## Overview

The Tyk Enterprise Developer Portal does not automatically update the default theme with each new release of the product, because doing so could result in the loss of customizations made by customers.
Therefore, customers are required to manually upgrade their themes to access the latest updates and fixes. We recommend using GitFlow for the latest theme updates.
Alternatively, you can download the theme package from the **Releases** section of the [portal-default-theme](https://github.com/TykTechnologies/portal-default-theme) repository.
However, we advise against this method, as it requires you to merge your customized theme with the downloaded one, which is much simpler to accomplish via GitFlow.
Follow the guide below to obtain the latest version of the portal theme and merge it with your customized version.

## Updating Tyk Enterprise Developer Portal themes via gitflow


The default theme for the Tyk Enterprise Developer Portal is located in the [portal-default-theme](https://github.com/TykTechnologies/portal-default-theme) repository.
The `main` branch contains code corresponding to the latest stable release. If you wish to check out a specific release (e.g., v1.8.3), you can use tags:

```console
git checkout tags/1.8.3 -b my-custom-theme branch
```

To organize local development in a way that facilitates seamless theme updates using git merge, follow the steps below:
1. Fork the `portal-default-theme` repo in [github](https://github.com/TykTechnologies/portal-default-theme).
   {{< img src="/img/dashboard/portal-management/enterprise-portal/fork-portal-theme-repo.png" alt="Fork the portal-theme repo" >}}

2. Clone the forked repository:
```console
git clone https://github.com/my-github-profile/portal-default-theme && cd ./portal-default-theme
```

3. If you have an existing repository, check if you already have the `portal-default-theme` repo among your remotes before adding it. Execute the following command to check:
```console
git remote -v | grep 'TykTechnologies/portal-default-theme'
```

Skip the next step if you see the following:
```console
# portal-default-theme  https://github.com/TykTechnologies/portal-default-theme (fetch)
# portal-default-theme  https://github.com/TykTechnologies/portal-default-theme (push)
```

If the output of the above command is empty, proceed to step 5 to add the `portal-default-theme`.

4. Add the `portal-default-theme` to the remotes by executing the following command:
```console
git remote add portal-default-theme https://github.com/TykTechnologies/portal-default-theme
```

5. Create a new local branch that tracks the remote `main` branch. That branch will mirror the latest changes from the `portal-default-theme` main. You will be using it to import the latest changes from the `portal-default-theme` to your custom theme:
```console
git fetch portal-default-theme main:portal-default-theme-main
```

If you have an existing local branch that tracks the `main` branch in the `portal-default-theme` repo, you can just pull the latest updates:
```console
git checkout portal-default-theme-main
git pull portal-default-theme main
```

6. To start customizing the theme, create a local develop branch from the `portal-default-theme-main`:
```console
git checkout portal-default-theme-main
git checkout -b dev-branch
```

7. Once the required customizations are completed, commit the changes to the `dev-branch`.

8. Merge the latest updates from the `portal-default-theme` into the `dev-branch`. Please remember to always pull the latest changes from the `portal-default-theme-main` branch before merging:
  - Checkout to the portal-default-theme-main and fetch the latest changes.
    ```console
    git checkout portal-default-theme-main
    git pull portal-default-theme main
    ```
  - Checkout the dev-branch and merge the changes from the portal-default-theme-main to retrieve the latest changes from the portal-default-theme repo with the customized theme.
    ```console
    git checkout dev-branch
    git merge portal-default-theme-main
    ```

Finally, address merge conflicts and commit changes.

{{< note success >}}
**You have successfully updated your custom theme**

Now you can repeat the above described process when upgrading the portal version to make sure you have incorporated the latest theme changes to your customized theme.

{{< /note >}}

## Upload the theme to the portal
Once you have merged your local changes with the latest changes from the `portal-default-theme` repo, you need to create a zip archive with the customized theme and upload it to the portal.
1. Create a zip archive with the customized theme. Make sure you zip the content of the `src` folder and not the folder itself. To create a zip archive with the customized theme execute the following:
   - cd to the `src` directory to make sure you:
    ```console
    cd ./src
    ```
    - zip the content of the `src` directory:
    ```console
    zip -r9 default.zip 
    ```

2. Upload the theme package that is created in the previous step to the portal. You can use the portal's [Admin dashboard]({{< ref "/tyk-stack/tyk-developer-portal/enterprise-developer-portal/customise-enterprise-portal/full-customisation/file-structure-concepts#part-1-create-a-new-theme" >}}) or the [admin API]({{< ref "/product-stack/tyk-enterprise-developer-portal/api-documentation/tyk-edp-api" >}}) to do it.
![image](https://github.com/TykTechnologies/tyk-docs/assets/14009/f0e547b2-b521-4c3e-97ce-fd3a2a3b170b)
3. Finally, you need to [activate]({{< ref "/tyk-stack/tyk-developer-portal/enterprise-developer-portal/customise-enterprise-portal/full-customisation/file-structure-concepts#part-3-activate-a-theme" >}}) the theme so that it will be applied to the portal.
