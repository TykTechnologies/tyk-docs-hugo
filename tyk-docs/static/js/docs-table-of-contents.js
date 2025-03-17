/**
 * Building TOC
 */

var buildTableOfContents = function () {
  var
 ToCContainer = $(".documentation-table-of-contents-container"),
    ToC = $(".documentation-table-of-contents"),
    ToContent = $(".toc__content"),
    ToClbl = $('<span class="toc__label">On this page</span>'),
    contentTitles = $("h2, h3, h4, h5", "#main-content");

  if (!ToC[0]) {
    return;
  }

  if (contentTitles.length < 3) {
    // Remove ToC if there are not enough links
    //ToCContainer.remove();
    //$('.page-content__main').addClass('no-toc');
    return;
  }

  ToContent.html("");
  var accordionGroup = $('<div class="accordion-group"></div>');

  
  ToC.prepend(ToClbl);
  
  
  contentTitles.each(function () {
    var title = $(this).text();

    if ($(this).is("h2")) {
      var h2 = $(this)
        .text()
        .replace(/[^a-zA-Z0-9]/g, "")
        .toLowerCase();
      var accordionItem = $('<div class="accordion-item"></div>');
      var accordionHeader = $(`<a href="#${$(this).attr("id")}" class="toc__item">${title}</a>`);
      accordionHeader.click(function () {
        $(this).toggleClass("accordion-up");
        // Toggle visibility of H3 elements under this H2
        $(this).siblings(".accordion-content").toggle();
      });
      accordionItem.append(accordionHeader);
      accordionGroup.append(accordionItem);
    }

    if ($(this).is("h3")) {
      var link = $(`<a href="#${$(this).attr("id")}" class="sub_toc__item">${title}</a>`);
      var h3 = $(this)
        .text()
        .replace(/[^a-zA-Z0-9]/g, "")
        .toLowerCase();
      var link = $(`<a href="#${$(this).attr("id")}" class="sub_toc__item sub-accordion-title">${title}</a>`);
      var accordionContent = $('<div class="accordion-content"></div>').append(link);
      if (accordionGroup.find(".accordion-item:last").length) {
        accordionGroup.find(".accordion-item:last").append(accordionContent);
      } else {
        ToContent.append(accordionContent);
      }

      accordionContent.click(function () {
        $(this).toggleClass("accordion-up");

        // Toggle visibility of H4 elements under this H3
        accordionContent.siblings(".sub-accordion-content").toggle();
      });
    }

    if ($(this).is("h4")) {
      var h4 = $(this)
        .text()
        .replace(/[^a-zA-Z0-9]/g, "")
        .toLowerCase();
      var subLink = $(`<a href="#${$(this).attr("id")}" class="sub-sub-toc-item sub-accordion-title ">${title}</a>`);
      var subAccordionContent = $('<div class="sub-accordion-content"></div>').append(subLink);
      if (accordionGroup.find(".accordion-item:last .accordion-content:last").length) {
        accordionGroup.find(".accordion-item:last .accordion-content:last").append(subAccordionContent);
      }
      subAccordionContent.click(function () {
        $(this).parent().toggleClass("accordion-up");
        // Toggle visibility of H5 elements under this H4
        $(this).toggleClass("sub-accordion");

        //subAccordionContent.find('.sub-sub-accordion-content').toggleClass('sub-accordion');
      });
    }

    if ($(this).is("h5")) {
      var h5 = $(this)
        .text()
        .replace(/[^a-zA-Z0-9]/g, "")
        .toLowerCase();
      var subSubLink = $(
        `<a href="#${$(this).attr("id")}" class="sub-sub-sub-toc-item sub-accordion-title">${title}</a>`,
      );
      var subSubAccordionContent = $('<div class="sub-sub-accordion-content"></div>').append(subSubLink);
      if (accordionGroup.find(".accordion-item:last .accordion-content:last .sub-accordion-content:last").length) {
        accordionGroup
          .find(".accordion-item:last .accordion-content:last .sub-accordion-content:last")
          .append(subSubAccordionContent);
      }
      subSubAccordionContent.click(function () {
        $(this).parent().toggleClass("sub-accordion");
        subSubAccordionContent.find(".sub-sub-accordion-content").toggleClass("accordion-up");
        // You can add further logic if needed for H5 content
      });
    }
  });

  ToContent.append(accordionGroup);

  activeTocToggle();

  var pageContent = $(".page-content");
  pageContent.on("scroll", highlightAnchor);

  // Open all sections by default on large screens
  if (window.innerWidth >= 1024) {
    $(".accordion-item").each(function () {
      $(this).find(".accordion-content").show();
      $(this).addClass("accordion-up");
    });
    $(".accordion-content").each(function () {
      $(this).find(".sub-accordion-content").show();
    });
    $(".sub-accordion-content").each(function () {
      $(this).find(".sub-sub-accordion-content").show();
    });
  }

  $(".accordion-item").each(function () {
    var accordionContent = $(this).find(".accordion-content");
    if (accordionContent.length) {
      // Do something if there is accordion content
    } else {
      $(this).find("a.toc__item").addClass("accordionHolder");
    }
  });

  $(".accordion-content").each(function () {
    var accordionContent = $(this).find(".sub-accordion-content");
    if (accordionContent.length) {
      // Do something if there is accordion content
      $(this).find("a.sub_toc__item").addClass("sub-accordionHolder");
    } else {
    }
  });

  $(".sub-accordion-content").each(function () {
    var accordionContent = $(this).find(".sub-sub-accordion-content");
    if (accordionContent.length) {
      // Do something if there is accordion content
      $(this).find("a.sub-sub-toc-item").addClass("sub-accordionHolder");
    } else {
    }
  });

  var currentUrl = window.location.href;
  var idArray = [];

  $(".accordion-item:last,.accordion-content:last,.sub-accordion-content:last")
    .find('a[href^="#"]')
    .each(function () {
      idArray.push($(this).attr("href"));
    });
  
    if (idArray.some((value) => currentUrl.includes(value))) {
    var lastAccordionItem = $("div.accordion-item:last,.accordion-content:last,.sub-accordion-content:last");
    lastAccordionItem.children("div").css("display", "block");
  }

  if ($(".toc__label").length > 0) {
    $(".toc__label").eq(1).remove();
  }

  highlightAnchor();

};

