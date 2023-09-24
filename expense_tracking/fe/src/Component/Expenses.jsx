import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { createnewExpense, UserExpenseDetails, deleteExpense } from "../Service/ExpenseService";
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
    console.log(deleteData,"ooo")
    console.log(originalExpenseData,"ooo")
    if (deleteData.status === 200) {
      loadData();
      toast.success(deleteData.data.message, { autoClose: 2000 });
    } else {
      toast.error(deleteData.data.message, { autoClose: 2000 });
    }
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

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="container">
      <div className="header">
        <h1 className="head">Expense Tracker App</h1>
        <div onClick={logout} className="logout">
          Logout <LogoutIcon />
        </div>
      </div>

      <button onClick={() => setIsModalOpen(true)} className="add-button">
        Add Expense
      </button>

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
              <td>${expense.amount}</td>
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

      <ExpenseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddExpense}
      />
    </div>
  );
}

export default Expenses;


