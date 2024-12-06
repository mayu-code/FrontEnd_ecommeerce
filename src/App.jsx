import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Login from './conponents/auth/Login';


function App() {

  return (
    <BrowserRouter>
          <Routes>
              <Route path='/*' element={<Home/>}/>
         </Routes>
    </BrowserRouter>
  )
}

export default App
