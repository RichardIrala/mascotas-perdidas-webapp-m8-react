// Debería crear una carpeta llamada Buttons en la cual ingresar todos los botones de la app
import React from "react";
import { userState } from "atoms";
import { useResetRecoilState } from "recoil";
import { ButtonRose } from "ui/ButtonRose";

export const ButtonLogout = () => {
  const logout = useResetRecoilState(userState);
  return <ButtonRose action={logout}>Cerrar sesión</ButtonRose>;
};
