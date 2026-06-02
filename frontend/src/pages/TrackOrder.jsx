import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Search, Package, Clock, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const TrackOrder = () => {
  const [orderId, setOrderId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!orderId.trim()) {
      toast.error('Please enter an Order ID');
      return;
    }

    setIsLoading(true);
    setNotFound(false);
    setOrderData(null);

    try {
      const response = await axios.get(`${API}/orders/${orderId.trim()}`);
      setOrderData(response.data);
    } catch (error) {
      if (error.response?.status === 404) {
        setNotFound(true);
        toast.error('Order not found');
      } else {
        toast.error('Failed to fetch order details');
      }
      console.error('Error fetching order:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'text-yellow-600 bg-yellow-50';
      case 'processing':
        return 'text-blue-600 bg-blue-50';
      case 'shipped':
        return 'text-purple-600 bg-purple-50';
      case 'delivered':
        return 'text-green-600 bg-green-50';
      case 'cancelled':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-slate-600 bg-slate-50';
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return <Clock size={24} />;
      case 'processing':
        return <Package size={24} />;
      case 'shipped':
        return <Package size={24} />;
      case 'delivered':
        return <CheckCircle size={24} />;
      case 'cancelled':
        return <XCircle size={24} />;
      default:
        return <Package size={24} />;
    }
  };

  return (
    <div className="min-h-screen bg-background py-20" data-testid="track-order-page">
      <div className="max-w-4xl mx-auto px-6 sm:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl sm:text-5xl tracking-tight font-black text-primary mb-4" data-testid="track-order-title">
            Track Your Order
          </h1>
          <p className="text-base leading-relaxed text-slate-700 mb-12">
            Enter your Order ID to check the current status of your order.
          </p>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="mb-12">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Enter Order ID (e.g., ORD-A1B2C3D4)"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  data-testid="input-order-id"
                  className="w-full px-4 py-3 border border-slate-300 rounded-sm focus:border-primary focus:ring-2 focus:ring-accent focus:outline-none font-mono"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                data-testid="search-order-btn"
                className="px-8 py-3 bg-primary text-white font-semibold rounded-sm hover:bg-slate-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 sm:w-auto w-full"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search size={20} />
                    Track Order
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Order Not Found */}
          {notFound && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-red-50 border border-red-200 rounded-sm p-8 text-center"
              data-testid="order-not-found"
            >
              <XCircle size={48} className="text-red-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-red-900 mb-2">
                Order Not Found
              </h3>
              <p className="text-red-700">
                We couldn't find an order with ID: <span className="font-mono font-bold">{orderId}</span>
              </p>
              <p className="text-red-600 text-sm mt-2">
                Please check the Order ID and try again.
              </p>
            </motion.div>
          )}

          {/* Order Details */}
          {orderData && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white border border-slate-200 rounded-sm overflow-hidden"
              data-testid="order-details"
            >
              {/* Status Header */}
              <div className={`p-6 border-b border-slate-200 ${getStatusColor(orderData.status)}`}>
                <div className="flex items-center justify-center gap-4">
                  {getStatusIcon(orderData.status)}
                  <div>
                    <p className="text-sm font-medium opacity-75">Order Status</p>
                    <p className="text-2xl font-bold capitalize" data-testid="order-status">
                      {orderData.status}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-8">
                {/* Order ID */}
                <div className="mb-8">
                  <p className="text-sm text-slate-500 mb-1">Order ID</p>
                  <p className="text-xl font-mono font-bold text-primary" data-testid="order-id">
                    {orderData.order_id}
                  </p>
                </div>

                {/* Customer Information */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-primary mb-4 pb-2 border-b border-slate-200">
                    Customer Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-slate-500">Name</p>
                      <p className="text-base font-medium text-slate-900">{orderData.customer_name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Email</p>
                      <p className="text-base font-medium text-slate-900">{orderData.customer_email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Phone</p>
                      <p className="text-base font-medium text-slate-900">{orderData.customer_phone}</p>
                    </div>
                    {orderData.customer_company && (
                      <div>
                        <p className="text-sm text-slate-500">Company</p>
                        <p className="text-base font-medium text-slate-900">{orderData.customer_company}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Order Information */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-primary mb-4 pb-2 border-b border-slate-200">
                    Order Details
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-slate-500">Product</p>
                      <p className="text-base font-medium text-slate-900">{orderData.product_name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Quantity</p>
                      <p className="text-base font-medium text-slate-900">{orderData.quantity}</p>
                    </div>
                    {orderData.specifications && (
                      <div>
                        <p className="text-sm text-slate-500">Specifications</p>
                        <p className="text-base font-medium text-slate-900">{orderData.specifications}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Delivery Information */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-primary mb-4 pb-2 border-b border-slate-200">
                    Delivery Address
                  </h3>
                  <p className="text-base leading-relaxed text-slate-900">
                    {orderData.delivery_address}<br />
                    {orderData.delivery_city}, {orderData.delivery_state} - {orderData.delivery_pincode}
                  </p>
                </div>

                {/* Additional Notes */}
                {orderData.additional_notes && (
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-primary mb-4 pb-2 border-b border-slate-200">
                      Additional Notes
                    </h3>
                    <p className="text-base leading-relaxed text-slate-700">{orderData.additional_notes}</p>
                  </div>
                )}

                {/* Timestamps */}
                <div className="bg-muted p-4 rounded-sm">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-slate-500">Order Placed</p>
                      <p className="font-medium text-slate-900">
                        {new Date(orderData.created_at).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-500">Last Updated</p>
                      <p className="font-medium text-slate-900">
                        {new Date(orderData.updated_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Help Text */}
          {!orderData && !notFound && (
            <div className="bg-white border border-slate-200 rounded-sm p-8 text-center">
              <Package size={48} className="text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-primary mb-2">
                Track Your Order
              </h3>
              <p className="text-slate-600">
                Enter your Order ID above to view your order status and details.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default TrackOrder;
