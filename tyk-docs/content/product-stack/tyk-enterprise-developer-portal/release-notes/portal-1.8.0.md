---
title: Tyk Enterprise Developer Portal v1.8.0
description: Release notes documenting updates, enhancements and changes for Tyk Enterprise Developer Portal v1.8.0
tags: ["Developer Portal", "Release notes", "changelog", "v1.8.0"]
menu:
main:
parent: "Release Notes"
weight: 7
---

**Licensed Protected Product**

##### Release Date 24 Nov 2023

#### Breaking Changes
This release has no breaking changes.

#### Future breaking changes
This release doesn't introduce future breaking changes.

#### Deprecations
There are no deprecations in this release.

#### Upgrade instructions
If you are on 1.7.0 or an older version we advise you to upgrade ASAP directly to this release.
When upgrading from 1.6.0 or earlier versions, customers may experience problems when starting the portal. One of the possible issues is the following:
- When the portal theme [manifest]({{< ref "tyk-stack/tyk-developer-portal/enterprise-developer-portal/customise-enterprise-portal/full-customisation/file-structure-concepts#manifest-file" >}}) has a reference to a template that is not present in the theme then the theme won't be loaded. This check that prevents admin users from uploading themes with potential errors was introduced in version [1.7.0]({{< ref "/product-stack/tyk-enterprise-developer-portal/release-notes/portal-1.7.0.md#content-blocks-validation" >}}).
- At the same time, the default theme in version 1.6.0 of the portal had a reference in the theme manifest to the `portal_home` template that didn't exist in the theme.
- The portal doesn't update the theme automatically because in that case any customer-made changes will be lost. Subsequently, upgrading from 1.6.0 to 1.8.0 may result in the following error when loading the theme:
```yaml
{"level":"info","time":"2023-11-23T12:25:35.646Z","caller":"application/themes.go:121","message":"Failed to initialize theme '/themes/default': loading theme templates code references: getting template portal_home: portal_home.tmpl not found"}
{"level":"info","time":"2023-11-23T12:25:35.646Z","caller":"application/themes.go:135","message":"0 themes loaded."}
panic: theme 'default' not found
```
- Moreover, when there was a single theme in the portal, it wouldn't start because it didn't recognize the theme as valid.

To overcome the issue, please follow our upgrade instructions for your storage type as outlined in the sections below.

The following instructions explain the easiest way to upgrade the default theme when upgrading from 1.6.0 to 1.8.0.

In order to upgrade the theme, you will need to remove the existing default theme and let the portal unpack the current default theme that is compatible with v1.8.0 release. Therefore, the update is performed in four steps:
1. (Optionally) Save a copy of the current default theme if there are any changes to it that you want to save.
2. Remove the existing default theme that prevents the portal from starting.
3. Start the portal so that it will unpack the compatible theme.
4. (Optionally) Apply changes from the saved theme.

In later releases, we will publish the theme within a public git repository. This way you can apply git-flow when upgrading the theme.

{{< note >}}
**Note**

If your current active theme is not the default theme, downgrade to v1.6.0 and activate the default theme first before implementing the below steps.
{{< /note >}}

##### Upgrade default theme within filesystem storage type
To upgrade the default theme that is stored in a filesystem (fileSystem mounted by localhost or PVC or csi-driver) you will need a shell to access that specific file system. Execute the following steps to upgrade the theme:
1. **Navigate to the theme directory**. Locate the theming directory used for the portal application defined by `Theming.Path` in the portal config file or `PORTAL_THEMING_PATH` environment variable. By default, the theming path is `./themes`. So, it will be placed in the `themes` directory relative to wherever the portal app is run from.
2. *(Optional)* Save a copy of the current default theme if there are changes that you want to keep. 
3. **Remove the default theme**. To remove the existing version of the default theme from a filesystem, navigate to the theme directory and remove the default theme:
```shell
rm -rf ./default
```
4. **Start the portal.** Once the default theme is deleted, start the portal v1.8.0 again, and it will start with the upgraded default theme.
5. *(Optional)* Once the portal is operational again, you can download the correct default theme and apply any changes from the existing theme that was saved in step 2.

