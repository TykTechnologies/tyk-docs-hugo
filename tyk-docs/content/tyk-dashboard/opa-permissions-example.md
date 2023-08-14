

## Introduction

This is an end-to-end worked example showing how to configure Open Policy Agent rules with some [additional permissions]({{< ref "tyk-dashboard-api/org/permissions" >}}).

## Use Case

Tyk's [RBAC]({{< ref "tyk-dashboard/rbac.md" >}}) includes out of the box permissions to Write, Read, and Deny access to API Definitions, but what if we want to distinguish between those users who can create APIs and those users who can edit or update APIs? Essentially, we want to extend Tyk's out of the box RBAC to include more fine grained permissions that prevent an `API Editor` role from creating new APIs, but allow them to edit or update existing APIs.

## High Level Steps

The high level steps to realise this use case are as follows:

1. Create additional permissions using API
2. Create user
3. Add OPA Rule
4. Test new rule


## Create additional permissions

To create the `API Editor` role with additional permissions send a PUT Request to the [Dashboard Additional Permissions API endpoint]({{< ref "tyk-dashboard-api/org/permissions.md" >}}) `/api/org/permissions`

#### Sample Request

In order to add the new role/permissions use the following payload.  Remember to set the `authorization` header to your Tyk Dashboard API Access Credentials secret from your user profile on the Dashboard UI

```{.copyWrapper}
PUT /api/org/permissions HTTP/1.1
Host: localhost:3000
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8

{
  "additional_permissions": {
    "api_editor": "API Editor"
  }
}
```

#### Sample Response

```
{
  "Status": "OK",
  "Message": "Additional Permissions updated in org level",
  "Meta": null
}
```

{{< note success >}}
**Note**  

This assumes no other additional permissions already exist.  If you're adding to existing permissions you'll want to send a GET to `/api/org/permissions` first, and then add the new permission to the existing list.

{{< /note >}}

## Create user
In the Dashboard UI, navigate to System Management -> Users, and hit the `Add User` button.  Create a user that has API `Write` access and the newly created `API Editor` permission, e.g.  

{{< img src="/img/dashboard/system-management/userAdditionalPermission.png" alt="User with Additional Permission" >}}

### Add OPA Rule

In the Dashboard UI, navigate to Dashboard Management -> OPA Rules

Edit the rules to add the following:

```
request_intent = "create" { input.request.method == "POST" }
request_intent = "update" { input.request.method == "PUT" }


# Editor and Creator intent
intent_match("create", "write")
intent_match("update", "write")


# API Editors not allowed to create APIs
deny[x] {
  input.user.user_permissions["api_editor"]
  request_permission[_] == "apis"
  request_intent == "create"
  x := "API Editors not allowed to create APIs."
}
```

Updated Default OPA Rules incorporating the above rules as follows:

