import { RenderNavigationBar, RenderSearchBar, updateCartCount } from "./utils/knit.js";

RenderNavigationBar();
RenderSearchBar();
updateCartCount();
RenderCartItems();

function RenderCartItems() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    let cartItemHTML = ``;

    cart.forEach(product => {
        let saleClass = ``;
        let priceDisplay = `<h5 class="related-item-price">HKD${product.price}</h5>`; // default price with no sale
        
        if (product.sale) {
            saleClass = `sale__item`;

            // if on sale, change the priceDisplay to show original and discounted price
            priceDisplay = `
            <div class="sale__item__price">
                <h5 class="related-original-price">HKD${product.price}</h5>
                <h5 class="related-discounted-price">HKD${product.discountedPrice}</h5>
            </div>
            `;
        }
        
        // Ensure short description text with limited length
        const shortDesc = product.description ? 
            (product.description.length > 45 ? 
            product.description.substring(0, 45) + '...' : 
            product.description) : 
            '';
        
        cartItemHTML += `
        <div class="cart__item">
            <img src="${product.image}" alt="${product.name} Image" class="cart-item__image">
            <div class="cart__item__details">
                <h4 class="cart__item__name">${product.name}</h4>
                <p class="cart__item__description">${shortDesc}</p>
                <div class="cart__item__options">
                    <span class="cart__item__size">Size: ${product.size}</span>
                    <span class="cart__item__quantity">Qty: ${product.quantity}</span>
                    <span class="cart__item__color">Color: ${product.color}</span>
                </div>
                <div class="cart__item__actions">
                    <span class="cart__item__remove">Remove</span>
                </div>
            </div>
            <span class="cart__item__price">${priceDisplay}</span>
        </div>
        `

        const cartItemContainer = document.querySelector('.cartItems');
        cartItemContainer.innerHTML = cartItemHTML;
    })
}