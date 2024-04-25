---
title: "List of endpoints exposed by Tyk Enterprise Developer Portal v1.9.0"
date: 2024-02-29
tags: ["Tyk Developer Portal","Enterprise Portal","Endpoints","Firewall","Integration","Portal 1.9.0"]
description: "Configure webhooks to react on events happening in the portal"
menu:
    main:
        parent: "Configuring firewall"
weight: 3
---

{{< note success >}}
**Tyk Enterprise Developer Portal**

If you are interested in getting access, contact us at [support@tyk.io](<mailto:support@tyk.io?subject=Tyk Enterprise Portal Beta>)

{{< /note >}}

## Introduction

In highly secure environments, it is often necessary to configure a firewall precisely and to allow only the endpoints exposed for the portal, while banning all other routes.
For this purpose, we have prepared a list of all endpoints exposed by the Tyk Enterprise Developer Portal v1.9.0.

{{< note success >}}

Please note that this list only refers to v1.9.0 of the portal. The list of endpoints for other version might be different.  

{{< /note >}}


## List of the portal endpoints

### Admin APIs
| **Resource**       | **Endpoint**                                                                           |
| ------------------ | -------------------------------------------------------------------------------------- |
| Providers          | /providers                                                                             |
| Providers          | /providers/{provider_id}                                                               |
| Providers          | /providers/{provider_id}/synchronize                                                   |
| Users              | /users                                                                                 |
| Users              | /users/{user_id}                                                                       |
| Users              | /users/{user_id}/custom-attributes                                                     |
| Users              | /users/{user_id}/custom-attributes/{custom-attribute_id}                               |
| Organisations      | /organisations                                                                         |
| Organisations      | /organisations/{organisation_id}                                                       |
| Teams              | /organisations/{organisation_id}/teams                                                 |
| Teams              | /organisations/{organisation_id}/teams                                                 |
| Products           | /products                                                                              |
| Products           | /products/{product_id}                                                                 |
| Product Docs       | /products/{product_id}/docs                                                            |
| Product Docs       | /products/{product_id}/docs/{doc_id}                                                   |
| Product Docs       | /products/{product_id}/docs/reorder                                                    |
| API Doc            | /products/{product_id}/api-details                                                     |
| API Doc            | /products/{product_id}/api-details/{api-id}                                            |
| API Doc            | /products/{product_id}/api-details/{api_id}/oas                                        |
| Plans              | /plans                                                                                 |
| Plans              | /plans/{plan_id}                                                                       |
| Catalogues         | /catalogues                                                                            |
| Catalogues         | /catalogues/{catalogue_id}                                                             |
| Catalogues         | /catalogues/{catalogue_id}/audiences                                                   |
| Catalogues         | /catalogues/{catalogue_id}/audiences/{audience_id}                                     |
| Access Requests    | /access_requests                                                                       |
| Access Requests    | /access_requests/{access_request_id}                                                   |
| Access Requests    | /access_requests/{access_request_id}/approve                                           |
| Access Requests    | /access_requests/{access_request_id}/reject                                            |
| Applications       | /apps                                                                                  |
| Applications       | /apps/{app_id}                                                                         |
| Applications       | /apps/{app_id}/access-requests                                                         |
| Applications       | /apps/{app_id}/access-requests/{access-request_id}                                     |
| Applications       | /apps/{app_id}/provision                                                               |
| Credentials        | /apps/{app_id}/access-requests/{access-request_id}/credentials                         |
| Credentials        | /apps/{app_id}/access-requests/{access-request_id}/credentials/{credential_id}         |
| Config             | /configs                                                                               |
| Pages              | /pages                                                                                 |
| Pages              | /pages/{page_id}                                                                       |
| Pages              | /pages/{page_id}/content-blocks                                                        |
| Pages              | /pages/{page_id}/content-blocks/{content-block_id}                                     |
| Themes             | /themes                                                                                |
| Themes             | /themes/{theme_id}                                                                     |
| Themes             | /themes/{theme_id}/activate                                                            |
| Themes             | /themes/{theme_id}/download                                                            |
| Themes             | /themes/upload                                                                         |
| Custom Attributes  | /extended_attributes                                                                   |
| Custom Attributes  | /extended_attributes/{extended_attribute_id}                                           |
| Custom Attributes  | /extended_attributes/{extended_attribute_id}/custom-attributes                         |
| Custom Attributes  | /extended_attributes/{extended_attribute_id}/custom-attributes/{custom_attribute_id}   |
| Custom Attributes  | /extended_attributes/{extended_attribute_id}/default-attributes                        |
| Custom Attributes  | /extended_attributes/{extended_attribute_id}/default-attributes/{default_attribute_id} |
| OAuth2.0 Providers | /oauth-providers                                                                       |
| OAuth2.0 Providers | /oauth-providers/{provider_id}                                                         |
| OAuth2.0 Providers | /oauth-providers/{provider_id}/client-types                                            |
| OAuth2.0 Providers | /oauth-providers/{provider_id}/client-types/{client_type_id}                           |
| Tags               | /products/{product_id}/tags                                                            |
| Tags               | /products/{product_id}/tags/{tag_name}                                                 |
| Client Types       | /products/{product_id}/client_types                                                    |
| Client Types       | /products/{product_id}/client_types/{client_type_id}                                   |

