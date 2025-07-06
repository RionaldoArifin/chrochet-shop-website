import { RenderNavigationBar, RenderSearchBar } from "./utils/knit.js";
import {products} from './data/products.js';

RenderNavigationBar();
RenderSearchBar();

renderProductsGrid();

function renderProductsGrid() {
  let productsHTML = '';

  products.forEach((product) => {
      productsHTML += `
        <a class="new-items__collection" href="/product.html?id=${product.id}">
            <div class="new-items__image__cover">
                <img class="new-items__image" alt="New-items image" src="${product.image}">
            </div>

            <h4>${product.name}</h4>
            <h6>Long sleeve knitted sweater</h6>
            <h5>${product.getPrice()}</h5>
        </a>`; 
  });

  document.querySelector('.js-product-grid').innerHTML = productsHTML;
}

