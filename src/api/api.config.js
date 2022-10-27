import axios from "axios";
import { Helper_Contants } from "../helpers/helper.constants";
import { getSessionVariable } from "../helpers/session.maintainance";

const getAccessToken = () => {
  const userInfo = getSessionVariable(Helper_Contants.USERINFO);
  if (!userInfo) return "";
  const userToken = JSON.parse(userInfo)?.token;
  return userToken ? userToken : "";
};

const getApiConfig = () =>
  axios.create({
    baseURL: "http://localhost:3553/",
    headers: {
      "x-access-token": getAccessToken(),
    },
  });

export default getApiConfig;