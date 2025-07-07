import { RenderNavigationBar, RenderSearchBar } from "./utils/knit.js";
import {products} from './data/products.js';

RenderNavigationBar();
RenderSearchBar();

const productPerPage = 8; // Number of products to display per page

const urlParams = new URLSearchParams(window.location.search);
let currentPage = parseInt(urlParams.get('page')) || 1; // Current page number, default to 1 if not specified
const totalPages = Math.ceil(products.length / productPerPage); // Total number of pages

if (currentPage < 1 || currentPage > totalPages) {
  currentPage = 1; // Reset to first page if out of bounds
}

renderProductsGrid(currentPage);
renderPagination(currentPage, totalPages);

function renderProductsGrid(page) {
  const startIndex = (page - 1) * productPerPage;
  const endIndex = startIndex + productPerPage;
  const productsToDisplay = products.slice(startIndex, endIndex);
  
  let productsHTML = '';

  productsToDisplay.forEach((product) => {
    let saleClass = ``;
    let priceHTML = `<h5 class="item-price">${product.getPrice()}</h5>`;

    if (product.sale === true) {
      saleClass = `sale__item`;

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
            <h6>Long sleeve knitted sweater</h6>
            ${priceHTML}
        </a>`; 
  });

  document.querySelector('.js-product-grid').innerHTML = productsHTML;
}

function renderPagination(currentPage, totalPages) {
  let paginationHTML = '';

  // Previous page button
  paginationHTML += `
  <a href="#" class="page-link prev-page" ${currentPage === 1 ? 'disabled' : ''}>
    <span>&lt;</span>
  </a>`;

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
    }
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
      event.preventDefault();
      const page = parseInt(link.dataset.page);
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
    return Array.from({ length: totalPages }, (_, i) => i + 1);
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
  const url = new URL(window.location);
  url.searchParams.set('page', page);
  window.history.pushState({}, '', url);
  
  currentPage = page;

  document.querySelector('.js-product-grid').scrollIntoView({behavior: 'smooth',});

  //Re-render the products and paginations
  renderProductsGrid(currentPage);
  renderPagination(currentPage, totalPages);
}