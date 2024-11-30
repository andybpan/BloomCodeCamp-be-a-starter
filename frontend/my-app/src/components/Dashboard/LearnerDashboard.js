import React, { useState, useEffect } from 'react';
import './LearnerDashboard.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AssignmentCard from './AssignmentCard';

// 1. Retrieve and display each assignment in their corresponding status section
  // display style and css needs work
// 2. need logic to open each assignment in the LAV, insert the data
  // need to update assignmentCard navigation, retrieval and passing data
// 3. the LAV then needs logic to PUT/update the logic
  // check if useEffect will trigger
// 4. if submit - the icon would also need to move
  // already added logic to handle where the element goes
  // need to update to simple assignment
// 5. otherwise, the user just backs out and the icon stays in in-review
  // check to clear information from LAV js

const mockAssignments = [
  { id: 1, title: 'Assignment 1', status: 'Needs Work' },
  { id: 2, title: 'Assignment 2', status: 'Completed' },
  { id: 3, title: 'Assignment 3', status: 'In Review' },
  { id: 4, title: 'Assignment 4', status: 'Needs Work' },
  { id: 5, title: 'Assignment 5', status: 'Completed' },
  { id: 6, title: 'Assignment 6', status: 'In Review' },
  { id: 7, title: 'Assignment 7', status: 'Needs Work' },
  { id: 8, title: 'Assignment 8', status: 'Completed' },
  { id: 9, title: 'Assignment 9', status: 'In Review' },
  { id: 10, title: 'Assignment 10', status: 'Needs Work' },
  { id: 11, title: 'Assignment 11', status: 'Completed' },
  { id: 12, title: 'Assignment 12', status: 'In Review' }
];

// idea Refactor Dashboard into a component?
function Dashboard() {
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState({ needsWork: [], completed: [], inReview: [] });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // GET ALL user assignments - when page displays
  // useEffect is a keyword & will trigger after the DOM loads
  useEffect(() => {
    const fetchAssignments = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('/api/assignments'); // double check route
        const fetchedAssignments = { needsWork: [], completed: [], inReview: [] };
        response.data.forEach(assignment => {
          const assignmentSummary = {
            id: assignment.id,
            status: assignment.status
          };

          switch (assignment.status) {
            case 'Needs Work':
              fetchedAssignments.needsWork.push(assignmentSummary);
              break;
            case 'Completed':
              fetchedAssignments.completed.push(assignmentSummary);
              break;
            case 'In Review':
              fetchedAssignments.inReview.push(assignmentSummary);
              break;
            default:
              console.log('Unhandled status:', assignment.status);
          }
        });

        setAssignments(fetchedAssignments);
      } catch (error) {
        setError('Error fetching assignments: ' + error.message);
        console.error('Error fetching assignments', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  // Update: assignment status
  // Note: Assignment will be updated with more attributes / info
  // TO DO: retrieve attributes and store into assignment item to put
  // Right now: stores the new status to the corresponding assignment ID for layout
  const updateAssignmentStatus = async (assignmentId, newStatus) => {
    try {
      const response = await axios.put(`/api/assignments/${assignmentId}`, { status: newStatus });
      const updatedAssignment = response.data;
      setAssignments(prevAssignments => {
        const newNeedsWork = prevAssignments.needsWork.filter(a => a.id !== assignmentId);
        const newCompleted = prevAssignments.completed.filter(a => a.id !== assignmentId);
        const newInReview = prevAssignments.inReview.filter(a => a.id !== assignmentId);

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
            break;
        }

        return {
          needsWork: newNeedsWork,
          completed: newCompleted,
          inReview: newInReview
        };
      });
    } catch (error) {
      console.error('Error updating assignment status', error);
    }
  };


  // The DOM will map and display the object
  // The real Question is - how do we get the new item to be displayed?
  // add it to the list and in back ground let it update?
  // just stores the id and status - will be send over the LAV and used to retrieve the data?

  // Create New Assignment Request - retrieves request data and opens the LAV
  function createAssignment() {
    setIsLoading(true)
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
      .catch(error =>
        setError(error.message)
        console.error('Error creating assignment', error));
    setIsLoading(false)
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

  if (error) {
    return (
      <div>
        {error.message}
      </div>
    )
  }

  if (isLoading) {
    return (
      <div>
        Attempting to load assignments ...
      </div>
    )
  }

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
          <div className="cards-container">
            {assignments.needsWork.map(assignment => (
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
        <section className="container in-review">
          <h2 className="container-title">In Review</h2>
          <div className="cards-container">
            {assignments.inReview.map(assignment => (
              <AssignmentCard key={assignment.id} assignment={assignment} />
            ))}
          </div>
        </section>
        <section className="container Mock">
          <h2 className="container-title">Mock Up</h2>
          <div className="cards-container">
            {mockAssignments.map(assignment => (
              <AssignmentCard key={assignment.id} assignment={assignment} />
            ))}
          </div>
        </section>
        {/* <section className="container Mock">
          <h2 className="container-title">Mock Up</h2>
          <div className="cards-container">
            {mockAssignments.map(assignment => (
              <AssignmentCard key={assignment.id} assignment={assignment} />
            ))}
          </div>
        </section> */}
      </main>
      <footer className="Dashboard-footer">
        <p>Hello :D Learner!</p>
      </footer>
    </div>
  );
}

export default Dashboard;
