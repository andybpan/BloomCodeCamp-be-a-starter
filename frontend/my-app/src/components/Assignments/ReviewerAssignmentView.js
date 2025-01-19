import React, { useState } from 'react';
import './AssignmentView.css';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from "lucide-react";

function ReviewerAssignmentView() {
  const [assignmentNumber, setAssignmentNumber] = useState('');
  const [assignmentStatus, setAssignmentStatus] = useState('');

  const [githubUrl, setGithubUrl] = useState('https://github.com/example/repo'); // Example URL
  const [branchName, setBranchName] = useState('main'); // Example branch name
  const [reviewVideoUrl, setReviewVideoUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
   const dashboardNavigate = useNavigate();

  // Fetch assignment data
  useEffect(() => {
    const fetchAssignment = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`/api/assignments/${id}`);
        const data = response.data;

        setAssignment(data.assignment);
        setUpdatedAssignment({
          number: data.assignment.number,
          status: data.assignment.status,
          githubUrl: data.assignment.githubUrl,
          branchName: data.assignment.branchName,
          reviewVideoUrl: data.assignment.reviewVideoUrl
        });

        console.log('Successfully retrieved assignment data');
      } catch (err) {
        setError(err.message);
        console.error('Error fetching assignment:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAssignment();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUpdatedAssignment(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submitted:', { assignmentNumber, assignmentStatus, githubUrl, branchName, reviewVideoUrl });
    // Add logic to process submission here

    // navigation logic
    dashboardNavigate('/ReviewerDashboard')
  };

    const handleReject = () => {
      console.log('Assignment rejected');
      setAssignmentStatus('Rejected'); // Change status to rejected
      // Additional logic for rejection can be implemented here

      // navigation logic
      dashboardNavigate('/ReviewerDashboard')
    };

    const handleBack = () => {
      console.log("Navigating back to Reviewer's dashboard");
      dashboardNavigate('/ReviewerDashboard')
    };

    if (isLoading):
      return (
        <div>
          <Loader2 className="loading-spinner" />
          <p>loading assignment ... </p>
        </div>
      )

    if (error):
       return (
         <div>
           {error}
         </div>
       )

    return (
      <div className="assignment-view">
        <h2>Assignment #{assignmentNumber} : {assignmentStatus}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            GitHub URL:
            <input type="text" value={githubUrl} readOnly/>
          </label>
          <br/>
          <label>
            Branch Name:
            <input type="text" value={branchName} readOnly/>
          </label>
          <br/>
          <label>
            Review Video URL:
            <input type="text" value={reviewVideoUrl} onChange={handleReviewVideoUrlChange} />
          </label>
          <br/>
          <div className="buttons">
            <button type="submit">Submit</button>
            <button type="button" onClick={handleReject}>Reject</button>
            <button type="button" onClick={handleBack}>Back to Dashboard</button>
          </div>
        </form>
      </div>
    );
}

export default ReviewerAssignmentView;
