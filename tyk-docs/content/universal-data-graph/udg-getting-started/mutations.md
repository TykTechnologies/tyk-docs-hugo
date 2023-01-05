---
title: "3. Mutations"
date: 2020-09-14
menu:
  main:
    parent: "UDG Getting Started"
weight: 0
aliases:
    - /universal-data-graph/udg-getting-started/mutations/
---

{{< youtube za2KdDQSCnI >}} 

Now that we have attached datasources to our `Query` in the schema let's try to do the same for `Mutation`.

### 1. Update Schema 

```gql
type Mutation {
  addReview(text: String, userId: String): Review
  deletReview(reviewId: String): String
}
```

We’ll update the Mutatation type as above where we’ll add two operations 

* `addReview`: Which accepts two `arguments` (i.e `text` and `userId`) and adds a new review by making a `POST` request to `http://localhost:4001/reviews` endpoint, which expects something like the following in the request payload 

```
{
    "id": "1", // UserId of the user posting review 
    "text": "New Review by John Doe11" // review text
}
```
* `deleteReview`: Which accepts one `argument` (i.e `reviewId`), that deletes a review by making a `DELETE` request to `http://localhost:4001/reviews/:reviewId`

### 2. Configure datasource. 

Follow these steps to configure a data source for the `Mutation`.

  * Navigate to schema tab in the api where you would see the split screen view of schema editor on left and list of configurable fields on right
  * Select `addReview` field from `Mutation` type
  * Select `REST` option
  * Set a unique datasource name
  * Set the URL as `http://localhost:4001/reviews`
  * Select method type as `POST`
  * Set request body to relay the graphql arguments to our upstream payload as follows:

  ```
  {
    "text": "{{.arguments.text}}",
    "userId": "{{.arguments.userId}}"
    }
  ```
  * Update the API

### 3. Execute mutation operation

We can now test our mutation operation with the playground in API designer using the following operation

```gql
mutation AddReview {
  addReview(text: "review using udg", userId:"1"){
    id
    text
  }
}
```

That should return us the following response:

```gql
{
  "data": {
    "addReview": {
      "id": "e201e6f3-b582-4772-b95a-d25199b4ab82",
      "text": "review using udg"
    }
  }
}

```


### Challenge

Configure a datasource to delete a review using review id.

```
Notes

- For users field on type Review
- - Description :: delete review using reviewId
- - URL :: http://localhost:4001/reviews/:reviewId
- - Method :: DELETE

- Enable field mapping to map your API response 

```
{{< note success >}}
**Note**

You can find the solution for the challenge in the above video.

{{< /note >}}

<hr />

Now that we have a good idea how we could do CRUD operations with UDG APIs, let's see how we can secure them using policies

