---
title: "Set Up Tyk Cloud"
description: "This page serves as a comprehensive guide to migrating workloads to Tyk Cloud"
tags: ["Tyk Cloud", "Migration"]
aliases:
  - /tyk-cloud/environments--deployments/hybrid-gateways
  - /tyk-cloud/environments-&-deployments/hybrid-gateways
  - /tyk-cloud/environments-&-deployments/managing-apis
  - /tyk-cloud/environments-&-deployments/managing-gateways
  - /tyk-cloud/environments-deployments/hybrid-gateways
  - /tyk-cloud/environments-deployments/managing-apis
  - /tyk-cloud/first-api
  - /tyk-cloud/getting-started
  - /tyk-cloud/getting-started-tyk-cloud/create-account
  - /tyk-cloud/getting-started-tyk-cloud/first-api
  - /tyk-cloud/getting-started-tyk-cloud/setup-org
  - /tyk-cloud/getting-started-tyk-cloud/test-api
  - /tyk-cloud/getting-started-tyk-cloud/to-conclude
  - /tyk-cloud/getting-started-tyk-cloud/view-analytics
  - /tyk-cloud/reference-docs/user-roles
  - /tyk-cloud/test-api
  - /tyk-cloud/view-analytics
  - /tyk-cloud/what-we-covered
  - /tyk-cloud/configuration-options
  - /tyk-cloud/environments-&-deployments
  - /tyk-cloud/environments-deployments
  - /tyk-cloud/environments-deployments/hybrid-gateways-helm
  - /tyk-cloud/environments-deployments/managing-gateways
  - /tyk-cloud/glossary
  - /tyk-cloud/securing-your-apis
  - /tyk-cloud/what-is-tyk-cloud
  - /deployment-and-operations/tyk-cloud-platform/quick-start
  - /deployment-and-operations/tyk-open-source-api-gateway/setup-multiple-gateways
  - /get-started/with-tyk-hybrid
  - /get-started/with-tyk-multi-cloud/tutorials/installation-on-aws
  - /getting-started/installation/with-tyk-multi-cloud/create-an-account
  - /getting-started/installation/with-tyk-multi-cloud/installation-on-aws
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
The Tyk Cloud trial does not include access to [Hybrid deployments]({{< ref "#deploy-hybrid-gateways" >}}) or the [Developer Portal]({{< ref "portal/overview/intro" >}}).
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


## Glossary

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

See [Tyk Classic API versioning]({{< ref "api-management/gateway-config-tyk-classic#tyk-classic-api-versioning" >}}) for more details.

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

Your API will appear in your APIs list. If you select **EDIT** from the **ACTIONS** drop-down list, you can see the endpoints (from the [Endpoint Designer]({{< ref "api-management/dashboard-configuration#endpoint-designer" >}})) that have been created as part of the import process.

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

Edit the `<docker-compose.yml>` file to use the [tyk.hybrid.conf](https://github.com/TykTechnologies/tyk-gateway-docker#hybrid) that you have just configured.

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

The following quick start guide explains how to use the [Tyk Data Plane Helm chart]({{< ref "product-stack/tyk-charts/tyk-data-plane-chart" >}}) to configure Tyk Gateway that includes:
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

For the complete installation guide and configuration options, please see [Tyk Data Plane Chart]({{< ref "product-stack/tyk-charts/tyk-data-plane-chart" >}}).


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

* [Adding APIs]({{< ref "api-management/gateway-config-managing-classic#create-an-api" >}}) to Tyk, including REST and GraphQL APIs
* Applying Quotas and Rate limits via [Security Policies]({{< ref "api-management/gateway-config-managing-classic#secure-an-api" >}}) and [Keys]({{< ref "api-management/gateway-config-managing-classic#access-an-api" >}})
* [Securing]({{< ref "api-management/security-best-practices#securing-apis-with-tyk" >}}) your APIs
* Viewing granular [Analytics]({{< ref "api-management/dashboard-configuration#traffic-analytics" >}}) for your Tyk managed APIs
* [Transform traffic]({{< ref "api-management/traffic-transformation" >}}) with the Tyk API Designer
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


### Deploy Legacy Hybrid Gateways

{{< warning success >}}
**Warning**

`tyk-hybrid` chart is deprecated. Please use our [Tyk Data Plane helm chart]({{< ref "#deploy-hybrid-gateways" >}}) instead. 

We recommend that all users to migrate to the `tyk-data-plane` Chart. Please review the [Configuration]({{< ref "product-stack/tyk-charts/tyk-data-plane-chart#configuration" >}}) section of the new helm chart and cross-check with your existing configurations while planning for migration. 
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

Please make sure you are installing Redis versions that are supported by Tyk. Please refer to Tyk docs to get list of [supported versions]({{< ref "tyk-self-managed#redis" >}}).
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

