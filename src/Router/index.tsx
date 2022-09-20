import { Layout } from "components/Layout";
import { Componentes } from "pages/Componentes";
import { Homepage } from "pages/Homepage";
import { Welcome } from "pages/Welcome";
import React from "react";
import { Routes, Route } from "react-router-dom";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="welcome" element={<Welcome />} />
        <Route index element={<Homepage />} />
      </Route>
      <Route path="componentes" element={<Componentes />} />
      <Route path="*" element={<h1>No existe la page bro</h1>} />
    </Routes>
  );
};
