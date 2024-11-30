import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import HomePublic from './components/Home/HomePublic';
import HomeAuth from './components/Home/HomeAuthenticated';
import Login from './components/Login/Login';
import LearnerDashboard from './components/Dashboard/LearnerDashboard';
import ReviewerDashboard from './components/Dashboard/ReviewerDashboard';
import LearnerAssignmentView from './components/Assignments/LearnerAssignmentView';
import ReviewerAssignmentView from './components/Assignments/ReviewerAssignmentView';

function App() {
  return (
    <div className="App">
      <nav>
        <ul>
          <li><Link to="/">Home Page</Link></li>
          <li><Link to="/home">Home Authenticated</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/learner-dashboard">Learner Dashboard</Link></li>
          <li><Link to="/reviewer-dashboard">Reviewer Dashboard</Link></li>
          <li><Link to="/learner-assignment-view">Learner Assignment View</Link></li>
          <li><Link to="/reviewer-assignment-view">Reviewer Assignment View</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<HomePublic />} />
        <Route path="/home" element={<HomeAuth />} />
        <Route path="/login" element={<Login />} />
        <Route path="/learner-dashboard" element={<LearnerDashboard />} />
        <Route path="/reviewer-dashboard" element={<ReviewerDashboard />} />
        <Route path="/learner-assignment-view/:id" element={<LearnerAssignmentView />} />
        <Route path="/reviewer-assignment-view" element={<ReviewerAssignmentView />} />
      </Routes>
    </div>
  );
}

export default App;