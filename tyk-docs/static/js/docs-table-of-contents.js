/**
 * Building TOC
 */

var buildTableOfContents = function () {
  var ToCContainer = $(".documentation-table-of-contents-container"),
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

  // Check if the label already exists before appending
  if ($(".toc__label").length === 0) {
    ToC.prepend(ToClbl);
  }

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
  // if (window.innerWidth >= 1024) {
  //   $(".accordion-item").each(function () {
  //     $(this).find(".accordion-content").show();
  //     $(this).addClass("accordion-up");
  //   });
  //   $(".accordion-content").each(function () {
  //     $(this).find(".sub-accordion-content").show();
  //   });
  //   $(".sub-accordion-content").each(function () {
  //     $(this).find(".sub-sub-accordion-content").show();
  //   });
  // }

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
  // Handle fragment in URL on page load for large screens
  if (window.innerWidth >= 1024) {
    handleFragmentOnLoad();
  }

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

  // Initially hide the TOC content on small screens
  if (window.innerWidth < 1024) {
    $(".toc__content").hide();
  }

  // Remove any existing event handlers to prevent multiple bindings
  tocLabel.off("click");

  tocLabel.on("click", function (e) {
    console.log("tocLabel clicked");
    if (window.innerWidth < 1024) {
      $(e.currentTarget).toggleClass("js-open");
      $(".toc__content").toggle();
    } else {
      $(e.currentTarget).removeClass("js-open");
    }
  });

  pageContent.on("click", function () {
    if (tocLabel.hasClass("js-open")) {
      tocLabel.removeClass("js-open");
      $(".toc__content").hide();
    }
  });
}

let isUserScrollingTOC = false; // Flag to track user scrolling in the TOC
let isUserScrollingContent = false; // Flag to track user scrolling in the main content

function highlightAnchor() {
  console.log("highlightAnchor called");
  const contentTitles = $("h2, h3, h4, h5");
  let highestVisibleHeading = null;

  // Find the highest visible heading in the viewport
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
    console.log("currentSectionId", currentSectionId);

    // Remove active classes from all TOC items
    $(".toc__item, .sub_toc__item, .sub-sub-toc-item, .sub-sub-sub-toc-item").removeClass("js-active accordion-up");

    // Add active classes to the current TOC item
    const activeTocItem = $(
      `.toc__item[href="#${currentSectionId}"], 
       .sub_toc__item[href="#${currentSectionId}"],
       .sub-sub-toc-item[href="#${currentSectionId}"], 
       .sub-sub-sub-toc-item[href="#${currentSectionId}"]`
    ).addClass("js-active accordion-up");

    // Expand all parent sections of the active TOC item
    activeTocItem.parents(".accordion-content, .sub-accordion-content, .sub-sub-accordion-content").each(function () {
      $(this).show(); // Ensure the parent section is visible
      $(this).prev("a").addClass("accordion-up"); // Add the "accordion-up" class to the parent link
    });

    // Ensure all sibling items within the same grandparent container are visible
    const parentContainer = activeTocItem.closest(".sub-sub-accordion-content").parent(".sub-accordion-content");
    if (parentContainer.length) {
      console.log("Grandparent container found:", parentContainer);
      parentContainer.children(".sub-sub-accordion-content").each(function () {
        $(this).css("display", "block"); // Make all sibling items visible
      });
    } else {
      console.log("Parent container found:", activeTocItem.closest(".sub-accordion-content, .accordion-content"));
      activeTocItem.closest(".sub-accordion-content, .accordion-content").children().each(function () {
        $(this).css("display", "block"); // Make all sibling items visible
      });
    }

    // Scroll the TOC container to the highlighted item on large screens
    if (!isUserScrollingTOC && !isUserScrollingContent && window.innerWidth >= 1024) {
      const tocContainer = $(".toc__content"); // Adjust this selector if needed
      if (activeTocItem.length && tocContainer.length) {
        const tocItemOffset = activeTocItem.offset().top - tocContainer.offset().top + tocContainer.scrollTop();
        tocContainer.animate({ scrollTop: tocItemOffset }, 300); // Smooth scroll to position
      }
    }
  }
}

// Detect user scrolling in the TOC
$(".toc__content").on("scroll", function () {
  isUserScrollingTOC = true;
  clearTimeout($.data(this, "scrollTimer"));
  $.data(this, "scrollTimer", setTimeout(function () {
    isUserScrollingTOC = false; // Re-enable automatic scrolling after user stops scrolling
  }, 300));
});

// Detect user scrolling in the main content
$(".page-content").on("scroll", function () {
  isUserScrollingContent = true;
  clearTimeout($.data(this, "scrollTimer"));
  $.data(this, "scrollTimer", setTimeout(function () {
    isUserScrollingContent = false; // Re-enable automatic scrolling after user stops scrolling
  }, 300));
});

// Function to handle fragment in URL on page load for large screens
function handleFragmentOnLoad() {
  const fragment = window.location.hash;
  if (fragment) {
    highlightAnchor();
  }
}

// Call the function to build the table of contents with accordion functionality
$(document).ready(buildTableOfContents);
$(document).on("turbolinks:load", buildTableOfContents);