import React, { useState } from 'react';
import CartProduct from './CartProduct';

const UserCart = () => {
  // Hardcoded Dummy Cart Data
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Product 1', price: 20, quantity: 2 },
    { id: 2, name: 'Product 2', price: 15, quantity: 1 },
    { id: 3, name: 'Product 3', price: 30, quantity: 3 },
    { id: 4, name: 'Product 4', price: 40, quantity: 1 },
    { id: 5, name: 'Product 5', price: 25, quantity: 5 },
    { id: 6, name: 'Product 6', price: 50, quantity: 2 }
  ]);

  // Update product quantity in the cart
  const handleUpdateQuantity = (id, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Remove a product from the cart
  const handleRemoveProduct = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Calculate total price
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h2 className="text-3xl font-semibold">Your Cart</h2>

      {cartItems.length > 0 ? (
        <>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Render Cart Products */}
            {cartItems.map((item) => (
              <CartProduct
                key={item.id}
                item={item}
                onUpdateQuantity={handleUpdateQuantity}
                onRemove={handleRemoveProduct}
              />
            ))}
          </div>

          {/* Cart Total */}
          <div className="flex justify-between mt-8 border-t pt-4">
            <span className="text-xl font-semibold">Total:</span>
            <span className="text-xl">${calculateTotal().toFixed(2)}</span>
          </div>

          {/* Checkout Button */}
          <div className="mt-6">
            <button className="bg-blue-500 text-white px-6 py-3 rounded-md w-full">
              Proceed to Checkout
            </button>
          </div>
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default UserCart;
