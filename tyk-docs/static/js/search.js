document.addEventListener('DOMContentLoaded', function () {
  const searchForm = document.getElementById('searchForm');
  const searchInput = document.getElementById('query');
  const resultsOverlay = document.getElementById('results-overlay');
  const closeOverlayBtn = document.getElementById('close-overlay');
  let backdropElement = null;
  let debounceTimer;

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

  // Function to perform search
  function performSearch(query) {
    if (!query) {
      hideOverlay();
      return;
    }

    // Build the API request URL
    const url = `https://search-test.keithwachira.workers.dev?q=${encodeURIComponent(query)}`;

    // Don't show overlay yet, wait for results
    const resultsContainer = document.getElementById('results');

    fetch(url)
      .then(response => response.json())
      .then(data => {
        resultsContainer.innerHTML = '';
        if (data.items && data.items.length > 0) {
          // Only show overlay if we have results
          showOverlay();

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
          // Don't show overlay if no results
          hideOverlay();
        }
      })
      .catch(error => {
        console.error('Error fetching search results', error);
        // Don't show overlay for errors
        hideOverlay();
      });
  }

  // Debounce function to prevent too many API calls
  function debounce(func, delay) {
    return function() {
      const context = this;
      const args = arguments;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
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

  // Still allow form submission for users who press enter
  if (searchForm) {
    searchForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const query = searchInput.value;
      performSearch(query);
    });
  }

  // Add input event listener for real-time search
  if (searchInput) {
    // Use debounce to avoid too many requests while typing
    const debouncedSearch = debounce(function() {
      const query = searchInput.value;
      if (query.length >= 2) { // Only search if at least 2 characters
        performSearch(query);
      } else if (query.length === 0) {
        hideOverlay();
      }
    }, 300); // 300ms delay

    searchInput.addEventListener('input', debouncedSearch);
  }
});