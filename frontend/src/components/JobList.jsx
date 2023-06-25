import React from 'react';
import JobItem from './JobItem';

const JobList = ({ jobs, onRemove }) => {
    return (
      <div>
        <h2>Available Jobs</h2>
        {jobs.map((job) => (
          // Render JobItem component for each job
          <JobItem key={job.id} job={job} onRemove={onRemove}/>
        ))}
      </div>
    );
  };
  
  export default JobList;
  