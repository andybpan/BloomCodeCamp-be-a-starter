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
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const [assignmentEnums, setAssignmentEnums] = useState([]);
  const [updatedAssignment, setUpdatedAssignment] = useState({
    number: '',
    status: '',
    githubUrl: '',
    branchName: '',
    reviewVideoUrl: '',
  });

  // Retrieve AssignmentDTO Based on Id
  useEffect(() => {
    const fetchAssignment = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`/api/assignments/${id}`);
        const data = response.data;

        setAssignment(data.assignment);
        setStatusList(data.statusList);
        setAssignmentEnums(data.assignmentEnums); // Fixed: was using undefined assignmentEnums

        setUpdatedAssignment({
          number: data.assignment.number,
          status: data.assignment.status,
          githubUrl: data.assignment.githubUrl,
          branchName: data.assignment.branchName,
          reviewVideoUrl: data.assignment.reviewVideoUrl
        });

        console.log('Successful user assignment retrieval and loading');
      } catch (err) {
        setError(err.message);
        console.error('Error fetching assignment:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAssignment();
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
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await axios.put(`/api/assignments/${id}`, {
        number: updatedAssignment.number,
        githubUrl: updatedAssignment.githubUrl,
        branch: updatedAssignment.branchName,
      });
      console.log('Assignment updated successfully');
      navigate('/LearnerDashboard');
    } catch (err) {
      setError(err.message);
      console.error('Error updating assignment:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Added navigation logic to go back to Dashboard
  const handleBack = () => {
      console.log("Navigating back to Learner's dashboard");
      navigate('/LearnerDashboard')
  };

  // save - method
//  add save display
  const saveAssignment = async () => {
    setIsLoading(true);
    try {
      const response = await axios.put(`/api/assignments/${id}`, updatedAssignment);
      setAssignment(response.data);
      console.log('Assignment updated successfully');
    } catch (err) {
      setError(err.message);
      console.error('Error updating assignment:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return <div>
      {error}
    </div>
  }

  if (isLoading) {
    return <div>
      loading assignments ...
    </div>
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
    // 3. Add a loading state for the submission and completion

  return (
    <div className="assignment-view">
      {assignment ?  (
        <h2>Assignment #assignment.number : assignment.status</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Assignment Number:
            <select
              name="number"
              value={updatedAssignment.number}
              onChange={handleChange}
            >
              {assignmentEnums.map(enumItem => (
                <option key={enumItem.number} value={enumItem.number}>
                  {enumItem.number} - {enumItem.type}
                </option>
              ))}
            </select>
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
          <label>
            Review Video URL:
            <input
              type="text"
              name="branchName"
              value={updatedAssignment.reviewVideoUrl}
              readOnly/
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
