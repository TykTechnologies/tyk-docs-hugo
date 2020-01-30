---
date: 2019-12-03T15:46:41Z
Title: Install Tyk On-Premises on AWS
menu:
  main:
    parent: "With Tyk On-Premises"
weight: 6
url: "/getting-started/with-tyk-on-premises/installation/on-aws"
---


# CloudFormation
To get started easily with deployment on AWS, Tyk offers AWS CloudFormation products which run and bootstrap the entire stack.

It uses Elasticache in place of Redis, and Mongo running in HA mode in EC2.

There are three CloudFormation products to get you started. 

- [**PoC**][2]
- [**High Availability (2-node)**][4]
- [**AutoScaling (3+ node)**][3]

### Pricing / Licensing
The license for these products is baked into the product as an hourly cost.

## PoC
PoC will run with a single GW node, Elasticache, and 3 Mongo nodes: Master, Slave, Arbiter.

##### Logging Into Dashboard
Once the stack is running, in order to access the Dashboard, simply set up an Elastic IP to the Dashboard instance and then visit:

`http://<elastic_public_ip>:3000`

The username & password were created using the variables you gave the CloudFormation template

username: `<TYKDashboardAdminUserName>@<TYKDBAdminOrganization>.com`

Password: `<TYKDashboardAdminUserPassword>`

1. You need to use a password that is at least 8 characters long, or you will not be able to log 
in.
2. The CF Template already creates Security Groups for the Dashboard with port 3000 open

##### Accessing the GW
In order to access GW, simply assign Elastic IP to the instance.  The security groups are already set up to allow traffic on port 8080.

To test, visit: 

```bash
$ curl http://<elastic_public_ip>:8080/hello
Hello Tiki
```

## High Availability
Everything is the same as PoC, except of course we are running two Gateway nodes instead of one.  

#### Accessing Gateways
The CloudFormation stack sets up an Elastic Load Balancer for the Gateway cluster.  We simply need to navigate to the Load Balancing section and find the  `TYKElasticLoadBalancerALB`.  The Cloud Formation template sets up a public DNS entry, something like `TYKElasticLoadBalancerALB-2050138050.us-east-1.elb.amazonaws.com`

We can check it is running by visiting
```bash
$ curl TYKElasticLoadBalancerALB-2050138050.us-east-1.elb.amazonaws.com/hello
Hello Tiki
```

Note that it is already setup to accept traffic on port 80 and forward it to the Gateways to port 8080.



## CloudFormation BYOL (Bring Your Own License)
You may already have a license, and simply want help launching a Tyk Stack on AWS.  For you, there is a BYOL CloudFormation product that will get you started with a 2 Gateway node stack:

[Tyk Pro High Availability][1]

[1]: https://aws.amazon.com/marketplace/pp/prodview-nphqjavwaqes6?qid=1575313064731&sr=0-2&ref_=srh_res_product_title
[2]: https://aws.amazon.com/marketplace/pp/prodview-elvk5mxxlkueu?qid=1575313242174&sr=0-4&ref_=srh_res_product_title
[3]: https://aws.amazon.com/marketplace/pp/prodview-2bgdxbpeygf5w?qid=1575313242174&sr=0-5&ref_=srh_res_product_title
[4]: https://aws.amazon.com/marketplace/pp/prodview-nempvlrcr4fq4?qid=1575313242174&sr=0-3&ref_=srh_res_product_title
