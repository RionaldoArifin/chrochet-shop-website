export function RenderNavigationBar(){
    document.addEventListener("DOMContentLoaded", function() {
        const nav = document.querySelector('.nav');
        const navHeight = nav.offsetHeight;
        const navOriginalPosition = nav.offsetTop;
        let lastScrollTop = 0;
        let isFixed = false;
        
        // Set initial nav properties
        nav.style.backgroundColor = '#fffff4';
        nav.style.width = '100%';
        nav.style.transition = 'transform 0.2s ease-in-out';
        nav.style.zIndex = '1000';
        
        // Create a placeholder to prevent layout shifts
        const placeholder = document.createElement('div');
        placeholder.style.height = navHeight + 'px';
        placeholder.style.display = 'none';
        nav.parentNode.insertBefore(placeholder, nav);
        
        window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        let scrollingDown = scrollTop > lastScrollTop;
        
        // Check if we've scrolled past the nav completely
        if (scrollTop >= navOriginalPosition + navHeight) {
            // Nav is completely out of view
            if (!isFixed) {
            // First time becoming fixed - apply fixed positioning
            placeholder.style.display = 'block';
            nav.style.position = 'fixed';
            nav.style.top = '0';
            
            // If scrolling down, immediately hide it without transition
            if (scrollingDown) {
                nav.style.transition = 'none';
                nav.style.transform = 'translateY(-100%)';
                // Force reflow to apply the transform without transition
                nav.offsetHeight;
                // Restore transition for future changes
                nav.style.transition = 'transform 0.3s ease-in-out';
            } else {
                nav.style.transform = 'translateY(0)';
            }
            
            isFixed = true;
            } else {
            // Already fixed, handle hide/show
            if (scrollingDown) {
                nav.style.transform = 'translateY(-100%)';
            } else {
                nav.style.transform = 'translateY(0)';
            }
            }
        } else if (scrollTop <= navOriginalPosition) {
            // We're at or above the original nav position
            if (isFixed) {
            placeholder.style.display = 'none';
            nav.style.position = 'static';
            nav.style.transform = 'translateY(0)';
            isFixed = false;
            }
        }
        
        lastScrollTop = scrollTop;
        });
    });
}

RenderNavigationBar();