### Admin dashboard endpoints
| **Resource**       | **Endpoint**                                                   |
| ------------------ | -------------------------------------------------------------- |
| Login              | /auth/password/login                                           |
| Logout             | /auth/password/logout                                          |
| Profile            | /admin/admin_profile                                           |
| Profile            | /admin/admin_profile/rotate                                    |
| Providers          | /admin/providers                                               |
| Providers          | /admin/providers/new                                           |
| Providers          | /admin/providers/{provider_id}                                 |
| Providers          | /admin/providers/{provider_id}/synchronize                     |
| Products           | /admin/api_products                                            |
| Products           | /admin/api_products/{api_product_id}                           |
| Products           | /admin/api_products/{api_product_id}/posts/{post_id}/move_up   |
| Products           | /admin/api_products/{api_product_id}/posts/{post_id}/move_down |
| Plans              | /admin/plans                                                   |
| Plans              | /admin/plans/{plan_id}                                         |
| Catalogues         | /admin/catalogues                                              |
| Catalogues         | /admin/catalogues/new                                          |
| Catalogues         | /admin/catalogues/{catalogue_id}                               |
| Product Docs       | /admin/product_docs                                            |
| Product Docs       | /admin/product_docs/{product_doc_id}                           |
| OAuth2.0 Providers | /admin/oauth2-0-providers                                      |
| OAuth2.0 Providers | /admin/oauth2-0-providers/new                                  |
| OAuth2.0 Providers | /admin/oauth2-0-providers/{oauth2.0-provider_id}               |
| OAuth2.0 Providers | /admin/oauth2-0-providers/ping                                 |
| Apps               | /admin/apps                                                    |
| Apps               | /admin/apps/{app_id}                                           |
| Access Requests    | /admin/access_requests                                         |
| Access Requests    | /admin/access_requests/{access_request_id}                     |
| Access Requests    | /admin/access_requests/{access_request_id}/approve             |
| Access Requests    | /admin/access_requests/{access_request_id}/reject              |
| Users              | /admin/users, admin/admin_users                                |
| Users              | /admin/users/new                                               |
| Users              | /admin/admin_users/new                                         |
| Users              | /admin/users/{user_id}                                         |
| Users              | /admin/admin_users/{user_id}                                   |
| Users              | /admin/users/{user_id}/activate                                |
| Users              | /admin/admin_users/{user_id}/activate                          |
| Users              | /admin/users/{user_id}/send_invite                             |
| Users              | /admin/admin_users/{user_id}/send_invite                       |
| Users              | /admin/users/{user_id}/deactivate                              |
| Users              | /admin/admin_users/{user_id}/deactivate                        |
| Organisations      | /admin/organisations                                           |
| Organisations      | /admin/organisations/new                                       |
| Organisations      | /admin/organisations/org:{organisation_id}                     |
| Teams              | /admin/teams                                                   |
| Teams              | /admin/teams/new                                               |
| Teams              | /admin/teams/{team_id}                                         |
| Invite Codes       | /admin/invite_codes                                            |
| Invite Codes       | /admin/invite_codes/new                                        |
| Invite Codes       | /admin/invite_codes/{invite_code_id}                           |
| Themes             | /admin/themes                                                  |
| Themes             | /admin/themes/new                                              |
| Themes             | /admin/themes/{theme_name}                                     |
| Themes             | /admin/themes/{theme_name}/activate                            |
| Themes             | /admin/themes/{theme_name}/                                    |
| Themes             | /files/download                                                |
| Pages              | /admin/pages                                                   |
| Pages              | /admin/pages/new                                               |
| Pages              | /admin/pages/{page_id}                                         |
| Pages              | /admin/pages/{page_id}/to_draft                                |
| Menus              | /admin/menus                                                   |
| Menus              | /admin/menus/new                                               |
| Menus              | /admin/menus/{menu_id}                                         |
| Menus              | /admin/menus/{menu_id}/menu_items/{menu_item_id}/move_up       |
| Menus              | /admin/menus/{menu_id}/menu_items/{menu_item_id}/move_down     |
| Menu Items         | /admin/menu_items                                              |
| Menu Items         | /admin/menu_items/new                                          |
| Menu Items         | /admin/menu_items/{menu_item_id}                               |
| Custom Attributes  | /admin/custom_attributes                                       |
| Custom Attributes  | /admin/custom_attributes/{custom_attribute_id}                 |
| Posts              | /admin/posts                                                   |
| Posts              | /admin/posts/new                                               |
| Posts              | /admin/posts/{post_id}                                         |
| Categories         | /admin/categories                                              |
| Categories         | /admin/categories/new                                          |
| Categories         | /admin/categories/{category_id}                                |
| Tags               | /admin/tags                                                    |
| Tags               | /admin/tags/new                                                |
| Tags               | /admin/tags/{tag_id}                                           |
| Settings           | /admin/general                                                 |
| About              | /admin/about                                                   |
| Webhooks           | /admin/webhooks                                                |
| Webhooks           | /admin/webhooks/new                                            |
| Webhooks           | /admin/webhooks/{webhook_id}                                   |
| Webhooks           | /admin/webhooks/ping                                           |

