import React from 'react';
import './Login.css';
import Turnip from '../../assets/Turnip.png';
//import { Form } from "@remix-run/react";

/* <Form action="/auth/google" method="post">
<button>Login with Google</button>
</Form> */

import { useState, useEffect } from 'react';

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is already logged in
    const checkLoginStatus = async () => {
      const response = await fetch('/api/check-login');
      if (response.ok) {
        setIsLoggedIn(true);
      }
    };
    
    checkLoginStatus();
  }, []);

  const handleLogin = () => {
    window.location.href = 'http://localhost:3000/auth/google';
  };

  const handleLogout = async () => {
    const response = await fetch('/logout');
    if (response.ok) {
      setIsLoggedIn(false);  // Update the state to reflect the user is logged out
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>⋆˙⟡ Welcome to Triton TurnUp! ✧˖°.</h1>
        <p className="body-text">
          Please log in to access your account. <br />
          You can sign in using your Google account.
        </p>
        <img className="turnip" src={Turnip} alt="Turnip" /> <br />
        
        {!isLoggedIn && (
          <button onClick={handleLogin}>Login with Google</button>
        )}
        {isLoggedIn && (
          <>
            <p>You are already logged in!</p>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
