import logo from './logo.svg';
import './App.css';

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
    <div className = "App">
      <div>
        <nav>
          <ul>
            <li><Link to="/">Home Page</Link></li>
            <li><Link to="/HomeAuth">Home Authenticated</Link></li>
            <li><Link to="/Login">Login</Link></li>
            <li><Link to="/LearnerDashboard">Learner Dashboard</Link></li>
            <li><Link to="/ReviewerDashboard">Reviewer Dashboard</Link></li>
            <li><Link to="/LearnerAssignmentView">Learner Assignment View</Link></li>
            <li><Link to="/ReviewerAssignmentView">Reviewer Assignment View</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<HomePublic />} />
          <Route path="/HomeAuth" element={<HomeAuth />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/LearnerDashboard" element={<LearnerDashboard />} />
          <Route path="/ReviewerDashboard" element={<ReviewerDashboard />} />
          <Route path="/LearnerAssignmentView" element={<LearnerAssignmentView />} />
          <Route path="/ReviewerAssignmentView" element={<ReviewerAssignmentView />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
