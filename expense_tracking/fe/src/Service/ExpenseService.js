import axios from "axios";
import { env } from "../env";

export const createnewExpense = async (newExpense) => {
  let createExpense = await axios
    .post(`${env.REACT_APP_API}/dashboard/createExpense`, {
      date: newExpense.date,
      // description: newExpense.description,
      amount: newExpense.amount,
      category: newExpense.category,
      email: newExpense.email
  
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error.response;
    });
  return createExpense;
};



// export const getExpense = async () => {
//   let getAllExpense = await axios
//     .get(`${env.REACT_APP_API}/dashboard/getAllExpense`)
//     .then((res) => {
//       console.log(res)
//       return res;
//     })
//     .catch((error) => {
//       return error.response;
//     });
//   return getAllExpense;
// };

export const UserExpenseDetails = async(mail) =>{
  let getUserExpense = await axios
  .get(`${env.REACT_APP_API}/dashboard/getUserExpense/${mail}`)

  .then((res) => {
    console.log(res,"service")
    return res;
  })
  .catch((error) => {
    return error.response;
  });
return getUserExpense;
};


export const deleteExpense = async (expenseId) => {
  let deleteExpense = await axios
    .post(`${env.REACT_APP_API}/dashboard/delete_expense/${expenseId}`)
    .then((res) => res)
    .catch((error) => {
      return error.response;
    });
  return deleteExpense;
};

// export const allocateExpenseToEachUser = async (email,exp_id) => {
//   let createUserExpense = await axios
//   .post(`${env.REACT_APP_API}/dashboard/userExpense`, {
//     user_email : email,
//     expense_id : exp_id, 
//   })
//   .then((res) => {
//     return res;
//   })
//   .catch((error) => {
//     return error.response;
//   });
//   return createUserExpense;
// };

  // let info = {
  //   user_email : email,
  //   expense_id : exp_id 
  // }
  //   try {
  //     const response = await axios.post(`${env.REACT_APP_API}/dashboard/userProject`,info, this.axisConfig);
  //     return response.status
      
  
  //   } catch (err) {
  //     console.log(err)
  //   }
  // };
