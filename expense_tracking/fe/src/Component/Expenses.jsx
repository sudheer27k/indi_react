import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ExpenseModal from "../Component/ExpenseModal"; // Import the ExpenseModal component

function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddExpense = (newExpense) => {
    console.log("New Expense:",newExpense)
    setExpenses([...expenses, newExpense]);
  };
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


