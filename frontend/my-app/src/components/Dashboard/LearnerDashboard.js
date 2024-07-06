import React from 'react';
import './LearnerDashboard.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// 1. need an icon or element to be created to be displayed in the inReview section
  // 2. need logic to open the LAV, insert the data
  // 3. the LAV then needs logic to PUT/update the logic
  // 4. if submit - the icon would also need to move
  // 5. otherwise, the user just backs out and the icon stays in in-review
function Dashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  // Create New Assignment Request - retrieves request data and opens the LAV
  const createNewAssignment = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/assignments', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}` // Include the token in the Authorization header
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Assignment created successfully:', data);

      navigate('/LearnerAssignmentView', { state: { assignment: data } });

    } catch (error) {
      console.error('Error creating new assignment:', error);
    }
  };

  return (
    <div className="LearnerDashboard">
      <header className="Dashboard-header">
        <h1>Learner's Dashboard</h1>
      </header>
      <div className="button-container">
        <button className="button-style" onClick={createNewAssignment} >Create New Assignment</button>
        <button className="button-style">Log Out</button>
      </div>
      <main className="Dashboard-main">
        <section className="container needs-work">
          <h2 className="container-title">Needs Work</h2>
        </section>
        <section className="container completed">
          <h2 className="container-title">Completed</h2>
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
