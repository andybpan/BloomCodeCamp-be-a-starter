import React from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function Home() {
  const navigateToDashboard = useNavigate();

   // Function decodes JWT token and determine the user's role
  const getRoleFromToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      return decoded.authority; // check if this needs to be adjusted based on decode's field
    }
    return null;
  };

  // Function handles dashboard navigation based on user's authority
  // double check role keywords
  const handleDashboard = () => {
    const role = getRoleFromToken();
    if (role === 'leaner') {
      navigateToDashboard('/LearnerDashboard');
    } else if (role === 'reviewer') {
      navigateToDashboard('/ReviewerDashboard');
    } else {
      // Handle cases where the role is not defined or token is invalid
      // Maybe redirect to a login page or show an error message
      // for now: just shows error message
      console.log('Role not defined or token is invalid.');
    }
  };

  return (
    <div className="home-container">
      <header className="home-header">
        Welcome to the Assignment Review App
      </header>
      <main className="home-main">
        <button onClick={handleDashboard} className="login-button">
          Go to my Dashboard
        </button>
        <p className="home-description">
          Hello! Click to go to your Dashboard!
        </p>
      </main>
      <footer className="home-footer">
      </footer>
    </div>
  );
}

export default Home;
