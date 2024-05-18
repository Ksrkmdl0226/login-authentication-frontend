import React, { Fragment } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  return (
    <Fragment>
      {localStorage.getItem("accessToken") ? (
        <Navigate to={`/home`} />
      ) : (
        <Outlet />
      )}
    </Fragment>
  );
};

export default ProtectedRoute;
