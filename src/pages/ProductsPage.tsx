import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { products, Product } from '../data/products';
import { Star, Filter, X, ChevronDown } from 'lucide-react';

const ProductsPage: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get('category');
  const saleParam = queryParams.get('sale');
  const newParam = queryParams.get('new');

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortOption, setSortOption] = useState<string>('featured');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categoryParam ? [categoryParam] : []
  );
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Filter products based on URL parameters and filter state
  useEffect(() => {
    let result = [...products];

    // Apply category filter from both URL and filter panel
    if (selectedCategories.length > 0) {
      result = result.filter(product => selectedCategories.includes(product.category));
    }

    // Apply sale filter
    if (saleParam === 'true') {
      result = result.filter(product => product.onSale);
    }

    // Apply new filter
    if (newParam === 'true') {
      result = result.filter(product => product.isNew);
    }

    // Apply price range filter
    result = result.filter(
      product => product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Apply sorting
    switch (sortOption) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a,) => (a.isNew ? -1 : 1));
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default: // featured
        result.sort((a,) => (a.featured ? -1 : 1));
    }

    setFilteredProducts(result);
  }, [categoryParam, saleParam, newParam, selectedCategories, sortOption, priceRange]);

  // Handle category filter toggles
  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  // Handle price range changes
  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newValue = parseInt(event.target.value);
    setPriceRange(prev => {
      const newRange = [...prev] as [number, number];
      newRange[index] = newValue;
      return newRange;
    });
  };

  // Get page title based on filters
  const getPageTitle = () => {
    if (saleParam === 'true') return 'Sale Items';
    if (newParam === 'true') return 'New Arrivals';
    if (categoryParam === 'clothing') return 'Clothing';
    if (categoryParam === 'accessories') return 'Accessories';
    return 'All Products';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{getPageTitle()}</h1>
        <p className="text-gray-600">
          {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'}
        </p>
      </div>

      {/* Filter and Sort Controls - Mobile */}
      <div className="lg:hidden flex justify-between mb-6">
        <button
          onClick={() => setFiltersOpen(true)}
          className="btn-secondary flex items-center"
        >
          <Filter size={18} className="mr-2" />
          Filters
        </button>

        <div className="relative">
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="input appearance-none pr-8"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="newest">Newest</option>
            <option value="rating">Highest Rated</option>
          </select>
          <ChevronDown size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
        </div>
      </div>

      {/* Mobile Filter Sidebar */}
      {filtersOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setFiltersOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-white z-50 overflow-y-auto p-6 animate-slide-up">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button 
                onClick={() => setFiltersOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            {/* Filter content */}
            <div className="space-y-6">
              {/* Categories */}
              <div>
                <h3 className="font-medium mb-3">Categories</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes('clothing')}
                      onChange={() => toggleCategory('clothing')}
                      className="rounded text-primary-600 focus:ring-primary-500 mr-2"
                    />
                    <span>Clothing</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes('accessories')}
                      onChange={() => toggleCategory('accessories')}
                      className="rounded text-primary-600 focus:ring-primary-500 mr-2"
                    />
                    <span>Accessories</span>
                  </label>
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="font-medium mb-3">Price Range</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="200"
                    value={priceRange[0]}
                    onChange={(e) => handlePriceChange(e, 0)}
                    className="w-full"
                  />
                  <input
                    type="range"
                    min="0"
                    max="200"
                    value={priceRange[1]}
                    onChange={(e) => handlePriceChange(e, 1)}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Product Status */}
              <div>
                <h3 className="font-medium mb-3">Product Status</h3>
                <div className="space-y-2">
                  <Link 
                    to="/products?sale=true"
                    className={`block px-3 py-2 rounded-lg ${
                      saleParam === 'true' ? 'bg-primary-100 text-primary-800' : 'hover:bg-gray-100'
                    }`}
                  >
                    On Sale
                  </Link>
                  <Link 
                    to="/products?new=true"
                    className={`block px-3 py-2 rounded-lg ${
                      newParam === 'true' ? 'bg-primary-100 text-primary-800' : 'hover:bg-gray-100'
                    }`}
                  >
                    New Arrivals
                  </Link>
                </div>
              </div>
            </div>

            <button
              onClick={() => setFiltersOpen(false)}
              className="btn-primary w-full mt-8"
            >
              Apply Filters
            </button>
          </div>
        </>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Desktop Filter Sidebar */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-28 space-y-8">
            {/* Categories */}
            <div>
              <h3 className="font-medium text-lg mb-3">Categories</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes('clothing')}
                    onChange={() => toggleCategory('clothing')}
                    className="rounded text-primary-600 focus:ring-primary-500 mr-2"
                  />
                  <span>Clothing</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes('accessories')}
                    onChange={() => toggleCategory('accessories')}
                    className="rounded text-primary-600 focus:ring-primary-500 mr-2"
                  />
                  <span>Accessories</span>
                </label>
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="font-medium text-lg mb-3">Price Range</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={priceRange[0]}
                  onChange={(e) => handlePriceChange(e, 0)}
                  className="w-full"
                />
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={priceRange[1]}
                  onChange={(e) => handlePriceChange(e, 1)}
                  className="w-full"
                />
              </div>
            </div>

            {/* Product Status */}
            <div>
              <h3 className="font-medium text-lg mb-3">Product Status</h3>
              <div className="space-y-2">
                <Link 
                  to="/products?sale=true"
                  className={`block px-3 py-2 rounded-lg ${
                    saleParam === 'true' ? 'bg-primary-100 text-primary-800' : 'hover:bg-gray-100'
                  }`}
                >
                  On Sale
                </Link>
                <Link 
                  to="/products?new=true"
                  className={`block px-3 py-2 rounded-lg ${
                    newParam === 'true' ? 'bg-primary-100 text-primary-800' : 'hover:bg-gray-100'
                  }`}
                >
                  New Arrivals
                </Link>
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {/* Desktop Sort Control */}
          <div className="hidden lg:flex justify-end mb-6">
            <div className="relative w-60">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="input appearance-none pr-8"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="newest">Newest</option>
                <option value="rating">Highest Rated</option>
              </select>
              <ChevronDown size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
            </div>
          </div>

          {/* Products */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No products found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your filters or browse our categories.</p>
              <Link to="/products" className="btn-primary">View All Products</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <Link key={product.id} to={`/products/${product.id}`} className="card group animate-fade-in">
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
                    {product.isNew && !product.onSale && (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;