##### Upgrade default theme within S3 storage type
To upgrade the default theme that is stored in an S3 bucket you will access to the S3 console with read-write rights. Execute the following steps to upgrade the theme:

1. **Navigate to the S3 bucket that is used to store themes**. This bucket is defined by `S3.Bucket` in the portal config file or `PORTAL_S3_BUCKET` environment variable. The default theme should be present in the theming directory that is defined by `Theming.Path` in the portal config or `PORTAL_THEMING_PATH` environment variable. By default, the theming path is set to `/themes`.
2. *(Optional)* Save a copy of the current default theme if there are changes that you want to keep. 
3. **Remove the default theme** by deleting the default directory from the theming directory.
4. **Start the portal.** Once the default theme is deleted, start the portal v1.8.0 again and it will start with the upgraded default theme.
5. *(Optional)* Once the portal is operational again, you can download the correct default theme and apply any changes from the existing theme that was saved in step 2.

##### Upgrade default theme within DB storage type
To upgrade the default theme that is stored in a database bucket (the `db` storage type) you should be able to run SQL commands on the database that the portal is using. Execute the following steps to upgrade the theme:
1. *(Optional)* If you need to save changes to the existing default theme, downgrade to 1.6.0, start the portal and download the theme either via the UI or the admin APIs.
2. **Remove the default theme**. The portal stores its themes in the `Assets` table. Run the following SQL command to remove the default theme from the database:
```sql
delete from assets where path like "%<theming-path>/default%";
```
Before executing the command be sure to replace the `<theming-path>` with the path defined by `Theming.Path` in the portal config or `PORTAL_THEMING_PATH` environment variable. By default, it is `/themes`, so if you have not explicitly changed this, your command should be as follows:
```sql
delete from assets where path like "%/themes/default%";
```
3. **Start the portal.** Once the default theme is deleted, start the portal v1.8.0 again and it will start with the upgraded default theme.
4. *(Optional)* Once the portal is operational again, you can download the correct default theme and apply any changes from the existing theme that was saved in step 1.

{{< note >}}
**Note**

For PVC, if you are stuck with a crashing issue on a newer portal release (version > v1.7.0) running in k8s with PVC storage that contains an older theme (from version < v1.7.0), roll back to v1.6.0 or start a temporary pod with the same PVC mounted to it. Then delete all the existing themes as stated above and deploy the new release.
{{< /note >}}


## Release Highlights
#### Custom attributes for the User model and the sign-up form customization
We added the capability to add additional data fields to the User model and set their behavior. This way API Providers can:
Extend the User model with additional fields of one of four types:
  - String
  - Number
  - List of strings
  - Boolean
- Configure the behavior of these fields:
  - Add the new data fields to the user sign-up form
  - Force the portal to add the fields to the key metadata to make them available to custom plugins during API calls
  - Make the fields required or optional and lock them once a user profile is created
- Set visibility and access rights for the custom data fields:
  - Determine if developers can view the fields or are they restricted to only admin users?
  - Can developers edit the fields?

All settings are available via the [admin API]({{< ref "product-stack/tyk-enterprise-developer-portal/api-documentation/tyk-edp-api.md" >}}) and the UI.

To create a custom attribute, define it in the custom attributes menu:
{{< img src="/img/dashboard/portal-management/enterprise-portal/1.8.0-create-custom-attribute.png" width=500px alt="Create a custom attribute for the User model">}}

This is how it looks like in the user sign-up form:
{{< img src="/img/dashboard/portal-management/enterprise-portal/1.8.0-sign-up-form.png" width=500px alt="The user sign-up form with the custom attribute">}}

#### CORS settings
In this release, we introduced the config options to set up CORS settings such as:
- Allowed origins
- Allowed headers
- Allowed methods
- Are credentials (cookie or client-side certificates) allowed?
- max-age of the preflight request cache

These settings are useful when the portal sits behind a proxy or a CDN and the portal admin needs to configure the CORS settings on the portal side so that the incoming call from a third-party origin (e.g. a CDN or a proxy) are not rejected by the browser.
To set the CORS configuration please refer to the Portal's [configuration documentation]({{< ref "product-stack/tyk-enterprise-developer-portal/deploy/configuration.md#cors-settings" >}}).

