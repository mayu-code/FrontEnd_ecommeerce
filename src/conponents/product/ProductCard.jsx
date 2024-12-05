// src/components/ProductCard.jsx
import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="border rounded-lg shadow-md p-4 bg-white hover:shadow-lg transition">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-40 object-cover rounded-t-lg"
      />
      <div className="mt-4">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-gray-600 text-sm">{product.description}</p>
        <p className="mt-2 text-xl font-bold text-blue-500">${product.price}</p>
        <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
