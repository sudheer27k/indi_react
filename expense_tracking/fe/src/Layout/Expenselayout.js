import React from "react";
import Sidebar from "../Component/Sidebar";
import Expenses from "../Component/Expenses";
import { CheckLoginComponent } from "../Service/SecurityService";
import { ToastContainer } from "react-toastify";
function ExpenseLayout() {
  return (
    <div className="sidebar-content-separation">
      {/* <Sidebar /> */}
      <div className="content">
        <CheckLoginComponent />
        <Expenses />
      </div>
      <ToastContainer />
    </div>
  );
}

export default ExpenseLayout;