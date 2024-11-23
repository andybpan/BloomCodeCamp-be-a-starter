import React from 'react';
import './ReviewerDashboard.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState({ inReview: [], submitted: [], completed: [] });
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    axios.get('/api/assignments') // Adjust the API - I do not remember what the api end point path is lol
      .then(response => {
        const fetchedAssignments = { inReview: [], submitted: [], completed: [] };
        response.data.forEach(assignment => {
          const assignmentSummary = {
            id: assignment.id,
            status: assignment.status
          };
          // double check status labels
          // stores assignment summaries
          switch(assignment.status) {
            case 'In Review':
              fetchedAssignments.inReview.push(assignmentSummary);
              break;
            case 'Submitted':
              fetchedAssignments.submitted.push(assignmentSummary);
              break;
            case 'Completed':
              fetchedAssignments.completed.push(assignmentSummary);
              break;
            default:
              // Handle unexpected status - log it
              console.log('Unhandled status:', assignment.status);
          }
        });

        setAssignments(fetchedAssignments);
        console.log('Successful user assignments retrieval and loading');
      })
      .catch(error =>
        console.error('Error fetching assignments', error)
        setError(error.message)
      );
      setIsLoading(false)
  }, []);

  if (error) {
    return (
      <div>
        <p>{error}</p>
         <p>please refresh and try again</p>
      </div>
    )
  }


  // insert spin icon
  if (isLoading) {
    return (
      <div>
        Loading Dashboard ...
      </div>
    )
  }

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
            <div className="cards-container">
              {assignments.submitted.map(assignment => (
                <AssignmentCard key={assignment.id} assignment={assignment} />
              ))}
            </div>
        </section>
        <section className="container completed">
          <h2 className="container-title">Completed</h2>
            <div className="cards-container">
              {assignments.completed.map(assignment => (
                <AssignmentCard key={assignment.id} assignment={assignment} />
              ))}
            </div>
        </section>
      </main>
      <footer className="Dashboard-footer">
        <p>Hello Reviewer!</p>
      </footer>
    </div>
  );
}

export default Dashboard;
