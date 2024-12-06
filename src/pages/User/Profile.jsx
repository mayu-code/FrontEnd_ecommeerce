import React, { useState } from 'react';
import OrderItem from './OrderItem';
import CartItem from './CartItem';
// import OrderItem from './OrderItem';
// import { useAuth } from '../contexts/ ';

const Profile = () => {
  // const { user, logout } = useAuth();

  // const user="das", logout=null;

  // Hardcoded Dummy Data
  const dummyProfile = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    address: '123 Main St, Springfield, USA'
  };

  const dummyOrders = [
    {
      id: 1,
      date: '2024-12-01',
      items: [
        { id: 1, name: 'Product 1', price: 20, quantity: 2 },
        { id: 2, name: 'Product 2', price: 15, quantity: 1 }
      ],
      total: 55
    },
    {
      id: 2,
      date: '2024-11-15',
      items: [
        { id: 3, name: 'Product 3', price: 30, quantity: 1 }
      ],
      total: 30
    }
  ];

  const dummyCartItems = [
    { id: 1, name: 'Product 1', price: 20, quantity: 2 },
    { id: 2, name: 'Product 2', price: 15, quantity: 1 }
  ];

  const [cartItems, setCartItems] = useState(dummyCartItems);
  const [newCartItem, setNewCartItem] = useState('');

  // Add an item to the cart (simulated for now)
  const handleAddToCart = () => {
    if (newCartItem) {
      const newItem = { id: cartItems.length + 1, name: newCartItem, price: 10, quantity: 1 };
      setCartItems([...cartItems, newItem]);
      setNewCartItem('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Profile Section */}
      <section className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold">Profile</h2>
        <div className="mt-4 flex flex-row justify-between">
          <div>
            <p><strong>Name:</strong> {dummyProfile.name}</p>
            <p><strong>Email:</strong> {dummyProfile.email}</p>
            <p><strong>Address:</strong> {dummyProfile.address}</p>
          </div>
          <div className='flex flex-col justify-between'>
            <div>
              <button
                // onClick={logout}
                className="mt-4 bg-green-500 text-white p-2 rounded"
              >
                Update
              </button>
            </div>
            <div>
              <button
                // onClick={logout}
                className="mt-4 bg-red-500 text-white p-2 rounded"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* My Orders Section */}
      <section className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold">My Orders</h2>
        {dummyOrders.length > 0 ? (
          <div className="mt-4">
            {dummyOrders.map(order => (
              <OrderItem key={order.id} order={order} />
            ))}
          </div>
        ) : (
          <p>No orders found.</p>
        )}
      </section>

      {/* Cart Section */}
      <section className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold">My Cart</h2>
        <div className="mt-4">
          {/* <div>
            <input
              type="text"
              placeholder="Add product to cart"
              value={newCartItem}
              onChange={(e) => setNewCartItem(e.target.value)}
              className="border border-gray-300 p-2 rounded"
            />
            <button
              onClick={handleAddToCart}
              className="ml-4 bg-blue-500 text-white p-2 rounded"
            >
              Add to Cart
            </button>
          </div> */}

          {cartItems.length > 0 ? (
            <div className="mt-4">
              {cartItems.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Profile;
