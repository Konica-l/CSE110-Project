import React from 'react'
import "./App.css"
import Navbar from './components/navbar/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from "./components/pages/Home"
import Profile from "./components/pages/Profile"
import Calendar from "./components/pages/Calendar"
import NoPage from './components/pages/NoPage'
import Login from './components/pages/Login'
import SignUp from './components/pages/SignUp'
import Helper from './components/pages/Helper'

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/calendar" element={<Calendar />}></Route>
          <Route path="/helper" element={<Helper />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/sign-up" element={<SignUp />}></Route>
          <Route path="*" element={<NoPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}



export default App
