import React, { useEffect, useState } from "react";
import OrderItem from "./OrderItem";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { GetUserProfile } from "../../redux/auth/auth.action";
import axios from "axios";
import { API_BASE_URL } from "../../config/api";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const [cproducts, setcProducts] = useState([]);
  const [oproducts, setOproducts] = useState([]);
  const navigate = useNavigate();
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




  useEffect(()=>{
    loadcProducts();
    loadOproducts();
  },[])

  const loadcProducts = async () => {
    const result = await axios.get(`${API_BASE_URL}/user/cartproducts`,
            {
                headers:{
                    "Authorization":`Bearer ${jwt}`
                }
            });
    setcProducts(result.data); 

  };
  const loadOproducts = async () => {
    const result = await axios.get(`${API_BASE_URL}/user/orderedproducts`,
            {
                headers:{
                    "Authorization":`Bearer ${jwt}`
                }
            });
    setOproducts(result.data); 

  };

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    navigate('/');
    window.location.reload();
  };


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
              <Link to="/updateProfile" className="mt-4 bg-green-500 text-white p-2 rounded">
                Update
              </Link>
            </div>
            <div>
              <button
               onClick={handleLogout}
               className="mt-4 bg-red-500 text-white p-2 rounded">
                Logout
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* My Orders Section */}
      <section className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold">My Orders</h2>
        {oproducts.length > 0 ? (
          <div className="mt-4">
            {oproducts.map((order,index) => (
              <OrderItem key={index} order={order} />
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
          {cproducts.length > 0 ? (
            <div className="mt-4">
              {cproducts.map((item,index) => (
                <CartItem key={item.id} item={item} index={index} />
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
