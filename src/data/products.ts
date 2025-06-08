export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  images: string[];
  category: string;
  featured: boolean;
  isNew: boolean;
  onSale: boolean;
  variants: string[];
  rating: number;
  reviews: number;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Signature Silk Blouse",
    price: 89.99,
    originalPrice: 119.99,
    description: "A luxurious silk blouse with a relaxed fit and elegant drape. Features a classic collar and button-up front with mother-of-pearl buttons. Perfect for both professional settings and evening occasions.",
    images: [
      "https://images.pexels.com/photos/6311387/pexels-photo-6311387.jpeg",
      "https://images.pexels.com/photos/6311392/pexels-photo-6311392.jpeg"
    ],
    category: "clothing",
    featured: true,
    isNew: false,
    onSale: true,
    variants: ["XS", "S", "M", "L", "XL"],
    rating: 4.8,
    reviews: 124
  },
  {
    id: 2,
    name: "Modern Tailored Blazer",
    price: 149.99,
    description: "A contemporary take on the classic blazer. This fitted piece features structured shoulders, notched lapels, and a single-button closure. Crafted from premium wool blend for comfort and durability.",
    images: [
      "https://images.pexels.com/photos/6626903/pexels-photo-6626903.jpeg",
      "https://images.pexels.com/photos/6626967/pexels-photo-6626967.jpeg"
    ],
    category: "clothing",
    featured: true,
    isNew: true,
    onSale: false,
    variants: ["S", "M", "L", "XL"],
    rating: 4.7,
    reviews: 86
  },
  {
    id: 3,
    name: "Leather Crossbody Bag",
    price: 129.99,
    originalPrice: 169.99,
    description: "Elegant yet practical crossbody bag made from genuine leather. Features an adjustable strap, magnetic closure, and multiple interior compartments for organization. The perfect everyday accessory.",
    images: [
      "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg",
      "https://images.pexels.com/photos/934063/pexels-photo-934063.jpeg"
    ],
    category: "accessories",
    featured: true,
    isNew: false,
    onSale: true,
    variants: ["Black", "Brown", "Tan"],
    rating: 4.9,
    reviews: 203
  },
  {
    id: 4,
    name: "High-Waisted Tapered Trousers",
    price: 99.99,
    description: "Elevate your work wardrobe with these sophisticated high-waisted trousers. Features a tapered leg, side pockets, and belt loops. Made from a premium stretch fabric for comfort throughout the day.",
    images: [
      "https://images.pexels.com/photos/6764032/pexels-photo-6764032.jpeg",
      "https://images.pexels.com/photos/6765164/pexels-photo-6765164.jpeg"
    ],
    category: "clothing",
    featured: false,
    isNew: true,
    onSale: false,
    variants: ["XS", "S", "M", "L", "XL"],
    rating: 4.6,
    reviews: 58
  },
  {
    id: 5,
    name: "Statement Gold Earrings",
    price: 69.99,
    description: "Make a statement with these bold yet lightweight gold earrings. The geometric design adds a modern touch to any outfit, while the hypoallergenic material ensures comfort for sensitive ears.",
    images: [
      "https://images.pexels.com/photos/1413420/pexels-photo-1413420.jpeg",
      "https://images.pexels.com/photos/1458867/pexels-photo-1458867.jpeg"
    ],
    category: "accessories",
    featured: false,
    isNew: true,
    onSale: false,
    variants: ["Gold", "Rose Gold", "Silver"],
    rating: 4.7,
    reviews: 42
  },
  {
    id: 6,
    name: "Cashmere Turtleneck Sweater",
    price: 159.99,
    originalPrice: 199.99,
    description: "Luxuriously soft cashmere turtleneck sweater for ultimate comfort and warmth. Features a relaxed fit, ribbed cuffs and hem. A timeless winter essential that never goes out of style.",
    images: [
      "https://images.pexels.com/photos/6311601/pexels-photo-6311601.jpeg",
      "https://images.pexels.com/photos/6311599/pexels-photo-6311599.jpeg"
    ],
    category: "clothing",
    featured: true,
    isNew: false,
    onSale: true,
    variants: ["S", "M", "L", "XL"],
    rating: 4.9,
    reviews: 137
  },
  {
    id: 7,
    name: "Minimalist Watch",
    price: 129.99,
    description: "A sleek, minimalist watch with a clean dial and premium leather strap. Features a Japanese quartz movement, sapphire crystal glass, and water resistance up to 30 meters.",
    images: [
      "https://images.pexels.com/photos/9978722/pexels-photo-9978722.jpeg",
      "https://images.pexels.com/photos/1697214/pexels-photo-1697214.jpeg"
    ],
    category: "accessories",
    featured: true,
    isNew: false,
    onSale: false,
    variants: ["Black/Silver", "Brown/Gold", "Navy/Silver"],
    rating: 4.8,
    reviews: 91
  },
  {
    id: 8,
    name: "A-Line Midi Skirt",
    price: 79.99,
    description: "Elegant A-line midi skirt with a flattering high waist and hidden back zipper. The pleated design adds movement, while the quality fabric ensures it holds its shape throughout the day.",
    images: [
      "https://images.pexels.com/photos/6765029/pexels-photo-6765029.jpeg",
      "https://images.pexels.com/photos/6765028/pexels-photo-6765028.jpeg"
    ],
    category: "clothing",
    featured: false,
    isNew: true,
    onSale: false,
    variants: ["XS", "S", "M", "L", "XL"],
    rating: 4.5,
    reviews: 64
  }
];

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getNewArrivals = (): Product[] => {
  return products.filter(product => product.isNew);
};

export const getSaleProducts = (): Product[] => {
  return products.filter(product => product.onSale);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getProductById = (id: number): Product | undefined => {
  return products.find(product => product.id === id);
};