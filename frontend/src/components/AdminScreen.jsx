import React, { useState } from 'react';
import axios from 'axios';

const AdminScreen = () => {
  const [jobs, setJobs] = useState([]);
  const [newJob, setNewJob] = useState({
    job: '',
    description: '',
    danger_level: '',
    pay: ''
  });

  const fetchJobs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/jobs');
      setJobs(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addJob = async () => {
    try {
      await axios.post('http://localhost:5000/api/jobs', newJob);
      setNewJob({
        job: '',
        description: '',
        danger_level: '',
        pay: ''
      });
      fetchJobs();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="admin-screen-container">
      <h1>Admin Screen</h1>
      <div className="job-list">
        {jobs.map((job) => (
          <div key={job.id}>
            <h3>{job.job}</h3>
            <p>Description: {job.description}</p>
            <p>Danger Level: {job.danger_level}</p>
            <p>Pay: {job.pay}</p>
          </div>
        ))}
      </div>
      <div className="new-job-form">
        <h3>Add New Job</h3>
        <input
          type="text"
          placeholder="Job Title"
          value={newJob.job}
          onChange={(e) => setNewJob({ ...newJob, job: e.target.value })}
          className="input-field"
        />
        <input
          type="text"
          placeholder="Description"
          value={newJob.description}
          onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
          className="input-field"
        />
        <input
          type="text"
          placeholder="Danger Level"
          value={newJob.danger_level}
          onChange={(e) => setNewJob({ ...newJob, danger_level: e.target.value })}
          className="input-field"
        />
        <input
          type="text"
          placeholder="Pay"
          value={newJob.pay}
          onChange={(e) => setNewJob({ ...newJob, pay: e.target.value })}
          className="input-field"
        />
        <button onClick={addJob}>Add Job</button>
      </div>
    </div>
  );
};

export default AdminScreen;
