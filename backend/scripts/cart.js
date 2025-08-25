import { RenderNavigationBar, RenderSearchBar, updateCartCount, shortenText } from "./utils/knit.js";
import { products } from './data/products.js';

document.addEventListener('DOMContentLoaded', function() {
  RenderNavigationBar();
  RenderSearchBar();
  updateCartCount();
  renderCartItems();
  setupDeliveryOptions();
});

const orderButton = document.querySelector('.make-order-button');
  if (orderButton) {
    orderButton.addEventListener('click', placeOrder);
  }

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
    const deliveryRadios = document.querySelectorAll('.delivery__radio');
    const deliveryDetails = document.getElementById('delivery-details');
    const pickupDetails = document.getElementById('pickup-details');
    
    // Function to handle delivery option changes
    function handleDeliveryOptionChange() {
        const isDelivery = document.getElementById('delivery1').checked;
        
        if (isDelivery) {
            deliveryDetails.style.display = 'flex';
            pickupDetails.style.display = 'none';
            
            // Add selected class for styling
            document.querySelector('.delivery').classList.add('selected');
            document.querySelector('.pickup').classList.remove('selected');
        } else {
            deliveryDetails.style.display = 'none';
            pickupDetails.style.display = 'block';
            
            // Add selected class for styling
            document.querySelector('.pickup').classList.add('selected');
            document.querySelector('.delivery').classList.remove('selected');
        }
    }
    
    // Add event listeners to radio buttons
    deliveryRadios.forEach(radio => {
        radio.addEventListener('change', handleDeliveryOptionChange);
    });
    
    handleDeliveryOptionChange();
}

function placeOrder() {
  // Validate user inputs
  const firstName = document.getElementById('firstname-input').value;
  const lastName = document.getElementById('lastname-input').value;
  const email = document.getElementById('email-input').value;
  const phone = document.getElementById('phonenumber-input').value;
  
  // Basic email validation
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  if (!firstName || !lastName || !email || !phone) {
    alert('Please fill in all contact information fields');
    return;
  } else if (!isValidEmail(email)) {
    alert('Please enter a valid email address');
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
  let deliveryAddress = '';
  let deliveryTitle = '';
  
  // If delivery is selected, validate address fields
  if (isDelivery) {
    const address = document.getElementById('address-input').value;
    const city = document.getElementById('city-input').value;
    const postal = document.getElementById('postal-input').value;
    const country = document.getElementById('country-input').value;
    
    if (!address || !city || !postal || !country) {
      alert('Please fill in all delivery address fields');
      return;
    }
    
    deliveryTitle = 'Delivery Address';
    deliveryAddress = `${address}, ${city}, ${postal}, ${country}`;
  } else {
    deliveryTitle = 'Pickup Information';
    deliveryAddress = 'Please contact us in advance to confirm your pickup time and bring your order confirmation along with valid ID when collecting your order.';
  }
  
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
  
  // Generate HTML for all products in cart for email
  let productsHTML = '';
  
  for (const item of cart) {
    const product = products.find(p => p.id === item.id);
    
    // Skip if product not found
    if (!product) {
      console.error('Product not found:', item.id);
      continue;
    }
    
    const productPrice = product.sale ? (product.discountedPrice || product.price) : product.price;
    
    // Build HTML for this product
    productsHTML += `
      <div style="padding: 10px 0; border-bottom: 1px solid #eee;">
        <div style="font-weight: bold;">${product.name}</div>
        <div style="font-size: 13px; color: #666; padding-top: 4px;">
          Size: ${item.size || 'One Size'} | Qty: ${item.quantity} | Color: ${item.color || 'N/A'}
        </div>
        <div style="text-align: right;"><strong>HKD${productPrice}</strong></div>
      </div>
    `;
  }
  
  // In case no products were found
  if (productsHTML === '') {
    productsHTML = '<div style="padding: 10px 0;">No product details available</div>';
  }
  
  // Prepare EmailJS data
  const orderData = {
    // Customer info
    customerName: `${firstName} ${lastName}`,
    customerEmail: email,
    customerPhone: phone,
    
    // Order info
    deliveryMethod: isDelivery ? 'Delivery' : 'Pickup',
    orderNumber: orderNumber,
    orderDate: orderDate,
    
    // All products/cart items HTML
    productsHTML: productsHTML,
    
    // Delivery information
    deliveryTitle: deliveryTitle,
    deliveryAddress: deliveryAddress,
    
    // Order summary
    subtotal: subtotal.toFixed(2),
    shipping: shipping.toFixed(2),
    total: total.toFixed(2),
    
    // Email routing
    to_name: "KNIT Store",
    to_email: "rionaloarifin610@gmail.com",
    reply_to: email,
  };
  
  // Log data being sent (for debugging)
  console.log('Sending order data:', orderData);
  
  // Show loading indicator
  const orderButton = document.querySelector('.make-order-button');
  const originalButtonText = orderButton.textContent;
  orderButton.textContent = 'Processing...';
  orderButton.disabled = true;
  
  // Send to email service (using EmailJS)
  emailjs.send("service_7pk9i9u", "template_frt3ahe", orderData)
  .then(function(response) {
    console.log('Email sent successfully:', response);
    
    // Store order number for reference
    localStorage.setItem('lastOrderNumber', orderNumber);
    
    // Show success message
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
    
    let errorMessage = 'There was an issue processing your order. Please try again or contact us directly.';
    
    // More specific error messages based on error type
    if (error.status === 400) {
      errorMessage = 'Invalid order information. Please check your details and try again.';
    } else if (error.status === 422) {
      errorMessage = 'Email address validation failed. Please check your email address.';
    } else if (error.status === 0 || error.status >= 500) {
      errorMessage = 'Network issue or service unavailable. Please try again later.';
    }
    
    alert(errorMessage);
    
    // Reset button
    orderButton.textContent = originalButtonText;
    orderButton.disabled = false;
  });
}