### Live portal endpoints
| **Resource**      | **Endpoint**                                                  |
| ----------------- | ------------------------------------------------------------- |
| Auth              | /auth/password/login                                          |
| Auth              | /auth/password/register                                       |
| Auth              | /auth/password/logout                                         |
| Auth              | /auth/password/new                                            |
| Auth              | /auth/password/edit                                           |
| Auth              | /auth/password/recover                                        |
| Auth              | /auth/password/update                                         |
| Auth              | /api/sso                                                      |
| Auth              | /api/portal/developers                                        |
| Auth              | /api/portal/developers/ssokey/{id}                            |
| Auth              | /api/portal/developers/{id}                                   |
| Auth              | /sso                                                          |
| Posts             | /blog                                                         |
| Posts             | /blog/category/{category}                                     |
| Posts             | /blog/{year}/{month}/{day}/{path}                             |
| Pages             | /about-us                                                     |
| Pages             | /portal/catalogue-products                                    |
| Products          | /portal/catalogue-products/{product_name}                     |
| Products          | /portal/catalogue-products/{product_name}/{api}/docs          |
| Products          | /portal/catalogue-products/{product_name}/{api}/docs/download |
| OAS Spec Render   | /portal/catalogue-products/{product_name}/\*                  |
| Cart              | /portal/private/cart/provision                                |
| Cart              | /portal/private/cart/remove/{catalogue_id}/{product_id}       |
| Apps              | /portal/private/dashboard                                     |
| Apps              | /portal/private/apps                                          |
| Apps              | /portal/private/apps/{app_id}                                 |
| Apps              | /portal/private/apps/{app_id}/cert/{cert_id}                  |
| Credentials       | /portal/private/credentials                                   |
| Profile           | /portal/private/profile                                       |
| Organisation Flow | /portal/private/organisation                                  |
| Organisation Flow | /portal/private/users                                         |
| Organisation Flow | /portal/private/users/{user_id}                               |
| Organisation Flow | /portal/private/users/{user_id}/edit                          |
| Organisation Flow | /portal/private/users/invite                                  |
| Analytics         | /portal/private/analytics                                     |
| Analytics         | /portal/private/analytics/api/chart/overview                  |
| Analytics         | /portal/private/analytics/api/chart/traffic                   |
| Analytics         | /portal/private/analytics/api/chart/error                     |
| Analytics         | /portal/private/analytics/api/chart/latency                   |

### Assets endpoints
| **Resource** | **Endpoint**                |
|--------------| --------------------------- |
| Images       | /assets/images/\*           |
| Javascripts  | /assets/javascripts/\*      |
| Stylesheets  | /assets/stylesheets/\*      |
| Vendors      | /assets/vendor/bootstrap/\* |
| Vendors      | /assets/vendor/jquery/\*    |