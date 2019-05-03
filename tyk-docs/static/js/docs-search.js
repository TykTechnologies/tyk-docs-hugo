var search = instantsearch({
  appId: 'EIXQM46UN9',
  apiKey: '2fe33796b7f332e9a8ecc25de3d5e0be',
  indexName: 'tyk-docs',
  query: 'query',
  advancedSyntax: true,
  searchFunction(helper) {
    let hits = document.getElementById('hits'),
      pagination = document.getElementById('pagination'),
      algLogo = document.getElementById('algolia-logo');

    if (helper.state.query.length < 3) {
      hits.style.display = 'none';
      pagination.style.display = 'none';
      algLogo.style.display = 'none';
      return;
    }

    helper.setQueryParameter('attributesToSnippet', ['article:10']);
    helper.setQueryParameter('advancedSyntax', true).search();

    hits.style.display = 'block';
    pagination.style.display = 'block';
    algLogo.style.display = 'block';

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
      '<div class="media-body-title"><a href="/docs{{path}}" <h4 class="media-heading">{{section}} - {{{_highlightResult.title.value}}}.</h4></p> </a></div>' +
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