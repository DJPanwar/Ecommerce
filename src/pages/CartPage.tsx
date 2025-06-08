import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity, 
    0
  );
  
  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.07; // 7% tax rate
  const total = subtotal + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <ShoppingBag className="mx-auto text-gray-300 mb-6" size={64} />
          <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link to="/products" className="btn-primary">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="hidden md:flex bg-gray-50 p-4 border-b">
              <div className="w-1/2">Product</div>
              <div className="w-1/6 text-center">Price</div>
              <div className="w-1/6 text-center">Quantity</div>
              <div className="w-1/6 text-center">Total</div>
            </div>
            
            <ul className="divide-y">
              {cartItems.map((item) => (
                <li key={item.id} className="p-4 md:p-6 flex flex-col md:flex-row md:items-center">
                  {/* Product Info - Mobile & Desktop */}
                  <div className="flex items-start mb-4 md:mb-0 md:w-1/2">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <h3 className="font-medium text-gray-900">
                          <Link to={`/products/${item.id}`}>{item.name}</Link>
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">{item.variant}</p>
                      </div>
                      
                      {/* Mobile Only Price */}
                      <div className="flex justify-between items-center mt-2 md:hidden">
                        <p className="text-gray-900 font-medium">${item.price.toFixed(2)}</p>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-600 hover:text-red-800 flex items-center text-sm"
                        >
                          <Trash2 size={16} className="mr-1" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Desktop Only - Price */}
                  <div className="hidden md:block w-1/6 text-center">
                    ${item.price.toFixed(2)}
                  </div>
                  
                  {/* Quantity - Mobile & Desktop */}
                  <div className="flex items-center md:justify-center md:w-1/6">
                    <div className="flex border rounded-md">
                      <button
                        className="px-3 py-1 border-r hover:bg-gray-100"
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      >
                        -
                      </button>
                      <span className="px-3 py-1">{item.quantity}</span>
                      <button
                        className="px-3 py-1 border-l hover:bg-gray-100"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    
                    {/* Mobile Only - Total & Remove */}
                    <div className="flex items-center ml-auto md:hidden">
                      <p className="font-medium ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                  
                  {/* Desktop Only - Total & Remove */}
                  <div className="hidden md:flex md:w-1/6 md:justify-center items-center">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                  
                  {/* Desktop Only - Remove Button */}
                  <div className="hidden md:flex items-center justify-end">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-600 hover:text-red-800"
                      aria-label="Remove item"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="mt-6 flex justify-between">
            <Link to="/products" className="btn-secondary flex items-center">
              <ArrowRight size={16} className="mr-2 rotate-180" />
              Continue Shopping
            </Link>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-bold mb-6">Order Summary</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">
                  {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (7%)</span>
                <span className="font-medium">${tax.toFixed(2)}</span>
              </div>
              <div className="border-t pt-4 flex justify-between">
                <span className="font-bold">Total</span>
                <span className="font-bold text-xl">${total.toFixed(2)}</span>
              </div>
            </div>
            
            {/* Promo Code */}
            <div className="mt-6">
              <label htmlFor="promo" className="block text-sm font-medium text-gray-700 mb-2">
                Promo Code
              </label>
              <div className="flex">
                <input
                  type="text"
                  id="promo"
                  className="input rounded-r-none"
                  placeholder="Enter code"
                />
                <button className="btn-primary rounded-l-none">Apply</button>
              </div>
            </div>
            
            {/* Checkout Button */}
            <button className="w-full btn-primary py-3 mt-6">
              Proceed to Checkout
            </button>
            
            {/* Secure Checkout Message */}
            <p className="text-center text-sm text-gray-500 mt-4 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Secure Checkout
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;