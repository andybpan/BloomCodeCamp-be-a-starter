import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AssignmentCard.css';

// escape to java in order to access assignment properties or values
function AssignmentCard({ assignment }) {
  const navigate = useNavigate();

  // Navigate to a detailed view of the assignment using its ID
  const handleClick = () => {
    navigate(`/assignment/${assignment.id}`);
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
