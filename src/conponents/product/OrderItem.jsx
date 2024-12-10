import axios from 'axios';
import React from 'react';
import { API_BASE_URL } from '../../config/api';
import { Link, useNavigate } from 'react-router-dom';

const OrderItem = ({ item, id }) => {
  const jwt = localStorage.getItem("jwt");


  return (
    <div className="border-b py-4 flex flex-row justify-between">
      <div className='flex flex-row gap-4'>
        <div>
          <img src={item.product.imgUrl} alt="image" className='w-52' />
        </div>
        <div>
          <p className='capitalize'><span className='font-semibold'>Brand</span>: {item.product.brand}</p> {/* Display brand instead of quantity if it's a brand */}
          <p className='capitalize font-semibold'>Price: <span className='text-green-700'>₹ {item.product.price}</span> </p>
          <p className='capitalize font-semibold'>quantity: <span className='text-green-700'>{item.quantity}</span> </p>
          <p className='capitalize font-semibold'>Total Price: <span className='text-green-700'>₹ {item.price}</span> </p>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
