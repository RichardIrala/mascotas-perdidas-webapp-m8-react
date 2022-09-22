import React, { useState } from "react";
import closeMenuIcon from "/assets/close-icon.png";
import menuIcon from "/assets/menu-icon.png";
import huellaIcon from "/assets/huella-icon.png";
import styles from "./index.css";
import { useNavigate } from "react-router-dom";
import { CustomLink } from "ui/CustomLink";

export const Header = () => {
  const navigate = useNavigate();
  const [menu, setMenu] = useState(true);
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
              <CustomLink to={"/checkEmail"} children={"Mis datos"} />
            </li>
            <li>
              <CustomLink to={"/"} children={"Mis mascotas reportadas"} />
            </li>
            <li>
              <CustomLink to={"/"} children={"Reportar mascota"} />
            </li>
          </ul>
        </nav>
        <div className={styles["logued-name"]}>
          {/* state.getUserData().logued ? state.getUserData().email : "..." */}
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
