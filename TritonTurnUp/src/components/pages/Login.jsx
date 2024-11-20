import React, { useState } from 'react';
import './Login.css';
import Turnip from '../../assets/Turnip.png';
import { GoogleLogin, useGoogleLogin, googleLogout} from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [user, setUser] = useState(null); // Track logged-in user state

  const handleLoginSuccess = async (response) => {
    try {
      // Fetch user info from Google's user info endpoint
      const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${response.access_token}` },
      });
      const userInfo = await res.json();
      console.log('User Info:', userInfo);
      setUser(userInfo);
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


  const handleLogout = () => {
    setUser(null); // Clear user info
    googleLogout(); // Optional: Revoke Google session
    console.log('User logged out');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>⋆˙⟡ Welcome to Triton TurnUp! ✧˖°.</h1>
        {user ? (
          <div>
            <p>Welcome, {user.name}!</p>
            <button onClick={handleLogout} className="google-logout-button">Logout</button>
          </div>
        ) : (
          <>
            <p className="body-text">
              Please log in with google to access your account. <br />
            </p>
            <img className="turnip" src={Turnip} alt="Turnip mascot" /> <br />
            <button onClick={login} className="google-login-button">
              Login
            </button>
          </>
        )}

      </div>
    </div>
  );
}

export default Login
