import React, { useState } from "react";
import closeMenuIcon from "/assets/close-icon.png";
import menuIcon from "/assets/menu-icon.png";
import huellaIcon from "/assets/huella-icon.png";
import styles from "./index.css";
import { useNavigate } from "react-router-dom";
import { CustomLink } from "ui/CustomLink";
import { useRecoilValue } from "recoil";
import { userState } from "atoms";

export const Header = () => {
  const navigate = useNavigate();
  const [menu, setMenu] = useState(true);
  const { email, token } = useRecoilValue(userState);
  return (
    <header className={styles["all-content-container"]}>
      <img
        className={styles["huella-icon"]}
        src={huellaIcon}
        alt="Huella"
        onClick={() => {
          navigate("/");
        }}
      />
      <div
        className={
          styles["menu-burger-container"] +
          " " +
          (menu && styles["display-none"])
        }
      >
        <div>
          <img
            className={styles["close-menu-burger"]}
            src={closeMenuIcon}
            alt="close-menu"
            onClick={() => {
              setMenu(!menu);
            }}
          />
        </div>
        <nav className={styles["menu-burger__nav"]}>
          <ul className={styles["menu-burger__nav__ul"]}>
            <li>
              <CustomLink to={"componentes"} children={"Componentes"} />
            </li>
            <li>
              <CustomLink to={"/mis-datos"} children={"Mis datos"} />
            </li>
            <li>
              <CustomLink to={"/mis-mascotas-reportadas"} children={"Mis mascotas reportadas"} />
            </li>
            <li>
              <CustomLink to={"/reportar-mascota"} children={"Reportar mascota"} />
            </li>
          </ul>
        </nav>
        <div className={styles["logued-name"]}>
          {/* Falta ajustar para mostrar el verdadero nombre del usuario. */}
          <span>{email && token ? "Richard" : "..."}</span>
        </div>
      </div>
      <img
        className={styles["menu-burger"]}
        src={menuIcon}
        alt="menu-burger"
        onClick={() => {
          setMenu(!menu);
        }}
      />
    </header>
  );
};
