import getApiConfig from "../../api/api.config";
import { Helper_Contants } from "../../helpers/helper.constants";
import { getSessionVariable } from "../../helpers/session.maintainance";
import { commentsApiConstants } from "./comments.constants";

export const getEmployeeCommentsApi = async (idEmp) => {
  const { accessToken } = JSON.parse(
    getSessionVariable(Helper_Contants.USERINFO)
  );
  const headers = {
    "x-access-token": accessToken,
  };
  const { data } = await getApiConfig().get(
    `${commentsApiConstants.EMPLOYEECOMMENTS}/${idEmp}`,
    { headers }
  );
  return data;
};

export const createCommentApi = async (payload) => {
  const { accessToken } = JSON.parse(
    getSessionVariable(Helper_Contants.USERINFO)
  );
  const headers = {
    "x-access-token": accessToken,
  };
  const { data } = await getApiConfig().post(
    `${commentsApiConstants.CREATECOMMENT}`,
     payload,
    { headers }
  );
  return data;
};
