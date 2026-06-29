import { useEffect, useState } from "react";
import API from "../api/axios";

const JobFeed = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    const res = await API.get("/api/viewallJobs");
    setJobs(res.data.jobs);
  };

  const applyJob = async (id) => {
    try {
      await API.post(`/api/apply/${id}`);
      alert("Applied successfully ✅");
    } catch (err) {
      alert("Already applied or error ❌");
    }
  };

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {jobs.map((job) => (
        <div key={job._id} className="bg-white p-4 rounded shadow">

          <h3 className="font-bold text-lg">{job.title}</h3>
          <p>{job.company}</p>
          <p>{job.location}</p>

          <button
            onClick={() => applyJob(job._id)}
            className="mt-3 bg-blue-500 text-white px-3 py-1 rounded"
          >
            Apply
          </button>

        </div>
      ))}
    </div>
  );
};

export default JobFeed;