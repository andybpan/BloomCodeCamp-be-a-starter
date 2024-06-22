import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import { useNavigate } from 'react-router-dom';


function Home() {

  const navigateToLogin = useNavigate();

  const handleLogin = () => {
    navigateToLogin('/Login');
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
      </footer>
    </div>
  );
}

export default Home;
