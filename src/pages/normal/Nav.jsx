// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import CategorySelector from "../../conponents/product/CategorySelector";

const Nav = () => {
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
          to="/login"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
