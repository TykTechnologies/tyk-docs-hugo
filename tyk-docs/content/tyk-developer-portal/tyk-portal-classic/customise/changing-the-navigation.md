---
date: 2017-03-24T17:24:32Z
title: Customise the Portal Menus
linktitle: Menus
menu:
  main:
    parent: "Customise"
weight: 1 
aliases:
  - /tyk-developer-portal/customise/changing-the-navigation/
---

The Portal supports a data structure to hold rudimentary menus, all pages have access to all menus, and can be accessed using the `.Menus.MenuName` field tag. They are arrays that consist of slugs and names, an implementation example would be:

```{.copyWrapper}
<ul class="nav navbar-nav">
  {{ range $index, $menuItem := .Menus.Main}}
  <li><a href="/portal/{{$menuItem.URL}}">{{$menuItem.Title}}</a></li>
  {{ end }}
  <li><a href="/portal/apis/">API Catalogue</a></li>
  {{ if not .PortalConfig.DisableSignup }}
    {{ if not .UserData }}
    <li><a href="/portal/register/">Register</a></li>
    {{ end }}
  {{ end }}
  {{ if not .PortalConfig.DisableLogin }}
    {{ if not .UserData }}
    <li><a href="/portal/login/">Log in</a></li>
    {{ end }}
  {{ end }}
</ul>
```

In the snippet above we can also see a set of settings fields, in order to react to the configuration of the Portal, the core Portal config object is exposed to the template and can be used to change how the template is rendered.

### Customising the menu with the Dashboard

The Dashboard has a simple menu editor, you can create the above data structures from the **Portal Management > Menus** option

{{< img src="/img/dashboard/portal-management/portal_nav_menus_2.5.png" alt="Menus nav" >}}

The Portal will come with two menus built in, "Main" and "Secondary", the "Main" menu will appear in the primary navigation (top nav) of the templates supplied with the Portal, while the secondary will show on the right hand side of the Default Page Templates.

To add a new menu item to the Dashboard main navigation, select the "Main" Menu from the drop down:

{{< img src="/img/dashboard/portal-management/portal_menus_2.5.png" alt="Manage portal menu" >}}

Click **ADD**:

{{< img src="/img/dashboard/portal-management/add_portal_menu_2.5.png" alt="Manage portal menu" >}}

Once added, you can select it from the drop down and add the title and URL fields that will control where the menu item will direct the user.

{{< img src="/img/dashboard/portal-management/portal_menu_dropdown_2.5.png" alt="Edit portal menu" >}}

The menu item, once saved, will appear in your Portal navigation instantly.
