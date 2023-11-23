---
title: "Transformation Use Case: SOAP To REST"
Description: Explore the power of the effortless conversion process and data mapping of SOAP to REST payload with Tyk API Gateway"
Tag: ["body transform", "Header transform", "Response transform", "Request transform", "SOAP" ]
---

## Introduction

You can transform an existing SOAP service to a JSON REST service. This can be done from the Tyk Dashboard with no coding involved and should take around 10 minutes to perform the transform.

We also have a video which walks you through the SOAP to REST transform.

{{< youtube jeNXLzpKCaA >}}

## Prerequisites

An existing SOAP service and the WSDL definition. For this example, we will use:

- Upstream Target - [https://www.dataaccess.com/webservicesserver/numberconversion.wso](https://www.dataaccess.com/webservicesserver/numberconversion.wso)
- The WSDL definition from - [https://www.dataaccess.com/webservicesserver/numberconversion.wso?WSDL](https://www.dataaccess.com/webservicesserver/numberconversion.wso?WSDL)
- Postman Client (or other endpoint testing tool)

## Step 1: Import the WSDL API

1. Select APIs from the System Management menu

{{< img src="/img/2.10/apis_menu.png" alt="APIs Menu" >}}

2. Click Import API

{{< img src="/img/2.10/import_api_button.png" alt="Import API" >}}

3. Select **From WSDL** from the Import an API Definition window
4. In the **Upstream Target** field, enter `https://www.dataaccess.com/webservicesserver/numberconversion.wso` as listed in the Prerequisites.
5. Paste the WSDL definition from the link in Prerequisites
6. Click **Generate API**. You should now have an API named `NumberConversion` in your API list

{{< img src="/img/2.10/numberservice_api.png" alt="NumberService API" >}}

## Step 2: Add the transforms to an Endpoint

1. From the API list, select Edit from the Actions menu for the `NumberConversion` API
2. Select the **Endpoint Designer** tab. You should see 2 POST endpoints that were imported. We will apply the transforms to the `NumberToWords` endpoint.

{{< img src="/img/2.10/numberservice_endpoints.png" alt="Endpoints" >}}

3. Expand the `NumberToWords` endpoint. The following plugins should have been added as part of the import process.
  - URL rewrite
  - Track endpoint

{{< note success >}}
**Note**  

To make the URL a little friendlier, we're going to amend the Relative Path to just `/NumberToWords`. Update your API after doing this.
{{< /note >}}
4. Add the following plugins from the **Plugins** drop-down list:
  - Body transform
  - Modify headers

## Step 3: Modify the Body Transform Plugin

### Set up the Request

We use the `{{.FieldName}}` Golang template syntax to access the JSON request. For this template we will use `{{.numberToConvert}}`.

1. Expand the Body transform plugin. From the Request tab, copy the following into the Template section:

```xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://www.dataaccess.com/webservicesserver/">
   <soapenv:Header/>
   <soapenv:Body>
      <web:NumberToDollars>
         <web:dNum>{{.numberToConvert}}</web:dNum>
      </web:NumberToDollars>
   </soapenv:Body>
</soapenv:Envelope>
```

2. In the Input field, enter the following:

```json
{
    "numberToConvert": 35
}
```
{{< note success >}}
**Note**  

The '35' integer can be any number you want to convert
{{< /note >}}


1. Click **Test**. You should get the following in the Output field:

```xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://www.dataaccess.com/webservicesserver/">
   <soapenv:Header/>
   <soapenv:Body>
      <web:NumberToDollars>
         <web:dNum>35</web:dNum>
      </web:NumberToDollars>
   </soapenv:Body>
</soapenv:Envelope>
```
### Set up the Response

Again, for the response, we will be using the `{{.FieldName}}` syntax as the following `{{.Envelope.Body.NumberToDollarsResponse.NumberToDollarsResult}}`

1. For the Input Type, select XML

{{< img src="/img/2.10/body_trans_response_input.png" alt="Response Input Type" >}}

2. In the Template section enter:

```yaml
{
    "convertedNumber": "{{.Envelope.Body.NumberToDollarsResponse.NumberToDollarsResult}}"
}
```
3. Enter the following into the input field:

```xml
<soap12:Envelope xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
  <soap12:Body>
    <NumberToDollarsResponse xmlns="http://www.dataaccess.com/webservicesserver/">
      <NumberToDollarsResult>thirty five dollars</NumberToDollarsResult>
    </NumberToDollarsResponse>
  </soap12:Body>
</soap12:Envelope>
```
4. Click Test. You should get the following in the Output field:

```json
{
    "convertedNumber": "thirty five dollars"
}
```
## Step 5: Change the Content-Type Header

We now need to change the `content-type` header to allow the SOAP service to receive the payload in XML. We do this by using the **Modify header** plugin

1. Expand the Modify Header plugin
2. From the **Request** tab enter the following in the **Add this header** section
  - Header Name: `content-type`
  - Header Value: `text/xml`
3. Click Add 

{{< img src="/img/2.10/add_header_type.png" alt="Modify Header Request" >}}

4. From the **Response** tab enter the following in the **Add this header** section
  - Header Name: `content-type`
  - Header Value: `application/json`

{{< img src="/img/2.10/modify-header-response.png" alt="Modify Header Response" >}}

1. Click **Add**
2. Click **Update**

{{< img src="/img/2.10/update_number_conversion.png" alt="Update API" >}}

## Testing the Endpoint

You now need to test the endpoint. We are going to use Postman.

{{< note success >}}
**Note**  

We have not set up any Authentication for this API, it has defaulted to `Open (Keyless)`.
{{< /note >}}


1. Copy the URL for your NumberConversion API with the NumberToWords endpoint - `https://tyk-url/numberconversion/NumberToWords/`
2. Paste it as a POST URL in the Postman URL Request field
3. Enter the following as a raw Body request

```json
{
    "numberToConvert": 35
}
```
Your Postman request should look similar to below (apart from the URL used)

{{< img src="/img/2.10/postman_soap_rest.png" alt="Postman" >}}
