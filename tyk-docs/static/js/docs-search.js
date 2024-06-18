(function() {
  let inputSelector = '#search_container input';

  /**
   * INIT INSTANT SEARCH
   */
  docsearch({
    // Your apiKey and indexName will be given to you once
    // we create your config
    apiKey: "ALGOLIA_NEW_API_KEY",
    indexName: "tyk",
    appId: "ALGOLIA_NEW_APP_ID", // Should be only included if you are running DocSearch on your own.
    // Replace inputSelector with a CSS selector
    // matching your search input
    container: "#search_container",
    // Set debug to true to inspect the dropdow
    // debug: true,
  });

  document.body.addEventListener('keydown', e => {
    let input = document.querySelector(inputSelector);

    if (e.key !== '/' || !input || e.target !== document.body) return;

    e.preventDefault();
    input.focus();
  });
}());