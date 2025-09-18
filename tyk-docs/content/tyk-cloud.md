---
title: "Set Up Tyk Cloud"
description: "This page serves as a comprehensive guide to migrating workloads to Tyk Cloud"
tags: ["Tyk Cloud", "Migration"]
aliases:
  - /tyk-cloud/environments-&-deployments/managing-apis
  - /tyk-cloud/environments-&-deployments/managing-gateways
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
  - /tyk-cloud/environments-deployments/managing-gateways
  - /tyk-cloud/glossary
  - /tyk-cloud/what-is-tyk-cloud
  - /deployment-and-operations/tyk-cloud-platform/quick-start
  - /deployment-and-operations/tyk-open-source-api-gateway/setup-multiple-gateways
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

### Checking the Tyk Cloud status

If you want to check if there are issues with the environments and any upcoming down times, you can go to the [Tyk Status](https://status.tyk.io/) page.

## Quick Start Tyk Cloud

{{< note trial >}}
**Note**

The Tyk Cloud trial is limited to 48 hours. After this period, your data will be deleted.
The Tyk Cloud trial does not include access to [Hybrid deployments]({{< ref "tyk-cloud/environments-deployments/hybrid-gateways" >}}) or the [Developer Portal]({{< ref "portal/overview/intro" >}}).
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
* Adding [Plugins and Middleware]({{< ref "tyk-cloud/using-plugins" >}}) to your Control Plane


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

Where an Organization has expired due to either a subscription failure or cancelation and is now within a "retirement" period of 30 days, during which an [Billing Admin]({{< ref "tyk-cloud/teams-users#assign-user-roles" >}}) can reinstate full functionality by updating or creating a new subscription.

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