## Overview
As described previously, Acme Global Bank has operations and customers in both the EU and USA.

To decrease the latency in response from their systems and to ensure that data remains in the same legal jurisdiction as the customers (data residency), they have deployed backend (or, from the perspective of the API gateway, “upstream”) services in two data centres: one in the US, the other in the EU.

Without MDCB, Acme Global Bank would deploy a Tyk Gateway cluster in each data centre and then have the operational inconvenience of maintaining two separate instances of Tyk Dashboard to configure, secure and publish the APIs.

By deploying an MDCB Controller, however, they are able to centralise the management of their API Gateways and gain resilience against failure of different elements of the deployment - worker gateways or control plane - improving availability of their public APIs.

In this example we will show you how to create the Acme Global Bank deployment using our example Helm charts.

<img width="1080" alt="MDCB-Acme-Global-Bank" src="https://user-images.githubusercontent.com/99968932/208972784-88627d78-dbcf-42dc-82d6-4a454a714eaa.png">

---

## Step-by-step instructions to deploy the Acme Global Bank scenario with Kubernetes in a public cloud (here we’ve used Google Cloud Platform):

### Pre-requisites and configuration

1. What you need to install/set-up
- Tyk Pro licence (Dashboard and MDCB keys - obtained from Tyk)
- Access to a cloud account of your choice, e.g. GCP
- You need to grab this Tyk Demo repository: [GitHub - TykTechnologies/tyk-k8s-demo](https://github.com/TykTechnologies/tyk-k8s-demo)
- You need to install `helm`, `jq`, `kubectl` and `watch`

2. To configure GCP
 - Create a cluster
 - Install the Google Cloud SDK
    - install `gcloud`
    - `./google-cloud-sdk/install.sh`
 - Configure the Google Cloud SDK to access your cluster
    - `gcloud auth login`
    - `gcloud components install gke-gcloud-auth-plugin`
    - `gcloud container clusters get-credentials <<gcp_cluster_name>> —zone <<zone_from_gcp_cluster>>—project <<gcp_project_name>>`
 - Verify that everything is connected using `kubectl`
    - `kubectl get nodes`

3. You need to configure the Tyk build
 - Create a `.env` file within tyk-k8s-demo based on the provided `.env.example` file
 - Add the Tyk licence keys to your `.env`:
    - `LICENSE=<dashboard_licence>`
    - `MDCB_LICENSE=<mdcb_licence>`

### Deploy Tyk Stack into Management and Worker clusters

1. Create the Tyk Control Plane (Management cluster)
  - `./up.sh -r redis-cluster -e load-balancer tyk-cp`

![tyk-cp](https://user-images.githubusercontent.com/99968932/209101014-ae0fbceb-15c7-4c31-bbaa-5179acca2197.png)\
*Deploying the Tyk Management cluster (Control Plane)*

2. Create two Tyk Worker Clusters to represent Acme Global Bank’s US and EU operations using the command provided in the output from the `./up.sh` script:
 - `TYK_WORKER_CONNECTIONSTRING=<MDCB-exposure-address:port> TYK_WORKER_ORGID=<org_id> TYK_WORKER_AUTHTOKEN=<mdcb_auth_token> TYK_WORKER_USESSL=false ./up.sh --namespace <worker-namespace> tyk-worker`

  Note that you need to run the same command twice, once setting `<worker-namespace>` to `tyk-worker-us`, the other to `tyk-worker-eu` (or namespaces of your choice)
  
![tyk-worker-us](https://user-images.githubusercontent.com/99968932/209101074-a07913a0-77f6-46a1-bb22-c85eee739e48.png)   
*Deploying the `tyk-worker-us` cluster (Worker)*

![tyk-worker-eu](https://user-images.githubusercontent.com/99968932/209101169-cbd0de98-765d-4c45-a703-cbad2bbc627e.png)  
*Deploying the `tyk-worker-eu` cluster (Worker)*

3. Verify and observe Tyk Control Plane and Workers
 - Use `curl` to verify that the gateways are alive by calling their `/hello` endpoints

![gw-hello-check](https://user-images.githubusercontent.com/99968932/209101287-7c8a8778-8a05-45ef-aeb1-69c4cbec1baa.png)

 - You can use `watch` to observe each of the clusters (namespaces)

![watch-tyk-cp](https://user-images.githubusercontent.com/99968932/209101397-f1c6dbc8-13b2-4c6b-8176-d5961345dd16.png)  
*Tyk Management cluster (Control Plane)*

![watch-tyk-worker-us](https://user-images.githubusercontent.com/99968932/209101611-54ad25af-b3cb-472c-b2e5-1ad9ea2f2314.png)  
*`tyk-worker-us` cluster (Worker)*

![watch-tyk-worker-eu](https://user-images.githubusercontent.com/99968932/209101701-b7f11cff-7e9b-4e52-b903-29834431bc89.png)  
*`tyk-worker-eu` cluster (Worker)*


### Testing the deployment to prove the concept
As you know, the Tyk Multi Data Centre Bridge provides a link from the Control Plane to the Worker gateways, so that we can control all the remote gateways from a single dashboard.

1. Access the Tyk Dashboard
 - You can log into the dashboard at the external IP address reported in the watch window for the controller cluster - in this example it’s at `34.136.51.227:3000`, so just enter this in your browser

![tyk-dash](https://user-images.githubusercontent.com/99968932/209101736-b5106acf-ac76-4984-9939-0188b05abad7.png)

   The user name and password are provided in the ./up.sh output:
    - username: `default@example.com`
    - password: `topsecretpassword` (or whatever you’ve configured in the `.env` file)

2. Create an API in the dashboard, but don’t secure it (set it to `Open - keyless`); for simplicity we suggest a simple pass-through proxy to `httbin.org`.
3. MDCB will propagate this API through to the workers - so try hitting that endpoint on the two worker gateways (their addresses are given in the watch windows - for example `34.173.240.149:8081` for my `tyk-worker-us` gateway above).
4. Now secure the API from the dashboard using the Authentication Token option. You’ll need to set a policy for the API and create a key.
5. If you try to hit the API from the workers, you’ll find that the request is now rejected - so go ahead and add the Authentication key to the request header… and now you reach `httpbin.org` again. You can see in the Dashboard’s API Usage Data section that there will have been success and error requests to the API.
6. OK, so that’s pretty basic stuff, let’s show what MDCB is actually doing for you… reset the API authentication to be `Open - keyless` and confirm that you can hit the endpoint without the Authentication key from both workers.
7. Next we’re going to experience an MDCB outage - by deleting its deployment in Kubernetes:
 - `kubectl delete deployment.apps/mdcb-tyk-cp-tyk-pro -n tyk`
8. This has broken the link between the controller and the workers… but try hitting the API endpoint and you’ll see that the workers continue regardless, serving your users' requests.
9. Back on the Tyk Dashboard make some changes - for example, re-enable Authentication on your API, add a second API. Verify that these changes **do not** propagate through to the workers.
10. Now we’ll bring MDCB back online with this command:
 - `./up.sh -r redis-cluster -e load-balancer tyk-cp`
11. Now try hitting the original API endpoint from the workers - you’ll find that you need the Authorisation key again.
12. Now try hitting the new API endpoint - this will also have automatically been propagated out to the workers when MDCB came back up and so is now available for your users to consume.

Pretty cool, huh?

There’s a lot more that you could do - for example by deploying real APIs (after all, this is a real Tyk deployment) and configuring different Organisation Ids for each worker to control which APIs propagate to which workers (allowing you to ensure data localisation, as required by the Acme Global Bank).

### Closing everything down
We’ve provided a simple script to tear down the demo as follows:
1. `./down.sh -n tyk-worker-us`
2. `/down.sh -n tyk-worker-eu`
3. `/down.sh`

Don’t forget to tear down your clusters in GCP if you no longer need them!

---

Next Steps
 - [Advanced MDCB]({{< ref "/tyk-stack/tyk-multi-data-centre/advanced-mdcb/advanced-mdcb.md" >}})
 - [MDCB reference guide]({{< ref "/tyk-stack/tyk-multi-data-centre/mdcb-configuration-options.md" >}})
 - [MDCB Troubleshooting and FAQ]({{< ref "/troubleshooting/tyk-multi-cloud/tyk-multi-cloud.md" >}})
