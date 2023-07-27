var doNav = function() {
	var currentPage = location.pathname,
		currentPageGH = currentPage.replace(/\/$/, ""),
		githubIndexLink = currentPage.replace(/\/docs/, ""),
		githubCustomLink = currentPageGH.replace(/\/docs/, ""),
		docName = /[^/]*$/.exec(githubCustomLink)[0],
		prevPage, nextPage, currentPageIndex,
		troubleshootingURL = /\/docs\/troubleshooting\//;
		faqURL = /\/docs\/frequently-asked-questions\//;
		links = $('.st-treed a');

	function getCurrentPageIndex(arr, page) {
		var i;

		for (i = 0; i < arr.length; i++) {
			let link=arr[i].link
			if(link){
				link=removeBaseUrl(link)
			}
			let linkWithTrailingSlash=link + '/'
			if(linkWithTrailingSlash === page || link === page) {
				return i;
			}
		}
		return -1;
	}
	function removeBaseUrl(str) {
		return str.substring(str.indexOf('/docs/'));
	}

	function getNextPage(links,pageIndex){
		if(pageIndex === links.length - 1){
			return ''
		}
		let nextIndex=pageIndex + 1
		let nextPage = links[nextIndex];
		if(nextPage.link){
			return  nextPage
		}
		return  getNextPage(links,nextIndex)
	}

	function getPreviousPage(links,pageIndex){
		if(pageIndex===0){
			return ''
		}
		let prevIndex=pageIndex - 1
		let prevPage=links[prevIndex];
		if(prevPage.link){
			return  prevPage
		}
		return  getPreviousPage(links,prevIndex)
	}
	links = links.map(function(index, item) { 
		return {
			text: $(item).text(),
			link: $(item).attr('href')
		}; 
	}).toArray();

	currentPageIndex = getCurrentPageIndex(links, currentPage);
	nextPage = getNextPage(links,currentPageIndex);
	prevPage = getPreviousPage(links,currentPageIndex);
	if(!prevPage) {
		$('#previousArticle').hide();
	} else {
		$("#previousArticle").html("<span>PREVIOUS</span>" + prevPage.text).attr('href', prevPage.link);	
	}
	
	if(!nextPage) {
		$('#nextArticle').hide();
	} else {
		$("#nextArticle").html("<span>NEXT</span>" + nextPage.text).attr('href', nextPage.link);	
	}

	$('.suggest-edit').on('click', function (e){
		e.preventDefault();
		let extension = $('[data-filetype]').data('filetype') || 'md';
		
    if ( $('.active').hasClass('st-open')){
			window.open("https://github.com/TykTechnologies/tyk-docs/tree/master/tyk-docs/content/" + githubCustomLink + '/' + docName + '.md', "_blank");
		} else if ( $('.active').hasClass('st-file') && $('.active').closest('.st-open').length === 0) {
			if(currentPageGH == '/docs'){
				window.open("https://github.com/TykTechnologies/tyk-docs/tree/master/tyk-docs/content/documentation.md", "_blank");
			} else {
				window.open("https://github.com/TykTechnologies/tyk-docs/tree/master/tyk-docs/content" + githubIndexLink + githubCustomLink + '.md', "_blank");
			}
		} else if ( $('.active').hasClass('st-file') ) {
			window.open("https://github.com/TykTechnologies/tyk-docs/tree/master/tyk-docs/content" + githubCustomLink + "." + extension, "_blank");
		}
	});


	if((location.pathname.match(troubleshootingURL)) ||  (location.pathname.match(faqURL)) ) {
		$('.docs-navigation').hide();
	}

	// Highlight parent of selected item
	$('.st-file.active').closest('.st-open').addClass('child-active');
};

$(document).ready(doNav);
$(document).on('turbolinks:load', doNav);
