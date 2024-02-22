import React, { useState } from "react";
import axios from "axios";

function AddStudent({ isOpen, onClose }) {
  const [newStudent, setNewStudent] = useState({
    StudentId: "",
    FirstName: "",
    LastName: "",
    Age: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // If the field is Age, parse it as an integer
    const parsedValue = name === "Age" ? parseInt(value) : value;
    setNewStudent((prevStudent) => ({
      ...prevStudent,
      [name]: parsedValue,
    }));
  };

  const handleAddStudent = async () => {
    try {
      await axios.post("http://localhost:5000/students", newStudent);
      onClose(); // Close the dialog after successfully adding data
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  return (
    <div
      className={`modal ${isOpen ? "show d-block" : ""}`}
      tabIndex="-1"
      role="dialog"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Student</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="studentId" className="form-label">
                  Student ID
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="studentId"
                  name="StudentId"
                  value={newStudent.StudentId}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="firstName" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  name="FirstName"
                  value={newStudent.FirstName}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="lastName" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  name="LastName"
                  value={newStudent.LastName}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="Age" className="form-label">
                  Age
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="Age"
                  name="Age"
                  value={newStudent.Age}
                  onChange={handleChange}
                />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleAddStudent}
            >
              Add
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddStudent;
