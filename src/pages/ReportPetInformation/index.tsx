import { LabelWithInput } from "components/LabelWithInput";
import React from "react";
import { ButtonRose } from "ui/ButtonRose";
import { Title } from "ui/Title";
import styles from "./index.css";
export const ReportPetInformation = () => {
  const titulo = "cuentanos más sobre " + "jorgito";
  const direccionDeLaImagen =
    "https://res.cloudinary.com/richardiral/image/upload/v1662134184/h1mnrupvfcqtq4dif1x2.jpg";

  return (
    <div className={styles["container"]}>
      <div className={styles["little-card-container"]}>
        <Title>{titulo}</Title>
        <img className={styles["pet-pic"]} src={direccionDeLaImagen} />
      </div>
      <form className={styles["form"]}>
        <LabelWithInput inputName="description">
          Información que sepas
        </LabelWithInput>
        <button className={styles["form__button"]} type="submit">
          <ButtonRose type="submit">Enviar</ButtonRose>
        </button>
      </form>
    </div>
  );
};
