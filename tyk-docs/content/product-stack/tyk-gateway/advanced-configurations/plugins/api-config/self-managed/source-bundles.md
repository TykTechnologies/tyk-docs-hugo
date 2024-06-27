---
date: 2024-06-25T12:59:42Z
title: Bundle Configuration On Tyk Dashboard
description: "This section explains ehow to configure APIs to use plugin bundles deployed on a remote web server"
tags: ["tyk plugins", "API Gateway middleware", "Custom middleware", "Custom API request"]
---

This section explains how to manage to configure Plugin bundles for an API using Tyk Dashboard.

---

## Tyk Classic APIs

To configure plugin bundles for Tyk Classic APIs click on the APIs menu item in the *API Management* menu of Dashboard and select your API to display the API editor screen.

Click on the *Advanced Options* tab and scroll down until the *Plugin Options* section is displayed. Enter the relative path of the plugin zip file in the *Plugin ID* field that Tyk Gateway should download from the web server hosting plugin bundles.

---

## Tyk OAS APIs 

To configure plugin bundles for Tyk OAS APIs click on the APIs menu item in the *API Management* menu of Dashboard and select your OAS API to display the OAS API editor screen.

Scroll down until the Enable Plugin section is displayed. Enable a plugin bundle for your API by activating the toggle switch. Subsequently, enter the relative path of the plugin zip file in the *Plugin Bundle ID* field that Tyk Gateway should download from the web server that hosts your plugin bundles.

---
