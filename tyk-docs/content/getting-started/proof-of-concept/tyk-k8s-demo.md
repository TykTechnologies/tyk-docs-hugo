---
Title: Kube POC
tags: ["Tyk Tutorials", "Getting Started", "POC", "Proof of Concept", "k8s", "kubernetes"]
description: "POC Tyk on Kubernetes"
menu:
    main:
        parent: "Proof of Concept"
weight: 2
---

This deployment will bootstrap Tyk and its dependencies in Kubernetes using `helm` and bash magic to get you started.

### Requirements:
- [Helm](https://helm.sh/docs/intro/install/)
- [jq](https://stedolan.github.io/jq/download/)
- [git](https://git-scm.com/downloads)

#### Possible deployments 
- `tyk-pro`: Tyk pro self-managed single region
- `tyk-cp`: Tyk pro self-managed multi region control plane
- `tyk-worker`: Tyk worker gateway, this can connect to Tyk Cloud or a Tyk Control Plane
- `tyk-gateway`: Tyk open source self-managed single region

#### Initial setup
Create `.env` file and update the appropriate fields with your licenses. If you require a trial license you can obtain one 
[here](https://tyk.io/sign-up/). If you are looking to use the `tyk-gateway` deployment only you will not require any licensing
as that is the open source deployment.

```
git clone https://github.com/TykTechnologies/tyk-k8s-demo.git
cd tyk-k8s-demo
cp .env.example .env
```

## Usage
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

### Minikube
If you are using this on Minukube you will need to enable the ingress addon. You do so by running the following: 
```
minikube start
minikube addons enable ingress
minikube addons enable ingress-dns
minikube start
```

## Dependencies Options
### Redis Options
- `redis`: Bitnami Redis deployment
- `redis-cluster`: Bitnami Redis Cluster deployment
- `redis-sentinel`: Bitnami Redis Sentinel deployment

### Storage Options
- `mongo`: Bitnami Mongo database deployment as a Tyk backend
- `postgres`: Bitnami Postgres database deployment as a Tyk backend

### Integrations and examples
- k6-traffic-generator: generates a load of traffic to seed analytical data 
- operator: this deployment option will help you will install the [Tyk Operator](https://github.com/TykTechnologies/tyk-operator) and its dependency [cert-manager](https://github.com/jetstack/cert-manager).
  - operator-httpbin: creates two API example using the tyk-operator with that is protected and one that is not.
  - operator-graphql: creates a set of graphql API examples using the tyk-operator. Federation v1 and stitching examples.
- portal: Tyk's portal deployment will install the [Tyk Enterprise Developer Portal](https://tyk.io/docs/tyk-developer-portal/tyk-enterprise-developer-portal/) as well as its dependency PostgreSQL.
- Pump
  - pump-prometheus: this deployment will stand up a Tyk Prometheus pump with custom analytics that is fed into Grafana for visualization

#### Example
```bash
./up.sh \
  --redis redis-cluster \
  --storage postgres \
  --deployments operator,operator-httpbin,pump-prometheus,k6-traffic-generator \
  --expose port-forward \
  tyk-pro
```

This will take 5-10 minutes as the installation is sequential and the dependencies require a bit of time before they are 
stood up. Once the installation is complete the script will print out a list of all the services that were stood up and 
how those can be accessed. The k6s job will start running after the script is finished and will run in the background 
for 15 minutes to generate traffic over that period of time. To visualize the life traffic in Grafana use the 
credentials provided by the script to access Grafana.
