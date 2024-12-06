import React, { useState } from 'react';

const UserOrders = () => {
  // Hardcoded Dummy Orders Data
  const [orders, setOrders] = useState([
    {
      orderId: 1,
      date: '2024-11-10',
      status: 'Shipped',
      total: 120,
      products: [
        { name: 'Product 1', quantity: 2, price: 20 },
        { name: 'Product 3', quantity: 1, price: 30 },
        { name: 'Product 5', quantity: 1, price: 25 }
      ]
    },
    
    {
      orderId: 3,
      date: '2024-11-18',
      status: 'Processing',
      total: 85,
      products: [
        { name: 'Product 4', quantity: 1, price: 40 },
        { name: 'Product 3', quantity: 1, price: 30 }
      ]
    }
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h2 className="text-3xl font-semibold mb-6">Your Orders</h2>

      {orders.length > 0 ? (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.orderId} className="border p-4 rounded-lg shadow-md">
              <div className="flex justify-between items-center">
                <span className="text-xl font-semibold">Order ID: {order.orderId}</span>
                <span className={`text-sm font-semibold ${order.status === 'Delivered' ? 'text-green-500' : 'text-yellow-500'}`}>
                  {order.status}
                </span>
              </div>
              <p className="text-sm text-gray-500">Ordered on: {order.date}</p>
              <p className="mt-2 font-semibold">Total: ${order.total.toFixed(2)}</p>

              <div className="mt-4 space-y-2">
                <h4 className="text-lg font-semibold">Products:</h4>
                <ul className="list-disc ml-6">
                  {order.products.map((product, index) => (
                    <li key={index}>
                      {product.name} - {product.quantity} x ${product.price} = ${product.quantity * product.price}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4">
                <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-700">
                  View Order Details
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>You have no orders yet.</p>
      )}
    </div>
  );
};

export default UserOrders;
