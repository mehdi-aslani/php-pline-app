import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Header from "../layout/Header";
import PlineCookies from "../services/PlineCookies";

const PrivateRoute = (props) => {
  return PlineCookies.getCookies("auth") ? (
    <>
      <Header
        UserName={
          PlineCookies.getCookies("username").charAt(0).toUpperCase() +
          PlineCookies.getCookies("username").slice(1)
        }
        LogoutAction={() => {
          if (window.confirm("Are you sure you want to leave?"))
            props.LogoutAction();
        }}
      />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
};
export default PrivateRoute;
