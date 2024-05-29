import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <header className="home-header">
        Welcome to the Assignment Review App
      </header>
      <main className="home-main">
        <Link to="/Login" className="login-button">
          Login
        </Link>
        <p className="home-description">
          {/* Add your text here explaining what users can do */}
          Hello! Login to view your dashboard!
        </p>
      </main>
      <footer className="home-footer">
      </footer>
    </div>
  );
}

export default Home;
