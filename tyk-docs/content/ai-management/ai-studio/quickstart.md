---
title: "Quickstart"
date: 2025-04-25
tags: ["AI Studio", "AI Management", "Quickstart"]
description: "AI Studio Quickstart"
keywords: ["AI Studio", "AI Management", "Quickstart"]
---

This guide will help you get started with the Tyk AI Studio using Docker Compose or package installation.

## Prerequisites

### License Requirement
- A valid Tyk AI Studio license from Tyk Technologies. Contact support@tyk.io or your account manager to obtain your license.

### For Docker Compose Installation
- Docker and Docker Compose installed on your system
- PostgreSQL database (recommended for production) - if not provided, SQLite will be used as fallback

### For Package Installation
- Linux system with systemd
- PostgreSQL database (strongly recommended) - if not configured, SQLite will be used as fallback

## Installation Methods

### Method 1: Docker Compose Installation

1. Create a new directory for your project:
   ```bash
   mkdir tyk-ai-studio && cd tyk-ai-studio
   ```

2. Create a `compose` directory and add the following Docker Compose file:
   ```bash
   mkdir compose && cd compose
   ```

3. Create a `compose.yaml` file with the following content:
   ```yaml
    version: "3"
    services:
      ai-studio:
        image: tykio/tyk-ai-studio:latest
        volumes:
          - ./confs/.env:/app/.env
        environment:
          - DATABASE_URL=postgres://postgres:postgres@postgres:5432/postgres
          - DATABASE_TYPE=postgres
        depends_on:
          postgres:
            condition: service_healthy
        ports:
          - 8080:8080  # Main application port
          - 9090:9090  # Gateway server port

      postgres:
        image: postgres:latest
        environment:
          - POSTGRES_USER=postgres
          - POSTGRES_PASSWORD=postgres
          - POSTGRES_DB=postgres
        healthcheck:
          test: ["CMD-SHELL", "pg_isready -U postgres"]
          interval: 5s
          timeout: 5s
          retries: 5
   ```

4. Create a configuration directory and environment file:
   ```bash
   mkdir -p confs
   touch confs/.env
   ```

5. Add your configuration to the `.env` file (example):
   
   **For PostgreSQL (recommended):**
   ```env
    ALLOW_REGISTRATIONS=true
    ADMIN_EMAIL=you@tyk.io
    SITE_URL=http://localhost:8080
    FROM_EMAIL=noreply@tyk.io
    DATABASE_URL=postgres://postgres:postgres@postgres:5432/postgres
    DATABASE_TYPE=postgres
    TYK_AI_SECRET_KEY=a35b3f7b0fb4dd3a048ba4fc6e9fe0a8cb804d7884c62b6b2ea09c99612c4405
    FILTER_SIGNUP_DOMAINS=tyk.io
    TYK_AI_LICENSE=XXXX
    # Optional SMTP settings
    # SMTP_SERVER=smtp.sendgrid.net
    # SMTP_PORT=587
    # SMTP_USER=apikey
    # SMTP_PASS=
   ```
   
   **For SQLite (development only):**
   ```env
    ALLOW_REGISTRATIONS=true
    ADMIN_EMAIL=you@tyk.io
    SITE_URL=http://localhost:8080
    FROM_EMAIL=noreply@tyk.io
    DATABASE_URL=tyk-ai-studio.db
    DATABASE_TYPE=sqlite
    TYK_AI_SECRET_KEY=a35b3f7b0fb4dd3a048ba4fc6e9fe0a8cb804d7884c62b6b2ea09c99612c4405
    FILTER_SIGNUP_DOMAINS=tyk.io
    TYK_AI_LICENSE=XXXX
   ```
   
   > **Note:** PostgreSQL is strongly recommended for production use. SQLite is only suitable for development and testing.

#### Starting the Service

1. Start the services using Docker Compose:
   ```bash
   docker compose up -d
   ```

2. Verify that the services are running:
   ```bash
   docker compose ps
   ```

#### Accessing the Portal

Once the services are running:

- Access the AI Portal interface at: `http://localhost:8080`
- Access the Gateway at: `http://localhost:9090`

#### Monitoring Logs

To view the logs from the services:
```bash
docker compose logs -f
```

#### Stopping the Service

To stop and remove the containers:
```bash
docker compose down
```

### Method 2: Package Installation

1. Add the Tyk package repository:
   ```bash
   # For Ubuntu/Debian systems
   curl -fsSL https://packagecloud.io/tyk/tyk-ee/gpgkey | sudo gpg --dearmor -o /usr/share/keyrings/tyk-ee-archive-keyring.gpg
   echo "deb [signed-by=/usr/share/keyrings/tyk-ee-archive-keyring.gpg] https://packagecloud.io/tyk/tyk-ee/ubuntu/ $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/tyk-ee.list
   
   # For RHEL/CentOS systems
   curl -s https://packagecloud.io/install/repositories/tyk/tyk-ee/script.rpm.sh | sudo bash
   ```

2. Install the package:
   ```bash
   # For Ubuntu/Debian
   sudo apt update
   sudo apt install tyk-ai-studio
   
   # For RHEL/CentOS
   sudo yum install tyk-ai-studio
   ```

3. Configure the application:
   ```bash
   sudo nano /etc/tyk-ai-studio/.env
   ```
   
   Add your configuration (similar to Docker Compose example above). Ensure you configure PostgreSQL for production:
   ```env
   DATABASE_URL=postgres://username:password@localhost:5432/tyk_ai_studio
   DATABASE_TYPE=postgres
   TYK_AI_LICENSE=your-license-key-here
   # ... other configuration options
   ```
   
   > **Note:** The `TYK_AI_LICENSE` environment variable is required for the service to start. Contact support@tyk.io or your account manager if you need to obtain a license.

4. Start the service:
   ```bash
   sudo systemctl enable tyk-ai-studio
   sudo systemctl start tyk-ai-studio
   ```

5. Check service status:
   ```bash
   sudo systemctl status tyk-ai-studio
   ```

## Service Components

The Docker Compose setup includes:

- **Tyk AI Studio Service**: The main AI Portal application
  - Runs on ports 8080 (web interface) and 9090 (gateway server)
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