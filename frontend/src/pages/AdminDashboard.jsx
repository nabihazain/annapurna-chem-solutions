import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Package, Loader2, RefreshCw, X } from 'lucide-react';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');

  const statusOptions = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API}/orders`);
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to fetch orders');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusUpdate = async (orderId, newStatus) => {
    setUpdatingStatus(true);
    try {
      const response = await axios.patch(`${API}/orders/${orderId}`, {
        status: newStatus
      });
      
      setOrders(orders.map(order =>
        order.order_id === orderId ? response.data : order
      ));
      
      if (selectedOrder?.order_id === orderId) {
        setSelectedOrder(response.data);
      }
      
      toast.success(`Order status updated to ${newStatus}`);
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update order status');
    } finally {
      setUpdatingStatus(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'text-yellow-700 bg-yellow-50 border-yellow-200';
      case 'processing':
        return 'text-blue-700 bg-blue-50 border-blue-200';
      case 'shipped':
        return 'text-purple-700 bg-purple-50 border-purple-200';
      case 'delivered':
        return 'text-green-700 bg-green-50 border-green-200';
      case 'cancelled':
        return 'text-red-700 bg-red-50 border-red-200';
      default:
        return 'text-slate-700 bg-slate-50 border-slate-200';
    }
  };

  const filteredOrders = filterStatus === 'all' 
    ? orders 
    : orders.filter(order => order.status === filterStatus);

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => o.status === 'processing').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
  };

  return (
    <div className="min-h-screen bg-background py-12" data-testid="admin-dashboard">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-2">Admin Panel</p>
              <h1 className="text-4xl tracking-tight font-black text-primary" data-testid="admin-title">
                Order Management
              </h1>
            </div>
            <button
              onClick={fetchOrders}
              data-testid="refresh-orders-btn"
              className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-sm hover:border-primary transition-colors duration-200"
            >
              <RefreshCw size={16} />
              Refresh
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white border border-slate-200 rounded-sm p-6" data-testid="stat-total">
              <p className="text-sm text-slate-500 mb-1">Total Orders</p>
              <p className="text-3xl font-bold text-primary">{stats.total}</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-sm p-6" data-testid="stat-pending">
              <p className="text-sm text-slate-500 mb-1">Pending</p>
              <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-sm p-6" data-testid="stat-processing">
              <p className="text-sm text-slate-500 mb-1">Processing</p>
              <p className="text-3xl font-bold text-blue-600">{stats.processing}</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-sm p-6" data-testid="stat-delivered">
              <p className="text-sm text-slate-500 mb-1">Delivered</p>
              <p className="text-3xl font-bold text-green-600">{stats.delivered}</p>
            </div>
          </div>

          {/* Filter */}
          <div className="mb-6 flex flex-wrap gap-2">
            <button
              onClick={() => setFilterStatus('all')}
              data-testid="filter-all"
              className={`px-4 py-2 text-sm font-medium rounded-sm transition-colors ${
                filterStatus === 'all'
                  ? 'bg-primary text-white'
                  : 'bg-white border border-slate-300 text-slate-700 hover:border-primary'
              }`}
            >
              All ({orders.length})
            </button>
            {statusOptions.map(status => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                data-testid={`filter-${status}`}
                className={`px-4 py-2 text-sm font-medium rounded-sm transition-colors capitalize ${
                  filterStatus === status
                    ? 'bg-primary text-white'
                    : 'bg-white border border-slate-300 text-slate-700 hover:border-primary'
                }`}
              >
                {status} ({orders.filter(o => o.status === status).length})
              </button>
            ))}
          </div>

          {/* Orders Table */}
          <div className="bg-white border border-slate-200 rounded-sm overflow-hidden">
            {isLoading ? (
              <div className="p-12 text-center">
                <Loader2 size={32} className="animate-spin text-primary mx-auto mb-4" />
                <p className="text-slate-600">Loading orders...</p>
              </div>
            ) : filteredOrders.length === 0 ? (
              <div className="p-12 text-center">
                <Package size={48} className="text-slate-400 mx-auto mb-4" />
                <p className="text-slate-600">No orders found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full" data-testid="orders-table">
                  <thead className="bg-muted border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-600">Order ID</th>
                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-600">Customer</th>
                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-600">Product</th>
                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-600">Quantity</th>
                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-600">Date</th>
                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-600">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-600">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {filteredOrders.map((order) => (
                      <tr key={order.order_id} className="hover:bg-muted/50 transition-colors" data-testid={`order-row-${order.order_id}`}>
                        <td className="px-6 py-4 text-sm font-mono font-medium text-primary">{order.order_id}</td>
                        <td className="px-6 py-4">
                          <p className="text-sm font-medium text-slate-900">{order.customer_name}</p>
                          <p className="text-xs text-slate-500">{order.customer_email}</p>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-700">{order.product_name}</td>
                        <td className="px-6 py-4 text-sm text-slate-700">{order.quantity}</td>
                        <td className="px-6 py-4 text-sm text-slate-500">
                          {new Date(order.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-block px-3 py-1 text-xs font-medium rounded-sm border capitalize ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => setSelectedOrder(order)}
                            data-testid={`view-order-${order.order_id}`}
                            className="text-sm text-accent font-medium hover:underline"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" data-testid="order-modal">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-sm max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex justify-between items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Order Details</p>
                <h2 className="text-xl font-bold font-mono text-primary">{selectedOrder.order_id}</h2>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                data-testid="close-modal-btn"
                className="p-2 hover:bg-muted rounded-sm transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Status Update */}
              <div>
                <p className="text-sm font-medium text-slate-700 mb-3">Update Status</p>
                <div className="flex flex-wrap gap-2">
                  {statusOptions.map(status => (
                    <button
                      key={status}
                      onClick={() => handleStatusUpdate(selectedOrder.order_id, status)}
                      disabled={updatingStatus || selectedOrder.status === status}
                      data-testid={`update-status-${status}`}
                      className={`px-4 py-2 text-sm font-medium rounded-sm border transition-colors capitalize ${
                        selectedOrder.status === status
                          ? `${getStatusColor(status)} cursor-default`
                          : 'bg-white border-slate-300 hover:border-primary'
                      } disabled:opacity-75`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              {/* Customer Info */}
              <div>
                <h3 className="text-lg font-semibold text-primary mb-3 pb-2 border-b border-slate-200">Customer Information</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-slate-500">Name</p>
                    <p className="font-medium text-slate-900">{selectedOrder.customer_name}</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Email</p>
                    <p className="font-medium text-slate-900 break-all">{selectedOrder.customer_email}</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Phone</p>
                    <p className="font-medium text-slate-900">{selectedOrder.customer_phone}</p>
                  </div>
                  {selectedOrder.customer_company && (
                    <div>
                      <p className="text-slate-500">Company</p>
                      <p className="font-medium text-slate-900">{selectedOrder.customer_company}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Order Info */}
              <div>
                <h3 className="text-lg font-semibold text-primary mb-3 pb-2 border-b border-slate-200">Product Details</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-slate-500">Product</p>
                    <p className="font-medium text-slate-900">{selectedOrder.product_name}</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Quantity</p>
                    <p className="font-medium text-slate-900">{selectedOrder.quantity}</p>
                  </div>
                  {selectedOrder.specifications && (
                    <div>
                      <p className="text-slate-500">Specifications</p>
                      <p className="font-medium text-slate-900">{selectedOrder.specifications}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Delivery Info */}
              <div>
                <h3 className="text-lg font-semibold text-primary mb-3 pb-2 border-b border-slate-200">Delivery Address</h3>
                <p className="text-sm text-slate-900 leading-relaxed">
                  {selectedOrder.delivery_address}<br/>
                  {selectedOrder.delivery_city}, {selectedOrder.delivery_state} - {selectedOrder.delivery_pincode}
                </p>
              </div>

              {selectedOrder.additional_notes && (
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-3 pb-2 border-b border-slate-200">Additional Notes</h3>
                  <p className="text-sm text-slate-700 leading-relaxed">{selectedOrder.additional_notes}</p>
                </div>
              )}

              <div className="bg-muted p-4 rounded-sm text-xs">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-slate-500">Created</p>
                    <p className="font-medium text-slate-900">{new Date(selectedOrder.created_at).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Updated</p>
                    <p className="font-medium text-slate-900">{new Date(selectedOrder.updated_at).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
