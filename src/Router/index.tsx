import { Layout } from "components/Layout";
import { Componentes } from "pages/Componentes";
import { Homepage } from "pages/Homepage";
import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route path="hola" element={<h1>Soy el path hola</h1>} />
        <Route index element={<Homepage />} />
      </Route>
      <Route path="componentes" element={<Componentes />} />
      <Route path="*" element={<h1>No existe la page bro</h1>} />
    </Routes>
  );
};
