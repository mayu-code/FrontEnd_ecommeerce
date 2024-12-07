import React, { useEffect, useState } from "react";
import OrderItem from "./OrderItem";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { GetUserProfile } from "../../redux/auth/auth.action";
import axios from "axios";
import { API_BASE_URL } from "../../config/api";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import AddressSection from "./AddressItem";

const Profile = () => {
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const [cproducts, setcProducts] = useState([]);
  const [addresses, setAddresses] = useState([]);
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
      setAddresses(auth.user.addresses || []); // Load addresses from the user object
    }
  }, [auth.user]);



  useEffect(() => {
    loadcProducts();
    loadOproducts();
  }, [])

  const loadcProducts = async () => {
    const result = await axios.get(`${API_BASE_URL}/user/cartproducts`,
      {
        headers: {
          "Authorization": `Bearer ${jwt}`
        }
      });
    setcProducts(result.data);

  };
  const loadOproducts = async () => {
    const result = await axios.get(`${API_BASE_URL}/user/orderedproducts`,
      {
        headers: {
          "Authorization": `Bearer ${jwt}`
        }
      });
    setOproducts(result.data);

  };

  const UpdateUser = () => {
    navigate("/updateProfile")
  }

  const handleLogout = () => {
    alert("Are you want to logout from the website !")
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
        <div className="flex flex-row justify-between">
          <h2 className="text-2xl font-semibold">Profile</h2>
          <div className="flex flex-row gap-2">
            <div>
              <button
                onClick={UpdateUser}
                className=" bg-green-500 text-white px-3 py-2 rounded-md">
                <FontAwesomeIcon icon={faPencil} />

              </button>
            </div>
            <div>
              <button
                onClick={handleLogout}
                className=" bg-red-500 text-white px-3 py-2 rounded-md">
                <FontAwesomeIcon icon={faRightFromBracket} />
              </button>
            </div>
          </div>
        </div>
        <div className="mt-4 flex flex-row justify-between">
          <div className="flex flex-col gap-2">
            <p><span className="font-semibold">Name:</span> {user1?.name || "N/A"}</p>
            <p><span className="font-semibold">Email:</span> {user1?.email || "N/A"}</p>
            <p><span className="font-semibold">Mobile No:</span> {user1?.mobileNo || "N/A"}</p>
            <p><span className="font-semibold">Registation Date:</span> {user1?.registationDate || "N/A"}</p>
            <p><span className="font-semibold">Login Date:</span> {user1?.loginDate || "N/A"}</p>
            <p><span className="font-semibold">Address:</span> {user1?.address || "N/A"}</p>
          </div>

        </div>
      </section>


      {/* Address Section */}
      <section className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold">Address</h2>
        {addresses.length > 0 ? (

          <div className="mt-4">
            {addresses.map((address, index) => (
              <AddressSection key={address.id} index={index} address={address} />
            ))}

          </div>
        ) : (
          <p>No address found.</p>
        )}
      </section>

      {/* My Orders Section */}
      <section className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold">My Orders</h2>
        {oproducts.length > 0 ? (
          <div className="mt-4">
            {oproducts.map((order, index) => (
              <OrderItem key={index} order={order} />
            ))}
          </div>
        ) : (
          <p>No orders found.</p>
        )}
        <hr />
      </section>

      {/* Cart Section */}
      <section className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold">My Cart</h2>
        <div className="mt-4">
          {cproducts.length > 0 ? (
            <div className="mt-4">
              {cproducts.map((item, index) => (
                <CartItem key={item.id} item={item} index={index} />
              ))}
            </div>
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>
        <hr />
      </section>
    </div>
  );
};

export default Profile;
