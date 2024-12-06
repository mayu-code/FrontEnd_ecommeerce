import React, { useEffect } from 'react'
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
import SelectedProduct from './normal/SelectedProduct'
import Register from '../conponents/auth/Register'
import UserNav from './normal/UserNav'
import { useDispatch, useSelector } from 'react-redux'
import { GetUserProfile } from '../redux/auth/auth.action'
import Footer from './Footer'

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
            <Route path="/user/profile" element={<Profile />} />
          ) : (
            <Route path="/user/profile" element={<HomePage />} />
          )}

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

// import React, { useEffect } from "react";
// import { Route, Routes, Navigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import HomePage from "./normal/HomePage";
// import Nav from "./normal/Nav";
// import UserNav from "./normal/UserNav";
// import Login from "../conponents/auth/Login";
// import Register from "../conponents/auth/Register";
// import Profile from "./User/Profile";
// import UserCart from "./User/UserCart";
// import UserOrders from "./User/UserOrder";
// import UserAccount from "./User/UserAccount";
// import AdminProductList from "./Admin/AdminProductList";
// import AdminUserList from "./Admin/AdminUserList";
// import AdminOrderedProductsList from "./Admin/AdminOrderedProductsList";
// import SelectedProduct from "./normal/SelectedProduct";
// import { GetUserProfile } from "../redux/auth/auth.action";

// // Protected Route Component
// const ProtectedRoute = ({ children, allowedRoles }) => {
//   const { auth } = useSelector((store) => store);
//   const jwt = localStorage.getItem("jwt");

//   // Check if JWT exists in localStorage
//   if (!jwt) {
//     return <Navigate to="/login" />;
//   }

//   // Check if user role matches allowedRoles
//   if (allowedRoles && !allowedRoles.includes(auth.user?.role)) {
//     return <Navigate to="/" />;
//   }

//   return children;
// };

// // Home Component with Secure Routes
// function Home() {
//   const { auth } = useSelector((state) => state); // Ensure only `auth` is selected
//   const dispatch = useDispatch();
//   const jwt = localStorage.getItem("jwt");

//   useEffect(() => {
//     if (jwt && !auth.user) {
//       dispatch(GetUserProfile(jwt)); // Fetch user profile if not already fetched
//     }
//   }, [jwt, auth.user, dispatch]);

//   return (
//     <div className="flex flex-col mx-10 my-10">
//       {/* Navigation */}
//       <div>{auth.user ? <UserNav /> : <Nav />}</div>

//       {/* Routes */}
//       <div>
//         <Routes>
//           {/* Public Routes */}
//           <Route path="/" element={<HomePage />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/selectproduct" element={<SelectedProduct />} />

//           {/* User Routes */}
//           <Route
//             path="/user/profile"
//             element={
//               // <ProtectedRoute allowedRoles={["user"]}>
//                 <Profile />
//               // </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/user/cart"
//             element={
//               <ProtectedRoute allowedRoles={["user"]}>
//                 <UserCart />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/user/orders"
//             element={
//               <ProtectedRoute allowedRoles={["user"]}>
//                 <UserOrders />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/user/account"
//             element={
//               <ProtectedRoute allowedRoles={["user"]}>
//                 <UserAccount />
//               </ProtectedRoute>
//             }
//           />

//           {/* Admin Routes */}
//           <Route
//             path="/admin/products"
//             element={
//               <ProtectedRoute allowedRoles={["admin"]}>
//                 <AdminProductList />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/admin/users"
//             element={
//               <ProtectedRoute allowedRoles={["admin"]}>
//                 <AdminUserList />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/admin/orderedProducts"
//             element={
//               <ProtectedRoute allowedRoles={["admin"]}>
//                 <AdminOrderedProductsList />
//               </ProtectedRoute>
//             }
//           />
//         </Routes>
//       </div>
//     </div>
//   );
// }

// export default Home;
