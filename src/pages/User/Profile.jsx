import React, { useEffect, useState } from "react";
import OrderItem from "./OrderItem";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { GetUserProfile } from "../../redux/auth/auth.action";
import axios from "axios";
import { API_BASE_URL } from "../../config/api";

const Profile = () => {
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const [products, setProducts] = useState([]);
  
  // Loading state to check when the user data is available
  const [loading, setLoading] = useState(true);
  const [user1, setUser1] = useState(null);

  // Fetch user profile on component mount
  useEffect(() => {
    if (jwt) {
      dispatch(GetUserProfile(jwt)).finally(() => {
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [jwt, dispatch]);

  // Sync profile data from Redux store to local state
  useEffect(() => {
    if (auth.user) {
      setUser1(auth.user);
    }
  }, [auth.user]);


  // Simulate fetching data (could be replaced with an API call)

  useEffect(()=>{
    loadProducts();
  },[])

  const loadProducts = async () => {
    const result = await axios.get(`${API_BASE_URL}/user/cartproducts`,
            {
                headers:{
                    "Authorization":`Bearer ${jwt}`
                }
            });
    setProducts(result.data); 

  };

  const dummyOrders = [
    {
      id: 1,
      date: "2024-12-01",
      items: [
        { id: 1, name: "Product 1", price: 20, quantity: 2 },
        { id: 2, name: "Product 2", price: 15, quantity: 1 },
      ],
      total: 55,
    },
    {
      id: 2,
      date: "2024-11-15",
      items: [{ id: 3, name: "Product 3", price: 30, quantity: 1 }],
      total: 30,
    },
  ];

  const dummyCartItems = [
    { id: 1, name: "Product 1", price: 20, quantity: 2 },
    { id: 2, name: "Product 2", price: 15, quantity: 1 },
  ];

  const [cartItems, setCartItems] = useState(dummyCartItems);

  if (loading) {
    return <div>Loading...</div>; // You can show a loading spinner or message here
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Profile Section */}
      <section className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold">Profile</h2>
        <div className="mt-4 flex flex-row justify-between">
          <div>
            <p><strong>Name:</strong> {user1?.name || "N/A"}</p>
            <p><strong>Email:</strong> {user1?.email || "N/A"}</p>
            <p><strong>Mobile No:</strong> {user1?.mobileNo || "N/A"}</p>
            <p><strong>Registation Date:</strong> {user1?.registationDate || "N/A"}</p>
            <p><strong>Login Date:</strong> {user1?.loginDate || "N/A"}</p>
            <p><strong>Address:</strong> {user1?.address || "N/A"}</p>
          </div>
          <div className="flex flex-col justify-between">
            <div>
              <button className="mt-4 bg-green-500 text-white p-2 rounded">
                Update
              </button>
            </div>
            <div>
              <button className="mt-4 bg-red-500 text-white p-2 rounded">
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
            {dummyOrders.map((order) => (
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
          {products.length > 0 ? (
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
