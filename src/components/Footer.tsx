import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Instagram, 
  Twitter, 
  CreditCard, 
  Truck, 
  RefreshCw, 
  ShieldCheck 
} from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Features */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 border-b border-white/10 pb-12">
          <div className="flex flex-col items-center text-center">
            <Truck className="mb-2 text-primary-400" size={24} />
            <h3 className="font-semibold mb-1">Free Shipping</h3>
            <p className="text-sm text-gray-400">On orders over $50</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <RefreshCw className="mb-2 text-primary-400" size={24} />
            <h3 className="font-semibold mb-1">Easy Returns</h3>
            <p className="text-sm text-gray-400">30 day return policy</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <ShieldCheck className="mb-2 text-primary-400" size={24} />
            <h3 className="font-semibold mb-1">Secure Shopping</h3>
            <p className="text-sm text-gray-400">100% secure checkout</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <CreditCard className="mb-2 text-primary-400" size={24} />
            <h3 className="font-semibold mb-1">Multiple Payment Options</h3>
            <p className="text-sm text-gray-400">All major cards accepted</p>
          </div>
        </div>

        {/* Main Footer */}
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* About */}
          <div>
            <h2 className="text-lg font-semibold mb-4">About Elegance</h2>
            <p className="text-gray-400 text-sm mb-4">
              Elegance is a premium fashion destination offering curated collections 
              of high-quality apparel and accessories for the modern individual.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Shop</h2>
            <ul className="space-y-2">
              <li><Link to="/products" className="text-gray-400 hover:text-primary-400 transition-colors">All Products</Link></li>
              <li><Link to="/products?category=clothing" className="text-gray-400 hover:text-primary-400 transition-colors">Clothing</Link></li>
              <li><Link to="/products?category=accessories" className="text-gray-400 hover:text-primary-400 transition-colors">Accessories</Link></li>
              <li><Link to="/products?sale=true" className="text-gray-400 hover:text-primary-400 transition-colors">Sale</Link></li>
              <li><Link to="/new-arrivals" className="text-gray-400 hover:text-primary-400 transition-colors">New Arrivals</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Customer Service</h2>
            <ul className="space-y-2">
              <li><Link to="/contact" className="text-gray-400 hover:text-primary-400 transition-colors">Contact Us</Link></li>
              <li><Link to="/faq" className="text-gray-400 hover:text-primary-400 transition-colors">FAQs</Link></li>
              <li><Link to="/shipping" className="text-gray-400 hover:text-primary-400 transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/size-guide" className="text-gray-400 hover:text-primary-400 transition-colors">Size Guide</Link></li>
              <li><Link to="/privacy-policy" className="text-gray-400 hover:text-primary-400 transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="mr-2 text-primary-400 flex-shrink-0 mt-1" size={18} />
                <span className="text-gray-400">123 Fashion Street, New York, NY 10001</span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 text-primary-400 flex-shrink-0" size={18} />
                <span className="text-gray-400">(123) 456-7890</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 text-primary-400 flex-shrink-0" size={18} />
                <span className="text-gray-400">support@elegance.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-white/10 pt-8 pb-6">
          <div className="max-w-lg mx-auto text-center">
            <h3 className="text-lg font-semibold mb-2">Subscribe to our newsletter</h3>
            <p className="text-gray-400 mb-4">Get the latest updates on new products and upcoming sales</p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow rounded-lg bg-white/5 border border-white/10 px-4 py-2 focus:outline-none focus:border-primary-400 text-white"
                required
              />
              <button type="submit" className="btn-primary whitespace-nowrap">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-500 text-sm mt-8">
          <p>© {new Date().getFullYear()} Elegance. All rights reserved.</p>
          <p className="mt-1">
            <Link to="/terms" className="hover:text-primary-400 transition-colors">Terms of Service</Link>
            {' • '}
            <Link to="/privacy" className="hover:text-primary-400 transition-colors">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;