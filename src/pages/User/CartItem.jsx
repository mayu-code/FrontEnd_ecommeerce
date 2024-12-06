import axios from 'axios';
import React from 'react';
import { API_BASE_URL } from '../../config/api';
import { useNavigate } from 'react-router-dom';

const CartItem = ({ item, index }) => {

  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");

  // Proceed to buy (create an order)
  const addOrderHandler = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/user/ordered/${item.id}`, // Use item.id
        {}, // Empty object if no body data is required
        {
          headers: {
            "Authorization": `Bearer ${jwt}`, // JWT token for authentication
          },
        }
      );
      removeCartHandler();
      navigate('/user/profile');
      window.location.reload(); // Redirect to profile after placing order
    } catch (error) {
      console.error("Error placing the order:", error.response?.data || error.message);
      alert("Failed to place the order. Please try again.");
    }
  };

  // Remove from cart
  const removeCartHandler = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/user/removeCart/${item.id}`, // Use item.id
        {}, // Empty object if no body data is required
        {
          headers: {
            "Authorization": `Bearer ${jwt}`, // JWT token for authentication
          },
        }
      );
      navigate('/user/profile');
      window.location.reload(); // Redirect to profile after removing the item
    } catch (error) {
      console.error("Error removing item from cart:", error.response?.data || error.message);
      alert("Failed to remove the item from the cart. Please try again.");
    }
  };

  return (
    <div className="border-b py-4 flex flex-row justify-between">
      <div className='flex flex-row'>
        <div>
          <h4>{index + 1}.</h4>
        </div>
        <div>
          <h4 className="font-semibold capitalize">{item.name}</h4>
          <p className='capitalize'><span className='font-semibold'>Brand</span>: {item.brand}</p> {/* Display brand instead of quantity if it's a brand */}
          <p className='capitalize'>{item.features}</p> {/* Display brand instead of quantity if it's a brand */}
          <p className='capitalize'><span className='font-semibold'>Price</span>: Rs.{item.price}</p>
        </div>
      </div>

      <div className='flex flex-col space-y-2'>
        <button
          onClick={addOrderHandler}
          className="ml-4 bg-blue-500 text-white p-2 rounded"
        >
          Proceed To Buy
        </button>
        <button
          onClick={removeCartHandler}
          className="ml-4 bg-blue-500 text-white p-2 rounded"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
