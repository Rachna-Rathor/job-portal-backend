import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
const JobForm = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    experience: "",
    company: ""
  });
const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/api/createJob", form);
      alert("Job Created Successfully 🚀");

      // reset form
      setForm({
        title: "",
        description: "",
        location: "",
        salary: "",
        experience: "",
        company: ""
      });
      navigate('/')

    } catch (err) {
      alert(err.response?.data?.message || "Error creating job");
    }
  };
  
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-[450px]"
      >

        <h2 className="text-2xl font-bold mb-6 text-center">
          Create Job 🚀
        </h2>

        {/* Title */}
        <input
          className="w-full border p-2 mb-3 rounded"
          placeholder="Job Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        {/* Description */}
        <textarea
          className="w-full border p-2 mb-3 rounded"
          placeholder="Job Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        {/* Location */}
        <input
          className="w-full border p-2 mb-3 rounded"
          placeholder="Location"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />

        {/* Salary */}
        <input
          className="w-full border p-2 mb-3 rounded"
          placeholder="Salary"
          value={form.salary}
          onChange={(e) => setForm({ ...form, salary: e.target.value })}
        />

        {/* Experience */}
        <input
          className="w-full border p-2 mb-3 rounded"
          placeholder="Experience (e.g. 1-3 years)"
          value={form.experience}
          onChange={(e) => setForm({ ...form, experience: e.target.value })}
        />

        {/* Company */}
        <input
          className="w-full border p-2 mb-4 rounded"
          placeholder="Company Name"
          value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
        />

        {/* Submit */}
        <button className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition">
          Create Job
        </button>

      </form>
    </div>
  );
};

export default JobForm;