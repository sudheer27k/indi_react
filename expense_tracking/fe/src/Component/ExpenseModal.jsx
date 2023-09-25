// // import React, { useState } from "react";
// // import { Modal, Button, Form } from "react-bootstrap";

// // function ExpenseModal({ isOpen, onClose, onSave }) {
// //   const [expense, setExpense] = useState({
// //     date: "",
// //     amount: "",
// //     category: "",
// //   });

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setExpense({
// //       ...expense,
// //       [name]: value,
// //     });
// //   };

// //   const handleSubmit = () => {
// //     onSave(expense);
// //     setExpense({
// //       date: "",
// //       amount: "",
// //       category: "",
// //     });
// //     onClose();
// //   };


// //   return (
// //     <Modal show={isOpen} onHide={onClose}>
// //       <Modal.Header closeButton>
// //         <Modal.Title>Add Expense</Modal.Title>
// //       </Modal.Header>
// //       <Modal.Body>
// //         <Form>
// //           <Form.Group>
// //             <Form.Label>Date</Form.Label>
// //             <Form.Control
// //               type="date"
// //               name="date"
// //               value={expense.date}
// //               onChange={handleChange}
// //               required
// //             />
// //           </Form.Group>
// //           <Form.Group>
// //             <Form.Label>Amount</Form.Label>
// //             <Form.Control
// //               type="number"
// //               name="amount"
// //               value={expense.amount}
// //               onChange={handleChange}
// //               required
// //             />
// //           </Form.Group>
// //           <Form.Group>
// //             <Form.Label>Category</Form.Label>
// //             <Form.Control
// //               type="text"
// //               name="category"
// //               value={expense.category}
// //               onChange={handleChange}
// //               required
// //             />
// //           </Form.Group>
// //         </Form>
// //       </Modal.Body>
// //       <Modal.Footer>
// //         <Button variant="secondary" onClick={onClose}>
// //           Close
// //         </Button>
// //         <Button variant="primary" onClick={handleSubmit}>
// //           Save
// //         </Button>
// //       </Modal.Footer>
// //     </Modal>
// //   );
// // }

// // export default ExpenseModal;

// import React, { useState } from "react";
// import { Modal, Button, Form } from "react-bootstrap";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function ExpenseModal({ isOpen, onClose, onSave }) {
//   const [expense, setExpense] = useState({
//     date: "",
//     amount: "",
//     category: "Other", // Default category
//   });

//   const categories = ["Grooming","Food & Beverages", "Clothing", "Health Care","Travel Expenses", "Rentals"];

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setExpense({
//       ...expense,
//       [name]: value,
//     });
//   };

//   const handleSubmit = () => {
//     if (parseFloat(expense.amount) >= 0) {
//       onSave(expense);
//       setExpense({
//         date: "",
//         amount: "",
//         category: "Other", // Reset to default category
//       });
//       onClose();
//       toast.success("Expense saved successfully!");
//     } else {
//       toast.error("Amount cannot be negative.");
//     }
//   };

//   return (
//     <Modal show={isOpen} onHide={onClose}>
//       <Modal.Header closeButton>
//         <Modal.Title>Add Expense</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Form>
//           <Form.Group>
//             <Form.Label>Date</Form.Label>
//             <Form.Control
//               type="date"
//               name="date"
//               value={expense.date}
//               onChange={handleChange}
//               required
//             />
//           </Form.Group>
//           <Form.Group>
//             <Form.Label>Amount</Form.Label>
//             <Form.Control
//               type="number"
//               name="amount"
//               value={expense.amount}
//               onChange={handleChange}
//               required
//               min="0" // Disallow negative values
//             />
//           </Form.Group>
//           <Form.Group>
//             <Form.Label>Category</Form.Label>
//             <Form.Control
//               as="select"
//               name="category"
//               value={expense.category}
//               onChange={handleChange}
//               required
//             >
//               {categories.map((category, index) => (
//                 <option key={index} value={category}>
//                   {category}
//                 </option>
//               ))}
//               <option value="Other">Other</option>
//             </Form.Control>
//           </Form.Group>
//         </Form>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={onClose}>
//           Close
//         </Button>
//         <Button variant="primary" onClick={handleSubmit}>
//           Save
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// }

// export default ExpenseModal;

import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ExpenseModal({ isOpen, onClose, onSave }) {
  const [expense, setExpense] = useState({
    date: "",
    amount: "",
    category: "Other", // Default category
  });

  const categories = ["Grooming","Food & Beverages", "Clothing", "Health Care","Travel Expenses", "Rentals"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense({
      ...expense,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    if (parseFloat(expense.amount) >= 0) {
      onSave(expense);
      setExpense({
        date: "",
        amount: "",
        category: "Other", // Reset to default category
      });
      onClose();
      toast.success("Expense saved successfully!");
    } else {
      toast.error("Amount cannot be negative.");
    }
  };

  const handleModalExited = () => {
    // Reset the expense state when the modal is exited (closed)
    setExpense({
      date: "",
      amount: "",
      category: "Other", // Reset to default category
    });
  };

  return (
    <Modal show={isOpen} onHide={onClose} onExited={handleModalExited}>
      <Modal.Header closeButton>
        <Modal.Title>Add Expense</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={expense.date}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              name="amount"
              value={expense.amount}
              onChange={handleChange}
              required
              min="0" // Disallow negative values
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Category</Form.Label>
            <Form.Control
              as="select"
              name="category"
              value={expense.category}
              onChange={handleChange}
              required
            >
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
              <option value="Other">Other</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save
        </Button>
      </Modal.Footer>
      <ToastContainer />
    </Modal>
  );
}

export default ExpenseModal;

