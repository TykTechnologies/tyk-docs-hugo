## Tutorial: Add an API and Swagger based Docs to a Portal Catalogue

You can use the Tyk Dashboard to create a portal that allows developers to access the APIs you create.

<iframe width="870" height="480" src="https://www.youtube.com/embed/cywF9Dvg6lI" frameborder="0" gesture="media" allowfullscreen></iframe>

### Prerequisites for a portal catalogue entry:

- An API configured and live on your Tyk Gateway
- The API must be **Closed** (i.e. it must use either Auth Token or Basic Auth security mechanisms)
- A security policy configured to grant access to the API

> **NOTE**: If you intend to use the developer portal, you need to configure it with a different hostname to your dashboard. The developer portal cannot be accessed via an IP address.

> **Warning**: Without these prerequisites, you may get a 404 error when trying to access the portal.

### Step 1: Select "Catalogue" from the "Portal Management" section

![Catalogue menu link location][1]

### Step 2: Click ADD NEW API

This page displays all of the catalogue entries you have defined, whether they have documentation attached and whether they are active on the portal or not. Click **ADD NEW API**.

![Add new API button location][2]

### Step 3: Set a Public API Name and associate a security policy

When publishing an API with Tyk, you are not publishing a single API, but instead you are publishing access to a group of APIs. The reason for this is to ensure that it is possible to compose and bundle APIs that are managed into APIs that are published. Tyk treats these as separate, so the thing that is published on the portal is not the same as the actual API being managed by Tyk, one is a logical managed API and the other (the published catalogue version) is a facade.

Since API policies allow the bundling of access control lists of multiple APIs, it is actually this that you are granting access to. Any developer that signs up for this API, will be granted a bearer token that has this policy as a baseline template, or as a "plan".

![Portal name and security policy][3]

Please note:

1.  You will only see security policies for valid APIs in the drop-down list for the policies
2.  The policy must be "closed" (see Prerequisites)

### Step 4: Add a description

All catalogue entries can have a description. You can use Markdown formatting in these fields:

![Description form][4]

### Step 5: Show the API

An API will not be published until you select **Show API**:

![API active checkbox][5]

### Step 6: Attach Documentation

You can add import documentation in the following formats:

- From a Swagger JSON file (OpenAPI 2.0 and 3.0 are supported)
- From a Swagger URL
- From API Blueprint

From v1.4, you can add your documentation before or after saving your API.

![Add Docs][8]

### Step 6: Save the API

To save the API, click **SAVE**.

### Step 7: Take a look

You can now visit your portal to see the API catalogue entry. Select **Open Your Portal** from the **Your Developer Portal** menu:

![Portal nav menu location][7]

[1]: /docs/img/dashboard/portal-management/nav_cat_2.5.png
[2]: /docs/img/dashboard/portal-management/portal_add_2.5.png
[3]: /docs/img/dashboard/portal-management/portal_policy_2.5.png
[4]: /docs/img/dashboard/portal-management/portal_description_2.5.png
[5]: /docs/img/dashboard/portal-management/portal_show_api_2.5.png
[6]: /docs/img/dashboard/system-management/api_save_2.5.png
[7]: /docs/img/dashboard/portal-management/open_portal_2.5.png
[8]: /docs/img/dashboard/portal-management/portal_attach_docs_2.5.png
