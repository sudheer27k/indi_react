import React, { useEffect } from "react";
import "./Dashboard.css";
import Sidebar from "../Component/Sidebar";
import DashboardContent from "../Component/DashboardContent";
import { CheckLoginComponent } from "../Service/SecurityService";
import { ToastContainer } from "react-toastify";
function Dashboard() {
  return (
    <div className="sidebar-content-separation">
      <Sidebar />
      <div className="content">
        <CheckLoginComponent />
        <DashboardContent />

      </div>
      <ToastContainer />
    </div>
  );
}

export default Dashboard;
