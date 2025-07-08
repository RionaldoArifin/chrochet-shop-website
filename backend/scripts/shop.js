import { RenderNavigationBar, RenderSearchBar } from "./utils/knit.js";
import {products} from './data/products.js';

RenderNavigationBar();
RenderSearchBar();

const productPerPage = 8; // Number of products to display per page

const urlParams = new URLSearchParams(window.location.search); // Get the URL from the browser
let currentPage = parseInt(urlParams.get('page')) || 1; // Current page number, default to 1 if not specified
const totalPages = Math.ceil(products.length / productPerPage); // Total number of pages

// Ensure currentPage is within valid bounds
if (currentPage < 1 || currentPage > totalPages) {
  currentPage = 1; // Reset to first page if out of bounds
}

renderProductsGrid(currentPage);
renderPagination(currentPage, totalPages);


// Function to render the products grid based on the current page
function renderProductsGrid(page) {
  const startIndex = (page - 1) * productPerPage; // Where to start in the products array depending how many products are shown in a page
  const endIndex = startIndex + productPerPage; 
  const productsToDisplay = products.slice(startIndex, endIndex);
  
  let productsHTML = '';

  productsToDisplay.forEach((product) => {
    let saleClass = ``; // Default class for products not on sale
    let priceHTML = `<h5 class="item-price">HKD${product.price}</h5>`; // default price with no sale

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
        <a class="new-items__collection ${saleClass}" href="/product.html?id=${product.id}">
            <div class="new-items__image__cover">
                <img class="new-items__image" alt="New-items image" src="${product.image}">
            </div>

            <h4>${product.name}</h4>
            <h6>${product.description}</h6>
            ${priceHTML}
        </a>`; 
  });

  document.querySelector('.js-product-grid').innerHTML = productsHTML;
}


// Function to render pagination links
function renderPagination(currentPage, totalPages) {
  let paginationHTML = '';

  // Previous page button
  paginationHTML += `
  <a href="#" class="page-link prev-page" ${currentPage === 1 ? 'disabled' : ''}>
    <span>&lt;</span>
  </a>`;
  // &lt is (<) symbol

  // Generate limited page numbers with ellipses
  const pagesToShow = generatePagination(currentPage, totalPages);
  
  pagesToShow.forEach(pageNum => {
    if (pageNum === '...') {
      paginationHTML += `<span class="ellipsis">...</span>`;
    } else {
      paginationHTML += `
      <a href="#" class="page-link page-number ${currentPage === pageNum ? 'active' : ''}" data-page="${pageNum}">
        ${pageNum}
      </a>`;
    } // saves the pagenumber into the dataset.page attribute of the link
  });

  // Next page button
  paginationHTML += `
  <a href="#" class="page-link next-page" ${currentPage === totalPages ? 'disabled' : ''}>
    <span>&gt;</span>
  </a>`;

  document.querySelector('.move-pages__link').innerHTML = paginationHTML;

  // Add event listeners to page numbers
  document.querySelectorAll('.page-number').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault(); // stops the browser from following the link's href attribute, otherwise the browser would try to navigate to "#" (top of page) when clicked
      const page = parseInt(link.dataset.page); //parseInt() converts this string value to an integer, link.dataset.page is the value of the data-page attribute of the link and (link.) is a variable, can be anything like diu.dataset.page
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
  window.history.pushState({}, '', url);
  
  currentPage = page;

    // Get the product grid element
  const productGrid = document.querySelector('.js-product-grid');
  
  // Get the current nav state
  const nav = document.querySelector('.nav');
  const isNavFixed = nav.style.position === 'fixed';
  const navHeight = nav.offsetHeight; // measures the actual height of the navigation bar in pixels
  
  // Calculate the appropriate scroll position
  let scrollPosition;
  
  if (isNavFixed) {
    // If nav is fixed, account for its height bcs there is placeholder
    // to prevent layout shifts when the nav is fixed
    scrollPosition = productGrid.offsetTop - navHeight;
  } else {
    // If nav is in normal flow, scroll to the grid's position
    scrollPosition = productGrid.offsetTop;
  }
  
  window.scrollTo({
    top: scrollPosition,
    behavior: 'smooth'
  });

  //Re-render the products and paginations
  renderProductsGrid(currentPage);
  renderPagination(currentPage, totalPages);
}