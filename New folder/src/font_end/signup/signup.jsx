import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Signup() {
  const [userData, setUserData] = useState({
    Name: "",
    Email: "",
    Password: "",
  });
  const [signupSuccess, setSignupSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        setSignupSuccess(true);
        toast.success("Sign up successful!");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const redirectToLogin = () => {
    window.location.href = "/login";
  };

  return (
    <div className="container mt-5">
      <ToastContainer />
      <h2 className="mb-4">Sign Up</h2>
      {!signupSuccess ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="Name" className="form-label">
              Name:
            </label>
            <input
              type="text"
              id="Name"
              name="Name"
              value={userData.Name}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              id="Email"
              name="Email"
              value={userData.Email}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Password" className="form-label">
              Password:
            </label>
            <input
              type="password"
              id="Password"
              name="Password"
              value={userData.Password}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </form>
      ) : (
        <div className="mb-3">
          <div className="alert alert-success" role="alert">
            Sign up successful!
          </div>
          <p>Would you like to proceed to the login page?</p>
          <button onClick={redirectToLogin} className="btn btn-primary me-2">
            Yes
          </button>
          <button className="btn btn-secondary">No</button>
        </div>
      )}
    </div>
  );
}

export default Signup;
