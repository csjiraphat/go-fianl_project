import React from "react";
import { Link } from "react-router-dom";

function Header() {
  // เช็คว่ามีข้อมูลผู้ใช้ที่ล็อคอินอยู่ใน localStorage หรือไม่
  const isLoggedIn = localStorage.getItem("user");

  // ฟังก์ชันสำหรับการล็อกเอาท์
  const handleLogout = () => {
    // ลบข้อมูลการล็อคอินออกจาก localStorage
    localStorage.removeItem("user");
    // เด้งไปยังหน้า Login
    window.location.href = "/login";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Home
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            {!isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link py-2" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link py-2" to="/signup">
                    Signup
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link py-2" to="/indexStudent">
                    Students
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link py-2" to="/indexSubject">
                    Subjects
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link py-2" to="/indexTeacher">
                    Teachers
                  </Link>
                </li>
                <li className="nav-item">
                  <button className="nav-link btn py-2" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
