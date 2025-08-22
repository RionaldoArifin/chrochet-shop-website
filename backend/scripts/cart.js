import { RenderNavigationBar, RenderSearchBar, updateCartCount, shortenText } from "./utils/knit.js";
import { products } from './data/products.js';

document.addEventListener('DOMContentLoaded', function() {
  RenderNavigationBar();
  RenderSearchBar();
  updateCartCount();
  renderCartItems();
  setupDeliveryOptions();
});

function renderCartItems() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartItemsContainer = document.querySelector('.cart__items');
  
  // Handle empty cart
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<div class="empty-cart">Your cart is empty.</div>';
    updatePriceSummary(0, 0);
    return;
  }
  
  let cartItemsHTML = '';
  
  // Create HTML for each cart item
  cart.forEach(cartItem => {
    const product = products.find(p => p.id === cartItem.id) || {};
    
    cartItemsHTML += `
    <div class="cart__item" data-id="${product.id}">
      <img src="${product.image}" alt="${product.name}" class="cart-item__image">
      <div class="cart__item__details">
        <h4 class="cart__item__name">${product.name}</h4>
        <p class="cart__item__description">${shortenText(product.description, 45)}</p>
        <div class="cart__item__options">
          <span class="cart__item__size">Size: ${cartItem.size || 'One Size'}</span>
          <span class="cart__item__quantity">Qty: ${cartItem.quantity}</span>
          ${cartItem.color ? `<span class="cart__item__color">Color: ${cartItem.color}</span>` : ''}
        </div>
        <div class="cart__item__actions">
          <span class="cart__item__remove" data-id="${product.id}">Remove</span>
        </div>
      </div>
      <span class="cart__item__price">
        ${product.sale ? 
          `<div class="sale__item__price">
            <span class="original-price">HKD${product.price}</span>
            <span class="discounted-price">HKD${product.discountedPrice}</span>
          </div>` : 
          `<span class="normal-price">HKD${product.price}</span>`
        }
      </span>
    </div>
    `;
  });
  
  cartItemsContainer.innerHTML = cartItemsHTML;
  
  // Calculate total and update price summary
  const subtotal = calculateSubtotal(cart);
  const shipping = document.getElementById('delivery1').checked ? 20 : 0;
  updatePriceSummary(subtotal, shipping);
  
  // Event listeners to remove buttons
  document.querySelectorAll('.cart__item__remove').forEach(button => {
    button.addEventListener('click', function() {
      const productId = this.getAttribute('data-id');
      removeFromCart(productId);
    });
  });
}

function calculateSubtotal(cart) {
  return cart.reduce((total, cartItem) => { // iterate through every Cart Items and set the total value to 0 for first iteration
    
    const product = products.find(p => p.id === cartItem.id) || {};
    
    // Get the price based on sale status
    const itemPrice = product.sale ? Number(product.discountedPrice || 0) : Number(product.price || 0);
    
    // Multiply by quantity from cart item
    return total + (itemPrice * cartItem.quantity);
  }, 0); // set total default value to 0
}

function updatePriceSummary(subtotal, shipping) {
  const summaryContainer = document.querySelector('.cart__summary');
  
  const total = subtotal + shipping;
  
  summaryContainer.innerHTML = `
    <div class="cart__summary__row">
      <span>Subtotal</span>
      <span>HKD ${subtotal.toFixed(2)}</span>
    </div>
    <div class="cart__summary__row">
      <span>Shipping</span>
      <span>HKD ${shipping.toFixed(2)}</span>
    </div>
    <div class="cart__summary__total">
      <span>Total</span>
      <span>HKD${total.toFixed(2)}</span>
    </div>
  `;
}

function removeFromCart(productId) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  const itemIndex = cart.findIndex(item => item.id === productId);
  
  // Remove the item from the cart array
  cart.splice(itemIndex, 1); // Delete at ItemIndex, and delete 1 element/item
  
  // Save updated cart to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
  
  // Re-render the cart and update count
  renderCartItems();
  updateCartCount();

}

