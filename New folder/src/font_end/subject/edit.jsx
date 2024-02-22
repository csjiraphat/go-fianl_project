import React, { useState, useEffect } from "react";
import axios from "axios";

function EditSubject({ isOpen, onClose, subject }) {
  const [updatedSubjectData, setUpdatedSubjectData] = useState({
    Subject_id: subject.Subject_id,
    Subject_name: subject.Subject_name,
    Subject_credit: subject.Subject_credit,
  });

  useEffect(() => {
    setUpdatedSubjectData({
      Subject_id: subject.Subject_id,
      Subject_name: subject.Subject_name,
      Subject_credit: subject.Subject_credit,
    });
  }, [subject]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = name === "Subject_credit" ? parseFloat(value) : value; // Parse Subject_credit as float
    setUpdatedSubjectData((prevData) => ({
      ...prevData,
      [name]: parsedValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting updated data:", updatedSubjectData);
      const response = await axios.put(
        `http://localhost:5000/subjects/${subject.ID}`,
        updatedSubjectData
      );
      console.log("Server response:", response.data);
      onClose();
    } catch (error) {
      console.error("Error updating subject:", error);
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
            <h5 className="modal-title">Edit subject</h5>
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
                <label htmlFor="Subject_id" className="form-label">
                  Subject ID
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="Subject_id"
                  name="Subject_id"
                  value={updatedSubjectData.Subject_id}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="Subject_name" className="form-label">
                  Subject Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="Subject_name"
                  name="Subject_name"
                  value={updatedSubjectData.Subject_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="Subject_credit" className="form-label">
                  Subject Credit
                </label>
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  id="Subject_credit"
                  name="Subject_credit"
                  value={updatedSubjectData.Subject_credit}
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

export default EditSubject;
