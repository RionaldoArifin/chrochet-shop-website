import { products } from "./data/products.js";
import { RenderNavigationBar, RenderSearchBar } from "./utils/knit.js";

RenderNavigationBar();
RenderSearchBar();
displayNewProducts();

function displayNewProducts() {
  // Find 4 new products
  let newProducts = products.slice(-4);

  let newHTML = '';
  
  if (newProducts.length === 0) {
    newHTML = '<p>No new products found.</p>';
  } else {
    newProducts.forEach(product => {
      let priceDisplay = '';
      
      if (product.sale) {
        priceDisplay = `
          <div class="sale__item__price">
            <span class="new-original-price">HKD${product.price}</span>
            <span class="new-discounted-price">HKD${product.discountedPrice}</span>
          </div>`;
      } else {
        priceDisplay = `<span class="new-item-price">HKD${product.price}</span>`;
      }
      
      // Ensure short description text with limited length
      const shortDesc = product.description ? 
        (product.description.length > 45 ? 
          product.description.substring(0, 45) + '...' : 
          product.description) : 
        '';
            
      newHTML += `
        <div class="new-items__collection ${product.sale ? ' sale__item' : ''}">
          <div class="new-items__image__cover">
            <a href="product.html?id=${product.id}">
              <img class="new-items__image" alt="${product.name}" src="${product.image}">
            </a>
          </div>
          <h4>${product.name}</h4>
          <h6>${shortDesc}</h6>
          ${priceDisplay}
        </div>
      `;
    });
  }
  
  const newProductsContainer = document.querySelector('.preview__gallery');
  
  newProductsContainer.innerHTML = newHTML;
  
  // Add functionality to the "View all" button
  const viewAllButton = document.querySelector('.new-items__button');
  if (viewAllButton) {
    viewAllButton.addEventListener('click', () => {
      window.location.href = 'shop.html';
    });
  }
}