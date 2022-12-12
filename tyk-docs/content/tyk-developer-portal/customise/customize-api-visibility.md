---
date: 2020-07-24
title: Customising API Visibility
linktitle: Customising API Visibility
menu:
  main:
    parent: "Customise" 
url: /tyk-developer-portal/customise/customize-api-visibility/
aliases:
  - /tyk-developer-portal/customise/customize-api-visibility/
---

By default, any user who accesses your developer Portal will be able to view all of the published APIs in the catalogue. This behavior may not be desired and you may want to have more control of what APIs developers see in the catalogue when accessing the portal. A common use case for this is if you have internal APIs that you want to publish only to your internal developers, and restrict view to others.

We'll walk through how you can use custom Page Templates to control the visibility of your APIs so it can only be seen by specific group of developers.
In a nutshell, we are going to assign a group field to an API catalogue profile, to a developer profile, and check if their group matched. 

*Please note that this does not support multiple groups for a single API catalogue entry, nor for a single developer profile.* 

## Prerequisites
1. You have an API created in your Dashboard. See [Create an API](/docs/try-out-tyk/tutorials/create-api/) for more details.
2. You have a Policy created in your Dashboard that has access rights to this API
3. You have a Portal Catalog entry for this API. Here we will call it "Internal API"
4. You have a developer account that can access your Developer Portal. 

## Add a group field to the API Catalogue profile

For this example, we'll add a custom field to the Portal catalogue "Group". This group is set to "internal" which indicates that only developers in `internal` group shoud have access to the Catalogue.

Go to Portal Management > Catalogue -> Your API screen

![portal_catalogue_fied_group](/docs/img/dashboard/portal-management/portal_catalogue_field_group.png)


## Add a custom field to the developer profile

For this example, we'll add a custom field to the developer profile also called "Group". This group is set set to "internal" it means that developer should have access to the catalogues with the same Group restriction. 

Go to Portal Management > Developers screen
![developer_field_group.png](/docs/img/dashboard/portal-management/deveoper_field_group.png)


