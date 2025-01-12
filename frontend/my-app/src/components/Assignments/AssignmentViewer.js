import React from 'react';
import { Loader2 } from "lucide-react";
import './AssignmentViewer.css';

function AssignmentViewer({
  isOpen,
  onClose,
  assignment,
  isReviewer = false,
  isLoading,
  error,
  onSubmit,
  onReject,
  onSave,
  onChange,s
  assignmentEnums = [],
}) {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  if (isLoading) {
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="loading-container">
            <Loader2 className="loading-spinner" />
            <p>Loading assignment...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="error-container">
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Assignment #{assignment?.number}: {assignment?.status}</h2>
        <form onSubmit={handleSubmit}>
          {!isReviewer ? (
            // Learner View
            <>
              <label>
                Assignment Number:
                <select
                  name="number"
                  value={assignment?.number}
                  onChange={onChange}
                >
                  {assignmentEnums.map(enumItem => (
                    <option key={enumItem.number} value={enumItem.number}>
                      {enumItem.number} - {enumItem.type}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                GitHub URL:
                <input
                  type="text"
                  name="githubUrl"
                  value={assignment?.githubUrl}
                  onChange={onChange}
                />
              </label>
              <label>
                Branch Name:
                <input
                  type="text"
                  name="branchName"
                  value={assignment?.branchName}
                  onChange={onChange}
                />
              </label>
              <label>
                Review Video URL:
                <input
                  type="text"
                  name="reviewVideoUrl"
                  value={assignment?.reviewVideoUrl}
                  readOnly
                />
              </label>
            </>
          ) : (
            // Reviewer View
            <>
              <label>
                GitHub URL:
                <input type="text" value={assignment?.githubUrl} readOnly/>
              </label>
              <label>
                Branch Name:
                <input type="text" value={assignment?.branchName} readOnly/>
              </label>
              <label>
                Review Video URL:
                <input
                  type="text"
                  name="reviewVideoUrl"
                  value={assignment?.reviewVideoUrl}
                  onChange={onChange}
                />
              </label>
            </>
          )}

          <div className="button-container">
            <button type="submit">Submit</button>
            {isReviewer && (
              <button type="button" onClick={onReject}>Reject</button>
            )}
            {!isReviewer && (
              <button type="button" onClick={onSave}>Save</button>
            )}
            <button type="button" onClick={onClose}>Close</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AssignmentViewer;