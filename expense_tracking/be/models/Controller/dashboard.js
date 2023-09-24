const db = require("../Entity");
// const user_expense = require("../Entity/user_expense");
const expense = db.expenses;
// const userExpense = db.user_expenses;
const users = db.users



const getUserExpense = async (req, res) => {
  let User = req.params.mail;
  console.log(User, "this is user")
  try {
    // Step 1: Fetch all expense_ids associated with the user
    const expenseDetails = await expense.findAll({
      where: {
        email : User,
      },
    });

    if (expenseDetails) {
      // Step 2: Map over the expenseDetails to extract specific properties
      const extractedExpenses = expenseDetails.map((expense) => ({
        id : expense.dataValues.id,
        date: expense.dataValues.date,
        amount: expense.dataValues.amount,
        category: expense.dataValues.category,
        isDelete: expense.dataValues.isDelete
      }));

      console.log("start:", extractedExpenses, "Expenses list");
      res.send({ statusCode: 200, expenses: extractedExpenses });
    } else {
      res.status(400).send({ statusCode: 400, message: "No data" });
    }
  } catch (err) {
    console.log(err);
  }
};
//   }
//     if (getExpense) {
//     console.log(getExpense)
//     res.send({ statusCode: 200, getExpense });
//   } else {
//     res.status(400).send({ statusCode: 400, message: "No data" });
//   }
// } catch (error) {
//   res.status(500).send({ statusCode: 400, message: "Internal error" });
// }
// };



const createExpense = async (req, res) => {
  try {
    console.log("data", req.body)
    let createNewExpense = await expense.create(req.body);
    res.status(200).send({ message: "Expense created" });
  } catch (error) {
    res.status(400).send({ message: "Internal error" });
  }
};


const deleteExpense = async (req, res) => {
  console.log(req)
  try {
    let findExpense = await expense.findOne({
      where: { id: req.params.expenseId },
    });
    console.log(findExpense);
    if (findExpense) {
      let deleteValue = {
        isDelete: true,
      };
      let deleteExpense = await expense.update(deleteValue, {
        where: {
          id: req.params.expenseId,
        },
      });
      res.status(200).send({ message: "Expense Deleted" });
    } else {
      res.status(400).send({ message: "Expense not found" });
    }
  } catch (error) {
    res.status(500).send({ message: "Internal error" });
  }
};


module.exports = {
  createExpense,
  // getAllExpense,
  getUserExpense,
  deleteExpense,
  // createUserExpense
};
