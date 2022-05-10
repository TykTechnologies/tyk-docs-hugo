---
date: 2020-05-07T17:18:28Z
title: Customizing using jQuery
linktitle: Customizing using jQuery
menu:
  main:
    parent: "Customise"
url: /tyk-developer-portal/tyk-portal-classic/customise/customize-with-jquery/
aliases:
  - /tyk-developer-portal/customise/customize-with-jquery/
---

Tyk Portal comes prepackaged with jQuery.  This opens up a whole world of customisation, by extending our Portal using JavaScript and HTML to create dynamic content.


## Dynamic Content Rendering & Filtering

let's walk through an example where we use jQuery to fetch data from a REST endpoint, then display it in a table where we can filter our results.

{{< youtube njRgYUpL5vs >}}


**First of all, create a custom page in the portal.**


![custom_page_setup](/docs/img/dashboard/portal-management/new_custom_page.png)

In the MainBody, we can paste the code below (click the text to display):

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

now visit the portal at "http://dashboard-host:3000/portal/custom"

![custom_page_display](/docs/img/dashboard/portal-management/custom_page_dynamic.png)

We now have a searchable Input box that will dynamically filter the results of the table.
