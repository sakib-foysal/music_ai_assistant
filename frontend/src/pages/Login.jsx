import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/login", form);
      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.detail || "Login failed");
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <span>🎵</span>
          <h1>Welcome Back</h1>
          <p>Login to continue your music journey</p>
        </div>

        <form onSubmit={handleLogin}>
          <input type="email" name="email" placeholder="Email address" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <button className="btn btn-primary full" type="submit">Login</button>
        </form>

        <p className="auth-link">
          No account? <Link to="/signup">Create one</Link>
        </p>
      </div>
    </main>
  );
}

export default Login;