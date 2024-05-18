import React from "react";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import Login from "./components/auth/Login";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import Home from "./components/pages/Home";
import "./App.css";
import PrivateRoute from "./components/auth/PrivateRoute";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <ToastContainer autoClose={2000} />
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Login />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/home" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
