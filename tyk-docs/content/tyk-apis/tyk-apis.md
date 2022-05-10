---
title: Tyk APIs
weight: 190
menu: none
url: "/tyk-apis"
---

Tyks own APIs allow you to access to the following

## [Tyk Gateway API](/docs/tyk-gateway-api/)

This API is very small, and has no granular permissions system. It is used purely for internal automation and integration. It offers the following endpoints:

* Managing session objects (key generation)
* Managing and listing API Definitions (only when not using the Dashboard)
* Hot reloads / reloading a cluster configuration
* OAuth client creation (only when not using the Dashboard)

<div class="postman-run-button"
data-postman-action="collection/fork"
data-postman-var-1="17155284-f9cc8548-5c01-4e52-98b8-2d9ac3e77c69"
data-postman-collection-url="entityId=17155284-f9cc8548-5c01-4e52-98b8-2d9ac3e77c69&entityType=collection&workspaceId=379673ec-4cc5-4b8e-bef5-8a6a988071cb"></div>
<script type="text/javascript">
  (function (p,o,s,t,m,a,n) {
    !p[s] && (p[s] = function () { (p[t] || (p[t] = [])).push(arguments); });
    !o.getElementById(s+t) && o.getElementsByTagName("head")[0].appendChild((
      (n = o.createElement("script")),
      (n.id = s+t), (n.async = 1), (n.src = m), n
    ));
  }(window, document, "_pm", "PostmanRunObject", "https://run.pstmn.io/button.js"));
</script>

## [Tyk Dashboard API](/docs/tyk-dashboard-api/)

The Tyk Dashboard API allows much more fine-grained, secure and multi-user access to your Tyk cluster, and should be used to manage a database-backed Tyk node. The Tyk Dashboard API works seamlessly with the Tyk Dashboard (the two come bundled together).

<div class="postman-run-button"
data-postman-action="collection/fork"
data-postman-var-1="17155284-85d19715-5b29-46bd-b6ef-e211ccd78b43"
data-postman-collection-url="entityId=17155284-85d19715-5b29-46bd-b6ef-e211ccd78b43&entityType=collection&workspaceId=379673ec-4cc5-4b8e-bef5-8a6a988071cb"></div>
<script type="text/javascript">
  (function (p,o,s,t,m,a,n) {
    !p[s] && (p[s] = function () { (p[t] || (p[t] = [])).push(arguments); });
    !o.getElementById(s+t) && o.getElementsByTagName("head")[0].appendChild((
      (n = o.createElement("script")),
      (n.id = s+t), (n.async = 1), (n.src = m), n
    ));
  }(window, document, "_pm", "PostmanRunObject", "https://run.pstmn.io/button.js"));
</script>

## [Tyk Dashboard Admin API](/docs/dashboard-admin-api/)

The Dashboard Admin API is a special bootstrapping API that can be used to set up and provision a Tyk Dashboard instance without the command line and is used by the bootstrap scripts that come with a Tyk On-Premises installation.

## [Tyk Portal API](/docs/tyk-portal-api/)

The Tyk Portal API covers all available endpoints for your developer portal.
