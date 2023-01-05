---
Title: Kubernetes POC
tags: ["Tyk Tutorials", "Getting Started", "POC", "Proof of Concept", "k8s", "kubernetes"]
description: "POC Tyk on Kubernetes"
menu:
    main:
        parent: "Proof of Concept"
weight: 2
---

The [tyk-k8s-demo](https://github.com/TykTechnologies/tyk-k8s-demo) library allows you stand up an entire Tyk Stack with 
all its dependencies as well as other tooling that can integrate with Tyk. The library will spin up everything in 
Kubernetes using `helm` and bash magic to get you started.

## Getting Started

### Requirements:
You will need the following tools to be able to run this library. 
- [Helm](https://helm.sh/docs/intro/install/)
- [jq](https://stedolan.github.io/jq/download/)
- [git](https://git-scm.com/downloads)

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

### Minikube
If you are deploying this on Minukube you will need to enable the ingress addon. You do so by running the following:
```console
minikube start
minikube addons enable ingress
minikube addons enable ingress-dns
minikube start
```

## Usage

### Start Tyk deployment
Create and start up the containers and the Tyk deployment
```console
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
  -e, --expose      	enum   	 set this option to 'port-forward' to expose the services as port-forwards or to 'load-balancer' to expose the services as load balancers or 'ingress' which exposes services as a k8s ingress object.
  -r, --redis       	enum   	 the redis mode that tyk stack will use. This option can be set 'redis-cluster', 'redis-sentinel' and defaults to 'redis'
  -s, --storage     	enum   	 database the tyk stack will use. This option can be set 'postgres' and defaults to 'mongo'
  -d, --deployments 	string 	 comma separated list of deployments to launch
```

```
Usage:
  ./down.sh [flags]

Flags:
  -v, --verbose   	bool   	 set log level to debug
  -n, --namespace 	string 	 namespace the tyk stack will be installed in, defaults to 'tyk'
  -p, --ports     	bool   	 disconnect port connections only
```

## Tyk Dependencies Options
Tyk requires Redis for all its deployments and PostgreSQL or MongoDB for the `tyk-pro` and `tyk-cp` deployments. This 
library will allow you to choose between the different options by setting the `--redis` and `--storage` flags to specify 
you preference.

### Redis Options
- `redis`: Bitnami Redis deployment
- `redis-cluster`: Bitnami Redis Cluster deployment
- `redis-sentinel`: Bitnami Redis Sentinel deployment

### Storage Options
- `mongo`: Bitnami Mongo database deployment as a Tyk backend
- `postgres`: Bitnami Postgres database deployment as a Tyk backend

## Supplementary Deployments
These options can be specified using the `--deployments` flag and will yield the following:
- `k6-traffic-generator`: generates a load of traffic to seed analytical data 
- `operator`: this deployment option will help you will install the [Tyk Operator](https://github.com/TykTechnologies/tyk-operator) and its dependency [cert-manager](https://github.com/jetstack/cert-manager).
  - `operator-httpbin`: creates two API example using the tyk-operator with that is protected and one that is not.
  - `operator-graphql`: creates a set of graphql API examples using the tyk-operator. Federation v1 and stitching examples.
- `portal`: Tyk's portal deployment will install the [Tyk Enterprise Developer Portal](https://tyk.io/docs/tyk-developer-portal/tyk-enterprise-developer-portal/) as well as its dependency PostgreSQL.
- Pump
  - `pump-prometheus`: this deployment will stand up a Tyk Prometheus pump with custom analytics that is fed into Grafana for visualization

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

The deployment will take 10 minutes as the installation is sequential and the dependencies require a bit of time before 
they are stood up. Once the installation is complete the script will print out a list of all the services that were 
stood up and how those can be accessed. The k6s job will start running after the script is finished and will run in the 
background for 15 minutes to generate traffic over that period of time. To visualize the live traffic you can use the 
credentials provided by the script to access Grafana or the Tyk Dashboard.

## Customization
This library can also act as a guide to help you get set up with Tyk. If you just want to know how to set up a specific 
tool with Tyk you can run the library with the `--dry-run` and `--verbose` flags. This will output all the commands that 
the library will run to accomplish any installation. This can be helpful for debugging as well as figuring out what 
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
