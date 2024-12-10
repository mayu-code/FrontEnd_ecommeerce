import axios from 'axios';
import React from 'react';
import { API_BASE_URL } from '../../config/api';
import { useNavigate } from 'react-router-dom';

const CartItem1 = ({ item, id }) => {

  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");
  // Remove from cart
  const removeCartHandler = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/user/removeCart/${id}/${item.itemId}`, // Use item.id
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
    <div className="border-b py-4 flex flex-row justify-between">
      <div className='flex flex-row gap-1'>
        <div>
        </div>
        <div>
          <h4 className="font-semibold capitalize">{item.product.name}X{item.quantity}</h4>
          <p className='capitalize font-semibold'>Price: <span className='text-green-700'>₹ {item.product.price}</span> </p>
        </div>
      </div>
    </div>
  );
};

export default CartItem1;
