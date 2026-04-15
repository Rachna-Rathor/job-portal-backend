import { useEffect, useState } from "react";
import API from "../api/axios";
import { useParams, useNavigate } from "react-router-dom";

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [jobData, setJobData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    experience: "",
    description: "",
  });

  const [loading, setLoading] = useState(true);

  // 🔹 Fetch job data
  useEffect(() => {
    fetchJob();
  }, []);

  const fetchJob = async () => {
    try {
      const res = await API.get(`/api/job/${id}`);
      setJobData(res.data.job);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Handle input
  const handleChange = (e) => {
    setJobData({
      ...jobData,
      [e.target.name]: e.target.value,
    });
  };

  // 🔹 Update job
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/api/updateJob/${id}`, jobData);
      alert("Job updated successfully ✅");
      navigate("/");
    } catch (error) {
      alert("Update failed ❌");
    }
  };

  // 🔹 Loader
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">
      
      <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-lg">
        
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Edit Job
        </h2>

        <form onSubmit={handleUpdate} className="space-y-4">

          <input
            type="text"
            name="title"
            value={jobData.title}
            onChange={handleChange}
            placeholder="Job Title"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="text"
            name="company"
            value={jobData.company}
            onChange={handleChange}
            placeholder="Company Name"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="text"
            name="location"
            value={jobData.location}
            onChange={handleChange}
            placeholder="Location"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              name="salary"
              value={jobData.salary}
              onChange={handleChange}
              placeholder="Salary"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <input
              type="number"
              name="experience"
              value={jobData.experience}
              onChange={handleChange}
              placeholder="Experience (yrs)"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <textarea
            name="description"
            value={jobData.description}
            onChange={handleChange}
            placeholder="Job Description"
            rows="4"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition font-semibold"
          >
            Update Job
          </button>

        </form>
      </div>
    </div>
  );
};

export default EditJob;