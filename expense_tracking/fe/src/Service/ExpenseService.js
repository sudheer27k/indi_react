import axios from "axios";
import { env } from "../env";

export const createnewExpense = async (newExpense) => {
  console.log(newExpense.category);
  let createExpense = await axios
    .post(`${env.REACT_APP_API}/dashboard/createExpense`, {
      date: newExpense.date,
      description: newExpense.description,
      amount: newExpense.amount,
      category: newExpense.category,
  
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error.response;
    });
  return createExpense;
};

export const getExpense = async () => {
  let getAllExpense = await axios
    .get(`${env.REACT_APP_API}/dashboard/getAllExpense`)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error.response;
    });
  return getAllExpense;
};