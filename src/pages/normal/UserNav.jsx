// src/components/Navbar.jsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import CategorySelector from "../../conponents/product/CategorySelector";
import { useDispatch, useSelector } from "react-redux";
import { GetUserProfile } from "../../redux/auth/auth.action";

const UserNav = () => {

  
  const {auth} = useSelector(store=>store)
  const dispatch = useDispatch()
  const jwt = localStorage.getItem("jwt")

  useEffect(() => {
    if (jwt) {
      dispatch(GetUserProfile(jwt))
      console.log(auth.user,"not ok")
    }
  }, [jwt])

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-blue-500">
          E-Shop
        </Link>
            <CategorySelector/>
            
        {/* Login Button */}
        <Link
          to="/user/profile"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Profile
        </Link>
      </div>
    </nav>
  );
};

export default UserNav;