#### Connection testing to OAuth2.0 Identity providers
We enhanced our OAuth2.0 support by adding the capability to test connections to OAuth2.0 Identity providers (IdPs) when setting up OAuth2.0 with the Tyk Enterprise Developer Portal.
This way, you can make sure the Portal has connectivity with the IdP before saving the OAuth2.0 settings and creating the first OAuth2.0 client.

{{< img src="/img/dashboard/portal-management/enterprise-portal/1.8.0-test-idp-connectivity.png" width=500px alt="Test connectivity to an IdP">}}

#### Verbose logs for the DCR flow
In addition to the new connection testing functionality, we added one more tool to help customers resolve complex integration issues when integrating with OAuth2.0 providers.
Now when the [PORTAL_DCR_LOG_ENABLED]({{< ref "product-stack/tyk-enterprise-developer-portal/deploy/configuration.md#portal_dcr_log_enabled" >}}) environment variable is set to `true`, the portal will output not only the status and status code of the request to the IdP, but also actual payload returned by the IdP: 
```yaml
{"level":"error","time":"2023-10-10T17:02:27.484+0200","caller":"client/dcr-helpers.go:152","message":"IdPResponse: {\"error\":\"insufficient_scope\",\"error_description\":\"Policy 'Allowed Client Scopes' rejected request to client-registration service. Details: Not permitted to use specified clientScope\"}
```

## Download
- [Docker image to pull](https://hub.docker.com/layers/tykio/portal/v1.8.0/images/sha256-d93fcfbbcc4a72d3f6abf49ce65f234e6e65915a43cca3a30d5376e5fab2d644?context=explore)
- [The default theme package](https://github.com/TykTechnologies/portal-default-theme/releases/tag/1.8.0)

## Changelog

#### Added
- Added the custom attributes to the User model so that the portal admins can extend the data stored in the user profile and customize the user sign-up form.
- Added the capability to test the connection to OAuth2.0 Identity providers menu to help the portal admin troubleshoot connectivity issues when configuring OAuth2.0 with the portal.
- Added the config options for configuring the CORS settings.

#### Changed
- Display an actual item title instead of a generic iterative name in the Pages and the Providers UI (e.g. "HeaderButtonLabel" instead of "ContentBlock 1" in the Pages menu).
- When [PORTAL_DCR_LOG_ENABLED]({{< ref "product-stack/tyk-enterprise-developer-portal/deploy/configuration.md#portal_dcr_log_enabled" >}}) is enabled the portal now returns not only the status and status code of the request to the IdP but also actual payload returned by the IdP

#### Fixed
- Fixed the bug where the database credentials were printed in the logs when bootstrapping the portal.
- Fixed the bug where the session cookie was disclosing the username and role.
- Fixed the bug where the [Forgot Password page]({{< ref "tyk-developer-portal/tyk-enterprise-developer-portal/api-consumer-portal/reset-password.md#introduction" >}}) did not reflect the current theme.
- Fixed the bug where the DCR flow failed to create a client with policies managed by Tyk Operator.
- Fixed the bug where an admin user couldn't upload a new theme file in Kubernetes environment.
- Fixed the bug where the portal application went down after running for several hours in Kubernetes environment.
- Fixed the bug where it was possible to remove the default organization which resulted in the portal being non-operational.
- Fixed the bug where the portal panicked when an IdP was not available while creating a new OAuth2.0 client.
- Fixed the bug where a developer could access API Products regardless of the access rights set by catalogs.
- Fixed the bug where it wasn't possible to change a team for a user.
- Fixed the bug where the error wasn't displayed to an admin user when the theme validation failed while uploading a theme package.
- Fixed the bug where the rich text editor added extra `<p>` tags to the text.
- Fixed the bug where the live portal UI was broken when there is more than one OpenAPI specification attached to an API Product.
- Fixed the bug where it wasn't possible to remove an API from an API Product.

## Further Information

### Upgrading Tyk
Please refer to the [upgrading Tyk]({{< ref "upgrading-tyk" >}}) page for further guidance with respect to the upgrade strategy.

### FAQ
Please visit our [Developer Support]({{< ref "frequently-asked-questions/faq" >}}) page for further information relating to reporting bugs, upgrading Tyk, technical support and how to contribute.
