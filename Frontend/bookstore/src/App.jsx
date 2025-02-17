
import {BrowserRouter as Router,Route,Routes, Navigate} from "react-router-dom"
import './App.css'
import Signup from "./Pages/Signup"
import Login from "./Pages/Login"
import Home from "./Pages/Home"
import Courses from "./Pages/Courses"
import Buy from "./Pages/Buy"

import Purchases from "./Pages/Purchases"
import AdminLogin from "./Admin/AdminLogin"
import AdminSignup from "./Admin/AdminSignup"
import Dashboard from "./Admin/Dashboard"
import CourseCreate from "./Admin/CourseCreate"
import UpdateCourse from "./Admin/UpdateCourses"
import OurCourses from "./Admin/OurCourses"

function App() {
  

  const user = JSON.parse(localStorage.getItem("user"));
const admin = JSON.parse(localStorage.getItem("admin"));
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />


          <Route path="/courses" element={<Courses />} />
          <Route path="/buy/:courseId" element={<Buy />} />
          <Route path="/purchases" element={<Purchases />} />


          <Route path="/admin/signup" element={<AdminSignup />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin/dashboard"
          element={admin ? <Dashboard /> : <Navigate to={"/admin/login"} />}
        />
        <Route path="/admin/create-course" element={<CourseCreate />} />
        <Route path="/admin/update-course/:id" element={<UpdateCourse />} />
        <Route path="/admin/our-courses" element={<OurCourses />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
