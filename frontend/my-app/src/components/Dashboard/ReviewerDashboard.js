import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Loader2 } from "lucide-react"
import './ReviewerDashboard.css';

interface Assignment {
  id: string;
  status: 'In Review' | 'Submitted' | 'Completed';
}

interface AssignmentGroups {
  inReview: Assignment[];
  submitted: Assignment[];
  completed: Assignment[];
}

function Dashboard() {
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState({ inReview: [], submitted: [], completed: [] });
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const fetchAssignments = async () => {
    try {
      setIsLoading(true);
      setError('');

      const response = await axios.get('/api/assignments');
      const fetchedAssignments: AssignmentGroups = {
        inReview: [],
        submitted: [],
        completed: []
      };

      response.data.forEach((assignment: Assignment) => {
        const assignmentSummary = {
          id: assignment.id,
          status: assignment.status
        };

        try {
          switch(assignment.status) {
            case 'In Review':
              fetchedAssignments.inReview.push(assignmentSummary);
              break;
            case 'Submitted':
              fetchedAssignments.submitted.push(assignmentSummary);
              break;
            case 'Completed':
              fetchedAssignments.completed.push(assignmentSummary);
              break;
            default:
              console.warn('Unhandled assignment status:', assignment.status);
          }
        } catch (sortError) {
        console.error('Error sorting assignment:', sortError);
      }
    });

    setAssignments(fetchedAssignments);

    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || 'Failed to fetch assignments');
        console.error('API Error:', error.response?.data);
      } else {
        setError('An unexpected error occurred');
        console.error('Unexpected Error:', error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);


  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="text-center space-y-4">
          <h2 className="text-xl font-semibold text-red-600">
            Unable to load dashboard
          </h2>
          <p className="text-gray-600">
            {error}
          </p>
          <Button
            onClick={fetchAssignments}
            variant="outline"
          >
            Try again
          </Button>
        </div>
      </div>
    );
  }

  // insert spin icon
  if (isLoading) {
    return (
      <div className="loading-container">
        <Loader2 className="h-8 w-8 animate-spin" />
        <p className="loading-message">Loading assignments, please wait...</p>
      </div>
    );
  }

  return (
    <div className="ReviewerDashboard">
      <header className="Dashboard-header">
        <h1>Reviewer's Dashboard</h1>
      </header>
      <div className="button-container">
        <Button variant="outline" className="button-style">
          Log Out
        </Button>
      </div>
      <main className="Dashboard-main">
        <section className="container in-review">
          <h2 className="container-title">In Review</h2>
          <div className="cards-container">
            {assignments.inReview.map(assignment => (
              <AssignmentCard key={assignment.id} assignment={assignment} />
            ))}
          </div>
        </section>
        <section className="container submitted-resubmitted">
          <h2 className="container-title">Submitted & Resubmitted</h2>
          <div className="cards-container">
            {assignments.submitted.map(assignment => (
              <AssignmentCard key={assignment.id} assignment={assignment} />
            ))}
          </div>
        </section>
        <section className="container completed">
          <h2 className="container-title">Completed</h2>
          <div className="cards-container">
            {assignments.completed.map(assignment => (
              <AssignmentCard key={assignment.id} assignment={assignment} />
            ))}
          </div>
        </section>
      </main>
      <footer className="Dashboard-footer">
        <p>Hello Reviewer!</p>
      </footer>
    </div>
  );
}

export default Dashboard;
