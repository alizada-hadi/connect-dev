import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
  const { access } = useSelector((state) => state.auth);

  return access ? <Outlet /> : <Navigate to={"/signin"} />;
};

export default ProtectedRoutes;
