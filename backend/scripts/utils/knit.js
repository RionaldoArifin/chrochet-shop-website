export function RenderNavigationBar(){
    document.addEventListener("DOMContentLoaded", function() {
        const nav = document.querySelector('.nav');
        const navHeight = nav.offsetHeight;
        const navOriginalPosition = nav.offsetTop;
        let lastScrollTop = 0;
        let isFixed = false;
        const searchContainer = document.getElementById('searchContainer');

        // Set initial nav properties
        nav.style.backgroundColor = '#fffff4';
        nav.style.width = '100%';
        nav.style.transition = 'transform 0.3s ease-in-out';
        nav.style.zIndex = '1000';

        // Create a placeholder to prevent layout shifts
        const placeholder = document.createElement('div');
        placeholder.style.height = navHeight + 'px';
        placeholder.style.display = 'none';
        nav.parentNode.insertBefore(placeholder, nav);

        // Set CSS variable for nav height
        document.documentElement.style.setProperty('--nav-height', navHeight + 'px');

        window.addEventListener('scroll', function() {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            let scrollingDown = scrollTop > lastScrollTop;
            
            // Close search bar when scrolling
            if (searchContainer && searchContainer.style.display === 'block') {
                searchContainer.style.display = 'none';
            }

            // Check if we've scrolled past the nav completely
            if (scrollTop > navOriginalPosition + navHeight) {
            if (!isFixed) {
                // First time we're fixing it - IMPORTANT: Hide before changing position
                nav.style.transition = 'none'; // Disable transition temporarily
                nav.style.transform = 'translateY(-100%)'; // Hide first
                
                // Use a very small timeout to ensure hiding is applied
                setTimeout(function() {
                // Now make it fixed (while hidden)
                placeholder.style.display = 'block';
                nav.style.position = 'fixed';
                nav.style.top = '0';
                
                // Re-enable transition for future changes
                setTimeout(function() {
                    nav.style.transition = 'transform 0.3s ease-in-out';
                    
                    // Show it immediately if scrolling up
                    if (!scrollingDown) {
                    nav.style.transform = 'translateY(0)';
                    }
                }, 10);
                }, 5);
                
                isFixed = true;
            } else {
                // Already fixed, control visibility based on scroll direction
                if (!scrollingDown) {
                nav.style.transform = 'translateY(0)'; // Show when scrolling up
                } else {
                nav.style.transform = 'translateY(-100%)'; // Hide when scrolling down
                }
            }
            } else if (scrollTop <= navOriginalPosition) {
            // We're at or above the original position
            if (isFixed) {
                // Return to normal, non-fixed position
                nav.style.transition = 'none'; // Disable transition temporarily
                placeholder.style.display = 'none';
                nav.style.position = 'static';
                nav.style.transform = 'translateY(0)';
                
                // Re-enable transition after position change
                setTimeout(function() {
                nav.style.transition = 'transform 0.3s ease-in-out';
                }, 10);
                
                isFixed = false;
            }
            }
            
            lastScrollTop = scrollTop;
        });
    });
}

export function RenderSearchBar() {        
    const searchLink = document.querySelector('.nav__links__right a[class="nav__link search_bar"]');
    const searchContainer = document.getElementById('searchContainer');
    const searchClose = document.getElementById('searchClose');
    const searchInput = document.querySelector('.search-input');

    searchLink.addEventListener('click', function(e) {
        e.preventDefault();
        searchContainer.style.display = 'block';
        searchInput.focus();
    });

    searchClose.addEventListener('click', function() {
        searchContainer.style.display = 'none';
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && searchContainer.style.display === 'block') {
        searchContainer.style.display = 'none';
        }
    });
}

