---
date: 2020-05-07T17:18:28Z
title: Customizing using jQuery
linktitle: Customizing using jQuery
menu:
  main:
    parent: "Customize"
aliases:
  - /tyk-developer-portal/customise/customize-with-jquery/
robots: "noindex"
algolia:
  importance: 0
---

{{< warning success >}}

**Attention:**

You’ve reached a page related to the *Tyk Classic Portal*. If you were searching for *API documentation of the new Tyk
Developer Portal* please use the latest
[Postman collection]({{< ref "/product-stack/tyk-enterprise-developer-portal/api-documentation/tyk-edp-api" >}}) page.
</br>
</br>
**Future deprecation of Tyk Classic Portal**

This product is no longer actively developed as it
has been superseded by the new [Tyk Developer Portal]({{< ref "portal/overview" >}}).
</br>
Please note that the Tyk Classic Portal now has limited support and maintenance. Please contact us at
[support@tyk.io](<mailto:support@tyk.io?subject=Tyk classic developer portal>)if you have any questions.

{{< /warning >}}

Tyk Portal comes prepackaged with jQuery.  This opens up a whole world of customization, by extending our Portal using JavaScript and HTML to create dynamic content.


## Dynamic Content Rendering & Filtering

Let's walk through an example where you use jQuery to fetch data from a REST endpoint, then display it in a table where we can filter our results.

{{< youtube njRgYUpL5vs >}}


**First of all, create a custom page in the portal.**


{{< img src="/img/dashboard/portal-management/new_custom_page.png" alt="custom_page_setup" >}}

In the MainBody, you can paste the code below (click the text to display):

<details>
<summary>Click to display the code</summary>

```.html

<h2> Filterable Table </h2>

<script>
window.onload = function() {

    $.ajax({  
            type: "GET",
            url: "https://www.mocky.io/v2/5eb1a7c53200005c8f28f8b5",  
            beforeSend: function() 
            {
                $('html, body').animate({scrollTop: 0
                }, 'slow');
                $("#response").html('<img src="loading.gif" align="absmiddle" alt="Loading..."> Loading...<br clear="all" /><br clear="all" />');
            },  
            success: function(response)
            {
                var htmlResponse = '<table id=results>\
                <thead>\
                <tr>\
                  <th>Name</th>\
                  <th>Location</th>\
                  <th>Age</th>\
                </tr>\
                </thead>\
                <tbody id="myTable">'

                response.forEach( item => {
                    htmlResponse += '  <tr>\
                    <td>' + item.name + '</td>\
                    <td>' + item.location + '</td>\
                    <td>' + item.Age + '</td>\
                  </tr>'
                });
                htmlResponse += "</tbody></table>"

                $('#results')[0].innerHTML = htmlResponse;
            }
        });

    $("#myInput").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#myTable tr").filter(function() {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
    }
</script>


<style>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>

<p>Type something in the input field to search the table for first names, last names or emails:</p>  
<input id="myInput" type="text" placeholder="Search..">
<br><br>

<div id=results>
</results>
```
</details>

And save.

Now visit the portal at "http://dashboard-host:3000/portal/custom"

{{< img src="/img/dashboard/portal-management/custom_page_dynamic.png" alt="custom_page_display" >}}

You now have a searchable Input box that will dynamically filter the results of the table.
