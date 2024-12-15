import React from 'react';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode'; // Ensure correct import

function Home() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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
    const role = getRoleFromToken();
    if (role === 'learner') {
      navigate('/learner-dashboard');
    } else if (role === 'reviewer') {
      navigate('/reviewer-dashboard');
    } else {
      console.log('Role not defined or token is invalid.');
    }
  };

  // Check if the user is authenticated
  const isAuthenticated = !!getRoleFromToken();

  return (
    <div className="home-container">
      <header className="home-header">
        Welcome to the Assignment Review App
      </header>
      <main className="home-main">
        {isAuthenticated ? (
          <>
            <button onClick={handleDashboard} className="dashboard-button">
              Go to my Dashboard
            </button>
            <p className="home-description">
              Hello! Click to go to your Dashboard!
            </p>
          </>
        ) : (
          <>
            <button onClick={() => navigate('/login')} className="login-button">
              Login
            </button>
            <p className="home-description">
              Hello! Login to view your dashboard!
            </p>
          </>
        )}
      </main>
      <footer className="home-footer">

      </footer>
    </div>
  );
}

export default Home;