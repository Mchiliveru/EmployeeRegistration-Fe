import getApiConfig from "../../api/api.config";
import { Helper_Contants } from "../../helpers/helper.constants";
import { getSessionVariable } from "../../helpers/session.maintainance";
import { employeeApiConstants } from "./employee.constants";

export const getAllEmployeeApi = async () => {
    const { accessToken }= JSON.parse(getSessionVariable(Helper_Contants.USERINFO));
    const headers = {
        "x-access-token": accessToken
    };
    const {data} = await getApiConfig().get(`${employeeApiConstants.GETALL}`, {headers});
    return data;
}

export const getEmployeeApi = async (idEmp) => {
    const { accessToken }= JSON.parse(getSessionVariable(Helper_Contants.USERINFO));
    const headers = {
        "x-access-token": accessToken
    };
    const {data} = await getApiConfig().get(`${employeeApiConstants.GETEMPLOYEE}/${idEmp}`, {headers});
    return data;
}

export const createEmployeeApi = async (payload) => {
    const { accessToken }= JSON.parse(getSessionVariable(Helper_Contants.USERINFO));
    const headers = {
        "x-access-token": accessToken
    };
    const {data} = await getApiConfig().post(`${employeeApiConstants.CREATEEMPLOYEE}`, payload ,{headers});
    return data;
}

export const createMultipleEmployeesApi = async (payload) => {
    const { accessToken }= JSON.parse(getSessionVariable(Helper_Contants.USERINFO));
    const headers = {
        "x-access-token": accessToken
    };
    const {data} = await getApiConfig().post(`${employeeApiConstants.CREATEMULTIPLEEMPLOYEES}`, payload ,{headers});
    return data;
}

export const updateEmployeeApi = async (payload) => {
    const { accessToken }= JSON.parse(getSessionVariable(Helper_Contants.USERINFO));
    const headers = {
        "x-access-token": accessToken
    };
    const {data} = await getApiConfig().put(`${employeeApiConstants.UPDATEEMPLOYEE}/${payload._id}`, payload, {headers});
    return data;
}

export const deleteEmployeeApi = async (idEmp) => {
    const { accessToken }= JSON.parse(getSessionVariable(Helper_Contants.USERINFO));
    const headers = {
        "x-access-token": accessToken
    };
    const {data} = await getApiConfig().delete(`${employeeApiConstants.DELETEEMPLOYEE}/${idEmp}`, {headers});
    return data;
}

export const uploadProfileImgApi = async (payload) => {
    const { accessToken }= JSON.parse(getSessionVariable(Helper_Contants.USERINFO));
    const headers = {
        "x-access-token": accessToken
    };
    const {data} = await getApiConfig().post(`${employeeApiConstants.UPLOADPROFILEIMG}`, payload ,{headers});
    return data;
}
