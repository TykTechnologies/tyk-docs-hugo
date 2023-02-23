---
date: 2017-03-27T12:28:24+01:00
title: Portal Keys
menu:
  main:
    parent: "Tyk Portal API"
weight: 1
aliases:
  - /tyk-stack/tyk-developer-portal/key-requests/
---

### List All Key Requests

| **Property** | **Description**          |
| ------------ | ------------------------ |
| Resource URL | `/api/portal/requests`   |
| Method       | GET                      |
| Type         | None                     |
| Body         | None                     |
| Param        | None                     |

#### Sample Request

```{.copyWrapper}
GET /api/portal/requests HTTP/1.1
Host: localhost
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8
```

#### Sample Response

```
{
  "Data":[
    {
      "id":"5cf61bff0313b300010b89ac",
      "org_id":"5cc03283d07e7f00019404b3",
      "for_api":"",
      "for_plan":"5ce4086ce845260001c1e1f5",
      "apply_policies":[
        "5ce4086ce845260001c1e1f5"
      ],
      "by_user":"5ce4090ee845260001c1e1f6",
      "fields":{
        "oauth_app_description":"Application details",
        "oauth_use_case":""
      },
      "approved":true,
      "date_created":"2019-06-04T07:21:35.97Z",
      "version":"v2",
      "jwt_secret":"",
      "certificate":"",
      "oauth_info":{
        "redirect_uri":"http://localhost"
      },
      "portal_developer":{
        "id":"5ce4090ee845260001c1e1f6",
        "email":"mark+5@tyk.io",
        "date_created":"2019-05-21T14:19:57.99Z",
        "inactive":false,
        "org_id":"5cc03283d07e7f00019404b3",
        "keys":{
          "55b1ba47":[
            "5ce4086ce845260001c1e1f5"
          ]
        },
        "subscriptions":{
          "5ce4086ce845260001c1e1f5":"55b1ba47"
        },
        "fields":{

        },
        "nonce":"",
        "sso_key":"",
        "oauth_clients":{
          "5ce4086ce845260001c1e1f5":[
            {
              "client_id":"00a3d6916da6448381ea6c254937eda9",
              "secret":"ZGU4OWRlZjUtMzA0NS00Njk0LTljYTYtNDJmODY0ZWI1NWUz",
              "redirect_uri":"http://localhost",
              "app_description":"Application details",
              "use_case":"",
              "date_created":"2019-06-04T07:21:35.97Z"
            }
          ]
        },
        "password_max_days":0,
        "password_updated":"2019-10-23T10:01:56.25Z",
        "PWHistory":[

        ],
        "last_login_date":"2019-10-23T10:02:14.117Z"
      },
      "catalogue_entry":{
        "name":"Portal OAuth API",
        "short_description":"",
        "long_description":"",
        "show":true,
        "api_id":"",
        "policy_id":"5ce4086ce845260001c1e1f5",
        "documentation":"",
        "version":"v2",
        "is_keyless":false,
        "config":{
          "id":"",
          "org_id":"",
          "signup_fields":[

          ],
          "key_request_fields":[

          ],
          "require_key_approval":false,
          "redirect_on_key_request":false,
          "redirect_to":"",
          "enable_multi_selection":false,
          "disable_login":false,
          "disable_signup":false,
          "disable_auto_login":false,
          "catalogue_login_only":false,
          "oauth_usage_limit":-1,
          "email":"",
          "mail_options":{
            "mail_from_name":"",
            "mail_from_email":"",
            "email_copy":{
              "welcome_email":{
                "enabled":false,
                "subject":"",
                "body":"",
                "sign_off":"",
                "hide_token_data":false
              },
              "key_email":{
                "enabled":false,
                "subject":"",
                "body":"",
                "sign_off":"",
                "hide_token_data":false
              },
              "reset_password_email":{
                "enabled":false,
                "subject":"",
                "body":"",
                "sign_off":"",
                "hide_token_data":false
              }
            }
          },
          "override":false,
          "HashKeys":false
        },
        "fields":{

        },
        "auth_type":"oauth"
      },
      "catalogues":[
        {
          "name":"Portal OAuth API",
          "short_description":"",
          "long_description":"",
          "show":true,
          "api_id":"",
          "policy_id":"5ce4086ce845260001c1e1f5",
          "documentation":"",
          "version":"v2",
          "is_keyless":false,
          "config":{
            "id":"",
            "org_id":"",
            "signup_fields":[

            ],
            "key_request_fields":[

            ],
            "require_key_approval":false,
            "redirect_on_key_request":false,
            "redirect_to":"",
            "enable_multi_selection":false,
            "disable_login":false,
            "disable_signup":false,
            "disable_auto_login":false,
            "catalogue_login_only":false,
            "oauth_usage_limit":-1,
            "email":"",
            "mail_options":{
              "mail_from_name":"",
              "mail_from_email":"",
              "email_copy":{
                "welcome_email":{
                  "enabled":false,
                  "subject":"",
                  "body":"",
                  "sign_off":"",
                  "hide_token_data":false
                },
                "key_email":{
                  "enabled":false,
                  "subject":"",
                  "body":"",
                  "sign_off":"",
                  "hide_token_data":false
                },
                "reset_password_email":{
                  "enabled":false,
                  "subject":"",
                  "body":"",
                  "sign_off":"",
                  "hide_token_data":false
                }
              }
            },
            "override":false,
            "HashKeys":false
          },
          "fields":{

          },
          "auth_type":"oauth"
        }
      ]
    },
    {
      "id":"5ce51790e845260001d0a551",
      "org_id":"5cc03283d07e7f00019404b3",
      "for_api":"",
      "for_plan":"5ce4086ce845260001c1e1f5",
      "apply_policies":[
        "5ce4086ce845260001c1e1f5"
      ],
      "by_user":"5ce4090ee845260001c1e1f6",
      "fields":{
        "oauth_app_description":"",
        "oauth_use_case":""
      },
      "approved":true,
      "date_created":"2019-05-22T09:34:08.211Z",
      "version":"v2",
      "jwt_secret":"",
      "certificate":"",
      "oauth_info":{
        "redirect_uri":"localhost"
      },
      "portal_developer":{
        "id":"5ce4090ee845260001c1e1f6",
        "email":"mark+5@tyk.io",
        "date_created":"2019-05-21T14:19:57.99Z",
        "inactive":false,
        "org_id":"5cc03283d07e7f00019404b3",
        "keys":{
          "55b1ba47":[
            "5ce4086ce845260001c1e1f5"
          ]
        },
        "subscriptions":{
          "5ce4086ce845260001c1e1f5":"55b1ba47"
        },
        "fields":{

        },
        "nonce":"",
        "sso_key":"",
        "oauth_clients":{
          "5ce4086ce845260001c1e1f5":[
            {
              "client_id":"00a3d6916da6448381ea6c254937eda9",
              "secret":"ZGU4OWRlZjUtMzA0NS00Njk0LTljYTYtNDJmODY0ZWI1NWUz",
              "redirect_uri":"http://localhost",
              "app_description":"Application details",
              "use_case":"",
              "date_created":"2019-06-04T07:21:35.97Z"
            }
          ]
        },
        "password_max_days":0,
        "password_updated":"2019-10-23T10:01:56.25Z",
        "PWHistory":[

        ],
        "last_login_date":"2019-10-23T10:02:14.117Z"
      },
      "catalogue_entry":{
        "name":"Portal OAuth API",
        "short_description":"",
        "long_description":"",
        "show":true,
        "api_id":"",
        "policy_id":"5ce4086ce845260001c1e1f5",
        "documentation":"",
        "version":"v2",
        "is_keyless":false,
        "config":{
          "id":"",
          "org_id":"",
          "signup_fields":[

          ],
          "key_request_fields":[

          ],
          "require_key_approval":false,
          "redirect_on_key_request":false,
          "redirect_to":"",
          "enable_multi_selection":false,
          "disable_login":false,
          "disable_signup":false,
          "disable_auto_login":false,
          "catalogue_login_only":false,
          "oauth_usage_limit":-1,
          "email":"",
          "mail_options":{
            "mail_from_name":"",
            "mail_from_email":"",
            "email_copy":{
              "welcome_email":{
                "enabled":false,
                "subject":"",
                "body":"",
                "sign_off":"",
                "hide_token_data":false
              },
              "key_email":{
                "enabled":false,
                "subject":"",
                "body":"",
                "sign_off":"",
                "hide_token_data":false
              },
              "reset_password_email":{
                "enabled":false,
                "subject":"",
                "body":"",
                "sign_off":"",
                "hide_token_data":false
              }
            }
          },
          "override":false,
          "HashKeys":false
        },
        "fields":{

        },
        "auth_type":"oauth"
      },
      "catalogues":[
        {
          "name":"Portal OAuth API",
          "short_description":"",
          "long_description":"",
          "show":true,
          "api_id":"",
          "policy_id":"5ce4086ce845260001c1e1f5",
          "documentation":"",
          "version":"v2",
          "is_keyless":false,
          "config":{
            "id":"",
            "org_id":"",
            "signup_fields":[

            ],
            "key_request_fields":[

            ],
            "require_key_approval":false,
            "redirect_on_key_request":false,
            "redirect_to":"",
            "enable_multi_selection":false,
            "disable_login":false,
            "disable_signup":false,
            "disable_auto_login":false,
            "catalogue_login_only":false,
            "oauth_usage_limit":-1,
            "email":"",
            "mail_options":{
              "mail_from_name":"",
              "mail_from_email":"",
              "email_copy":{
                "welcome_email":{
                  "enabled":false,
                  "subject":"",
                  "body":"",
                  "sign_off":"",
                  "hide_token_data":false
                },
                "key_email":{
                  "enabled":false,
                  "subject":"",
                  "body":"",
                  "sign_off":"",
                  "hide_token_data":false
                },
                "reset_password_email":{
                  "enabled":false,
                  "subject":"",
                  "body":"",
                  "sign_off":"",
                  "hide_token_data":false
                }
              }
            },
            "override":false,
            "HashKeys":false
          },
          "fields":{

          },
          "auth_type":"oauth"
        }
      ]
    },
    {
      "id":"5ce40db1e845260001c1e1f9",
      "org_id":"5cc03283d07e7f00019404b3",
      "for_api":"",
      "for_plan":"5ce4086ce845260001c1e1f5",
      "apply_policies":[
        "5ce4086ce845260001c1e1f5"
      ],
      "by_user":"5ce4090ee845260001c1e1f6",
      "fields":{
        "oauth_app_description":"First OAuth Client",
        "oauth_use_case":""
      },
      "approved":true,
      "date_created":"2019-05-21T14:39:45.139Z",
      "version":"v2",
      "jwt_secret":"",
      "certificate":"",
      "oauth_info":{
        "redirect_uri":"http://httpbin.org;"
      },
      "portal_developer":{
        "id":"5ce4090ee845260001c1e1f6",
        "email":"mark+5@tyk.io",
        "date_created":"2019-05-21T14:19:57.99Z",
        "inactive":false,
        "org_id":"5cc03283d07e7f00019404b3",
        "keys":{
          "55b1ba47":[
            "5ce4086ce845260001c1e1f5"
          ]
        },
        "subscriptions":{
          "5ce4086ce845260001c1e1f5":"55b1ba47"
        },
        "fields":{

        },
        "nonce":"",
        "sso_key":"",
        "oauth_clients":{
          "5ce4086ce845260001c1e1f5":[
            {
              "client_id":"00a3d6916da6448381ea6c254937eda9",
              "secret":"ZGU4OWRlZjUtMzA0NS00Njk0LTljYTYtNDJmODY0ZWI1NWUz",
              "redirect_uri":"http://localhost",
              "app_description":"Application details",
              "use_case":"",
              "date_created":"2019-06-04T07:21:35.97Z"
            }
          ]
        },
        "password_max_days":0,
        "password_updated":"2019-10-23T10:01:56.25Z",
        "PWHistory":[

        ],
        "last_login_date":"2019-10-23T10:02:14.117Z"
      },
      "catalogue_entry":{
        "name":"Portal OAuth API",
        "short_description":"",
        "long_description":"",
        "show":true,
        "api_id":"",
        "policy_id":"5ce4086ce845260001c1e1f5",
        "documentation":"",
        "version":"v2",
        "is_keyless":false,
        "config":{
          "id":"",
          "org_id":"",
          "signup_fields":[

          ],
          "key_request_fields":[

          ],
          "require_key_approval":false,
          "redirect_on_key_request":false,
          "redirect_to":"",
          "enable_multi_selection":false,
          "disable_login":false,
          "disable_signup":false,
          "disable_auto_login":false,
          "catalogue_login_only":false,
          "oauth_usage_limit":-1,
          "email":"",
          "mail_options":{
            "mail_from_name":"",
            "mail_from_email":"",
            "email_copy":{
              "welcome_email":{
                "enabled":false,
                "subject":"",
                "body":"",
                "sign_off":"",
                "hide_token_data":false
              },
              "key_email":{
                "enabled":false,
                "subject":"",
                "body":"",
                "sign_off":"",
                "hide_token_data":false
              },
              "reset_password_email":{
                "enabled":false,
                "subject":"",
                "body":"",
                "sign_off":"",
                "hide_token_data":false
              }
            }
          },
          "override":false,
          "HashKeys":false
        },
        "fields":{

        },
        "auth_type":"oauth"
      },
      "catalogues":[
        {
          "name":"Portal OAuth API",
          "short_description":"",
          "long_description":"",
          "show":true,
          "api_id":"",
          "policy_id":"5ce4086ce845260001c1e1f5",
          "documentation":"",
          "version":"v2",
          "is_keyless":false,
          "config":{
            "id":"",
            "org_id":"",
            "signup_fields":[

            ],
            "key_request_fields":[

            ],
            "require_key_approval":false,
            "redirect_on_key_request":false,
            "redirect_to":"",
            "enable_multi_selection":false,
            "disable_login":false,
            "disable_signup":false,
            "disable_auto_login":false,
            "catalogue_login_only":false,
            "oauth_usage_limit":-1,
            "email":"",
            "mail_options":{
              "mail_from_name":"",
              "mail_from_email":"",
              "email_copy":{
                "welcome_email":{
                  "enabled":false,
                  "subject":"",
                  "body":"",
                  "sign_off":"",
                  "hide_token_data":false
                },
                "key_email":{
                  "enabled":false,
                  "subject":"",
                  "body":"",
                  "sign_off":"",
                  "hide_token_data":false
                },
                "reset_password_email":{
                  "enabled":false,
                  "subject":"",
                  "body":"",
                  "sign_off":"",
                  "hide_token_data":false
                }
              }
            },
            "override":false,
            "HashKeys":false
          },
          "fields":{

          },
          "auth_type":"oauth"
        }
      ]
    },
    {
      "id":"5ce40a67e845260001c1e1f8",
      "org_id":"5cc03283d07e7f00019404b3",
      "for_api":"",
      "for_plan":"5ce4086ce845260001c1e1f5",
      "apply_policies":[
        "5ce4086ce845260001c1e1f5"
      ],
      "by_user":"5ce4090ee845260001c1e1f6",
      "fields":{

      },
      "approved":true,
      "date_created":"2019-05-21T14:25:43.934Z",
      "version":"v2",
      "jwt_secret":"",
      "certificate":"",
      "portal_developer":{
        "id":"5ce4090ee845260001c1e1f6",
        "email":"mark+5@tyk.io",
        "date_created":"2019-05-21T14:19:57.99Z",
        "inactive":false,
        "org_id":"5cc03283d07e7f00019404b3",
        "keys":{
          "55b1ba47":[
            "5ce4086ce845260001c1e1f5"
          ]
        },
        "subscriptions":{
          "5ce4086ce845260001c1e1f5":"55b1ba47"
        },
        "fields":{

        },
        "nonce":"",
        "sso_key":"",
        "oauth_clients":{
          "5ce4086ce845260001c1e1f5":[
            {
              "client_id":"00a3d6916da6448381ea6c254937eda9",
              "secret":"ZGU4OWRlZjUtMzA0NS00Njk0LTljYTYtNDJmODY0ZWI1NWUz",
              "redirect_uri":"http://localhost",
              "app_description":"Application details",
              "use_case":"",
              "date_created":"2019-06-04T07:21:35.97Z"
            }
          ]
        },
        "password_max_days":0,
        "password_updated":"2019-10-23T10:01:56.25Z",
        "PWHistory":[

        ],
        "last_login_date":"2019-10-23T10:02:14.117Z"
      },
      "catalogue_entry":{
        "name":"Portal OAuth API",
        "short_description":"",
        "long_description":"",
        "show":true,
        "api_id":"",
        "policy_id":"5ce4086ce845260001c1e1f5",
        "documentation":"",
        "version":"v2",
        "is_keyless":false,
        "config":{
          "id":"",
          "org_id":"",
          "signup_fields":[

          ],
          "key_request_fields":[

          ],
          "require_key_approval":false,
          "redirect_on_key_request":false,
          "redirect_to":"",
          "enable_multi_selection":false,
          "disable_login":false,
          "disable_signup":false,
          "disable_auto_login":false,
          "catalogue_login_only":false,
          "oauth_usage_limit":-1,
          "email":"",
          "mail_options":{
            "mail_from_name":"",
            "mail_from_email":"",
            "email_copy":{
              "welcome_email":{
                "enabled":false,
                "subject":"",
                "body":"",
                "sign_off":"",
                "hide_token_data":false
              },
              "key_email":{
                "enabled":false,
                "subject":"",
                "body":"",
                "sign_off":"",
                "hide_token_data":false
              },
              "reset_password_email":{
                "enabled":false,
                "subject":"",
                "body":"",
                "sign_off":"",
                "hide_token_data":false
              }
            }
          },
          "override":false,
          "HashKeys":false
        },
        "fields":{

        },
        "auth_type":"oauth"
      },
      "catalogues":[
        {
          "name":"Portal OAuth API",
          "short_description":"",
          "long_description":"",
          "show":true,
          "api_id":"",
          "policy_id":"5ce4086ce845260001c1e1f5",
          "documentation":"",
          "version":"v2",
          "is_keyless":false,
          "config":{
            "id":"",
            "org_id":"",
            "signup_fields":[

            ],
            "key_request_fields":[

            ],
            "require_key_approval":false,
            "redirect_on_key_request":false,
            "redirect_to":"",
            "enable_multi_selection":false,
            "disable_login":false,
            "disable_signup":false,
            "disable_auto_login":false,
            "catalogue_login_only":false,
            "oauth_usage_limit":-1,
            "email":"",
            "mail_options":{
              "mail_from_name":"",
              "mail_from_email":"",
              "email_copy":{
                "welcome_email":{
                  "enabled":false,
                  "subject":"",
                  "body":"",
                  "sign_off":"",
                  "hide_token_data":false
                },
                "key_email":{
                  "enabled":false,
                  "subject":"",
                  "body":"",
                  "sign_off":"",
                  "hide_token_data":false
                },
                "reset_password_email":{
                  "enabled":false,
                  "subject":"",
                  "body":"",
                  "sign_off":"",
                  "hide_token_data":false
                }
              }
            },
            "override":false,
            "HashKeys":false
          },
          "fields":{

          },
          "auth_type":"oauth"
        }
      ]
    },
    {
      "id":"5ce40a12e845260001c1e1f7",
      "org_id":"5cc03283d07e7f00019404b3",
      "for_api":"",
      "for_plan":"5ce4086ce845260001c1e1f5",
      "apply_policies":[
        "5ce4086ce845260001c1e1f5"
      ],
      "by_user":"5ce4090ee845260001c1e1f6",
      "fields":{
        "oauth_app_description":"First OAuth client",
        "oauth_use_case":""
      },
      "approved":true,
      "date_created":"2019-05-21T14:24:18.631Z",
      "version":"v2",
      "jwt_secret":"",
      "certificate":"",
      "oauth_info":{
        "redirect_uri":"http://httpbin.org;"
      },
      "portal_developer":{
        "id":"5ce4090ee845260001c1e1f6",
        "email":"mark+5@tyk.io",
        "date_created":"2019-05-21T14:19:57.99Z",
        "inactive":false,
        "org_id":"5cc03283d07e7f00019404b3",
        "keys":{
          "55b1ba47":[
            "5ce4086ce845260001c1e1f5"
          ]
        },
        "subscriptions":{
          "5ce4086ce845260001c1e1f5":"55b1ba47"
        },
        "fields":{

        },
        "nonce":"",
        "sso_key":"",
        "oauth_clients":{
          "5ce4086ce845260001c1e1f5":[
            {
              "client_id":"00a3d6916da6448381ea6c254937eda9",
              "secret":"ZGU4OWRlZjUtMzA0NS00Njk0LTljYTYtNDJmODY0ZWI1NWUz",
              "redirect_uri":"http://localhost",
              "app_description":"Application details",
              "use_case":"",
              "date_created":"2019-06-04T07:21:35.97Z"
            }
          ]
        },
        "password_max_days":0,
        "password_updated":"2019-10-23T10:01:56.25Z",
        "PWHistory":[

        ],
        "last_login_date":"2019-10-23T10:02:14.117Z"
      },
      "catalogue_entry":{
        "name":"Portal OAuth API",
        "short_description":"",
        "long_description":"",
        "show":true,
        "api_id":"",
        "policy_id":"5ce4086ce845260001c1e1f5",
        "documentation":"",
        "version":"v2",
        "is_keyless":false,
        "config":{
          "id":"",
          "org_id":"",
          "signup_fields":[

          ],
          "key_request_fields":[

          ],
          "require_key_approval":false,
          "redirect_on_key_request":false,
          "redirect_to":"",
          "enable_multi_selection":false,
          "disable_login":false,
          "disable_signup":false,
          "disable_auto_login":false,
          "catalogue_login_only":false,
          "oauth_usage_limit":-1,
          "email":"",
          "mail_options":{
            "mail_from_name":"",
            "mail_from_email":"",
            "email_copy":{
              "welcome_email":{
                "enabled":false,
                "subject":"",
                "body":"",
                "sign_off":"",
                "hide_token_data":false
              },
              "key_email":{
                "enabled":false,
                "subject":"",
                "body":"",
                "sign_off":"",
                "hide_token_data":false
              },
              "reset_password_email":{
                "enabled":false,
                "subject":"",
                "body":"",
                "sign_off":"",
                "hide_token_data":false
              }
            }
          },
          "override":false,
          "HashKeys":false
        },
        "fields":{

        },
        "auth_type":"oauth"
      },
      "catalogues":[
        {
          "name":"Portal OAuth API",
          "short_description":"",
          "long_description":"",
          "show":true,
          "api_id":"",
          "policy_id":"5ce4086ce845260001c1e1f5",
          "documentation":"",
          "version":"v2",
          "is_keyless":false,
          "config":{
            "id":"",
            "org_id":"",
            "signup_fields":[

            ],
            "key_request_fields":[

            ],
            "require_key_approval":false,
            "redirect_on_key_request":false,
            "redirect_to":"",
            "enable_multi_selection":false,
            "disable_login":false,
            "disable_signup":false,
            "disable_auto_login":false,
            "catalogue_login_only":false,
            "oauth_usage_limit":-1,
            "email":"",
            "mail_options":{
              "mail_from_name":"",
              "mail_from_email":"",
              "email_copy":{
                "welcome_email":{
                  "enabled":false,
                  "subject":"",
                  "body":"",
                  "sign_off":"",
                  "hide_token_data":false
                },
                "key_email":{
                  "enabled":false,
                  "subject":"",
                  "body":"",
                  "sign_off":"",
                  "hide_token_data":false
                },
                "reset_password_email":{
                  "enabled":false,
                  "subject":"",
                  "body":"",
                  "sign_off":"",
                  "hide_token_data":false
                }
              }
            },
            "override":false,
            "HashKeys":false
          },
          "fields":{

          },
          "auth_type":"oauth"
        }
      ]
    }
  ],
  "Pages":1
}
```