This flag can also be [set programatically](https://tyk.io/docs/tyk-developer-portal/customise/custom-developer-portal/#updating-a-developer-example-adding-custom-fields).


## Modify the Portal Catalogue Template to add Show/Hide Logic

The developer portal is fully customizable via templates. We'll add custom logic to the portal catalogue template (catalogue.html) to show/hide the "Internal API" catalogue based on the value of the "Group" field for the developer.  

The main difference from the default template is two changes:
1. Get user data state at the start of template: `{{$profile := .UserData }}`
2. Before rendering api catalogue element, which renders list of APIs, we insert the following section:
```
{{ $show := true }}

{{ range $field, $value := $apiDetail.Fields }}
	{{ $group_match := true }}
	{{ if (eq $field "Group") }}
		{{ $group_match = false }}
		{{ range $dfield, $dvalue := $profile.Fields }}
			{{ if eq $dfield "Group" }}
				{{ if eq $dvalue $value }}
					{{ $group_match = true }}
				{{ end }}
			{{ end }}
		{{ end }}
	{{ end }}

	{{ if not $group_match }}
		{{ $show = false }}
	{{ end }}
{{ end }}

{{if $show}}
<!-- Render catalogue -->
{{end}}
```
	
Please see the customized catalogue template ​​here​: 

<details>
<summary><b>Click to expand template</b></summary>

```text
{{ define "cataloguePage" }} {{ $org_id := .OrgId}} {{ template "header" .}}
{{ $page := .}}
{{$profile := .UserData }}
<body>
  {{ template "navigation" . }}
  <div>
    <!-- Main content here -->
    <div class="container" style="margin-top:80px;">
      <div class="row">
        <h1>API Catalogue</h1>
      </div>
      {{ if .Error }}
      <div class="row">
        <div class="col-md-7 center">
          <div class="alert alert-danger text-center col-lg-8 col-lg-offset-2 success-page error">Error while loading data</div>
        </div>
      </div>
      {{ end }}
      <div class="row catalogues-list">
        {{$internal := index .UserData.Fields "internal"}}

        {{ if .Data.APIS }} {{ range $index, $apiDetail := .Data.APIS}} {{ if $apiDetail.Show }}

        {{ $show := true }}

        {{ range $field, $value := $apiDetail.Fields }}
          {{ $group_match := true }}
          {{ if (eq $field "Group") }}
            {{ $group_match = false }}
            {{ range $dfield, $dvalue := $profile.Fields }}
              {{ if eq $dfield "Group" }}
                {{ if eq $dvalue $value }}
                  {{ $group_match = true }}
                {{ end }}
              {{ end }}
            {{ end }}
          {{ end }}

          {{ if not $group_match }}
            {{ $show = false }}
          {{ end }}
        {{ end }}

        {{if $show}}
        <div class="col-md-4">
          <h2>
            <span>{{$apiDetail.Name}}</span>
            <span class="badge badge-primary">{{$apiDetail.AuthType}}</span>
          </h2>
          <p>{{$apiDetail.LongDescription | markDown}}</p>
          {{ if $apiDetail.Documentation }}
          <a href="{{ $page.PortalRoot }}apis/{{$apiDetail.Documentation}}/documentation/" class="btn btn-info catalogue">
          <span class="glyphicon glyphicon-book" aria-hidden="true"></span>&nbsp; View documentation
          </a>
          <br/>
          {{ end }}
          {{if eq $apiDetail.Version "" }}
          {{if eq $apiDetail.IsKeyless false}}
          <a href="{{if $page.PortalConfig.EnableMultiSelection}}{{ $page.PortalRoot }}member/apis/request?policy_id={{$apiDetail.APIID}}{{else}}{{ $page.PortalRoot }}member/apis/{{$apiDetail.APIID}}/request{{end}}" class="btn btn-success catalogue">
          <span class="glyphicon glyphicon-ok-sign" aria-hidden="true"></span>&nbsp; Request an API key
          </a>
          {{ end }}
          {{ else }}
          {{if eq $apiDetail.IsKeyless false}}
          <a href="{{if $page.PortalConfig.EnableMultiSelection}}{{ $page.PortalRoot }}member/policies/request?policy_id={{$apiDetail.PolicyID}}{{else}}{{ $page.PortalRoot }}member/policies/{{$apiDetail.PolicyID}}/request{{end}}" class="btn btn-success catalogue">
          <span class="glyphicon glyphicon-ok-sign" aria-hidden="true"></span>&nbsp; Request an API key
          </a>
          {{ end }}
          {{ end }}
        </div>
        {{ end }}
        {{ end }} {{ end }}
      </div>
      {{ else }}
      <div class="row">
        <p>
          <em>It looks like there are no APIs in the Catalogue.</em>
        </p>
      </div>
      {{ end }}
    </div>
  </div>
  {{ template "footer" .}}
  </div>
  <!-- /container -->
  {{ template "scripts" .}}
</body>
</html>
{{ end }}


```
</details>

We're now going to overwrite the default catalogue.html template in the 'portal/templates' directory on the Tyk Dashboard instance with the custom one above.

**NOTE**: After replacing or updating a template, the Dashboard must be restarted to apply the changes.

Now the visibility of the "Internal API" is driven by the value of the "Group" field on the developer profile.

### Multiple API subscriptions
If you have enabled "Enable multiple API subscriptions" option in the portal settings, you also need to modify `request_multi_key.html` template. 
The main difference from the default template is two changes:
1. Get user data state at the start of template: `{{$profile := .UserData }}`
2. Before rendering <li> element, which renders list of APIs, we insert the following section:
```
{{ range $field, $value := $apiDetail.Fields }}
	{{ $group_match := true }}
	{{ if (eq $field "Group") }}
		{{ $group_match = false }}
		{{ range $dfield, $dvalue := $profile.Fields }}
			{{ if eq $dfield "Group" }}
				{{ if eq $dvalue $value }}
					{{ $group_match = true }}
				{{ end }}
			{{ end }}
		{{ end }}
	{{ end }}

	{{ if not $group_match }}
		{{ $match = true }}
	{{ end }}
{{ end }}
```

<details>
<summary><b>Click to expand template</b></summary>

```text
{{ define "requestMultiKey" }} {{ template "header" .}}
{{$catalogue := .Catalogue}}
{{$catalogues := .Catalogues}}
{{$key := .Key}}
{{$modifyKey := false}}
{{$addKey := true}}
{{if .Key}}{{$modifyKey = true}}{{$addKey = false}}{{end}}
{{$profile := .UserData }}
<body>
  <div>
    <div class="page-header">
      <div class="page-header-container">
        <div class="title text-center">
          {{ if .Key }}
          <h1>Modify API Key</h1>
          {{ else }}
          <h1>Request API Key</h1>
          {{ end }}
        </div>
      </div>
    </div>
    <div
      class="container content-wrapper key-request-flow-wrapper"
      data-fixed-api="{{$catalogue}}"
      data-key-req-fields-length="{{len .PortalConfig.KeyRequestFields}}"
    >
      <div class="row text-center">
        <div class="col-lg-12 text-center">
          {{ if .Error }}
          <div class="alert alert-danger">
            {{.Error}}
          </div>
          {{ end }}
          {{ if not .DenyRequest }}
          <ol class="breadcrumb">
            <li class="cogs active "><a href="#choose-api" data-toggle="tab" aria-controls="choose-api" role="tab" title="Select API">Select API</a></li>
            <li class="info disabled"><a href="#details" data-toggle="tab" aria-controls="details" role="tab" title="Enter details">Enter details</a></li>
            <li class="check "><a href="#complete" data-toggle="tab" aria-controls="complete" role="tab" title="Complete">Final step</a></li>
          </ol>
          {{ end }}
        </div>
      </div>
      {{ if not .DenyRequest }}
      <form action="" method="POST" enctype="multipart/form-data">
        <div class="alert alert-danger no-items-error" style="display: none">
          You need to select at least an API for a key.
        </div>
        <div class="choose-api-wrapper auth-apis text-center">
          <div class="selectable-list-component">
            <h3 class="selected-items-title text-left">Selected APIs</h3>
            {{if .Key}}
            <p class="text-left"> List of APIs the key access</p>
            {{else}}
            <p class="text-left"> List of APIs the key will be generated for </p>
            {{end}}
            <div class="alert alert-info no-selected-api-msg">No selected APIs</div>
            <ol class="selected-items items-list list-group">
              {{range $index, $cat := $catalogues}}
              <li
                class="list-group-item item active clickable-item"
                data-auth-type="{{$cat.AuthType}}"
                data-use-certificate="{{$cat.UseCertificate}}"
              >
                <div class="details-container">
                  <input type="checkbox" name="apply_policies[]" checked="checked" value="{{$cat.PolicyID}}" />
                  <button type="button" class="btn btn-success add-item-btn"><span class="fa fa-check"></span>
                  <br>Select API</button>
                  <button type="button" class="btn btn-danger remove-item-btn"><span class="fa fa-times"></span>
                  <br>Remove API</button>
                  <span class="item-title">{{$cat.Name}}</span>
                  <span class="badge badge-primary">{{$cat.AuthType}}</span>
                </div>
              </li>
              {{end}}
            </ol>
            <h3 class="text-left">Available APIs to connect</h3>
            <p class="text-left">List of APIs availble for key request. Once an API is selected the entire list is filtered by the selected APIs authentication type.</p>
            <div class="alert alert-info no-available-apis-msg">No APIs available for selection</div>
            <ol class="selectable-list items-list list-group">
              {{$authType := $catalogue.AuthType}}
              {{ range $index, $apiDetail := .APIS}}
              {{ if $apiDetail.Show }}
              {{ if ne $apiDetail.AuthType "oauth"}}

              {{ $match := false }}
              {{ range $cid, $cat := $catalogues }}
                {{if eq $apiDetail.PolicyID $cat.PolicyID}}
                  {{ $match = true }}
                {{end}}
              {{end}}

              {{ range $field, $value := $apiDetail.Fields }}
                {{ $group_match := true }}
                {{ if (eq $field "Group") }}
                  {{ $group_match = false }}
                  {{ range $dfield, $dvalue := $profile.Fields }}
                    {{ if eq $dfield "Group" }}
                      {{ if eq $dvalue $value }}
                        {{ $group_match = true }}
                      {{ end }}
                    {{ end }}
                  {{ end }}
                {{ end }}

                {{ if not $group_match }}
                  {{ $match = true }}
                {{ end }}
              {{ end }}

              {{ if and (ne $match true) (or $addKey (eq $apiDetail.AuthType $authType)) }}
                <li
                  class="list-group-item item clickable-item"
                  data-id="{{$apiDetail.PolicyID}}"
                  data-auth-type="{{$apiDetail.AuthType}}"
                  data-use-certificate="{{$apiDetail.UseCertificate}}"
                  style="{{if ne $apiDetail.AuthType $authType }}display:none{{end}}"
                >
                <div class="details-container">
                  <input type="checkbox" name="apply_policies[]" value="{{$apiDetail.PolicyID}}" />
                  <button type="button" class="btn btn-success add-item-btn"><span class="fa fa-check"></span>
                  <br>Select API</button>
                  <button type="button" class="btn btn-danger remove-item-btn"><span class="fa fa-times"></span>
                  <br>Remove API</button>
                  <span class="item-title">{{$apiDetail.Name}}</span>
                  <span class="badge badge-primary">{{$apiDetail.AuthType}}</span>
                </div>
              </li>
              {{end}}
              {{end}}
              {{end}}
              {{end}}
            </ol>
          </div>
          <ul class="list-inline">
            <li class="pull-left">
              <a href="{{ .PortalRoot }}apis/" class="btn btn-success outline">Back to Api Catalogue</a>
            </li>
            <li class="pull-right">
              <button type="button" class="btn btn-success next-auth-step" style="display: none">Save and continue</button>
              <button type="submit" class="btn btn-success request-key-btn req-key-btn-first-step" style="display: none">Request key</button>
            </li>
          </ul>
        </div>
        <div class="request-key-form">
          <input type="hidden" name="csrf_token" value="{{ .Token }}">
          {{if gt (len .PortalConfig.KeyRequestFields) 0 }}
          <h3 class="text-left">Key request form</h3>
          {{ range $fieldname := .PortalConfig.KeyRequestFields }}
          <div class="form-group">
            <label for="{{$fieldname}}">{{$fieldname}}</label>
            <input type="text" class="form-control" id="{{$fieldname}}" name="{{$fieldname}}" placeholder="">
          </div>
          {{ end }}
          {{ end }}
          {{ if $catalogue }}
          <div class="jwt-form" style="display: none">
            <h3 class="text-left">JWT secret</h3>
            <div class="form-group">
              <p>
                This API is configured to validate against JSON Web Tokens, in order for this to work, we will need to know your HMAC Secret OR a valid RSA public key, please enter this below as part of your key request.
              </p>
              <label>Signature validation key:</label>
              <textarea rows="10" class="form-control" id="jwt_secret" name="jwt_secret" placeholder="" value="" style="font-family: monospace;"></textarea>
            </div>
          </div>
          <div class="use-certificate-form" style="display: none">
            <h3 class="text-left">Certificate</h3>
            <div class="form-group">
          	  <label>Upload your public client certificate in PEM format:</label>
          	  <textarea rows="10" class="form-control" id="certificate_upload" name="certificate" placeholder="" value="" style="font-family: monospace;"></textarea>
        	  </div>
          </div>
          {{ end }}
          <ul class="list-inline">
            <li class="pull-left">
              <button type="button" class="btn btn-success prev-auth-step outline">Back to Apis list</button>
            </li>
            <li class="pull-right">
              {{if $addKey}}
              <button type="submit" class="btn btn-success request-key-btn">Request key</button>
              {{else}}
              <button type="submit" class="btn btn-success request-key-btn">Request key changes</button>
              {{end}}
            </li>
          </ul>
        </div>
      </form>
      {{ end }}
    </div>
  </div>
  {{ template "navigation" . }}
  {{ template "footer" .}}
  <!-- /container -->
  {{ template "scripts" .}}
</body>
</html>
{{ end }}
```
</details>

#### Developer Logged In, Group field set to internal (Internal API is visible)
![dev_logged_in_internal](/docs/img/dashboard/portal-management/dev_logged_in_internal.jpg)

#### Developer Logged In, Group field not set or set so group other than internal (Internal API not visible)
![dev_logged_in_external](/docs/img/dashboard/portal-management/dev_logged_in_external.jpg)

#### No User Logged In (Internal API not visible)
![no_user_logged_in](/docs/img/dashboard/portal-management/no_user_logged_in.jpg)
