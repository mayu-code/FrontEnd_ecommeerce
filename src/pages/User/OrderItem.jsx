import React from 'react';

const OrderItem = ({ order }) => {
  return (
    <div className="border-b py-4">
      <ul className="mt-2">
        <li>{order.id}</li>
        <li>{order.name}</li>
        <li>{order.brand}</li>
      </ul>
      <p className="mt-2 text-right font-bold">Total: ${order.price}</p>
    </div>
  );
};

export default OrderItem;
