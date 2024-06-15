import React from 'react';
import './LearnerDashboard.css';

function Dashboard() {
  return (
    <div className="LearnerDashboard">
      <header className="Dashboard-header">
        <h1>Learner's Dashboard</h1>
      </header>
      <button className="logout-button">Log Out</button>
      <button className="logout-button">Create New Assignment</button>
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
