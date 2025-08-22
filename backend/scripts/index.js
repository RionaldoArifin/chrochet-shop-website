import { products } from "./data/products.js";
import { RenderNavigationBar, RenderSearchBar, updateCartCount, shortenText } from "./utils/knit.js";

RenderNavigationBar();
RenderSearchBar();
displayNewProducts();
updateCartCount();

function displayNewProducts() {
  // Find 4 new products
  let newProducts = products.slice(-4);

  let newHTML = '';
  
  if (newProducts.length === 0) {
    newHTML = '<p>No new products found.</p>';
  } else {
    newProducts.forEach(product => {
      let saleClass = ``;
      let priceDisplay = `<h5 class="new-item-price">HKD${product.price}</h5>`; // default price with no sale
      
      if (product.sale) {
        saleClass = `sale__item`;

        // if on sale, change the priceDisplay to show original and discounted price
        priceDisplay = `
          <div class="sale__item__price">
            <h5 class="new-original-price">HKD${product.price}</h5>
            <h5 class="new-discounted-price">HKD${product.discountedPrice}</h5>
          </div>
        `;
      }

      
      // Ensure short description text with limited length
      const shortDesc = shortenText(product.description, 45);
            
      newHTML += `
        <div class="new-items__collection ${product.sale ? ' sale__item' : ''}">
          <div class="new-items__image__cover">
            <a class="products__collection ${saleClass}" href="/product-detail.html?id=${product.id}">
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