import { RenderNavigationBar, RenderSearchBar, updateCartCount, shortenText } from "./utils/knit.js";
import { products } from './data/products.js';

RenderNavigationBar();
RenderSearchBar();
updateCartCount();

const productPerPage = 16; // Number of products to display per page

const urlParams = new URLSearchParams(window.location.search); // Get the URL from the browser
let currentPage = parseInt(urlParams.get('page')) || 1; // Current page number, default to 1 if not specified
let currentSort = urlParams.get('sort') || 'default'; // Get sort parameter from URL or use default
let currentCategory = urlParams.get('category') || 'all'; // Get category parameter from URL or use all
let searchQuery = urlParams.get('search') || ''; // Get search parameter from URL
let filteredProducts = [...products]; // Start with all products (make a global copy of the array) 

// Apply filtering and sorting
const totalPages = filterProducts();

// For extra safe measures
// Ensure currentPage is within valid bounds
if (currentPage < 1 || currentPage > totalPages) {
  currentPage = 1; // Reset to first page if out of bounds
}

setupSortingEvents();
setupFilteringEvents();
updateSearchUI();

renderProductsGrid(currentPage);
renderPagination(currentPage, totalPages);

// Comprehensive filter function that handles both category and search
function filterProducts() {
  // Start with all products
  filteredProducts = [...products]; // Make a fresh copy of the original array
  
  // Apply category filtering
  if (currentCategory !== 'all') {
    filteredProducts = filteredProducts.filter(product => product.category === currentCategory);
  }
  
  // Apply search filtering if there's a search query
  if (searchQuery) {
    filteredProducts = filteredProducts.filter(product => {
      // Search matching name and description
      const nameMatch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const descMatch = product.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Search in keywords array if it exists
      const keywordMatch = product.keywords ? 
        product.keywords.some(keyword => 
          keyword.toLowerCase().includes(searchQuery.toLowerCase())
        ) : false;
      
      return nameMatch || descMatch || keywordMatch;
    });
  }
  
  // Apply sorting to filtered results
  applySorting(currentSort);
  
  // Calculate total pages
  return Math.ceil(filteredProducts.length / productPerPage);
}

// Function to filter products by category
function filterByCategory(category) {
  currentCategory = category;
  return filterProducts();
}

// Function to apply sorting to the filteredProducts array
function applySorting(sortType) {
  switch(sortType) {
    case 'price-asc':
      filteredProducts.sort((a, b) => {
        const priceA = a.sale ? a.discountedPrice : a.price;
        const priceB = b.sale ? b.discountedPrice : b.price;
        return priceA - priceB;
      });
      break;
    case 'price-desc':
      filteredProducts.sort((a, b) => {
        const priceA = a.sale ? a.discountedPrice : a.price;
        const priceB = b.sale ? b.discountedPrice : b.price;
        return priceB - priceA;
      });
      break;
    case 'latest':
      // Sort by ID assuming newer products have higher IDs
      filteredProducts.sort((a, b) => b.id - a.id);
      break;
    case 'best-selling':
      // For demo purposes, we'll just randomize the order
      // In a real app, you'd sort by a popularity or sales metric
      filteredProducts.sort(() => Math.random() - 0.5);
      break;
    default:
      // Default sorting (no change)
      break;
  }
  
  // Update the select element to reflect current sort
  const sortSelect = document.querySelector('.sort-item-selection');
  if (sortSelect) {
    sortSelect.value = sortType;
  }
}

// Function to set up sorting event listeners
function setupSortingEvents() {
  const sortSelect = document.querySelector('.sort-item-selection');
  
  if (sortSelect) {
    sortSelect.addEventListener('change', function() {
      const sortType = this.value;
      
      // Update URL with the sort parameter
      const url = new URL(window.location);
      url.searchParams.set('sort', sortType);
      url.searchParams.set('page', 1); // Reset to page 1 when sorting changes
      window.history.pushState({}, '', url); // Reset the page
      
      // Apply the sorting
      currentSort = sortType;
      applySorting(sortType);
      
      // Reset to page 1 and update display
      currentPage = 1;
      const totalPages = Math.ceil(filteredProducts.length / productPerPage);
      
      renderProductsGrid(currentPage);
      renderPagination(currentPage, totalPages);
    });
  }
}

// Function to render the products grid based on the current page
function renderProductsGrid(page) {
  const startIndex = (page - 1) * productPerPage; // Starting index of the products array based on how many products are shown in a page
  const endIndex = startIndex + productPerPage; 
  const productsToDisplay = filteredProducts.slice(startIndex, endIndex);
  
  let productsHTML = '';

  if (productsToDisplay.length === 0) {
    productsHTML = '<div class="no-products">No products found. Try a different search or category.</div>';
  } else {
    productsToDisplay.forEach((product) => {
      let saleClass = ``; // Default class for products not on sale
      let priceHTML = `<h5 class="item-price">HKD${product.price}</h5>`; // default price with no sale

      const shortDesc = shortenText(product.description, 45);

      if (product.sale === true) {
        saleClass = `sale__item`;

        // if on sale, change the priceHTML to show original and discounted price
        priceHTML = `
          <div class="sale__item__price">
            <h5 class="original-price">HKD${product.price}</h5>
            <h5 class="discounted-price">HKD${product.discountedPrice}</h5>
          </div>
        `;
      }

      productsHTML += `
        <a class="products__collection ${saleClass}" href="/product-detail.html?id=${product.id}">
            <div class="products__image__cover">
                <img class="products__image" alt="Products images" src="${product.image}">
            </div>

            <h4>${product.name}</h4>
            <h6>${shortDesc}</h6>
            ${priceHTML}
        </a>`; 
    });
  }

  document.querySelector('.js-product-grid').innerHTML = productsHTML;
}

