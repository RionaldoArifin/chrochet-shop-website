import { RenderNavigationBar, RenderSearchBar } from "./utils/knit.js";
import { products } from './data/products.js';

RenderNavigationBar();
RenderSearchBar();
RenderDropDown();
setupSizeGuideLink();
setupQuantitySelector();

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
  setupProductInteractions();
  displayRelatedProducts(product);
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
  
  // model info if available
  if (product.modelInfo) {
    document.getElementById('productModel').textContent = product.modelInfo;
  } else {
    document.getElementById('productModel').textContent = 'To be announced';
  }
  
  // Set product image
  const productImageDiv = document.getElementById('productImage');
}

function setupProductInteractions() {
  // Set up size selection
  const sizeButtons = document.querySelectorAll('.size-button');
  sizeButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      sizeButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class only to the clicked button
      button.classList.add('active');

      // all buttons are now inactive except the one clicked
    });
  });
  
  // Set up add to cart button
  const addToCartBtn = document.querySelector('.add-to-cart-button');
  addToCartBtn.addEventListener('click', () => {
    // Get selected size
    const selectedSize = document.querySelector('.size-button.active');
    
    // make sure a size is selected
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    
    const selectedProductInfo = {
      id: productId,
      quantity: quantity,
      size: selectedSize.textContent
    };
    
    // Log the selected product info
    console.log('Adding to cart:', selectedProductInfo);
    
    // Example: save to localStorage
    saveToCart(selectedProductInfo);
    
    alert('Added to cart!');
  });
}

function setupQuantitySelector() {
  document.addEventListener('DOMContentLoaded', function() {
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
  });
}

function saveToCart(productInfo) {
  // Get existing cart or initialize empty array
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // Check if product already exists in cart with same size
  const existingProductIndex = cart.findIndex(
    item => item.id === productInfo.id && item.size === productInfo.size
  );
  
  if (existingProductIndex >= 0) {
    // Update quantity if product already in cart
    cart[existingProductIndex].quantity += productInfo.quantity;
  } else {
    // Add new product to cart
    cart.push(productInfo);
  }
  
  // Save updated cart
  localStorage.setItem('cart', JSON.stringify(cart));
}

function displayRelatedProducts(currentProduct) {
  // Find 3 related products (could be same category, similar price, etc.)
  const relatedProducts = products
    .filter(p => p.id !== currentProduct.id) // Exclude current product
    .slice(0, 3); // Get first 3 products
  
  // Generate HTML for related products
  let relatedHTML = '';
  
  relatedProducts.forEach(product => {
    let priceDisplay = product.sale 
      ? `<p class="related-product__price"><span class="original">HKD${product.price}</span> <span class="sale">HKD${product.discountedPrice}</span></p>`
      : `<p class="related-product__price">HKD${product.price}</p>`;
      
    relatedHTML += `
      <div class="related-product">
        <a href="product.html?id=${product.id}">
          <img src="${product.image}" alt="${product.name}" class="related-product__image">
          <h3 class="related-product__title">${product.name}</h3>
          ${priceDisplay}
        </a>
      </div>
    `;
  });
  
  document.getElementById('relatedProductsList').innerHTML = relatedHTML;
}

function RenderDropDown(){
  document.addEventListener('DOMContentLoaded', function() {
    // Get all section headers in the product details
    const sections = document.querySelectorAll('.product-dropdown-details > div > h3');
    
    // Add click event listener to each header
    sections.forEach(header => {
      header.addEventListener('click', function() {
        // Toggle active class on the parent div
        const parent = this.parentElement;
        parent.classList.toggle('active');
      });
    });
  });
}

function setupSizeGuideLink() {
  document.addEventListener('DOMContentLoaded', function() {
    const sizeGuideLink = document.querySelector('.size-guide-link');
    
    if (sizeGuideLink) {
      sizeGuideLink.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent default link behavior
        
        // Find the size guide div (parent element)
        const sizeGuideDiv = document.querySelector('.product-dropdown-details .size-guide');
        
        if (sizeGuideDiv) {
          // Add active class to the size guide div (this is the key fix)
          sizeGuideDiv.classList.add('active');
          
          // Scroll to the size guide section
          sizeGuideDiv.scrollIntoView({ behavior: 'smooth' });
          
        } else {
          console.error("Size guide div not found");
        }
      });
    }
  });
}