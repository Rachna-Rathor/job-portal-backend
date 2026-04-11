import { useState } from "react";
import API from "../api/axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "candidate"
  });

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await API.post("/api/signup", form);

      alert("Signup Successful 🎉");

      navigate("/login");

    } catch (err) {
      alert(err.response?.data?.message || "Signup Failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-600 to-pink-500">

      <div className="bg-white p-8 rounded-xl shadow-lg w-96">

        <h2 className="text-2xl font-bold text-center mb-6">Signup</h2>

        <form onSubmit={handleSignup} className="flex flex-col gap-4">

          <input
            className="border p-2 rounded"
            placeholder="Name"
            onChange={(e)=>setForm({...form,name:e.target.value})}
          />

          <input
            className="border p-2 rounded"
            placeholder="Email"
            type="email"
            onChange={(e)=>setForm({...form,email:e.target.value})}
          />

          <input
            className="border p-2 rounded"
            placeholder="Password"
            type="password"
            onChange={(e)=>setForm({...form,password:e.target.value})}
          />

          <select
            className="border p-2 rounded"
            onChange={(e)=>setForm({...form,role:e.target.value})}
          >
            <option value="candidate">Candidate</option>
            <option value="recruiter">Recruiter</option>
          </select>

          <button className="bg-purple-600 text-white p-2 rounded hover:bg-purple-700">
            Signup
          </button>

        </form>

        <p className="text-sm text-center mt-4">
          Already have an account? <Link to={"/login"} className="text-purple-600 cursor-pointer">Login</Link>
        </p>

      </div>
    </div>
  );
};

export default Signup;