import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent the default form submission
    try {
      // fetch API, could also use Axios by downloading it.
      // temporary rest link
      setIsLoading(true)
      const response = await fetch('http://your-backend-url/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token); // Store the token
        navigate('/Home'); // Navigate to the dashboard
      } else {
        setError(data.message)
        alert(data.message); // Show error message from server
      }
      setIsLoading(false)
    } catch (error) {
      alert('Login failed: ' + error.message);
    }
  };

  if (isLoading) (
    return (
      <div>
        attempting to login...
      </div>
    )
  )

  if (error) (
    return (
      <div>
        {error}
      </div>
    )
  )

  return (
    <div className="login-container">
      <div className="header">
        <h1>Sign in Page</h1>
      </div>
      <main className="login-main">
        <div className="login-box">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input type="text" id="username" name="username" required
                     value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" required
                     value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="button-group">
              <button type="submit">Login</button>
              <button type="button" onClick={() => navigate('/')}>Back</button>
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
