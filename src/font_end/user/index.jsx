import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddUser from "./add";
import EditUser from "./edit";

function UserList() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/users/${userId}`);
        setUsers(users.filter((user) => user.Email !== userId));
        toast.success("User deleted successfully!");
      } catch (error) {
        console.error("Error deleting user:", error);
        toast.error("Failed to delete user!");
      }
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const filteredUsers = users.filter((user) => {
    return (
      user.Email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.ID.toString().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="container mt-4 text-center">
      {" "}
      {/* Added text-center class */}
      <h1 className="mb-4 text-white">User List</h1>{" "}
      {/* Removed text-center class */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <button
          className="btn btn-success text-white"
          onClick={() => setIsAddModalOpen(true)}
        >
          Add User
        </button>
        <div className="input-group" style={{ width: "30%" }}>
          <input
            type="text"
            className="form-control"
            placeholder="Search by ID, Name or Email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Email</th>
            <th scope="col">Name</th>

            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.ID}>
              <td>{user.Email}</td>
              <td>{user.Name}</td>

              <td>
                <button
                  className="btn btn-primary me-2 text-white"
                  onClick={() => handleEdit(user)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(user.Email)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <AddUser
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          fetchUsers();
        }}
      />
      {selectedUser && (
        <EditUser
          user={selectedUser}
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            fetchUsers();
          }}
        />
      )}
      <ToastContainer />
    </div>
  );
}

export default UserList;