// Call the function to build the table of contents with accordion functionality
$(document).ready(buildTableOfContents);
$(document).on("turbolinks:load", buildTableOfContents);
/**
 * Toggle TOC for small devices
 */

function activeTocToggle() {
  var tocLabel = $(".toc__label");
  var tocItems = $(".toc__item");
  var pageContent = $(".page-content__container, .header");

  tocLabel.on("click", function (e) {
    if (window.innerWidth < 1024) {
      $(e.currentTarget).toggleClass("js-open");
    } else {
      $(e.currentTarget).removeClass("js-open");
    }
  });


  pageContent.on("click", function () {
    if (tocLabel.hasClass("js-open")) {
      tocLabel.removeClass("js-open");
    }
  });
}


function highlightAnchor() {
  const contentTitles = $("h2, h3, h4, h5");
  let highestVisibleHeading = null;

  contentTitles.each(function () {
    const rect = $(this)[0].getBoundingClientRect();
    if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
      if (!highestVisibleHeading || rect.top < highestVisibleHeading[0].getBoundingClientRect().top) {
        highestVisibleHeading = $(this);
      }
    }
  });

  if (highestVisibleHeading) {
    const currentSectionId = highestVisibleHeading.attr("id");
    $(".toc__item, .sub_toc__item, .sub-sub-toc-item, .sub-sub-sub-toc-item").removeClass("js-active accordion-up");
    $(
      `.toc__item[href*="#${currentSectionId}"], .sub_toc__item[href*="#${currentSectionId}"], .sub-sub-toc-item[href*="#${currentSectionId}"], .sub-sub-sub-toc-item[href*="#${currentSectionId}"]`,
    ).addClass("js-active accordion-up");

    $(".accordion-up").each(function () {
      $(this).siblings(".accordion-content").show();
      $(this).siblings(".sub-accordion-content").show();
    });

    // Scroll the TOC container to the highlighted item on large screens
    if (window.innerWidth >= 1024) {
      const activeTocItem = $(
        `.toc__item[href*="#${currentSectionId}"], .sub_toc__item[href*="#${currentSectionId}"], .sub-sub-toc-item[href*="#${currentSectionId}"], .sub-sub-sub-toc-item[href*="#${currentSectionId}"]`,
      );
      if (activeTocItem.length) {
        activeTocItem[0].scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }
  }

  $(".sub_toc__item.accordion-up").click(function () {
    $(this).siblings(".sub-accordion-content").hide();
  });
}

// Call the function to build the table of contents with accordion functionality
$(document).ready(buildTableOfContents);
$(document).on("turbolinks:load", buildTableOfContents);
/**
 * Toggle TOC for small devices
 */

function activeTocToggle() {
  var tocLabel = $(".toc__label");
  var tocItems = $(".toc__item");
  var pageContent = $(".page-content__container, .header");

  tocLabel.on("click", function (e) {
    if (window.innerWidth < 1024) {
      $(e.currentTarget).toggleClass("js-open");
    } else {
      $(e.currentTarget).removeClass("js-open");
    }
  });

 

  pageContent.on("click", function () {
    if (tocLabel.hasClass("js-open")) {
      tocLabel.removeClass("js-open");
    }
  });
}