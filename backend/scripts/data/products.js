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
    description;
    rating;
    price;
    sale;
    discountedPrice;
    category;
    bestSelling;
    size;
    keywords;

    constructor(productDetails) {
        this.id = productDetails.id;
        this.image = productDetails.image;
        this.name = productDetails.name;
        this.description = productDetails.description;
        this.rating = productDetails.rating;
        this.price = productDetails.price;
        this.sale = productDetails.sale || false; // Default to false if not provided
        this.discountedPrice = productDetails.discountedPrice || null; // Default to null if not provided
        this.category = productDetails.category;
        this.bestSelling = productDetails.bestSelling;
        this.size = productDetails.size;
        this.keywords = productDetails.keywords || [];
    }

    getPrice() {
        // return `HKD${this.price}`;
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
    price: 299,
    sale: true,
    discountedPrice: 199,
    keywords: [
      "sweaters",
      "clothes",
    ],
    size: "clothing",
    sizeChartLink: "frontend/images/clothing-size-chart (1).png",
    bestSelling: 80
  }, {
    id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    image: "frontend/images/product-example-2.jpg",
    name: "NOIR CABLE KNIT-SWEATER  ",
    description: "Long sleeve knitted sweater",
    price: 299,
    sale: false,
    keywords: [
      "sweaters",
      "clothes",
    ],
    type: "clothing",
    size: "clothing",
    sizeChartLink: "frontend/images/clothing-size-chart (1).png",
    category: "tops"
  },
  {
    id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
    image: "frontend/images/products/doll-product-example.png",
    name: "Chubby Animal Doll Series",
    description: "Cute and cuddly animal dolls for all ages",
    price: 49,
    sale: true,
    discountedPrice: 29,
    size: "none",
    keywords: [
      "dolls",
      "accessories",
      "kids"
    ],
    category: "accessories",
    bestSelling: 95
  },
  {
    id: "54e0eccd-8f36-462b-b68a-8182611d9add",
    image: "frontend/images/products/bag-product-example.png",
    name: "Floral Love Bag",
    description: "A stylish bag with a floral design",
    price: 299,
    sale: true,
    discountedPrice: 199,
    keywords: [
      "bag",
      "accessories"
    ],
    category: "accessories",
    bestSelling: 90
  },
  {
    id: "3ebe75dc-64d2-4137-8860-1f5a963e534b",
    image: "frontend/images/products/flower-product-example.png",
    name: "Colorful Fruit Cherry Bouquet",
    description: "A vibrant bouquet of cherry flowers",
    price: 99,
    keywords: [
      "flowers",
      "accessories",
      "gifts"
    ],
    category: "accessories"
  },
  {
    id: "3a7dfb92-5c64-4f3d-8a9e-2c61a1b47bc1",
    image: "frontend/images/products/accessory-product-example.png",
    name: "Butterfly Claw Hair Clip",
    description: "A beautiful butterfly-shaped hair clip",
    price: 19,
    keywords: [
      "accessories"
    ],
    category: "accessories"
  },
  {
    id: "f2c8a1e4-7b9d-4d3b-95d7-36f1c2a87e98",
    image: "frontend/images/products/home-product-example.png",
    name: "Blue Landsacpe Blanket",
    description: "A cozy blanket with a blue landscape design",
    price: 149,
    keywords: [
      "home",
      "decoration"
    ]
  },
  {
    id: "9d4f8b61-3a27-4c9e-8e5b-bf7c12d58a34",
    image: "frontend/images/products/clotches-product-example.png",
    name: "Fresh White Summer Cardigan",
    description: "Lightweight cardigan perfect for summer",
    price: 149,
    keywords: [
      "cardigan",
      "top"
    ],
    type: "clothing",
    size: "clothing",
    sizeChartLink: "frontend/images/clothing-size-chart (1).png",
    category: "tops"
  },
  {
  id: "a1b2c3d4-e5f6-7890-g1h2-i3j4k5l6m7n8",
  image: "frontend/images/products/green-argyle-knit-vest.png",
  name: "Green Argyle Knit Vest",
  description: "Soft knit vest with bear pocket",
  price: 229,
  sale: false,
  discountedPrice: null,
  keywords: [
    "vest",
    "knitwear",
    "clothing",
    "argyle"
  ],
  type: "clothing",
  size: "clothing",
  sizeChartLink: "frontend/images/clothing-size-chart.png",
  category: "tops",
  bestSelling: 85
},
{
  id: "b7c8d9e0-f1g2-h3i4-j5k6-l7m8n9o0p1q2",
  image: "frontend/images/products/fruit-themed-bunny-dolls.png",
  name: "Fruit-Themed Bunny Dolls",
  description: "Adorable crochet bunny dolls set",
  price: 129,
  sale: true,
  discountedPrice: 99,
  keywords: [
    "bunny",
    "dolls",
    "crochet",
    "toys",
    "gifts"
  ],
  size: "none",
  category: "accessories",
  bestSelling: 92
},
{
  id: "c1d2e3f4-g5h6-i7j8-k9l0-m1n2o3p4q5r6",
  image: "frontend/images/products/pastel-whale-plushies.png",
  name: "Pastel Whale Plushies",
  description: "Soft and colorful whale plush toys",
  price: 89,
  sale: true,
  discountedPrice: 69,
  keywords: [
    "whale",
    "plushies",
    "toys",
    "gifts",
    "soft toys"
  ],
  size: "none",
  category: "accessories",
  bestSelling: 88
},
{
  id: "d2e3f4g5-h6i7-j8k9-l0m1-n2o3p4q5r6s7",
  image: "frontend/images/products/blue-twist-knot-top.png",
  name: "Blue Twist Knot Top",
  description: "Elegant top with twist knot detail",
  price: 199,
  sale: false,
  discountedPrice: null,
  keywords: [
    "top",
    "blouse",
    "elegant",
    "clothing",
    "casual wear"
  ],
  type: "clothing",
  size: "clothing",
  sizeChartLink: "frontend/images/clothing-size-chart.png",
  category: "tops",
  bestSelling: 75
},
{
  id: "e3f4g5h6-i7j8-k9l0-m1n2-o3p4q5r6s7t8",
  image: "frontend/images/products/dinosaur-crochet-plushies.png",
  name: "Dinosaur Crochet Plushies",
  description: "Cute and soft dinosaur plush toys",
  price: 149,
  sale: true,
  discountedPrice: 119,
  keywords: [
    "dinosaur",
    "plushies",
    "toys",
    "crochet",
    "kids"
  ],
  size: "none",
  category: "toys",
  bestSelling: 90
},
{
  id: "f4g5h6i7-j8k9-l0m1-n2o3-p4q5r6s7t8u9",
  image: "frontend/images/products/green-knit-sweater.png",
  name: "Soft Green Knit Sweater",
  description: "Cozy sweater with elegant knit details",
  price: 259,
  sale: false,
  discountedPrice: null,
  keywords: [
    "sweater",
    "knitwear",
    "clothing",
    "casual wear",
    "tops"
  ],
  type: "clothing",
  size: "clothing",
  sizeChartLink: "frontend/images/clothing-size-chart.png",
  category: "tops",
  bestSelling: 78
},
{
  id: "g5h6i7j8-k9l0-m1n2-o3p4-q5r6s7t8u9v0",
  image: "frontend/images/products/crochet-flower-bouquet-tulip.png",
  name: "Crochet Flower Bouquet",
  description: "Handmade crochet tulip bouquet with delicate details",
  price: 179,
  sale: true,
  discountedPrice: 149,
  keywords: [
    "flowers",
    "bouquet",
    "crochet",
    "gifts",
    "handmade"
  ],
  size: "none",
  category: "accessories",
  bestSelling: 85
},
{
  id: "h6i7j8k9-l0m1-n2o3-p4q5-r6s7t8u9v0w1",
  image: "frontend/images/products/crochet-pink-top.png",
  name: "Crochet Pink Top",
  description: "Handmade crochet pink top with scalloped edges",
  price: 139,
  sale: true,
  discountedPrice: 109,
  keywords: [
    "crochet",
    "top",
    "handmade",
    "clothing",
    "pink"
  ],
  type: "clothing",
  size: "clothing",
  sizeChartLink: "frontend/images/clothing-size-chart.png",
  category: "tops",
  bestSelling: 72
},
{
  id: "i7j8k9l0-m1n2-o3p4-q5r6-s7t8u9v0w1x2",
  image: "frontend/images/products/lavender-knit-cardigan.png",
  name: "Lavender Knit Cardigan",
  description: "Soft and cozy lavender knit cardigan with button details",
  price: 189,
  sale: false,
  discountedPrice: null,
  keywords: [
    "cardigan",
    "knitwear",
    "lavender",
    "clothing",
    "tops"
  ],
  type: "clothing",
  size: "clothing",
  sizeChartLink: "frontend/images/clothing-size-chart.png",
  category: "tops",
  bestSelling: 81
},
{
  id: "j8k9l0m1-n2o3-p4q5-r6s7-t8u9v0w1x2y3",
  image: "frontend/images/products/patchwork-knit-blanket.png",
  name: "Patchwork Knit Blanket",
  description: "Cozy and colorful patchwork knit blanket, perfect for home decor and comfort",
  price: 249,
  sale: false,
  discountedPrice: null,
  keywords: [
    "blanket",
    "knit",
    "patchwork",
    "home decor",
    "cozy"
  ],
  size: "none",
  category: "home decor",
  bestSelling: 87
},
{
  id: "k9l0m1n2-o3p4-q5r6-s7t8-u9v0w1x2y3z4",
  image: "frontend/images/products/crochet-lucky-cat-plushies.png",
  name: "Crochet Lucky Cat Plushies",
  description: "Adorable handmade lucky cat plushies symbolizing good fortune and prosperity",
  price: 159,
  sale: true,
  discountedPrice: 129,
  keywords: [
    "lucky cat",
    "plushies",
    "crochet",
    "handmade",
    "fortune"
  ],
  size: "none",
  category: "decor",
  bestSelling: 93
},
{
  id: "m1n2o3p4-q5r6-s7t8-u9v0-w1x2y3z4a5b6",
  image: "frontend/images/products/crochet-lace-cardigan.png",
  name: "Crochet Lace Cardigan",
  description: "Elegant handmade crochet lace cardigan with scalloped edges and button closure",
  price: 199,
  sale: false,
  discountedPrice: null,
  keywords: [
    "crochet",
    "cardigan",
    "lace",
    "handmade",
    "clothing"
  ],
  type: "clothing",
  size: "clothing",
  sizeChartLink: "frontend/images/clothing-size-chart.png",
  category: "tops",
  bestSelling: 84
},
{
  id: "m1n2o3p4-q5r6-s7t8-u9v0-w1x2y3z4a5b6",
  image: "frontend/images/products/men-crochet-cardigan.png",
  name: "Men's Crochet Cardigan",
  description: "Stylish handmade crochet cardigan for men, featuring intricate patterns",
  price: 199,
  sale: true,
  discountedPrice: 169,
  keywords: [
    "crochet",
    "cardigan",
    "men's fashion",
    "handmade",
    "clothing"
  ],
  type: "clothing",
  size: "clothing",
  sizeChartLink: "frontend/images/clothing-size-chart.png",
  category: "tops",
  bestSelling: 76
},
{
  id: "n2o3p4q5-r6s7-t8u9-v0w1-x2y3z4a5b6c7",
  image: "frontend/images/products/feminine-crochet-sweater.png",
  name: "Feminine Crochet Sweater",
  description: "Delicate handmade crochet sweater with floral details and a soft pink trim",
  price: 179,
  sale: false,
  discountedPrice: null,
  keywords: [
    "crochet",
    "sweater",
    "handmade",
    "feminine",
    "floral",
    "clothing"
  ],
  type: "clothing",
  size: "clothing",
  sizeChartLink: "frontend/images/clothing-size-chart.png",
  category: "tops",
  bestSelling: 88
},
{
  id: "o3p4q5r6-s7t8-u9v0-w1x2-y3z4a5b6c7d8",
  image: "frontend/images/products/crochet-goose-plushies.png",
  name: "Crochet Goose Plushies",
  description: "Charming handmade crochet goose plushies in adorable outfits, perfect for decor or gifting",
  price: 139,
  sale: true,
  discountedPrice: 109,
  keywords: [
    "crochet",
    "plushies",
    "goose",
    "handmade",
    "decor",
    "toys"
  ],
  size: "none",
  category: "decor",
  bestSelling: 92
},
{
  id: "p4q5r6s7-t8u9-v0w1-x2y3-z4a5b6c7d8e9",
  image: "frontend/images/products/elegant-crochet-blouse.png",
  name: "Elegant Crochet Blouse",
  description: "Lightweight handmade crochet blouse with intricate patterns and a relaxed fit",
  price: 189,
  sale: false,
  discountedPrice: null,
  keywords: [
    "crochet",
    "blouse",
    "handmade",
    "elegant",
    "clothing"
  ],
  type: "clothing",
  size: "clothing",
  sizeChartLink: "frontend/images/clothing-size-chart.png",
  category: "tops",
  bestSelling: 85
},
{
  id: "q5r6s7t8-u9v0-w1x2-y3z4-a5b6c7d8e9f0",
  image: "frontend/images/products/purple-patchwork-crochet-sweater.png",
  name: "Purple Patchwork Crochet Sweater",
  description: "Cozy handmade crochet sweater with a purple and cream patchwork design",
  price: 199,
  sale: true,
  discountedPrice: 169,
  keywords: [
    "crochet",
    "sweater",
    "patchwork",
    "handmade",
    "purple",
    "clothing"
  ],
  type: "clothing",
  size: "clothing",
  sizeChartLink: "frontend/images/clothing-size-chart.png",
  category: "tops",
  bestSelling: 90
},
{
  id: "r6s7t8u9-v0w1-x2y3-z4a5-b6c7d8e9f0g1",
  image: "frontend/images/products/white-crochet-blouse.png",
  name: "White Crochet Blouse",
  description: "Elegant handmade white crochet blouse with delicate lace patterns",
  price: 189,
  sale: false,
  discountedPrice: null,
  keywords: [
    "crochet",
    "blouse",
    "handmade",
    "white",
    "clothing",
    "elegant"
  ],
  type: "clothing",
  size: "clothing",
  sizeChartLink: "frontend/images/clothing-size-chart.png",
  category: "tops",
  bestSelling: 86
},
{
  id: "r6s7t8u9-v0w1-x2y3-z4a5-b6c7d8e9f0g1",
  image: "frontend/images/products/crochet-scallop-top.png",
  name: "Crochet Scallop Top",
  description: "Elegant and lightweight handmade crochet top with scalloped edges and cap sleeves",
  price: 149,
  sale: false,
  discountedPrice: null,
  keywords: [
    "crochet",
    "top",
    "handmade",
    "scallop",
    "elegant",
    "clothing"
  ],
  type: "clothing",
  size: "clothing",
  sizeChartLink: "frontend/images/clothing-size-chart.png",
  category: "tops",
  bestSelling: 87
},
{
  id: "s7t8u9v0-w1x2-y3z4-a5b6-c7d8e9f0g1h2",
  image: "frontend/images/products/crochet-sweater-vest.png",
  name: "Crochet Sweater Vest",
  description: "Trendy handmade crochet sweater vest in blue and white with intricate patterns",
  price: 129,
  sale: true,
  discountedPrice: 109,
  keywords: [
    "crochet",
    "sweater vest",
    "handmade",
    "blue",
    "clothing",
    "fashion"
  ],
  type: "clothing",
  size: "clothing",
  sizeChartLink: "frontend/images/clothing-size-chart.png",
  category: "tops",
  bestSelling: 91
},
{
  id: "s7t8u9v0-w1x2-y3z4-a5b6-c7d8e9f0g1h2",
  image: "frontend/images/products/crochet-square-pattern-vest.png",
  name: "Crochet Square Pattern Vest",
  description: "Chic handmade crochet vest with intricate square patterns, perfect for layering",
  price: 139,
  sale: true,
  discountedPrice: 119,
  keywords: [
    "crochet",
    "vest",
    "square pattern",
    "handmade",
    "layering",
    "clothing"
  ],
  type: "clothing",
  size: "clothing",
  sizeChartLink: "frontend/images/clothing-size-chart.png",
  category: "tops",
  bestSelling: 83
},
{
  id: "t8u9v0w1-x2y3-z4a5-b6c7-d8e9f0g1h2i3",
  image: "frontend/images/products/pink-lace-up-crochet-sweater.png",
  name: "Pink Lace-Up Crochet Sweater",
  description: "Soft handmade crochet sweater in a blush pink hue with lace-up sleeve details",
  price: 179,
  sale: true,
  discountedPrice: 149,
  keywords: [
    "crochet",
    "sweater",
    "pink",
    "lace-up",
    "handmade",
    "clothing"
  ],
  type: "clothing",
  size: "clothing",
  sizeChartLink: "frontend/images/clothing-size-chart.png",
  category: "tops",
  bestSelling: 88
},
{
  id: "u9v0w1x2-y3z4-a5b6-c7d8-e9f0g1h2i3j4",
  image: "frontend/images/products/black-and-cream-crochet-blouse.png",
  name: "Black and Cream Crochet Blouse",
  description: "Elegant handmade crochet blouse with cream floral patterns and black accents on the neckline and cuffs",
  price: 199,
  sale: false,
  discountedPrice: null,
  keywords: [
    "crochet",
    "blouse",
    "black and cream",
    "handmade",
    "floral",
    "clothing"
  ],
  type: "clothing",
  size: "clothing",
  sizeChartLink: "frontend/images/clothing-size-chart.png",
  category: "tops",
  bestSelling: 92
},
{
  id: "v0w1x2y3-z4a5-b6c7-d8e9-f0g1h2i3j4k5",
  image: "frontend/images/products/round-crochet-bag.png",
  name: "Round Crochet Bag",
  description: "Charming handmade round crochet bag with colorful floral patterns, perfect for casual outings",
  price: 89,
  sale: false,
  discountedPrice: null,
  keywords: [
    "crochet",
    "bag",
    "handmade",
    "round",
    "floral",
    "accessories"
  ],
  type: "accessories",
  size: "one-size",
  sizeChartLink: null,
  category: "bags",
  bestSelling: 84
},
{
  id: "w1x2y3z4-a5b6-c7d8-e9f0-g1h2i3j4k5l6",
  image: "frontend/images/products/red-diamond-knit-vest.png",
  name: "Red Diamond Knit Vest",
  description: "Classic handmade knit vest with red and cream diamond patterns, perfect for layering",
  price: 119,
  sale: false,
  discountedPrice: null,
  keywords: [
    "knit",
    "vest",
    "handmade",
    "red",
    "diamond pattern",
    "clothing"
  ],
  type: "clothing",
  size: "clothing",
  sizeChartLink: "frontend/images/clothing-size-chart.png",
  category: "tops",
  bestSelling: 89
}


].map((productDetails) => {
  if (productDetails.type === 'clothing') {
    return new Clothing(productDetails);
  }
  return new Product(productDetails);
});