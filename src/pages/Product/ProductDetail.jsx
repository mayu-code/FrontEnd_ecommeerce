import React from "react";

const ProductDetail = () => {
  // Dummy product data
  const product = {
    id: "1",
    name: "Premium Wireless Headphones",
    description:
      "Experience exceptional sound quality with these wireless headphones. Perfect for music lovers.",
    price: "99.99",
    imageUrl: "https://via.placeholder.com/300", // Replace with a real image URL
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div>
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full rounded-lg shadow-md"
          />
        </div>
        {/* Product Details */}
        <div>
          <h4 className="text-2xl text-gray-800">Category</h4>
          <h3 className="text-xl text-gray-800">SubCategory</h3>
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
          <p className="mt-4 text-gray-600">{product.description}</p>
          <div className="mt-4">
            <span className="text-xl font-semibold text-green-600">
              ${product.price}
            </span>
          </div>
          {/* Add to Cart & Buy Now */}
          <div className="mt-6 flex space-x-4">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-md shadow hover:bg-blue-700">
              Add to Cart
            </button>
            <button className="bg-green-600 text-white px-6 py-2 rounded-md shadow hover:bg-green-700">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
