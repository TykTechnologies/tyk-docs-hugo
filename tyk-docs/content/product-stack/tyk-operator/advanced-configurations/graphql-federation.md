---
title: "GraphQL Federation with Tyk Operator"
date: 2024-06-25
tags: ["Tyk Operator", "GraphQL Federation", "Kubernetes"]
description: ""
---

Tyk, with release *v4.0* offers [GraphQL federation]({{<ref "getting-started/key-concepts/graphql-federation#federation-version-support">}}) that allows you to divide GraphQL implementation across multiple back-end
services, while still exposing them all as a single graph for the consumers.

Tyk Operator supports GraphQL Federation subgraph and supergraph with following Custom Resources.

## Custom Resources

GraphQL Federation uses concepts of Subgraph and Supergraph.

**Subgraph** is a representation of a back-end service and defines a distinct GraphQL schema. It can be queried directly as a separate service or it can be federated into a larger schema of a supergraph.

**Supergraph** is a composition of several subgraphs that allows the execution of a query across multiple services in the backend.

Tyk Operator uses Custom Resources called [SubGraph](#subgraph) and [SuperGraph](#supergraph), that allows users to model the relationship between Subgraphs and Supergraphs.

### SubGraph

```yaml
apiVersion: tyk.tyk.io/v1alpha1
kind: SubGraph
metadata:
  name: users-subgraph
spec:
  schema: |
    <Schema of your SubGraph>
  sdl: |
    <SDL of the SubGraph>
```

SubGraph Custom Resource Definitions (CRD) takes `schema` and `sdl` values for your subgraph. 

To create a Subgraph API in Tyk, you can reference the subgraph's metadata name through `graphql.graph_ref` field, as follows:

```yaml
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: subgraph-api
spec:
  name: Federation - Subgraph
  ... 
  graphql:
    enabled: true
    execution_mode: subgraph
    graph_ref: users-subgraph ## corresponds to Subgraph resource's metadata name
    version: "2"
    playground:
      enabled: false
      path: ""
  proxy:
    target_url: http://users.default.svc:4001/query
    listen_path: /users-subgraph/
    disable_strip_slash: true
```

An ApiDefinition must adhere to the following rules in order to represent an ApiDefinition for your SubGraph CRDs.

1. ApiDefinition and SubGraph must be in the same namespace,
2. `graphql.execution_mode` must be set to `subgraph`,
3. `graphql.graph_ref` must be set to the metdata name of the SubGraph resource that you would like to refer.

### SuperGraph

```yaml
apiVersion: tyk.tyk.io/v1alpha1
kind: SuperGraph
metadata:
  name: social-media-supergraph
spec:
  subgraph_refs:
    - name: users-subgraph
      namespace: default
  schema: |-
    <Schema of your Supergraph>
```

SuperGraph CRD takes `subgraph_refs` and `schema` values for your supergraph. `subgraph_refs` is an array of SubGraph Custom Resource(CR) references which expects the name and namespace of the referenced subgraph. If `namespace` is not specified, Operator will check SubGraphs in the current namespace.

Tyk Operator will update your SuperGraph ApiDefinition when one of the subgraphs that you reference in `subgraph_refs` changes.

To create a SuperGraph API in Tyk, you can reference the supergraph's metadata name through `graphql.graph_ref field`, as follows:

```yaml
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: federation-supergraph
spec:
  name: Federated - Social Media APIS
  ...
  graphql:
    execution_mode: supergraph
    graph_ref: social-media-supergraph ## corresponds to SuperGraph resource's metadata name
    enabled: true
    version: "2"
    playground:
      enabled: true
      path: /playground
  proxy:
    target_url: ""
    strip_listen_path: true
    listen_path: /social-media-apis-federated/
```

An ApiDefinition must adhere to the following rules in order to represent an ApiDefinition for your SuperGraph CRDs.

1. ApiDefinition and SuperGraph must be in the same namespace,
2. `graphql.execution_mode` must be set to `supergraph`,
3. `graphql.graph_ref` must be set to the metdata name of the SuperGraph resource that you would like to refer.

## Propagating updates from Subgraph CRD to Subgraph API and Supergraph APIs

Tyk Operator will automatically propagate changes in SubGraph CRD to the corresponding Subgraph ApiDefinition. Also, if the SubGraph is referenced by a SuperGraph, the corresponding SuperGraph CR and corresponding supergraph ApiDefinition will be updated too.

Therefore, once you make an update on SubGraph CR, you do not need to update your supergraph. It will be updated by Tyk Operator. With this approach, multiple teams can work on SubGraph CRDs and Tyk Operator will update the relevant SuperGraph ApiDefinition.

### Example

Let's assume that a developer responsible for the [Users SubGraph](#users-subgraph) would like to delete `username` field from the Users SubGraph.
Also, the [Supergraph](#supergraph-1) called Social Media already uses the Users Subgraph.

To achieve this, the developer should update the Users SubGraph CRD. Once the SubGraph CRD is updated, Tyk Operator will:
1. Update Users SubGraph CRD,
2. Update Social Media Supergraph ApiDefinition since it is referencing the Users SubGraph CRD.

## Deleting SubGraph

### SubGraph without any reference

If the subgraph is not referenced in any ApiDefinition CRD or SuperGraph CRD, it is easy to delete SubGraph CRDs as follows:
```bash
kubectl delete subgraphs.tyk.tyk.io <SUBGRAPH_NAME>
```

### SubGraph referenced in ApiDefinition

If you have a subgraph which is referenced in any ApiDefinition, Tyk Operator will not delete the SubGraph.

In order to delete this subgraph, the corresponding ApiDefinition CR must be updated, such that it has no reference to the
subgraph in `graph_ref` field.

### SubGraph referenced in SuperGraph

Although the subgraph is not referenced in any ApiDefinition, if it is referenced in the SuperGraph, Tyk Operator will
not delete the subgraph again.

In order to delete this subgraph, SuperGraph CR should not have reference to corresponding subgraph in the `subgraph_ref`.

## Deleting SuperGraph

### SuperGraph without any reference
If the supergraph is not referenced in any ApiDefinition CRD, it can be deleted as follows:

```bash
kubectl delete supergraphs.tyk.tyk.io <SUPERGRAPH_NAME>
```

### SuperGraph referenced in ApiDefinition
If a supergraph is referenced in any ApiDefinition, the Tyk Operator will not delete the SuperGraph CRD.

In order to delete this supergraph, the ApiDefinition that has a reference to the supergraph must de-reference the supergraph
or be deleted.

## Example Manifests

### Users Subgraph

```yaml
# Create Namespace & Service & Deployment for Users API
---
apiVersion: v1
kind: Namespace
metadata:
  name: users-ns
---
apiVersion: v1
kind: Service
metadata:
  name: users
  namespace: users-ns
  labels:
    app: users
spec:
  ports:
    - name: http
      port: 4201
      targetPort: 4201
  selector:
    app: users
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: users
  namespace: users-ns
spec:
  replicas: 1
  selector:
    matchLabels:
      app: users
      version: v1
  template:
    metadata:
      labels:
        app: users
        version: v1
    spec:
      containers:
        - image: zalbiraw/go-api-test-service:v2.0.0
          imagePullPolicy: Always
          name: users
          command: ["./services/graphql-subgraphs/users/server"]
          env:
            - name: PORT
              value: "4201"
---
apiVersion: tyk.tyk.io/v1alpha1
kind: SubGraph
metadata:
  name: users-subgraph
  namespace: users-ns
spec:
  schema: |
    directive @extends on OBJECT | INTERFACE
    
    directive @external on FIELD_DEFINITION
    
    directive @key(fields: _FieldSet!) on OBJECT | INTERFACE
    
    directive @provides(fields: _FieldSet!) on FIELD_DEFINITION
    
    directive @requires(fields: _FieldSet!) on FIELD_DEFINITION
    
    scalar _Any
    
    union _Entity = User
    
    scalar _FieldSet
    
    type _Service {
      sdl: String
    }
    
    type Address {
      street: String!
      suite: String!
      city: String!
      zipcode: String!
      geo: GeoLocation!
    }
    
    type Company {
      name: String!
      catchPhrase: String!
      bs: String!
    }
    
    type Entity {
      findUserByID(id: ID!): User!
    }
    
    type GeoLocation {
      lat: String!
      lng: String!
    }
    
    type Query {
      user(id: ID!): User!
      users: [User!]!
      _entities(representations: [_Any!]!): [_Entity]!
      _service: _Service!
    }
    
    type User {
      id: ID!
      name: String!
      username: String!
      email: String!
      address: Address!
      phone: String!
      website: String!
      company: Company!
    }
  sdl: |
    extend type Query {
        user(id: ID!): User!
        users: [User!]!
    }
    
    type User @key(fields: "id") {
        id: ID!
        name: String!
        username: String!
        email: String!
        address: Address!
        phone: String!
        website: String!
        company: Company!
    }
    
    type Address {
        street: String!
        suite: String!
        city: String!
        zipcode: String!
        geo: GeoLocation!
    }
    
    type GeoLocation {
        lat: String!
        lng: String!
    }
    
    type Company {
        name: String!
        catchPhrase: String!
        bs: String!
    }
---
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: federation-users-subgraph
  namespace: users-ns
spec:
  name: Federation - Users Subgraph
  protocol: "http"
  do_not_track: false
  use_keyless: true
  active: true
  internal: true
  graphql:
    enabled: true
    execution_mode: subgraph
    graph_ref: users-subgraph
    version: "2"
    playground:
      enabled: false
      path: ""
  proxy:
    target_url: http://users.users-ns.svc:4201/query
    listen_path: /users-subgraph/
    disable_strip_slash: true
```

### Posts Subgraph

```yaml
# Create Service & Deployment of Posts API
---
apiVersion: v1
kind: Service
metadata:
  name: posts
  labels:
    app: posts
spec:
  ports:
    - name: http
      port: 4202
      targetPort: 4202
  selector:
    app: posts
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: posts
spec:
  replicas: 1
  selector:
    matchLabels:
      app: posts
      version: v1
  template:
    metadata:
      labels:
        app: posts
        version: v1
    spec:
      containers:
        - image: zalbiraw/go-api-test-service:v2.0.0
          imagePullPolicy: Always
          name: posts
          command: ["./services/graphql-subgraphs/posts/server"]
          env:
            - name: PORT
              value: "4202"
---
apiVersion: tyk.tyk.io/v1alpha1
kind: SubGraph
metadata:
  name: posts-subgraph
spec:
  schema: |
    directive @extends on OBJECT | INTERFACE
    
    directive @external on FIELD_DEFINITION
    
    directive @key(fields: _FieldSet!) on OBJECT | INTERFACE
    
    directive @provides(fields: _FieldSet!) on FIELD_DEFINITION
    
    directive @requires(fields: _FieldSet!) on FIELD_DEFINITION
    
    scalar _Any
    
    union _Entity = Post | User
    
    scalar _FieldSet
    
    type _Service {
      sdl: String
    }
    
    type Entity {
      findPostByID(id: ID!): Post!
      findUserByID(id: ID!): User!
    }
    
    type Post {
      id: ID!
      userId: ID!
      title: String!
      body: String!
    }
    
    type Query {
      post(id: ID!): Post!
      posts: [Post!]!
      _entities(representations: [_Any!]!): [_Entity]!
      _service: _Service!
    }
    
    type User {
      id: ID!
      posts: [Post!]!
    }
  sdl: |
    extend type Query {
        post(id: ID!): Post!
        posts: [Post!]!
    }
    
    type Post @key(fields: "id") {
        id: ID!
        userId: ID!
        title: String!
        body: String!
    }
    
    extend type User @key(fields: "id") {
        id: ID! @external
        posts: [Post!]!
    }

---
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: federation-posts-subgraph
spec:
  name: Federation - Posts Subgraph
  protocol: "http"
  do_not_track: false
  use_keyless: true
  active: true
  internal: true
  graphql:
    enabled: true
    execution_mode: subgraph
    graph_ref: posts-subgraph
    version: "2"
    playground:
      enabled: false
      path: ""
  proxy:
    target_url: http://posts.default.svc:4202/query
    listen_path: /posts-subgraph/
    disable_strip_slash: true
```

### Supergraph

```yaml
apiVersion: tyk.tyk.io/v1alpha1
kind: SuperGraph
metadata:
  name: social-media-supergraph
spec:
  subgraph_refs:
    - name: users-subgraph
      namespace: users-ns
    - name: posts-subgraph # Since namespace is not specified for posts-subgraph, Operator uses the namespace of this SuperGraph CRD which is default for our example.
  schema: |-
    type Query {
      user(id: ID!): User!
      users: [User!]!
      post(id: ID!): Post!
      posts: [Post!]!
    }
    
    type User {
      id: ID!
      name: String!
      username: String!
      email: String!
      address: Address!
      phone: String!
      website: String!
      company: Company!
      posts: [Post!]!
    }
    
    type Address {
      street: String!
      suite: String!
      city: String!
      zipcode: String!
      geo: GeoLocation!
    }
    
    type GeoLocation {
      lat: String!
      lng: String!
    }
    
    type Company {
      name: String!
      catchPhrase: String!
      bs: String!
    }
    
    type Post {
      id: ID!
      userId: ID!
      title: String!
      body: String!
    }
---
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: federation-supergraph
spec:
  name: Federated - Social Media APIS
  protocol: "http"
  do_not_track: false
  use_keyless: true
  active: true
  graphql:
    enabled: true
    execution_mode: supergraph
    graph_ref: social-media-supergraph
    version: "2"
    playground:
      enabled: true
      path: /playground
  proxy:
    target_url: ""
    strip_listen_path: true
    listen_path: /social-media-apis-federated/
```