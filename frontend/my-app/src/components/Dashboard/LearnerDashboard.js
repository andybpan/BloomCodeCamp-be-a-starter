import React from 'react';
import './LearnerDashboard.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// 1. need an icon or element to be created to be displayed in the inReview section
  // 2. need logic to open the LAV, insert the data
  // 3. the LAV then needs logic to PUT/update the logic
  // 4. if submit - the icon would also need to move
  // 5. otherwise, the user just backs out and the icon stays in in-review
function Dashboard() {
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState({ needsWork: [], completed: [], inReview: [] });

  // GET ALL user assignments - when page displays
  // useEffect is a keyword & will trigger after the DOM loads
  useEffect(() => {
    axios.get('/api/assignments') // Adjust the API - i do not remember what the api is called lol
      .then(response => {
        const fetchedAssignments = { needsWork: [], completed: [], inReview: [] };
        response.data.forEach(assignment => {
          switch(assignment.status) {
            case 'Needs Work': // check status labels
              fetchedAssignments.needsWork.push(assignment);
              break;
            case 'Completed':
              fetchedAssignments.completed.push(assignment);
              break;
            case 'In Review':
              fetchedAssignments.inReview.push(assignment);
              break;
            default:
              // Handle unexpected status - handle later
          }
        });
        setAssignments(fetchedAssignments);
      })
      .catch(error => console.error('Error fetching assignments', error));
  }, []);

  // Helper method? - build and display all assignments in each section

  // Helper method2? - builds the icon template?

  // Question - if an assignment is updated, and status changes, then the icon needs to be moved...

  // Create New Assignment Request - retrieves request data and opens the LAV
  function createAssignment() {
    axios.post('/api/assignments') // POST request without data
      .then(response => {
        const newAssignment = response.data;
        setAssignments(prev => ({
          ...prev,
          needsWork: [...prev.needsWork, newAssignment]  // Add the new assignment to the 'needsWork' array
        }));
        console.log('Assignment created successfully:', newAssignment);  // Log to the console - maybe just log id?
        navigate(`/learnerAssignmentView/${newAssignment.id}`); // pass in the assignment id - need to update LAV later
      })
      .catch(error => console.error('Error creating assignment', error));
  }

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
