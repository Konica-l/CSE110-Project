import React from 'react';
import './Login.css';
import Turnip from '../../assets/Turnip.png';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

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
        <button className="google-login-button">Login with Google</button>
        <div>
          <GoogleLogin
            onSuccess={credentialResponse => {
              console.log(credentialResponse);
            }}
            onError={() => {
              console.log('Login Failed');
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Login