```
# Default OPA rules
package dashboard_users
default request_intent = "write"
request_intent = "read" { input.request.method == "GET" }
request_intent = "read" { input.request.method == "HEAD" }
request_intent = "delete" { input.request.method == "DELETE" }
request_intent = "create" { input.request.method == "POST" }
request_intent = "update" { input.request.method == "PUT" }
# Set of rules to define which permission is required for a given request intent.
# read intent requires, at a minimum, the "read" permission
intent_match("read", "read")
intent_match("read", "write")
intent_match("read", "admin")
# write intent requires either the "write" or "admin" permission
intent_match("write", "write")
intent_match("write", "admin")
# delete intent requires either the "write" or "admin permission
intent_match("delete", "write")
intent_match("delete", "admin")
# Editor and Creator intent
intent_match("create", "write")
intent_match("update", "write")
# Helper to check if the user has "admin" permissions
default is_admin = false
is_admin {
    input.user.user_permissions["IsAdmin"] == "admin"
}
# Check if the request path matches any of the known permissions.
# input.permissions is an object passed from the Tyk Dashboard containing mapping between user permissions (“read”, “write” and “deny”) and the endpoint associated with the permission. 
# (eg. If “deny” is the permission for Analytics, it means the user would be denied the ability to make a request to ‘/api/usage’.)
#
# Example object:
#  "permissions": [
#        {
#            "permission": "analytics",
#            "rx": "\\/api\\/usage"
#        },
#        {
#            "permission": "analytics",
#            "rx": "\\/api\\/uptime"
#        }
#        ....
#  ]
#
# The input.permissions object can be extended with additional permissions (eg. you could create a permission called ‘Monitoring’ which gives “read” access to the analytics API ‘/analytics’). 
# This is can be achieved inside this script using the array.concat function.
request_permission[role] {
	perm := input.permissions[_]
	regex.match(perm.rx, input.request.path)
	role := perm.permission
}
# --------- Start "deny" rules -----------
# A deny object contains a detailed reason behind the denial.
default allow = false
allow { count(deny) == 0 }
deny["User is not active"] {
	not input.user.active
}
# If a request to an endpoint does not match any defined permissions, the request will be denied.
deny[x] {
	count(request_permission) == 0
	x := sprintf("This action is unknown. You do not have permission to access '%v'.", [input.request.path])
}
deny[x] {
	perm := request_permission[_]
	perm != "ResetPassword"
	not is_admin
	not input.user.user_permissions[perm]
	x := sprintf("You do not have permission to access '%v'.", [input.request.path])
}
# Deny requests for non-admins if the intent does not match or does not exist.
deny[x] {
	perm := request_permission[_]
	not is_admin
	not intent_match(request_intent, input.user.user_permissions[perm])
	x := sprintf("You do not have permission to carry out '%v' operation.", [request_intent, input.request.path])
}
# If the "deny" rule is found, deny the operation for admins
deny[x] {
	perm := request_permission[_]
	is_admin
	input.user.user_permissions[perm] == "deny"
	x := sprintf("You do not have permission to carry out '%v' operation.", [request_intent, input.request.path])
}
# Do not allow users (excluding admin users) to reset the password of another user.
deny[x] {
	request_permission[_] = "ResetPassword"
	not is_admin
	user_id := split(input.request.path, "/")[3]
	user_id != input.user.id
	x := sprintf("You do not have permission to reset the password for other users.", [user_id])
}
# Do not allow admin users to reset passwords if it is not allowed in the global config
deny[x] {
	request_permission[_] == "ResetPassword"
	is_admin
	not input.config.security.allow_admin_reset_password
	not input.user.user_permissions["ResetPassword"]
	x := "You do not have permission to reset the password for other users. As an admin user, this permission can be modified using OPA rules."
}
# API Editors not allowed to create APIs
deny[x] {
  input.user.user_permissions["api_editor"]
  request_permission[_] == "apis"
  request_intent == "create"
  x := "API Editors not allowed to create APIs."
}
# --------- End "deny" rules ----------
##################################################################################################################
# Demo Section: Examples of rule capabilities.                                                                   #
# The rules below are not executed until additional permissions have been assigned to the user or user group.    #
##################################################################################################################
# If you are testing using OPA playground, you can mock Tyk functions like this:
#
# TykAPIGet(path) = {}
# TykDiff(o1,o2) = {}
#
# You can use this pre-built playground: https://play.openpolicyagent.org/p/T1Rcz5Ugnb
# Example: Deny users the ability to change the API status with an additional permission.
# Note: This rule will not be executed unless the additional permission is set.
deny["You do not have permission to change the API status."] {
	# Checks the additional user permission enabled with tyk_analytics config: `"additional_permissions":["test_disable_deploy"]`
	input.user.user_permissions["test_disable_deploy"]
	# Checks the request intent is to update the API
	request_permission[_] == "apis"
	request_intent == "write"
	# Checks if the user is attempting to update the field for API status.
	# TykAPIGet accepts API URL as an argument, e.g. to receive API object call: TykAPIGet("/api/apis/<api-id>")
	api := TykAPIGet(input.request.path)
	# TykDiff performs Object diff and returns JSON Merge Patch document https://tools.ietf.org/html/rfc7396
	# eg. If only the state has changed, the diff may look like: {"active": true}
	diff := TykDiff(api, input.request.body)
	# Checks if API state has changed.
	not is_null(diff.api_definition.active)
}
# Using the patch_request helper you can modify the content of the request
# You should respond with JSON merge patch. 
# See https://tools.ietf.org/html/rfc7396 for more details
#
# Example: Modify data under a certain condition by enforcing http proxy configuration for all APIs with the #external category. 
patch_request[x] {
    # Enforce only for users with ["test_patch_request"] permissions.
    # Remove the ["test_patch_request"] permission to enforce the proxy configuration for all users instead of those with the permission.
    input.user.user_permissions["test_patch_request"]
    request_permission[_] == "apis"
    request_intent == "write"
    contains(input.request.body.api_definition.name, "#external")
    x := {"api_definition": {"proxy": {"transport": {"proxy_url": "http://company-proxy:8080"}}}}
}
# You can create additional permissions for not only individual users, but also user groups in your rules.
deny["Only '%v' group has permission to access this API"] {
    # Checks for the additional user permission enabled with tyk_analytics config: '"additional_permissions":["test_admin_usergroup"]
    input.user.user_permissions["test_admin_usergroup"]
    # Checks that the request intent is to access the API.
    request_permission[_] == "apis"
    api := TykAPIGet(input.request.path)
    # Checks that the API being accessed has the category #admin-teamA
    contains(input.request.body.api_definition.name, "#admin-teamA")
    # Checks for the user group name.
    not input.user.group_name == "TeamA-Admin"
}
```

## Test
Login to the Dashboard UI as the new `API Editor` user and try to create a new API.  You should see an `Access Denied` error message.  Now try to update an existing API.  This should be successful!!