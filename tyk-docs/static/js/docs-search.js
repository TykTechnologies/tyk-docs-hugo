(function() {
  let inputSelector = '#searchbox input';

  /**
   * INIT INSTANT SEARCH
   */
  docsearch({
    algoliaOptions: {
    hitsPerPage: 200,
    // See https://www.algolia.com/doc/api-reference/api-parameters/
    },
    // Your apiKey and indexName will be given to you once
    // we create your config
    apiKey: 'ALGOLIA_API_KEY',
    indexName: 'docsearch',
    appId: 'ALGOLIA_APP_ID', // Should be only included if you are running DocSearch on your own.
    // Replace inputSelector with a CSS selector
    // matching your search input
    inputSelector,
    // Set debug to true to inspect the dropdown
    // debug: true,
  });

  document.body.addEventListener('keydown', e => {
    let input = document.querySelector(inputSelector);

    if (e.key !== '/' || !input || e.target !== document.body) return;

    e.preventDefault();
    input.focus();
  });
}());