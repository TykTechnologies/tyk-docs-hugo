document.addEventListener('DOMContentLoaded', function () {
  const searchForm = document.getElementById('searchForm');
  const resultsOverlay = document.getElementById('results-overlay');
  const closeOverlayBtn = document.getElementById('close-overlay');
  let backdropElement = null;

  // Create backdrop element
  function createBackdrop() {
    const backdrop = document.createElement('div');
    backdrop.className = 'overlay-backdrop';
    document.body.appendChild(backdrop);
    return backdrop;
  }

  // Show overlay with backdrop
  function showOverlay() {
    if (!backdropElement) {
      backdropElement = createBackdrop();
    }
    backdropElement.style.display = 'block';
    resultsOverlay.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  }

  // Hide overlay
  function hideOverlay() {
    resultsOverlay.style.display = 'none';
    if (backdropElement) {
      backdropElement.style.display = 'none';
    }
    document.body.style.overflow = ''; // Re-enable scrolling
  }

  // Close button event
  if (closeOverlayBtn) {
    closeOverlayBtn.addEventListener('click', hideOverlay);
  }

  // Close when clicking outside the overlay
  document.addEventListener('click', function(event) {
    if (backdropElement && event.target === backdropElement) {
      hideOverlay();
    }
  });

  // ESC key to close
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && resultsOverlay.style.display === 'block') {
      hideOverlay();
    }
  });

  if (searchForm) {
    searchForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const query = document.getElementById('query').value;
      if (!query) return;

      // Build the API request URL
      const url = `https://search-test.keithwachira.workers.dev?q=${encodeURIComponent(query)}`;

      const resultsContainer = document.getElementById('results');
      resultsContainer.innerHTML = '<p class="loading">Loading...</p>';

      // Show the overlay
      showOverlay();

      fetch(url)
        .then(response => response.json())
        .then(data => {
          resultsContainer.innerHTML = '';
          if (data.items && data.items.length > 0) {
            data.items.forEach(item => {
              const resultEl = document.createElement('div');
              resultEl.className = 'result-item';
              resultEl.innerHTML = ` 
                <h3><a href="${item.link}" target="_blank">${item.title}</a></h3> 
                <p>${item.snippet}</p> 
              `;
              resultsContainer.appendChild(resultEl);
            });
          } else {
            resultsContainer.innerHTML = '<p class="no-results">No results found</p>';
          }
        })
        .catch(error => {
          console.error('Error fetching search results', error);
          resultsContainer.innerHTML = '<p class="error">Error fetching results</p>';
        });
    });
  }
});