### List a Single Key Request

| **Property** | **Description**            |
| ------------ | -------------------------- |
| Resource URL | `/api/portal/requests/{id}`|
| Method       | GET                      |
| Type         | None                     |
| Body         | None                     |
| Param        | None                     |

#### Sample Request

```{.copyWrapper}
GET /api/portal/requests/KEYID HTTP/1.1
Host: localhost
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8
```

#### Sample Response

```
{
  "id":"5cf61bff0313b300010b89ac",
  "org_id":"5cc03283d07e7f00019404b3",
  "for_api":"",
  "for_plan":"5ce4086ce845260001c1e1f5",
  "apply_policies":[
    "5ce4086ce845260001c1e1f5"
  ],
  "by_user":"5ce4090ee845260001c1e1f6",
  "fields":{
    "oauth_app_description":"Application details",
    "oauth_use_case":""
  },
  "approved":true,
  "date_created":"2019-06-04T07:21:35.97Z",
  "version":"v2",
  "jwt_secret":"",
  "certificate":"",
  "oauth_info":{
    "redirect_uri":"http://localhost"
  },
  "portal_developer":{
    "id":"5ce4090ee845260001c1e1f6",
    "email":"mark+5@tyk.io",
    "date_created":"2019-05-21T14:19:57.99Z",
    "inactive":false,
    "org_id":"5cc03283d07e7f00019404b3",
    "keys":{
      "55b1ba47":[
        "5ce4086ce845260001c1e1f5"
      ]
    },
    "subscriptions":{
      "5ce4086ce845260001c1e1f5":"55b1ba47"
    },
    "fields":{

    },
    "nonce":"",
    "sso_key":"",
    "oauth_clients":{
      "5ce4086ce845260001c1e1f5":[
        {
          "client_id":"00a3d6916da6448381ea6c254937eda9",
          "secret":"ZGU4OWRlZjUtMzA0NS00Njk0LTljYTYtNDJmODY0ZWI1NWUz",
          "redirect_uri":"http://localhost",
          "app_description":"Application details",
          "use_case":"",
          "date_created":"2019-06-04T07:21:35.97Z"
        }
      ]
    },
    "password_max_days":0,
    "password_updated":"2019-10-23T10:01:56.25Z",
    "PWHistory":[

    ],
    "last_login_date":"2019-10-23T10:02:14.117Z"
  },
  "catalogue_entry":{
    "name":"Portal OAuth API",
    "short_description":"",
    "long_description":"",
    "show":true,
    "api_id":"",
    "policy_id":"5ce4086ce845260001c1e1f5",
    "documentation":"",
    "version":"v2",
    "is_keyless":false,
    "config":{
      "id":"",
      "org_id":"",
      "signup_fields":[

      ],
      "key_request_fields":[

      ],
      "require_key_approval":false,
      "redirect_on_key_request":false,
      "redirect_to":"",
      "enable_multi_selection":false,
      "disable_login":false,
      "disable_signup":false,
      "disable_auto_login":false,
      "catalogue_login_only":false,
      "oauth_usage_limit":-1,
      "email":"",
      "mail_options":{
        "mail_from_name":"",
        "mail_from_email":"",
        "email_copy":{
          "welcome_email":{
            "enabled":false,
            "subject":"",
            "body":"",
            "sign_off":"",
            "hide_token_data":false
          },
          "key_email":{
            "enabled":false,
            "subject":"",
            "body":"",
            "sign_off":"",
            "hide_token_data":false
          },
          "reset_password_email":{
            "enabled":false,
            "subject":"",
            "body":"",
            "sign_off":"",
            "hide_token_data":false
          }
        }
      },
      "override":false,
      "HashKeys":false
    },
    "fields":{

    },
    "auth_type":"oauth"
  },
  "catalogues":[
    {
      "name":"Portal OAuth API",
      "short_description":"",
      "long_description":"",
      "show":true,
      "api_id":"",
      "policy_id":"5ce4086ce845260001c1e1f5",
      "documentation":"",
      "version":"v2",
      "is_keyless":false,
      "config":{
        "id":"",
        "org_id":"",
        "signup_fields":[

        ],
        "key_request_fields":[

        ],
        "require_key_approval":false,
        "redirect_on_key_request":false,
        "redirect_to":"",
        "enable_multi_selection":false,
        "disable_login":false,
        "disable_signup":false,
        "disable_auto_login":false,
        "catalogue_login_only":false,
        "oauth_usage_limit":-1,
        "email":"",
        "mail_options":{
          "mail_from_name":"",
          "mail_from_email":"",
          "email_copy":{
            "welcome_email":{
              "enabled":false,
              "subject":"",
              "body":"",
              "sign_off":"",
              "hide_token_data":false
            },
            "key_email":{
              "enabled":false,
              "subject":"",
              "body":"",
              "sign_off":"",
              "hide_token_data":false
            },
            "reset_password_email":{
              "enabled":false,
              "subject":"",
              "body":"",
              "sign_off":"",
              "hide_token_data":false
            }
          }
        },
        "override":false,
        "HashKeys":false
      },
      "fields":{

      },
      "auth_type":"oauth"
    }
  ]
}
```

