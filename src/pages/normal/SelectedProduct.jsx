import React, { useEffect, useState } from 'react'
import { API_BASE_URL } from '../../config/api';
import axios from 'axios';
import ProductCard from '../../conponents/product/ProductCard';
import { useLocation } from 'react-router-dom';

function SelectedProduct() {
    const [products, setProducts] = useState([]);
    const [loader,setLoading]  = useState(true);
    const { state } = useLocation();
    const { category, subcategory } = state || {};
  
    // Simulate fetching data (could be replaced with an API call)
  
    useEffect(()=>{
      loadProducts();
    },[])
  
    const loadProducts = async () => {
      const result = await axios.get(`${API_BASE_URL}/home/getProductByCategoryOrSubCategory/${category}/${subcategory}`);
      setProducts(result.data); 
      setLoading(false);
    };
  
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        
        </div>
      </div>
    );
  };

export default SelectedProduct