import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./Layout/Login";
import Signup from "./Layout/Signup";
import Dashboard from "./Layout/Dashboard";
// import Profile from "./Layout/Profile";
import ExpenseLayout from "./Layout/Expenselayout";
// import Fileupload from "./Component/ProfileHandling/Fileupload";
// import AdminDashboard from "./Layout/Admin/AdminDashboard";
// import AdminProfile from "./Layout/Admin/AdminProfile";
// import AdminEventPortal from "./Layout/Admin/AdminEventPortal";
// import PerformanceRating from "./Component/Performance/PerformanceRating";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/expenses" element={<ExpenseLayout />} />
        {/* <Route path="/profile" element={<Profile />} />
        <Route path="/upload" element={<Fileupload />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/per" element={<PerformanceRating />} />
        <Route path="/admin_profile" element={<AdminProfile />} />
        <Route path="/admin_portal" element={<AdminEventPortal />} /> */}
      </Routes>
    </div>
  );
}

export default App;
