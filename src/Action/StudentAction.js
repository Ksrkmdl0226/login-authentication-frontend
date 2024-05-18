import { createAsyncThunk } from "@reduxjs/toolkit";
import StudentApi from "../API/StudentApi";

// createAsyncThunk(action, callback)

// login
export const getLogin = createAsyncThunk(
  "teacher/login",
  async ({ values, onLoginSuccess, onLoginError }) => {
    const res = await StudentApi.getLogin(values);
    console.log("log", res);
    try {
      if (res?.status == 200) {
        return onLoginSuccess(res?.data);
      } else {
        return onLoginError(res?.data);
      }
    } catch (error) {
      return onLoginError(res?.data);
    }
  }
);

// to create new
export const addStudent = createAsyncThunk(
  "student/create",
  async ({ values, onAddSuccess, onAddError }) => {
    console.log("payload data=", values);
    const res = await StudentApi.addStudent(values);
    console.log(res, "add");
    try {
      if (res?.status == 200) {
        return onAddSuccess(res?.data);
      } else {
        return onAddError(res?.data);
      }
    } catch (error) {
      return onAddError(res?.data);
    }
  }
);

// to read all
export const getStudents = createAsyncThunk(
  "student/retrive",
  async (onSucess, onError) => {
    console.log("all user data");
    const res = await StudentApi.getStudentAll();
    try {
      if (res?.status == 200) {
        return onSucess(res?.data);
      } else {
        return onError(res?.data);
      }
    } catch (error) {
      return onError(res?.data);
    }
  }
);

// details
export const getStudentDetails = createAsyncThunk(
  "student/details",
  async ({ id, onDetailsSuccess, onDetailsError }) => {
    console.log("all user data");
    const res = await StudentApi.getStudentDetails(id);
    try {
      if (res?.status == 200) {
        return onDetailsSuccess(res?.data);
      } else {
        return onDetailsError(res?.data);
      }
    } catch (error) {
      return onDetailsError(res?.data);
    }
  }
);

// to update
export const updateStudent = createAsyncThunk(
  "student/update",
  async ({ id, values, onAddSuccess, onAddError }) => {
    console.log("update users data", id);
    const res = await StudentApi.patchStudent(id, values);
    try {
      if (res?.status == 200) {
        return onAddSuccess(res?.data);
      } else {
        return onAddError(res?.data);
      }
    } catch (error) {
      return onAddError(res?.data);
    }
  }
);
// to delete
export const deleteStudent = createAsyncThunk(
  "student/delete",
  async ({ id, onDeleteSuccess, onDeleteError }) => {
    console.log("delete users data", id);
    const res = await StudentApi.deleteStudent(id);
    try {
      if (res?.status == 200) {
        return onDeleteSuccess(res?.data);
      } else {
        return onDeleteError(res?.data);
      }
    } catch (error) {
      return onDeleteError(res?.data);
    }
  }
);
