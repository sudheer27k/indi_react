var express = require("express");
var router = express.Router();
const dashboard = require("../models/Controller/dashboard");

// router.get("/getAllExpense", dashboard.getAllExpense);
router.get("/getUserExpense/:mail", dashboard.getUserExpense);
router.post("/createExpense", dashboard.createExpense);
router.post("/delete_expense/:expenseId", dashboard.deleteExpense);

module.exports = router;
