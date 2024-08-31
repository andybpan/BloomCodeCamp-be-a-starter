import React from 'react';
import './ReviewerDashboard.css';

function Dashboard() {
  return (
    <div className="ReviewerDashboard">
      <header className="Dashboard-header">
        <h1>Reviewer's Dashboard</h1>
      </header>
      <div className="button-container">
        <button className="button-style">Log Out</button>
      </div>
      <main className="Dashboard-main">
        <section className="container in-review">
          <h2 className="container-title">In Review</h2>
          <div className="cards-container">
            {assignments.inReview.map(assignment => (
              <AssignmentCard key={assignment.id} assignment={assignment} />
            ))}
          </div>
        </section>
        <section className="container submitted-resubmitted">
          <h2 className="container-title">Submitted & Resubmitted</h2>
        </section>
        <section className="container completed">
          <h2 className="container-title">Completed</h2>
        </section>
      </main>
      <footer className="Dashboard-footer">
        <p>Hello Reviewer!</p>
      </footer>
    </div>
  );
}

export default Dashboard;
