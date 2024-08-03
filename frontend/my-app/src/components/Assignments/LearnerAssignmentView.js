import React, {useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './AssignmentView.css';

function LearnerAssignmentView({ assignment }) {
  const { id } = useParams();
  const navigate = useNavigate();

  // Store current and new Assignment data
  const [assignment, setAssignment] = useState(null);
  const [statusList, setStatusList] = useState(null);
  const [numberList, setNumberList] = useState(null);
  const [updatedAssignment, setUpdatedAssignment] = useState({
    number: '',
    status: '',
    githubUrl: '',
    branchName: '',
  });

  // Retrieve AssignmentDTO Based on Id
  useEffect(() => {
    axios.get(`/api/assignments/${id}`) // Adjust the API
      .then(response => {
        // AssignmentDTO data
        const data = response.data;
        setAssignment(data.assignment);
        setStatusList(data.statusList);
        setNumberList(data.numberList);

        // Set current assignment data ?
        setUpdatedAssignment({
          number: data.assignment.number,
          status: data.assignment.status,
          githubUrl: data.assignment.githubUrl,
          branchName: data.assignment.branchName,
        });
        console.log('Successful user assignment retrieval and loading');
      })
      .catch(error => console.error('Error fetching assignment', error));
  }, [id]);

  // Generic handleChange method
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUpdatedAssignment((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Submit form method - with update attributes
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put(`/api/assignments/${id}`, {
      number: parseInt(updatedAssignment.number, 10), // Convert to integer before sending
      githubUrl: updatedAssignment.githubUrl,
      branch: updatedAssignment.branchName,
    })
      .then(response => {
        console.log('Assignment updated successfully');
        navigate('/LearnerDashboard');
      })
      .catch(error => console.error('Error updating assignment', error));
  };

  // Added navigation logic to go back to Dashboard
  const handleBack = () => {
      console.log("Navigating back to Learner's dashboard");
      navigate('/LearnerDashboard')
  };

  // save - method
  const saveAssignment = () => {
    axios.put(`/api/assignments/${id}`, updatedAssignment)
      .then(response => {
        setAssignment(response.data);
        console.log('Assignment updated successfully');
      })
      .catch(error => console.error('Error updating assignment', error));
  };

// Assignment from java Object
//    id: Long
//    status: String
//    number: Integer
//    githubUrl: String
//    branch: String
//    reviewVideoUrl: String
//    user: User
//    codeReviewer: User

// Assignment ResponseDto - contains assignment, status list and number list
// Things to do:
    // 1. map the assignment number (list) to the drop down box
    // 2. double check if status is modified only in the back end or requires write from front end
    //

  return (
    <div className="assignment-view">
      {assignment ?  (
        <h2>Assignment #assignment.number : assignment.status</h2>
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
            <input
              type="select"
              name="number"
              value={updatedAssignment.assignmentNumber}
              onChange={handleChange}
            />
          </label>
          <br/>
          <label>
            GitHub URL:
            <input
              type="text"
              name="githubUr"
              value={updatedAssignment.branchName}
              onChange={handleChange}
            />
            <input type="text" value={assignment.githubUrl} onChange={handleGithubUrlChange} />
          </label>
          <br/>
          <label>
            Branch Name:
            <input
              type="text"
              name="branchName"
              value={updatedAssignment.branchName}
              onChange={handleChange}
            />
          </label>
          <br/>
          <div className="buttons">
            <button type="submit">Submit</button>
            <button type="button" onClick={handleBack}>Back to Dashboard</button>
          </div>
        </form>
      ) : (
        <p> Loading... </p>
      )}
    </div>
  );
}

export default LearnerAssignmentView;
