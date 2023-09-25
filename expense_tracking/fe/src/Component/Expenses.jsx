import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { createnewExpense, UserExpenseDetails, deleteExpense ,expensePerMonth } from "../Service/ExpenseService";
import ExpenseModal from "../Component/ExpenseModal";
import { confirmAlert } from "react-confirm-alert";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import "../Component/Expenses.css";

function Expenses() {
  let navigate = useNavigate();
  const logout = () => {
    sessionStorage.setItem("token", "");
    navigate("/");
  };

  const [expenses, setExpenses] = useState([]);
  const [originalExpenseData, setOriginalExpenseData] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState("");

  const handleAddExpense = async (newExpense) => {
    setExpenses([...expenses, newExpense]);
    const user_email = sessionStorage.getItem("user");
    newExpense["email"] = user_email;
    console.log("New Expense:", newExpense);
    console.log(user_email);
    let expense_response = await createnewExpense(newExpense);
  };

  const handleDeleteExpense = async (expenseId) => {
    confirmAlert({
      title: "Confirm Deletion",
      message: "Are you sure you want to delete this expense?",
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteExpenseCall(expenseId),
        },
        {
          label: "No",
        },
      ],
      closeOnEscape: true,
      closeOnClickOutside: true,
    });
  };

  const deleteExpenseCall = async (expenseId) => {
    let deleteData = await deleteExpense(expenseId);
    if (deleteData.status === 200) {
      loadData();
      toast.success(deleteData.data.message, { autoClose: 2000 });
    } else {
      toast.error(deleteData.data.message, { autoClose: 2000 });
    }
  };

  const calculateTotalExpensesByMonth = (monthNumber) => {
    let total = 0;
    for (const expense of expenses) {
      const expenseDate = new Date(expense.date);
      const expenseMonth = expenseDate.getMonth() + 1; // Get month as a number (0-11)

      if (expenseMonth === parseInt(monthNumber)) {
        total += parseFloat(expense.amount);
      }
    }
    return total;
  };

  const loadData = async () => {
    let email = sessionStorage.getItem("user");
    if (email) {
      let getExpenseDetails = await UserExpenseDetails(email);
      try {
        if (getExpenseDetails.status === 200) {
          setOriginalExpenseData(
            getExpenseDetails.data.expenses.filter((e) => e.isDelete === "0")
          );
          setExpenses(
            getExpenseDetails.data.expenses.filter((e) => e.isDelete === "0")
          );
        } else {
          setOriginalExpenseData("");
          setExpenses("");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const chart_data = async (monthNumber) => {
    const data = {};
    data["email"] = sessionStorage.getItem("user");
    data["month"] = selectedMonth;
    console.log(data)
    let expense_permonth = await expensePerMonth(data)
  }

  useEffect(() => {
    // Calculate total expenses for the selected month
    if (selectedMonth !== "") {
      const monthTotal = calculateTotalExpensesByMonth(selectedMonth);
      setTotalExpenses(monthTotal);
    } else {
      setTotalExpenses(0);
    }
    // chart_data();
    // loadData();
  }, [expenses, selectedMonth]);

  return (
    <div className="container">
      <div className="header">
        <h1 className="head">Expense Tracker App</h1>
        <div onClick={logout} className="logout">
          Logout <LogoutIcon />
        </div>
      </div>

      <div className="content-container">
        <div className="table-container">
          <table className="expense-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Amount</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr key={expense.id}>
                  <td>{expense.date}</td>
                  <td>Rs {expense.amount}</td>
                  <td>{expense.category}</td>
                  <td>
                    <IconButton
                      color="secondary"
                      onClick={() => handleDeleteExpense(expense.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="add-button-container">
            <button onClick={() => setIsModalOpen(true)} className="add-button">
              Add Expense
            </button>
          </div>
        </div>

        <div className="filter-container">
          <div className="month-selector">
            <label htmlFor="month">Select Month:</label>
            <select
              id="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              <option value="">All Months</option>
              <option value="01">January</option>
              <option value="02">February</option>
              <option value="03">March</option>
              <option value="04">April</option>
              <option value="05">May</option>
              <option value="06">June</option>
              <option value="07">July</option>
              <option value="08">August</option>
              <option value="09">September</option>
              <option value="10">October</option>
              <option value="11">Novemeber</option>
              <option value="12">December</option>
            </select>
          </div>
          <div className="total-expenses">
            <p>Total Expenses for {selectedMonth === "" ? "All Months" : `Month ${selectedMonth}`}: Rs {totalExpenses}</p>
          </div>
        </div>
      </div>



      <ExpenseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddExpense}
      />
    </div>
  );
}

export default Expenses;



