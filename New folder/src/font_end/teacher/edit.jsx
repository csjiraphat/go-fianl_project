import React, { useState, useEffect } from "react";
import axios from "axios";

function EditTeacher({ isOpen, onClose, teacher }) {
  const [updatedTeacherData, setUpdatedTeacherData] = useState({
    firstName: teacher.FirstName,
    lastName: teacher.LastName,
    Age: teacher.Age,
  });

  useEffect(() => {
    setUpdatedTeacherData({
      firstName: teacher.FirstName,
      lastName: teacher.LastName,
      Age: teacher.Age,
    });
  }, [teacher]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // If the field is Age, parse it as an integer
    const parsedValue = name === "Age" ? parseInt(value) : value;
    setUpdatedTeacherData((prevData) => ({
      ...prevData,
      [name]: parsedValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting updated data:", updatedTeacherData);
      const response = await axios.put(
        `http://localhost:5000/teachers/${teacher.ID}`,
        updatedTeacherData
      );
      console.log("Server response:", response.data);
      onClose();
    } catch (error) {
      console.error("Error updating teacher:", error);
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
            <h5 className="modal-title">Edit Teacher</h5>
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
                <label htmlFor="firstName" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  name="firstName"
                  value={updatedTeacherData.firstName}
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
                  value={updatedTeacherData.lastName}
                  onChange={handleChange}
                  required
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
                  value={updatedTeacherData.Age}
                  onChange={handleChange}
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

export default EditTeacher;
