import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import StudentList from "./font_end/students";
import SubjectList from "./font_end/subject";
import TeacherList from "./font_end/teacher";
import Header from "./font_end/Header";
import Login from "./font_end/signin/signin";
import Signup from "./font_end/signup/signup";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/indexTeacher" element={<TeacherList />} />
          <Route path="/indexSubject" element={<SubjectList />} />
          <Route path="/indexStudent" element={<StudentList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
