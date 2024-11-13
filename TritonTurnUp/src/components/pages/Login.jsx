import React from 'react';
import './Login.css';
import Turnip from '../../assets/Turnip.png';
import { handleLogin } from '../pages/handleLogin.js';

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-box">
        <h1>⋆˙⟡ Welcome to Triton TurnUp! ✧˖°.</h1>
        <p className="body-text">
          Please log in to access your account. <br />
          You can sign in using your Google account.
        </p>
        <img className="turnip" src={Turnip}/> <br />
        <button className="google-login-button" onClick={ handleLogin }>Login with Google</button>
      </div>
    </div>
  );
}

export default Login
