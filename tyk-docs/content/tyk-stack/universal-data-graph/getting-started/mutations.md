---
title: "3. Mutations"
date: 2020-09-14
menu:
  main:
    parent: "UDG Getting Started"
weight: 0
url: /universal-data-graph/udg-getting-started/mutations/
aliases:
    - /universal-data-graph/udg-getting-started/mutations/
---

{{< youtube C9ooJdKSf-A >}} 

Now that we have stitched are Query fields to appropriate datasources, doing the same for Mutations should be quite similar. 

### 1. Extend Schema 

Well extend our schema to add and delete the review. In the schema tab replace your Mutation type with follows and update the API.

```gql
type Mutation {
  addReview(text: String, userId: String): Review
  deletReview(reviewId: String): String
}
```

Here, `addReview` would expect `text` and `userId` as arguments which we'd use to make a POST request to our Review service.

### 2. Attach datasource. 

  - Navigate to datasources section in your schema tab and select `addReview` field. 
  - Set type as `REST`
  - Set url to `http://localhost:4001/reviews` 
  - Set name to `addReview`
  - Select method as `POST`
  - Set headers (optional)
  - Keep field mapping disabled

### 3. Add arguments to POST body (request payload). 

You can use the templating syntax to relay arguments to POST body as follows 

```json
{
    "text": "{{.arguments.text}}",
    "userId": "{{.arguments.userId}}"
}
```

Click on "Update Field and Data Source" and update the API


### 4. Execute a mutation operation 

We can now test our mutation operation with the playground in API designer using the following query 

```gql
mutation AddReview {
  addReview(text: "review using udg", userId:"1"){
    id
    text
  }
}
```

which should return us following response.

```json
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

