import React from 'react';

const OrderItem = ({ order }) => {
  return (
    <div className="border-b py-4">
      <div className='flex justify-between'>

        <div className="mt-2 flex flex-row gap-1">
          <div>

            <p>{order.id}.</p>
          </div>
          <div>

            <h4 className='capitalize font-semibold'>{order.name}</h4>
            <p className='capitalize'>{order.brand}</p>
            <p className='capitalize'>{order.features}</p>
          </div>
        </div>
        <div>
          <button className='bg-red-600 text-white px-3 py-1 rounded-sm text-lg hover:bg-red-700'>
            Cancel
          </button>
        </div>
      </div>
      <p className="mt-2 text-right font-bold">Price: ${order.price}</p>
    </div>
  );
};

export default OrderItem;
