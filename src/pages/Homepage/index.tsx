import { Header } from "components/Header";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ButtonRose } from "ui/ButtonRose";
import { GeneralText } from "ui/GeneralText";
import { Title } from "ui/Title";
import styles from "./index.css";

export const Homepage = () => {
  const navigate = useNavigate();

  function getGeolocation() {
    const aceptoGeoLoc = (position) => {
      console.log(position.coords.latitude, position.coords.longitude);
      // Agregar aca un redirector hacia la ruta del welcome
      navigate("/welcome");
    };
    const noAceptoGeoLoc = () => {
      console.error("Acceso a la ubicación denegado");
    };

    if (!!navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        aceptoGeoLoc,
        noAceptoGeoLoc
      );
    }
  }

  return (
    <div>
      <div className={styles["principal-box"]}>
        <div className={styles["secundary-box"]}>
          <div className={styles["title-container"]}>
            <Title centred>Mascotas perdidas cerca tuyo</Title>
          </div>
          <div className={styles["get-geoloc-box"]}>
            <GeneralText centred>
              Para ver las mascotas reportadas cerca tuyo necesitamos permiso
              para conocer tu ubicación.
            </GeneralText>
            <ButtonRose action={getGeolocation}>Dar mi ubicación</ButtonRose>
          </div>
        </div>
      </div>
    </div>
  );
};
