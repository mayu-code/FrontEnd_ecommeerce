import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios"; // Ensure axios is imported
import { API_BASE_URL } from "../../config/api";
import CartItem1 from "./CartItem1";

const ProceedToPay = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const stack = location.state; // Retrieve passed data
  const jwt = localStorage.getItem("jwt");

  const [shippingAddress, setAddress] = useState(""); // Address input state
  const [paymentMethod, setPaymentMethod] = useState("COD"); // Default to Cash on Delivery

  const placeOrderHandler = async () => {
    if (!jwt) {
      alert("You need to log in first!");
      navigate("/login");
      return;
    }

    const orderDetails = {
      shippingAddress,
      paymentMethod,
    };

    try {
      const response = await axios.post(
        `${API_BASE_URL}/user/myCart/placeOrder`,
        orderDetails,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      const orderId = response.data.data.orderId
      ProceedToPay(orderId);
      alert("Order placed successfully!");
    } catch (error) {
      console.error("Order placement failed:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  const ProceedToPay = async (orderId) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/user/payment/${orderId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      navigate("/user/profile");
    } catch (error) {
      alert("Failed to place order. Please try again.");
    }
  };

  if (!stack) {
    // Handle case where stack is undefined
    return <div className="text-center text-red-600">No order details available!</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-100 rounded-md shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Proceed to Pay</h1>

      {/* Product Summary */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700">Order Summary</h2>
        <div className="mt-4">
          {stack.mycart?.length > 0 ? (
            <div className="mt-4">
              {stack.mycart.map((item, index) => (
                <CartItem1 key={index} item={item} id={stack.stackId} />
              ))}
            </div>
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>
        <div>
          <p>Total Price : ₹{stack.totalPrice}</p>
        </div>
      </div>

      {/* Delivery Address */}
      <div className="mb-6">
        <label className="text-gray-700 font-medium" htmlFor="address">
          Delivery Address
        </label>
        <textarea
          id="address"
          rows="4"
          value={shippingAddress}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full mt-2 p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter your delivery address"
        ></textarea>
      </div>

      {/* Payment Method */}
      <div className="mb-6">
        <h2 className="text-gray-700 font-medium">Select Payment Method</h2>
        <div className="mt-2 flex items-center space-x-4">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="COD"
              checked={paymentMethod === "COD"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="focus:ring-2 focus:ring-blue-400"
            />
            <span>Cash on Delivery (COD)</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="PAYPAL"
              checked={paymentMethod === "PAYPAL"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="focus:ring-2 focus:ring-blue-400"
            />
            <span>PayPal</span>
          </label>
        </div>
      </div>

      {/* Proceed Button */}
      <div className="text-right">
        <button
          onClick={placeOrderHandler}
          className="bg-blue-600 text-white px-6 py-2 rounded-md shadow hover:bg-blue-700"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default ProceedToPay;
