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
    <nav className="bg-blue-950 shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div>
          <div className="flex flex-row gap-3">

            {/* Logo */}
            <Link to="/" className="text-xl font-bold text-blue-500">
              E-Shop
            </Link>

            <CategorySelector />

          </div>
        </div>
        <div className="flex flex-row space-x-2">

          {/* Login Button */}
          <div>
            <Link
              to="/user/profile"
              className="text-blue-500 border px-3 py-2 rounded-full hover:text-blue-600"
            >
              <FontAwesomeIcon icon={faUser} />
            </Link>
          </div>
          <div className="text-center">
            <p className="font-semibold capitalize text-white">{auth.user.name}</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default UserNav;
