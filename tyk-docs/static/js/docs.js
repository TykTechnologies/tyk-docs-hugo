!function(i){i.fn.theiaStickySidebar=function(t){function o(t,o){var a=e(t,o);a||(console.log("TSS: Body width smaller than options.minWidth. Init is delayed."),i(document).scroll(function(t,o){return function(a){var n=e(t,o);n&&i(this).unbind(a)}}(t,o)),i(window).resize(function(t,o){return function(a){var n=e(t,o);n&&i(this).unbind(a)}}(t,o)))}function e(t,o){return t.initialized===!0||!(i("body").width()<t.minWidth)&&(a(t,o),!0)}function a(t,o){t.initialized=!0,i("head").append(i('<style>.theiaStickySidebar:after {content: ""; display: table; clear: both;}</style>')),o.each(function(){function o(){a.fixedScrollTop=0,a.sidebar.css({"min-height":"1px"}),a.stickySidebar.css({position:"static",width:"",transform:"none"})}function e(t){var o=t.height();return t.children().each(function(){o=Math.max(o,i(this).height())}),o}var a={};if(a.sidebar=i(this),a.options=t||{},a.container=i(a.options.containerSelector),0==a.container.length&&(a.container=a.sidebar.parent()),a.sidebar.parents().css("-webkit-transform","none"),a.sidebar.css({position:"relative",overflow:"visible","-webkit-box-sizing":"border-box","-moz-box-sizing":"border-box","box-sizing":"border-box"}),a.stickySidebar=a.sidebar.find(".theiaStickySidebar"),0==a.stickySidebar.length){var r=/(?:text|application)\/(?:x-)?(?:javascript|ecmascript)/i;a.sidebar.find("script").filter(function(i,t){return 0===t.type.length||t.type.match(r)}).remove(),a.stickySidebar=i("<div>").addClass("theiaStickySidebar").append(a.sidebar.children()),a.sidebar.append(a.stickySidebar)}a.marginBottom=parseInt(a.sidebar.css("margin-bottom")),a.paddingTop=parseInt(a.sidebar.css("padding-top")),a.paddingBottom=parseInt(a.sidebar.css("padding-bottom"));var d=a.stickySidebar.offset().top,s=a.stickySidebar.outerHeight();a.stickySidebar.css("padding-top",1),a.stickySidebar.css("padding-bottom",1),d-=a.stickySidebar.offset().top,s=a.stickySidebar.outerHeight()-s-d,0==d?(a.stickySidebar.css("padding-top",0),a.stickySidebarPaddingTop=0):a.stickySidebarPaddingTop=1,0==s?(a.stickySidebar.css("padding-bottom",0),a.stickySidebarPaddingBottom=0):a.stickySidebarPaddingBottom=1,a.previousScrollTop=null,a.fixedScrollTop=0,o(),a.onScroll=function(a){if(a.stickySidebar.is(":visible")){if(i("body").width()<a.options.minWidth)return void o();if(a.options.disableOnResponsiveLayouts){var r=a.sidebar.outerWidth("none"==a.sidebar.css("float"));if(r+50>a.container.width())return void o()}var d=i(document).scrollTop(),s="static";if(d>=a.sidebar.offset().top+(a.paddingTop-a.options.additionalMarginTop)){var c,p=a.paddingTop+t.additionalMarginTop,b=a.paddingBottom+a.marginBottom+t.additionalMarginBottom,l=a.sidebar.offset().top,f=a.sidebar.offset().top+e(a.container),h=0+t.additionalMarginTop,g=a.stickySidebar.outerHeight()+p+b<i(window).height();c=g?h+a.stickySidebar.outerHeight():i(window).height()-a.marginBottom-a.paddingBottom-t.additionalMarginBottom;var u=l-d+a.paddingTop,S=f-d-a.paddingBottom-a.marginBottom,y=a.stickySidebar.offset().top-d,m=a.previousScrollTop-d;"fixed"==a.stickySidebar.css("position")&&"modern"==a.options.sidebarBehavior&&(y+=m),"stick-to-top"==a.options.sidebarBehavior&&(y=t.additionalMarginTop),"stick-to-bottom"==a.options.sidebarBehavior&&(y=c-a.stickySidebar.outerHeight()),y=m>0?Math.min(y,h):Math.max(y,c-a.stickySidebar.outerHeight()),y=Math.max(y,u),y=Math.min(y,S-a.stickySidebar.outerHeight());var k=a.container.height()==a.stickySidebar.outerHeight();s=(k||y!=h)&&(k||y!=c-a.stickySidebar.outerHeight())?d+y-a.sidebar.offset().top-a.paddingTop<=t.additionalMarginTop?"static":"absolute":"fixed"}if("fixed"==s){var v=i(document).scrollLeft();a.stickySidebar.css({position:"fixed",width:n(a.stickySidebar)+"px",transform:"translateY("+y+"px)",left:a.sidebar.offset().left+parseInt(a.sidebar.css("padding-left"))-v+"px",top:"0px"})}else if("absolute"==s){var x={};"absolute"!=a.stickySidebar.css("position")&&(x.position="absolute",x.transform="translateY("+(d+y-a.sidebar.offset().top-a.stickySidebarPaddingTop-a.stickySidebarPaddingBottom)+"px)",x.top="0px"),x.width=n(a.stickySidebar)+"px",x.left="",a.stickySidebar.css(x)}else"static"==s&&o();"static"!=s&&1==a.options.updateSidebarHeight&&a.sidebar.css({"min-height":a.stickySidebar.outerHeight()+a.stickySidebar.offset().top-a.sidebar.offset().top+a.paddingBottom}),a.previousScrollTop=d}},a.onScroll(a),i(document).scroll(function(i){return function(){i.onScroll(i)}}(a)),i(window).resize(function(i){return function(){i.stickySidebar.css({position:"static"}),i.onScroll(i)}}(a)),"undefined"!=typeof ResizeSensor&&new ResizeSensor(a.stickySidebar[0],function(i){return function(){i.onScroll(i)}}(a))})}function n(i){var t;try{t=i[0].getBoundingClientRect().width}catch(i){}return"undefined"==typeof t&&(t=i.width()),t}var r={containerSelector:"",additionalMarginTop:0,additionalMarginBottom:0,updateSidebarHeight:!0,minWidth:0,disableOnResponsiveLayouts:!0,sidebarBehavior:"modern"};t=i.extend(r,t),t.additionalMarginTop=parseInt(t.additionalMarginTop)||0,t.additionalMarginBottom=parseInt(t.additionalMarginBottom)||0,o(t,this)}}(jQuery);

