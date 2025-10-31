/**
 * Enable directory items in navigation to be both clickable links and expandable containers.
 */
(function($) {
  function init() {
    $('.category-Directory > a[href]').each(function() {
      var $link = $(this);
      var $li = $link.parent();
      var href = $link.attr('href');
      
      $link.off();
      
      $link.on('click', function(e) {
        e.preventDefault();
        window.location = href;
        return false;
      });
      
      $link.on('mousedown', function(e) {
        e.stopPropagation();
        return true;
      });
    });
    
    function ensureParentsOpen() {
      $('.active').parents('li').removeClass('st-collapsed').addClass('st-open');
    }
    
    // Initial call to ensure parents are open
    ensureParentsOpen();
    
    // Event-driven approach instead of continuous polling
    // Attach to relevant events that might require parent expansion
    $(document).on('click', '.st-treed a', ensureParentsOpen);
    $(document).on('DOMSubtreeModified', '.st-treed', ensureParentsOpen);
    $(window).on('hashchange', ensureParentsOpen);
  }
  
  $(document).ready(function() {
    setTimeout(init, 500);
  });
  
  $(document).on('turbolinks:load', function() {
    setTimeout(init, 500);
  });
})(jQuery);
