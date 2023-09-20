import React, { useEffect } from "react";
// import Sidebar from "../Component/Sidebar";
import "./Dashboard.css";
// import { checkLogin } from "../Service/SecurityService";
// import DashboardContent1 from "../Component/DashboardContent1";
import { CheckLoginComponent } from "../Service/SecurityService";
import { ToastContainer } from "react-toastify";
// import Projects from "../Component/ProjectAllocation/Project";
function Dashboard() {
  return (
    <div className="sidebar-content-separation">
      {/* <Sidebar /> */}
      <div className="content">
        <CheckLoginComponent />
        <h1>Hari</h1>
        
      </div>
      <ToastContainer />
    </div>
  );
}

export default Dashboard;
