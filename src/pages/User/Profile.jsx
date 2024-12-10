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
  const auth = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const jwt = localStorage.getItem("jwt");

  const [addresses, setAddresses] = useState([]);
  const [stack, setStack] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user1, setUser1] = useState(null);
  const [orders, setOrders] = useState([]);

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
      setUser1(auth.user.data);
      setAddresses(auth.user.data.addresses || []);
    }
  }, [auth.user]);

  useEffect(() => {
    loadStack();
    loadOrders();
  }, [])

  const loadStack = async () => {
    const result = await axios.get(`${API_BASE_URL}/user/getCart`,
      {
        headers: {
          "Authorization": `Bearer ${jwt}`
        }
      });
    setStack(result.data.data);
  };

  const loadOrders = async () => {
    const result = await axios.get(`${API_BASE_URL}/user/orders`,
      {
        headers: {
          "Authorization": `Bearer ${jwt}`
        }
      })
    setOrders(result.data.data)
  }


  const UpdateUser = () => {
    navigate("/user/updateProfile")
  }

  const handleLogout = () => {
    alert("Are you want to logout from the website !")
    localStorage.removeItem('jwt');
    navigate('/');
    window.location.reload();
  };

  const placeOrderHandler = () => {
    navigate("procedePay", { state: stack })
  }


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
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
        {orders.length > 0 ? (
          <div className="mt-4 overflow-x-auto">
            <table className="table-auto w-full">
              <thead className="bg-gray-300">
                <tr>
                  <th className="px-4 py-2 text-left">Order ID</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Order Date</th>
                  <th className="px-4 py-2 text-left">Payment Method</th>
                  <th className="px-4 py-2 text-left">Shipping Address</th>
                  <th className="px-4 py-2 text-left">Total Paid</th>
                  <th className="px-4 py-2 text-left">Transaction ID</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders.map((order, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="px-4 py-2">{order.orderId}</td>
                    <td className="px-4 py-2">{order.orderStatus}</td>
                    <td className="px-4 py-2">{order.orderDate}</td>
                    <td className="px-4 py-2">{order.paymentMethod}</td>
                    <td className="px-4 py-2">{order.shippingAddress}</td>
                    <td className="px-4 py-2">₹{order.totalPaid}</td>
                    <td className="px-4 py-2">{order.transitionId}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
          {stack?.mycart?.length > 0 ? (
            <div className="mt-4">
              {stack.mycart.map((item, index) => (
                <CartItem key={index} item={item} id={stack.stackId} />
              ))}
            </div>
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>
        {stack?.mycart?.length > 0 ? (
          <>
            <div className='flex flex-col gap-6 justify-start items-start'>
              <p className="mt-5 text-xl"> Payable Amount : <span className="font-semibold text-green-600 text-2xl">₹{stack.totalPrice}</span></p>
              <button
                onClick={placeOrderHandler}
                className="p-3 bg-green-700 text-white px-2 rounded hover:bg-green-800"
              >
                Place Order
              </button>
            </div>
          </>
        ) : (
          <span></span>
        )
        }
      </section>
    </div>
  );
};

export default Profile;
