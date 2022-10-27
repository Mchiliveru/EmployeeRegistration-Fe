import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createCommentApi, getEmployeeCommentsApi } from "./comments.api";
import { commentsApiConstants } from "./comments.constants";

const initialState = {
  comments: [],
  isError: false,
  isLoading: false,
  errorMessage: false,
};

export const getEmployeeComments = createAsyncThunk(
  `${commentsApiConstants.COMMENT_SLICE}/${commentsApiConstants.EMPLOYEECOMMENTS}`,
  async (idEmp, { rejectWithValue }) => {
    try {
      const data = await getEmployeeCommentsApi(idEmp);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createComment = createAsyncThunk(
  `${commentsApiConstants.COMMENT_SLICE}/${commentsApiConstants.CREATECOMMENT}`,
  async (payload, { rejectWithValue }) => {
    try {
      const data = await createCommentApi(payload);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const CommentSlice = createSlice({
  name: commentsApiConstants.COMMENT_SLICE,
  initialState,
  reducers: {},
  extraReducers: {
    //Get employee comments
    [getEmployeeComments.pending]: (state) => {
      state.isLoading = true;
      state.errorMessage = "";
      state.isError = false;
    },
    [getEmployeeComments.fulfilled]: (state, { payload }) => {
      state.comments = payload;
      state.isError = false;
      state.isLoading = false;
    },
    [getEmployeeComments.rejected]: (state, { payload }) => {
      state.isError = true;
      state.errorMessage = payload;
    },

    //Create comment
    [createComment.pending]: (state) => {
      state.isLoading = true;
      state.errorMessage = "";
      state.isError = false;
    },
    [createComment.fulfilled]: (state, { payload }) => {
      state.isError = false;
      state.isLoading = false;
    },
    [createComment.rejected]: (state, { payload }) => {
      state.isError = true;
      state.errorMessage = payload;
    },
  },
});

export default CommentSlice.reducer;
