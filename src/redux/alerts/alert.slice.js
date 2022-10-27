import { createSlice } from "@reduxjs/toolkit";
import { ALERT_TYPES } from "./alerts.constants";

const initialState = {
    text: "",
    type: ALERT_TYPES.INFO
};

export const AlertSlice = createSlice({
    name: "alert",
    initialState,
    reducers: {
        setAlert: (state, {payload}) => {
            state.text = payload.text;
            state.type = payload.type || ALERT_TYPES.INFO;
        }
    }
});

export const { setAlert } = AlertSlice.actions;
export default AlertSlice.reducer;