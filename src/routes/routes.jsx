import Login from "../screens/Login";
import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";

export const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Login />} path="/login" />
      </Routes>
    </BrowserRouter>
  );
};
