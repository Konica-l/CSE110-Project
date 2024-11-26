import React from 'react';
import './Login.css';
import Navbar from '../navbar/Navbar'
import Turnip from '../../assets/Turnip.png';

const Login = ({login, user}) => {
  return (
    <>
      <Navbar />
      <div className="login-container">
      <div className="login-box">
        <h1>⋆˙⟡ Welcome to Triton TurnUp! ✧˖°.</h1>
        {user ? (
          <div>
            <p>Welcome, {user.name}!</p>
          </div>
        ) : (
          <>
            <p className="body-text">
              Please log in with google to access your account. <br />
            </p>
            <img className="turnip" src={Turnip} alt="Turnip mascot" /> <br />
            <button onClick={login} className="google-login-button">Login</button>
          </>
        )}
      </div>
    </div>
    </>
  );
}

export default Login
