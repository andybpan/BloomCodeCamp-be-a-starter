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
        {/*
          HomeAuthenticated needs to have a dashboard button to link to correct dashboard
          1. link button to Dashboard
          2. Create logic to link to correct dashboard - based on token?
        */}
        <Link to="/Login" className="login-button">
          Dashboard
        </Link>
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
