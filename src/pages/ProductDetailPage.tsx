import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../data/products';
import { useCart } from '../context/CartContext';
import { Star, Heart, Share2, Truck, RefreshCw, ShieldCheck } from 'lucide-react';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(parseInt(id || '0'));
  const { addToCart } = useCart();
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(product?.variants?.[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [isWishlist, setIsWishlist] = useState(false);
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="mb-8">The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/products" className="btn-primary">
          Continue Shopping
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      variant: selectedVariant,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <Link to="/products" className="text-primary-600 hover:text-primary-700">
          ← Back to Products
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="aspect-square overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Thumbnail Images */}
          {product.images.length > 1 && (
            <div className="flex space-x-4">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index
                      ? 'border-primary-600'
                      : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} - Image ${index + 1}`}
                    className="w-full h-full object-cover object-center"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Labels */}
          <div className="flex flex-wrap gap-2">
            {product.onSale && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                Sale
              </span>
            )}
            {product.isNew && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                New Arrival
              </span>
            )}
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 capitalize">
              {product.category}
            </span>
          </div>

          {/* Product Title and Pricing */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            
            <div className="flex items-center mt-3">
              <div className="flex items-center text-amber-400 mr-2">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={18} 
                    fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'} 
                    className={i < Math.floor(product.rating) ? '' : 'text-gray-300'}
                  />
                ))}
                <span className="ml-2 text-gray-600">{product.rating}</span>
              </div>
              <span className="text-gray-500">({product.reviews} reviews)</span>
            </div>
            
            <div className="mt-3 flex items-end">
              {product.onSale && product.originalPrice && (
                <span className="text-lg text-gray-500 line-through mr-2">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
              <span className={`text-2xl font-bold ${product.onSale ? 'text-red-600' : 'text-gray-900'}`}>
                ${product.price.toFixed(2)}
              </span>
              {product.onSale && product.originalPrice && (
                <span className="ml-2 text-sm font-medium text-green-600">
                  Save ${(product.originalPrice - product.price).toFixed(2)}
                </span>
              )}
            </div>
          </div>

          {/* Product Description */}
          <div>
            <h2 className="text-lg font-medium mb-2">Description</h2>
            <p className="text-gray-600 leading-relaxed">{product.description}</p>
          </div>

          {/* Variant Selection */}
          <div>
            <h2 className="text-lg font-medium mb-2">
              {product.category === 'clothing' ? 'Size' : 'Variant'}
            </h2>
            <div className="flex flex-wrap gap-2">
              {product.variants.map((variant) => (
                <button
                  key={variant}
                  onClick={() => setSelectedVariant(variant)}
                  className={`px-4 py-2 rounded-lg border ${
                    selectedVariant === variant
                      ? 'bg-primary-50 border-primary-600 text-primary-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {variant}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div>
            <h2 className="text-lg font-medium mb-2">Quantity</h2>
            <div className="flex items-center">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-l-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100"
              >
                -
              </button>
              <input 
                type="number" 
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-16 h-10 border-t border-b border-gray-300 text-center"
                min="1"
              />
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 rounded-r-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleAddToCart}
              className="btn-primary flex-1 py-3 text-base"
            >
              Add to Cart
            </button>
            <button
              onClick={() => setIsWishlist(!isWishlist)}
              className="btn-secondary flex items-center justify-center"
            >
              <Heart 
                size={20} 
                className={`${isWishlist ? 'fill-red-500 text-red-500' : ''} mr-2`} 
              />
              Wishlist
            </button>
            <button className="btn-secondary flex items-center justify-center">
              <Share2 size={20} className="mr-2" />
              Share
            </button>
          </div>

          {/* Product Features */}
          <div className="border-t border-gray-200 pt-6">
            <ul className="space-y-3">
              <li className="flex items-center text-gray-600">
                <Truck className="mr-3 text-primary-600" size={20} />
                <span>Free shipping on orders over $50</span>
              </li>
              <li className="flex items-center text-gray-600">
                <RefreshCw className="mr-3 text-primary-600" size={20} />
                <span>30-day easy returns</span>
              </li>
              <li className="flex items-center text-gray-600">
                <ShieldCheck className="mr-3 text-primary-600" size={20} />
                <span>Quality guaranteed</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;