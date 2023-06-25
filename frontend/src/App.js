import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import JobList from "./components/JobList";
import AdminScreen from "./components/AdminScreen";
import "./App.css";

const JobBoard = () => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchJobData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/jobs", {
        params: { search: searchTerm },
      });
      const jobData = response.data;
      setJobs(jobData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchJobData();
  }, [searchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleRemove = () => {
    fetchJobData();
  };

  return (
    <Router>
      <div className="job-board-container">
        <Routes>
          <Route
            path="/admin"
            element={
              <>
                <AdminScreen />
              </>
            }
          />
          <Route
            index
            path="/"
            element={
              <>
                <h1>Job Board</h1>
                <div className="search-bar">
                  <input
                    type="text"
                    placeholder="Search jobs..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="search-input"
                  />
                </div>
                <JobList jobs={jobs} onRemove={handleRemove} />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default JobBoard;
