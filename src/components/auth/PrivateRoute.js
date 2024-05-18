import React, { Fragment } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  return (
    <Fragment>
      {!localStorage.getItem("accessToken") ? (
        <Navigate to={`/`} />
      ) : (
        <Outlet />
      )}
    </Fragment>
  );
};

export default PrivateRoute;
