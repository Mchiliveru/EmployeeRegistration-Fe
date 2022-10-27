import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginApi, registrationApi, updateUserApi } from "./login.api";
import { loginConstants } from "./login.constants";

const initialState = {
    userInfo: {},
    isLoading: false,
    errorMessage: "",
    isError: false
};

export const login = createAsyncThunk(
    `${loginConstants.USER_SLICE}/${loginConstants.LOGIN}`,
  async (payload, { rejectWithValue }) => {
    try {
      const data = await loginApi(payload);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const registration = createAsyncThunk(
    `${loginConstants.USER_SLICE}/${loginConstants.REGISTRATION}`,
    async(payload, {rejectWithValue}) => {
        try {
            const data = await registrationApi(payload);
            return data;
        } catch(error) {
            return rejectWithValue(error);
        }
    }
);

export const updateUser = createAsyncThunk(
    `${loginConstants.USER_SLICE}/${loginConstants.UPDATEUSER}`,
    async(payload, {rejectWithValue}) => {
        try {
            const data = await updateUserApi(payload);
            return data;
        }
        catch(error) {
            return rejectWithValue([], error);
        }
    }
);

export const LoginSlice = createSlice({
    name: loginConstants.USER_SLICE,
    initialState,
    reducers: {},
    extraReducers: {
         // login user
        [login.pending]: (state) => {
            state.isLoading = true;
            state.errorMessage = "";
        },
        [login.fulfilled]: (state, { payload }) => {
            state.userInfo = payload;
            state.isLoading = false;
            state.errorMessage = "";
        },
        [login.rejected]: (state, { payload }) => {
            state.errorMessage = payload.response.data.message;
            state.isLoading = false;
        },
        //Registration
        [registration.pending]: (state) => {
            state.isLoading = true;
            state.errorMessage = "";
            state.isError = false;
        },
        [registration.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.errorMessage = "";
            state.isError = false;
        },
        [registration.rejected]: (state, error) => {
            state.errorMessage = error;
            state.isLoading = false;
            state.isError = true;
        },
        //Update user
        [updateUser.pending]: (state) => {
            state.isLoading = true;
            state.errorMessage = "";
        },
        [updateUser.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.errorMessage = "";
        },
        [updateUser.rejected]: (state, { meta }) => {
            state.errorMessage = meta.response.data.message;
            state.isLoading = false;
        },
    }
});

export default LoginSlice.reducer;