import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

const JobList = ({ setSelectedJob, setView }) => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);
const navigate=useNavigate()
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

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {jobs.map((job) => (
          <div
            key={job._id}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300 border border-gray-100"
          >
            {/* Title + Company */}
            <div className="mb-3">
              <h3 className="text-xl font-bold text-gray-800">
                {job.title}
              </h3>
              <p className="text-sm text-gray-500">
                {job.company}
              </p>
            </div>

            {/* Location */}
            <p className="text-gray-500 text-sm mb-2">
              📍 {job.location}
            </p>

            {/* Salary + Experience */}
            <div className="flex justify-between items-center mb-3">
              <p className="text-green-600 font-semibold">
                ₹ {job.salary}
              </p>
              <p className="text-blue-500 text-sm">
                {job.experience} yrs exp
              </p>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm line-clamp-2">
              {job.description}
            </p>

            {/* Buttons */}
            <div className="mt-5 flex gap-3">
              <button
                className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                onClick={() => {
                  setSelectedJob(job._id);
                  setView("applicants");
                }}
              >
                View Applicants
              </button>

              <button
                className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
                onClick={() => deleteJob(job._id)}
              >
                Delete
              </button>
              <button
                className="flex-1 bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition"
                onClick={() => navigate(`/edit-job/${jobs._id}`)}
              >
                Edit
              </button>
            </div>
          </div>
        ))}

      </div>

      {/* Empty State */}
      {jobs.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No jobs available
        </p>
      )}
    </div>
  );
};

export default JobList;