function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

var searchContainerFn = function() {
	var $body = $('body'),
		$html = $('html'),
    container = $(".documentation-search-container");
	
	// Remove helper class
	$html.removeClass('no-js');
	
	// Tree Menu
	$('[data-tree]').simpleTree({startCollapsed: true});
	
	
	// Sticky Sidebar 
	if ($('[data-sticky]').size() > 0 ) {
	    $('[data-sticky]').theiaStickySidebar({
			// Settings
			containerSelector	:	'.section-page',
			additionalMarginTop	:	113,
			minWidth			:	1000
	    });		
	}

	// Toggle Class
	$body.on('click','a[data-toggle], button[data-toggle]', function(e){
		e.preventDefault();
		$body.toggleClass($(this).data('toggle'));
	});	 

	// Scroll Class
	$body.on('click','a[data-scroll]', function(e){
		e.preventDefault();
		$('html, body').animate({scrollTop:0}, 'slow');
	});

	// Print Class
	$body.on('click','a[data-print]', function(e){
		e.preventDefault();
		window.print();
	});


	// Search result list container functionality 
	$(document).mouseup(function(e) {
    if (!container.is(e.target) && container.has(e.target).length === 0) 
    {
      container.slideUp();
    }
	});

	$('.ais-search-box').click(function(){
		$('.documentation-search-container').slideDown();
	})
};

// Scroll to Top  
$(window).scroll(function() {
  if ($(this).scrollTop() >= 250) {
      $('#return-to-top, .button.grey.medium.bottom').fadeIn(200);
  } else {
      $('#return-to-top, .button.grey.medium.bottom').fadeOut(200);
  }

	});
	$('#return-to-top , .button.grey.medium.bottom').click(function() {
	  $('body,html').animate({
	      scrollTop : 0
	  }, 500);
});

// Handle Table ofContents
// $(window).scroll(function(){
//   var threshold = 800;
//   var op = (($(document).height() - $(window).height()) - $(window).scrollTop()) / threshold;
// 	if( op <= 0 ){
// 		$(".documentation-table-of-contents").hide();
// 	} else {
// 		$(".documentation-table-of-contents").show();
// 	}
// 	// $(".documentation-table-of-contents").css("opacity", op ); 
// });

// Turbo links
if (!window.debCfn) {
	var debCfn = debounce(searchContainerFn, 500, false);

	$(document).ready(debCfn);
	$(document).on("turbolinks:load", debCfn);
}

// Copy to clipboard handler
$(document).ready(function(e){

	$.fn.copyToClipboard = function() {

		return this.each(function($elem) {
			var $textArea = $('<textarea></textarea>');
			var $element = $(this);
			var $parent = $element.parent();
			var $button = $('<button class="button copy">Copy to Clipboard</button>');

			var appendButton = function appendButton() {
				$button.insertAfter($parent);
			};

			var selectCodeToBeCopied = function selectCodeToBeCopied() {
				$textArea.val($element.text());
				$textArea.insertAfter($element);
				$textArea.select();
			};

			var copyTextToClipboard = function copyTextToClipboard() {
				try {
					document.execCommand('copy');
					$button.text( 'Copied!').prop('disabled', true);
				} catch (err) {
					$button.text( 'FAILED: Could not copy').prop('disabled', true);
				}

				$textArea.remove();

				setTimeout(function(){
					$button.text( 'Copy to Clipboard').prop('disabled', false);
				}, 3000);			
			};

			var bindEvents = function bindEvents() {
				$button.on('click', function(e) {
					e.preventDefault();
					selectCodeToBeCopied();
					copyTextToClipboard();
				});
			};

			appendButton();
			bindEvents();
		});   
	};

	$('code[class^="language"]:not(.language-diff)').copyToClipboard();

//Handle header hyperlinks
	$('.wysiwyg').find('h2:not(.see_also_heading), h3:not(.see_also_heading), h4:not(.see_also_heading), h5:not(.see_also_heading)').hover(function () {
		$(this).append('<a href=#' + $(this).context.id + '><img src="/docs/img/link.svg" />  </a>'); },
		function(){
			$(this).find($('a[href="#' + $(this).context.id +'"]')).remove();
		});
});

$(document).ready(function(e){
	// Handle tabs menu in page-submenu by creating a toggled dropdown
	var $page_submenu = $('.page-submenu');
	var $submenu_tab_items = $page_submenu.find('.links-container a:not(.active)');
	var $submenu_tab_active = $page_submenu.find('.links-container a.active');

	if ($submenu_tab_items) {
		$submenu_tab_items.wrapAll('<div class="links-container--dropdown"></div>');
		
		$submenu_tab_active.on('click', function(e) {
			e.preventDefault();
			var $tab_active_parent = $(e.currentTarget).closest('.links-container');
			var $submenu_tab_dropdown = $('.links-container--dropdown');
			
			$tab_active_parent.toggleClass('js-open');
			console.log($submenu_tab_dropdown)
		});	
	}
	
});