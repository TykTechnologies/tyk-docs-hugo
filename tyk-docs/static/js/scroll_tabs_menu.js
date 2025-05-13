document.addEventListener("DOMContentLoaded", function() {
  var activeTab = document.querySelector('.tab-link.active');
  var container = document.getElementById('tabs-container');
  if (activeTab && container) {
    if (window.innerWidth <= 768) {
      activeTab.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  }
}); 