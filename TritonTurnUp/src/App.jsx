import React, { useState, useEffect } from 'react'
import "./App.css"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from "./components/pages/Home"
import Profile from "./components/pages/Profile"
import Calendar from "./components/pages/Calendar"
import NoPage from './components/pages/NoPage'
import Login from './components/pages/Login'
import { useGoogleLogin, googleLogout} from '@react-oauth/google';
import Search from './components/pages/Search'
import EventPage from './components/pages/EventPage'
import Navbar from './components/navbar/Navbar'

function App() {
  const [user, setUser] = useState(null); // Track logged-in user state

  // Load user info from localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Restore user state
    }
  }, []);

  const handleLoginSuccess = async (response) => {
    try {
      // Fetch user info from Google's user info endpoint
      const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${response.access_token}` },
      });
      const userInfo = await res.json();
      console.log('User Info:', userInfo);
      setUser(userInfo);

      // Save user info to localStorage
      localStorage.setItem('user', JSON.stringify(userInfo)); 

      // Add customer ID to database
      const serverResponse = await fetch(`http://127.0.0.1:5000/customer/${userInfo.sub}`, {
        method: 'GET',
      });          

      // Refresh page to make information show up
      window.location.reload();
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  const login = useGoogleLogin({
    onSuccess: handleLoginSuccess,
    onError: (error) => {
      console.error('Login Failed:', error);
    },
  });

  const logout = () => {
    setUser(null); // Clear user info
    localStorage.removeItem('user'); // Remove user info from localStorage
    googleLogout(); // Revoke Google session
    console.log('User logged out');
  };

  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar user={user} login={login} logout={logout} />
        <Routes>
          <Route index element={<Home />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/profile" element={<Profile user={user} logout={logout} login={login} />}></Route>
          <Route path="/calendar" element={<Calendar />}></Route>
          <Route path="/login" element={<Login login={login}/>}></Route>
          <Route path="/search" element={<Search />}></Route>
          <Route path="/event" element={<EventPage />}></Route>
          <Route path="*" element={<NoPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}



export default App
