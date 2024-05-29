import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

function Login() {
  return (
    <div className="login-container">
      <div className="header">
        <h1>Sign in Page</h1>
      </div>
      <main className="login-main">
        <div className="login-box">
          <h2>Login</h2>
          <form>
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input type="text" id="username" name="username" required />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" required />
            </div>
            <div className="button-group">
              <button Link to="/Dashboard" type="submit">Login</button>
              <Link to="/"><button type="button">Back</button></Link>
            </div>
          </form>
        </div>
      </ main>
      <div className="footer">
        <p>&copy; 2024 Assignment Review App. All rights reserved.</p>
      </div>
    </div>
  );
}

export default Login;
