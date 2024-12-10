import axios from 'axios';
import React from 'react';
import { API_BASE_URL } from '../../config/api';
import { useNavigate } from 'react-router-dom';

const CartItem = ({ item, id }) => {

  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");

  const addOrderHandler = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/user/ordered/${id}`,{},
        {
          headers: {
            "Authorization": `Bearer ${jwt}`,
          },
        }
      );
      removeCartHandler();
      navigate('/user/profile');
      window.location.reload(); 
    } catch (error) {
      console.error("Error placing the order:", error.response?.data || error.message);
      alert("Failed to place the order. Please try again.");
    }
  };


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
          <p className='capitalize'><span className='font-semibold'>Brand</span>: {item.product.brand}</p> {/* Display brand instead of quantity if it's a brand */}
          <p className='capitalize'>{item.product.features}</p> {/* Display brand instead of quantity if it's a brand */}
          <p className='capitalize font-semibold'>Price: <span className='text-green-700'>₹ {item.product.price}</span> </p>
          <p className='capitalize font-semibold'>quantity: <span className='text-green-700'>{item.quantity}</span> </p>
          <p className='capitalize font-semibold'>Total Price: <span className='text-green-700'>₹ {item.price}</span> </p>
        </div>
      </div>

      <div className='flex flex-row justify-center items-center'>
        <button
          onClick={removeCartHandler}
          className="ml-4 h-1/2 bg-red-700 text-white px-2 rounded hover:bg-red-800"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
