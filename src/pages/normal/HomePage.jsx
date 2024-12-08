// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import ProductCard from "../../conponents/product/ProductCard";
import { API_BASE_URL } from "../../config/api";
import axios from "axios";

const HomePage = () => {
  // Sample product data
  const [products, setProducts] = useState([]);
  const [loader, setLoading] = useState(true);

  // Simulate fetching data (could be replaced with an API call)

  useEffect(() => {
    loadProducts();
  }, [])

  const loadProducts = async () => {
    const result = await axios.get(`${API_BASE_URL}/home/allProduct`);
    setProducts(result.data.data);
    setLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}

      </div>
    </div>
  );
};

export default HomePage;
