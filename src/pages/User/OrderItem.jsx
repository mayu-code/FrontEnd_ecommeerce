import React from 'react';

const OrderItem = ({ order }) => {
  return (
    <div className="border-b py-4">
      <h3 className="font-semibold">Order #{order.id}</h3>
      <p>Date: {new Date(order.date).toLocaleDateString()}</p>
      <ul className="mt-2">
        {order.items.map((item) => (
          <li key={item.id} className="flex justify-between">
            <span>{item.name}</span>
            <span>{item.quantity} x ${item.price}</span>
          </li>
        ))}
      </ul>
      <p className="mt-2 text-right font-bold">Total: ${order.total}</p>
    </div>
  );
};

export default OrderItem;
