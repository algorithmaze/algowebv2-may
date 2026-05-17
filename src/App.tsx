import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ReactLenis } from "lenis/react";
import LandingPage from "./components/LandingPage";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import CoursesPage from "./components/CoursesPage";
import InternshipsPage from "./components/InternshipsPage";
import RegistrationPage from "./components/RegistrationPage";
import CourseDetail from "./components/CourseDetail";
import InternshipDetail from "./components/InternshipDetail";
import SuccessPage from "./components/SuccessPage";

function App() {
  return (
    <ReactLenis root options={{ smoothWheel: true, duration: 1.2 }}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/courses/:slug" element={<CourseDetail />} />
          <Route path="/internships" element={<InternshipsPage />} />
          <Route path="/internships/:slug" element={<InternshipDetail />} />
          <Route path="/register/:type/:slug" element={<RegistrationPage />} />
          <Route path="/register/:type" element={<RegistrationPage />} />
          <Route path="/success/:refNo" element={<SuccessPage />} />
          <Route path="/amaiadmin" element={<AdminLogin />} />
          <Route path="/amaiadmin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </ReactLenis>
  );
}

export default App;
