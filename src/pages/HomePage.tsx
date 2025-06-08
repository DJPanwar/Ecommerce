import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Star } from 'lucide-react';
import { getFeaturedProducts, getNewArrivals } from '../data/products';

const HomePage: React.FC = () => {
  const featuredProducts = getFeaturedProducts();
  const newArrivals = getNewArrivals();

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative h-[80vh] bg-gradient-to-r from-primary-900 to-purple-900 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="container mx-auto px-4 h-full flex items-center relative z-10">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              Redefine Your Style with Elegance
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Discover our new collection of premium fashion pieces designed for the modern individual.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/products" className="btn-primary px-8 py-3 text-lg">
                Shop Now
              </Link>
              <Link to="/products?sale=true" className="btn-secondary bg-white/10 hover:bg-white/20 border-white/20 text-white px-8 py-3 text-lg">
                Explore Sale
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link 
              to="/products?category=clothing" 
              className="relative rounded-2xl overflow-hidden h-80 group"
            >
              <img 
                src="https://images.pexels.com/photos/5693889/pexels-photo-5693889.jpeg" 
                alt="Clothing" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <h3 className="text-3xl font-bold mb-2">Clothing</h3>
                <p className="text-white/80 mb-4">Discover premium apparel</p>
                <span className="inline-flex items-center text-primary-300 font-medium">
                  Shop Now <ChevronRight size={16} className="ml-1" />
                </span>
              </div>
            </Link>
            
            <Link 
              to="/products?category=accessories" 
              className="relative rounded-2xl overflow-hidden h-80 group"
            >
              <img 
                src="https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg" 
                alt="Accessories" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <h3 className="text-3xl font-bold mb-2">Accessories</h3>
                <p className="text-white/80 mb-4">Complete your look</p>
                <span className="inline-flex items-center text-primary-300 font-medium">
                  Shop Now <ChevronRight size={16} className="ml-1" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link to="/products" className="text-primary-600 hover:text-primary-700 font-medium flex items-center">
              View All <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.slice(0, 4).map((product) => (
              <Link key={product.id} to={`/products/${product.id}`} className="card group">
                <div className="relative overflow-hidden aspect-square bg-gray-100">
                  <img 
                    src={product.images[0]} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {product.onSale && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                      SALE
                    </div>
                  )}
                  {product.isNew && (
                    <div className="absolute top-4 left-4 bg-primary-500 text-white text-xs font-bold px-2 py-1 rounded">
                      NEW
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-lg mb-1 group-hover:text-primary-600 transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center mb-2">
                    <div className="flex items-center text-amber-400 mr-2">
                      <Star size={16} fill="currentColor" />
                      <span className="ml-1 text-sm text-gray-700">{product.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center">
                    {product.onSale && product.originalPrice && (
                      <span className="text-gray-500 line-through mr-2">${product.originalPrice.toFixed(2)}</span>
                    )}
                    <span className={`font-semibold ${product.onSale ? 'text-red-600' : ''}`}>
                      ${product.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Banner */}
      <section className="py-24 bg-gradient-to-r from-primary-800 to-purple-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Summer Sale Is Now Live</h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Enjoy up to 40% off on selected items. Limited time offer.
          </p>
          <Link to="/products?sale=true" className="btn-secondary bg-white hover:bg-gray-100 text-primary-800 px-8 py-3 text-lg">
            Shop the Sale
          </Link>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-3xl font-bold">New Arrivals</h2>
            <Link to="/products?new=true" className="text-primary-600 hover:text-primary-700 font-medium flex items-center">
              View All <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.slice(0, 4).map((product) => (
              <Link key={product.id} to={`/products/${product.id}`} className="card group">
                <div className="relative overflow-hidden aspect-square bg-gray-100">
                  <img 
                    src={product.images[0]} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-primary-500 text-white text-xs font-bold px-2 py-1 rounded">
                    NEW
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-lg mb-1 group-hover:text-primary-600 transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center mb-2">
                    <div className="flex items-center text-amber-400 mr-2">
                      <Star size={16} fill="currentColor" />
                      <span className="ml-1 text-sm text-gray-700">{product.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
                  </div>
                  <span className="font-semibold">${product.price.toFixed(2)}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card p-6">
              <div className="flex items-center text-amber-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "The quality of the clothing is exceptional! I've ordered multiple items and each piece has exceeded my expectations. The fabrics are luxurious and the fit is perfect."
              </p>
              <div className="mt-6 flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold">
                  SJ
                </div>
                <div className="ml-3">
                  <h4 className="font-semibold">Sarah Johnson</h4>
                  <p className="text-sm text-gray-500">Loyal Customer</p>
                </div>
              </div>
            </div>
            
            <div className="card p-6">
              <div className="flex items-center text-amber-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "Fast shipping and excellent customer service! When I had a question about sizing, their team responded quickly and helped me choose the perfect fit. Will definitely shop here again."
              </p>
              <div className="mt-6 flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold">
                  ML
                </div>
                <div className="ml-3">
                  <h4 className="font-semibold">Michael Lee</h4>
                  <p className="text-sm text-gray-500">New Customer</p>
                </div>
              </div>
            </div>
            
            <div className="card p-6">
              <div className="flex items-center text-amber-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "I love the attention to detail in every piece I've purchased. The design is modern yet timeless, and the clothes are both comfortable and stylish. This has become my go-to fashion destination."
              </p>
              <div className="mt-6 flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold">
                  AR
                </div>
                <div className="ml-3">
                  <h4 className="font-semibold">Amelia Rodriguez</h4>
                  <p className="text-sm text-gray-500">Fashion Blogger</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;