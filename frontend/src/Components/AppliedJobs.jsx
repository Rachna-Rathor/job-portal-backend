import { useEffect, useState } from "react";
import API from "../api/axios";

const AppliedJobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchApplied();
  }, []);

  const fetchApplied = async () => {
    const res = await API.get("/api/appliedjobs");
    setJobs(res.data.jobs);
  };

  const withdraw = async (id) => {
    await API.delete(`/api/withdraw/${id}`);
    fetchApplied();
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {jobs.map((job) => (
        <div key={job._id} className="bg-white p-4 rounded shadow">

          <h3 className="font-bold">{job.title}</h3>
          <p>{job.company}</p>

          <button
            onClick={() => withdraw(job._id)}
            className="mt-3 bg-red-500 text-white px-3 py-1 rounded"
          >
            Withdraw
          </button>

        </div>
      ))}
    </div>
  );
};

export default AppliedJobs;