import React, { useState } from 'react';
import './AssignmentView.css';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from "lucide-react";

function ReviewerAssignmentView() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [assignment, setAssignment] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [updatedAssignment, setUpdatedAssignment] = useState({
    number: '',
    status: '',
    githubUrl: '',
    branchName: '',
    reviewVideoUrl: '',
  });

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

  // Save assignment as Completed
  const handleSaveCompleted = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await axios.put(`/api/assignments/${id}/review`, {
        ...updatedAssignment,
        status: 'Completed',
      });
      console.log('Assignment marked as Completed');
      navigate('/ReviewerDashboard');
    } catch (err) {
      setError(err.message);
      console.error('Error updating assignment status:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Save assignment as Needs Update
  const handleSaveNeedsUpdate = async () => {
    setIsLoading(true);
    try {
      await axios.put(`/api/assignments/${id}/review`, {
        ...updatedAssignment,
        status: 'Needs Update',
      });
      console.log('Assignment marked as Needs Update');
      navigate('/ReviewerDashboard');
    } catch (err) {
      setError(err.message);
      console.error('Error updating assignment status:', err);
    } finally {
      setIsLoading(false);
    }
  };


  if (isLoading){
    return (
      <div>
        <Loader2 className="loading-spinner" />
        <p>loading assignment ... </p>
      </div>
    )
  }

  if (error) {
    return (
     <div>
       {error}
     </div>
   )
  }


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
