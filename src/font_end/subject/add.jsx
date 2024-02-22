import React, { useState } from "react";
import axios from "axios";

function AddSubject({ isOpen, onClose }) {
  const [newSubjects, setNewSubjects] = useState({
    Subject_id: "",
    Subject_name: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewSubjects((prevSubjects) => ({
      ...prevSubjects,
      [name]: value,
    }));
  };

  const handleAddSubject = async () => {
    try {
      await axios.post("http://localhost:5000/subjects", newSubjects);
      onClose(); // ปิด dialog เมื่อเพิ่มข้อมูลเสร็จสมบูรณ์
    } catch (error) {
      console.error("Error adding subjects:", error);
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
                  value={newSubjects.Subject_id}
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
                  value={newSubjects.Subject_name}
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
