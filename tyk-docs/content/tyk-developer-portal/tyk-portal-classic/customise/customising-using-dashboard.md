---
date: 2017-03-24T17:18:28Z
title: Customise Pages with CSS and JavaScript
linktitle: Customise Pages with CSS and JS
menu:
  main:
    parent: "Customise"
weight: 3 
aliases:
  - /tyk-developer-portal/customise/customising-using-dashboard/
---

The main customisation that can be done with the Tyk Dashboard is via the CSS Editor.

JS customization is also available in a programmatic way.

#### Step 1: Open CSS Editor

Click **CSS** from the **Portal Management** menu.

{{< img src="/img/dashboard/portal-management/cssNav.png" alt="Portal management menu" >}}

#### Step 2: Make CSS Amendments

In the CSS Editor, add the classes that you would like to override in the home page. For Tyk Cloud and Multi-Cloud users, this will already be filled in with some initial overrides for you:

{{< img src="/img/dashboard/portal-management/cssEditor.png" alt="Portal CSS editor" >}}

#### Step 3: Make Email CSS Amendments

{{< img src="/img/dashboard/portal-management/portal_email_css.png" alt="Email CSS editor" >}}

If you wish to customise how emails are displayed to end-users, then you can also add new classes to the Email CSS editor, these classes will be added in-line to the email that is sent out.

Once you have finished making your changes, click **Update** and the new CSS will be available on your site.

### Updating CSS via API
Alternatively, as always, you can perform the above actions with an API call instead of through the Dashboard UI.

First, we'll need to get the block ID of the CSS component in order to update it.  This is stored in Mongo by the Dashboard.
To get the block ID, we have to make a REST call to the Dashboard API.  

To do so, run this `curl` command:

```{.copyWrapper}
curl www.tyk-test.com:3000/api/portal/css \
-H "Authorization:{DASHBOARD_API_KEY}"
```
Response:
```{.copyWrapper}
{
    "email_css": "",
    "id": "{CSS_BLOCK_ID},
    "org_id": "{ORG_ID}",
    "page_css": ".btn-success {background-color: magenta1}"
}
```
Now we can use the `id` and the `org_id` to update the CSS.
The below `curl` command will update the CSS for a specific organisation.

```{.copyWrapper}
curl -X PUT http://tyk-dashboard.com/api/portal/css \
  -H "authorization:{DASHBOARD_API_KEY}" \
  -d '{
    "email_css": "",
    "id": "{CSS_BLOCK_ID},
    "org_id": "{ORG_ID}",
    "page_css": ".btn-success {background-color: magenta}"
  }' 
```

 [1]: /img/dashboard/portal-management/portal_man_css.png
 [2]: /img/dashboard/portal-management/portal_site_css.png

 ### Updating JavaScript via API

 In order to initialize the portal JS object in the database use the following request where `console.log(1)` should be replaced by your JS snippet:

 ```{.copyWrapper}
curl -X POST www.tyk-test.com:3000/api/portal/js \
-H "Authorization:{DASHBOARD_API_KEY}" \
-d '{"page_js": "console.log(1)"}'
```

Request:
```{.copyWrapper}
{
    "page_js": "console.log(1)"
}
```

Response:
```{.copyWrapper}
{
    "Status": "OK",
    "Message": "609b71df21c9371dd5906ec1",
    "Meta": null
}
```

The endpoint will return the ID of the portal JS object, this can be used to update it.

 ```{.copyWrapper}
curl www.tyk-test.com:3000/api/portal/js \
-H "Authorization:{DASHBOARD_API_KEY}" \
--data '{"page_js": "console.log(2)", "id": "609b71df21c9371dd5906ec1"}'
```

Request:
```{.copyWrapper}
{
    "page_js": "console.log(2)",
    "id": "609b71df21c9371dd5906ec1"
}
```

Response:
```{.copyWrapper}
{
    "page_js": "console.log(1)"
}
```

The JavaScript snippet that's added through this endpoint is injected at the bottom of the portal page using a `<script>` tag.
