import axios from "axios";
import { env } from "../env";

export const createProjectAllocation = async (newExpense) => {
  console.log(newExpense);
  let createExpense = await axios
    .post(`${env.REACT_APP_API}/dashboard/createExpense`, {
      date: newExpense.date,
      description: newExpense.description,
      amount: newExpense.amount,
      category: newExpense.catrgory,
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error.response;
    });
  return createExpense;
};