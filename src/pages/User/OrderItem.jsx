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

        <div className="mt-2 flex flex-col gap-1">

          <p>{order.orderId}</p>

          <p>{order.id}.</p>
        </div>
        <div>

          <h4 className='capitalize font-semibold'>{order.name}</h4>
          <p className='capitalize'>{order.brand}</p>
          <p className='capitalize'>{order.features}</p>
        </div>
      </div>

    </div>

  );
};

export default OrderItem;
