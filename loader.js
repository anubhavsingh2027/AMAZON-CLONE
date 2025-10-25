// Loader control with minimum display time
(function(){
    const MINIMUM_DISPLAY_TIME = 2000; // Show loader for at least 2 seconds
    const FADE_DURATION = 600;         // Fade out duration (matches CSS)
    const FALLBACK_TIMEOUT = 5000;     // Maximum time before force-hiding

    const loader = document.getElementById('site-loader');
    let startTime = Date.now();
    let isPageLoaded = false;

    function calculateRemainingTime() {
        const elapsedTime = Date.now() - startTime;
        return Math.max(0, MINIMUM_DISPLAY_TIME - elapsedTime);
    }

    function hideLoader() {
        if (!loader) return;
        
        // Add loaded class to trigger CSS fade
        loader.classList.add('loaded');
        
        // Remove from DOM after transition completes
        setTimeout(() => {
            if (loader && loader.parentNode) {
                loader.parentNode.removeChild(loader);
            }
        }, FADE_DURATION);
    }

    function handlePageLoad() {
        isPageLoaded = true;
        
        // Wait for minimum display time before hiding
        const remainingTime = calculateRemainingTime();
        if (remainingTime > 0) {
            setTimeout(hideLoader, remainingTime);
        } else {
            hideLoader();
        }
    }

    // Hide on window load (after minimum time)
    if (document.readyState === 'complete') {
        handlePageLoad();
    } else {
        window.addEventListener('load', handlePageLoad);
    }

    // Fallback: if load doesn't fire, remove after fallback timeout
    setTimeout(() => {
        if (!isPageLoaded) {
            hideLoader();
        }
    }, FALLBACK_TIMEOUT);
})();