import { Layout } from "components/Layout";
import React from "react";
import { Routes, Route, Link, Outlet } from "react-router-dom";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route path="hola" element={<h1>Soy el path hola</h1>} />
        <Route index element={<h1>Soy el index</h1>} />
      </Route>
      <Route path="*" element={<h1>No existe la page bro</h1>} />
    </Routes>
  );
};
