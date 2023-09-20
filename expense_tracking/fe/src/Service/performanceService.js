import axios from "axios";
import { env } from "../env";

export const createPerformance = async (email) => {
  const response = await axios
    .get(`${env.REACT_APP_API}/dashboard/performance/${email}`)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error.response;
    });
  return response;
};

export const performance = async (email) => {
  let response = await axios
    .post(`${env.REACT_APP_API}/dashboard/performance`, {
      email: email,
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error.response;
    });
  return response;
};
