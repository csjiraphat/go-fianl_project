import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddSubject from "./add";
import EditSubject from "./edit";

function SubjectList() {
  const [subjects, setSubjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);

  const fetchSubjects = async () => {
    try {
      const response = await axios.get("http://localhost:5000/subjects");
      setSubjects(response.data);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const handleDelete = async (subjectId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this subject?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/subjects/${subjectId}`);
        setSubjects(subjects.filter((subject) => subject.ID !== subjectId));
        toast.success("Subject deleted successfully!");
      } catch (error) {
        console.error("Error deleting subject:", error);
        toast.error("Failed to delete subject!");
      }
    }
  };

  const handleEdit = (subject) => {
    setSelectedSubject(subject);
    setIsEditModalOpen(true);
  };

  const filteredSubjects = subjects.filter((subject) => {
    return (
      subject.Subject_id.toString().includes(searchTerm) ||
      subject.Subject_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Subject List</h1>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <button
          className="btn btn-success"
          onClick={() => setIsAddModalOpen(true)}
        >
          Add Subject
        </button>
        <div className="input-group" style={{ width: "30%" }}>
          <input
            type="text"
            className="form-control"
            placeholder="Search by Subject ID or Subject Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Subject ID</th>
            <th scope="col">Subject Name</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredSubjects.map((subject) => (
            <tr key={subject.ID}>
              <td>{subject.Subject_id}</td>
              <td>{subject.Subject_name}</td>
              <td>
                <button
                  className="btn btn-primary me-2"
                  onClick={() => handleEdit(subject)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(subject.ID)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <AddSubject
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          fetchSubjects(); // Refresh data after closing Add Subject modal
        }}
      />
      {selectedSubject && (
        <EditSubject
          subject={selectedSubject}
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            fetchSubjects(); // Refresh data after closing Edit Subject modal
          }}
        />
      )}
      <ToastContainer />
    </div>
  );
}

export default SubjectList;
