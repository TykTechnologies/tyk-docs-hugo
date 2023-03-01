---
title: Quick Start in Kubernetes | POC in Kubernetes | Kubernetes Examples
linktitle: Kubernetes
diffTitle: true
diffTitleName: Kubernetes
tags: ["Tyk Tutorials", "Getting Started", "POC", "Proof of Concept", "Tyk PoC", "k8s", "Self Managed", "Open Source", "demo", "Tyk demo", "Tyk quick start"]
description: "Learn to deploy and run a Tyk deployment in minutes on Kubernetes"
menu:
    main:
        parent: "Quick Start"
weight: 2
---

The [tyk-k8s-demo](https://github.com/TykTechnologies/tyk-k8s-demo) library allows you stand up an entire Tyk Stack with 
all its dependencies as well as other tooling that can integrate with Tyk. The library will spin up everything in 
Kubernetes using `helm` and bash magic to get you started.

## Getting Started

### Requirements
You will need the following tools to be able to run this library. 
- [Helm](https://helm.sh/docs/intro/install/)
- [jq](https://stedolan.github.io/jq/download/)
- [git](https://git-scm.com/downloads)
- [Terraform](https://www.terraform.io/) (only when using `--cloud` flag)

### Possible deployments 
This determines which flavor of Tyk you would like to install. 
- `tyk-pro`: Tyk pro self-managed single region
- `tyk-cp`: Tyk pro self-managed multi region control plane
- `tyk-worker`: Tyk worker gateway, this can connect to Tyk Cloud or a Tyk Control Plane
- `tyk-gateway`: Tyk open source self-managed single region

### Initial setup
Create `.env` file and update the appropriate fields with your licenses. If you require a trial license you can obtain one 
[here](https://tyk.io/sign-up/). If you are looking to use the `tyk-gateway` deployment only you will not require any licensing
as that is the open source deployment.

```console
git clone https://github.com/TykTechnologies/tyk-k8s-demo.git
cd tyk-k8s-demo
cp .env.example .env
```

Depending on the deployments you would like install  set values of the `LICENSE`, `MDCB_LICENSE` and `PORTAL_LICENSE` inside the `.env` file.

### Minikube
If you are deploying this on Minikube you will need to enable the ingress addon. You do so by running the following:
```console
minikube start
minikube addons enable ingress
```

## Quick Start

```
./up.sh --expose port-forward --deployments portal,operator tyk-pro
```
This quick start command will stand up the entire Tyk stack along with the Tyk Enterprise Portal and the Tyk Operator.

## Possible deployments
- `tyk-pro`: Tyk pro self-managed single region
- `tyk-cp`: Tyk pro self-managed multi region control plane
- `tyk-worker`: Tyk worker gateway, this can connect to Tyk Cloud or a Tyk Control Plane
- `tyk-gateway`: Tyk oss self-managed single region

## Dependencies Options
### Redis Options
- `redis`: Bitnami Redis deployment
- `redis-cluster`: Bitnami Redis Cluster deployment
- `redis-sentinel`: Bitnami Redis Sentinel deployment

### Storage Options
- `mongo`: Bitnami Mongo database deployment as a Tyk backend
- `postgres`: Bitnami Postgres database deployment as a Tyk backend

## Supplementary Deployments
These options can be specified using the `--deployments` flag and will yield the following:
- `k6-traffic-generator`: generates a load of traffic to seed analytical data.
- `operator`: this deployment option will install the [Tyk Operator](https://github.com/TykTechnologies/tyk-operator) and its dependency [cert-manager](https://github.com/jetstack/cert-manager).
    - `operator-httpbin`: creates two API example using the tyk-operator with that is protected and one that is not.
    - `operator-graphql`: creates a set of graphql API examples using the tyk-operator. Federation v1 and stitching examples.
- `portal`:this deployment will install the [Tyk Enterprise Developer Portal](https://tyk.io/docs/tyk-developer-portal/tyk-enterprise-developer-portal/) as well as its dependency PostgreSQL.
- Pump
    - `pump-prometheus`: this deployment will stand up a Tyk Prometheus pump with custom analytics that is fed into Grafana for visualization.

If you are running a POC and would like an example of how to integrate a specific tool. Please submit a request through
the repository [here](https://github.com/TykTechnologies/tyk-k8s-demo/issues).

### Example
```bash
./up.sh \
  --redis redis-cluster \
  --storage postgres \
  --deployments operator,operator-httpbin,pump-prometheus,k6-traffic-generator \
  --expose port-forward \
  tyk-pro
```

## Usage

### Start Tyk deployment
Create and start up the containers and the Tyk deployment

```
Usage:
  ./up.sh [flags] [command]

Available Commands:
  tyk-pro
  tyk-cp
  tyk-worker
  tyk-gateway

Flags:
  -v, --verbose     	bool   	 set log level to debug
      --dry-run     	bool   	 set the execution mode to dry run. This will dump the kubectl and helm commands rather than execute them
  -n, --namespace   	string 	 namespace the tyk stack will be installed in, defaults to 'tyk'
  -f, --flavor      	enum   	 k8s environment flavor. This option can be set 'openshift' and defaults to 'vanilla'
  -e, --expose      	enum   	 set this option to 'port-forward' to expose the services as port-forwards or to 'load-balancer' to expose the services as load balancers or 'ingress' which exposes services as a k8s ingress object
  -r, --redis       	enum   	 the redis mode that tyk stack will use. This option can be set 'redis-cluster', 'redis-sentinel' and defaults to 'redis'
  -s, --storage     	enum   	 database the tyk stack will use. This option can be set 'postgres' and defaults to 'mongo'
  -d, --deployments 	string 	 comma separated list of deployments to launch
  -c, --cloud       	enum   	 stand up k8s infrastructure in 'aws', 'gcp' or 'azure'. This will require Terraform and the CLIs associate with the cloud of choice
```

### Stop Tyk deployment
Shut down up the containers and the Tyk deployment

```console
Usage:
  ./down.sh [flags]

Flags:
  -v, --verbose   	bool   	 set log level to debug
  -n, --namespace 	string 	 namespace the tyk stack will be installed in, defaults to 'tyk'
  -p, --ports     	bool   	 disconnect port connections only
  -c, --cloud     	enum     tear down k8s cluster stood up
```

The deployment will take 10 minutes as the installation is sequential and the dependencies require a bit of time before 
they are stood up. Once the installation is complete the script will print out a list of all the services that were 
stood up and how those can be accessed. The k6s job will start running after the script is finished and will run in the 
background for 15 minutes to generate traffic over that period of time. To visualize the live traffic you can use the 
credentials provided by the script to access Grafana or the Tyk Dashboard.

### Clusters
You can get the library to create demo clusters for you on AWS, GCP, or Azure. That can be set using the `--cloud` flag
and requires the respective cloud CLI to be installed and authorized on your system. You will also need to specify the
`CLUSTER_LOCATION`, `CLUSTER_MACHINE_TYPE`, `CLUSTER_NODE_COUNT` and `GCP_PROJECT` (for GCP only) parameters in the .env file.

You can find examples of .env files here:
- [AWS](https://github.com/TykTechnologies/tyk-k8s-demo/blob/main/src/clouds/aws/.env.example)
- [GCP](https://github.com/TykTechnologies/tyk-k8s-demo/blob/main/src/clouds/gcp/.env.example)
- [Azure](https://github.com/TykTechnologies/tyk-k8s-demo/blob/main/src/clouds/azure/.env.example)

For more information about cloud CLIs:
- AWS:
    - [aws](https://aws.amazon.com/cli/)
- GCP:
    - [gcloud](https://cloud.google.com/sdk/gcloud)
    - `GOOGLE_APPLICATION_CREDENTIALS` environment variable per [google's documentation](https://cloud.google.com/docs/authentication/application-default-credentials)
- Azure:
    - [az](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli)

## Customization
This library can also act as a guide to help you get set up with Tyk. If you just want to know how to set up a specific 
tool with Tyk you can run the library with the `--dry-run` and `--verbose` flags. This will output all the commands that 
the library will run to stand up any installation. This can be helpful for debugging as well as figuring out what 
configuration options are required to set these tools up.

Furthermore, you can also add any Tyk environment variables to your `.env` file and those variables will be mapped to 
their respective Tyk deployments. 

Example:
```
...
TYK_MDCB_SYNCWORKER_ENABLED=true
TYK_MDCB_SYNCWORKER_HASHKEYS=true
TYK_GW_SLAVEOPTIONS_SYNCHRONISERENABLED=true
```

## Variables
You can add any Tyk environments variables to the `.env` file and they will be mapped to the respective extraEnvs section in the helm charts.

| Variable                    |        Default        | Comments                                                                 |
|-----------------------------|:---------------------:|--------------------------------------------------------------------------|
| TYK_DASHBOARD_VERSION       |       `v4.3.3`        | Dashboard version                                                        |
| TYK_GATEWAY_VERSION         |       `v4.3.3`        | Gateway version                                                          |
| TYK_MDCB_VERSION            |       `v2.1.0`        | MDCB version                                                             |
| TYK_PUMP_VERSION            |       `v1.7.0`        | Pump version                                                             |
| TYK_PORTAL_VERSION          |       `v1.1.0`        | Portal version                                                           |
| TYK_HELM_CHART_PATH         |      `tyk-helm`       | Path to charts, can be a local directory or a helm repo                  |
| USERNAME                    | `default@example.com` | Default password for all the services deployed                           |
| PASSWORD                    |  `topsecretpassword`  | Default password for all the services deployed                           |
| LICENSE                     |                       | Dashboard license                                                        |
| MDCB_LICENSE                |                       | MDCB license                                                             |
| PORTAL_LICENSE              |                       | Portal license                                                           |
| TYK_WORKER_CONNECTIONSTRING |                       | MDCB URL for worker connection                                           |
| TYK_WORKER_ORGID            |                       | Org ID of dashboard user                                                 |
| TYK_WORKER_AUTHTOKEN        |                       | Auth token of dashboard user                                             |
| TYK_WORKER_USESSL           |        `true`         | Set to `true` when the MDCB is serving on a TLS connection               |
| TYK_WORKER_SHARDING_ENABLED |        `false`        | Set to `true` to enable API Sharding                                     |
| TYK_WORKER_SHARDING_TAGS    |                       | API Gateway segmentation tags                                            |
| TYK_WORKER_GW_PORT          |        `8081`         | Set the gateway service port to use                                      |
| GCP_PROJECT                 |                       | The GCP project for terraform authentication on GCP                      |
| CLUSTER_LOCATION            |                       | Cluster location that will be created on AKS, EKS, or GKE                |
| CLUSTER_MACHINE_TYPE        |                       | Machine type for the cluster that will be created on AKS, EKS, or GKE    |
| CLUSTER_NODE_COUNT          |                       | Number of nodes for the cluster that will be created on AKS, EKS, or GKE |