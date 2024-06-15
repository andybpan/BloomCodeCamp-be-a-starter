import React from 'react';
import './ReviewerDashboard.css';

function Dashboard() {
  return (
    <div className="ReviewerDashboard">
      <header className="Dashboard-header">
        <h1>Reviewer's Dashboard</h1>
      </header>
      <button className="logout-button">Log Out</button>
      <main className="Dashboard-main">
        <section className="container in-review">
          <h2 className="container-title">In Review</h2>
        </section>
        <section className="container submitted-resubmitted">
          <h2 className="container-title">Submitted & Resubmitted</h2>
        </section>
        <section className="container completed">
          <h2 className="container-title">Completed</h2>
        </section>
      </main>
      <footer className="Dashboard-footer">
        <p>Hello :D</p>
      </footer>
    </div>
  );
}

export default Dashboard;
