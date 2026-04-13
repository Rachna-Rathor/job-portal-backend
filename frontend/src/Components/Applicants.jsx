import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

const Applicants = ({ jobId }) => {
  const [applicants, setApplicants] = useState([]);
  console.log(jobId)

  useEffect(() => {
    fetchApplicants();
  }, []);
   
  const fetchApplicants = async () => {
      try {
    const res = await API.get(`/api/job/${jobId}/applicants`);
    setApplicants(res.data.applicants);
  } catch (error) {
    if (error.response?.status === 403) {
      setErrorMsg("You cannot view applicants because you did not create this job");
    } else {
      setErrorMsg("Something went wrong");
    }
  }
  };

  const updateStatus = async (candidateId, status) => {
    await API.put(`/api/updateStatus/${jobId}/${candidateId}`, { status });
    fetchApplicants();
  };
  console.log(localStorage.getItem("token"));
  

  return (
    <div>
      {errorMsg && (
  <p className="text-red-500 mb-4">{errorMsg}</p>
)}
      <h2 className="text-2xl font-bold mb-6">Applicants</h2>

      {applicants.map((app) => (
        <div
          key={app._id}
          className="bg-white p-4 mb-4 rounded-xl shadow flex justify-between items-center"
        >
          <p className="font-semibold">{app.candidate.name}</p>

          <select
            className="border p-2 rounded"
            value={app.status}
            onChange={(e)=>updateStatus(app.candidate._id, e.target.value)}
          >
            <option value="applied">Applied</option>
            <option value="shortlisted">Shortlisted</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      ))}
    </div>
  );
};

export default Applicants;