// Function to render pagination links
function renderPagination(currentPage, totalPages) {
  let paginationHTML = '';

  // Don't show pagination if there are no results
  if (totalPages === 0) {
    document.querySelector('.move-pages__link').innerHTML = '';
    return;
  }

  // Previous page button
  paginationHTML += `
  <a href="#" class="page-link prev-page" ${currentPage === 1 ? 'disabled' : ''}>
    <span>&lt;</span>
  </a>`;
  // &lt is (<) symbol

  // Generate page numbers
  const pagesToShow = generatePagination(currentPage, totalPages);
  
  pagesToShow.forEach(pageNum => {
    if (pageNum === '...') {
      paginationHTML += `<span class="ellipsis">...</span>`;
    } else {
      paginationHTML += `
      <a href="#" class="page-link page-number ${currentPage === pageNum ? 'active' : ''}" data-page="${pageNum}">
        ${pageNum}
      </a>`;
    } // Saves the pagenumber into the dataset.page attribute of the link
  });

  // Next page button, disable if last page
  paginationHTML += `
  <a href="#" class="page-link next-page" ${currentPage === totalPages ? 'disabled' : ''}>
    <span>&gt;</span>
  </a>`;

  document.querySelector('.move-pages__link').innerHTML = paginationHTML;

  // Add event listeners to page numbers
  document.querySelectorAll('.page-number').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault(); // Stops the browser from following the link's href attribute (#)
      const page = parseInt(link.dataset.page); // parseInt() converts this string value to an integer, link.dataset.page is the value of the data-page attribute of the link and (link.) is a variable, can be anything like diu.dataset.page
      navigateToPage(page);
    });
  });

  // Add event listener for previous button
  const prevButton = document.querySelector('.prev-page');
  if(prevButton) {
    prevButton.addEventListener('click', (event) => {
      event.preventDefault();
      if (currentPage > 1) {
        navigateToPage(currentPage - 1);
      }
    });
  }

  // Next button event listener
  const nextButton = document.querySelector('.next-page');
  if(nextButton) {
    nextButton.addEventListener('click', (event) => {
      event.preventDefault();
      if (currentPage < totalPages) {
        navigateToPage(currentPage + 1);
      }
    });
  }
}

function generatePagination(currentPage, totalPages) {
  // If there are 7 or fewer pages, show all pages
  if (totalPages <= 7) {
    let pageList = [];
    for (let i = 1; i <= totalPages; i++) {
      pageList.push(i);
    }
    return pageList;
  }
  
  // Otherwise, show a limited number with ellipses
  let pages = [];
  
  // Always include first page
  pages.push(1);
  
  // If current page is close to first page
  if (currentPage <= 3) {
    pages.push(2, 3, 4, '...', totalPages);
  } 
  // If current page is close to last page
  else if (currentPage >= totalPages - 2) {
    pages.push('...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
  } 
  // If current page is in the middle
  else {
    pages.push('...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
  }
  
  return pages;
}

function navigateToPage(page) {
  const url = new URL(window.location); // get the current page URL
  url.searchParams.set('page', page); // ?page=X where X is the variable page (the page number)
  
  // Preserve sorting and category parameters
  if (currentSort !== 'default') {
    url.searchParams.set('sort', currentSort);
  }
  
  if (currentCategory !== 'all') {
    url.searchParams.set('category', currentCategory);
  }
  
  if (searchQuery) {
    url.searchParams.set('search', searchQuery);
  }
  
  window.history.pushState({}, '', url);//  adds a new entry to the browser's history stack, effectively changing the URL in the address bar without triggering a page reload
  
  currentPage = page;

  // Get the product grid element
  const productGrid = document.querySelector('.js-product-grid');
  
  // Get the current nav state
  const nav = document.querySelector('.nav');
  const navHeight = nav.offsetHeight; // measures the actual height of the navigation bar in pixels
  
  // Calculate the appropriate scroll position
  let scrollPosition = productGrid.offsetTop - navHeight;
  
  window.scrollTo({
    top: scrollPosition,
    behavior: 'smooth'
  });

  // Re-render the products and paginations
  renderProductsGrid(currentPage);
  renderPagination(currentPage, totalPages);
}

function setupFilteringEvents() {
  const categorySelect = document.querySelector('.category-filter');
  
  if (categorySelect) {
    // Set initial value based on URL parameter
    categorySelect.value = currentCategory;
    
    categorySelect.addEventListener('change', function() {
      const category = this.value;
      
      // Update URL with the category parameter
      const url = new URL(window.location);
      url.searchParams.set('category', category);
      url.searchParams.set('page', 1); // Reset to page 1 when category changes
      window.history.pushState({}, '', url);
      
      // Apply the filtering
      currentCategory = category;
      const newTotalPages = filterByCategory(category);
      
      // Reset to page 1 and update display
      currentPage = 1;
      
      renderProductsGrid(currentPage);
      renderPagination(currentPage, newTotalPages);
    });
  }
}

function updateSearchUI() {
  // Update the title to show what we're searching for
  if (searchQuery) {
    // Update search input value
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
      searchInput.value = searchQuery;
    }
    
    // Update the title to show search results
    const productsTitle = document.querySelector('.products__title');
    if (productsTitle) {
      productsTitle.textContent = `Search: "${searchQuery}"`;
    }
    
    // Show the search bar
    const searchContainer = document.getElementById('searchContainer');
    if (searchContainer) {
      searchContainer.style.display = 'block';
    }
  }
}