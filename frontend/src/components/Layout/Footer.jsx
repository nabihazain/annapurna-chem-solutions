import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-white mt-auto">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-xl font-bold mb-4">Annapurna Chem Solutions</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Your trusted partner in chemical supply. Delivering quality products
              for industrial applications across India.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <Link to="/products" className="block text-slate-300 hover:text-white transition-colors text-sm" data-testid="footer-link-products">
                Products
              </Link>
              <Link to="/order" className="block text-slate-300 hover:text-white transition-colors text-sm" data-testid="footer-link-order">
                Place Order
              </Link>
              <Link to="/about" className="block text-slate-300 hover:text-white transition-colors text-sm" data-testid="footer-link-about">
                About Us
              </Link>
              <Link to="/contact" className="block text-slate-300 hover:text-white transition-colors text-sm" data-testid="footer-link-contact">
                Contact
              </Link>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Information</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm">
                <Mail size={18} className="mt-0.5 flex-shrink-0" />
                <a href="mailto:annapurnaenterprise3@gmail.com" className="text-slate-300 hover:text-white transition-colors" data-testid="footer-email">
                  annapurnaenterprise3@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-12 pt-8 text-center text-sm text-slate-400">
          <p>© {new Date().getFullYear()} Annapurna Chem Solutions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