### Create a Key Request

| **Property** | **Description**               |
| ------------ | ----------------------------- |
| Resource URL | `/api/portal/requests`        |
| Method       | POST                          |
| Type         | None                          |
| Body         | Developer Object              |
| Param        | None                          |

#### Sample Request

```{.copyWrapper}
POST /api/portal/requests HTTP/1.1
Host: localhost
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8

{
  "key": "",
  "org_id": "5e9d9544a1dcd60001d0ed20",
  "for_api": "",
  "for_plan": "5ead7120575961000181867e",
  "apply_policies": [
    "5ead7120575961000181867e"
  ],
  "remove_policies": [],
  "by_user": "5efdbdb749960c000137f589",
  "fields": {},
  "approved": true,
  "date_created": "2020-07-02T12:47:35.953Z",
  "version": "v2",
  "jwt_secret": "",
  "certificate": "",
  "portal_developer": {
    "id": "5efdbdb749960c000137f589",
    "email": "portal-developer@example.org",
    "date_created": "2020-07-02T10:57:59.878Z",
    "inactive": false,
    "org_id": "5e9d9544a1dcd60001d0ed20",
    "keys": {
      "2ac7b253c36e210d": [
        "5ead7120575961000181867e"
      ]
    },
    "subscriptions": {
      "5ead7120575961000181867e": "2ac7b253c36e210d"
    },
    "fields": {},
    "nonce": "",
    "sso_key": "",
    "password_max_days": 0,
    "password_updated": "2020-07-02T10:57:59.951Z",
    "PWHistory": [],
    "last_login_date": "2020-07-02T12:47:31.837Z"
  },
  "catalogue_entry": {
    "name": "Swagger Petstore",
    "short_description": "",
    "long_description": "",
    "show": true,
    "api_id": "",
    "policy_id": "5ead7120575961000181867e",
    "documentation": "5efdbdb849960c000137f58a",
    "version": "v2",
    "is_keyless": false,
    "config": {
      "id": "",
      "org_id": "",
      "signup_fields": [],
      "key_request_fields": [],
      "require_key_approval": false,
      "redirect_on_key_request": false,
      "redirect_to": "",
      "enable_multi_selection": false,
      "disable_login": false,
      "disable_signup": false,
      "disable_auto_login": false,
      "catalogue_login_only": false,
      "oauth_usage_limit": -1,
      "email": "",
      "mail_options": {
        "mail_from_name": "",
        "mail_from_email": "",
        "email_copy": {
          "welcome_email": {
            "enabled": false,
            "subject": "",
            "body": "",
            "sign_off": "",
            "hide_token_data": false
          },
          "key_email": {
            "enabled": false,
            "subject": "",
            "body": "",
            "sign_off": "",
            "hide_token_data": false
          },
          "reset_password_email": {
            "enabled": false,
            "subject": "",
            "body": "",
            "sign_off": "",
            "hide_token_data": false
          }
        }
      },
      "override": false,
      "HashKeys": false
    },
    "fields": {},
    "auth_type": "authToken"
  },
  "catalogues": [{
    "name": "Swagger Petstore",
    "short_description": "",
    "long_description": "",
    "show": true,
    "api_id": "",
    "policy_id": "5ead7120575961000181867e",
    "documentation": "5efdbdb849960c000137f58a",
    "version": "v2",
    "is_keyless": false,
    "config": {
      "id": "",
      "org_id": "",
      "signup_fields": [],
      "key_request_fields": [],
      "require_key_approval": false,
      "redirect_on_key_request": false,
      "redirect_to": "",
      "enable_multi_selection": false,
      "disable_login": false,
      "disable_signup": false,
      "disable_auto_login": false,
      "catalogue_login_only": false,
      "oauth_usage_limit": -1,
      "email": "",
      "mail_options": {
        "mail_from_name": "",
        "mail_from_email": "",
        "email_copy": {
          "welcome_email": {
            "enabled": false,
            "subject": "",
            "body": "",
            "sign_off": "",
            "hide_token_data": false
          },
          "key_email": {
            "enabled": false,
            "subject": "",
            "body": "",
            "sign_off": "",
            "hide_token_data": false
          },
          "reset_password_email": {
            "enabled": false,
            "subject": "",
            "body": "",
            "sign_off": "",
            "hide_token_data": false
          }
        }
      },
      "override": false,
      "HashKeys": false
    },
    "fields": {},
    "auth_type": "authToken"
  }]
}
```

