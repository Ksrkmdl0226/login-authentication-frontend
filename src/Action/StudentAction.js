import { createAsyncThunk } from "@reduxjs/toolkit";
import StudentApi from "../API/StudentApi";

// createAsyncThunk(action, callback)

// login
export const getLogin = createAsyncThunk("teacher/login", async (values) => {
  const res = await StudentApi.getLogin(values);
  return res.data;
});

// to create new
export const addStudent = createAsyncThunk("student/create", async (values) => {
  const res = await StudentApi.addStudent(values);
  return res.data;
});

// to read all
export const getStudents = createAsyncThunk("student/getAll", async () => {
  const res = await StudentApi.getStudentAll();
  return res.data;
});

// details
export const getStudentDetails = createAsyncThunk(
  "student/details",
  async ({ id }) => {
    const res = await StudentApi.getStudentDetails(id);
    return res.data;
  }
);

// to update
export const updateStudent = createAsyncThunk(
  "student/update",
  async ({ id, values }) => {
    const res = await StudentApi.patchStudent(id, values);
    return res.data;
  }
);
// to delete
export const deleteStudent = createAsyncThunk(
  "student/delete",
  async ({ id }) => {
    const res = await StudentApi.deleteStudent(id);
    return {id};
  }
);
