---
title: Deploy Tyk to Heroku Walkthrough
notoc: true
---
## <a name="deploy"></a>Deploy Tyk to Heroku

1. After signing up to Tyk, click the "Reclaim the Invite" button.
2. Click the The "Deploy to Heroku" Button that is displayed. 
![Deploy to Heroku][1]
3. The Heroku Account Login page will be displayed.
![Heroku login][2]
4. Enter your existing Heroku account details, or click "Sign Up" to create an account.

    > **Note:** This doesn't work with Heroku Teams, which only support Hobby+ dynos as this application is configured for the free Heroku tier and meant for evaluation purposes. However, once deployed, the plan may be upgraded from your application dashboard.

5. After logging in, a Create App page is displayed.
![Create App][3]
6. Give it a suitable name and click "Deploy App", (you may need to provide Heroku with a Credit Card to proceed past this point, depending on your account setup).

    > **Note:** You can run Tyk free of charge on a single dyno. However a production installation requires two dynos, which are chargeable.

7. Your Heroku app is deployed. Click "Manage App" to  manage the app from Heroku or click "View" to follow the Tyk Hybrid tutorials to get your first API set up with Tyk.
![Manage App][4]

## <a name="manage"></a>Heroku Dashboard

When you click "Manage App", the Heroku Dashboard is displayed:
![Heroku Dashboard][5]

The Heroku dashboard contains information and settings about your deployed Tyk App.

> **NOTE**: Before you can click "Open app" from the Heroku Dashboard, you must have an API configured in Tyk. You can log in to your Tyk Dashboard from https://admin.cloud.tyk.io/#/. For tutorials on creating APIs, Keys and Policies, see [here](/docs/get-started/with-tyk-hybrid/tutorials/).

### Overview
The Overview screen displays information about your Heroku add-ons and the latest activity for your deployed app.
### Resources
The Resources screen shows what resources your app is consuming and any associated costs. It also lists Any Heroku dynos that are available to you. The dynos available may depend on the level of account you have.
### Deploy
The Deploy screen displays the various deployment methods and pipelines you can use with your app.
### Metrics
Depending on your account, you can see various metrics for your Tyk deployed app.
### Activity
The Activity screen gives you a history of all activity relating to your app.
### Access
From the Access screen, you can see the list of current collaborators, and you can add new collaborators if necessary.
### Settings
From the Settings page, you can see the Config Variables by from the "Reveal Config Vars" button.
![Reveal Vars][6]

You can edit existing vars or create new ones from this screen.
The Settings screen also displays Info, Buildpack, Domains and Certificate, and Transfer Ownership.

You can also take your app offline by turning Maintenance Mode on.

You can also delete your app from this screen if required.



[1]: /docs/img/cloud/deploy_to_heroku.png
[2]: /docs/img/cloud/heroku_login.png
[3]: /docs/img/cloud/deploy_heroku_app.png
[4]: /docs/img/cloud/manage_heroku_app.png
[5]: /docs/img/cloud/heroku-dashboard.png
[6]: /docs/img/cloud/heroku_reveal_config_vars.png