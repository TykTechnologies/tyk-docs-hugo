---
date: 2019-04-18T17:21:39Z
title: Swap out Swagger UI for ReDoc
linktitle: API Documentation
menu:
  main:
    parent: "Customise"
weight: 6
url: /tyk-developer-portal/tyk-portal-classic/customise/customise-documentation/
aliases:
  - /tyk-developer-portal/customise/customise-documentation/
---

This short guide will show you how easy it is to swap out out the default https://swagger.io/tools/swagger-ui/ library for Portal Catalogue API documentation for another tool like [ReDoc](http://rebilly.github.io/ReDoc/) 

* Open up the default `/opt/tyk-dashboard/portal/templates/swagger.html`

```
  {{ define "swaggerPage" }}
  {{ template "header" .}}
  <link href='/portal-assets/css/swagger.min.css' media='screen' rel='stylesheet' type='text/css'/>
  <!-- <link href='/portal-assets/css/swagger-ui.css' media='screen' rel='stylesheet' type='text/css'/> -->
  <body>
    {{ template "navigation" . }}
    <div>
      <div class="container" style="margin-top: 80px;">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="position:absolute;width:0;height:0">
...
        </svg>
        <div id="swagger-ui"></div>
      </div>
    </div>
    {{ template "footer" .}}
    {{ template "scripts" .}}
    <script src="/portal-assets/js/vendors.min.js"> </script>
    <script src="/portal-assets/js/swagger.min.js"> </script>
    <script type="text/javascript">
...
    </script>
  </body>
</html>
{{ end }}
```

* Replace the content of `swagger.html` with the following:

```
  {{ define "swaggerPage" }}
  {{ template "header" .}}
  <body>
    {{ template "navigation" . }}
    <div>
      <div class="container" style="margin-top: 80px;">
        <redoc spec-url="{{.SwaggerURL}}"></redoc>
      </div>
    </div>
    {{ template "footer" .}}
    <script src="https://cdn.jsdelivr.net/npm/redoc@next/bundles/redoc.standalone.js"></script>
  </body>
</html>
{{ end }}
```

* Restart your dashboard service

* Browse your portal documentation

![Tyk Portal Catalogue API Documentation with ReDoc][1]

[1]: /img/dashboard/portal-management/redoc-petstore-tyk.png
