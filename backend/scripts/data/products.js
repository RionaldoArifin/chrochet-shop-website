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
    description: "Long sleeve knitted sweater",
    rating: {
      stars: 4.5,
      count: 87
    },
    price: 299,
    sale: true,
    discountedPrice: 199,
    keywords: [
      "sweaters",
      "clotches",
    ],
    type: "clothing",
    sizeChartLink: "images/clothing-size-chart.png"
  }, {
    id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    image: "frontend/images/product-example-2.jpg",
    name: "NOIR CABLE KNIT-SWEATER  ",
    description: "Long sleeve knitted sweater",
    rating: {
      stars: 4,
      count: 127
    },
    price: 299,
    sale: false,
    keywords: [
      "sweaters",
      "clotches",
    ],
    type: "clothing",
    sizeChartLink: "images/clothing-size-chart.png"
  },
  {
    id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
    image: "frontend/images/products/doll-product-example.png",
    name: "Chubby Animal Doll Series",
    description: "Cute and cuddly animal dolls for all ages",
    rating: {
      stars: 4.5,
      count: 56
    },
    price: 49,
    sale: true,
    discountedPrice: 29,
    keywords: [
      "dolls",
      "accessories",
      "kids"
    ],
  },
  {
    id: "54e0eccd-8f36-462b-b68a-8182611d9add",
    image: "frontend/images/products/bag-product-example.png",
    name: "Floral Love Bag",
    description: "A stylish bag with a floral design",
    rating: {
      stars: 5,
      count: 2197
    },
    price: 299,
    sale: true,
    discountedPrice: 199,
    keywords: [
      "bag",
      "accessories"
    ]
  },
  {
    id: "3ebe75dc-64d2-4137-8860-1f5a963e534b",
    image: "frontend/images/products/flower-product-example.png",
    name: "Colorful Fruit Cherry Bouquet",
    description: "A vibrant bouquet of cherry flowers",
    rating: {
      stars: 4,
      count: 37
    },
    price: 99,
    sale: false,
    keywords: [
      "flowers",
      "accessories"
    ]
  },
  {
    id: "54e0eccd-8f36-462b-b68a-8182611d9add",
    image: "frontend/images/products/accessory-product-example.png",
    name: "Butterfly Claw Hair Clip",
    description: "A beautiful butterfly-shaped hair clip",
    rating: {
      stars: 5,
      count: 2197
    },
    price: 19,
    sale: false,
    keywords: [
      "accessories"
    ]
  },
  {
    id: "54e0eccd-8f36-462b-b68a-8182611d9add",
    image: "frontend/images/products/home-product-example.png",
    name: "Blue Landsacpe Blanket",
    description: "A cozy blanket with a blue landscape design",
    rating: {
      stars: 5,
      count: 2197
    },
    price: 149,
    sale: false,
    keywords: [
      "home",
      "decoration"
    ]
  },
  {
    id: "54e0eccd-8f36-462b-b68a-8182611d9add",
    image: "frontend/images/products/clotches-product-example.png",
    name: "Fresh White Summer Cardigan",
    description: "Lightweight cardigan perfect for summer",
    rating: {
      stars: 5,
      count: 2197
    },
    price: 149,
    sale: false,
    keywords: [
      "home",
      "decoration"
    ],
    type: "clothing",
    sizeChartLink: "images/clothing-size-chart.png"
  }].map((productDetails) => {
  if (productDetails.type === 'clothing') {
    return new Clothing(productDetails);
  }
  return new Product(productDetails);
});