import React, {useState, useEffect } from 'react';
import './AssignmentView.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { Routes, Route, Link } from 'react-router-dom';

function LearnerAssignmentView({ assignment }) {
  // State to store assignment data
  const [assignmentNumber, setAssignmentNumber] = useState('');
  const [assignmentStatus, setAssignmentStatus] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [branchName, setBranchName] = useState('');

  const navigate = useNavigate();

    // retrieve the assignment based on id -
    useEffect(() => {
      axios.get('/api/assignments/{assignment.id}') // Adjust the API
        .then(response => {

          // use assignment to display to dom
          console.log('Successful user assignment retrieval and loading');
        })
        .catch(error => console.error('Error fetching assignment', error));
    }, []);

    // Handle changes to inputs
    const handleNumberChange = (event) => {
        setAssignmentNumber(event.target.value);
    };

    const handleStatusChange = (event) => {
        setAssignmentStatus(event.target.value);
    };

    const handleGithubUrlChange = (event) => {
        setGithubUrl(event.target.value);
    };

    const handleBranchChange = (event) => {
        setBranchName(event.target.value);
    };

    // Placeholder function for form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Submitted:', { assignmentNumber, assignmentStatus, githubUrl, branchName });
        // Add logic to process submission here
        navigate('/LearnerDashboard')
    };

    // Added navigation logic to go back to Dashboard
    const handleBack = () => {
        console.log("Navigating back to Learner's dashboard");
        navigate('/LearnerDashboard')
    };

    return (
        <div className="assignment-view">
            <h2>Assignment #{assignmentNumber} : {assignmentStatus}</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Assignment Number:
                    <select value={assignmentNumber} onChange={handleNumberChange}>
                        {/* Populate options here */}
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        {/* Add more options as needed */}
                    </select>
                </label>
                <br/>
                <label>
                    GitHub URL:
                    <input type="text" value={githubUrl} onChange={handleGithubUrlChange} />
                </label>
                <br/>
                <label>
                    Branch Name:
                    <input type="text" value={branchName} onChange={handleBranchChange} />
                </label>
                <br/>
                <div className="buttons">
                    <button type="submit">Submit</button>
                    <button type="button" onClick={handleBack}>Back to Dashboard</button>
                </div>
            </form>
        </div>
    );
}

export default LearnerAssignmentView;
