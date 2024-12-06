// src/components/ProductCard.jsx
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../config/api";

const ProductCard = ({ product }) => {

  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt")

  const addCartHandler = async () => {
    try {
      const { data } = await axios.post(`${API_BASE_URL}/user/addCart/${product.id}`, {
        headers: {
          "Authorization": `Bearer ${jwt}`, // JWT token for authentication
        },
      });
      navigate('/user/profile');
    } catch (error) {
      console.error("Error fetching cart products:", error);
    }
  };


  return (
    <div className="border rounded-lg shadow-md p-4 bg-white hover:shadow-lg transition">
      <img
        src={product.imgUrl}
        alt={product.name}
        className="w-full h-40 object-cover rounded-t-lg"
      />
      <div className="mt-4">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-gray-600 text-sm">{product.features}</p>
        <p className="mt-2 text-xl font-bold text-blue-500">${product.price}</p>
        <button
        onClick={addCartHandler}
        className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
          
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
