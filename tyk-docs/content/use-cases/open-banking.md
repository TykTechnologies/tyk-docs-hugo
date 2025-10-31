---
title: "Tyk FAPI Accelerator for Open Banking"
description: "Learn how Tyk API Gateway enables financial institutions to implement secure, standards-compliant Open Banking APIs with advanced features like DPoP authentication, event notifications, and idempotency support."
tags: ["open banking", "financial services", "FAPI", "OAuth 2.0", "DPoP", "event notifications", "idempotency", "JWS", "security"]
keywords: ["financial-grade API", "PSD2", "UK Open Banking", "TPP", "payment initiation", "account information", "FAPI 2.0", "Pushed Authorization Requests", "PAR", "Demonstrating Proof of Possession", "webhook", "API security", "regulatory compliance"]
---

## Introduction

Open Banking is a financial services framework that enables secure data sharing between banks and third-party providers (TPPs) through standardized APIs. It fosters innovation, enhances customer experiences, and ensures compliance with regulatory requirements such as:
- **Payment Services Directive 2 (PSD2)** ([PSD2](https://www.ecb.europa.eu/press/intro/mip-online/2018/html/1803_revisedpsd.en.html)) in the European Union, mandating secure access to account information and payment services.
- **UK Open Banking** ([UK Open Banking](https://www.openbanking.org.uk/)), a UK initiative for standardized financial APIs.
- **Consumer Data Right (CDR)** ([CDR](https://www.cdr.gov.au/)) in Australia, enabling consumer data sharing.
- **Financial Data Exchange (FDX)** ([FDX](https://financialdataexchange.org/)) in the United States, an industry-led standard for data sharing.

Open Banking is enabling the banking industry to move from closed ecosystems to open standards and collaborative platforms where customer data can be securely shared with authorized third parties. However, financial institutions face challenges implementing secure, compliant, Open Banking APIs. This document explores how [Tyk API Gateway]({{< ref "tyk-oss-gateway" >}}), through its [FAPI Accelerator](https://github.com/TykTechnologies/tyk-fapi), enables financial institutions to implement robust Open Banking APIs.

## Challenges in Financial Services API Implementation

Implementing Open Banking APIs presents several challenges:

1. **Stringent Security Requirements**:
   - Compliance with **Financial-grade API (FAPI)** standards, such as FAPI 2.0, which ensure high-security API interactions.
   - Ensuring data integrity, authenticity, and non-repudiation for sensitive financial transactions.

2. **Complex Authentication**:
   - Implementing **OAuth 2.0** with features like **Pushed Authorization Requests (PAR)** ([PAR](https://datatracker.ietf.org/doc/html/rfc9126)) and **Demonstrating Proof of Possession (DPoP)** ([DPoP](https://datatracker.ietf.org/doc/html/rfc9449)).
   - Managing secure user consent and authorization flows.

3. **Event Notifications**:
   - Enabling TPPs to subscribe to real-time updates about account and payment events.
   - Signing notifications with cryptographic signatures for security.

4. **Idempotency**:
   - Ensuring that duplicate requests (especially for payments) don't result in duplicate transactions.

5. **Developer Experience**:
   - Providing a seamless experience for TPP developers while maintaining high-security standards.

## What is Tyk FAPI Accelerator?

The **[Tyk FAPI Accelerator](https://github.com/TykTechnologies/tyk-fapi)** is a reference implementation provided by Tyk Technologies to help financial institutions build secure, standards-compliant Open Banking APIs. Built on the [Tyk API Gateway]({{< ref "tyk-oss-gateway" >}}).

### Architecture Overview

The diagram below shows the Tyk FAPI Accelerator system in its environment, including users, external systems, and key actors.

```mermaid
flowchart TB
    %% People/Actors
    psu(["PSU (Payment Services User)
    A customer of the bank who accesses their accounts and initiates payments through third-party providers"])
    tpp(["TPP (Third Party Provider)
    Companies providing financial services like account aggregators, credit checkers, and savings apps that integrate with banks"])
    aspsp(["ASPSP (Account Servicing Payment Service Provider)
    Banks and financial institutions that provide account and payment APIs to authorized third parties"])
    
    %% Systems
    subgraph tykFAPI ["Tyk FAPI Accelerator"]
        tykFAPISystem["Provides FAPI-compliant APIs for account information and payment initiation"]
    end
    
    %% Relationships
    psu -->|"Views accounts,
    initiates payments"| tykFAPI
    tpp -->|"Integrates with,
    consumes APIs from"| tykFAPI
    aspsp -->|"Configures, monitors,
    provides services through"| tykFAPI
    
    %% Styling
    classDef person fill:#335FFD,color:#F7F7FF,stroke:#9393AA
    classDef system fill:#00A3A0,color:#F7F7FF,stroke:#03031C
    class psu,tpp,aspsp person
    class tykFAPISystem system
```

### Tyk FAPI Accelerator

The diagram below shows all major components of the Tyk FAPI Accelerator and their interactions.

```mermaid
flowchart TB
    %% People/Actors
    psu(["PSU (Payment Services User)
    A customer of the bank who accesses their accounts and initiates payments through third-party providers"])
    tpp(["TPP (Third Party Provider)
    Companies providing financial services like account aggregators, credit checkers, and savings apps that integrate with banks"])
    
    %% Tyk FAPI Accelerator System with Containers
    subgraph tykFAPI ["Tyk FAPI Accelerator"]
        tppApp["TPP Application
        (NextJS)
        Demonstrates how a TPP would interact with a bank's API"]
        apiGateway["API Gateway
        (Tyk Gateway)
        Secures and routes API requests, enforces FAPI compliance, and handles event notifications"]
        authServer["Authorization Server
        (Keycloak)
        Handles authentication and authorization"]
        tykBank["Tyk Bank
        (Node.js)
        Mock bank implementation providing backend services"]
        database[(Database)]
        databaseLabel["PostgreSQL
        Stores account information, payment data, and event subscriptions"]
        kafka[(Message Broker)]
        kafkaLabel["Kafka
        Handles event notifications"]
    end
    
    %% Connect labels to database and kafka
    database --- databaseLabel
    kafka --- kafkaLabel
    
    %% Relationships
    psu -->|"Uses
    (HTTPS)"| tppApp
    tpp -->|"Develops
    (IDE)"| tppApp
    tppApp -->|"Makes API calls to
    (HTTPS)"| apiGateway
    tppApp -->|"Authenticates with
    (OAuth 2.0/OIDC)"| authServer
    apiGateway -->|"Routes requests to
    (HTTPS)"| tykBank
    authServer -->|"Verifies consents with
    (HTTPS)"| tykBank
    tykBank -->|"Reads from and writes to
    (SQL)"| database
    tykBank -->|"Publishes events to
    (Kafka Protocol)"| kafka
    
    %% Event notification flow
    kafka -->|"Subscribes to events"| apiGateway
    apiGateway -->|"Sends signed notifications
    (JWS/HTTPS Webhooks)"| tppApp
    
    %% Styling
    classDef person fill:#335FFD,color:#F7F7FF,stroke:#9393AA
    classDef tppStyle fill:#335FFD,color:#F7F7FF,stroke:#9393AA
    classDef component fill:#00A3A0,color:#F7F7FF,stroke:#03031C
    classDef authStyle fill:#00A3A0,color:#F7F7FF,stroke:#03031C
    classDef bankStyle fill:#C01FB8,color:#F7F7FF,stroke:#03031C
    classDef kafkaStyle fill:#E09D00,color:#F7F7FF,stroke:#03031C
    classDef database fill:#5900CB,color:#F7F7FF,stroke:#03031C
    classDef label fill:none,stroke:none
    
    class psu,tpp person
    class tppApp tppStyle
    class apiGateway component
    class authServer authStyle
    class tykBank bankStyle
    class database database
    class kafka kafkaStyle
    class databaseLabel,kafkaLabel label
```

### Key Components

1. **API Gateway (Tyk Gateway)**:
   - Routes API requests to appropriate backend services
   - Implements DPoP authentication via gRPC plugin
   - Handles idempotency for payment requests
   - Signs and delivers event notifications to TPPs

2. **Authorization Server (Keycloak)**:
   - Provides FAPI 2.0 compliant OAuth 2.0 and OpenID Connect
   - Supports Pushed Authorization Requests (PAR)
   - Manages user authentication and consent

3. **Mock Bank Implementation**:
   - Implements UK Open Banking Account Information API
   - Implements UK Open Banking Payment Initiation API
   - Implements UK Open Banking Event Subscriptions API
   - Provides realistic testing environment

4. **TPP Application**:
   - Demonstrates how third parties integrate with the bank's APIs
   - Implements FAPI 2.0 security profile
   - Shows account information retrieval and payment initiation flows

### Security Features

The Tyk FAPI Accelerator implements several security features required for financial-grade APIs:

1. **DPoP (Demonstrating Proof of Possession)**:
   - Ensures the client possesses the private key corresponding to the public key in the token
   - Prevents token theft and replay attacks
   - Implemented as a gRPC plugin for Tyk Gateway

2. **JWS Signing for Event Notifications**:
   - Signs webhook notifications with JSON Web Signatures (JWS)
   - Ensures authenticity and integrity of notifications
   - Allows TPPs to verify the source of notifications

3. **Idempotency Support**:
   - Prevents duplicate transactions from repeated API calls
   - Caches responses for idempotent requests
   - Includes automatic garbage collection of expired entries

4. **OAuth 2.0 with PAR**:
   - Implements Pushed Authorization Requests for enhanced security
   - Supports both automatic and manual authorization flows
   - Complies with FAPI 2.0 security profile


## Getting Started

For detailed setup instructions, code examples, and deployment guides, please refer to the [Tyk FAPI Accelerator GitHub repository](https://github.com/TykTechnologies/tyk-fapi/tree/main?tab=readme-ov-file#getting-started).


## Implementation Examples

### Payment Flow Example

The following sequence diagram illustrates a typical payment flow in the Tyk FAPI Accelerator:

```mermaid
sequenceDiagram
    actor User as End User
    participant TPP as TPP Application
    participant Gateway as API Gateway
    participant Auth as Authorization Server
    participant Bank as Tyk Bank
    participant DB as Database
    participant Kafka as Message Broker
    
    %% Payment Initiation
    User->>TPP: 1. Initiate payment (amount, recipient)
    
    %% Payment Consent Creation
    TPP->>Gateway: 2. Create payment consent
    Gateway->>Bank: 3. Forward consent request
    Bank->>DB: 4. Store consent
    DB-->>Bank: 5. Return consent ID
    Bank-->>Gateway: 6. Consent response with ConsentId
    Gateway-->>TPP: 7. Return ConsentId
    
    %% Pushed Authorization Request (PAR)
    TPP->>Auth: 8. Push Authorization Request (PAR)
    Note right of TPP: Direct connection to Auth Server
    Auth-->>TPP: 9. Return request_uri
    
    %% Authorization Options
    TPP->>User: 10. Display authorization options
    
    %% Two possible authorization flows
    alt Automatic Authorization
        User->>TPP: 11a. Select automatic authorization
        TPP->>Bank: 12a. Direct authorize consent request
        Note right of TPP: Server-side authorization
        Bank->>DB: 13a. Update consent status
        DB-->>Bank: 14a. Confirm update
        Bank-->>TPP: 15a. Authorization confirmation
    else Manual Authorization
        User->>TPP: 11b. Select manual authorization
        TPP->>User: 12b. Redirect to authorization URL
        User->>Auth: 13b. Authorization request with request_uri
        Auth->>Bank: 14b. Verify consent
        Bank->>DB: 15b. Get consent details
        DB-->>Bank: 16b. Return consent details
        Bank-->>Auth: 17b. Consent details
        Auth->>User: 18b. Display authorization UI
        User->>Auth: 19b. Approve authorization
        Auth->>DB: 20b. Update consent status
        DB-->>Auth: 21b. Confirm update
        Auth->>User: 22b. Redirect to callback URL with code
        User->>TPP: 23b. Callback with authorization code
    end
    
    %% Payment Creation
    TPP->>Gateway: 24. Create payment with authorized consent
    Gateway->>Bank: 25. Forward payment request
    Bank->>DB: 26. Store payment
    DB-->>Bank: 27. Return payment ID
    Bank-->>Gateway: 28. Payment response with PaymentId
    Gateway-->>TPP: 29. Return PaymentId
    
    %% Payment Confirmation
    TPP->>User: 30. Display payment confirmation
    
    %% Event Notification
    Bank->>Kafka: 31. Publish payment event
    Kafka->>Bank: 32. Stream processor consumes event
    Bank->>DB: 33. Query subscriptions
    DB-->>Bank: 34. Return matching subscriptions
    Bank->>TPP: 35. Send payment notification
    TPP-->>Bank: 36. Acknowledge notification
```

### Event Notification Example

The event notification system allows TPPs to receive updates about payment status changes:

```mermaid
sequenceDiagram
    actor TPP as TPP Application
    participant Gateway as API Gateway
    participant EventAPI as Event Subscriptions API
    participant PaymentAPI as Payment Initiation API
    participant DB as Database
    participant Kafka as Message Broker
    
    %% Subscription Registration
    TPP->>Gateway: 1. Register callback URL
    Gateway->>EventAPI: 2. Forward registration request
    EventAPI->>DB: 3. Store subscription
    DB-->>EventAPI: 4. Return subscription ID
    EventAPI-->>Gateway: 5. Registration response with SubscriptionId
    Gateway-->>TPP: 6. Return SubscriptionId
    
    %% Event Generation
    Note over PaymentAPI: Payment status change or other event occurs
    PaymentAPI->>Kafka: 7. Publish event
    Note right of PaymentAPI: Event includes type, subject, timestamp
    
    %% Event Processing
    Kafka-->>Gateway: 8. Consume event
    Gateway->>DB: 9. Query subscriptions for event type
    DB-->>Gateway: 10. Return matching subscriptions
    Gateway->>Gateway: 11. Determine target TPPs and sign with JWS
    
    %% Notification Delivery
    Gateway->>TPP: 12. Send signed notification
    Note right of Gateway: Notification includes event details, links, and JWS signature
    TPP->>TPP: 13. Verify JWS signature
    TPP-->>Gateway: 14. Acknowledge (HTTP 200 OK)
    
    %% Error Handling (Alternative Flow)
    alt Delivery Failure
        Gateway->>TPP: 12. Send signed notification
        TPP--xGateway: 13. Failed delivery (timeout/error)
        Gateway->>Gateway: 14. Retry with exponential backoff
        Gateway->>TPP: 15. Retry notification
        TPP->>TPP: 16. Verify JWS signature
        TPP-->>Gateway: 17. Acknowledge (HTTP 200 OK)
    end
```
