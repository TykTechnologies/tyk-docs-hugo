---
title: "Set Up Tyk Cloud"
description: "This page serves as a comprehensive guide to migrating workloads to Tyk Cloud"
tags: ["Tyk Cloud", "Migration"]
aliases:
  - /tyk-cloud/telemetry/enable-telemetry
  - /tyk-cloud/telemetry/
  - /tyk-cloud
  - /tyk-cloud/account--billing/plans
  - /tyk-cloud/account--billing/retirement
  - /tyk-cloud/account-and-billing/add-payment-method
  - /tyk-cloud/account-and-billing/our-plans
  - /tyk-cloud/account-and-billing/retirement
  - /tyk-cloud/account-and-billing/upgrade-free-trial
  - /tyk-cloud/troubleshooting-&-support/tyk-cloud-mdcb-supported-versions
  - /tyk-cloud/account-&-billing/plans
  - /tyk-cloud/account-billing/add-payment-method
  - /tyk-cloud/account-billing/managing-billing-admins
  - /tyk-cloud/account-billing/plans
  - /tyk-cloud/account-billing/retirement
  - /tyk-cloud/account-billing/upgrade-free-trial
  - /tyk-cloud/configuration-options/using-plugins/api-test
  - /tyk-cloud/configuration-options/using-plugins/python-code-bundle
  - /tyk-cloud/configuration-options/using-plugins/python-custom-auth
  - /tyk-cloud/configuration-options/using-plugins/setup-control-plane
  - /tyk-cloud/configuration-options/using-plugins/uploading-bundle
  - /tyk-cloud/create-account
  - /tyk-cloud/create-environment
  - /tyk-cloud/environments--deployments/hybrid-gateways
  - /tyk-cloud/environments-&-deployments/hybrid-gateways
  - /tyk-cloud/environments-&-deployments/managing-apis
  - /tyk-cloud/environments-&-deployments/managing-control-planes
  - /tyk-cloud/environments-&-deployments/managing-environments
  - /tyk-cloud/environments-&-deployments/managing-gateways
  - /tyk-cloud/environments-&-deployments/monitoring
  - /tyk-cloud/environments-&-deployments/monitoring-usage
  - /tyk-cloud/environments-deployments/hybrid-gateways
  - /tyk-cloud/environments-deployments/managing-apis
  - /tyk-cloud/environments-deployments/managing-control-planes
  - /tyk-cloud/environments-deployments/managing-environments
  - /tyk-cloud/environments-deployments/monitoring
  - /tyk-cloud/first-api
  - /tyk-cloud/getting-started
  - /tyk-cloud/getting-started-tyk-cloud/create-account
  - /tyk-cloud/getting-started-tyk-cloud/first-api
  - /tyk-cloud/getting-started-tyk-cloud/setup-environment
  - /tyk-cloud/getting-started-tyk-cloud/setup-org
  - /tyk-cloud/getting-started-tyk-cloud/setup-team
  - /tyk-cloud/getting-started-tyk-cloud/test-api
  - /tyk-cloud/getting-started-tyk-cloud/to-conclude
  - /tyk-cloud/getting-started-tyk-cloud/view-analytics
  - /tyk-cloud/reference-docs/user-roles
  - /tyk-cloud/setup-org
  - /tyk-cloud/setup-team
  - /tyk-cloud/teams-&-users/managing-teams
  - /tyk-cloud/teams-&-users/managing-users
  - /tyk-cloud/teams-&-users/user-roles
  - /tyk-cloud/teams-users/managing-teams
  - /tyk-cloud/teams-users/managing-users
  - /tyk-cloud/teams-users/user-roles
  - /tyk-cloud/test-api
  - /tyk-cloud/using-custom-domains
  - /tyk-cloud/view-analytics
  - /tyk-cloud/what-we-covered
  - /tyk-cloud/account-billing
  - /tyk-cloud/configuration-options
  - /tyk-cloud/environments-&-deployments
  - /tyk-cloud/environments-&-deployments/managing-organisations
  - /tyk-cloud/environments-deployments
  - /tyk-cloud/environments-deployments/hybrid-gateways-helm
  - /tyk-cloud/environments-deployments/managing-gateways
  - /tyk-cloud/environments-deployments/managing-organisations
  - /tyk-cloud/environments-deployments/monitoring-how-it-works
  - /tyk-cloud/environments-deployments/monitoring-usage
  - /tyk-cloud/glossary
  - /tyk-cloud/securing-your-apis
  - /tyk-cloud/teams-&-users
  - /tyk-cloud/teams-users
  - /tyk-cloud/teams-users/single-sign-on
  - /tyk-cloud/troubleshooting-&-support
  - /tyk-cloud/troubleshooting-&-support/faqs
  - /tyk-cloud/troubleshooting-&-support/glossary
  - /tyk-cloud/troubleshooting-support
  - /tyk-cloud/troubleshooting-support/faqs
  - /tyk-cloud/troubleshooting-support/glossary
  - /tyk-cloud/troubleshooting-support/tyk-cloud-mdcb-supported-versions
  - /tyk-cloud/using-plugins
  - /tyk-cloud/what-is-tyk-cloud
  - /deployment-and-operations/tyk-cloud-platform/quick-start
  - /deployment-and-operations/tyk-open-source-api-gateway/setup-multiple-gateways
  - /frequently-asked-questions/custom-domain-for-portal-cloud-multi-cloud
  - /get-started/with-tyk-hybrid
  - /get-started/with-tyk-multi-cloud/tutorials/installation-on-aws
  - /getting-started/installation/with-tyk-multi-cloud/create-an-account
  - /getting-started/installation/with-tyk-multi-cloud/installation-on-aws
  - /using-plugins/python-custom-auth-plugin
  - /python-custom-auth-plugin/api-middleware-test
  - /python-custom-auth-plugin/python-code-bundle
  - /python-custom-auth-plugin/setup-control-plane
  - /python-custom-auth-plugin/uploading-bundle
  - /tyk-cloud/initial-portal-config
---

## What is Tyk Cloud

Tyk cloud is a fully managed service that makes it easy for API teams to create, secure, publish and maintain APIs at any scale, anywhere in the world. Tyk Cloud includes everything you need to manage your global API ecosystem: [Tyk Gateways]({{< ref "tyk-oss-gateway" >}}), [Tyk Dashboard]({{< ref "tyk-dashboard" >}}), [Tyk Developer Portal]({{< ref "tyk-developer-portal" >}}) and [Universal Data Graph]({{< ref "api-management/data-graph#overview" >}}).

