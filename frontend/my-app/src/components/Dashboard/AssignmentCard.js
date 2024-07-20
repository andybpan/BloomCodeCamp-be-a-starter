import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AssignmentCard.css';

// escape to javascript in order to access assignment attributes
function AssignmentCard({ assignment }) {
  const navigate = useNavigate();

  // Navigate to a detailed view of the assignment using its ID
  const handleClick = () => {
    // navigate(`/learnerAssignmentView/${assignment.id}`);
    // need to update LAV to handle the logic
    navigate(`/learnerAssignmentView`);
  };

  // Note: the actual assignment object does not have a title
  return (
    <div class="cardStyle" onClick={handleClick}>
      <h3>{assignment.title || "No Title"}</h3> {/* Display the title or a placeholder */}
      <p>Status: {assignment.status}</p> {/* Display the status */}
    </div>
  );
}

export default AssignmentCard;
