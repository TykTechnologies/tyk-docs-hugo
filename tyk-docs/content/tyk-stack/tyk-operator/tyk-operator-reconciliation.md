This page describes what is meant by Reconciliation in Tyk Operator. We will go over some Kubernetes concepts and then explain how reconciliation happens in Tyk Operator.

# Controllers & Operators
In Kubernetes, controllers watch one or more Kubernetes resources, which can be built-in types like Deployments or custom resources like ApiDefinition - in this case, we refer to Controller as Operator. The purpose of a controller is to match the desired state by using Kubernetes APIs and external APIs.

A Kubernetes operator is an application-specific controller that extends the functionality of the Kubernetes API to create, configure, and manage instances of complex applications on behalf of a Kubernetes user.

# Desired State vs Observed State
Let’s start with the Desired State. It is defined through Kubernetes Manifests, most likely YAML or JSON, to describe what you want your system to be in. Controllers will watch the resources and try to match the actual state (the observed state) with the desired state for Kubernetes Objects. For example, you may want to create a Deployment that is intended to run three replicas. So, you can define this desired state in the manifests, and Controllers will perform necessary operations to make it happen.

How about Observed State? Although the details of the observed state may change controller by controller, usually controllers update the status field of Kubernetes objects to store the observed state. For example, in Tyk Operator, we update the status to include API_ID. So that Tyk Operator can understand that the object was successfully created on Tyk.

# Reconciliation
Reconciliation is a special design paradigm used in Kubernetes controllers. Tyk Operator also uses the same paradigm, which is responsible for keeping our Kubernetes objects in sync with the underlying external APIs - which is Tyk in our case. 

## When would reconciliation happen?
Before diving into Tyk Operator reconciliation, let me briefly mention some technical details about how and when reconciliation happens. Reconciliation only happens when certain events happen on your cluster or objects. Therefore, Reconciliation will NOT be triggered when there is an update or modification on Tyk’s side. It only watches certain Kubernetes events and is triggered based on them. Usually, the reconciliation happens when you modify a Kubernetes object or when the cache used by the controller expires - side note, controllers, in general, use cached objects to decrease the load in the Kube API server. Typically, caches expire in ~10 hours or so but the expiration time might change based on Operator configurations.
So, in order to trigger Reconciliation, you can either
modify an object, which will trigger reconciliation over this modified object or,
restart Tyk Operator pod, which will trigger reconciliation over each of the objects watched by Tyk Operator.

## What happens during Reconciliation?
Tyk Operator will compare desired state of the Kubernetes object with the observed state in Tyk. If there are drift, Tyk Operator will update the actual state on Tyk with the desired state. In the reconciliation, we mainly control three operations; DELETE, CREATE, and UPDATE.
CREATE - an object is created in Kubernetes but not exist in Tye
UPDATE - an object is in different in Kubernetes and Tyk (we compute that by hash)
DELETE - an object is deleted in Kubernetes but exist in Tyk

## Drift Detection
If human operators or any other system delete or modify ApiDefinition from Tyk Gateway or Dashboard, Tyk Operator will restore the desired state back to Tyk during reconciliation. This is called Drift Detection. It can protect your systems from unauthorised or accidental modifications. It is a best practice to limit user access rights on Production to Read-Only to prevent accidental updates through API Manager directly.
