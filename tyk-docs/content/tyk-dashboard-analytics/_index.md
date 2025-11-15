---
title: "Tyk Dashboard Analytics"
date: 2023-01-09
weight: 90
menu:
  main:
    parent: "Tyk Dashboard"
---

# Tyk Dashboard Analytics

The Tyk Dashboard provides powerful analytics capabilities that allow you to gain insights into your API traffic, performance, and usage patterns. This documentation will help you understand how to set up, use, and get the most out of Tyk's analytics features.

## What?

Tyk's analytics system captures detailed information about API requests, including:

- Request volume and patterns
- Response times and latency
- Error rates and types
- Geographic distribution of traffic
- User and client behavior
- Security events and potential threats

This data is processed, stored, and made available through the Dashboard's analytics interface, where you can view pre-built reports or create custom visualizations.

## Why?

Analytics provide critical insights that help you:

- Monitor API performance and availability
- Identify and troubleshoot issues
- Understand usage patterns and user behavior
- Make data-driven decisions about API design and infrastructure
- Track business metrics and KPIs
- Ensure compliance with SLAs and security policies
- Plan for capacity and scaling needs

## How?

### Setting Up Analytics

Tyk's analytics system involves several components working together:

#### Gateway Configuration

1. **Enable analytics in your Gateway configuration**:
   
   In your `tyk.conf` file, ensure analytics are enabled:
   
   ```json
   {
     "enable_analytics": true,
     "analytics_config": {
       "enable_detailed_recording": true,
       "enable_geo_ip": true,
       "normalise_urls": {
         "enabled": true,
         "normalise_uuids": true,
         "normalise_numbers": true,
         "custom_patterns": []
       }
     }
   }
   ```

2. **Configure pumping frequency**:
   
   Set how often analytics data is sent to the Dashboard:
   
   ```json
   {
     "analytics_config": {
       "purge_delay": 10,
       "pumps": {
         "mongo": {
           "type": "mongo",
           "meta": {}
         }
       }
     }
   }
   ```

#### Dashboard Configuration

1. **Enable analytics in your Dashboard configuration**:
   
   In your `tyk_analytics.conf` file:
   
   ```json
   {
     "enable_analytics": true,
     "analytics_config": {
       "storage_expiration_time": 60,
       "enable_multiple_analytics_keys": true
     }
   }
   ```

2. **Set up retention policies**:
   
   Configure how long analytics data is stored:
   
   ```json
   {
     "mongo_session_to_collection_map": {
       "analytics": "tyk_analytics",
       "analytics_errors": "tyk_analytics_errors"
     }
   }
   ```

#### Pump Configuration

If you're using the separate Tyk Pump component:

1. **Configure the Pump**:
   
   In your `pump.conf` file:
   
   ```json
   {
     "analytics_storage_type": "redis",
     "analytics_storage_config": {
       "type": "redis",
       "host": "localhost",
       "port": 6379,
       "hosts": null,
       "username": "",
       "password": "",
       "database": 0,
       "optimisation_max_idle": 100,
       "optimisation_max_active": 0,
       "enable_cluster": false
     },
     "purge_delay": 10,
     "pumps": {
       "mongo": {
         "name": "mongo",
         "meta": {
           "collection_name": "tyk_analytics",
           "mongo_url": "mongodb://localhost/tyk_analytics"
         }
       }
     }
   }
   ```

2. **Enable multiple pumps** for different destinations:
   
   ```json
   {
     "pumps": {
       "mongo": {
         "name": "mongo",
         "meta": {
           "collection_name": "tyk_analytics",
           "mongo_url": "mongodb://localhost/tyk_analytics"
         }
       },
       "csv": {
         "name": "csv",
         "meta": {
           "csv_dir": "./analytics"
         }
       }
     }
   }
   ```

#### MDCB Configuration (for Multi-Data Center Deployments)

If you're using MDCB:

1. **Configure analytics forwarding**:
   
   In your Gateway `tyk.conf`:
   
   ```json
   {
     "slave_options": {
       "use_rpc": true,
       "connection_string": "mdcb:9090",
       "rpc_key": "your-rpc-key",
       "api_key": "your-api-key",
       "group_id": "your-group-id",
       "use_ssl": true,
       "ssl_insecure_skip_verify": false
     }
   }
   ```

2. **Configure MDCB to receive analytics**:
   
   In your MDCB configuration:
   
   ```json
   {
     "analytics": {
       "mongo_url": "mongodb://localhost/tyk_analytics",
       "enable_multiple_analytics_keys": true
     }
   }
   ```

### Using the Analytics Dashboard

The Tyk Dashboard provides several pre-built analytics views:

1. **Dashboard Overview**: High-level metrics and trends
2. **API Usage**: Detailed usage statistics for each API
3. **Error Analytics**: Analysis of API errors and failures
4. **Log Browser**: Searchable logs of API requests
5. **Geographic Distribution**: Map view of API traffic
6. **Developer Analytics**: Usage patterns by developer or app

To access these views:

1. Log in to your Tyk Dashboard
2. Navigate to "Analytics" in the main menu
3. Select the desired view from the submenu
4. Use the date range selector to specify the time period
5. Apply filters to focus on specific APIs, errors, or other criteria

### Creating Custom Reports

You can create custom reports to focus on specific metrics:

1. Go to "Analytics" > "Custom Reports"
2. Click "Create Report"
3. Select the data sources and metrics you want to include
4. Choose visualization types (charts, tables, etc.)
5. Set up scheduling for automated report generation
6. Configure distribution options (email, download, etc.)

## Advanced Topics

### Analytics Processing Flow

Tyk's analytics data follows this path:

1. **Collection**: The Gateway captures request/response data
2. **Buffering**: Data is temporarily stored in Redis
3. **Processing**: The Pump retrieves and processes the data
4. **Storage**: Processed data is stored in MongoDB or other configured destinations
5. **Aggregation**: The Dashboard aggregates data for reporting
6. **Visualization**: Data is presented through the Dashboard UI

### Performance Considerations

Analytics can impact system performance. Consider these factors:

1. **Data Volume**: High traffic APIs generate large amounts of analytics data
2. **Storage Requirements**: Plan for adequate storage capacity
3. **Processing Overhead**: Analytics processing consumes CPU and memory
4. **Network Impact**: Data transfer between components affects network load
5. **Retention Policies**: Balance data retention needs with storage constraints

Optimization strategies:

1. **Sampling**: Configure sampling to record only a percentage of requests
2. **Selective Recording**: Enable detailed analytics only for critical APIs
3. **Aggregation**: Use pre-aggregated data for high-level reporting
4. **Distributed Processing**: Deploy multiple Pump instances for load distribution
5. **Storage Tiering**: Move older data to lower-cost storage

### Design Decisions

When implementing Tyk analytics, consider these design decisions:

1. **Deployment Architecture**:
   - Centralized vs. distributed analytics processing
   - On-premises vs. cloud storage
   - Single vs. multiple data destinations

2. **Data Granularity**:
   - Full request/response recording vs. summary metrics
   - Per-request analytics vs. aggregated statistics
   - Real-time vs. batch processing

3. **Integration Strategy**:
   - Integration with existing monitoring systems
   - Forwarding to external analytics platforms
   - Custom dashboards and visualizations

4. **Compliance and Privacy**:
   - Data anonymization and PII handling
   - Regulatory requirements for data storage
   - Access controls and audit trails

By carefully considering these factors, you can implement an analytics system that provides valuable insights while maintaining optimal performance and compliance with your requirements.
