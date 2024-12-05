import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Login from './conponents/auth/Login';

function App() {
  return (
    <BrowserRouter>
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
    //      {/* <Route
    //           path="/admin"
    //           element={
    //             <PrivateRoute isAdminRoute>
    //               <AdminDashboard />
    //             </PrivateRoute>
    //           }
    //         />
    //         <Route
    //           path="/profile"
    //           element={
    //             <PrivateRoute>
    //               <UserProfile />
    //             </PrivateRoute>
    //           }
    //         /> */}
         </Routes>
       </BrowserRouter>
  )
}

export default App
