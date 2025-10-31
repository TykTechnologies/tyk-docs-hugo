/**
 * Building TOC
 */

var buildTableOfContents = function () {
  var ToC = $(".documentation-table-of-contents"),
    ToContent = $(".toc__content"),
    ToClbl = $('<span class="toc__label">On this page</span>'),
    contentTitles = $("h2, h3, h4, h5", "#main-content");

  if (!ToC[0]) {
    return;
  }

  if (contentTitles.length < 3) {
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
      var link = $(`<a href="#${$(this).attr("id")}" class="sub_toc__item sub-accordion-title">${title}</a>`);
      var h3 = $(this)
        .text()
        .replace(/[^a-zA-Z0-9]/g, "")
        .toLowerCase();
      var accordionContent = $('<div class="accordion-content"></div>').append(link);
      if (accordionGroup.find(".accordion-item:last").length) {
        accordionGroup.find(".accordion-item:last").append(accordionContent);
      } else {
        ToContent.append(accordionContent);
      }

      link.click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        var $parentContent = $(this).parent('.accordion-content');
        $parentContent.toggleClass("accordion-up");
        // Toggle visibility of H4 elements under this H3
        $parentContent.children('.sub-accordion-content').toggle();
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
  
    //if (idArray.some((value) => currentUrl.includes(value))) {
      //var lastAccordionItem = $("div.accordion-item:last,.accordion-content:last,.sub-accordion-content:last");
      //lastAccordionItem.children("div").css("display", "block");
    //}

  if ($(".toc__label").length > 0) {
    $(".toc__label").eq(1).remove();
  }

};

const pageContentContainer = document.querySelector(".page-content__container");
let highestVisibleHeading = null;
let fragmentDetected = false;

function activeTocToggle() {
  var tocLabel = $(".toc__label");
  var pageContent = $(".page-content__container, .header");

  // Initially hide the TOC content on small screens
  if (window.innerWidth < 1024) {
    $(".toc__content").hide();
  }

  // Remove any existing event handlers to prevent multiple bindings
  tocLabel.off("click");

  tocLabel.on("click", function (e) {
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

// Add an onscroll event to the page-content__container
$(".page-content").on("scroll", function () {
  newActiveId = getHighestHeading();
  if(newActiveId != initialactiveId){
    initialactiveId = newActiveId;
    highlightActiveItem(initialactiveId);
  }
});


// get either the fragment on the intial load or if no fragment get the highest level visible heading
function getActiveId(){
  let activeId= null;
  const fragment = window.location.hash;
  if (fragment) {
    activeId = fragment.slice(1);
    fragmentDetected = true;
  } else {
    activeId = getHighestHeading();
  }
  return activeId;
}


/// Get the highest visible heading and return its id
function getHighestHeading() {
  const contentTitles = $("h2, h3, h4, h5");
  let highestVisibleHeading = null;
  const headerHeight = 100; // Adjust this value to match the height of your fixed header
  // Find the highest visible heading in the viewport
  contentTitles.each(function () {
    const rect = $(this)[0].getBoundingClientRect();
    // Ensure the heading is fully or partially visible in the viewport, accounting for the header
    if (rect.top >= headerHeight && rect.top < window.innerHeight) {
      if (!highestVisibleHeading || rect.top < highestVisibleHeading[0].getBoundingClientRect().top) {
        highestVisibleHeading = $(this);
      }
    }
  });

  return highestVisibleHeading ? highestVisibleHeading.attr("id") : null;
}

// highlight the active heading
function highlightActiveItem(activeId){
  if(activeId){
    // Remove active classes from all TOC items
    $(".toc__item, .sub_toc__item, .sub-sub-toc-item, .sub-sub-sub-toc-item").removeClass("js-active accordion-up");

    // Add active classes to the current TOC item
    const activeTocItem = $(
      `.toc__item[href="#${activeId}"], 
       .sub_toc__item[href="#${activeId}"],
       .sub-sub-toc-item[href="#${activeId}"], 
       .sub-sub-sub-toc-item[href="#${activeId}"]`
    ).addClass("js-active accordion-up");
    
    // detect the parent of the activeTocItem
    const parent = activeTocItem.parent();
    // get classes of the parent
    const parentClasses = parent.attr("class");
    if (parentClasses) {
      if (parentClasses === "accordion-item" || parentClasses.split(" ").includes("accordion-item")) {
        expandAccordionGroup(parent);
      }
      else if (parentClasses === "accordion-content" || parentClasses.split(" ").includes("accordion-content")) {
        // Check if parentClasses is exactly "accordion-content" or includes "accordion-content"
        expandAccordionClass(parent);
      }
      else if (parentClasses === "sub-accordion-content" || parentClasses.split(" ").includes("sub-accordion-content")) {
        expandSubAccordionClass(parent);
      }
      else if (parentClasses === "sub-sub-accordion-content" || parentClasses.split(" ").includes("sub-sub-accordion-content")) {
        expandSubSubAccordionClass(parent);
      }
    }
    scrollToHighlightedItem();
  }
}

//scroll to the highlighted item
function scrollToHighlightedItem() {
    const highlightedItem = $(".toc__item.js-active, .sub_toc__item.js-active, .sub-sub-toc-item.js-active, .sub-sub-sub-toc-item.js-active");
    if (highlightedItem.length) {
      const tocContainer = $(".toc__content"); // Adjust this selector if needed
      const tocItemOffset = highlightedItem.offset().top - tocContainer.offset().top + tocContainer.scrollTop();
      // Smooth scroll the TOC container to bring the highlighted item to the top
      tocContainer.animate({ scrollTop: tocItemOffset }, 30);
    }
}

function expandAccordionGroup(AccordionItem) {
  if (fragmentDetected) {
    AccordionItem.addClass("accordion-up");
    fragmentDetected = false;
  }
  const children = AccordionItem.children("div.accordion-content");
  children.css("display", "block");
}

//expand the accordion item group
function expandAccordionClass(AccordionItem){
  if(fragmentDetected){
    AccordionItem.addClass("accordion-up");
    fragmentDetected = false;
  }
  const parent = AccordionItem.parent();
  // get the first href tag of the parent and add the class accordion up to it
  const parentHref = parent.find("a").first();
  parentHref.addClass("accordion-up");
  // add style display block to all child divs of the parent
  parent.children("div").css("display", "block");
  AccordionItem.children("div").css("display", "block");  
}

//expand the sub accordion item group
function expandSubAccordionClass(SubAccordionItem){
  if(fragmentDetected){
    SubAccordionItem.addClass("sub-accordion");
    fragmentDetected = false;
  }
  const parent = SubAccordionItem.parent();
  // get the first href tag of the parent and add the class accordion up to it
  const parentHref = parent.find("a").first();
  parentHref.addClass("accordion-up");
  // add style display block to all child divs of the parent
  parent.children("div").css("display", "block"); 
  // also expand the parent of the parent
  expandAccordionClass(parent); 
}

// expand sub sub accordion item group
function expandSubSubAccordionClass(SubSubAccordionItem){
  const parent = SubSubAccordionItem.parent();
  // get the first href tag of the parent and add the class accordion up to it
  const parentHref = parent.find("a").first();
  parentHref.addClass("accordion-up");
  // add style display block to all child divs of the parent
  parent.children("div").css("display", "block"); 
  // also expand the parent of the parent
  expandSubAccordionClass(parent); 
}

//handle clicks on the toc items
function handleTocClicks(){
  $(".toc__item, .sub_toc__item, .sub-sub-toc-item, .sub-sub-sub-toc-item").on("click", function (e) {
    e.preventDefault();
    const id = $(this).attr("href").slice(1);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "auto" });
      window.history.pushState(null, null, `#${id}`);
    }
  });
}

let initialactiveId;

// Call the function to build the table of contents with accordion functionality
$(document).ready(function () {
  buildTableOfContents();
  initialactiveId = getActiveId();
  highlightActiveItem(initialactiveId);
  handleTocClicks(); // Bind the click handler to all TOC links
});

$(document).on("turbolinks:load", function () {
  buildTableOfContents();
  initialactiveId = getActiveId();
  highlightActiveItem(initialactiveId);
  handleTocClicks(); // Bind the click handler to all TOC links
});