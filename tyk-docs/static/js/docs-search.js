var search = instantsearch({
  appId: 'EIXQM46UN9',
  apiKey: '10c29e867eddcb37b72bf886a3bb1acf',
  indexName: 'tyk-test-with-url',
  query: 'query',
  advancedSyntax: true,
  searchFunction(helper) {
    var hits = document.getElementById("hits");
    var pagination = document.getElementById("pagination");

    if (helper.state.query === '') {
        hits.style.display = 'none';
        pagination.style.display = 'none';
      return;
    }

    helper.setQueryParameter('attributesToSnippet', ['article:10']);
    helper.setQueryParameter('advancedSyntax', true).search();

    hits.style.display = 'block';
    pagination.style.display = 'block';

    helper.search();

  }
});

search.addWidget(
  instantsearch.widgets.searchBox({
    container: '#q',
    autofocus: false
  })
); 


var hitTemplate =
  '<div class="hit media">' +
    '<div class="media-body">' +
      '<div class="media-body-title"><a href="/docs{{path}}" <h4 class="media-heading">{{{_highlightResult.title.value}}}.</h4></p> </a></div>' +
      '<div class="media-body-body"><a href="/docs{{path}}" <h4 class="media-heading em">..{{{_snippetResult.article.value}}}..</h4></p> </a></div>' +
    '</div>' +
  '</div>';

var noResultsTemplate =
  '<div class="text-center">No results found matching <strong>{{query}}</strong>.</div>';

search.addWidget(
  instantsearch.widgets.hits({
    container: '#hits',
    autofocus: false,
    hitsPerPage: 5,
    templates: {
      empty: noResultsTemplate,
      item: hitTemplate,
    }
  })
);

search.addWidget(
  instantsearch.widgets.pagination({
    container: '#pagination',
    cssClasses: {
      root: 'pagination',
      active: 'active'
    }
  })
);


search.start();