import { configureStore } from "@reduxjs/toolkit";
import StudentReducer from "../Reducer/StudentReducer";

const rootReducer = {
  students: StudentReducer,
};

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

export default store;
