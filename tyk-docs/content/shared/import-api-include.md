---
---

### Import API - Swagger

| **Property** | **Description**           |
| ------------ | ------------------------- |
| Resource URL | `/api/import/swagger/`    |
| Method       | POST                      |
| Type         | None                      |
| Body         | None                      |
| Param        | None                      |

#### Sample Request

```{.json}
POST /api/import/swagger/
Host: localhost:3000
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8
{
  "swagger": "{swagger data...}",
  "insert_into_api": false, 
  "api_id": "internal API id",
  "version_name": "yourversionname",
  "upstream_url": "yourupstreamurl"
}
```

Parameters:

*   `insert_into_api`: If set to `true` the import will replace an existing API. Setting to `false` will import into a new API.
*   `api_id`: The internal MongoDB object id for your API.
*   `version_name`: Your versioning convention name for the imported API.
*   `upstream_url`: The URL the API is served by.


#### Sample Response

```
{
  "Status": "OK",
  "Message": "API Imported",
  "Meta": "new_api_id"
}

```


### Import API - Blueprint

| **Property** | **Description**             |
| ------------ | --------------------------- |
| Resource URL | `/api/import/blueprint/`    |
| Method       | POST                        |
| Type         | None                        |
| Body         | None                        |
| Param        | None                        |

#### Sample Request

```{.json}
POST /api/import/blueprint/
Host: localhost:3000
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8
{
  "blueprint": "{blueprint data...}",
  "insert_into_api": false, 
  "api_id": "internal API id",
  "as_mock": false,
  "version_name": "yourversionname",
  "upstream_url": "yourupstreamurl"
}
```

Parameters:

*   `insert_into_api`: If set to `true` the import will replace an existing API. Setting to `false` will import into a new API.
*   `api_id`: The internal MongoDB object id for your API.
*   `as_mock`: If set to true, enables our mocking support for Blueprint imported API. See **Mocks** above for more details.
*   `version_name`: Your versioning convention name for the imported API.
*   `upstream_url`: The URL the API is served by.


#### Sample Response

```
{
  "Status": "OK",
  "Message": "API Imported",
  "Meta": "new_api_id"
}

```

