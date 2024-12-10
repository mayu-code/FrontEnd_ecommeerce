import axios from 'axios';
import React from 'react';
import { API_BASE_URL } from '../../config/api';
import { useNavigate } from 'react-router-dom';

const OrderItem = ({ order }) => {

const jwt = localStorage.getItem("jwt")
const navigate = useNavigate();

  const removeOrderHandler = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/user/order/remove/${order.id}`, // Use item.id
        {},
        {
          headers: {
            "Authorization": `Bearer ${jwt}`, // JWT token for authentication
          },
        }
      );
      navigate('/user/profile');
      window.location.reload(); // Redirect to profile after removing the item
    } catch (error) {
      alert("Failed to remove the item from the cart. Please try again.");
    }
  };
  return (
    <div className="border-b py-4">
      <div className='flex justify-between'>

        <div className="mt-2 flex flex-row gap-1">
          <div>

            <p>{order.id}.</p>
          </div>
          <div>

            <h4 className='capitalize font-semibold'>{order.orderId}</h4>
            <p className='capitalize'>{order.brand}</p>
            <p className='capitalize'>{order.features}</p>
          </div>
        </div>
        <div>
          <button 
          onClick={removeOrderHandler}
          className='bg-red-600 text-white px-3 py-1 rounded-sm text-lg hover:bg-red-700'>
            Cancel
          </button>
        </div>
      </div>
      <p className="mt-2 text-right font-bold">Price: ₹{order.price}</p>
    </div>
  );
};

export default OrderItem;
