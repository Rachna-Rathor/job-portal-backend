import { useState } from "react";
import JobList from "../Components/JobList";
import JobForm from "../Components/JobForm";
import Applicants from "../Components/Applicants";

const RecruiterDashboard = () => {
  const [view, setView] = useState("jobs");
  const [selectedJob, setSelectedJob] = useState(null);

  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-6">
        <h2 className="text-2xl font-bold mb-6">Recruiter Panel</h2>

        <button
          className="block w-full text-left mb-3 p-2 rounded hover:bg-gray-700"
          onClick={() => setView("jobs")}
        >
          📋 All Jobs
        </button>

        <button
          className="block w-full text-left p-2 rounded hover:bg-gray-700"
          onClick={() => setView("create")}
        >
          ➕ Create Job
        </button>
      </div>

      {/* Main */}
      <div className="flex-1 p-6 overflow-y-auto">
        {view === "jobs" && (
          <JobList setSelectedJob={setSelectedJob} setView={setView} />
        )}

        {view === "create" && <JobForm />}

        {view === "applicants" && (
          <Applicants jobId={selectedJob} />
        )}
      </div>
    </div>
  );
};

export default RecruiterDashboard;