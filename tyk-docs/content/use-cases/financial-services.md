---
title: "Implementing Open Banking with Tyk FAPI Accelerator"
description: "Learn how Tyk API Gateway enables financial institutions to implement secure, standards-compliant Open Banking APIs with advanced features like DPoP authentication, event notifications, and idempotency support."
tags: ["open banking", "financial services", "FAPI", "OAuth 2.0", "DPoP", "event notifications", "idempotency", "JWS", "security"]
keywords: ["financial-grade API", "PSD2", "UK Open Banking", "TPP", "payment initiation", "account information", "FAPI 2.0", "Pushed Authorization Requests", "PAR", "Demonstrating Proof of Possession", "webhook", "API security", "regulatory compliance"]
---

## Introduction

Financial institutions are embracing Open Banking initiatives to foster innovation, enhance customer experiences, and comply with regulatory requirements. These initiatives require secure, reliable, and standards-compliant APIs that can safely expose sensitive financial data to third-party providers (TPPs). This document explores how Tyk API Gateway, through its FAPI Accelerator, enables financial institutions to implement robust Open Banking solutions.

## Challenges in Financial Services API Implementation

Financial institutions face several challenges when implementing Open Banking APIs:

1. **Security and Compliance**: Meeting stringent security requirements of Financial-grade API (FAPI) specifications and regulatory standards like PSD2, UK Open Banking, and Consumer Data Right (CDR).

2. **Authentication Complexity**: Implementing advanced authentication mechanisms like OAuth 2.0 with Pushed Authorization Requests (PAR) and Demonstrating Proof of Possession (DPoP).

3. **Event Notifications**: Securely delivering real-time notifications about account and payment events to third parties.

4. **Idempotency**: Ensuring that duplicate requests (especially for payments) don't result in duplicate transactions.

5. **Developer Experience**: Providing a seamless experience for TPP developers while maintaining security.

## Tyk FAPI Accelerator Solution

The Tyk FAPI Accelerator is a comprehensive solution that addresses these challenges through a modular, standards-compliant architecture:

### Architecture Overview

```mermaid
flowchart TB
    %% People/Actors
    endUser(["End User
    A customer of the bank who wants to access their accounts via a TPP"])
    tppDeveloper(["TPP Developer
    Developer building applications that integrate with the bank's API"])
    
    %% Tyk FAPI Accelerator System with Containers
    subgraph tykFAPI ["Tyk FAPI Accelerator"]
        tppApp["TPP Application
        (NextJS)
        Demonstrates how a TPP would interact with a bank's API"]
        apiGateway["API Gateway
        (Tyk Gateway)
        Routes requests and handles event notifications"]
        authServer["Authorization Server
        (Keycloak)
        Handles authentication and authorization"]
        tykBank["Tyk Bank
        (Node.js)
        Mock bank implementation providing backend services"]
        database[(Database)]
        kafka[(Message Broker)]
    end
    
    %% Relationships
    endUser -->|"Uses
    (HTTPS)"| tppApp
    tppDeveloper -->|"Develops
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
    kafka -->|"Subscribes to events"| apiGateway
    apiGateway -->|"Sends signed notifications
    (JWS/HTTPS Webhooks)"| tppApp
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
    
    User->>TPP: 1. Initiate payment
    TPP->>Gateway: 2. Create payment consent
    Gateway->>Bank: 3. Forward consent request
    Bank-->>Gateway: 6. Consent response with ConsentId
    Gateway-->>TPP: 7. Return ConsentId
    
    TPP->>Auth: 8. Push Authorization Request (PAR)
    Auth-->>TPP: 9. Return request_uri
    
    TPP->>User: 10. Display authorization options
    
    alt Automatic Authorization
        User->>TPP: 11a. Select automatic authorization
        TPP->>Bank: 12a. Direct authorize consent request
        Bank-->>TPP: 15a. Authorization confirmation
    else Manual Authorization
        User->>TPP: 11b. Select manual authorization
        TPP->>User: 12b. Redirect to authorization URL
        User->>Auth: 13b. Authorization request
        Auth->>User: 18b. Display authorization UI
        User->>Auth: 19b. Approve authorization
        Auth->>User: 22b. Redirect to callback URL
        User->>TPP: 23b. Callback with authorization code
    end
    
    TPP->>Gateway: 24. Create payment with authorized consent
    Gateway->>Bank: 25. Forward payment request
    Bank-->>Gateway: 28. Payment response with PaymentId
    Gateway-->>TPP: 29. Return PaymentId
    
    TPP->>User: 30. Display payment confirmation
```

### Event Notification Example

The event notification system allows TPPs to receive updates about payment status changes:

```mermaid
sequenceDiagram
    actor TPP as TPP Application
    participant Gateway as API Gateway
    participant EventAPI as Event Subscriptions API
    participant PaymentAPI as Payment Initiation API
    participant Kafka as Message Broker
    
    TPP->>Gateway: 1. Register callback URL
    Gateway->>EventAPI: 2. Forward registration request
    EventAPI-->>Gateway: 5. Registration response with SubscriptionId
    Gateway-->>TPP: 6. Return SubscriptionId
    
    Note over PaymentAPI: Payment status change occurs
    PaymentAPI->>Kafka: 7. Publish event
    
    Kafka-->>Gateway: 8. Consume event
    Gateway->>Gateway: 11. Sign notification with JWS
    
    Gateway->>TPP: 12. Send signed notification
    TPP->>TPP: 13. Verify JWS signature
    TPP-->>Gateway: 14. Acknowledge (HTTP 200 OK)
```

## Benefits for Financial Institutions

Implementing Open Banking with Tyk FAPI Accelerator provides several benefits:

1. **Faster Time to Market**: Pre-built components and configurations reduce development time.

2. **Regulatory Compliance**: Built-in support for FAPI, OAuth 2.0, and other standards ensures compliance with regulatory requirements.

3. **Enhanced Security**: Advanced security features like DPoP, JWS signing, and idempotency protect sensitive financial data.

4. **Scalability**: Tyk's architecture allows for horizontal scaling to handle increasing API traffic.

5. **Developer-Friendly**: Comprehensive documentation and example applications make it easier for TPP developers to integrate.

## Getting Started

To get started with the Tyk FAPI Accelerator:

1. **Prerequisites**:
   - Tyk API Gateway
   - Docker and Docker Compose
   - Go 1.24 or higher (for plugin development)

2. **Setup Steps**:
   - Clone the Tyk FAPI Accelerator repository
   - Set up the Authorization Server (Keycloak)
   - Configure and run the gRPC plugin
   - Start the mock bank implementation
   - Run the TPP application for testing

3. **Testing**:
   - Use the TPP application to test account information retrieval
   - Test payment initiation flows
   - Verify event notification delivery

## Conclusion

The Tyk FAPI Accelerator provides a comprehensive solution for financial institutions implementing Open Banking APIs. By addressing the key challenges of security, authentication, event notifications, and developer experience, it enables banks to quickly deploy standards-compliant APIs that meet regulatory requirements while providing a seamless experience for TPP developers and end users.

With its modular architecture and extensive documentation, the Tyk FAPI Accelerator serves as both a reference implementation and a starting point for production deployments, helping financial institutions navigate the complex landscape of Open Banking with confidence.