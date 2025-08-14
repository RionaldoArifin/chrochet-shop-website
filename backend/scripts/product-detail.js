import { RenderNavigationBar, RenderSearchBar } from "./utils/knit.js";
import { products } from './data/products.js';

document.addEventListener('DOMContentLoaded', initializePage);

function initializePage(){
  RenderNavigationBar();
  RenderSearchBar();
  RenderDropDown();
  setupSizeGuideLink();
  setupQuantitySelector();
  updateCartCount();

  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');

  // Find the product with matching ID
  const product = products.find(p => p.id === productId);

  // if not found
  if (!product) {
    document.getElementById('productTitle').textContent = 'Product Not Found';
    document.getElementById('productDescription').textContent = 'Sorry, the product you are looking for does not exist.';
    document.getElementById('productHomeLink').textContent = 'PRODUCT NOT FOUND';
  } 
  else {
    // Update page with product details
    displayProductDetails(product);
    setupProductInteractions(product);
    displayRelatedProducts(product);
  }
}

function displayProductDetails(product) {
  document.getElementById('productHomeLink').textContent = product.name;
  document.getElementById('productTitle').textContent = product.name;
  document.getElementById('productImage').innerHTML = `
  <img class="new-items__image" alt="New-items image" src="${product.image}">
  <img class="new-items__image" alt="New-items image" src="${product.image}">
  <img class="new-items__image" alt="New-items image" src="${product.image}">
  `;
  
  // If the product is on sale
  if (product.sale) {
    document.getElementById('productPrice').innerHTML = `
      <span class="original-price">HKD${product.price}</span>
      <span class="discounted-price">HKD${product.discountedPrice}</span>
    `;
  } else {
    document.getElementById('productPrice').innerHTML = `<span class="item-price">HKD${product.price}</span>`;
  }
  
  document.getElementById('productDescription').textContent = product.description;
}

function setupProductInteractions(product) {
  // Set up size selection
  const sizeButtons = document.querySelectorAll('.size-button');
  sizeButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      sizeButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class only to the clicked button
      button.classList.add('active');
      // All buttons are now inactive except the one clicked
    });
  });

  const colorInput = document.getElementById('color-input');
  
  // Set up add to cart button
  const addToCartBtn = document.querySelector('.add-to-cart-button');
  addToCartBtn.addEventListener('click', () => {
    
    // Get selected size & color
    const selectedSize = document.querySelector('.size-button.active');
    const colorValue = colorInput ? colorInput.value.trim() : ''; //trim removes whitespace from input

    // make sure a size is selected
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }

    if (!colorInput || colorValue === '') {
      alert('Please enter a color request');
      return;
    }

    const quantityValue = document.getElementById('quantityValue');
    const quantity = parseInt(quantityValue.textContent) || 1;
    
    const selectedProductInfo = {
      id: product.id,
      quantity: quantity,
      size: selectedSize.textContent,
      color: colorValue
    };
  
    saveToCart(selectedProductInfo);
    
    alert('Added to cart!');
  });
}

//Update Quantity Value (Decrease/Increase)
function setupQuantitySelector() {
    const decreaseBtn = document.getElementById('decreaseQuantity');
    const increaseBtn = document.getElementById('increaseQuantity');
    const quantityValue = document.getElementById('quantityValue');
    
    if (decreaseBtn && increaseBtn && quantityValue) {
      let quantity = parseInt(quantityValue.textContent) || 1;
      
      decreaseBtn.addEventListener('click', function() {
        if (quantity > 1) {
          quantity--;
          quantityValue.textContent = quantity;
        }
      });
      
      increaseBtn.addEventListener('click', function() {
        quantity++;
        quantityValue.textContent = quantity;
      });
    }
}

