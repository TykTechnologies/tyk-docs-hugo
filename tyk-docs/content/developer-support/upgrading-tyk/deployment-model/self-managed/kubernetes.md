---
title: "Upgrade Tyk on Kubernetes"
date: 2024-05-13
tags: ["Upgrade Kuebernetes", "Kubernetes", "upgrade"]
description: "Explains how to upgrade Tyk on Kubernetes"
---

After reviewing guidelines for [preparing for upgrade]({{< ref "developer-support/upgrading-tyk/preparations/upgrade-guidelines" >}}),
follow the instructions below to upgrade your Tyk components and plugins.

**Upgrade order:**
Please note that upgrade order is as explained in the upgrade [overview]({{< ref "developer-support/upgrading-tyk/deployment-model/self-managed/overview" >}})

</br>

{{< note success >}}
**Upgrade instructions for *Tyk Dashboard*, *Tyk Pump* and *MDCB***

The instruction below refer to upgrading *Tyk Gateway*. You can follow the same steps for *Tyk Dashboard*, *Tyk Pump*
and *MDCB*.

{{< /note >}}


## Simple Kubernetes Environment Upgrade

When upgrading a non-production environment, where it's okay to have a brief downtime and you can simply restart your
gateways, the upgrade is trivial as with any other image you want to upgrade in Kubernetes:

In a similar way to docker:
1. Backup your gateway config file (`tyk.conf` or the name you chose for it)
2. Update the image version in the manifest file.
3. Apply the file/s using kubectl

```console
$ kubectl apply -f .
``` 
You will see that the deployment has changed.

Now you can check the gateway pod to see the latest events (do `kubectl get pods` to get the pod name):
    
```console
$ kubectl describe pods <gateway pod name>
```
You should see that the image was pulled, the container got created and the gateway started running again, similar to the following output:

```bash
Events:
  Type    Reason     Age   From               Message
  ----    ------     ----  ----               -------
  Normal  Scheduled  118s  default-scheduler  Successfully assigned tyk/tyk-gtw-89dc9f554-5487c to docker-desktop
  Normal  Pulling    117s  kubelet            Pulling image "tykio/tyk-gateway:v5.0"
  Normal  Pulled     70s   kubelet            Successfully pulled image "tykio/tyk-gateway:v5.0" in 47.245940479s
  Normal  Created    70s   kubelet            Created container tyk-gtw
  Normal  Started    70s   kubelet            Started container tyk-gtw
```

4. Check the log to see that the new version is used and if the gateway is up and running
```console
$ kubectl logs service/gateway-svc-tyk-gateway-tyk-headless --tail=100 --follow 
Defaulted container "gateway-tyk-headless" out of: gateway-tyk-headless, setup-directories (init)
time="Jul 17 20:58:27" level=info msg="Tyk API Gateway 5.1.0" prefix=main
...
```
5. Check the gateway is healthy
```console
$ curl  localhost:8080/hello | jq .
{
  "status": "pass",
  "version": "5.1.0",
  "description": "Tyk GW",
  "details": {
    "redis": {
      "status": "pass",
      "componentType": "datastore",
      "time": "2023-07-17T21:07:27Z"
    }
  }
}
```

## Upgrade Tyk K8S Demo deployment

1. In the [Tyk k8s Demo](https://github.com/TykTechnologies/tyk-k8s-demo/blob/main/README.md) repo, change the version in [.env file](https://github.com/TykTechnologies/tyk-k8s-demo/blob/893ce2ac8b13b4de600003cfb1d3d8d1625125c3/.env.example#L2), `GATEWAY_VERSION=v5.1` to the version you want
2. Restart the deployment
3. Check the log file