import getApiConfig from "../../api/api.config";
import { loginConstants } from "./login.constants";

export const loginApi = async (payload) => {
    const {data} = await getApiConfig().post(loginConstants.LOGIN, payload);
    return data;
}

export const registrationApi = async(payload = {}) => {
    const {data} = await getApiConfig().post(loginConstants.REGISTRATION, payload);
    return data;
}

export const updateUserApi = async(payload ={}) => {
    const {data} = await getApiConfig().put(`${loginConstants.UPDATEUSER}/${payload.id}`, payload);
    return data;
}

