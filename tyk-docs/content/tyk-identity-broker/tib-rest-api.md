---
title: TIB REST API
menu:
  main:
    parent: "Tyk Identity Broker"
weight: 0 
url: /tyk-identity-broker/tib-rest-api/
aliases:
  - /advanced-configuration/integrate/3rd-party-identity-providers/tib-rest-api/
  - /integrate/3rd-party-identity-providers/tib-rest-api/
---

The Tyk Identity Broker (TIB) has an API to allow policies to be created, updated, removed and listed for programmatic and automated access. TIB also has a "flush" feature that enables you to flush the current configuration to disk for use when the client starts again.

TIB does not store profiles in a shared store, so if you have multiple TIB instances, they need to be configured individually (for now). Since we don't expect TIB stores to change often, this is acceptable. 

Starting from Tyk Dashboard 3, TIB is built-in to the dashboard. TIB endpoints are exposed as part of dashboard API on the `/api/tib/` prefix. So if in the guide below external TIB API endpoint is `/api/profiles` the similar endpoint on the dashboard API will be `/api/tib/profiles`.


## <a name="list-profile"></a>List Profiles 

```{.copyWrapper}
GET /api/profiles/
Authorization: test-secret

{
  "Status": "ok",
  "ID": "",
  "Data": [
    {
      "ActionType": "GenerateTemporaryAuthToken",
      "ID": "11",
      "IdentityHandlerConfig": {
        "DashboardCredential": "822f2b1c75dc4a4a522944caa757976a",
        "DisableOneTokenPerAPI": false,
        "TokenAuth": {
            "BaseAPIID": "e1d21f942ec746ed416ab97fe1bf07e8"
        }
      },
        "MatchedPolicyID": "5654566b30c55e3904000003",
        "OrgID": "53ac07777cbb8c2d53000002",
        "ProviderConfig": {
          "ExrtactUserNameFromBasicAuthHeader": true,
          "OKCode": 200,
          "OKRegex": "origin",
          "OKResponse": "ewogICJvcmlnaW4iOiAiNjIuMjMyLjExNC4yNTAsIDE3OC42Mi4xMS42MiwgMTc4LjYyLjExLjYyIgp9Cg==",
          "TargetHost": "http://sharrow.tyk.io/ba-1/"
        },
        "ProviderConstraints": {
          "Domain": "",
          "Group": ""
        },
        "ProviderName": "ProxyProvider",
        "ReturnURL": "",
        "Type": "passthrough"
    },
    {
        "ActionType": "GenerateOAuthTokenForClient",
        "ID": "6",
        "IdentityHandlerConfig": {
          "DashboardCredential": "{DASHBAORD-API-ID}",
          "DisableOneTokenPerAPI": false,
          "OAuth": {
            "APIListenPath": "{API-LISTEN-PATH}",
            "BaseAPIID": "{BASE-API-ID}",
            "ClientId": "{TYK-OAUTH-CLIENT-ID}",
            "RedirectURI": "http://{APP-DOMAIN}:{PORT}/{AUTH-SUCCESS-PATH}",
            "ResponseType": "token",
            "Secret": "{TYK-OAUTH-CLIENT-SECRET}"
          }
        },
        "MatchedPolicyID": "POLICY-ID",
        "OrgID": "53ac07777cbb8c2d53000002",
        "ProviderConfig": {
          "FailureRedirect": "http://{APP-DOMAIN}:{PORT}/failure",
          "LDAPAttributes": [],
          "LDAPUseSSL": false,
          "LDAPPort": "389",
          "LDAPServer": "localhost",
          "LDAPUserDN": "cn=*USERNAME*,cn=dashboard,ou=Group,dc=ldap,dc=tyk-ldap-test,dc=com"
      }
        "ProviderName": "ADProvider",
        "ReturnURL": "",
        "Type": "passthrough"
    }
  ]
}
```

## <a name="add-profile"></a> Add Profile

### Sample Request

```{.copyWrapper}
POST /api/profiles/{id}
Authorization: test-secret

{
  "ActionType": "GenerateTemporaryAuthToken",
  "ID": "11",
  "IdentityHandlerConfig": {
    "DashboardCredential": "822f2b1c75dc4a4a522944caa757976a",
    "DisableOneTokenPerAPI": false,
    "TokenAuth": {
        "BaseAPIID": "e1d21f942ec746ed416ab97fe1bf07e8"
    }
  },
  "MatchedPolicyID": "5654566b30c55e3904000003",
  "OrgID": "53ac07777cbb8c2d53000002",
  "ProviderConfig": {
    "ExrtactUserNameFromBasicAuthHeader": true,
    "OKCode": 200,
    "OKRegex": "origin",
    "OKResponse": "ewogICJvcmlnaW4iOiAiNjIuMjMyLjExNC4yNTAsIDE3OC42Mi4xMS42MiwgMTc4LjYyLjExLjYyIgp9Cg==",
    "TargetHost": "http://sharrow.tyk.io/ba-1/"
  },
  "ProviderConstraints": {
    "Domain": "",
    "Group": ""
  },
  "ProviderName": "ProxyProvider",
  "ReturnURL": "",
  "Type": "passthrough"
}
```

