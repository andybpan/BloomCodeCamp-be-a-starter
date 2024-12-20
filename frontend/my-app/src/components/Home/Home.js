import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { Loader2 } from "lucide-react";
import './Home.css';

function Home() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
      checkAuthentication();
    }, []);

  const checkAuthentication = () => {
    setIsLoading(true);
    try {
      const role = getRoleFromToken();
      setIsAuthenticated(!!role);
    } catch (error) {
      setError('Failed to authenticate user');
    } finally {
      setIsLoading(false);
    }
  };

  // Function to decode JWT token and determine the user's role
  const getRoleFromToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        return decoded.authority; // Adjust based on your token's structure
      } catch (error) {
        console.error('Invalid token:', error);
      }
    }
    return null;
  };

  // Function to handle dashboard navigation based on user's authority
  const handleDashboard = () => {
    setIsLoading(true);
    try {
      const role = getRoleFromToken();
      if (role === 'learner') {
        navigate('/learner-dashboard');
      } else if (role === 'reviewer') {
        navigate('/reviewer-dashboard');
      } else {
        setError('Role not defined or token is invalid.');
      }
    } catch (error) {
      setError('Failed to navigate to dashboard');
    } finally {
      setIsLoading(false);
    }
  };

  // Check if the user is authenticated
  if (isLoading) {
    return (
      <div className="home-container">
        <div className="loading-container">
          <Loader2 className="loading-spinner" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="home-container">
        <div className="error-container">
          <p className="error-message">{error}</p>
          <button
            onClick={() => setError(null)}
            className="primary-button"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="home-container">
      <header className="home-header">
        Welcome to the Assignment Review App
      </header>
      <main className="home-main">
        {isAuthenticated ? (
          <div className="content-container">
            <button
              onClick={handleDashboard}
              className="primary-button"
            >
              Go to my Dashboard
            </button>
            <p className="description-text">
              Hello! Click to go to your Dashboard!
            </p>
          </div>
        ) : (
          <div className="content-container">
            <button
              onClick={() => navigate('/login')}
              className="primary-button"
            >
              Login
            </button>
            <p className="description-text">
              Hello! Login to view your dashboard!
            </p>
          </div>
        )}
      </main>
      </main>
      <footer className="home-footer">

      </footer>
    </div>
  );
}

export default Home;