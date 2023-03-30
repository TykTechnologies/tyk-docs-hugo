---
date: 2017-03-27T16:30:52+01:00
title: Add Custom Certificates to Trusted Storage of Docker Images
menu:
  main:
    parent: "Frequently Asked Questions"
weight: 0 
---

To add your custom Certificate Authority(CA) to your docker containers. You can mount your CA certificate directly into `/etc/ssl/certs` folder.

Docker: 
```{.copyWrapper}
docker run -it tykio/tyk-gateway:latest \
 -v $(pwd)/myCA.pem:/etc/ssl/certs/myCA.pem
```

Kubernetes - using Helm Chart and secrets:
```yaml
   extraVolumes: 
     - name: self-signed-ca
       secret:
         secretName: self-signed-ca-secret
   extraVolumeMounts: 
     - name: self-signed-ca
       mountPath: "/etc/ssl/certs/myCA.pem"
       subPath: myCA.pem
```

Contact us to learn more:

{{< button_left href="https://tyk.io/contact/" color="green" content="Contact us" >}}