#### Sample Response

```
{
  "Status": "OK",
  "Message": "5efde61749960c000137f590",
  "Meta": null
}
```

### Update a Key Request

| **Property** | **Description**            |
| ------------ | -------------------------- |
| Resource URL | `/api/portal/requests/{id}`|
| Method       | UPDATE                     |
| Type         | None                     |
| Body         | None                     |
| Param        | None                     |

#### Sample Request

```{.copyWrapper}
UPDATE /api/portal/requests/5efde61749960c000137f590 HTTP/1.1
Host: localhost
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8

{
  "key": "",
  "org_id": "5e9d9544a1dcd60001d0ed20",
  "for_api": "",
  "for_plan": "5ead7120575961000181867e",
  "apply_policies": [
    "5ead7120575961000181867e"
  ],
  "remove_policies": [],
  "by_user": "5efdbdb749960c000137f589",
  "fields": {},
  "approved": true,
  "date_created": "2020-07-02T12:47:35.953Z",
  "version": "v2",
  "jwt_secret": "",
  "certificate": "",
  "portal_developer": {
    "id": "5efdbdb749960c000137f589",
    "email": "portal-developer@example.org",
    "date_created": "2020-07-02T10:57:59.878Z",
    "inactive": false,
    "org_id": "5e9d9544a1dcd60001d0ed20",
    "keys": {
      "2ac7b253c36e210d": [
        "5ead7120575961000181867e"
      ]
    },
    "subscriptions": {
      "5ead7120575961000181867e": "2ac7b253c36e210d"
    },
    "fields": {},
    "nonce": "",
    "sso_key": "",
    "password_max_days": 0,
    "password_updated": "2020-07-02T10:57:59.951Z",
    "PWHistory": [],
    "last_login_date": "2020-07-02T12:47:31.837Z"
  },
  "catalogue_entry": {
    "name": "Swagger Petstore",
    "short_description": "",
    "long_description": "",
    "show": true,
    "api_id": "",
    "policy_id": "5ead7120575961000181867e",
    "documentation": "5efdbdb849960c000137f58a",
    "version": "v2",
    "is_keyless": false,
    "config": {
      "id": "",
      "org_id": "",
      "signup_fields": [],
      "key_request_fields": [],
      "require_key_approval": false,
      "redirect_on_key_request": false,
      "redirect_to": "",
      "enable_multi_selection": false,
      "disable_login": false,
      "disable_signup": false,
      "disable_auto_login": false,
      "catalogue_login_only": false,
      "oauth_usage_limit": -1,
      "email": "",
      "mail_options": {
        "mail_from_name": "",
        "mail_from_email": "",
        "email_copy": {
          "welcome_email": {
            "enabled": false,
            "subject": "",
            "body": "",
            "sign_off": "",
            "hide_token_data": false
          },
          "key_email": {
            "enabled": false,
            "subject": "",
            "body": "",
            "sign_off": "",
            "hide_token_data": false
          },
          "reset_password_email": {
            "enabled": false,
            "subject": "",
            "body": "",
            "sign_off": "",
            "hide_token_data": false
          }
        }
      },
      "override": false,
      "HashKeys": false
    },
    "fields": {},
    "auth_type": "authToken"
  },
  "catalogues": [{
    "name": "Swagger Petstore",
    "short_description": "",
    "long_description": "",
    "show": true,
    "api_id": "",
    "policy_id": "5ead7120575961000181867e",
    "documentation": "5efdbdb849960c000137f58a",
    "version": "v2",
    "is_keyless": false,
    "config": {
      "id": "",
      "org_id": "",
      "signup_fields": [],
      "key_request_fields": [],
      "require_key_approval": false,
      "redirect_on_key_request": false,
      "redirect_to": "",
      "enable_multi_selection": false,
      "disable_login": false,
      "disable_signup": false,
      "disable_auto_login": false,
      "catalogue_login_only": false,
      "oauth_usage_limit": -1,
      "email": "",
      "mail_options": {
        "mail_from_name": "",
        "mail_from_email": "",
        "email_copy": {
          "welcome_email": {
            "enabled": false,
            "subject": "",
            "body": "",
            "sign_off": "",
            "hide_token_data": false
          },
          "key_email": {
            "enabled": false,
            "subject": "",
            "body": "",
            "sign_off": "",
            "hide_token_data": false
          },
          "reset_password_email": {
            "enabled": false,
            "subject": "",
            "body": "",
            "sign_off": "",
            "hide_token_data": false
          }
        }
      },
      "override": false,
      "HashKeys": false
    },
    "fields": {},
    "auth_type": "authToken"
  }]
}
```

