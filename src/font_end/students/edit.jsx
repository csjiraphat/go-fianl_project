import React, { useState, useEffect } from "react";
import axios from "axios";

function EditStudent({ isOpen, onClose, student }) {
  const [updatedStudentData, setUpdatedStudentData] = useState({
    studentid: student.StudentId,
    firstName: student.FirstName,
    lastName: student.LastName,
  });

  useEffect(() => {
    setUpdatedStudentData({
      studentid: student.StudentId,
      firstName: student.FirstName,
      lastName: student.LastName,
    });
  }, [student]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedStudentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting updated data:", updatedStudentData);
      const response = await axios.put(
        `http://localhost:5000/students/${student.ID}`,
        updatedStudentData
      );
      console.log("Server response:", response.data);
      onClose();
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  return (
    <div
      className={`modal ${isOpen ? "show" : ""}`}
      style={{ display: isOpen ? "block" : "none" }}
      tabIndex="-1"
      role="dialog"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Student</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="studentId" className="form-label">
                  Student ID
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="studentId"
                  name="studentid"
                  value={updatedStudentData.studentid}
                  onChange={handleChange}
                  required
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
                  name="firstName"
                  value={updatedStudentData.firstName}
                  onChange={handleChange}
                  required
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
                  name="lastName"
                  value={updatedStudentData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditStudent;
