document.addEventListener('DOMContentLoaded', function() {
    const activeItem = document.querySelector('.st-treed li.active');
    if (activeItem) {
        activeItem.scrollIntoView({
            behavior: 'instant',
            block: 'center',
        });
    }
});
