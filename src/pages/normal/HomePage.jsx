// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import ProductCard from "../../conponents/product/ProductCard";

const HomePage = () => {
  // Sample product data
  const [products, setProducts] = useState([]);

  // Simulate fetching data (could be replaced with an API call)
  useEffect(() => {
    const fetchProducts = async () => {
      const dummyProducts = [
        {
          id: 1,
          name: "Wireless Headphones",
          description: "High-quality sound with noise cancellation.",
          price: 99.99,
          image: "https://via.placeholder.com/150",
        },
        {
          id: 2,
          name: "Smart Watch",
          description: "Track your fitness and daily activities.",
          price: 199.99,
          image: "https://via.placeholder.com/150",
        },
        {
          id: 3,
          name: "Gaming Mouse",
          description: "Ergonomic design with RGB lighting.",
          price: 49.99,
          image: "https://via.placeholder.com/150",
        },
        {
            id: 1,
            name: "Wireless Headphones",
            description: "High-quality sound with noise cancellation.",
            price: 99.99,
            image: "https://via.placeholder.com/150",
          },
          {
            id: 2,
            name: "Smart Watch",
            description: "Track your fitness and daily activities.",
            price: 199.99,
            image: "https://via.placeholder.com/150",
          },
          {
            id: 3,
            name: "Gaming Mouse",
            description: "Ergonomic design with RGB lighting.",
            price: 49.99,
            image: "https://via.placeholder.com/150",
          },
      ];
      setProducts(dummyProducts);
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Welcome to Our Store</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
