import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: Email,
        password: Password,
      }),
    })
      .then((response) => {
        if (response.ok) {
          // Successful login
          // Save user data to localStorage
          localStorage.setItem("user", JSON.stringify({ email: Email }));
          // Redirect user to homepage after successful login
          window.location.href = "/";
        } else {
          throw new Error("Login failed");
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
        alert("Login failed. Please try again.");
      });
  };

  return (
    <div className="container mt-5 text-white">
      {" "}
      {/* Added text-white class */}
      <h2 className="mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
      <p className="mt-3">
        Don't have an account? <Link to="/signup">Signup</Link>
      </p>
    </div>
  );
}

export default Login;