- **No need to wrestle with infrastructure:** You can be up and running within a few clicks. No need for complex deployments or large infrastructure teams.
- **Flexible deployment options:** Whether you're a startup or a large enterprise, Tyk Cloud has deployment options to suit your needs. You can scale and manage your API ecosystem easily and efficiently. The control plane is hosted by Tyk in the cloud, in one of the 5 regions available. Meanwhile, the data planes, composed of Tyk Gateways and Redis for temporary storage, can be either hosted by Tyk or managed by you on your infrastructure.
- **Geographical freedom:** Tyk Cloud allows you to select your preferred AWS location as your home region, ensuring your data and Tyk Gateways are live and secured in the region that suits you best.
- **Designed for platform teams:** With Tyk Cloud, you can use [role-based access control (RBAC)](https://tyk.io/blog/how-to-manage-multiple-teams-with-tyk-cloud/) to manage your team structure, as well as [multiple environments and multiple organizations](https://tyk.io/blog/how-to-manage-multiple-teams-with-tyk-cloud/). 


Start using Tyk on our servers. Nothing to install:

{{< button_left href="https://tyk.io/sign-up/" color="green" content="Tyk Cloud Free trial" >}}


### Why Tyk Cloud?

#### Next Level SaaS

Tyk is cloud native and has always been a true multi-cloud product and now we’re taking it to the next level with our next level SaaS platform, Tyk Cloud.

Now you don’t need to worry about vendor lock-in, or complex deployments, you can benefit from being able to optimize your platforms across and between a myriad of providers such as AWS, Google Cloud etc.

#### Quick deployments Wherever you need them

Want to handle Govt API traffic in Singapore? With just a few clicks your data and Tyk Gateways are live and secured in the AWS Gov cloud. Want to add local Gateways in Australia to improve performance and resilience? It’s just a click away. Want to deploy your management layer to your own hosted servers rather than a cloud provider? We make it simple.

The new Tyk Cloud platform allows you to quickly setup the full Tyk Enterprise API Management platform, simply choosing the regions where you wish to locate your gateways and where you wish your data to reside, resulting in immediate and secure data sovereignty.

Seamlessly wire your environments between cloud providers, and your own infrastructure, anywhere in the world at the click of a button, not only eliminating lock-in but making it possible to expand your platform to cater for the changing needs of your clients.

#### Designed for Enterprises

Tyk Cloud is designed for Enterprises who may have multi-organizations and multi-teams, so you can combine or isolate your platform and the underlying providers, the choice is completely yours!

To make it even simpler, Tyk Cloud is pre-configured so you can be up and running within a few clicks, no laborious tasks for your internal teams and best practice configuration and security is delivered out of the box.

### Where is Tyk Cloud hosted?

Tyk Cloud is currently available to auto-deploy on AWS.
Paid plans and Enterprise trials allow users to select one of 6 AWS locations as their home region as well as the locations of their Cloud Data Planes. The 6 AWS regions to choose from are:
- aws-ap-southeast-1, Singapore
- aws-eu-central-1, Frankfurt, Germany
- aws-eu-west-2, London, UK
- aws-us-east-1, N. Virginia, USA
- aws-us-west-2, Oregon, USA
- aws-ap-southeast-2, Australia

## Quick Start Tyk Cloud

{{< note trial >}}
**Note**

The Tyk Cloud trial is limited to 48 hours. After this period, your data will be deleted.
The Tyk Cloud trial does not include access to [Hybrid deployments]({{< ref "#deploy-hybrid-gateways" >}}) or the [Developer Portal]({{< ref "portal/overview#" >}}).
To try out these capabilities, please get in touch for a [guided evaluation](https://tyk.io/guided-evaluation/) with our team.
{{< /note >}}

Welcome to the [Tyk Cloud Platform]({{< ref "tyk-cloud" >}})!
This guide will lead you through the following steps:
1. Signing up with [Tyk Cloud ]({{< ref "tyk-cloud" >}}).
2. Creating your first [API]({{< ref "api-management/gateway-config-introduction" >}}) using the [Tyk Dashboard]({{< ref "tyk-dashboard" >}}).
3. Setting up a [Policy]({{< ref "api-management/policies#what-is-a-security-policy" >}}) and Key to secure your APIs.

No installation required!

### Steps for Setting up Tyk Cloud

1. **Create Tyk Cloud Account**

To create Tyk Cloud account follow this [guide]({{< ref "getting-started/create-account" >}}).

2. **Get started with your first API with Tyk Dashboard**

To create your API using Tyk Dashboard follow this [guide]({{< ref "getting-started/configure-first-api" >}}).

## Tyk Cloud Feature Setups

{{< grid >}}

{{< badge title="Configuration" href="tyk-cloud#add-custom-authentication" >}}

**Python custom plugins**

Implement your own custom logic with Python based plugins
{{< /badge >}}

{{< badge title="Configuration" href="tyk-cloud#configure-custom-domains" >}}

**Using custom domains**

Configure custom domain for your Dashboard and Developer Portal
{{< /badge >}}

{{< badge title="Administration" href="tyk-cloud#managing-environments" >}}

**Manage environments**

Create and manage multiple environments within your Tyk Cloud organization
{{< /badge >}}

{{< badge title="Administration" href="tyk-cloud#managing-control-planes" >}}

**Manage deployments**

Create and manage your Cloud Control Plane and Cloud Data Plane deployments
{{< /badge >}}

{{< badge title="Administration" href="tyk-cloud#managing-teams-and-users" >}}

**Manage teams & users**

Create teams in your organization, define roles and manage user access
{{< /badge >}}

{{< badge title="Account" href="tyk-cloud#manage-accounts-and-billing" >}}

**Manage billing**

Upgrade your subscription, billing details or card information
{{< /badge >}}

{{< /grid >}}

## Comprehensive Tyk Cloud Setup

This section walks you through how to start using Tyk Cloud, creating organization, environment and users before creating an API. If you are in a hurry, try the [Quick Start guide]({{< ref "#quick-start-tyk-cloud" >}}) for a 5 min version of this tutorial. 

* Creating your Tyk Cloud account
* Your first Organization
* Creating your first Team and Environment
* Configuring and deploying your Control Plane and creating your Cloud Data Plane
* Adding and testing your first API

{{< note success >}}
**Note**  

`Comprehensive Tyk Cloud Setup` requires access to `Tyk Cloud Console` (management UI). Please note that free trial users do not have access to the `Tyk Cloud Console`. To obtain the required access, contact [support](https://tyk.io/contact/).
{{< /note >}}

At the end of this process you will have a simple API set up via a Tyk Dashboard and you'll see analytics for this API on the Tyk Activity Dashboard.

Depending on your initial requirements in terms of Environments, Teams and Users, the setup process should take between 15 to 30 minutes.

### Prerequisites

The following information would be useful so you can set up Tyk Cloud as quickly as possible:

* Team member information including their email address and the role you plan to assign to them.
* We have some specific terminology used within Tyk Cloud. It would be useful to checkout our [Glossary]({{< ref "#glossary" >}}) so you understand what we are referring to.

### Hierarchy

This diagram shows how _Organization, Teams, Environments, Control Planes and Cloud Data Planes_ fit in with each other and which object contains which:

{{< img src="/img/cloud/Onboarding_Diagram_2-1_Ara.png" alt="Hierarchy of Organization, Teams, Environments, Control Planes and Cloud Data Planes" >}}

### Complete Cloud Setup Tasks

#### Create an Account

You can use Tyk Cloud to manage your APIs effectively and with minimal effort. This page explains how to create an account, in order to start doing so.

##### What happens when you create your Tyk Cloud account?

When you create your Tyk Cloud account, we do the following for you:

* Assign the account creator as a [Billing admin]({{< ref "#user-roles-in-tyk-cloud" >}}) for the Organization. This user role allows you to manage the billing and plans for your org. You can also add other billing admins as required.
* Assign the new account to our [48 hours free trial plan](https://tyk.io/sign-up/#cloud)

##### Creating your first account

[Start here](https://tyk.io/sign-up/#cloud).

* To create your account, you will have to fill in first-level details like your first name, last name and email.
* Then, set up a password for your Tyk Cloud account.
* Following that check the box at the bottom of the page to confirm that you have read and accepted our [Terms and Conditions](https://tyk.io/software-as-a-service-agreement/).
* Finally, click **Create new account**
* After completing the Account Creation form, click **Start Organization Setup**.


#### Set Up Your Organisation

Now that you have created the new Tyk Cloud account with your basic details, it is time to set up your organization. This page will tell you how to set up your organization and also about the two ways of setting it up.

##### What is an organization?

* An organization is the main entity for all your data (Environments, APIs, Users, etc)
* An Organization is connected to a single region and once connected, cannot be changed.
  
##### Steps to set up your organization  

* **Step 1 - Name your Organization:** Give your organization a name. This is up to you, but most users use their company name.

* **Step 2 - Select a Home Region:** Select a region from the drop-down list where your [Control Plane]({{< ref "#glossary" >}}) will be deployed and your data stored. The number of regions available will depend on your license. Further regions can be added as an upgrade option.

{{< note success >}}
**Note**
  
Tyk Cloud can currently be deployed across 2 AWS regions in the USA plus UK, Germany and Singapore. If you have any concerns about Brexit impacting the way you store data you should read [AWS regularly updated Brexit statement](https://aws.amazon.com/compliance/gdpr-center/brexit/).
{{< /note >}}

##### Types of Setups

You can now select how to configure your deployment.

**Option 1: Demo Setup**

Our demo setup will quickly configure your first deployment setup automatically, creating your first team, Cloud Control Plane and Cloud Data Plane.

**Option 2: Manual Setup**

This setup option gives you full control on creating the following:

* Teams
* Environments
* Configuration and deployment of Control Planes and Cloud Data Planes

For a manual setup you'll get started by [setting up your first team]({{< ref "#create-your-first-team" >}}).

#### Create Your First Team

Following organization setup, you will have to set up your team(s) on Tyk Cloud. This page will tell you all about the process.

##### What is a team?

* A team is a sub-grouping inside an organization. 
* Inside a team, you can define users(team members) and roles(permissions that can be applied to a user or a team of users).

##### Steps to set up your team

After creating your Organization you'll land on the success screen. Click **Get Started**.

* **Step 1 - Name your Team:** Give your [Team]({{< ref "#glossary" >}}) a name. You may find it useful to reflect the names used within your organization.

* **Step Two - Invite your Users:** Invite your [users]({{< ref "#glossary" >}}) to your team. You'll only need their email address and which of the available [roles]({{< ref "#glossary" >}}) you want to assign to them. This step is optional and can be completed within the dashboard later.

##### User Roles in Tyk Cloud

Out of the box, the following roles are setup:

* **Team member:** They can manage deployment activity for the team they are added to.
* **Team admin:** They can manage deployment activity and users for the team they are added to.
* **Organization admin:** They can manage deployment activity and users for a single organization.

Next you'll create an [Environment]({{< ref "#configure-environment-and-deployments" >}}).

#### Configure Environment and Deployments

An Environment allows you to group deployments together. In this step we will create an Environment and configure our first Control Plane and Cloud Data Plane deployments.

##### What is an environment?

An environment is a grouping of ‘deployments’ that can have multiple Control Planes and Cloud Data Planes.

##### Steps to set up your environment

* **Step 1 - Name your Environment:** Give your [Environment]({{< ref "#glossary" >}}) a name. You may find it useful to reflect the names used within your organization such as Development, Production etc.
  
* **Step 2 - Name your Control Plane:** Give your [Control Plane]({{< ref "#glossary" >}}) a name. Again, this is up to you and you may already have an infrastructure you want to re-create in Tyk Cloud.
  
* **Step 3 - Configure your first Cloud Data Plane:** Select the region you want to locate your [Cloud Data Plane]({{< ref "#glossary" >}}) in from the drop-down list. Your Cloud Data Plane is not confined to the same region as your Organization and Control Plane but the amount of regions you have to choose from can be limited depending on your subscription plan. Give your Cloud Data Plane a name. 

{{< note success >}}
**Note**
  
You need to have at least one Cloud Data Plane with a *Deployed* status connected to your Control Plane.
{{< /note >}}

* **Step 4 - Deployment:**

1. Click [Deploy Control Plane and Create a Cloud Data Plane]({{< ref "#glossary" >}}). You can watch your Control Plane being deployed and your Cloud Data Plane being created. You will then be taken to the Control Plane overview screen within the Tyk Cloud dashboard.
2. From your Control Plane overview you will see the Cloud Data Plane is in a **Not Deployed** state. Click on your Cloud Data Plane to open its overview.
3. In the top right of your Cloud Data Plane overview, click **Not Deployed** and choose **Deploy** from the drop-down.
4. With your Cloud Data Plane successfully deployed, make a note of the tags assigned to your Cloud Data Plane. One tag is "edge" and the other is the location of your Cloud Data Plane. You'll add a tag when creating your API.

Here's a video on how to set up your Tyk Cloud Environment.

{{< youtube DxoLm0vgsP8 >}}

Next you'll [set up your first API]({{< ref "#deploy-and-add-your-first-api" >}}) from the Tyk Dashboard.

#### Deploy and Add Your First API

Your onboarding is now complete! The next step will be to setup a very basic API to demonstrate how APIs are managed within Tyk Cloud.

{{< warning success >}}

Warning

In Tyk Gateway release 5.3.0, Tyk OAS APIs gained feature maturity. Tyk Dashboard will automatically migrate any pre-5.3.0 Tyk OAS APIs to the feature mature standard when you upgrade to 5.3.0 or later. Feature mature Tyk OAS APIs may not work with pre-5.3.0 versions of Tyk Gateway.

It is not possible to rollback to previous versions of Tyk components with Tyk OAS APIs created in 5.3.0.

For further details, please refer to the [release notes]({{< ref "developer-support/release-notes/gateway#530-release-notes" >}}) for Tyk Gateway v5.3.0.
{{< /warning >}}

##### Steps to add an API in Tyk Cloud

* **Step 1 - Access the Dashboard:** Go to the Control Plane overview and click the dashboard link in the Ingress list. You'll be redirected to the Tyk Dashboard for your [Control Plane]({{< ref "#glossary" >}}).
* **Step 2 - Add a New API:** Click the APIs menu item and then click **Add New API**.
* **Step 3 - Core Settings:**

  1. Give Your API a name - We'll use "my app" for the rest of this Getting Started journey.
  2. Scroll down to the **Target URL** setting and use the URL https://httpbin.org/
  3. Then scroll down to the Authentication section and select **Open(Keyless)** to keep things simple for this demo.

{{< warning success >}}
**Warning**
  
Ensure you configure a valid API Listen path.  Root ("/") listen paths are **not** supported on Tyk Cloud deployments prior to version v3.2.0.
{{< /warning >}}

* **Step 4 - Advanced Options:**

  1. Click the **Advanced Options** tab of the API Designer.
  2. Scroll to the **Segment Tags (Node Segmentation)** setting and add the cloud data plane tag (edge) you saw when creating the Cloud Data Plane.

{{< img src="/img/cloud/edge_segment_tags.png" alt="Segment Tags" >}}

{{< note success >}}
**Note:**

**How Segment Tags work in Tyk Cloud?**

When a Cloud Data Plane is deployed, the tag 'edge' and a location tag are automatically generated for the Cloud Data Plane. You use these tags to connect your API to the appropriate Cloud Data Plane. It works as follows:

1. Add the **edge** tag to your API to connect it to all Cloud Data Planes within the Control Plane.
2. Add the location tag to your API to connect it to only Cloud Data Planes with that location within the Control Plane.
{{< /note >}}

{{< warning success >}}
**Warning**
  
All APIs must be connected to a Cloud Data Plane by adding the appropriate tag in the *Segment Tags (Node Segmentation)* in the API Designer.
{{< /warning >}}

* **Step 5 - Save Your API:** Click **Save** from the API Designer. Your API will now be added to the APIs list and as the next step you'll access your API from the Gateway Ingress.

Watch our video on Adding an API to your Tyk Cloud Dashboard.

{{< youtube OtQMNKwfXwo >}}

Want to learn more from one of our team?

{{< button_left href="https://tyk.io/book-a-demo/" color="green" content="Book a demo" >}}


#### Test Your API

Your first API has been added. What's next? Testing it! This page shows how you can test an API that you have added to Tyk Cloud, to ensure that it’s functioning correctly. You'll now access the API you setup in [Task 5]({{< ref "#deploy-and-add-your-first-api" >}}) from the Cloud Data Plane within Tyk Cloud.

##### Steps to test your API

* **Step 1 - Access the Gateway Ingress:** From the Cloud Data Plane overview, copy the Ingress link and open it in a browser tab. You will get a 404 error.
  
* **Step 2 - Append the URL with your API:** You created a API named **my app** in [Task 5]({{< ref "#deploy-and-add-your-first-api" >}}). Add `/my-app/` to the end of the URL. You should be taken to [https://httpbin.org/](https://httpbin.org/), which you added as the **Target URL** for the API in [Task 5]({{< ref "#steps-to-add-an-api-in-tyk-cloud" >}}). 


Next you'll [view the analytics]({{< ref "#view-analytics" >}}) for your API in the Dashboard.

#### View Analytics

We have now created and tested our API. How do we know that they are performing well? This page walks you through how to then view your API analytics so that you can ensure your APIs are performing perfectly. 

##### Steps to check your API analytics

* **Step 1 - Access the Dashboard:** You'll now look at the analytics for the API you created in [Task 5]({{< ref "#deploy-and-add-your-first-api" >}}).If you're not still in the Tyk Dashboard for your Control Plane, click the dashboard link in the Control Plane Ingress list. Click the Gateway Dashboard menu item and you can see the successful calls made to your API from the Cloud Data Plane you created.
  
* **Step 2 - Create an Error:** From the Cloud Data Plane, make a call that will throw an error. For example, use `me-app` instead of `my-app`. You should see the error displayed in the Analytics.


#### Review Your Setup

This summary page explains the steps required to implement Tyk Cloud, which enables you to manage your APIs seamlessly. 

We've covered the following to get you started with the Tyk Cloud way of managing Tyk deployments:

* We've created a new Organization
* We've added a Team
* We've added an Environment, including a Control Plane and an associated Cloud Data Plane and deployed them
* We've added a very simple API to the Control Plane Dashboard and tested it via the first Cloud Data Plane
* We've seen the data from the Gateways displayed in the Analytics section of the Control Plane Dashboard

We have actually only scratched the surface of what is possible with Tyk Cloud.

What to go through next:

* Managing your Deployments
* Adding [Plugins and Middleware]({{< ref "#configure-plugins" >}}) to your Control Plane

## Import Existing APIs

Tyk supports importing both API Blueprint and Swagger (OpenAPI) JSON definitions from either the Gateway or the Dashboard. Tyk will output the converted file to to `stdout`. Below are the commands you can use to get Tyk to switch to command mode and generate the respective API definitions for both API Blueprint and Swagger files.

### API Blueprint is being Deprecated

Our support for API Blueprint is being deprecated. We have been packaging [aglio](https://github.com/danielgtaylor/aglio) in our Docker images for the Dashboard which enables rendering API Blueprint Format in the portal. This module is no longer maintained and is not compatible with newer NodeJS. If you wish to continue using this feature, you can do so by installing the module yourself in your Dockerfile. The imapct of this change is that our Docker images will no longer contain this functionality.

As a work around, you can do the following:

* Create API Blueprint in JSON format using the Apiary [Drafter](https://github.com/apiaryio/drafter) tool
* Convert API Blueprint to OpenAPI (Swagger) using the Apiary [API Elements CLI](https://github.com/apiaryio/api-elements.js/tree/master/packages/cli) tool.

### Import APIs via the Gateway

#### Using API Blueprint

{{< note success >}}
**Note**  

See [note](#api-blueprint-is-being-deprecated) above regarding deprecation of support for API Blueprint.
{{< /note >}}

Tyk supports an easy way to import Apiary API Blueprints in JSON format using the command line.

Blueprints can be imported and turned into standalone API definitions (for new APIs) and also imported as versions into existing APIs.

It is possible to import APIs and generate mocks or to generate Allow Lists that pass-through to an upstream URL.

All imported Blueprints must be in the JSON representation of Blueprint's markdown documents. This can be created using Apiary's [Snow Crash tool](https://github.com/apiaryio/snowcrash).

Tyk outputs all new API definitions to `stdout`, so redirecting the output to a file is advised in order to generate new definitions to use in a real configuration.

**Importing a Blueprint as a new API:**

Create a new definition from the Blueprint:

```{.copyWrapper}
./tyk --import-blueprint=blueprint.json --create-api --org-id=<id> --upstream-target="http://widgets.com/api/"
```

**Importing a definition as a version in an existing API:**

Add a version to a definition:

```{.copyWrapper}
./tyk --import-blueprint=blueprint.json --for-api=<path> --as-version="version_number"
```

**Creating your API versions as a mock**

As the API Blueprint definition allows for example responses to be embedded, these examples can be imported as forced replies, in effect mocking out the API. To enable this mode, when generating a new API or importing as a version, simply add the `--as-mock` parameter.

#### Using Swagger (OpenAPI)

Tyk supports importing Swagger documents to create API definitions and API versions. Swagger imports do not support mocking though, so sample data and replies will need to be added manually later.

**Importing a Swagger document as a new API**

Create a new definition from Swagger:

```{.copyWrapper}
./tyk --import-swagger=petstore.json --create-api --org-id=<id> --upstream-target="http://widgets.com/api/"
```
{{< note success >}}
**Note**  

When creating a new definition from an OAS 3.0 spec, you will have to manually add the listen path after the API is created.
{{< /note >}}


**Importing a Swagger document as a version into an existing API**

Add a version to a definition:

```{.copyWrapper}
./tyk --import-swagger=petstore.json --for-api=<path> --as-version="version_number"
```

**Mocks**

Tyk supports API mocking using our versioning `use_extended_paths` setup, adding mocked URL data to one of the three list types (white_list, black_list or ignored). In order to handle a mocked path, use an entry that has `action` set to `reply`:

```json
"ignored": [
  {
    "path": "/v1/ignored/with_id/{id}",
    "method_actions": {
      "GET": {
        "action": "reply",
        "code": 200,
        "data": "Hello World",
        "headers": {
          "x-tyk-override": "tyk-override"
        }
      }
    }
  }
],
```

See [Versioning]({{< ref "api-management/api-versioning#tyk-classic-api-versioning-1" >}}) for more details.

### Import APIs via the Dashboard API

#### Import API - Swagger

| **Property** | **Description**           |
| ------------ | ------------------------- |
| Resource URL | `/api/import/swagger/`    |
| Method       | POST                      |
| Type         | None                      |
| Body         | None                      |
| Param        | None                      |

**Sample Request**

```{.json}
POST /api/import/swagger/
Host: localhost:3000
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8
{
  "swagger": "{swagger data...}",
  "insert_into_api": false, 
  "api_id": "internal API id",
  "version_name": "yourversionname",
  "upstream_url": "yourupstreamurl"
}
```

Parameters:

*   `insert_into_api`: If set to `true` the import will replace an existing API. Setting to `false` will import into a new API.
*   `api_id`: The internal MongoDB object id for your API.
*   `version_name`: Your versioning convention name for the imported API.
*   `upstream_url`: The URL the API is served by.


**Sample Response**

```
{
  "Status": "OK",
  "Message": "API Imported",
  "Meta": "new_api_id"
}

```


#### Import API - Blueprint

| **Property** | **Description**             |
| ------------ | --------------------------- |
| Resource URL | `/api/import/blueprint/`    |
| Method       | POST                        |
| Type         | None                        |
| Body         | None                        |
| Param        | None                        |

**Sample Request**

```{.json}
POST /api/import/blueprint/
Host: localhost:3000
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8
{
  "blueprint": "{blueprint data...}",
  "insert_into_api": false, 
  "api_id": "internal API id",
  "as_mock": false,
  "version_name": "yourversionname",
  "upstream_url": "yourupstreamurl"
}
```

Parameters:

*   `insert_into_api`: If set to `true` the import will replace an existing API. Setting to `false` will import into a new API.
*   `api_id`: The internal MongoDB object id for your API.
*   `as_mock`: If set to true, enables our mocking support for Blueprint imported API. See **Mocks** above for more details.
*   `version_name`: Your versioning convention name for the imported API.
*   `upstream_url`: The URL the API is served by.


**Sample Response**

```
{
  "Status": "OK",
  "Message": "API Imported",
  "Meta": "new_api_id"
}

```



### Import APIs via the Dashboard UI

1. **Select "APIs" from the "System Management" section**

{{< img src="/img/2.10/apis_menu.png" alt="API listing" >}}

2. **Click "IMPORT API"**

{{< img src="/img/2.10/import_api_button.png" alt="Add API button location" >}}

Tyk supports the following import options:

1. From an Existing Tyk API definition
2. From a Apiary Blueprint (JSON) file
3. From a Swagger/OpenAPI (JSON only) file
4. From a SOAP WSDL definition file (new from v1.9)

To import a Tyk Definition, just copy and paste the definition into the code editor.

For Apiary Blueprint and Swagger/OpenAPI, the process is the same. For example:

Click the "From Swagger (JSON)" option from the pop-up

{{< img src="/img/2.10/import_api_json.png" alt="Import popup" >}}

For WSDL:

{{< img src="/img/2.10/import_api_wsdl.png" alt="Import WSDL" >}}

3. **Enter API Information**

You need to enter the following information:

* Your **Upstream Target**
* A **Version Name** (optional)
* An optional **Service Name** and **Port** (WSDL only)
* Copy code into the editor

4. **Click "Generate API"**

Your API will appear in your APIs list. If you select **EDIT** from the **ACTIONS** drop-down list, you can see the endpoints (from the [Endpoint Designer](https://tyk.io/docs/transform-traffic/endpoint-designer/)) that have been created as part of the import process.

### Creating a new API Version by importing an API Definition using Tyk Dashboard

As well as importing new APIs, with Tyk, you can also use import to create a new version of an existing Tyk Classic API.

1. Open the API Designer page and select Import Version from the **Options** drop-down.

{{< img src="/img/oas/import-api-version.png" alt="Import API Version Drop-Down" >}}

2. Select either OpenAPI (v2.0 or 3.0) or WSDL/XML as your source API

3. You need to add a new **API Version Name**. **Upstream URL** is optional.

{{< img src="/img/oas/import-api-version-config.png" alt="Import API Version Configuration" >}}

4. Click **Import API**.

{{< img src="/img/oas/import-api-button.png" alt="Import API" >}}

5. Select the **Versions** tab and your new version will be available.
6. Open the **Endpoint Designer** for your API and select your new version from **Edit Version**.
7. You will see all the endpoints are saved for your new version.

{{< img src="/img/oas/version-endpoints.png" alt="Version Endpoints" >}}


## Additional Cloud Configuration

### Manage Environments and Deployments

This section covers the administration of the various components of your Tyk Cloud installation:

* [Managing Organizations]({{< ref "#set-up-your-organisation" >}})
* [Managing Environments]({{< ref "#manage-environments-and-deployments" >}})
* [Managing Control Planes]({{< ref "#managing-control-planes" >}})
* [Managing Cloud Data Planes]({{< ref "#managing-cloud-data-plane" >}})

It also covers links to how to start [managing your APIs]({{< ref "#manage-apis" >}}) via the Tyk Dashboard, accessible from your Control Plane.

#### Organisations Overview

Your Organization is your "container" for all your Environments, Control Planes and Cloud Data Planes. When you setup your Organization when [creating your account]({{< ref "getting-started/create-account" >}}), you assign it to a Home Region where all your data is stored. You cannot change this home region after creating your organization.

**Organization Overview Screen**

If you are an Organization Admin, when you log in you will see the Overview screen for the Organization you are connected to. If you are a team admin or team member you will see the Team Overview Screen. The Organization Overview screen displays the following info:

* Quick Stats
* All Teams
* All Deployments
* All Environments


**Quick Stats**

{{< img src="/img/admin/tyk-cloud-org-overview.png" alt="Quick Stats" >}}

This section gives you an "at a glance" overview of your organization. This section is designed to show what your plan entitles your organization to and how much of your entitlement is currently used in relation to Teams, Control Planes, Cloud Data Plane Deployments and the distribution of those deployments across the available entitlement regions.

**Teams**

{{< img src="/img/admin/tyk-cloud-org-teams.png" alt="Teams" >}}

This section shows the number of teams created within the organization, the number of environments the team is assigned to, and the Control Plane and Deployed Cloud Data Planes within those environments.

**Deployments**

The default view for this section is Group by Control Plane and shows all deployments across all teams.

{{< img src="/img/admin/tyk-cloud-org-deployments.png" alt="Deployments Grouped by Control Plane" >}}

**Environments**

The Environments section shows the environments created within your organization, the team they belong to and active deployments within each environment.

{{< img src="/img/admin/org_admin_environments.png" alt="Environments" >}}

#### Managing Environments

Environments are used to group your [Control Plane]({{< ref "#glossary" >}}) and [Cloud Data Planes]({{< ref "#glossary" >}}) into logical groups. For example you may want to create environments that reflect different departments of your organization.

{{< note success >}}
**Note**

The number of Environments you can create is determined by your [plan]({{< ref "#select-a-payment-plan" >}})
{{< /note >}}

##### Prerequisites

The following [user roles]({{< ref "#assign-user-roles" >}}) can perform Environment Admin tasks:

- Org Admin
- Team Admin

You should also have created a team to assign to any new environment.

##### Adding a New Environment

1. From the Environments screen, click **Add Environment**
2. Select the team you want to assign to the Environment
3. Give your new Environment a name
4. Click **Create**

##### Editing an Existing Environment

An Org Admin can perform the following:

- Rename an Environment
- Delete an Environment

1. Click the environment Name from your list

{{< img src="/img/admin/tyk-cloud-edit-env.png" alt="Edit Environment Name" >}}

2. Click Edit

{{< img src="/img/admin/tyk-cloud-env-screen.png" alt="Env Edit Screen" >}}

3. You can now rename the environment, or delete it from your organization

{{< img src="/img/admin/tyk-cloud-rename-delete.png" alt="Delete or Rename Env" >}}

{{< warning success >}}
**Warning**

Deleting an environment will also delete all the Control Planes and Cloud Data Planes associated with it
{{< /warning >}}

#### Managing Control Planes

Control Planes are situated in your Organization's home region and provide links to an instance of the [Tyk Dashboard]({{< ref "tyk-dashboard" >}}) and the [Developer Portal]({{< ref "tyk-developer-portal" >}}). The Dashboard is where you perform all your API tasks. The developer portal allows your 3rd party developers access to your APIs. Cloud Data Planes are then connected to your Control Planes.


##### Prerequisites

All [user roles]({{< ref "#assign-user-roles" >}}) can edit, deploy, undeploy, restart, redeploy all deployments within a team. Only the Organization Admin and the Team Admin can create or delete deployments.

##### Adding a new Control Plane

Watch our video on setting up a Control Plane and a Cloud Data Plane.

{{< youtube JqXXEDplrr8 >}}

{{< note success >}}
**Note**
  
The number of Control Planes you can add is dependent on your [plan]({{< ref "#select-a-payment-plan" >}})
{{< /note >}}

1. From the Deployments screen click **Add Deployment** (you can also add a Deployment from within an Environment overview)
2. Enter a name for the new Control Plane
3. Select Control Plane from the Type drop-down list
4. Select the Bundle Channel and Version
5. (Optional) Enter a [custom domain]({{< ref "#configure-custom-domains" >}}) if required
6. (Optional) Enable [plugins]({{< ref "#configure-plugins" >}}) if required

##### Edit Control Planes

You can edit the following Control Plane settings:
* Change the Control Plane name
* Add a [custom domain]({{< ref "#configure-custom-domains" >}})
* Change the Bundle Channel and Bundle Version
* Enable [plugins]({{< ref "#configure-plugins" >}})

{{< note success >}}
**Note**
  
The use of custom domains is dependent on your [plan]({{< ref "#select-a-payment-plan" >}})
{{< /note >}}

To edit an existing Control Plane:

1. From the Deployments screen, click the **Control Plane Name** from the list
2. Select **Edit** from the Deployed drop-down list

{{< img src="/img/admin/cp-edit.png" alt="Edit drop-down" >}}

##### Upgrade Control Planes

To upgrade an existing Control Plane:

1. Go to the **Control Plane settings** using the _Edit Control Planes_ instructions and scroll down to the **Version** section.
2. Select a **Bundle Channel**.

{{< img src="/img/admin/cp-edge-upgrade-channel.png" alt="Bundle channel drop-down" >}}

3. Next, select a **Bundle Version**.

{{< img src="/img/admin/cp-edge-upgrade-version.png" alt="Bundle version drop-down" >}}

4. To apply your changes, click the **"Save and Re-Deploy"** button located at the top right. After a few seconds, you will be redirected to the overview page of the Control Plane and a **"Deploying"** indicator button will appear. 

{{< img src="/img/admin/cp-edge-upgrade-deploying.png" alt="Deploying notification" >}}

5. A **"Deployed"** button indicates a successful upgrade.

{{< img src="/img/admin/cp-edge-upgrade-deployed.png" alt="Deployed notification" >}}

#### Managing Cloud Data Plane

Cloud Data Planes do all the heavy lifting of actually managing your requests: traffic proxying, access control, data transformation, logging and more.


##### Prerequisites

All [user roles]({{< ref "#assign-user-roles" >}}) can edit, deploy, undeploy, restart, redeploy all deployments within a team. Only the Organization Admin and the Team Admin can create or delete deployments.


##### Adding a new Cloud Data Plane

Watch our video on setting up a Control Plane and a Cloud Data Plane.

{{< youtube JqXXEDplrr8 >}}

{{< note success >}}
**Note**
  
The number of Cloud Data Planes you can add is dependent on your [plan]({{< ref "#select-a-payment-plan" >}})
{{< /note >}}

1. From the Deployments screen click **Add Deployment**
2. Enter a name for the new Gateway
3. Select Cloud Data Plane from the Type drop-down list
4. Select the Bundle Channel and Version
5. (Optional) Enter a [custom domain]({{< ref "#configure-custom-domains" >}}) if required
6. (Optional) Enable [plugins]({{< ref "#configure-plugins" >}}) if required

##### Edit Cloud Data Planes

You can edit the following Control Plane settings:
* Change the Gateway name
* Add a [custom domain]({{< ref "#configure-custom-domains" >}})
* Change the Bundle Channel and Bundle Version
* Enable [plugins]({{< ref "#configure-plugins" >}})

{{< note success >}}
**Note**
  
The use of custom domains is dependent on your [plan]({{< ref "#select-a-payment-plan" >}})
{{< /note >}}

To edit an existing Cloud Data Plane:

1. On the Deployments screen, expand the Control Plane and click on the Cloud Data Plane to access the Cloud Data Plane overview screen.
2. Select **Edit** from the Deployed drop-down list

{{< img src="/img/admin/cp-edit.png" alt="Cloud Data Plane drop-down" >}}


##### Upgrade Cloud Data Planes

To upgrade an existing Cloud Data Plane:

1. Go to the **Cloud Data Plane settings** using the _Edit Cloud Data Planes_ instructions and scroll down to the **Version** section.
2. Select a **Bundle Channel**.

{{< img src="/img/admin/cp-edge-upgrade-channel.png" alt="Bundle channel drop-down" >}}

3. Next, select a **Bundle Version**.

{{< img src="/img/admin/cp-edge-upgrade-version.png" alt="Bundle version drop-down" >}}

4. To apply your changes, click the **"Save and Re-Deploy"** button located at the top right. After a few seconds, you will be redirected to the overview page of the Control Plane and a **"Deploying"** indicator button will appear. 

{{< img src="/img/admin/cp-edge-upgrade-deploying.png" alt="Deploying notification" >}}

5. A **"Deployed"** button indicates a successful upgrade.

{{< img src="/img/admin/cp-edge-upgrade-deployed.png" alt="Deployed notification" >}}

#### Deploy Hybrid Gateways

[Tyk Cloud](https://tyk.io/cloud/) hosts and manages the control planes for you. You can deploy the data planes across multiple locations:

- as [Cloud Gateways]({{< ref "#managing-cloud-data-plane" >}}): Deployed and managed in *Tyk Cloud*, in any of our available regions. These are SaaS gateways, so there are no deployment or operational concerns.
- as Hybrid Gateways: This is a self-managed data plane, deployed in your infrastructure and managed by yourself. Your infrastructure can be a public or private cloud, or even your own data center.

This page describes the deployment of hybrid data planes and how to connect them to Tyk Cloud, in both Kubernetes and Docker environments.

##### Prerequisites

* Tyk Cloud Account, register here if you don't have one yet: {{< button_left href="https://tyk.io/sign-up/#cloud" color="green" content="free trial" >}}
* A Redis instance for each data plane, used as ephemeral storage for distributed rate limiting, token storage and analytics. You will find instructions for a simple Redis installation in the steps below.
* No incoming firewall rules are needed, as the connection between Tyk Hybrid Gateways and Tyk Cloud is always initiated from the Gateways, not from Tyk Cloud.

##### Tyk Hybrid Gateway configuration

The hybrid gateways in the data plane connect to the control plane in Tyk Cloud using the *Tyk Dashboard* API Access Credentials. Follow the guides below to create the configuration that we will be used in later sections to create a deployment:

Login to your Tyk Cloud account deployments section and click on `ADD HYBRID DATA PLANE`

  {{< img src="/img/hybrid-gateway/tyk-cloud-hybrid-configuration-home.png" alt="Tyk Cloud hybrid configuration home" >}}

Fill in the details and then click _SAVE DATA PLANE CONFIG_

  {{< img src="/img/hybrid-gateway/tyk-cloud-save-hybrid-configuration.png" alt="Save Tyk Cloud hybrid configuration home" >}}

This will open up a page with the data plane configuration details that we need.

  {{< img src="/img/hybrid-gateway/tyk-cloud-hybrid-masked-details.png" alt="Save Tyk Cloud hybrid configuration masked details" >}}

Those details are:
|                                      | Docker            | Helm                   |
|--------------------------------------|-------------------|------------------------|
| key                                  | api_key           | gateway.rpc.apiKey     |
| org_id                               | rpc_key           | gateway.rpc.rpcKey     |
| data_planes_connection_string (mdcb) | connection_string | gateway.rpc.connString |

You can also click on _OPEN DETAILS_

  {{< img src="/img/hybrid-gateway/tyk-cloud-hybrid-open-details.png" alt="Tyk Cloud hybrid open for details" >}}

This will reveal instructions that you can use to connect your hybrid data plane to Tyk Cloud.

{{< img src="/img/hybrid-gateway/tyk-cloud-hybrid-revealed-instructions.png" alt="Tyk Cloud hybrid detailed instructions" >}}


##### Deploy with Docker

**1. In your terminal, clone the demo application [Tyk Gateway Docker](https://github.com/TykTechnologies/tyk-gateway-docker) repository**

```bash
git clone https://github.com/TykTechnologies/tyk-gateway-docker.git
```


**2. Configure Tyk Gateway and its connection to Tyk Cloud**

You need to modify the following values in [tyk.hybrid.conf](https://github.com/TykTechnologies/tyk-gateway-docker#hybrid) configuration file:

* `rpc_key` - Organization ID
* `api_key` - Tyk Dashboard API Access Credentials of the user created earlier
* `connection_string`: MDCB connection string
* `group_id`*(optional)* - if you have multiple data planes (e.g. in different regions), specify the data plane group (string) to which the gateway you are deploying belongs. The data planes in the same group share one Redis.


```json
{
"rpc_key": "<ORG_ID>",
"api_key": "<API-KEY>",
"connection_string": "<MDCB-INGRESS>:443",
"group_id": "dataplane-europe",
}
```

* *(optional)* you can enable sharding to selectively load APIs to specific gateways, using the following:

```json
{
  "db_app_conf_options": {
    "node_is_segmented": true,
    "tags": ["qa", "uat"]
  }
}
```

**3. Configure the connection to Redis**

This example comes with a Redis instance pre-configured and deployed with Docker compose. If you want to use another Redis instance, make sure to update the `storage` section in [tyk.hybrid.conf](https://github.com/TykTechnologies/tyk-gateway-docker#hybrid):

```json
{
  "storage": {
        "type": "redis",
        "host": "tyk-redis",
        "port": 6379,
        "username": "",
        "password": "",
        "database": 0,
        "optimisation_max_idle": 2000,
        "optimisation_max_active": 4000
    }
}
```

**4. Update docker compose file**

Edit the <docker-compose.yml> file to use the [tyk.hybrid.conf](https://github.com/TykTechnologies/tyk-gateway-docker#hybrid) that you have just configured.

From:

```yml
- ./tyk.standalone.conf:/opt/tyk-gateway/tyk.conf
```
To:

```yml
- ./tyk.hybrid.conf:/opt/tyk-gateway/tyk.conf
```

**5. Run docker compose**

Run the following:

```bash
docker compose up -d
```

You should now have two running containers, a Gateway and a Redis.

**6. Check that the gateway is up and running**

Call the /hello endpoint using curl from your terminal (or any other HTTP client):

```bash
curl http://localhost:8080/hello -i
````

Expected result:

```http
HTTP/1.1 200 OK
Content-Type: application/json
Date: Fri, 17 Mar 2023 12:41:11 GMT
Content-Length: 59

{"status":"pass","version":"4.3.3","description":"Tyk GW"}
```

##### Deploy in Kubernetes with Helm Chart

**Prerequisites**

* [Kubernetes 1.19+](https://kubernetes.io/docs/setup/)
* [Helm 3+](https://helm.sh/docs/intro/install/)
* Connection details to remote control plane from the above [section](#deploy-hybrid-gateways).

The following quick start guide explains how to use the [Tyk Data Plane Helm chart]({{<ref "product-stack/tyk-charts/tyk-data-plane-chart">}}) to configure Tyk Gateway that includes:
- Redis for key storage
- Tyk Pump to send analytics to Tyk Cloud and Prometheus

At the end of this quickstart Tyk Gateway should be accessible through service `gateway-svc-hybrid-dp-tyk-gateway` at port `8080`. Pump is also configured with Hybrid Pump which sends aggregated analytics to Tyk Cloud, and Prometheus Pump which expose metrics locally at `:9090/metrics`.

**1. Set connection details**

Set the below environment variables and replace values with connection details to your Tyk Cloud remote control plane. See the above [section](#deploy-hybrid-gateways) on how to get the connection details.

```bash
MDCB_UserKey=9d20907430e440655f15b851e4112345
MDCB_OrgId=64cadf60173be90001712345
MDCB_ConnString=mere-xxxxxxx-hyb.aws-euw2.cloud-ara.tyk.io:443
MDCB_GroupId=your-group-id
```

**2. Then use Helm to install Redis and Tyk**

```bash
NAMESPACE=tyk
APISecret=foo
REDIS_BITNAMI_CHART_VERSION=19.0.2

helm repo add tyk-helm https://helm.tyk.io/public/helm/charts/
helm repo update

helm upgrade tyk-redis oci://registry-1.docker.io/bitnamicharts/redis -n $NAMESPACE --create-namespace --install --version $REDIS_BITNAMI_CHART_VERSION

helm upgrade hybrid-dp tyk-helm/tyk-data-plane -n $NAMESPACE --create-namespace \
  --install \
  --set global.remoteControlPlane.userApiKey=$MDCB_UserKey \
  --set global.remoteControlPlane.orgId=$MDCB_OrgId \
  --set global.remoteControlPlane.connectionString=$MDCB_ConnString \
  --set global.remoteControlPlane.groupID=$MDCB_GroupId \
  --set global.secrets.APISecret="$APISecret" \
  --set global.redis.addrs="{tyk-redis-master.$NAMESPACE.svc.cluster.local:6379}" \
  --set global.redis.passSecret.name=tyk-redis \
  --set global.redis.passSecret.keyName=redis-password
```

**3. Done!**

Now Tyk Gateway should be accessible through service `gateway-svc-hybrid-dp-tyk-gateway` at port `8080`. Pump is also configured with Hybrid Pump which sends aggregated analytics to Tyk Cloud, and Prometheus Pump which expose metrics locally at `:9090/metrics`.

For the complete installation guide and configuration options, please see [Tyk Data Plane Chart]({{<ref "product-stack/tyk-charts/tyk-data-plane-chart">}}).


##### Remove hybrid data plane configuration

{{< warning success >}}
**Warning**

Please note the action of removing a hybrid data plane configuration cannot be undone.

To remove the hybrid data plane configuration, navigate to the page of the hybrid data plane you want to remove and click _OPEN DETAILS_

{{< /warning >}}


  {{< img src="/img/hybrid-gateway/tyk-cloud-hybrid-open-details.png" alt="Tyk Cloud hybrid open for details" >}}

Then click on _REMOVE DATA PLANE CONFIGS_

  {{< img src="/img/hybrid-gateway/tyk-cloud-hybrid-remove-configs.png" alt="Tyk Cloud hybrid remove configs" >}}

Confirm the removal by clicking _DELETE HYBRID DATA PLANE_

  {{< img src="/img/hybrid-gateway/tyk-cloud-hybrid-confirm-config-removal.png" alt="Tyk Cloud hybrid confirm removal of configs" >}}

#### Manage APIs

You can manage your APIs in *Tyk Dashboard* UI. To access it, click on your desired Control Plane name in the [Deployments](https://dashboard.cloud-ara.tyk.io/deployments) screen and then on the *MANAGE APIS* button

From there you have access to the full scope of Tyk API management functionality, including:

* [Adding APIs]({{< ref "getting-started/create-api" >}}) to Tyk, including REST and GraphQL APIs
* Applying Quotas and Rate limits via [Security Policies]({{< ref "getting-started/create-security-policy" >}}) and [Keys]({{< ref "getting-started/create-api-key" >}})
* [Securing]({{< ref "api-management/security-best-practices#securing-apis-with-tyk" >}}) your APIs
* Viewing granular [Analytics]({{< ref "api-management/dashboard-configuration#traffic-analytics" >}}) for your Tyk managed APIs
* [Transform traffic]({{< ref "advanced-configuration/transform-traffic" >}}) with the Tyk API Designer
* Add integration options such as [SSO]({{< ref "api-management/external-service-integration#single-sign-on-sso" >}}) and [3rd Party IdentityProviders]({{< ref "api-management/external-service-integration" >}})
* [Adding Segment Tags]({{< ref "#faqs" >}})


#### Secure Your APIs

If you decide to use Tyk Cloud to protect your APIs, you need to make APIs accessible to your Tyk Cloud Data Planes so that Tyk can connect your clients to them. A common question that arises is, “how do I secure my APIs (backend services)?”.

Here are the most popular ways to secure your APIs.

**1. Mutual TLS or Client authorization**

- This is the most secure method to protect your APIs. With Client  authorization, you need to add your Tyk Gateway certificates to an allow-list in all your backends and they will then accept access requests only from clients that present these pre authorized certificates. There are a few limitations with this approach:
  
    a. Depending on your setup, you might need to add it to every backend service. If you have a Load Balancer (LB), then it can be set at the LB level.
    
    b. Sometimes the LBs (like Application Load Balancers) do not support mTLS and then you need to find other solutions, like Request Signing (below).  Another option that might be possible, is to front your services or your LB with an L7 API Gateway (Like Tyk!) to do mTLS with the Tyk Cloud Data Planes on Tyk Cloud.

- You need to be able to update the list in case certificates expire or get revoked.

**2. Request Signing**

Tyk can [sign the request with HMAC or RSA]({{< ref "developer-support/release-notes/archived#hmac-request-signing" >}}), before sending it to the API target. This is an implementation of an [RFC Signing HTTP Messages(draft 10)](https://datatracker.ietf.org/doc/html/draft-cavage-http-signatures-10). This RFC was designed to provide authenticity of the digital signature of the client. In our flow, the Tyk Cloud Data Planes, as the client, using a certificate private key, will add a header signature to the request. The API, using a pre-agreed public key (based on a meaningful keyId identifier) will verify the authenticity of the request coming from your Tyk Cloud Data Plane.
 A limitation is that the APIs or LB need to implement this signature verification and be able to update the certificates as mentioned in Mutual TLS or Client authorization (above).

**3. IP Whitelisting**

 Each Tyk Cloud organization is dedicated to an IP range which is unique to them. This allows you to restrict access to your APIs to only API requests coming from your Tyk Cloud organization.  

IP Whitelisting is susceptible to IP Spoofing, and it is recommended to be combined with an API Key in secure environments.

In order to find your organization’s IP range, please open a support ticket with our support team, which is available to all paying customers.

**4. Post plugin with OAuth flow**

The custom plugin approach is mentioned last because it involves writing a bit of code. However, if your appetite allows for it, custom plugins offer the most flexibility of all these solutions.  You can use Tyk’s custom plugins to execute an OAuth flow, for example, between Tyk (as the client) and your authorization server, and inject a Bearer token into the request. The backend service will need to validate the bearer as usual. You can write [custom plugins]({{< ref "#configure-plugins" >}}) in a variety of languages.

**Where to Authenticate?**

No matter which option or combination of options you choose, it is best to keep this authentication layer outside your application logic. This glue code should be placed in your ingress, whatever that might be. By keeping this logic outside your application, you keep a separation between the business logic and the boilerplate code.  You can even use the Tyk Open Source API Gateway as an ingress to protect your APIs, and it is compatible with all the methods mentioned above.



### Managing Teams and Users

This section covers the following:

- [Managing Teams]({{< ref "#managing-teams" >}})
- [Managing Users]({{< ref "#managing-teams-and-users" >}})
- Available Tyk Cloud [User Roles]({{< ref "#user-roles-in-tyk-cloud" >}})
- [Tyk Cloud Single Sign-On (SSO)]({{< ref "#configure-single-sign-on-sso" >}})

#### Managing Teams 

The following [user roles]({{< ref "#user-roles-in-tyk-cloud" >}}) can perform existing Team Admin tasks:

* Organization Admin - Can manage all teams in the organization they are a member of.
* Team Admin - Can only manage the team they are a member of.

For an existing team, you can:

* Change the team name
* Create or delete a team (Organization Admin only)
* Invite and manage users in a team
  
##### Change the Team Name

1. From the Teams screen, select the team name.
2. Click **Edit**.
3. Change the existing name for the team.
4. Click **Save**.

##### Create a New Team

You need to be a [Organization Admin]({{< ref "#assign-user-roles" >}}) to create a new team.

1. From the Admin > Teams screen, click **Add Team**.
2. Enter a name for the new team that will be added to the organization.
3. Click **Create**.

##### Delete a Team

You need to be a [Organization Admin]({{< ref "#assign-user-roles" >}}) to delete a team.

1. From the Teams screen, select the team name.
2. Click **Edit**.
3. Click **Delete Team**.
4. You'll be asked to confirm the deletion. Click **Delete Team** from the dialog box to confirm, or click **Cancel**.

You can now invite users to your new team. See [Managing Users]({{< ref "#managing-teams-and-users" >}}) for more details.


#### Managing Users

The following [user roles]({{< ref "#user-roles-in-tyk-cloud" >}}) can perform existing User Admin tasks:

* [Organization Admin]({{< ref "#assign-user-roles" >}}) - Can manage all users in the organization they are a member of.
* [Team Admin]({{< ref "#assign-user-roles" >}}) - Can only manage the users of the team they are a member of.

{{< note success >}}
**Note**

Organization Admins, Team Admins and Team Members are responsible for managing the Tyk Cloud organization hierarchy and deploying/managing stacks, as well as having access to the Tyk Dashboard to manage APIs. Users of Tyk Cloud are usually DevOps, Architects and sometimes Engineers or Managers.

You can also [add users to the Tyk Dashboard]({{< ref "api-management/user-management#manage-tyk-dashboard-users" >}}) itself instead of inviting them as Tyk Cloud users. These users would likely be your API Developers and Engineers who manage the APIs. 
{{< /note >}}

##### Invite a new user to your team

1. From the Teams screen, select the team name.
2. Click **Invite User**.
3. Complete the form for the new user.

##### Editing Existing Users

1. Select the team with the user you want to edit.
2. Click the user name from the team user list.
3. You can change the following details
   * Change the team they are a member of.
   * Change the user role assigned to them.
4. Click Save to update the user info.

##### Delete a User

1. Select the team with the user you want to edit.
2. Click the user name from the team user list.
3. Click **Delete**
4. You'll be asked to confirm the deletion. Click **Delete User** from the pop-up box to confirm, or click **Cancel**.


#### Assign User Roles

This section defines the different user roles within Tyk Cloud, so that you can see at a glance what each role does and manage your account accordingly.

##### User Roles within Tyk Cloud

We have the following user roles defined in Tyk Cloud for your team members

* Billing Admin
* Organization Admin
* Team Admin
* Team Member

Billing Admins are responsible for the billing management of the Tyk Cloud account. Organization Admins, Team Admins and Team Members are responsible for managing the Tyk Cloud organization hierarchy and deploying/managing stacks, as well as having access to the Tyk Dashboard to manage APIs. Users of Tyk Cloud are usually DevOps, Architects and sometimes Engineers or Managers.

You can [add users to the Tyk Dashboard]({{< ref "api-management/user-management#manage-tyk-dashboard-users" >}}) itself instead of inviting them as Tyk Cloud users. These users would likely be your API Developers and Engineers who manage the APIs.   

##### Use Case Matrix

The following table shows the scope for each user role.


| Use Case                                          | Billing Admin | Org Admin | Team Admin | Team Members |
|---------------------------------------------------|---------------|-----------|------------|--------------|
| Create a new account                              | X             |           |            |              |
| Create a new organization                         | X             |           |            |              |
| Managing a new account                            | X             |           |            |              |
| Managing an organization entitlement              | X             |           |            |              |
| Ability to create other billing admins            | X             |           |            |              |
| Editing organization name                         | X             | X         |            |              |
| Create team / delete                              |               | X         |            |              |
| Future - Edit team entitlements                   |               | X         |            |              |
| Invite, delete, edit org admins and team admins   |               | X         |            |              |
| Invite, delete, edit team members                 |               | X         | X          |              |
| Create new environments                           |               | X         | X          |              |
| Delete / change environments                      |               | X         | X          |              |
| View environments                                 |               | X         | X          | X            |
| Create and delete cloud data planes               |               | X         | X          |              |
| Create and delete control planes                  |               | X         | X          |              |
| View deployments                                  |               | X         | X          | X            |
| Deploy, undeploy, redeploy, restart a deployment. |               | X         | X          | X            |
| Create and manage basic SSO                       |               | X         | X          |              |
| Upload plugins to the File Server                 |               | X         | X          | X            |
| Delete plugins from File Server                   |               | X         | X          | X            |
| Viewing Analytics                                 |               | X         | X          | X            |

##### Initial Tyk Cloud Account Roles

The user who signs up for the initial Tyk Cloud account is uniquely assigned to two roles:

1. Org admin of the organization
2. Billing admin of the account

This is the only occasion where a user can be assigned to 2 roles. So, for example, if you invite a user to be a Team Admin, that is the only role (and team) they can belong to. For a user to be invited as a Billing admin, they can't have an existing Tyk Cloud account.

{{< note success >}}
**Note**
  
This functionality may change in subsequent releases.
{{< /note >}}

**Tyk System Integration User (do not delete)**

When you click your Control Plane Dashboard link from your Tyk Cloud Deployments Overview screen, you are automatically logged in to your Dashboard. This is due to a default Tyk Integration user that is created as part of the Control Plane deployment process. This user has a first name of `Tyk System Integration` and a last name of `User (do not delete)`. As the last name infers, you should not delete this user or your access to the Dashboard will be broken from your Tyk Cloud Installation.


#### Configure Single Sign-On (SSO)

**What is SSO?**
Single Sign-On (SSO) is an authentication process that empowers users to access various services and applications using a single set of credentials. This streamlines the login experience by eliminating the need to remember multiple usernames and passwords for different platforms.

These credentials are securely stored with an Identity Provider(IdP). An Identity Provider (IdP) is a service that stores and manages digital identities. Companies can use these services to allow their employees or users to connect with the resources they need. 

**Pre-requisites**
{{< note success >}}
**Note**

This functionality is a preview feature and may change in subsequent releases.

To be able to configure Single Sign-On authentication, an SSO entitlement needs to be enabled in the subscription plan. 
If you are interested in getting access, contact your account manager or reach out to our [support@tyk.io](<mailto:support@tyk.io?subject=Tyk Cloud Single sign on>)
{{< /note >}}

##### Add new SSO profile
To add a new SSO profile, login to Tyk Cloud, navigate to the _Profile_ list and click on the _ADD PROFILE_ button.

  {{< img src="/img/cloud/cloud-sso-profile-list.png" alt="Tyk Cloud SSO profile list" >}}

Populate the form with all the mandatory fields and click the _ADD PROFILE_ button.

  {{< img src="/img/cloud/cloud-sso-add-profile-form.png" alt="Tyk Cloud SSO add profile form" >}}

The table below explains the fields that should be completed:
| Field name             | Explanation                                                                                                                     |
|----------------------  |---------------------------------------------------------------------------------------------------------------------------------|
| Provider name          | Used to distinguish between different SSO providers.                                                                      |
| Client ID              | Used for client authentication with the IdP provider. The value can be found in your chosen IdP provider's configuration. |
| Client Secret          | Used for client authentication with the IdP provider. The value can be found in your chosen IdP provider's configuration.     |
| Discovery URL          | Used to read your IdP's openid configuration. This URL can be found in your chosen IdP provider's configuration.  |
| Default User Group ID  | The ID of the user group that new users are allocated to by default upon registration.                                                                       |
| Only registered users  | A check-box that defines which users are allowed to use SSO. If checked, only users who are already registered in Tyk Cloud are allowed to login with SSO. If un-checked, new users will be added to Tyk Cloud in the _Default_ user group upon successful registration. |


As illustrated below an authentication and callback URL will be generated, once the new profile has been added. You need to add these URLs to the configuration of your chosen IdP provider.
The Auth URL is your custom URL that can be used to start the SSO login flow whereas Callback URL is the URL that the SSO provider will callback to confirm successful authentication.

  {{< img src="/img/cloud/cloud-sso-add-config-details.png" alt="Tyk Cloud SSO example of filled form" >}}

##### Edit SSO profile

To update/re-configure SSO profile, login to Tyk Cloud, navigate to _Profile_ list and click on the profile that you would like to update.
  
  {{< img src="/img/cloud/cloud-sso-edit-select.png" alt="Tyk Cloud SSO edit selection" >}}

Edit the fields you would like to change and then click on the _SAVE PROFILE_ button.

  {{< img src="/img/cloud/cloud-sso-save-edit.png" alt="Tyk Cloud SSO save edit selection" >}}

##### Delete SSO profile

{{< warning success >}}
**Warning**

Please note the action of deleting an SSO profile cannot be undone.

To delete an SSO profile, login to Tyk Cloud, navigate to _Profile_ list and click on the profile you would like to remove.
{{< /warning >}}

  {{< img src="/img/cloud/cloud-sso-delete-select.png" alt="Tyk Cloud SSO delete selection" >}}

On the profile page, click on the _DELETE PROFILE_ button.

  {{< img src="/img/cloud/cloud-sso-delete-click.png" alt="Tyk Cloud SSO delete accept" >}}

On the confirmation window, confirm by clicking the _DELETE PROFILE_ button.

  {{< img src="/img/cloud/cloud-sso-delete-confirm.png" alt="Tyk Cloud SSO delete confirm" >}}

After profile deletion, the authentication URL will not be available anymore. 


### Manage Accounts and Billing
This section covers the following:

* The available [Tyk Cloud Plans]({{< ref "#select-a-payment-plan" >}})
* Adding [Payment Methods]({{< ref "#add-payment-methods" >}})
* How to [upgrade from the free trial plan]({{< ref "#upgrade-your-free-trial" >}})
* [Managing Billing Admins]({{< ref "#managing-billing-admin" >}}) on your account
* What to do if your account goes into [retirement]({{< ref "#retire-your-account" >}})

#### Select a Payment Plan

Our plans cover every use case scenario, from a free trial, to a global enterprise ready plan. You can also purchase addons to increase your functionality. For details on our available plans and pricing go to [Tyk Cloud Pricing](https://tyk.io/price-comparison/).

Here's an overview of all of the available plans:

| **Plan**          | **Who's it for?**                                                                   | **About**                                                                                                                                                                                                                                                                                                                                         |
| ----------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 48 hours free trial <p>[Free Support SLA]({{< ref "developer-support/support" >}})</p> | This is for POC’s and those testing the Tyk platform. | Tyk Cloud has 48 hours free trial. You can always request a longer trial period or talk to support if you need help. |
| Starter <p>[Standard Support SLA]({{< ref "developer-support/support" >}})</p> | For single teams with low traffic, mostly small businesses that manage few APIs. | This plan includes all of the features of the Tyk Stack. You can have **[custom domains]({{< ref "#configure-custom-domains" >}})** and **[plugins]({{< ref "#configure-plugins" >}})**, along with management of upto 5 APIs. Standard support is provided.|
| Launch <p>[Standard Support SLA]({{< ref "developer-support/support" >}})</p> | For single teams with low traffic, mostly small businesses. | This plan includes all of the features of the Tyk Stack. You can have **[custom domains]({{< ref "#configure-custom-domains" >}})** and **[plugins]({{< ref "#configure-plugins" >}})** along with management of unlimited APIs. Standard support is provided. |
| Grow <p>[Standard Support SLA]({{< ref "developer-support/support" >}})</p> | For single teams with high traffic. | This plan includes all of the features of the Tyk Stack. In this plan, you have **[Hybrid Gateways]({{< ref "#deploy-hybrid-gateways" >}})** as an add on, along with standard support. |
| Scale <p>[Enhanced Support SLA]({{< ref "developer-support/support" >}})</p> | For global organizations with multiple teams, requiring gateway deployments in multiple locations. | This plan includes all of the features of the Tyk Stack. **Enhanced(silver) support** will be provided. |


{{< button_left href="https://tyk.io/sign-up/#cloud" color="green" content="Get started with Cloud free trial" >}}

**Available add ons**

You can purchase the following addons, depending on your plan.

- Additional Control Planes
- Additional Cloud Data Planes
- Additional Users
- Additional Teams
- Additional Gateway Region (Enterprise Plans only)
- SLA support (varies according to your plan)

**Boostable Overages**

Your selected plan comes with limited throughput per month. Overages allow your consumption to go over the monthly limit, which can be an easy way to deal with for example seasonal or unexpected spikes in traffic. The overage level will be automatically charged based on your throughput on a monthly basis.

| Launch          | Entitlement $1,800 | Overage 1 $2,700 | Overage 2 $3,240 | Overage 3 $3,780 | Overage 4 $4,320 |
| --------------- | :----------------: | :--------------: | :--------------: | :--------------: | :--------------: |
| Calls (at 10kb) |        15m         |      18.75m      |      22.5m       |      26.5m       |       30m        |
| Throughput      |       150GB        |     187.5GB      |      225GB       |     262.5GB      |      300GB       |

| Grow            | Entitlement $3,800 | Overage 1 $5,700 | Overage 2 $6,840 | Overage 3 $7,980 | Overage 4 $9,120 |
| --------------- | :----------------: | :--------------: | :--------------: | :--------------: | :--------------: |
| Calls (at 10kb) |        100m        |       125m       |       150m       |       175m       |       200m       |
| Throughput      |        1TB         |      1.25TB      |      1.5TB       |      1.75TB      |       2TB        |

| Scale           | Entitlement $6,800 | Overage 1 $10,200 | Overage 2 $12,240 | Overage 3 $14,280 | Overage 4 $16,320 |
| --------------- | :----------------: | :---------------: | :---------------: | :---------------: | :---------------: |
| Calls (at 10kb) |         1b         |       1.25b       |       1.5b        |       1.75b       |        2tb        |
| Throughput      |        10TB        |      12.5TB       |       15TB        |      17.5TB       |       20TB        |

**Changing plans**

You can upgrade or downgrade your current plan at any point in your billing cycle and your payment will be pro-rata'd to reflect the new payment.

**Downgrading plan requirements**

If you downgrade your plan, the new plan may have less entitlements than your current plan. You will need to restructure your organization to comply with the new plan entitlements before the downgraded billing starts.

##### Checking the Tyk Cloud status

If you want to check if there are issues with the environments and any upcoming down times, you can go to the [Tyk Status](https://status.tyk.io/) page.


#### Add Payment Methods

This section provides a step-by-step guide on how to add a payment method to your Tyk Cloud account, ensuring uninterrupted access to your API management services.

**Adding a payment method to your account**

**Note:** You must have *Billing Admin* user rights to add a payment method. 

Follow these steps:

1. Ensure you are logged in to *Tyk Cloud UI* as a Billing Admin user.
2. Navigate to <a href="https://account.cloud-ara.tyk.io/payment-method" class="external-links" target="_blank" rel="noopener">ACCOUNT & BILLING --> Payment Method</a>. If you lack the necessary user rights, you will be directed to the main [OPERATIONS](https://dashboard.cloud-ara.tyk.io/) screen (the main login page).
3. Enter your card details and click *Save*.
4. You'll see a confirmation that the payment method was successfully added.

{{< note success >}}
**Note about card payments**
  
Currently, *Tyk Cloud* exclusively supports card payments. For alternative payment methods, please [contact us](https://tyk.io/contact/).
{{< /note >}}

**Payment Method Maintenance**

As a *Billing Admin* user, you have the ability to edit or delete an existing payment method. Deleting a payment method without adding a new one will result in your plan going into [retirement]({{< ref "#retire-your-account" >}}) at the end of your current billing cycle.

#### Upgrade Your Free Trial

This section explains how you can upgrade your free trial of Tyk Cloud to a full account, to continue enjoying the benefits of Tyk Cloud.

**My free trial is coming to an end. What are my options?**

Every new Tyk Cloud account is assigned to a 48 hour free trial. You have the following options:

* Upgrade to a paid plan at any stage of the free trial period.
* Use the free trial period and upgrade after it expires

**What happens if my free trial expires?**

If your free trial ends without you upgrading, your account enters what we call [retirement]({{< ref "#glossary" >}}).

**What does upgrading a free trial account involve?**

To upgrade your free trial, you (as a Billing Admin) need to:
* Add a [payment method]({{< ref "#add-payment-methods" >}}) to your organization
* Select a new [plan]({{< ref "#select-a-payment-plan" >}}) from our list

**I've trialled more than what my desired paid plan allows.**

During the free trial we give you the same access as our Enterprise Global plan. When you come to the end of your free trial, you may want to subscribe to a plan such as 'Proof of Concept' which only allows 1 Environment, Cloud Control Plane and Cloud Data Plane. If you had an excess of these set up during your free trial, you would need to remove the appropriate amount of Environments etc from your Organization in order to start the paid plan. But don't worry, we'll let you know what you need to remove when you go to purchase a plan. 


#### Managing Billing Admin

This page explains what a Tyk Cloud billing admin can do as part of your API management process, giving you complete control over your API management.

As a Billing Admin you can perform the following:

* Add, edit and delete [payment methods]({{< ref "#add-payment-methods" >}})
* Add further users as Billing Admins
* Upgrade or downgrade plans

##### Adding a new Billing Admin

{{< note success >}}
**Note**
  
To be added as a Billing Admin, a user cannot have an existing Tyk Cloud account.
{{< /note >}}

**Prerequisites**

To add a new Billing Admin team member requires you to have one of the following roles:

* Be an existing Billing Admin
* Be the account creator Organization Admin (this user also has the Billing Admin role assigned to them)

1. Select **Account & Billing** from the Admin menu (if you only have Billing Admin permissions you will automatically be logged into the Account and Billing area).

{{< img src="/img/admin/tyk-cloud-account-billing-menu.png" alt="Account & Billing menu" >}}

2. Select **Billing Admins** from the Accounts & Billing menu

{{< img src="/img/admin/billing-admins.png" alt="Billing Admins menu" >}}

3. Click **Invite Billing Admin**

{{< img src="/img/admin/invite-billing-admin.png" alt="Invite Billing Admin" >}}

4. Complete the Billing Admin form and click **Send Invite**

##### Removing Billing Admin Access

For this release, removing a billing Admin is not allowed. We can remove a Billing Admin manually, so contact your Account Manager if you need to remove a Billing Admin user.

#### Retire Your Account

This section explains what it means when your Tyk Cloud account goes into retirement and what your options are when it does, from account reinstatement to closure.

Your plan will go into [retirement]({{< ref "#glossary" >}}) in the following scenarios:

* Your subscription is manually canceled by a Billing Admin.
* Your periodic subscription payment fails.
* You are on a Free Trial (5 weeks) and have not signed up to a plan before the expiration of the Free Trial.

**What does retirement mean?**

When a plan goes into retirement, it means your Organization, Teams and any Environmenmts and APIs you manage are suspended for a grace period of up to 30 days and you won't be able to add or edit, only remove.

**How can I end retirement?**

Your Billing Admin needs to do one of the following:

* Renew a subscription that was manually canceled.
* Update your payment details and any outstanding payments are cleared.
* Update a Free Trial to a paid plan, and payment is successful.

**What happens at the end of the 30 day retirement period?**

At the end of the 30 day retirement period if you have not restored or created a relevant subscription, all your data will be deleted.




### Configure Developer Portal from Dashboard

After deploying your Control Plane, you need to perform some initial configuration for the Developer Portal to prevent seeing any `Page Not Found` errors when trying to access the portal. You need to set up a Home page from the Control Plane Dashboard.

Watch our video on configuring your Tyk Cloud Developer Portal.

{{< youtube 8_SPUake84w >}}

1. From the Control Plane Dashboard, select **Pages** from the **Portal Management** menu
2. Click **Add Page**

{{< img src="/img/getting-started/create-account-portal-pages.png" alt="Add Portal Page" >}}

3. In the Settings, give your page a name and slug. Below we've called it Home
4. Select **Check to make this page the Home page**
5. Select **Default Home page template** from the Page type drop-down list
6. You can leave the Registered Fields sections for now

{{< img src="/img/getting-started/portal-home-page-settings.png" alt="Portal Home page settings" >}}

7. Click **Save**.

You should now be able to access your Portal from **Open Your Portal** from the **Your Developer Portal** menu.

{{< img src="/img/getting-started/portal_menu.png" alt="Portal Menu" >}}

#### Further Portal Configuration

Our Developer Portal is completely customizable. See [Portal Customization]({{< ref "tyk-developer-portal/customise" >}}) for more details.

### Configure Custom Domains

You can set up Tyk Cloud to use a custom domain. Using custom domains is available on our free trial and all our paid [plans](https://tyk.io/price-comparison/). You can use a custom domain for both your **Control Planes** and **Cloud Data Planes**.

{{< note success >}}
**note**

Wild cards are not supported by Tyk Cloud in custom domain certificates
{{< /note >}}

#### Custom Domains with Control Planes

* Currently, you can only use **one custom domain** per Control Plane deployment.
* The custom domain in this case ties to a **Tyk Developer Portal**. Please set up a **CNAME DNS** record such that it points to the "Portal" ingress as displayed on your Control Plane deployment page.
  
#### Custom Domains with Cloud Data Planes

You can set multiple custom domains on a Cloud Data Plane. In this instance please set up your CNAME DNS records such that they point to the only ingress displayed on your Cloud Data Plane deployment page.

Note: While you can set multiple custom domains for a Cloud Data Plane, a single custom domain cannot be used for multiple Cloud Data Planes.

#### How to set up a Custom Domain

In this example we are going to set up a custom domain called `Cloud Data Plane.corp.com` for a Cloud Data Plane deployment.

1. Create a CNAME DNS record `edge.corp.com` that points to your Cloud Data Plane ingress (e.g. `something-something.aws-euw2.cloud-ara.tyk.io`).
2. From your Cloud Data Plane deployment, select **Edit** from the Status drop-down.

{{< img src="/img/2.10/edge-dropdown.png" alt="Cloud Data Plane drop-down" >}}

3. Enter `edge.corp.com` in the Custom Domains field.

{{< img src="/img/2.10/edge_custom_domain.png" alt="Cloud Data Plane Custom Domain" >}}

4. Click **Save and Re-deploy**.

{{< img src="/img/2.10/save_redeploy.png" alt="Save and Re-Deploy" >}}

#### How our Custom Domain functionality works

When you point your custom domain to your deployment, we use [Let\'s Encrypt\'s](https://letsencrypt.org/docs/challenge-types/#http-01-challenge) **HTTP01 ACME**  challenge type, which verifies ownership by accessing your custom CNAME on your Control Plane or Cloud Data Plane deployment. For example - `something-something.aws-euw2.cloud-ara.tyk.io` above.

### Configure Plugins

This section explains that you can use plugins with Tyk Cloud and links to details of Python, JSVM and Golang based plugins.

Tyk Cloud allows you to take advantage of Tyk's plugin architecture that allows you to write powerful middleware. For this version of Tyk Cloud, we support the use of Python, JavaScript Middleware and Golang based plugins.

For more details, see: 
* [Python Plugins]({{< ref "api-management/plugins/rich-plugins#overview" >}})
* [JSVM]({{< ref "api-management/plugins/javascript#" >}})
* [Golang]({{< ref "#configure-plugins" >}})

Next you'll set up an Tyk Cloud Control Plane to use a Python Authentication Plugin.

#### Setup Control Plane


This page explains how to set up a control plane with plugins to customize it on Tyk Cloud, so that you can ensure your API management solution is as effective as possible. 

**What do I need to do to use Plugins?**

{{< img src="/img/plugins/plugins_enable.png" alt="Plugins Settings" >}}

1. You need to enable Plugins on a Control Plane and on a Cloud Data Plane.
2. You need to enter Provider details to enable you to store and access your plugins. For this version of Tyk Cloud, we are supporting Amazon AWS S3. If you haven't got an AWS S3 account, go to [https://aws.amazon.com/s3/](https://aws.amazon.com/s3/) and set one up. You will need the following details to configure SW3 within your Control Plane:
   * Your AWS Key ID
   * Your AWS Secret
   * Your AWS Region

{{< note success >}}
**Note**

For this release of Tyk Cloud, you need to enter your AWS Region manually. You also need to consider that uploading a custom plugin bundle to Tyk Cloud results in a new bucket being created for each bundle uploaded.  It also requires that Tyk Cloud has permissions in the form of an AWS IAM policy to have create rights on AWS.
{{< /note >}}

**AWS IAM Policy**

**What is an IAM Policy?**

- A policy is an entity that, when attached to an identity or resource, defines their permissions. IAM policies define permissions for an action regardless of the method that you use to perform the operation.

- We have included a sample IAM policy that you need to create in AWS to allow the plugin bundle to work. For more information on creating IAM policies, see the [AWS Documentation](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_create-console.html).

{{< warning success >}}
**Warning**
  
We recommend you restrict your IAM user as much as possible before sharing the credentials with any 3rd party, including Tyk Cloud. See [IAM User Permissions](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_change-permissions.html) for more details.
{{< /warning >}}

```.json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "s3:CreateBucket",
                "s3:ListBucket",
                "s3:GetBucketLocation",
                "s3:DeleteBucket"
            ],
            "Resource": "arn:aws:s3:::mserv-plugin-*"
        },
        {
            "Effect": "Allow",
            "Action": "s3:ListAllMyBuckets",
            "Resource": "*"
        },
        {
            "Sid": "VisualEditor1",
            "Effect": "Allow",
            "Action": [
                "s3:PutObject",
                "s3:GetObject",
                "s3:DeleteObject"
            ],
            "Resource": "arn:aws:s3:::mserv-plugin-*/*"
        }
    ]
}
```

Next you'll [set up the Python authentication code bundle](https://tyk.io/docs/tyk-cloud/configuration-options/using-plugins/python-code-bundle/).


#### Uploading your Bundle

This section walks you through uploading your bundle as part of the process of Python custom authentication on Tyk Cloud, so that you can ensure your API management solution is as effective as possible.

**How do I upload my bundle file to my Amazon S3 bucket?**

We are going to use a Tyk CLI tool called **mservctl**. This acts as a file server for our plugins. You use it to push your plugin bundle to your S3 bucket. Your Tyk Cloud Tyk Gateway will use **MServ** to retrieve your bundle, instead of connecting directly into S3.

**Prerequisites**

1. You need to install the mserv binary according to your local environment from the following repo - https://github.com/TykTechnologies/mserv/releases. Linux and MacOS are supported.

2. From your Control Plane you need the following settings.

{{< img src="/img/plugins/fileserver_settings.png" alt="File Server Settings" >}}

   * Your Tyk Cloud Control Plane Ingress File Server Endpoint (1)
   * Your File Server API Key (2)

**How does mservctl work?**

You create a config file (in YAML) that contains your Control Plane settings that connects to your S3 bucket. You then use a `push` command to upload your `bundle.zip` file to your bucket.

**mservctl settings - Mac**

To run `mservctl` from your local machine, from the binary directory, run:

```.bash
./mservctl.macos.amd64
```
**mservctl settings - Linux**

To run `mservctl` from your local machine, from the binary directory, run:

```.bash
./mservctl.linux.amd64
```

The help for mservctl will be displayed. We will be using the config file options for this tutorial.

```.bash
$ mservctl help
mservctl is a CLI application that enables listing and operating middleware in an Mserv instance.
Use a config file (by default at $HOME/.mservctl.yaml) in order to configure the Mserv to use with the CLI.
Alternatively pass the values with command line arguments, e.g.:
$ mservctl list -e https://remote.mserv:8989
Set TYK_MSERV_LOGLEVEL="debug" environment variable to see raw API requests and responses.
Usage:
  mservctl [command]
Available Commands:
  delete      Deletes a middleware from mserv
  fetch       Fetches a middleware record from mserv
  help        Help about any command
  list        List middleware in mserv
  push        Pushes a middleware to mserv
Flags:
      --config string     config file (default is $HOME/.mservctl.yaml)
  -e, --endpoint string   mserv endpoint
  -h, --help              help for mservctl
  -t, --token string      mserv security token
Use "mservctl [command] --help" for more information about a command.
```

{{< note success >}}
**Note**
  
You may have to change the CHMOD settings on the binary to make it executable. (`chmod +x <filename>`). On MacOS you may also need to change your security settings to allow the binary to run.
{{< /note >}}

**Creating the mserv config file**

1. Create a file (we'll call it `python-demo.mservctl.yaml`)
2. Copy your Control Plane File Server endpoint URL and use it for your `endpoint` flag. Remember to prepend it with `https://`.
3. Copy your File Server API Key and use it for your `token` flag

Your `python-demo.mservctl.yaml` config file should now look like this:

```.yaml
endpoint: https://agreeable-native-mgw.usw2.ara-staging.tyk.technology/mserv
token: eyJvcmciOiI1ZWIyOGUwY2M3ZDc4YzAwMDFlZGQ4ZmYiLCJpZCI6ImVmMTZiNGM3Y2QwMDQ3Y2JhMTAxNWIyOTUzZGRkOWRmIiwiaCI6Im11cm11cjEyOCJ9
```

**Uploading To Your S3 Bucket**

1. We are going to use the MacOS binary here, just substitute the binary name for the Linx version if using that OS. Note we have our YAML config file in the same directory as our bundle.zip file. Run the following mserv `push` command:

```.bash
./mservctl.macos.amd64 --config ~/my-tyk-plugin/python-demo.mservctl.yaml push ~/my-tyk-plugin/bundle.zip
```
2. You should get confirmation that your middleware has been uploaded to your S3 bucket.

```.bash
INFO[0000] Using config file:/Users/marksouthee/my-tyk-plugin/python-demo.mservctl.yaml  app=mservctl
Middleware uploaded successfully, ID: 9c9ecec1-8f98-4c3f-88cd-ca3c27599e6b
```
3. You will notice that the middleware uploaded has been given an ID. We are going to use that ID with an API that allows you to specify specific middlware. You can also check the contents of the middleware you have just uploaded using the mservctl `list` command. Run:

```.bash
./mservctl.macos.amd64 --config ~/my-tyk-plugin/python-demo.mservctl.yaml list
```

4. You will see the list of middleware you have pushed to your S3 Bucket

```.bash
INFO[0000] Using config file:/Users/marksouthee/my-tyk-plugin/python-demo.mservctl.yaml  app=mservctl
  ID                                    ACTIVE  SERVE ONLY  LAST UPDATE

  9c9ecec1-8f98-4c3f-88cd-ca3c27599e6b  true    false       2020-05-20T15:06:55.901Z
  ```
5. If you use the -f flag with the list command, you will see the functions within your middleware listed:

```.bash
./mservctl.macos.amd64 --config ~/my-tyk-plugin/python-demo.mservctl.yaml list -f
```
6. As you can see, the 2 middleware hooks specified within your `manifest.json` are returned:

```.bash
INFO[0000] Using config file:/Users/marksouthee/my-tyk-plugin/python-demo.mservctl.yaml  app=mservctl
  ID                                    ACTIVE  SERVE ONLY  LAST UPDATE               FUNCTION          TYPE

  9c9ecec1-8f98-4c3f-88cd-ca3c27599e6b  true    false       2020-05-20T15:06:55.901Z
  MyPostMiddleware  Post
  MyAuthMiddleware  CustomKeyCheck
```

Next you will [create an API]({{< ref "#test-middleware" >}}) from our Control Plane and see our middleware in action.

#### Test Middleware

This section explains how to test out your Python custom authentication on Tyk Cloud, to ensure that it’s working properly. 

**Testing our middleware with an API**

You now have your middleware uploaded to your S3 bucket. We are now going to create an API from our Control Plane Dashboard and test it via Postman

**Prerequisites**

* A Postman API Client from https://www.postman.com/product/api-client/
* Your mserv middleware ID
* The `auth` value token from your `middleware.py` code

**Create your API**

1. From your Control Plane in Tyk Cloud, click the *Ingress > Dashboard link*

{{< img src="/img/plugins/control_plane_dashboard_link.png" alt="Dashboard Link" >}}

2. From the Dashboard screen, click **APIs** from the System Management menu

{{< img src="/img/plugins/apis_menu.png" alt="APIs Menu" >}}

3. Click **Add New API**
4. From the API Designer, enter the following in the **Core Settings** tab:
   * From the API Settings section, give your API a name. We'll name this example "test"
   * Scroll down to the Authentication section and select **Custom authentication (Python, CoProcess and JSVM plugins)** from the drop-down menu
   * Select the **Allow query parameter as well as header** option
5. From the Advanced Settings tab enter the following:
   * In the Plugin Options, enter the **Plugin Bundle ID** as returned by mservctl. In our example `9c9ecec1-8f98-4c3f-88cd-ca3c27599e6b`
   * To propagate your API to all your Cloud Data Plane Tyk Gateways connected to your Control Plane, you need to add the tag **edge** in the **API Segment Tags section**
6. Click **Save**.

You now have an API called "test" which has as its target the httpbin test site.

**Testing Your API**

You now need to test your API to show how the Python Authorization middleware works. We are going to use the Postman client for our testing.

1. First, a quick test. Copy the URL of your Cloud Data Plane (Note the "edge" tag in the tags column) and paste it in a browser tab. You should get a **404 page not found error**.
2. Then add the "test" endpoint to the URL in your browser tab, so in our example `uptight-paddle-gw.usw2.ara.app/test/`. You should now see a **403 "error: "forbidden"**. This is because your API has Authentication enabled and you haven't provided the credentials yet.
3. Open up your Postman client:
   * Paste your Gateway URL with the API appended to the request - (`uptight-paddle-gw.usw2.ara.app/test/`)
   * Click **Send**. You'll see the **403 "error: "forbidden response"** again
   * In the Headers section in Postman, select **Authorization** from the Key column. Add some random text in the Value field and click **Send**. You should again see the **403 error**.
   * Now replace the random text with the `auth` value from your Python code. In our example `47a0c79c427728b3df4af62b9228c8ae` and click **Send** again.
   * You should now see the **HTTPB** in test page

{{< img src="/img/plugins/postman_success.png" alt="Postman Success" >}}

4. As a further test of your plugin, you can add `get` to your API request in Postman. So in our example `uptight-paddle-gw.usw2.ara.app/test/get`. Click **Send**. This will return all the get requests, including headers. You should see the `x-tyk-request: "something"` which is the post middleware hook you set up in the Python code.

{{< img src="/img/plugins/postman_all_get_requests.png" alt="Postman All Get Requests" >}}


#### Create a Python Code Bundle

This section demonstrates how to create a Python code bundle as part of the custom authentication process for Tyk Cloud, so that you can ensure your API management solution is as effective as possible.


**What do I need to do to create my Plugin?**

* You need to create the Python code bundle on your locally installed Gateway (not an Tyk Cloud Cloud Data Plane stack).
* You will create 2 files, a manifest file (`manifest.json`) and the python file (`middleware.py`)
* You then create a zipped bundle via our Tyk CLI tool that is built in to your local Gateway instance.
  
**Creating the Plugin bundle**

**Step 1: Create your working directory**

The first step is to create a directory for your plugin bundle files:

```.copyWrapper
mkdir ~/my-tyk-plugin
cd ~/my-tyk-plugin
```

**Step 2: Creating the Manifest File**

The manifest file contains information about your plugin file structure and how we expect it to interact with the API that will load it. This file should be named `manifest.json` and needs to have the following contents:

```.json
{
  "custom_middleware": {
    "auth_check": {
      "name": "MyAuthMiddleware"
    },
    "pre": [
      {
        "name": "MyAuthMiddleware"
      }
    ],
    "driver": "python"
  },
  "file_list": [
    "middleware.py"
  ]
}
```
**File description**

| File              | Description                                                                                                                                                                                                                                                                                       |
|-------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| custom_middleware | contains the middleware settings like the plugin driver you want to use (driver) and the hooks that your plugin will expose. We use the   **auth_check** for this tutorial. For other hooks see [here]({{< ref "api-management/plugins/rich-plugins#coprocess-dispatcher---hooks" >}}). |
| file_list         | contains the list of files to be included in the bundle. The CLI tool expects to find these files in the current working directory.                                                                                                                                                               |
| name              | references the name of the function that you implement in your plugin code: **MyAuthMiddleware**                                                                                                                                                                                                  |
| middleware.py     | an additional file that contains the main implementation of our middleware.                                                                                                                                                                                                                       |

**Step 3: Creating the middleware.py file**

* You import decorators from the Tyk module that gives us the Hook decorator, and we import [Tyk Python API helpers]({{< ref "api-management/plugins/rich-plugins#tyk-python-api-methods" >}})

* You implement a middleware function and register it as a hook. The input includes the request object, the session object, the API meta data and its specification. The hook checks the authorization header for a specified value. In this tutorial we have called it `Authorization`.

```.python
from tyk.decorators import *
from gateway import TykGateway as tyk

@Hook
def MyAuthMiddleware(request, session, metadata, spec):
    auth = request.get_header('Authorization')
    if not auth:
        auth = request.object.params.get('authorization', None)

    if auth == '47a0c79c427728b3df4af62b9228c8ae':
        session.rate = 1000.0
        session.per = 1.0
        metadata["token"] = auth
    return request, session, metadata

@Hook
def MyPostMiddleware(request, session, spec):
    tyk.log("This is my post middleware", "info")
    request.object.set_headers["x-tyk-request"] = "something"
    return request, session
  ```

**File description**

| File                      | Description                                                                    |
|---------------------------|--------------------------------------------------------------------------------|
| `MyAuthMiddleware`  @hook | checks for a value. If it is found it is treated as your authentication token. |
| `MyPostMiddleware`  @hook | adds a header to the request. In this tutorial  `something`                    |                                                                             |

**Step 4: Create the Plugin Bundle**

* You create a bundle to cater for a number of plugins connected to the one API, and using a bundle makes this more manageable.

* To bundle your plugin we run the following command in your working directory where your manifest.json and plugin code is.

```.bash
docker run \
  --rm \
  -v $(pwd):/cloudplugin \
  --entrypoint "/bin/sh" -it \
  -w "/cloudplugin" \
  tykio/tyk-gateway:v3.1.2 \
  -c '/opt/tyk-gateway/tyk bundle build -y'
```

* A plugin bundle is a packaged version of the plugin, it may also contain a cryptographic signature of its contents. The -y flag tells the Tyk CLI tool to skip the signing process in order to simplify this tutorial. For more information on the Tyk CLI tool, see [here]({{< ref "api-management/plugins/overview#how-plugin-bundles-work" >}}).
* You should now have a `bundle.zip` file in the plugin working directory.
* Next you will configure [uploading your plugin bundle file]({{< ref "#uploading-your-bundle" >}}) to your Amazon S3 bucket.


#### Add Custom Authentication

This section introduces the process of configuring a custom authentication plugin, so that you can override the default Tyk authentication mechanism with your own authentication logic. 

**What are we going to do?**

We are going to configure an Tyk Cloud Control Plane to use a custom authentication plugin built in Python.

**What do I need to configure the Tyk Cloud Control Plane?**

Here are the requirements:

1. Firstly you will need a local Tyk Gateway installation that allows you to create your Python plugin bundle. We recommend [installing our Self-Managed version on Ubuntu Bionic 18.04]({{< ref "tyk-self-managed#install-tyk-on-debian-or-ubuntu" >}}).
2. Ensure you have a currently stable [Python 3.x version](https://www.python.org/downloads/) installed 
3. You need install the build tools `apt-get install -y build-essential`
4. Install our required modules:

```{.copyWrapper}
apt install python3 python3-dev python3-pip
pip3 install protobuf grpcio
```


### Deploy Legacy Hybrid Gateways

{{< warning success >}}
**Warning**

`tyk-hybrid` chart is deprecated. Please use our [Tyk Data Plane helm chart]({{<ref "#deploy-hybrid-gateways" >}}) instead. 

We recommend that all users to migrate to the `tyk-data-plane` Chart. Please review the [Configuration]({{<ref "product-stack/tyk-charts/tyk-data-plane-chart#configuration">}}) section of the new helm chart and cross-check with your existing configurations while planning for migration. 
{{< /warning >}}

1. **Add the Tyk official Helm repo `tyk-helm` to your local Helm repository**

```bash
helm repo add tyk-helm https://helm.tyk.io/public/helm/charts/
helm repo update
```

The helm charts are also available on [ArtifactHub](https://artifacthub.io/packages/helm/tyk-helm/tyk-hybrid).

2. **Then create a new namespace that will be hosting the Tyk Gateways**

```bash
kubectl create namespace tyk
```

3. **Get the default values.yaml for configuration**

Before proceeding with installation of the chart we need to set some custom values. First save the full original values.yaml to a local copy:

```bash
helm show values tyk-helm/tyk-hybrid > values.yaml
```

4. **Configure Tyk Gateway and its connection to Tyk Cloud**

You need to modify the following values in your custom `values.yaml` file:

* `gateway.rpc.apiKey` - Tyk Dashboard API Access Credentials of the user created earlier
* `gateway.rpc.rpcKey` - Organization ID
* `gateway.rpc.connString` - MDCB connection string
* `gateway.rpc.group_id`*(optional)*  - if you have multiple data plane (e.g. in different regions), specify the data plane group (string) to which the gateway you are deploying belong. The data planes in the same group share one Redis instance.
* `gateway.sharding.enabled` and `gateway.sharding.tags`*(optional)*  - you can enable sharding to selectively load APIs to specific gateways, using tags. By default, sharding is disabled and the gateway will load all APIs.

5. **Configure the connection to Redis**

You can connect the gateway to any Redis instance already deployed (as DBaaS or hosted in your private infrastructure).

In case you don't have a Redis instance yet, here's how to deploy Redis in Kubernetes using Bitnami Helm charts.

```bash
helm install tyk-redis bitnami/redis -n tyk --version 19.0.2
```

{{< note success >}}
**Note**

Please make sure you are installing Redis versions that are supported by Tyk. Please refer to Tyk docs to get list of [supported versions]({{< ref "tyk-self-managed#redis-1" >}}).
{{< /note >}}

Follow the notes from the installation output to get connection details and password.

```bash
  Redis(TM) can be accessed on the following DNS names from within your cluster:

    tyk-redis-master.tyk.svc.cluster.local for read/write operations (port 6379)
    tyk-redis-replicas.tyk.svc.cluster.local for read-only operations (port 6379)

  export REDIS_PASSWORD=$(kubectl get secret --namespace tyk tyk-redis -o jsonpath="{.data.redis-password}" | base64 --decode)
```

You need to modify the following values in your custom `values.yaml` file:

* `redis.addrs`: the name of the Redis instance including the port as set by Bitnami `tyk-redis-master.tyk.svc.cluster.local:6379`
* `redis.pass`: password set in redis (`$REDIS_PASSWORD`). Alternatively, you can use --set flag to set it during helm installation. For example `--set redis.pass=$REDIS_PASSWORD`.


6. **Install Hybrid data plane**

Install the chart using the configured custom values file:

```bash
helm install tyk-hybrid tyk-helm/tyk-hybrid -f values.yaml -n tyk
```

You should see the prompt:

```bash
At this point, Tyk Hybrid is fully installed and should be accessible.
```


7. **Check that the installation was successful**

The hybrid data planes are not yet visible in Tyk Cloud (coming soon!). Here is how you can check that the deployment was successful.

Run this command in your terminal to check that all pods in the `tyk` namespace are running:

```bash
kubectl get pods -n tyk
````

**Expected result:**

```bash
NAME                                  READY   STATUS    RESTARTS   AGE
gateway-tyk-hybrid-54b6c498f6-2xjvx   1/1     Running   0          4m27s
tyk-redis-master-0                    1/1     Running   0          47m
tyk-redis-replicas-0                  1/1     Running   0          47m
tyk-redis-replicas-1                  1/1     Running   0          46m
tyk-redis-replicas-2                  1/1     Running   0          46m
```

Note: if you are using a Redis instance hosted somewhere else, then no Redis pods will appear here.

Run this command in your terminal to check that the services were correctly created:

```bash
kubectl get service -n tyk
````

**Expected result:**

```bash
NAME                     TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)         AGE
gateway-svc-tyk-hybrid   NodePort    10.96.232.123    <none>        443:32668/TCP   44m
tyk-redis-headless       ClusterIP   None             <none>        6379/TCP        47m
tyk-redis-master         ClusterIP   10.109.203.244   <none>        6379/TCP        47m
tyk-redis-replicas       ClusterIP   10.98.206.202    <none>        6379/TCP        47m
```

Note: IP adresses might differ on your system.


Finally, from your terminal, send an HTTP call to the /hello endpoint of the gateway `gateway-svc-tyk-hybrid`:

Note: you may need to port forward if you're testing on a local machine, e.g. `kubectl port-forward service/gateway-svc-tyk-hybrid -n tyk 8080:443`

```bash
curl http://hostname:8080/hello -i
```

**Expected result:**

```bash
HTTP/1.1 200 OK
Content-Type: application/json
Date: Fri, 17 Mar 2023 10:35:35 GMT
Content-Length: 234

{
  "status":"pass",
  "version":"4.3.3",
  "description":"Tyk GW",
  "details":{
    "redis": {"status":"pass","componentType":"datastore","time":"2023-03-15T11:39:10Z"},
    "rpc": {"status":"pass","componentType":"system","time":"2023-03-15T11:39:10Z"}}
}
```

### Tyk Cloud Monitor Metrics

This section explains the various metrics that are monitored by Tyk Cloud.

#### Tyk Cloud Throughput
Tyk Cloud counts the total request/response sizes for traffic transferred through a deployment. Throughput metrics are displayed for the current day. These are calculated as the difference between the throughput usage at the current time and the throughput at last midnight.

External traffic is subject to billing, while internal traffic is exempt. The monitoring service aggregates traffic between different services:

{{< img src="/img/cloud/tyk-cloud-monitoring-priced-traffic.png" alt="Monitoring Traffic Pricing" >}}

**Billed traffic**
 - Traffic between user → Control Plane
 - Traffic between user → Cloud Data Plane
 - Traffic between user → Enterprise Developer Portal
 - Traffic between user → Mserv (plugin upload)
 - Traffic between Control Plane → Cloud Data Plane cross region
 - Traffic between Cloud Data Plane → Mserv cross region
 - Traffic between Control Plane → Portal cross region

**Unbilled traffic**
 - Hybrid traffic is currently not counted
 - Traffic between Control Plane → Cloud Data Plane in the same region
 - Traffic between Cloud Data Plane → Mserv in the same region
 - Traffic between Control Plane → Portal in the same region

#### Tyk Cloud Storage
When a client makes a request to a Tyk Gateway deployment, the details of the request and response are captured and [stored in Redis]({{< ref "api-management/dashboard-configuration#traffic-analytics" >}}). Tyk Pump processes the records from Redis and forwards them to MongoDB. Finally, Tyk Cloud reads that data from MongoDB and displays its size(bytes) in the _Storage_ section of _Monitoring_. 



### Tyk Cloud Telemetry

Telemetry in Tyk Cloud enables distributed tracing of your APIs, allowing you to track and analyze how requests flow through your system. 
This trace data helps you understand request paths, identify bottlenecks, and troubleshoot issues by providing detailed insights into each request's journey through your API infrastructure.

We support distributed tracing for `Cloud Data Plane` deployments. You can enable it while creating or updating after setting up telemetry. 

Since this functionality is powered by Tyk Gateway's OpenTelemetry integration, we recommend reviewing our comprehensive [OpenTelemetry documentation]({{< ref "product-stack/tyk-gateway/advanced-configurations/distributed-tracing/open-telemetry/open-telemetry-overview" >}})
to understand the underlying architecture, best practices for implementation, and how to maximize the value of distributed tracing in your API infrastructure. The documentation provides detailed insights into configuration options, sampling strategies.

#### Available Telemetry Providers

Tyk Cloud integrates with these monitoring platforms:

- [Datadog]({{< ref "#configuring-datadog-provider" >}})
- [Dynatrace]({{< ref "#configuring-dynatrace-provider" >}})
- [New Relic]({{< ref "#configuring-new-relic-provider" >}})
- [Elastic]({{< ref "#configuring-elastic-provider" >}})
- [Custom]({{< ref "#configuring-elastic-provider" >}})


{{< note success >}}
**Note**

Before diving into the configuration details, please note that Telemetry is an add-on feature in Tyk Cloud.
To enable this capability for your account, please contact our [support team](https://support.tyk.io/).
Our team will help you activate this feature and ensure you have access to all the Telemetry options.
{{< /note >}}

#### Enabling Telemetry in Tyk Cloud

Configuring telemetry in Tyk cloud is a two step process. 
1. Configure a provider/backend at organization level.
2. Enable/Disable telemetry option while creating/updating a `Cloud Data Plane`.

{{< note success >}}
**Note**

Before diving into the configuration details, please note that Telemetry is an add-on feature in Tyk Cloud.
To enable this capability for your account, please contact our [support team](https://support.tyk.io/).
Our team will help you activate this feature and ensure you have access to all the Telemetry options.
{{< /note >}}

##### Steps for Configuring Telemetry Provider in Tyk Cloud

**Step 1. Choosing Your Provider**

In the `Tyk Cloud Console`, select `Telemetry` option. You'll see a grid displaying all supported backends/providers. Click on your preferred backend/provider to begin the configuration process.

{{< note success >}}
**Note**

Only a single provider/backend can be configured at any given time.
{{< /note >}}

{{< img src="/img/cloud/telemetry-exports.png" alt="Tyk Cloud Telemetry providers" >}}

**Step 2. Configuring Basic Elements**

Every telemetry backend shares these fundamental settings:

1. **Connection Toggle:** This switch activates or deactivates your telemetry export. When enabled, Tyk will start sending monitoring data to your chosen platform.

2. **Sampling Rate:** This setting determines what percentage of your API traffic data gets sent to your monitoring platform. The default is 10%, which means Tyk will send data for one out of every ten API calls.

**Step 3. Configuring Optional Settings**

Beyond the basic settings, you can customize your telemetry with two optional features:

1. **Tags to Add to the Traces :**
   Add custom labels to your telemetry data to make it easier to analyze. For example:
   ```
   environment:production
   region:europe
   team:api-gateway
   ```

2. **Fields to Filter :**
   Specify which data fields should be excluded from your telemetry. This is useful for ensuring sensitive information doesn't get sent to your monitoring platform.

**Step 4. Configuring Provider-Specific Configuration**

Each monitoring platform has its own requirements for connection. Let's explore what you'll need for each:

###### Configuring Datadog Provider

- **Provider Site:** Enter your Datadog URL (like us5.datadoghq.com)
- **API Key:** Your Datadog authentication key

  Example: A Datadog setup might look like:
  ```
  Provider Site: us5.datadoghq.com
  API Key: your-datadog-api-key
  ```

{{< img src="/img/cloud/telemetry-datadog.png" alt="Tyk Cloud Telemetry Datadog" >}}

###### Configuring Dynatrace Provider {#configuring-dynatrace-provider}

- **Provider Endpoint:** Your Dynatrace environment URL
- **API Token:** Your Dynatrace access token

  Example configuration:
  ```
  Provider Endpoint: https://<YOUR-ENVIRONMENT-STRING>.live.dynatrace.com/api/v2/otlp
  API Token: your-dynatrace-token
  ```

{{< img src="/img/cloud/telemetry-dynatrace.png" alt="Tyk Cloud Telemetry Dynatrace" >}}

###### Configuring New Relic Provider {#configuring-new-relic-provider}

- **Provider Endpoint:** Your New Relic HTTP endpoint
- **API Token:** Your New Relic license key

  Example configuration:
  ```
  Provider Endpoint: https://security-api.newrelic.com/security/v1
  API Token: your-newrelic-api-key
  ```

{{< img src="/img/cloud/telemetry-newrelic.png" alt="Tyk Cloud Telemetry NewRelic" >}}

###### Configuring Elastic Provider {#configuring-elastic-provider}

- **Provider Endpoint:** Your Elastic APM server address
- **Secret Token:** Your Elastic APM authentication token
  
  Example setup:
  ```
  Provider Endpoint: https://your-elastic-cluster:8200
  Secret Token: your-elastic-secret-token
  ```

{{< img src="/img/cloud/telemetry-elastic.png" alt="Tyk Cloud Telemetry Elastic" >}}

###### Configuring Custom Provider {#configuring-custom-provider}

For when you need to connect to a different monitoring system:

- **Exporter:** Choose gRPC/HTTP
- **Provider Endpoint:** Your monitoring system URL
- **Authorization:** Configure how Tyk should authenticate with your system

  Example custom configuration:
  ```
  Exporter: gRPC/HTTP
  Provider Endpoint: grpc://your-collector:4317
  Authorization Header Name: Authorization
  Authorization Header Value: Bearer your-token
  ```

{{< img src="/img/cloud/telemetry-custom.png" alt="Tyk Cloud Telemetry Custom" >}}


##### Configure Telemetry Export in Cloud Data Plane Deployments

When creating a new Cloud Data Plane deployment or editing an existing one, you can configure telemetry export settings. These settings are specific to Cloud Data Plane deployments only and allow you to monitor API performance through your chosen telemetry provider.

When you modify any general telemetry settings in Tyk Cloud, these changes don't take immediate effect.
Your Cloud Data Planes need to be redeployed to activate the new telemetry configuration.

###### Configuration Options

{{< img src="/img/cloud/telemetry-enable.png" alt="Tyk Cloud Telemetry Enable" >}}

1. **Enable Datadog Connection**
    - Toggle switch to enable/disable Datadog monitoring for this specific Cloud Data Plane deployment

2. **Sampling Rate Override**
    - Choose what percentage of API traffic to monitor (default: 10%)

  {{< note success >}}
  **Note**

  The sampling level can be configured at both the organization level (while setting up the provider) and the `Cloud Data Plane`. The configuration at the Cloud Data Plane will override the organization-level settings.
  {{< /note >}}

### Tyk Cloud MDCB Supported versions

This section lists the supported MDCB version for hybrid setup

| Dashboard | Gateway | MDCB   |
| --------- | ------- | ------ |
| v5.2.0    | v5.2.0  | v2.4.0 |
| v5.1.2    | v5.1.2  | v2.3.0 |
| v5.1.1    | v5.1.1  | v2.3.0 |
| v5.1.0    | v5.1.0  | v2.3.0 |
| v5.0.5    | v5.0.5  | v2.2.0 |
| v5.0.4    | v5.0.4  | v2.2.0 |
| v5.0.3    | v5.0.3  | v2.2.0 |
| v5.0.2    | v5.0.2  | v2.2.0 |
| v5.0.1    | v5.0.1  | v2.1.1 |
| v5.0.0    | v5.0.0  | v2.1.1 |
| v4.3.3    | v4.3.3  | v2.1.0 |
| v4.3.2    | v4.3.2  | v2.0.4 |
| v4.3.1    | v4.3.1  | v2.0.4 |
| v4.3.0    | v4.3.0  | v2.0.4 |
| v4.2.4    | v4.2.4  | v2.0.3 |
| v4.2.3    | v4.2.3  | v2.0.3 |
| v4.0.10    | v4.0.10  | v2.0.4 |
| v4.0.9    | v4.0.9  | v2.0.3 |
| v4.0.8    | v4.0.8  | v2.0.3 |
| v3.2.3    | v3.2.3  | v1.8.1 |
| v3.0.9    | v3.0.9  | v1.7.11 |

### Track Usage

##### How to check metrics
Login to Tyk Cloud and click on *Monitoring* within the *Operations* menu. Enable *Throughput* to display throughput metrics.

{{< img src="/img/cloud/tyk-cloud-monitoring-throughput.png" alt="Monitoring Throughput" >}}

Enable *Storage* to display storage metrics.

{{< img src="/img/cloud/tyk-cloud-monitoring-storage.png" alt="Monitoring Storage" >}}

You can also optionally filter for metrics by date.

{{< img src="/img/cloud/tyk-cloud-monitoring-filtering-by-date.png" alt="Monitoring Metric Filtering" >}}

Here you can see the metrics broken down per environment and a list of the top 5 control and cloud data planes.

{{< img src="/img/cloud/tyk-cloud-monitoring-break-down.png" alt="Monitoring Metric break down" >}}

### Troubleshooting Tyk Cloud

#### FAQs

**Q1: Is a Cloud Data Plane Deployment considered highly available? Do I need to deploy multiple Cloud Data Planes to a single Data Center?**

A: On a Production plan and higher there are at least two Gateway instances at all times, usually in different
availability zones within a single region (in cloud provider terms).

**Q2: What are the performance benchmarks of a single Cloud Data Plane?**

A: In Phase 2 we plan to allow users to choose from a pool of "runtimes" that provide different performance targets, so
they'll be able to have a Tyk Cloud environment with Cloud Data Planes that can sustain more load and then another environment
(e.g. for testing) that sustains less.

**Q3: How can I geo-load balance across multiple Cloud Data Planes? Why should I want to?**

A: The use case to deploy multiple Cloud Data Planes is either segregating regional traffic and/or segregating APIs.
This doesn't necessarily concern High Availability.

The number of actual Gateway instances within a single Cloud Data Plane deployment varies, auto-scales and load balances depending
on the plan.

If you deploy several Cloud Data Planes and want to use it to e.g. geo-load balance it's currently your responsibility to put such
a system into place, but we have plans to help with this in later phases.

**Q4: What instance sizes/VMs does a Gateway run on?**

A: You won't need to worry. We abstract all the resources and only provide performance "targets". See Q2.

**Q5: Can I connect my own Hybrid Gateways?**

A: Yes. The MDCB Ingress URL is given in the Control Plane details page, which allows for connecting a Hybrid Gateway.

**Q6: Can we use SSO in the Dashboard and/or Portal?**

A: Yes, as of v3.0.0, TIB is integrated into Tyk Dashboard, meaning that once a Control Plane is deployed, a user can
go into the Identity Management section of Tyk Dashboard and setup SSO with their IdP for both the Dashboard and
Developer Portal.

**Q7: How do I view Gateway/Dashboard logs for troubleshooting?**

A: This will be exposed in later phases per deployment.

**Q8: How do Segment tags work with Tyk Cloud?**

A: When a Cloud Data Plane is deployed, the tag 'edge' and a location tag are automatically generated for the Cloud Data Plane. You use these tags to connect your API to the appropriate Cloud Data Plane. It works as follows:

* Add the **edge** tag to your API to connect it to all Cloud Data Planes within the Control Plane.
* Add the location tag to your API to connect it to only Cloud Data Planes with that location within the Control Plane.

To add either of the tags, see [Adding an API](#steps-to-add-an-api-in-tyk-cloud) in the Getting Started section.

{{< warning success >}}
**Warning**
  
You must add one of the above tags to any API you add to your Control Plane Dashboard.
{{< /warning >}}

#### Glossary

**Account**

The highest level container for one or more Organizations.

**Organization**

The main entity for all your data (Environments, APIs, Users, etc). An Organization is connected to a single region and once connected, cannot be changed.

**Team** 

A sub-grouping within an Organization.

**User**

A person who is a member of a Team with a set of permissions.

**Role**

A set of data and access permissions that can be applied to a user or team of users. See [User Roles]({{< ref "#user-roles-in-tyk-cloud" >}}) for more details.

**Profile**

The place that holds personal information for a user.

**Subscription**

A set of allowances assigned to an Organization (made up of plan+addons+settings).

**Plan**

A portion of allowances (without add-ons) that feed into the main subscription.

**Operations**

The place to manage all deployments for an Organization or Team. 

**Environment**

A grouping of 'deployments' that can have multiple Control Planes and Cloud Data Planes.

**Stack**

The high level name for the set of configurations making up different types of deployments.

**Control Plane**

A deployment type: A single management layer for data in one region (where all the data lives).

**Cloud Data Plane**

A deployment type: Additional workers with varying functionality that are linked to the main control plane and can be deployed in a different region from the Control Plane.

**Instance**

Used to control traffic and scale in a Tyk Gateway.

**Dashboard**

The Tyk Analytics Dashboard to manage APIs and services.

**Retirement**

Where an Organization has expired due to either a subscription failure or cancelation and is now within a "retirement" period of 30 days, during which an [Billing Admin]({{< ref "#assign-user-roles" >}}) can reinstate full functionality by updating or creating a new subscription.

**Deploy**

Deploy a not yet deployed state (a first time deployment).

**Undeploy**

Temporarily remove a deployed status but keep all data and configuration.

**Redeploy**

Redeploy from a deployed state. Used for troubleshooting.

**Destroy**

Permenantly remove a deployment and all associated data and configurations.

**Create**

Date and time of time a deployment was initially created.

**Add**

Add a new 'user' or 'team' etc.

**Remove**

Remove things that have been added e.g. users and teams.

**Update**

Saving a change to a configuration.

**Edit**

Changing configuration or information on any of the deployments or other resources such as users or teams.

**Deployed**

A deployment that is currently deployed.

**Undeployed**

A deployment that was deployed but has been undeployed.

**Not Deployed**

A deployment that has never been deployed.

**Destroyed**

A deployment that has been permenantly deleted and will not be visible in the operations console.

**Unsuccessful**

When there has been an error in the deployment process.

**Deploying**

When a deployment is being deployed.

**Undeploying**

When a deployment is being undeployed.

See [User Roles]({{< ref "#user-roles-in-tyk-cloud" >}}) for more details

**Super Administrator**

Can do everything across all organizations

**Organization Admin**

Can do everything within the scope of the one organization they have access to.

**Team Admin**

Can do everything within the scope of the one team they have access to.

**Team Member**

Can only view and manage the overview, environments and deployments.

