import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="home-container">
      <header className="home-header">
        Welcome to the Assignment Review App
      </header>
      <main className="home-main">
        <button onClick={handleLogin} className="login-button">
          Login
        </button>
        <p className="home-description">
          Hello! Login to view your dashboard!
        </p>
      </main>
      <footer className="home-footer">
        {/* Footer content can be added here if needed */}
      </footer>
    </div>
  );
}

export default Home;