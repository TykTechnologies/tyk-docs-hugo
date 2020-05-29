/**
 * INIT INSTAN SEARCH
 */

var searchClient = algoliasearch(
	'ALGOLIA_APP_ID',
	'ALGOLIA_API_KEY'
);


var search = instantsearch({
	indexName: 'tyk-docs',
	searchClient,
	searchFunction: function(helper) {
		var searchResults = document.getElementById('hits');
		var searchbox = document.getElementById('searchbox');

		if (helper.state.query === '') {
		  searchResults.style.display = 'none';
		  searchbox.classList.remove('js-active');
		  return;
		}
		helper.search();
		searchResults.style.display = 'block';
		searchbox.classList.add('js-active');
	}
});


/**
 * TEMPLATE VARIABLES
 */

var noResultsTemplate = function(query) {
  return `<li class="hit media">No results found matching <strong>${query}</strong>.</li>`;
} 
	  
var hitTemplate = function(hit) {
	return `<li class="hit media">
				<div class="media-body">
					<div class="media-body-title"><a href="/docs${hit.path}" <h4 class="media-heading">${hit.section} - ${instantsearch.highlight({ attribute: 'title', hit })}.</h4></p> </a></div>
					<div class="media-body-body"><a href="/docs${hit.path}" <h4 class="media-heading em">..${instantsearch.snippet({ attribute: 'article', hit })}..</h4></p> </a></div>
				</div>
			</li>`;
}

/**
 * INFINITE SCROLL
 */

var infiniteHits = instantsearch.connectors.connectInfiniteHits(
  function(renderArgs, isFirstRender) {
    var { hits, showMore, widgetParams } = renderArgs;
    var { container } = widgetParams;

	lastRenderArgs = renderArgs;
	
    if (isFirstRender) {
		var sentinel = document.createElement('div');
		container.appendChild(document.createElement('ul'));
		container.appendChild(sentinel);

		var observer = new IntersectionObserver(function(entries) {
			entries.forEach(function(entry) {
				if (entry.isIntersecting && !lastRenderArgs.isLastPage) {
				showMore();
				}
			});
		});

		observer.observe(sentinel);

		return;
    }


	if (hits.length > 0 && hits != null) {
		container.querySelector('ul').innerHTML = hits
			.map(function(hit) {
        return hitTemplate(hit)
      })
			.join('');
	} else {
		container.querySelector('ul').innerHTML = noResultsTemplate(renderArgs.results.query);
	}
  }
);


/**
 * ADDING WIDGETS TO INITIAL INSTANTSEARCH
 */

search.addWidgets([
	instantsearch.widgets.searchBox({
			container: '#searchbox',
			autofocus: false,
			placeholder: 'Search...'
	}),
	infiniteHits({
		container: document.querySelector('#hits')
	}),
	instantsearch.widgets.configure({
		hitsPerPage: 8,
		typoTolerance: 'min'
	})
]);


/**
 * Start the search
 */

search.start();
