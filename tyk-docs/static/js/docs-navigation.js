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
				//remove base url from link e.g '//localhost:1313/docs/nightly/getting-started/key-concepts/high-level-concepts/
				//should be turned into /docs/nightly/getting-started/key-concepts/high-level-concepts/
				link=removeBaseUrl(link)
			}
			//in some cases we might have (/high-level-concepts/ and /high-level-concepts) which must be treated
			//as the same url, so we add '/' to each url.
			let linkWithTrailingSlash=link + '/'
			if(linkWithTrailingSlash === page || link === page) {
				return i;
			}
		}
		return -1;
	}
	//some urls are in th format '//localhost:1313/docs/nightly/getting-started/key-concepts/high-level-concepts/'
	//we should make sure we strip the base url (//localhost:1313)
	//so that we can compare.
	function removeBaseUrl(str) {
		return str.substring(str.indexOf('/docs/'));
	}

	//getNextPage returns the first page after the current page that
	//has a link.
	function getNextPage(links,pageIndex){
		//check if it is the last page and return empty string.
		if(pageIndex === links.length - 1){
			return ''
		}
		let nextIndex=pageIndex + 1
		let nextPage = links[nextIndex];
		//check if the page has a link otherwise move the cursor forward.
		//and check the next page.
		if(!nextPage){
			return ''
		}
		if(nextPage.link){
			return  nextPage
		}

		return  getNextPage(links,nextIndex)
	}

	//getPreviousPage return the page before the current page.
	//if it has a link.
	function getPreviousPage(links,pageIndex){
		//check if it is the first page and return empty as first page has no previous .
		if(pageIndex===0){
			return ''
		}
		let prevIndex=pageIndex - 1
		let prevPage=links[prevIndex];
		//check if the link before the current page
		//has a link otherwise loop until you find one with a link.
		//and set it as previous.
		if(!prevPage){
			return ''
		}
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
