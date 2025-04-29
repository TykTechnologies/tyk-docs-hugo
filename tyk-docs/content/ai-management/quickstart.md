---
title: "Quickstart"
date: 2025-04-25
tags: ["AI Studio", "AI Management", "Quickstart"]
description: "AI Studio Quickstart"
keywords: ["AI Studio", "AI Management", "Quickstart"]
---

This guide will help you get started with the Tyk AI Studio using Docker Compose.

## Prerequisites

- Docker and Docker Compose installed on your system

## Setup

1. Create a new directory for your project:
   ```bash
   mkdir midsommar && cd midsommar
   ```

2. Create a `compose` directory and add the following Docker Compose file:
   ```bash
   mkdir compose && cd compose
   ```

3. Create a `compose.yaml` file with the following content:
   ```yaml
   version: "3"
   services:
     midsommar:
       image: tykio/midsommar:latest
       volumes:
         - ./confs/.env:/app/.env
       environment:
         - DATABASE_URL=postgres://postgres:postgres@postgres:5432/postgres
         - DATABASE_TYPE=postgres
       depends_on:
         - postgres
       ports:
         - 8080:8080  # Main application port
         - 9090:9090  # Management API port

     postgres:
       image: postgres:latest
       environment:
         - POSTGRES_USER=postgres
         - POSTGRES_PASSWORD=postgres
         - POSTGRES_DB=postgres
   ```

4. Create a configuration directory and environment file:
   ```bash
   mkdir -p confs
   touch confs/.env
   ```

5. Add your configuration to the `.env` file (example):
   ```env
    # SMTP_SERVER=smtp.sendgrid.net
    # SMTP_PORT=587
    # SMTP_USER=apikey
    # SMTP_PASS=
    ALLOW_REGISTRATIONS=true
    ADMIN_EMAIL=you@tyk.io
    SITE_URL=http://localhost:3000
    FROM_EMAIL=noreply@tyk.io
    DATABASE_URL=midsommar.db
    DATABASE_TYPE=sqlite
    TYK_AI_SECRET_KEY=a35b3f7b0fb4dd3a048ba4fc6e9fe0a8cb804d7884c62b6b2ea09c99612c4405
    FILTER_SIGNUP_DOMAINS=tyk.io
    TYK_AI_LICENSE=XXXX
   ```

## Starting the Service

1. Start the services using Docker Compose:
   ```bash
   docker compose up -d
   ```

2. Verify that the services are running:
   ```bash
   docker compose ps
   ```

## Accessing the Portal

Once the services are running:

- Access the AI Portal interface at: `http://localhost:8080`
- Access the Gateway at: `http://localhost:9090`

## Monitoring Logs

To view the logs from the services:
```bash
docker compose logs -f
```

## Stopping the Service

To stop and remove the containers:
```bash
docker compose down
```

## Service Components

The Docker Compose setup includes:

- **Tyk AI Studio Service**: The main AI Portal application
  - Runs on ports 8080 (web interface) and 9090 (management API)
  - Connects to PostgreSQL for data storage
  - Uses environment variables for configuration

- **PostgreSQL Database**:
  - Stores application data
  - Uses default credentials (configurable via environment variables)

## Troubleshooting

If you encounter issues:

1. Check that all required ports (8080, 9090) are available
2. Ensure your `.env` file contains valid API keys
3. Verify that Docker and Docker Compose are properly installed
4. Check the logs for any error messages: `docker compose logs -f`

For more detailed information about the portal features and usage, refer to the [Dashboard Documentation](dashboard.md).
