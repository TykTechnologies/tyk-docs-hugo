/**
 * Enable directory items in navigation to be both clickable links and expandable containers.
 * Uses traditional navigation to avoid flickering.
 */
(function($) {
  function initDirectoryLinks() {
    // First make sure parents of active items are expanded
    $('.active').parents('li').removeClass('st-collapsed').addClass('st-open');
    
    // Only handle the mousedown event to prevent SimpleTree's handling
    // Let the browser handle the normal click behavior for navigation
    $('.category-Directory > a[href]').each(function() {
      var $link = $(this);
      
      // Clear any previous handlers
      $link.off('mousedown');
      
      // Disable turbolinks for these links to avoid flickering
      $link.attr('data-turbolinks', 'false');
      
      // Only handle mousedown to prevent SimpleTree from intercepting
      $link.on('mousedown', function(e) {
        // Stop propagation to prevent SimpleTree handlers
        e.stopPropagation();
        e.stopImmediatePropagation();
        
        // Let the normal click/navigation behavior happen
        return true;
      });
    });
  }

  // Run on document ready
  $(document).ready(function() {
    setTimeout(initDirectoryLinks, 50);
  });
  
  // Also run after Turbolinks navigation
  $(document).on('turbolinks:load', function() {
    setTimeout(initDirectoryLinks, 50);
  });
  
  // Run periodically to ensure parent directories stay expanded
  setInterval(function() {
    $('.active').parents('li').removeClass('st-collapsed').addClass('st-open');
  }, 500);
})(jQuery);
