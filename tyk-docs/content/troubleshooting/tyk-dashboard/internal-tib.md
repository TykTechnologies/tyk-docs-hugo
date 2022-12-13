---
title: "Internal TIB SSO User unable to log in"
date: 2020-08-07T13:10:55+01:00
menu:
  main:
    parent: "Tyk Dashboard Troubleshooting"
weight: 7
---

### Description

After creating an SSO Identity profile in the Tyk Dashboard, a user is unable to log in to the Dashboard or the Developer Portal

### Cause

One potential cause is that the `DashboardCredential` setting has not been populated with the user's Tyk Dashboard API Access Credentials.
You can check this from:

1. From the Dashboard menu, select the Identity Management option
2. Edit the profile you created
3. Select the Raw Editor
4. Check to see if the `DashboardCredential` setting is set

![DashboardCredentials](img/2.10/identity_profile2.png)



### Workaround Solution

If, as above, the `DashboardCredential` setting is empty (`"DashboardCredential": ""`), you can manually add the user's Tyk Dashboard API Access Credentials by performing the following:

1. From the System Management > Users menu, select Actions > Edit from the user whose credentials you want to use
2. Copy the **Tyk Dashboard API Access Credentials** value

![User API Access Credentials](img/2.10/user_api_credentials.png)

3. Paste this into the Raw editor for the `DashboardCredential` setting. For example - `"DashboardCredential": "887dad0de40b4ff05b6b50739b311099"`
4. Click **Update**
5. The user should now be able to log in to the Dashboard/Portal

{{< note success >}}
**Note**  

This issue is due to be fixed in an up coming release
{{< /note >}}