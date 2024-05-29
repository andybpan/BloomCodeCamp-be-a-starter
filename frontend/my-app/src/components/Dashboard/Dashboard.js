import React from 'react';
import './Dashboard.css';

function Dashboard() {
  return (
    <div className="Dashboard">
      <header className="Dashboard-header">
        <h1>Learner's Dashboard</h1>
      </header>
      <button className="logout-button">Log Out</button>
      <main className="Dashboard-main">
        <section className="container in-review">
          <h2 className="container-title">In Review</h2>
        </section>
        <section className="container submitted-resubmitted">
          <div className="section-header">
            <h2 className="container-title"> <button className="plus-button">+</button> Submitted & Resubmitted</h2>

          </div>
        </section>
        <section className="container completed">
          <h2 className="container-title">Completed</h2>
        </section>
      </main>
      <footer className="Dashboard-footer">
        <p>Hello World</p>
      </footer>
    </div>
  );
}

export default Dashboard;
