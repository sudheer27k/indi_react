import React, { useState,useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { createnewExpense } from "../Service/ExpenseService";
import { getExpense } from "../Service/ExpenseService"; 
import ExpenseModal from "../Component/ExpenseModal"; // Import the ExpenseModal component

function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [originalExpenseData, setOriginalExpenseData] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddExpense = async(newExpense) => {
    // console.log("New Expense:",newExpense.date)
    setExpenses([...expenses, newExpense]);
    
    await createnewExpense(newExpense);

  };

  // get  (table data)
  const loadData = async () => {
    let getExpenseDetails = await getExpense();
    console.log(getExpenseDetails);
    try {
      if (getExpenseDetails.status === 200) {
        setOriginalExpenseData(
          getExpenseDetails.data.getExpense
          // .filter((e) => e.isDelete === "0")
        );
        setExpenses(
          getExpenseDetails.data.getExpense
          // .filter((e) => e.isDelete === "0")
        );
      } else {
        setOriginalExpenseData("");
        setExpenses("");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // Fetch project data from an API or other source if needed
    loadData();
  }, []);

  return (
    <div className="container">
      <h2>Expenses</h2>

      <button
        onClick={() => setIsModalOpen(true)}
        className="btn btn-primary"
      >
        Add Expense
      </button>

      <table className="table mt-4">
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, index) => (
            <tr key={index}>
              <td>{expense.date}</td>
              <td>{expense.description}</td>
              <td>{expense.amount}</td>
              <td>{expense.category}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Render the ExpenseModal component */}
      <ExpenseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddExpense}
      />
    </div>
  );
}

export default Expenses;


