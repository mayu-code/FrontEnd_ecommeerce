// src/components/ProductCard.jsx
import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../config/api";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");

  const addCartHandler = async () => {

    if (jwt != null) {

      try {
        const response = await axios.post(
          `${API_BASE_URL}/user/addCart/${product.id}`,
          {},  // You can pass an empty object if no body data is required
          {
            headers: {
              "Authorization": `Bearer ${jwt}`, // JWT token for authentication
            },
          }
        );
        navigate('/user/profile');
      } catch (error) {
        alert("You need to login first !");
        navigate("/login");
      }
    }
    else {
      alert("You need to login first !");
      navigate("/login");
    }
  };

  const addOrderHandler = async () => {
    if (jwt == null) {
      navigate("/login");
    }
    try {
      const response = await axios.post(
        `${API_BASE_URL}/user/ordered/${product.id}`,
        {},  // You can pass an empty object if no body data is required
        {
          headers: {
            "Authorization": `Bearer ${jwt}`, // JWT token for authentication
          },
        }
      );
      navigate('/user/profile');
    } catch (error) {

      alert("You need to login First !");
      navigate("/login");
    }
  };

  return (
    <div className="border rounded-lg shadow-md p-4 bg-white hover:shadow-lg transition">
      <Link
        to={"/productDetails"}
      >
        <img
          src={product.imgUrl}
          alt={product.name}
          className="w-full h-40 object-cover rounded-t-lg"
        />
      </Link>
      <div className="mt-4">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-gray-600 text-sm">{product.features}</p>
        <p className="mt-2 text-xl font-bold text-blue-500">${product.price}</p>
        <div className="flex flex-row space-x-2">
          <button
            onClick={addCartHandler}
            className="mt-4 w-[50%] bg-blue-500 text-white py-1 rounded-lg hover:bg-blue-600"
          >
            Add to Cart
          </button>
          <button
            onClick={addOrderHandler}
            className="mt-4 w-[50%] bg-green-500 text-white py-1 rounded-lg hover:bg-green-600"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
