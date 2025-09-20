import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialState = {
  itemId: '',
  name: '',
  category: '',
  quantity: '',
  unit: '',
  location: '',
  status: 'available',
};


const AddInventory = () => {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [nextItemId, setNextItemId] = useState('');

  // Fetch next item ID
  const fetchNextItemId = async () => {
    try {
      // You should have an endpoint like /api/inventory/next-id
      const res = await axios.get('/api/inventory/next-id');
      setNextItemId(res.data.nextItemId);
      setForm(f => ({ ...f, itemId: res.data.nextItemId }));
    } catch (err) {
      setNextItemId('');
      setForm(f => ({ ...f, itemId: '' }));
    }
  };

  useEffect(() => {
    fetchNextItemId();
    // eslint-disable-next-line
  }, []);

  // Keep form.itemId in sync with nextItemId if it changes and form.itemId is empty
  useEffect(() => {
    if (nextItemId && !form.itemId) {
      setForm(f => ({ ...f, itemId: nextItemId }));
    }
  }, [nextItemId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await axios.post('/api/inventory', {
        ...form,
        quantity: Number(form.quantity),
      });
      setSuccess('Item added successfully!');
      setForm(initialState);
      // Fetch next item id for the next entry
      fetchNextItemId();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add item');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 overflow-y-auto h-full w-full z-40">
      {/* Beautiful gradient background with blur */}
      <div className="fixed inset-0 bg-gradient-to-br from-sky-900/20 via-white-900/20 to-white-900/20 backdrop-blur-sm"></div>
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-400/30 to-purple-600/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-pink-400/30 to-indigo-600/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Modal container */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative w-full max-w-xl">
          {/* Modal card with glass effect */}
          <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
            {/* Gradient header */}
            <div className="bg-gradient-to-r from-sky-600 via-black-600 to-green-600 p-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">Add Inventory Item</h3>
                  <p className="text-indigo-100 text-sm">Add a new item to the inventory</p>
                </div>
              </div>
            </div>

            {/* Form content */}
            <div className="p-6 space-y-6">
              {error && (
                <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              {success && (
                <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-lg">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-green-700">{success}</p>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Item ID *</label>
                    <input
                      type="text"
                      name="itemId"
                      value={form.itemId || nextItemId || ''}
                      readOnly
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 cursor-not-allowed"
                      placeholder="Auto-generated Item ID"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200" placeholder="Enter Name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                    <input type="text" name="category" value={form.category} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200" placeholder="Enter Category" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Quantity *</label>
                    <input type="number" name="quantity" value={form.quantity} onChange={handleChange} min="0" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200" placeholder="Enter Quantity" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Unit *</label>
                    <select name="unit" value={form.unit} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200">
                      <option value="">Select Unit</option>
                      <option value="pcs">pcs</option>
                      <option value="box">box</option>
                      <option value="liters">liters</option>
                      <option value="kg">kg</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
                    <select name="location" value={form.location} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200">
                      <option value="">Select Location</option>
                      <option value="Library">Library</option>
                      <option value="Science Lab">Science Lab</option>
                      <option value="Computer Lab">Computer Lab</option>
                      <option value="Sports Store Room">Sports Store Room</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status *</label>
                    <select name="status" value={form.status} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200">
                      <option value="available">Available</option>
                      <option value="unavailable">Unavailable</option>
                      <option value="maintenance">Maintenance</option>
                      <option value="out-of-stock">Out of Stock</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-3 bg-gradient-to-r from-sky-600 to-green-600 hover:from-sky-700 hover:to-green-700 text-white rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                  >
                    {loading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Adding...</span>
                      </div>
                    ) : (
                      'Add Item'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddInventory;
