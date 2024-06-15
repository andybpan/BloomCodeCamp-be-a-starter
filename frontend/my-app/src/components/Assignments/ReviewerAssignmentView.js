import React, { useState } from 'react';
import './AssignmentView.css';

function ReviewerAssignmentView() {
    const [assignmentNumber, setAssignmentNumber] = useState('');
    const [assignmentStatus, setAssignmentStatus] = useState('');

    const [githubUrl, setGithubUrl] = useState('https://github.com/example/repo'); // Example URL
    const [branchName, setBranchName] = useState('main'); // Example branch name
    const [reviewVideoUrl, setReviewVideoUrl] = useState('');

    const handleReviewVideoUrlChange = (event) => {
        setReviewVideoUrl(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Submitted:', { assignmentNumber, assignmentStatus, githubUrl, branchName, reviewVideoUrl });
        // Add logic to process submission here
    };

    const handleReject = () => {
        console.log('Assignment rejected');
        setAssignmentStatus('Rejected'); // Change status to rejected
        // Additional logic for rejection can be implemented here
    };

    const handleBack = () => {
        console.log('Navigating back to the dashboard');
        // Add navigation logic here
    };

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
