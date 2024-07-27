import React, {useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './AssignmentView.css';

function LearnerAssignmentView({ assignment }) {
  // State to store assignment data
  const { id } = useParams();
  const [assignment, setAssignment] = useState(null);
  const [statusList, setStatusList] = useState(null);
  const [numberList, setNumberList] = useState(null);

  const [assignmentNumber, setAssignmentNumber] = useState('');
  const [assignmentStatus, setAssignmentStatus] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [branchName, setBranchName] = useState('');

  const navigate = useNavigate();

    // Retrieve Assignment Based on Id
    useEffect(() => {
      axios.get(`/api/assignments/${id}`) // Adjust the API
        .then(response => {

          setAssignment(response.assignment);
          setStatusList(response.statusList);
          setNumberList(response.numberList);

          console.log('Successful user assignment retrieval and loading');
        })
        .catch(error => console.error('Error fetching assignment', error));
    }, [id]);

     Handle changes to inputs - set values
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

  // save - method
  function saveAssignment() {

  }

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
    {/* Duplicate temp for displaying new information*/}
    <div className="assignment-view">
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
        </label>
        <br/>
        <label>
          GitHub URL:
          <input type="text" value={assignment.githubUrl} onChange={handleGithubUrlChange} />
        </label>
        <br/>
        <label>
          Branch Name:
          <input type="text" value={assignment.branch} onChange={handleBranchChange} />
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