function setupDeliveryOptions() {
  const deliveryOption = document.getElementById('deliveryMethodContainer1');
  const pickupOption = document.getElementById('deliveryMethodContainer2');
  const deliveryDetails = document.querySelector('.delivery__details');
  const pickupDetails = document.querySelector('.pickup__details');
  
  // Initially hide pickup details
  if (pickupDetails) pickupDetails.style.display = 'none';
  
  // Setup delivery method change event
  document.querySelectorAll('.delivery__radio').forEach(radio => {
    radio.addEventListener('change', function() {
      if (this.id === 'delivery1') {
        deliveryOption.classList.add('selected');
        pickupOption.classList.remove('selected');
        if (deliveryDetails) deliveryDetails.style.display = 'block';
        if (pickupDetails) pickupDetails.style.display = 'none';
        
        // Update shipping cost
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const subtotal = calculateSubtotal(cart);
        updatePriceSummary(subtotal, 20);
      } else {
        deliveryOption.classList.remove('selected');
        pickupOption.classList.add('selected');
        if (deliveryDetails) deliveryDetails.style.display = 'none';
        if (pickupDetails) pickupDetails.style.display = 'block';
        
        // Update shipping cost (free for pickup)
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const subtotal = calculateSubtotal(cart);
        updatePriceSummary(subtotal, 0);
      }
    });
  });
  
  // Setup order button
  const orderButton = document.querySelector('.make-order-button');
  if (orderButton) {
    orderButton.addEventListener('click', placeOrder);
  }
}

function placeOrder() {
  // Validate user inputs
  const firstName = document.querySelector('.firstname-input').value;
  const lastName = document.querySelector('.lastname-input').value;
  const email = document.querySelector('.email-input').value;
  const phone = document.querySelector('.phonenumber-input').value;
  
  if (!firstName || !lastName || !email || !phone) {
    alert('Please fill in all contact information fields');
    return;
  }
  
  // Check if cart has items
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (cart.length === 0) {
    alert('Your cart is empty. Please add items before placing an order.');
    return;
  }
  
  // Check delivery method and validate address if needed
  const isDelivery = document.getElementById('delivery1').checked;
  let addressDetails = {};
  
  if (isDelivery) {
    const address = document.querySelector('.address-input').value;
    const city = document.querySelector('.city-input').value;
    const postal = document.querySelector('.postal-input').value;
    const country = document.querySelector('.country-input').value;
    
    if (!address || !city || !postal || !country) {
      alert('Please fill in all delivery address fields');
      return;
    }
    
    addressDetails = { address, city, postal, country };
  }
  
  // Format cart items for email
  const cartItems = cart.map(item => {
    const product = products.find(p => p.id === item.id) || {};
    return {
      name: product.name,
      price: (product.sale ? product.discountedPrice : product.price),
      quantity: item.quantity,
      size: item.size || 'One Size',
      color: item.color || ''
    };
  });
  
  // Calculate totals
  const subtotal = calculateSubtotal(cart);
  const shipping = isDelivery ? 20 : 0;
  const total = subtotal + shipping;
  
  // Generate order number
  const orderNumber = 'ORD-' + Date.now().toString().slice(-6);
  
  // Format date
  const orderDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric', 
    month: 'long', 
    day: 'numeric'
  });
  
  // Prepare data for email service
  const orderData = {
    site_url: window.location.origin,
    orderNumber: orderNumber,
    orderDate: orderDate,
    customerInfo: {
      name: `${firstName} ${lastName}`,
      email: email,
      phone: phone
    },
    deliveryMethod: isDelivery ? 'Delivery' : 'Pickup',
    isDelivery: isDelivery,
    addressDetails: addressDetails,
    orderItems: cartItems,
    orderSummary: {
      subtotal: subtotal.toFixed(2),
      shipping: shipping.toFixed(2),
      total: total.toFixed(2)
    }
  };

  // Show loading indicator
  const orderButton = document.querySelector('.make-order-button');
  const originalButtonText = orderButton.textContent;
  orderButton.textContent = 'Processing...';
  orderButton.disabled = true;
  
  // Send to email service (using EmailJS)
  window.emailjs.send("service_7pk9i9u","template_frt3ahe", orderData)
  .then(function(response) {
    console.log('Email sent successfully', response);
    alert('Thank you for your order! We will contact you shortly with confirmation details.');
    
    // Clear cart after successful order
    localStorage.setItem('cart', JSON.stringify([]));
    updateCartCount();
    renderCartItems();
    
    // Reset button
    orderButton.textContent = originalButtonText;
    orderButton.disabled = false;
  })
  .catch(function(error) {
    console.error('Email sending failed:', error);
    alert('There was an issue processing your order. Please try again or contact us directly.');
    
    // Reset button
    orderButton.textContent = originalButtonText;
    orderButton.disabled = false;
  });
}