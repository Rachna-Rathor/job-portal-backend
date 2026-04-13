import { useState } from "react";
import API from "../api/axios";
import { useNavigate ,Link} from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/api/login", form);

      localStorage.setItem("token", res.data.token);

      alert("Login Successful 🚀");

      navigate("/");

    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-600">

      <div className="bg-white p-8 rounded-xl shadow-lg w-96">

        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">

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

          <button className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            Login
          </button>

        </form>

        <p className="text-sm text-center mt-4">
          Don’t have an account? <Link to={"/signup"} className="text-blue-600 cursor-pointer">Signup</Link>
        </p>

      </div>
    </div>
  );
};

export default Login;