import React from 'react';

// escape to java in order to access assignment properties or values to fill in the icon
// assignment doesn't have title but does have id
// while not safe, it's ok for now for testing and viewing
function AssignmentIcon({ assignment }) {
  return {
    <div>
      <p>{assignment.id}</p>
    </div>
  }
}