### Sample Response

```
{
  "Status": "ok",
  "ID": "11",
  "Data": {
    "ID": "11",
    "OrgID": "53ac07777cbb8c2d53000002",
    "ActionType": "GenerateTemporaryAuthToken",
    "MatchedPolicyID": "5654566b30c55e3904000003",
    "Type": "passthrough",
    "ProviderName": "ProxyProvider",
    "ProviderConfig": {
      "ExrtactUserNameFromBasicAuthHeader": true,
      "OKCode": 200,
      "OKRegex": "origin",
      "OKResponse": "ewogICJvcmlnaW4iOiAiNjIuMjMyLjExNC4yNTAsIDE3OC42Mi4xMS42MiwgMTc4LjYyLjExLjYyIgp9Cg==",
      "TargetHost": "http://sharrow.tyk.io/ba-1/"
    },
      "IdentityHandlerConfig": {
        "DashboardCredential": "822f2b1c75dc4a4a522944caa757976a",
        "DisableOneTokenPerAPI": false,
        "TokenAuth": {
            "BaseAPIID": "e1d21f942ec746ed416ab97fe1bf07e8"
        }
      },
      "ProviderConstraints": {
        "Domain": "",
        "Group": ""
      },
      "ReturnURL": ""
  }
}
```

## <a name="update-profile"></a> Update Profile

### Sample Request

```{.copyWrapper}
PUT /api/profiles/{id}
Authorization: test-secret

{
  "ActionType": "GenerateTemporaryAuthToken",
  "ID": "11",
  "IdentityHandlerConfig": {
    "DashboardCredential": "822f2b1c75dc4a4a522944caa757976a",
    "DisableOneTokenPerAPI": false,
    "TokenAuth": {
        "BaseAPIID": "e1d21f942ec746ed416ab97fe1bf07e8"
    }
  },
  "MatchedPolicyID": "5654566b30c55e3904000003",
  "OrgID": "53ac07777cbb8c2d53000002",
  "ProviderConfig": {
    "ExrtactUserNameFromBasicAuthHeader": true,
    "OKCode": 200,
    "OKRegex": "origin",
    "OKResponse": "ewogICJvcmlnaW4iOiAiNjIuMjMyLjExNC4yNTAsIDE3OC42Mi4xMS42MiwgMTc4LjYyLjExLjYyIgp9Cg==",
    "TargetHost": "http://sharrow.tyk.io/ba-1/"
  },
  "ProviderConstraints": {
    "Domain": "",
    "Group": ""
  },
  "ProviderName": "ProxyProvider",
  "ReturnURL": "",
  "Type": "passthrough"
}
```

### Sample Response

```
{
  "Status": "ok",
  "ID": "11",
  "Data": {
    "ID": "11",
    "OrgID": "53ac07777cbb8c2d53000002",
    "ActionType": "GenerateTemporaryAuthToken",
    "MatchedPolicyID": "5654566b30c55e3904000003",
    "Type": "passthrough",
    "ProviderName": "ProxyProvider",
    "ProviderConfig": {
      "ExrtactUserNameFromBasicAuthHeader": true,
      "OKCode": 200,
      "OKRegex": "origin",
      "OKResponse": "ewogICJvcmlnaW4iOiAiNjIuMjMyLjExNC4yNTAsIDE3OC42Mi4xMS42MiwgMTc4LjYyLjExLjYyIgp9Cg==",
      "TargetHost": "http://sharrow.tyk.io/ba-1/"
    },
      "IdentityHandlerConfig": {
        "DashboardCredential": "822f2b1c75dc4a4a522944caa757976a",
        "DisableOneTokenPerAPI": false,
        "TokenAuth": {
            "BaseAPIID": "e1d21f942ec746ed416ab97fe1bf07e8"
        }
      },
      "ProviderConstraints": {
        "Domain": "",
        "Group": ""
      },
      "ReturnURL": ""
  }
}
```

## <a name="delete-profile"></a> Delete Profile

### Sample Request

```{.copyWrapper}
Delete /api/profiles/{id}
Authorization: test-secret

[emtpy body]

```

### Sample Response

```
{
  "Status": "ok",
  "ID": "200",
  "Data": {}
}
```

## <a name="save-profile"></a> Save Profiles to Disk

### Sample Request

```{.copyWrapper}
POST /api/profiles/save
Authorization: test-secret
[empty body]
```

### Sample Response

```
{
  "Status": "ok",
  "ID": "",
  "Data": {}
}
```

## <a name="outcome"></a> Outcome

The existing `profiles.json` file will be backed up to a new file, and the current profiles data in memory will be flushed to disk as the new `profiles.json` file. Backups are time stamped (e.g. `profiles_backup_1452677499.json`).
