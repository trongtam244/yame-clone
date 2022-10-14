import axios from "../utils/axios";

const RegisterNewUser = (
  email: string,
  password: string,
  username: string,
  phone: number
) => {
  return axios.post("/api/v1/register", {
    email,
    password,
    username,
    phone,
  }); 
};

const loginUser = (valueLogin: number | string, password: string) => {
  return axios.post("/api/v1/login", {
    valueLogin,
    password,
  });
};

const logoutUser = () => {
  return axios.post("/api/v1/logout");
};

const getUserAccount = () => {
  return axios.get("/api/v1/account");
};

export { RegisterNewUser, loginUser, logoutUser, getUserAccount };
