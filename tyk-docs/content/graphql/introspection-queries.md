---
title: "Introspection"
date: 2023-04-01
menu:
  main:
    parent: "Introspection"
weight: 1
---

Any GraphQL API can be introspected with the right introspection query. Here's some examples on what introspection queries can look like and what information you can learn about the GraphQL service using them.

### Introspecting all types

This query will respond with information about all types and queries defined in the schema. Additional information like *name*, *description* and *kind* will also be provided.

```graphql
query {
 __schema {
	    types {
		  name
		  description
		  kind
		}
		queryType {
		  fields {
			name
			description
		  }
		}
   }
 }

```

### Introspecting single type details

If you want to know more about a certain type in the schema, you can use the following query:

```graphql
  query {
    __type(name: "{type name}") {
  	...FullType
    }
  }

  fragment FullType on __Type {
    kind
    name
    description
    fields(includeDeprecated: true) {
  	name
  	description
  	args {
  	  ...InputValue
  	}
  	type {
  	  ...TypeRef
  	}
  	isDeprecated
  	deprecationReason
    }

    inputFields {
  	...InputValue
    }

    interfaces {
  	...TypeRef
    }

    enumValues(includeDeprecated: true) {
  	name
  	description
  	isDeprecated
  	deprecationReason
    }

    possibleTypes {
  	...TypeRef
    }
  }

  fragment InputValue on __InputValue {
    name
    description
    type {
  	...TypeRef
    }
    defaultValue
  }

  fragment TypeRef on __Type {
    kind
    name
    ofType {
  	kind
  	name
  	ofType {
  	  kind
  	  name
  	  ofType {
  		kind
  		name
  		ofType {
  		  kind
  		  name
  		  ofType {
  			kind
  			name
  			ofType {
  			  kind
  			  name
  			  ofType {
  				kind
  				name
  			  }
  			}
  		  }
  		}
  	  }
  	}
    }
  }
```

### Introspecting types associated with an interface

The query to introspect a single type can be used for any type, but you might prefer a simpler response for types such as `interface`. With this query you can get a list of objects that implements a specific `interface`.

```graphql
query {
__type(name: "{interface name}") {
  name
  kind
  description
  possibleTypes {
    name
    kind
    description
  }
}
}  
```

### Introspecting ENUM values

An `enum` type defines a set of discrete values. With this query you can get a complete list of those values for a chosen `enum`.

```graphql
query {
__type(name: "{enum name}") {
  name
  kind
  description
  enumValues {
    name
    description
  }
}
}
```

### Introspecting query definitions

GraphQL requires queries to be defined in a special type `Query` in the schema. You can use the below introspection query to find out more about a query operations of the graph.

```graphql
  query {
    __type(name: "Query") {
  	...QueryType
    }
  }

  fragment QueryType on __Type {
    fields {
  	name
  	description
  	type {
  		name
  		kind
  	}
  	args {
  	  name
  	  description
  	  type {
  		  name
  		  kind
  	  }
  	}
    }
  }
```

{{< note >}}

**Note**  
You might find GQL APIs where the `Query` type is called `QueryRoot`. In those cases the above introspection query needs to be modified in line 2 to: `__type(name: "QueryRoot")`

{{< /note >}}

### Introspecting mutation and subscription definitions

You should use the same introsopection query as you would for `Query` type, just change the name argument to 'Mutation` or `Subscription`.

### Full introspection

If you prefer to introspect GraphQL all at once, you can do that by sending this query:

```graphql

    query IntrospectionQuery {
      __schema {
        
        queryType { name }
        mutationType { name }
        subscriptionType { name }
        types {
          ...FullType
        }
        directives {
          name
          description
          
          locations
          args {
            ...InputValue
          }
        }
      }
    }

    fragment FullType on __Type {
      kind
      name
      description
      
      fields(includeDeprecated: true) {
        name
        description
        args {
          ...InputValue
        }
        type {
          ...TypeRef
        }
        isDeprecated
        deprecationReason
      }
      inputFields {
        ...InputValue
      }
      interfaces {
        ...TypeRef
      }
      enumValues(includeDeprecated: true) {
        name
        description
        isDeprecated
        deprecationReason
      }
      possibleTypes {
        ...TypeRef
      }
    }

    fragment InputValue on __InputValue {
      name
      description
      type { ...TypeRef }
      defaultValue
      
      
    }

    fragment TypeRef on __Type {
      kind
      name
      ofType {
        kind
        name
        ofType {
          kind
          name
          ofType {
            kind
            name
            ofType {
              kind
              name
              ofType {
                kind
                name
                ofType {
                  kind
                  name
                  ofType {
                    kind
                    name
                  }
                }
              }
            }
          }
        }
      }
    }
  
```