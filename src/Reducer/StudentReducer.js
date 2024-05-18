import { createSlice } from "@reduxjs/toolkit";
import {
  addStudent,
  deleteStudent,
  getLogin,
  getStudents,
  updateStudent,
} from "../Action/StudentAction";

// inital state
const initialState = [];

// reducer slices
const studentSlice = createSlice({
  name: "students",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(addStudent.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(getStudents.fulfilled, (state, action) => {
        return [action.payload];
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        let index = state.findIndex((item) => item?.id === action?.payload?.id);
        state[index] = {
          ...state[index],
          ...action.payload,
        };
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        let index = state.findIndex((item) => item?.id === action?.payload?.id);
        state.splice(index, 1);
      });
  },
});

const { reducer } = studentSlice;

export default reducer;