// Save To Cart Function
function saveToCart(productInfo) {
  // Get existing cart or initialize empty array
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // Check if product already exists in cart with same size
  const existingProductIndex = cart.findIndex(
    item => 
      item.id === productInfo.id && 
      item.size === productInfo.size && 
      item.color === productInfo.color
  );
  
  if (existingProductIndex >= 0) {
    // Update quantity if product already in cart
    cart[existingProductIndex].quantity += productInfo.quantity;
  } else {
    const product = products.find(p => p.id === productInfo.id);
    if (product) {
      // Add new product to cart
      const cartItem = {
        id: productInfo.id,
        name: product.name,
        image: product.image,
        price: product.sale ? product.discountedPrice : product.price,
        quantity: productInfo.quantity,
        size: productInfo.size,
        color: productInfo.color,
      };

      cart.push(cartItem);
    }
  }
  
  // Save updated cart
  localStorage.setItem('cart', JSON.stringify(cart));

  updateCartCount();
}

function displayRelatedProducts(currentProduct) {
  // Find 3 related products same category
  let relatedProducts = products
    .filter(p => p.id !== currentProduct.id && p.category === currentProduct.category)
    .slice(0, 4);
  
  if (relatedProducts.length < 3) {
    const otherProducts = products.filter(p =>
      p.id !== currentProduct.id &&
      p.category !== currentProduct.category &&
      !relatedProducts.some(rp => rp.id == p.id) // Returns true if ANY product in the relatedProducts array has an ID that matches the current product's ID (p.id).
    ).slice(0, 4 - relatedProducts.length);

    relatedProducts = [...relatedProducts, ...otherProducts]; // Combine two arrays into a new array
  }

  let relatedHTML = '';
  
  if (relatedProducts.length === 0) {
    relatedHTML = '<p>No related products found.</p>';
  } else {
    relatedProducts.forEach(product => {
      let priceDisplay = '';
      
      if (product.sale) {
        priceDisplay = `
          <div class="sale__item__price">
            <span class="related-original-price">HKD${product.price}</span>
            <span class="related-discounted-price">HKD${product.discountedPrice}</span>
          </div>`;
      } else {
        priceDisplay = `<span class="related-item-price">HKD${product.price}</span>`;
      }
      
      // Ensure short description text with limited length
      const shortDesc = product.description ? 
        (product.description.length > 50 ? 
          product.description.substring(0, 50) + '...' : 
          product.description) : 
        '';
            
      relatedHTML += `
        <div class="related-items__collection ${product.sale ? ' sale__item' : ''}">
          <div class="related-items__image__cover">
            <a href="product.html?id=${product.id}">
              <img class="related-items__image" alt="${product.name}" src="${product.image}">
            </a>
          </div>
          <h4>${product.name}</h4>
          <h6>${shortDesc}</h6>
          ${priceDisplay}
        </div>
      `;
    });
  }
  
  const relatedProductsContainer = document.querySelector('.preview__gallery');
  
  relatedProductsContainer.innerHTML = relatedHTML;
  
  // Add functionality to the "View all" button
  const viewAllButton = document.querySelector('.related-items__button');
  if (viewAllButton) {
    viewAllButton.addEventListener('click', () => {
      window.location.href = `shop.html?category=${encodeURIComponent(currentProduct.category || '')}`; // encodeURIComponent() Encodes special characters to be URL-safe
    });
  }
}


function RenderDropDown(){
  // Get all section headers in the product details
  const sections = document.querySelectorAll('.product-dropdown-details > div > h3');
  
  // Add click event listener to each header
  sections.forEach(header => {
    header.addEventListener('click', function() {
      // Toggle active class on the parent (div)
      const parent = this.parentElement;
      parent.classList.toggle('active');
    });
  });
}

function setupSizeGuideLink() {
  const sizeGuideLink = document.querySelector('.size-guide-link');

  if (sizeGuideLink) {
    sizeGuideLink.addEventListener('click', function(e) {
      e.preventDefault(); // Prevent default link behavior. href #
      
      // Find the size guide div (parent element)
      const sizeGuideDiv = document.querySelector('.product-dropdown-details .size-guide');
    
      // Add active class to the size guide div
      sizeGuideDiv.classList.add('active');
    });
  };
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0); // Updates the total using .reduce (handles decrease/increase)
  
  // Update the cart count in the navigation bar
  const cartCountElement = document.querySelector('.cart-count');
  if (cartCountElement) {
    cartCountElement.textContent = cartCount;

    if (cartCount > 0) {
      cartCountElement.style.display = 'block'; // Show the cart count
    }
    else {
      cartCountElement.style.display = 'none'; // Hide the cart count if zero
    }
  }
}