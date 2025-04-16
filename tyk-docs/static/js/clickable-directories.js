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
        window.location = href;
        e.preventDefault();
        e.stopPropagation();
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
    
    ensureParentsOpen();
    setInterval(ensureParentsOpen, 300);
  }
  
  $(document).ready(function() {
    setTimeout(init, 500);
  });
  
  $(document).on('turbolinks:load', function() {
    setTimeout(init, 500);
  });
})(jQuery);
