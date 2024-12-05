import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Optional, for navigation if needed
import ProductCard from '../../conponents/product/ProductCard';

const AdminProductList = () => {
  // Hardcoded list of products (admin added)
  const [products, setProducts] = useState([
    { id: 1, name: 'Product 1', price: 20, description: 'Description for Product 1' },
    { id: 2, name: 'Product 2', price: 30, description: 'Description for Product 2' },
    { id: 3, name: 'Product 3', price: 40, description: 'Description for Product 3' },
    { id: 4, name: 'Product 4', price: 50, description: 'Description for Product 4' },
  ]);

  // Function to handle deleting a product
  const handleDeleteProduct = (id) => {
    const updatedProducts = products.filter(product => product.id !== id);
    setProducts(updatedProducts);
    alert('Product deleted successfully!');
  };

  // Function to handle adding a new product (hardcoded for now)
  const handleAddProduct = () => {
    const newProduct = {
      id: products.length + 1,
      name: 'New Product',
      price: 60,
      description: 'Description for New Product',
    };
    setProducts([...products, newProduct]);
    alert('New product added!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h2 className="text-3xl font-semibold mb-6">Admin - Product List</h2>

      {/* Add Product Button */}
      <div className="mb-6">
        <button
          onClick={handleAddProduct}
          className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-700"
        >
          Add New Product
        </button>
      </div>

      {/* Product List */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Render Product Cards */}
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onDelete={handleDeleteProduct}
            />
          ))}
        </div>
      ) : (
        <p>No products found. Please add a product.</p>
      )}
    </div>
  );
};

export default AdminProductList;
