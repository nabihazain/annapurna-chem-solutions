import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { CheckCircle, Loader2 } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const PlaceOrder = () => {
  const location = useLocation();
  const selectedProduct = location.state?.selectedProduct || '';

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');

  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    customer_company: '',
    product_name: selectedProduct,
    quantity: '',
    specifications: '',
    delivery_address: '',
    delivery_city: '',
    delivery_state: '',
    delivery_pincode: '',
    additional_notes: ''
  });

  const products = [
    'Flocculant',
    'Cationic Flocculation',
    'Anionic Flocculation (APAM)',
    'Organic Coagulant',
    'Magnetite Powder',
    'Furnace Oil',
    'Organic Binder AE101',
    'Organic Binder AE002',
    'Organic Binder AE009'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(`${API}/orders`, formData);
      setOrderId(response.data.order_id);
      setOrderSuccess(true);
      toast.success('Order placed successfully!');
      
      setFormData({
        customer_name: '',
        customer_email: '',
        customer_phone: '',
        customer_company: '',
        product_name: '',
        quantity: '',
        specifications: '',
        delivery_address: '',
        delivery_city: '',
        delivery_state: '',
        delivery_pincode: '',
        additional_notes: ''
      });
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-background py-20" data-testid="order-success-page">
        <div className="max-w-2xl mx-auto px-6 sm:px-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white border border-slate-200 rounded-sm p-8 text-center"
          >
            <CheckCircle size={64} className="text-green-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-primary mb-4" data-testid="order-success-title">
              Order Placed Successfully!
            </h2>
            <p className="text-slate-700 mb-2">
              Your order has been received and is being processed.
            </p>
            <div className="bg-muted p-4 rounded-sm mb-6">
              <p className="text-sm text-slate-500 mb-1">Your Order ID</p>
              <p className="text-2xl font-mono font-bold text-primary" data-testid="order-id-display">
                {orderId}
              </p>
            </div>
            <p className="text-sm text-slate-600 mb-6">
              Please save your Order ID. We'll contact you shortly regarding your order.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setOrderSuccess(false)}
                data-testid="place-another-order-btn"
                className="px-6 py-3 bg-primary text-white font-semibold rounded-sm hover:bg-slate-800 transition-colors duration-200"
              >
                Place Another Order
              </button>
              <a
                href="/products"
                data-testid="back-to-products-btn"
                className="px-6 py-3 border border-slate-300 text-primary font-semibold rounded-sm hover:border-primary transition-colors duration-200 inline-block"
              >
                Back to Products
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-20" data-testid="place-order-page">
      <div className="max-w-4xl mx-auto px-6 sm:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl sm:text-5xl tracking-tight font-black text-primary mb-4" data-testid="place-order-title">
            Place an Order
          </h1>
          <p className="text-base leading-relaxed text-slate-700 mb-12">
            Fill out the form below to place your order. We'll get back to you shortly.
          </p>

          <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-sm p-8">
            {/* Customer Information */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-primary mb-6 pb-2 border-b border-slate-200">
                Customer Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="customer_name" className="block text-sm font-medium text-slate-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="customer_name"
                    name="customer_name"
                    data-testid="input-customer-name"
                    value={formData.customer_name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-slate-300 rounded-sm focus:border-primary focus:ring-2 focus:ring-accent focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="customer_email" className="block text-sm font-medium text-slate-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="customer_email"
                    name="customer_email"
                    data-testid="input-customer-email"
                    value={formData.customer_email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-slate-300 rounded-sm focus:border-primary focus:ring-2 focus:ring-accent focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="customer_phone" className="block text-sm font-medium text-slate-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="customer_phone"
                    name="customer_phone"
                    data-testid="input-customer-phone"
                    value={formData.customer_phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-slate-300 rounded-sm focus:border-primary focus:ring-2 focus:ring-accent focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="customer_company" className="block text-sm font-medium text-slate-700 mb-2">
                    Company Name (Optional)
                  </label>
                  <input
                    type="text"
                    id="customer_company"
                    name="customer_company"
                    data-testid="input-customer-company"
                    value={formData.customer_company}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-slate-300 rounded-sm focus:border-primary focus:ring-2 focus:ring-accent focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Product Information */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-primary mb-6 pb-2 border-b border-slate-200">
                Product Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="product_name" className="block text-sm font-medium text-slate-700 mb-2">
                    Product *
                  </label>
                  <select
                    id="product_name"
                    name="product_name"
                    data-testid="select-product"
                    value={formData.product_name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-slate-300 rounded-sm focus:border-primary focus:ring-2 focus:ring-accent focus:outline-none"
                  >
                    <option value="">Select a product</option>
                    {products.map((product) => (
                      <option key={product} value={product}>
                        {product}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="quantity" className="block text-sm font-medium text-slate-700 mb-2">
                    Quantity *
                  </label>
                  <input
                    type="text"
                    id="quantity"
                    name="quantity"
                    data-testid="input-quantity"
                    placeholder="e.g., 500 kg, 10 tons"
                    value={formData.quantity}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-slate-300 rounded-sm focus:border-primary focus:ring-2 focus:ring-accent focus:outline-none"
                  />
                </div>
              </div>
              <div className="mt-6">
                <label htmlFor="specifications" className="block text-sm font-medium text-slate-700 mb-2">
                  Product Specifications (Optional)
                </label>
                <textarea
                  id="specifications"
                  name="specifications"
                  data-testid="input-specifications"
                  rows="3"
                  placeholder="Any specific requirements or specifications"
                  value={formData.specifications}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-sm focus:border-primary focus:ring-2 focus:ring-accent focus:outline-none"
                ></textarea>
              </div>
            </div>

            {/* Delivery Information */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-primary mb-6 pb-2 border-b border-slate-200">
                Delivery Information
              </h2>
              <div className="space-y-6">
                <div>
                  <label htmlFor="delivery_address" className="block text-sm font-medium text-slate-700 mb-2">
                    Delivery Address *
                  </label>
                  <input
                    type="text"
                    id="delivery_address"
                    name="delivery_address"
                    data-testid="input-delivery-address"
                    placeholder="Street address, building number"
                    value={formData.delivery_address}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-slate-300 rounded-sm focus:border-primary focus:ring-2 focus:ring-accent focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label htmlFor="delivery_city" className="block text-sm font-medium text-slate-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      id="delivery_city"
                      name="delivery_city"
                      data-testid="input-delivery-city"
                      value={formData.delivery_city}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-slate-300 rounded-sm focus:border-primary focus:ring-2 focus:ring-accent focus:outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="delivery_state" className="block text-sm font-medium text-slate-700 mb-2">
                      State *
                    </label>
                    <input
                      type="text"
                      id="delivery_state"
                      name="delivery_state"
                      data-testid="input-delivery-state"
                      value={formData.delivery_state}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-slate-300 rounded-sm focus:border-primary focus:ring-2 focus:ring-accent focus:outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="delivery_pincode" className="block text-sm font-medium text-slate-700 mb-2">
                      Pincode *
                    </label>
                    <input
                      type="text"
                      id="delivery_pincode"
                      name="delivery_pincode"
                      data-testid="input-delivery-pincode"
                      value={formData.delivery_pincode}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-slate-300 rounded-sm focus:border-primary focus:ring-2 focus:ring-accent focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Notes */}
            <div className="mb-8">
              <label htmlFor="additional_notes" className="block text-sm font-medium text-slate-700 mb-2">
                Additional Notes (Optional)
              </label>
              <textarea
                id="additional_notes"
                name="additional_notes"
                data-testid="input-additional-notes"
                rows="4"
                placeholder="Any additional information or special requests"
                value={formData.additional_notes}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-sm focus:border-primary focus:ring-2 focus:ring-accent focus:outline-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              data-testid="submit-order-btn"
              className="w-full px-8 py-4 bg-primary text-white font-semibold rounded-sm hover:bg-slate-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Submitting Order...
                </>
              ) : (
                'Submit Order'
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default PlaceOrder;
