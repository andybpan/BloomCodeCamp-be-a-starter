import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigateToDashboard = useNavigate();
  const isLearner = true; // test data

  // steps
  // analyze the token
  // check if learner or reviewer, then pass result
  // navigate to the correct page
  // populate the page with the correct info - where does that go?
  // design wise, population logic should go on that page?
  const handleDashboard = () => {
    // insert token logic

    // temporary navigation logic
    if (isLearner) {
      navigateToDashboard('/LearnerDashboard');
    } else {
      navigateToDashboard('/ReviewerDashboard');
    }
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
