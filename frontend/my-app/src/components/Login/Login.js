import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { Loader2 } from "lucide-react";

/*
* Login page - allows the user to login into their learner or reviewer account
*/
function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  //  Double check that after login, that if home has an error, the login is still valid
  /* Update and refactor js page to use a service page separate from the page logic */
  const handleLogin = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');

    const credentials: AuthCredentialsRequest = {
        username,
        password
    };

    try {
      const response = await fetch('http://assignmentManager/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        navigate('/home');
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Login failed: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Design error message for user fix login
  if (error) {
    return (
      <div>
        <div>
          <h2>Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return <div>
      <Loader2 className="loading-spinner" />
      <p>logging in ... </p>
    </div>
  }

  return (
    <div className="login-container">
      <div className="header">
        <h1>Sign in Page</h1>
      </div>
      <main className="login-main">
        <div className="login-box">
          <h2>Login</h2>
          {isLoading && <p>Attempting to login...</p>}
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="button-group">
              <button type="submit" disabled={isLoading}>
                Login
              </button>
              <button type="button" onClick={() => navigate('/')}>
                Back
              </button>
            </div>
          </form>
        </div>
      </main>
      <div className="footer">
        <p>&copy; 2024 Assignment Review App. All rights reserved.</p>
      </div>
    </div>
  );
}

export default Login;