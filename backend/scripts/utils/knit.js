export function RenderNavigationBar(){
    document.addEventListener("DOMContentLoaded", function() {
        const nav = document.querySelector('.nav');
        const navHeight = nav.offsetHeight;
        const navOriginalPosition = nav.offsetTop;
        let lastScrollTop = 0;
        let isFixed = false;
        const searchContainer = document.getElementById('searchContainer');

        // Set initial nav properties
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
            let scrollTop = window.pageYOffset ?? document.documentElement.scrollTop;
            let scrollingDown = scrollTop > lastScrollTop;
            
            // Close search bar when scrolling
            if (searchContainer && searchContainer.style.display === 'block') {
                searchContainer.style.display = 'none';
            }

            // Check if we've scrolled past the nav completely
            if (scrollTop > navOriginalPosition + navHeight) {
                if (!isFixed) {
                    nav.style.transition = 'none'; // Disable transition temporarily when scrolling down,  bcs we want transition only when scrolling up
                    nav.style.transform = 'translateY(-100%)'; // Hide by moving nav upwards (until it's out of the screen) (animation)
                    
                    // Use a very small timeout to ensure hiding is applied
                    setTimeout(function() {
                        // Now make it fixed (while hidden)
                        placeholder.style.display = 'block'; // display the placeholder to prevent layout shifts
                        nav.style.position = 'fixed'; // make the nav fixed when it's hidden
                        nav.style.top = '0'; // stick the nav to the top
                        
                        // Re-enable transition for future changes
                        // Without the timeout, the browser might batch multiple style changes together, which could cause visual glitches or skipped animations.
                        setTimeout(function() {
                            nav.style.transition = 'transform 0.3s ease-in-out';
                            
                            // Show the nav moving down from out of view downwards to view, immediately if scrolling up
                            if (!scrollingDown) {
                            nav.style.transform = 'translateY(0)';
                            }
                        }, 10); // set second timeout 10ms
                    }, 5); // set first timeout 5ms
                    
                    isFixed = true;
                } 
                else {
                    // When already fixed, control visibility based on scroll direction
                    if (!scrollingDown) {
                    nav.style.transform = 'translateY(0)'; // Show when scrolling up
                    } else {
                    nav.style.transform = 'translateY(-100%)'; // Hide when scrolling down
                    }
                }
            } 
            else if (scrollTop <= navOriginalPosition) {
                // We're at or above the original position
                if (isFixed) {
                    // Return to normal, non-fixed position
                    nav.style.transition = 'none'; // Disable transition temporarily
                    placeholder.style.display = 'none'; // Hide the placeholder to allow layout shifts
                    nav.style.position = 'static'; // position: static is the default positioning for all elements.
                    nav.style.transform = 'translateY(0)';
                    
                    // Re-enable transition after position change
                    setTimeout(function() {
                    nav.style.transition = 'transform 0.3s ease-in-out';
                    }, 10);
                    
                    isFixed = false;
                }
            }
            
            lastScrollTop = scrollTop; // update lastScrollTop,  ensures that the next scroll event uses the most recent scroll position for accurate comparisons.
        });
        updateCartCount();
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
    
    // Set up search functionality
    setupSearchBar();
}

export function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0); // Updates the total using .reduce (handles decrease/increase)
  
  // Update the cart count in the navigation bar
  const cartCountElement = document.querySelector('.cart-count');
  if (cartCountElement) {
    cartCountElement.textContent = cartCount > 0 ? cartCount : '';

    if (cartCount > 0) {
      cartCountElement.style.display = 'flex'; // Show the cart count
    }
    else {
      cartCountElement.style.display = 'none'; // Hide the cart count if zero
    }
  }
}

export function setupSearchBar() {
  const searchInput = document.querySelector('.search-input');
  
  if (searchInput) {
    // Search input submitted
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
      searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const searchTerm = searchInput.value.trim().toLowerCase();
        if (searchTerm) {
          window.location.href = `/shop.html?search=${encodeURIComponent(searchTerm)}`;
        }
      });
    }
  }
}

export function shortenText(text, maxLength) {
  if (!text) return '';
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}