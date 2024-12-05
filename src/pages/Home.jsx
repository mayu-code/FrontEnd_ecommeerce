import React from 'react'
import HomePage from './normal/HomePage'
import Nav from './normal/Nav'
import { Route, Routes } from 'react-router-dom'
import Login from '../conponents/auth/Login'

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
      </Routes>

    </div>
    <div></div>
</div>
  )
}

export default Home