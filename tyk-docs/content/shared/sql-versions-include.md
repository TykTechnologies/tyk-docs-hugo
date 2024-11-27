---
---

From Tyk 4.0, you can use PostgreSQL as your datastore. We support the following versions:

- [PostgreSQL](https://www.postgresql.org) version 12.x, 13.x, 14.x, 15.x, 16.x

You can also use the following as a drop in replacement for PostgreSQL:

- [Amazon RDS](https://aws.amazon.com/rds/)
- [Amazon Aurora PostgreSQL](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.AuroraPostgreSQL.html)
- [Azure CosmosDB for PostgreSQL](https://learn.microsoft.com/en-us/azure/cosmos-db/postgresql/introduction)

{{< note success >}}
**Note**

In a production environment, we *only* support the PostgreSQL versions listed above.
{{< /note >}}

For POC, you can also use the following as replacement:

- SQLite 3.x
