import React from 'react'
import HomePage from './normal/HomePage'
import Nav from './normal/Nav'
import { Route, Routes } from 'react-router-dom'
import Login from '../conponents/auth/Login'
import Profile from './User/Profile'
import UserCart from './User/UserCart'
import UserOrders from './User/UserOrder'
import UserAccount from './User/UserAccount'
import AdminProductList from './Admin/AdminProductList'
import AdminUserList from './Admin/AdminUserList'
import AdminOrderedProductsList from './Admin/AdminOrderedProductsList'
import Footer from './Footer'

function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Nav />

      <div className="flex-grow"> {/* This div takes up the remaining space */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user/profile" element={<Profile />} />
          <Route path="/user/cart" element={<UserCart />} />
          <Route path="/user/orders" element={<UserOrders />} />
          <Route path="/user/account" element={<UserAccount />} />
          <Route path="/admin/products" element={<AdminProductList />} />
          <Route path="/admin/users" element={<AdminUserList />} />
          <Route path="/admin/orderedProducts" element={<AdminOrderedProductsList />} />
        </Routes>
      </div>

      {/* Footer is now at the bottom */}
      <Footer />
    </div>
  );
}

export default Home