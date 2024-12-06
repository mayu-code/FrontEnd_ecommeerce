import React, { useEffect } from 'react'
import HomePage from './normal/HomePage'
import Nav from './normal/Nav'
import { Route, Routes } from 'react-router-dom'
import Login from '../conponents/auth/Login'
import Profile from './User/Profile'
import UserOrders from './User/UserOrder'
import UserAccount from './User/UserAccount'
import AdminProductList from './Admin/AdminProductList'
import AdminUserList from './Admin/AdminUserList'
import AdminOrderedProductsList from './Admin/AdminOrderedProductsList'
import SelectedProduct from './normal/SelectedProduct'
import Register from '../conponents/auth/Register'
import UserNav from './normal/UserNav'
import { useDispatch, useSelector } from 'react-redux'
import { GetUserProfile } from '../redux/auth/auth.action'
import Footer from './Footer'
import AdminLogin from './Admin/AdminLogin'
import UpdateProfile from '../conponents/auth/UpdateProfile'

function Home() {
  const { auth } = useSelector(store => store)
  const dispatch = useDispatch()
  const jwt = localStorage.getItem("jwt")

  useEffect(() => {
    if (jwt) {
      dispatch(GetUserProfile(jwt))
    }
  }, [jwt])
  return (
    <div className='flex flex-col mx-10 my-10'>
      <div>
        {auth.user ? <UserNav /> : <Nav />}
      </div>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/selectproduct" element={<SelectedProduct />} />
          {auth.user != null ? (
            <>
            <Route path="/user/profile" element={<Profile />} />
            <Route path="/user/orders" element={<UserOrders />} />
            <Route path="/user/updateProfile" element={<UpdateProfile/>}/>
            <Route path="/user/account" element={<UserAccount />} />
            </>
          ) : (
            <Route path="/user/*" element={<HomePage />} />
          )}

        {auth.admin != null ? (
            <>
           <Route path="/admin/products" element={<AdminProductList />} />
          <Route path="/admin/users" element={<AdminUserList />} />
          <Route path="/admin/orderedProducts" element={<AdminOrderedProductsList />} />
            </>
          ) : (
            <Route path="/admin/*" element={<AdminLogin />} />
          )}

        </Routes>

      </div>

          {
            auth.admin || auth.user ?<></>:<Footer />
          }
    </div>
  );
}

export default Home