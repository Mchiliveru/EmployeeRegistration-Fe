import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../redux/login/login.slice";
import alertSlice from "./alerts/alert.slice";
import commentsSlice from "./comments/comments.slice";
import employeeSlice from "./employee/employee.slice";

export const store = configureStore({
    reducer: {
        alertManagement: alertSlice,
        userManagement: userSlice,
        commentsManagement: commentsSlice,
        employeeManagement: employeeSlice
    }
})