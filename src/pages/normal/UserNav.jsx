// src/components/Navbar.jsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import CategorySelector from "../../conponents/product/CategorySelector";
import { useDispatch, useSelector } from "react-redux";
import { GetUserProfile } from "../../redux/auth/auth.action";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const UserNav = () => {


  const { auth } = useSelector(store => store)
  const dispatch = useDispatch()
  const jwt = localStorage.getItem("jwt")

  useEffect(() => {
    if (jwt) {
      dispatch(GetUserProfile(jwt))
    }
  }, [jwt])

  return (
    <nav className="bg-blue-950 shadow-md fixed top-0 w-full z-10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div>
          <div className="flex flex-row gap-6">

            {/* Logo */}
            <Link to="/" className="text-xl font-bold text-blue-500">
              E-Shop
            </Link>

            <CategorySelector />

          </div>
        </div>
        <div className="justify-center">
          {/* Login Button */}
          <Link
            to="/user/profile"
            className="text-blue-500 hover:text-blue-600"
          >
            <div className="flex flex-row gap-2 justify-between">
              <div className="border rounded-full px-3 py-2">
                <FontAwesomeIcon icon={faUser} />
              </div>
              <div className="flex justify-center items-center">
                <p className="font-semibold capitalize text-blue-100">{auth.user.data.name.trim().split(' ')[0]}</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default UserNav;
