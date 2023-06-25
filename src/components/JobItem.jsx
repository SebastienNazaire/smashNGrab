import React from 'react';
import axios from "axios";

const JobItem = ({ job, onRemove }) => {
  const { job: jobTitle, description, danger_level: dangerLevel, pay } = job;

  const handleRemove = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/jobs/${job.id}`);
      onRemove();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="job-item">
        <div>
            <h3 className="job-title">{jobTitle}</h3>
            <p className="job-description">{description}</p>
            <p className="job-danger-level">Danger Level: {dangerLevel}</p>
            <p className="job-pay">Pay: {pay}</p>
        </div>
        <div className='remove-button-wrapper'>
            <button className="remove-button" onClick={handleRemove}>
              &#128473;
            </button>
        </div>
    </div>
  );
};

export default JobItem;