#### Sample Response

```
{
  "Status": "OK",
  "Message": "5efde61749960c000137f590",
  "Meta": null
}
```

### Delete a Key Request

| **Property** | **Description**            |
| ------------ | -------------------------- |
| Resource URL | `/api/portal/requests/{id}`|
| Method       | DELETE                     |
| Type         | None                     |
| Body         | None                     |
| Param        | None                     |

#### Sample Request

```{.copyWrapper}
DELETE /api/portal/requests/5efde61749960c000137f590 HTTP/1.1
Host: localhost
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8
```

#### Sample Response

```
{
  "Status": "OK",
  "Message": "Data deleted",
  "Meta": null
}
```

### Approve Key Requests

| **Property** | **Description**               |
| ------------ | ----------------------------- |
| Resource URL | `/api/portal/requests/approve/{id}`|
| Method       | PUT                           |
| Type         | None                          |
| Body         | Developer Object              |
| Param        | None                          |

#### Sample Request

```{.copyWrapper}
PUT /api/portal/requests HTTP/1.1
Host: localhost
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8
```

#### Sample Response

```
{
    "RawKey": "eyJvcmciOiI1ZTlkOTU0NGExZGNkNjAwMDFkMGVkMjAiLCJpZCI6ImQ0NzIzOWUxMjg3NTRjMGM5MTQ4MzYzMjg2YjhlZDQ2IiwiaCI6Im11cm11cjY0In0=",
    "Password": ""
}
```

**Note:** If you're using Authentication Token as your authentication mode, the `RawKey` value is the actual API Key used to send authenticated requests.