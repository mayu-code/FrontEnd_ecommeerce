// src/components/ProductCard.jsx
import axios from "axios";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { API_BASE_URL } from "../../config/api";

const ProductCard = ({ product }) => {

  return (

    <Link
        to={`/productDetails/${product.id}`}
      >
    <div className="border rounded-lg shadow-md p-4 bg-white hover:shadow-lg transition">
        <img
          src={product.imgUrl}
          alt={product.name}
          className="w-full h-40 object-cover rounded-t-lg"
        />
  
      <div className="mt-4">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-gray-600 text-sm">{product.features}</p>
        <p className="mt-2 text-xl font-bold text-blue-500">₹{product.price}</p>
  
      </div>
    </div>
    </Link>
  );
};

export default ProductCard;
