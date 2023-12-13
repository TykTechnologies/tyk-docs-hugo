---
title: Quick Start in Kubernetes
tags: ["Tyk Tutorials", "Getting Started", "POC", "Proof of Concept", "Tyk PoC", "k8s", "Self Managed", "Open Source", "demo", "Tyk demo", "Tyk quick start", "Kubernetes"]
description: "Learn to deploy and run a Tyk deployment in minutes on Kubernetes"
menu:
    main:
        parent: "Quick Start"
weight: 2
---

## About
The [tyk-k8s-demo](https://github.com/TykTechnologies/tyk-k8s-demo) library allows you to stand up an entire Tyk Stack
with all its dependencies as well as other tools that can integrate with Tyk.
The library will spin up everything in Kubernetes using `helm` and bash magic
to get you started.

## Purpose
Minimize the amount of effort needed to stand up the Tyk infrastructure and
show examples of how Tyk can be setup in k8s using different deployment
architectures as well as different integrations.

## Getting Started

#### Requirements
You will need the following tools to be able to run this library.
- [Kubectl](https://kubernetes.io/docs/tasks/tools/)
- [Helm](https://helm.sh/docs/intro/install/)
- [jq](https://stedolan.github.io/jq/download/)
- [git](https://git-scm.com/downloads)
- [Terraform](https://www.terraform.io/) (only when using `--cloud` flag)

Tested on Linux/Unix based systems on AMD64 and ARM architectures

#### Initial setup
Create `.env` file and update the appropriate fields with your licenses.
If you require a trial license, you can obtain one [here](https://tyk.io/sign-up/).
If you are looking to use the `tyk-gateway` deployment only you will
not require any licensing as that is the open-source deployment.

```
git clone https://github.com/TykTechnologies/tyk-k8s-demo.git
cd tyk-k8s-demo
cp .env.example .env
```

Depending on the deployments you would like install set values of the
`LICENSE`, `MDCB_LICENSE` and `PORTAL_LICENSE` inside the `.env` file.

### Minikube
If you are deploying this on Minikube, you will need to enable the ingress
addon. You do so by running the following:
```
minikube start
minikube addons enable ingress
```

## Quick Start

```console
./up.sh --deployments portal,operator-httpbin tyk-stack
```
This quick start command will stand up the entire Tyk stack along with the
Tyk Enterprise Portal and the Tyk Operator and httpbin CRD example.

## Possible deployments
- `tyk-stack`: Tyk single region self-managed deployment
- `tyk-cp`: Tyk self-managed multi region control plane (Will be available in Q1 2024 with new Tyk Charts, please use the [v2 tag](https://github.com/TykTechnologies/tyk-k8s-demo/tree/v2) if you would like to deploy this.)
- `tyk-dp`: Tyk self-managed data plane, this can connect to Tyk Cloud or a Tyk Control Plane
- `tyk-gateway`: Tyk oss self-managed single region

## Dependencies Options
### Redis Options
- `redis`: Bitnami Redis deployment
- `redis-cluster`: Bitnami Redis Cluster deployment
- `redis-sentinel`: Bitnami Redis Sentinel deployment

### Storage Options
- `mongo`: Bitnami Mongo database deployment as a Tyk backend
- `postgres`: Bitnami Postgres database deployment as a Tyk backend

### Supplementary Deployments
Please see this [page](https://github.com/TykTechnologies/tyk-k8s-demo/tree/v3/docs/FEATURES_MATRIX.md) for Tyk deployments compatibility charts.
- [cert-manager](https://github.com/TykTechnologies/tyk-k8s-demo/tree/v3/src/deployments/cert-manager): deploys cert-manager.
- [datadog](https://github.com/TykTechnologies/tyk-k8s-demo/tree/v3/src/deployments/datadog): deploys Datadog agent and stands up a Tyk pump to push analytics data from the Tyk platform to Datadog. It will also create a Datadog dashboard for you to view the analytics.
- [elasticsearch](https://github.com/TykTechnologies/tyk-k8s-demo/tree/v3/src/deployments/elasticsearch): deploys Elasticsearch and stands up a Tyk pump to push analytics data from the Tyk platform to Elasticsearch.
  - [elasticsearch-kibana](https://github.com/TykTechnologies/tyk-k8s-demo/tree/v3/src/deployments/elasticsearch-kibana): deploys the Elasticsearch deployment as well as a Kibana deployment and creates a Kibana dashboard for you to view the analytics.
- [Jaeger](https://github.com/TykTechnologies/tyk-k8s-demo/tree/v3/src/deployments/jaeger): deploys the Jaeger operator, a Jaeger instance, and the OpenTelemetry collector and configures the Tyk deployment to send telemetry data to Jaeger through the OpenTelemetry collector.
- [k6](https://github.com/TykTechnologies/tyk-k8s-demo/tree/v3/src/deployments/k6): deploys a Grafana K6 Operator.
  - [k6-slo-traffic](https://github.com/TykTechnologies/tyk-k8s-demo/tree/v3/src/deployments/k6-slo-traffic): deploys a k6 CRD to generate a load of traffic to seed analytics data.
- [keycloak](https://github.com/TykTechnologies/tyk-k8s-demo/tree/v3/src/deployments/keycloak): deploys the Keycloak Operator and a Keycloak instance.
  - [keycloak-dcr](https://github.com/TykTechnologies/tyk-k8s-demo/tree/v3/src/deployments/keycloak-dcr): stands up a Keycloak Dynamic Client Registration example.
  - [keycloak-jwt](https://github.com/TykTechnologies/tyk-k8s-demo/tree/v3/src/deployments/keycloak-jwt): stands up a Keycloak JWT Authentication example with Tyk.
  - [keycloak-sso](https://github.com/TykTechnologies/tyk-k8s-demo/tree/v3/src/deployments/keycloak-sso): stands up a Keycloak SSO example with the Tyk dashboard.
- [operator](https://github.com/TykTechnologies/tyk-k8s-demo/tree/v3/src/deployments/operator): deploys the [Tyk Operator](https://github.com/TykTechnologies/tyk-operator) and its dependency [cert-manager](https://github.com/jetstack/cert-manager).
  - [operator-federation](https://github.com/TykTechnologies/tyk-k8s-demo/tree/v3/src/deployments/operator-federation): stands up a Federation v1 API examples using the tyk-operator.
  - [operator-graphql](https://github.com/TykTechnologies/tyk-k8s-demo/tree/v3/src/deployments/operator-graphql): stands up a GraphQL API examples using the tyk-operator.
  - [operator-httpbin](https://github.com/TykTechnologies/tyk-k8s-demo/tree/v3/src/deployments/operator-httpbin): stands up an API examples using the tyk-operator.
  - [operator-jwt-hmac](https://github.com/TykTechnologies/tyk-k8s-demo/tree/v3/src/deployments/operator-jwt-hmac): stands up an API examples using the tyk-operator to demonstrate JWT HMAC auth.
  - [operator-udg](https://github.com/TykTechnologies/tyk-k8s-demo/tree/v3/src/deployments/operator-udg): stands up a Universal Data Graph API examples using the tyk-operator.
- [portal](https://github.com/TykTechnologies/tyk-k8s-demo/tree/v3/src/deployments/portal): deploys the [Tyk Enterprise Developer Portal](https://tyk.io/docs/tyk-developer-portal/tyk-enterprise-developer-portal/) as well as its dependency PostgreSQL.
- [prometheus](https://github.com/TykTechnologies/tyk-k8s-demo/tree/v3/src/deployments/prometheus): deploys Prometheus and stands up a Tyk pump to push analytics data from the Tyk platform to Prometheus.
  - [prometheus-grafana](https://github.com/TykTechnologies/tyk-k8s-demo/tree/v3/src/deployments/prometheus-grafana): deploys the Prometheus deployment as well as a Grafana deployment and creates a Grafana dashboard for you to view the analytics.
- [vault](https://github.com/TykTechnologies/tyk-k8s-demo/tree/v3/src/deployments/vault): deploys Vault Operator and a Vault instance.

If you are running a POC and would like an example of how to integrate a
specific tool. Please submit a request through the repository [here](https://github.com/TykTechnologies/tyk-k8s-demo/issues).

### Example
```console
./up.sh \
  --storage postgres \
  --deployments prometheus-grafana,k6-slo-traffic \
  tyk-stack
```

The deployment will take 10 minutes as the installation is sequential and the
dependencies require a bit of time before they are stood up. Once the
installation is complete, the script will print out a list of all the services
that were stood up and how those can be accessed. The k6 job will start running
after the script is finished and will run in the background for 15 minutes to
generate traffic over that period of time. To visualize the live traffic, you
can use the credentials provided by the script to access Grafana or the Tyk
Dashboard.

## Usage

### Start Tyk deployment
Create and start up the deployments

```console
Usage:
./up.sh [flags] [command]

Available Commands:
tyk-stack
tyk-cp
tyk-dp
tyk-gateway

Flags:
-v, --verbose         bool     set log level to debug
--dry-run         bool     set the execution mode to dry run. This will dump the kubectl and helm commands rather than execute them
-n, --namespace       string   namespace the tyk stack will be installed in, defaults to 'tyk'
-f, --flavor          enum     k8s environment flavor. This option can be set 'openshift' and defaults to 'vanilla'
-e, --expose          enum     set this option to 'port-forward' to expose the services as port-forwards or to 'load-balancer' to expose the services as load balancers or 'ingress' which exposes services as a k8s ingress object
-r, --redis           enum     the redis mode that tyk stack will use. This option can be set 'redis', 'redis-sentinel' and defaults to 'redis-cluster'
-s, --storage         enum     database the tyk stack will use. This option can be set 'postgres' and defaults to 'mongo'
-d, --deployments     string   comma separated list of deployments to launch
-c, --cloud           enum     stand up k8s infrastructure in 'aws', 'gcp' or 'azure'. This will require Terraform and the CLIs associate with the cloud of choice
-l, --ssl             bool     enable ssl on deployments
```

### Stop Tyk deployment
Shutdown deployment

```console
Usage:
  ./down.sh [flags]

Flags:
  -v, --verbose         bool     set log level to debug
  -n, --namespace       string   namespace the tyk stack will be installed in, defaults to 'tyk'
  -p, --ports           bool     disconnect port connections only
  -c, --cloud           enum     tear down k8s cluster stood up
```

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
tool with Tyk, you can run the library with the `--dry-run` and `--verbose` flags. This will output all the commands that
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
The script has defaults for minimal settings in [this env file](https://github.com/TykTechnologies/tyk-k8s-demo/blob/v3/.env.example),
and it will give errors if something is missing.
You can also add or change any Tyk environments variables in the `.env` file,
and they will be mapped to the respective `extraEnvs` section in the helm charts.

| Variable                             |        Default        | Comments                                                                                                        |
|--------------------------------------|:---------------------:|-----------------------------------------------------------------------------------------------------------------|
| DASHBOARD_VERSION                    |        `v5.2`         | Dashboard version                                                                                               |
| GATEWAY_VERSION                      |        `v5.2`         | Gateway version                                                                                                 |
| MDCB_VERSION                         |        `v2.3`         | MDCB version                                                                                                    |
| PUMP_VERSION                         |        `v1.8`         | Pump version                                                                                                    |
| PORTAL_VERSION                       |        `v1.8`         | Portal version                                                                                                  |
| TYK_HELM_CHART_PATH                  |      `tyk-helm`       | Path to charts, can be a local directory or a helm repo                                                         |
| TYK_USERNAME                         | `default@example.com` | Default password for all the services deployed                                                                  |
| TYK_PASSWORD                         |  `topsecretpassword`  | Default password for all the services deployed                                                                  |
| LICENSE                              |                       | Dashboard license                                                                                               |
| MDCB_LICENSE                         |                       | MDCB license                                                                                                    |
| PORTAL_LICENSE                       |                       | Portal license                                                                                                  |
| TYK_WORKER_CONNECTIONSTRING          |                       | MDCB URL for worker connection                                                                                  |
| TYK_WORKER_ORGID                     |                       | Org ID of dashboard user                                                                                        |
| TYK_WORKER_AUTHTOKEN                 |                       | Auth token of dashboard user                                                                                    |
| TYK_WORKER_USESSL                    |        `true`         | Set to `true` when the MDCB is serving on a TLS connection                                                      |
| TYK_WORKER_SHARDING_ENABLED          |        `false`        | Set to `true` to enable API Sharding                                                                            |
| TYK_WORKER_SHARDING_TAGS             |                       | API Gateway segmentation tags                                                                                   |
| TYK_WORKER_GW_PORT                   |        `8081`         | Set the gateway service port to use                                                                             |
| TYK_WORKER_OPERATOR_CONNECTIONSTRING |                       | Set the dashboard URL for the operator to be able manage APIs and Policies                                      |
| DATADOG_APIKEY                       |                       | Datadog API key                                                                                                 |
| DATADOG_APPKEY                       |                       | Datadog Application key. This is used to create a dashboard and create a pipeline for the Tyk logs              |
| DATADOG_SITE                         |    `datadoghq.com`    | Datadog site. Change to `datadoghq.eu` if using the european site                                               |
| GCP_PROJECT                          |                       | The GCP project for terraform authentication on GCP                                                             |
| CLUSTER_LOCATION                     |                       | Cluster location that will be created on AKS, EKS, or GKE                                                       |
| CLUSTER_MACHINE_TYPE                 |                       | Machine type for the cluster that will be created on AKS, EKS, or GKE                                           |
| CLUSTER_NODE_COUNT                   |                       | Number of nodes for the cluster that will be created on AKS, EKS, or GKE                                        |
| INGRESS_CLASSNAME                    |        `nginx`        | The ingress classname to be used to associate the k8s ingress objects with the ingress controller/load balancer |
