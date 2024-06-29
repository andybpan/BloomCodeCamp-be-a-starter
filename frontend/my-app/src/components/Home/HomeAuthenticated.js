import React from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import './Home.css';

function Home() {
  const navigateToDashboard = useNavigate();

   // Function decodes JWT token and determine the user's role
  const getRoleFromToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwt_decode(token);
      return decoded.authority; // check if this needs to be adjusted based on decode's field
    }
    return null;
  };

  return (
    <div className="home-container">
      <header className="home-header">
        Welcome to the Assignment Review App
      </header>
      <main className="home-main">
        {/*
          HomeAuthenticated needs to have a dashboard button to link to correct dashboard
          1. link button to Dashboard
          2. Create logic to link to correct dashboard - based on token?
        */}
        <button onClick={handleDashboard} className="login-button">
          Go to my Dashboard
        </button>
        <p className="home-description">
          Hello! Click to go to you Dashboard!
        </p>
      </main>
      <footer className="home-footer">
      </footer>
    </div>
  );
}

export default Home;
