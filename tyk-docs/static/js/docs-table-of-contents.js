var buildTableOfContents = function () {
  var ToCContainer = $(".documentation-table-of-contents-container"),
    ToC = $(".documentation-table-of-contents"),
    ToContent = $(".toc__content"),
    ToClbl = $('<span class="toc__label">On this page</span>'),
    contentTitles = $("h1, h2, h3, h4, h5", "#main-content");

  if (!ToC[0]) {
    return;
  }

  if (contentTitles.length < 3) {
    return;
  }

  ToContent.html("");
  var accordionGroup = $('<div class="accordion-group"></div>');
  var lastH1Item = null;

  contentTitles.each(function () {
    ToC.prepend(ToClbl);
    var title = $(this).text();
    var id = $(this).attr("id");

    if (!id) {
      id = title.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
      $(this).attr("id", id);
    }

    if ($(this).is("h1")) {
      lastH1Item = $('<div class="h1-container"></div>');
      var h1Link = $(`<a href="#${id}" class="toc__item h1-item">${title}</a>`);
      lastH1Item.append(h1Link);
      accordionGroup.append(lastH1Item);
    }

    if ($(this).is("h2")) {
      var h2Item = $('<div class="accordion-item"></div>');
      var h2Link = $(`<a href="#${id}" class="toc__item">${title}</a>`);

      h2Link.click(function () {
        $(this).toggleClass("accordion-up");
        $(this).siblings(".accordion-content").toggle();
      });

      h2Item.append(h2Link);

      if (lastH1Item) {
        lastH1Item.append(h2Item);
      } else {
        accordionGroup.append(h2Item);
      }
    }

    if ($(this).is("h3")) {
      var h3Link = $(`<a href="#${id}" class="sub_toc__item sub-accordion-title">${title}</a>`);
      var accordionContent = $('<div class="accordion-content"></div>').append(h3Link);

      if (accordionGroup.find(".accordion-item:last").length) {
        accordionGroup.find(".accordion-item:last").append(accordionContent);
      }
    }

    if ($(this).is("h4")) {
      var h4Link = $(`<a href="#${id}" class="sub-sub-toc-item sub-accordion-title">${title}</a>`);
      var subAccordionContent = $('<div class="sub-accordion-content"></div>').append(h4Link);

      if (accordionGroup.find(".accordion-item:last .accordion-content:last").length) {
        accordionGroup.find(".accordion-item:last .accordion-content:last").append(subAccordionContent);
      }
    }

    if ($(this).is("h5")) {
      var h5Link = $(`<a href="#${id}" class="sub-sub-sub-toc-item sub-accordion-title">${title}</a>`);
      var subSubAccordionContent = $('<div class="sub-sub-accordion-content"></div>').append(h5Link);

      if (accordionGroup.find(".accordion-item:last .accordion-content:last .sub-accordion-content:last").length) {
        accordionGroup
          .find(".accordion-item:last .accordion-content:last .sub-accordion-content:last")
          .append(subSubAccordionContent);
      }
    }
  });

  ToContent.append(accordionGroup);
};

// Call TOC builder on page load
$(document).ready(buildTableOfContents);
$(document).on("turbolinks:load", buildTableOfContents);
