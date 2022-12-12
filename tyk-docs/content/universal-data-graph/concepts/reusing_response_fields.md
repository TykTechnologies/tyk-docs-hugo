---
title: "Concepts - Reusing response fields"
date: 2020-07-23
menu:
  main:
    parent: "UDG Concepts"
weight: 0
url: /universal-data-graph/concepts/reusing_response_fields/
aliases:
    - /universal-data-graph/concepts/reusing-response-fields
---

When using the UDG, there may be a situation where you want to access an API with data coming from another API.
Consider the following REST APIs:

 - REST API for people: `https://people-api.dev/people`
 - REST API for a specific person: `https://people-api.dev/people/{person_id}`
 - REST API for driver licenses: `https://driver-license-api.dev/driver-licenses/{driver_license_id}`

The REST API for a person will give us the following response:
```json
{
    "id": 1,
    "name": "John Doe",
    "age": 40,
    "driverLicenseID": "DL1234"
}
```

And the REST API response for driver licenses looks like this:
```json
{
    "id": "DL1234",
    "issuedBy": "United Kingdom",
    "validUntil": "2040-01-01"
}
```

As you can see by looking at the example responses, you could use the `driverLicenseID` from the People API to obtain the driver license data from the Driver License API.

You also want to design the schema so that it represents the relationship between a person and a driver license.
As the person object is referencing a driver license by its ID, it means that we will need to define the driver license inside the person object as a field.
Consequently, a schema representing such a relationship might look like this:

```graphql
type Query {
    people: [Person]  # Data source for people
    person(id: Int!): Person  # Data Source for a specific person
}

type Person {
    id: Int!
    name: String!
    age: Int!
    driverLicenseID: ID
    driverLicense: DriverLicense  # Data Source for a driver license
}

scalar Date

type DriverLicense {
    id: ID!
    issuedBy: String!
    validUntil: Date! 
}
```

### Defining the data source URLs

Now it's all about defining the data source URLs. 

For the field `Query.people`, you can simply use the URL to the API:
```
https://people-api.dev/people
```

The `Query.person` field needs to use its `id` argument to call the correct API endpoint.

See [Concept: Arguments]({{< ref "/content/universal-data-graph/concepts/arguments.md" >}}) to learn more about it.
 ```
 https://people-api.dev/people/{{.arguments.id}}
 ```

To retrieve the driver license data you need to be able to use the `driverLicenseID` from the `Person` object. As we defined the driver license data source on the `Person` object, you can now access all properties from the `Person` object by using the `.object` placeholder.

{{< note success >}}
**Note**  

If you want to access data from the object on which the data source is defined, use the `.object` placeholder (e.g: `.object.id` to access the `id` property from an object).
{{< /note >}}

So the URL for the driver license data source would look like this:
```
https://driver-license-api.dev/driver-licenses/{{.object.driverLicenseID}}
```
 ![Use the object placeholder](/docs/img/dashboard/udg/concepts/object_placeholder.png)

### Result

A query like:
```graphql
{
    people {
        id
        name
        age
        driverLicense {
            id
            issuedBy
            validUntil
        }
    }
}
```

... will now result in something like this:
```json
{
    "data": {
        "people": [
            {
                "id": 1,
                "name": "John Doe",
                "age": 40,
                "driverLicense": {
                    "id": "DL1234",
                    "issuedBy": "United Kingdom",
                    "validUntil": "2040-01-01"
                }
            },
            {
                "id": 2,
                "name": "Jane Doe",
                "age": 30,
                "driverLicense": {
                    "id": "DL5555",
                    "issuedBy": "United Kingdom",
                    "validUntil": "2035-01-01"
                }
            }
        ]
    }
}
```
