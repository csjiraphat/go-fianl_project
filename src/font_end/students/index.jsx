import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddStudent from "./add";
import EditStudent from "./edit";

function StudentList() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/students");
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = async (studentId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/students/${studentId}`);
        setStudents(students.filter((student) => student.ID !== studentId));
        toast.success("Student deleted successfully!");
      } catch (error) {
        console.error("Error deleting student:", error);
        toast.error("Failed to delete student!");
      }
    }
  };

  const handleEdit = (student) => {
    setSelectedStudent(student);
    setIsEditModalOpen(true);
  };

  const filteredStudents = students.filter((student) => {
    return (
      student.StudentId.toString().includes(searchTerm) ||
      student.FirstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.LastName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Student List</h1>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <button
          className="btn btn-success"
          onClick={() => setIsAddModalOpen(true)}
        >
          Add Student
        </button>
        <div className="input-group" style={{ width: "30%" }}>
          <input
            type="text"
            className="form-control"
            placeholder="Search by Student ID, First Name, or Last Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Student ID</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student) => (
            <tr key={student.ID}>
              <td>{student.StudentId}</td>
              <td>{student.FirstName}</td>
              <td>{student.LastName}</td>
              <td>
                <button
                  className="btn btn-primary me-2"
                  onClick={() => handleEdit(student)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(student.ID)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <AddStudent
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          fetchStudents(); // Refresh data after closing Add Student modal
        }}
      />
      {selectedStudent && (
        <EditStudent
          student={selectedStudent}
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            fetchStudents(); // Refresh data after closing Edit Student modal
          }}
        />
      )}
      <ToastContainer />
    </div>
  );
}

export default StudentList;
