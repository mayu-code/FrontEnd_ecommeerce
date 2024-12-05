import React, { useState } from 'react';

const AdminOrderedProductsList = () => {
  // Hardcoded list of ordered products (admin manages)
  const [orders, setOrders] = useState([
    { id: 1, productName: 'Product 1', quantity: 2, price: 20, status: 'pending' },
    { id: 2, productName: 'Product 2', quantity: 1, price: 15, status: 'shipped' },
    { id: 3, productName: 'Product 3', quantity: 3, price: 30, status: 'delivered' },
    { id: 4, productName: 'Product 4', quantity: 1, price: 40, status: 'pending' },
  ]);

  // Function to handle updating order status
  const handleUpdateStatus = (id, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  // Function to handle deleting an order
  const handleDeleteOrder = (id) => {
    const updatedOrders = orders.filter((order) => order.id !== id);
    setOrders(updatedOrders);
    alert('Order deleted successfully!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h2 className="text-3xl font-semibold mb-6">Admin - Ordered Products List</h2>

      {/* Ordered Products Table */}
      {orders.length > 0 ? (
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="px-4 py-2 border-b">Product Name</th>
              <th className="px-4 py-2 border-b">Quantity</th>
              <th className="px-4 py-2 border-b">Price</th>
              <th className="px-4 py-2 border-b">Total</th>
              <th className="px-4 py-2 border-b">Status</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{order.productName}</td>
                <td className="px-4 py-2">{order.quantity}</td>
                <td className="px-4 py-2">${order.price}</td>
                <td className="px-4 py-2">${(order.quantity * order.price).toFixed(2)}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-full ${
                      order.status === 'pending'
                        ? 'bg-yellow-200 text-yellow-800'
                        : order.status === 'shipped'
                        ? 'bg-blue-200 text-blue-800'
                        : 'bg-green-200 text-green-800'
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-2">
                  {/* Update Status Button */}
                  <button
                    onClick={() => handleUpdateStatus(order.id, 'shipped')}
                    className="mr-2 px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-700"
                  >
                    Ship
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(order.id, 'delivered')}
                    className="mr-2 px-4 py-2 rounded-md bg-green-500 text-white hover:bg-green-700"
                  >
                    Deliver
                  </button>
                  {/* Delete Button */}
                  <button
                    onClick={() => handleDeleteOrder(order.id)}
                    className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No orders found. Please add some orders.</p>
      )}
    </div>
  );
};

export default AdminOrderedProductsList;
