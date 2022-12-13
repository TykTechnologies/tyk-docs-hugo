---
date: 2019-12-03T15:46:41Z
Title: AWS Marketplace
tags: ["Tyk Stack", "Self-Managed", "Installation", "AWS Marketplace"]
description: "How to install the Tyk Stack via AWS Marketplace"
menu:
  main:
    parent: "Self-Managed Installation"
weight: 6
aliases:
  - /get-started/with-tyk-multi-cloud/tutorials/installation-on-aws/
  - /get-started/with-tyk-on-premise/installation/on-aws/
  - /getting-started/installation/with-tyk-multi-cloud/installation-on-aws/
  - /getting-started/with-tyk-on-premises/installation/on-aws/
  - /tyk-on-premises/installation/on-aws
  - /tyk-on-premises/aws/
---

To get started easily, [Tyk offers AWS Marketplace products][6] which bootstrap the entire stack, via CloudFormation templates.

The AWS Marketplace products:

- use AWS Elasticache in place of Redis
- Runs Mongo OSS in HA mode in EC2 (Master, Slave, Arbiter)

## BYOL

These [AWS Marketplace products][5] are delivered as CloudFormation products. You will need to bring your own license.  You can choose from one of 3 fulfillment options:

- PoC (1 gw node)
- High Availability (2 nodes)
- Autoscaling (3+ nodes)

Please [contact an account manager][7] in order to get a license.

## PAYG
There are three billed through AWS Marketplace PAYG products to get you started.  The license for these products is baked into the product as an hourly cost.  Please follow this video in order to get started

- [PoC](https://aws.amazon.com/marketplace/pp/prodview-elvk5mxxlkueu?qid=1575313242174&sr=0-4&ref_=srh_res_product_title)
- [High Availability (2-node)](https://aws.amazon.com/marketplace/pp/prodview-nempvlrcr4fq4?qid=1575313242174&sr=0-3&ref_=srh_res_product_title)
- [AutoScaling (3+ node)](https://aws.amazon.com/marketplace/pp/prodview-2bgdxbpeygf5w?qid=1575313242174&sr=0-5&ref_=srh_res_product_title)

### Installation

You will need to create the following AWS resources in an AWS VPC before you are able to deploy the PAYG products.

#### Prerequisites

- 3 Subnets in 3 different Availability Zones in the AWS Region
- an Elasticache Cluster in one of the aforementioned subnets
- An EC2 Keypair for SSH into EC2 instances

Once these 3 are setup, we can deploy the AWS Marketplace PAYG products.

*Example:*

|  Resource            | IPV4 CIDR     |
|----------------------|---------------|
| VPC                  | 10.0.0.0 /24  |
| CF-US Subnet East 1A | 10.0.0.0 /28  |
| CF-US Subnet East 1B | 10.0.0.32 /28 |
| CF-US Subnet East 1C | 10.0.0.64 /28 |

#### Video Walkthrough
This video will walk you through how to set up a PAYG product beginning to end on AWS, including the prerequisites.

{{< youtube IiGyB_IHqWw >}}

#### Logging Into Dashboard
Once the stack is running, in order to access the Dashboard, simply set up an Elastic IP to the Dashboard instance and then visit:

`http://<elastic_public_ip>:3000`

The username & password were created using the variables you gave the CloudFormation template

username: `<TYKDashboardAdminUserName>@<TYKDBAdminOrganization>.com`

Password: `<TYKDashboardAdminUserPassword>`

1. You need to use a password that is at least 8 characters long, or you will not be able to log in.
2. If accessing the Dashboard from a public space, don't forget to add an Internet Gateway to the AWS VPC.

The CF Template already creates Security Groups for the Dashboard with port 3000 open

#### cURLing the GW(s)

{{% tabs_start %}}
{{% tab_start "PoC" %}}
<br>
In order to access GW, simply assign Elastic IP to the GW instance.  The auto generated GW security group is already set up to allow traffic on port 8080.

To test, cURL the following: 
```{.copyWrapper}
$ curl http://<elastic_public_ip>:8080/hello
{"status":"pass","version":"v3.0.0","description":"Tyk GW","details":{"dashboard":{"status":"pass","componentType":"system","time":"2020-08-28T17:19:49+02:00"},"redis":{"status":"pass","componentType":"datastore","time":"2020-08-28T17:19:49+02:00"}}}
```

{{% tab_end %}}
{{% tab_start "High Availability / Autoscaling" %}}
<br>
The CloudFormation stack sets up an Elastic Load Balancer for the Gateway cluster.  

Navigate to the AWS Load Balancing section and find the  `TYKElasticLoadBalancerALB`.  The Cloud Formation template sets up a public DNS entry, something like `TYKElasticLoadBalancerALB-2050138050.us-east-1.elb.amazonaws.com`

We can check it is running by visiting
```{.copyWrapper}
$ curl http://TYKElasticLoadBalancerALB-2050138050.us-east-1.elb.amazonaws.com/hello
{"status":"pass","version":"v3.0.0","description":"Tyk GW","details":{"dashboard":{"status":"pass","componentType":"system","time":"2020-08-28T17:19:49+02:00"},"redis":{"status":"pass","componentType":"datastore","time":"2020-08-28T17:19:49+02:00"}}}
```

Note that ALB rules are already setup to accept traffic on port 80 and forward it to the Gateways on port 8080.
{{% tab_end %}}

{{% tabs_end %}}


### Tyk Component Updates
Updates to the PAYG products can be done manually or automatically.  The manual method requires SSHing into the EC2 instances and doing the updates through the CLI.  To do this automatically, there is a mechanism to upgrade CloudFormation stack. The idea is to apply a new version of CloudFormation to your existing stack. We are releasing new versions of the product from time to time. When this happens, you will get a notification from AWS.


[2]: https://aws.amazon.com/marketplace/pp/prodview-elvk5mxxlkueu?qid=1575313242174&sr=0-4&ref_=srh_res_product_title
[3]: https://aws.amazon.com/marketplace/pp/prodview-2bgdxbpeygf5w?qid=1575313242174&sr=0-5&ref_=srh_res_product_title
[4]: https://aws.amazon.com/marketplace/pp/prodview-nempvlrcr4fq4?qid=1575313242174&sr=0-3&ref_=srh_res_product_title
[5]: https://aws.amazon.com/marketplace/pp/prodview-nphqjavwaqes6?ref_=aws-mp-console-subscription-detail-payg#pdp-pricing
[6]: https://aws.amazon.com/marketplace/seller-profile?id=432b7859-4299-4278-8eb2-f7bbe7739ec6&ref=dtl_prodview-nphqjavwaqes6
[7]: https://pages.tyk.io/get-started-with-tyk
