import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_BASE_URL } from "../../config/api";

const ProductDetail = () => {

  const {id} = useParams();
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");
  const [product,setProduct] = useState([]);
  const [quantity,setQuantity] = useState(1);

  useEffect(() => {
    loadProducts();
  }, [])

  const loadProducts = async () => {
    const result = await axios.get(`${API_BASE_URL}/home/Product/${id}`);
    setProduct(result.data.data);
  };

  const addCartHandler = async () => {
    if (jwt != null) {
      try {
        const response = await axios.post(
          `${API_BASE_URL}/user/addCart/${product.id}/${quantity}`,{}, 
          {
            headers: {
              "Authorization": `Bearer ${jwt}`, 
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
        `${API_BASE_URL}/user/ordered/${product.id}`,{}, 
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
    <div className="max-w-7xl mx-auto p-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div>
          <img
            src={product.imgUrl}
            alt={product.name}
            className="w-full rounded-lg shadow-md"
          />
        </div>
        {/* Product Details */}
        <div>
          <h4 className="text-2xl text-gray-800">{product.category}</h4>
          <h3 className="text-xl text-gray-800">{product.subcategory}</h3>
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
          <p className="mt-4 text-gray-600">{product.features}</p>
          <div className="mt-4">
            <span className="text-xl font-semibold text-green-600">
              ₹{product.price}
            </span>
          </div>
          <div className="mt-4">
            <label htmlFor="quantity" className="text-gray-700 font-medium">
              Quantity:
            </label>
            <select
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="ml-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {[...Array(10).keys()].map((q) => (
                <option key={q + 1} value={q + 1}>
                  {q + 1}
                </option>
              ))}
            </select>
          </div>
          {/* Add to Cart & Buy Now */}
          <div className="mt-6 flex space-x-4">
            <button 
            onClick={addCartHandler}
            className="bg-blue-600 text-white px-6 py-2 rounded-md shadow hover:bg-blue-700">
              Add to Cart
            </button>
            <button 
             onClick={addOrderHandler}
            className="bg-green-600 text-white px-6 py-2 rounded-md shadow hover:bg-green-700">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
