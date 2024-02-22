import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddTeacher from "./add";
import EditTeacher from "./edit";

function TeacherList() {
  const [teachers, setTeachers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const fetchTeachers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/teachers");
      setTeachers(response.data);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleDelete = async (teacherId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this teacher?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/teachers/${teacherId}`);
        setTeachers(teachers.filter((teacher) => teacher.ID !== teacherId));
        toast.success("Teacher deleted successfully!");
      } catch (error) {
        console.error("Error deleting teacher:", error);
        toast.error("Failed to delete teacher!");
      }
    }
  };

  const handleEdit = (teacher) => {
    setSelectedTeacher(teacher);
    setIsEditModalOpen(true);
  };

  const filteredTeachers = teachers.filter((teacher) => {
    return (
      teacher.FirstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.LastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.ID.toString().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Teacher List</h1>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <button
          className="btn btn-success"
          onClick={() => setIsAddModalOpen(true)}
        >
          Add Teacher
        </button>
        <div className="input-group" style={{ width: "30%" }}>
          <input
            type="text"
            className="form-control"
            placeholder="Search by name, ID, or last name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTeachers.map((teacher) => (
            <tr key={teacher.ID}>
              <td>{teacher.FirstName}</td>
              <td>{teacher.LastName}</td>
              <td>
                <button
                  className="btn btn-primary me-2"
                  onClick={() => handleEdit(teacher)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(teacher.ID)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <AddTeacher
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          fetchTeachers();
        }}
      />
      {selectedTeacher && (
        <EditTeacher
          teacher={selectedTeacher}
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            fetchTeachers();
          }}
        />
      )}
      <ToastContainer />
    </div>
  );
}

export default TeacherList;
