import { Header } from "components/Header";
import React from "react";
import { ButtonRose } from "ui/ButtonRose";
import { GeneralText } from "ui/GeneralText";
import { Title } from "ui/Title";
import styles from "./index.css";
export const Homepage = () => {
  return (
    <div>
      <Header />
      <div className={styles["principal-box"]}>
        <div className={styles["secundary-box"]}>
          <div className={styles["title-container"]}>
            <Title>Mascotas perdidas cerca tuyo</Title>
          </div>
          <div className={styles["get-geoloc-box"]}>
            <GeneralText>
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

function getGeolocation() {
  const aceptoGeoLoc = (position) => {
    console.log(position.coords.latitude, position.coords.longitude);
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
