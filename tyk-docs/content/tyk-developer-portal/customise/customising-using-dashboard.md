---
date: 2017-03-24T17:18:28Z
title: Customise Pages with CSS
linktitle: Pages with CSS
menu:
  main:
    parent: "Customise"
weight: 3 
---

The main customisation that can be done with the Tyk Dashboard is via the CSS Editor.

#### Step 1: Open CSS Editor

Click **CSS** from the **Portal Management** menu.

![Portal management menu][1]

#### Step 2: Make CSS Amendments

In the CSS Editor, add the classes that you would like to override in the home page. For Tyk Cloud and Multi-Cloud users, this will already be filled in with some initial overrides for you:

![Portal CSS editor][2]

#### Step 3: Make Email CSS Amendments

If you wish to customise how emails are displayed to end-users, then you can also add new classes to the Email CSS editor, these classes will be added in-line to the email that is sent out:

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
The below `curl` command will update the CSS for a specific organization.

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

![Email CSS editor][3]

Once you have finished making your changes, click the "Update" button, the new CSS should be available almost immediately on your site.

 [1]: /docs/img/dashboard/portal-management/portal_man_css.png
 [2]: /docs/img/dashboard/portal-management/portal_site_css.png
 [3]: /docs/img/dashboard/portal-management/portal_email_css.png