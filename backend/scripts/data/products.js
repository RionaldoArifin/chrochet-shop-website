export function getProduct(productId) {
  let matchingProduct;
    products.forEach((product) => {
        if (product.id === productId) {
            matchingProduct = product;
        }
    });
  return matchingProduct;
}

class Product{
    id;
    image;
    name;
    rating;
    price;

    constructor(productDetails) {
        this.id = productDetails.id;
        this.image = productDetails.image;
        this.name = productDetails.name;
        this.rating = productDetails.rating;
        this.price = productDetails.price;
    }

    getPrice() {
        return `HKD${this.price}`;
    }

    extraInfoHTML() {
        return ``;
    }
}

class Clothing extends Product{
    sizeChartLink;

    constructor(productDetails) {
        super(productDetails); //calls constructor of parent's class to set the id, image, name, rating without repeating
        this.sizeChartLink = productDetails.sizeChartLink;
    }

    extraInfoHTML() {
        return `
        <a href="${this.sizeChartLink}" target="_blank">Size Chart</a>
        `;
    }
}

export const products = [
  {
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    image: "frontend/images/product-example.jpg",
    name: "NOIR CABLE KNIT-SWEATER  ",
    rating: {
      stars: 4.5,
      count: 87
    },
    price: 1090,
    keywords: [
      "socks",
      "sports",
      "apparel"
    ]
  }, {
    id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    image: "frontend/images/product-example-2.jpg",
    name: "Intermediate Size Basketball",
    rating: {
      stars: 4,
      count: 127
    },
    price: 2095,
    keywords: [
      "sports",
      "basketballs"
    ]
  },
  {
    id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
    image: "frontend/images/product-example-2.jpg",
    name: "Adults Plain Cotton T-Shirt - 2 Pack",
    rating: {
      stars: 4.5,
      count: 56
    },
    price: 799,
    keywords: [
      "tshirts",
      "apparel",
      "mens"
    ],
    type: "clothing",
    sizeChartLink: "images/clothing-size-chart.png"
  },
  {
    id: "54e0eccd-8f36-462b-b68a-8182611d9add",
    image: "frontend/images/product-example.jpg",
    name: "2 Slot Toaster - Black",
    rating: {
      stars: 5,
      count: 2197
    },
    price: 1899,
    keywords: [
      "toaster",
      "kitchen",
      "appliances"
    ]
  },
  {
    id: "3ebe75dc-64d2-4137-8860-1f5a963e534b",
    image: "frontend/images/product-example.jpg",
    name: "6 Piece White Dinner Plate Set",
    rating: {
      stars: 4,
      count: 37
    },
    price: 2067,
    keywords: [
      "plates",
      "kitchen",
      "dining"
    ]
  }].map((productDetails) => {
  if (productDetails.type === 'clothing') {
    return new Clothing(productDetails);
  }
  return new Product(productDetails);
});