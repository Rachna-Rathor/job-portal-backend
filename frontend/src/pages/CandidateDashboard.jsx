import { useState } from "react";
import JobFeed from "../Components/JobFeed";
import AppliedJobs from "../Components/AppliedJobs";

const CandidateDashboard = () => {
  const [view, setView] = useState("jobs");

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-3xl font-bold mb-6">Candidate Dashboard</h1>

      {/* Toggle Buttons */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setView("jobs")}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          All Jobs
        </button>

        <button
          onClick={() => setView("applied")}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Applied Jobs
        </button>
      </div>

      {/* Views */}
      {view === "jobs" && <JobFeed />}
      {view === "applied" && <AppliedJobs />}
    </div>
  );
};

export default CandidateDashboard;