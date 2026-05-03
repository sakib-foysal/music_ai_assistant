import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";

function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await API.post("/signup", form);
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.detail || "Signup failed");
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <span>🎧</span>
          <h1>Create Account</h1>
          <p>Start discovering songs by mood</p>
        </div>

        <form onSubmit={handleSignup}>
          <input type="text" name="name" placeholder="Full name" onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email address" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <button className="btn btn-primary full" type="submit">Create Account</button>
        </form>

        <p className="auth-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </main>
  );
}

export default Signup;