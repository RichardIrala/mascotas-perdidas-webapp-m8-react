import { userState } from "atoms";
import { Layout } from "components/Layout";
import { CheckEmail } from "pages/CheckEmail";
import { Componentes } from "pages/Componentes";
import { Homepage } from "pages/Homepage";
import { Login } from "pages/Login";
import { MyPetsReported } from "pages/MyPetsReported";
import { MyProfile } from "pages/MyProfile";
import { ReportNewPet } from "pages/ReportNewPet";
import { ReportPetInformation } from "pages/ReportPetInformation";
import { Signup } from "pages/Signup";
import { Welcome } from "pages/Welcome";
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

export const AppRoutes = () => {
  const { token } = useRecoilValue(userState);
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="welcome" element={<Welcome />} />
        <Route path="checkEmail" element={<CheckEmail />} />
        <Route path="login" element={<Login />} />
        <Route path="mis-datos" element={ !!token 
          ? <MyProfile /> 
          : <Navigate to={"/checkEmail"} />} />
        <Route path="mis-mascotas-reportadas" element={!!token 
          ? <MyPetsReported/> 
          : <Navigate to={"/checkEmail"} />}/>
        <Route path="reportar-mascota" element={!!token 
          ? <ReportNewPet /> 
          : <Navigate to={"/checkEmail"} />}/>
        <Route path="reportar-informacion-de-mascota" element={!!token 
          ? <ReportPetInformation /> 
          : <Navigate to={"/checkEmail"} />}/>
        <Route path="signup" element={<Signup />} />
        <Route index element={<Homepage />} />
      </Route>
      <Route path="componentes" element={<Componentes />} />
      <Route path="*" element={<h1>No existe la page bro</h1>} />
    </Routes>
  );
};
