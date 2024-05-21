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
      .addCase(getLogin.fulfilled)
      .addCase(addStudent.fulfilled, (state, action) => {
        state.push(action.payload.data);
      })
      .addCase(getStudents.fulfilled, (state, action) => {
        return [
          ...action.payload.data.sort((val1, val2) => val2.marks - val1.marks),
        ];
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        let index = state.findIndex((item) => item?.id === action?.payload?.id);
        state[index] = {
          ...state[index],
          ...action.payload.data,
        };
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        console.log(action);
        let index = state.findIndex((item) => item?.id === action?.meta?.arg?.id);
        state.splice(index, 1);
      });
  },
});

const { reducer } = studentSlice;

export default reducer;
