import React from 'react';
import './LearnerDashboard.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {

  const navigate = useNavigate();

  const createNewAssignment = () => {
    // create Assignment Logic

    // navigate to LearnerAssignmentView
    navigate('/LearnerAssignmentView')
  };

  return (
    <div className="LearnerDashboard">
      <header className="Dashboard-header">
        <h1>Learner's Dashboard</h1>
      </header>
      <div className="button-container">
        <button className="button-style">Create New Assignment</button>
        <button className="button-style">Log Out</button>
      </div>
      <main className="Dashboard-main">
        <section className="container needs-work">
          <h2 className="container-title">Needs Work</h2>
        </section>
        <section className="container completed">
          <h2 className="container-title">Complete</h2>
        </section>
        <section className="container in-review">
          <h2 className="container-title">In Review</h2>
        </section>
      </main>
      <footer className="Dashboard-footer">
        <p>Hello :D</p>
      </footer>
    </div>
  );
}

export default Dashboard;
