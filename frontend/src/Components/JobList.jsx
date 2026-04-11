import { useEffect, useState } from "react";
import API from "../api/axios";

const JobList = ({ setSelectedJob, setView }) => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    const res = await API.get("/api/viewallJobs");
    setJobs(res.data.jobs);
  };

  const deleteJob = async (id) => {
    await API.delete(`/api/deleteJob/${id}`);
    fetchJobs();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">All Jobs</h2>

      <div className="grid grid-cols-2 gap-6">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold">{job.title}</h3>
            <p className="text-gray-500">{job.location}</p>

            <p className="text-green-600 font-bold mt-2">
              ₹ {job.salary}
            </p>

            <div className="mt-4 flex gap-3">
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                onClick={() => {
                  setSelectedJob(job._id);
                  setView("applicants");
                }}
              >
                View Applicants
              </button>

              <button
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                onClick={() => deleteJob(job._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobList;