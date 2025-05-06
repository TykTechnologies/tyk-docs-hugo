document.addEventListener('DOMContentLoaded', function() {
    const tabsMenu = document.querySelector('.tabs-menu');
    if (!tabsMenu) return;

    function isBannerVisible() {
        const banner = document.getElementById('hs-overlay-cta-188859445616');
        if (!banner) return false;
        const style = window.getComputedStyle(banner);
        return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
    }

    function checkBannerState() {
        if (isBannerVisible()) {
            tabsMenu.style.top = '132px';
            tabsMenu.classList.add('with-banner');
        } else {
            tabsMenu.style.top = '64px';
            tabsMenu.classList.remove('with-banner');
        }
    }

    checkBannerState();
    setInterval(checkBannerState, 100);
});