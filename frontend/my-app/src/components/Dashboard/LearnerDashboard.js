import React, { useState, useEffect } from 'react';
import './LearnerDashboard.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// 1. Retrieve and display each assignment in their corresponding status section
  // 2. need logic to open each assignment in the LAV, insert the data
  // 3. the LAV then needs logic to PUT/update the logic
  // 4. if submit - the icon would also need to move
  // 5. otherwise, the user just backs out and the icon stays in in-review
function Dashboard() {
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState({ needsWork: [], completed: [], inReview: [] });

  function createAssignmentIcon(assignment) {
    return <AssignmentIcon key={assignment.id} assignment={assignment} />;
  }

  // GET ALL user assignments - when page displays
  // useEffect is a keyword & will trigger after the DOM loads
  useEffect(() => {
    axios.get('/api/assignments') // Adjust the API - I do not remember what the api end point path is lol
      .then(response => {
        const fetchedAssignments = { needsWork: [], completed: [], inReview: [] };
         response.data.forEach(assignment => {
            const assignmentSummary = {
              id: assignment.id,
              status: assignment.status
            };

          switch(assignment.status) {
            // double check status labels
            case 'Needs Work':
              fetchedAssignments.needsWork.push(assignment);
              break;
            case 'Completed':
              fetchedAssignments.completed.push(assignment);
              break;
            case 'In Review':
              fetchedAssignments.inReview.push(assignment);
              break;
            default:
              // Handle unexpected status - log it
              console.log('Unhandled status:', assignment.status);
          }
        });

        setAssignments(fetchedAssignments);
        console.log('Successful user assignment retrieval and loading');
      })
      .catch(error => console.error('Error fetching assignments', error));
  }, []);

  // Update - assignment status
  // note - the assignment will be updated with more information - for now well just do status
  function updateAssignmentStatus(assignmentId, newStatus) {
    // insert request data - like github link, assignment type, etc..
    axios.put(`/api/assignments/${assignmentId}`, { status: newStatus })
      .then(response => {
        const updatedAssignment = response.data; // Assuming the response includes the updated assignment
        setAssignments(prevAssignments => {
          // Creating new objects for each category to avoid direct mutation
          const newNeedsWork = [...prevAssignments.needsWork.filter(a => a.id !== assignmentId)];
          const newCompleted = [...prevAssignments.completed.filter(a => a.id !== assignmentId)];
          const newInReview = [...prevAssignments.inReview.filter(a => a.id !== assignmentId)];

          // Adding the updated assignment to the appropriate section based on its new status
          switch (newStatus) {
            case 'Needs Work':
              newNeedsWork.push(updatedAssignment);
              break;
            case 'Completed':
              newCompleted.push(updatedAssignment);
              break;
            case 'In Review':
              newInReview.push(updatedAssignment);
              break;
            default:
              // Handle any unexpected status
              break;
          }

          // Return the new state object
          return {
            needsWork: newNeedsWork,
            completed: newCompleted,
            inReview: newInReview
          };
        });
      })
      .catch(error => {
        console.error('Error updating assignment status', error);
      });
  }


  // Helper method2? - builds the icon template?
  // just stores the id and status - will be send over the LAV and used to retrieve the data?

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

  // Use Axios interceptor - attache Authentication Bearer Token to all requests:
  axios.interceptors.request.use(
    config => {
      const token = localStorage.getItem('token'); // retrieve token from localStorage
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

  return (
    <div className="LearnerDashboard">
      <header className="Dashboard-header">
        <h1>Learner's Dashboard</h1>
      </header>
      <div className="button-container">
        <button className="button-style" onClick={createAssignment} >Create New Assignment</button>
        <button className="button-style">Log Out</button>
      </div>
      <main className="Dashboard-main">
        <section className="container needs-work">
          <h2 className="container-title">Needs Work</h2>
          {assignments.needsWork.map(assignment => (
            <AssignmentCard key={assignment.id} assignment={assignment} />
          ))}
        </section>
        <section className="container completed">
          <h2 className="container-title">Completed</h2>
          {assignments.completed.map(assignment => (
            <AssignmentCard key={assignment.id} assignment={assignment} />
          ))}
        </section>
        <section className="container in-review">
          <h2 className="container-title">In Review</h2>
          {assignments.inReview.map(assignment => (
            <AssignmentCard key={assignment.id} assignment={assignment} />
          ))}
        </section>
      </main>
      <footer className="Dashboard-footer">
        <p>Hello :D Learner!</p>
      </footer>
    </div>
  );
}

export default Dashboard;
