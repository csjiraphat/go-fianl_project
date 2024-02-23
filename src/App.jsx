import React from "react";
import {
  Route,
  Routes,
  BrowserRouter as Router,
  useLocation,
} from "react-router-dom";
import StudentList from "./font_end/students";
import SubjectList from "./font_end/subject";
import TeacherList from "./font_end/teacher";
import Header from "./font_end/Header";
import Login from "./font_end/signin/signin";
import Signup from "./font_end/signup/signup";
import UserList from "./font_end/user";
import "./App.css"; // Import CSS file for styling

function WelcomeMessage() {
  const location = useLocation();

  // Check if current location is the home page
  if (location.pathname === "/") {
    return (
      <div className="welcome-message">
        <h1>Welcome!!</h1>
      </div>
    );
  } else {
    return null;
  }
}

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main>
          <Routes>
            <Route path="/indexTeacher" element={<TeacherList />} />
            <Route path="/indexSubject" element={<SubjectList />} />
            <Route path="/indexStudent" element={<StudentList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/indexUser" element={<UserList />} />
          </Routes>
          <WelcomeMessage />
        </main>
      </div>
    </Router>
  );
}

export default App;
