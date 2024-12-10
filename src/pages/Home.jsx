import React, { useEffect } from 'react'
import HomePage from './normal/HomePage'
import Nav from './normal/Nav'
import { Route, Routes } from 'react-router-dom'
import Login from '../conponents/auth/Login'
import Profile from './User/Profile'
import UserAccount from './User/UserAccount'
import SelectedProduct from './normal/SelectedProduct'
import Register from '../conponents/auth/Register'
import UserNav from './normal/UserNav'
import { useDispatch, useSelector } from 'react-redux'
import { GetUserProfile } from '../redux/auth/auth.action'
import Footer from './Footer'

import UpdateProfile from '../conponents/auth/UpdateProfile'
import ProductDetail from './Product/ProductDetail'
import ProceedToPay from './Product/ProceedToPay'
import OrderProductView from './User/OrderProductView'


function Home() {
  const auth = useSelector((store) => store.auth);
  const dispatch = useDispatch()
  const jwt = localStorage.getItem("jwt")

  useEffect(() => {
    if (jwt) {
      dispatch(GetUserProfile(jwt))
    }
  }, [jwt])
  return (
    <div className='flex flex-col m-0 p-0'>
      <div>
        {
          auth.user ?
            <UserNav /> : <Nav />}
      </div>
      <div className='pt-10'>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/selectproduct" element={<SelectedProduct />} />
          <Route path="/productDetails/:id" element={<ProductDetail />} />
          {auth.user != null ? (
            <>
              <Route path="/user/profile" element={<Profile />} />
              <Route path="/user/updateProfile" element={<UpdateProfile />} />
              <Route path="/user/account" element={<UserAccount />} />
              <Route path="/user/profile/procedePay" element={<ProceedToPay/>}/>
              <Route path='/user/viewOrderdItem'element={<OrderProductView/>}/>
            </>
          ) : (
            <Route path="/user/*" element={<HomePage />} />
          )}

        </Routes>

      </div>

      <Footer />

    </div>
  );
}

export default Home