import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import getApiConfig from "../../api/api.config";
import {
  createEmployeeApi,
  createMultipleEmployeesApi,
  deleteEmployeeApi,
  getAllEmployeeApi,
  getEmployeeApi,
  updateEmployeeApi,
  uploadProfileImgApi,
} from "./employee.api";
import { employeeApiConstants } from "./employee.constants";

const initialState = {
  employeeDetails: {},
  employees: [],
  employeesFromFile: [],
  isError: false,
  isLoading: false,
  errorMessage: "",
};

export const getAllEmployees = createAsyncThunk(
  `${employeeApiConstants.EMPLOYEE_SLICE}/${employeeApiConstants.GETALL}`,
  async (payload, { rejectWithValue }) => {
    try {
      const data = await getAllEmployeeApi();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getEmployee = createAsyncThunk(
  `${employeeApiConstants.EMPLOYEE_SLICE}/${employeeApiConstants.GETEMPLOYEE}`,
  async (idEmp, { rejectWithValue }) => {
    try {
      const data = await getEmployeeApi(idEmp);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createEmployee = createAsyncThunk(
  `${employeeApiConstants.EMPLOYEE_SLICE}/${employeeApiConstants.CREATEEMPLOYEE}`,
  async (payload, { rejectWithValue }) => {
    try {
      const data = await createEmployeeApi(payload);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createMultipleEmployees = createAsyncThunk(
  `${employeeApiConstants.EMPLOYEE_SLICE}/${employeeApiConstants.CREATEMULTIPLEEMPLOYEES}`,
  async (payload, { rejectWithValue }) => {
    try {
      const data = await createMultipleEmployeesApi(payload);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateEmployee = createAsyncThunk(
  `${employeeApiConstants.EMPLOYEE_SLICE}/${employeeApiConstants.UPDATEEMPLOYEE}`,
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await updateEmployeeApi(payload);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteEmployee = createAsyncThunk(
  `${employeeApiConstants.EMPLOYEE_SLICE}/${employeeApiConstants.DELETEEMPLOYEE}`,
  async (idEmp, { rejectWithValue }) => {
    try {
      const { data } = await deleteEmployeeApi(idEmp);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const uploadProfileImg = createAsyncThunk(
  `${employeeApiConstants.EMPLOYEE_SLICE}/${employeeApiConstants.UPLOADPROFILEIMG}`,
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await uploadProfileImgApi(payload);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const EmployeeSlice = createSlice({
  name: employeeApiConstants.EMPLOYEE_SLICE,
  initialState,
  reducers: {
    updateEmployeesFromFile: (state, { payload }) => {
      state.employeesFromFile = payload;
    },
    updateEmployeeProfileImg: (state, {payload}) => {
      state.employeeDetails.profileImgUrl = payload;
    }
  },
  extraReducers: {
    //GetAllEmployees
    [getAllEmployees.pending]: (state) => {
      state.isLoading = true;
      state.errorMessage = "";
      state.isError = false;
    },
    [getAllEmployees.fulfilled]: (state, { payload }) => {
      state.employees = payload;
      state.isError = false;
      state.isLoading = false;
    },
    [getAllEmployees.rejected]: (state, { payload }) => {
      state.isError = true;
      state.errorMessage = payload;
    },
    //Get Employee details
    [getEmployee.pending]: (state) => {
      state.isLoading = true;
      state.errorMessage = "";
      state.isError = false;
    },
    [getEmployee.fulfilled]: (state, { payload }) => {
      state.employeeDetails = payload;
      state.isError = false;
      state.isLoading = false;
    },
    [getEmployee.rejected]: (state, { payload }) => {
      state.isError = true;
      state.errorMessage = payload;
    },
    //Create Multiple employees
    [createMultipleEmployees.pending]: (state) => {
      state.isLoading = true;
      state.errorMessage = "";
      state.isError = false;
    },
    [createMultipleEmployees.fulfilled]: (state, { payload }) => {
      state.isError = false;
      state.isLoading = false;
    },
    [createMultipleEmployees.rejected]: (state, { payload }) => {
      state.isError = true;
      state.errorMessage = payload;
    },

    //Create employee
    [createEmployee.fulfilled]: (state, { payload }) => {
      state.isError = false;
      state.isLoading = false;
    },
    //Update employee
    [updateEmployee.fulfilled]: (state, { payload }) => {
      state.isError = false;
      state.isLoading = false;
    },
    [deleteEmployee.fulfilled]: (state, { payload }) => {
      state.isError = false;
      state.isLoading = false;
    },
  },
});
export const { updateEmployeesFromFile, updateEmployeeProfileImg } = EmployeeSlice.actions;
export default EmployeeSlice.reducer;
