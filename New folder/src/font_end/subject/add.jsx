import React, { useState } from "react";
import axios from "axios";

function AddSubject({ isOpen, onClose }) {
  const [newSubject, setNewSubject] = useState({
    Subject_id: "",
    Subject_name: "",
    Subject_credit: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // If the field is Subject_credit, parse it as a float
    const parsedValue = name === "Subject_credit" ? parseFloat(value) : value;
    setNewSubject((prevSubject) => ({
      ...prevSubject,
      [name]: parsedValue,
    }));
  };

  const handleAddSubject = async () => {
    try {
      await axios.post("http://localhost:5000/subjects", {
        ...newSubject,
        Subject_credit: parseFloat(newSubject.Subject_credit), // Convert Subject_credit to number
      });
      onClose(); // Close the dialog after successfully adding data
    } catch (error) {
      console.error("Error adding subject:", error);
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
            <h5 className="modal-title">Add Subject</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="Subject_id" className="form-label">
                  Subject ID
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="Subject_id"
                  name="Subject_id"
                  value={newSubject.Subject_id}
                  onChange={handleChange}
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
                  value={newSubject.Subject_name}
                  onChange={handleChange}
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
                  value={newSubject.Subject_credit}
                  onChange={handleChange}
                />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleAddSubject}
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

export default AddSubject;
