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

function Home() {
  return (
    <div className='flex flex-col mx-10 my-10'>
    <div>
      <Nav/>
    </div>
    <div>
      <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/user/profile" element={<Profile/>}/>
            <Route path="/user/cart" element={<UserCart/>}/>
            <Route path="/user/orders" element={<UserOrders/>}/>
            <Route path="/user/account" element={<UserAccount/>}/>
            <Route path="/admin/products" element={<AdminProductList/>}/>
            <Route path="/admin/users" element={<AdminUserList/>}/>
            <Route path="/admin/orderedProducts" element={<AdminOrderedProductsList/>}/>
      </Routes>

    </div>
    <div></div>
</div>
  )
}

export default Home